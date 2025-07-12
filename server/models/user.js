
const mongoose = require('mongoose');
const crypto = require('crypto');
const { createToken } = require("../services/authentication")

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  salt: String,
});

// 🔐 Pre-save hook to hash password
UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHmac('sha256', salt).update(user.password).digest('hex');

  user.salt = salt;
  user.password = hash;
  next();
});

// 🔐 Method to validate password and return token
UserSchema.static('matchPasswordandGenerateToken', async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const hash = crypto.createHmac('sha256', user.salt).update(password).digest('hex');
  if (hash !== user.password) {
    throw new Error('Incorrect password');
  }

  return createToken(user); // or return user if you don’t use tokens yet
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
