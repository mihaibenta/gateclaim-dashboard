import React, { useEffect, useState } from "react";
import "../styles/claims.css";

const Claim = () => {
  const [claims, setClaims] = useState([]);  // Store claims data
  const [loading, setLoading] = useState(true);  // Show loading state
  const [error, setError] = useState(null);  // Handle errors

  useEffect(() => {
    // Fetch claims from API
    const fetchClaims = async () => {
      try {
        const response = await fetch("https://api.gateclaim.com/user/status/all", {
          credentials: "include", // Include cookies for authentication
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setClaims(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  return (
<>
      <h3>Your Compensation Claims</h3>
      <p>Track the status of your active claims below.</p>

      {/* Show loading state */}
      {loading && <p>Loading claims...</p>}

      {/* Show error message if API fails */}
      {error && <p className="error-message">Error: {error}</p>}

      {/* Show claims table when data is available */}
      {!loading && !error && claims.length > 0 ? (
        <div className="table-container">
          <table className="claims-table">
            <thead>
              <tr>
                <th>Flight Route</th>
                <th>Airline</th>
                <th>Flight Date</th>
                <th>Status</th>
                {/* <th>Compensation</th> */}
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.id}>
                  <td>{claim.flight.dep_airport_iata} → {claim.flight.arr_airport_iata}</td>
                  <td>{claim.flight.flightNumber}</td>
                  <td>{claim.flight.day_of_flight}</td>
                  <td>
                    <span className={`status-badge ${claim.status.toLowerCase().replace(" ", "-")}`}>
                      {claim.status}
                    </span>
                  </td>
                  {/* <td>{claim.flight.money} {claim.flight.currency.toUpperCase()}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p>No claims found.</p>
      )}
      </>
    
  );
};

export default Claim;
