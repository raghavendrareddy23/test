import React, { useState } from "react";

function DisplayName() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Full Name Display</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="firstName" style={{ display: "block", marginBottom: "5px" }}>
            First Name:
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            required
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="lastName" style={{ display: "block", marginBottom: "5px" }}>
            Last Name:
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            required
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button 
          type="submit" 
          style={{
            padding: "10px 15px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Submit
        </button>
      </form>
      
      {submitted && (
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
          Full Name: {formData.firstName} {formData.lastName}
        </div>
      )}
    </div>
  );
}

export default DisplayName;