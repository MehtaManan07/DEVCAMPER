const express = require("express");
const { getReviews, getReview } = require("../controllers/reviews");
const router = express.Router({ mergeParams: true });
const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");
const Review = require("../models/Review");

router.route("/").get(
  advancedResults(Review, {
    path: "bootcamp",
    select: "name description",
  }),
  getReviews
);

router.route('/:id',getReview)

module.exports = router;
