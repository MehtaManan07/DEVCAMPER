const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorRes");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const asyncHandler = require("../middlewares/async");
const geocoder = require("../utils/geocoder");

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  // Add user to body
  req.body.user = req.user.id;

  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

  // if not admin, can only add one bootcamp;

  if (publishedBootcamp && req.user.role !== "Admin") {
    return next(
      new ErrorResponse("User has already published a bootcamp", 400)
    );
  }

  const newBootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: newBootcamp,
  });
});

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public

exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get bootcamp by Id
// @route     GET /api/v1/bootcamps/:id
// @access    Public

exports.getBootcampById = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id).populate("courses user");
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc      UPDATE bootcamp by Id
// @route     PUT /api/v1/bootcamps/:id
// @access    Private

exports.updateBootcampById = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }
  // make sure if user is owner of bootcamp
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "Admin") {
    return next(new ErrorResponse(`Unauthorized to perform this action`, 400));
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc      Delete bootcamp by Id
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private

exports.deleteBootcampById = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }
  // make sure if user is owner of bootcamp
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "Admin") {
    return next(new ErrorResponse(`Unauthorized to perform this action`, 400));
  }

  bootcamp.remove();

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc      Get bootcamps within a radius;
// @route     DELETE /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Public

exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  // Get lat/lang from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lon = loc[0].longitude;

  // Calc radius and unit is radius;
  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lon, lat], radius] } },
  });
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc      Upload photo for a bootcamp
// @route     POST /api/v1/bootcamps/:id/photo
// @access    Private

exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id: ${req.params.id}`, 400)
    );
  }
    // make sure if user is owner of bootcamp
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "Admin") {
      return next(new ErrorResponse(`Unauthorized to perform this action`, 400));
    }
  
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  const file = req.files.file;
  // Make sure it's a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Make sure it is an image`, 400));
  }
  // Check size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(`Make sure the size is less than 1 megabytes`, 400)
    );
  }
  // Custom file name
  file.name = `photo_${bootcamp._id}_${new Date().getTime()}${
    path.parse(file.name).ext
  }`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (error) => {
    if (error) {
      console.log(error);
      return next(new ErrorResponse(`Server error while uploading photo`, 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
    return res.status(200).json({ success: true, data: bootcamp });
  });
});

exports.create = asyncHandler(async (req, res) => {
  res.json(req);
});
