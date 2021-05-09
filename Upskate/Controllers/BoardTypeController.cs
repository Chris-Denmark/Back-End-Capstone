using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Upskate.Models;
using Upskate.Repositories;

namespace Upskate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardTypeController : ControllerBase
    {
        private readonly IBoardTypeRepository _boardTypeRepository;
        public BoardTypeController(IBoardTypeRepository boardTypeRepository )
        {
            _boardTypeRepository = boardTypeRepository;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var boardTypes = _boardTypeRepository.GetAllBoardTypes();

            return Ok(boardTypes);
        }
    }
}
