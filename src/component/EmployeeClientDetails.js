import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "../style/EmployeeClientDetails.css"; // Ensure the CSS file is linked

const EmployeeClientDetails = () => {
  const { id } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();
  const [clients, setClients] = useState([]); // Stores clients data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("Unauthorized: No access token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/manage/manage/employees/${id}/clients/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", response.data); // Debugging log

        // ✅ FIX: Ensure correct data structure
        if (Array.isArray(response.data)) {
          setClients(response.data); // Use API response directly
        } else {
          setClients([]); // Ensure state is always an array
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch clients. Please check authentication.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchClients();
  }, [id]);

  return (
    <div className="container employee-clients-container">
      <h2 className="text-center">Clients Assigned To Employee {id}</h2>

      {/* Loading Spinner */}
      {loading && (
        <div className="spinner-container text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      )}

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* No Clients Found */}
      {!loading && clients.length === 0 && (
        <p className="text-center">No clients found.</p>
      )}

      {/* Clients Table */}
      {!loading && clients.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <motion.tr
                    key={client.id} // ✅ Fix: Ensure unique key
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/employee/client/${client.id}`)}
                  >
                    <td>{client.id}</td>
                    <td>{client.name}</td>
                
                    <td>
  <span
    className={`status-badge ${
      client.approval_status?.toLowerCase() === "approved"
        ? "status-approved"
        : client.approval_status?.toLowerCase() === "pending"
        ? "status-pending"
        : "status-rejected"
    }`}
  >
    {client.approval_status}
  </span>

                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmployeeClientDetails;
