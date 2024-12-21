import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin" && password === "password") {
      router.push("/dashboard");
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <Image
          src="/logo.png"
          alt="Gregor's Footwear Logo"
          width={500}
          height={500}
          style={styles.logoImage}
        />
      </div>
      <div style={styles.content}>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>
                Username
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username"
                style={{ ...styles.input, backgroundColor: "white" }}
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{ ...styles.input, backgroundColor: "white" }}
              />
            </div>
            <button
              type="submit"
              style={styles.loginButton}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#73483a")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#8a604a")}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px", // Reduced padding for better responsiveness
    flexWrap: "wrap",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
    maxWidth: "550px",
    width: "90%", // Responsive width
    padding: "20px",
    gap: "20px",
    flexWrap: "wrap", // Allow content to stack on small screens
  },
  logoContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "250px", // Minimum size for responsiveness
    maxWidth: "500px", // Prevent the logo from being too large
  },
  formContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: "250px", // Minimum size for responsiveness
    padding: "20px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "25px",
    color: "#333",
    textAlign: "center", // Centered title
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "500",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  loginButton: {
    width: "100%",
    padding: "12px 0",
    backgroundColor: "#A2845E",
    marginTop: "25px",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};
