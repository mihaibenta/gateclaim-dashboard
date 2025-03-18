import React, { useState } from "react";
import UserProfile from "../components/UserProfile";
import UserTabs from "../components/UserTabs";
import "../styles/userAccount.css";

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="account-container">
      <button className="back-button">← Back</button>
      <h2>My account</h2>
      <UserTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "details" && <UserProfile />}
      {activeTab === "plans" && <h3>Planuri și beneficii (Coming soon...)</h3>}
      {activeTab === "notifications" && <h3>Notificări (Coming soon...)</h3>}
    </div>
  );
};

export default UserAccount;
