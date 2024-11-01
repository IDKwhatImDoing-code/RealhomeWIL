// src/context/AuthContext.jsx

import { createContext, useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser , setCurrentUser ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser  = async () => {
      const user = JSON.parse(localStorage.getItem("user")); // Check local storage
      if (user) {
        setCurrentUser (user); // Set current user if found
      } else {
        try {
          const res = await apiRequest.get("/auth/verify");
          setCurrentUser (res.data); // Set user from server if valid
        } catch (err) {
          setCurrentUser (null); // No valid user
        }
      }
      setLoading(false); // Set loading to false after checking
    };
    verifyUser ();
  }, []);

  const updateUser  = (user) => {
    setCurrentUser (user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Store user in local storage
    } else {
      localStorage.removeItem("user"); // Remove user from local storage on logout
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser , updateUser , loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};