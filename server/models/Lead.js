const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    leadName: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    service: {
      type: String,
      required: true,
      enum: [
        "Website Development",
        "Web Application",
        "Mobile Application",
        "E-Commerce",
        "SEO",
        "Digital Marketing",
        "Other",
      ],
    },

    leadSource: {
      type: String,
      required: true,
      enum: [
        "Website",
        "WhatsApp",
        "Referral",
        "LinkedIn",
        "Google",
        "Facebook",
        "Other",
      ],
    },

    estimatedValue: {
      type: Number,
      default: 0,
      min: 0,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    

    status: {
      type: String,
      required: true,
      enum: [
        "New",
        "Contacted",
        "Proposal Sent",
        "Negotiation",
        "Won",
        "Lost",
      ],
      default: "New",
    },

    followUps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FollowUp",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);