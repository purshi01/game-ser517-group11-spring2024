import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/TaskView.css"
import { useParams } from "react-router-dom";
import TasksComponent from "../components/common/TasksComponent";
import Papa from "papaparse";
import * as XLSX from 'xlsx';
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const TaskView = () => {
  const {courseId, taskId} = useParams();
  const [taskListData, setTaskListData] = useState([]);
  const [file, setFile] = useState(null);
  const [grades, setGrades] = useState([]);
  const [taskName, setTaskName] = useState('');
  const navigate = useNavigate();

  const dummyTasks = [
    { id: 1, courseId: 1, title: "Design Patterns Assignment", completed: true },
    { id: 2, courseId: 1, title: "UML Diagrams Homework", completed: false },
    { id: 3, courseId: 2, title: "Agile Methodologies Quiz", completed: true },
    { id: 4, courseId: 3, title: "Normalization Lab", completed: false },
    { id: 5, courseId: 4, title: "Binary Trees Exercise", completed: true },
    // Add more tasks as needed
  ];

  

  useEffect(() => {
    document.title = `Grades for ${taskName}`
    setTaskListData(dummyTasks);
    // setTaskListData(TasksComponent.getTasks());
    getTaskName(courseId);
  }, []);

  /*
    Formats the grades when a file is added to be parsed.
    May need to split into csv and excel versions.
  */
    const setFormatedGrades = (rawGrades) => {
      const formattedGrades = rawGrades.map(row => ({
          username: row.username,
          grade: row.grade
      }));
      setGrades(formattedGrades);
  }
  

  const getTaskName = async () => {
    try {
      const response = await axios.get(`/courses/${courseId}/${taskId}`);
      console.log(response)
      if (response.status === 200) {
        taskName = response.data.task_name;
        setTaskName(taskName);
      }
    } catch (error) {
      console.error('Error getting task name', error);
    }
  }
  /*
    This should handle changing the file type, and when a file is added,
    it should parse the file and display it through setFormatedGrades.

    *** Set formated grades may need excel version and csv version ***
  */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.name.endsWith('.csv')) {
        setFile(file);
        Papa.parse(file, {
            skipEmptyLines:true,
            complete: function (results) {
              const headers = results.data[0].map(header => header.toLowerCase());
              const usernames = headers.indexOf("username");
              const grades = headers.indexOf("grade");
              if (usernames === -1 || grades === -1) {
                alert("Please ensure that usernames have the header 'username' and the scores have the header 'grade'. Headers must be in row 1.")
              } else {
                const formattedData = results.data.slice(1) // Exclude header row
                .map(row => ({
                    username: row[usernames],
                    grade: row[grades]
                }));
                setFormatedGrades(formattedData);
              }
            },
          });
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) { // TODO FIXME
        setFile(file);
        const reader = new FileReader();
        reader.onload = (e) => { // This isnt triggering
          console.log('Excel file loaded');  
        };
        reader.onerror = (error) => {
          console.error('Error reading file:', error);
        };
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
                      
                        const payload1 = {
                          username: username
                        }
                        const response1 = await axios.get(`/students`, payload1)
                        console.log(response1.data);
                        if (response1.status === 201) {
                          const payload2 = {
                              studentId: response1.data.student_id,
                              points: score,
                          }
                          const response2 = await axios.post(`/courses/${courseId}/tasks/${taskId}/assign`, payload2)
                          console.log(response2);
                          if (response2.status === 200) {
                            alert("Grades successfully added");
                            navigate(`/instructor-dashboard`);
                          } else {
                            alert("An unexpected error has occured.")
                          }
                        } else if (response1.status === 404) {
                          alert(`Student ${username} not found. Please ensure username is correct.`)
                        } else {
                          alert("An unexpected error has occured.")
                        }
                      } catch (error) {
                        console.error('Error applying grades to course:', error);
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
  
  const toDashboard = () => {
    // Need this as a method rather than directly there since it was immediately going
    navigate(`/instructor-dashboard`);
  }

  // , .xlsx, .xls
  return (
    <div className="container">
      <h1>Grading {taskName}</h1>
      <div className="columns">
        <div className="column">
            <div className="tasks">
            <TasksComponent tasks={taskListData} />
            </div>
        </div>
        <div className="column">
            <input type="file" accept = ".csv" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Grades</button>
            <div className="button-container">
              <button className="return-button" onClick={toDashboard}>Return to Dashboard</button>
            </div>
        </div>
        <div className="column">
            <div className="column">
            <textarea className="generated-names" 
            value={grades.map(grade => `${grade.username}: ${grade.grade}`).join('\n')}    
            readOnly
            cols={50} rows={15}
            >
          </textarea>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TaskView;