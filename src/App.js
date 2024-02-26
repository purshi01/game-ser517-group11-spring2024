import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Adjust the path as per your directory structure
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import StudentDashboard from './Pages/StudentHomePage'; // Assuming student dashboard component
import InstructorDashboard from './Pages/InstructorHomePage'; // Assuming instructor dashboard component
import { AuthProvider } from './context/AuthContext';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const { isLoggedIn, userType } = useAuth(); // Using the useAuth hook to access the auth context

  return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={isLoggedIn ? (userType === 'student' ? <StudentDashboard /> : <InstructorDashboard />) : <Navigate to="/signin" />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
            {/* Define additional routes as needed */}
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
