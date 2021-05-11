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
import { UpkeepContext } from "../../providers/UpkeepProvider";

const Upkeep = ({ upkeep }) => {
  const { deleteUpkeep, getUserUpkeeps } = useContext(UpkeepContext);

  // This is returning JSON
  const userProfile = sessionStorage.getItem("userProfile");
  // Parsing the JSON returned above into an object so we can use it
  var currentUser = JSON.parse(userProfile);

  const history = useHistory();

  const editUpkeep = () => {
    history.push(`/upkeep/edit/${upkeep.id}`);
  };

  const handleDeleteUpkeep = (boardName) => {
    if (window.confirm(`Are you sure you want to delete this upkeep record for ${boardName}?`)) {
      deleteUpkeep(upkeep.id).then(getUserUpkeeps);
    }
  };

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
            Date Completed: {upkeep.dateCompleted}
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
          Date Completed: {upkeep.dateCompleted}
        </CardSubtitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Board Owner: {upkeep.userProfile.displayName}
        </CardSubtitle>
      </CardBody>
    </Card>
  );
};

export default Upkeep;
