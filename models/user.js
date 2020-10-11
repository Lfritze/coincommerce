const mongoose = require('mongoose');
const crypto = require('crypto');
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