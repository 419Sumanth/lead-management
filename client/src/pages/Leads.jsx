import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Leads.css";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [service, setService] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [sort, setSort] = useState("newest");

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/leads", {
        params: {
          search,
          status,
          service,
          leadSource,
          sort,
        },
      });

      setLeads(response.data.leads || response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load leads"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, status, service, leadSource, sort]);

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setService("");
    setLeadSource("");
    setSort("newest");
  };

  return (
    <div className="leads-page">
      <div className="leads-header">
        <div>
          <h1>Leads</h1>
          <p>Manage and track your leads</p>
        </div>

        <Link to="/leads/add" className="add-lead-btn">
          + Add Lead
        </Link>
      </div>

      <div className="filters-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search name, company, email or mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>

        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">All Services</option>
          <option value="Website Development">
            Website Development
          </option>
          <option value="Web Application">
            Web Application
          </option>
          <option value="Mobile Application">
            Mobile Application
          </option>
          <option value="E-Commerce">E-Commerce</option>
          <option value="SEO">SEO</option>
          <option value="Digital Marketing">
            Digital Marketing
          </option>
          <option value="Other">Other</option>
        </select>

        <select
          value={leadSource}
          onChange={(e) => setLeadSource(e.target.value)}
        >
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Referral">Referral</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Google">Google</option>
          <option value="Facebook">Facebook</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        <button
          className="clear-filter-btn"
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>

      {loading && (
        <div className="message">
          <p>Loading leads...</p>
        </div>
      )}

      {error && (
        <div className="message error-message">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="table-container">
          {leads.length === 0 ? (
            <div className="message">
              <p>No leads found.</p>
            </div>
          ) : (
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Lead Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Service</th>
                  <th>Source</th>
                  <th>Estimated Value</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id}>
                    <td className="lead-name">
                      {lead.leadName}
                    </td>

                    <td>{lead.companyName}</td>

                    <td>{lead.email}</td>

                    <td>{lead.mobile}</td>

                    <td>{lead.service}</td>

                    <td>{lead.leadSource}</td>

                    <td>
                      ₹{lead.estimatedValue}
                    </td>

                    <td>
                      <span
                        className={`status-badge status-${lead.status
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td>
                      {lead.assignedTo?.name || "Not assigned"}
                    </td>

                    <td>
                      <Link
                        to={`/leads/${lead._id}`}
                        className="view-btn"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Leads;