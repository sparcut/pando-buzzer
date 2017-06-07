const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

const NAME_LENGTH_LIMIT = 30;

app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', (socket) => {
  
  socket.on('room', (room) => {
    if(socket.lastRoom) {
      socket.leave(socket.lastRoom);
      socket.lastRoom = null;
    }
    
    socket.join(room);
    socket.lastRoom = room;
    
    // console.log(' ++ User Connected - Room: ' + room);
  });

  socket.on('buzz', (data) => {
    if(data.name.length > NAME_LENGTH_LIMIT) data.name = data.name.substr(0, NAME_LENGTH_LIMIT) + '...';
    
    console.log(' -- Buzz from ' + data.name);
    data.id = socket.id
    data.time = new Date();
    io.sockets.in('teachers').emit('buzz', data);
  });
});

let port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Application listening on port ${port}.`);
});