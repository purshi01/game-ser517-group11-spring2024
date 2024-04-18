// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import ShopPage from "./Pages/ShopPage";
import StudentDashboard from "./Pages/StudentHomePage";
import InstructorDashboard from "./Pages/InstructorHomePage";
import PageBackGround from "./components/common/PageBackGround";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NameGenerator from "./Pages/NameGeneratorPage";
import CourseCreator from "./Pages/CourseCreatorPage";
import TaskView from "./Pages/TaskViewPage";
import TaskCreator from "./Pages/TaskCreatorPage";

function App() {
  const { isLoggedIn, userType } = useAuth();

  return (
    <Router>
      <PageBackGround />
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                userType === "student" ? (
                  <StudentDashboard />
                ) : (
                  <InstructorDashboard />
                )
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/signup"
            element={!isLoggedIn ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signin"
            element={!isLoggedIn ? <SignInPage /> : <Navigate to="/" />}
          />
          <Route
            path="/student-dashboard"
            element={
              isLoggedIn && userType === "student" ? (
                <StudentDashboard />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/instructor-dashboard"
            element={
              isLoggedIn && userType === "instructor" ? (
                <InstructorDashboard />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
          path="/temp-instructor-dashboard"
          element={ <InstructorDashboard />}
        />
          <Route
            path="/name-generator"
            element={
              isLoggedIn && userType === "instructor" ? (
                <NameGenerator />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/course-creator"
            element={
              isLoggedIn && userType === "instructor" ? (
                <CourseCreator />
              ) : (
                <Navigate to="/signin" />
              )
            }/>
          <Route
            path="/grade-task"
            element={ <TaskView />}/>
          <Route
            path="task-creation"
            element={<TaskCreator />}
          />  
          <Route path="/NameGenerator" element={<NameGenerator />} />
          <Route path="/shop" element={<ShopPage />} />
          {/* Define additional routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
