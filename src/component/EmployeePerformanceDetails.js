import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./EmployeePerformanceDetails.css";

const EmployeePerformanceDetails = () => {
  const { employeeId } = useParams();
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/manage/targets/performance?employee_id=${employeeId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee details", error);
      }
    };
    fetchEmployeeData();
  }, [employeeId]);

  if (!employeeData) {
    return <div className="loading">Loading employee details...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">{employeeData.employee}'s Performance</h2>
        <div className="performance-list">
          {employeeData.performance.map((record, index) => (
            <div key={index} className="performance-card">
              <p><strong>Month:</strong> {record.month}/{record.year}</p>
              <p><strong>Target Clients:</strong> {record.target_clients}</p>
              <p><strong>Approved Clients:</strong> {record.approved_clients}</p>
              <p><strong>Completion:</strong> {record.completion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeePerformanceDetails;
