const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String },
  name: { type: String },
  createdAt: { type: Date, default: Date.now },
});

model.exports = mongoose.model('User', UserSchema);
