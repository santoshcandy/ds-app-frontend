import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import axios from "axios";
import { API_URL } from "../Config";

const ClientListPage = () => {
  const { status } = useParams(); // ✅ Read the status from the URL
  const navigate = useNavigate(); // ✅ Navigation Hook
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${API_URL}clients/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [API_URL, accessToken]);

  // ✅ Filter clients based on the status in the URL
  const filteredClients = clients.filter(client => client.approval_status === status);

  return (
    <div className="client-container">
      <h2>{status.charAt(0).toUpperCase() + status.slice(1)} Clients</h2>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : filteredClients.length === 0 ? (
        <p className="no-data">No clients in this category.</p>
      ) : (
        <table className="client-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Loan Purpose</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr 
                key={client.id} 
                className="clickable-row"
                onClick={() => navigate(`/client/${client.id}`)} // ✅ Click event to navigate
                style={{ cursor: "pointer" }} // ✅ Show pointer cursor
              >
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.loan_purpose}</td>
                <td>{client.expected_loan_amount}</td>
                <td>{client.approval_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientListPage;
