const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const  userSchema= new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email!'],
    unique: true, // Set the email field as unique
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [4, 'Password should be greater than 4 characters'],
    select: false,
  },
  phoneNumber: {
    type: Number,
  },
  addresses: [
    {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      address1: {
        type: String,
      },
      zipCode: {
        type: Number,
      },
      addressType: {
        type: String,
      },
    },
  ],
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Generate JWT token for authentication
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};

// Compare entered password with stored hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the user schema model
module.exports = mongoose.model("User", userSchema)

