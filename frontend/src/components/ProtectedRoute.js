import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, checkAuth } = useContext(AuthContext);

  useEffect(() => {
    const initAuth = async () => {
      if (!isAuthenticated) {
        await checkAuth();
      }
    };
    initAuth();
  }, [isAuthenticated, checkAuth]);

  if (loading) {
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
        Loading...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
