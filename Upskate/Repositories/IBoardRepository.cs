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
        List<Board> GetBoardByBoardTypeId(int id);
        void UpdateBoard(Board board);
    }
}