import React, { useState } from "react";
import CoursesComponent from "../components/common/CoursesComponent"; // Adjust the import path as needed

const InstructorDashboard = () => {
  // Dummy course data - replace this with actual data, perhaps fetched from an API
  const [courses, setCourses] = useState([
    { id: 1, name: "Course 1" },
    { id: 2, name: "Course 2" },
    { id: 3, name: "Course 3" },
  ]);

  const handleCourseSelect = (courseId) => {
    console.log("Selected course ID:", courseId);
    // Here, implement what should happen when a course is selected
    // For example, navigate to the course details page or load the course content
  };

  return (
    <div className="instructor-dashboard">
      <h1>Welcome to the Instructor Dashboard</h1>
      <p>
        This section is dedicated to instructors. It provides access to course
        management, student progress tracking, and resources for creating and
        updating course material.
      </p>
      <CoursesComponent courses={courses} onCourseSelect={handleCourseSelect} />
      {/* Further implementation */}
    </div>
  );
};

export default InstructorDashboard;
