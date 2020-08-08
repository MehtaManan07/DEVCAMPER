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
const { protect, authorize } = require("../middlewares/auth");
const router = express.Router();

// Re-route into other resource routers;
router.use("/:bootcampId/courses",courseRouter)

router.get("/radius/:zipcode/:distance", getBootcampsInRadius);

router.route("/").post(protect, authorize('Publisher', 'Admin'), createBootcamp).get(advancedResults(Bootcamp,"courses"),getAllBootcamps);

router.put('/:id/photo', protect, authorize('Publisher', 'Admin'), bootcampPhotoUpload)
// router.put('/create',create)

router
  .route("/:id")
  .get(getBootcampById)
  .put(protect, authorize('Publisher', 'Admin'), updateBootcampById)
  .delete(protect, authorize('Publisher', 'Admin'), deleteBootcampById);

module.exports = router;
