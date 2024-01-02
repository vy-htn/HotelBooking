const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: Number,
    type: String,
    bookings: Array
});

const roomModel = mongoose.model('rooms', roomSchema);
module.exports = roomModel