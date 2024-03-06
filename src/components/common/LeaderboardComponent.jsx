// LeaderboardComponent.js
import React from "react";
import "../../styles/LeaderboardComponent.css";

const LeaderboardComponent = ({ leaders, userType }) => {
  const isInstructor = userType === "instructor";

  return (
    <div className="leaderboard">
      <div className="leaderboard-content">
        {isInstructor && (
          <div className="crud-operations">
            {/* CRUD buttons */}
            <button>Add Leader</button>
            <button>Edit Leader</button>
            <button>Delete Leader</button>
          </div>
        )}
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
          <tbody>
            {leaders.map((leader, index) => (
              <tr key={leader.id}>
                <td>{leader.name}</td>
                <td>{leader.lastName}</td>
                <td>{leader.score}</td>
                {isInstructor && (
                  <td>
                    {/* Edit and delete actions */}
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardComponent;
