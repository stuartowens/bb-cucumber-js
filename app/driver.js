// ------------ Start up the chrome server ------------
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromePath = require('chromedriver').path;

// https://stackoverflow.com/questions/49862078/protractor-and-cucumber-function-timed-out-using-async-await
var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

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

const onPageLoaded = async function (elementIdOnNextPage) {
  /**/let by = webdriver.By.id(elementIdOnNextPage);
  await driver.wait(webdriver.until.elementLocated(by, 10000));
  await driver.wait(webdriver.until.elementIsVisible(driver.findElement(by)), 10000);

  /* // Didn't Work
  await driver.wait(webdriver.until.elementLocated(webdriver.By.id(elementIdOnNextPage)), 30 * 1000);
  let el = await driver.findElement(webdriver.By.id(elementIdOnNextPage));
  await driver.wait(webdriver.until.elementIsVisible(el), 30 * 1000);

  // Didn't work
  await driver.wait(async function () {
    const state = await driver.executeScript('return document.readyState');
    console.log('Current STATE: '+state);
    return state === 'complete';
  });*/

  console.log(`Page Loaded - waited on id: ${elementIdOnNextPage}`);
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Show Process config files
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

module.exports = { getDriver, getWebDriver, onPageLoaded, sleep };
