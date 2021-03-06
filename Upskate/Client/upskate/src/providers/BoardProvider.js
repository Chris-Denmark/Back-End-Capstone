import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const BoardContext = React.createContext();

export const BoardProvider = (props) => {
  const apiUrl = "/api/board";
  const [boards, setBoards] = useState([]);
  const [userBoards, setUserBoards] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const getAllBoards = () => {
    return getToken().then((token) =>
      fetch("/api/Board", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => res.json())
        .then(setBoards))
  }

  const getUserBoards = () => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/GetAllBoardsByUserId`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => res.json()))
      .then(setUserBoards)
  }

  const addBoard = (board) => {
    return getToken().then((token) =>
      fetch("/api/board", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(board),
      })
        .then((res) => res.json()))
  }

  const updateBoard = (board) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${board.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(board)
      }))
  }

  const getBoardById = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => {
          return res.json()
        }

        ));
  }

  const deleteBoard = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  return (
    <BoardContext.Provider value={{ boards, setBoards, userBoards, getAllBoards, getUserBoards, getBoardById, updateBoard, deleteBoard, addBoard }}>
      {props.children}
    </BoardContext.Provider>
  )
}
