import React from "react";
import "../../styles/Header.css";
import logo from "../../assets/Header-Logo.png";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from "../../context/AuthContext";
import goldCoinIcon from "../../assets/dollar.jpg";

const Header = () => {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    userType,
    remainingBucks,
    setIsLoggedIn,
    setUserType,
    setRemainingBucks,
    setUserId,
    setCourseId,
  } = useAuth();

  const handleLogout = () => {
    // Clear context and local storage
    setIsLoggedIn(false);
    setUserType(null);
    setRemainingBucks(0);
    setUserId(null);
    setCourseId(null);

    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    localStorage.removeItem("courseId");

    // Redirect to home/login page
    navigate("/");
  };
  const goToShop = () => {
    navigate("/shop");
  };

  return (
    <header className="site-header">
      <div className="logo">
        <Link to={"/"}>
          <img src={logo} alt="BrainBucks Logo" />
        </Link>
      </div>

      <div className={`cart-icon ${userType}`}>
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

        {isLoggedIn && userType === "student" && (
          <>
            <i
              className="bi bi-cart3"
              onClick={goToShop}
              style={{ cursor: "pointer" }}
            ></i>{" "}
          </>
        )}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
