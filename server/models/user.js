const mongoose = require('mongoose');

// Schema definition for a user in the system
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String , required: false}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
