import React from "react";
import "../../styles/Header.css";
import logo from "../../assets/Header-Logo.png";
import { Link, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from "../../context/AuthContext";
import goldCoinIcon from "../../assets/dollar.jpg";
//import { useHistory } from 'react-router-dom';
import shoppingcart from "../../Pages/ShoppingCart.jsx";
const Header = () => {
  const { isLoggedIn, userType, remainingBucks } = useAuth();
  //const history = useHistory();

  const handleIconClick = () => {
    // Use history.push to navigate to a different page
    //history.push('/shoppingcart');
  };
  return (
    <header className="site-header">
      <div className="logo">
        <Link to={"/"}>
          <img src={logo} alt="BrainBucks Logo" />{" "}
          {/* Replace h1 with img tag for the logo */}
        </Link>
      </div>
      <nav className="main-nav">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/services">Courses</a></li>
        <li><a href="/account">Account</a></li>
        <li><a href="/email">Inbox</a></li>
        <li><a href="/help">Help</a></li>
      </ul>
    </nav>

      <div className="cart-icon">
        {isLoggedIn && userType === "student" && (
          <div className="remaining-bucks">
            <img
              src={goldCoinIcon}
              alt="Gold Coin"
              className="gold-coin-icon"
            />
            <span>Remaining Bucks: {remainingBucks}</span>
          </div>
        )}
        <Link to="/shoppingcart">
          <i className="bi bi-cart3"></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
