/**
 * http://usejsdoc.org/
 */
'use strict';

const HashTable = require('./hashtable');
const StringProcessing = require('./StringProcessing');
const ScenarioData = require('./scenariodata');
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

  const addElement = async function (elementName, elements) {
    that.pageElements.setItem(elementName, elements);
  }

  const getElement = async function (elementName) {
    return that.pageElements.getItem(elementName);
  }

  const hasElement = async function (elementName) {
    return that.pageElements.hasItem(elementName);
  }

  const loadPageDefinitionFile = async function (fullFileName) {
    log.debug(`Opening file ${fullFileName} from ${__filename} `);
    var jsonContent = await loadJSONFile(fullFileName);

    for (var i in jsonContent.webElements) {
      var element = jsonContent.webElements[i];
      await addElement(element.name, element)
      log.debug(`Adding Element - name: "${element.name}", type: "${element.byType}", value: "${element.definition}"`);
    }
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
      if (tempElement && tempElement.waitToBeVisibleonNextPage) {
        if (await hasElement(tempElement.waitToBeVisibleonNextPage)) {
          const waitToBeVisibleonNextPage = await getElement(tempElement.waitToBeVisibleonNextPage);
          actionElement.waitToBeVisibleonNextPage = waitToBeVisibleonNextPage;
        }
      }

      // If need to hit a iframe, do it
      await switchFrame(tempElement.frame);

      elementTarget = await WebElement(tempElement);
      actionElement.webElement = elementTarget;

      log.debug(`****genericPopulateElement: ${elementName}`);
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
        default:
          log.error(`ERROR: We tried to populate an unknown tag(${elementName}) with data in populateGenericElement()\n\tWe failed.`);
      }
    } else {
      log.error(`ERROR: WebElement ${elementName} not found in PageElements during PopulateElement() attempt.`);
    }
  };

  const populateElement = async function (strName, strValue) {
    try {
      log.info(`INFO: Starting populate the web element: ${strName} with value ${strValue}`);
      // console.log(`INFO++: WorldData: ${this.worldData}`);

      strValue = await sp.strEval(strValue);

      await genericPopulateElement(strName, strValue);
    } catch (err) {
      log.error(err.stack);
      throw err;
    }
  };

  const assertText = async function (strName, strValue) {
    try {
      log.info(`Starting text assertion: ${strName} with value ${strValue}`);

      strValue = await sp.strEval(strValue);
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
  that.populateElement = populateElement;
  loadPageDefinitionFile(that.pageDefinitionFileName)
  return that;
}

module.exports = { PageObject };
