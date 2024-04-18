import React, { useState } from "react";
import "../styles/SignInPage.css";
import { useNavigate } from "react-router-dom";
// import { signIn } from '../services/userLoginService';
import { useAuth } from "../context/AuthContext"; // Ensure the path is correct

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  // Correctly use useAuth here to access setIsLoggedIn and setUserType
  const {
    setIsLoggedIn,
    setUserType,
    setRemainingBucks,
    setUserId,
    setCourseId,
    setProffesorId,
  } = useAuth();
  const handleSignIn = async (e) => {
    e.preventDefault();
    // API_BASE_URL should be defined in your environment configuration or directly in your code
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Incorrect username or password.");
      }

      const data = await response.json();
      // const data = {
      //   token: "123432234",
      //   userType: "instructor",
      //   username: "ex@gmail.com",
      //   course_id: 7991,
      // };
      localStorage.setItem("token", data.token); // Assuming the token is returned in the response
      localStorage.setItem("userType", data.userType);
      localStorage.setItem("userId", data.username);
      // Assuming the userId is returned in the response
      setIsLoggedIn(true);
      setUserType(data.userType);
      if (data.userType === "student") {
        localStorage.setItem("courseId", data.course_id);
        setCourseId(data.course_id);
      } else if (data.userType === "professor") {
        localStorage.setItem("professorId", data.professor_id);
        setProffesorId(data.professor_id);
      }

      setUserId(data.username); // Assuming you have a setter for userId in your auth context
      setRemainingBucks(10); // Consider dynamically setting this value based on user data

      // Navigate based on userType
      navigate(
        data.userType === "student"
          ? "/student-dashboard"
          : "/instructor-dashboard"
      );
    } catch (error) {
      console.error("Authentication failed", error);
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (errorMessage) {
      setErrorMessage(""); // Clear error message when the user starts typing again
    }
  };

  return (
    <div className="login-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className="login-form" onSubmit={handleSignIn}>
        <div className="username">
          <input
            type="text"
            placeholder="UserName"
            value={username}
            onChange={handleInputChange(setUsername)}
          />
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange(setPassword)}
          />
        </div>
        <div className="button">
          <button type="submit">Sign In</button>
          <span>or</span>
          <button type="button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
