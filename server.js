const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.$= require('jquery');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use('/images', express.static('images'));

mongoose.connect('mongodb://localhost:27017/hotel_booking') 
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
    booking: Array
});

const Room = mongoose.model('Room', roomSchema);

const guestSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      phoneNumber: {
        type: String,
        required: true
      },
      checkInDate: {
        type: Date,
        required: true
      },
      checkOutDate: {
        type: Date,
        required: true
      }
});

const Guest = mongoose.model('Guest', guestSchema);

const roomTypeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
        required: true
      },
      accessible: {
        type: Boolean,
        required: true
      }
    }
  });
const RoomType = mongoose.model('RoomType', roomTypeSchema);

module.exports = mongoose.model('RoomType', roomTypeSchema);

app.use(express.json());
app.use('/api/rooms', require("./routes/rooms"));

app.get('/api/rooms', async (req, res) => {
    const rooms = await Room.find();
    res.send(rooms);
});

app.post('/api/rooms', async (req, res) => {
    let room = new Room(req.body);
    room = await room.save();
    res.send(room);
});
app.post('/api/guests', async (req, res) => {
    let guest = new Guest(req.body);
    guest = await guest.save();
    res.send(guest);
});
app.get('/api/roomtypes', async (req, res) => {
    const roomtypes = await RoomType.find();
    res.send(roomtypes);
});
app.use('/api/rooms', require("./routes/rooms"));

app.post('/book', async (req, res) => {
    const { checkInDate, checkOutDate, guests} = req.body;
    const client = new MongoClient('mongodb://localhost:27017/hotel_booking');
    await client.connect();
  
    const roomtypes = client.db("hotel_booking").collection("roomtypes");
    const rooms = client.db("hotel_booking").collection("rooms");
    
    const suitableRoomTypes = await roomtypes.find({ capacity: { $gte: guests } }).toArray();
    console.log("Suitable Room Types:");
    suitableRoomTypes.forEach(roomType => {
        console.log(roomType);
    });
    
 
    let suitableRooms = [];
    for (const roomType of suitableRoomTypes) {
        const availableRooms = await rooms.find({
            type: roomType.type,
        }).toArray();
        if (availableRooms.length > 0) {
            suitableRooms.push(roomType);
        }
    }
    if(suitableRooms.length > 0){
      res.json(suitableRooms);
      await client.close();
    }
    
    else{
      res.status(404).send('No rooms available that can accommodate the number of guests.');
    await client.close();
    }
    
  });
  app.get('/', (req,res) =>{
    res.render
  })
  app.get('/home', (req, res) => {
    res.render('homepage');
  });

  app.get('/availability', async (req, res) => {
      res.render('selectpage');
  });
  app.get('/contact', (req, res) => {
    res.render('contact');
  });
  app.get('/about', (req, res) => {
    res.render('about');
  });
  app.get('/beachclub', (req, res) => {
    res.render('beachclub');
  });
  app.get('/dining', (req, res) => {
    res.render('dining');
  });
  app.get('/rooms', (req, res) => {
    res.render('rooms');
  });
  app.get('/specialoffers', (req, res) => {
    res.render('specialoffers');
  });
  app.get('/meetings&events', (req, res) => {
    res.render('meetingsevents');
  });
  app.get('/facilities', (req, res) => {
    res.render('facilities');
  });

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`))
}

module.exports =app;
