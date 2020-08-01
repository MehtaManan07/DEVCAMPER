const express = require('express');
const { createBootcamp } = require('../controllers/bootcamp');
const router = express.Router()

router.route('/')
.post(createBootcamp)

module.exports = router