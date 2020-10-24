const Category = require('../models/category');
const { errorHandler } = require("../helpers/dbErrorHandler");
const category = require('../models/category');

exports.categoryById = (req, res, next, id) => {
  // first we need to find the category
  // we get the 'id' from the route parameter
  // then we execute a method that gives us either error or the category
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category does not exist"
      });
    }
    // if we find the category we can add it to the request object
    req .category = category;
    next();
  });
};

exports.create = (req, res) => {
  // create a new category
  const category = new Category(req.body)
  // save the category
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({ data });
  });
};

// we are just returning the category
exports.read = (req, res) => {
    return res.json(req.category);
};

// UPDATE, REMOVE, LIST

exports.update = (req, res) => {
  // first we need to get the categories
  const category = req.category
  // Currently, category on has one field - NAME
  // We send the NAME in the request body
  category.name = req.body.name
  // Now we save it - and use a cb function to check for the error
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    // if there is no error
      res.json(data);
  });
};

exports.remove = (req, res) => {
  // first we need to get the categories
  const category = req.category
  // Now we remove it - and use a cb function to check for the error
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    // if there is no error, we do not need to send any data - we can send a JSON message instead
    res.json({
      message: "Category successfully deleted"
    });
  });
}

exports.list = (req, res) => {
  // first we need to find the category with the CATEGORY MODEL
  // We can use the FIND method and EXECUTE method cb to check for error or data
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    // else - we send the JSON data
    res.json(data)
  })
}