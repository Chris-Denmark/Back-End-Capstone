import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Hello from "./Hello";
import Login from "./Login";
import Register from "./Register";
import UserBoards from "./boards/UserBoards";
import BoardEdit from "./boards/BoardEdit";



export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path={`/myboards/:id`}>
          <UserBoards />
        </Route>

        <Route path={`/board/edit/:id`}>
          <BoardEdit />
        </Route>
      </Switch>
    </main>
  );
};
