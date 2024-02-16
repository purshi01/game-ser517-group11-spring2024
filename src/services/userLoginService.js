// In userService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getUser = (userId) => {
  return axios.get(`${API_BASE_URL}/users/${userId}`);
};

export const createUser = (userData) => {
  return axios.post(`${API_BASE_URL}/users`, userData);
};
