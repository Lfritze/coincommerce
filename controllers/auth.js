// import our 'User' from the userSchema where it is exported at the bottom
const User = require('../models/user');
// import our error message helper
const { errorHandler } = require("../helpers/dbErrorHandler");
// import json web toke to generate a signed token
const jwt = require('jsonwebtoken');
// import express-jwt for checking authorization
const expressJwt = require('express-jwt');
const { restart } = require('nodemon');

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

exports.signIn = (req, res) => {
  // find the user based on email
  const { email, password } = req.body
  // we get the user IF the user exists in the database, else we get an error (so we use a callback function for this)
  User.findOne({ email }, (err, user) => {
    if(err || !user ) {
      return restart.status(400).json({
        error: "User with this email does not exist"
      }); 
    }
    // is user is found - make sure the email & password match
    // create authenticate method in user model
    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password don't match"
      })
    }
    // generate a signed token with user id and secret (.env file)
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    // persist the token as 't' in cookie with expiry date
    // expiry date is from now until 9999 seconds
    res.cookie('t', token, {expire: new Date() + 9999})
    // return response with user and token to frontend client
    // NOTE we de-structure user so that way we don't have to use user._id, user.email, user.name, user.role etc
    const {_id, name, email, role} = user
    return res.json({token, user: {_id, email, name, role}})
  });
};

exports.signOut = (req, res) => {
  // We need to clear the cookie from the response
  // Note: when a user signs in - we put the TOKEN in the res.cookie
  res.clearCookie('t')
  res.json({message: 'You have successfully signed out'});
}

// THIS is a MIDDLEWARE to protect routes
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth"
});

// MIDDLEWARE
// we use next because this is middleware
exports.isAuth = (req, res, next) => {
  // make a 'user' variable to check if the following comparison is TRUE
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  // SO if we have a 'user' which returns TRUE, then we can authorize
  // if NOT - then we return json response with error message (403) unauthorized
  if (!user) {
    return res.status(403).json({
      error: 'Not Authorized! Access Denied for isAuth Middleware'
    });
  }
  next();
  
};


exports.isAdmin = (req, res, next) => {
  // admin should === 1 , so if admin === 0 then it is 403 unauthorized
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Admin Access FAIL! Access Denied for isAdmin Middleware' 
    });
  }
  next();
};