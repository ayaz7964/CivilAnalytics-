import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserNavBar from "./UserNavBar";
import Dashboard from "../Pages/Dashbord";
import Survey from "../Pages/survey";
import Profile from "../Pages/Profile";
import Settings from "../Pages/Settings";
import Footer from "../Component/Footer";

// You can add more user-specific pages as needed

export default function UserRoutes() {
  return (
    <>
      <UserNavBar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
        {/* Redirect /home to /dashboard or any default user page */}
        <Route path="/home" element={<Navigate to="/dashboard" replace />} />
        {/* Catch-all for unknown routes */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
