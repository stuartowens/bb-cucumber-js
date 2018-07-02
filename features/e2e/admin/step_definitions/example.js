'use strict';
const { When, Then } = require('cucumber');
const { log } = require('../../../../app/logger');

const StringProcessing = require('../../../../app/stringProcessing');
const ScenarioData = require('../../../../app/scenarioData');

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
