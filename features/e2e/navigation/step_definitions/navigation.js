// features/support/steps.js
const { Given, When, Then } = require('cucumber');
const path = require('path');
const { loadConfig, loadLogin } = require('../../../../app/util');
const { getDriver } = require('../../../../app/driver');

const { PageObject } = require('../../../../app/pageObject');
const { log } = require('../../../../app/logger');

const config = loadConfig('config');

// Scenario setup
let pages = {
  navigation: new PageObject('navigation.json', path.join(__dirname, '/'))
};

Given(/^That I have opened the Achieve "(.*)"$/, async function (urlKey) {
  const url = config[urlKey];
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
});

When(/^I have logged in as "(.*)"$/, async function (userFile) {
  try {
    const user = loadLogin(userFile);
    log.debug(`Using user ${user.username}`);
    await pages.navigation.populate('txt_username', user.username);
    await pages.navigation.populate('txt_password', user.password);

    await pages.navigation.populate('signin_button', 'click');
    log.debug(`Login button was clicked:`);
  } catch (err) {
    log.error(err.stack);
    throw err;
  }
});

Then('I sign out of Achieve', async function () {
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
});
