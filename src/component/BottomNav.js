import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaUsers, FaHome } from "react-icons/fa";
import "../style/nav.css";

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <div className="bottom-nav">
      <button onClick={() => navigate("/")}>
        <FaHome /> <span>Home</span>
      </button>
      <button onClick={() => navigate("/client/view")}>
        <FaUsers /> <span>Clients</span>
      </button>
      <button onClick={() => navigate("/add-client")}>
        <FaUserPlus /> <span>Add Client</span>
      </button>
    </div>
  );
};

export default BottomNav;
