import React from "react";
import "../styles/card.css";

const Card = ({ title, subtitle, icon, }) => {
  const handleClick = () => {
    window.location.href = "https://gateclaim.com/en/eligibility-check/";
  };

  return (
    <div className="card">
      <p className="card-icon">{icon}</p>
      <h4>{title}</h4>
      <p>{subtitle}</p>
      <button onClick={handleClick}>➕ Add</button>
    </div>
  );
};

export default Card;
