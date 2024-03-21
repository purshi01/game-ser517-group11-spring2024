import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/CourseCreator.css"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CourseCreator = () => {
  useEffect(() => {
    document.title = "Add New Course"
  }, []);

  const [courseTitle, setCourseTitle] = useState('ABC 123')
  const [courseName, setCourseName] = useState('Introduction to Course Creation')
  const [courseID, setCourseID] = useState('12345')

  return (
    <div className="container">
      <h1>Add New Course</h1>
      <div className="form">
        <div className="section">
          <label>Course Title: </label>
          <textarea rows={1} cols={8}
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          ></textarea>
        </div>
        <div className="section">
          <label>Course Name: </label>
          <textarea rows={1} cols={50}
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          ></textarea>
        </div>
        <div className="section">
          <label>Course ID: </label>
          <textarea rows={1} cols={5}
          value={courseID}
          onChange={(e) => setCourseName(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div>
        <button className="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

/*
          <div>
            <textarea className="number-of-students" 
            value={numOfStudents}
            cols={3} rows={1} 
            typeof="number" 
            onChange={(e) => setNumOfStudents(e.target.value)}
            ></textarea>
          </div>
*/

export default CourseCreator;
