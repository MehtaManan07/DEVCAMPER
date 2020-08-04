const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, "PLease add a course description"],
  },
  weeks: {
    type: String,
    required: [true, "PLease add number of weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "PLease add a tuition cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "PLease add a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"]
  },
  scholarhipsAvailable: {
    type: Boolean,
    default: false
  },
  date: {
      type: Date,
      default: Date.now
  },
  bootcamp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bootcamp",
      required: true
  }
});
const Course = mongoose.model("Course",courseSchema)
module.exports = Course