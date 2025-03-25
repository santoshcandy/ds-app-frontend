import React from "react";
 import "../style/header.css";
import logo from "../image/logo.png"
const Header = () => {
  return (
    <header className="header-container bg-gradient py-3 shadow-lg">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <img
          src= {logo} // Replace with actual logo URL
          alt="DS Enterprise Logo"
          className="logo rounded-circle shadow"
        />
        {/* App Name */}
        <h1 className="app-name   text-center">DS Loans & Services</h1>
      </div>
    </header>
  );
};

export default Header;