/**
 * http://usejsdoc.org/
 */
const that = {};


var WebElement = function (driver, byType, defintion, specialInstr) {
	let my = {};

	my.driver = driver;
	my.byType = byType.toLowerCase();
	my.definition;
	my.specialInstr;
	my.by = my.driver.By;
	
	
	that.getWebElement = function (){
		//Wait is to make sure the item is loaded.
		let wait = new WebDriverWait(driver, 20);
		let returnElement = wait.until(ExpectedConditions.elementToBeClickable(this.getBy()));
		if (returnElement.isDisplayed()){
			 try {
			        returnElement = driver.findElement(that.getBy());
			    } catch (e) {
			        console.log("Attempting to recover from " + e.getClass().getSimpleName() + "...");
			        returnElement = that.getWebElement();
			    }	
		}
		return returnElement;
	}
	
	that.getBy = function () {
		
			let byReturn = null;
			
			switch(my.byType.toLowerCase().trim()){
			case "xpath" :
				byReturn = my.by.xpath(my.definition);
				break;
			case "cssselector" :
				byReturn = my.by.cssSelector(my.definition);
				break;
			case "id" :
				byReturn = my.by.id(my.definition);
				break;
			case "name" :
				byReturn = my.by.name(my.definition);
				break;
			case "linktext" :
				byReturn = my.by.linkText(my.definition);
				break;
			case "classname":
				byReturn = my.by.className(my.definition);
				break;
			case "partiallinktext":
				byReturn = my.by.partialLinkText(my.definition);
				break;
			case "tagname":
				byReturn = my.by.tagName(my.definition);
				break;
			default:
				console.log("ERROR: The data asked to identify the element " + my.name + " by the type " + my.byType + " and that type is not valid.  Please review the data and try again.");
				console.log("ERROR: Valid types are [xpath, cssSelector, id, name, linkText, partialLinkText, className, tagName");
			}

			return byReturn;
		}		

	
	
return that;	
}

module.exports = WebElement;
