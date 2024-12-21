"use client";

import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

export default function ReceiptCard({
  cardId,
  name,
  receiptNumber,
  cardColor,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [isStarred, setIsStarred] = useState(false);

  // Fetch receipt data when component mounts
  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const res = await fetch(`/api/receipt/${cardId}`);
        if (!res.ok) {
          throw new Error("Receipt not found");
        }
        const data = await res.json();
        console.log("Fetched receipt data:", data);
        setReceiptData(data);

        // Set initial star state from database
        setIsStarred(data.Starred === "True");
      } catch (error) {
        console.error("Error fetching receipt data:", error);
      }
    };

    if (cardId) {
      fetchReceiptData();
    }
  }, [cardId]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const toggleStar = async () => {
    try {
      // Determine new starred state
      const newStarredState = !isStarred ? "True" : "False";

      // Update the database
      const res = await fetch(`/api/${cardId}/toggle-star`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Starred: newStarredState }),
      });

      if (!res.ok) {
        throw new Error("Failed to toggle star state");
      }

      // Update UI state
      setIsStarred(!isStarred);

      // Display an alert based on the new state
      const alertMessage = !isStarred
        ? `${name} is pinned to the top!`
        : `${name} is unpinned from the top...`;
      alert(alertMessage);

      // Reload the page after alert
      window.location.reload();
    } catch (error) {
      console.error("Error toggling star state:", error);
    }
  };
  
  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    alert("Printing...");

    // Set up font size for the header and sub-headers
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("GREGOR'S FOOT WEAR", 20, 20);  

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Repair Shop & Shoe Supply", 20, 30);  
    doc.text("#9 Canda St., E.B.B., Olongapo City", 20, 40);  
    doc.text("Contact No.: 0920-2958-879 | 0991-3490-854", 20, 50);  
    
    doc.text("================================================", 20, 60);

    // Receipt Information (Regular Font)
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Name:", 20, 70);  // Bold Label
    doc.setFont("helvetica", "normal");
    doc.text(`${receiptData.fullName}`, 60, 70);  // Regular Value

    doc.setFont("helvetica", "bold");
    doc.text("Address:", 20, 80);  // Bold Label
    doc.setFont("helvetica", "normal");
    doc.text(`${receiptData.address || "Not provided"}`, 60, 80);  // Regular Value

    doc.setFont("helvetica", "bold");
    doc.text("Phone:", 20, 90);  // Bold Label
    doc.setFont("helvetica", "normal");
    doc.text(`${receiptData.phoneNumber || "Not provided"}`, 60, 90);  // Regular Value

    doc.setFont("helvetica", "bold");
    doc.text("Date Rec'd:", 20, 100);  // Bold Label
    doc.setFont("helvetica", "normal");
    doc.text(`${receiptData.dateRecorded || "Not provided"}`, 60, 100);  // Regular Value

    doc.setFont("helvetica", "bold");
    doc.text("Date Prom:", 20, 110);  // Bold Label
    doc.setFont("helvetica", "normal");
    doc.text(`${receiptData.datePromised || "Not provided"}`, 60, 110);  // Regular Value

    doc.setFont("helvetica", "bold");
    doc.text("Price:", 20, 120);  // Bold Label
    doc.setFont("helvetica", "normal");
    doc.text(`${receiptData.price || "Not provided"}`, 60, 120);  // Regular Value

    doc.setFont("helvetica", "bold");
    doc.text("Kind:", 20, 130);  // Bold Label
    doc.setFont("helvetica", "normal");
    doc.text(`${receiptData.kind || "Not provided"}`, 60, 130);  // Regular Value

    doc.setFont("helvetica", "bold");
    doc.text("Deposit:", 20, 140);  // Bold Label
    doc.setFont("helvetica", "normal");
    doc.text(`${receiptData.deposit || "Not provided"}`, 60, 140);  // Regular Value

    doc.setFont("helvetica", "bold");
    doc.text("Stock No.:", 20, 150);  // Bold Label
    doc.setFont("helvetica", "normal");
    doc.text(`${receiptData.stockNumber || "Not provided"}`, 60, 150);  // Regular Value

    doc.setFont("helvetica", "bold");
    doc.text("Balance:", 20, 160);  // Bold Label
    doc.setFont("helvetica", "normal");
    doc.text(`${receiptData.balance || "Not provided"}`, 60, 160);  // Regular Value

    doc.setFont("helvetica", "bold");
    doc.text("Color:", 20, 170);  // Bold Label
    doc.setFont("helvetica", "normal");
    doc.text(`${receiptData.color || "Not provided"}`, 60, 170);  // Regular Value

    doc.setFont("helvetica", "bold");
    doc.text("Rec’d Payment:", 20, 180);  // Bold Label
    doc.setFont("helvetica", "normal");
    doc.text(`${receiptData.dateRecorded || "Not provided"}`, 60, 180);  // Regular Value

    doc.setFont("helvetica", "bold");
    doc.text("Verified by:", 20, 190);  // Bold Label
    doc.setFont("helvetica", "normal");
    doc.text(`${receiptData.verifiedBy || "Not provided"}`, 60, 190);  // Regular Value

    doc.text("================================================", 20, 200);

    // Add italic text for notice
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Item not claimed within 30 days; from the above date will be forfeited.", 20, 210);

    // Add the card ID in bold
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`No. ${cardId}`, 20, 220);

    // Save the PDF with dynamic filename using Name of the Customer
    doc.save(`${receiptData.fullName}-receipt.pdf`);
  };

  return (
    <>
      <div style={styles.cardContainer}>
        {/* Header Section */}
        <div style={{ ...styles.header, backgroundColor: cardColor }}>
          <p style={styles.receiptsText}>Receipts</p>
          <h1 style={styles.receiptNumber}>{receiptNumber}</h1>
          <div style={styles.starContainer} onClick={toggleStar}>
            {/* Star Icon with dynamic color */}
            <span
              style={{
                ...styles.starIcon,
                color: isStarred ? "#FFA500" : "#FFF",
                cursor: "pointer",
              }}
            >
              ★
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div style={styles.content}>
          <p style={styles.customerLabel}>Customer:</p>
          <p style={styles.customerName}>{name}</p>
          <button style={styles.detailsButton} onClick={handleOpenModal}>
            See Details
          </button>
        </div>
      </div>

      {/* Modal Section */}
      {isModalOpen && receiptData && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            style={{ ...styles.modalContent, backgroundColor: cardColor }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon */}
            <button
              style={styles.closeIcon}
              onClick={handleCloseModal}
              aria-label="Close Modal"
            >
              ✕
            </button>

            {/* Receipt Header */}
            <h2 style={styles.modalHeader}>GREGOR'S FOOT WEAR</h2>
            <p style={styles.modalSubHeader}>
              Repair Shop & Shoe Supply <br />
              #9 Canda St., E.B.B., Olongapo City <br />
              Contact No.: 0920-2958-879 | 0991-3490-854
            </p>

            {/* Receipt Content */}
            <div style={styles.modalBody}>
              <p>
                <strong>Name: </strong>
                {receiptData.fullName}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {receiptData.address || "Not provided"}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {receiptData.phoneNumber || "Not provided"}
              </p>
              <p>
                <strong>Date Rec'd:</strong>{" "}
                {receiptData.dateRecorded || "Not provided"}
              </p>
              <p>
                <strong>Date Prom:</strong>{" "}
                {receiptData.datePromised || "Not provided"}
              </p>
              <p>
                <strong>Price:</strong> {receiptData.price || "Not provided"}{" "}
                <strong>Kind:</strong> {receiptData.kind || "Not provided"}
              </p>
              <p>
                <strong>Deposit:</strong>{" "}
                {receiptData.deposit || "Not provided"}{" "}
                <strong>Stock No.:</strong>{" "}
                {receiptData.stockNumber || "Not provided"}
              </p>
              <p>
                <strong>Balance:</strong>{" "}
                {receiptData.balance || "Not provided"} <strong>Color:</strong>{" "}
                {receiptData.color || "Not provided"}
              </p>
              <p>
                <strong>Rec’d Payment:</strong>{" "}
                {receiptData.dateRecorded || "Not provided"}
              </p>
              <p>
                <strong>Verified by:</strong>{" "}
                {receiptData.verifiedBy || "Not provided"}
              </p>
              <p style={styles.notice}>
                Item not claimed within 30 days; from the above date will be
                forfeited.
              </p>
              <p style={{ textAlign: "center", fontWeight: "bold" }}>
                No. {cardId}
              </p>
            </div>

            {/* Print Button */}
            <button
              style={styles.printButton}
              onClick={generatePDF}
            >
              Print Receipt
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  cardContainer: {
    width: "200px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    padding: "15px",
    textAlign: "left",
    position: "relative",
  },
  starContainer: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  starIcon: {
    fontSize: "20px",
  },
  receiptsText: {
    margin: 0,
    marginBottom: "8px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  receiptNumber: {
    margin: "5px 0 0",
    fontSize: "28px",
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#FFFFFF",
    padding: "15px",
  },
  customerLabel: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  },
  customerName: {
    margin: "5px 0 30px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
  },
  detailsButton: {
    display: "block",
    width: "100%",
    backgroundColor: "#1a202c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "8px",
    fontSize: "14px",
    cursor: "pointer",
  },
  modalOverlay: {
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
  },
  modalContent: {
    position: "relative",

    borderRadius: "10px",
    padding: "20px",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    fontFamily: "Arial, sans-serif",
    color: "#000",
  },
  closeIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  modalHeader: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
    marginBottom: "10px",
  },
  modalSubHeader: {
    textAlign: "center",
    fontSize: "12px",
    marginBottom: "20px",
  },
  modalBody: {
    fontSize: "12px",
    lineHeight: "1.5",
  },
  notice: {
    fontSize: "10px",
    marginTop: "15px",
    fontStyle: "italic",
    textAlign: "center",
  },
  printButton: {
    display: "block",
    width: "100%",
    marginTop: "20px",
    backgroundColor: "#1a202c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "14px",
    cursor: "pointer",
  },
};
