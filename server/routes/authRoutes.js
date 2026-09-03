const express = require("express");

const {
  login,
  getSalespersons,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", login);

router.get("/users", protect, getSalespersons);

module.exports = router;