import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Context for the User
const UserContext = createContext();

// Create a custom hook to use the User context
export const useUser = () => {
  return useContext(UserContext);
};

// Create a UserProvider component to wrap around your app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track if the user status is being checked

  // Effect to check if the user is logged in on app load
  useEffect(() => {
    // Function to check if user is logged in via backend API
    const checkUserSession = async () => {
      try {
        const response = await fetch("https://api.gateclaim.com/user/info/check", {
          method: "GET",
          headers: {
            "Accept": "*/*",
          },
          credentials: "include", // Ensures cookies are sent and received
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData); // Set user data if logged in
          localStorage.setItem("user", JSON.stringify(userData)); // Persist in localStorage
        } else {
          setUser(null); // No user, clear state
          localStorage.removeItem("user"); // Remove user data from localStorage
        }
      } catch (error) {
        console.error("Error verifying session:", error);
        setUser(null); // Clear state in case of error
        localStorage.removeItem("user"); // Remove user data from localStorage
      } finally {
        setLoading(false); // Set loading to false after checking
      }
    };

    // Check user session
    checkUserSession();
  }, []);

  // Function to log in the user
  const login = (userData) => {
    setUser(userData); // Update state immediately
    localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  // Provide context to components
  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
