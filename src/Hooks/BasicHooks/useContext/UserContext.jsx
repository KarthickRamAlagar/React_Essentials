import { createContext, useEffect, useState } from "react";

// Creating the Context
export const UserContext = createContext();

//Creating the Provider
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // Loading Local Storage Data on Component Mount
  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("UserData")));
  }, []);

  // Storing Local Storage for more presistence
  useEffect(() => {
    localStorage.setItem("UserData", JSON.stringify(users));
  }, [users]);

  // Add User global Function
  const addUser = (userData) => {
    setUsers((prev) => [...prev, userData]);
  };

  // Delete User Global Function
  const deleteUser = (index) => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  };

  // Update User Global Function
  const updateUser = (newData, index) => {
    setUsers((prev) => prev.map((user, i) => (i === index ? newData : user)));
  };

  //Provide Values to the Children
  return (
    <UserContext.Provider
      value={{ users, setUsers, addUser, deleteUser, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
