const { When, Then} = require('cucumber');
const path = require('path');
const { By} = require('selenium-webdriver');
const { loadConfig, loadLogin, loadData, loadDataTable} = require('../../../app/util'); 
const { assert } = require('chai');
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const { getDriver, sleep} = require('../../../app/driver');
let pages = {
  authAdmin: new PageObject('auth-admin-role.json', stepsPath),
  mainPage: new PageObject('mainPage.json', stepsPath),
  login: new PageObject('loginPage.json', stepsPath),
  navigation: new PageObject('navigation.json', stepsPath)
}

When('I click on create an account button', async function () {
  try {
    console.log('Clicking on create_account button');
    await pages.navigation.populate('create_account_button', 'click');
    console.log(`create_account button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I hover on icon "i"', async function () {
  try {
    console.log('Clicking on view_box button');
    await pages.login.populate('view_box', 'click');
    console.log(`view box button was clicked: ${clickedButton}`);
  }catch (err) {
    log.error(err);
  }
});

Then('I click on forgot password link above password field text field', async function () {
  try {
    console.log('clicking on forgot button');
    await pages.login.populate('forgot_password', 'click');
    console.log(`forgot button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When('I login using invalid login credentials for 6 times', async function (dataTable) {
  invalid = dataTable;
});

Then('I login with following credentials:', async function () {
  try {
    log.info(invalid.rows().length);
    var e;
    for (e = 0; e < invalid.rows().length; e++) {
      log.info(invalid.hashes()[e].UserName );
      log.info(invalid.hashes()[e].Password);
      await pages.login.populate(invalid.hashes()[e].UserName , invalid.hashes()[e].Password );
    }
  } catch (err) {
    log.error(err.stack);
  }
});

Then(/^I Verify that it is able to login with valid "(.*)" details$/, async function (user) {
  try{
    const account = await loadLogin(user);
    log.debug('Validating the account details');
    await pages.login.populate('txt_username', account.username);
    await pages.login.populate('txt_password', account.password);
   } catch (err) {
   log.error(err);
   }
});

 Then('I click on help Link', async function () {
  try{
    log.debug('clicking on help link');
    await pages.login.populate('help_link', 'click');
    log.debug(`help_link was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
 });

/* Then('I click on help Link', async function () {
  try {
    parent = getDriver().getWindowHandle();
    getDriver().getWindowHandle().then(function (mainWindowHandle) {
      console.log('Main window handle is ' + mainWindowHandle);
      getDriver().findElement(By.partialLinkText('Help')).click();

      getDriver().getAllWindowHandles().then(function (windowHandles) {
        console.log('Total number of windows ' + windowHandles.length);
        // Here you can switch to the another window using windowHandles variable
        windowHandles.forEach(function (handle) {
          if (!(handle === mainWindowHandle)) {
            // Switch to new browser window
            console.log('Switching to other window');
            getDriver().switchTo().window(handle);
            getDriver().getTitle().then(function (title) {
              console.log('Title of new window -> ' + title);
            });
          }
        });
      });
      // Switch to original window
      // getDriver().switchTo().window(mainWindowHandle);
      getDriver().switchTo().window(parent);
      console.log(getDriver().getTitle());
      getDriver().getTitle().then(function (title) {
        console.log('Title of original window -> ' + title);
      });
    });
  } catch (err) {
    log.error(err);
  }
}); */
