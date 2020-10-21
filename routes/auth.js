const express = require('express');
const router = express.Router();
// import from controllers
const { signUp, signIn, signOut, requireSignin } = require('../controllers/auth');
// import userSignupValidator middleware
const { userSignupValidator } = require('../validator/index');

// any time there is a request coming in the 'signUp' this controller method will run - see /controllers/user.js
// same thing with the userSignupValidator
router.post('/signup', userSignupValidator, signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);

// anytime we want to restrict any routes, we can use the requireSignin middleware
// router.get('/hello', requireSignin, (req, res) => {
//   res.send('hello hello hello');
// });

module.exports = router;