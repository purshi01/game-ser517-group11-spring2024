import React from "react";
import "../../styles/TasksComponent.css";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const TasksComponent = ({ tasks }) => {
  
  const complete = tasks.filter(task => task.completed);
  const incomplete = tasks.filter(task => !task.completed);

  TasksComponent.getTasks = async (courseName) => {
    console.log('getting tasks');
    try {
      const response = await axios.get(`${API_BASE_URL}/get_tasks`, {
          course_name: courseName,
      });
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        const taskList = data.tasks;
        return taskList;
      }

    } catch (error) {
      console.error("Error getting task name", error);
    }
    return null;
  };
  
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
