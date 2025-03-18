import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
