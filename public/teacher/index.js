const socket = io.connect(location.host);
socket.on('connect', () => {
  socket.emit('room', 'teachers');
});

const output = document.getElementById('container');
const resetButton = document.getElementById('reset-button');
let buzzed = [];

resetButton.addEventListener('click', resetBoard);

socket.on('buzz', handleBuzz);

function handleBuzz(data) {
  if(buzzed.includes(data.id) === false) {
    buzzed.push(data.id);
    const newBuzz = ` <div class="buzz">${data.name}</div>`;
    output.innerHTML = output.innerHTML + newBuzz; 
  }
}

function resetBoard() {
  buzzed = [];
  output.innerHTML = '';
}