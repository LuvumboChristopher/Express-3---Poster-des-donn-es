const connection = require('../db/db-config')

const createUser = (req, res)=> {
  const { firstname, lastname, email } = req.body
  const sql = 'INSERT INTO users (firstname, lastname, email) VALUES (?, ?, ?)';
  connection.query(
    sql, [firstname, lastname, email],
    (err, result) => {
      if (err) {
        res.status(500).send('Error saving creating the user')
      } else {
        res.status(200).send('User successfully created')
      }
    }
  )
}

const updateUser = (req, res) => {
  const { userId } = req.params
  const userPropsToUpdate = req.body

  const sql = 'UPDATE users SET ? WHERE ?';
  const values = [userPropsToUpdate, userId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send('Error updating the user')
    } else {
      res.status(200).send('User successfully updated')
    }
  })
}

module.exports = { createUser, updateUser }