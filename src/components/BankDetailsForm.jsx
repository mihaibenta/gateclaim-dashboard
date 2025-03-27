import React, { useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import "../styles/bankDetailsForm.css"; // Import CSS
import logo from "/logo_gt_transparent.png"; // Import the logo

const BankDetailsForm = () => {
  const [formData, setFormData] = useState({
    accountHolder: "",
    IBAN: "",
    swiftCode: "",
    currency: "",
    wireTransfer: true,
    permissionGranted: true,
    paymentInEURorRON: true,
    acceptFees: true,
    differentPaymentMethod: false,
  });

  const [errors, setErrors] = useState({
    IBAN: "",
    swiftCode: "",
    currency: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;
  
    if (name === "IBAN") {
      newValue = formatIBAN(value);
    }
  
    // Prevent unchecking the "acceptFees" checkbox
    if (name === "acceptFees" && !checked) {
      alert(
        "According to our terms and conditions and our assignment agreement, all bank fees, exchange rate spreads, intermediary banks fees a.s.o. will be deducted from the final amount that you receive."
      );
      return; // Exit function without updating state
    }
  
    // Show a message when unchecking "paymentInEURorRON"
    if (name === "paymentInEURorRON" && !checked) {
      alert(
        "You will be contacted by a customer service agent in order to arrange your payment."
      );
    }
  
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
      ...(name === "wireTransfer" && checked ? { differentPaymentMethod: false } : {}),
      ...(name === "differentPaymentMethod" && checked ? { wireTransfer: false } : {}),
    }));
  
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  

  // Auto-format IBAN
  const formatIBAN = (iban) => {
    return iban.replace(/\s+/g, "").replace(/(.{4})(?=.)/g, "$1 ");
  };

  const validateForm = () => {
    const newErrors = {};
    const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{4,30}$/;
    if (!ibanRegex.test(formData.IBAN.replace(/\s+/g, ""))) {
      newErrors.IBAN = "Invalid IBAN format.";
    }

    const swiftRegex = /^[A-Za-z0-9]{8,11}$/;
    if (!swiftRegex.test(formData.swiftCode)) {
      newErrors.swiftCode = "Invalid Swift/BIC code.";
    }

    if (formData.currency !== "EUR" && formData.currency !== "RON") {
      newErrors.currency = "Currency must be EUR or RON.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    generateWordDocument(formData);
  };

  const generateWordDocument = async (data) => {
    const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const fileName = `${data.accountHolder.replace(/\s+/g, "_")}_bankinfo_${currentDate}.docx`;
  
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: `Bank Details for ${data.accountHolder}`, bold: true, size: 28 })],
              spacing: { after: 200 },
            }),
  
            createParagraph("I hereby declare that I want all the amounts paid to me to be:"),
  
            createCheckbox("wired by bank transfer/bank wire to this bank account held by me:", data.wireTransfer),
  
            createParagraph("Account Holder: " + data.accountHolder, true),
            createParagraph("IBAN: " + data.IBAN, true),
            createParagraph("Swift Code of the bank: " + data.swiftCode, true),
            createParagraph("Currency of the account: " + data.currency, true),
  
            createCheckbox(
              "I have obtained the permission of my fellow passengers to receive their compensations in the above-mentioned account",
              data.permissionGranted
            ),
  
            createCheckbox(
              "I accept that the payment will be made in EUR from a bank account in the EU and/or in RON in a bank account from Romania.",
              data.paymentInEURorRON
            ),
  
            createCheckbox("I accept that all bank fees will be deducted from the final amount I receive.", data.acceptFees),
  
            createCheckbox("Paid in a different manner. Please contact me.", data.differentPaymentMethod),
          ],
        },
      ],
    });
  
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  

  const createParagraph = (text, isUnderlined = false) =>
    new Paragraph({
      children: [
        new TextRun({
          text,
          bold: isUnderlined,
          underline: isUnderlined,
        }),
      ],
      spacing: { after: 100 },
    });

  const createCheckbox = (text, isChecked) =>
    new Paragraph({
      children: [
        new TextRun({
          text: isChecked ? "☑ " : "☐ ",
          bold: true,
        }),
        new TextRun({ text }),
      ],
      spacing: { after: 100 },
    });

    return (
        <div className="form-container">
          <h2>Update Payment Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-content">
              {/* Left Side - Input Fields */}
              <div className="form-left">
                <label>Account Holder:</label>
                <input type="text" name="accountHolder" value={formData.accountHolder} onChange={handleChange} required />
      
                <label>IBAN:</label>
                <input type="text" name="IBAN" value={formData.IBAN} onChange={handleChange} required maxLength="34" />
                {errors.IBAN && <div className="error">{errors.IBAN}</div>}
      
                <label>Swift Code:</label>
                <input type="text" name="swiftCode" value={formData.swiftCode} onChange={handleChange} required maxLength="11" />
                {errors.swiftCode && <div className="error">{errors.swiftCode}</div>}
      
                <label>Currency:</label>
                <select name="currency" value={formData.currency} onChange={handleChange} required>
                  <option value="">Select Currency</option>
                  <option value="EUR">EUR</option>
                  <option value="RON">RON</option>
                </select>
                {errors.currency && <div className="error">{errors.currency}</div>}
              </div>
      
              {/* Right Side - Checkboxes */}
              <div className="form-right">
                {[
                  { name: "wireTransfer", label: "Wired by bank transfer/bank wire to this bank account held by me" },
                  { name: "permissionGranted", label: "I have permission to receive fellow passengers' compensations" },
                  { name: "paymentInEURorRON", label: "I accept payment in EUR from the EU or RON from Romania" },
                  { name: "acceptFees", label: "I accept that all bank fees will be deducted" },
                  { name: "differentPaymentMethod", label: "Paid in a different manner. Please contact me." },
                ].map(({ name, label }) => (
                  <div key={name} className="checkbox-group">
                    <input type="checkbox" name={name} checked={formData[name]} onChange={handleChange} />
                    <label>{label}</label>
                  </div>
                ))}
              </div>
            </div>
      
            <button type="submit">Submit & Download</button>
            <img src={logo} alt="GateClaim Logo" className="login-logo" />
          </form>
        </div>
      );      
};

export default BankDetailsForm;
