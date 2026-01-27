import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Signup />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Profile />
              </motion.div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
