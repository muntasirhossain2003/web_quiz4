const Task = require('../models/Task');

// Create Task
const createTask = async (req, res) => {
  const { title, description, dueDate, priority, category } = req.body;
  const userId = req.user.userId;  // Get the userId from the JWT token

  const task = new Task({
    title,
    description,
    dueDate,
    priority,
    category,
    user: userId,  // Associate the task with the logged-in user
  });

  await task.save();
  res.status(201).json(task);
};

// Get All Tasks (with filter and sort)
const getTasks = async (req, res) => {
  const { priority, category, search } = req.query;
  const filter = { user: req.user.userId };  // Only fetch tasks for the logged-in user

  if (priority) filter.priority = priority;
  if (category) filter.category = category;
  if (search) filter.$text = { $search: search }; // Enable text search

  const tasks = await Task.find(filter).sort({ dueDate: 'asc' });
  res.json(tasks);
};

// Update Task
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, dueDate, priority, category, completed } = req.body;

  const task = await Task.findByIdAndUpdate(taskId, {
    title,
    description,
    dueDate,
    priority,
    category,
    completed,
  }, { new: true });

  res.json(task);
};

// Delete Task
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  await Task.findByIdAndDelete(taskId);
  res.status(200).json({ message: 'Task deleted' });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
