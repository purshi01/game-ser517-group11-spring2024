import React, { useState, useEffect } from "react";
import "../../styles/LeaderboardComponent.css";

const LeaderboardComponent = ({ leaders, onSaveChanges, onAddLeader }) => {
  const [userType, setUserType] = useState("");
  const [editableLeaders, setEditableLeaders] = useState(leaders); // Initialize editableLeaders state

  // Effect hook to retrieve userType from localStorage
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);
  }, []);

  // Update editableLeaders whenever the leaders prop changes
  useEffect(() => {
    setEditableLeaders(leaders);
  }, [leaders]);

  // Determine if the user is an instructor
  const isInstructor = userType === "instructor";

  // Function to handle changes to leader inputs
  const handleLeaderChange = (id, field, value) => {
    const updatedLeaders = editableLeaders.map((leader) =>
      leader.id === id ? { ...leader, [field]: value } : leader
    );
    setEditableLeaders(updatedLeaders);
  };

  // Adjusted handleSaveChanges to use the editableLeaders state
  const handleSaveChanges = () => {
    onSaveChanges(editableLeaders);
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard-content">
        <div className="today-leader">
          {leaders.length > 0 && (
            <>
              <img
                src={leaders[0].imageUrl}
                alt={`${leaders[0].name} ${leaders[0].lastName}`}
                className="leader-image"
              />
              <p>
                Today's Leader: {leaders[0].name} {leaders[0].lastName}
              </p>
              <p>Course Name: {leaders[0].courseName}</p>
            </>
          )}
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {editableLeaders.map((leader, index) => (
              <tr key={index}>
                <td>{leader.name}</td>
                <td>{leader.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardComponent;
