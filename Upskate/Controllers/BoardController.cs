using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using Upskate.Models;
using Upskate.Repositories;

namespace Upskate.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BoardController : ControllerBase
    {
        private readonly IBoardRepository _boardRepository;
        public BoardController(IBoardRepository boardRepository)
        {
            _boardRepository = boardRepository;

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
            var boards = _boardRepository.GetCurrentUserBoards(id);
            return Ok(boards);

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _boardRepository.DeleteBoard(id);
            return NoContent();
        }
    }
}
