const socket = io.connect(location.host);
socket.on('connect', () => {
  socket.emit('room', 'teachers');
});

const output = document.getElementById('container');

socket.on('buzz', handleBuzz);

function handleBuzz(data) {
  console.log(data);
  const newBuzz = ` <div class="buzz">${data.name}</div>`;
  output.innerHTML = newBuzz + output.innerHTML;
}