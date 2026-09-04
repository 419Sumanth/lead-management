const Lead = require("../models/Lead");
const FollowUp = require("../models/FollowUp");

const getDashboardStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();

    const newLeads = await Lead.countDocuments({
      status: "New",
    });

    const wonLeads = await Lead.countDocuments({
      status: "Won",
    });

    const proposalSentLeads = await Lead.countDocuments({
      status: "Proposal Sent",
    });

    // console.log("wonLeads Leads:", wonLeads); // Debugging line to check the count of won leads
    // console.log("totalLeads Leads:", totalLeads); // Debugging line to check the count of total leads

    // Follow-ups due today or earlier
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const followUpsDue = await FollowUp.countDocuments({
      nextFollowUpDate: {
        $lte: today,
        $ne: null,
      },
    });

    // Potential business value
    const potentialBusinessValue = await Lead.aggregate([
      {
        $match: {
          status: {
            $ne: "Lost",
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$estimatedValue",
          },
        },
      },
    ]);

    const businessValue =
      potentialBusinessValue.length > 0
        ? potentialBusinessValue[0].total
        : 0;

    res.status(200).json({
      totalLeads,
      newLeads,
      followUpsDue,
      wonLeads,
      proposalSentLeads,
      potentialBusinessValue: businessValue,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};