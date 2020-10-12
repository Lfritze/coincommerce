const express = require('express');
const router = express.Router();
// import from controllers
const { signUp } = require('../controllers/user');

// any time there is a request coming in the 'signUp' this controller method will run - see /controllers/user.js
router.post('/signup', signUp);

module.exports = router;