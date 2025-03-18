import React from "react";
import "../styles/card.css";

const Card = ({ title, subtitle }) => {
  const handleClick = () => {
    window.location.href = "https://gateclaim.com/en/eligibility-check/";
  };

  return (
    <div className="card">
      <h4>{title}</h4>
      <p>{subtitle}</p>
      <button onClick={handleClick}>➕ Add</button>
    </div>
  );
};

export default Card;
