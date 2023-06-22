const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = require('http').createServer(app);

const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on("newuser", (username) => {
      socket.broadcast.emit("update", username + " has joined the chat.");
    });
    socket.on("exituser", (username) => {
      socket.broadcast.emit("update", username + " has left the chat.");
    });
    socket.on("chat", (message) => {
      socket.broadcast.emit("chat", message);
    });
  });
   

server.listen(3000, () => {
    console.log('Server started on port 3000');
});