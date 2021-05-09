using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Upskate.Models;
using Upskate.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Upskate.Repositories
{
    public class BoardTypeRepository : BaseRepository, IBoardTypeRepository
    {
        public BoardTypeRepository(IConfiguration configuration) : base(configuration) { }
        
        public List<BoardType> GetAllBoardTypes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name
                        FROM BoardType
                        ";
                    var reader = cmd.ExecuteReader();

                    var boardTypes = new List<BoardType>();

                    while (reader.Read())
                    {
                        boardTypes.Add(NewBoardTypeFromReader(reader));
                    }

                    reader.Close();

                    return boardTypes;
                }
            }
        }

        private BoardType NewBoardTypeFromReader(SqlDataReader reader)
        {
            return new BoardType()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name"))
            };

        }
    }
}
