const express = require("express");
const connection = require('./db/db-config')
const moviesRoutes = require('./routes/moviesRoutes')
const usersRoutes = require('./routes/usersRoutes')

// We store all express methods in a variable called app
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// If an environment variable named PORT exists, we take it in order to let the user change the port without chaning the source code. Otherwise we give a default value of 3000
const port = process.env.PORT ?? 3000;

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack)
  } else {
    console.log('connected to database with threadId :  ' + connection.threadId)
  }
})

app.use('/api/movies', moviesRoutes)
app.use('/api/users', usersRoutes)
// We listen to incoming request on the port defined above
app.listen(port, async(err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
