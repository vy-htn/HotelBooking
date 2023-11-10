$(document).ready(function() {
    $('#toggle').click(async function() {
    var guests = document.getElementById('guests');
    if (guests.style.display === 'none') {
        guests.style.display = 'flex';
    } else {
        guests.style.display = 'none';
    }
});});
var roomCount = 1;
$(document).ready(function() {
    $('#toggle').click(async function() {
        var guests = document.getElementById('guests');
        if (guests.style.display === 'none') {
            guests.style.display = 'flex';
        } else {
            guests.style.display = 'none';
        }
    });
});

var roomCount = 1;

function addRoom() {
    var table = document.getElementById('table');

    // Check if table exists
    if (!table) {
        console.error('Table element not found!');
        return;
    }

    var newRow = document.createElement('tr');
    var addButton = document.querySelector('button[onclick="addRoom()"]');
    roomCount++;
    
    if (roomCount === 10) {
        addButton.disabled = true;
    }

    newRow.innerHTML = `
        <td><div class="room-label"><label>Room `+roomCount+` : </label></div></td>
        <td>
            <div class="guest-type">
                <div id="container">
                    <button onclick="updateGuests(this, -1)" disabled="true">-</button>
                    <label class="guest-number" name="adults1">1</label>
                    <button onclick="updateGuests(this, 1)">+</button>
                </div>
            </div>
        </td>
        <td>
            <div class="guest-type">
                <div id="container">
                    <button onclick="updateGuests(this, -1)" disabled="true">-</button>
                    <label class="guest-number" name="children1">0</label>
                    <button onclick="updateGuests(this, 1)" data-type="children">+</button>
                </div>
            </div>
        </td>
        <td><button class="delete-room"  style="background: none; border: none;"> <i class="fa-solid fa-trash" style="color: #0c84d3;"></i></button></td>
    `;
    console.log('table' + table);
    table.appendChild(newRow);
    updateGuests();
    var adultsInRow = parseInt(newRow.querySelector('label[name="adults1"]').textContent);
    var childrenInRow = parseInt(newRow.querySelector('label[name="children1"]').textContent);
    var totalGuestsInRow = adultsInRow + childrenInRow;
    guests.push(totalGuestsInRow);

    newRow.querySelector('.delete-room').addEventListener('click', function() {
        table.removeChild(newRow);
        
        roomCount--;
        
        if (roomCount < 10){
            addButton.disabled = false;
        }
        var rooms = document.querySelectorAll('.room-label');
        for (var i = 0; i < rooms.length; i++) {
            rooms[i].textContent = 'Room ' + (i + 1) + ' : ';
        }
        updateGuests();
        guests.splice(roomCount, 1);
    });
}

// function addRoom() {
//     var table = document.getElementById('table');

//     var newRow = document.createElement('tr');
//     var addButton = document.querySelector('button[onclick="addRoom()"]');
//     roomCount++;
    
//     if (roomCount === 10) {
//         addButton.disabled = true;
//     }

//     newRow.innerHTML = `
//         <td><div class="room-label"><label>Room `+roomCount+` : </label></div></td>
//         <td>
//             <div class="guest-type">
//                 <div id="container">
//                     <button onclick="updateGuests(this, -1)" disabled="true">-</button>
//                     <label class="guest-number" name="adults1">1</label>
//                     <button onclick="updateGuests(this, 1)">+</button>
//                 </div>
//             </div>
//         </td>
//         <td>
//             <div class="guest-type">
//                 <div id="container">
//                     <button onclick="updateGuests(this, -1)" disabled="true">-</button>
//                     <label class="guest-number" name="children1">0</label>
//                     <button onclick="updateGuests(this, 1)" data-type="children">+</button>
//                 </div>
//             </div>
//         </td>
//         <td><button class="delete-room"  style="background: none; border: none;"> <i class="fa-solid fa-trash" style="color: #0c84d3;"></i></button></td>
//     `;
//     console.log('table' + table);
//     table.appendChild(newRow);
//     updateGuests();
//     var adultsInRow = parseInt(newRow.querySelector('label[name="adults1"]').textContent);
//     var childrenInRow = parseInt(newRow.querySelector('label[name="children1"]').textContent);
//     var totalGuestsInRow = adultsInRow + childrenInRow;
//     guests.push(totalGuestsInRow);

//     newRow.querySelector('.delete-room').addEventListener('click', function() {
//         table.removeChild(newRow);
        
//         roomCount--;
        
//         if (roomCount < 10){
//             addButton.disabled = false;
//         }
//         var rooms = document.querySelectorAll('.room-label');
//         for (var i = 0; i < rooms.length; i++) {
//             rooms[i].textContent = 'Room ' + (i + 1) + ' : ';
//         }
//         updateGuests();
//         guests.splice(roomCount, 1);
//     });
// }
var guests = [null,1];
function updateGuests(button, increment) {
    if (button && increment !== undefined) {
        var label = button.parentNode.querySelector(".guest-number");
        var newValue = Math.max(0, parseInt(label.textContent) + increment);
        label.textContent = newValue;

        var minusButton = button.parentNode.querySelector('button[onclick^="updateGuests(this, -1)"]');
        var plusButton = button.parentNode.querySelector('button[onclick^="updateGuests(this, 1)"]');

        if (label.getAttribute('name').startsWith("adults")) {
            minusButton.disabled = (newValue <= 1);
        } else if (label.getAttribute('name').startsWith("children")) {
            minusButton.disabled = (newValue <= 0);
        }

        var row = button.closest('tr'); 
        
        var adultsInRow = parseInt(row.querySelector('label[name="adults1"]').textContent);
        var childrenInRow = parseInt(row.querySelector('label[name="children1"]').textContent);
        var totalGuestsInRow = adultsInRow + childrenInRow;
        console.log(totalGuestsInRow.toString());
        
        var plusButtonsAdultsInRow = row.querySelectorAll('button[onclick^="updateGuests(this, 1"]');
        for (var i = 0; i < plusButtonsAdultsInRow.length; i++) {
            plusButtonsAdultsInRow[i].disabled = (totalGuestsInRow >= 6|| adultsInRow >= 6);
        }

        var plusButtonsChildrenInRow = row.querySelectorAll('button[onclick^="updateGuests(this, 1"][data-type="children"]');
        for (var i = 0; i < plusButtonsChildrenInRow.length; i++) {
            plusButtonsChildrenInRow[i].disabled = (totalGuestsInRow >= 6 || childrenInRow >= 2);
        }
        var roomNumber = button.closest('tr').rowIndex;
        console.log('room:'+roomNumber);
        guests[roomNumber] = totalGuestsInRow;
        console.log(guests[roomNumber]);

    }

    var adultsLabels = document.querySelectorAll('label[name="adults1"]');
    var childrenLabels = document.querySelectorAll('label[name="children1"]');

    var adults = 0;
    var children = 0;
    
    for (var i = 0; i < adultsLabels.length; i++) {
        adults += parseInt(adultsLabels[i].textContent);
        children += parseInt(childrenLabels[i].textContent);
    }

    document.getElementById("toggle").innerText = roomCount + " Room, " +  (parseInt(adults) + parseInt(children)) + " Guests";
}
$(document).ready(function() {
$('#check-availability').click(async function() {
    const dateRange = $('#date-range').val().split(' → ').map(date => new Date(date));
    const roomGuestInfo = $('#toggle').text().split(', ');
    const rooms = parseInt(roomGuestInfo[0].split(' ')[0]);
    
    
    console.log(guests[1]);
    console.log(rooms);
    const checkInDate = dateRange[0].toISOString().split('T')[0];
    const checkOutDate = dateRange[1].toISOString().split('T')[0];
    
    const roomDetails = [];

    for (let i = 0; i < rooms; i++) {
        const roomDetail = {
            checkInDate,
            checkOutDate,
            guests: guests[i+1]
        };
        roomDetails.push(roomDetail);
    }
    selectedRooms=[];
    selectedRoomsList=[];
    console.log(roomDetails);
    await checkAvailability(roomDetails);

   });
});
var selectedRooms = [];
async function checkAvailability(roomDetails, index = 0) {
    const data = await fetchRoomDetails(roomDetails[index]);
    console.log('Data:', typeof data); 
              console.log('Success:', data);
              const roomsContainer = document.getElementById('room-options');
              roomsContainer.innerHTML = '';
              data.forEach(room => {
                const roomElement = document.createElement('div');
                roomElement.innerHTML = `
                <div class= "room-options-container">
                    <div class="image">  
                        <img src="${room.imagePath}" alt="Room" />
                    </div>
                    <div class="room-description">
                        <h2> ${room.type}</h2>
                        <p>Capacity: ${room.capacity}</p>
                        <p>Amenities:</p>
                        <ul>
                            <li>Breakfast: ${room.amenities.breakfast ? 'Yes' : 'No'}</li>
                            <li>Accessible: ${room.amenities.accessible ? 'Yes' : 'No'}</li>
                        </ul>
                    </div>
                </div>
                <div class="select-section">
               
                <div class="select-button">
                 <p>${room.price_per_night} VND</p>
                <button>Select</button></div> 
                </div>
                       
                     `;
                roomsContainer.appendChild(roomElement);
                
    const selectButton = roomElement.querySelector('.select-button button');
    const selectedRoomsList = document.querySelector('.selected-rooms'); 
    selectButton.addEventListener('click', async function() {
        selectedRooms.push(room);
        console.log('selectedRooms:'+selectedRooms.length);
        console.log('roomDetails:'+roomDetails.length);
        
        const listItem = document.createElement('li');
        if (selectedRooms.length < roomDetails.length) {
            listItem.textContent = `Room Type: ${room.type}, Price: ${room.price_per_night} VND`;
            selectedRoomsList.appendChild(listItem);
            roomDetails[selectedRooms.length].guests = guests[selectedRooms.length+1];
            console.log("call next room");
            await checkAvailability(roomDetails, selectedRooms.length);
        }
        else if(selectedRooms.length == roomDetails.length){
            listItem.innerHTML= `Room Type: ${room.type}, Price: ${room.price_per_night} VND`;
            selectedRoomsList.appendChild(listItem);
            console.log('Go to purchase');
        }
        else{
            console.log('Go to purchase');

        }
        
    });
});
}

async function fetchRoomDetails(roomDetail) {
    const response = await fetch('http://localhost:8088/book', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(roomDetail),
    });
    const data = await response.json();
    return data;
}
module.exports = addRoom;
