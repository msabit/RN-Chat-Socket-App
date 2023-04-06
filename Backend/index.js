const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


io.on('connection', (socket) => {
    console.log("a user connected :D");
    socket.on("chat message", msg => {
      console.log(msg);
      io.emit("chat message", msg);
    });
});

server.listen(3000, () => {
  console.log('Server is running on:3000');
});