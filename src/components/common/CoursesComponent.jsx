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
const CoursesComponent = ({ courses, onCourseSelect }) => {
  return (
    <div className="courses-grid">
      {courses.map((course) => (
        <div
          key={course.id}
          className="course-card"
          onClick={() => onCourseSelect(course.id)} // Invoke onCourseSelect with course ID
          style={{ cursor: "pointer" }} // Optional: change cursor to indicate clickability
        >
          <div
            className="course-thumbnail"
            style={{ backgroundColor: getRandomColor() }}
          >
            {/* Optional: if you want to display the course name or other details inside the thumbnail */}
          </div>
          <div className="course-name">{course.name}</div>
        </div>
      ))}
    </div>
  );
};
export default CoursesComponent;
