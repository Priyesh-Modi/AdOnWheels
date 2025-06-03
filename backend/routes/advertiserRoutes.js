const express = require("express");
const {
  createAd,
  getAllAds,
  getAdById,
  getProposals,
  updateProposal,
  respondToPrice,
  getStats,
  updateAd,
} = require("../controllers/advertiserController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Protected routes
router.post("/ads", authMiddleware, roleMiddleware("Advertiser"), createAd);
router.get("/ads", authMiddleware, roleMiddleware("Advertiser"), getAllAds);
router.get(
  "/ads/:adId",
  authMiddleware,
  roleMiddleware("Advertiser"),
  getAdById
);
router.get(
  "/proposals",
  authMiddleware,
  roleMiddleware("Advertiser"),
  getProposals
);
router.get("/stats", authMiddleware, roleMiddleware("Advertiser"), getStats);
router.patch(
  "/proposals/:proposalId",
  authMiddleware,
  roleMiddleware("Advertiser"),
  updateProposal
);
router.patch(
  "/ads/:adId/response",
  authMiddleware,
  roleMiddleware("Advertiser"),
  respondToPrice
);
router.patch(
  "/ads/:adId",
  authMiddleware,
  roleMiddleware("Advertiser"),
  updateAd
);

module.exports = router;
