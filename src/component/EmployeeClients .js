import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../style/EmployeeC.css";

const EmployeeClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ Navigation Hook

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("Unauthorized: No access token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/manage/manage/employees/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(response.data);
      } catch (err) {
        setError("Failed to fetch clients. Please check authentication.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="container employee-clients-container">
      <h2 className="text-center">Employee Clients</h2>

      {loading && (
        <div className="spinner-container text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && clients.length === 0 && <p className="text-center">No clients found.</p>}

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
                  <th>Client Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <motion.tr
                    key={client.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => navigate(`/employee/${client.id}`)} // ✅ Navigate on click
                    style={{ cursor: "pointer" }} // ✅ Indicate clickability
                  >
                    <td>{client.id}</td>
                    <td>{client.username}</td>
                    <td>{client.email}</td>
                    <td>{client.phone_number}</td>
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

export default EmployeeClients;
