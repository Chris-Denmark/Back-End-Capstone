using System.Collections.Generic;
using Upskate.Models;

namespace Upskate.Repositories
{
    public interface IDeckMaterialRepository
    {
        List<DeckMaterial> GetAllDeckMaterials();
    }
}