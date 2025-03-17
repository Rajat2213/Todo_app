const { 
  createTask, 
  getTasksByUser, 
  updateTask, 
  deleteTask, 
  getAllTasks, 
  restoreTask 
} = require('../models/Task');

const createTaskHandler = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;

  try {
    const task = await createTask(userId, title, description);
    res.status(201).json({ task });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

const getTasksHandler = async (req, res) => {
  const userId = req.userId;

  try {
    const tasks = await getTasksByUser(userId);
    res.json({ tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

const updateTaskHandler = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const userId = req.userId;

  try {
    const task = await updateTask(id, userId, { title, description, completed });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ task });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

const deleteTaskHandler = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const task = await deleteTask(id, userId);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

// Get all tasks (Admin only)
const getAllTasksHandler = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json({ tasks });
  } catch (err) {
    console.error("Error fetching all tasks:", err);
    res.status(500).json({ message: 'Failed to fetch all tasks' });
  }
};

// Restore a deleted task (Admin only)
const restoreTaskHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await restoreTask(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task restored successfully', task });
  } catch (err) {
    console.error("Error restoring task:", err);
    res.status(500).json({ message: 'Failed to restore task' });
  }
};

module.exports = {
  createTaskHandler,
  getTasksHandler,
  updateTaskHandler,
  deleteTaskHandler,
  getAllTasksHandler,
  restoreTaskHandler
};
