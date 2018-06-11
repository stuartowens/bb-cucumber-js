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

const StringProcessing = function (ScenarioData){
	let my = {};
	let that = {};
	that.ScenarioData = ScenarioData;
	
	const getEvalSection = function (inputString, begin_string, end_string) {
		var begin = begin_string || EVAL_BEGIN;
		var end = end_string || EVAL_END;
		
		let firstOccurance = inputString.indexOf(EVAL_BEGIN);
		let lastOccurance = inputString.lastIndexOf(EVAL_END);
		return inputString.slice(firstOccurance, lastOccurance);
	}
	
	const strEval = function (inputString) {
		let string1 = "";
		let string2 = "";
		let string3 = "";
		let returnString = inputString || "";
		
		
		if (returnString.indexOf(EVAL_BEGIN) > 0 && returnString.indexOf(EVAL_END) > 0){
			string1 = returnString.slice(0,returnString.indexOf(EVAL_BEGIN));
			string2 = getEvalSection(returnString);
			string3 = returnString.substr(returnString.lastIndexOf(EVAL_BEGIN));
			
			returnString = string1 + strEval(string2) + string3;
		}
		else
			if (inputString.startsWith(VARIABLE_PREFIX)) {
				//return core data variable
				that.ScenarioData.get(inputString.indexOf(1));
				console.log("retrieving variable: " + inputString);
			}
			else {
				
				if (inputString.startsWith(FUNCTION_PREFIX)) {
					returnString = inputString.replace(FUNCTION_PREFIX,"");
					my.func.name = returnString.slice(0,returnString.indexOf(PARAM_BEGIN));
					my.func.data = getEvalSection(returnString, PARAM_BEGIN, PARAM_END);
					my.func.after = returnString.substr(returnString.lastIndexOf(PARAM_END));
					
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
