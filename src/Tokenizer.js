import Deserializer from "./Deserializer";
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
			token  = Deserializer(lines[index++], this);			
			return token;
		},
		clone : function(){
			return new Tokenizer(text);
		}
	};	
};
export default Tokenizer;