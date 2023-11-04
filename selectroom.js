document.getElementById('toggle').addEventListener('click', function() {
    var guests = document.getElementById('guests');
    if (guests.style.display === 'none') {
        guests.style.display = 'flex';
    } else {
        guests.style.display = 'none';
    }
});
var roomCount = 1;
function addRoom() {
    var table = document.getElementById('table');

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
 
    table.appendChild(newRow);
    updateGuests();

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
    });
}
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
            plusButtonsAdultsInRow[i].disabled = (totalGuestsInRow >= 10|| adultsInRow >= 10);
        }

        var plusButtonsChildrenInRow = row.querySelectorAll('button[onclick^="updateGuests(this, 1"][data-type="children"]');
        for (var i = 0; i < plusButtonsChildrenInRow.length; i++) {
            plusButtonsChildrenInRow[i].disabled = (totalGuestsInRow >= 10 || childrenInRow >= 4);
        }
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
    const guests = parseInt(roomGuestInfo[1].split(' ')[0]);
    
  
    const response = await fetch('http://localhost:3001/book', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dateRange: dateRange, guests: guests, roomnumbers: rooms })
      
    });
  
    if (response.ok) {
        const roomType = await response.json();
        alert('Room type available: ' + roomType.type);
      } else {
        const errorMessage = await response.text();
        alert('Error: ' + errorMessage);
      }
  });
});