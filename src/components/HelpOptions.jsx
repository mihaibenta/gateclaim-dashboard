import React from "react";
import "../styles/helpOptions.css";

const HelpOptions = () => {
  const options = [
    {
      icon: "🔍✈️", // Replace with actual image/icons
      text: "Add Request",
      link: "https://gateclaim.com/en/eligibility-check",
    },
    {
      icon: "📍🛡️",
      text: "Protect My Trip",
      link: "#",
    },
    {
      icon: "❓📘",
      text: "FAQ",
      link: "#",
    },
    {
      icon: "🎧",
      text: "Contact Us",
      link: "#",
    },
  ];

  return (
    <div className="help-options">
      {options.map((option, index) => (
        <div
          key={index}
          className="help-card"
          onClick={() => window.location.href = option.link}
        >
          <span className="help-icon">{option.icon}</span>
          <span className="help-text">{option.text}</span>
          <span className="help-arrow">➜</span>
        </div>
      ))}
    </div>
  );
};

export default HelpOptions;
