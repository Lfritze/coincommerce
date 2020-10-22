const User = require('../models/user')

exports.userById = (req, res, next, id) => {
  // execute err or user
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    // if there is no error and we found the user, then we want to add that user information to the request object with the name of the profile
    req.profile = user
    // then we let it go to the next phase so it doesn't get stuck here
    next();
  });
};