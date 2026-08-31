const mongoose = require("mongoose");

const followUpSchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    followUpType: {
      type: String,
      required: true,
      enum: [
        "Call",
        "Email",
        "WhatsApp",
        "Meeting",
        "Other",
      ],
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