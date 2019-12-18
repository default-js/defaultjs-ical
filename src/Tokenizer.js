import Deserializer from "./Deserializer";

const Tokenizer = function(theLines, aIndex){
	let lines = theLines;
	let index = aIndex || -1;
	let token = null;
	return {
		reset : function(){
			index = -1;
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
			index++;
			if(index < lines.length)
				token = Deserializer(lines[index], this);
			else
				token = null;
			
			return Promise.resolve(token);
		},
		clone : function(){
			return new Tokenizer(lines, index);
		}
	};	
};
export default function(aText){
	return new Tokenizer(aText.split(/\r?\n/g))
};