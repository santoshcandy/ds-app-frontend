import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");

  const isAuthenticated = token && !isTokenExpired(token);

  if (!isAuthenticated) {
    // Clear localStorage if token is missing or expired
    localStorage.removeItem("role");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

// Function to check if the token is expired
const isTokenExpired = (token) => {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
    return decodedToken.exp * 1000 < Date.now(); // Check expiration
  } catch (error) {
    return true; // Treat invalid token as expired
  }
};

export default ProtectedRoute;
