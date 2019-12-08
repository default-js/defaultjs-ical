import Tokenizer from "./Tokenizer";

const parseProperty = function(aTokenizer){
	
};

const ObjectTypes = {		
	 VCALENDAR : function(aTokenizer, aContext){
		 
	 },
	 VEVENT : function(aTokenizer, aContext){
		 
	 }	
};

const parse = function(aText){
	let data = undefined;
	const tokenizer = new Tokenizer(aText);
	let match = tokenizer.next();
	while(match != null){
		if(match[1] == "BEGIN"){
			let parser = ObjectTypes[match[2]];
			if(typeof parser !== "undefined"){
				let object = parseObject(tokenizer, data);
				if(typeof data === "undefined")
					data = object;	
			}
		}
	}
	
	return data;		
};
export default parse;