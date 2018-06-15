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

const PageObject = function (name) {
  var that = {};
  that.ScenarioData = ScenarioData;

  let sp = StringProcessing(that.ScenarioData);
  that.sp = sp;
  that.pageName = name;
  that.pageDefinitionFileName = './features/pages/pageDefinitions/' + name;
  that.pageElements = new HashTable({});  //a hash of all of the web elements for this page.
  console.log('New PageObject: ' + name);

  var setDriver = async function (driver, webdriver) {
		that.driver = driver;
		that.webdriver = webdriver;
  }

	var getDriver = function () {
		return that.driver;
	}

	const getWebDriver = function () {
		return that.webdriver;
	}
	
	var addElement = async function (elementName, elements){
		that.pageElements.setItem(elementName, elements);
	}
	
	var getElement = async function (elementName){
		return that.pageElements.getItem(elementName);
	}
	
	var hasElement = async function (elementName) {
		return that.pageElements.hasItem(elementName);
	}
	
	var loadPageDefinitionFile = async function (fullFileName){
		 var contents = fs.readFileSync(fullFileName);
		 var jsonContent = JSON.parse(contents);
		 		 
		 for (var i in jsonContent.webElements) {
			  var element = jsonContent.webElements[i];
			  await addElement(element.name, element)
			  console.log("Element:" + element.byType)
		 }
	}
		

	var populateWebObject = async function (elementName, value){
		let element = await getElement(elementName);
		let newValue= await sp.strEval(value);
		console.log("Populating Element: " + element.name + " with value '" + newValue + "'");
//what does this do?		
	}
	
	var getWebObjectValue = async function (elementName){

	}
	var switchFrame = async function (elementName) {
		//elementName is the name of the frame element in the json file.
		//if it is default, switch to frame(0)
		if (elementName == "default"){
			console.log("Switching Frame to frame(0)");
			that.driver.switchTo().frame(0);
		}
		//else , look up the frame element in the hash table.
		// get the webElement for the frame
		//switch to the frame.
		else {
			var frameElement = await getElement(elementName);
			var frameElementObj = await getElement(frameElement);
			var eleTarget = await WebElement(that.driver, that.webdriver, frameElementObj);
			console.log("Switching Frame to frame (" + frameElement + ")");
			that.driver.switchTo().frame(eleTarget);

		}

	}
	var genericPopulateElement = async function (elementName, value){
		let elementTarget = "";
		let specialInstr = "";
		let tempElement = {};
		let wait = null;

		if (await hasElement(elementName)) {
			tempElement = await getElement(elementName);
			specialInstr = tempElement.specialInstr;
			elementTarget = await WebElement(that.driver, that.webdriver, tempElement);
			console.log("****genericPopulateElement: " + elementName)
			console.log("Info: Page Element '" + elementName + "' retrieved from Page Elements collection.");
		
			
			const webElement = await elementTarget.getWebElement();
			//that.getDriver().wait(until.elementLocated(webElement));
			await switchFrame(tempElement.frame);

			const tagName =  webElement.getTagName();
			
			switch (tagName.toLowerCase()){
    		case "input":
    			await populateInput(webElement, value, specialInstr);
    			break;
    		case "textarea":
    			await populateTextField(webElement, value, specialInstr);	
    			break;
    		case  "a":
    			await populateClick(webElement, value, specialInstr);
    			break;
    		case  "button":
    			populateClick(webElement, value, specialInstr);
    			break;
    		case  "div":
    			populateClick(webElement, value, specialInstr);
    			break;
    		case  "span":
    			populateClick(webElement, value, specialInstr);
    			break;
    		case  "ul":
    			populateClick(webElement, value, specialInstr);
    			break;
    		case "select":
    			populateSelect(webElement, value, specialInstr);
    			break;
    		default:
				console.log("ERROR: We tried to populate an unknown tag(" + strTagName + ") with data in populateGenericElement()\n\tWe failed.");
	    	}		
		}
    	else {
    		console.log("ERROR: WebElement '" + elementName + "' not found in PageElements during PopulateELement() attempt.");	
    	}
	
	}
	const populateElement = async function (strName, strValue) {
		try {
			console.log("INFO: Starting populate the web element: '" + strName + "' with value '" + strValue + "'");
			console.log("INFO++: WorldData: " + this.worldData);

			strValue = await sp.strEval(strValue);

			/*if(!customPopulateElement(strName, strValue)){
				genericPopulateElement(strName, strValue);
			}*/
			await genericPopulateElement(strName, strValue);
		} catch (err) {
			console.error(err.stack);
			throw err;
		}
	}
	var assertText = async function (strName, strValue) {
		try {
			console.log("INFO: Starting text assertion: '" + strName + "' with value '" + strValue + "'");
			console.log("INFO++: WorldData: " + this.worldData);

			strValue = await sp.strEval(strValue);
// Add code to get the value from the web page and asset it matches strValue
// Add code for any other asserts needed.
			/*if(!customPopulateElement(strName, strValue)){
				genericPopulateElement(strName, strValue);
			}*/ 
			//await genericPopulateElement(strName, strValue);
		} catch (err) {
			console.error(err.stack);
			throw err;
		}

	}
	that.test = function() {
		console.log("PageObject testing.");
	}
	
	that.assertText = assertText;
	that.getWebObjectValue = getWebObjectValue;
	that.populateWebObject = populateWebObject;
	that.getElement = getElement;
	that.hasElement = hasElement;
	that.setDriver = setDriver;
	that.getDriver = getDriver;
	that.populate = populateElement;
	that.populateElement = populateElement;
	
	//that.loadFile = loadFile;
	//that.getPage = getPage;
	loadPageDefinitionFile(that.pageDefinitionFileName)
	return that;
	}


module.exports = PageObject;