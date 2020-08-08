const User = require("../models/User");
const ErrorResponse = require("../utils/errorRes");
const asyncHandler = require("../middlewares/async");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public

exports.register = asyncHandler(async (req,res,next) => {
    
})
