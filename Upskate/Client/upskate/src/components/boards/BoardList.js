import React, { useContext, useEffect } from "react";
import { BoardContext } from '../../providers/BoardProvider';
import Board from "./Board";

const BoardList = () => {
  const { boards, getAllBoards } = useContext(BoardContext);

  useEffect(() => {
    getAllBoards();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {boards.map((board) => (
            <Board key={board.id} board={board} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardList;
