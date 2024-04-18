import React from "react";
import "../../styles/LeaderboardComponent.css";
import md5 from "md5";

const LeaderboardComponent = ({ leaders, courseName }) => {
  // Assume courseName is passed as a prop
  const generateAvatarUrl = (username) => {
    const hash = md5(username);
    return `https://www.gravatar.com/avatar/${hash}?d=robohash`;
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard-content">
        {leaders.length > 0 && (
          <div className="today-leader">
            <img
              src={generateAvatarUrl(leaders[0].username)}
              alt={`${leaders[0].username}`}
              className="leader-image"
            />
            <p>Today's Leader: {leaders[0].username}</p>
            <p>Course Name: {courseName}</p> {/* Use passed courseName prop */}
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, index) => (
              <tr key={index}>
                <td>{leader.username}</td>
                <td>{leader.total_points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardComponent;
