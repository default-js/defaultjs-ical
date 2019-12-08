const REGEX = /([^:]+):(.+)\r?\n/m;
const Tokenizer = function(aText){
	let text = aText;
	let match = null;	
	return {		
		text : function(){
			return text;
		},
		skip : function(length){
			text = text.slice(length);
		},
		match : function(){
			return match;
		},
		next : function(){
			match = REGEX.exec(text);
			if(typeof match === "undefined" || match == null )
				return null;
			
			text = text.slice(match[0].length);			
			return match;
		}
	};	
};
export default Tokenizer;