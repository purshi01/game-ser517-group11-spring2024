import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/TaskView.css"
import { useParams } from "react-router-dom";
import TasksComponent from "../components/common/TasksComponent";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const TaskView = () => {
  useEffect(() => {
    document.title = ""
    setTaskListData(dummyTasks);
  }, []);

  const dummyTasks = [
    {
      id: 1,
      courseId: 1,
      title: "Design Patterns Assignment",
      completed: true,
    },
    { id: 2, courseId: 1, title: "UML Diagrams Homework", completed: false },
    { id: 3, courseId: 2, title: "Agile Methodologies Quiz", completed: true },
    { id: 4, courseId: 3, title: "Normalization Lab", completed: false },
    { id: 5, courseId: 4, title: "Binary Trees Exercise", completed: true },
    // Add more tasks as needed
  ];
  
  const {courseId, taskId} = useParams();
  const [taskListData, setTaskListData] = useState([]);

  return (
    <div className="container">
      <h1>Task Name should be Here</h1>
      <div className="columns">
        <div className="column">
            <div className="completed-tasks">
            <TasksComponent tasks={taskListData} />
            </div>
        </div>
        <div className="column">

        </div>
        <div className="column">
            <h2>This column is should show all grades in the current task</h2>
        </div>
      </div>
    </div>
  );
};

export default TaskView;