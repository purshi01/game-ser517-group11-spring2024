import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/TaskView.css"
import { useParams } from "react-router-dom";
import TasksComponent from "../components/common/TasksComponent";
import Papa from "papaparse";

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
  const [file, setFile] = useState(null);
  const [grades, setGrades] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setFile(file);
      } else {
        alert('File must be a CSV or Excel file (.csv, .xls, or .xlsx)');
      }
    }
  };

  const handleUpload = () => {
    if (file === null) {
        alert('Please select a .csv, .xls, or .xlsx file.');
    } else if (file.name.endsWith('.csv')) {
        console.log("Reading in CSV", file);
        Papa.parse(file, {
            skipEmptyLines:true,
            complete: function (results) {
                console.log(results.data)
                results.data.forEach(async submission => {
                    try {
                        const username = submission[0];
                        const score = submission[1];
        
                        const response1 = await axios.get() // Not sure here, need to send database username and get student id
                        console.log(response1.data);
                        const id = response1.data.studentId;
                        const data = {
                            username: username,
                        }
                        const response = await axios.post(`/courses/${courseId}/tasks/${taskId}/assign`, )
                        

                      } catch (error) {
                        console.error('Error adding student to course:', error);
                      }
                });
            },
          });
        
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        console.log("Reading in Excel", file);

    } else {
        alert('Please select a .csv, .xls, or .xlsx file.');
    }
  };

  return (
    <div className="container">
      <h1>Task Name should be Here</h1>
      <div className="columns">
        <div className="column">
            <div className="tasks">
            <TasksComponent tasks={taskListData} />
            </div>
        </div>
        <div className="column">
            <input type="file" accept = ".csv, .xlsx, .xls" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Grades</button>
        </div>
        <div className="column">
            <h2>This column is should show all grades in the current task</h2>
            <div className="column">
            <textarea className="generated-names" 
            value={grades} 
            readOnly 
            cols={50} rows={15}
            >{API_BASE_URL}
          </textarea>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TaskView;