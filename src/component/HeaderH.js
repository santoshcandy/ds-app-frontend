import React, { useState, useEffect } from "react";
import "../style/navbar.css"; 
import home from "../image/home.png"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shrink, setShrink] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Show navbar on page load with animation
    setTimeout(() => {
      setShowNavbar(true);
    }, 100);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${showNavbar ? "show" : ""} ${shrink ? "shrink" : ""}`}>
      <div className="navbar-container">
        {/* Logo & Title */}
        <div className="logo-title">
          <img src={home} alt="DS Finance Logo" className="finance-logo" />
          <span className="title">DS Finance</span>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li className="nav-item"><a href="#">About Us</a></li>
          <li className="nav-item"><a href="#">News & Media</a></li>
          <li className="nav-item"><a href="#">Contact Us</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
