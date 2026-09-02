import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    proposalSent: 0,
    won: 0,
    lost: 0,
    potentialBusinessValue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/dashboard/stats");

        setStats(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <div>
          <h3>Total Leads : {stats.totalLeads}</h3>
        </div>

        <div>
          <h3>New Leads : {stats.newLeads}</h3>
        </div>

        <div>
          <h3>Proposal Sent : {stats.proposalSent} </h3>
        </div>

        <div>
          <h3>Won : {stats.won} </h3>  
        </div>

        <div>
          <h3>Lost : {stats.lost}</h3> 
        </div>

        <div>
          <h3>Potential Business Value : ₹{stats.potentialBusinessValue} </h3>  
        </div>
      </div>
    </div>
  );
};

export default Dashboard;