import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button,
} from "reactstrap";
import { BoardContext } from '../../providers/BoardProvider';
import { useHistory, useParams } from "react-router-dom";

const BoardEdit = () => {

  const { updateBoard, getBoardById } = useContext(BoardContext) // Grabbing BoardContext to gain access to the updateBoard and getBoardById methods
  const { id } = useParams(); // Grabbing the ID with params
  const [board, setBoard] = useState({}); // Local state used to set the post object so it can be manipulated
  const history = useHistory(); // Use history to push the user to a different view

  // form field states
  const [name, setName] = useState("");
  const [boardType, setBoardType] = useState("");
  const [deckMaterial, setDeckMaterial] = useState("");

  // This is returning JSON
  const userProfile = sessionStorage.getItem("userProfile");
  // Parsing the JSON returned above into an object so we can use it
  var currentUser = JSON.parse(userProfile)

  // Onload useEffect to grab the proper board to edit by ID
  useEffect(() => {
    getBoardById(id).then(setBoard)
      .then(getAllBoardTypes)
      .then(getAllDeckMaterials)
  }, []);

  // Once the post has been set in state, update the form with previous post info
  useEffect(() => {

    setName(board.name)
    setBoardType(board.boardType)
    setDeckMaterial(board.deckMaterial)
  }, [board])

  // Submit button functionality for the form
  const submit = (e) => {
    // Creating new board object
    const updatedBoard = {
      ...board
    };

    // Adding the key/value pairs to the new board object
    updatedBoard.name = name
    updatedBoard.boardType = boardType
    updatedBoard.deckMaterial = deckMaterial

    // Update the database with the new board
    updateBoard(updatedBoard).then((b) => {
      // Navigate the user back to the home route
      history.push(`/boards/${id}`);
    });
  };

  // Check if board is null and make sure current user owns the post
  if (board === null || currentUser.id !== board.userProfileId) {
    return null
  }

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input id="name" onChange={(e) => setName(e.target.value)} value={name} />
              </FormGroup>
              <FormGroup>
                <Label for="boardType">Board Type</Label><br></br>
                <select id="boardType" onChange={(e) => setBoardType(e.target.value)}>
                  <option value="0">Select a board type </option>
                  {
                    boardTypes.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))
                  }
                </select>
              </FormGroup>
              <FormGroup>
                <Label for="boardType">Deck Material</Label><br></br>
                <select id="boardType" onChange={(e) => setDeckMaterial(e.target.value)}>
                  <option value="0">Select a Deck Material </option>
                  {
                    deckMaterials.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))
                  }
                </select>
              </FormGroup>
            </Form>
            <Button color="info" onClick={submit}>
              SUBMIT
                    </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default BoardEdit;
