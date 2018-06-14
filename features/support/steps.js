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
driver.manage().setTimeouts('{10000,10000,10000}');
pages.mainPage = new PageObject('mainPage.json');
pages.mainPage.setDriver(driver, webdriver);
pages.login = PageObject('loginPage.json');
pages.login.setDriver(driver, webdriver);

Given('I am on MacMillanLearning.com', function () {
  driver.get('https:\\macmillanlearning.com')
});

When('I click the login button', function () {
  console.log('Clicking on login button');
  pages.login.populate('btn_login', 'click');
});

Then('I should be on the login screen', function () {
  // Write code here that turns the phrase above into concrete actions
  const onLoginPage = pages.login.getElement('btn_login');
  assert(onLoginPage, 'Expected to be on Login page');
});

When(/^I enter "(.*)" and "(.*)"$/, function (username, password) {
  // Write code here that turns the phrase above into concrete actions
  pages.login.populate('txt_loginemail', username);
  pages.login.populate('txt_password', password);
});

When(/^I save a variable "(.*)"$/, function (saveVariable) {
  pages.login.parse(saveVariable)
});
When('I test things', function () {
  // Write code here that turns the phrase above into concrete actions
  console.log('test steps:' + pages.mainPage.name);
});

Then(/^I should get a message that says "(.*)"$/, function (message) {
    // Write code here that turns the phrase above into concrete actions
    pages.login.assertText('txt_loginFaled', '* You need a valid e-mail address and password to log in.')
  });
