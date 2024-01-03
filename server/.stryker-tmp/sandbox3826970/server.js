// @ts-nocheck
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const userRoute = require('./routes/userRoute');
const roomRoute = require('./routes/roomRoute');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const JWT_SECRET = "pA*88dfjwe0(ruYRWc9WNnskfhwe8f"
app.use(cors());
app.use('/images', express.static('images'));

mongoose.connect('mongodb://localhost:27017/hotel_booking') 
const db = mongoose.connection;
db.once('error', (error) => {
    console.error('Database connection error:', error);
  });
db.once('open', () => {
console.log('Database connected');
});


app.use(express.json());

app.use('/users',userRoute);
app.use('/rooms',roomRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports =app;
