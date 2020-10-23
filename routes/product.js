const express = require('express');
const router = express.Router();
// import from controllers
const { create } = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { productById } = require('../controllers/product');



// any time there is a request coming in the 'signUp' this controller method will run - see /controllers/user.js
// same thing with the userSignupValidator
router.post("/product/create/:userId", 
  requireSignin, 
  isAuth,
  isAdmin, 
  create
);

// we are just taking the parameter 'userId' rather than using a 'get' method
// anytime there is userId in the route - we run the middleware 'userById' and makes the user available in the request
router.param('userId', userById);
// anytime there is productId in the route - we run the middleware 'productById' and makes the product available in the request
router.param('productId', productById);



module.exports = router;