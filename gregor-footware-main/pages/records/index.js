import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

const Records = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [editingRowId, setEditingRowId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phoneNo: "",
    service: "",
    payment: 0,
    date: "",
    location: "",
    archive: false,
  });

  // Add New Customer
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Customer info saved successfully!");
        toggleModal();
        fetchCustomers();
      } else {
        alert("Failed to save customer info.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  // Fetch Customers
  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers");
      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }
      const data = await response.json();
      setCustomers(data.filter((customer) => !customer.archive));
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filtering and Sorting
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

  // Input Change Handler
  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    const processedValue = 
      name === "payment"
        ? value === "" ? "" : parseInt(value) || 0
        : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));

    if (isEditing) {
      const updatedCustomers = filteredCustomers.map(customer => 
        customer._id === editingRowId 
          ? { ...customer, [name]: processedValue } 
          : customer
      );
      setFilteredCustomers(updatedCustomers);
    }
  };

  // Start Inline Edit
  const startInlineEdit = (customer) => {
    setEditingRowId(customer._id);
    setFormData({
      name: customer.name,
      gender: customer.gender,
      phoneNo: customer.phoneNo,
      service: customer.service,
      payment: customer.payment,
      date: customer.date,
      location: customer.location,
      archive: customer.archive,
    });
  };

  // Inline Edit Submit
  const handleInlineEditSubmit = async (customerId) => {
    try {
      const response = await fetch("/api/customers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: customerId,
          ...formData,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Customer info updated successfully!");
        setEditingRowId(null);
        fetchCustomers();
      } else {
        alert("Failed to update customer info.");
      }
    } catch (error) {
      console.error("Error updating form:", error);
      alert("An error occurred while updating the form.");
    }
  };

  // Archive Customer
  const handleArchive = async (id) => {
    try {
      const response = await fetch("/api/archive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert("Customer archived successfully!");
        fetchCustomers();
      } else {
        alert("Failed to archive customer");
      }
    } catch (error) {
      console.error("Error archiving customer:", error);
      alert("Failed to archive customer");
    }
  };

  // Modal Toggles
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>Customer's Information</h1>
        <div style={styles.tableContainer}>
          {/* Search and Add Customer Section */}
          <div style={styles.tableHeader}>
            <div style={styles.searchSortContainer}>
              <button style={styles.newCustomerButton} onClick={toggleModal}>
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

          {/* Customers Table */}
          {isLoading ? (
            <p>Loading...</p>
          ) : filteredCustomers.length > 0 ? (
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
                {filteredCustomers.map((customer) => (
                  <tr key={customer._id} style={styles.tableRow}>
                    {editingRowId === customer._id ? (
                      // Inline Edit Row
                      <>
                        <td style={styles.tableCell}>
                          <input
                            type="text"
                            name="name"
                            value={customer.name}
                            onChange={(e) => handleInputChange(e, true)}
                            style={styles.inlineInput}
                          />
                        </td>
                        <td style={styles.tableCell}>
                          <select
                            name="gender"
                            value={customer.gender}
                            onChange={(e) => handleInputChange(e, true)}
                            style={styles.inlineInput}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </td>
                        <td style={styles.tableCell}>
                          <input
                            type="text"
                            name="phoneNo"
                            value={customer.phoneNo}
                            onChange={(e) => handleInputChange(e, true)}
                            style={styles.inlineInput}
                          />
                        </td>
                        <td style={styles.tableCell}>
                          <input
                            type="text"
                            name="service"
                            value={customer.service}
                            onChange={(e) => handleInputChange(e, true)}
                            style={styles.inlineInput}
                          />
                        </td>
                        <td style={styles.tableCell}>
                          <input
                            type="number"
                            name="payment"
                            value={customer.payment}
                            onChange={(e) => handleInputChange(e, true)}
                            style={styles.inlineInput}
                          />
                        </td>
                        <td style={styles.tableCell}>
                          <input
                            type="date"
                            name="date"
                            value={customer.date}
                            onChange={(e) => handleInputChange(e, true)}
                            style={styles.inlineInput}
                          />
                        </td>
                        <td style={styles.tableCell}>
                          <input
                            type="text"
                            name="location"
                            value={customer.location}
                            onChange={(e) => handleInputChange(e, true)}
                            style={styles.inlineInput}
                          />
                        </td>
                        <td style={styles.tableCell}>
                          <button
                            style={styles.editButton}
                            onClick={() => handleInlineEditSubmit(customer._id)}
                          >
                            Update
                          </button>
                          <button
                            style={styles.cancelButton}
                            onClick={() => setEditingRowId(null)}
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      // Normal Row
                      <>
                        <td style={styles.tableCell}>{customer.name}</td>
                        <td style={styles.tableCell}>{customer.gender}</td>
                        <td style={styles.tableCell}>{customer.phoneNo}</td>
                        <td style={styles.tableCell}>{customer.service}</td>
                        <td style={styles.tableCell}>₱ {customer.payment}</td>
                        <td style={styles.tableCell}>{customer.date}</td>
                        <td style={styles.tableCell}>{customer.location}</td>
                        <td style={styles.tableCell}>
                          <button className=""
                            style={styles.editButton}
                            onClick={() => startInlineEdit(customer)}
                          >
                            Edit
                          </button>
                          <button
                            style={styles.archiveButton}
                            onClick={() => handleArchive(customer._id)}
                          >
                            Archive
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No customers found.</p>
          )}
        </div>
      </div>

      {/* Add New Customer Modal */}
      {isModalOpen && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Add New Customer</h2>
            <form onSubmit={handleFormSubmit}>
                {/* Name Field */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              {/* Gender Field */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Gender:</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  style={styles.input}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Phone Number Field */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number:</label>
                <input
                  type="text"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              {/* Service Availed Field */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Service Availed:</label>
                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              {/* Payment Field */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Payment:</label>
                <input
                  type="number"
                  name="payment"
                  value={formData.payment}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter amount"
                />
              </div>

              {/* Date Field */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              {/* Location Field */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.modalActions}>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.saveButton}>
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
  archiveButton: {
    backgroundColor: "#FFC5C5",
    color: "#DF0404",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  editButton: {
    backgroundColor: "#71D88B",
    color: "black",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "20px",
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
};