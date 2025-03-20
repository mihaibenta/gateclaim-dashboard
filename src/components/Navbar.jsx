import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef(null); // Reference for the popup to check clicks outside
  const userIconRef = useRef(null); // Reference for the user icon

  const handleLogout = () => {
    // Handle logout logic here (e.g., clearing local storage or calling an API)
    console.log("Logging out...");
    setPopupVisible(false); // Close the popup on logout
  };

  const goToAccount = () => {
    setPopupVisible(false); // Close the popup before navigating
    navigate("/account"); // Navigate to the account page
  };

  // Close the popup if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the popup only if clicking outside the popup and user icon
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !userIconRef.current.contains(event.target)
      ) {
        setPopupVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="user">
        <span
          ref={userIconRef}
          className="user-icon"
          onClick={() => setPopupVisible(!isPopupVisible)}
        >
          M
        </span>
        {isPopupVisible && (
          <div className="popup" ref={popupRef}>
            <div className="popup-content">
              <p>Email: benta_mihai007@yahoo.com</p>
              <button onClick={handleLogout}>Logout</button>
              <button onClick={goToAccount}>Go to Account</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
