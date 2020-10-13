// This is middleware we are going to use in the /routes/user.js

exports.userSignupValidator = (req, res, next) => {
  // the check() method is from express-validator package
  req.check('name', 'Name is required').notEmpty()
  req.check('email', 'Email must be between 3 to 32 characters')
  // use regex to make sure the '@' symbol is in the email
    .matches(/.+\@.+\..+/)
    .withMessage("Invalid email- missing @")
    .isLength({
      min: 4, 
      max: 32
    });
    req.check('password', 'Password is required').notEmpty()
    req.check('password')
      .isLength({min: 6})
      .withMessage("Password must contain at least 6 characters")
      // use regex to make sure it has at least one digit (d)
      .matches(/\d/)
      .withMessage("Password must contain at least one number")

      // we can grab all of the errors using this method
      const errors = req.validationErrors()
      if(errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError})
      }
      // any time you create a middleware, you need the next callback
      next();
}