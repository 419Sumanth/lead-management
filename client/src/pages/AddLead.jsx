
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AddLead.css";

const AddLead = () => {
  const navigate = useNavigate();

  const [salespersons, setSalespersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
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
    const fetchSalespersons = async () => {
      try {
        const response = await api.get("/auth/users");

        setSalespersons(response.data.users || response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load salespersons"
        );
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchSalespersons();
  }, []);

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
      !formData.leadSource ||
      !formData.assignedTo
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/leads", {
        ...formData,
        estimatedValue: Number(formData.estimatedValue) || 0,
      });

      navigate("/leads");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create lead"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-lead-page">
      <div className="add-lead-header">
        <div>
          <h1>Add Lead</h1>
          <p>Create a new lead</p>
        </div>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="lead-form">

        <div className="form-group">
          <label>Lead Name *</label>
          <input
            type="text"
            name="leadName"
            value={formData.leadName}
            onChange={handleChange}
            placeholder="Enter lead name"
          />
        </div>

        <div className="form-group">
          <label>Company Name *</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>

        <div className="form-group">
          <label>Mobile *</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter mobile number"
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
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
            <option value="SEO">
              SEO
            </option>
            <option value="Digital Marketing">
              Digital Marketing
            </option>
            <option value="Other">
              Other
            </option>
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
            placeholder="Enter estimated value"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Assigned Salesperson *</label>

          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            disabled={loadingUsers}
          >
            <option value="">
              {loadingUsers
                ? "Loading salespersons..."
                : "Select salesperson"}
            </option>

            {salespersons.map((user) => (
              <option key={user._id || user.id} value={user._id || user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

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
            onClick={() => navigate("/leads")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-btn"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Lead"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddLead;

