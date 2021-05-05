using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Upskate.Models;

namespace Upskate.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void DeleteUserProfile(int id);

        //void DeactivateUserById(int id);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        //List<UserProfile> GetDeactivatedUserProfiles();
        UserProfile GetUserProfileById(int id);
        List<UserProfile> GetUserProfiles();
        //void ReactivateUserById(int id);
    }
}
