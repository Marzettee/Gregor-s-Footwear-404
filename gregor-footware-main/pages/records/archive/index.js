import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react"; // Added useEffect import

const Records = () => {
  const [customers, setCustomers] = useState([]); // Initialize state for customers
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // Fetch customer data from the database
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/archived"); // Adjust the API endpoint as needed
        if (!response.ok) {
          throw new Error("Failed to fetch archived customers");
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching archived customer data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers
      .filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
  
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  
    setFilteredCustomers(filtered);
  }, [searchQuery, sortOrder, customers]);

  const handleUnarchive = async (id) => {
    try {
      const response = await fetch("/api/unarchive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to unarchive customer");
      }
  
      alert("Customer unarchived successfully!");
      // Refresh customers data
      const updatedCustomers = customers.filter((customer) => customer._id !== id);
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error("Error unarchiving customer:", error);
      alert("Failed to unarchive customer");
    }
  };

  
  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>Archived Customers</h1>
        <div style={styles.tableContainer}>
          <div style={styles.tableHeader}>
            <div style={styles.searchSortContainer}>
            <button
              style={{ ...styles.newCustomerButton, ...styles.disabledButton }}
              disabled
            >
              Add a New Customer
            </button>

              <div style={styles.searchAndSort}>
                <input
                  type="text"
                  placeholder="Search"
                  style={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                  style={styles.sortSelect}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="newest">Sort by: Newest</option>
                  <option value="oldest">Sort by: Oldest</option>
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : customers.length > 0 ? (
            <table style={styles.customersTable}>
              <thead>
                <tr style={styles.tableRow}>
                  <th style={styles.tableHeaderCell}>Customer Name</th>
                  <th style={styles.tableHeaderCell}>Gender</th>
                  <th style={styles.tableHeaderCell}>Phone Number</th>
                  <th style={styles.tableHeaderCell}>Service Availed</th>
                  <th style={styles.tableHeaderCell}>Payment</th>
                  <th style={styles.tableHeaderCell}>Date</th>
                  <th style={styles.tableHeaderCell}>Location</th>
                  <th style={styles.tableHeaderCell}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr key={index} style={styles.tableRow}>
                    <td style={styles.tableCell}>{customer.name}</td>
                    <td style={styles.tableCell}>{customer.gender}</td>
                    <td style={styles.tableCell}>{customer.phoneNo}</td>
                    <td style={styles.tableCell}>{customer.service}</td>
                    <td style={styles.tableCell}>₱ {customer.payment}</td>
                    <td style={styles.tableCell}>{customer.date}</td>
                    <td style={styles.tableCell}>{customer.location}</td>
                    <td style={styles.tableCell}>
                      <button
                        style={styles.unarchiveButton}
                        onClick={() => handleUnarchive(customer._id)}
                      >
                        Unarchive
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No customers found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Records;

const styles = {
  container: {
    margin: "20px",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    fontWeight: "700",
    textAlign: "left",
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    width: "100%",
  },
  searchSortContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  searchAndSort: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  searchInput: {
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "200px",
  },
  sortSelect: {
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  customersTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableRow: {
    display: "table-row",
  },
  tableHeaderCell: {
    padding: "12px",
    textAlign: "left",
    border: "1px solid #ddd",
    backgroundColor: "#f4f4f4",
  },
  tableCell: {
    padding: "12px",
    textAlign: "left",
    border: "1px solid #ddd",
  },
  unarchiveButton: {
    backgroundColor: "#C5F5C5", // Light green background
    color: "#047F04",          // Dark green text
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  
  newCustomerButton: {
    backgroundColor: "#1C323F",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    fontSize: "20px",
    marginBottom: "20px",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  saveButton: {
    backgroundColor: "#1C323F",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#FFC5C5",
    color: "#DF0404",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  disabledButton: {
    cursor: "not-allowed",
    opacity: 0.6,
  },
  
};
