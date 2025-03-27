import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import UserTabs from "../components/UserTabs";
import BankDetailsForm from "../components/BankDetailsForm";
import DocumentsUpload from "../components/DocumentsUpload";
import "../styles/userAccount.css";

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState("details");
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="account-container">
      <button className="back-button" onClick={() => navigate("/")}>← Back</button>
      <h2>My account</h2>
      <UserTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Render UserProfile component based on activeTab */}
      {activeTab === "details" && <UserProfile key={activeTab} />}
      {activeTab === "plans" && <h3>Plans and Benefits (Coming soon...)</h3>}
      {activeTab === "notifications" && <h3>Notifications (Coming soon...)</h3>}
      {activeTab === "bank" && <BankDetailsForm key={activeTab}/>}
      {activeTab === "documents" && <DocumentsUpload key={activeTab}/>}
    </div>
  );
};

export default UserAccount;
