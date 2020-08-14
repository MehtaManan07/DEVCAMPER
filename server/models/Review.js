const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title for review"],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, "PLease add a description"],
  },
  rating: {
    type: Number,
    required: [true, "PLease add a rating between 1 and 10"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "BootCamp",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
