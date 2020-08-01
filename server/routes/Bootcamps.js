const express = require('express');
const { createBootcamp, getAllBootcamps, getBootcampById } = require('../controllers/bootcamp');
const router = express.Router()

router.route('/')
.post(createBootcamp)
.get(getAllBootcamps)

router.route('/:id')
.get(getBootcampById)

module.exports = router