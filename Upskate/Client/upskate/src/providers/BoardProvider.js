import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const BoardContext = React.createContext();

export const BoardProvider = (props) => {
  const apiUrl = "/api/board";
  const [boards, setBoards] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const getAllBoards = () => {
    return getToken().then((token) =>
      fetch("/api/board", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => res.json())
        .then(setBoards))
  }

  const getUserBoards = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/GetAllBoardsByUserId?id=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => res.json()));
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
          console.log(res, "response from get")

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
    <BoardContext.Provider value={{ boards, setBoards, getAllBoards, getUserBoards, getBoardById, updateBoard, deleteBoard, addBoard }}>
      {props.children}
    </BoardContext.Provider>
  )
}
