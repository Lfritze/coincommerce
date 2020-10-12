const express = require('express');
const mongoose = require('mongoose');
// MORGAN is a middleware that allows us to easily log requests, errors, and more to the console
// MORGAN allows up sto see the CRUD posts in the console
const morgan = require('morgan');
// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
const bodyParser = require('body-parser')
// We will be saving the user credentials in the cookie - A cookie is a small piece of data that a server sends to the user's web browser
const cookieParser = require('cookie-parser')
require('dotenv').config();
// import routes
const userRoutes = require('./routes/user')

// Server ***************
const server = express();

// Database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true
})
.then(() => console.log('Database Connected '))

// Middleware
// use a dev flag with morgan
server.use(morgan('dev'));
// so that we get JSON data from the req.body
server.use(bodyParser.json());
server.use(cookieParser());

// Routes Middleware **************
// prepend api so any user route starts with api
server.use('/api', userRoutes);


// *********************



const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})