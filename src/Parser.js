import Tokenizer from "./Tokenizer";

const parseProperty = function(aTokenizer){
	
};

const ObjectTypes = {		
	 VCALENDAR : function(aTokenizer){
		 
	 },
	 VEVENT : function(aTokenizer, aContext){
		 
	 }	
};

const parse = function(aTokinizer, aContext){
	let match = aTokinizer.next();
	while(match != null){
		if(match[1] == "BEGIN"){
			let parser = ObjectTypes[match[2]];
			if(typeof parser !== "undefined"){
				let object = parser(tokenizer, data);
				if(typeof aContext === "undefined")
					return object	
			}
		}
		match = tokenizer.next();
	}		
};

const Parser = {
	parse : function(aText){
		return parse(new Tokenizer(aText))
	}
};


export default Parser;