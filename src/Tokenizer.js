const REGEX = /([^:;]+)(;([^:]+))?:(.+)\r?\n/m;
const Tokenizer = function(aText){
	let text = aText;
	let token = null;	
	let progression = 0;
	return {		
		text : function(){
			return text;
		},
		skip : function(length){
			text = text.slice(length);
		},
		token : function(){
			return match;
		},
		progression : function(){
			return progression;
		},
		next : function(){
			const match = REGEX.exec(text);
			if(typeof match === "undefined" || match == null )
				return null;
			progression =+ match[0].length;
			text = text.slice(match[0].length);			
			token = {
				key: match[1],
				value: match[4],
				metadata : match[3],
				input: match[0],
				__regexmatch : match
			};
			
			return token;
		},
		clone : function(){
			return new Tokenizer(text);
		}
	};	
};
export default Tokenizer;