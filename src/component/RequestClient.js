import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/requestclient.css"; // Make sure the CSS file path is correct

const RequestClient = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingClients = async () => {
      try {
        const response = await axios.get(`${API_URL}/manage/clients/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        // Filter only "pending" approval_status clients
        const pendingClients = response.data.filter(
          (client) => client.approval_status === "pending"
        );

        setClients(pendingClients);
      } catch (error) {
        console.error("Error fetching pending clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingClients();
  }, [API_URL, accessToken]);

  return (
    <div className="client-container">
      <h2>Requested Clients (Pending)</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : clients.length === 0 ? (
        <p className="no-data">No pending clients.</p>
      ) : (
        <div className="table-container">
          <table className="client-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Loan Purpose</th>
                <th>Expected Loan Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => navigate(`/client/${client.id}`)}
                  className="clickable-row"
                >
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>{client.contact_number}</td>
                  <td>{client.loan_purpose}</td>
                  <td>{client.expected_loan_amount}</td>
                  <td>
                    <span className={`status-badge ${client.approval_status}`}>
                      {client.approval_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestClient;
