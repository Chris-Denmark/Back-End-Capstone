using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using Upskate.Models;
using Upskate.Repositories;
using System.Security.Claims;

namespace Upskate.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BoardController : ControllerBase
    {
        private readonly IBoardRepository _boardRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public BoardController(IBoardRepository boardRepository, IUserProfileRepository userProfileRepository)
        {
            _boardRepository = boardRepository;
            _userProfileRepository = userProfileRepository;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var boards = _boardRepository.GetAllBoards();

            return Ok(boards);
        }



        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var board = _boardRepository.GetBoardById(id);
            return Ok(board);

        }

        [HttpPost]
        public IActionResult Post(Board board)
        {
            var currentUserProfile = GetCurrentUserProfile();
            board.UserProfileId = currentUserProfile.Id;
            _boardRepository.AddBoard(board);
            return CreatedAtAction("Get", new { id = board.Id }, board);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Board board)
        {
            //if(id != board.UserProfileId)
            //{
            //    return BadRequest();
            //}

            _boardRepository.UpdateBoard(board);
            return NoContent();
        }

        [HttpGet("GetAllBoardsByUserId")]
        public IActionResult GetAllBoardsByUserId(int id)
        {
            UserProfile user = GetCurrentUserProfile();
            return Ok(_boardRepository.GetCurrentUserBoards(user.Id));

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _boardRepository.DeleteBoard(id);
            return NoContent();
        }

        // Retrieves the current user object by using the provided firebaseId
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
