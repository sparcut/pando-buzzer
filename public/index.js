const socket = io.connect(location.host);
socket.on('connect', () => {
  socket.emit('room', 'students');
});

const nameInput = document.getElementById('name');
const buzzer = document.getElementById('buzzer');

let name = ''; 

nameInput.addEventListener('keyup', (e) => name = e.target.value);
buzzer.addEventListener('click', sendBuzz);

function sendBuzz() {
  if(name == '') {
    alert('Please enter a name...');
    return;
  }
  
  socket.emit('buzz', { name: name });
}