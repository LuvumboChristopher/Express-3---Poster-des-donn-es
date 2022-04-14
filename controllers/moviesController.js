const connection = require('../db/db-config')

const getAllMovies = (req, res)=> {
  connection.query('SELECT * FROM movies', (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error retrieving data from database')
    } else {
      res.status(200).json(result)
    }
  })
}

const uploadMovie = (req, res)=> {
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

module.exports = { getAllMovies, uploadMovie }