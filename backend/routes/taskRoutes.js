const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const {
    createTaskHandler,
    getTasksHandler,
    updateTaskHandler,
    deleteTaskHandler,
} = taskController;
const router = express.Router();

router.post('/', authMiddleware, createTaskHandler);
router.get('/', authMiddleware, getTasksHandler);
router.put('/:id', authMiddleware, updateTaskHandler);
router.delete('/:id', authMiddleware, deleteTaskHandler);

module.exports = router;