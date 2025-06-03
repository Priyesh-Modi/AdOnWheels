const express = require('express');
const {
    setPriceForAd,
    getAdsByStatus,
    createProposal,
    getAllPublishers,
    assignAdToPublisher,
    getAllBodyShops,
    assignTaskToBodyShop,
    getDashboardStats,
    deleteBodyShop,
    setPublisherPriceForAd,
} = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Ad management
router.patch('/ads/:adId/set-price', authMiddleware, roleMiddleware('Admin'), setPriceForAd);
router.get('/ads', authMiddleware, roleMiddleware('Admin'), getAdsByStatus);

// Proposal management
router.post('/proposals', authMiddleware, roleMiddleware('Admin'), createProposal);

// Publisher management
router.get('/publishers', authMiddleware, roleMiddleware('Admin'), getAllPublishers);
router.post('/publishers/assign', authMiddleware, roleMiddleware('Admin'), assignAdToPublisher);
router.post('/ads/publisher-price', authMiddleware, roleMiddleware('Admin'), setPublisherPriceForAd);

// BodyShop management
router.get('/bodyshops', authMiddleware, roleMiddleware('Admin'), getAllBodyShops);
router.post('/bodyshops/tasks', authMiddleware, roleMiddleware('Admin'), assignTaskToBodyShop);
router.delete('/bodyshops/:bodyShopId', authMiddleware, roleMiddleware('Admin'), deleteBodyShop);


router.get('/stats', authMiddleware, roleMiddleware('Admin'), getDashboardStats);

module.exports = router;
