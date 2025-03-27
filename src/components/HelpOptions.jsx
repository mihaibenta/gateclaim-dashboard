import React from "react";
import "../styles/helpOptions.css";

const HelpOptions = () => {
  const options = [
    {
      icon: "✈️", // Replace with actual image/icons
      text: "Add Request",
      link: "https://gateclaim.com/en/eligibility-check/passenger-info/",
    },
    {
      icon: "🛡️",
      text: "Your Claims",
      link: "/claims",
    },
    {
      icon: "📂",
      text: "Documents",
      link: "/account",
    },
    {
      icon: "❓",
      text: "FAQ",
      link: "https://gateclaim.com/en/faq/",
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
