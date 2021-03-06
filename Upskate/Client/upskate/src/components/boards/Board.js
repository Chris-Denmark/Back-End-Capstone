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
import { BoardContext } from "../../providers/BoardProvider";

const Board = ({ board }) => {
  const { deleteBoard, getUserBoards } = useContext(BoardContext); // Uses BoardContext to get access to the methods created in the provider.

  // This is returning JSON
  const userProfile = sessionStorage.getItem("userProfile");
  // Parsing the JSON returned above into an object so we can use it
  var currentUser = JSON.parse(userProfile);

  const history = useHistory();

  // When the Edit button is clicked and this function runs it pushes the user to the url for editing a board.
  const editBoard = () => {
    history.push(`/board/edit/${board.id}`);
  };

  // When the delete button is selected and this function runs the deleteBoard function by passing the board Id 
  // through it and then getting all of the Users boards and then pushes the user to the URL for viewing the users boards
  const handleDeleteBoard = (boardName) => {
    if (window.confirm(`Are you sure you want to delete ${boardName}?`)) {
      deleteBoard(board.id).then(getUserBoards);
      history.push(`/myboards/${currentUser.id}`);
    }
  };

  if (currentUser.id === board.userProfileId) {
    return (
      <Card className="m-4">
        <CardBody>
          <CardTitle tag="h2">
            <strong> {board.name}</strong>
          </CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Owner: {board.userProfile.displayName}
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Board Type: {board.boardType.name}
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Deck Material: {board.deckMaterial.name}
          </CardSubtitle>
          <div style={{ float: "right" }}>
            <Button onClick={editBoard}>Edit</Button>
            <Button
              color="danger"
              onClick={() => handleDeleteBoard(board.name)}
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
          {/* The route to post details is here */}
          <strong> {board.name}</strong>
        </CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Owner: {board.userProfile.displayName}
        </CardSubtitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Deck Material: {board.deckMaterial.name}
        </CardSubtitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Board Type: {board.boardType.name}
        </CardSubtitle>
      </CardBody>
    </Card>
  );
};

export default Board;
