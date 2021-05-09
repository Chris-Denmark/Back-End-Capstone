import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const BoardTypeContext = React.createContext();

export const BoardTypeProvider = (props) => {
  const apiUrl = "/api/board";
  const [boardTypes, setBoardTypes] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const getAllBoardTypes = () => {
    return getToken().then((token) =>
      fetch("/api/boardType", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => res.json())
        .then(setBoardTypes))
  }

  return (
    <BoardTypeContext.Provider value={{ boardTypes, setBoardTypes, getAllBoardTypes }}>
      {props.children}
    </BoardTypeContext.Provider>
  )
}