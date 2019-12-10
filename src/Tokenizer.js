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

const Tokenizer = function(aText){	
	let text = aText;
	let lines = aText.split(/\r?\n/g)
	let index = 0;
	let token = null;
	return {		
		text : function(){
			return text;
		},
		skip : function(length){
			index += (length || 1);
		},
		index : function(){
			return index;
		},
		token : function(){
			return match;
		},
		lines : function(){
			return lines;
		},
		next : function(){			
			const match = REGEX_KEY.exec(lines[index++]);
			if(typeof match === "undefined" || match == null )
				return null;
			
			token = {
				key: match[1],
				value: getValue(match[4], this),
				parameter : getParams(match[3]),
				line: match[0]
			};			
			
			
			return token;
		},
		clone : function(){
			return new Tokenizer(text);
		}
	};	
};
export default Tokenizer;