const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const { protect } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getMe", protect, getMe);
router.post("/forgot/password", forgotPassword);
router.put("/reset/password/:resetToken", resetPassword);
module.exports = router;
