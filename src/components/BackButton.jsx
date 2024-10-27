// BackButton.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location)
  return (
    <button
      onClick={() => navigate(-1)}
      className="bg-electricBlue text-darkCharcoal py-2 px-4 rounded-lg font-bold hover:bg-cyberYellow transition duration-300"
    >
      {location.pathname == "/dashboard" ? "Logout" : "Back"}
    </button>
  );
};

export default BackButton;
