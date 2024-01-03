// @ts-nocheck
const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    room_id: { type: String, required: true },
    user_id: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: String, required: true },
    totalDays: { type: String, required: true },
    transaction_id: { type: String, required: true },

  }, { timestamps: true });
  
  const bookingModel =  mongoose.model('bookings', bookingSchema);
  module.exports = bookingModel
