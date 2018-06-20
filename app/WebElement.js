/**
 * http://usejsdoc.org/
 */
const that = {};

var WebElement = function (driver, webdriver, element) {
  let my = {};

  my.driver = driver;
  my.webdriver = webdriver;
  my.element = element;
  my.byType = element.byType.toLowerCase();
  my.definition = element ? element.definition : null;
  my.specialInstr = null;
  my.by = my.webdriver.By;

  that.getWebElement = async function () {
    const webElement = my.element;
    const elementDef = webdriver.By.id(webElement.definition);
    const returnElement = await driver.findElement(elementDef);
    return returnElement;
  };

  that.getBy = async function () {
    let byReturn = null;
    const classType = my.byType.toLowerCase().trim();
    switch (classType) {
      case 'xpath':
        byReturn = my.by.xpath(my.definition);
        break;
      case 'cssselector':
        byReturn = my.by.cssSelector(my.definition);
        break;
      case 'id':
        byReturn = my.by.id(my.definition);
        break;
      case 'name':
        byReturn = my.by.name(my.definition);
        break;
      case 'linktext':
        byReturn = my.by.linkText(my.definition);
        break;
      case 'classname':
        byReturn = my.by.className(my.definition);
        break;
      case 'partiallinktext':
        byReturn = my.by.partialLinkText(my.definition);
        break;
      case 'tagname':
        byReturn = my.by.tagName(my.definition);
        break;
      default:
        console.log(`ERROR: The data asked to identify the element ${my.name}  by the type ${my.byType} and that type is not valid.  Please review the data and try again.`);
        console.log('ERROR: Valid types are [xpath, cssSelector, id, name, linkText, partialLinkText, className, tagName');
    }

    return byReturn;
  };

  return that;
};

module.exports = WebElement;
