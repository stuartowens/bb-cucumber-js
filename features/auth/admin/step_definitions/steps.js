// features/support/steps.js
const { Given, When, Then } = require('cucumber');
const path = require('path');
const { loadConfig, loadLogin } = require('../../../../app/util');
const { getDriver, sleep } = require('../../../../app/driver');

const { PageObject } = require('../../../../app/pageObject');

const config = loadConfig('config');
// Scenario setup

let pages = {
  authAdmin: new PageObject('auth-admin.json', path.join(__dirname, '/')),
  authInstructor: new PageObject('auth-instructor.json', path.join(__dirname, '/'))
};

Given(/^That I have opened the Achieve "(.*)"$/, async function (urlKey) {
  const url = config[urlKey];
  console.log(`Loading URL ${url}`);
  await getDriver().get(url);
});

When(/^I have logged in as "(.*)"$/, async function (userFile) {
  try {
    await sleep(3000);
    const user = loadLogin(userFile);
    console.log(`Using user ${user.username}`);
    await pages.authAdmin.populate('txt_username', user.username);
    await pages.authAdmin.populate('txt_password', user.password);
  
    await pages.authAdmin.populate('signin_button', 'click');
    console.log(`Login button was clicked:`);
  } catch (err) {
    console.error(err);
    throw err;
  }
});

When(/^I elect to manage the role of (.*)$/, async function (email) {
  await sleep(1000);
  await pages.authAdmin.populate('menu_system', 'click');
  await sleep(1000);
  await pages.authAdmin.populate('admin_panel', 'click');
  await sleep(1000);
  await pages.authAdmin.populate('manage_roles', 'click');
  await sleep(1000);
  await pages.authAdmin.populate('enter_email_address', email);
});

When(/^I grant the role of (.*)$/, async function (role) {
  console.log(`Grant Role email: ${role}`);
  await sleep(1000);
  await pages.authAdmin.populate('choose_role', role);
  await sleep(1000);
  await pages.authAdmin.populate('grant_role', 'click');
  await sleep(10000);
});

When(/^I revoke the role of (.*)$/, async function (role) {
  console.log(`Revoke Role email: ${role}`);
  await sleep(1000);
  await pages.authAdmin.populate('choose_role', role);
  await sleep(1000);
  await pages.authAdmin.populate('revoke_role', 'click');
  await sleep(10000);
});

Then('Verify Successful permission grant message', async function () {

});

Then('I sign out of Achieve', async function () {
  await sleep(1000);
  await pages.authAdmin.populate('menu_system', 'click');
  await sleep(1000);
  await pages.authAdmin.populate('logout', 'click');
});
