import React, { useState, useEffect } from "react";
import "../styles/Announcements.css"; // Assuming you have a CSS file for styling
import CoursesComponent from "../components/common/CoursesComponent";
import PageBackGround from "../components/common/PageBackGround";
import AnnouncementComponent from "../components/instructor-components/AnnouncementComponent";


const Announcements = () => {

    const courses = [
        { id: 1, name: "SER 231 Software Design" },
        { id: 2, name: "SER 215 Software Processes" },
        { id: 3, name: "SER 322 Database Management" },
        // Add more courses if needed
      ];

    const dummyAnnouncements = [
    {
        id: 1,
        announcement: "Assignment 1 grades released",
        message: `Hello Students,


        Your assignments are graded, if you have any concerns, please email the grader who has graded your project, DO NOT email the professor or TA regarding your projects. 
        
        
        Thank you, 
        
        TA`,
        courseName: "SER 231",
        courseId: 1,
    },
    {
        id: 2,
        announcement: "Tomorrow’s class will be online.",
        message: `Hello Students,


        Tomorrow's class will be online. 
        
        
        Thank you, 
        
        Prof`,
        courseName: "SER 231",
        courseId: 1,
    },
    {
        id: 3,
        announcement: "Quiz 1 grades posted",
        message: `Hello Students,


        Your quiz results are published and now can be viewed. If you have any concerns, please email the graders. DO NOT email the professor or TA. 
        
        
        Thank you, 
        
        TA`,
        courseName: "SER 231",
        courseId: 1,
    },
    {
        id: 4,
        announcement: "Assignemnt 2 and Quiz 2 are published",
        message: `Hello Students,


        Assignemtn 2 and Quiz 2 are published. Please complete them by the given deadline. For any issues Contact the TA or me. 
        
        
        Thank you, 
        
        Prof`,
        courseName: "SER 231",
        courseId: 1,
    },
    {
        id: 5,
        announcement: "Welcome to SER 215",
        message: `Welcome to SER 215 Software Processes

        The goal of this class is to provide you with a broad overview of software processess and techniques that yield better results.
        
        Click on Modules, then find the Welcome page. 
        
        Let’s get started`,
        courseName: "SER 215",
        courseId: 1,
    },
    {
        id: 6,
        announcement: "Assignment 1 - Instructions",
        message: `Hi Everyone,

 

        The reuqired details for completing the assignments are provided in Assignemtn Instructions under Modules. If you have any concerns please reach out to me.
        
         
        
        Thanks,
        
        TA`,
        courseName: "SER 215",
        courseId: 1,
    },
    {
        id: 7,
        announcement: "Project 1 - Instructions",
        message: `Hi Everyone,

 

        For project 1 please make frequent contacts with your respective teammates. And verify the code before commiting it. If you have any concerns please rerach out to me.
        
         
        
        Thanks,
        
        TA`,
        courseName: "SER 215",
        courseId: 1,
    },
    {
        id: 8,
        announcement: "Assignment 2 released",
        message: `Hi Everyone,

 

        For project 1 please make frequent contacts with your respective teammates. And verify the code before commiting it. If you have any concerns please rerach out to me.
        
         
        
        Thanks,
        
        TA`,
        courseName: "SER 215",
        courseId: 1,
    },
    {
        id: 9,
        announcement: "Quiz 1 grades posted",
        message: `Hello Students,


        Your quiz results are published and now can be viewed. If you have any concerns, please email the graders. DO NOT email the professor or TA. 
        
        
        Thank you, 
        
        TA`,
        courseName: "SER 332",
        courseId: 1,
    },
    {
        id: 10,
        announcement: "Regarding Project",
        message: `Hi Everyone,

 

        For project 1 please make frequent contacts with your respective teammates. And verify the code before commiting it. If you have any concerns please rerach out to me.
        
         
        
        Thanks,
        
        TA`,
        courseName: "SER 332",
        courseId: 1,
    },
    {
        id: 11,
        announcement: "Quiz 1 grades posted",
        message: `Hello Students,


        Your quiz results are published and now can be viewed. If you have any concerns, please email the graders. DO NOT email the professor or TA. 
        
        
        Thank you, 
        
        TA`,
        courseName: "SER 332",
        courseId: 1,
    },
    {
        id: 12,
        announcement: "Assignment 1 - Instructions",
        message: `Hi Everyone,

 

        The reuqired details for completing the assignments are provided in Assignemtn Instructions under Modules. If you have any concerns please reach out to me.
        
         
        
        Thanks,
        
        TA`,
        courseName: "SER 332",
        courseId: 1,
    },
    ];

    // State to hold the currently selected course
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [announcementListData, setannouncementListData] = useState([]);

    // Effect to fetch and set leaderboard and task list data when a course is selected
    useEffect(() => {
    // Set a default selected course if not already selected and courses are loaded
    if (!selectedCourse && courses.length > 0) {
      setSelectedCourse(courses[0]);
    }
  }, [courses]);

  // Handler to change the selected course
  const handleCourseSelect = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    console.log("Inside handleCourseSelect course = " + course.id);
    setSelectedCourse(course);
  };

    // Useeffect to change announcments hwne clicked on a course
    useEffect(() => {
    // Update leaderboard data when selectedCourse changes
    if (selectedCourse) {
      const filteredAnnouncements = dummyAnnouncements.filter(
        (announce) => announce.courseId === selectedCourse.id
      );
      setannouncementListData(filteredAnnouncements);
    }
  }, [selectedCourse]); // This effect only depends on selectedCourse


  return (
    <div className="announcements-dashboard">
      <PageBackGround/>
      <div className="dashboard-grid">
        <div className="enrolled-courses">
          <h2>Current Courses</h2>
          <CoursesComponent
            courses={courses}
            onCourseSelect={handleCourseSelect}
          />
        </div>
        <div className="announcements">
          <h2>Announcements</h2>
          <AnnouncementComponent announcement={announcementListData} />
        </div>
      </div>
    </div>
  );

}; 

export default Announcements;