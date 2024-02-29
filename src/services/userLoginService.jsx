import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function to sign up a new user
export const signUp = (userData) => {
  return axios.post(`${API_BASE_URL}/auth/signup`, userData);
};

// Function to sign in an existing user
export const signIn = (credentials) => {
  return axios
    .post(`${API_BASE_URL}/auth/signin`, credentials)
    .then((response) => {
      // Assuming the response includes a token and user type
      if (response.data.token) {
        // Store token in localStorage for session management
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", response.data.userType); // Store user type
        // Further actions after successful login can be handled here
      }
      return response.data; // Return the full response data
    });
};

// Function to get enrolled courses for a student by student ID
export const getEnrolledCourses = (studentId) => {
  // Include the Authorization header with the token retrieved from localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios
    .get(`${API_BASE_URL}/students/${studentId}/courses`, config)
    .then((response) => {
      // Assuming the response contains an array of courses
      return response.data.courses; // Return the courses
    })
    .catch((error) => {
      console.error("Error fetching enrolled courses:", error);
      throw error; // Rethrow the error for handling by the calling component
    });
};
