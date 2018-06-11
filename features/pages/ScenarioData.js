/**
 * http://usejsdoc.org/
 */
'use strict';

const HashTable = require('./HashTable');

var CoreData = function(ScenarioName){
	let that = spec || {};
	
	that.data = HashTable();
	
	let storeData = async function (key, value) {
		that.data.setItem(key, value);
	}
	
	
	let getData = async function(key) {
		return that.data.getItem(key);
		
	}
	
	that.test = async function (){
		console.log("**CoreData.test()");
	}
	that.storeData = storeData;
	that.get = getData;
	that.put = storeData;
	
	return that;
}

module.exports = CoreData;