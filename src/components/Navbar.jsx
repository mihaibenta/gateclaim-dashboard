import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import the useUser hook
import "../styles/navbar.css";

const Navbar = () => {
  const { user, login, logout } = useUser(); // Destructure the user state, login, and logout functions
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef(null);
  const userIconRef = useRef(null);

  // Fetch user data on component mount or when user is not set
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://api.gateclaim.com/user/info/all", {
          method: "GET",
          headers: {
            "Accept": "*/*",
          },
          credentials: "include", // Send cookies automatically with the request
        });

        if (response.ok) {
          const userData = await response.json();
          login(userData); // Update user context with the fetched data
        } else {
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (!user) {
      fetchUserData(); // Only fetch user data if not already available in context
    }
  }, [user, login]); // Run this effect only when the user is undefined

  // Function to clear cookies manually on logout
  const clearCookies = () => {
    // Loop through all cookies and delete them
    document.cookie.split(";").forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };

  // Logout user using /logout endpoint
  const handleLogout = async () => {
    try {
      // Call the /logout endpoint to log the user out
      const response = await fetch("https://api.gateclaim.com/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Sends cookies automatically with the request
      });

      if (response.ok) {
        clearCookies(); // Remove cookies manually
        logout(); // Remove user from context
        setPopupVisible(false);
        navigate("/login"); // Redirect to login page after successful logout
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
          {/* Check if user is available and user.email is not empty */}
          {user && user.email ? user.email[0].toUpperCase() : "?"}
        </span>

        {isPopupVisible && (
          <div className="popup" ref={popupRef}>
            <div className="popup-content">
              {user ? (
                <>
                  <p>Email: {user.email}</p>
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
