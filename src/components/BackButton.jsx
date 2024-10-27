import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutUser } = useUser();


  const logout = () => {
    logoutUser();
    navigate('/login', { replace: true });
  }

  const goback = () => {
    navigate(-1);
  }


  return (
    <button
      onClick={location.pathname == "/dashboard" ? logout : goback}
      className="bg-electricBlue text-darkCharcoal py-2 px-4 rounded-lg font-bold hover:bg-cyberYellow transition duration-300"
    >
      {location.pathname == "/dashboard" ? "Logout" : "Back"}
    </button>
  );
};

export default BackButton;
