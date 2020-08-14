const express = require("express");
const { getReviews } = require("../controllers/reviews");
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

module.exports = router;
