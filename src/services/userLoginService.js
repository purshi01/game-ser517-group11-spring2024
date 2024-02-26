import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function to sign up a new user
export const signUp = (userData) => {
  return axios.post(`${API_BASE_URL}/auth/signup`, userData);
};

// Function to sign in an existing user
export const signIn = (credentials) => {
  return axios.post(`${API_BASE_URL}/auth/signin`, credentials)
    .then(response => {
      // Assuming the response includes a token and user type
      if (response.data.token) {
        // Store token in localStorage for session management
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userType', response.data.userType); // Store user type
        // Further actions after successful login can be handled here
      }
      return response.data; // Return the full response data
    });
};
