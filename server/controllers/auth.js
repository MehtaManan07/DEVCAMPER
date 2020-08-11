const User = require("../models/User");
const ErrorResponse = require("../utils/errorRes");
// const sendEmail = require("../utils/email");
const crypto = require("crypto");
const asyncHandler = require("../middlewares/async");

// Sendgrid
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

// @desc      Update user details
// @route     PUT /api/v1/auth/update/details
// @access    Private

exports.updateUser = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };
  console.log(req.user);

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: user });
});

// @desc      Update user password
// @route     PUT /api/v1/auth/update/password
// @access    Private

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");
  console.log(req.user, req.body);

  //Check current password;
  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    console.log(`reached broo`);
    return next(new ErrorResponse(`Incorrect password`, 401));
  }

  user.password = newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgot/password
// @access    Public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (req.body.email === "") {
    return next(new ErrorResponse(`Email cannot be empty`, 400));
  }
  if (!user) {
    return next(
      new ErrorResponse(`No user found with email ${req.body.email}`, 404)
    );
  }
  const resetToken = await user.getresetToken();
  console.log(resetToken);
  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetPassword/${resetToken}`;

  const message = `You are receiving this email because you requested to reset a password. Please make a PUT req to" \n\n ${resetUrl}`;

  const emailData = {
    from: process.env.EMAIL_FROM,
    to: req.body.email,
    subject: `Password Reset link`,
    html: `
            <h1>Please use the following link to reset your password</h1>
            <p>${process.env.CLIENT_URL}/auth/password/reset/${resetToken}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>${process.env.CLIENT_URL}</p>
        `,
  };

  try {
    await sgMail.send(emailData);
    res.json({
      success: true,
      data: user,
      message: "Email sent",
    });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse(`Email Server error`, 500));
  }
});

// @desc      Reset Password
// @route     PUT /api/v1/auth/reset/password/:resetToken
// @access    Public

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  console.log(req.params.resetToken, typeof req.params.resetToken);
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorResponse(`Invalid token`, 400));
  }

  // set new password;
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
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
