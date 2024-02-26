// LoginPage.jsx
import React, { useState } from 'react';
import '../styles/SignInPage.css'
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/userLoginService';


const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const data = await signIn({ username, password });
      console.log('Sign In successful', data);

      // Navigation logic based on user type
      if (data.userType === 'student') {
        navigate('/studenthome');
      } else if (data.userType === 'instructor') {
        navigate('/instructorhome');
      } else {
        // Handle unexpected user type
        console.error('Unexpected user type');
      }
    } catch (error) {
      console.error('Sign In failed', error.response ? error.response.data : error);
      setErrorMessage('Incorrect username or password.');
    }
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
          <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
       
      </form>
    </div>
  );
};

export default SignInPage;