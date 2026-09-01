const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "salesperson"],
      default: "salesperson",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTk2OWNmYjU4NjI4ZDY5MjcxMzFhMTEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3ODgyNzMyMjksImV4cCI6MTc4ODM1OTYyOX0.4lHCV8rqLlhsv3yV1CyigzckjzO4rtxh_OPntzmsX0k