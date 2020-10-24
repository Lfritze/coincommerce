const Category = require('../models/category');
const { errorHandler } = require("../helpers/dbErrorHandler");

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