import React, { useState, useEffect } from 'react';
import { getTasks, createTask } from '../services/taskService';
import TaskCard from '../components/TaskCard';
import '../styles/TaskList.css'; // Make sure this path is correct

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]); // Defaulting to an empty array

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const taskData = await getTasks(); // Make sure your getTasks function handles fetching correctly
      setTasks(taskData || []); // Ensure tasks is set to an empty array if data is null or undefined
    };
    fetchTasks();
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <div className="task-dashboard">
      <h2>Your Tasks</h2>
      <div className="task-list">
        {/* Only map if tasks is an array */}
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} /> // Rendering each task
          ))
        ) : (
          <p>No tasks available</p> // Display a message if there are no tasks
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
