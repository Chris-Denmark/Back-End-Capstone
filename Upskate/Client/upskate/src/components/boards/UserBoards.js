import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from '../../providers/BoardProvider';
import Board from "./Board";

const UserBoards = () => {

  const [userBoards, setUserBoards] = useState();
  const { getUserBoards } = useContext(BoardContext);
  const { id } = useParams();

  useEffect(() => {
    getUserBoards(id).then(setUserBoards);
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {
            userBoards ?
              userBoards.map(board => {
                return <Board key={board.id} board={board} />
              })
              : null
          }
        </div>
      </div>
    </div>
  )
}

export default UserBoards;