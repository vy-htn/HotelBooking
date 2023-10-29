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
        <td><div class="guest-type"><div id="container"><button>-</button><input type="text" class="guest-number" name="adults1"><button>+</button></div></div></td>
        <td><div class="guest-type"><div id="container"><button>-</button><input type="text" class="guest-number" name="children1"><button>+</button></div></div></td>
        <td><div class="guest-type"><div id="container"><button>-</button><input type="text" class="guest-number" name="infants1"><button>+</button></div></div></td>
        <td><button class="delete-room"  style="background: none; border: none;"> <i class="fa-solid fa-trash" style="color: #0c84d3;"></i></button></td>
    `;

    table.appendChild(newRow);
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
    });
}


