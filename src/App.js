// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 
import Header from './components/navigation/Header';
import Footer from './components/navigation/Footer';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import StudentDashboard from './Pages/StudentHomePage';
import InstructorDashboard from './Pages/InstructorHomePage';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const { isLoggedIn, userType } = useAuth();

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={isLoggedIn ? (userType === 'student' ? <StudentDashboard /> : <InstructorDashboard />) : <Navigate to="/signin" />} />
          <Route path="/signup" element={!isLoggedIn ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/signin" element={!isLoggedIn ? <SignInPage /> : <Navigate to="/" />} />
          <Route path="/student-dashboard" element={isLoggedIn && userType === 'student' ? <StudentDashboard /> : <Navigate to="/signin" />} />
          <Route path="/instructor-dashboard" element={isLoggedIn && userType === 'instructor' ? <InstructorDashboard /> : <Navigate to="/signin" />} />
          {/* Define additional routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
