using System.Collections.Generic;
using Upskate.Models;

namespace Upskate.Repositories
{
    public interface IBoardRepository
    {
        int AddBoard(Board board);
        void DeleteBoard(int id);
        List<Board> GetAllBoards();
        Board GetBoardById(int id);
        List<Board> GetCurrentUserBoards(int userProfileId);
        void UpdateBoard(Board board);
    }
}