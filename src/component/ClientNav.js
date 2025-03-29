import React from "react";
import { FaClipboardList, FaTasks, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../style/application.css";

const ClientNav = () => {
  const navigate = useNavigate();

  return (
    <div className="client-nav">
      <button className="pending" onClick={() => navigate("/clients/pending")}>
        <FaClipboardList />
        <span>Requested</span>
      </button>

      <button className="procedural" onClick={() => navigate("/clients/proceeded")}>
        <FaTasks />
        <span>Processing</span>
      </button>

      <button className="approved" onClick={() => navigate("/clients/approved")}>
        <FaCheckCircle />
        <span>Approved</span>
      </button>
    </div>
  );
};

export default ClientNav;
