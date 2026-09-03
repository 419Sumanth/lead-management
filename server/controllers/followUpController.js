const FollowUp = require("../models/FollowUp");
const Lead = require("../models/Lead");

// CREATE FOLLOW-UP
const createFollowUp = async (req, res) => {
  try {
    const {
      leadId,
      date,
      followUpType,
      remarks,
      nextFollowUpDate,
    } = req.body;

    // Check required fields
    if (!leadId || !followUpType) {
      return res.status(400).json({
        message: "Lead ID and follow-up type are required",
      });
    }

    // Check whether lead exists
    const lead = await Lead.findById(leadId);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    // Create follow-up
    const followUp = await FollowUp.create({
      date,
      followUpType,
      remarks,
      nextFollowUpDate,
      createdBy: req.user.userId,
    });

    // Add follow-up ID to the Lead
    lead.followUps.push(followUp._id);
    await lead.save();

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


// GET FOLLOW-UPS USING FOLLOW-UP IDS
const getFollowUpsByIds = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        message: "Please provide an array of follow-up IDs",
      });
    }

    const followUps = await FollowUp.find({
      _id: { $in: ids },
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
  getFollowUpsByIds,
};



// POST
// http://localhost:5000/api/followups
// {
//   "leadId": "LEAD_ID",
//   "date": "2026-09-01",
//   "followUpType": "Call",
//   "remarks": "Discussed project requirements",
//   "nextFollowUpDate": "2026-09-05"
// }