// import React, { useState } from 'react';
// import './css/styles.css';
// import './selectroom.js';
// function RoomSelection() {
//     const [guests, setGuests] = useState({ adults: 1, children: 0 });

//     const updateGuests = (type, value) => {
//         setGuests({
//             ...guests,
//             [type]: guests[type] + value
//         });
//     };

//     return (
//         <div>
//             <div className="room-selection">
//                 <label htmlFor="room">Select rooms and guests:</label>
//                 <p id="toggle" style={{cursor:"pointer"}}>{`1 Room, ${guests.adults + guests.children} Guest(s)`}</p>
//             </div>
//             <div className="promo">
//                 <label htmlFor="promo_code">Promo Code:</label>
//                 <input type="text" id="promo_code" name="promo_code" />
//             </div>
//             <button type="button" id="check-availability">CHECK AVAILABILITY</button>
//             <div id="guests" className="guests">
//                 <div className="room" id="room-container">
//                     <table id="table">
//                         <tr>
//                             <td></td>
//                             <td>
//                                 <div className="label">
//                                     <label htmlFor="adults1">Adults </label><br />
//                                     <label htmlFor="adults1">(Ages 12 or more)</label><br />
//                                 </div>
//                             </td>
//                             <td>
//                                 <div className="label">
//                                     <label htmlFor="children1">Children</label><br />
//                                     <label htmlFor="children1">(Ages 0-11)</label><br />
//                                 </div>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td><div className="room-label"><label>Room 1:</label></div></td>
//                             <td>
//                                 <div className="guest-type">
//                                     <div id="container">
//                                         <button onClick={() => updateGuests('adults', -1)} disabled={guests.adults === 1}>-</button>
//                                         <label className="guest-number" name="adults1">{guests.adults}</label>
//                                         <button onClick={() => updateGuests('adults', 1)}>+</button>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>
//                                 <div className="guest-type">
//                                     <div id="container">
//                                         <button onClick={() => updateGuests('children', -1)} disabled={guests.children === 0}>-</button>
//                                         <label className="guest-number" name="children1">{guests.children}</label>
//                                         <button onClick={() => updateGuests('children', 1)}>+</button>
//                                     </div>
//                                 </div>
//                             </td>
//                         </tr>
//                     </table>
//                 </div>
//                 <div className="room-buttons">
//                     <button type="button" id="add-room">Add additional room</button><br />
//                     <button type="submit">Done</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RoomSelection;
