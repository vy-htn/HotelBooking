const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: false },
    isRegisteredMember: { type: Boolean, default: false },
  }, { timestamps: true });
  
  const userModel =  mongoose.model('users', userSchema);
  module.exports = userModel
