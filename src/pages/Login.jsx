import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
   
    
    try {
      const response = await fetch("https://api.gateclaim.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
        credentials: "include", // Ensures cookies are sent & stored
        body: JSON.stringify({ email, password }),
      });

      // Check for a successful response
      if (!response.ok) {
        throw new Error("Login failed.");
      }

      // After login success, cookies should be stored automatically by the browser
      alert("Login Successful!");

      // Check if cookies are set in the browser (Optional)
      const cookies = document.cookie; // This will show the cookies stored in the browser
      console.log("Cookies:", cookies);

      // Navigate to the home page or another page
      navigate("/");

    } catch (err) {
      setError("Login failed. Check your credentials.");
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
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
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
