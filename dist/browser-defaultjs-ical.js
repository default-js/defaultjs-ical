/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/Escaper.js":
/*!************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/Escaper.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Escaper);



/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ObjectProperty)
/* harmony export */ });
class ObjectProperty {
	constructor(key, context){
		this.key = key;
		this.context = context;
	}
	
	get keyDefined(){
		return this.key in this.context; 
	}
	
	get hasValue(){
		return !!this.context[this.key];
	}
	
	get value(){
		return this.context[this.key];
	}
	
	set value(data){
		this.context[this.key] = data;
	}
	
	set append(data) {
		if(!this.hasValue)
			this.value = data;
		else {
			const value = this.value;
			if(value instanceof Array)
				value.push(data);
			else
				this.value = [this.value, data];
		}
	}
	
	remove(){
		delete this.context[this.key];
	}
	
	static load(data, key, create=true) {
		let context = data;
		const keys = key.split("\.");
		let name = keys.shift().trim();
		while(keys.length > 0){
			if(!context[name]){
				if(!create)
					return null;
				
				context[name] = {}
			}
			
			context = context[name];
			name = keys.shift().trim();
		}
		
		return new ObjectProperty(name, context);
	}
};

/***/ }),

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/ObjectUtils.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "isPojo": () => (/* binding */ isPojo),
/* harmony export */   "merge": () => (/* binding */ merge),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "defValue": () => (/* binding */ defValue),
/* harmony export */   "defGet": () => (/* binding */ defGet),
/* harmony export */   "defGetSet": () => (/* binding */ defGetSet),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ObjectProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectProperty.js */ "./node_modules/@default-js/defaultjs-common-utils/src/ObjectProperty.js");

/**
 * append a propery value to an object. If propery exists its would be converted to an array
 *
 *  @param aKey:string name of property
 *  @param aData:any property value
 *  @param aObject:object the object to append the property
 *
 *  @return returns the changed object
 */
const append = function (aKey, aData, aObject) {
	if (typeof aData !== "undefined") {
		const property = _ObjectProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"].load(aObject, aKey, true);
		property.append = aData;
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
const isPojo = function (aObject) {
	return typeof aObject !== "undefined" && aObject != null && aObject.constructor.name === "Object";
};

/**
 * merging object into a target object. Its only merge simple object and sub objects. Every other
 * value would be replaced by value from the source object.
 *
 * sample: merge(target, source-1, source-2, ...source-n)
 *
 * @param target:object the target object to merging into
 * @param sources:object
 *
 * @return object returns the target object
 */
const merge = function (target, ...sources) {
	if(!target)
		target = {};

	for (let source of sources) {
		if (isPojo(source)) {
			Object.getOwnPropertyNames(source).forEach((key) => {
				if (isPojo(target[key])) merge(target[key], source[key]);
				else target[key] = source[key];
			});
		}
	}

	return target;
};

const buildPropertyFilter = function ({ names, allowed }) {
	return (name, value, context) => {
		return names.includes(name) === allowed;
	};
};

const filter = function () {
	const [data, propFilter, { deep = false, recursive = true, parents = [] } = {}] = arguments;
	const result = {};

	for (let name in data) {
		const value = data[name];
		const accept = propFilter(name, value, data);
		if (accept && (!deep || value === null || value === undefined)) result[name] = value;
		else if (accept && deep) {
			const type = typeof value;
			if (type !== "object" || value instanceof Array || value instanceof Map || value instanceof Set || value instanceof RegExp || parents.includes[value] || value == data) result[name] = value;
			else result[name] = filter(value, propFilter, { deep, recursive, parents: parents.concat(data) });
		}
	}

	return result;
};

const defValue = (o, name, value) => {
	Object.defineProperty(o, name, {
		value,
		writable: false,
		configurable: false,
		enumerable: false,
	});
};
const defGet = (o, name, get) => {
	Object.defineProperty(o, name, {
		get,
		configurable: false,
		enumerable: false,
	});
};

const defGetSet = (o, name, get, set) => {
	Object.defineProperty(o, name, {
		get,
		set,
		configurable: false,
		enumerable: false,
	});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
	isPojo,
	append,
	merge,
	filter,
	buildPropertyFilter,
	defValue,
	defGet,
	defGetSet,
});


/***/ }),

/***/ "./src/Deserializer.js":
/*!*****************************!*\
  !*** ./src/Deserializer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _default_js_defaultjs_common_utils_src_Escaper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/Escaper */ "./node_modules/@default-js/defaultjs-common-utils/src/Escaper.js");


//const REGEX_KEY = /^([^\s:;]+)(;([^:]+))?:(.+)$/;
const REGEX_VALUELINE = /^\s(.+)$/;

const KEY_VALUE_SPLIT = /:/;
const PARAM_SPLIT = /;/;
const PARAM_VALUE_SPLIT = /=/;

const ESCAPER = new _default_js_defaultjs_common_utils_src_Escaper__WEBPACK_IMPORTED_MODULE_0__["default"]([
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Deserializer);

/***/ }),

/***/ "./src/ICalendar.js":
/*!**************************!*\
  !*** ./src/ICalendar.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
	
	return _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__["default"].merge({}, defaultconfig, aConfig);
};



const Parser = {
	parse : (aText, aConfig) => {
		return (0,_Parser__WEBPACK_IMPORTED_MODULE_0__["default"])(aText, buildConfig(aConfig));
	}
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Parser);



/***/ }),

/***/ "./src/Parser.js":
/*!***********************!*\
  !*** ./src/Parser.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
			
			const context = _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__["default"].append(aToken.value.toLowerCase(), result, aContext);
			return parse(aTokenizer, aConfig, context);
		});
	 else {
		return parseProperty(aToken, aConfig)
		.then(value => _default_js_defaultjs_common_utils_src_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__["default"].append(aToken.key.toLowerCase(), value, aContext))
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
	return parse(new _Tokenizer__WEBPACK_IMPORTED_MODULE_0__["default"](aText), (aConfig || {}))
		.then(aResult => {
			if(typeof aConfig.map === "function")
				return Promise.resolve(aConfig.map(aResult));
			
			return Promise.resolve(aResult);
		});
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Parser);

/***/ }),

/***/ "./src/Tokenizer.js":
/*!**************************!*\
  !*** ./src/Tokenizer.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
				token = (0,_Deserializer__WEBPACK_IMPORTED_MODULE_0__["default"])(lines[index], this);
			else
				token = null;
			
			return Promise.resolve(token);
		},
		clone : function(){
			return new Tokenizer(lines, index);
		}
	};	
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(aText){
	return new Tokenizer(aText.split(/\r?\n/g).filter(line => line.trim().length > 0))
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Parser */ "./src/Parser.js");
/* harmony import */ var _ICalendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ICalendar */ "./src/ICalendar.js");



const pack = {
	Parser : _Parser__WEBPACK_IMPORTED_MODULE_0__["default"],
	ICalendar : _ICalendar__WEBPACK_IMPORTED_MODULE_1__["default"]
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pack);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./browser.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src */ "./src/index.js");


const global = window || global || self || undefined || {};
global.defaultjs = global.defaultjs || {};
global.defaultjs.ical = global.defaultjs.ical || {
	VERSION : "1.0.1",
	Parser : _src__WEBPACK_IMPORTED_MODULE_0__["default"].Parser,
	ICalendar : _src__WEBPACK_IMPORTED_MODULE_0__["default"].ICalendar
};

if(typeof global.fetch === "function" 
	&& typeof global.Response !== "undefined" 
	&& typeof global.Response.prototype !== "undefined" 
	&& typeof global.Response.prototype.ical === "undefined"){
	global.Response.prototype.ical = function(aConfig){
		return this.text()
		.then(function(aText){
			return _src__WEBPACK_IMPORTED_MODULE_0__["default"].ICalendar.parse(aText, aConfig);
		});
	}
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsVUFBVSw0REFBb0I7QUFDOUIsR0FBRztBQUNIO0FBQ0EsRSIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1pY2FsLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0VzY2FwZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWljYWwvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0UHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWljYWwvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWljYWwvLi9zcmMvRGVzZXJpYWxpemVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1pY2FsLy4vc3JjL0lDYWxlbmRhci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaWNhbC8uL3NyYy9QYXJzZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWljYWwvLi9zcmMvVG9rZW5pemVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1pY2FsLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1pY2FsL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1pY2FsL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaWNhbC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1pY2FsL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWljYWwvLi9icm93c2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHJlcXVpcmVkIHRvIGJ1aWxkIHRoZSBpbnRlcm5hbCBlc2NhcGUgZmlsdGVyIGZvciByZWdleFxuY29uc3QgUkVHRVhDSEFSTUFQID0gW1wiXFxcXFwiLFwiP1wiLFwiW1wiLCBcIl1cIiwgXCJ7XCIsIFwifVwiLCBcIihcIiwgXCIpXCIsIFwiLlwiLCBcIl5cIiwgXCIkXCJdXG5cdC5tYXAoY2hhciA9PiB7IFxuXHRcdHJldHVybiB7ZjogbmV3IFJlZ0V4cChcIlxcXFxcIiArY2hhciwgXCJnXCIpLCB2IDogXCJcXFxcXCIgKyBjaGFyfTtcblx0fSk7XG5cblxuY29uc3QgbWFwcGluZyA9IChhVGV4dCwgdGhlRmlsdGVycykgPT4ge1xuXHRsZXQgdGV4dCA9IGFUZXh0O1xuXHR0aGVGaWx0ZXJzLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0dGV4dCA9IHRleHQucmVwbGFjZShpdGVtLmYsIGl0ZW0udik7XG5cdH0pO1xuXHRyZXR1cm4gdGV4dDtcbn07XG5cbmNvbnN0IGJ1aWxkVW5lc2NhcGVMaXN0ID0gKGFDaGFyTWFwLCBpc0Nhc2VTZW5zaXRpdikgPT4ge1xuXHRjb25zdCBvcHRpb24gPSBpc0Nhc2VTZW5zaXRpdiA/IFwibWdcIiA6IFwibWdpXCI7IFxuXHRyZXR1cm4gYUNoYXJNYXAubWFwKGl0ZW0gPT4ge1xuXHRcdGlmKCFpdGVtLmF0IHx8IGl0ZW0uYXQgPT0gXCJ1bmVzY2FwZVwiKVxuXHRcdFx0cmV0dXJuIHtmOiBuZXcgUmVnRXhwKG1hcHBpbmcoaXRlbS5lc2NhcGVkLCBSRUdFWENIQVJNQVApLCBvcHRpb24pLCB2OiBpdGVtLmNoYXJ9XG5cdH0pLmZpbHRlcihpdGVtID0+ICEhaXRlbSk7XG59O1xuXG5jb25zdCBidWlsZEVzY2FwZUxpc3QgPSAoYUNoYXJNYXAsIGlzQ2FzZVNlbnNpdGl2KSA9PiB7XG5cdGNvbnN0IG9wdGlvbiA9IGlzQ2FzZVNlbnNpdGl2ID8gXCJtZ1wiIDogXCJtZ2lcIjsgXG5cdHJldHVybiBhQ2hhck1hcC5tYXAoaXRlbSA9PiB7XG5cdFx0aWYoIWl0ZW0uYXQgfHwgaXRlbS5hdCA9PSBcImVzY2FwZVwiKVxuXHRcdFx0cmV0dXJuIHtmOiBuZXcgUmVnRXhwKG1hcHBpbmcoaXRlbS5jaGFyLFJFR0VYQ0hBUk1BUCksIG9wdGlvbiksIHY6IGl0ZW0uZXNjYXBlZH1cblx0fSkuZmlsdGVyKGl0ZW0gPT4gISFpdGVtKTtcbn07XG5jbGFzcyBFc2NhcGVyIHtcblx0Y29uc3RydWN0b3IoZXNjYXBlTWFwLCBpc0Nhc2VTZW5zaXRpdil7XG5cdFx0dGhpcy5lc2NhcGVNYXAgPSBidWlsZEVzY2FwZUxpc3QoZXNjYXBlTWFwLCBpc0Nhc2VTZW5zaXRpdilcblx0XHR0aGlzLnVuZXNjYXBlTWFwID0gYnVpbGRVbmVzY2FwZUxpc3QoZXNjYXBlTWFwLCBpc0Nhc2VTZW5zaXRpdilcblx0fVxuXHRcblx0ZXNjYXBlKGFUZXh0KXtcblx0XHRyZXR1cm4gbWFwcGluZyhhVGV4dCwgdGhpcy5lc2NhcGVNYXApO1xuXHR9XG5cdFxuXHR1bmVzY2FwZShhVGV4dCl7XG5cdFx0cmV0dXJuIG1hcHBpbmcoYVRleHQsIHRoaXMudW5lc2NhcGVNYXApO1xuXHR9XG5cdFxuXHRzdGF0aWMgUkVHRVhQX0VTQ0FQRVIoKXtcblx0XHRyZXR1cm4gbmV3IEVzY2FwZXIoW1xuXHRcdFx0e2NoYXI6IFwiXFxcXFwiLCBlc2NhcGVkIDogXCJcXFxcXFxcXFwifSxcblx0XHRcdHtjaGFyOiBcIj9cIiwgZXNjYXBlZCA6IFwiXFxcXD9cIn0sXG5cdFx0XHR7Y2hhcjogXCJbXCIsIGVzY2FwZWQgOiBcIlxcXFxbXCJ9LFxuXHRcdFx0e2NoYXI6IFwiXVwiLCBlc2NhcGVkIDogXCJcXFxcXVwifSxcblx0XHRcdHtjaGFyOiBcIntcIiwgZXNjYXBlZCA6IFwiXFxcXHtcIn0sXG5cdFx0XHR7Y2hhcjogXCJ9XCIsIGVzY2FwZWQgOiBcIlxcXFx9XCJ9LFxuXHRcdFx0e2NoYXI6IFwiKFwiLCBlc2NhcGVkIDogXCJcXFxcKFwifSxcblx0XHRcdHtjaGFyOiBcIilcIiwgZXNjYXBlZCA6IFwiXFxcXClcIn0sXG5cdFx0XHR7Y2hhcjogXCIuXCIsIGVzY2FwZWQgOiBcIlxcXFwuXCJ9LFxuXHRcdFx0e2NoYXI6IFwiXlwiLCBlc2NhcGVkIDogXCJcXFxcXlwifSxcblx0XHRcdHtjaGFyOiBcIiRcIiwgZXNjYXBlZCA6IFwiXFxcXCRcIn1cblx0XHRdKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBFc2NhcGVyO1xuXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBPYmplY3RQcm9wZXJ0eSB7XHJcblx0Y29uc3RydWN0b3Ioa2V5LCBjb250ZXh0KXtcclxuXHRcdHRoaXMua2V5ID0ga2V5O1xyXG5cdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuXHR9XHJcblx0XHJcblx0Z2V0IGtleURlZmluZWQoKXtcclxuXHRcdHJldHVybiB0aGlzLmtleSBpbiB0aGlzLmNvbnRleHQ7IFxyXG5cdH1cclxuXHRcclxuXHRnZXQgaGFzVmFsdWUoKXtcclxuXHRcdHJldHVybiAhIXRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdGdldCB2YWx1ZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdHNldCB2YWx1ZShkYXRhKXtcclxuXHRcdHRoaXMuY29udGV4dFt0aGlzLmtleV0gPSBkYXRhO1xyXG5cdH1cclxuXHRcclxuXHRzZXQgYXBwZW5kKGRhdGEpIHtcclxuXHRcdGlmKCF0aGlzLmhhc1ZhbHVlKVxyXG5cdFx0XHR0aGlzLnZhbHVlID0gZGF0YTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XHJcblx0XHRcdGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdFx0dmFsdWUucHVzaChkYXRhKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHRoaXMudmFsdWUgPSBbdGhpcy52YWx1ZSwgZGF0YV07XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHJlbW92ZSgpe1xyXG5cdFx0ZGVsZXRlIHRoaXMuY29udGV4dFt0aGlzLmtleV07XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBsb2FkKGRhdGEsIGtleSwgY3JlYXRlPXRydWUpIHtcclxuXHRcdGxldCBjb250ZXh0ID0gZGF0YTtcclxuXHRcdGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoXCJcXC5cIik7XHJcblx0XHRsZXQgbmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XHJcblx0XHR3aGlsZShrZXlzLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRpZighY29udGV4dFtuYW1lXSl7XHJcblx0XHRcdFx0aWYoIWNyZWF0ZSlcclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGNvbnRleHRbbmFtZV0gPSB7fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRjb250ZXh0ID0gY29udGV4dFtuYW1lXTtcclxuXHRcdFx0bmFtZSA9IGtleXMuc2hpZnQoKS50cmltKCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBuZXcgT2JqZWN0UHJvcGVydHkobmFtZSwgY29udGV4dCk7XHJcblx0fVxyXG59OyIsImltcG9ydCBPYmplY3RQcm9wZXJ0eSBmcm9tIFwiLi9PYmplY3RQcm9wZXJ0eS5qc1wiO1xyXG4vKipcclxuICogYXBwZW5kIGEgcHJvcGVyeSB2YWx1ZSB0byBhbiBvYmplY3QuIElmIHByb3BlcnkgZXhpc3RzIGl0cyB3b3VsZCBiZSBjb252ZXJ0ZWQgdG8gYW4gYXJyYXlcclxuICpcclxuICogIEBwYXJhbSBhS2V5OnN0cmluZyBuYW1lIG9mIHByb3BlcnR5XHJcbiAqICBAcGFyYW0gYURhdGE6YW55IHByb3BlcnR5IHZhbHVlXHJcbiAqICBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBhcHBlbmQgdGhlIHByb3BlcnR5XHJcbiAqXHJcbiAqICBAcmV0dXJuIHJldHVybnMgdGhlIGNoYW5nZWQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYXBwZW5kID0gZnVuY3Rpb24gKGFLZXksIGFEYXRhLCBhT2JqZWN0KSB7XHJcblx0aWYgKHR5cGVvZiBhRGF0YSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0Y29uc3QgcHJvcGVydHkgPSBPYmplY3RQcm9wZXJ0eS5sb2FkKGFPYmplY3QsIGFLZXksIHRydWUpO1xyXG5cdFx0cHJvcGVydHkuYXBwZW5kID0gYURhdGE7XHJcblx0fVxyXG5cdHJldHVybiBhT2JqZWN0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGNoZWNrZWQgaWYgYW4gb2JqZWN0IGEgc2ltcGxlIG9iamVjdC4gTm8gQXJyYXksIE1hcCBvciBzb21ldGhpbmcgZWxzZS5cclxuICpcclxuICogQHBhcmFtIGFPYmplY3Q6b2JqZWN0IHRoZSBvYmplY3QgdG8gYmUgdGVzdGluZ1xyXG4gKlxyXG4gKiBAcmV0dXJuIGJvb2xlYW5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpc1Bvam8gPSBmdW5jdGlvbiAoYU9iamVjdCkge1xyXG5cdHJldHVybiB0eXBlb2YgYU9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhT2JqZWN0ICE9IG51bGwgJiYgYU9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIk9iamVjdFwiO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIG1lcmdpbmcgb2JqZWN0IGludG8gYSB0YXJnZXQgb2JqZWN0LiBJdHMgb25seSBtZXJnZSBzaW1wbGUgb2JqZWN0IGFuZCBzdWIgb2JqZWN0cy4gRXZlcnkgb3RoZXJcclxuICogdmFsdWUgd291bGQgYmUgcmVwbGFjZWQgYnkgdmFsdWUgZnJvbSB0aGUgc291cmNlIG9iamVjdC5cclxuICpcclxuICogc2FtcGxlOiBtZXJnZSh0YXJnZXQsIHNvdXJjZS0xLCBzb3VyY2UtMiwgLi4uc291cmNlLW4pXHJcbiAqXHJcbiAqIEBwYXJhbSB0YXJnZXQ6b2JqZWN0IHRoZSB0YXJnZXQgb2JqZWN0IHRvIG1lcmdpbmcgaW50b1xyXG4gKiBAcGFyYW0gc291cmNlczpvYmplY3RcclxuICpcclxuICogQHJldHVybiBvYmplY3QgcmV0dXJucyB0aGUgdGFyZ2V0IG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1lcmdlID0gZnVuY3Rpb24gKHRhcmdldCwgLi4uc291cmNlcykge1xyXG5cdGlmKCF0YXJnZXQpXHJcblx0XHR0YXJnZXQgPSB7fTtcclxuXHJcblx0Zm9yIChsZXQgc291cmNlIG9mIHNvdXJjZXMpIHtcclxuXHRcdGlmIChpc1Bvam8oc291cmNlKSkge1xyXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2UpLmZvckVhY2goKGtleSkgPT4ge1xyXG5cdFx0XHRcdGlmIChpc1Bvam8odGFyZ2V0W2tleV0pKSBtZXJnZSh0YXJnZXRba2V5XSwgc291cmNlW2tleV0pO1xyXG5cdFx0XHRcdGVsc2UgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGFyZ2V0O1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRQcm9wZXJ0eUZpbHRlciA9IGZ1bmN0aW9uICh7IG5hbWVzLCBhbGxvd2VkIH0pIHtcclxuXHRyZXR1cm4gKG5hbWUsIHZhbHVlLCBjb250ZXh0KSA9PiB7XHJcblx0XHRyZXR1cm4gbmFtZXMuaW5jbHVkZXMobmFtZSkgPT09IGFsbG93ZWQ7XHJcblx0fTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc3QgW2RhdGEsIHByb3BGaWx0ZXIsIHsgZGVlcCA9IGZhbHNlLCByZWN1cnNpdmUgPSB0cnVlLCBwYXJlbnRzID0gW10gfSA9IHt9XSA9IGFyZ3VtZW50cztcclxuXHRjb25zdCByZXN1bHQgPSB7fTtcclxuXHJcblx0Zm9yIChsZXQgbmFtZSBpbiBkYXRhKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IGRhdGFbbmFtZV07XHJcblx0XHRjb25zdCBhY2NlcHQgPSBwcm9wRmlsdGVyKG5hbWUsIHZhbHVlLCBkYXRhKTtcclxuXHRcdGlmIChhY2NlcHQgJiYgKCFkZWVwIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpKSByZXN1bHRbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdGVsc2UgaWYgKGFjY2VwdCAmJiBkZWVwKSB7XHJcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XHJcblx0XHRcdGlmICh0eXBlICE9PSBcIm9iamVjdFwiIHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgfHwgdmFsdWUgaW5zdGFuY2VvZiBNYXAgfHwgdmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgdmFsdWUgaW5zdGFuY2VvZiBSZWdFeHAgfHwgcGFyZW50cy5pbmNsdWRlc1t2YWx1ZV0gfHwgdmFsdWUgPT0gZGF0YSkgcmVzdWx0W25hbWVdID0gdmFsdWU7XHJcblx0XHRcdGVsc2UgcmVzdWx0W25hbWVdID0gZmlsdGVyKHZhbHVlLCBwcm9wRmlsdGVyLCB7IGRlZXAsIHJlY3Vyc2l2ZSwgcGFyZW50czogcGFyZW50cy5jb25jYXQoZGF0YSkgfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZlZhbHVlID0gKG8sIG5hbWUsIHZhbHVlKSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdHZhbHVlLFxyXG5cdFx0d3JpdGFibGU6IGZhbHNlLFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGVmR2V0ID0gKG8sIG5hbWUsIGdldCkgPT4ge1xyXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBuYW1lLCB7XHJcblx0XHRnZXQsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVmR2V0U2V0ID0gKG8sIG5hbWUsIGdldCwgc2V0KSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdGdldCxcclxuXHRcdHNldCxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRpc1Bvam8sXHJcblx0YXBwZW5kLFxyXG5cdG1lcmdlLFxyXG5cdGZpbHRlcixcclxuXHRidWlsZFByb3BlcnR5RmlsdGVyLFxyXG5cdGRlZlZhbHVlLFxyXG5cdGRlZkdldCxcclxuXHRkZWZHZXRTZXQsXHJcbn07XHJcbiIsImltcG9ydCBFc2NhcGVyIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Fc2NhcGVyXCI7XHJcblxyXG4vL2NvbnN0IFJFR0VYX0tFWSA9IC9eKFteXFxzOjtdKykoOyhbXjpdKykpPzooLispJC87XHJcbmNvbnN0IFJFR0VYX1ZBTFVFTElORSA9IC9eXFxzKC4rKSQvO1xyXG5cclxuY29uc3QgS0VZX1ZBTFVFX1NQTElUID0gLzovO1xyXG5jb25zdCBQQVJBTV9TUExJVCA9IC87LztcclxuY29uc3QgUEFSQU1fVkFMVUVfU1BMSVQgPSAvPS87XHJcblxyXG5jb25zdCBFU0NBUEVSID0gbmV3IEVzY2FwZXIoW1xyXG5cdHtjaGFyOiBcIixcIiwgZXNjYXBlZDpcIlxcXFwsXCJ9LFxyXG5cdHtjaGFyOiBcIjtcIiwgZXNjYXBlZDpcIlxcXFw7XCJ9LFxyXG5cdHtjaGFyOiBcIjpcIiwgZXNjYXBlZDpcIlxcXFw6XCJ9LFxyXG5dKTtcclxuXHJcblxyXG5jb25zdCBnZXRQYXJhbWV0ZXIgPSBmdW5jdGlvbihhVGV4dCl7XHJcblx0aWYoYVRleHQgPT0gbnVsbCB8fCB0eXBlb2YgYVRleHQgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRyZXR1cm47XHJcblx0Y29uc3QgaXRlbXMgPSBhVGV4dC5zcGxpdChQQVJBTV9TUExJVCk7XHJcblx0Y29uc3QgcGFyYW1zID0ge307XHJcblx0aXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdGNvbnN0IHBhcnRzID0gaXRlbS5zcGxpdChQQVJBTV9WQUxVRV9TUExJVCk7XHJcblx0XHRwYXJhbXNbcGFydHNbMF0udG9Mb3dlckNhc2UoKV0gPSBwYXJ0c1sxXTtcclxuXHR9KVxyXG5cdFxyXG5cdHJldHVybiBwYXJhbXM7XHJcbn07XHJcblxyXG5jb25zdCBnZXRWYWx1ZSA9IGZ1bmN0aW9uKGFWYWx1ZSwgYVRva2VuaXplcil7XHJcblx0bGV0IHZhbHVlID0gYVZhbHVlO1xyXG5cdGxldCBtYXRjaCA9IFJFR0VYX1ZBTFVFTElORS5leGVjKGFUb2tlbml6ZXIubGluZXMoKVthVG9rZW5pemVyLmluZGV4KCkgKyAxXSk7XHJcblx0d2hpbGUobWF0Y2ggIT0gbnVsbCAmJiB0eXBlb2YgbWF0Y2ggIT09IFwidW5kZWZpbmVkXCIgJiYgbWF0Y2gubGVuZ3RoID4gMCl7XHRcdFxyXG5cdFx0dmFsdWUgKz0gbWF0Y2hbMV07XHJcblx0XHRhVG9rZW5pemVyLnNraXAoKTtcclxuXHRcdG1hdGNoID0gUkVHRVhfVkFMVUVMSU5FLmV4ZWMoYVRva2VuaXplci5saW5lcygpW2FUb2tlbml6ZXIuaW5kZXgoKSArIDFdKTtcclxuXHR9XHJcblx0XHJcblx0cmV0dXJuIEVTQ0FQRVIudW5lc2NhcGUodmFsdWUpO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IERlc2VyaWFsaXplciA9IGZ1bmN0aW9uKGFMaW5lLCBhVG9rZW5pemVyKXtcclxuXHRsZXQgaW5kZXggPSBhTGluZS5zZWFyY2goS0VZX1ZBTFVFX1NQTElUKTtcclxuXHRpZihpbmRleCA9PSAtMSlcclxuXHRcdHJldHVybjtcclxuXHRcclxuXHRjb25zdCByZXN1bHQgPSB7XHJcblx0XHRcdGtleSA6IGFMaW5lLnN1YnN0cmluZygwLCBpbmRleCksXHJcblx0XHRcdHZhbHVlIDogZ2V0VmFsdWUoYUxpbmUuc3Vic3RyaW5nKGluZGV4ICsgMSksIGFUb2tlbml6ZXIpXHJcblx0fTtcclxuXHRcclxuXHRpbmRleCA9IHJlc3VsdC5rZXkuc2VhcmNoKFBBUkFNX1NQTElUKTtcclxuXHRpZihpbmRleCAhPSAtMSl7XHJcblx0XHRyZXN1bHQucGFyYW1ldGVyID0gZ2V0UGFyYW1ldGVyKHJlc3VsdC5rZXkuc3Vic3RyaW5nKGluZGV4ICsgMSkpO1xyXG5cdFx0cmVzdWx0LmtleSA9IHJlc3VsdC5rZXkuc3Vic3RyaW5nKDAsIGluZGV4KTtcclxuXHR9XHJcblx0XHRcclxuXHRcclxuXHRyZXR1cm4gcmVzdWx0XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZXNlcmlhbGl6ZXI7IiwiaW1wb3J0IHBhcnNlIGZyb20gXCIuL1BhcnNlclwiO1xyXG5pbXBvcnQgT2JqZWN0VXRpbHMgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzXCI7XHJcblxyXG5cclxuY29uc3QgREFURVRJTUUgPSAvKFxcZHs0fSkoXFxkezJ9KShcXGR7Mn0pVChcXGR7Mn0pKFxcZHsyfSkoXFxkezJ9KS87XHJcbmNvbnN0IHRvRGF0ZVRpbWUgPSBhVG9rZW4gPT4ge1xyXG5cdGNvbnN0IG1hdGNoID0gREFURVRJTUUuZXhlYyhhVG9rZW4udmFsdWUpO1xyXG5cdGlmKCFtYXRjaClcclxuXHRcdHJldHVybiBhVG9rZW4udmFsdWU7XHJcblx0cmV0dXJuIG5ldyBEYXRlKHBhcnNlSW50KG1hdGNoWzFdKVxyXG5cdFx0XHQscGFyc2VJbnQobWF0Y2hbMl0pXHJcblx0XHRcdCxwYXJzZUludChtYXRjaFszXSlcclxuXHRcdFx0LHBhcnNlSW50KG1hdGNoWzRdKVxyXG5cdFx0XHQscGFyc2VJbnQobWF0Y2hbNV0pXHJcblx0XHRcdCxwYXJzZUludChtYXRjaFs2XSkpO1xyXG59O1xyXG5cclxuY29uc3QgZGVmYXVsdGNvbmZpZyA9IHtcclxuXHRvbmx5UHJvcGVydHlWYWx1ZXM6IHRydWUsXHJcblx0cHJvcGVydHlwYXJzZXIgOiB7XHJcblx0XHRvcmdhbml6ZXIgOiBhVG9rZW4gPT4ge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdG5hbWUgOiAvKFteXCJdKykvaS5leGVjKGFUb2tlbi5wYXJhbWV0ZXJbXCJjblwiXSlbMV0sXHJcblx0XHRcdFx0bWFpbCA6IC9eKG1haWx0bzopPyguKykkL2kuZXhlYyhhVG9rZW4udmFsdWUpWzJdXHRcdFxyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdGR0c3RhcnQgOiB0b0RhdGVUaW1lLFxyXG5cdFx0ZHRlbmQgOiB0b0RhdGVUaW1lXHJcblx0fVxyXG59O1xyXG5cclxuY29uc3QgYnVpbGRDb25maWcgPSBmdW5jdGlvbihhQ29uZmlnKXtcclxuXHRpZih0eXBlb2YgYUNvbmZpZyA9PT0gXCJ1bmRlZmluZWRcIiB8fCBhQ29uZmlnID09IG51bGwpXHJcblx0XHRyZXR1cm4gZGVmYXVsdGNvbmZpZztcclxuXHRcclxuXHRyZXR1cm4gT2JqZWN0VXRpbHMubWVyZ2Uoe30sIGRlZmF1bHRjb25maWcsIGFDb25maWcpO1xyXG59O1xyXG5cclxuXHJcblxyXG5jb25zdCBQYXJzZXIgPSB7XHJcblx0cGFyc2UgOiAoYVRleHQsIGFDb25maWcpID0+IHtcclxuXHRcdHJldHVybiBwYXJzZShhVGV4dCwgYnVpbGRDb25maWcoYUNvbmZpZykpO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhcnNlcjtcclxuXHJcbiIsImltcG9ydCBUb2tlbml6ZXIgZnJvbSBcIi4vVG9rZW5pemVyXCI7XHJcbmltcG9ydCBPYmplY3RVdGlscyBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHNcIjtcclxuXHJcbmNvbnN0IEJFR0lOX1RPS0VOID0gL15iZWdpbiQvaTtcclxuY29uc3QgRU5EX1RPS0VOID0gL15lbmQkL2k7XHJcblxyXG5jb25zdCBwYXJzZVByb3BlcnR5ID0gZnVuY3Rpb24oYVRva2VuLCBhQ29uZmlnKXtcclxuXHR0cnl7XHJcblx0XHRjb25zdCBrZXkgPSBhVG9rZW4ua2V5LnRvTG93ZXJDYXNlKCk7XHJcblx0XHRpZih0eXBlb2YgYUNvbmZpZy5wcm9wZXJ0eXBhcnNlciAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgYUNvbmZpZy5wcm9wZXJ0eXBhcnNlcltrZXldID09PSBcImZ1bmN0aW9uXCIpe1xyXG5cdFx0XHRjb25zdCByZXN1bHQgPSBhQ29uZmlnLnByb3BlcnR5cGFyc2VyW2tleV0oYVRva2VuKTtcclxuXHRcdFx0aWYodHlwZW9mIHJlc3VsdCAhPT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSA/IHJlc3VsdCA6IFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xyXG5cdFx0fVxyXG5cdH1jYXRjaCAoZSl7XHJcblx0XHRjb25zb2xlLmVycm9yKGUpXHJcblx0fVxyXG5cdFxyXG5cdGlmKGFDb25maWcub25seVByb3BlcnR5VmFsdWVzKVxyXG5cdFx0cmV0dXJuICBQcm9taXNlLnJlc29sdmUoYVRva2VuLnZhbHVlKTtcdFxyXG5cdGVsc2VcdFxyXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XHJcblx0XHRcdFwiX3R5cGVfXCIgOiBcInByb3BlcnR5XCIsXHJcblx0XHRcdFwicGFyYW1ldGVyXCIgOiBhVG9rZW4ucGFyYW1ldGVyLFxyXG5cdFx0XHRcInZhbHVlXCIgOiBhVG9rZW4udmFsdWVcclxuXHRcdH0pO1xyXG59O1xyXG5cclxuY29uc3QgcGFyc2VUb2tlbiA9IGZ1bmN0aW9uKGFUb2tlbiwgYVRva2VuaXplciwgYUNvbmZpZywgYUNvbnRleHQpe1x0XHJcblx0aWYoRU5EX1RPS0VOLnRlc3QoYVRva2VuLmtleSkpXHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFDb250ZXh0KTtcclxuXHRlbHNlIGlmKEJFR0lOX1RPS0VOLnRlc3QoYVRva2VuLmtleSkpXHJcblx0XHRyZXR1cm4gcGFyc2UoYVRva2VuaXplciwgYUNvbmZpZywge30pXHJcblx0XHQudGhlbihyZXN1bHQgPT4ge1xyXG5cdFx0XHRpZih0eXBlb2YgYUNvbnRleHQgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xyXG5cdFx0XHRcclxuXHRcdFx0Y29uc3QgY29udGV4dCA9IE9iamVjdFV0aWxzLmFwcGVuZChhVG9rZW4udmFsdWUudG9Mb3dlckNhc2UoKSwgcmVzdWx0LCBhQ29udGV4dCk7XHJcblx0XHRcdHJldHVybiBwYXJzZShhVG9rZW5pemVyLCBhQ29uZmlnLCBjb250ZXh0KTtcclxuXHRcdH0pO1xyXG5cdCBlbHNlIHtcclxuXHRcdHJldHVybiBwYXJzZVByb3BlcnR5KGFUb2tlbiwgYUNvbmZpZylcclxuXHRcdC50aGVuKHZhbHVlID0+IE9iamVjdFV0aWxzLmFwcGVuZChhVG9rZW4ua2V5LnRvTG93ZXJDYXNlKCksIHZhbHVlLCBhQ29udGV4dCkpXHJcblx0XHQudGhlbihjb250ZXh0ID0+IHBhcnNlKGFUb2tlbml6ZXIsIGFDb25maWcsIGNvbnRleHQpKTtcclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZSA9IGZ1bmN0aW9uKGFUb2tlbml6ZXIsIGFDb25maWcsIGFDb250ZXh0KXtcclxuXHRyZXR1cm4gYVRva2VuaXplci5uZXh0KClcclxuXHQudGhlbihhVG9rZW4gPT4ge1xyXG5cdFx0aWYoYVRva2VuKVxyXG5cdFx0XHRyZXR1cm4gcGFyc2VUb2tlbihhVG9rZW4sIGFUb2tlbml6ZXIsIGFDb25maWcsIGFDb250ZXh0KTtcclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFDb250ZXh0KTtcclxuXHR9KTtcclxufTtcclxuXHJcblxyXG5jb25zdCBQYXJzZXIgPSBmdW5jdGlvbihhVGV4dCwgYUNvbmZpZyl7XHJcblx0cmV0dXJuIHBhcnNlKG5ldyBUb2tlbml6ZXIoYVRleHQpLCAoYUNvbmZpZyB8fCB7fSkpXHJcblx0XHQudGhlbihhUmVzdWx0ID0+IHtcclxuXHRcdFx0aWYodHlwZW9mIGFDb25maWcubWFwID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhQ29uZmlnLm1hcChhUmVzdWx0KSk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFSZXN1bHQpO1xyXG5cdFx0fSk7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IFBhcnNlcjsiLCJpbXBvcnQgRGVzZXJpYWxpemVyIGZyb20gXCIuL0Rlc2VyaWFsaXplclwiO1xyXG5cclxuY29uc3QgVG9rZW5pemVyID0gZnVuY3Rpb24odGhlTGluZXMsIGFJbmRleCl7XHJcblx0Y29uc3QgbGluZXMgPSB0aGVMaW5lcztcclxuXHRsZXQgaW5kZXggPSBhSW5kZXggfHwgLTE7XHJcblx0bGV0IHRva2VuID0gbnVsbDtcclxuXHRyZXR1cm4ge1xyXG5cdFx0cmVzZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRpbmRleCA9IC0xO1xyXG5cdFx0fSxcclxuXHRcdHNraXAgOiBmdW5jdGlvbihsZW5ndGgpe1xyXG5cdFx0XHRpbmRleCArPSAobGVuZ3RoIHx8IDEpO1xyXG5cdFx0fSxcclxuXHRcdGluZGV4IDogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIGluZGV4O1xyXG5cdFx0fSxcclxuXHRcdHRva2VuIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIG1hdGNoO1xyXG5cdFx0fSxcclxuXHRcdGxpbmVzIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIGxpbmVzO1xyXG5cdFx0fSxcclxuXHRcdG5leHQgOiBmdW5jdGlvbigpe1x0XHRcdFxyXG5cdFx0XHRpbmRleCsrO1xyXG5cdFx0XHRpZihpbmRleCA8IGxpbmVzLmxlbmd0aClcclxuXHRcdFx0XHR0b2tlbiA9IERlc2VyaWFsaXplcihsaW5lc1tpbmRleF0sIHRoaXMpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dG9rZW4gPSBudWxsO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh0b2tlbik7XHJcblx0XHR9LFxyXG5cdFx0Y2xvbmUgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gbmV3IFRva2VuaXplcihsaW5lcywgaW5kZXgpO1xyXG5cdFx0fVxyXG5cdH07XHRcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYVRleHQpe1xyXG5cdHJldHVybiBuZXcgVG9rZW5pemVyKGFUZXh0LnNwbGl0KC9cXHI/XFxuL2cpLmZpbHRlcihsaW5lID0+IGxpbmUudHJpbSgpLmxlbmd0aCA+IDApKVxyXG59OyIsImltcG9ydCBQYXJzZXIgZnJvbSBcIi4vUGFyc2VyXCI7XHJcbmltcG9ydCBJQ2FsZW5kYXIgZnJvbSBcIi4vSUNhbGVuZGFyXCI7XHJcblxyXG5jb25zdCBwYWNrID0ge1xyXG5cdFBhcnNlciA6IFBhcnNlcixcclxuXHRJQ2FsZW5kYXIgOiBJQ2FsZW5kYXJcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBhY2s7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgcGFjayBmcm9tIFwiLi9zcmNcIlxyXG5cclxuY29uc3QgZ2xvYmFsID0gd2luZG93IHx8IGdsb2JhbCB8fCBzZWxmIHx8IHRoaXMgfHwge307XHJcbmdsb2JhbC5kZWZhdWx0anMgPSBnbG9iYWwuZGVmYXVsdGpzIHx8IHt9O1xyXG5nbG9iYWwuZGVmYXVsdGpzLmljYWwgPSBnbG9iYWwuZGVmYXVsdGpzLmljYWwgfHwge1xyXG5cdFZFUlNJT04gOiBcIiR7dmVyc2lvbn1cIixcclxuXHRQYXJzZXIgOiBwYWNrLlBhcnNlcixcclxuXHRJQ2FsZW5kYXIgOiBwYWNrLklDYWxlbmRhclxyXG59O1xyXG5cclxuaWYodHlwZW9mIGdsb2JhbC5mZXRjaCA9PT0gXCJmdW5jdGlvblwiIFxyXG5cdCYmIHR5cGVvZiBnbG9iYWwuUmVzcG9uc2UgIT09IFwidW5kZWZpbmVkXCIgXHJcblx0JiYgdHlwZW9mIGdsb2JhbC5SZXNwb25zZS5wcm90b3R5cGUgIT09IFwidW5kZWZpbmVkXCIgXHJcblx0JiYgdHlwZW9mIGdsb2JhbC5SZXNwb25zZS5wcm90b3R5cGUuaWNhbCA9PT0gXCJ1bmRlZmluZWRcIil7XHJcblx0Z2xvYmFsLlJlc3BvbnNlLnByb3RvdHlwZS5pY2FsID0gZnVuY3Rpb24oYUNvbmZpZyl7XHJcblx0XHRyZXR1cm4gdGhpcy50ZXh0KClcclxuXHRcdC50aGVuKGZ1bmN0aW9uKGFUZXh0KXtcclxuXHRcdFx0cmV0dXJuIHBhY2suSUNhbGVuZGFyLnBhcnNlKGFUZXh0LCBhQ29uZmlnKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=