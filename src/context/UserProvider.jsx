import { UserContext } from "./UserContext";
import { useState } from "react";

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : { id: null, email: null, username: null };
    });
  
    // Function to update the user information
    const loginUser = (id, email, username) => {
        const newUser = { id, email, username };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };
  
    const logoutUser = () => {
      setUser({ id: null, email: null, username: null });
      localStorage.removeItem("user");
    };
  
    return (
      <UserContext.Provider value={{ user, loginUser, logoutUser }}>
        {children}
      </UserContext.Provider>
    );
    };