import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./EditLead.css";

const EditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [salespersons, setSalespersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    leadName: "",
    companyName: "",
    mobile: "",
    email: "",
    service: "",
    leadSource: "",
    estimatedValue: "",
    assignedTo: "",
    status: "New",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const leadResponse = await api.get(`/leads/${id}`);

        const lead = leadResponse.data.lead || leadResponse.data;

        setFormData({
          leadName: lead.leadName || "",
          companyName: lead.companyName || "",
          mobile: lead.mobile || "",
          email: lead.email || "",
          service: lead.service || "",
          leadSource: lead.leadSource || "",
          estimatedValue: lead.estimatedValue ?? "",
          assignedTo:
            lead.assignedTo?._id || lead.assignedTo || "",
          status: lead.status || "New",
        });

        // Only admin needs the salesperson list
        if (user?.role === "admin") {
          const usersResponse = await api.get("/auth/users");

          setSalespersons(
            usersResponse.data.users || usersResponse.data
          );
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load lead"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user?.role]);

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

    if (
      !formData.leadName ||
      !formData.companyName ||
      !formData.mobile ||
      !formData.email ||
      !formData.service ||
      !formData.leadSource
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setSaving(true);

      const dataToUpdate = {
        ...formData,
        estimatedValue:
          Number(formData.estimatedValue) || 0,
      };

      // Salesperson should not change assignment
      if (user?.role !== "admin") {
        delete dataToUpdate.assignedTo;
      }

      await api.put(`/leads/${id}`, dataToUpdate);

      navigate(`/leads/${id}`);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update lead"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-lead-page">
        <p>Loading lead...</p>
      </div>
    );
  }

  return (
    <div className="edit-lead-page">
      <div className="edit-lead-header">
        <div>
          <h1>Edit Lead</h1>
          <p>Update lead information</p>
        </div>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="edit-lead-form"
      >
        <div className="form-group">
          <label>Lead Name *</label>
          <input
            type="text"
            name="leadName"
            value={formData.leadName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Company Name *</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Mobile *</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Service *</label>

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">Select service</option>
            <option value="Website Development">
              Website Development
            </option>
            <option value="Web Application">
              Web Application
            </option>
            <option value="Mobile Application">
              Mobile Application
            </option>
            <option value="E-Commerce">
              E-Commerce
            </option>
            <option value="SEO">SEO</option>
            <option value="Digital Marketing">
              Digital Marketing
            </option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Lead Source *</label>

          <select
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
          >
            <option value="">Select source</option>
            <option value="Website">Website</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Referral">Referral</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Google">Google</option>
            <option value="Facebook">Facebook</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Estimated Value</label>

          <input
            type="number"
            name="estimatedValue"
            value={formData.estimatedValue}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* Admin can change salesperson */}
        {user?.role === "admin" && (
          <div className="form-group">
            <label>Assigned Salesperson</label>

            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
            >
              <option value="">
                Select salesperson
              </option>

              {salespersons.map((salesperson) => (
                <option
                  key={salesperson._id}
                  value={salesperson._id}
                >
                  {salesperson.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Proposal Sent">
              Proposal Sent
            </option>
            <option value="Negotiation">
              Negotiation
            </option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
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
            disabled={saving}
          >
            {saving ? "Updating..." : "Update Lead"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLead;