import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const DeckMaterialContext = React.createContext();

export const DeckMaterialProvider = (props) => {
  const apiUrl = "/api/board";
  const [deckMaterials, setDeckMaterials] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const getAllDeckMaterials = () => {
    return getToken().then((token) =>
      fetch("/api/deckMaterial", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => res.json())
        .then(setDeckMaterials))
  }

  return (
    <DeckMaterialContext.Provider value={{ deckMaterials, setDeckMaterials, getAllDeckMaterials }}>
      {props.children}
    </DeckMaterialContext.Provider>
  )
}