// features/support/steps.js
const { Given, When, Then } = require('cucumber');
const path = require('path');

const { PageObject, getDriver } = require('../../../../app/PageObject');

let pages = {
  mainPage: new PageObject('mainPage.json', path.join(__dirname, '/')),
  login: new PageObject('loginPage.json', path.join(__dirname, '/'))
};

Given('I am on the website I want to test', async function () {
  await getDriver().get('https:\\macmillanlearning.com');
});
