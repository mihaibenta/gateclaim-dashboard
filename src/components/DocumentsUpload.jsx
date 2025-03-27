import React, { useState } from "react";
import "../styles/DocumentsUpload.css"; // Import styles

const DocumentsUpload = () => {
  const [idFile, setIdFile] = useState(null);
  const [boardingPassFile, setBoardingPassFile] = useState(null);

  // Allowed file types
  const imageTypes = ["image/jpeg", "image/png", "image/jpg"];
  const boardingPassTypes = [...imageTypes, "application/pdf"];

  // Handle ID/Passport upload
  const handleIdUpload = (event) => {
    const file = event.target.files[0];
    if (file && imageTypes.includes(file.type)) {
      setIdFile(file);
    } else {
      alert("Please upload a valid image file (JPG, JPEG, PNG) for your ID.");
    }
  };

  // Handle Boarding Pass upload
  const handleBoardingPassUpload = (event) => {
    const file = event.target.files[0];
    if (file && boardingPassTypes.includes(file.type)) {
      setBoardingPassFile(file);
    } else {
      alert("Please upload a valid file (JPG, JPEG, PNG, PDF) for your boarding pass.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Upload Your Documents</h2>

      {/* ID / Passport Upload */}
      <div className="section">
        <label className="label">ID / Passport (Image only)</label>
        <input type="file" id="id-upload" accept="image/jpeg,image/png,image/jpg" onChange={handleIdUpload} hidden />
        <label htmlFor="id-upload" className="upload-button">Choose File</label>
        {idFile && (
          <div className="file-preview">
            <p className="file-name">{idFile.name}</p>
            <img src={URL.createObjectURL(idFile)} alt="ID Preview" className="preview-image" />
          </div>
        )}
      </div>

      <hr />

      {/* Boarding Pass Upload */}
      <div className="section">
        <label className="label">Boarding Pass (Image / PDF)</label>
        <input type="file" id="boarding-pass-upload" accept="image/jpeg,image/png,image/jpg,application/pdf" onChange={handleBoardingPassUpload} hidden />
        <label htmlFor="boarding-pass-upload" className="upload-button">Choose File</label>
        {boardingPassFile && (
          <div className="file-preview">
            <p className="file-name">{boardingPassFile.name}</p>
            {boardingPassFile.type === "application/pdf" ? (
              <p className="pdf-message">PDF uploaded (Preview unavailable)</p>
            ) : (
              <img src={URL.createObjectURL(boardingPassFile)} alt="Boarding Pass Preview" className="preview-image" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsUpload;
