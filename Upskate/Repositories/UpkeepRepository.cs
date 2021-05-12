using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Upskate.Models;
using Upskate.Utils;

namespace Upskate.Repositories
{
    public class UpkeepRepository : BaseRepository, IUpkeepRepository
    {
        public UpkeepRepository(IConfiguration configuration) : base(configuration) { }

        public List<Upkeep> GetCurrentUserUpkeeps(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT up.Id AS UpkeepId,
                           up.CategoryId AS UpkeepCategoryId,
                           up.Description AS UpkeepDescription, 
                           up.DateCompleted AS UpkeepDateCompleted,
                           up.BoardId AS UpkeepBoardId,
                           up.UserProfileId AS UpkeepUserProfileId,
                           c.[Name] AS CategoryName,
                           c.Id AS CategoryId, 
                           b.Id AS BoardId,
                           b.[Name] AS BoardName,
                           b.BoardTypeId AS BoardTypeId,
                           b.DeckMaterialId AS BoardDeckMaterialId,
                           b.UserProfileId AS BoardUserProfileId,
                           u.Id AS UserProfileId,
                           u.Email AS UserProfileEmail,
                           u.FirebaseUserId AS UserProfileFirebaseUserId,
                           u.DisplayName AS UserProfileDisplayName,
                           dm.Id AS DeckMaterialId,
                           dm.Name AS DeckMaterialName,
                           bt.Id AS BoardTypeId,
                           bt.Name AS BoardTypeName
                    FROM Upkeep up
                            LEFT JOIN UserProfile u ON up.UserProfileId = u.Id
                            LEFT JOIN Board b ON up.BoardId = b.Id
                            LEFT JOIN Category c ON up.CategoryId = c.Id
                            LEFT JOIN DeckMaterial dm ON b.DeckMaterialId = dm.Id
                            LEFT JOIN BoardType bt ON b.BoardTypeId = bt.Id
                    WHERE up.UserProfileId = @id
                    ";

                    cmd.Parameters.AddWithValue("id", userProfileId);
                    var reader = cmd.ExecuteReader();

                    var upkeeps = new List<Upkeep>();

                    while (reader.Read())
                    {
                        upkeeps.Add(NewUpkeepFromReader(reader));
                    }

                    reader.Close();
                    return upkeeps;
                }
            }
        }

        /// <summary>
        ///  Fetch an Upkeep by Id. Uses NewUpkeepFromReader method to create new Upkeep "object"
        /// </summary>
        public Upkeep GetUpkeepById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT up.Id AS UpkeepId,
                           up.CategoryId AS UpkeepCategoryId,
                           up.Description AS UpkeepDescription, 
                           up.DateCompleted AS UpkeepDateCompleted,
                           up.BoardId AS UpkeepBoardId,
                           up.UserProfileId AS UpkeepUserProfileId,
                           c.[Name] AS CategoryName,
                           c.Id AS CategoryId, 
                           b.Id AS BoardId,
                           b.[Name] AS BoardName,
                           b.BoardTypeId AS BoardTypeId,
                           b.DeckMaterialId AS BoardDeckMaterialId,
                           b.UserProfileId AS BoardUserProfileId,
                           u.Id AS UserProfileId,
                           u.Email AS UserProfileEmail,
                           u.FirebaseUserId AS UserProfileFirebaseUserId,
                           u.DisplayName AS UserProfileDisplayName,
                           dm.Id AS DeckMaterialId,
                           dm.Name AS DeckMaterialName,
                           bt.Id AS BoardTypeId,
                           bt.Name AS BoardTypeName
                    FROM Upkeep up
                            LEFT JOIN UserProfile u ON up.UserProfileId = u.Id
                            LEFT JOIN Board b ON up.BoardId = b.Id
                            LEFT JOIN Category c ON up.CategoryId = c.Id
                            LEFT JOIN DeckMaterial dm ON b.DeckMaterialId = dm.Id
                            LEFT JOIN BoardType bt ON b.BoardTypeId = bt.Id
                    WHERE up.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Upkeep upkeep = null;

                    if (reader.Read())
                    {
                        upkeep = NewUpkeepFromReader(reader);
                    }

                    reader.Close();

                    return upkeep;
                }
            }
        }

        /// <summary>
        /// Adds an Upkeep to the database.
        /// </summary>
        /// <param name="upkeep"></param>
        public int AddUpkeep(Upkeep upkeep)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Upkeep (
                            CategoryId, Description, DateCompleted, BoardId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @CategoryId, @Description, @DateCompleted, @BoardId, @UserProfileId )";
                    DbUtils.AddParameter(cmd, "@CategoryId", upkeep.CategoryId);
                    DbUtils.AddParameter(cmd, "@Description", upkeep.Description);
                    DbUtils.AddParameter(cmd, "@DateCompleted", upkeep.DateCompleted);
                    DbUtils.AddParameter(cmd, "@BoardId", upkeep.BoardId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", upkeep.UserProfileId);

                    return upkeep.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateUpkeep(Upkeep upkeep)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Upkeep
                        SET CategoryId = @CategoryId,
                            Description = @Description,
                            DateCompleted = @DateCompleted,
                            BoardId = @BoardId,
                            UserProfileId = @UserProfileId
                    WHERE Id = @Id
                    ";

                    cmd.Parameters.AddWithValue("@CategoryId", upkeep.CategoryId);
                    cmd.Parameters.AddWithValue("@Description", upkeep.Description);
                    cmd.Parameters.AddWithValue("@DateCompleted", DbUtils.ValueOrDBNull(upkeep.DateCompleted));
                    cmd.Parameters.AddWithValue("@BoardId", upkeep.BoardId);
                    cmd.Parameters.AddWithValue("@UserProfileId", upkeep.UserProfileId);
                    cmd.Parameters.AddWithValue("@Id", upkeep.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteUpkeep(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE  FROM Upkeep
                        WHERE   Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Upkeep NewUpkeepFromReader(SqlDataReader reader)
        {
            return new Upkeep()
            {
                Id = reader.GetInt32(reader.GetOrdinal("UpkeepId")),
                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                Category = new Category()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                },
                Description = reader.GetString(reader.GetOrdinal("UpkeepDescription")),
                DateCompleted = reader.GetDateTime(reader.GetOrdinal("UpkeepDateCompleted")),
                BoardId = reader.GetInt32(reader.GetOrdinal("UpkeepBoardId")),
                Board = new Board()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("BoardId")),
                    Name = reader.GetString(reader.GetOrdinal("BoardName")),
                    BoardTypeId = reader.GetInt32(reader.GetOrdinal("BoardTypeId")),
                    BoardType = new BoardType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("BoardTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("BoardTypeName")),
                    },
                    DeckMaterialId = reader.GetInt32(reader.GetOrdinal("BoardDeckMaterialId")),
                    DeckMaterial = new DeckMaterial()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("DeckMaterialId")),
                        Name = reader.GetString(reader.GetOrdinal("DeckMaterialName")),
                    },
                    UserProfileId = reader.GetInt32(reader.GetOrdinal("BoardUserProfileId")),
                },
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UpkeepUserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    Email = reader.GetString(reader.GetOrdinal("UserProfileEmail")),
                    DisplayName = reader.GetString(reader.GetOrdinal("UserProfileDisplayName")),
                }
            };
        }
    }
}