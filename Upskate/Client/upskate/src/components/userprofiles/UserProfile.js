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

const UserProfile = () => {
  const { deleteUserProfile, getUserProfileById, logout } = useContext(UserProfileContext);
  const [profile, setProfile] = useState({});
  const history = useHistory();

  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);

  useEffect(() => {
    getUserProfileById().then(setProfile);
  }, []);

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
            {/* The route to post details is here */}
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
