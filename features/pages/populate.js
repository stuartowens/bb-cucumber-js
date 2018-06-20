/**
 * http://usejsdoc.org/
 */

const populateInput = async function (eleTarget, strValue, specialInstr) {
  const type = await eleTarget.getAttribute('type');
  switch (type) {
    case 'radio':
      if (strValue.toLowerCase() === 'click') {
        console.log('Clicking radio button');
        await eleTarget.click();
      } else {
        console.log('By passing radio button click');
      }
      break;

    case 'text':
      await populateTextField(eleTarget, strValue, specialInstr);
      break;
    case 'password':
      await populateTextField(eleTarget, strValue, specialInstr);
      break;
    case 'checkbox':
      await populateCheckbox(eleTarget, strValue, specialInstr);
      break;
    case 'button':
      if (strValue.toLowerCase() === 'click') {
        await populateClick(eleTarget, strValue, specialInstr);
      } else {
        console.log('Bypassing the button click');
      }
      break;
    default:
      console.log(
        'ERROR: populateInput() failed because the input type ' +
          eleTarget.getAttribute('type') +
          ' has not been coded for.'
      );
  }
};

const populateCheckbox = async function (eleTarget, strValue, specialInstr) {
  let elementValue = eleTarget.getAttribute('checked');
  if (elementValue) {
    elementValue = 'notchecked';
  }

  switch (strValue.toLowerCase()) {
    case 'check':
      if (!elementValue === 'check') {
        await eleTarget.click();
      }
      break;
    case 'uncheck':
      if (elementValue.equalsIgnoreCase('check')) {
        await eleTarget.click();
      }
      break;
    case 'click':
      await eleTarget.click();
  }
};

const populateSelect = async function (eleTarget, value, specialInstr) {
  let dropDown = new Select(eleTarget);
  let noClick = false;

  if (specialInstr == null) {
    specialInstr = '';
  }
  if (specialInstr.toLowerCase().contains('noclick')) noClick = true;

  if (specialInstr.toLowerCase().contains('byValue'.toLowerCase())) {
    try {
      if (!noClick) eleTarget.click();
      await dropDown.selectByValue(value);
    } catch (e) {
      if (!noClick) eleTarget.click();
      await dropDown.selectByVisibleText(value);
    }
  } else {
    try {
      if (!noClick) eleTarget.click();
      await dropDown.selectByVisibleText(value);
    } catch (e) {
      if (!noClick) eleTarget.click();
      await dropDown.selectByValue(value);
    }
  }
};

/* specialInstr values: 
	* 		noClick - does not click on the field first
	* 		noClear - Does not clear the field of before sending  values to it.
	* 		overWrite - Selects the values in the field before over writing with the new value.  Does not clear the field.
	* 
	*/
const populateTextField = async function(eleTarget, strValue, specialInstr) {
  let localSpecialInstr = '';
  const eleValue = await eleTarget.getAttribute('value');
  if (specialInstr != null) {
    localSpecialInstr = specialInstr;
  }

  if (
    localSpecialInstr &&
    !localSpecialInstr.toLowerCase().indexOf('noclick') > -1
  ) {
    console.log('Clicking text field.');
    await eleTarget.click();
  }

  if (localSpecialInstr.toLowerCase().indexOf('overwrite') > -1) {
    console.log(`Pre overwrite text field value: ${eleValue}`);
  } else if (!localSpecialInstr.toLowerCase().indexOf('noclear') > -1) {
    console.log(`Pre clear text field value: ${eleValue}`);
    await eleTarget.clear();
  }

  await eleTarget.sendKeys(strValue);
  console.log(`Post populate text field value: ${eleValue}`);

  if (localSpecialInstr.indexOf('tabAfter') > -1) {
    //await eleTarget.sendKeys(Keys.chord(Keys.TAB));
  }

  if (
    localSpecialInstr.toLowerCase().indexOf('waitAfter2secs'.toLowerCase()) > -1
  ) {
    try {
      console.log('Sleeping 2 seconds: Text Field - waitAfter2secs');
      sleep(3000);
      console.log('Waking up.');
    } catch (e) {
      console.error(e);
    }
  }
};

const populateClick = async function (eleTarget, strValue, specialInstr) {
  let localSpecialInstr = '';
  if (specialInstr != null) {
    localSpecialInstr = specialInstr;
  }

  if (strValue.toLowerCase() === 'click') {
    await eleTarget.click();
    console.log('Clicking web element');
  }
  if (
    localSpecialInstr &&
    localSpecialInstr.toLowerCase().indexOf('waitAfter2secs') > -1
  ) {
    try {
      console.log('Sleeping 2 seconds: Click - waitAfter2secs');
      await sleep(3000);
      console.log('Waking up.');
    } catch (e) {
      console.error(e);
    }
  }
};

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  populateInput,
  populateClick,
  populateSelect,
  populateTextField
};
