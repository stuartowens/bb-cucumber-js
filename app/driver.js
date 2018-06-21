// ------------ Start up the chrome server ------------
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromePath = require('chromedriver').path;

const service = new chrome.ServiceBuilder(chromePath).build();
chrome.setDefaultService(service);

const driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

const getDriver = function () {
  return driver;
};

const getWebDriver = function () {
  return webdriver;
};

// Show Process config files
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

module.exports = { getDriver, getWebDriver };
