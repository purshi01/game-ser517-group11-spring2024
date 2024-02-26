// LeaderboardComponent.js
import React from 'react';

const LeaderboardComponent = ({ leaders, userType }) => {
  const isInstructor = userType === 'instructor';

  return (
    <div className="leaderboard">
      <h2>Leader Board</h2>
      <div className="leaderboard-content">
        {isInstructor && (
          <div className="crud-operations">
            {/* Add buttons or UI elements for CRUD operations */}
            <button>Add Leader</button>
            <button>Edit Leader</button>
            <button>Delete Leader</button>
          </div>
        )}
        <div className="today-leader">
          <p>Today's Leader: {leaders[0].name}</p>
          <p>Course Name: {leaders[0].courseName}</p>
        </div>
        <table>
          <tbody>
            {leaders.map((leader, index) => (
              <tr key={leader.id}>
                <td>{leader.name}</td>
                <td>{leader.lastName}</td>
                <td>{leader.score}</td>
                {isInstructor && (
                  <td>
                    {/* Add icons or buttons for edit and delete actions */}
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {!isInstructor && (
          <div className="student-info">
            <p>Remaining Bucks: 7</p>
            <p>My Position: 6</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardComponent;
