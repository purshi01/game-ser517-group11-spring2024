import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // New state for user type

  useEffect(() => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('userType'); // Get user type from localStorage
    if (token) {
      setIsLoggedIn(true);
      setUserType(type);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userType, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
