import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./AddFollowUp.css";

const AddFollowUp = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    followUpType: "",
    remarks: "",
    nextFollowUpDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.followUpType.trim()) {
      setError("Follow-up type is required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/followups", {
        leadId: id,
        date: formData.date || null,
        followUpType: formData.followUpType,
        remarks: formData.remarks,
        nextFollowUpDate: formData.nextFollowUpDate || null,
      });

      navigate(`/leads/${id}`);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to add follow-up"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-followup-page">
      <div className="add-followup-header">
        <div>
          <h1>Add Follow-up</h1>
          <p>Add a follow-up for this lead</p>
        </div>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="followup-form"
      >
        <div className="form-group">
          <label>Follow-up Date</label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Follow-up Type *</label>

          <input
            type="text"
            name="followUpType"
            value={formData.followUpType}
            onChange={handleChange}
            placeholder="e.g. Phone Call, Meeting, Email"
          />
        </div>

        <div className="form-group full-width">
          <label>Remarks</label>

          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Enter follow-up remarks"
            rows="5"
          />
        </div>

        <div className="form-group">
          <label>Next Follow-up Date</label>

          <input
            type="date"
            name="nextFollowUpDate"
            value={formData.nextFollowUpDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate(`/leads/${id}`)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-btn"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Follow-up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFollowUp;