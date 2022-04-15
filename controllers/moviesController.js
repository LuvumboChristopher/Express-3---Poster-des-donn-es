const connection = require('../db/db-config')
const Joi = require('joi')

const getAllMovies = (req, res) => {
  let sql = 'SELECT * FROM movies'
  const sqlValues = []

  if (req.query.color) {
    sql += ' WHERE color = ?'
    sqlValues.push(req.query.color)
  }

  if (req.query.max_duration) {
    if (req.query.color) {
      sql += ' AND duration <= ? ;'
    } else {
      sql += ' WHERE duration <= ?'
    }
    sqlValues.push(req.query.max_duration)
  }

  connection.query(sql, sqlValues, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error retrieving data from database')
    } else {
      res.status(201).json(result)
    }
  })
}

const getSingleMovie = (req, res) => {
  const { movieId } = req.params
  const sql = 'SELECT * FROM movies WHERE id = ?'
  connection.query(
    sql, movieId, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error retrieving data from database')
      } else {
        if (result && result.length === 0) {
          return res.status(404).send(`Movie with id ${movieId} not found.`)
        } 
        res.status(201).json(result)
      }
    }
  )
}

const uploadMovie = (req, res) => {
  const moviePropsToUpload = req.body

  const sql = 'SELECT * FROM movie WHERE title = ?'

  connection.query(sql, [...moviePropsToUpload], (err, result) => {
    if (result[0]) {
      console.error(err)
      res.status(409).json({ message: 'This Movie is already in the database' })
    } else {
      const { error } = Joi.object({
        title: Joi.string().max(255).required(),
        director: Joi.string().max(255).required(),
        year: Joi.string().max(255).required(),
        color: Joi.string().max(255).required(),
        duration: Joi.string().max(255).required(),
      }).validate(
        { title, director, year, color, duration },
        { abortEarly: false }
      )
    }

    if (error.length) {
      res.status(422).json({ validationErrors: error.details })
    } else {
      const sql = 'INSERT INTO movies VALUES (?,?,?,?,?)'
      connection.query(sql, [...moviePropsToUpload], (err, result) => {
        if (err) {
          res.status(500).send('Error saving creating the movie')
        } else {
          const id = result.insertId
          const createdMovie = { id, title, director, year, color, duration }
          res.status(201).json(createdMovie)
        }
      })
    }
  })

  // connection.query(
  //   'INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)',
  //   [title, director, year, color, duration],
  //   (err, result) => {
  //     if (err) {
  //       res.status(500).send('Error saving the movie')
  //     } else {
  //       const id = result.insertId
  //       const createdMovie = { id, title, director, year, color, duration }
  //       res.status(201).json(createdMovie)
  //     }
  //   }
  // )
}

const updateMovie = (req, res) => {
  const { movieId } = req.params
  const moviePropsToUpdate = req.body

  const sql = 'UPDATE movies SET ? WHERE id = ?'
  connection.query(sql, [moviePropsToUpdate, movieId], (err, result) => {
    if (err) {
      res.status(500).send('Error updating the movie')
    } else if (result.affectedRows === 0) {
      res.status(404).send(`Movie with id ${movieId} not found.`)
    } else {
      res.sendStatus(204)
    }
  })
}

const deleteMovie = (req, res) => {
  const { movieId } = req.params

  const sql = 'DELETE FROM movies WHERE id = ?'

  connection.query(sql, [movieId], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting the movie')
    } else if (result.affectedRows === 0) {
      res.status(404).send(`Movie with id ${movieId} not found.`)
    } else {
      res.status(204).send('Movie removed from database')
    }
  })
}

module.exports = {
  getAllMovies,
  getSingleMovie,
  uploadMovie,
  updateMovie,
  deleteMovie,
}
