const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + 'public'), () => {
  
});

io.on('connection', (socket) => {
  console.log(' ++ User Connected');
  
  socket.on('newUser', (data) => {
    
  });
  
  socket.on('press', (data) => {
    socket.broadcast.emit('press', data);
  });
});

http.listen(3000, () => {
  console.log('Listening on port 3000');
});