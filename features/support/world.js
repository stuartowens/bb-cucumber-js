// features/support/world.js
const { setWorldConstructor } = require('cucumber');

const that = {};

class CustomWorld {
  constructor () {
    this.variable = 0;
  }

  setTo (number) {
    this.variable = number;
  }

  incrementBy (number) {
    this.variable += number;
  }

  coreAutomation () {
    return that.ca;
  }
}

setWorldConstructor(CustomWorld);
