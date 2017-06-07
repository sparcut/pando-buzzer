const socket = io.connect(location.host);
socket.on('connect', () => {
  socket.emit('room', 'teachers');
});

const leaderBoardContainer = document.getElementById('container');
const resetButton = document.getElementById('reset-button');

const NAME_LENGTH_LIMIT = 20;
let buzzed = [];

resetButton.addEventListener('click', resetBoard);

socket.on('buzz', handleBuzz);

function handleBuzz(data) {
  // If user not already buzzed 
  if(buzzed.includes(data.id) === false) {
    buzzed.push(data.id);
    
    const limitedName = data.name.length < NAME_LENGTH_LIMIT ? data.name : data.name.substr(0, NAME_LENGTH_LIMIT); 
    const newBuzz = `<div class="buzz" id="${data.id}">${limitedName}</div>`;
    
    leaderBoardContainert.innerHTML += newBuzz; 
  }
}

function resetBoard() {
  buzzed = [];
  output.innerHTML = '';
}