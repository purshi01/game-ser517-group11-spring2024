import React, { useState, useEffect } from 'react';
import '../styles/StudentHomePage.css'; // Assuming you have a CSS file for styling
import CoursesComponent from '../components/common/CoursesComponent'
import LeaderboardComponent from '../components/common/LeaderboardComponent'

const StudentDashboard = () => {
  // const [courses, setCourses] = useState([]);
  // const studentId = 'student-id'; // Replace with actual student ID, possibly from user context or props

  // useEffect(() => {
  //   getEnrolledCourses(studentId)
  //     .then(courses => {
  //       setCourses(courses);
  //     })
  //     .catch(error => {
  //       // Handle error (e.g., show error message to user)
  //     });
  // }, [studentId]);
  // Dummy data for enrolled courses
  const courses = [
    { id: 1, name: 'SER 231 Software Design'},
    { id: 2, name: 'SER 215 Software Processes'},
    { id: 3, name: 'SER 322 Database Management'},
    // Add more courses if needed
  ];
  const dummyLeaders = [
      { id: 1, name: 'Vanessa', lastName: 'Lason', score: 41, courseName: 'SER 231' },
      { id: 2, name: 'Jose', lastName: 'Roberts', score: 29, courseName: 'SER 215' },
      { id: 3, name: 'Bob', lastName: 'Keebler', score: 18, courseName: 'SER 322' },
      // ...and so on for as many leaders as you have
    ];

  return (
    <div className="student-dashboard">
      <div className="dashboard-grid">
        <div className="enrolled-courses">
          <h2>Enrolled Courses</h2>
          <CoursesComponent courses={courses} />
        </div>
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <LeaderboardComponent leaders={dummyLeaders} userType="student" />
        </div>
        <div className="completed-tasks">
          <h2>Completed Tasks</h2>
          {/* List completed tasks here */}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
