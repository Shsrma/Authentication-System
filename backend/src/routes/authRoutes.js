const express = require("express");
const {
  signup,
  login,
  refreshToken,
  logout,
  getProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);

module.exports = router;
