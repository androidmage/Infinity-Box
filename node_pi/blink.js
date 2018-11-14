var Gpio = require('onoff').Gpio;
var LED = new Gpio(17, 'out');

LED.writeSync(1);

setTimeout(function () {
  LED.writeSync(0);
}, 5000);