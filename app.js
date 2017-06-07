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

  socket.on('buzz', (sessionData) => {    
    if(sessionData.name > 255) sessionData.name = sessionData.name.substr(0, 255);
    
    const emitData = {
      "id": socket.id,
      "name": sessionData.name.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
      "date": new Date()
    }
    
    io.sockets.in('teachers').emit('buzz', emitData);
  });
});

let port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Application listening on port ${port}.`);
});