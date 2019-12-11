//https://tools.ietf.org/html/rfc5545#section-3.1
import Tokenizer from "./Tokenizer";
import Utils from "./Utils";

const parseProperty = function(aToken, aTokenizer){
	if(typeof aToken.value === "string")
		return aToken.value.trim();
	
	return aToken.value;
};

const parse = function(aTokenizer, aContext){
	let data = aContext;
	let token = aTokenizer.next();
	while(token){
		if(token.key == "BEGIN"){
			if(typeof data === "undefined")
				data = {};
			else{
				let object = parse(aTokenizer, {});
				Utils.appendToObject(token.value, object, data);
			}			
		} else if(token.key == "END")
			return data;
		else {
			let value = parseProperty(token, aTokenizer);
			Utils.appendToObject(token.key, {value : token.value, parameter : token.parameter}, data);
		}
		token = aTokenizer.next();
	}
	return data;
};

const Parser = function(aText){
	return parse(new Tokenizer(aText));
};
export default Parser;