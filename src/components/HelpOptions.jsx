import React from "react";
import "../styles/helpOptions.css";

const HelpOptions = () => {
  return (
    <div className="help-options">
      <button onClick={() => (window.location.href = "https://gateclaim.com/en/eligibility-check")}>
        ➕ Add Request
      </button>
      <button>🛡️ Protect My Trip</button>
      <button>❓ FAQ</button>
      <button>📞 Contact Us</button>
    </div>
  );
};

export default HelpOptions;
