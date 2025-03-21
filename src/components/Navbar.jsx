import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const popupRef = useRef(null);
  const userIconRef = useRef(null);

  useEffect(() => {
    // Check if user is logged in based on localStorage (or API call)
    const user = localStorage.getItem("user"); // Replace with actual auth check
    setIsLoggedIn(!!user); // Convert to boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user session
    setIsLoggedIn(false); // Update state
    setPopupVisible(false);
    navigate("/login"); // Redirect to login after logout
  };

  const handleLogin = () => {
    navigate("/login"); // Redirect to login page
  };

  const goToAccount = () => {
    setPopupVisible(false);
    navigate("/account");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
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
          {isLoggedIn ? "M" : "?"} {/* Show user icon or guest icon */}
        </span>

        {isPopupVisible && (
          <div className="popup" ref={popupRef}>
            <div className="popup-content">
              {isLoggedIn ? (
                <>
                  <p>Email: benta_mihai007@yahoo.com</p>
                  <button onClick={goToAccount}>Go to Account</button>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <p>You are not logged in.</p>
                  <button onClick={handleLogin}>Login</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
