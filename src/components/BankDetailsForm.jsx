import React, { useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import "../styles/bankDetailsForm.css"; // Import CSS

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
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: "Upload/Modify My Bank Details", bold: true, size: 28 })],
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
    a.download = "Bank_Details.docx";
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
      <h2>Upload/Modify Bank Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Account Holder:
          <input type="text" name="accountHolder" value={formData.accountHolder} onChange={handleChange} required />
        </label>

        <label>
          IBAN:
          <input type="text" name="IBAN" value={formData.IBAN} onChange={handleChange} required maxLength="34" />
          {errors.IBAN && <div className="error">{errors.IBAN}</div>}
        </label>

        <label>
          Swift Code:
          <input type="text" name="swiftCode" value={formData.swiftCode} onChange={handleChange} required maxLength="11" />
          {errors.swiftCode && <div className="error">{errors.swiftCode}</div>}
        </label>

        <label>
          Currency:
          <input type="text" name="currency" value={formData.currency} onChange={handleChange} required />
          {errors.currency && <div className="error">{errors.currency}</div>}
        </label>

        <div className="checkbox-group">
          <input type="checkbox" name="wireTransfer" checked={formData.wireTransfer} onChange={handleChange} />
          <label>Wired by bank transfer/bank wire to this bank account held by me</label>
        </div>

        <div className="checkbox-group">
          <input type="checkbox" name="permissionGranted" checked={formData.permissionGranted} onChange={handleChange} />
          <label>I have permission to receive fellow passengers' compensations</label>
        </div>

        <div className="checkbox-group">
          <input type="checkbox" name="paymentInEURorRON" checked={formData.paymentInEURorRON} onChange={handleChange} />
          <label>I accept payment in EUR from the EU or RON from Romania</label>
        </div>

        <div className="checkbox-group">
          <input type="checkbox" name="acceptFees" checked={formData.acceptFees} onChange={handleChange} />
          <label>I accept that all bank fees will be deducted</label>
        </div>

        <div className="checkbox-group">
          <input type="checkbox" name="differentPaymentMethod" checked={formData.differentPaymentMethod} onChange={handleChange} />
          <label>Paid in a different manner. Please contact me.</label>
        </div>

        <button type="submit">Submit & Download</button>
      </form>
    </div>
  );
};

export default BankDetailsForm;
