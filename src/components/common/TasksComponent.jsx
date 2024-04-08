import React from "react";
import "../../styles/TasksComponent.css";

const TasksComponent = ({ tasks }) => {
  const complete = tasks.filter(task => task.completed);
  const incomplete = tasks.filter(task => !task.completed);

  return (
    <div className="tasks-container">
      <div className="task-block">
        <h2>Completed Tasks</h2>
        <ul>
          {complete.map(task => (
            <li key={task.id} className="completed">
              <span className="task-title">{task.title}</span>
            </li>
          ))}
        </ul>      
      </div>
      <div className="task-block">
        <h2>Incomplete Tasks</h2>
        <ul>
          {complete.map(task => (
            <li key={task.id} className="incomplete">
              <span className="task-title">{task.title}</span>
            </li>
          ))}
        </ul>      
      </div>
    </div>
  );
};

export default TasksComponent;
