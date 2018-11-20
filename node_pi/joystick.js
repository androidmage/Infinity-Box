const Gpio = require("onoff").Gpio;
const io = require("socket.io-client");

// var socket = io.connect("http://infinity-server.herokuapp.com/", {reconnection:true});
// socket.emit("isController", {});

var socket = io.connect("http://tank-io.herokuapp.com/", { reconnection: true });

socket.emit("registerController", { message: "Infinity Controller ONLINE." });

var left = new Gpio(4, 'in', 'falling', { debounceTimeout: 10 });
var right = new Gpio(22, 'in', 'falling', { debounceTimeout: 10 });
var up = new Gpio(27, 'in', 'falling', { debounceTimeout: 10 });
var down = new Gpio(17, 'in', 'falling', { debounceTimeout: 10 });
var shoot = new Gpio(21, 'in', 'falling', {debounceTimeout: 10 });

console.log("Started:");

left.watch(function (err, value) {
   if (err) {
     console.log("There was an error", err);
     return;
   }
   console.log("LEFT BUTTON PRESSED");
   socket.emit("left", {});
 });

right.watch(function (err, value) {
   if (err) {
     console.log("There was an error", err);
     return;
   }
   console.log("RIGHT BUTTON PRESSED");
   socket.emit("right", {});
 });

up.watch(function (err, value) {
   if (err) {
     console.log("There was an error", err);
     return;
   }
   console.log("UP BUTTON PRESSED");
   socket.emit("up");
 });

down.watch(function (err, value) {
   if (err) {
     console.log("There was an error", err);
     return;
   }
   console.log("DOWN BUTTON PRESSED");
   socket.emit("down");
 });

shoot.watch(function (err, value) {
   if (err) {
     console.log("There was an error", err);
     return;
   }
   console.log("SHOOT BUTTON PRESSED");
   socket.emit("shoot");
 });

process.on('SIGINT', function () {
   left.unexport();
   right.unexport();
   up.unexport();
   down.unexport();
   shoot.unexport();
   socket.disconnect();
   console.log("Closing");
   process.exit();
});