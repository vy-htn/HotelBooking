import React from 'react';

const StayDetails = ({ selectedRooms, totalPrice }) => (
  <div>
    <h2>Stay details:</h2>
    <div>
      <ul className="selected-rooms">
        {selectedRooms.map((room, index) => (
          <li
            key={index}
            style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Montserrat' }}
          >
            <span>Type: {room.type}</span>
            <span>{room.price_per_night} VND</span>
          </li>
        ))}
      </ul>
    </div>
    <div>Total Price: {totalPrice} VND</div>
  </div>
);

export default StayDetails;
