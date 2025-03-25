import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* Sidebar (Hidden on Mobile) */}
      <Sidebar />

      <div className="main-content">
        <Navbar />
        <div className="page-content">{children}</div>
      </div>

      {/* Bottom Navigation (Only for Mobile) */}
      <div className="bottom-nav">
        <a href="/">🏠 Home</a>
        <a href="#">🔍 Claims</a>
        <a href="#">➕ Account</a>
        <a href="#">⚙️ Settings</a>
      </div>
    </div>
  );
};

export default Layout;
