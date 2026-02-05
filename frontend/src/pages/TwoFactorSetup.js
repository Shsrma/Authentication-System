import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function TwoFactorSetup() {
     const [qrCode, setQrCode] = useState("");
     const [token, setToken] = useState("");
     const [message, setMessage] = useState("");
     const [error, setError] = useState("");
     const { user } = useContext(AuthContext);

     useEffect(() => {
          // Generate QR Code on load
          const setup = async () => {
               try {
                    const res = await axios.post(
                         "http://localhost:5000/api/auth/2fa/setup",
                         {},
                         { withCredentials: true }
                    );
                    setQrCode(res.data.data.qrCode);
               } catch (err) {
                    setError("Failed to load QR Code");
               }
          };
          setup();
     }, []);

     const handleVerify = async (e) => {
          e.preventDefault();
          try {
               await axios.post(
                    "http://localhost:5000/api/auth/2fa/verify",
                    { token },
                    { withCredentials: true }
               );
               setMessage("2FA Enabled Successfully!");
               setError("");
          } catch (err) {
               setError(err.response?.data?.message || "Verification Failed");
               setMessage("");
          }
     };

     return (
          <div style={{ padding: "40px", maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
               <h2>Setup Two-Factor Authentication</h2>
               {error && <p style={{ color: "red" }}>{error}</p>}
               {message && <p style={{ color: "green" }}>{message}</p>}

               {qrCode ? (
                    <dir>
                         <p>Scan this QR code with your authenticator app (e.g., Google Authenticator).</p>
                         <img src={qrCode} alt="2FA QR Code" style={{ margin: "20px 0" }} />
                    </dir>
               ) : (
                    <p>Loading QR Code...</p>
               )}

               <form onSubmit={handleVerify}>
                    <input
                         type="text"
                         placeholder="Enter 6-digit code"
                         value={token}
                         onChange={(e) => setToken(e.target.value)}
                         maxLength="6"
                         required
                         style={{
                              padding: "10px",
                              fontSize: "16px",
                              width: "200px",
                              textAlign: "center",
                              letterSpacing: "4px",
                              marginBottom: "20px",
                         }}
                    />
                    <br />
                    <button
                         type="submit"
                         style={{
                              padding: "10px 20px",
                              fontSize: "16px",
                              background: "#667eea",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                         }}
                    >
                         Verify & Enable
                    </button>
               </form>
          </div>
     );
}
