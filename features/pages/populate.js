/**
 * http://usejsdoc.org/
 */

var populateInput = async function (eleTarget, strValue, specialInstr) {
	
	switch(eleTarget.getAttribute('type')){
	case 'radio':
		if(strValue.toLowerCase() === 'click'){
			console.log('Clicking radio button');
			await eleTarget.click();
		}
		else {
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
		if(strValue.toLowerCase() === 'click') {
			await populateClick(eleTarget, strValue, specialInstr);
		}
		else {
			console.log('Bypassing the button click');
		}
		break;
	default:
		console.log("ERROR: populateInput() failed because the input type '" + eleTarget.getAttribute("type") +"' has not been coded for.");
	}
} 

var populateCheckbox = async function (eleTarget, strValue, specialInstr) {
	let elementValue = eleTarget.getAttribute('checked');
	if (elementValue ) {
		elementValue = 'notchecked';
	}
	
	switch (strValue.toLowerCase()) {
	case 'check':
		if(!elementValue === 'check') {
			await eleTarget.click();
		}
		break;
	case 'uncheck':
		if(elementValue.equalsIgnoreCase('check')) {
			await eleTarget.click();
		}
		break;
	case 'click':
		await eleTarget.click();		
	}	
}
   
var populateSelect = async function (eleTarget, value, specialInstr){
	let dropDown = new Select(eleTarget);
	let noClick = false;
	
	if (specialInstr == null) {
		specialInstr = '';
	}
	if (specialInstr.toLowerCase().contains('noclick'))
		noClick = true;
	
	if (specialInstr.toLowerCase().contains('byValue'.toLowerCase())) {
		try {
		if (!noClick) eleTarget.click();	
		await dropDown.selectByValue(value);
		}
		catch (e){
			if (!noClick) eleTarget.click();	
			await dropDown.selectByVisibleText(value);
		} 
	}
	else {
		try {
			if (!noClick) eleTarget.click();	
			await dropDown.selectByVisibleText(value);

		}
		catch (e){
			if (!noClick) eleTarget.click();	
			await dropDown.selectByValue(value);
		}
			
	}
}



/* specialInstr values: 
	* 		noClick - does not click on the field first
	* 		noClear - Does not clear the field of before sending  values to it.
	* 		overWrite - Selects the values in the field before over writing with the new value.  Does not clear the field.
	* 
	*/
var populateTextField = async function (eleTarget, strValue, specialInstr) {
  let localSpecialInstr = '';
  if (specialInstr != null) {
    localSpecialInstr = specialInstr;
  }

  if (!localSpecialInstr.toLowerCase().indexOf('noclick') > -1) {
    console.log('Clicking text field.');
    await eleTarget.click();
  }

  if (localSpecialInstr.toLowerCase().contains('overwrite')) {
    console.log("Pre overwrite text field value: '" + eleTarget.getAttribute('value') + "'");
    //eleTarget.sendKeys(Keys.chord(Keys.CONTROL, "a"));
  } else if (!localSpecialInstr.toLowerCase().contains('noclear')) {
    console.log("Pre clear text field value: '" + eleTarget.getAttribute('value') + "'");
    await eleTarget.clear();   		
  }

  await eleTarget.sendKeys(strValue);
  console.log("Post populate text field value: '" + eleTarget.getAttribute('value') +"'");

  if (localSpecialInstr.contains('tabAfter')) {
    await eleTarget.sendKeys(Keys.chord(Keys.TAB));
  }

  if (localSpecialInstr.toLowerCase().contains('waitAfter2secs'.toLowerCase())) {
    try {
      console.log('Sleeping 2 seconds: Text Field - waitAfter2secs');
      sleep(3000);
      console.log('Waking up.');
    } catch (e) {
      console.error(e);
	}
  }
}

var populateClick = async function (eleTarget, strValue, specialInstr) {
	let localSpecialInstr = '';
	if (specialInstr != null) {
		localSpecialInstr = specialInstr;
	}
	
	if (strValue.toLowerCase() === 'click'){
		await eleTarget.click();
		console.log('Clicking web element');

	}
	if (localSpecialInstr && localSpecialInstr.toLowerCase().indexOf('waitAfter2secs') > -1) {
		try {
			console.log('Sleeping 2 seconds: Click - waitAfter2secs');
			sleep(3000);
			console.log('Waking up.');
		} catch (e) {
			console.error(e);
		}		
	}
}	
module.exports = {populateInput, populateClick, populateSelect, populateTextField };
    
    
    