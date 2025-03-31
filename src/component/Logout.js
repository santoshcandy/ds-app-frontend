import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all stored user data
    localStorage.clear();

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <button className="btn btn-danger btn-lg px-4" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
