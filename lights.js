/*********************************************** 
** Raspberry Pi Automotive Interface          **
**                                            **
**  lights.js - test gpio with rgb leds       **
**                                            **
***********************************************/

const gpio = require('pigpio').Gpio;

let rled = new gpio(17, {mode: gpio.OUTPUT}),
    gled = new gpio(22, {mode: gpio.OUTPUT}),
    bled = new gpio(24, {mode: gpio.OUTPUT});

let lightTimer = null;

module.exports.setLightGPIO = function(colorgpio) {
  if(!colorgpio) {
    rled = new gpio(colorgpio.RED, {mode: gpio.OUTPUT});
    gled = new gpio(colorgpio.GREEN, {mode: gpio.OUTPUT});
    bled = new gpio(colorgpio.BLUE, {mode: gpio.OUTPUT});
  } 
};

module.exports.lightFade = function(color) {
  if(!color) color = {RED: 0, GREEN: 0, BLUE: 255};
  if(!color.TIME) color.TIME = 1500;
  lightTimer = setInterval( () => {
    if(color.ON) {
      setLED({RED: 0, GREEN: 0, BLUE: 0});
      color.ON = false;
    } else {
      setLED(color);
      color.ON = true;
    }
  }, color.TIME);
};

module.exports.lightOff = function() {
  if(lightTimer) {
    clearInterval(lightTimer);
  }
  setLED({RED: 0, GREEN: 0, BLUE: 0});
};

const setLED = function(color) {
  rled.pwmWrite(color.RED);
  gled.pwmWrite(color.GREEN);
  bled.pwmWrite(color.BLUE);
};
