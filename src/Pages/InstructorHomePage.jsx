import React, { useState, useEffect } from "react";
import CoursesComponent from "../components/common/CoursesComponent";
import LeaderboardComponent from "../components/common/LeaderboardComponent"; // Import the LeaderboardComponent
import TasksComponent from "../components/common/TasksComponent"; // Import the TasksComponent
import "../styles/InstructorHomePage.css";
import "../styles/StudentHomePage.css";
import StoreItem from "../components/common/StoreItem";

const InstructorDashboard = () => {
  // Dummy course data - replace this with actual data, perhaps fetched from an API
  const [courses, setCourses] = useState([
    { id: 1, name: "Course 1" },
    { id: 2, name: "Course 2" },
    { id: 3, name: "Course 3" },
  ]);

  const dummyLeaders = [
    {
      id: 1,
      name: "Vanessa",
      lastName: "Lason",
      score: 41,
      courseName: "SER 231",
      courseId: 1,
      imageUrl:
        "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      name: "Jose",
      lastName: "Roberts",
      score: 29,
      courseName: "SER 215",
      courseId: 1,
      imageUrl: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Jose+R",
    },
    {
      id: 3,
      name: "Bob",
      lastName: "Keebler",
      score: 18,
      courseName: "SER 322",
      courseId: 1,
      imageUrl: "https://via.placeholder.com/150/FFFF00/000000?text=Bob+K",
    },
    {
      id: 4,
      name: "Alice",
      lastName: "Wonderland",
      score: 35,
      courseName: "SER 101",
      courseId: 2,
      imageUrl: "https://via.placeholder.com/150/000000/FFFFFF?text=Alice+W",
    },
    {
      id: 5,
      name: "Marco",
      lastName: "Polo",
      score: 23,
      courseName: "SER 201",
      courseId: 2,
      imageUrl: "https://via.placeholder.com/150/008000/FFFFFF?text=Marco+P",
    },
    {
      id: 6,
      name: "Jessica",
      lastName: "Jones",
      score: 47,
      courseName: "SER 303",
      courseId: 2,
      imageUrl: "https://via.placeholder.com/150/00FFFF/000000?text=Jessica+J",
    },
    {
      id: 7,
      name: "Clark",
      lastName: "Kent",
      score: 50,
      courseName: "SER 404",
      courseId: 3,
      imageUrl: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Clark+K",
    },
    {
      id: 8,
      name: "Diana",
      lastName: "Prince",
      score: 38,
      courseName: "SER 505",
      courseId: 3,
      imageUrl: "https://via.placeholder.com/150/FFFFFF/808080?text=Diana+P",
    },
    {
      id: 9,
      name: "Bruce",
      lastName: "Wayne",
      score: 42,
      courseName: "SER 606",
      courseId: 3,
      imageUrl: "https://via.placeholder.com/150/000000/FFFFFF?text=Bruce+W",
    },
    {
      id: 10,
      name: "Tony",
      lastName: "Stark",
      score: 36,
      courseName: "SER 707",
      courseId: 4,
      imageUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=Tony+S",
    },
  ];

  const dummyTasks = [
    {
      id: 1,
      courseId: 1,
      title: "Design Patterns Assignment",
      completed: true,
    },
    { id: 2, courseId: 1, title: "UML Diagrams Homework", completed: false },
    { id: 3, courseId: 2, title: "Agile Methodologies Quiz", completed: true },
    { id: 4, courseId: 3, title: "Normalization Lab", completed: false },
    { id: 5, courseId: 4, title: "Binary Trees Exercise", completed: true },
    // Add more tasks as needed
  ];

  const [items, setItems] = useState([
    // Existing item for Course 1
    {
      name: "Example Item 1",
      price: "100",
      quantity: "5",
      imageUrl: "https://example.com/image1.jpg",
      courseId: 1,
    },
    // Adding more items for Course 1
    {
      name: "Course 1 Textbook",
      price: "50",
      quantity: "10",
      imageUrl: "https://example.com/course1textbook.jpg",
      courseId: 1,
    },
    {
      name: "Course 1 Workbook",
      price: "30",
      quantity: "15",
      imageUrl: "https://example.com/course1workbook.jpg",
      courseId: 1,
    },
    // Items for Course 2
    {
      name: "Course 2 Calculator",
      price: "20",
      quantity: "25",
      imageUrl: "https://example.com/course2calculator.jpg",
      courseId: 2,
    },
    {
      name: "Course 2 Lab Kit",
      price: "100",
      quantity: "8",
      imageUrl: "https://example.com/course2labkit.jpg",
      courseId: 2,
    },
    // Items for Course 3
    {
      name: "Course 3 Notebook",
      price: "10",
      quantity: "50",
      imageUrl: "https://example.com/course3notebook.jpg",
      courseId: 3,
    },
    {
      name: "Course 3 Pen Set",
      price: "5",
      quantity: "100",
      imageUrl: "https://example.com/course3penset.jpg",
      courseId: 3,
    },
  ]);

  const [newCourseName, setNewCourseName] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState(dummyLeaders);
  const [studentCount, setStudentCount] = useState("");
  const [taskListData, setTaskListData] = useState(dummyTasks);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });

  useEffect(() => {
    setLeaderboardData(dummyLeaders);
    setTaskListData(dummyTasks);
  }, []); // This effect only depends on selectedCourse

  const addNewLeader = () => {
    const newLeader = {
      id:
        leaderboardData.length > 0
          ? Math.max(...leaderboardData.map((l) => l.id)) + 1
          : 1,
      name: "", // Placeholder name
      score: 0, // Placeholder score
      courseName: "New Course", // Placeholder courseName
      courseId: selectedCourseId, // Assign to the currently selected course
      imageUrl: "https://via.placeholder.com/150", // Placeholder image
    };
    setLeaderboardData([...leaderboardData, newLeader]);
  };

  // Function to save changes
  const saveLeaderboardChanges = (updatedLeaders) => {
    setLeaderboardData(updatedLeaders);
    // Handle saving to a backend or local storage here
  };

  const handleCourseSelect = (courseId) => {
    console.log("Selected course ID:", courseId);
    setSelectedCourseId(courseId);

    // Filter the leaderboard and tasks for the selected course
    const filteredLeaders = dummyLeaders.filter(
      (leader) => leader.courseId === courseId
    );
    setLeaderboardData(filteredLeaders);

    const filteredTasks = dummyTasks.filter(
      (task) => task.courseId === courseId
    );
    setTaskListData(filteredTasks);
  };

  // Function to add a new course
  const addNewCourse = () => {
    if (!newCourseName.trim()) {
      alert("Please enter a course name.");
      return;
    }
    const newCourse = {
      id: courses.length + 1, // Simple id generation for example purposes
      name: newCourseName,
    };
    setCourses([...courses, newCourse]);
    setNewCourseName(""); // Reset the new course name input
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newItem.name ||
      !newItem.price ||
      !newItem.quantity ||
      !newItem.imageUrl
    ) {
      alert("Please fill in all fields.");
      return;
    }
    // Include the selectedCourseId with the new item
    const itemWithCourseId = { ...newItem, courseId: selectedCourseId };
    setItems([...items, itemWithCourseId]);
    setNewItem({ name: "", price: "", quantity: "", imageUrl: "" }); // Reset form
  };
  // Handler for changing student count
  const handleStudentCountChange = (e) => {
    setStudentCount(e.target.value);
  };
  // Function to generate IDs & Passwords then add to leaderboard
  const generateIDsAndPasswords = () => {
    const count = parseInt(studentCount, 10);
    if (!count || count <= 0) {
      alert("Please enter a valid number of students.");
      return;
    }

    const newEntries = [];
    for (let i = 0; i < count; i++) {
      const username = `user${i + 1}`;
      const password = `pass${Math.random().toString(36).slice(-8)}`; // Simple random password generator
      newEntries.push({
        id: leaderboardData.length + i + 1, // Ensure unique ID
        name: username,
        score: "N/A", // Adjust based on your requirements
        courseId: selectedCourseId, // Assuming you have a way to determine the current course ID
        imageUrl: "https://via.placeholder.com/150", // Placeholder or adjust as needed
        password, // Including password for demonstration; consider how you manage/store this securely
      });
    }

    setLeaderboardData([...leaderboardData, ...newEntries]);
    setStudentCount(""); // Reset student count
  };

  return (
    <div className="instructor-dashboard">
      <div className="dashboard-grid-1">
        <CoursesComponent
          courses={courses}
          onCourseSelect={handleCourseSelect}
        />
        <input
          type="text"
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
          placeholder="Enter new course name"
        />
        <button onClick={addNewCourse}>Add Course</button>

        <input
          type="text"
          value={studentCount}
          onChange={handleStudentCountChange}
          placeholder="Enter number of students in this course"
        />
        <button onClick={generateIDsAndPasswords}>
          Generate IDs & Passwords
        </button>
      </div>

      {selectedCourseId && (
        <div className="dashboard-grid">
          <div className="leaderboard">
            <h2>Store Item</h2>
            <form onSubmit={handleSubmit} className="store-form">
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={newItem.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={newItem.price}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={newItem.imageUrl}
                onChange={handleInputChange}
              />
              <button type="submit">Add Item</button>
            </form>
            <div className="store-grid">
              {items
                .filter((item) => item.courseId === selectedCourseId) // Only show items for the selected course
                .map((item, index) => (
                  <StoreItem key={index} item={item} />
                ))}
            </div>
          </div>
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <LeaderboardComponent
              leaders={leaderboardData}
              onSaveChanges={saveLeaderboardChanges}
              onAddLeader={addNewLeader}
            />
          </div>
          <div className="tasks">
            <TasksComponent tasks={taskListData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
