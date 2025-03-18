import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="user">
        <span>🌍</span>
        <span className="user-icon" onClick={() => navigate("/account")}>👤</span>
      </div>
    </div>
  );
};

export default Navbar;
