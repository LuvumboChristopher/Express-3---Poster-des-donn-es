const express = require('express')
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController')

const router = express.Router()

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)


module.exports = router
