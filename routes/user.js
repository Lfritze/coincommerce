const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

// import from controllers
const { userById } = require('../controllers/user');

router.get('/secret/:userId', requireSignin, isAuth, (req, res) => {
 // we are sending the json response with the request profile which contains the user information
  res.json({
    user: req.profile
  });
});

// we are just taking the parameter 'userId' rather than using a 'get' method
router.param('userId', userById)

module.exports = router;

