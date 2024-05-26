const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello Arjun</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("client message", (msg) => {
    console.log("client message: ", msg);
    io.emit("server message", msg);
  });
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
