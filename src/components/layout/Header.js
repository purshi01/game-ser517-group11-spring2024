import React from 'react'; //react lib
import '../../styles/Header.css'; //css lib
import logo from '../../assets/Header-Logo.png';

const Header = () => (
  <header className="site-header">
    <div className="logo">
      <img src={logo} alt="Logo" /> {/* Replace h1 with img tag for the logo */}
    </div>
    <div className="logo">
      <h1>BrainBucks</h1>
    </div>
    <nav className="main-nav">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>
);

export default Header;
