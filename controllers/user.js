// import our 'User' from the userSchema where it is exported at the bottom
const User = require('../models/user');
// import our error message helper
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signUp = (req, res) => {
  // we are going to create a new user based on what we get from the req.body
  // console.log('req.body', req.body);
  const user = new User(req.body);
  // once we create a new user, we need to save it in the database
  // Note: that when we save, we either get an error or a success - so we need a callback function to handle this
  user.save((err, user) => {
    if(err) {
      return res.status(400).json({
        // use our error message helper and pass in 'err' as an argument
        err: errorHandler(err)
      })
    }
    // when we create a new user we do not want to expose their 'salt' and 'hashed_password'
    // so we set it to undefined
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    })
  });
};