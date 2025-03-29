import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../Config";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    dob: "",
    role: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post( `${API_URL}login/`, formData);

      if (response.data.tokens) {
        // Store tokens & user details in localStorage
        localStorage.setItem("accessToken", response.data.tokens.access);
        localStorage.setItem("refreshToken", response.data.tokens.refresh);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("userID", response.data.user.id);
        localStorage.setItem("role", response.data.user.role);
        alert("Login successful!");
        window.location.href = "/client/view"; // Redirect after login
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Login failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="p-4 shadow rounded bg-white" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input type="tel" name="phone_number" className="form-control" value={formData.phone_number} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Date of Birth</label>
          <input type="date" name="dob" className="form-control" value={formData.dob} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <select name="role" className="form-control" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
