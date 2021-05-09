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
  const { deleteBoard, getAllBoards } = useContext(BoardContext);

  // This is returning JSON
  const userProfile = sessionStorage.getItem("userProfile");
  // Parsing the JSON returned above into an object so we can use it
  var currentUser = JSON.parse(userProfile);

  const history = useHistory();

  const editBoard = () => {
    history.push(`/board/edit/${board.id}`);
  };

  const handleDeleteBoard = (boardName) => {
    if (window.confirm(`Are you sure you want to delete ${boardName}?`)) {
      deleteBoard(board.id).then(getAllBoards);
      history.push("/boards");
    }
  };

  if (currentUser.id === board.userProfileId) {
    return (
      <Card className="m-4">
        <CardBody>
          <Link className="postLink" to={`/board/${board.id}`}>
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
          </Link>
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
      <Link className="postLink" to={`/board/${board.id}`}>
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
      </Link>
    </Card>
  );
};

export default Board;
