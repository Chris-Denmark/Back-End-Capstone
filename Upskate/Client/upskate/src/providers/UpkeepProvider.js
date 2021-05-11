import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const UpkeepContext = React.createContext();

export const UpkeepProvider = (props) => {
  const apiUrl = "/api/upkeep";
  const [upkeeps, setUpkeeps] = useState([]);
  const [userUpkeeps, setUserUpkeeps] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const getAllUpkeeps = () => {
    return getToken().then((token) =>
      fetch("/api/upkeep", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => res.json())
        .then(setUpkeeps))
  }

  const getUserUpkeeps = () => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/GetAllUpkeepsByUserId`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => res.json()))
      .then(setUserUpkeeps)
  }

  const addUpkeep = (upkeep) => {
    return getToken().then((token) =>
      fetch("/api/upkeep", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(upkeep),
      })
        .then((res) => res.json()))
  }

  const updateUpkeep = (upkeep) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${upkeep.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(upkeep)
      }))
  }

  const getUpkeepById = (id) => {
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

  const deleteUpkeep = (id) => {
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
    <UpkeepContext.Provider value={{ upkeeps, setUpkeeps, userUpkeeps, getAllUpkeeps, getUserUpkeeps, getUpkeepById, updateUpkeep, deleteUpkeep, addUpkeep }}>
      {props.children}
    </UpkeepContext.Provider>
  )
}