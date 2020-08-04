const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorRes");
const asyncHandler = require("../middlewares/async");
const geocoder = require("../utils/geocoder");

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private

exports.createBootcamp = asyncHandler(async (req, res, next) => {
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
  let query;
  // copy req.quert
  const reqQuery = { ...req.query };

  //Fields to exclude;
  const removeFields = ["select", "sort", "page", "limit"];

  // loop over removefields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  //creating query string
  let queryStr = JSON.stringify(reqQuery);

  //Create operators ($gt, $gte, etc...)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // select fields;
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // sort fields;
  if (req.query.sort) {
    const sortBy = req.query.select.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page-1)*limit;
  const endIndex = page*limit;
  const total  = await Bootcamp.countDocuments()

  console.log(page,limit,startIndex)

  query = query.skip(startIndex).limit(limit)

  console.log("queryStr:", queryStr);
// Execution of query
  const bootcamps = await query;

  //pagination result;
  const pagination = {}
  if(endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }
  if(startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  res.status(200).json({
    pagination,
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

// @desc      Get bootcamp by Id
// @route     GET /api/v1/bootcamps/:id
// @access    Public

exports.getBootcampById = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
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
// @access    Public

exports.updateBootcampById = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
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

// @desc      Delete bootcamp by Id
// @route     DELETE /api/v1/bootcamps/:id
// @access    Public

exports.deleteBootcampById = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
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
