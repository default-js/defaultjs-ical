//https://tools.ietf.org/html/rfc5545#section-3.1
import Tokenizer from "./Tokenizer";

const parseProperty = function(aToken, aTokenizer){
	if(typeof aToken.value === "string")
		return aToken.value.trim();
	
	return aToken.value;
};

const append = function(aKey, aData, aContext){
	if(typeof aData === "undefined")
		return;
	
	let key = aKey.toLowerCase().trim();	
	if(typeof aContext[key] === "undefined")
		aContext[key] = aData;
	else{		
		let data = aContext[key];
		if(data instanceof Array)
			data.push(aData);
		else
			aContext[key] = [aContext[key], aData];
	}	
};

const parse = function(aTokenizer, aContext){
	let data = aContext;
	let token = aTokenizer.next();
	while(token){
		console.log(token);
		if(token.key == "BEGIN"){
			console.log("BEGIN of", token.value);
			if(typeof data === "undefined")
				data = {};
			else{
				let object = parse(aTokenizer, {});
				append(token.value, object, data);
			}			
		} else if(token.key == "END"){
			console.log("END of", token.value);
			return data;
		} else {
			let value = parseProperty(token, aTokenizer);
			append(token.key, value, data);
		}
		token = aTokenizer.next();
	}
	return data;
};

const Parser = function(aText){
	return parse(new Tokenizer(aText));
};


export default Parser;