import React, { useState } from "react";
import "../styles/userAccount.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: "Mihai",
    lastName: "Bența",
    email: "benta_mihai007@yahoo.com",
    phone: "+40 744 555 555",
  });

  return (
    <div className="user-profile">
      <h3>Your Details</h3>
      <p>Please provide us with some information</p>

      <div className="form-group">
        <label>First Name</label>
        <input type="text" value={user.firstName} disabled />
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input type="text" value={user.lastName} disabled />
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <input type="email" value={user.email} disabled />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input type="tel" value={user.phone} disabled />
      </div>

      <p className="info-text">
        📩 We will only contact you to send a lounge pass or for a claim.
      </p>

      <button className="update-btn" disabled>Update My Details</button>

      <div className="password-section">
        <h3>Change Password</h3>
        <p>We will send you a password reset link via email</p>
        <button className="change-password-btn">Change Password</button>
      </div>
    </div>
  );
};

export default UserProfile;
