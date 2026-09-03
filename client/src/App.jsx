import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import AddLead from "./pages/AddLead";
import LeadDetails from "./pages/LeadDetails";
import EditLead from "./pages/EditLead";
import AddFollowUp from "./pages/AddFollowUp";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function ProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
      <Navbar />
      {children}
    </ProtectedRoute>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        }
      />

      <Route
        path="/leads"
        element={
          <ProtectedLayout>
            <Leads />
          </ProtectedLayout>
        }
      />

      <Route
        path="/leads/add"
        element={
          <ProtectedLayout>
            <AddLead />
          </ProtectedLayout>
        }
      />

      <Route
        path="/leads/:id"
        element={
          <ProtectedLayout>
            <LeadDetails />
          </ProtectedLayout>
        }
      />

      <Route
        path="/leads/:id/followup"
        element={
          <ProtectedLayout>
            <AddFollowUp />
          </ProtectedLayout>
        }
      />

      <Route
        path="/leads/:id/edit"
        element={
          <ProtectedLayout>
            <EditLead />
          </ProtectedLayout>
        }
      />

      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
}

export default App;