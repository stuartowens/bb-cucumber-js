/**
 * http://usejsdoc.org/
 */
'use strict';

const HashTable = require('./HashTable');
const StringProcessing = require('./StringProcessing');
const ScenarioData = require('./ScenarioData');
const WebElement = require('./WebElement');
const fs = require('fs');
const { populateInput, populateClick, populateSelect, populateTextField } = require('./Populate');


// ------------ Start up the chrome server ------------
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromePath = require('chromedriver').path;

const service = new chrome.ServiceBuilder(chromePath).build();
chrome.setDefaultService(service);

const driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
  .build();

const PageObject = function (pageNameInput, pageNameDirectoryInput) {
  var that = {};
  that.ScenarioData = ScenarioData;

  let sp = StringProcessing(that.ScenarioData);
  that.sp = sp;
  that.pageName = pageNameInput;
  that.pageDefinitionFileName = pageNameDirectoryInput + pageNameInput;
  that.pageElements = new HashTable({}); // a hash of all of the web elements for this page.

  that.driver = driver;
  that.webdriver = webdriver;

  console.log('New PageObject: ' + pageNameInput);

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
    console.log(`Opening file ${fullFileName} from ${__filename} `);
    var contents = fs.readFileSync(fullFileName);
    var jsonContent = JSON.parse(contents);

    for (var i in jsonContent.webElements) {
      var element = jsonContent.webElements[i];
      await addElement(element.name, element)
      console.log('Element: ' + element.byType);
    }
  }

  const populateWebObject = async function (elementName, value) {
    let element = await getElement(elementName);
    let newValue = await sp.strEval(value);
    console.log(`Populating Element: ${element.name} with value ${newValue}`);
  }
  var getWebObjectValue = async function (elementName) {

  }

  const switchFrame = async function (elementName) {
    console.log('Checking need to switch to iframe');
    let isNumber = true;
    if (typeof elementName !== 'number') {
      isNumber = false;
    }
    // elementName is the name of the frame element in the json file. if it is default, switch to frame(0)
    if ((!isNumber && !elementName) || elementName === 'default') {
      console.log('Do nothing, no frame set: ' + elementName);
    } else { // else , look up the frame element in the hash table. get the webElement for the frame switch to the frame.
      if (isNumber) {
        console.log('Switching Frame to frame via number(' + elementName + ')');
        that.driver.switchTo().frame(elementName);
      } else {
        var frameElementObj = await getElement(elementName);
        that.driver.switchTo().frame(frameElementObj.definition);
      }
    }
  }
  var genericPopulateElement = async function (elementName, value) {
    let elementTarget = '';
    let specialInstr = '';
    let tempElement = {};

    if (await hasElement(elementName)) {
      tempElement = await getElement(elementName);
      // If need to hit a iframe, do it
      await switchFrame(tempElement.frame);

      specialInstr = tempElement.specialInstr;
      elementTarget = await WebElement(that.driver, that.webdriver, tempElement);
      console.log('****genericPopulateElement: ' + elementName)
      console.log(`Info: Page Element ${elementName} retrieved from Page Elements collection.`);

      const webElement = await elementTarget.getWebElement();
      const tagName = await webElement.getTagName();

      switch (tagName.toLowerCase()) {
        case 'input':
          await populateInput(webElement, value, specialInstr);
          break;
        case 'textarea':
          await populateTextField(webElement, value, specialInstr);
          break;
        case 'a':
          await populateClick(webElement, value, specialInstr);
          break;
        case 'button':
          await populateClick(webElement, value, specialInstr);
          break;
        case 'div':
          await populateClick(webElement, value, specialInstr);
          break;
        case 'span':
          await populateClick(webElement, value, specialInstr);
          break;
        case 'ul':
          await populateClick(webElement, value, specialInstr);
          break;
        case 'select':
          await populateSelect(webElement, value, specialInstr);
          break;
        default:
          console.log(`ERROR: We tried to populate an unknown tag(${elementName}) with data in populateGenericElement()\n\tWe failed.`);
      }
    } else {
      console.log(`ERROR: WebElement ${elementName} not found in PageElements during PopulateELement() attempt.`);	
    }
  }
  const populateElement = async function (strName, strValue) {
    try {
      console.log(`INFO: Starting populate the web element: ${strName} with value ${strValue}`);
      console.log(`INFO++: WorldData: ${this.worldData}`);

      strValue = await sp.strEval(strValue);

      await genericPopulateElement(strName, strValue);
    } catch (err) {
      console.error(err.stack);
      throw err;
    }
  }
  var assertText = async function (strName, strValue) {
    try {
      console.log(`INFO: Starting text assertion: ${strName} with value ${strValue}`);
      console.log('INFO++: WorldData: ' + this.worldData);

      strValue = await sp.strEval(strValue);
    } catch (err) {
      console.error(err.stack);
      throw err;
    }
  }
  that.assertText = assertText;
  that.getWebObjectValue = getWebObjectValue;
  that.populateWebObject = populateWebObject;
  that.getElement = getElement;
  that.hasElement = hasElement;
  that.getDriver = getDriver;
  that.populate = populateElement;
  that.populateElement = populateElement;
  loadPageDefinitionFile(that.pageDefinitionFileName)
  return that;
}

var getDriver = function () {
  return driver;
}

const getWebDriver = function () {
  return webdriver;
}

module.exports = { PageObject, getDriver, getWebDriver };
