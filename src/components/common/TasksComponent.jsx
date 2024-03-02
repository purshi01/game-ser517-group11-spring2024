import React from "react";
import "../../styles/TasksComponent.css";

const TasksComponent = ({ tasks }) => {
  return (
    <div className="completed-tasks">
      <h2></h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={task.completed ? "completed" : "incomplete"}
          >
            <span className="task-title">{task.title}</span>
            <span className="task-status">
              {task.completed ? "Done" : "Not Done"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksComponent;
