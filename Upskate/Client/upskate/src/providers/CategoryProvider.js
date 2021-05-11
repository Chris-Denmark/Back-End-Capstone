import React, { useState, useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const apiUrl = "/api/category";
  const [categories, setCategories] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const getAllCategories = () => {
    return getToken().then((token) =>
      fetch("/api/category", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      })
        .then((res) => res.json())
        .then(setCategories))
  }

  const getCategoryById = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      })
        .then((res) => res.json()))
  }

  return (
    <CategoryContext.Provider value={{ categories, setCategories, getAllCategories, getCategoryById }}>
      {props.children}
    </CategoryContext.Provider>
  )
}