const { When, Then } = require('cucumber');
const path = require('path');

const { loadConfig, loadLogin } = require('../../../app/util');

const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const ScenarioData = require('../../../app/scenarioData');
const StringProcessing = require('../../../app/stringProcessing');
const {getDriver, sleep} = require('../../../app/driver');
var fieldValue;
var AssignValue;
// Scenario setup
let pages = {
  authProducer: new PageObject('auth-media-producer.json', stepsPath),
  mainPage: new PageObject('mainPage.json', stepsPath),
  login: new PageObject('loginPage.json', stepsPath)
}

When('I click the create_course button to create course', async function () {
  try {
    log.debug('Clicking on create course button');
    await pages.authProducer.populate('create_course', 'click');
    log.debug(`create course button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('save the value to variable', async function (dataTable) {
  fieldValue = dataTable;
});

When('I elect to create a course with the following data:', async function () {
  log.debug(`I populated table`);
  try {
    log.info(fieldValue.rows().length);
    var e;
    for (e = 0; e < fieldValue.rows().length; e++) {
      log.info(fieldValue.hashes()[e].variablename);
      log.info(fieldValue.hashes()[e].value);
      await pages.authProducer.populate(fieldValue.hashes()[e].variablename, fieldValue.hashes()[e].value);
    }
  } catch (err) {
    log.error(err.stack);
  }

  try {
    log.debug('Clicking on save button');
    await pages.authProducer.populate('save_button', 'click');
    log.debug(`create course button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I create a folder named on the resources screen', async function () {
  try {
    log.debug('Clicking on course card');
    await pages.authProducer.populate('card_name', 'click', 'resources_tab');
    log.debug(`create course card was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking on resources tab');
    await pages.authProducer.populate('resources_tab', 'click');
    log.debug(`create resource tab was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name', 'Chapter 1');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name', 'Chapter 2');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I will add the following content to the resource page:', async function () {
  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name', 'Chapter 1. Introduction and Research Methods');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name', 'Chapter 1. Background to the Study of Psychology');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name', 'Chapter 1. The People and the Field');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name', 'Chapter 2: North America');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I move the activity named to the folder named', async function () {
  try {
    log.debug('Clicking options button');
    await pages.authProducer.populate('options_button', 'click');
    log.debug(`options button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking move item button');
    await pages.authProducer.populate('move_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Select chapter 2 from the list');
    await pages.authProducer.populate('chapter_2', 'click');
    log.debug(`Chapter 2 was selected: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking place item button');
    await pages.authProducer.populate('place_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking options button');
    await pages.authProducer.populate('options_button', 'click');
    log.debug(`options button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking move item button');
    await pages.authProducer.populate('move_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Select chapter 1 from the list');
    await pages.authProducer.populate('chapter_2', 'click');
    log.debug(`Chapter 1 was selected: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking place item button');
    await pages.authProducer.populate('place_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking options button');
    await pages.authProducer.populate('options_button', 'click');
    log.debug(`options button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking move item button');
    await pages.authProducer.populate('move_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Select chapter 1 from the list');
    await pages.authProducer.populate('chapter_1_3', 'click');
    log.debug(`Chapter 1 was selected: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking place item button');
    await pages.authProducer.populate('place_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking options button');
    await pages.authProducer.populate('options_button', 'click');
    log.debug(`options button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking move item button');
    await pages.authProducer.populate('move_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Select chapter 1 from the list');
    await pages.authProducer.populate('chapter_1_4', 'click');
    log.debug(`Chapter 1 was selected: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking place item button');
    await pages.authProducer.populate('place_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I reorder the items on the course resource page to be in this order:', async function () {
  try {
    log.debug('Clicking options button');
    await pages.authProducer.populate('options_button', 'click');
    log.debug(`options button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking reorder button');
    await pages.authProducer.populate('reorder_button', 'click');
    log.debug(`Reorder button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking move down button');
    await pages.authProducer.populate('move_down_button', 'click');
    log.debug(`Move down button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking save button');
    await pages.authProducer.populate('save_reordered_button', 'click');
    log.debug(`Save button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I elect to edit the course named "course1.templatename"', async function () {
  try {
    log.debug('Clicking open_menu button');
    await pages.authProducer.populate('open_menu', 'click');
    log.debug(`open_menu was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking edit_button');
    await pages.authProducer.populate('edit_button', 'click');
    log.debug(`edit_button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When('save the value to variables', async function (dataTable) {
  AssignValue = dataTable;
});

Then('I elect to edit the course with the following data:', async function () {
  log.debug(`I populated table`);
  try {
    log.info(AssignValue.rows().length);
    var x;
    for (x = 0; x < AssignValue.rows().length; x++) {
      log.info(AssignValue.hashes()[x].variablesname);
      log.info(AssignValue.hashes()[x].value);
      await pages.authProducer.populate(AssignValue.hashes()[x].variablesname, AssignValue.hashes()[x].value);
    }
  } catch (err) {
    log.error(err.stack);
  }
  try {
    log.debug('Clicking on save button');
    await pages.authProducer.populate('save_button', 'click');
    log.debug(`save_button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
