const connection = require('../db/db-config')
const Joi = require('joi')


const getAllUsers = (req, res) => {
  let sql = 'SELECT * FROM users'
  const sqlValues = []

  if (req.query.language) {
    sql += ' WHERE language = ?'
    sqlValues.push(req.query.language)
  }

  connection.promise().query(sql, sqlValues)
    .then(([results]) => {
      res.json(results)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Error retrieving movies from database')
    })
}

const getSingleUser = (req, res) => {
  const { userId } = req.params

  const sql = 'SELECT * FROM users WHERE id = ?'

  // connection.query(sql, userId, (err, result) => {
  //   if (err) {
  //     res.status(500).send('Error retraving the user')
  //   } else {
  //     if(result && result.length === 0){
  //       return res.status(404).send(`User with id: ${userId} not found`)
  //     }
  //     return res.status(200).json(result)
      
  //   }
  // })

  connection.promise().query(sql, userId)
    .then(([result]) => {
      if (result && result.length === 0) {
        return res.status(404).send(`User with id: ${userId} not found`)
      }
      return res.status(200).json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Error retraving the user')
    })
}

const createUser = ((req, res) => {
  const { firstname, lastname, email } = req.body
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, result) => {
      if (result[0]) {
        console.error(err)
        res.status(409).json({ message: 'This email is already used' })
      } else {
        const { error } = Joi.object({
          email: Joi.string().email().max(255).required(),
          firstname: Joi.string().max(255).required(),
          lastname: Joi.string().max(255).required(),
        }).validate({ firstname, lastname, email }, { abortEarly: false })

        if (error) {
          res.status(422).json({ validationErrors: error.details })
        } else {
          connection.query(
            'INSERT INTO users (firstname, lastname, email) VALUES (?, ?, ?)',
            [firstname, lastname, email],
            (err, result) => {
              if (err) {
                console.error(err)
                res.status(500).send('Error saving the user')
              } else {
                const id = result.insertId
                const createdUser = { id, firstname, lastname, email }
                res.status(201).json(createdUser)
              }
            }
          )
        }
      }
    }
  )
})

const updateUser = (req, res) => {
  const { userId } = req.params
  const userPropsToUpdate = req.body

  const sql = 'UPDATE users SET ? WHERE id = ?'
  const values = [userPropsToUpdate, userId]

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error updating a user')
    } else if (result.affectedRows === 0) {
      res.status(404).send(`User with id ${userId} not found.`)
    } else {
      res.sendStatus(204)
    }
  })
}

const deleteUser = (req, res) => {
  const { userId } = req.params

  const sql = 'DELETE FROM users WHERE id = ?'

  connection.query(sql, userId, (err, result) => {
    if (err) {
      res.status(500).send('Error deleting the user')
    } else if (result && result.affectedRows === 0){
      res.status(404).send(`User with id ${userId} not found.`)
    } else {
      res.status(204).send('User successfully deleted')
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
