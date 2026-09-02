import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Lead Management</h2>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/leads">Leads</Link>
      </div>

      <div className="navbar-right">
        {user && (
          <span>
            {user.name} ({user.role})
          </span>
        )}

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;