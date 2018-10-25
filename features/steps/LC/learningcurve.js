const { Given, When, Then, AfterAll } = require('cucumber');
const { loadConfig } = require('../../../app/util');
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const { getDriver, sleep } = require('../../../app/driver');
const config = loadConfig('config');
const lcInfo = loadConfig('lc/lc_info');
const assert = require('assert');
const helper = require('./lc-helper');

let studentView = {
  landingPage: new PageObject('lc-student-view.json', stepsPath),
  quizPage: new PageObject('lc-quiz.json', stepsPath)
};

var currentScore = 0;
var targetScore = 0;
var totalPossible = 0;

Given(/^I log into "(.*)" as "(.*)"$/, async function (urlKey, user) {
  var url = config[urlKey];
  const epoch = new Date().getTime();
  if (lcInfo.course === undefined) {
    lcInfo.course = epoch;
  }
  if (lcInfo.assignment === undefined) {
    lcInfo.assignment = epoch;
  }
  url = url + '?user_id=' + lcInfo[user].user_id + '&file=music%2Ftest%2Fautomation_test_51F1C3&itemid=' + lcInfo.assignment + '&course_id=' + lcInfo.course + '&isfqtoolreferred=V7MkHewcPm5U4Cg4';
  if (user === 'instructor') {
    url += '&view=instructor'
  }
  console.log(`Loading URL ${url}`);
  await getDriver().get(url);
  await sleep(5000);
});

Given('I start a new assignment', async function () {
  const epoch = new Date().getTime();
  lcInfo.assignment = epoch;
})

Given('I start a new course', async function () {
  const epoch = new Date().getTime();
  lcInfo.course = epoch;
})

When('I view the student landing page for LCRP', async function () {
  var results = await helper.getReadingInfo();
  if (results[1] !== results[2]) {
    var lockVisiable = await studentView.landingPage.checkWebElementExists('reading_lock_lcrp');
    assert(lockVisiable, 'Lock is not present with readings that are unread.');
  } else {
    var startQuiz = await studentView.landingPage.checkWebElementExists('start_quiz_button_lcrp');
    assert(startQuiz, 'When readings are read/none exists, take quiz should be visible.')
  }
});

When('I click on a reading the ebook view opens', async function () {
  var readList = await studentView.landingPage.getWebElements('reading_list_lcrp');
  if (readList.length > 0) {
    var topic = await readList[0].getText();
    readList[0].click();
    await sleep(500);
    await helper.verifyEbook(topic);
  }
});

When('I read the rest of the ebooks the quiz button is shown', async function () {
  var readingCount = await helper.getReadingInfo();
  for (var i = 0; i < readingCount[2]; i++) {
    var readList = await studentView.landingPage.getWebElements('reading_list_lcrp');
    var topic = await readList[i].getText();
    readList[i].click();
    await sleep(500);
    await helper.verifyEbook(topic);
  }
})

Then('I can start the assessment', async function () {
  var quizButton = await studentView.landingPage.checkWebElementExists('start_quiz_button_lcrp');
  assert(quizButton, 'The Quiz button was not displayed.')
  await studentView.landingPage.populate('start_quiz_button_lcrp', 'click');
  var score = await studentView.quizPage.getElementValue('current_score');
  var scores = score.split(/\//)
  targetScore = scores[1];
})

Given(/I see a question, I can answer it "(.*)"/, async function (answer) {
  var question = await helper.parseQuestion();
  totalPossible += parseInt(await helper.checkLevel(question));
  await helper.answerQuestion(question, answer);
  if (answer === 'Correct') {
    currentScore += parseInt(await helper.checkLevel(question));
  } else {
    // evaluate incorrect answer page
    if (question.Type !== 'FB') {
      question.incorrect = true;
    }
    await helper.answerQuestion(question, 'Correct');
    currentScore += parseInt(await helper.checkLevel(question));
  }
  // evalutate correct answer page
  await studentView.quizPage.populate('next_question', 'click');
})
Given('I see a question, I can open the ebook', async function () {
  var question = await helper.parseQuestion();
  await studentView.quizPage.populate('open_ebook', 'click');
  await helper.verifyEbook(question.ebook);
  await studentView.quizPage.populate('close_ereader', 'click')
})

Then('I complete 50% of the assignment', async function () {
  while (currentScore / targetScore < 0.5) {
    var question = await helper.parseQuestion();
    totalPossible += parseInt(await helper.checkLevel(question));
    await helper.answerQuestion(question, 'Correct');
    currentScore += parseInt(await helper.checkLevel(question));
    if (currentScore / targetScore < 0.5) {
      await studentView.quizPage.populate('next_question', 'click');
    } else {
      assert(await studentView.quizPage.checkWebElementExists('midway_modal'), 'Midway modal did not exist after 50% of the target score had been reached.')
      await studentView.quizPage.populate('next_question_midway', 'click');
    }
  }
})

When('I am done with an assessment, I see my score and can retake the assessment', async function () {
  var retakeButton = await studentView.landingPage.checkWebElementExists('retake_quiz');
  assert(retakeButton, 'The Retake button does not exist after completing an assignment');
  //Also Check Score
})

Then('I complete 100% of the assignment', async function () {
  while (currentScore / targetScore < 1) {
    var question = await helper.parseQuestion();
    totalPossible += parseInt(await helper.checkLevel(question));
    await helper.answerQuestion(question, 'Correct');
    currentScore += parseInt(await helper.checkLevel(question));
    if (currentScore / targetScore < 1) {
      await studentView.quizPage.populate('next_question', 'click');
    } else {
      await studentView.quizPage.populate('complete_quiz_lcrp', 'click');
    }
  }
  console.log('Current Score: ' + currentScore + '\nPossible Score: ' + totalPossible + '\n Target Score: ' + targetScore);
})

Given('A question I can get a hint', async function () {})
Given('A question I can get the answer', async function () {})

AfterAll(function () {
  getDriver().quit();
  return Promise.resolve();
});