const Bootcamp = require("../models/Bootcamp");
const Review = require("../models/Review");
const ErrorResponse = require("../utils/errorRes");
const asyncHandler = require("../middlewares/async");

// @desc      Get reviews
// @route     POST /api/v1/reviews
// @route     POST /api/v1/bootcamps/:bootcampId/reviews
// @access    Public

exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    return res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
