import React, { useContext, useEffect, useState } from "react"
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";
import { BoardContext } from "../../providers/BoardProvider"
import { BoardTypeContext } from "../../providers/BoardTypeProvider"
import { DeckMaterialContext } from "../../providers/DeckMaterialProvider"
import { useHistory } from 'react-router-dom';
import { CardHeader } from "reactstrap";

export const BoardForm = () => {
  const { addBoard, getAllBoards } = useContext(BoardContext); // Grabbing BoardContext to gain access to the addBoard and getAllBoards methods.
  const { boardTypes, getAllBoardTypes } = useContext(BoardTypeContext); // Grabbing BoardTypeContext to gain access to the boardTypes array and getAllBoardTypes method.
  const { deckMaterials, getAllDeckMaterials } = useContext(DeckMaterialContext); // Grabbing DeckMaterialContext to gain access to the deckMaterials array and getAllDeckMaterials method.
  const history = useHistory();
  // This is returning JSON
  const userProfile = sessionStorage.getItem("userProfile");
  // Parsing the JSON returned above into an object so we can use it
  var currentUser = JSON.parse(userProfile)

  // Set the initial state for the post.
  const [board, setBoard] = useState({
    name: "",
    typeId: "",
    deckMaterialId: "",
  });


  const [isLoading, setIsLoading] = useState(false);
  const [boardObj, setBoardObj] = useState({});

  // Creates and updates a new board object as the input fields on the form are updated with information.
  const handleControlledInputChange = (event) => {
    const newBoard = { ...board }

    newBoard[event.target.id] = event.target.value
    setBoard(newBoard)
  }

  // Runs when the initial state of the board object is set to get all of the board types and deck materials for the drop downs. 
  useEffect(() => {
    getAllBoardTypes()
      .then(getAllDeckMaterials())
  }, [board])

  // Handle clicking the save button and updating the initial board object with the info from the form, then checking all the fields to make sure they have information in them.
  const handleClickSaveBoard = () => {

    const name = board.name
    const boardTypeId = board.boardTypeId
    const deckMaterialId = board.deckMaterialId


    if (name === "") {
      window.alert("Please type in name of board")
    }

    else if (boardTypeId === "") {
      window.alert("Please select a board type")
    }

    else if (deckMaterialId === "") {
      window.alert("Please select a deck material")
    }

    else {
      setIsLoading(true);

      addBoard({
        name: board.name,
        boardTypeId: board.boardTypeId,
        deckMaterialId: board.deckMaterialId,
      })
        .then(setBoardObj)
        .then(() => setIsLoading(false))
        .then(getAllBoards)
    }
  }

  // Runs when the board object is created and checks that the id property is above 0 then pushes the user to the list of the users boards.
  useEffect(() => {
    if (boardObj.id > 0) {
      history.push(`/myboards/${currentUser.id}`);
    }
  }, [boardObj])

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <h2 className="boardForm__title">Add new board</h2>
        </CardHeader>
        <CardBody>
          <Form className="boardForm">
            <FormGroup>
              <Label for="name">Name: </Label>
              <Input
                type="text"
                id="name"
                onChange={handleControlledInputChange}
                required
                autoFocus
                className="form-control"
                placeholder="Name"
                value={board.name}
              />
            </FormGroup>
            <Col>
              <FormGroup>
                <Label for="boardTypeId">Board Type: </Label>
                <select
                  value={board.boardTypeId}
                  id="boardTypeId"
                  className="form-control"
                  onChange={handleControlledInputChange}
                >
                  <option value="0">
                    Select a board type
                                    </option>
                  {boardTypes.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="deckMaterialId">Deck Material: </Label>
                <select
                  value={board.deckMaterialId}
                  id="deckMaterialId"
                  className="form-control"
                  onChange={handleControlledInputChange}
                >
                  <option value="0">
                    Select a deck material
                                    </option>
                  {deckMaterials.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>
          </Form>
          <Button
            color="info"
            disabled={isLoading}
            onClick={(event) => {
              event.preventDefault();
              handleClickSaveBoard();
            }}
          >
            Add board
                </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default BoardForm;
