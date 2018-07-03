// features/support/steps.js

const path = require('path');

const { When, Then } = require('cucumber');

const { PageObject } = require('../../../../app/pageObject');
const { log } = require('../../../../app/logger');

// Scenario setup
let pages = {
  authAdmin: new PageObject('auth-admin-role.json', path.join(__dirname, '/')),
  authInstructor: new PageObject('auth-instructor.json', path.join(__dirname, '/'))
};

When(/^I elect to manage the role of (.*)$/, async function (email) {
  await pages.authAdmin.populate('menu_system', 'click');
  await pages.authAdmin.populate('admin_panel', 'click');
  await pages.authAdmin.populate('manage_roles', 'click');
  await pages.authAdmin.populate('enter_email_address', email);
});

When(/^I grant the role of (.*)$/, async function (role) {
  log.debug(`Grant Role email: ${role}`);
  await pages.authAdmin.populate('choose_role', role);
  await pages.authAdmin.populate('grant_role', 'click');
});

When(/^I revoke the role of (.*)$/, async function (role) {
  log.debug(`Revoke Role email: ${role}`);
  await pages.authAdmin.populate('choose_role', role);
  await pages.authAdmin.populate('revoke_role', 'click');
});

Then('Verify Successful permission grant message', async function () {
  await pages.authAdmin.assertText('choose_role', 'Admin');
});
