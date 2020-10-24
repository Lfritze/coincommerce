const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

// USER SCHEMA
// TRIM removes any space at the beginning or the end
const productSchema = new mongoose.Schema({
  // NAME
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  price: {
    type: Number,
    trim: true,
    required: true,
    maxlength: 32
  },
  category: {
    type: ObjectId,
    // this refers to the Category Model in models/category.js
    ref: 'Category',
    required: true
  },
  quantity: {
    type: Number,
    // we will need to decrement the quantity as stuff is sold
  },
  sold: {
    type: Number,
    // by default - sold items will be 0
    default: 0
    // if a product is sold - we will need to update (decrement) the 'quantity' above and increment 'sold'
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  shipping: {
    // optional things to do here
    required: false,
    type: Boolean
  },
}, 
// TIMESTAMPS for CREATED AT and UPDATED AT fields
{ timestamps: true }
);


// We use the mongoose.model() method to create a new model 
// so for this "User" will be based on 'userSchema'
// we can use this User model anywhere for creating a new user and updating a user, etc...
module.exports = mongoose.model("Product", productSchema);