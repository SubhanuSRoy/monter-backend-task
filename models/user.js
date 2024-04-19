const mongoose = require('mongoose');

// make schema for the user
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
  age: Number,
  workDetails: String,
  isVerified: { type: Boolean, default: false },
  otp: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
