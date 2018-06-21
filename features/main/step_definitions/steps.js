// features/support/steps.js
const { Given, When, Then } = require('cucumber');
const path = require('path');
const assert = require('assert');

const { PageObject } = require('../../../app/pageObject');
const { getDriver } = require('../../../app/driver');
const { loadConfig, loadLogin } = require('../../../app/util');
/*
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var firefox = require('selenium-webdriver/firefox');
*/


let pages = {
  mainPage: new PageObject('mainPage.json', path.join(__dirname, '/')),
  login: new PageObject('loginPage.json', path.join(__dirname, '/'))
};

Given('I am on MacMillanLearning.com', async function () {
  const config = await loadConfig('config');
  console.log(`Loading URL ${config.baseURL}`);
  await getDriver().get(config.baseURL);
});

Then(/^Switch to IFrame "(.*)"$/, async function (iframe) {
  console.log(`Switching to IFrame ${iframe}`);
  getDriver().switchTo().frame(iframe);
});

When('I click the login button', async function () {
  try {
    console.log('Clicking on login button');
    const clickedButton = await pages.login.populate('btn_login', 'click');
    console.log(`Login button was clicked: ${clickedButton}`);
  } catch (err) {
    console.error(err);
  }
});

When(/^I click by id "(.*)" button$/, async function (buttonLabel) {
  console.log('Clicking on login button');
  const clickedButton = await pages.login.populate(buttonLabel, 'click');
  console.log(`Login button was clicked: ${clickedButton}`);
});

Then('I should be on the login screen', async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log('Checking that we are on the login screen');
  const onLoginPage = await pages.login.getElement('btn_login');
  assert(onLoginPage, 'Expected to be on Login page');
});

When(/^I enter "(.*)" and "(.*)"$/, async function (username, password) {
  const loginFile = await loadLogin('failed');
  console.log(`Entering username: ${loginFile.username} and password`);
  // Write code here that turns the phrase above into concrete actions
  await pages.login.populate('txt_loginemail', loginFile.username);
  await pages.login.populate('txt_password', loginFile.password);
});

When(/^I save a variable "(.*)"$/, async function (saveVariable) {
  await pages.login.parse(saveVariable);
});
When('I test things', function () {
  // Write code here that turns the phrase above into concrete actions
  console.log('test steps:' + pages.mainPage.name);
});

Then(/^I should get a message that says "(.*)"$/, function (message) {
  // Write code here that turns the phrase above into concrete actions
  pages.login.assertText(
    'txt_loginFaled',
    '* You need a valid e-mail address and password to log in.'
  );
});

// -------------- Example code ---------------
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
