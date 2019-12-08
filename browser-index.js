import pack from "./src"

const global = window || global || self || this || {};
global.defaultjs = global.defaultjs || {};
global.defaultjs.ical = global.defaultjs.ical || {
	VERSION : "${version}",
	Parser : pack.Parser
		
};