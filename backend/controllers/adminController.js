const { getAllTasks, restoreTask } = require('../models/Task');

// Get all tasks (admin only)
const getAllTasksHandler = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

// Restore a deleted task (admin only)
const restoreTaskHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await restoreTask(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ task });
  } catch (err) {
    res.status(500).json({ message: 'Failed to restore task' });
  }
};

module.exports = {
  getAllTasksHandler,
  restoreTaskHandler,
};