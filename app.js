const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const prettyjson = require('prettyjson');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.redirect('/');
// });

io.on('connection', (socket) => {
  
  socket.on('room', (room) => {
    if(socket.lastRoom) {
      socket.leave(socket.lastRoom);
      socket.lastRoom = null;
    }
    
    socket.join(room);
    socket.lastRoom = room;
    
    console.log(' ++ User Connected - Room: ' + room);
  });

  socket.on('buzz', (data) => {
    data.time = new Date();
    io.sockets.in('teachers').emit('buzz', data);
  });
});

let port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Application listening on port ${port}.`);
});