import parse from "./parse/Parser";

const parserconfig = {
		
};



const Parser = { 
	parse : function(aText){
		return parse(aText, parserconfig);
	}
};

export default Parser;

