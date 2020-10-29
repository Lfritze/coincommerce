const express = require('express');
const mongoose = require('mongoose');
// MORGAN is a middleware that allows us to easily log requests, errors, and more to the console
// MORGAN allows us to see the CRUD posts in the console
const morgan = require('morgan');
// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
const bodyParser = require('body-parser');
// We will be saving the user credentials in the cookie - A cookie is a small piece of data that a server sends to the user's web browser
const cookieParser = require('cookie-parser');
// CORS (Cross-Origin Resource Sharing )
// {is a mechanism that allows restricted resources on a web page to be requested 
// from another domain outside the domain from which the first resource was served.}
// Express Validator (this is a middleware) (Note: I set it back to version 5.3.1 in pkg.json and ran npm install to prevent an error
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const cors = require('cors');
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
// CORS - our api is running on port 8000 and our frontend client is running on port 3001
// So if we make a request from frontend port 3001 to backend port 8000 - we use CORS
server.use(cors());

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

