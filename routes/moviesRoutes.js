const express = require('express')
const { getAllMovies, uploadMovie } = require('../controllers/moviesController')

const router = express.Router()

router
.route('/')
.get(getAllMovies)
.post(uploadMovie)

module.exports = router