import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [remainingBucks, setRemainingBucks] = useState(0);
  const [userId, setUserId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [professorId, setProfessorId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("userType");
    const id = localStorage.getItem("userId");
    const course = localStorage.getItem("courseId");
    const professor = localStorage.getItem("professorId");
    const bucks = Number(localStorage.getItem("remainingBucks")) || 0;

    if (token) {
      setIsLoggedIn(true);
      setUserType(type);
      setUserId(id);
      setCourseId(course);
      setProfessorId(professor);
      setRemainingBucks(bucks);
    }
  }, []);

  useEffect(() => {
    // This effect updates localStorage whenever remainingBucks changes
    localStorage.setItem("remainingBucks", remainingBucks.toString());
  }, [remainingBucks]);

  const updateRemainingBucks = (newBucks) => {
    localStorage.setItem("remainingBucks", newBucks.toString());
    setRemainingBucks(newBucks);
  };

  const logout = () => {
    // Clear all user data from state and local storage
    setIsLoggedIn(false);
    setUserType(null);
    setUserId(null);
    setCourseId(null);
    setProfessorId(null);
    setRemainingBucks(0);

    // Clear all user data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    localStorage.removeItem("courseId");
    localStorage.removeItem("professorId");
    localStorage.removeItem("remainingBucks");
  };

  const value = {
    isLoggedIn,
    userType,
    remainingBucks,
    userId,
    courseId,
    professorId,
    setIsLoggedIn,
    setUserType,
    setUserId,
    setCourseId,
    setProfessorId,
    setRemainingBucks,
    updateRemainingBucks,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
