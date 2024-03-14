import React, { useState, useEffect } from "react";
import "../styles/Announcements.css"; // Assuming you have a CSS file for styling
import CoursesComponent from "../components/common/CoursesComponent";
import PageBackGround from "../components/common/PageBackGround";


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
        Thank you, TA`,
        courseName: "SER 231",
        courseId: 1,
    },
    {
        id: 2,
        announcement: "Tomorrow’s class will be online.",
        message: `Hello Students,
        Tomorrow's class will be online. 
        Thank you, Prof`,
        courseName: "SER 231",
        courseId: 1,
    },
    {
        id: 3,
        announcement: "Quiz 1 grades released",
        message: `Hello Students,
        Your quiz results are published and now can be viewed. If you have any concerns, please email the graders. DO NOT email the professor or TA. 
        Thank you, TA`,
        courseName: "SER 231",
        courseId: 1,
    },
    {
        id: 4,
        announcement: "Assignemnt 2 and Quiz 2 are published",
        message: `Hello Students,
        Assignemtn 2 and Quiz 2 are published. Please complete them by the given deadline. For any issues Contact the TA or me. 
        Thank you, Prof`,
        courseName: "SER 231",
        courseId: 1,
    },
    {
        id: 5,
        announcement: "Assignment 1 grades released",
        message: `Hello Students,
        Your assignments are graded, if you have any concerns, please email the grader who has graded your project, DO NOT email the professor or TA regarding your projects. 
        Thank you, TA`,
        courseName: "SER 231",
        courseId: 1,
    },
    {
        id: 6,
        announcement: "Tomorrow’s class will be online.",
        message: `Hello Students,
        Tomorrow's class will be online. 
        Thank you, Prof`,
        courseName: "SER 231",
        courseId: 1,
    },
    {
        id: 7,
        announcement: "Assignment 1 grades released",
        message: `Hello Students,
        Your assignments are graded, if you have any concerns, please email the grader who has graded your project, DO NOT email the professor or TA regarding your projects. 
        Thank you, TA`,
        courseName: "SER 231",
        courseId: 1,
    },
    {
        id: 8,
        announcement: "Tomorrow’s class will be online.",
        message: `Hello Students,
        Tomorrow's class will be online. 
        Thank you, Prof`,
        courseName: "SER 231",
        courseId: 1,
    },
    {
        id: 9,
        announcement: "Assignment 1 grades released",
        message: `Hello Students,
        Your assignments are graded, if you have any concerns, please email the grader who has graded your project, DO NOT email the professor or TA regarding your projects. 
        Thank you, TA`,
        courseName: "SER 231",
        courseId: 1,
    },
    {
        id: 10,
        announcement: "Tomorrow’s class will be online.",
        message: `Hello Students,
        Tomorrow's class will be online. 
        Thank you, Prof`,
        courseName: "SER 231",
        courseId: 1,
    },
    {
        id: 11,
        announcement: "Assignment 1 grades released",
        message: `Hello Students,
        Your assignments are graded, if you have any concerns, please email the grader who has graded your project, DO NOT email the professor or TA regarding your projects. 
        Thank you, TA`,
        courseName: "SER 231",
        courseId: 1,
    },
    {
        id: 12,
        announcement: "Tomorrow’s class will be online.",
        message: `Hello Students,
        Tomorrow's class will be online. 
        Thank you, Prof`,
        courseName: "SER 231",
        courseId: 1,
    },
    ];

}; 

export default Announcements;