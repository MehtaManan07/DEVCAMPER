const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword,
} = require("../controllers/auth");
const { protect } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getMe", protect, getMe);
router.post("/forgot/password", forgotPassword);
module.exports = router;
