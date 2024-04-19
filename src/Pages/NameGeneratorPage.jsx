import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/NameGenerator.css"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const NameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState('');
  const [numOfStudents, setNumOfStudents] = useState('1');

  const {course_name} = useParams('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Student Accounts"
  }, []);

  const addStudents = async () => {
    const num = parseInt(numOfStudents);
    if (!isNaN(num) && num > 0) {
      const newStudents = [];
      try {
        const generate_response = await axios.post(`${API_BASE_URL}/generate_students`, {
          n: num,
          course_name: course_name,
        });
        console.log(generate_response);
        const read_response = await axios.post(`${API_BASE_URL}/get_student_accounts`, {
          course_name: course_name,
        });
        console.log(read_response);
        newStudents.push(read_response);
        setGeneratedNames(read_response);
      } catch (error) {
        console.error('Error adding student to course:', error);
      }
    }
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(generatedNames);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `${course_name}.csv`);
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