import Tokenizer from "./Tokenizer";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";

const BEGIN_TOKEN = /^begin$/i;
const END_TOKEN = /^end$/i;

const parseProperty = function(aToken, aConfig){
	try{
		const key = aToken.key.toLowerCase();
		if(typeof aConfig.propertyparser !== "undefined" && typeof aConfig.propertyparser[key] === "function"){
			const result = aConfig.propertyparser[key](aToken);
			if(typeof result !== "undefined")
				return result instanceof Promise ? result : Promise.resolve(result);
		}
	}catch (e){
		console.error(e)
	}
	
	if(aConfig.onlyPropertyValues)
		return  Promise.resolve(aToken.value);	
	else	
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
		.then(result => {
			if(typeof aContext === "undefined")
				return Promise.resolve(result);
			
			const context = ObjectUtils.append(aToken.value.toLowerCase(), result, aContext);
			return parse(aTokenizer, aConfig, context);
		});
	 else {
		return parseProperty(aToken, aConfig)
		.then(value => ObjectUtils.append(aToken.key.toLowerCase(), value, aContext))
		.then(context => parse(aTokenizer, aConfig, context));
	}
};

const parse = function(aTokenizer, aConfig, aContext){
	return aTokenizer.next()
	.then(aToken => {
		if(aToken)
			return parseToken(aToken, aTokenizer, aConfig, aContext);
			
		return Promise.resolve(aContext);
	});
};


const Parser = function(aText, aConfig){
	return parse(new Tokenizer(aText), (aConfig || {}))
		.then(aResult => {
			if(typeof aConfig.map === "function")
				return Promise.resolve(aConfig.map(aResult));
			
			return Promise.resolve(aResult);
		});
};
export default Parser;