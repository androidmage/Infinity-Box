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

   if (p === null) p = socket;
   
   socket.on("left", function(data) { if (p) p.emit("change", {dir: 0}); console.log("DETECTED LEFT");});
   socket.on("right", function(data) { if (p) p.emit("change", {dir: 1}); console.log("DETECTED RIGHT");});
   socket.on("up", function(data) { if (p) p.emit("change", {dir: 2}); console.log("DETECTED UP");});
   socket.on("down", function(data) { if (p) p.emit("change", {dir: 3}); console.log("DETECTED DOWN");});

   socket.on('disconnect', function () {
       console.log(`Socket Disconnected: ${socket.id}`);
       p = null;
   });
   
});

/*setInterval(function () {
    if (p) {
        p.emit("change", {dir: Math.floor(Math.random() * 4)})
    }
}, 1000);*/



