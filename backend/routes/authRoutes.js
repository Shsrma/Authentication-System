const express = require("express");
const {
  signup,
  login,
  refresh,
  profile
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/profile", protect, profile);

module.exports = router;

