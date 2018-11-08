const express = require("express");
const app = express();
const server =require("http").createServer(app);
const socketio = require("socket.io");

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/Client/index.html");
});

app.get("/*", function (req, res) {
    let file = req.params[0];
    res.sendFile(__dirname + "/Client/" + file);
});

server.listen(process.env.PORT || 3000);
console.log("Server started on localhost:3000");

const io = socketio(server, {});

let p = null;

io.on('connection', function (socket) {
   console.log(`Socket Connected: ${socket.id}`);

   p = socket;

   socket.on('disconnect', function () {
       console.log(`Socket Disconnected: ${socket.id}`);
       p = null;
   });
});

setInterval(function () {
    if (p) {
        p.emit("change", {dir: Math.floor(Math.random() * 4)})
    }
}, 1000);



