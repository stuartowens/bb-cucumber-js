/**
 * http://usejsdoc.org/
 */
'use strict';
const { assert } = require('chai');

const HashTable = require('./hashtable');
const StringProcessing = require('./stringProcessing');
const ScenarioData = require('./scenarioData');
const WebElement = require('./WebElement');
const { loadJSONFile } = require('./util');
const { getDriver, getWebDriver } = require('./driver');
const { log } = require('./logger');

const { populateInput, populateClick, populateSelect, populateTextField } = require('./populate');

const PageObject = function (pageNameInput, pageNameDirectoryInput) {
  var that = {};
  that.ScenarioData = ScenarioData;

  let sp = StringProcessing(that.ScenarioData);
  that.sp = sp;
  that.pageName = pageNameInput;
  that.pageDefinitionFileName = pageNameDirectoryInput + pageNameInput;
  that.pageElements = new HashTable({}); // a hash of all of the web elements for this page.

  that.driver = getDriver();
  that.webdriver = getWebDriver();

  log.debug(`New PageObject: ${pageNameInput}`);

  const loadPageDefinitionFile = function (fullFileName) {
    log.debug(`Opening file ${fullFileName} from ${__filename} `);
    var jsonContent = loadJSONFile(fullFileName);

    for (var i in jsonContent.webElements) {
      var element = jsonContent.webElements[i];
      addElement(element.name, element)
      log.debug(`Adding Element - name: "${element.name}", type: "${element.byType}", value: "${element.definition}"`);
    }
  }

  const addElement = function (elementName, elements) {
    that.pageElements.setItem(elementName, elements);
  }

  const getElement = async function (elementName) {
    return that.pageElements.getItem(elementName);
  }

  const hasElement = async function (elementName) {
    return that.pageElements.hasItem(elementName);
  }

  const switchFrame = async function (elementName) {
    // log.debug('Checking need to switch to iframe');
    let isNumber = true;
    if (typeof elementName !== 'number') {
      isNumber = false;
    }
    // elementName is the name of the frame element in the json file. if it is default, switch to frame(0)
    if ((!isNumber && !elementName) || elementName === 'default') {
      // log.debug('Do nothing, no frame set: ' + elementName);
    } else { // else , look up the frame element in the hash table. get the webElement for the frame switch to the frame.
      if (isNumber) {
        log.debug('Switching Frame to frame via number(' + elementName + ')');
        that.driver.switchTo().frame(elementName);
      } else {
        var frameElementObj = await getElement(elementName);
        that.driver.switchTo().frame(frameElementObj.definition);
      }
    }
  }

  const genericPopulateElement = async function (elementName, value) {
    let elementTarget = '';
    let tempElement = {};

    if (await hasElement(elementName)) {
      tempElement = await getElement(elementName);
      const actionElement = Object.assign({});

      // Setup all underlying required objects to take action on for this action
      actionElement.element = tempElement;
      if (tempElement && tempElement.waitForElementToBeInvisible) {
        if (await hasElement(tempElement.waitForElementToBeInvisible)) {
          const elementToWaitToBeInvisible = await getElement(tempElement.waitForElementToBeInvisible);
          actionElement.elementToWaitToBeInvisible = elementToWaitToBeInvisible;
        }
      }
      if (tempElement && tempElement.waitToBeVisible) {
        if (await hasElement(tempElement.waitToBeVisible)) {
          const waitToBeVisible = await getElement(tempElement.waitToBeVisible);
          actionElement.waitToBeVisible = waitToBeVisible;
        }
      }

      // If need to hit a iframe, do it
      await switchFrame(tempElement.frame);

      elementTarget = await WebElement(tempElement);
      actionElement.webElement = elementTarget;

      // log.debug(`****genericPopulateElement: ${elementName}`);
      log.info(`Info: Page Element ${elementName} retrieved from Page Elements collection.`);

      const webElement = await elementTarget.getWebElement();
      const tagName = await webElement.getTagName();

      switch (tagName.toLowerCase()) {
        case 'input':
          await populateInput(webElement, value, actionElement);
          break;
        case 'textarea':
          await populateTextField(webElement, value, actionElement);
          break;
        case 'a':
          await populateClick(webElement, value, actionElement);
          break;
        case 'button':
          await populateClick(webElement, value, actionElement);
          break;
        case 'div':
          await populateClick(webElement, value, actionElement);
          break;
        case 'span':
          await populateClick(webElement, value, actionElement);
          break;
        case 'ul':
          await populateClick(webElement, value, actionElement);
          break;
        case 'select':
          await populateSelect(webElement, value, actionElement);
          break;
        case 'svg':
          await populateSelect(webElement, value, actionElement);
          break;
        case 'p':
          await populateSelect(webElement, value, actionElement);
          break;
        default:
          log.error(`ERROR: We tried to populate an unknown tag(${elementName}) with data in populateGenericElement()\n\tWe failed.`);
      }
    } else {
      log.error(`ERROR: WebElement ${elementName} not found in PageElements during PopulateElement() attempt.`);
    }
  };

  const getElementValue = async function (elementName) {
    if (await hasElement(elementName)) {
      let tempElement = {};
      tempElement = await getElement(elementName);
      await switchFrame(tempElement.frame);

      const elementTarget = await WebElement(tempElement);
      const webElement = await elementTarget.getWebElement();
      const returnValue = await webElement.getText();
      return returnValue;
    } else {
      throw new Error(`Element ${elementName} not found.`);
    }
  }

  const populateElement = async function (strName, strValue) {
    try {
      log.info(`Starting populate the web element: ${strName} with value ${strValue}`);

      strValue = await sp.strEval(strValue);

      await genericPopulateElement(strName, strValue);
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };
  const elementExists = async function (strName) {
    try {
      log.info(`Starting to check if web element exists on the page: ${strName}`);

      return await checkWebElementExists(strName);
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const checkWebElementExists = async function (elementName) {
    let elementTarget = '';
    let tempElement = {};
    log.debug(`Checking to see if element: ${elementName} exists.`)
    if (await hasElement(elementName)) {
      tempElement = await getElement(elementName);
      const actionElement = Object.assign({});

      // Setup all underlying required objects to take action on for this action
      actionElement.element = tempElement;
      /* if (tempElement && tempElement.waitForElementToBeInvisible) {
        if (await hasElement(tempElement.waitForElementToBeInvisible)) {
          const elementToWaitToBeInvisible = await getElement(tempElement.waitForElementToBeInvisible);
          actionElement.elementToWaitToBeInvisible = elementToWaitToBeInvisible;
        }
      }
      if (tempElement && tempElement.waitToBeVisible) {
        if (await hasElement(tempElement.waitToBeVisible)) {
          const waitToBeVisible = await getElement(tempElement.waitToBeVisible);
          actionElement.waitToBeVisible = waitToBeVisible;
        }
      }
*/
      // If need to hit a iframe, do it
      await switchFrame(tempElement.frame);

      elementTarget = await WebElement(tempElement);
      actionElement.webElement = elementTarget;

      // log.debug(`****genericPopulateElement: ${elementName}`);
      log.info(`Info: Page Element ${elementName} retrieved from Page Elements collection for exists check.`);

      // const webElement = await elementTarget.getWebElement();
      return elementTarget.elementExists();
    } else {
      log.error(`ERROR: WebElement ${elementName} not found in PageElements during checkWebElementExists() attempt.`);
    }
  };

  const assertText = async function (elementName, expectedValue) {
    try {
      const evalString = await getElementValue(elementName);
      log.debug(`Expected "${elementName}" -> "${evalString}" to equal "${expectedValue}"`);
      assert(evalString === expectedValue, `Expected ${elementName} -> ${evalString} to equal ${expectedValue}`);
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };
  that.assertText = assertText;
  that.getElement = getElement;
  that.hasElement = hasElement;
  that.getDriver = getDriver;
  that.populate = populateElement;
  that.getElementValue = getElementValue;
  that.populateElement = populateElement;
  that.elementExists = elementExists;
  that.checkWebElementExists = checkWebElementExists;
  loadPageDefinitionFile(that.pageDefinitionFileName);
  return that;
}

module.exports = { PageObject };
