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
    public class UpkeepRepository : BaseRepository
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
                           b.TypeId AS BoardTypeId,
                           b.DeckMaterialId AS BoardDeckMaterialId,
                           b.UserProfileId AS BoardUserProfileId,
                           u.Id AS UserProfileId,
                           u.Email AS UserProfileEmail,
                           u.FirebaseUserId AS UserProfileFirebaseUserId,
                           u.DisplayName AS UserProfileDisplayName
                    FROM Upkeep up
                            LEFT JOIN UserProfile u ON up.UserProfileId = u.Id
                            LEFT JOIN Board b ON up.BoardId = b.Id
                            LEFT JOIN Category c ON up.CategoryId = c.Id
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
        ///  Fetch a Board by Id. Uses NewBoardFromReader method to create new Board "object"
        /// </summary>
        public Board GetUpkeepById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT b.Id AS BoardId, b.[Name] AS BoardName, b.BoardTypeId AS BoardType, 
                              b.DeckMaterialId AS DeckMaterial,
                              b.UserProfileId AS BoardUserProfileId, u.Id AS UserProfileId, u.DisplayName, u.Email, 
                              dm.Id AS DeckMaterialId, dm.[Name] AS DeckMaterialName, t.Id AS BoardTypeId, t.[Name] AS BoardTypeName
                        FROM Board b
                            LEFT JOIN UserProfile u ON b.UserProfileId = u.Id
                            LEFT JOIN DeckMaterial dm ON b.DeckMaterialId = dm.Id
                            LEFT JOIN BoardType t ON b.BoardTypeId = t.Id
                        WHERE b.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Board board = null;

                    if (reader.Read())
                    {
                        board = NewBoardFromReader(reader);
                    }

                    reader.Close();

                    return board;
                }
            }
        }

        /// <summary>
        /// Adds a Board to the database.
        /// </summary>
        /// <param name="board"></param>
        public int AddBoard(Board board)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Board (
                            Name, BoardTypeId, DeckMaterialId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Name, @BoardTypeId, @DeckMaterialId, @UserProfileId )";
                    DbUtils.AddParameter(cmd, "@Name", board.Name);
                    DbUtils.AddParameter(cmd, "@BoardTypeId", board.BoardTypeId);
                    DbUtils.AddParameter(cmd, "@DeckMaterialId", board.DeckMaterialId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", board.UserProfileId);

                    return board.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateBoard(Board board)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Board
                        SET Name = @Name,
                            BoardTypeId = @BoardTypeId,
                            DeckMaterialId = @DeckMaterialId,
                            UserProfileId = @UserProfileId
                    WHERE Id = @Id
                    ";

                    cmd.Parameters.AddWithValue("@Name", board.Name);
                    cmd.Parameters.AddWithValue("@BoardTypeId", board.BoardTypeId);
                    cmd.Parameters.AddWithValue("@DeckMaterialId", board.DeckMaterialId);
                    cmd.Parameters.AddWithValue("@UserProfileId", board.UserProfileId);
                    cmd.Parameters.AddWithValue("@Id", board.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteBoard(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE  FROM Upkeep
                        WHERE   BoardId = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE  FROM Board
                        WHERE   Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Board NewBoardFromReader(SqlDataReader reader)
        {
            return new Board()
            {
                Id = reader.GetInt32(reader.GetOrdinal("BoardId")),
                Name = reader.GetString(reader.GetOrdinal("BoardName")),
                BoardTypeId = reader.GetInt32(reader.GetOrdinal("BoardType")),
                BoardType = new BoardType()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("BoardTypeId")),
                    Name = reader.GetString(reader.GetOrdinal("BoardTypeName"))
                },
                DeckMaterialId = reader.GetInt32(reader.GetOrdinal("DeckMaterial")),
                DeckMaterial = new DeckMaterial()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("DeckMaterialId")),
                    Name = reader.GetString(reader.GetOrdinal("DeckMaterialName"))
                },
                UserProfileId = reader.GetInt32(reader.GetOrdinal("BoardUserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                }
            };
        }
    }
}