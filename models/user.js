const mongoose = require('mongoose');
const crypto = require('crypto');
// Unique universal ID package
const uuidv1 = require('uuid/v1');

// USER SCHEMA
// TRIM removes any space at the beginning or the end
const userSchema = new mongoose.Schema({
  // NAME
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  // EMAIL
  email: {
    type: String,
    trim: true,
    required: true,
    unique: 32
  },
  // PASSWORD - use a VIRTUAL FIELD
  hashed_password: {
    type: String,
    required: true
  },
  // ABOUT
  about: {
    type: String,
    trim: true,
  },
  // SALT is a long unique string to generate the hashed password - salt is a file server to act as a transparent bridge to external resources.
  salt: String,
  // ROLE - 2 types of users - ADMIN & REGULAR USER (Regular User = 0) (Admin = 1) - default user is 0
  role: {
    type: Number,
    default: 0,
  },
  // HISTORY - for when the user parses items from our shop - those parses will be stored in this object property history
  history: {
    type: Array,
    default: []
  } 
}, 
// TIMESTAMPS for CREATED AT and UPDATED AT fields
{ timestamps: true }
);

// Virtual Field
userSchema.virtual('password')
.set(function(password) {
  this._password = password
  // SALT is a long unique string to generate the hashed password - salt is a file server to act as a transparent bridge to external resources.
  this.salt = uuidv1()
  // we take the hashed password and the value of this will be based on what we got from the client side- however, it will be encrypted before it is saved as 'hashed_password'
  this.hashed_password = this.encryptPassword(password)
})
.get(function() {
  return this._password
})

// Helper Methods
userSchema.methods = {
  encryptPassword: function(password) {
    // if password is null return empty 
    if(!password) return '';
    try {
      // NOTE an example is in the Docs here: https://nodejs.org/api/crypto.html
      // Hmac instance is a cryptographic hash function and a secret cryptographic key
      // The crypto.createHmac() method is used to create Hmac instances. Hmac objects are not to be created directly using the new keyword.
      // sha1 is a cryptographic hash function
      return crypto.createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      // return nothing
      return '';
    }
  }
}

// We use the mongoose.model() method to create a new model 
// so for this "User" will be based on 'userSchema'
// we can use this User model anywhere for creating a new user and updating a user, etc...
module.exports = mongoose.model("User", userSchema);