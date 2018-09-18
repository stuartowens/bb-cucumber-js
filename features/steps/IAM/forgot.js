const { When, Then, And } = require('cucumber');
const path = require('path');

const { loadConfig, loadLogin } = require('../../../app/util');
const { assert } = require('chai');
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const { getDriver, sleep} = require('../../../app/driver');
const emailid = Math.random().toString(36).substr(2, 6) + '@gmail.com'
var answer;
var value;
var account;
let pages = {
  authAdmin: new PageObject('auth-admin-role.json', stepsPath),
  mainPage: new PageObject('mainPage.json', stepsPath),
  login: new PageObject('loginPage.json', stepsPath),
  navigation: new PageObject('navigation.json', stepsPath)
}
When('I click on forgot link', async function () {
  try {
    log.debug('clicking on forgot_password');
    await pages.login.populate('forgot_password', 'click');
    log.debug(`forgot_password was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When('I click on cancel button', async function () {
  try {
    log.debug('clicking on cancle_button');
    await pages.login.populate('cancle_button', 'click');
    log.debug(`cancle_button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When(/^I enter newly created "(.*)" emailaddress$/, async function (account) {
  try {
    const user = await loadLogin(account);
    log.debug('clicking on email_address');
    await pages.login.populate('email_address', user.username );
    log.debug(`emailAddress was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When('click on reset password button', async function () {
  try {
    log.debug('clicking on resetPassword button');
    await pages.login.populate('reset_password', 'click');
    log.debug(`resetPassword button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I enter incorrect security answer for one time and correct security answer the second time', async function (dataTable) {
  value = dataTable;
});

Then('I enter the vaue with following data:', async function () {
  try {
    log.info(value.rows().length);
    var e;
    for (e = 0; e < value.rows().length; e++) {
      log.info(value.hashes()[e].SecurityQuestion);
      log.info(value.hashes()[e].Answer);
      await pages.login.populate(value.hashes()[e].SecurityQuestion, value.hashes()[e].Answer);
    }
  } catch (err) {
    log.error(err.stack);
  }
});
When('I click on back to login button', async function () {
  try {
    log.debug('clicking on backToLogin  button');
    await pages.login.populate('backto_login', 'click');
    log.debug(`backToLogin button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I enter incorrect Security questions for three times', async function (dataTable) {
  answer = dataTable;
});
Then('I answer the security questions with following data:', async function () {
  try {
    log.info(answer.rows().length);
    var e;
    for (e = 0; e < answer.rows().length; e++) {
      log.info(answer.hashes()[e].SecurityQuestions);
      log.info(answer.hashes()[e].Answers);
      await pages.login.populate(answer.hashes()[e].SecurityQuestions, answer.hashes()[e].Answers);
    }
  } catch (err) {
    log.error(err.stack);
  }
});

When('I enter the emailaddress of the account which is not registered in macmillan', async function () {
  try {
    log.debug('clicking on email_address');
    await pages.login.populate('email_address', emailid);
    log.debug(`emailAddress was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
