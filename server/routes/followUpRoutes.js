const express = require("express");

const {
  createFollowUp,
  getFollowUpsByIds,
} = require("../controllers/followUpController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create follow-up
router.post("/", protect, createFollowUp);

// Get follow-ups by IDs
router.post("/by-ids", protect, getFollowUpsByIds);

module.exports = router;