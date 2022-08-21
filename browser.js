import {Parser, ICalendar} from "./src"

const global = window || global || self || this || {};
global.defaultjs = global.defaultjs || {};
global.defaultjs.ical = global.defaultjs.ical || {
	VERSION : "${version}",
	Parser,
	ICalendar
};

if(typeof global.fetch === "function" 
	&& typeof global.Response !== "undefined" 
	&& typeof global.Response.prototype !== "undefined" 
	&& typeof global.Response.prototype.ical === "undefined"){
	global.Response.prototype.ical = function(aConfig){
		return this.text()
		.then(function(aText){
			return ICalendar.parse(aText, aConfig);
		});
	}
};

export {Parser, ICalendar};