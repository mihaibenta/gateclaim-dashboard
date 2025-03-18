import React from "react";
import Card from "./Card";
import HelpOptions from "./HelpOptions";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Hello Mihai,</h2>
      <h3 style={{color:'#a6cfff'}}>How can we help today?</h3>
      <HelpOptions />
      <h3>Your Compensation Claims</h3>
      <Card title="No claims yet" subtitle="Start a new claim now!" />
      
      <h3>Your Travels</h3>
      <Card title="Protect your upcoming trip" subtitle="Fly worry-free." />
    </div>
  );
};

export default Dashboard;
