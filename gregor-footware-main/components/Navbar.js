import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [isSalesDropdownOpen, setSalesDropdownOpen] = useState(false);
  const [isRecordsDropdownOpen, setRecordsDropdownOpen] = useState(false);

  const toggleSalesDropdown = () => {
    setSalesDropdownOpen(!isSalesDropdownOpen);
  };

  const toggleRecordsDropdown = () => {
    setRecordsDropdownOpen(!isRecordsDropdownOpen);
  };

  const isActive = (path) => {
    // Exact match for the path
    if (router.pathname === path) return true;
    
    // For nested routes, ensure it's an exact sub-route
    // This prevents parent routes from being marked active for child routes
    const pathSegments = router.pathname.split('/');
    const checkSegments = path.split('/');
    
    return pathSegments.length === checkSegments.length && 
           pathSegments.every((segment, index) => segment === checkSegments[index]);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.leftSection}>
        <img src="/logo.png" alt="Logo" style={styles.logo} />
        <h1 style={styles.brandName}>Gregor's Footwear</h1>
      </div>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link
            href="/dashboard"
            style={{
              ...styles.navLink,
              ...(isActive("/dashboard") ? { color: "#9A7B4D" } : {}), 
            }}
          >
            Dashboard
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link
            href="/receipts"
            style={{
              ...styles.navLink,
              ...(isActive("/receipts") ? { color: "#9A7B4D" } : {}),
            }}
          >
            Receipts
          </Link>
        </li>
        <li
          style={styles.navItem}
          onMouseEnter={toggleSalesDropdown}
          onMouseLeave={toggleSalesDropdown}
        >
          <span
            style={{
              ...styles.navLink,
              ...(isActive("/sales") ? { color: "#9A7B4D" } : {}),
            }}
          >
            Sales
          </span>
          {isSalesDropdownOpen && (
            <ul style={styles.dropdown}>
            <li style={styles.dropdownItem}>
              <Link
                href="/sales"
                style={{
                  ...styles.navLink,
                  ...(isActive("/sales") ? { color: "#9A7B4D" } : {}),
                }}
              >
                Overview
              </Link>
            </li>
            <li style={styles.dropdownItem}>
              <Link
                href="/sales/transaction"
                style={{
                  ...styles.navLink,
                  ...(isActive("/sales/transaction") ? { color: "#9A7B4D"} : {}),
                }}
              >
                Transactions
              </Link>
              </li>
            </ul>
          )}
        </li>
        <li
          style={styles.navItem}
          onMouseEnter={toggleRecordsDropdown}
          onMouseLeave={toggleRecordsDropdown}
        >
          <span
            style={{
              ...styles.navLink,
              ...(isActive("/records") ? { color: "#9A7B4D" } : {}),
            }}
          >
            Records
          </span>
          {isRecordsDropdownOpen && (
            <ul style={styles.dropdown}>
              <li style={styles.dropdownItem}>
                <Link
                  href="/records"
                  style={{
                    ...styles.navLink,
                    ...(isActive("/records") ? { color: "#9A7B4D" } : {}),
                  }}
                >
                  Customer
                </Link>
              </li>
              <li style={styles.dropdownItem}>
                <Link
                  href="/records/archive"
                  style={{
                    ...styles.navLink,
                    ...(isActive("/records/archive") ? { color: "#9A7B4D"} : {}),
                  }}
                >
                  Archive
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <div style={styles.rightSection}>
        <button style={styles.logoutButton}>
          <Link href="/" style={styles.logoutIcon}>
            ➜
          </Link>
        </button>
      </div>
    </nav>
  );
};


const styles = {
  navbar: {
    backgroundColor: "#1E2A38",
    color: "white",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "70px",
    height: "70px",
    marginRight: "5px",
  },
  brandName: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: 0,
  },
  navList: {
    display: "flex",
    listStyle: "none",
    gap: "20px",
    margin: 0,
    padding: 0,
    marginLeft: "auto",
  },
  navItem: {
    position: "relative",
    padding: "5px 10px",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    marginRight: "20px",
  },
  rightSection: {},
  logoutButton: {
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "20px",
  },
  logoutIcon: {
    transform: "rotate(-90deg)",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: "0",
    backgroundColor: "#1E2A38",
    listStyle: "none",
    padding: "10px 0",
    margin: 0,
    zIndex: 1,
    minWidth: "150px",
  },
  dropdownItem: {
    padding: "8px 20px",
  },
};

export default Navbar;
