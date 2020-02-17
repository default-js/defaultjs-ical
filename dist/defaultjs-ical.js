/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/index */ "./src/index.js");


/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/Escaper.js":
/*!************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/Escaper.js ***!
  \************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// required to build the internal escape filter for regex
const REGEXCHARMAP = ["\\","?","[", "]", "{", "}", "(", ")", ".", "^", "$"]
	.map(char => { 
		return {f: new RegExp("\\" +char, "g"), v : "\\" + char};
	});


const mapping = (aText, theFilters) => {
	let text = aText;
	theFilters.forEach(item => {
		text = text.replace(item.f, item.v);
	});
	return text;
};

const buildUnescapeList = (aCharMap, isCaseSensitiv) => {
	const option = isCaseSensitiv ? "mg" : "mgi"; 
	return aCharMap.map(item => {
		if(!item.at || item.at == "unescape")
			return {f: new RegExp(mapping(item.escaped, REGEXCHARMAP), option), v: item.char}
	}).filter(item => !!item);
};

const buildEscapeList = (aCharMap, isCaseSensitiv) => {
	const option = isCaseSensitiv ? "mg" : "mgi"; 
	return aCharMap.map(item => {
		if(!item.at || item.at == "escape")
			return {f: new RegExp(mapping(item.char,REGEXCHARMAP), option), v: item.escaped}
	}).filter(item => !!item);
};
class Escaper {
	constructor(escapeMap, isCaseSensitiv){
		this.escapeMap = buildEscapeList(escapeMap, isCaseSensitiv)
		this.unescapeMap = buildUnescapeList(escapeMap, isCaseSensitiv)
	}
	
	escape(aText){
		return mapping(aText, this.escapeMap);
	}
	
	unescape(aText){
		return mapping(aText, this.unescapeMap);
	}
	
	static REGEXP_ESCAPER(){
		return new Escaper([
			{char: "\\", escaped : "\\\\"},
			{char: "?", escaped : "\\?"},
			{char: "[", escaped : "\\["},
			{char: "]", escaped : "\\]"},
			{char: "{", escaped : "\\{"},
			{char: "}", escaped : "\\}"},
			{char: "(", escaped : "\\("},
			{char: ")", escaped : "\\)"},
			{char: ".", escaped : "\\."},
			{char: "^", escaped : "\\^"},
			{char: "$", escaped : "\\$"}
		]);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Escaper);



/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 * append a propery value to an object. If propery exists its would be converted to an array
 * 
 *  @param aKey:string name of property
 *  @param aData:any property value
 *  @param aObject:object the object to append the property
 *  
 *  @return returns the changed object
 */
const append = function(aKey, aData, aObject){
	if(typeof aData !== "undefined"){		
		const key = aKey.toLowerCase().trim();	
		if(typeof aObject[key] === "undefined")
			aObject[key] = aData;
		else{		
			const data = aObject[key];
			if(data instanceof Array)
				data.push(aData);
			else
				aObject[key] = [aObject[key], aData];
		}
	}	
	return aObject;
};

/**
 * checked if an object a simple object. No Array, Map or something else.
 * 
 * @param aObject:object the object to be testing
 * 
 * @return boolean
 */
const isPojo = function(aObject){
	return typeof aObject !== "undefined" && aObject != null && aObject.constructor.name === "Object"
}

/**
 * merging object into a target object. Its only merge simple object and sub objects. Every other 
 * value would be replaced by value from the source object.
 * 
 * sample: merge(target, source-1, source-2, ...source-n)
 * 
 * @param aTarget:object the target object to merging into
 * @param aSources:object
 * 
 * @return object returns the target object
 */
const merge = function(aTarget){	
	for(let i = 1; i < arguments.length; i++){
		const source = arguments[i];
		Object.getOwnPropertyNames(source).forEach(aKey => {
			if(isPojo(aTarget[aKey]))
				merge(aTarget[aKey], source[aKey]);
			else
				aTarget[aKey] = source[aKey];
		});
	}
	
	return aTarget;
}

/* harmony default export */ __webpack_exports__["a"] = ({
	isPojo : isPojo,
	append: append,
	merge : merge
});

/***/ }),

/***/ "./src/Deserializer.js":
/*!*****************************!*\
  !*** ./src/Deserializer.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _default_js_defaultjs_common_utils_src_Escaper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Escaper */ "./node_modules/@default-js/defaultjs-common-utils/src/Escaper.js");


//const REGEX_KEY = /^([^\s:;]+)(;([^:]+))?:(.+)$/;
const REGEX_VALUELINE = /^\s(.+)$/;

const KEY_VALUE_SPLIT = /:/;
const PARAM_SPLIT = /;/;
const PARAM_VALUE_SPLIT = /=/;

const ESCAPER = new _default_js_defaultjs_common_utils_src_Escaper__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]([
	{char: ",", escaped:"\\,"},
	{char: ";", escaped:"\\;"},
	{char: ":", escaped:"\\:"},
]);


const getParameter = function(aText){
	if(aText == null || typeof aText === "undefined")
		return;
	const items = aText.split(PARAM_SPLIT);
	const params = {};
	items.forEach(item => {
		const parts = item.split(PARAM_VALUE_SPLIT);
		params[parts[0].toLowerCase()] = parts[1];
	})
	
	return params;
};

const getValue = function(aValue, aTokenizer){
	let value = aValue;
	let match = REGEX_VALUELINE.exec(aTokenizer.lines()[aTokenizer.index() + 1]);
	while(match != null && typeof match !== "undefined" && match.length > 0){		
		value += match[1];
		aTokenizer.skip();
		match = REGEX_VALUELINE.exec(aTokenizer.lines()[aTokenizer.index() + 1]);
	}
	
	return ESCAPER.unescape(value);
};


const Deserializer = function(aLine, aTokenizer){
	let index = aLine.search(KEY_VALUE_SPLIT);
	if(index == -1)
		return;
	
	const result = {
			key : aLine.substring(0, index),
			value : getValue(aLine.substring(index + 1), aTokenizer)
	};
	
	index = result.key.search(PARAM_SPLIT);
	if(index != -1){
		result.parameter = getParameter(result.key.substring(index + 1));
		result.key = result.key.substring(0, index);
	}
		
	
	return result
};

/* harmony default export */ __webpack_exports__["a"] = (Deserializer);

/***/ }),

/***/ "./src/ICalendar.js":
/*!**************************!*\
  !*** ./src/ICalendar.js ***!
  \**************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Parser */ "./src/Parser.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");




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
	
	return _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].merge({}, defaultconfig, aConfig);
};



const Parser = {
	parse : (aText, aConfig) => {
		return Object(_Parser__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(aText, buildConfig(aConfig));
	}
};

/* harmony default export */ __webpack_exports__["a"] = (Parser);



/***/ }),

/***/ "./src/Parser.js":
/*!***********************!*\
  !*** ./src/Parser.js ***!
  \***********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Tokenizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tokenizer */ "./src/Tokenizer.js");
/* harmony import */ var _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/ObjectUtils */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js");



const BEGIN_TOKEN = /^begin$/i;
const END_TOKEN = /^end$/i;

const parseProperty = function(aToken, aConfig){
	try{
		const key = aToken.key.toLowerCase();
		if(typeof aConfig.propertyparser !== "undefined" && typeof aConfig.propertyparser[key] === "function"){
			const result = aConfig.propertyparser[key](aToken);
			if(typeof result !== "undefined")
				return result instanceof Promise ? result : Promise.resolve(result);
		}
	}catch (e){
		console.error(e)
	}
	
	if(aConfig.onlyPropertyValues)
		return  Promise.resolve(aToken.value);	
	else	
		return Promise.resolve({
			"_type_" : "property",
			"parameter" : aToken.parameter,
			"value" : aToken.value
		});
};

const parseToken = function(aToken, aTokenizer, aConfig, aContext){	
	if(END_TOKEN.test(aToken.key))
		return Promise.resolve(aContext);
	else if(BEGIN_TOKEN.test(aToken.key))
		return parse(aTokenizer, aConfig, {})
		.then(result => {
			if(typeof aContext === "undefined")
				return Promise.resolve(result);
			
			const context = _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].append(aToken.value.toLowerCase(), result, aContext);
			return parse(aTokenizer, aConfig, context);
		});
	 else {
		return parseProperty(aToken, aConfig)
		.then(value => _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].append(aToken.key.toLowerCase(), value, aContext))
		.then(context => parse(aTokenizer, aConfig, context));
	}
};

const parse = function(aTokenizer, aConfig, aContext){
	return aTokenizer.next()
	.then(aToken => {
		if(aToken)
			return parseToken(aToken, aTokenizer, aConfig, aContext);
			
		return Promise.resolve(aContext);
	});
};


const Parser = function(aText, aConfig){
	return parse(new _Tokenizer__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](aText), (aConfig || {}))
		.then(aResult => {
			if(typeof aConfig.map === "function")
				return Promise.resolve(aConfig.map(aResult));
			
			return Promise.resolve(aResult);
		});
};
/* harmony default export */ __webpack_exports__["a"] = (Parser);

/***/ }),

/***/ "./src/Tokenizer.js":
/*!**************************!*\
  !*** ./src/Tokenizer.js ***!
  \**************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Deserializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Deserializer */ "./src/Deserializer.js");


const Tokenizer = function(theLines, aIndex){
	const lines = theLines;
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
				token = Object(_Deserializer__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(lines[index], this);
			else
				token = null;
			
			return Promise.resolve(token);
		},
		clone : function(){
			return new Tokenizer(lines, index);
		}
	};	
};
/* harmony default export */ __webpack_exports__["a"] = (function(aText){
	return new Tokenizer(aText.split(/\r?\n/g).filter(line => line.trim().length > 0))
});;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Parser */ "./src/Parser.js");
/* harmony import */ var _ICalendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ICalendar */ "./src/ICalendar.js");



const pack = {
	Parser : _Parser__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"],
	ICalendar : _ICalendar__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]
};

/* unused harmony default export */ var _unused_webpack_default_export = (pack);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0VzY2FwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9EZXNlcmlhbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0lDYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGFyc2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9Ub2tlbml6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQSwyQ0FBMkMsS0FBSztBQUNoRCxlO0FBQ0EsVUFBVTtBQUNWLEVBQUU7OztBQUdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQSw4QztBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsRUFBRTtBQUNGOztBQUVBO0FBQ0EsOEM7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSw2QkFBNkI7QUFDakMsSUFBSSwyQkFBMkI7QUFDL0IsSUFBSSwyQkFBMkI7QUFDL0IsSUFBSSwyQkFBMkI7QUFDL0IsSUFBSSxRQUFRLGlCQUFpQixFQUFFO0FBQy9CLElBQUksUUFBUSxpQkFBaUIsRUFBRTtBQUMvQixJQUFJLDJCQUEyQjtBQUMvQixJQUFJLDJCQUEyQjtBQUMvQixJQUFJLDJCQUEyQjtBQUMvQixJQUFJLDJCQUEyQjtBQUMvQixJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVlLGdFQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RHZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0M7QUFDQSx3QztBQUNBO0FBQ0E7QUFDQSxPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDO0FBQ0EsZUFBZSxzQkFBc0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7Ozs7QUNsRUQ7QUFBcUU7O0FBRXJFLDZCQUE2QixLQUFLO0FBQ2xDOztBQUVBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBLG9CQUFvQiw4RkFBTztBQUMzQixFQUFFLHlCQUF5QjtBQUMzQixFQUFFLFFBQVEsZUFBZSxFQUFFO0FBQzNCLEVBQUUseUJBQXlCO0FBQzNCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFZSxxRUFBWSxFOzs7Ozs7Ozs7Ozs7O0FDOUQzQjtBQUFBO0FBQTZCO0FBQ2dEOzs7QUFHN0Usc0JBQXNCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQVEsa0dBQVcsU0FBUztBQUM1Qjs7OztBQUlBO0FBQ0E7QUFDQSxTQUFTLCtEQUFLO0FBQ2Q7QUFDQTs7QUFFZSwrREFBTSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM5Q3RCO0FBQUE7QUFBb0M7QUFDeUM7O0FBRTdFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0Esd0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLG1FO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsa0dBQVc7QUFDOUI7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGlCQUFpQixrR0FBVztBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjs7O0FBR0E7QUFDQSxrQkFBa0IsMERBQVMsdUJBQXVCO0FBQ2xEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNlLCtEQUFNLEU7Ozs7Ozs7Ozs7Ozs7QUNuRXJCO0FBQTBDOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNILG9CO0FBQ0E7QUFDQTtBQUNBLFlBQVkscUVBQVk7QUFDeEI7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHO0FBQ0E7QUFDZTtBQUNmO0FBQ0EsQ0FBQyxHOzs7Ozs7Ozs7Ozs7QUN0Q0Q7QUFBQTtBQUE4QjtBQUNNOztBQUVwQztBQUNBLFVBQVUsdURBQU07QUFDaEIsYUFBYSwwREFBUztBQUN0Qjs7QUFFZSw4RUFBSSxFIiwiZmlsZSI6ImRlZmF1bHRqcy1pY2FsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBcIi4vc3JjL2luZGV4XCI7IiwiLy8gcmVxdWlyZWQgdG8gYnVpbGQgdGhlIGludGVybmFsIGVzY2FwZSBmaWx0ZXIgZm9yIHJlZ2V4XG5jb25zdCBSRUdFWENIQVJNQVAgPSBbXCJcXFxcXCIsXCI/XCIsXCJbXCIsIFwiXVwiLCBcIntcIiwgXCJ9XCIsIFwiKFwiLCBcIilcIiwgXCIuXCIsIFwiXlwiLCBcIiRcIl1cblx0Lm1hcChjaGFyID0+IHsgXG5cdFx0cmV0dXJuIHtmOiBuZXcgUmVnRXhwKFwiXFxcXFwiICtjaGFyLCBcImdcIiksIHYgOiBcIlxcXFxcIiArIGNoYXJ9O1xuXHR9KTtcblxuXG5jb25zdCBtYXBwaW5nID0gKGFUZXh0LCB0aGVGaWx0ZXJzKSA9PiB7XG5cdGxldCB0ZXh0ID0gYVRleHQ7XG5cdHRoZUZpbHRlcnMuZm9yRWFjaChpdGVtID0+IHtcblx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKGl0ZW0uZiwgaXRlbS52KTtcblx0fSk7XG5cdHJldHVybiB0ZXh0O1xufTtcblxuY29uc3QgYnVpbGRVbmVzY2FwZUxpc3QgPSAoYUNoYXJNYXAsIGlzQ2FzZVNlbnNpdGl2KSA9PiB7XG5cdGNvbnN0IG9wdGlvbiA9IGlzQ2FzZVNlbnNpdGl2ID8gXCJtZ1wiIDogXCJtZ2lcIjsgXG5cdHJldHVybiBhQ2hhck1hcC5tYXAoaXRlbSA9PiB7XG5cdFx0aWYoIWl0ZW0uYXQgfHwgaXRlbS5hdCA9PSBcInVuZXNjYXBlXCIpXG5cdFx0XHRyZXR1cm4ge2Y6IG5ldyBSZWdFeHAobWFwcGluZyhpdGVtLmVzY2FwZWQsIFJFR0VYQ0hBUk1BUCksIG9wdGlvbiksIHY6IGl0ZW0uY2hhcn1cblx0fSkuZmlsdGVyKGl0ZW0gPT4gISFpdGVtKTtcbn07XG5cbmNvbnN0IGJ1aWxkRXNjYXBlTGlzdCA9IChhQ2hhck1hcCwgaXNDYXNlU2Vuc2l0aXYpID0+IHtcblx0Y29uc3Qgb3B0aW9uID0gaXNDYXNlU2Vuc2l0aXYgPyBcIm1nXCIgOiBcIm1naVwiOyBcblx0cmV0dXJuIGFDaGFyTWFwLm1hcChpdGVtID0+IHtcblx0XHRpZighaXRlbS5hdCB8fCBpdGVtLmF0ID09IFwiZXNjYXBlXCIpXG5cdFx0XHRyZXR1cm4ge2Y6IG5ldyBSZWdFeHAobWFwcGluZyhpdGVtLmNoYXIsUkVHRVhDSEFSTUFQKSwgb3B0aW9uKSwgdjogaXRlbS5lc2NhcGVkfVxuXHR9KS5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0pO1xufTtcbmNsYXNzIEVzY2FwZXIge1xuXHRjb25zdHJ1Y3Rvcihlc2NhcGVNYXAsIGlzQ2FzZVNlbnNpdGl2KXtcblx0XHR0aGlzLmVzY2FwZU1hcCA9IGJ1aWxkRXNjYXBlTGlzdChlc2NhcGVNYXAsIGlzQ2FzZVNlbnNpdGl2KVxuXHRcdHRoaXMudW5lc2NhcGVNYXAgPSBidWlsZFVuZXNjYXBlTGlzdChlc2NhcGVNYXAsIGlzQ2FzZVNlbnNpdGl2KVxuXHR9XG5cdFxuXHRlc2NhcGUoYVRleHQpe1xuXHRcdHJldHVybiBtYXBwaW5nKGFUZXh0LCB0aGlzLmVzY2FwZU1hcCk7XG5cdH1cblx0XG5cdHVuZXNjYXBlKGFUZXh0KXtcblx0XHRyZXR1cm4gbWFwcGluZyhhVGV4dCwgdGhpcy51bmVzY2FwZU1hcCk7XG5cdH1cblx0XG5cdHN0YXRpYyBSRUdFWFBfRVNDQVBFUigpe1xuXHRcdHJldHVybiBuZXcgRXNjYXBlcihbXG5cdFx0XHR7Y2hhcjogXCJcXFxcXCIsIGVzY2FwZWQgOiBcIlxcXFxcXFxcXCJ9LFxuXHRcdFx0e2NoYXI6IFwiP1wiLCBlc2NhcGVkIDogXCJcXFxcP1wifSxcblx0XHRcdHtjaGFyOiBcIltcIiwgZXNjYXBlZCA6IFwiXFxcXFtcIn0sXG5cdFx0XHR7Y2hhcjogXCJdXCIsIGVzY2FwZWQgOiBcIlxcXFxdXCJ9LFxuXHRcdFx0e2NoYXI6IFwie1wiLCBlc2NhcGVkIDogXCJcXFxce1wifSxcblx0XHRcdHtjaGFyOiBcIn1cIiwgZXNjYXBlZCA6IFwiXFxcXH1cIn0sXG5cdFx0XHR7Y2hhcjogXCIoXCIsIGVzY2FwZWQgOiBcIlxcXFwoXCJ9LFxuXHRcdFx0e2NoYXI6IFwiKVwiLCBlc2NhcGVkIDogXCJcXFxcKVwifSxcblx0XHRcdHtjaGFyOiBcIi5cIiwgZXNjYXBlZCA6IFwiXFxcXC5cIn0sXG5cdFx0XHR7Y2hhcjogXCJeXCIsIGVzY2FwZWQgOiBcIlxcXFxeXCJ9LFxuXHRcdFx0e2NoYXI6IFwiJFwiLCBlc2NhcGVkIDogXCJcXFxcJFwifVxuXHRcdF0pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVzY2FwZXI7XG5cbiIsIlxyXG4vKipcclxuICogYXBwZW5kIGEgcHJvcGVyeSB2YWx1ZSB0byBhbiBvYmplY3QuIElmIHByb3BlcnkgZXhpc3RzIGl0cyB3b3VsZCBiZSBjb252ZXJ0ZWQgdG8gYW4gYXJyYXlcclxuICogXHJcbiAqICBAcGFyYW0gYUtleTpzdHJpbmcgbmFtZSBvZiBwcm9wZXJ0eVxyXG4gKiAgQHBhcmFtIGFEYXRhOmFueSBwcm9wZXJ0eSB2YWx1ZVxyXG4gKiAgQHBhcmFtIGFPYmplY3Q6b2JqZWN0IHRoZSBvYmplY3QgdG8gYXBwZW5kIHRoZSBwcm9wZXJ0eVxyXG4gKiAgXHJcbiAqICBAcmV0dXJuIHJldHVybnMgdGhlIGNoYW5nZWQgb2JqZWN0XHJcbiAqL1xyXG5jb25zdCBhcHBlbmQgPSBmdW5jdGlvbihhS2V5LCBhRGF0YSwgYU9iamVjdCl7XHJcblx0aWYodHlwZW9mIGFEYXRhICE9PSBcInVuZGVmaW5lZFwiKXtcdFx0XHJcblx0XHRjb25zdCBrZXkgPSBhS2V5LnRvTG93ZXJDYXNlKCkudHJpbSgpO1x0XHJcblx0XHRpZih0eXBlb2YgYU9iamVjdFtrZXldID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRhT2JqZWN0W2tleV0gPSBhRGF0YTtcclxuXHRcdGVsc2V7XHRcdFxyXG5cdFx0XHRjb25zdCBkYXRhID0gYU9iamVjdFtrZXldO1xyXG5cdFx0XHRpZihkYXRhIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdFx0ZGF0YS5wdXNoKGFEYXRhKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGFPYmplY3Rba2V5XSA9IFthT2JqZWN0W2tleV0sIGFEYXRhXTtcclxuXHRcdH1cclxuXHR9XHRcclxuXHRyZXR1cm4gYU9iamVjdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBjaGVja2VkIGlmIGFuIG9iamVjdCBhIHNpbXBsZSBvYmplY3QuIE5vIEFycmF5LCBNYXAgb3Igc29tZXRoaW5nIGVsc2UuXHJcbiAqIFxyXG4gKiBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBiZSB0ZXN0aW5nXHJcbiAqIFxyXG4gKiBAcmV0dXJuIGJvb2xlYW5cclxuICovXHJcbmNvbnN0IGlzUG9qbyA9IGZ1bmN0aW9uKGFPYmplY3Qpe1xyXG5cdHJldHVybiB0eXBlb2YgYU9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhT2JqZWN0ICE9IG51bGwgJiYgYU9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIk9iamVjdFwiXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBtZXJnaW5nIG9iamVjdCBpbnRvIGEgdGFyZ2V0IG9iamVjdC4gSXRzIG9ubHkgbWVyZ2Ugc2ltcGxlIG9iamVjdCBhbmQgc3ViIG9iamVjdHMuIEV2ZXJ5IG90aGVyIFxyXG4gKiB2YWx1ZSB3b3VsZCBiZSByZXBsYWNlZCBieSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2Ugb2JqZWN0LlxyXG4gKiBcclxuICogc2FtcGxlOiBtZXJnZSh0YXJnZXQsIHNvdXJjZS0xLCBzb3VyY2UtMiwgLi4uc291cmNlLW4pXHJcbiAqIFxyXG4gKiBAcGFyYW0gYVRhcmdldDpvYmplY3QgdGhlIHRhcmdldCBvYmplY3QgdG8gbWVyZ2luZyBpbnRvXHJcbiAqIEBwYXJhbSBhU291cmNlczpvYmplY3RcclxuICogXHJcbiAqIEByZXR1cm4gb2JqZWN0IHJldHVybnMgdGhlIHRhcmdldCBvYmplY3RcclxuICovXHJcbmNvbnN0IG1lcmdlID0gZnVuY3Rpb24oYVRhcmdldCl7XHRcclxuXHRmb3IobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKXtcclxuXHRcdGNvbnN0IHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcclxuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaChhS2V5ID0+IHtcclxuXHRcdFx0aWYoaXNQb2pvKGFUYXJnZXRbYUtleV0pKVxyXG5cdFx0XHRcdG1lcmdlKGFUYXJnZXRbYUtleV0sIHNvdXJjZVthS2V5XSk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRhVGFyZ2V0W2FLZXldID0gc291cmNlW2FLZXldO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiBhVGFyZ2V0O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0aXNQb2pvIDogaXNQb2pvLFxyXG5cdGFwcGVuZDogYXBwZW5kLFxyXG5cdG1lcmdlIDogbWVyZ2VcclxufTsiLCJpbXBvcnQgRXNjYXBlciBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvRXNjYXBlclwiO1xyXG5cclxuLy9jb25zdCBSRUdFWF9LRVkgPSAvXihbXlxcczo7XSspKDsoW146XSspKT86KC4rKSQvO1xyXG5jb25zdCBSRUdFWF9WQUxVRUxJTkUgPSAvXlxccyguKykkLztcclxuXHJcbmNvbnN0IEtFWV9WQUxVRV9TUExJVCA9IC86LztcclxuY29uc3QgUEFSQU1fU1BMSVQgPSAvOy87XHJcbmNvbnN0IFBBUkFNX1ZBTFVFX1NQTElUID0gLz0vO1xyXG5cclxuY29uc3QgRVNDQVBFUiA9IG5ldyBFc2NhcGVyKFtcclxuXHR7Y2hhcjogXCIsXCIsIGVzY2FwZWQ6XCJcXFxcLFwifSxcclxuXHR7Y2hhcjogXCI7XCIsIGVzY2FwZWQ6XCJcXFxcO1wifSxcclxuXHR7Y2hhcjogXCI6XCIsIGVzY2FwZWQ6XCJcXFxcOlwifSxcclxuXSk7XHJcblxyXG5cclxuY29uc3QgZ2V0UGFyYW1ldGVyID0gZnVuY3Rpb24oYVRleHQpe1xyXG5cdGlmKGFUZXh0ID09IG51bGwgfHwgdHlwZW9mIGFUZXh0ID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0cmV0dXJuO1xyXG5cdGNvbnN0IGl0ZW1zID0gYVRleHQuc3BsaXQoUEFSQU1fU1BMSVQpO1xyXG5cdGNvbnN0IHBhcmFtcyA9IHt9O1xyXG5cdGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcblx0XHRjb25zdCBwYXJ0cyA9IGl0ZW0uc3BsaXQoUEFSQU1fVkFMVUVfU1BMSVQpO1xyXG5cdFx0cGFyYW1zW3BhcnRzWzBdLnRvTG93ZXJDYXNlKCldID0gcGFydHNbMV07XHJcblx0fSlcclxuXHRcclxuXHRyZXR1cm4gcGFyYW1zO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0VmFsdWUgPSBmdW5jdGlvbihhVmFsdWUsIGFUb2tlbml6ZXIpe1xyXG5cdGxldCB2YWx1ZSA9IGFWYWx1ZTtcclxuXHRsZXQgbWF0Y2ggPSBSRUdFWF9WQUxVRUxJTkUuZXhlYyhhVG9rZW5pemVyLmxpbmVzKClbYVRva2VuaXplci5pbmRleCgpICsgMV0pO1xyXG5cdHdoaWxlKG1hdGNoICE9IG51bGwgJiYgdHlwZW9mIG1hdGNoICE9PSBcInVuZGVmaW5lZFwiICYmIG1hdGNoLmxlbmd0aCA+IDApe1x0XHRcclxuXHRcdHZhbHVlICs9IG1hdGNoWzFdO1xyXG5cdFx0YVRva2VuaXplci5za2lwKCk7XHJcblx0XHRtYXRjaCA9IFJFR0VYX1ZBTFVFTElORS5leGVjKGFUb2tlbml6ZXIubGluZXMoKVthVG9rZW5pemVyLmluZGV4KCkgKyAxXSk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiBFU0NBUEVSLnVuZXNjYXBlKHZhbHVlKTtcclxufTtcclxuXHJcblxyXG5jb25zdCBEZXNlcmlhbGl6ZXIgPSBmdW5jdGlvbihhTGluZSwgYVRva2VuaXplcil7XHJcblx0bGV0IGluZGV4ID0gYUxpbmUuc2VhcmNoKEtFWV9WQUxVRV9TUExJVCk7XHJcblx0aWYoaW5kZXggPT0gLTEpXHJcblx0XHRyZXR1cm47XHJcblx0XHJcblx0Y29uc3QgcmVzdWx0ID0ge1xyXG5cdFx0XHRrZXkgOiBhTGluZS5zdWJzdHJpbmcoMCwgaW5kZXgpLFxyXG5cdFx0XHR2YWx1ZSA6IGdldFZhbHVlKGFMaW5lLnN1YnN0cmluZyhpbmRleCArIDEpLCBhVG9rZW5pemVyKVxyXG5cdH07XHJcblx0XHJcblx0aW5kZXggPSByZXN1bHQua2V5LnNlYXJjaChQQVJBTV9TUExJVCk7XHJcblx0aWYoaW5kZXggIT0gLTEpe1xyXG5cdFx0cmVzdWx0LnBhcmFtZXRlciA9IGdldFBhcmFtZXRlcihyZXN1bHQua2V5LnN1YnN0cmluZyhpbmRleCArIDEpKTtcclxuXHRcdHJlc3VsdC5rZXkgPSByZXN1bHQua2V5LnN1YnN0cmluZygwLCBpbmRleCk7XHJcblx0fVxyXG5cdFx0XHJcblx0XHJcblx0cmV0dXJuIHJlc3VsdFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGVzZXJpYWxpemVyOyIsImltcG9ydCBwYXJzZSBmcm9tIFwiLi9QYXJzZXJcIjtcclxuaW1wb3J0IE9iamVjdFV0aWxzIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlsc1wiO1xyXG5cclxuXHJcbmNvbnN0IERBVEVUSU1FID0gLyhcXGR7NH0pKFxcZHsyfSkoXFxkezJ9KVQoXFxkezJ9KShcXGR7Mn0pKFxcZHsyfSkvO1xyXG5jb25zdCB0b0RhdGVUaW1lID0gYVRva2VuID0+IHtcclxuXHRjb25zdCBtYXRjaCA9IERBVEVUSU1FLmV4ZWMoYVRva2VuLnZhbHVlKTtcclxuXHRpZighbWF0Y2gpXHJcblx0XHRyZXR1cm4gYVRva2VuLnZhbHVlO1xyXG5cdHJldHVybiBuZXcgRGF0ZShwYXJzZUludChtYXRjaFsxXSlcclxuXHRcdFx0LHBhcnNlSW50KG1hdGNoWzJdKVxyXG5cdFx0XHQscGFyc2VJbnQobWF0Y2hbM10pXHJcblx0XHRcdCxwYXJzZUludChtYXRjaFs0XSlcclxuXHRcdFx0LHBhcnNlSW50KG1hdGNoWzVdKVxyXG5cdFx0XHQscGFyc2VJbnQobWF0Y2hbNl0pKTtcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRjb25maWcgPSB7XHJcblx0b25seVByb3BlcnR5VmFsdWVzOiB0cnVlLFxyXG5cdHByb3BlcnR5cGFyc2VyIDoge1xyXG5cdFx0b3JnYW5pemVyIDogYVRva2VuID0+IHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRuYW1lIDogLyhbXlwiXSspL2kuZXhlYyhhVG9rZW4ucGFyYW1ldGVyW1wiY25cIl0pWzFdLFxyXG5cdFx0XHRcdG1haWwgOiAvXihtYWlsdG86KT8oLispJC9pLmV4ZWMoYVRva2VuLnZhbHVlKVsyXVx0XHRcclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblx0XHRkdHN0YXJ0IDogdG9EYXRlVGltZSxcclxuXHRcdGR0ZW5kIDogdG9EYXRlVGltZVxyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkQ29uZmlnID0gZnVuY3Rpb24oYUNvbmZpZyl7XHJcblx0aWYodHlwZW9mIGFDb25maWcgPT09IFwidW5kZWZpbmVkXCIgfHwgYUNvbmZpZyA9PSBudWxsKVxyXG5cdFx0cmV0dXJuIGRlZmF1bHRjb25maWc7XHJcblx0XHJcblx0cmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlKHt9LCBkZWZhdWx0Y29uZmlnLCBhQ29uZmlnKTtcclxufTtcclxuXHJcblxyXG5cclxuY29uc3QgUGFyc2VyID0ge1xyXG5cdHBhcnNlIDogKGFUZXh0LCBhQ29uZmlnKSA9PiB7XHJcblx0XHRyZXR1cm4gcGFyc2UoYVRleHQsIGJ1aWxkQ29uZmlnKGFDb25maWcpKTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYXJzZXI7XHJcblxyXG4iLCJpbXBvcnQgVG9rZW5pemVyIGZyb20gXCIuL1Rva2VuaXplclwiO1xyXG5pbXBvcnQgT2JqZWN0VXRpbHMgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzXCI7XHJcblxyXG5jb25zdCBCRUdJTl9UT0tFTiA9IC9eYmVnaW4kL2k7XHJcbmNvbnN0IEVORF9UT0tFTiA9IC9eZW5kJC9pO1xyXG5cclxuY29uc3QgcGFyc2VQcm9wZXJ0eSA9IGZ1bmN0aW9uKGFUb2tlbiwgYUNvbmZpZyl7XHJcblx0dHJ5e1xyXG5cdFx0Y29uc3Qga2V5ID0gYVRva2VuLmtleS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0aWYodHlwZW9mIGFDb25maWcucHJvcGVydHlwYXJzZXIgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGFDb25maWcucHJvcGVydHlwYXJzZXJba2V5XSA9PT0gXCJmdW5jdGlvblwiKXtcclxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gYUNvbmZpZy5wcm9wZXJ0eXBhcnNlcltrZXldKGFUb2tlbik7XHJcblx0XHRcdGlmKHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdFx0cmV0dXJuIHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UgPyByZXN1bHQgOiBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcclxuXHRcdH1cclxuXHR9Y2F0Y2ggKGUpe1xyXG5cdFx0Y29uc29sZS5lcnJvcihlKVxyXG5cdH1cclxuXHRcclxuXHRpZihhQ29uZmlnLm9ubHlQcm9wZXJ0eVZhbHVlcylcclxuXHRcdHJldHVybiAgUHJvbWlzZS5yZXNvbHZlKGFUb2tlbi52YWx1ZSk7XHRcclxuXHRlbHNlXHRcclxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xyXG5cdFx0XHRcIl90eXBlX1wiIDogXCJwcm9wZXJ0eVwiLFxyXG5cdFx0XHRcInBhcmFtZXRlclwiIDogYVRva2VuLnBhcmFtZXRlcixcclxuXHRcdFx0XCJ2YWx1ZVwiIDogYVRva2VuLnZhbHVlXHJcblx0XHR9KTtcclxufTtcclxuXHJcbmNvbnN0IHBhcnNlVG9rZW4gPSBmdW5jdGlvbihhVG9rZW4sIGFUb2tlbml6ZXIsIGFDb25maWcsIGFDb250ZXh0KXtcdFxyXG5cdGlmKEVORF9UT0tFTi50ZXN0KGFUb2tlbi5rZXkpKVxyXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhQ29udGV4dCk7XHJcblx0ZWxzZSBpZihCRUdJTl9UT0tFTi50ZXN0KGFUb2tlbi5rZXkpKVxyXG5cdFx0cmV0dXJuIHBhcnNlKGFUb2tlbml6ZXIsIGFDb25maWcsIHt9KVxyXG5cdFx0LnRoZW4ocmVzdWx0ID0+IHtcclxuXHRcdFx0aWYodHlwZW9mIGFDb250ZXh0ID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcclxuXHRcdFx0XHJcblx0XHRcdGNvbnN0IGNvbnRleHQgPSBPYmplY3RVdGlscy5hcHBlbmQoYVRva2VuLnZhbHVlLnRvTG93ZXJDYXNlKCksIHJlc3VsdCwgYUNvbnRleHQpO1xyXG5cdFx0XHRyZXR1cm4gcGFyc2UoYVRva2VuaXplciwgYUNvbmZpZywgY29udGV4dCk7XHJcblx0XHR9KTtcclxuXHQgZWxzZSB7XHJcblx0XHRyZXR1cm4gcGFyc2VQcm9wZXJ0eShhVG9rZW4sIGFDb25maWcpXHJcblx0XHQudGhlbih2YWx1ZSA9PiBPYmplY3RVdGlscy5hcHBlbmQoYVRva2VuLmtleS50b0xvd2VyQ2FzZSgpLCB2YWx1ZSwgYUNvbnRleHQpKVxyXG5cdFx0LnRoZW4oY29udGV4dCA9PiBwYXJzZShhVG9rZW5pemVyLCBhQ29uZmlnLCBjb250ZXh0KSk7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3QgcGFyc2UgPSBmdW5jdGlvbihhVG9rZW5pemVyLCBhQ29uZmlnLCBhQ29udGV4dCl7XHJcblx0cmV0dXJuIGFUb2tlbml6ZXIubmV4dCgpXHJcblx0LnRoZW4oYVRva2VuID0+IHtcclxuXHRcdGlmKGFUb2tlbilcclxuXHRcdFx0cmV0dXJuIHBhcnNlVG9rZW4oYVRva2VuLCBhVG9rZW5pemVyLCBhQ29uZmlnLCBhQ29udGV4dCk7XHJcblx0XHRcdFxyXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhQ29udGV4dCk7XHJcblx0fSk7XHJcbn07XHJcblxyXG5cclxuY29uc3QgUGFyc2VyID0gZnVuY3Rpb24oYVRleHQsIGFDb25maWcpe1xyXG5cdHJldHVybiBwYXJzZShuZXcgVG9rZW5pemVyKGFUZXh0KSwgKGFDb25maWcgfHwge30pKVxyXG5cdFx0LnRoZW4oYVJlc3VsdCA9PiB7XHJcblx0XHRcdGlmKHR5cGVvZiBhQ29uZmlnLm1hcCA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoYUNvbmZpZy5tYXAoYVJlc3VsdCkpO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhUmVzdWx0KTtcclxuXHRcdH0pO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBQYXJzZXI7IiwiaW1wb3J0IERlc2VyaWFsaXplciBmcm9tIFwiLi9EZXNlcmlhbGl6ZXJcIjtcclxuXHJcbmNvbnN0IFRva2VuaXplciA9IGZ1bmN0aW9uKHRoZUxpbmVzLCBhSW5kZXgpe1xyXG5cdGNvbnN0IGxpbmVzID0gdGhlTGluZXM7XHJcblx0bGV0IGluZGV4ID0gYUluZGV4IHx8IC0xO1xyXG5cdGxldCB0b2tlbiA9IG51bGw7XHJcblx0cmV0dXJuIHtcclxuXHRcdHJlc2V0IDogZnVuY3Rpb24oKXtcclxuXHRcdFx0aW5kZXggPSAtMTtcclxuXHRcdH0sXHJcblx0XHRza2lwIDogZnVuY3Rpb24obGVuZ3RoKXtcclxuXHRcdFx0aW5kZXggKz0gKGxlbmd0aCB8fCAxKTtcclxuXHRcdH0sXHJcblx0XHRpbmRleCA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBpbmRleDtcclxuXHRcdH0sXHJcblx0XHR0b2tlbiA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBtYXRjaDtcclxuXHRcdH0sXHJcblx0XHRsaW5lcyA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBsaW5lcztcclxuXHRcdH0sXHJcblx0XHRuZXh0IDogZnVuY3Rpb24oKXtcdFx0XHRcclxuXHRcdFx0aW5kZXgrKztcclxuXHRcdFx0aWYoaW5kZXggPCBsaW5lcy5sZW5ndGgpXHJcblx0XHRcdFx0dG9rZW4gPSBEZXNlcmlhbGl6ZXIobGluZXNbaW5kZXhdLCB0aGlzKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHRva2VuID0gbnVsbDtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodG9rZW4pO1xyXG5cdFx0fSxcclxuXHRcdGNsb25lIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIG5ldyBUb2tlbml6ZXIobGluZXMsIGluZGV4KTtcclxuXHRcdH1cclxuXHR9O1x0XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGFUZXh0KXtcclxuXHRyZXR1cm4gbmV3IFRva2VuaXplcihhVGV4dC5zcGxpdCgvXFxyP1xcbi9nKS5maWx0ZXIobGluZSA9PiBsaW5lLnRyaW0oKS5sZW5ndGggPiAwKSlcclxufTsiLCJpbXBvcnQgUGFyc2VyIGZyb20gXCIuL1BhcnNlclwiO1xyXG5pbXBvcnQgSUNhbGVuZGFyIGZyb20gXCIuL0lDYWxlbmRhclwiO1xyXG5cclxuY29uc3QgcGFjayA9IHtcclxuXHRQYXJzZXIgOiBQYXJzZXIsXHJcblx0SUNhbGVuZGFyIDogSUNhbGVuZGFyXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwYWNrOyJdLCJzb3VyY2VSb290IjoiIn0=