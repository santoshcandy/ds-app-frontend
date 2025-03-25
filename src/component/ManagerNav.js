import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaUserPlus, FaRegCalendarCheck } from "react-icons/fa";
import "../style/nav.css";

const ManagerNav = () => {
  const navigate = useNavigate();

  return (
    <div className="bottom-nav">
      <button onClick={() => navigate("/manager-home")}>
        <FaHome /> <span>Home</span>
      </button>
      <button onClick={() => navigate("/employee-list")}>
        <FaUsers /> <span>Employees</span>
      </button>
      <button onClick={() => navigate("/add-client")}>
        <FaUserPlus /> <span>Add Client</span>
      </button>
      <button onClick={() => navigate("/attendance")}>
        <FaRegCalendarCheck /> <span>Attendance</span>
      </button>
    </div>
  );
};

export default ManagerNav;
