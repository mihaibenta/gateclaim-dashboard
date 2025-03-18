import React from "react";
import "../styles/claims.css";

const Claims = () => {
  // Placeholder claim data
  const claims = [
    {
      id: 1,
      from: "Paris (BVA)",
      to: "Cluj (CLJ)",
      airline: "Wizz Air",
      flightDate: "12 Feb 2025",
      status: "In Progress",
    },
    {
      id: 2,
      from: "Lisbon (LIS)",
      to: "London (LHR)",
      airline: "British Airways",
      flightDate: "29 Jan 2025",
      status: "Approved",
    },
    {
      id: 3,
      from: "Berlin (TXL)",
      to: "Madrid (MAD)",
      airline: "Lufthansa",
      flightDate: "5 Mar 2025",
      status: "Pending",
    },
  ];

  return (
    <div className="page-content">
      <h1>Your Claims</h1>
      <p>Track the status of your active claims below.</p>

      {/* Claims Table */}
      <div className="table-container">
        <table className="claims-table">
          <thead>
            <tr>
              <th>Flight Route</th>
              <th>Airline</th>
              <th>Flight Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.from} → {claim.to}</td>
                <td>{claim.airline}</td>
                <td>{claim.flightDate}</td>
                <td>
                  <span className={`status-badge ${claim.status.toLowerCase().replace(" ", "-")}`}>
                    {claim.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Claims;
