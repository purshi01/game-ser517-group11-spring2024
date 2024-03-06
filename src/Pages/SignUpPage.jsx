import React, { useState } from "react";
import "../styles/SignUpPage.css"; // Ensure your CSS file is correctly linked
import { useNavigate } from "react-router-dom";
import messages from "../utils/messages";

const SignUpPage = () => {
  const navigate = useNavigate();
  // Expanded state to include new form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  // eslint-disable-next-line no-useless-escape
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Sign Up:", firstName, lastName, username, email, password);
    let tempErrors = {};
    // Using the imported messages for validation
    if (!firstName) tempErrors.firstName = messages.validation.required;
    if (!lastName) tempErrors.lastName = messages.validation.required;
    if (!username) tempErrors.username = messages.validation.required;
    if (!email) tempErrors.email = messages.validation.required;
    else if (!validateEmail(email))
      tempErrors.email = messages.validation.emailInvalid;
    if (!password) tempErrors.password = messages.validation.required;
    if (!confirmPassword)
      tempErrors.confirmPassword = messages.validation.required;
    if (password !== confirmPassword)
      tempErrors.confirmPassword = messages.validation.passwordsDontMatch;

    setErrors(tempErrors);
    if (Object.keys(tempErrors).length === 0) {
      console.log("Sign Up:", firstName, lastName, username, email, password);
      navigate("/signin"); // Navigate to sign-in page upon successful sign-up
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder={errors.firstName || "First Name"}
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            if (errors.firstName) {
              const newErrors = { ...errors };
              delete newErrors.firstName;
              setErrors(newErrors);
            }
          }}
          className={errors.firstName ? "input-error" : ""}
        />
        <input
          type="text"
          placeholder={errors.lastName || "Last Name"}
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            if (errors.lastName) {
              const newErrors = { ...errors };
              delete newErrors.lastName;
              setErrors(newErrors);
            }
          }}
          className={errors.lastName ? "input-error" : ""}
        />
        <input
          type="text"
          placeholder={errors.username || "Username"}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (errors.username) {
              const newErrors = { ...errors };
              delete newErrors.username;
              setErrors(newErrors);
            }
          }}
          className={errors.username ? "input-error" : ""}
        />
        <input
          type="email"
          placeholder={errors.email || "Email"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) {
              const newErrors = { ...errors };
              delete newErrors.email;
              setErrors(newErrors);
            }
          }}
          className={errors.email ? "input-error" : ""}
        />
        <input
          type="password"
          placeholder={errors.password || "Password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) {
              const newErrors = { ...errors };
              delete newErrors.password;
              setErrors(newErrors);
            }
          }}
          className={errors.password ? "input-error" : ""}
        />
        <input
          type="password"
          placeholder={errors.confirmPassword || "Confirm Password"}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) {
              const newErrors = { ...errors };
              delete newErrors.confirmPassword;
              setErrors(newErrors);
            }
          }}
          className={errors.confirmPassword ? "input-error" : ""}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
