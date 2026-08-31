const Lead = require("../models/Lead");

// CREATE LEAD
const createLead = async (req, res) => {
  try {
    const {
      leadName,
      companyName,
      mobile,
      email,
      service,
      leadSource,
      estimatedValue,
      assignedTo,
      status,
    } = req.body;

    if (
      !leadName ||
      !companyName ||
      !mobile ||
      !email ||
      !service ||
      !leadSource ||
      !assignedTo
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const lead = await Lead.create({
      leadName,
      companyName,
      mobile,
      email,
      service,
      leadSource,
      estimatedValue,
      assignedTo,
      status,
    });

    res.status(201).json({
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create lead",
      error: error.message,
    });
  }
};


// GET ALL LEADS
const getLeads = async (req, res) => {
  try {
    const {
      search,
      status,
      service,
      leadSource,
      assignedTo,
      sortBy,
      order,
    } = req.query;

    let filter = {};

    // Search
    if (search) {
      filter.$or = [
        { leadName: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ];
    }

    // Filters
    if (status) {
      filter.status = status;
    }

    if (service) {
      filter.service = service;
    }

    if (leadSource) {
      filter.leadSource = leadSource;
    }

    if (assignedTo) {
      filter.assignedTo = assignedTo;
    }

    // Sorting
    let sort = {
      createdAt: -1,
    };

    if (sortBy) {
      sort = {
        [sortBy]: order === "asc" ? 1 : -1,
      };
    }

    const leads = await Lead.find(filter)
      .populate("assignedTo", "name email role")
      .sort(sort);

    res.status(200).json({
      count: leads.length,
      leads,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch leads",
      error: error.message,
    });
  }
};


// GET SINGLE LEAD
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("assignedTo", "name email role");

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch lead",
      error: error.message,
    });
  }
};


// UPDATE LEAD
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("assignedTo", "name email role");

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message: "Lead updated successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update lead",
      error: error.message,
    });
  }
};


// DELETE LEAD
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete lead",
      error: error.message,
    });
  }
};


module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
};