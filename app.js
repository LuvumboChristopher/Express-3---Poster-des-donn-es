const express = require("express");
const connection = require('./db/db-config')
const moviesRoutes = require('./routes/moviesRoutes')
const usersRoutes = require('./routes/usersRoutes')
const port = process.env.PORT || 3000
const app = express();

app.use(express.json())
app.use('/api/movies', moviesRoutes)
app.use('/api/users', usersRoutes)

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack)
  } else {
    console.log('connected to database with threadId :  ' + connection.threadId)
  }
})


app.listen(port, async(err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
