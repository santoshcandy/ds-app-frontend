import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaUserPlus, FaListAlt } from "react-icons/fa";
import "../style/nav.css";

const ManagerNav = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Add animation when the component mounts
  }, []);

  return (
    <div className={`bottom-nav ${isVisible ? "show" : ""}`}>
      <button onClick={() => navigate("/manager-home")}>
        <FaHome /> <span>Home</span>
      </button>
      <button onClick={() => navigate("/employee")}>
        <FaUsers /> <span>Employees</span>
      </button>
      <button onClick={() => navigate("/add-client")}>
        <FaUserPlus /> <span>Add Client</span>
      </button>
      <button onClick={() => navigate("/manager/view/all")}>
        <FaListAlt /> <span>All</span>
      </button>
    </div>
  );
};

export default ManagerNav;
