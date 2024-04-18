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
    const fetchData = async () => {
      try {
        // Fetch leaderboard data
        const leaderboardResponse = await fetch(
          `${API_BASE_URL}/leaderboard/${courseId}`,
          {
            method: "GET",
          }
        );
        if (!leaderboardResponse.ok) {
          throw new Error("Failed to fetch student task data");
        }
        let leaderboard = await leaderboardResponse.json();
        setLeaderboardData(leaderboard);

        // Determine the user's position in the leaderboard
        const position =
          leaderboard.findIndex((user) => user.username === username) + 1;
        setMyPosition(position); // Add 1 because array is zero-indexed

        // Fetch task data
        const taskDataResponse = await fetch(
          `${API_BASE_URL}/student_tasks_scores/${username}/${courseId}`,
          {
            method: "GET",
          }
        );
        if (!taskDataResponse.ok) {
          throw new Error("Failed to fetch student task data");
        }
        const taskData = await taskDataResponse.json();
        setTaskListData(taskData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle any errors that occurred during fetching
      }
    };

    // Execute the async function
    fetchData();

    // The inclusion of dummyTasks here will immediately overwrite the task list data set by the fetch operation above.
    // If dummyTasks are meant to be used as fallback or initial data, consider setting them conditionally or before making fetch calls.
  }, [courseId, API_BASE_URL]); // Include API_BASE_URL in the dependency array if it's not a constant

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
