const express = require('express');
const { getUsers, createUser, getUser, deleteUser } = require('../controllers/users');
const { updateUser } = require('../controllers/auth');
const router = express.Router();
const User = require('../models/User');
const advancedResults = require("../middlewares/advancedResults")
const { authorize, protect } = require("../middlewares/auth")

router.use(protect)
router.use(authorize("Admin"))

router.route('/')
.get(advancedResults(User),getUsers)
.post(createUser)

router.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser)

module.exports = router