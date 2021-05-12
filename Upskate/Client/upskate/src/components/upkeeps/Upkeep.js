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
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { UpkeepContext } from "../../providers/UpkeepProvider";

// Creates the upkeep card to pass data into as well as handles the deletion of upkeeps and routes to the editing page.
const Upkeep = ({ upkeep }) => {
  const { deleteUpkeep, getUserUpkeeps } = useContext(UpkeepContext);

  // This is returning JSON
  const userProfile = sessionStorage.getItem("userProfile");
  // Parsing the JSON returned above into an object so we can use it
  var currentUser = JSON.parse(userProfile);

  const history = useHistory();

  // when this function is run it pushes the user to the url for editing an upkeep.
  const editUpkeep = () => {
    history.push(`/upkeep/edit/${upkeep.id}`);
  };

  // When this function is run it has the user confirm a delete for the selected upkeep and then gets the current users 
  // upkeeps events and sets them to state using the getUserUpkeeps function from the provider.
  const handleDeleteUpkeep = (boardName) => {
    if (window.confirm(`Are you sure you want to delete this upkeep record for ${boardName}?`)) {
      deleteUpkeep(upkeep.id).then(getUserUpkeeps);
    }
  };

  // If the upkeep in the list belongs to the current user then the card below renders with the edit and delete buttons on it.
  if (currentUser.id === upkeep.userProfileId) {
    return (
      <Card className="m-4">
        <CardBody>
          <CardTitle tag="h2">
            <strong> {upkeep.board.name}</strong>
          </CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Description: {upkeep.description}
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Category: {upkeep.category.name}
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Date Completed: {moment(upkeep.dateCompleted).format(`yyyy-MM-DD`)}
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Board Owner: {upkeep.userProfile.displayName}
          </CardSubtitle>
          <div style={{ float: "right" }}>
            <Button onClick={editUpkeep}>Edit</Button>
            <Button
              color="danger"
              onClick={() => handleDeleteUpkeep(upkeep.board.name)}
            >
              Delete
                      </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  // If the upkeep belongs to anyone other than the current user, this card is rendered.
  return (
    <Card className="m-4">
      <CardBody>
        <CardTitle tag="h2">
          <strong> {upkeep.board.name}</strong>
        </CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Description: {upkeep.description}
        </CardSubtitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Category: {upkeep.category.name}
        </CardSubtitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Date Completed: {moment(upkeep.dateCompleted).format(`yyyy-MM-DD`)}
        </CardSubtitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Board Owner: {upkeep.userProfile.displayName}
        </CardSubtitle>
      </CardBody>
    </Card>
  );
};

export default Upkeep;
