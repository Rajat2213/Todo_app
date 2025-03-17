const pool = require('../config/db');

// Create a new task
const createTask = async (userId, title, description) => {
  const query = `
    INSERT INTO tasks (user_id, title, description)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [userId, title, description];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Get all tasks for a user
const getTasksByUser = async (userId) => {
  const query = 'SELECT * FROM tasks WHERE user_id = $1';
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

// Update a task
const updateTask = async (id, userId, { title, description, completed }) => {
  const query = `
    UPDATE tasks
    SET title = $1, description = $2, completed = $3
    WHERE id = $4 AND user_id = $5
    RETURNING *
  `;
  const values = [title, description, completed, id, userId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Delete a task (soft delete)
const deleteTask = async (id, userId) => {
  const query = `
    UPDATE tasks
    SET deleted_at = NOW()
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;
  const { rows } = await pool.query(query, [id, userId]);
  return rows[0];
};

// Get all tasks (admin only)
const getAllTasks = async () => {
  const query = 'SELECT * FROM tasks';
  const { rows } = await pool.query(query);
  return rows;
};

// Restore a deleted task (admin only)
const restoreTask = async (id) => {
  const query = `
    UPDATE tasks
    SET deleted_at = NULL
    WHERE id = $1
    RETURNING *
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createTask,
  getTasksByUser,
  updateTask,
  deleteTask,
  getAllTasks,
  restoreTask,
};
