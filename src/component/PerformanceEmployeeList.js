import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/PerformanceEmployeeList.css";

const PerformanceEmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [expandedEmployee, setExpandedEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get("http://127.0.0.1:8000/manage/targets/performance/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching performance data", error);
      }
    };
    fetchData();
  }, []);

  const toggleDetails = (employee) => {
    setExpandedEmployee(expandedEmployee === employee ? null : employee);
  };

  const viewEmployeeDetails = (employee) => {
    navigate(`/performance-details/${employee}`);
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Employee Performance</h2>
        <div className="space-y-3">
          {employees.map((emp) => (
            <div key={emp.employee} className="employee-card" onClick={() => toggleDetails(emp.employee)}>
              <h3>{emp.employee}</h3>
              {expandedEmployee === emp.employee && (
                <div className="details">
                  {emp.performance.map((record, index) => (
                    <div key={index} className="grid-layout">
                      <p><strong>Completed Target:</strong> {record.approved_clients}/{record.target_clients}</p>
                      <p><strong>Completion:</strong> {record.completion}</p>
                      <p><strong>Month:</strong> {record.month}/{record.year}</p>
                      <p><strong>Today:</strong> {Math.random() > 0.5 ? "Present" : "Absent"}</p>
                    </div>
                  ))}
                  <button className="view-all-button" onClick={() => viewEmployeeDetails(emp.employee_id)}>View All</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceEmployeeList;
