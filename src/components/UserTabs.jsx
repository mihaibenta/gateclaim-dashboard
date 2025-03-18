import React from "react";
import "../styles/userAccount.css";

const UserTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="user-tabs">
      <button className={activeTab === "details" ? "active" : ""} onClick={() => setActiveTab("details")}>
        Details
      </button>
      <button className={activeTab === "plans" ? "active" : ""} onClick={() => setActiveTab("plans")}>
        Plans and beneficts
      </button>
      <button className={activeTab === "notifications" ? "active" : ""} onClick={() => setActiveTab("notifications")}>
        Notifications
      </button>
    </div>
  );
};

export default UserTabs;
