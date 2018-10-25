const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { sleep } = require('../../../app/driver');
const assert = require('assert');

let studentView = {
  landingPage: new PageObject('lc-student-view.json', stepsPath),
  quizPage: new PageObject('lc-quiz.json', stepsPath)
};

// Returns array of 3 values, 2nd is number of read readings 3rd is total readings.
const getReadingInfo = async function () {
  var readings = await studentView.landingPage.getElementValue('total_readings');
  var regex = /(\d+) of (\d+)/;
  return readings.match(regex)
}

const verifyEbook = async function (topic) {
  var ebookPanel = await studentView.landingPage.checkWebElementExists('ebook_pane');
  assert(ebookPanel, 'Ebook panel did not open.')
  var ebookTitle = await studentView.landingPage.getElementValue('ebook_iframe', 'name');
  assert(topic.trim() === ebookTitle.trim(), 'The wrong ebook opened, actually: ' + ebookTitle + '\n expected: ' + topic);
}

const parseQuestion = async function () {
  var questionText = await studentView.quizPage.getElementValue('whole_question');
  var question = questionText.split(/\n/g)[0];
  question = question.replace(/:/g, '":"');
  question = question.replace(/, /g, '","');
  question = '{"' + question + '"}';
  var questionObj = JSON.parse(question);
  return questionObj;
}

const checkLevel = async function (question) {
  var points = 5;
  await sleep(500)
  switch (question.Type) {
    case 'FB':
      points = points + 5 + parseInt(question.Level) * 10;
      break;
    default:
      points = points + parseInt(question.Level) * 10;
  }
  // Need to keep state for 'rushing' to handle points later
  var pointsString = await studentView.quizPage.getElementValue('question_points')
  var regex = /Question Value: (\d+) points/;
  var pointList = pointsString.match(regex)
  if (question.incorrect) {
    assert(parseInt(pointList[1]) < points, 'Question level: ' + question.Level + '\nExpected ' + pointList[1] + ' to be less than ' + points)
  } else {
    assert(parseInt(pointList[1]) === points, 'Question level: ' + question.Level + '\nExpected ' + points + '\nActually: ' + pointList[1])
  }
  return pointList[1];
}

const answerQuestion = async function (question, answer) {
  await sleep(5000)
  switch (question.Type) {
    case 'FB':
      await studentView.quizPage.populate('fill_in_the_blank_answer', answer)
      await sleep(500)
      await studentView.quizPage.populate('submit_answer', 'click');
      break;
    case 'SC':
      if (answer === 'Correct') {
        await studentView.quizPage.populate('correct_sentense_select', 'click')
      } else {
        await studentView.quizPage.populate('incorrect_sentense_select', 'click')
      }
      break;
    case 'MC':
      var ordered = question.Ordered;
      var answerList = await studentView.quizPage.getWebElements('mc_answers');
      for (var i = 0; i < answerList.length; i++) {
        var text = await answerList[i].getText();
        if (ordered) {
          assert(text.includes(i.toString()) > -1, 'The index was not correct. \n Expected: ' + i + '\nActually: ' + text.charAt(text.length - 1));
        }
        if (text.includes(answer)) {
          await answerList[i].click()
        }
      }
      await sleep(500)
      await studentView.quizPage.populate('submit_answer', 'click');
      break;
  }
}

const orderedQuestionCheck = async function () {

}

module.exports = {
  getReadingInfo,
  verifyEbook,
  parseQuestion,
  checkLevel,
  answerQuestion,
  orderedQuestionCheck
}
