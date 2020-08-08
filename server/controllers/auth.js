const User = require("../models/User");
const ErrorResponse = require("../utils/errorRes");
const asyncHandler = require("../middlewares/async");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create a user
  const user = await User.create({ name, email, password, role });
  res.status(201).json({ success: true, user })
});
