using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Upskate.Models;
using Upskate.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Upskate.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UpkeepController : ControllerBase
    {
        private readonly IUpkeepRepository _upkeepRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public UpkeepController(IUpkeepRepository upkeepRepository, IUserProfileRepository userProfileRepository)
        {
            _upkeepRepository = upkeepRepository;
            _userProfileRepository = userProfileRepository;

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
            var currentUserProfile = GetCurrentUserProfile();
            upkeep.UserProfileId = currentUserProfile.Id;
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
        public IActionResult GetAllUpkeepsByUserId()
        {
            UserProfile user = GetCurrentUserProfile();
            return Ok(_upkeepRepository.GetCurrentUserUpkeeps(user.Id));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _upkeepRepository.DeleteUpkeep(id);
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
