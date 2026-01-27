import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        fontSize: "1.2rem"
      }}>
        Loading profile...
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: "20px", color: "#333" }}
        >
          Welcome, {user.name}!
        </motion.h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: "30px" }}
        >
          <p style={{ color: "#666", marginBottom: "10px" }}>
            <strong>Email:</strong> {user.email}
          </p>
          <p style={{ color: "#666" }}>
            <strong>Member since:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </motion.div>

        <motion.button
          onClick={handleLogout}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "12px 24px",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
}
