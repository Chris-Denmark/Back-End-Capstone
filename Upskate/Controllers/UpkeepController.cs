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
    public class UpkeepController : ControllerBase
    {
        private readonly IUpkeepRepository _upkeepRepository;
        public UpkeepController(IUpkeepRepository upkeepRepository)
        {
            _upkeepRepository = upkeepRepository;

        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var upkeep = _upkeepRepository.GetUpkeepById(id);


            return Ok(upkeep);

        }

        [HttpPost]
        public IActionResult Post(Upkeep upkeep)
        {
            _upkeepRepository.AddUpkeep(upkeep);
            return CreatedAtAction("Get", new { id = upkeep.Id }, upkeep);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Upkeep upkeep)
        {
            //if(id != board.UserProfileId)
            //{
            //    return BadRequest();
            //}

            _upkeepRepository.UpdateUpkeep(upkeep);
            return NoContent();
        }

        [HttpGet("GetAllUpkeepsByUserId")]
        public IActionResult GetAllUpkeepsByUserId(int id)
        {
            var upkeeps = _upkeepRepository.GetCurrentUserUpkeeps(id);
            return Ok(upkeeps);

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _upkeepRepository.DeleteUpkeep(id);
            return NoContent();
        }
    }
}
