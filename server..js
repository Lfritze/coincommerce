const express = require('express');
require('dotenv').config();
const server = express();


server.get('/', (req, res) => {
  res.send('hello from node')
});

const port = process.env.PORT