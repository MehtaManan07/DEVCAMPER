const express = require("express");
const {
  createBootcamp,
  getAllBootcamps,
  deleteBootcampById,
  getBootcampsInRadius,
  getBootcampById,
  updateBootcampById,
} = require("../controllers/bootcamp");

// Include other resource routers
const courseRouter = require("./courses");
const router = express.Router();

// Re-route into other resource routers;
router.use("/:bootcampId/courses",courseRouter)

router.get("/radius/:zipcode/:distance", getBootcampsInRadius);

router.route("/").post(createBootcamp).get(getAllBootcamps);

router
  .route("/:id")
  .get(getBootcampById)
  .put(updateBootcampById)
  .delete(deleteBootcampById);

module.exports = router;
