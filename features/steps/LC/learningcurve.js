const { Given, When, Then, AfterAll } = require('cucumber');
const { loadConfig } = require('../../../app/util');
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const { getDriver, sleep } = require('../../../app/driver');
const config = loadConfig('config');
const assert = require('assert');

let studentView = {
  landingPage: new PageObject('lc-student-view.json', stepsPath),
  quizPage: new PageObject('lc-quiz.json', stepsPath)
};

Given(/^I have opened LCRP "(.*)" "(.*)"$/, async function (urlKey, topic) {
  var url = config[urlKey];
  const epoch = new Date().getTime();
  if (topic === 'Automation') {
    url = url + 'lcrp/?user_id=fake_user_' + epoch + '&file=music%2Ftest%2Fautomation_test_51F1C3&itemid=' + epoch + '&course_id=' + epoch;
  } else if (topic === 'Norris') {
    url = url + 'lcrp/?user_id=fake_user_' + epoch + '&file=music%2Ftest%2Ffixtures-vitalsource-chucknorris&itemid=' + epoch + '&course_id=' + epoch;
  } else {
    url = url + 'lcrp/?user_id=fake_user_' + epoch + '&file=music%2Ftest%2Ffixtures-vitalsource-history&itemid=' + epoch + '&course_id=' + epoch;
  }
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
  await sleep(5000);
});

Given(/^I have opened LC "(.*)" "(.*)"$/, async function (urlKey, topic) {
  var url = config[urlKey];
  const epoch = new Date().getTime();
  if (topic === 'Automation') {
    url = url + '?user_id=fake_user_' + epoch + '&file=music%2Ftest%2Fautomation_test_51F1C3&itemid=' + epoch + '&course_id=' + epoch;
  } else if (topic === 'Norris') {
    url = url + '?user_id=fake_user_' + epoch + '&file=music%2Ftest%2Ffixtures-vitalsource-chucknorris&itemid=' + epoch + '&course_id=' + epoch;
  } else {
    url = url + '?user_id=fake_user_' + epoch + '&file=music%2Ftest%2Ffixtures-vitalsource-history&itemid=' + epoch + '&course_id=' + epoch;
  }
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
  await sleep(5000);
});

When('I Launch an LCRP Activity I can not start the quiz while readings are unread.', async function () {

  await studentView.landingPage.checkWebElementExists('reading_lock_lcrp');

});

AfterAll(function () {
  getDriver().quit();
  return Promise.resolve();
});
