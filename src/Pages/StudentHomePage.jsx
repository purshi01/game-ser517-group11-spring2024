import React, { useState, useEffect } from "react";
import "../styles/StudentHomePage.css"; // Assuming you have a CSS file for styling
import "../styles/GamerRank.css";
import LeaderboardComponent from "../components/common/LeaderboardComponent";
import TasksComponent from "../components/common/TasksComponent";

const StudentDashboard = () => {
  // State for leaderboard and task list based on the selected course
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [taskListData, setTaskListData] = useState([]);
  const [myPosition, setMyPosition] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const courseId = localStorage.getItem("courseId");
  const username = localStorage.getItem("userId");
  // Effect to fetch and set leaderboard and task list data when a course is selected
  useEffect(() => {
    let isActive = true; // Flag to manage cleanup and avoid setting state on unmounted component

    const fetchData = async () => {
      if (!courseId || !username) return;

      try {
        // Fetch leaderboard data
        const leaderboardResponse = await fetch(
          `${API_BASE_URL}/leaderboard/${courseId}`
        );
        if (!leaderboardResponse.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const leaderboard = await leaderboardResponse.json();

        // Fetch task data
        const taskDataResponse = await fetch(
          `${API_BASE_URL}/student_tasks_scores/${username}/${courseId}`
        );
        if (!taskDataResponse.ok) {
          throw new Error("Failed to fetch student task data");
        }
        const taskData = await taskDataResponse.json();

        if (isActive) {
          setLeaderboardData(leaderboard);
          setTaskListData(taskData);

          const position =
            leaderboard.findIndex((user) => user.username === username) + 1;
          setMyPosition(position); // Add 1 because array is zero-indexed
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isActive = false; // Set flag to false on cleanup to avoid setting state
    };
  }, [courseId, username, API_BASE_URL]); // Ensure username is also a dependency if it can change

  return (
    <div className="student-dashboard">
      <div className="dashboard-student-grid">
        <div className="my-position">
          <h2>My position</h2>
          <div className="gamer-rank-container">
            <div className="rank-badge">{myPosition}</div>
            <div className="gamer-info">
              <h2 className="gamer-username">{username}</h2>
            </div>
          </div>
        </div>
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <LeaderboardComponent leaders={leaderboardData} />
        </div>
        <div className="completed-tasks">
          <TasksComponent tasks={taskListData} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
