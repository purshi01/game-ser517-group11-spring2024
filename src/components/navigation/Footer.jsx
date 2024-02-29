import React from "react";
import logo from "../../assets/Footer-Logo.png"; // Import the logo image
import "../../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <img src={logo} alt="BrainBucks Logo" className="footer-logo" />
        <p>&copy; {currentYear} BrainBucks. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
