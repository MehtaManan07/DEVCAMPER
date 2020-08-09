const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorRes");
const User = require("../models/User");

// Protected routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    console.log("reached here");
    token = req.cookies.token;
  }

  // Make sure token is send;
  if (!token) {
    return next(
      new ErrorResponse("Not authorized to access the resource", 401)
    );
  }

  try {
    // verify token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    new ErrorResponse("Not authorized to access the resource", 401);
    console.log(error);
  }
});

// Grant access to specific roles...
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.log(req.user.role, roles);
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is unauthorized to access this route`,
          401
        )
      );
    }
    next();
  };
};
