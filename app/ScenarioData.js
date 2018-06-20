/**
 * http://usejsdoc.org/
 */
'use strict';

const HashTable = require('./HashTable');

var CoreData = function (ScenarioName) {
  let that = {};

  that.data = HashTable();

  let storeData = async function (key, value) {
    that.data.setItem(key, value);
  };

  let getData = async function (key) {
    return that.data.getItem(key);
  };

  let saveToFile = async function (scenarioFileName) {
    // Implement me!!!
  };
  let readFromFile = async function (scenarioFileName) {
    //Implement me!!!
  };

  that.test = async function () {
    console.log('**CoreData.test()');
  };
  that.storeData = storeData;
  that.get = getData;
  that.put = storeData;
  that.saveToFile = saveToFile;
  that.readFromFile = readFromFile;

  return that;
};

module.exports = CoreData;
