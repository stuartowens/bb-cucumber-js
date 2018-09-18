const { When, Then} = require('cucumber');
const path = require('path');
const { By} = require('selenium-webdriver');
const { loadConfig, loadLogin } = require('../../../app/util');
const { assert } = require('chai');
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const { getDriver, sleep} = require('../../../app/driver');
var dt;
let pages = {
  createAccount: new PageObject('createAccount.json', stepsPath),
  navigation: new PageObject('navigation.json', stepsPath)
}

/* When('I enter firstname and lastname', async function (dataTable) {
  dt = dataTable;
});
Then('I enter the details as per below criteria', async function () {
  log.debug(`I populated table`);
  try {
    log.info(dt.rows().length);
    var e;
    for (e = 0; e < dt.rows().length; e++) {
      log.info(dt.hashes()[e].firstname);
      log.info(dt.hashes()[e].lastname);
      await pages.authProducer.populate(dt.hashes()[e].firstname, dt.hashes()[e].lastname);
    }
  } catch (err) {
    log.error(err.stack);
  }

}); */

/*When('I dont enter firstname', async function () {
  try {
    log.debug('clicking firstname button');
    await pages.createAccount.populate('firstName', '   ');
    log.debug(`firstname button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I enter firstname with numbers', async function () {
  try {
    log.debug('clicking firstname button');
    await pages.createAccount.populate('firstName', '11234');
    log.debug(`firstname button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I enter firstnamewith symbols', async function () {
  try {
    log.debug('clicking firstname button');
    await pages.createAccount.populate('firstName', 'r$b*');
    log.debug(`firstname button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});*/

When(/^ I dont enter firstname "\"([^\"]*)\" $/, async function (account) {
  const login = await loadLogin(account);
  await pages.createAccount.populate('firstName', login.firstName)
});
