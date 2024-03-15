import React from "react";
import CoursesComponent from "../components/common/CoursesComponent"; // Adjust the path as needed

const InstructorDashboard = () => {
  // Dummy course data, you might fetch this from an API in a real app
  const courses = [
    {
      id: 1,
      name: "Introduction to Programming",
      description: "Learn the basics of programming with this beginner course.",
      enrolledStudents: 150,
    },
    {
      id: 2,
      name: "Advanced Web Development",
      description: "Dive deeper into web development with advanced topics.",
      enrolledStudents: 75,
    },
  ];

  return (
    <div className="instructor-dashboard">
      <div className="courses">
        {courses.map((course) => (
          <CoursesComponent
            key={course.id}
            courseName={course.name}
            description={course.description}
            enrolledStudents={course.enrolledStudents}
          />
        ))}
      </div>
    </div>
  );
};

export default InstructorDashboard;
