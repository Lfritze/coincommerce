const express = require('express');
const router = express.Router();

// Import MIDDLEWARE
const { requireSignin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { create } = require('../controllers/order');


router.post('/order/create/:userId', requireSignin, isAuth, create);




// apply userById MIDDLEWARE
router.param('userId', userById)

module.exports = router;