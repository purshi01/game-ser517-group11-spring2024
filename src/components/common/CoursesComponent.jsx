// CoursesComponent.js
import React from 'react';
import '../../styles/CoursesComponent.css'

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CoursesComponent = ({ courses }) => {
  return (
    <div className="courses-grid">
      {courses.map(course => (
        <div key={course.id} className="course-card">
          <div
            className="course-thumbnail"
            style={{ backgroundColor: getRandomColor() }}
          >
            {/* Thumbnail image here */}
          </div>
          <div className="course-name">{course.name}</div>
        </div>
      ))}
    </div>
  );
};

export default CoursesComponent;
