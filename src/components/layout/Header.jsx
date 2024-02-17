import React from 'react';
import '../../styles/Header.css';
import logo from '../../assets/Header-Logo.png';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

const Header = () => (
  <header className="site-header">
    <div className="logo">
      <Link to={"/"}>
      <img src={logo} alt="BrainBucks Logo" /> {/* Replace h1 with img tag for the logo */}
      </Link>
    </div>
    {/* <nav className="main-nav">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav> */}
    <div className="cart-icon">
        <i className="bi bi-cart3"></i> {/* Bootstrap cart icon */}
    </div>
  </header>
  
);

export default Header;
