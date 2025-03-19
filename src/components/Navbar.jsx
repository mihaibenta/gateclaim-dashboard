import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="user">
        <span className="user-icon" onClick={() => navigate("/account")}>M</span>
      </div>
    </div>
  );
};

export default Navbar;
