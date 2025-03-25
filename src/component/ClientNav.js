import React from "react";
import { FaClipboardList, FaTasks, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../style/application.css";

const ClientNav = () => {
  const navigate = useNavigate();  // ✅ Navigation Hook

  return (
    <nav className="client-nav">
      <button onClick={() => navigate("/clients/pending")}>
        <FaClipboardList />
        <span>Requested Clients</span>
      </button>

      <button onClick={() => navigate("/clients/proceeded")}>
        <FaTasks />
        <span>Procedural Clients</span>
      </button>

      <button onClick={() => navigate("/clients/approved")}>
        <FaCheckCircle />
        <span>Approved Clients</span>
      </button>
    </nav>
  );
};

export default ClientNav;
