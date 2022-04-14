const connection = require('../db/db-config')

const getAllUsers = (req, res) => {
  let sql = 'SELECT * FROM users'
  const sqlValues = []

  if (req.query.language) {
    sql += ' WHERE language = ?'
    sqlValues.push(req.query.language)
  }

  connection.query(sql, sqlValues, (err, result) => {
    if (err) {
      res.status(500).send('Error retraiving all users')
    } else {
      res.status(200).json(result)
    }
  })
}

const getSingleUser = (req, res) => {
  const { userId } = req.params
  const parsentInt = parseInt(userId)

  const sql = 'SELECT * FROM users WHERE id = ?'

  connection.query(sql, userId, (err, result) => {
    if (err) {
      res.status(500).send('Error retraving the user')
    } else {
      if(result && result.length > 0){
        return res.status(200).json(result)
      }
      res.status(404).send('User not found')
    }
  })
}

const createUser = (req, res) => {
  const { firstname, lastname, email } = req.body
  const sql = 'INSERT INTO users (firstname, lastname, email) VALUES (?, ?, ?)'
  connection.query(sql, [firstname, lastname, email], (err, result) => {
    if (err) {
      res.status(500).send('Error saving creating the user')
    } else {
      res.status(200).send('User successfully created')
    }
  })
}

const updateUser = (req, res) => {
  const { userId } = req.params
  const userPropsToUpdate = req.body

  const sql = 'UPDATE users SET ? WHERE id = ?'
  const values = [userPropsToUpdate, userId]

  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send('Error updating the user')
    } else {
      res.status(200).send('User successfully updated')
    }
  })
}

const deleteUser = (req, res) => {
  const { userId } = req.params

  const sql = 'DELETE FROM users WHERE id = ?'

  connection.query(sql, userId, (err, result) => {
    if (err) {
      res.status(500).send('Error deleting the user')
    } else {
      res.status(200).send('User successfully deleted')
    }
  })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
}
