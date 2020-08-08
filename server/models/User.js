const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  role: {
      type: String,
      enum: ['User','Publisher'],
      default: 'User'
  },
  password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 8,
      select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
      type: Date,
      default: Date.now
  }
});

const User = mongoose.model('User', userSchema)
module.exports = User