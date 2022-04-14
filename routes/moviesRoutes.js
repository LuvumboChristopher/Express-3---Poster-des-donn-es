const express = require('express')
const {
  getAllMovies,
  getSingleMovie,
  uploadMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/moviesController')

const router = express.Router()

router
  .route('/')
  .get(getAllMovies)
  .post(uploadMovie)

router
  .route('/:movieId')
  .get(getSingleMovie)
  .put(updateMovie)
  .delete(deleteMovie)


module.exports = router
