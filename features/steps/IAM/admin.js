const path = require('path');

const { When, Then } = require('cucumber');
const { loadConfig, loadLogin } = require('../../../app/util');

const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const {getDriver, sleep} = require('../../../app/driver');
const emailid = Math.random().toString(36).substr(2, 6) + '@gmail.com';

// Scenario setup
let pages = {
  authAdmin: new PageObject('auth-admin-role.json', stepsPath)
}

When('I click on user menu', async function () {
  try {
    log.debug('Clicking menu_system button');
    await pages.authAdmin.populate('menu_system', 'click');
    log.debug(`menu_system was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  await sleep(5000);
});
When('I click on Admin Panel', async function () {
  try {
    log.debug('Clicking admin_panel button');
    await pages.authAdmin.populate('admin_panel', 'click');
    log.debug(`admin_panel was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I click on Password reset', async function () {
  try {
    log.debug('Clicking password_reset button');
    await pages.authAdmin.populate('password_reset', 'click');
    log.debug(`password_reset button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I click on Close Icon', async function () {
  try {
    log.debug('Clicking close button');
    await pages.authAdmin.populate('close', 'click');
    log.debug(`close button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I enter Invalid E-mail Address not regitered in macmillan account', async function () {
  try {
    log.debug('Clicking password_reset_input button');
    await pages.authAdmin.populate('password_reset_input', emailid);
    log.debug(`password_reset_input button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I click on Reset button', async function () {
  try {
    log.debug('Clicking reset_button ');
    await pages.authAdmin.populate('reset_button', 'click');
    log.debug(` reset_button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then(/^I enter "(.*)" which is registered in macmillan account$/, async function (passwordreset) {
  const loginFile = await loadLogin(passwordreset);
  try {
    log.debug('Clicking password_reset_input button');
    await pages.authAdmin.populate('password_reset_input', loginFile.username);
    log.debug(`password_reset_input button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When(/^I log in as "(.*)"$/, async function (Login) {
  const account = await loadLogin(Login);
  try {
    log.debug(`Entering account details: ${account}`);
    await pages.authAdmin.populate('temp_username', account.username);
    await pages.authAdmin.populate('temp_next', 'click');
    await sleep(5000);
    await pages.authAdmin.populate('temp_password', account.password);
    await pages.authAdmin.populate('temp_password_next', 'click');
  } catch (err) {
    log.error(err);
  }
});
When('I check E-mail Notification', async function () {

});
