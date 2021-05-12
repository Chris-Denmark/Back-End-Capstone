import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Hello from "./Hello";
import Login from "./Login";
import Register from "./Register";
import UserBoards from "./boards/UserBoards";
import BoardEdit from "./boards/BoardEdit";
import BoardList from "./boards/BoardList";
import BoardForm from "./boards/BoardForm";
import UserProfile from "./userprofiles/UserProfile";
import UpkeepForm from "./upkeeps/UpkeepForm";
import UserUpkeeps from "./upkeeps/UserUpkeepList";
import UpkeepEdit from "./upkeeps/UpkeepEdit";



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

        <Route path="/boards" exact>
          <BoardList />
        </Route>

        <Route path="/board/add" exact>
          <BoardForm />
        </Route>

        <Route path="/userprofile" exact>
          <UserProfile />
        </Route>

        <Route path="/upkeep/add" exact>
          <UpkeepForm />
        </Route>

        <Route path="/upkeeps" exact>
          <UserUpkeeps />
        </Route>

        <Route path={`/upkeep/edit/:id`}>
          <UpkeepEdit />
        </Route>

      </Switch>
    </main>
  );
};
