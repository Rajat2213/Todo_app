const express = require('express');
const {
    createTaskHandler,
    getTasksHandler,
    updateTaskHandler,
    deleteTaskHandler,
    getAllTasksHandler,
    restoreTaskHandler
} = require('../controllers/taskController'); 

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createTaskHandler);
router.get('/', authMiddleware, getTasksHandler);
router.put('/:id', authMiddleware, updateTaskHandler);
router.delete('/:id', authMiddleware, deleteTaskHandler);

// Admin Routes
router.get('/admin/all-tasks', authMiddleware, getAllTasksHandler);
router.patch('/admin/restore/:id', authMiddleware, restoreTaskHandler);

module.exports = router; // ✅ No need to redefine controllers!
