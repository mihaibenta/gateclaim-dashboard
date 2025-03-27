import React from "react";
import Card from "./Card";
import HelpOptions from "./HelpOptions";
import "../styles/dashboard.css";
import Claim from "../components/Claim";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2 style={{marginBottom:'15px'}}>Hello Mihai,</h2>
      <h3>How can we help today?</h3>
      <HelpOptions />
      {/* <Card icon="💰" title="No claims yet" subtitle="Start a new claim now!" /> */}
      <Claim/>
      
      {/* <h3>Your Travels</h3>
      <Card icon="🛡️" title="Protect your upcoming trip" subtitle="Fly worry-free." /> */}
    </div>
  );
};

export default Dashboard;
