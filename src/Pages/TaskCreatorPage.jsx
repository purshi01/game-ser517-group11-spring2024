import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/CourseCreator.css"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const TaskCreator = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [maxPoints, setMaxPoints] = useState('1');
  const [validName, setValidName] = useState(true);

  const navigate = useNavigate();
  const {courseName} = useParams('');

  useEffect(() => {
    document.title = `Add New Task to ${courseName}`
  });

  const handleAddTask = async () => {
    setValidName(taskName.trim() !== '');
    if (validName) {
        try {
              const response = await axios.post(`${API_BASE_URL}/create_task`, {
                task_name: taskName,
                description: taskDescription,
                points: maxPoints,
                course_name: courseName,
              });            
              console.log(response);
            if (response.status === 201) {
                console.log("successfully added")
                navigate(`/instructor-dashboard`);
            }
        } catch (error) {
            console.error("Error adding task", error);
        }
    }
  };
  const handleBack = () => {
    navigate("/instructor-dashboard");
  };

  return (
    <div className="container">
      <h1> </h1>
      <div className="form">
        <div className="section">
          <label>Task Name: </label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="A New Task"
            style={{ 
              border: validName ? '1px solid black' : '1px solid red',
              width: 300,
            }}
          ></input>
          <div>
                {!validName && <span style={{ color: 'red' }}>Task name cannot be left blank.</span>}
          </div>
        </div>
        <div className="section">
            <label>Maximum Points: </label>
            <input className="max-score"
            type="number"
            value={maxPoints}
            min={1}
            onChange={(e) => setMaxPoints(e.target.value)}
          ></input>
        </div>
        <div className="section">
          <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="An optional description of the task if you wish."
            className="description"
            rows={5}
          ></textarea>
        </div>

      </div>
      <div className="button-grid">
        <button className="add-task-button" onClick={handleAddTask}>
          Add Task
        </button>
        <button className="back-button" onClick={handleBack}>
            Back
        </button>
      </div>
    </div>
  );
};

export default TaskCreator;