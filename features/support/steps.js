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
const webdriver = require('selenium-webdriver');
const browser = new webdriver.Builder()
  .usingServer()
  .withCapabilities({'browserName': 'chrome' })
  .build();

//let driver = new webdriver.Builder()
//  .withCapabilities(selenium.Capabilities.chrome())
//  .build();

browser.get('http://en.wikipedia.org/wiki/Wiki');
browser.findElements(webdriver.By.css('[href^="/wiki/"]'))
	.then(function(links){
	  assert.equal(19, links.length); // Made up number
	  browser.quit();
	});

//var driver = new webdriver.Builder()
//	.forBrowser('firefox')
//	.setFirefoxOptions( /* … */)
//	.setChromeOptions( /* … */)
//	.build();


let pages = {};

pages.mainPage = PageObject("mainPage.json");
pages.mainPage.setDriver(driver);


Given('I am on MacMillan.com', function() {
	driver.get("https:\\macmillanlearning.com")
});


Given('a variable set to {int}', function(number) {
  this.setTo(number);
  console.log("mainPage2: " + pages.mainPage.test());
});

When('I increment the variable by {int}', function(number) {
  this.incrementBy(number)
});

When('I test things', function () {
  // Write code here that turns the phrase above into concrete actions
  console.log("test steps:" + pages.mainPage.name);
  
});

Then('the variable should contain {int}', function(number) {
  expect(this.variable).to.eql(number)
});