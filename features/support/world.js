// features/support/world.js
const { setWorldConstructor } = require('cucumber');

const my = {};
const that = {};

class CustomWorld {
  constructor() {
    this.variable = 0;
    
    
    //console.log('Executing world constructor.');
    //console.log("timeout:" + this.ca.config.timeout);
    
  }

  setTo(number) {
    this.variable = number;
  
  }

  incrementBy(number) {
    this.variable += number
  }
  
  coreAutomation() {
	  return that.ca;
  };
  
}
 //coreData.loaded = true;
 
setWorldConstructor(CustomWorld)