import React, { useEffect, useContext, useState } from "react";
import { UpkeepContext } from '../../providers/UpkeepProvider';
import Upkeep from "./Upkeep";

// Function for listing the current users upkeeps
const UserUpkeeps = () => {

  const { userUpkeeps, getUserUpkeeps } = useContext(UpkeepContext);

  // Runs on the initial render to get all of the current users upkeeps.
  useEffect(() => {
    getUserUpkeeps();
  }, []);

  // Maps over the information in the userUpkeeps array that is provided by the getUserUpkeeps method, and runs 
  //that information through the upkeep card to create a card containing the upkeep details for each upkeep that contains the current users id.
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