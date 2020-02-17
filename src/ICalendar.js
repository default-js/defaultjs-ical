import parse from "./Parser";
import ObjectUtils from "@default-js/defaultjs-common-utils/src/ObjectUtils";


const DATETIME = /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/;
const toDateTime = aToken => {
	const match = DATETIME.exec(aToken.value);
	if(!match)
		return aToken.value;
	return new Date(parseInt(match[1])
			,parseInt(match[2])
			,parseInt(match[3])
			,parseInt(match[4])
			,parseInt(match[5])
			,parseInt(match[6]));
};

const defaultconfig = {
	onlyPropertyValues: true,
	propertyparser : {
		organizer : aToken => {
			return {
				name : /([^"]+)/i.exec(aToken.parameter["cn"])[1],
				mail : /^(mailto:)?(.+)$/i.exec(aToken.value)[2]		
			};
		},
		dtstart : toDateTime,
		dtend : toDateTime
	}
};

const buildConfig = function(aConfig){
	if(typeof aConfig === "undefined" || aConfig == null)
		return defaultconfig;
	
	return ObjectUtils.merge({}, defaultconfig, aConfig);
};



const Parser = {
	parse : (aText, aConfig) => {
		return parse(aText, buildConfig(aConfig));
	}
};

export default Parser;

