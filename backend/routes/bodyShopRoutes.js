const express = require('express');
const {
    getAssignedTasks,
    updateTaskStatus,
    assignTask,
} = require('../controllers/bodyShopController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();


// Admin assigns a task to BodyShop
router.post('/tasks', authMiddleware, roleMiddleware('Admin'), assignTask);

// BodyShop views assigned tasks
router.get('/tasks', authMiddleware, roleMiddleware('BodyShop'), getAssignedTasks);

// BodyShop updates task status
router.patch('/tasks/:taskId', authMiddleware, roleMiddleware('BodyShop'), updateTaskStatus);

module.exports = router;
