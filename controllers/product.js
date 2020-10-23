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
      });
    }

     // We also need to make sure all of the fields are present for creating a product (description, price, category, shipping, quantity, photo)
     // check for all fields 
     // we get all of these from 'fields'
     const {
      name, 
      description, 
      price, 
      category, 
      quantity, 
      shipping
    } = fields

     if (!name || !description || !price || !category || !quantity || !shipping) {
       return res.status(400).json({
        error: 'All fields are required (excluding photo)'
      });
     }

    // if there is no error and all fields are filled, we can upload the product image
    // we create the new product with the fields we got above
    let product = new Product(fields)
   
    // Let's restrict the file size for uploading
    // NOTES: 1kb = 1000
    // 1mb = 1,000,000  aka - 1 million

    // we need to handle the files as well
    // Note: photo might also be img
    if (files.photo) {
      // console.log('FILES PHOTO: ', files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
        error: 'Image must be less than 1mb in size'
      });
      }
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
