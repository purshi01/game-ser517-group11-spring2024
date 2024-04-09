import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/NameGenerator.css"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const NameGenerator = () => {
  useEffect(() => {
    document.title = "Add Student Accounts"
  }, []);

  const [generatedNames, setGeneratedNames] = useState('');
  const [numOfStudents, setNumOfStudents] = useState('1');

  const {courseId, courseTitle} = useParams();
  const navigate = useNavigate();

  const addStudents = async () => {
    const num = parseInt(numOfStudents);
    if (!isNaN(num) && num > 0) {
      const newStudents = [];
      for (let i = 0; i < num; i++) {
        try {
          const response = await axios.post(`/instructors/courses/${courseId}/students`)
          console.log(response.data);
          const newStudent = response.data;
          newStudents.push(`${newStudent.username},${newStudent.password}`);
        } catch (error) {
          console.error('Error adding student to course:', error);
        }
      }
      if(generatedNames === '') {
        setGeneratedNames(newStudents.join('\n'))
      } else {
        setGeneratedNames(prevNames => prevNames + '\n' + newStudents.join('\n'));
      }
    }
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(generatedNames);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `${courseTitle}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const toDashboard = () => {
    // Need this as a method rather than directly there since it was immediately going
    navigate(`/instructor-dashboard`);
  }

  return (
    <div className="container">
      <h1>Generate Student Accounts</h1>
      <div className="columns">
        <div className="column">
          <textarea className="generated-names" 
            value={generatedNames} 
            readOnly 
            cols={50} rows={15}
            >
          </textarea>
        </div>
        <div className="column">
          <input className="number-of-students"
            type="number"
            value={numOfStudents}
            min={1}
            max={500} // TODO get actual max
            onChange={(e) => setNumOfStudents(e.target.value)}
          ></input>
          <div className="button-container">
            <button className="generate-button" onClick={addStudents}>Generate Students</button>
          </div>
          <div className="button-container">
            <button className="download-button" onClick={downloadCSV}>Download as a .csv file</button>
          </div>
          <div className="button-container">
            <button className="return-button" onClick={toDashboard}>Return to Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameGenerator;