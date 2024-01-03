// @ts-nocheck
const express = require('express');
const router = express.Router();
const Room = require('../models/rooms');
const RoomType = require('../models/roomtypes');


router.post('/book', async (req, res) => {
    const { checkInDate, checkOutDate, guests} = req.body;
    
    const totalGuests =  guests.adults + guests.children;
    
    const suitableRoomTypes = await RoomType.find({ capacity: { $gte: totalGuests } }).exec();
    console.log("totalguest: " + totalGuests);
    console.log("Suitable Room Types:");
    suitableRoomTypes.forEach(roomType => {
        console.log(roomType);
    });
    
    let suitableRooms = [];
    for (const roomType of suitableRoomTypes) {
        const availableRooms = await Room.find({
            type: roomType.type,
            bookings: {
                $not: {
                    $elemMatch: {
                        checkInDate: { $lt: new Date(checkOutDate) },
                        checkOutDate: { $gt: new Date(checkInDate) }
                    }
                }
            }
        }).exec();
        if (availableRooms.length > 0) {
            suitableRooms.push(roomType);
        }
    }
    if(suitableRooms.length > 0){
      res.json(suitableRooms);
    }
    
    else{
      res.status(404).send('No rooms available that can accommodate the number of guests.');
    }
});

module.exports = router
