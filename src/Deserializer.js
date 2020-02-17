import Escaper from "@default-js/defaultjs-common-utils/src/Escaper";

//const REGEX_KEY = /^([^\s:;]+)(;([^:]+))?:(.+)$/;
const REGEX_VALUELINE = /^\s(.+)$/;

const KEY_VALUE_SPLIT = /:/;
const PARAM_SPLIT = /;/;
const PARAM_VALUE_SPLIT = /=/;

const ESCAPER = new Escaper([
	{char: ",", escaped:"\\,"},
	{char: ";", escaped:"\\;"},
	{char: ":", escaped:"\\:"},
]);


const getParameter = function(aText){
	if(aText == null || typeof aText === "undefined")
		return;
	const items = aText.split(PARAM_SPLIT);
	const params = {};
	items.forEach(item => {
		const parts = item.split(PARAM_VALUE_SPLIT);
		params[parts[0].toLowerCase()] = parts[1];
	})
	
	return params;
};

const getValue = function(aValue, aTokenizer){
	let value = aValue;
	let match = REGEX_VALUELINE.exec(aTokenizer.lines()[aTokenizer.index() + 1]);
	while(match != null && typeof match !== "undefined" && match.length > 0){		
		value += match[1];
		aTokenizer.skip();
		match = REGEX_VALUELINE.exec(aTokenizer.lines()[aTokenizer.index() + 1]);
	}
	
	return ESCAPER.unescape(value);
};


const Deserializer = function(aLine, aTokenizer){
	let index = aLine.search(KEY_VALUE_SPLIT);
	if(index == -1)
		return;
	
	const result = {
			key : aLine.substring(0, index),
			value : getValue(aLine.substring(index + 1), aTokenizer)
	};
	
	index = result.key.search(PARAM_SPLIT);
	if(index != -1){
		result.parameter = getParameter(result.key.substring(index + 1));
		result.key = result.key.substring(0, index);
	}
		
	
	return result
};

export default Deserializer;