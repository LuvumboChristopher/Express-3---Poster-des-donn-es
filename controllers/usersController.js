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

module.exports = { createUser }