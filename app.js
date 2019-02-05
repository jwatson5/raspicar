/*********************************************** 
** Raspberry Pi Automotive Interface          **
**                                            **
**  app.js - main application                 **
**                                            **
***********************************************/

const lights = require('./lights');

console.log("Starting application...");

lights.setLightGPIO({RED: 17, GREEN: 22, BLUE: 24});
lights.lightFade(); // endless timer loop

process.on('SIGINT', function() {
  console.log("\nShutting application down now...");
  lights.lightOff();
  process.exit();
});
