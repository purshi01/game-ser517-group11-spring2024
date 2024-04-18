import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // New state for user type
  const [remainingBucks, setRemainingBucks] = useState(0);
  const [userId, setUserId] = useState(0);
  const [courseId, setCourseId] = useState(0);
  const [proffesorId, setProffesorId] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("userType");
    const id = localStorage.getItem("userId");
    const courseId = localStorage.getItem("courseId");
    const proffesorId = localStorage.getItem("proffesorId");
    if (token) {
      setIsLoggedIn(true);
      setUserType(type);
      setUserId(id);
      setCourseId(courseId);
      setProffesorId(proffesorId);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userType,
        setUserType,
        remainingBucks,
        setRemainingBucks,
        userId,
        setUserId,
        courseId,
        setCourseId,
        proffesorId,
        setProffesorId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
