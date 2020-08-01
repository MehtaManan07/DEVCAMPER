const Bootcamp = require("../models/Bootcamp");

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private

exports.createBootcamp = async (req, res, next) => {
  try {
    const newBootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: newBootcamp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public

exports.getAllBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      data: bootcamps,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

// @desc      Get bootcamp by Id
// @route     GET /api/v1/bootcamps/:id
// @access    Public

exports.getBootcampById = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: false, message: "No bootcamp found" });
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    console.log(error);
    // res.status(400).json(error);
    next(error)
  }
};

// @desc      UPDATE bootcamp by Id
// @route     PUT /api/v1/bootcamps/:id
// @access    Public

exports.updateBootcampById = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

// @desc      Delete bootcamp by Id
// @route     DELETE /api/v1/bootcamps/:id
// @access    Public

exports.deleteBootcampById = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res
        .status(400)
        .json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
