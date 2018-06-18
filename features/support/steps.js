// features/support/steps.js
const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

const PageObject = require('../pages/PageObject.js');
/*
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var firefox = require('selenium-webdriver/firefox');
*/

const assert = require('assert');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

let pages = {};

//driver.implicitlyWait(8000);
//driver.manage().setTimeouts('{10000,10000,10000}');
pages.mainPage = new PageObject('mainPage.json');
pages.mainPage.setDriver(driver, webdriver);
pages.login = new PageObject('loginPage.json');
pages.login.setDriver(driver, webdriver);

Given('I am on MacMillanLearning.com', async function () {
  await driver.get('https:\\macmillanlearning.com');
});

Then(/^Switch to IFrame "(.*)"$/, async function (iframe) {
  console.log(`Switching to IFrame ${iframe}`);
  driver.switchTo().frame(iframe);
});

When('I click the login button', async function () {
  console.log('Clicking on login button');
  await pages.login.populate('btn_login', 'click');
  console.log('Login button was clicked');
  // const frames = driver.findElements(webdriver.By.tagName('iframe'));
  // driver.switchTo().frame(0);
  // try {
  //   const elementDef = webdriver.By.id('ctl00_cphContent_txtLoginEmail');
  //   const returnElement = await driver.findElements(elementDef);
  //   await pages.login.populate('txt_loginemail', 'Testing');
  //   console.log(await driver.getTitle());
  //   returnElement.map(async (test) => {
  //     const id = await test.getId();
  //     const tagName = await test.getTagName();
  //     const text = await test.getText();
  //     console.log(id + ' - ' + tagName + ' - ' + text);
  //   });
  //   console.log('Found user input');
  // } catch (e) {
  //   console.error(e);
  // }
  
});

When(/^I click by id "(.*)" button$/, async function (buttonLabel) {
  console.log('Clicking on login button');
  await pages.login.populate(buttonLabel, 'click');
  console.log('Login button was clicked');
});

Then('I should be on the login screen', async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log('Checking that we are on the login screen');
  const onLoginPage = await pages.login.getElement('btn_login');
  assert(onLoginPage, 'Expected to be on Login page');
});


When(/^I enter "(.*)" and "(.*)"$/, async function (username, password) {
  console.log('Enter username and password');
  //driver.switchTo().frame(0);
  // Write code here that turns the phrase above into concrete actions
  await pages.login.populate('txt_loginemail', username);
  await pages.login.populate('txt_password', password);
});

When(/^I save a variable "(.*)"$/, async function (saveVariable) {
  await pages.login.parse(saveVariable)
});
When('I test things', function () {
  // Write code here that turns the phrase above into concrete actions
  console.log('test steps:' + pages.mainPage.name);
});

Then(/^I should get a message that says "(.*)"$/, function (message) {
  // Write code here that turns the phrase above into concrete actions
  pages.login.assertText('txt_loginFaled', '* You need a valid e-mail address and password to log in.')
});
