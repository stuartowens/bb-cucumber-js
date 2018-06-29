// ------------ Start up the chrome server ------------
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromePath = require('chromedriver').path;
const { log } = require('./logger');

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

const onPageLoadedWaitById = async function (elementIdOnNextPage) {
  let by = webdriver.By.id(elementIdOnNextPage);
  log.debug(`Page Loaded - waited on id: ${elementIdOnNextPage}`);
  onWaitForWebElementToBeVisible(by);
}

const onWaitForWebElementToBeVisible = async function (element) {
  log.debug(`Waiting for element to appear...`);
  try {
    await driver.wait(webdriver.until.elementLocated(element, 10000));
    await driver.wait(webdriver.until.elementIsVisible(driver.findElement(element)), 10000);
  } catch (err) {
    log.error(err.stack);
  }
}

const onWaitForWebElementToBeInvisible = async function (element) {
  log.debug(`Waiting for element to disappear...`);
  try {
    await driver.wait(webdriver.until.elementLocated(element, 1000));
    await driver.wait(webdriver.until.elementIsNotVisible(driver.findElement(element)), 15000);
  } catch (err) {
    log.error(err.stack);
  }
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Show Process config files
process.argv.forEach(function (val, index, array) {
  log.debug(index + ': ' + val);
});

module.exports = { getDriver, getWebDriver, onPageLoadedWaitById, onWaitForWebElementToBeVisible, onWaitForWebElementToBeInvisible, sleep };
