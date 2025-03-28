import React, { useEffect, useState } from "react";
import "../style/navbar.css"; 
import home from "../image/home.png"; 


const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Show navbar with animation on page load
    setTimeout(() => {
      setShowNavbar(true);
    }, 100);
  }, []);

  return (
    <nav className={`navbar ${showNavbar ? "show" : ""}`}>
      <div className="navbar-container">
        {/* Logo & Title (Left Side) */}
        <div className="logo-title">
          <div className="logo-circle">
            <img src={home} alt="DS Finance Logo" className="finance-logo" />
          </div>
          <span className="title">DS Finance</span>
        </div>

        {/* Navigation Links (Right Side) */}
       
      </div>
    </nav>
  );
};

export default Navbar;
