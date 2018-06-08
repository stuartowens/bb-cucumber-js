/**
 * http://usejsdoc.org/
 */
'use strict';
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

var coreAutomation = function (worldData){
		let that = {};
		that.config = require("../../../config.json");
		that.loginAccounts = {};

		
		console.log("baseURL:" + that.config["baseURL"]);
		//console.log("Test Includes:" + "testme".includes("me"));
		
		that.initChrome = function () {
			var path = require('chromedriver').path;

			var chromeService = new chrome.ServiceBuilder(path).build();
			chrome.setDefaultService(ChromeService);

			var driver = new webdriver.Builder()
			    .withCapabilities(webdriver.Capabilities.chrome())
			    .build();	
		}
		
		that.initDriver = function () {
			switch (that.config.loaddriver){
			case 'chrome': { 
				that.initChrome;
				break;
			}
			default:{
				that.initChrome;				
			}
			
				
			}
			
		}
		that.test = function (){
			console.log("Executing test() function in coreAutomation")
		}
		
		return that;
};

module.exports = coreAutomation;
