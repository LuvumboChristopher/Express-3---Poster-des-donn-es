const connection = require('../db/db-config')

const getAllMovies = (req, res) => {
  connection.query('SELECT * FROM movies', (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error retrieving data from database')
    } else {
      res.status(200).json(result)
    }
  })
}

const getSingleMovie = (req, res) => {
  const {movieId} = req.params
  connection.query('SELECT * FROM movies WHERE id = ?', movieId, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error retrieving data from database')
    } else {
      res.status(200).json(result)
    }
  })
}

const uploadMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body
  connection.query(
    'INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)',
    [title, director, year, color, duration],
    (err, result) => {
      if (err) {
        res.status(500).send('Error saving the movie')
      } else {
        res.status(200).send('Movie successfully saved')
      }
    }
  )
}

const updateMovie = (req, res) => {
  const { movieId } = req.params
  const moviePropsToUpdate = req.body

  const sql = 'UPDATE movies SET ? WHERE id = ?'
  const values = [moviePropsToUpdate, movieId]

  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send('Error updating the movie')
    } else {
      res.status(200).send('Movie successfully updated')
      console.log(result.affectedRows)
    }
  })
}

const deleteMovie = (req, res) => {
  const { movieId } = req.params

  const sql = 'DELETE FROM movies WHERE id = ?'

  connection.query(sql, movieId, (err, result) => {
    if (err) {
      res.status(500).send('Error deleting the movie')
    } else {
      res.status(200).send('Movie successfully deleted')
    }
  })
}

module.exports = { getAllMovies, getSingleMovie, uploadMovie, updateMovie, deleteMovie }
