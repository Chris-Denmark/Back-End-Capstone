using System.Collections.Generic;
using Upskate.Models;

namespace Upskate.Repositories
{
    public interface IBoardTypeRepository
    {
        List<BoardType> GetAllBoardTypes();
    }
}