/**
 * http://usejsdoc.org/
 */
'use strict';

const HashTable = require('./HashTable');
const StringProcessing = require('./StringProcessing');
const ScenarioData = require('./ScenarioData');
const that = {}

var  PageObject = function(name){
	var that = {};
	that.ScenarioData = ScenarioData;

	let sp = StringProcessing(that.ScenarioData);
	
	that.pageName = name;
	that.pageDefinitionFileName = "./features/pages/pageDefinitions/" + name;
	that.pageElements = new HashTable({});  //a hash of all of the web elements for this page.
	console.log("New PageObject: " + name);

	var setDriver = function (driver) {
		that.driver = driver;
	}

	var getDriver = function () {
		return that.driver;
	}
	
	var addElement = function (elementName, elements){
		that.pageElements.setItem(elementName, elements);
	}
	
	var getElement = function (elementName){
		return that.pageElements.getItem(elementName);
	}
	
	var hasElement = function (elementName) {
		return that.pageElements.hasItem(elementName);
	}
	
	var loadPageDefinitionFile = function(fullFileName){
		 var fs = require("fs");
		 var contents = fs.readFileSync(fullFileName);
		 var jsonContent = JSON.parse(contents);
		 		 
		 for (var i in jsonContent.webElements) {
			  var element = jsonContent.webElements[i];
			  addElement(element.name, element)
			  console.log("Element:" + element.byType)
		 }
	}
		

	var populateWebObject = function (elementName, value){
		let element = getElement(elementName);
		let newValue=sp.strEval(value);
		console.log("Populating Element: " + element.name + " with value '" + newValue + "'");
		//this.ca.test();
	}
	
	var getWebObjectValue = function (webElementName, variableName){
		that.ScenarioData.storeData("testme", "ronAsher")
	}
	var genericPopulateElement = function (elementName, value){
		let elementTarget = "";
		let specialInstr = "";
		let tempElement = {};
		
		if (hasElement(elementName)) {
			tempElement = getElement(elementName);
			elementTarget = tempEl
			specialInstr = tempElement.specialInstr;
		}
	}
	
	that.test = function() {
		console.log("PageObject testing.");
	}
	
	that.getWebObjectValue = getWebObjectValue;
	that.populateWebObject = populateWebObject;
	that.getElement = getElement;
	that.hasElement = hasElement;
	that.setDriver = setDriver;
	that.getDriver = getDriver;
	//that.loadFile = loadFile;
	//that.getPage = getPage;
	loadPageDefinitionFile(that.pageDefinitionFileName)
	return that;
	}


module.exports = PageObject;