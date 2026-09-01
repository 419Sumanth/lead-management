const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const followUpRoutes = require("./routes/followUpRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");



const app = express();

const PORT = process.env.PORT || 5000;

// Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/followups", followUpRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Lead Management Server is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});