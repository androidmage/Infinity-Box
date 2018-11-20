const Gpio = require("onoff").Gpio;

var button = new Gpio(21, 'in', 'falling', {debounceTimeout: 10});

button.watch(function (err, value) {
  if (err) {
    console.log("There was an error", err);
    return;
  }
  console.log("Button Pressed");
});

process.on('SIGINT', function () {
   button.unexport();
   console.log("Closing");
   process.exit();
});