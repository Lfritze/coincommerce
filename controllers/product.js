const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { errorHandler } = require("../helpers/dbErrorHandler");

// productById MIDDLEWARE
exports.productById = (req, res, next, id) => {
  // we access the Product Model with findById based on this incoming 'id'
  Product.findById(id)
    // .populate('category')is so that is the category shows up in the Card.js on the frontend
    .populate('category')
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: 'Product not found! - by productById middleware'
      });
    }
    // populate the request with the product if the product exists
    req.product = product;
    next();
  });
};

// read MIDDLEWARE - based on 'R' in CRUD
exports.read = (req, res) => {
  // we just need to respond the PRODUCT from the req.product
  req.product.photo = undefined
  return res.json(req.product);
}

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

// remove aka - delete MIDDLEWARE
exports.remove = (req, res) => {
  // we get the product from the request
  // any time there is a productId in the route parameter - the productById method above runs and it make the product available in the request 
  let product = req.product
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
          error: errorHandler(error)
        });
    }
    res.json({
      // deletedProduct, note this sends the entire deleted object - this is unnecessary but optional.
      "message": "Product deleted successfully"
    });
  });
};

// update MIDDLEWARE
exports.update = (req, res) => {
  // IncomingForm comes with the formidable package
  let form = new formidable.IncomingForm()
  // keep the form extensions true
  form.keepExtensions = true
  // then we parse the form
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
     };
    // once we have the product, we replace the existing information
    let product = req.product
     // we can use the EXTEND method from lodash (imported at top)
     product= _.extend(product, fields)


    // we need to handle the files as well
    // Note: photo might also be img
    // if there is no error and all fields are filled, we can upload the product image
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

/**
 * We want to return the products based on SELL & ARRIVAL
 * This is a common and important feature for an ecommerce application
 * 
 * We want to show specific items based on SELL
 * The idea is to show certain products based on SELL. So, if certain products have been sold more than other products, then we want to return those products to the Frontend client so that we can display them as MOST POPULAR
 */

 // We are going to create a method that will grab the route parameters and based on that it will fetch the products from the database and return to the fronted client

 // if we want to return the product by SELL, we need route query parameters
 // this will only return 4 products on its request
 // we can change descending (desc) to ascending (asc)
 // sell =/products?sortBy=sold&order=desc&limit=4
 // when we create a new product - timestamps are created
 // arrival =/products?sortBy=createdAt&order=desc&limit=4

 // if no params are sent, then all products are returned

exports.list = (req, res) => {
   // grab the route queries
   // we grab (the value that is coming from req.query.order) otherwise by default it will be 'ascending'
  let order = req.query.order ? req.query.order : 'asc';
   // we grab (the value that is coming from req.query.sortBy) otherwise by default it will be 'ascending'
  let sortBy = req.query.sortBy ? req.query.sortBy : 'asc';
   // we grab (the value that is coming from req.query.limit) otherwise by default it will be '6' as the limit
   // we need to parse the integer
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

   // to get all of the products
  Product.find()
    // we use the select method - and we want to deselect because we are saving all of the photos for each product in the database in the binary data 
    // Each photo size will be huge - so when we are return all of the products, we don't want to send the photo - it will be too slow
    .select("-photo")
    // then we make another request to fetch the photo of that product 
    // then each product will populate the category
    // 'Category' is in the product model
    // populate() is a built-in method
    .populate('category')
    // then we need to sort it out
    // we use an array of arrays for this 
    // then we pass on how we want to sort
    .sort([[sortBy, order]])
    .limit(limit)
    // use a cb for errors or success
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found"
        });
      }
      res.json(products)
    })
 }

 // It will find the products based on the req product category
 // Based on that - other products that has the same category, will be returned
exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    // we want to find other products by _id base on category but not including 'itself'
    // we can use $ne for 'not including' - in MongoDB
  Product.find({_id: { $ne: req.product }, category: req.product.category})
  .limit(limit)
  .populate('category', '_id name')
  .exec((err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Products not found"
      });
    }
    res.json(products)
  });
};

exports.listCategories = (req, res) => {
   // We use the distinct() method from MongoDB 
   // This - (Finds the distinct values for a specified field across a single collection or view and returns the results in an array.)
   // We give it an empty object for query {}
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: 'Categories not found'
      });
    }
    res.json(categories);
  })
};

// We are listing the products by search
// The product search will be on the frontend
// we are going to show categories in a checkbox and price range with radio buttons
// When the user clicks on the checkboxes and radio button - we make api requests and show the products to users
exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  // we are going to have a load more button (skip)
  // If they click on it, then we send the value
  let skip = parseInt(req.body.skip);
  // We populate this findArgs object based on the what we get in the req.body
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  // We grab the key out of the req.body.filters object
  for (let key in req.body.filters) {
    // if the key has a length > 0
    if (req.body.filters[key].length > 0) {
      // if the key is price
      if (key === 'price') {
        // gte (MongoDB Method) -  greater than price [0-10]
        // (lte MongoDB Method) - less than
        findArgs[key] = {
          // WE grab the key > 0 and < 1   (index 1, 0) for price item range in array [0-10]
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
          // Otherwise we just grab the keys for CATEGORIES
          findArgs[key] = req.body.filters[key];
        }
    }
  }

  Product.find(findArgs)
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found'
        });
      }
      res.json({
        size: data.length,
        data
      });
    });
};

// MIDDLEWARE - Returns the product photo
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
      res.set('Content-Type', req.product.photo.contentType);
      return res.send(req.product.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  // create query object to hold search value and category value
  const query = {}
  // assign search value to query.name
  if(req.query.search) {
    // 'i' is for case insensitivity with regex
    query.name = {$regex: req.query.search, $options: 'i'}
    // assign category value to query.category
    if(req.query.category && req.query.category != 'All') {
      query.category = req.query.category
    }
    // find the product based on query object with 2 properties
    // search and category
    Product.find(query, (err, products) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      // if no error
      res.json(products)
      // we also have to take the photo out bc it will be too slow
    }).select('-photo')
  }
};

exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: {_id: item._id},
        update: {$inc: {quantity: -item.count, sold: +item.count}}
      }
    }
  })
  // bulkWrite is a method built into Mongoose
  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
      error: "Could not update product"
      });
    }
    next();
  });
};