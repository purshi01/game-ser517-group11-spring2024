// LoginPage.jsx
import React, { useState } from 'react';
import '../styles/LoginPage.css'
import Particles from '@tsparticles/react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSignIn = (e) => {
    e.preventDefault();
      // Simulate an authentication check
    if (username !== 'user' || password !== 'pass') { // Example condition
      setErrorMessage('Incorrect username or password.'); // Set error message
    } else {
      setErrorMessage(''); // Clear error message on successful login
      // Proceed with successful login actions...
    }
    console.log('Sign In:', username, password);
  };
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (errorMessage) {
      setErrorMessage(''); // Clear error message when the user starts typing again
    }
  };

  return (
    <div className="login-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className="login-form" onSubmit={handleSignIn}>
        <div className='username'>
          <input
            type="text"
            placeholder="UserName"
            value={username}
            onChange={handleInputChange(setUsername)}
          />
          </div>
          <div className='password'>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange(setPassword)}
          />
        </div>
        <div className='button'>
          <button type="submit">Sign In</button>
          <span>or</span>
          <button type="button">Sign Up</button>
        </div>
       
      </form>
    </div>
  );
};

export default LoginPage;
