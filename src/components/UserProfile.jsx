import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import "../styles/userAccount.css";

const UserProfile = () => {
  const { user, setUser, loading } = useUser(); // Get user state and loading flag
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isChangingName, setIsChangingName] = useState(false);
  const [isChangingPhone, setIsChangingPhone] = useState(false);
  const [firstName, setFirstName] = useState(user?.name?.firstName || "");
  const [lastName, setLastName] = useState(user?.name?.lastName || "");
  const [iban, setIBAN] = useState(user?.iban || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address?.address || "");
  const [city, setCity] = useState(user?.address?.city || "");
  const [country, setCountry] = useState(user?.address?.country || "");
  const [postalCode, setPostalCode] = useState(user?.address?.postalCode || "");

  // Separate success messages for password and name change
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("");
  const [nameSuccessMessage, setNameSuccessMessage] = useState("");
  const [addressSuccessMessage, setAddressSuccessMessage] = useState("");
  const [phoneSuccessMessage, setPhoneSuccessMessage] = useState("");

  // Sync the local state with the user context when it changes
  useEffect(() => {
    if (user?.name?.firstName) {
      setFirstName(user?.name?.firstName);
    }
    if (user?.name?.lastName) {
      setLastName(user?.name?.lastName);
    }
    if (user?.address?.address) {
      setAddress(user?.address?.address);
    }
    if (user?.address?.city) {
      setCity(user?.address?.city);
    }
    if (user?.address?.country) {
      setCountry(user?.address?.country);
    }
    if (user?.address?.postalCode) {
      setPostalCode(user?.address?.postalCode);
    }
    if (user?.iban) {
      setIBAN(user?.iban);
    }
    if (user?.phone) {
      setPhone(user?.phone);
    }
  }, [user]);

   // Fetch user data once the component mounts
   useEffect(() => {
    const fetchUserData = async () => {
      if (!user && !loading) { // Prevent multiple unnecessary fetches
        setFetching(true);
        try {
          const response = await fetch("https://api.gateclaim.com/user/info/all", {
            method: "GET",
            headers: {
              Accept: "*/*",
            },
            credentials: "include",
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData); // Update global state with fetched data
          } else {
            setError("Failed to load user data.");
          }
        } catch (err) {
          setError("Something went wrong. Please try again.");
        } finally {
          setFetching(false);
        }
      }
    };

    fetchUserData();
  }, [user, loading,]);
  
  // Function to handle password change
  const handleChangePassword = async () => {
    if (!password || !newPassword) {
      setError("Please enter both the current and new password.");
      return;
    }

    setIsChangingPassword(true);
    setError(""); // Clear any previous errors
    setPasswordSuccessMessage(""); // Clear previous success message

    try {
      const response = await fetch("https://api.gateclaim.com/user/info/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        credentials: "include",
        body: JSON.stringify({
          password,
          newPassword,
        }),
      });

      if (response.ok) {
        // Handle success
        setPasswordSuccessMessage("Password changed successfully!"); // Show success message
        setPassword("");
        setNewPassword("");
      } else {
        // Handle errors
        const errorData = await response.json();
        setError(errorData?.message || "Sorry, something went wrong.");
      }
    } catch (err) {
      setError("An error occurred while changing the password.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Function to handle name change
  const handleChangeName = async () => {
    if (!firstName || !lastName) {
      setError("Please enter both first and last name.");
      return;
    }

    setIsChangingName(true);
    setError(""); // Clear any previous errors
    setNameSuccessMessage(""); // Clear previous success message

    try {
      const response = await fetch("https://api.gateclaim.com/user/info/name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName,
          lastName,
        }),
      });

      if (response.ok) {
        // If response is OK, show success message
        setNameSuccessMessage("Name changed successfully!");
        // Optionally, update the user context with the new name if necessary
        const updatedUser = await response.json();
        setUser(updatedUser); // Update user context with new user data
      } else {
        // If response is not OK, handle the error
        const errorData = await response.json();
        setError(errorData?.message || "Sorry, something went wrong.");
      }
    } catch (err) {
      // Catch any errors related to the fetch itself
      setError("An error occurred while changing the name.");
    } finally {
      setIsChangingName(false);
    }
  };

  // Function to handle IBAN change
  const handleChangeIBAN = async () => {
    if (!iban) {
      setError("Please enter both first and last name.");
      return;
    }

    try {
      const response = await fetch(`https://api.gateclaim.com/user/info/iban?iban=${iban}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        credentials: "include",
        body: JSON.stringify({
          iban,      
        }),
      });

      if (response.ok) {
        // If response is OK, show success message
        // setNameSuccessMessage("Name changed successfully!");
        // Optionally, update the user context with the new name if necessary
        const updatedIBAN = await response.json();
        setIBAN(updatedIBAN); // Update user context with new user data
      } else {
        // If response is not OK, handle the error
        const errorData = await response.json();
        setError(errorData?.message || "Sorry, something went wrong.");
      }
    } catch (err) {
      // Catch any errors related to the fetch itself
      setError("An error occurred while changing the name.");
    } 
  };

  // Function to handle name change
  const handleChangePhone = async () => {
    if (!phone) {
      setError("Please enter both first and last name.");
   
      setPhoneSuccessMessage(""); // Clear previous success message
      return;    
    }
    setIsChangingPhone(true);
    try {
      const response = await fetch(`https://api.gateclaim.com/user/info/phone?phone=${phone}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        credentials: "include",
        body: JSON.stringify({
          phone,      
        }),
      });

      if (response.ok) {
        // If response is OK, show success message
        setPhoneSuccessMessage("Phone changed successfully!");
        // Optionally, update the user context with the new name if necessary
        const updatedPhone = await response.json();
        setPhone(updatedPhone); // Update user context with new user data
      } else {
        // If response is not OK, handle the error
        const errorData = await response.json();
        setError(errorData?.message || "Sorry, something went wrong.");
      }
    } catch (err) {
      // Catch any errors related to the fetch itself
      setError("An error occurred while changing the name.");
    } 
    finally {
      setIsChangingPhone(false);
    }
  };


  // Function to handle address change
  const handleChangeAddress = async () => {
    if (!address || !city || !country || !postalCode) {
      setError("Please enter all address fields.");
      return;
    }

    setError(""); // Clear any previous errors
    setAddressSuccessMessage(""); // Clear previous success message

    try {
      const response = await fetch("https://api.gateclaim.com/user/info/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        credentials: "include",
        body: JSON.stringify({
          address,
          city,
          country,
          postalCode,
        }),
      });

      if (response.ok) {
        // Handle success
        setAddressSuccessMessage("Address changed successfully!");
        const updatedUser = await response.json();
        setUser(updatedUser); // Update user context with new address
      } else {
        const errorData = await response.json();
        setError(errorData?.message || "Sorry, something went wrong.");
      }
    } catch (err) {
      setError("An error occurred while changing the address.");
    }
  };

  // Show loading state if still fetching or loading
  if (loading || fetching) return <p>Loading user details...</p>;

  return (
    <div className="user-profile">
      <h3>👥 Your Details</h3>
      <p>Please provide us with some information</p>

      {/* First and Last Name */}
      <div className="form-row">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
           <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
            <button
            className="change-name-btn"
            onClick={handleChangeName}
            disabled={isChangingName}
          >
        {isChangingName ? "Changing..." : "Change Name"}
      </button>
        </div>

        <div className="form-group">
        <label>Email Address</label>
        <input type="email" value={user?.email || ""} disabled />

        <label>Phone Number</label>
        <input 
        type="tel" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)}
        />
        <button
            className="change-name-btn"
            onClick={handleChangePhone}     
          >
        {isChangingPhone ? "Changing..." : "Change Phone"}
      </button>
        </div>
        
      </div>

      {phoneSuccessMessage && <p className="success">{phoneSuccessMessage}</p>}

      {/* Success message for name change */}
      {nameSuccessMessage && <p className="success">{nameSuccessMessage}</p>}

      {/* Email and Phone Number */}
      <div className="form-row">
        <div className="form-group">
        <label>IBAN</label>
          <input
            type="text"
            value={iban}
            onChange={(e) => setIBAN(e.target.value)}
          />
           <button
        className="change-address-btn"
        onClick={handleChangeIBAN}
        disabled={false}
      >
        Change IBAN
      </button>
        </div>

        <div className="form-group">
         
        </div>
      </div>

      {/* Address Details */}
      <h3>🌍 Address</h3>
      <div className="form-row">
        <div className="form-group">
          <label>Street</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
           <label>Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
           <button
            className="change-address-btn"
            onClick={handleChangeAddress}
            disabled={false}
          >
        Change Address
      </button>
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
            <label>Postal Code</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          
        </div>
        <div></div>
        
      </div>
     

      {/* Address Success Message */}
      {addressSuccessMessage && <p className="success">{addressSuccessMessage}</p>}

    

      <div className="info-text">ℹ️ We will only contact you to send a lounge pass or for a claim.</div>

      {/* Change Password Form */}
      <div className="password-section">
        <h3>🔑 Change Password</h3>
        <p>You will be able to login with your new password</p>

        <div className="form-row">
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          className="change-password-btn"
          onClick={handleChangePassword}
          disabled={isChangingPassword}
        >
          {isChangingPassword ? "Changing..." : "Change Password"}
        </button>

        {/* Success message for password change */}
        {passwordSuccessMessage && <p className="success">{passwordSuccessMessage}</p>}
      </div>
    </div>
  );
};

export default UserProfile;
