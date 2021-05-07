using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using Upskate.Models;
using Upskate.Repositories;

namespace Upskate.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            var profile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            return Ok(profile);
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpGet]
        public IActionResult Get()
        {
            var profiles = _userProfileRepository.GetUserProfiles();
            return Ok(profiles);
        }

        [HttpGet("GetUserProfileById/{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_userProfileRepository.GetUserProfileById(id));
        }

        [HttpDelete("DeleteUserProfile/{id}")]
        public IActionResult Delete(int id)
        {
            _userProfileRepository.DeleteUserProfile(id);
            return NoContent();
        }
    }
}
