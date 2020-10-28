const express = require('express');
const router = express.Router();
// import from controllers
const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch } = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// we want to get the single product and READ the product (this is based on CREAT, READ, UPDATE, DELETE)
router.get('/product/:productId', read)

// any time there is a request coming in the 'signUp' this controller method will run - see /controllers/user.js
// same thing with the userSignupValidator
router.post("/product/create/:userId", 
  requireSignin, 
  isAuth,
  isAdmin, 
  create
);

// Delete a Product
// NOTE: we use REMOVE instead of DELETE because DELETE is an object key word
router.delete('/product/:productId/:userId', 
  requireSignin, 
  isAuth,
  isAdmin,
  remove 
  );

// Update Product
  router.put('/product/:productId/:userId', 
  requireSignin, 
  isAuth,
  isAdmin,
  update
  );

// Route to return all the products
router.get('/products', list)
// Route to return all the products with matching CATEGORIES
router.get('/products/related/:productId', listRelated)
// Returns all categories based on Products
router.get('/products/categories', listCategories);
// Route to search (filter) products by products, categories, and price range we send in req.body
router.post("/products/by/search", listBySearch);


// we are just taking the parameter 'userId' rather than using a 'get' method
// anytime there is userId in the route - we run the middleware 'userById' and makes the user available in the request
router.param('userId', userById);
// anytime there is productId in the route - we run the middleware 'productById' and makes the product available in the request
router.param('productId', productById);



module.exports = router;