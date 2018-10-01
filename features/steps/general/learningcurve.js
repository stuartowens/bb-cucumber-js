const { Given, When, Then } = require('cucumber');
const { loadConfig } = require('../../../app/util');
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const { getDriver, sleep } = require('../../../app/driver');
const config = loadConfig('config');

let pages = {
  learningCurve: new PageObject('learning-curve.json', stepsPath)
};

Given(/^I have opened LC "(.*)"$/, async function (urlKey) {
  var url = config[urlKey];
  const epoch = new Date().getTime();
  url = url + 'lcrp/?user_id=fake_user_' + epoch + '&file=music%2Ftest%2Ffixtures-vitalsource-chucknorris&itemid=' + epoch + '&course_id=' + epoch;
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
});

When('I start a quiz', async function () {
  log.debug(`Start Quiz.`);
  await sleep(5000);
  await pages.learningCurve.populate('start_quiz_button', 'click');
});

Then('I answer a question', async function () {
  log.debug('Answer Question');
  await pages.learningCurve.populate('fill_in_the_blank', 'Chuck Norris');
});

Then('the submit answer buttons appears', async function () {
  log.debug('submit answer button');
  await pages.learningCurve.populate('submit_answer_button', 'click')
});

Then('the answer is correct', async function () {
  log.debug('Answer is correct');
  await pages.learningCurve.checkWebElementExists('successful_answer')
  await pages.learningCurve.populate('next_question', 'click')
});

Then('get to the midway point of a test and continue', async function () {
  while (true) {
    const question = await pages.learningCurve.getElementValue('question')
    if (!question.includes('alcohol')) {
      await pages.learningCurve.populate('fill_in_the_blank', 'Chuck Norris');
    } else {
      await pages.learningCurve.populate('fill_in_the_blank', '1.3');
    }
    await pages.learningCurve.populate('submit_answer_button', 'click')
    try {
      await pages.learningCurve.populate('next_question_midway', 'click');
      break;
    } catch (err) {
      // Do nothing
    }
    await pages.learningCurve.checkWebElementExists('successful_answer')
    await pages.learningCurve.populate('next_question', 'click')
  }
});

Then('finish the test', async function () {
  while (true) {
    const question = await pages.learningCurve.getElementValue('question')
    if (!question.includes('alcohol')) {
      await pages.learningCurve.populate('fill_in_the_blank', 'Chuck Norris');
    } else {
      await pages.learningCurve.populate('fill_in_the_blank', '1.3');
    }
    await pages.learningCurve.populate('submit_answer_button', 'click')
    try {
      await pages.learningCurve.populate('view_study_plan', 'click');
      break;
    } catch (err) {
      // Do nothing
    }
    await pages.learningCurve.checkWebElementExists('successful_answer')
    await pages.learningCurve.populate('next_question', 'click')
  }
});
