const Gpio = require("onoff").Gpio;
const io = require("socket.io-client");

// var socket = io.connect("http://infinity-server.herokuapp.com/", {reconnection:true});
// socket.emit("isController", {});

var socket = io.connect("http://tank-io.herokuapp.com/", { reconnection: true });

socket.emit("registerController", { message: "Infinity Controller ONLINE." });

var left = new Gpio(4, 'in', 'both', { debounceTimeout: 10 });
var right = new Gpio(22, 'in', 'both', { debounceTimeout: 10 });
var up = new Gpio(27, 'in', 'both', { debounceTimeout: 10 });
var down = new Gpio(17, 'in', 'both', { debounceTimeout: 10 });
var shoot = new Gpio(21, 'in', 'falling', {debounceTimeout: 10 });

console.log("Started:");

var is_up = false, is_down = false, is_left = false, is_right = false;

left.watch(function (err, value) {
   if (err) {
     console.log("There was an error", err);
     return;
   }
   console.log(`LEFT BUTTON: ${value}`);
   socket.emit("left", {num: value});
 });

right.watch(function (err, value) {
   if (err) {
     console.log("There was an error", err);
     return;
   }
   console.log(`RIGHT BUTTON: ${value}`);
   socket.emit("right", {num: value});
 });

up.watch(function (err, value) {
   if (err) {
     console.log("There was an error", err);
     return;
   }
   console.log(`UP BUTTON: ${value}`);
   socket.emit("up", {num: value});
 });

down.watch(function (err, value) {
   if (err) {
     console.log("There was an error", err);
     return;
   }
   console.log(`DOWN BUTTON: ${value}`);
   socket.emit("down", {num: value});
 });

shoot.watch(function (err, value) {
   if (err) {
     console.log("There was an error", err);
     return;
   }
   console.log("SHOOT BUTTON PRESSED", value);
   socket.emit("shoot_now", {});
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