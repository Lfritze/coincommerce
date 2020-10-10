const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Server
const server = express();

// Database

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true
})
.then(() => console.log('Database Connected '))

// Routes
server.get('/', (req, res) => {
  res.send('hello from node')
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})