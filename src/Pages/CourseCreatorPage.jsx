import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/CourseCreator.css"
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CourseCreator = () => {
  useEffect(() => {
    document.title = "Add New Course"
  }, []);

  const [courseTitle, setCourseTitle] = useState('');
  const [courseName, setCourseName] = useState('');

  const [validTitle, setValidTitle] = useState(true);
  const [validName, setValidName] = useState(true);
  
  const navigate = useNavigate();

  const handleNextButtonClick = async () => {
    const titlePattern1 = /^[A-Za-z]{3}\s\d{3}$/;
    const titlePattern2 = /^[A-Za-z]{3}\d{3}$/;

    setValidTitle(courseTitle.match(titlePattern1) || courseTitle.match(titlePattern2));
    setValidName(courseName.trim() !== '');

    if (validTitle && validName) {
      try {
        const response = await axios.post(`${API_BASE_URL}/courses`, {
          title: courseTitle,
          name: courseName,
          //instructor: instructor_id // this comes from the login token thing i belive?
        });
        console.log(response);
        if (response.status === 201) {
          console.log("Fields are valid, moving to student creation.");
          const courseId = response.data.course_id;
          navigate(`/instructors/courses/${courseId}/students`);
        } 
      } catch (error) {
        console.error("Error adding course:", error.response.data);
      }
      console.log("Invalid field(s)")
    }
  }

  return (
    <div className="container">
      <h1>Add New Course</h1>
      <div className="form">

        <div className="section">
          <label>Course Title: </label>
          <input 
            type="text" 
            value={courseTitle} 
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="ABC 123"
            style={{ 
              border: validTitle ? '1px solid black' : '1px solid red',
              width: 80,
            }}
          ></input>
          <div>
                {!validTitle && <span style={{ color: 'red' }}>Please enter a valid course title in the format <strong>ABC 123</strong> or <strong>ABC123</strong></span>}
          </div>
        </div>

        <div className="section">
          <label>Course Name: </label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Introduction to Course Creation within GAME"
            style={{ 
              border: validName ? '1px solid black' : '1px solid red',
              width: 300,
            }}
          ></input>
          <div>
                {!validName && <span style={{ color: 'red' }}>Course name cannot be left blank.</span>}
          </div>
        </div>

      </div>
      <div>
        <button className="next-button" onClick={handleNextButtonClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseCreator;