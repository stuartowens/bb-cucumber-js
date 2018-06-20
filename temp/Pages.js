/**
 * http://usejsdoc.org/
 */
"use strict";
const PO = require("./PageObject");
const my = {};
const fs = require("fs");
const HashTable = require("./HashTable");

var pages = function(worldData) {
  let that = {};
  that.worldData = worldData;
  let object = "object";

  if ((my.initialized = undefined)) my.initialized = false;
  my.pageList = new HashTable([]);

  that.init = function(path) {
    var localPath = path || "./test/pageDefinitions/";
    var pageName, tempPN;
    if (!my.initialized) {
      fs.readdir(localPath, function(err, items) {
        //console.log("File: " + items);
        if (err) {
          return console.error(err);
        }
        for (var i = 0; i < items.length; i++) {
          pageName = items[i].replace(".json", "").replace(".JSON", "");

          my.pageList.setItem(pageName, new PO(pageName, that.worldData));
          var tempPo = my.pageList.getItem(pageName);
          console.log("Checking new PO: " + tempPo.pageName);
          console.log("page list: " + my.pageList.toString);
        }
      });
    }
    my.initialized = true;
  };

  that.pageExists = function(name) {
    return my.pageList.hasItem(name);
  };

  that.getPage = function(name) {
    //add code to return page object based on it's name
    return my.pageList.getItem(name);
  };

  //my.initPageList(pagesPath);
  that.test = function() {
    console.log("Executing test() function in pages.js");
  };

  return that;
}; // Page List object

module.exports = pages;
