import parse from "./parse/Parser";

const parserconfig = {
	mapper : {
		organizer : function(aToken){
			console.log(aToken);
			return {
				name : /([^"]+)/i.exec(aToken.parameter["cn"])[1],
				mail : /^(mailto:)?(.+)$/i.exec(aToken.value)[2]		
			};
		}
	}		
};



const Parser = { 
	parse : function(aText){
		return parse(aText, parserconfig);
	}
};

export default Parser;

