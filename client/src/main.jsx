import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


// STEP 1  ✅ Frontend project
// STEP 2  → API service
// STEP 3  → Authentication
// STEP 4  → Login UI + API
// STEP 5  → Navbar + Logout
// STEP 6  → Dashboard
// STEP 7  → Lead Listing
// STEP 8  → Search / Filter / Sort
// STEP 9  → Add Lead
// STEP 10 → Lead Details
// STEP 11 → Follow-up History
// STEP 12 → Add Follow-up
// STEP 13 → Edit Lead
// STEP 14 → Delete Lead
// STEP 15 → Validation + error messages
// STEP 16 → Responsive cleanup