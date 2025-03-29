import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../Config";
import "../style/EmployeeClientDetails.css";

const ClientListPage = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const filteredClients = clients.filter(client => client.approval_status === status);

  return (
    <div className="employee-clients-container">
      <h2 className="text-center">{status.charAt(0).toUpperCase() + status.slice(1)} Clients</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : filteredClients.length === 0 ? (
        <p className="no-data">No clients in this category.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-primary">
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
                  onClick={() => navigate(`/manager/client/${client.id}`)}
                >
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>{client.loan_purpose}</td>
                  <td>{client.expected_loan_amount}</td>
                  <td>
                    <span className={`status-badge ${
                      client.approval_status === "approved" ? "status-approved" :
                      client.approval_status === "pending" ? "status-pending" : "status-rejected"
                    }`}>
                      {client.approval_status.charAt(0).toUpperCase() + client.approval_status.slice(1)}
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

export default ClientListPage;