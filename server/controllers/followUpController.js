const FollowUp = require("../models/FollowUp");

// CREATE FOLLOW-UP
const createFollowUp = async (req, res) => {
  try {
    const {
      lead,
      date,
      followUpType,
      remarks,
      nextFollowUpDate,
    } = req.body;

    if (!lead || !followUpType) {
      return res.status(400).json({
        message: "Lead and follow-up type are required",
      });
    }

    const followUp = await FollowUp.create({
      lead,
      date,
      followUpType,
      remarks,
      nextFollowUpDate,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      message: "Follow-up added successfully",
      followUp,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create follow-up",
      error: error.message,
    });
  }
};


// GET FOLLOW-UP HISTORY
const getFollowUps = async (req, res) => {
  try {
    const followUps = await FollowUp.find({
      lead: req.params.leadId,
    })
      .populate("createdBy", "name email")
      .sort({ date: -1 });

    res.status(200).json({
      count: followUps.length,
      followUps,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch follow-ups",
      error: error.message,
    });
  }
};


module.exports = {
  createFollowUp,
  getFollowUps,
};