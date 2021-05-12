import React, { useEffect, useContext, useState } from "react";
import { BoardContext } from '../../providers/BoardProvider';
import Board from "./Board";

const UserBoards = () => {
  const { userBoards, getUserBoards } = useContext(BoardContext); // Uses BoardContext to get acces to the userBoards array and the getUserBoards method.

  useEffect(() => {
    getUserBoards();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {
            userBoards.map(board => {
              return <Board key={board.id} board={board} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default UserBoards;