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
        public IActionResult GetUserProfileById()
        {
            var currentUserProfile = GetCurrentUserProfile();
            int userId = currentUserProfile.Id;
            var userProfile = _userProfileRepository.GetUserProfileById(userId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpDelete("DeleteUserProfile/{id}")]
        public IActionResult Delete(int id)
        {
            _userProfileRepository.DeleteUserProfile(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
