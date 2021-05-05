using System.Collections.Generic;
using Upskate.Models;

namespace Upskate.Repositories
{
    public interface IUpkeepRepository
    {
        int AddUpkeep(Upkeep upkeep);
        void DeleteUpkeep(int id);
        List<Upkeep> GetCurrentUserUpkeeps(int userProfileId);
        Upkeep GetUpkeepById(int id);
        void UpdateUpkeep(Upkeep upkeep);
    }
}