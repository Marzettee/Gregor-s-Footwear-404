"use client";

import Navbar from "@/components/Navbar";
import ReceiptCard from "@/components/ReceiptCard";
import { useState, useEffect } from "react";

export default function Receipts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalColor, setModalColor] = useState("");

  //const [receipts, setReceipts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [starredReceipts, setStarredReceipts] = useState([]);
  const [regularReceipts, setRegularReceipts] = useState([]);
  const [filterKind, setFilterKind] = useState("All"); // State for selected filter

  // Fetch receipts function
  const fetchReceipts = async () => {
    try {
      setIsLoading(true);

      // Fetch starred receipts
      const starredResponse = await fetch("/api/receipts?starred=true");
      const starredData = await starredResponse.json();
      setStarredReceipts(starredData);

      // Fetch regular receipts
      const regularResponse = await fetch("/api/receipts?starred=false");
      const regularData = await regularResponse.json();
      setRegularReceipts(regularData);
    } catch (error) {
      console.error("Error fetching receipts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch receipts when the component mounts
  useEffect(() => {
    fetchReceipts();
  }, []);

  const handleFilterChange = (event) => {
    setFilterKind(event.target.value);
  };

  const filteredStarredReceipts = filterKind === "All"
    ? starredReceipts
    : starredReceipts.filter(receipt => receipt.kind === filterKind);

  const filteredRegularReceipts = filterKind === "All"
    ? regularReceipts
    : regularReceipts.filter(receipt => receipt.kind === filterKind);

  const openModal = (color) => {
    setModalColor(color);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      fullName: event.target.fullName.value,
      phoneNumber: event.target.phoneNumber.value,
      address: event.target.address.value,
      dateRecorded: event.target.dateRecorded.value,
      datePromised: event.target.datePromised.value,
      price: event.target.price.value,
      kind: event.target.kind.value,
      deposit: event.target.deposit.value,
      stockNumber: event.target.stockNumber.value,
      balance: event.target.balance.value,
      color: modalColor,
      Starred: "False",
    };

    try {
      const response = await fetch("/api/receipts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Receipt saved successfully!");
        closeModal();

        // Refresh the receipts
        fetchReceipts();
      } else {
        throw new Error("Failed to save receipt.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          {/* Dropdown for Select Kind */}
          <select
            aria-label="Select Kind"
            style={dropdownStyles}
            onChange={handleFilterChange}
            value={filterKind}
          >
            <option value="" disabled selected>
              Select Kind
            </option>  
            <option value="All">All Kind</option>                
            <option>Lowcut Shoes</option>
            <option>Highcut Shoes</option>
            <option>Haruta</option>
            <option>Casual Shoes</option>
            <option>Safety Shoes</option>
            <option>Boots</option>
            <option>Combat Shoes</option>
            <option>Western Boots</option>
            <option>Sandals</option>
            <option>School Shoes</option>
            <option>Belt</option>
          </select>

          {/* New Receipt Buttons */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
              marginLeft: "auto",
            }}
          >
            <button
              onClick={() => openModal("yellow")}
              style={newReceiptButtonStyles}
            >
              New Receipt (Yellow) +
            </button>
            <button
              onClick={() => openModal("pink")}
              style={newReceiptButtonStyles}
            >
              New Receipt (Pink) +
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div style={modalBackdropStyles}>
            <div style={modalBoxStyles}>
              <form onSubmit={handleFormSubmit}>
                {/* Modal Content */}
                <button
                  type="button"
                  onClick={closeModal}
                  style={closeButtonStyles}
                >
                  ✕
                </button>
                <div
                  style={{
                    ...headerStyles,
                    backgroundColor:
                      modalColor === "yellow" ? "#FFEAA9" : "#FFD8E2",
                  }}
                >
                  <span style={receiptNumberStyles}>
                    No: <span style={numberStyles}>will generate after submitting*</span>
                  </span>
                  <h2 style={{ margin: "10px 0" }}>
                    Receipt Information
                  </h2>
                </div>
                <div style={formGridStyles}>
                  <InputField label="Full Name" id="fullName" required />
                  <InputField label="Phone Number" id="phoneNumber" required />
                  <InputField
                    label="Address"
                    id="address"
                    style={{ gridColumn: "span 2" }}
                  />
                  <InputField
                    label="Date Recorded"
                    id="dateRecorded"
                    type="date"
                    required
                  />
                  <InputField
                    label="Date Promised"
                    id="datePromised"
                    type="date"
                    required
                  />
                  <InputField label="Price" id="price" required />
                  <div>
                    <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                      Kind
                    </p>
                    <select
                      className="select select-bordered select-sm w-full max-w-xs"
                      id="kind"
                      required
                    >
                      <option value="" disabled selected>
                        Kind
                      </option>
                      <option>Lowcut Shoes</option>
                      <option>Highcut Shoes</option>
                      <option>Haruta</option>
                      <option>Casual Shoes</option>
                      <option>Safety Shoes</option>
                      <option>Boots</option>
                      <option>Combat Shoes</option>
                      <option>Western Boots</option>
                      <option>Sandals</option>
                      <option>School Shoes</option>
                      <option>Belt</option>
                    </select>
                  </div>
                  <InputField label="Deposit" id="deposit" required />
                  <div>
                    <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                      Stock Number
                    </p>
                    <select
                      className="select select-bordered select-sm w-full max-w-xs"
                      id="stockNumber"
                      required
                    >
                      <option value="" disabled selected>
                        Stock Number
                      </option>
                      <option>Made to Order (MTO)</option>
                      <option>Repair</option>
                      <option>Resole</option>
                      <option>Padikit</option>
                      <option>Patahi</option>
                      <option>Recolor</option>
                    </select>
                  </div>
                  <InputField label="Balance" id="balance" required />
                  <div>
                    <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                      Color
                    </p>
                    <select
                      className="select select-bordered select-sm w-full max-w-xs"
                      id="color"
                      required
                    >
                      <option value="" disabled selected>
                        Color
                      </option>
                      <option>Black</option>
                      <option>Brown</option>
                      <option>Choco Brown</option>
                      <option>Dark Brown</option>
                      <option>White</option>
                      <option>Blue</option>
                      <option>Navy Blue</option>
                    </select>
                  </div>
                </div>
                <button type="submit" style={saveButtonStyles}>
                  Save
                </button>
                <p style={noticeStyles}>
                  Item not claimed within 30 days will be forfeited.
                </p>
              </form>
            </div>
          </div>
        )}

        {/* Horizontal Line */}
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #ddd",
            margin: "10px 0",
          }}
        />

        <div>
          <p style={{ fontSize: "12px", color: "#666" }}>
            <i>ⓘ Tap on the receipt to see more info</i>
          </p>
        </div>
      </div>

      {/* Starred Receipts Section */}
      <div style={{ marginLeft: "20px", marginBottom: "30px" }}>
        <h2 style={sectionLabelStyles}>Starred Receipts</h2>
        {isLoading ? (
          <p>Loading starred receipts...</p>
        ) : filteredStarredReceipts.length > 0 ? (
          <div style={gridStyles}>
            {filteredStarredReceipts.map((receipt) => (
              <ReceiptCard
                key={receipt._id}
                cardId={receipt._id}
                name={receipt.fullName}
                receiptNumber={receipt.receiptNumber.slice(-4)}
                cardColor={receipt.color === "yellow" ? "#FFEAA9" : "#FFD8E2"}
              />
            ))}
          </div>
        ) : (
          <p>No starred receipts yet...</p>
        )}
      </div>
      
      {/* Regular Receipts Section */}
      <div style={{ marginLeft: "20px" }}>
        <h2 style={sectionLabelStyles}>Receipts</h2>
        {isLoading ? (
          <p>Loading receipts...</p>
        ) : filteredRegularReceipts.length > 0 ? (
          <div style={gridStyles}>
            {filteredRegularReceipts.map((receipt) => (
              <ReceiptCard
                key={receipt._id}
                cardId={receipt._id}
                name={receipt.fullName}
                receiptNumber={receipt.receiptNumber.slice(-4)}
                cardColor={receipt.color === "yellow" ? "#FFEAA9" : "#FFD8E2"}
              />
            ))}
          </div>
        ) : (
          <p>No receipts found.</p>
        )}
      </div>
    </>
  );
}

// Reusable InputField Component
const InputField = ({ label, id, type = "text", style, required  }) => (
  <div style={{ display: "flex", flexDirection: "column", ...style }}>
    <label htmlFor={id} style={{ fontSize: "0.9rem", marginBottom: "5px" }}>
      {label}
    </label>
    <input
      type={type}
      id={id}
      required={required}
      style={{
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "0.9rem",
      }}
    />
  </div>
);

// Reusable SelectField Component
const SelectField = ({ label, id }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label htmlFor={id} style={{ fontSize: "0.9rem", marginBottom: "5px" }}>
      {label}
    </label>
    <select
      id={id}
      style={{
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "0.9rem",
      }}
    >
      <option>Select option</option>
    </select>
  </div>
);

// Inline Styles
const dropdownStyles = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "0.9rem",
};

const newReceiptButtonStyles = {
  backgroundColor: "#1a202c",
  color: "#fff",
  borderRadius: "4px",
  padding: "5px 10px",
  marginRight: "10px",
  marginLeft: "auto",
};

const modalBackdropStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalBoxStyles = {
  width: "90%",
  maxWidth: "500px",
  padding: "20px",
  background: "#fff",
  borderRadius: "8px",
  position: "relative",
};

const headerStyles = {
  textAlign: "center",
  padding: "10px 0",
  borderRadius: "8px",
  marginBottom: "20px",
};

const receiptNumberStyles = {
  fontWeight: "bold",
  fontSize: "0.9rem",
};

const numberStyles = {
  color: "#ff3d00",
};

const formGridStyles = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
};

const closeButtonStyles = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "none",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
};

const saveButtonStyles = {
  width: "100%",
  padding: "10px",
  background: "#333",
  color: "#fff",
  borderRadius: "8px",
  marginTop: "20px",
};

const noticeStyles = {
  fontSize: "0.8rem",
  textAlign: "center",
  color: "#999",
  marginTop: "10px",
};

const sectionLabelStyles = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "15px",
};

const gridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "10px",
  maxWidth: "100%",
  //margin: "0 auto",
  padding: "20px",
};
