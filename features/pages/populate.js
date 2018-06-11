/**
 * http://usejsdoc.org/
 */

var populateInput = function (eleTarget, strValue, specialInstr) {
		
	switch(eleTarget.getAttribute("type")){
	case "radio":
		if(strValue.toLowerCase().contentEquals("click")){
			System.out.println("Clicking radio button");
			eleTarget.click();
		}
		else {
			console.log("By passing radio button click");
		}
		break;
		
	case "text":
		populateTextField(eleTarget, strValue, specialInstr);
		break;
	case "password":
		populateTextField(eleTarget, strValue, specialInstr);
		break;
	case "checkbox":
		populateCheckbox(eleTarget, strValue, specialInstr);
		break;		
	case "button":
		if(strValue.toLowerCase().contentEquals("click")){
			populateClick(eleTarget, strValue, specialInstr);
		}
		else {
			console.log("Bypassing the button click");
		}
		break;
	default:
		console.log("ERROR: populateInput() failed because the input type '" + eleTarget.getAttribute("type") +"' has not been coded for.");
	}
} 

var populateCheckbox = function (eleTarget, strValue, specialInstr) {
	let elementValue = eleTarget.getAttribute("checked");
	if (elementValue == null) {
		elementValue = "notchecked";
	}
	
	switch (strValue.toLowerCase()) {
	case "check": 
		if(!elementValue.equalsIgnoreCase("check")) {
			eleTarget.click();
		}
		break;
	case "uncheck":
		if(elementValue.equalsIgnoreCase("check")) {
			eleTarget.click();
		}
		break;
	case "click":
		eleTarget.click();			
	}	
}
   
var populateSelect = function (eleTarget, value, specialInstr){
	let dropDown = new Select(eleTarget);
	let noClick = false;
	
	if (specialInstr == null) {
		specialInstr = "";
	}
	if (specialInstr.toLowerCase().contains("noclick"))
		noClick = true;
	
	if (specialInstr.toLowerCase().contains("byValue".toLowerCase())) {
		try {
		if (!noClick) eleTarget.click();	
		dropDown.selectByValue(value);
		}
		catch (e){
			if (!noClick) eleTarget.click();	
			dropDown.selectByVisibleText(value);
		} 
	}
	else {
		try {
			if (!noClick) eleTarget.click();	
			dropDown.selectByVisibleText(value);

		}
		catch (e){
			if (!noClick) eleTarget.click();	
			dropDown.selectByValue(value);
		}
			
	}
}



/* specialInstr values: 
	* 		noClick - does not click on the field first
	* 		noClear - Does not clear the field of before sending  values to it.
	* 		overWrite - Selects the values in the field before over writing with the new value.  Does not clear the field.
	* 
	*/
var populateTextField = function (eleTarget, strValue, specialInstr) {
	let localSpecialInstr = "";
	if (specialInstr != null) {
		localSpecialInstr = specialInstr;
	}
	
	if (!localSpecialInstr.toLowerCase().contains("noclick")) {
		System.out.println("Clicking text field.");
		eleTarget.click();
	}
	
	
	if(localSpecialInstr.toLowerCase().contains("overwrite")) {
		System.out.println("Pre overwrite text field value: '" + eleTarget.getAttribute("value") +"'");
		eleTarget.sendKeys(Keys.chord(Keys.CONTROL, "a"));
		//TODO: code to handle macOS and Linux.
		
	}
	else if(!localSpecialInstr.toLowerCase().contains("noclear")) {
		System.out.println("Pre clear text field value: '" + eleTarget.getAttribute("value") +"'");
		eleTarget.clear();   		
	}
	
		eleTarget.sendKeys(strValue);
		System.out.println("Post populate text field value: '" + eleTarget.getAttribute("value") +"'");
	
	if (localSpecialInstr.contains("tabAfter")) {
		eleTarget.sendKeys(Keys.chord(Keys.TAB));
	}
	
	if (localSpecialInstr.toLowerCase().contains("waitAfter2secs".toLowerCase())) {
		try {
			console.log("Sleeping 2 seconds: Text Field - waitAfter2secs");
				Thread.sleep(3000);
				console.log("Waking up.");
			} catch (e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}	
	}
}

var populateClick = function (eleTarget, strValue, specialInstr) {
	let localSpecialInstr = "";
	if (specialInstr != null) {
		localSpecialInstr = specialInstr;
	}
	
	if (strValue.toLowerCase().equals("Click".toLowerCase())){
		eleTarget.click();
		System.out.println("Clicking web element");

	}
	if (localSpecialInstr.toLowerCase().contains("waitAfter2secs")) {
		try {
			System.out.println("Sleeping 2 seconds: Click - waitAfter2secs");
			Thread.sleep(3000);
			System.out.println("Waking up.");
		} catch (e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}
}	
module.exports = {populateInput, populateClick, populateSelect, populateTextField };
    
    
    