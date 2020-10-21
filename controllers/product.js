const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { errorHandler } = require("../helpers/dbErrorHandler");

// NOTE: we need to send the form data because we need to handle the image upload
// we are going to user formidable for image uploading and lodash for the helper methods
exports.create = (req, res) => {
  // IncomingForm comes with the formidable package
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      })
    }
    // if there is no error we can upload the product image
    // we create the new product with the fields we got above
    let product = new Product(fields)
    // we need to handle the files as well
    // Note: photo might also be img
    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.path)
      product.photo.contentType = files.photo.type
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error)
        });
      }
      res.json(result)
    });
  });
};
