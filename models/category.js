const mongoose = require('mongoose');


// CATEGORY SCHEMA
// TRIM removes any space at the beginning or the end
const categorySchema = new mongoose.Schema({
  // NAME
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  }
}, 
// TIMESTAMPS for CREATED AT and UPDATED AT fields
{ timestamps: true }
);


module.exports = mongoose.model("Category", categorySchema);