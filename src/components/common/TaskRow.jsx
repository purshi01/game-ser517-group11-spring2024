import React, { useState } from "react";
import "../../styles/InstructorTasksComponent.css";
import * as XLSX from "xlsx";

function TaskRow({
  courseId,
  taskNumber,
  task,
  onUpdate,
  onDelete,
  fetchTasksAndLeaderboard,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [fileData, setFileData] = useState(null);

  const handleEditChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (fileData) {
      // Use the file data if present
      const payload = {
        task_id: task.task_id,
        students: fileData,
        task_title: editedTask.task_name,
        task_description: editedTask.task_description,
        task_points: editedTask.points,
        course_id: courseId,
      };
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/upsert_task_scores`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update task");
        } else {
          await fetchTasksAndLeaderboard(courseId);
        }

        const updatedData = await response.json();
        onUpdate(updatedData); // Assuming the API returns the updated task object
        alert("Task updated successfully!");
        setIsEditing(false);
      } catch (error) {
        console.error("Update error:", error);
        alert("Failed to update task. Please try again.");
      }
    } else {
      // Fallback if no file data is provided
      onUpdate(editedTask);
      setIsEditing(false);
    }
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("No file selected!");
      return;
    }

    try {
      // Read the file into memory
      const data = await file.arrayBuffer();
      // Parse the data into a workbook
      const workbook = XLSX.read(data);
      // Assume the first sheet is the one we need
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      // Convert the sheet into a JSON array
      const json = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
      });

      // Assuming the first row contains headers and they are "Username" and "Points"
      const headers = json[0];
      const usernameIndex = headers.indexOf("username");
      const pointsIndex = headers.indexOf("points");

      // Filter and map the rows to get an array of objects with usernames and points
      const students = json
        .slice(1)
        .filter(
          (row) =>
            row[usernameIndex].trim() !== "" &&
            !isNaN(parseFloat(row[pointsIndex]))
        )
        .map((row) => ({
          username: row[usernameIndex].trim(),
          points: parseFloat(row[pointsIndex]),
        }));

      console.log("Extracted students data:", students);
      setFileData(students);
    } catch (error) {
      console.error("Failed to read or process the Excel file:", error);
      alert(
        "Failed to process the file. Please check the file format and try again."
      );
    }
  };

  return (
    // In the TaskRow component
    <div className="task-row">
      <div className="task-details-container">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTask.task_name}
              name="task_name"
              onChange={handleEditChange}
            />
            <input
              type="number"
              value={editedTask.points}
              name="points"
              onChange={handleEditChange}
            />
            <input
              type="text"
              value={editedTask.task_description}
              name="task_description"
              onChange={handleEditChange}
            />
          </>
        ) : (
          <>
            <div className="task-info">
              <span className="task-title">{task.task_name}</span>
              <span className="task-details">
                [Task: {taskNumber}] Points: {task.points}
              </span>
              <span className="task-title">{task.task_description}</span>
            </div>
          </>
        )}
      </div>
      <div className="task-actions-container">
        <input
          type="file"
          accept=".xls, .xlsx"
          onChange={handleFileChange}
          disabled={!isEditing}
        />
        {isEditing ? (
          <button onClick={handleSave} className="save">
            Save
          </button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="edit">
              Edit
            </button>
            <button onClick={() => onDelete(task.task_id)} className="delete">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskRow;
