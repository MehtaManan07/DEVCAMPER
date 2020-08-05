const Bootcamp = require("../models/Bootcamp");
const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorRes");
const asyncHandler = require("../middlewares/async");

// @desc      Get courses
// @route     POST /api/v1/courses
// @route     POST /api/v1/bootcamps/:bootcampId/courses
// @access    Private

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate("bootcamp", "name description");
  }
  const courses = await query;
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @desc      Get single courses
// @route     POST /api/v1/courses/:id
// @access    Private

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate(
    "bootcamp",
    "name description"
  );
  if (!course) {
    return next(
      new ErrorResponse(`No course found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc      Create new course
// @route     POST /api/v1/bootcamps/:bootcampId/courses
// @access    Private

exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if(!bootcamp) {
    return next(new ErrorResponse(`No bootcamp found with id ${req.params.bootcampId}`,404))
  }
  const course = await Course.create(req.body)
    res.status(201).json({ success: true, data: course })
});
