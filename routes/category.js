const express = require('express');
const router = express.Router();
// import from controllers
const { create } = require('../controllers/category');


// any time there is a request coming in the 'signUp' this controller method will run - see /controllers/user.js
// same thing with the userSignupValidator
router.post('/category/create', create);


module.exports = router;