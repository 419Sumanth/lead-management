import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import "./LeadDetails.css";

const LeadDetails = () => {
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [followUps, setFollowUps] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        setLoading(true);
        setError("");

        // Get lead details
        const leadResponse = await api.get(`/leads/${id}`);

        const leadData = leadResponse.data.lead || leadResponse.data;

        setLead(leadData);

        // Get follow-ups using the IDs stored in the lead
        if (leadData.followUps && leadData.followUps.length > 0) {
          const followUpIds = leadData.followUps.map((followUp) => {
            if (typeof followUp === "string") {
              return followUp;
            }

            return followUp._id;
          });

          const followUpResponse = await api.post(
            "/followups/by-ids",
            {
              ids: followUpIds,
            }
          );

          setFollowUps(
            followUpResponse.data.followUps || []
          );
        } else {
          setFollowUps([]);
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load lead details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeadDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="lead-details-page">
        <p>Loading lead details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lead-details-page">
        <p className="details-error">{error}</p>
        <Link to="/leads">Back to Leads</Link>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="lead-details-page">
        <p>Lead not found.</p>
        <Link to="/leads">Back to Leads</Link>
      </div>
    );
  }

  return (
    <div className="lead-details-page">
      {/* Header */}
      <div className="details-header">
        <div>
          <h1>{lead.leadName}</h1>
          <p>{lead.companyName}</p>
        </div>

        <div className="details-actions">
          <Link
            to={`/leads/${lead._id}/edit`}
            className="edit-lead-btn"
          >
            Edit Lead
          </Link>

          <Link
            to="/leads"
            className="back-leads-btn"
          >
            Back to Leads
          </Link>
        </div>
      </div>

      {/* Lead Information */}
      <div className="details-card">
        <h2>Lead Information</h2>

        <div className="details-grid">
          <div className="detail-item">
            <span>Lead Name</span>
            <strong>{lead.leadName}</strong>
          </div>

          <div className="detail-item">
            <span>Company Name</span>
            <strong>{lead.companyName}</strong>
          </div>

          <div className="detail-item">
            <span>Mobile</span>
            <strong>{lead.mobile}</strong>
          </div>

          <div className="detail-item">
            <span>Email</span>
            <strong>{lead.email}</strong>
          </div>

          <div className="detail-item">
            <span>Service</span>
            <strong>{lead.service}</strong>
          </div>

          <div className="detail-item">
            <span>Lead Source</span>
            <strong>{lead.leadSource}</strong>
          </div>

          <div className="detail-item">
            <span>Estimated Value</span>
            <strong>₹{lead.estimatedValue}</strong>
          </div>

          <div className="detail-item">
            <span>Assigned Salesperson</span>
            <strong>
              {lead.assignedTo?.name || "Not assigned"}
            </strong>
          </div>

          <div className="detail-item">
            <span>Status</span>
            <strong className="details-status">
              {lead.status}
            </strong>
          </div>
        </div>
      </div>

      {/* Follow-up History */}
      <div className="details-card">
        <div className="followup-header">
          <h2>Follow-up History</h2>

          <Link
            to={`/leads/${lead._id}/followup`}
            className="add-followup-btn"
          >
            Add Follow-up
          </Link>
        </div>

        {followUps.length === 0 ? (
          <p className="no-followups">
            No follow-ups added yet.
          </p>
        ) : (
          <div className="followups-list">
            {followUps.map((followUp) => (
              <div
                className="followup-item"
                key={followUp._id}
              >
                <div className="followup-top">
                  <strong>
                    {followUp.followUpType}
                  </strong>

                  <span>
                    {followUp.date
                      ? new Date(
                          followUp.date
                        ).toLocaleDateString()
                      : "No date"}
                  </span>
                </div>

                <p>
                  {followUp.remarks || "No remarks"}
                </p>

                <div className="next-followup">
                  <span>Next Follow-up:</span>{" "}
                  {followUp.nextFollowUpDate
                    ? new Date(
                        followUp.nextFollowUpDate
                      ).toLocaleDateString()
                    : "Not scheduled"}
                </div>

                {followUp.createdBy && (
                  <small>
                    Added by:{" "}
                    {followUp.createdBy.name}
                  </small>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadDetails;