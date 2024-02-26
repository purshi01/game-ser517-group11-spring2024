import React, { useState } from "react";
import "../styles/SignUp.css";

import profile_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

export const Login = () => {
  const [action, setAction] = useState("Sign Up");

  //Username, Password and email variables
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [userEmail, setUserEmail] = useState();

  //List to store user inputs
  //const [usernameInput, setUserNameInput] = useState();
  //const [passwordInput, setPasswordInput] = useState();
  //const [useremailInput, setUserEmailInput] = useState();

  return (
    <div className="container">
      <div className="header1">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={profile_icon} alt="" />
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="User Name"
            />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            type="text"
            placeholder="User Email"
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Password"
          />
        </div>
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Forgot Password? <span>Click Here</span>
        </div>
      )}
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit blank" : "submit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit blank" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};
