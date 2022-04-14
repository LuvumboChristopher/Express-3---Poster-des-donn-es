const express = require('express')
const {
  getAllMovies,
  uploadMovie,
  updateMovie,
} = require('../controllers/moviesController')

const router = express.Router()

 router
 .route('/')
 .get(getAllMovies)
 .post(uploadMovie)

 router.route('/:movieId').put(updateMovie)


module.exports = router
