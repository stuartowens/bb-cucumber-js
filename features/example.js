'use strict';
const { When, Then } = require('cucumber');
const path = require('path');

const { log } = require('../app/logger');
const { PageObject } = require('../app/pageObject');
const StringProcessing = require('../app/stringProcessing');
const ScenarioData = require('../app/scenarioData');

When(/^I want to test (.*) and (.*)$/, async function (user, random) {
  try {
    var that = {
      ScenarioData: ScenarioData
    };
    let sp = StringProcessing(that.ScenarioData);

    let username = sp.strEval(user);
    let somerandom = sp.strEval(random);
    log.debug(`Finished ${username} - ${somerandom}`);
  } catch (err) {
    log.error(err.stack);
  }
});

When(/^I want to load (.*) from json$/, async function (dataFileAndField) {
  try {
    const that = {
      ScenarioData: ScenarioData
    };
    let sp = StringProcessing(that.ScenarioData);
    let fieldValue = sp.strEval(dataFileAndField);
    log.debug(`Got Data Field ${dataFileAndField} - ${fieldValue}`);
  } catch (err) {
    log.error(err.stack);
  }
});

Then(/^I want assert "(.*)" matches "(.*)"$/, async function (dataFileAndField, assertValue) {
  try {
    const authAdmin = new PageObject('mainPage.json', path.join(__dirname, '/e2e/main/step_definitions/'))
    await authAdmin.assertText(dataFileAndField, assertValue);
    log.debug(`Asserted Data Field ${dataFileAndField} - ${assertValue}`);
  } catch (err) {
    log.error(err.stack);
  }
});

Then(/^I visually confirm that date (.*) will /, async function (date) {
  try {
    let that = {ScenarioData};
    let sp = StringProcessing(that.ScenarioData);
    let datetime = new Date(sp.strEval(date))
    log.debug(`-----`);
    log.debug(datetime)
    log.debug(`-----`);
  } catch (err) {
    log.error(err.stack);
  }
});

Then(/^I visually confirm it failed that login data is bad (.*) has error /, async function (login) {
  try {
    let that = {ScenarioData};
    let sp = StringProcessing(that.ScenarioData);
    let username = sp.strEval(login);
    if (!username) {
      throw new Error(`Nothing was found for: ${login}`);
    }
    log.debug(`Found username ${username} from ${login}`);
  } catch (err) {
    log.error(err.stack);
  }
});

Then(/^I visually confirm that login data (.*) /, async function (login) {
  let that = {ScenarioData};
  let sp = StringProcessing(that.ScenarioData);
  let username = sp.strEval(login);
  log.debug(`Found username ${username} from ${login}`);
});
