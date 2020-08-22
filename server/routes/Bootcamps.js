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
  searchBootcamp
} = require("../controllers/bootcamp");

// Include other resource routers
const courseRouter = require("./courses");
const reviewRouter = require("./reviews");
const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");
const router = express.Router();

// Re-route into other resource routers;
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

router.get("/radius/:zipcode/:distance", getBootcampsInRadius);

router
  .route("/")
  .post(protect, authorize("publisher", "Admin"), createBootcamp)
  .get(advancedResults(Bootcamp, "courses user"), getAllBootcamps);

router.get("/search",searchBootcamp)

router.put(
  "/:id/photo",
  protect,
  authorize("publisher", "Admin"),
  bootcampPhotoUpload
);
// router.put('/create',create)

router
  .route("/:id")
  .get(getBootcampById)
  .put(protect, authorize("publisher", "Admin"), updateBootcampById)
  .delete(protect, authorize("publisher", "Admin"), deleteBootcampById);

module.exports = router;
