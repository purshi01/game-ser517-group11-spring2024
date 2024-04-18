import React from "react";
import "../../styles/TasksComponent.css";

const TasksComponent = ({ tasks }) => {
  return (
    <div className="completed-tasks">
      <h2>Completed Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.task_id}
            className={
              task.scored_points === task.total_points
                ? "completed"
                : "incomplete"
            }
          >
            <span className="task-title">{task.task_name}</span>
            <span className="task-points">
              {task.scored_points}/{task.total_points} Points
            </span>
            <span className="task-status">
              {task.scored_points === task.total_points
                ? "Completed"
                : "In complete"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksComponent;
