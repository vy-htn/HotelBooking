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
        <td><div class="guest-type"><div id="container"><button onclick="updateGuests(this, -1)" disabled="true">-</button><input type="text" class="guest-number" name="adults1" value="1"><button onclick="updateGuests(this, 1)">+</button></div></div></td>
        <td><div class="guest-type"><div id="container"><button onclick="updateGuests(this, -1)" disabled="true">-</button><input type="text" class="guest-number" name="children1" value="0"><button onclick="updateGuests(this, 1)">+</button></div></div></td>
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
        var input = button.parentNode.querySelector(".guest-number");

        var newValue = Math.max(0, parseInt(input.value) + increment);
        input.value = newValue;
        var minusButton = button.parentNode.querySelector('button[onclick^="updateGuests(this, -1)"]');

        if (input.name.startsWith("adults")) {
            minusButton.disabled = (newValue <= 1);
        } else if (input.name.startsWith("children")) {
            minusButton.disabled = (newValue <= 0);
        }

    }


    var adultsInputs = document.querySelectorAll('input[name="adults1"]');
    var childrenInputs = document.querySelectorAll('input[name="children1"]');

    var adults = 0;
    var children = 0;
    
    for (var i = 0; i < adultsInputs.length; i++) {
        adults += parseInt(adultsInputs[i].value);
        children += parseInt(childrenInputs[i].value);
    }

    document.getElementById("toggle").innerText = roomCount + " Room, " +  (parseInt(adults) + parseInt(children)) + " Guests";
}

