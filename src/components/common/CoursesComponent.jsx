import React from "react";
import "../../styles/CoursesComponent.css";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CoursesComponent = ({ courses, onCourseSelect, onDeleteCourse }) => {
  const handleDelete = (event, courseId) => {
    event.stopPropagation(); // Prevent onCourseSelect from being called
    onDeleteCourse(courseId); // Invoke onDeleteCourse with the course ID
  };

  return (
    <div className="courses-grid">
      {courses.map((course) => (
        <div
          key={course.id}
          className="course-card"
          onClick={() => onCourseSelect(course.id, course.name)}
          style={{ cursor: "pointer" }}
        >
          <div
            className="course-thumbnail"
            style={{ backgroundColor: getRandomColor() }}
          >
            <button
              className="delete-button"
              onClick={(event) => handleDelete(event, course.id)}
            >
              X
            </button>
          </div>
          <div className="course-name">Course Name: {course.name}</div>
        </div>
      ))}
    </div>
  );
};

export default CoursesComponent;
