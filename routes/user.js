const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

// import from controllers
const { userById } = require('../controllers/user');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
 // we are sending the json response with the request profile which contains the user information
  res.json({
    user: req.profile
  });
});

// we are just taking the parameter 'userId' rather than using a 'get' method
// anytime there is userId in the route - we run the middleware 'userById' and makes the user available in the request
router.param('userId', userById)

module.exports = router;

