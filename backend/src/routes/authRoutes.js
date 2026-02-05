const express = require("express");
const {
  signup,
  login,
  refreshToken,
  logout,
  getProfile,
  getProfile,
} = require("../controllers/authController");
const { setup2FA, verify2FA, validate2FA } = require("../controllers/twoFactorController");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);

// 2FA Routes
router.post("/2fa/setup", protect, setup2FA);
router.post("/2fa/verify", protect, verify2FA);
router.post("/2fa/validate", validate2FA);

module.exports = router;
