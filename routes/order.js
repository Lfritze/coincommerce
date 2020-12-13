const express = require('express');
const router = express.Router();

// Import MIDDLEWARE
const { requireSignin, isAuth } = require('../controllers/auth');
const { userById, addOrderToUserHistory } = require('../controllers/user');
const { create } = require('../controllers/order');
const { decreaseQuantity } = require('../controllers/product');


router.post(
  '/order/create/:userId', 
  requireSignin, 
  isAuth, 
  addOrderToUserHistory, 
  decreaseQuantity,
  create
);




// apply userById MIDDLEWARE
router.param('userId', userById)

module.exports = router;