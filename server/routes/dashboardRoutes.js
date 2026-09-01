const express = require("express");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const router = express.Router();

// Dashboard statistics
router.get("/stats", getDashboardStats);

module.exports = router;