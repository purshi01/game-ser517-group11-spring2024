import React, { useState, useEffect } from "react";
import CoursesComponent from "../components/common/CoursesComponent";
import LeaderboardComponent from "../components/common/LeaderboardComponent"; // Import the LeaderboardComponent
import InstructorTasksComponent from "../components/common/InstructorTasksComponent"; // Import the TasksComponent
import "../styles/InstructorHomePage.css";
import "../styles/StudentHomePage.css";
import "../styles/InstructorTasksComponent.css";
import StoreItem from "../components/common/StoreItem";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [items, setItems] = useState([]);

  const [newCourseName, setNewCourseName] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courseName, setSelectedCourseName] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [studentCount, setStudentCount] = useState("");
  const [taskListData, setTaskListData] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "", // Added description to state
    image: null,
  });

  // const [items, setItems] = useState([]);
  const [generationMessage, setGenerationMessage] = useState("");
  const proffesorId = localStorage.getItem("professorId");

  useEffect(() => {
    fetchCourses();
    if (selectedCourseId) {
      fetchTasksAndLeaderboard(selectedCourseId);
    }
    if (selectedCourseId) {
      getItems(selectedCourseId).then(setItems);
    }
  }, [selectedCourseId]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/read_course_table`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const filteredCourses = data
        .filter((course) => course.professor_id === proffesorId)
        .map((course) => ({
          id: course.course_id,
          name: course.course_name,
        }));
      setCourses(filteredCourses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const fetchLeaderBoard = async (courseId) => {
    try {
      const leaderboardResponse = await fetch(
        `${API_BASE_URL}/leaderboard/${courseId}`,
        {
          method: "GET",
        }
      );
      if (!leaderboardResponse.ok) {
        throw new Error("Failed to fetch student task data");
      }
      let leaderboard = await leaderboardResponse.json();
      setLeaderboardData(leaderboard);
    } catch (error) {
      console.error("Failed to fetch LeaderBoard:", error);
    }
  };

  const fetchTaskList = async (courseId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/task/course/${courseId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const tasks = await response.json();
      setTaskListData(tasks); // Assuming the response directly gives the tasks
    } catch (error) {
      console.error("Error loading tasks:", error);
      setTaskListData([]); // Reset or handle errors as needed
    }
  };

  const fetchTasksAndLeaderboard = (courseId) => {
    try {
      fetchTaskList(courseId);
      fetchLeaderBoard(courseId);
    } catch (error) {
      console.error("Error fetching tasks or leaderboard:", error);
    }
  };

  const handleCourseSelect = async (courseId, courseName) => {
    console.log("Selected course ID:", courseId);
    setSelectedCourseId(courseId);
    setSelectedCourseName(courseName);
    fetchTasksAndLeaderboard(courseId);
    const studentDataResponse = await fetch(
      `${API_BASE_URL}/students/course/${courseId}`,
      {
        method: "GET",
      }
    );

    if (!studentDataResponse.ok) {
      throw new Error("Failed to fetch generated student data");
    }
    let students = await studentDataResponse.json();

    if (students.length === 0) {
      return;
    } else {
      setGenerationMessage(
        "Student IDs and passwords have been generated Already !!!."
      );
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/delete_course/${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the Course");
      } else {
        await fetchCourses();
      }

      const result = await response.json();
      alert(result.message); // Alert the success message
      // Update local state only after confirming the task was deleted on the server
    } catch (error) {
      console.error("Error deleting Course:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  // Function to add a new course
  const addNewCourse = async () => {
    if (!newCourseName.trim()) {
      alert("Please enter a course name.");
      return;
    }

    const courseId = uuidv4();

    const newCourse = {
      professor_id: proffesorId,
      course_id: courseId,
      course_name: newCourseName,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/upsert_course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Success:", responseData);

      // If the API call is successful, update the local state
      setCourses([...courses, { id: courseId, name: newCourseName }]);
      setNewCourseName(""); // Reset the new course name input
    } catch (error) {
      console.error("Failed to add new course:", error);
      alert("Failed to add new course. Please try again.");
    }
  };

  const downloadStudentsExcel = (studentsData) => {
    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(studentsData);

    // Add the worksheet to the workbook under the name "Students"
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    // Generate an XLSX file and trigger download
    XLSX.writeFile(
      wb,
      `students_course_${studentsData[0]?.course_id || "unknown"}_${
        new Date().toISOString().split("T")[0]
      }.xlsx`
    );
  };

  // New function to generate student IDs and download them as an Excel file
  const generateIDsAndPasswords = async () => {
    const count = parseInt(studentCount, 10);
    if (!count || count <= 0) {
      alert("Please enter a valid number of students.");
      return;
    }

    // Prepare the data for the API call
    const requestData = {
      n: count,
      course_id: selectedCourseId, // Use the selected course ID from your state
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/generate_and_upsert_students`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate student IDs and passwords");
      }

      const fetchDataResponse = await fetch(
        `${API_BASE_URL}/students/course/${selectedCourseId}`,
        {
          method: "GET",
        }
      );

      if (!fetchDataResponse.ok) {
        throw new Error("Failed to fetch generated student data");
      }
      let students = await fetchDataResponse.json();

      if (students.length === 0) {
        return;
      } else {
        setGenerationMessage("Student IDs and passwords have been generated.");
      }

      downloadStudentsExcel(students);
      setStudentCount("");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate and download student data. Please try again.");
      setGenerationMessage(
        "Failed to generate student IDs and passwords. Please try again."
      );
    }
  };

  async function addItem(newItem) {
    const item_id = uuidv4();
    const jsonBody = JSON.stringify({
      item_id: item_id,
      item_name: newItem.name,
      price: newItem.price,
      item_quantity: newItem.quantity,
      description: newItem.description,
      course_id: selectedCourseId,
    });

    const response = await fetch(`${API_BASE_URL}/upsert_shop_items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonBody,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log("Item added successfully:", responseData);
  }

  async function getItems(courseId) {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${courseId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const itemsData = await response.json(); // Correctly parse the JSON response
      setItems(itemsData);
      console.log("Retrieved items:", itemsData);
      return itemsData;
    } catch (error) {
      console.error("Failed to retrieve items:", error);
      throw error; // It's a good practice to re-throw the error if you are handling it elsewhere
    }
  }

  async function deleteItem(itemId) {
    const response = await fetch(
      `${API_BASE_URL}/delete_item/${selectedCourseId}/${itemId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    getItems(selectedCourseId);
    console.log("Item deleted successfully");
  }

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addItem(newItem);
      setNewItem({ name: "", price: "", quantity: "", description: "" });
      getItems(selectedCourseId); // Refresh the items list
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const onUpdate = async (updatedItem) => {
    try {
      const jsonBody = JSON.stringify({
        item_id: updatedItem.item_id,
        item_name: updatedItem.item_name,
        price: updatedItem.points,
        item_quantity: updatedItem.quantity,
        description: updatedItem.description,
        course_id: updatedItem.course_id,
      });
      const response = await fetch(`${API_BASE_URL}/upsert_shop_items`, {
        method: "POST", // or 'PATCH' if partially updating
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonBody,
      });

      if (response.ok) {
        // Update was successful, update state to reflect the changes
        getItems(selectedCourseId);
      } else {
        // Handle any errors
        throw new Error("Update failed: " + response.statusText);
      }
    } catch (error) {
      console.error(error);
      // Optionally inform the user that the update failed
    }
  };

  return (
    <div className="instructor-dashboard">
      <div className="dashboard-grid-1">
        <CoursesComponent
          courses={courses}
          onCourseSelect={handleCourseSelect}
          onDeleteCourse={handleDeleteCourse}
        />
        <p>Course Selected : {courseName}</p>
        <input
          type="text"
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
          placeholder="Enter new course name"
        />
        <button onClick={addNewCourse}>Add Course</button>

        {selectedCourseId && (
          <div>
            <input
              type="text"
              value={studentCount}
              onChange={(e) => setStudentCount(e.target.value)}
              placeholder="Enter number of students in this course"
            />
            <button onClick={generateIDsAndPasswords}>
              Generate IDs & Passwords
            </button>
            {generationMessage && <div>{generationMessage}</div>}
          </div>
        )}
      </div>
      {selectedCourseId && (
        <div className="dashboard-task-grid">
          {/* Possibly other components like leaderboard, etc. */}
          <InstructorTasksComponent
            taskListData={taskListData}
            courseId={selectedCourseId}
            leaderboardData={leaderboardData}
            fetchTasksAndLeaderboard={fetchTasksAndLeaderboard}
          />
        </div>
      )}
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
              <textarea
                name="description"
                placeholder="Description"
                value={newItem.description}
                onChange={handleInputChange}
                rows="3" // Sets the height of the textarea
              />
              {/* <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
              /> */}
              <button type="submit">Add Item</button>
            </form>

            <div className="store-grid">
              {items
                .filter((item) => item.course_id === selectedCourseId)
                .map((item, index) => (
                  <StoreItem
                    key={index}
                    item={item}
                    onDelete={deleteItem}
                    onUpdate={onUpdate}
                  />
                ))}
            </div>
          </div>
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <LeaderboardComponent leaders={leaderboardData} />
          </div>
          {/* <div className="completed-tasks">
            <TasksComponent tasks={taskListData} />
          </div> */}
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
