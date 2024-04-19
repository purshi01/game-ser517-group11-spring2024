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
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const {
    setIsLoggedIn,
    setUserType,
    setRemainingBucks,
    setUserId,
    setCourseId,
    setProfessorId,
  } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
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
      setIsLoggedIn(true);
      setUserType(data.userType);
      setUserId(data.username);

      // Assuming the token and userType are returned in the response
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", data.userType);
      localStorage.setItem("userId", data.username);

      // Now we fetch the points
      await getAvailablePoints(data.username); // Await the points fetching

      if (data.userType === "student") {
        setCourseId(data.course_id);
        localStorage.setItem("courseId", data.course_id);
      } else if (data.userType === "professor") {
        setProfessorId(data.professor_id);
        localStorage.setItem("professorId", data.professor_id);
      }

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

  const getAvailablePoints = async (username) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/get_available_points/${username}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch available points.");
      }
      const data = await response.json();
      setRemainingBucks(data.available_points);
      localStorage.setItem("remainingBucks", data.available_points);
    } catch (error) {
      console.error("There was an error fetching points", error);
      setErrorMessage("Could not fetch points. Please try again later.");
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
