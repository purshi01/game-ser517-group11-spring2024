import React from "react";
import "../../styles/TasksComponent.css";
import axios from "axios";

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
          {incomplete.map(task => (
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
