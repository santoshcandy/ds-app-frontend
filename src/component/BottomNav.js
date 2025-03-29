import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaUsers, FaHome, FaUser } from "react-icons/fa";
import "../style/nav.css";

const BottomNav = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Triggers animation when component mounts
  }, []);

  return (
    <div className={`bottom-nav ${isVisible ? "show" : ""}`}>
      <button onClick={() => navigate("/employee/home")}>
        <FaHome /> <span>Home</span>
      </button>
      <button onClick={() => navigate("/client/view")}>
        <FaUsers /> <span>Clients</span>
      </button>
      <button onClick={() => navigate("/add-client-e")}>
        <FaUserPlus /> <span>Add Client</span>
      </button>
      <button onClick={() => navigate("/employee/profile")}>
        <FaUser /> <span>Profile</span>
      </button>
    </div>
  );
};

export default BottomNav;
