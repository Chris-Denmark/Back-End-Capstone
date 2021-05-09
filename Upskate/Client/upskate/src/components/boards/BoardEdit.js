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
import { BoardTypeContext } from "../../providers/BoardTypeProvider"
import { DeckMaterialContext } from "../../providers/DeckMaterialProvider"

const BoardEdit = () => {

  const { updateBoard, getBoardById } = useContext(BoardContext) // Grabbing BoardContext to gain access to the updateBoard and getBoardById methods
  const { boardTypes, getAllBoardTypes } = useContext(BoardTypeContext);
  const { deckMaterials, getAllDeckMaterials } = useContext(DeckMaterialContext);
  const { id } = useParams(); // Grabbing the ID with params
  const [board, setBoard] = useState({}); // Local state used to set the post object so it can be manipulated
  const history = useHistory(); // Use history to push the user to a different view

  // form field states
  const [name, setName] = useState("");
  const [boardType, setBoardType] = useState("");
  const [deckMaterial, setDeckMaterial] = useState("");

  // Onload useEffect to grab the proper board to edit by ID
  useEffect(() => {
    getBoardById(id).then(setBoard)
      .then(getAllBoardTypes)
      .then(getAllDeckMaterials)
  }, []);

  // Once the board has been set in state, update the form with previous board info
  useEffect(() => {

    setName(board.name)
    setBoardType(board.boardTypeId)
    setDeckMaterial(board.deckMaterialId)
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
      history.push(`/board/${id}`);
    });
  };

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
                    boardTypes.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.name}
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
