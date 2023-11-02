const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hotel_booking',{ useNewUrlParser: true, useUnifiedTopology: true }) 
const db = mongoose.connection;
db.once('error', (error) => {
    console.error('Database connection error:', error);
  });
db.once('open', () => {
console.log('Database connected');
});

const roomSchema = new mongoose.Schema({
    number: Number,
    type: String,
    beds: Number,
    price: Number,
    available: Boolean
});

const Room = mongoose.model('Room', roomSchema);

const app = express();

app.use(express.json());

app.get('/api/rooms', async (req, res) => {
    const rooms = await Room.find();
    res.send(rooms);
});

app.post('/api/rooms', async (req, res) => {
    let room = new Room(req.body);
    room = await room.save();
    res.send(room);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


