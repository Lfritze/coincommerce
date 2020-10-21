const express = require('express');
const router = express.Router();
// import from controllers
const { create } = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');



// any time there is a request coming in the 'signUp' this controller method will run - see /controllers/user.js
// same thing with the userSignupValidator
router.post("/product/create/:userId", 
  requireSignin, 
  isAuth,
  isAdmin, 
  create
);

// we are just taking the parameter 'userId' rather than using a 'get' method
router.param('userId', userById);


module.exports = router;