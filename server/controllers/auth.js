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

  sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validate password and email
  if (!email || !password) {
    return next(new ErrorResponse("Please add an email and a password", 400));
  }

  // check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) return next(new ErrorResponse("Invalid credentials", 401));

  sendTokenResponse(user, 200, res);
});

// @desc      Get user by Id
// @route     POST /api/v1/auth/me
// @access    Private

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgot/password
// @access    Public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if(!user) {
    return next(new ErrorResponse(`No user found with email ${req.body.email}`,404))
  }
  const resetToken = user.getresetToken()
  console.log(resetToken)
  await user.save({ validateBeforeSave: false })
  res.json({
    success: true,
    data: user
  })
});

// get token from model, create cookie and send res;
const sendTokenResponse = (user, statusCode, res) => {
  // create token;
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 3600 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, data: token });
};
