const express = require('express');
const  authMiddleware= require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware')
const { getAllTasksHandler, restoreTaskHandler } = require('../controllers/adminController');

const router = express.Router();

// Admin-only routes
router.get('/tasks', authMiddleware, adminMiddleware, getAllTasksHandler);
router.put('/tasks/:id/restore', authMiddleware, adminMiddleware, restoreTaskHandler);

module.exports = router;