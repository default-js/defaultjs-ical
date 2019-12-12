const REGEX_KEY = /^([^\s:;]+)(;([^:]+))?:(.+)$/;
const REGEX_VALUELINE = /^(\s+.+)$/;

const getParams = function(text){
	if(text == null || typeof text === "undefined")
		return;
	
	let params = {};
	text.split(/;/g).forEach(function(item){
		let param = item.split(/=/g);
		params[param[0]] = typeof param[1] !== "undefined" ? param[1] : ""; 
	});
	
	return params;
};

const getValue = function(aValue, aTokenizer){
	let value = aValue;
	let match = REGEX_VALUELINE.exec(aTokenizer.lines()[aTokenizer.index()]);
	while(match != null && typeof match !== "undefined" && match.length > 0){		
		value += match[1];
		aTokenizer.skip();		
		match = REGEX_VALUELINE.exec(aTokenizer.lines()[aTokenizer.index()]);
	}
	
	return value;
};


const Deserializer = function(aLine, aTokenizer){
	const match = REGEX_KEY.exec(aLine);
	if(typeof match === "undefined" || match == null )
		return null;
	
	return {
		key: match[1],
		value: getValue(match[4], aTokenizer),
		parameter : getParams(match[3])
	};	
};

export default Deserializer;