const express = require('express');
const { createBootcamp, getAllBootcamps, deleteBootcampById, getBootcampsInRadius, getBootcampById, updateBootcampById } = require('../controllers/bootcamp');
const router = express.Router()

router.get("/radius/:zipcode/:distance", getBootcampsInRadius)

router.route('/')
.post(createBootcamp)
.get(getAllBootcamps)

router.route('/:id')
.get(getBootcampById)
.put(updateBootcampById)
.delete(deleteBootcampById)

module.exports = router