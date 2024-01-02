import React, { useState, useEffect } from 'react';
import '../css/daterange.css';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-rtl.css';
import '../css/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import StayDetails from './staydetails';

function Availability(){
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [guests, setGuests] = useState([{ adults: 1, children: 0 }]);
    const [display, setDisplay] = useState('none');
    const [data, setData] = useState([]);;


    var [selectedRooms, setSelectedRooms] = useState([]);
    const [dateRange, setDateRange] = useState([today, tomorrow]);
    const [roomDetails, setRoomDetails] = useState([]);
    const [bookNowBtnDisabled, setBookNowBtnDisabled] = useState(true);
    

    

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
    useEffect(() => {
        console.log('roomDetails: '+roomDetails[0]);
        console.log('guest 0: '+guests[0].adults);

    });
    

    const [buttonClicked, setButtonClicked] = useState(false);

    const checkAvailabilityClick = () => {
        setButtonClicked(true);
        setSelectedRooms([]);
        
    };

    useEffect(() => {
    if (!buttonClicked) return;

    const checkInDate = dateRange[0].toISOString().split('T')[0];
    const checkOutDate = dateRange[1].toISOString().split('T')[0];
    const rooms = guests.length;

    const roomDetails = [];

    for (let i = 0; i < rooms; i++) {
        const roomDetail = {
            checkInDate,
            checkOutDate,
            guests: guests[i]
        };
        roomDetails.push(roomDetail);
        console.log(`Guests in roomDetail ${i}:`, roomDetail.guests);

    }

    setRoomDetails(roomDetails);
    checkAvailability(roomDetails);
    
    setButtonClicked(false); // Reset the button click state
}, [dateRange, guests, buttonClicked]);


    
    const checkAvailability = async (roomDetails, index = 0) => {
        const data = await fetchRoomDetails(roomDetails[index]);
        console.log('Data:', typeof data); 
        console.log('Success:', data); 
        console.log('selectedRooms:'+selectedRooms.length);
        console.log('roomDetails:'+roomDetails.length);
        console.log(`Guests in  ${index}:`, roomDetails[index].guests);

        
    };

 
    const handleSelect = async(room) => {
        if (selectedRooms.length <= roomDetails.length) {
            setSelectedRooms([...selectedRooms, room]);
            // roomDetails[selectedRooms.length].guests = guests[selectedRooms.length];
            // await checkAvailability(roomDetails, selectedRooms.length);
            // setBookNowBtnDisabled(true);
            if (roomDetails[selectedRooms.length]) {
                roomDetails[selectedRooms.length].guests = guests[selectedRooms.length];
                await checkAvailability(roomDetails, selectedRooms.length);
                setBookNowBtnDisabled(true);
              }

        }
        
        else{
            console.log('Go to purchase');
            setBookNowBtnDisabled(false);
        }
    };


    const fetchRoomDetails = async (roomDetail) => {
        const response = await fetch('http://localhost:3001/rooms/book', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(roomDetail)
        });
        const data = await response.json();
        setData(data);

        return data;
    };
    const renderRoomOptions = () => {
        return(
        <div id="room-options">
            {data.map((room, index) => (
                <div key={index} className="room-options-container">
                    <div className='room-description-container'>
                        <div className="image">
                            <img src={room.imagePath} alt="Room" />
                        </div>
                        <div className="room-description">
                            <h3>{room.type}</h3>
                            <h8>Capacity: {room.capacity}</h8>
                            <h8>Amenities:</h8>
                            <ul>
                                <li>Breakfast: {room.amenities.breakfast ? 'Yes' : 'No'}</li>
                                <li>Accessible: {room.amenities.accessible ? 'Yes' : 'No'}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="select-section">
                        <div className="select-button">
                            <h6>{room.price_per_night} VND</h6>
                            <button onClick={() => handleSelect(room)}>Select</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>);
    };
    const history = useNavigate();
    const goToBooking = () => {
        history('/info');
    };
    

    return (
        <div>
            <form action="/book" method="post">
            <div className='date-range'>
            <DateRangePicker
                cleanable={false}
                ranges={[]}
                defaultValue={[today, tomorrow]}
                shouldDisableDate={(date) => date.getTime() < today.getTime()}
                renderValue={(value) => {
                    if (value && value.length === 2) {
                        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                        return `${value[0].toLocaleDateString('en-GB', options)} → ${value[1].toLocaleDateString('en-GB', options)}`;
                    }
                    return '';
                }}
                onChange={setDateRange}
            />
            </div>
            
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
           
            <button type="button" id="check-availability" onClick={() => checkAvailabilityClick()}>CHECK AVAILABILITY</button>            </form>
            <div id="guests" className="guests" style={{display}}>
                {guests.map((guest, roomIndex) => (
                    <div className="room" id="room-container" key={roomIndex}>
                        <table id="table">
                            <tbody>
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
                            </tbody>
                        </table>
                    </div>
                ))}
                <div className="room-buttons">
                    <button type="button" id="add-room" onClick={addRoom} disabled={guests.length === 10}>Add additional room</button>
                    <button type="button">Done</button>
                </div>
                
            </div>
            <section>
                <div id="room-options">
                {renderRoomOptions()}
                </div>

                    <div id="room-info">
                        <h2>Stay details: </h2>
                        <div>
                            <ul className="selected-rooms">
                            {selectedRooms.slice(1).map((room, index) => (
                                <li key={index}
                                    style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Montserrat' }}>
                                    <span>{room.type}</span>
                                    <span>{room.price_per_night} VND</span>
                                </li>))}
                            </ul>
                        </div>
                        <input type="button" id='book-now' value="Book Now" onClick={goToBooking}/>
                    </div>
                </section>
        </div>
    );

    
};
export default Availability;
