using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Upskate.Models;
using Upskate.Utils;

namespace Upskate.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirebaseUserId, DisplayName, 
                               Email 
                        FROM UserProfile
                        WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, DisplayName, 
                                                                 Email)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @DisplayName, @Email)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<UserProfile> GetUserProfiles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, DisplayName, Email
                        FROM UserProfile
                        ORDER BY DisplayName ASC
                    ";

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<UserProfile> profiles = new List<UserProfile>();

                    while (reader.Read())
                    {
                        UserProfile profile = new UserProfile
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                            Email = reader.GetString(reader.GetOrdinal("Email"))
                        };

                        profiles.Add(profile);
                    }

                    reader.Close();
                    return profiles;
                }
            }
        }

        public UserProfile GetUserProfileById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, DisplayName, Email
                         FROM UserProfile
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    UserProfile userProfile = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                        };
                    }

                    reader.Close();
                    return userProfile;
                }
            }
        }

        public void DeleteUserProfile(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE  FROM Upkeep
                        WHERE   UserProfileId = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE  FROM Board
                        WHERE   UserProfileId = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE  FROM UserProfile
                        WHERE   Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
