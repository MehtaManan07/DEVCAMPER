const express = require("express");
const {
  createBootcamp,
  getAllBootcamps,
  deleteBootcampById,
  getBootcampsInRadius,
  getBootcampById,
  updateBootcampById,
  bootcampPhotoUpload,
  create,
} = require("../controllers/bootcamp");

// Include other resource routers
const courseRouter = require("./courses");
const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middlewares/advancedResults");
const { protect } = require("../middlewares/auth");
const router = express.Router();

// Re-route into other resource routers;
router.use("/:bootcampId/courses",courseRouter)

router.get("/radius/:zipcode/:distance", getBootcampsInRadius);

router.route("/").post(protect, createBootcamp).get(advancedResults(Bootcamp,"courses"),getAllBootcamps);

router.put('/:id/photo', protect, bootcampPhotoUpload)
// router.put('/create',create)

router
  .route("/:id")
  .get(getBootcampById)
  .put(protect, updateBootcampById)
  .delete(protect, deleteBootcampById);

module.exports = router;
