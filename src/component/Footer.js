import React, { useEffect } from "react";
import "../style/footer.css"; 
import logo from "../image/home.png"; 
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector(".footer");
      if (footer) {
        const footerPosition = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (footerPosition < windowHeight - 100) {
          footer.classList.add("show");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo & Title (Left-Aligned) */}
        <div className="footer-header">
          <img src={logo} alt="Company Logo" className="footer-logo" />
          <h2 className="footer-title">Your Trusted Financial Partner</h2>
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <p><FaPhone /> 022-68539500 | 080-64807777</p>
          <p><FaEnvelope /> <a href="mailto:customercare@dmifinance.in">customercare@dmifinance.in</a></p>
          <p><FaMapMarkerAlt /> <a href="#">Locate Us</a></p>
        </div>

        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedin /></a>
          <a href="#"><FaYoutube /></a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
