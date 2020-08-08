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
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarhipsAvailable: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "BootCamp",
    required: true,
  },
});

// Static method to get average of course tuitions...
courseSchema.statics.getAverageCost = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageCost: { $avg: "$tuition" },
      },
    },
  ]);
  try {
    await this.model("BootCamp").findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
    });
  } catch (error) {
    console.log(error);
  }
};

// Call getAverageCost after save
courseSchema.post("save", function () {
  this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverageCost before remove
courseSchema.pre("remove", function () {
  this.constructor.getAverageCost(this.bootcamp);
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
