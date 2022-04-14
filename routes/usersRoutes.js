const express = require('express')
const { createUser, updateUser } = require('../controllers/usersController')

const router = express.Router()

router
.route('/')
.post(createUser)

router.
route('/:id')
.put(updateUser)


module.exports = router
