import { UserContext } from "./UserContext";
import { useState } from "react";

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({ id: null, email: null, username: null });
  
    // Function to update the user information
    const loginUser = (id, email, username) => {
      setUser({ id, email, username });
    };
  
    const logoutUser = () => {
      setUser({ id: null, email: null, username: null });
    };
  
    return (
      <UserContext.Provider value={{ user, loginUser, logoutUser }}>
        {children}
      </UserContext.Provider>
    );
    };