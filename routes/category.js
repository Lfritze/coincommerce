const express = require('express');
const router = express.Router();
const { create, categoryById, read } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// we can call 'read' middleware to get the single category
router.get('/category/:categoryId', read)

// any time there is a request coming in the 'signUp' this controller method will run - see /controllers/user.js
// same thing with the userSignupValidator
router.post('/category/create/:userId', 
  requireSignin, 
  isAuth,
  isAdmin, 
  create
);

// we are just taking the parameter 'categoryId' rather than using a 'get' method
router.param('categoryId', categoryById);
// we are just taking the parameter 'userId' rather than using a 'get' method
router.param('userId', userById);


module.exports = router;