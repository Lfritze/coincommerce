const Category = require('../models/category');
const { errorHandler } = require("../helpers/dbErrorHandler");
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