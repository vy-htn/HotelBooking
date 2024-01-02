const mongoose = require('mongoose');

const RoomTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  price_per_night: {
    type: Number,
    required: true
  },
  amenities: {
    breakfast: {
      type: Boolean,
      default: false
    },
    accessible: {
      type: Boolean,
      default: false
    }
  },
  imagePath: {
    type: String,
    required: true
  }
});

const roomTypeModel = mongoose.model('roomtypes', RoomTypeSchema);
module.exports = roomTypeModel

