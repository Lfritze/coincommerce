const express = require('express');
const router = express.Router();

// Import MIDDLEWARE
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, addOrderToUserHistory } = require('../controllers/user');
const { create, listOrders } = require('../controllers/order');
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

// create a route to give all of the orders to the frontend for the ADMIN
router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders);

module.exports = router;