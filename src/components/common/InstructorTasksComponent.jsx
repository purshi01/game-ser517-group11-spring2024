import React, { useState, useEffect } from "react";
import TaskRow from "./TaskRow";
import "../../styles/InstructorTasksComponent.css";
import { v4 as uuidv4 } from "uuid";

function InstructorTasksComponent({
  taskListData,
  leaderboardData,
  courseId,
  fetchTasksAndLeaderboard,
}) {
  const [tasks, setTasks] = useState(taskListData || []);
  const [leaderboard, setLeaderboardData] = useState(leaderboardData || []);
  const [newTask, setNewTask] = useState({
    task_name: "",
    points: "",
    task_description: "",
  });

  useEffect(() => {
    if (taskListData) {
      setTasks(taskListData);
    }
    if (leaderboardData) {
      setLeaderboardData(leaderboardData);
    }
  }, [taskListData, leaderboardData]);

  const handleAddTask = () => {
    if (!newTask.task_name || !newTask.points || !newTask.task_description) {
      alert("Please fill in all required fields.");
      return;
    }
    const taskId = uuidv4();
    const taskToAdd = { ...newTask, task_id: taskId }; // Use UUID for unique ID
    setTasks([...tasks, taskToAdd]);
    setNewTask({ task_name: "", points: "", task_description: "" });
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.task_id === updatedTask.task_id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/delete_task/${courseId}/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the task");
      } else {
        await fetchTasksAndLeaderboard(courseId);
      }

      const result = await response.json();
      alert(result.message); // Alert the success message
      // Update local state only after confirming the task was deleted on the server
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };
  return (
    <div className="tasks-container">
      <div className="new-task">
        <input
          type="text"
          value={newTask.task_name}
          onChange={(e) =>
            setNewTask({ ...newTask, task_name: e.target.value })
          }
          placeholder="New Task Title"
          required
        />
        <input
          type="text"
          value={newTask.task_description}
          onChange={(e) =>
            setNewTask({ ...newTask, task_description: e.target.value })
          }
          placeholder="New Task description"
          required
        />
        <input
          type="number"
          value={newTask.points}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              points: parseInt(e.target.value, 10) || 0,
            })
          }
          placeholder="Task Points"
          required
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      {tasks.map((task, index) => (
        <TaskRow
          key={task.task_id}
          taskNumber={index + 1}
          courseId={courseId}
          task={task}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          leaderboardData={leaderboardData}
          fetchTasksAndLeaderboard={fetchTasksAndLeaderboard}
        />
      ))}
    </div>
  );
}

export default InstructorTasksComponent;
