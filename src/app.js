const express = require('express');
const http = require('http');
const app = express();
require('dotenv').config();

const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const cron = require("node-cron")

// Server Port
const PORT = process.env.PORT;

// Start the server

app.get('/', (req, res) => {
  res.send("hello, world")
});

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("disconnect", function () {
    console.log("Made socket disconnected");
  });

  cron.schedule("* * * * * *", () => {
    socket.emit("hello","friend")
   })
});

server.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});
