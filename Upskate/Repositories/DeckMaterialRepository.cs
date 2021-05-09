using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Upskate.Models;
using Upskate.Repositories;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Upskate.Repositories
{
    public class DeckMaterialRepository : BaseRepository, IDeckMaterialRepository
    {
        public DeckMaterialRepository(IConfiguration configuration) : base(configuration) { }

        public List<DeckMaterial> GetAllDeckMaterials()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name
                        FROM DeckMaterial
                        ";
                    var reader = cmd.ExecuteReader();

                    var deckMaterials = new List<DeckMaterial>();

                    while (reader.Read())
                    {
                        deckMaterials.Add(NewDeckMaterialFromReader(reader));
                    }

                    reader.Close();

                    return deckMaterials;
                }
            }
        }

        private DeckMaterial NewDeckMaterialFromReader(SqlDataReader reader)
        {
            return new DeckMaterial()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name"))
            };

        }
    }
}
