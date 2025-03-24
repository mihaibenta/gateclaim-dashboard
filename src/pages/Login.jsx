import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/login.css";
import logo from "/logo_gt_transparent.png"; // Import the logo

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading to true when request starts

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false); // Stop loading if there are missing fields
      return;
    }

    try {
      const response = await fetch("https://api.gateclaim.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        try {
          const userResponse = await fetch("https://api.gateclaim.com/user/info/all", {
            method: "GET",
            headers: {
              Accept: "*/*",
            },
            credentials: "include",
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            login(userData);
            navigate("/");
          } else {
            setError("Failed to fetch user details.");
          }
        } catch (error) {
          setError("Error fetching user details.");
        }
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading when the request finishes
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back</h2>
          {error && <p className="error">{error}</p>}
        
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="login-button" disabled={loading}>Login</button>
            <img src={logo} alt="GateClaim Logo" className="login-logo" />
          </form>
          {loading && <div className="spinner"></div>} {/* Display the spinner */}
        </div>
      </div>
    </div>
  );
};

export default Login;
