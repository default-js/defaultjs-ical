import Tokenizer from "./Tokenizer";
import Utils from "./Utils";

const BEGIN_TOKEN = /^begin$/i;
const END_TOKEN = /^end$/i;

const parseProperty = function(aToken, aConfig){
	if(typeof aConfig.propertyparser !== "undefined" && typeof aConfig.propertyparser[aToken.key] === "function"){
		const result = aConfig.propertyparser[aToken.key](aToken);
		return result instanceof Promise ? result : Promise.resolve(result);
	}
	
	return Promise.resolve({
		"_type_" : "property",
		"parameter" : aToken.parameter,
		"value" : aToken.value
	});
};

const parseToken = function(aToken, aTokenizer, aConfig, aContext){	
	if(END_TOKEN.test(aToken.key))
		return Promise.resolve(aContext);
	else if(BEGIN_TOKEN.test(aToken.key))
		return parse(aTokenizer, aConfig, {})
		.then(function(aResult){
			if(typeof aContext === "undefined")
				return Promise.resolve(aResult);
			
			return Utils.appendToObject(aToken.value.toLowerCase(), aResult, aContext)
			.then(parse.bind(null,aTokenizer, aConfig));
		});
	 else {
		return parseProperty(aToken, aConfig)
		.then(function(aValue){
			return Utils.appendToObject(aToken.key.toLowerCase(), aValue, aContext);
		}).then(parse.bind(null ,aTokenizer, aConfig));
	}
};

const parse = function(aTokenizer, aConfig, aContext){
	return aTokenizer.next()
	.then(function(aToken){
		if(aToken)
			return parseToken(aToken, aTokenizer, aConfig, aContext);
			
		return Promise.resolve(aContext);
	});
};


const Parser = function(aText, aConfig){	
	return parse(new Tokenizer(aText), (aConfig || {}));
};
export default Parser;