const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course");
const Course = require("../models/Course");
const router = express.Router({ mergeParams: true });
const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, authorize("Publisher", "Admin"), addCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("Publisher", "Admin"), updateCourse)
  .delete(protect, authorize("Publisher", "Admin"), deleteCourse);

module.exports = router;
