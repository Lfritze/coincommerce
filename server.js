const express = require('express');
const mongoose = require('mongoose');
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

// Routes Middleware **************
// prepend api so any user route starts with api
server.use('/api', userRoutes);


// *********************



const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})