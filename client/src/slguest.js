import React, { useState } from 'react';
import './css/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


function RoomSelection() {
    const [guests, setGuests] = useState([{ adults: 1, children: 0 }]);
    const [display, setDisplay] = useState('none');

    const updateGuests = (roomIndex, type, value) => {
        const newGuests = [...guests];
        newGuests[roomIndex][type] += value;
        setGuests(newGuests);
    };

    const addRoom = () => {
        setGuests([...guests, { adults: 1, children: 0 }]);
    };

    const deleteRoom = (roomIndex) => {
        const newGuests = guests.filter((guest, index) => index !== roomIndex);
        setGuests(newGuests);
    };

    return (
        <div>
            <div className="room-selection">
                <label htmlFor="room">Select rooms and guests:</label>
                <p id="toggle" style={{cursor:"pointer"}} onClick={() => setDisplay(display === 'none' ? 'flex' : 'none')}>
                    {`${guests.length} Room, ${guests.reduce((total, guest) => total + guest.adults + guest.children, 0)} Guest(s)`}
                </p>
            </div>
            <div className="promo">
                <label htmlFor="promo_code">Promo Code:</label>
                <input type="text" id="promo_code" name="promo_code" />
            </div>
            <button type="button" id="check-availability">CHECK AVAILABILITY</button>
            <div id="guests" className="guests" style={{display}}>
                {guests.map((guest, roomIndex) => (
                    <div className="room" id="room-container" key={roomIndex}>
                        <table id="table">
                            <tr>
                                <td><div className="room-label"><label>{`Room ${roomIndex + 1}:`}</label></div></td>
                                <td>
                                    <div className="guest-type">
                                        <div id="container">
                                            <button onClick={() => updateGuests(roomIndex, 'adults', -1)} disabled={guest.adults === 1}>-</button>
                                            <label className="guest-number" name="adults1">{guest.adults}</label>
                                            <button onClick={() => updateGuests(roomIndex, 'adults', 1)} disabled={guest.adults + guest.children >= 6 || guest.adults >= 6}>+</button>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="guest-type">
                                        <div id="container">
                                            <button onClick={() => updateGuests(roomIndex, 'children', -1)} disabled={guest.children === 0}>-</button>
                                            <label className="guest-number" name="children1">{guest.children}</label>
                                            <button onClick={() => updateGuests(roomIndex, 'children', 1)} disabled={guest.adults + guest.children >= 6 || guest.children >= 2}>+</button>
                                        </div>
                                    </div>
                                </td>
                                {roomIndex > 0 && (
                                    <td>
                                        <button className="delete-room" style={{background: 'none', border: 'none'}} onClick={() => deleteRoom(roomIndex)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        </table>
                    </div>
                ))}
                <div className="room-buttons">
                    <button type="button" id="add-room" onClick={addRoom} disabled={guests.length === 10}>Add additional room</button><br />
                    <button type="submit">Done</button>
                </div>
            </div>
        </div>
    );
};

export default RoomSelection;
