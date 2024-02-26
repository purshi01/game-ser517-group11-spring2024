import React, { useState, useEffect } from "react";
import "../styles/StudentHomePage.css"; // Assuming you have a CSS file for styling
import CoursesComponent from "../components/common/CoursesComponent";
import LeaderboardComponent from "../components/common/LeaderboardComponent";
import TasksComponent from "../components/common/TasksComponent";

const StudentDashboard = () => {
  const courses = [
    { id: 1, name: "SER 231 Software Design" },
    { id: 2, name: "SER 215 Software Processes" },
    { id: 3, name: "SER 322 Database Management" },
    { id: 4, name: "SER 501 Advanced Data Structure and algo" },
    // Add more courses if needed
  ];

  const dummyLeaders = [
    {
      id: 1,
      name: "Vanessa",
      lastName: "Lason",
      score: 41,
      courseName: "SER 231",
      courseId: 1,
      imageUrl:
        "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      name: "Jose",
      lastName: "Roberts",
      score: 29,
      courseName: "SER 215",
      courseId: 1,
      imageUrl: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Jose+R",
    },
    {
      id: 3,
      name: "Bob",
      lastName: "Keebler",
      score: 18,
      courseName: "SER 322",
      courseId: 1,
      imageUrl: "https://via.placeholder.com/150/FFFF00/000000?text=Bob+K",
    },
    {
      id: 4,
      name: "Alice",
      lastName: "Wonderland",
      score: 35,
      courseName: "SER 101",
      courseId: 2,
      imageUrl: "https://via.placeholder.com/150/000000/FFFFFF?text=Alice+W",
    },
    {
      id: 5,
      name: "Marco",
      lastName: "Polo",
      score: 23,
      courseName: "SER 201",
      courseId: 2,
      imageUrl: "https://via.placeholder.com/150/008000/FFFFFF?text=Marco+P",
    },
    {
      id: 6,
      name: "Jessica",
      lastName: "Jones",
      score: 47,
      courseName: "SER 303",
      courseId: 2,
      imageUrl: "https://via.placeholder.com/150/00FFFF/000000?text=Jessica+J",
    },
    {
      id: 7,
      name: "Clark",
      lastName: "Kent",
      score: 50,
      courseName: "SER 404",
      courseId: 3,
      imageUrl: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Clark+K",
    },
    {
      id: 8,
      name: "Diana",
      lastName: "Prince",
      score: 38,
      courseName: "SER 505",
      courseId: 3,
      imageUrl: "https://via.placeholder.com/150/FFFFFF/808080?text=Diana+P",
    },
    {
      id: 9,
      name: "Bruce",
      lastName: "Wayne",
      score: 42,
      courseName: "SER 606",
      courseId: 3,
      imageUrl: "https://via.placeholder.com/150/000000/FFFFFF?text=Bruce+W",
    },
    {
      id: 10,
      name: "Tony",
      lastName: "Stark",
      score: 36,
      courseName: "SER 707",
      courseId: 4,
      imageUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=Tony+S",
    },
  ];

  const dummyTasks = [
    {
      id: 1,
      courseId: 1,
      title: "Design Patterns Assignment",
      completed: true,
    },
    { id: 2, courseId: 1, title: "UML Diagrams Homework", completed: false },
    { id: 3, courseId: 2, title: "Agile Methodologies Quiz", completed: true },
    { id: 4, courseId: 3, title: "Normalization Lab", completed: false },
    { id: 5, courseId: 4, title: "Binary Trees Exercise", completed: true },
    // Add more tasks as needed
  ];

  // State to hold the currently selected course
  const [selectedCourse, setSelectedCourse] = useState(null);

  // State for leaderboard and task list based on the selected course
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [taskListData, setTaskListData] = useState([]);
  // Effect to fetch and set leaderboard and task list data when a course is selected
  useEffect(() => {
    // Set a default selected course if not already selected and courses are loaded
    if (!selectedCourse && courses.length > 0) {
      setSelectedCourse(courses[0]);
    }
  }, [courses]); // This effect only runs when courses changes, which should be infrequent

  useEffect(() => {
    // Update leaderboard data when selectedCourse changes
    if (selectedCourse) {
      const filteredLeaders = dummyLeaders.filter(
        (leader) => leader.courseId === selectedCourse.id
      );
      setLeaderboardData(filteredLeaders);
      const courseTasks = dummyTasks.filter(
        (task) => task.courseId === selectedCourse.id
      );
      setTaskListData(courseTasks);
    }
  }, [selectedCourse]); // This effect only depends on selectedCourse

  // Handler to change the selected course
  const handleCourseSelect = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    console.log("Inside handleCourseSelect course = " + course.id);
    setSelectedCourse(course);
  };

  return (
    <div className="student-dashboard">
      <div className="dashboard-grid">
        <div className="enrolled-courses">
          <h2>Enrolled Courses</h2>
          <CoursesComponent
            courses={courses}
            onCourseSelect={handleCourseSelect}
          />
        </div>
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <LeaderboardComponent leaders={leaderboardData} userType="student" />
        </div>
        <div className="completed-tasks">
          <h2>Completed Tasks</h2>
          <TasksComponent tasks={taskListData} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
