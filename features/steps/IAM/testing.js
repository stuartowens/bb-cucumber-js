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

Then(/^I search for the "(.*)"$/, async function (value) {
  try {
    log.debug('Clicking on search_course');
    await sleep(10000);
    await pages.authAdmin.populate('search_course', value);
    log.debug(`search_course was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  await sleep(10000);
});

Then(/^I manage instructors on the course and add the "(.*)" loginUser$/, async function (username) {
  try {
    const login = await loadLogin(username);
    log.debug('Instructor email is clicked');
    await pages.authAdmin.populate('Instructor_Email', login.username);
    log.debug(`Adding Instructor: ${username}`);
  } catch (err) {
    log.error(err);
  }
});
