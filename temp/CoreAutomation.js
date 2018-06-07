/**
 * http://usejsdoc.org/
 */
'use strict';
const Pages = require('./Pages');
const CoreData = require('./CoreData');

var coreAutomation = function (worldData){
		let that = {};
		that.worldData = worldData;
		//console.log('Initializing core automation.');
		that.config = require("../../../config.json");
		that.loginAccounts = {};
		that.pages = Pages(worldData);
		that.pages.init(that.config.pageDefinitionsFolder, that);
		
		console.log("baseURL:" + that.config["baseURL"]);
		//console.log("Test Includes:" + "testme".includes("me"));
		
		that.page = function (name) {
			return that.pages.getPage(name);
		}
		that.test = function (){
			console.log("Executing test() function in coreAutomation")
		}
		return that;
};

module.exports = coreAutomation;
