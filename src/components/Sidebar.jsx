import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo Image */}
      <img src="/logo_gt_transparent.png" alt="GateClaim Logo" className="sidebar-logo" />

      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            🏠 Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/trips" className={({ isActive }) => (isActive ? "active" : "")}>
            ✈️ Trips
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/claims" className={({ isActive }) => (isActive ? "active" : "")}>
            🛡️ Claims
          </NavLink>
        </li>
        <li>
          <NavLink to="/account" className={({ isActive }) => (isActive ? "active" : "")}>
            👤 User Profie
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
