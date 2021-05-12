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
import { UpkeepContext } from "../../providers/UpkeepProvider";
import { BoardContext } from "../../providers/BoardProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory } from 'react-router-dom';
import { CardHeader } from "reactstrap";

export const UpkeepForm = () => {
  const { addUpkeep, getUserUpkeeps } = useContext(UpkeepContext); // Grabbing the UpkeepContext to get access to the addUpkeep and getUserUpkeeps methods.
  const { userBoards, getUserBoards } = useContext(BoardContext); // Grabbing the BoardContext to get access to the userBoards array and the getUserBoards method.
  const { categories, getAllCategories } = useContext(CategoryContext); // Grabbing the CategoryContext to get access to the categories array and the getAllCategories method.

  const history = useHistory();

  // Set the initial state for the upkeep.
  const [upkeep, setUpkeep] = useState({
    description: "",
    categoryId: "",
    dateCompleted: "",
    boardId: ""
  });


  const [isLoading, setIsLoading] = useState(false);

  // Updates the upkeep object any time the state of one of the form elements change.
  const handleControlledInputChange = (event) => {
    const newUpkeep = { ...upkeep }

    newUpkeep[event.target.id] = event.target.value
    setUpkeep(newUpkeep)
  }

  // Runs on initial render to get all of the categories and current users boards for the form drop downs.
  useEffect(() => {
    getAllCategories()
      .then(getUserBoards())
  }, [])

  // Handle clicking the save button and updating the initial upkeep object with the info from the form, then checking all the fields to make sure they have information in them.
  const handleClickSaveUpkeep = () => {

    const description = upkeep.description
    const categoryId = upkeep.categoryId
    const dateCompleted = upkeep.dateCompletedId
    const boardId = upkeep.boardId


    if (description === "") {
      window.alert("Please type in a description of the upkeep")
    }

    else if (categoryId === "") {
      window.alert("Please select a category")
    }

    else if (boardId === "") {
      window.alert("Please select a board")
    }

    else {
      setIsLoading(true);

      addUpkeep({
        description: upkeep.description,
        categoryId: upkeep.categoryId,
        dateCompleted: upkeep.dateCompleted,
        boardId: upkeep.boardId
      })
        .then(getUserUpkeeps)
        .then(history.push(`/upkeeps`))
    }
  }

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <h2 className="upkeepForm__title">Add new upkeep record</h2>
        </CardHeader>
        <CardBody>
          <Form className="upkeepForm">
            <FormGroup>
              <Label for="description">Description: </Label>
              <Input
                type="text"
                id="description"
                onChange={handleControlledInputChange}
                required
                autoFocus
                className="form-control"
                placeholder="description"
                value={upkeep.description}
              />
            </FormGroup>
            <Col>
              <FormGroup>
                <Label for="categoryId">Category: </Label>
                <select
                  value={upkeep.categoryId}
                  id="categoryId"
                  className="form-control"
                  onChange={handleControlledInputChange}
                >
                  <option value="0">
                    Select a category
                                    </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="dateCompleted">
                  Date Completed:
                </Label>
                <Input
                  type="date"
                  id="dateCompleted"
                  onChange={handleControlledInputChange}
                  required
                  className="form-control"
                  placeholder="Date Completed"
                  value={upkeep.dateCompleted}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="boardId">Board: </Label>
                <select
                  value={upkeep.boardId}
                  id="boardId"
                  className="form-control"
                  onChange={handleControlledInputChange}
                >
                  <option value="0">
                    Select a board
                                    </option>
                  {userBoards.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
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
              handleClickSaveUpkeep();
            }}
          >
            Add Upkeep Record
                </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default UpkeepForm;
