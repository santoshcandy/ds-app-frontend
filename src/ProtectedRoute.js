import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");

  // Check if token exists and is not expired
  const isAuthenticated = token && !isTokenExpired(token);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

// Function to check if the token is expired
const isTokenExpired = (token) => {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
    return decodedToken.exp * 1000 < Date.now(); // Check expiration
  } catch (error) {
    return true; // If token is invalid
  }
};

export default ProtectedRoute;
