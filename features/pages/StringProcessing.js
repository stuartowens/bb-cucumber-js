/**
 * http://usejsdoc.org/
 */
const EVAL_BEGIN = "<";
const EVAL_END = ">";
const PARAM_BEGIN = "(";
const PARAM_END = ")";

const VARIABLE_PREFIX = "$";
const FUNCTION_PREFIX = "@";
const that = {};
const ScenarioData = require('./ScenarioData');

var StringProcessing = function (ScenarioData){
	let my = {};
	let that = {};
	that.ScenarioData = ScenarioData;
	
	let getEvalSection = function (inputString, begin_string, end_string) {
		var begin = begin_string || EVAL_BEGIN;
		var end = end_string || EVAL_END;
		
		let firstOccurance = inputString.toString().indexOf(EVAL_BEGIN);
		let lastOccurance = inputString.toString().lastIndexOf(EVAL_END);
		return inputString.toString().slice(firstOccurance, lastOccurance);
	}
	
	let strEval = function (inputString) {
		let string1 = "";
		let string2 = "";
		let string3 = "";
		let returnString = inputString || "";
		
		
		if (returnString.toString().indexOf(EVAL_BEGIN) > 0 & returnString.toString().indexOf(EVAL_END) > 0){
			string1 = returnString.toString().slice(0,returnString.toString().indexOf(EVAL_BEGIN));
			string2 = getEvalSection(returnString);
			string3 = returnString.toString().substr(returnString.lastIndexOf(EVAL_BEGIN));
			
			returnString = string1 + strEval(string2) + string3;
		}
		else
			if (inputString.toString().startsWith(VARIABLE_PREFIX)) {
				//return core data variable
				that.ScenarioData.get(inputString.toString().indexOf(1));
				console.log("retrieving variable: " + inputString);
			}
			else {
				
				if (inputString.toString().startsWith(FUNCTION_PREFIX)) {
					returnString = inputString.toString().replace(FUNCTION_PREFIX,"");
					my.func.name = returnString.toString().slice(0,returnString.toString().indexOf(PARAM_BEGIN));
					my.func.data = getEvalSection(returnString, PARAM_BEGIN, PARAM_END);
					my.func.after = returnString.toString().substr(returnString.lastIndexOf(PARAM_END));
					
					switch (my.func.name.trim()) {
						case "save":
							my.func.params = returnString.split(",");
							that.ScenarioData.put(my.func.params[0], my.func.params[1]);
							break;
						
					}
					
					
				}
			}
		
	}
	that.strEval = strEval;
	
	return that;
}
module.exports = StringProcessing;
