document.getElementById('toggle').addEventListener('click', function() {
    var guests = document.getElementById('guests');
    if (guests.style.display === 'none') {
        guests.style.display = 'flex';
    } else {
        guests.style.display = 'none';
    }
});
function addRoom() {
    // Get the guests div
    var guests = document.getElementById('guests');

    // Get the room-buttons div
    var roomButtons = document.querySelector('.room-buttons');

    // Create a new room div
    var newRoom = document.createElement('div');
    newRoom.className = 'room';

    // Add guest types to the new room
    // Note: You'll need to replace 'n' with the actual room number
    newRoom.innerHTML = `
        <div class="guest-type">
            <div id="container">
                <button>-</button>
                <input type="text" id="guest-number" name="adults1">
                <button>+</button>
            </div>
        </div>
        <div class="guest-type">
            <div id="container">
                <button>-</button>
                <input type="text" id="guest-number" name="children1">
                <button>+</button>
            </div>
        </div>
        <div class="guest-type">
            <div id="container">
                <button>-</button>
                <input type="text" id="guest-number" name="infants1">
                <button>+</button>
            </div>
        </div>
    `;

    // Add the new room to the guests div before the room-buttons div
    guests.insertBefore(newRoom, roomButtons);
}

