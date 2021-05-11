import React, { useEffect, useContext, useState } from "react";
import { UpkeepContext } from '../../providers/UpkeepProvider';
import Upkeep from "./Upkeep";

const UserUpkeeps = () => {

  const { userUpkeeps, getUserUpkeeps } = useContext(UpkeepContext);

  useEffect(() => {
    getUserUpkeeps();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {
            userUpkeeps.map(upkeep => {
              return <Upkeep key={upkeep.id} upkeep={upkeep} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default UserUpkeeps;