const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');  // Protect middleware

const router = express.Router();

// Route to create a task
router.post('/', protect, createTask);  // Protect route with JWT auth

// Route to get all tasks with filtering
router.get('/', protect, getTasks);  // Protect route with JWT auth

// Route to update a specific task by taskId
router.put('/:taskId', protect, updateTask);  // Protect route with JWT auth

// Route to delete a specific task by taskId
router.delete('/:taskId', protect, deleteTask);  // Protect route with JWT auth

module.exports = router;
