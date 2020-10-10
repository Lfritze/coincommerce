const express = require('express');
const router = express.Router();
// import from controllers
const { sayHi } = require('../controllers/user');

router.get('/', sayHi);

module.exports = router;