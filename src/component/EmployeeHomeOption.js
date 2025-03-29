import React from "react";
import { FaClipboardList, FaTasks, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../style/application.css";

const EmployeeHomeOption = () => {
  const navigate = useNavigate();

  return (
    <div className="client-nav">
      <button className="pending" onClick={() => navigate("/employee/clients/pending")}>
        <FaClipboardList />
        <span>Requested</span>
      </button>

      <button className="procedural" onClick={() => navigate("/employee/clients/proceed")}>
        <FaTasks />
        <span>Processing</span>
      </button>

      <button className="approved" onClick={() => navigate("/employee/clients/approved")}>
        <FaCheckCircle />
        <span>Approved</span>
      </button>
    </div>
  );
};

export default EmployeeHomeOption;

