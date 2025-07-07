const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();

const app = express()
const port = 5000;

app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello Alfi ..')
})


app.listen(port, () => {
  console.log(`todo Backend listening on port ${port}`)
})