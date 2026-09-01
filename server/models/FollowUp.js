const mongoose = require("mongoose");

const followUpSchema = new mongoose.Schema(
  {
    
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    followUpType: {
      type: String,
      required: true,
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    nextFollowUpDate: {
      type: Date,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FollowUp", followUpSchema);