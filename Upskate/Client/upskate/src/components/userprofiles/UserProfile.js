import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";

// Creates the user profile card and handles the deletion for a user.
const UserProfile = () => {
  const { deleteUserProfile, getUserProfileById, logout } = useContext(UserProfileContext); // Grabbing the UserProfileContext to get access to the deleteUserProfile, getUserProfileById, and logout methods.
  const [profile, setProfile] = useState({}); // Sets the state of profile to an object.

  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);

  // useEffect that gets user profile by id and then sets that profile to the state on initial render
  useEffect(() => {
    getUserProfileById().then(setProfile);
  }, []);

  // Handles deleting the user by having the user confirm the deletion then deleting the user by their id and 
  // then running logout to clear session storage and return the user to the login screen.
  const handleDeleteUser = (displayName) => {
    if (window.confirm(`Are you sure you want to delete ${displayName}?`)) {
      deleteUserProfile(profile.id)
        .then(logout)
    }
  };

  return (
    <>

      <Card className="m-4">
        <CardBody>
          <CardTitle tag="h2">
            <strong> {profile.displayName}</strong>
          </CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Email: {profile.email}
          </CardSubtitle>
          <div style={{ float: "right" }}>
            <Button
              color="danger"
              onClick={() => handleDeleteUser(profile.displayName)}
            >
              Delete
                      </Button>
          </div>
        </CardBody>
      </Card>
    </>
  )

}

export default UserProfile;
