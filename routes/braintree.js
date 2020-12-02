const express = require('express');
const router = express.Router();

// Import MIDDLEWARE
const { requireSignin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { generateToken, processPayment } = require('../controllers/braintree');

// apply requireSignin, isAuth MIDDLEWARE
router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken);

router.post('/braintree/payment/:userId', requireSignin, isAuth, processPayment);



// apply userById MIDDLEWARE
router.param('userId', userById)

module.exports = router;