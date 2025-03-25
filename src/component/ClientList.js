import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css"; // Animation library
import { API_URL } from "../Config";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchClients = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("Access token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get( `${API_URL}clients/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        setClients(response.data);
      } catch (err) {
        setError("Failed to fetch clients. Please try again.");
        console.error("Error fetching clients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Function to get the correct badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "warning"; // Yellow
      case "rejected":
        return "danger"; // Red
      case "approved":
        return "success"; // Green
      default:
        return "secondary"; // Default gray
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-black animate__animated animate__fadeInDown">
        Client List
      </h2>

      {loading && (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger animate__animated animate__shakeX" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && clients.length === 0 && (
        <p className="text-center text-muted animate__animated animate__fadeIn">No clients found.</p>
      )}

      {!loading && !error && clients.length > 0 && (
        <div className="table-responsive animate__animated animate__fadeInUp">
          <table className="table table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="table-row"
                  onClick={() => navigate(`/client/${client.id}`)} // Navigate on click
                  style={{ cursor: "pointer" }}
                >
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>
                    <span className={`badge bg-${getStatusBadge(client.approval_status)}`}>
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

export default ClientList;
