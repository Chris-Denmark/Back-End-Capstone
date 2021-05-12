import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  CardTitle,
  Label,
  Input,
  Button,
} from "reactstrap";
import moment from "moment";
import { UpkeepContext } from "../../providers/UpkeepProvider";
import { BoardContext } from "../../providers/BoardProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory, useParams } from 'react-router-dom';
import { CardHeader } from "reactstrap";


const UpkeepEdit = () => {

  const { updateUpkeep, getUpkeepById } = useContext(UpkeepContext) // Grabbing UpkeepContext to gain access to the updateUpkeep and getUpkeepById methods
  const { userBoards, getUserBoards } = useContext(BoardContext) // Grabbing BoardContext to gain access to the userBoards array and getUserBoards method
  const { categories, getAllCategories } = useContext(CategoryContext); // Grabbing the CategoryContext to gain access to the categories array and the getAll Categories method.
  const { id } = useParams(); // Grabbing the ID with params
  const [upkeep, setUpkeep] = useState({ board: { name: "" } }); // Local state used to set the upkeep object so it can be manipulated
  const history = useHistory(); // Use history to push the user to a different view

  // form field states
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dateCompleted, setDateCompleted] = useState("");
  const [board, setBoard] = useState("");


  // Onload useEffect to grab the proper upkeep to edit by ID
  useEffect(() => {
    getUpkeepById(id).then(setUpkeep)
      .then(getAllCategories)
      .then(getUserBoards)
  }, []);

  // Once the upkeep has been set in state, update the form with previous upkeep info
  useEffect(() => {

    setDescription(upkeep.description)
    setCategory(upkeep.categoryId)
    setDateCompleted(upkeep.dateCompleted)
    setBoard(upkeep.boardId)
  }, [upkeep])

  // Submit button functionality for the form
  const submit = (e) => {
    // Creating new upkeep object
    const updatedUpkeep = {
      ...upkeep
    };

    // Adding the key/value pairs to the new upkeep object
    updatedUpkeep.description = description
    updatedUpkeep.categoryId = category
    updatedUpkeep.dateCompleted = dateCompleted
    updatedUpkeep.boardId = board

    // Update the database with the new upkeep
    updateUpkeep(updatedUpkeep).then((u) => {
      // Navigate the user back to the upkeep list route
      history.push(`/upkeeps`);
    });
  };

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
            <Label><strong>Upkeep Record for {upkeep.board.name}</strong></Label>
            <Form>
              <FormGroup>
                <Label for="description">Description:</Label>
                <Input id="description" onChange={(e) => setDescription(e.target.value)} value={description} />
              </FormGroup>
              <FormGroup>
                <Label for="category">Category:</Label><br></br>
                <select id="category" value={upkeep.categoryId} onChange={(e) => setCategory(e.target.value)}>
                  <option value="0">Select a Category</option>
                  {
                    categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))
                  }
                </select>
              </FormGroup>
              <FormGroup>
                <Label for="dateCompleted">Date Completed:</Label><br></br>
                <Input type="date" id="dateCompleted" value={moment(dateCompleted).format(`yyyy-MM-DD`)} onChange={(e) => setDateCompleted(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="board">Board:</Label><br></br>
                <select id="board" value={upkeep.boardId} onChange={(e) => setBoard(e.target.value)}>
                  <option value="0">Select a Board</option>
                  {
                    userBoards.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.name}
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

export default UpkeepEdit;
