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

exports.read = (req, res) => {
  // The "user" is available in the req.profile per line 12 above
  // we don't want to return the hashed password and salt - these are private so we make them "undefined"
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
    // console.log('user update', req.body);
    // req.body.role = 0; // role will always be 0
    // to find the user we take the user ID then we SET the req.body
    User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, (err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'You are not authorized to perform this action'
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
  });
};

exports.addOrderToUserHistory = (req, res, next) => {
  let history = []

  // we want to get all of the products from the order
  // we want to push each ITEM to the HISTORY array above
  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount
    })
  })

  User.findOneAndUpdate(
    {_id: req.profile._id}, 
    {$push: {history: history}}, 
    {new: true}, 
    (error, data) => {
      if(error) {
        return res.status(400).json({
          error: 'Could not update user purchase history'
        });
      }
      next();
    }
  );
};