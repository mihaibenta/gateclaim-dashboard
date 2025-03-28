import React, { useState, useEffect } from "react";
import HelpOptions from "./HelpOptions";
import Claim from "../components/Claim";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://api.gateclaim.com/user/info/all", {
          method: "GET",
          headers: { Accept: "*/*" },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError("Could not load user data.");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard">
      <h2 style={{ marginBottom: "15px" }}>
        Hello {user?.name?.firstName || ""} {/* Fetching from user.name.firstName */}
      </h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h3>How can we help today?</h3>
      <HelpOptions />
      <Claim />
    </div>
  );
};

export default Dashboard;
