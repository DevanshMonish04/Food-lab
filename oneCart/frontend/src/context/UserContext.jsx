import React, { useState, useEffect, useContext, createContext, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

// Create UserContext
export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { serverUrl } = useContext(AuthContext);

  const getCurrentUser = async () => {
    if (!serverUrl) return;
    setLoading(true);
    try {
      const result = await axios.get(`${serverUrl}/api/users/getcurrentuser`, {
        withCredentials: true,
      });
      setUserData(result.data);
    } catch (error) {
      setUserData(null);
      console.error("Error fetching current user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [serverUrl]);

  const value = useMemo(
    () => ({ userData, setUserData, getCurrentUser, loading }),
    [userData, loading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
