const express = require('express');
const mongoose = require('mongoose');
// MORGAN is a middleware that allows us to easily log requests, errors, and more to the console
// MORGAN allows us to see the CRUD posts in the console
const morgan = require('morgan');
// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
const bodyParser = require('body-parser');
// We will be saving the user credentials in the cookie - A cookie is a small piece of data that a server sends to the user's web browser
const cookieParser = require('cookie-parser');
// Express Validator (this is a middleware) (Note: I set it back to version 5.3.1 in pkg.json and ran npm install to prevent an error
const expressValidator = require('express-validator');
require('dotenv').config();
// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

// Server ***************
const server = express();

// Database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => console.log('Database Connected '))

// Middleware
// use a dev flag with morgan
server.use(morgan('dev'));
// so that we get JSON data from the req.body
server.use(bodyParser.json());
server.use(cookieParser());
server.use(expressValidator());

// Routes Middleware **************
// prepend api so any user route starts with api
server.use('/api', authRoutes);
server.use('/api', userRoutes);
server.use('/api', categoryRoutes);
server.use('/api', productRoutes);


// *********************

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})