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
/* harmony export */   "defGet": () => (/* binding */ defGet),
/* harmony export */   "defGetSet": () => (/* binding */ defGetSet),
/* harmony export */   "defValue": () => (/* binding */ defValue),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "isPojo": () => (/* binding */ isPojo),
/* harmony export */   "merge": () => (/* binding */ merge)
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
/* harmony export */   "ICalendar": () => (/* reexport safe */ _ICalendar__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Parser": () => (/* reexport safe */ _Parser__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Parser */ "./src/Parser.js");
/* harmony import */ var _ICalendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ICalendar */ "./src/ICalendar.js");





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
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ICalendar": () => (/* reexport safe */ _src__WEBPACK_IMPORTED_MODULE_0__.ICalendar),
/* harmony export */   "Parser": () => (/* reexport safe */ _src__WEBPACK_IMPORTED_MODULE_0__.Parser)
/* harmony export */ });
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src */ "./src/index.js");




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixrREFBUyx1QkFBdUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7OztBQ25FcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLFlBQVkseURBQVk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFlLG9DQUFTO0FBQ3hCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEM4QjtBQUNNO0FBQ3BDOzs7Ozs7O1VDRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOMEM7QUFDMUM7QUFDNkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaWNhbC8uL25vZGVfbW9kdWxlcy9AZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9Fc2NhcGVyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1pY2FsLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFByb3BlcnR5LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1pY2FsLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL09iamVjdFV0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1pY2FsLy4vc3JjL0Rlc2VyaWFsaXplci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaWNhbC8uL3NyYy9JQ2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWljYWwvLi9zcmMvUGFyc2VyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1pY2FsLy4vc3JjL1Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaWNhbC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaWNhbC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaWNhbC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWljYWwvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaWNhbC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1pY2FsLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVxdWlyZWQgdG8gYnVpbGQgdGhlIGludGVybmFsIGVzY2FwZSBmaWx0ZXIgZm9yIHJlZ2V4XG5jb25zdCBSRUdFWENIQVJNQVAgPSBbXCJcXFxcXCIsXCI/XCIsXCJbXCIsIFwiXVwiLCBcIntcIiwgXCJ9XCIsIFwiKFwiLCBcIilcIiwgXCIuXCIsIFwiXlwiLCBcIiRcIl1cblx0Lm1hcChjaGFyID0+IHsgXG5cdFx0cmV0dXJuIHtmOiBuZXcgUmVnRXhwKFwiXFxcXFwiICtjaGFyLCBcImdcIiksIHYgOiBcIlxcXFxcIiArIGNoYXJ9O1xuXHR9KTtcblxuXG5jb25zdCBtYXBwaW5nID0gKGFUZXh0LCB0aGVGaWx0ZXJzKSA9PiB7XG5cdGxldCB0ZXh0ID0gYVRleHQ7XG5cdHRoZUZpbHRlcnMuZm9yRWFjaChpdGVtID0+IHtcblx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKGl0ZW0uZiwgaXRlbS52KTtcblx0fSk7XG5cdHJldHVybiB0ZXh0O1xufTtcblxuY29uc3QgYnVpbGRVbmVzY2FwZUxpc3QgPSAoYUNoYXJNYXAsIGlzQ2FzZVNlbnNpdGl2KSA9PiB7XG5cdGNvbnN0IG9wdGlvbiA9IGlzQ2FzZVNlbnNpdGl2ID8gXCJtZ1wiIDogXCJtZ2lcIjsgXG5cdHJldHVybiBhQ2hhck1hcC5tYXAoaXRlbSA9PiB7XG5cdFx0aWYoIWl0ZW0uYXQgfHwgaXRlbS5hdCA9PSBcInVuZXNjYXBlXCIpXG5cdFx0XHRyZXR1cm4ge2Y6IG5ldyBSZWdFeHAobWFwcGluZyhpdGVtLmVzY2FwZWQsIFJFR0VYQ0hBUk1BUCksIG9wdGlvbiksIHY6IGl0ZW0uY2hhcn1cblx0fSkuZmlsdGVyKGl0ZW0gPT4gISFpdGVtKTtcbn07XG5cbmNvbnN0IGJ1aWxkRXNjYXBlTGlzdCA9IChhQ2hhck1hcCwgaXNDYXNlU2Vuc2l0aXYpID0+IHtcblx0Y29uc3Qgb3B0aW9uID0gaXNDYXNlU2Vuc2l0aXYgPyBcIm1nXCIgOiBcIm1naVwiOyBcblx0cmV0dXJuIGFDaGFyTWFwLm1hcChpdGVtID0+IHtcblx0XHRpZighaXRlbS5hdCB8fCBpdGVtLmF0ID09IFwiZXNjYXBlXCIpXG5cdFx0XHRyZXR1cm4ge2Y6IG5ldyBSZWdFeHAobWFwcGluZyhpdGVtLmNoYXIsUkVHRVhDSEFSTUFQKSwgb3B0aW9uKSwgdjogaXRlbS5lc2NhcGVkfVxuXHR9KS5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0pO1xufTtcbmNsYXNzIEVzY2FwZXIge1xuXHRjb25zdHJ1Y3Rvcihlc2NhcGVNYXAsIGlzQ2FzZVNlbnNpdGl2KXtcblx0XHR0aGlzLmVzY2FwZU1hcCA9IGJ1aWxkRXNjYXBlTGlzdChlc2NhcGVNYXAsIGlzQ2FzZVNlbnNpdGl2KVxuXHRcdHRoaXMudW5lc2NhcGVNYXAgPSBidWlsZFVuZXNjYXBlTGlzdChlc2NhcGVNYXAsIGlzQ2FzZVNlbnNpdGl2KVxuXHR9XG5cdFxuXHRlc2NhcGUoYVRleHQpe1xuXHRcdHJldHVybiBtYXBwaW5nKGFUZXh0LCB0aGlzLmVzY2FwZU1hcCk7XG5cdH1cblx0XG5cdHVuZXNjYXBlKGFUZXh0KXtcblx0XHRyZXR1cm4gbWFwcGluZyhhVGV4dCwgdGhpcy51bmVzY2FwZU1hcCk7XG5cdH1cblx0XG5cdHN0YXRpYyBSRUdFWFBfRVNDQVBFUigpe1xuXHRcdHJldHVybiBuZXcgRXNjYXBlcihbXG5cdFx0XHR7Y2hhcjogXCJcXFxcXCIsIGVzY2FwZWQgOiBcIlxcXFxcXFxcXCJ9LFxuXHRcdFx0e2NoYXI6IFwiP1wiLCBlc2NhcGVkIDogXCJcXFxcP1wifSxcblx0XHRcdHtjaGFyOiBcIltcIiwgZXNjYXBlZCA6IFwiXFxcXFtcIn0sXG5cdFx0XHR7Y2hhcjogXCJdXCIsIGVzY2FwZWQgOiBcIlxcXFxdXCJ9LFxuXHRcdFx0e2NoYXI6IFwie1wiLCBlc2NhcGVkIDogXCJcXFxce1wifSxcblx0XHRcdHtjaGFyOiBcIn1cIiwgZXNjYXBlZCA6IFwiXFxcXH1cIn0sXG5cdFx0XHR7Y2hhcjogXCIoXCIsIGVzY2FwZWQgOiBcIlxcXFwoXCJ9LFxuXHRcdFx0e2NoYXI6IFwiKVwiLCBlc2NhcGVkIDogXCJcXFxcKVwifSxcblx0XHRcdHtjaGFyOiBcIi5cIiwgZXNjYXBlZCA6IFwiXFxcXC5cIn0sXG5cdFx0XHR7Y2hhcjogXCJeXCIsIGVzY2FwZWQgOiBcIlxcXFxeXCJ9LFxuXHRcdFx0e2NoYXI6IFwiJFwiLCBlc2NhcGVkIDogXCJcXFxcJFwifVxuXHRcdF0pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVzY2FwZXI7XG5cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE9iamVjdFByb3BlcnR5IHtcclxuXHRjb25zdHJ1Y3RvcihrZXksIGNvbnRleHQpe1xyXG5cdFx0dGhpcy5rZXkgPSBrZXk7XHJcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cdH1cclxuXHRcclxuXHRnZXQga2V5RGVmaW5lZCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMua2V5IGluIHRoaXMuY29udGV4dDsgXHJcblx0fVxyXG5cdFxyXG5cdGdldCBoYXNWYWx1ZSgpe1xyXG5cdFx0cmV0dXJuICEhdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0Z2V0IHZhbHVlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0c2V0IHZhbHVlKGRhdGEpe1xyXG5cdFx0dGhpcy5jb250ZXh0W3RoaXMua2V5XSA9IGRhdGE7XHJcblx0fVxyXG5cdFxyXG5cdHNldCBhcHBlbmQoZGF0YSkge1xyXG5cdFx0aWYoIXRoaXMuaGFzVmFsdWUpXHJcblx0XHRcdHRoaXMudmFsdWUgPSBkYXRhO1xyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcclxuXHRcdFx0aWYodmFsdWUgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0XHR2YWx1ZS5wdXNoKGRhdGEpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dGhpcy52YWx1ZSA9IFt0aGlzLnZhbHVlLCBkYXRhXTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0cmVtb3ZlKCl7XHJcblx0XHRkZWxldGUgdGhpcy5jb250ZXh0W3RoaXMua2V5XTtcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGxvYWQoZGF0YSwga2V5LCBjcmVhdGU9dHJ1ZSkge1xyXG5cdFx0bGV0IGNvbnRleHQgPSBkYXRhO1xyXG5cdFx0Y29uc3Qga2V5cyA9IGtleS5zcGxpdChcIlxcLlwiKTtcclxuXHRcdGxldCBuYW1lID0ga2V5cy5zaGlmdCgpLnRyaW0oKTtcclxuXHRcdHdoaWxlKGtleXMubGVuZ3RoID4gMCl7XHJcblx0XHRcdGlmKCFjb250ZXh0W25hbWVdKXtcclxuXHRcdFx0XHRpZighY3JlYXRlKVxyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Y29udGV4dFtuYW1lXSA9IHt9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGNvbnRleHQgPSBjb250ZXh0W25hbWVdO1xyXG5cdFx0XHRuYW1lID0ga2V5cy5zaGlmdCgpLnRyaW0oKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIG5ldyBPYmplY3RQcm9wZXJ0eShuYW1lLCBjb250ZXh0KTtcclxuXHR9XHJcbn07IiwiaW1wb3J0IE9iamVjdFByb3BlcnR5IGZyb20gXCIuL09iamVjdFByb3BlcnR5LmpzXCI7XHJcbi8qKlxyXG4gKiBhcHBlbmQgYSBwcm9wZXJ5IHZhbHVlIHRvIGFuIG9iamVjdC4gSWYgcHJvcGVyeSBleGlzdHMgaXRzIHdvdWxkIGJlIGNvbnZlcnRlZCB0byBhbiBhcnJheVxyXG4gKlxyXG4gKiAgQHBhcmFtIGFLZXk6c3RyaW5nIG5hbWUgb2YgcHJvcGVydHlcclxuICogIEBwYXJhbSBhRGF0YTphbnkgcHJvcGVydHkgdmFsdWVcclxuICogIEBwYXJhbSBhT2JqZWN0Om9iamVjdCB0aGUgb2JqZWN0IHRvIGFwcGVuZCB0aGUgcHJvcGVydHlcclxuICpcclxuICogIEByZXR1cm4gcmV0dXJucyB0aGUgY2hhbmdlZCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBhcHBlbmQgPSBmdW5jdGlvbiAoYUtleSwgYURhdGEsIGFPYmplY3QpIHtcclxuXHRpZiAodHlwZW9mIGFEYXRhICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRjb25zdCBwcm9wZXJ0eSA9IE9iamVjdFByb3BlcnR5LmxvYWQoYU9iamVjdCwgYUtleSwgdHJ1ZSk7XHJcblx0XHRwcm9wZXJ0eS5hcHBlbmQgPSBhRGF0YTtcclxuXHR9XHJcblx0cmV0dXJuIGFPYmplY3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogY2hlY2tlZCBpZiBhbiBvYmplY3QgYSBzaW1wbGUgb2JqZWN0LiBObyBBcnJheSwgTWFwIG9yIHNvbWV0aGluZyBlbHNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gYU9iamVjdDpvYmplY3QgdGhlIG9iamVjdCB0byBiZSB0ZXN0aW5nXHJcbiAqXHJcbiAqIEByZXR1cm4gYm9vbGVhblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzUG9qbyA9IGZ1bmN0aW9uIChhT2JqZWN0KSB7XHJcblx0cmV0dXJuIHR5cGVvZiBhT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIGFPYmplY3QgIT0gbnVsbCAmJiBhT2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiT2JqZWN0XCI7XHJcbn07XHJcblxyXG4vKipcclxuICogbWVyZ2luZyBvYmplY3QgaW50byBhIHRhcmdldCBvYmplY3QuIEl0cyBvbmx5IG1lcmdlIHNpbXBsZSBvYmplY3QgYW5kIHN1YiBvYmplY3RzLiBFdmVyeSBvdGhlclxyXG4gKiB2YWx1ZSB3b3VsZCBiZSByZXBsYWNlZCBieSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2Ugb2JqZWN0LlxyXG4gKlxyXG4gKiBzYW1wbGU6IG1lcmdlKHRhcmdldCwgc291cmNlLTEsIHNvdXJjZS0yLCAuLi5zb3VyY2UtbilcclxuICpcclxuICogQHBhcmFtIHRhcmdldDpvYmplY3QgdGhlIHRhcmdldCBvYmplY3QgdG8gbWVyZ2luZyBpbnRvXHJcbiAqIEBwYXJhbSBzb3VyY2VzOm9iamVjdFxyXG4gKlxyXG4gKiBAcmV0dXJuIG9iamVjdCByZXR1cm5zIHRoZSB0YXJnZXQgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWVyZ2UgPSBmdW5jdGlvbiAodGFyZ2V0LCAuLi5zb3VyY2VzKSB7XHJcblx0aWYoIXRhcmdldClcclxuXHRcdHRhcmdldCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBzb3VyY2Ugb2Ygc291cmNlcykge1xyXG5cdFx0aWYgKGlzUG9qbyhzb3VyY2UpKSB7XHJcblx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcblx0XHRcdFx0aWYgKGlzUG9qbyh0YXJnZXRba2V5XSkpIG1lcmdlKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSk7XHJcblx0XHRcdFx0ZWxzZSB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0YXJnZXQ7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZFByb3BlcnR5RmlsdGVyID0gZnVuY3Rpb24gKHsgbmFtZXMsIGFsbG93ZWQgfSkge1xyXG5cdHJldHVybiAobmFtZSwgdmFsdWUsIGNvbnRleHQpID0+IHtcclxuXHRcdHJldHVybiBuYW1lcy5pbmNsdWRlcyhuYW1lKSA9PT0gYWxsb3dlZDtcclxuXHR9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRjb25zdCBbZGF0YSwgcHJvcEZpbHRlciwgeyBkZWVwID0gZmFsc2UsIHJlY3Vyc2l2ZSA9IHRydWUsIHBhcmVudHMgPSBbXSB9ID0ge31dID0gYXJndW1lbnRzO1xyXG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBuYW1lIGluIGRhdGEpIHtcclxuXHRcdGNvbnN0IHZhbHVlID0gZGF0YVtuYW1lXTtcclxuXHRcdGNvbnN0IGFjY2VwdCA9IHByb3BGaWx0ZXIobmFtZSwgdmFsdWUsIGRhdGEpO1xyXG5cdFx0aWYgKGFjY2VwdCAmJiAoIWRlZXAgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkpIHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0ZWxzZSBpZiAoYWNjZXB0ICYmIGRlZXApIHtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcclxuXHRcdFx0aWYgKHR5cGUgIT09IFwib2JqZWN0XCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBBcnJheSB8fCB2YWx1ZSBpbnN0YW5jZW9mIE1hcCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFNldCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCB8fCBwYXJlbnRzLmluY2x1ZGVzW3ZhbHVlXSB8fCB2YWx1ZSA9PSBkYXRhKSByZXN1bHRbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0ZWxzZSByZXN1bHRbbmFtZV0gPSBmaWx0ZXIodmFsdWUsIHByb3BGaWx0ZXIsIHsgZGVlcCwgcmVjdXJzaXZlLCBwYXJlbnRzOiBwYXJlbnRzLmNvbmNhdChkYXRhKSB9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVmVmFsdWUgPSAobywgbmFtZSwgdmFsdWUpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0dmFsdWUsXHJcblx0XHR3cml0YWJsZTogZmFsc2UsXHJcblx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0fSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWZHZXQgPSAobywgbmFtZSwgZ2V0KSA9PiB7XHJcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIG5hbWUsIHtcclxuXHRcdGdldCxcclxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZHZXRTZXQgPSAobywgbmFtZSwgZ2V0LCBzZXQpID0+IHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobywgbmFtZSwge1xyXG5cdFx0Z2V0LFxyXG5cdFx0c2V0LFxyXG5cdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGlzUG9qbyxcclxuXHRhcHBlbmQsXHJcblx0bWVyZ2UsXHJcblx0ZmlsdGVyLFxyXG5cdGJ1aWxkUHJvcGVydHlGaWx0ZXIsXHJcblx0ZGVmVmFsdWUsXHJcblx0ZGVmR2V0LFxyXG5cdGRlZkdldFNldCxcclxufTtcclxuIiwiaW1wb3J0IEVzY2FwZXIgZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL0VzY2FwZXJcIjtcclxuXHJcbi8vY29uc3QgUkVHRVhfS0VZID0gL14oW15cXHM6O10rKSg7KFteOl0rKSk/OiguKykkLztcclxuY29uc3QgUkVHRVhfVkFMVUVMSU5FID0gL15cXHMoLispJC87XHJcblxyXG5jb25zdCBLRVlfVkFMVUVfU1BMSVQgPSAvOi87XHJcbmNvbnN0IFBBUkFNX1NQTElUID0gLzsvO1xyXG5jb25zdCBQQVJBTV9WQUxVRV9TUExJVCA9IC89LztcclxuXHJcbmNvbnN0IEVTQ0FQRVIgPSBuZXcgRXNjYXBlcihbXHJcblx0e2NoYXI6IFwiLFwiLCBlc2NhcGVkOlwiXFxcXCxcIn0sXHJcblx0e2NoYXI6IFwiO1wiLCBlc2NhcGVkOlwiXFxcXDtcIn0sXHJcblx0e2NoYXI6IFwiOlwiLCBlc2NhcGVkOlwiXFxcXDpcIn0sXHJcbl0pO1xyXG5cclxuXHJcbmNvbnN0IGdldFBhcmFtZXRlciA9IGZ1bmN0aW9uKGFUZXh0KXtcclxuXHRpZihhVGV4dCA9PSBudWxsIHx8IHR5cGVvZiBhVGV4dCA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdHJldHVybjtcclxuXHRjb25zdCBpdGVtcyA9IGFUZXh0LnNwbGl0KFBBUkFNX1NQTElUKTtcclxuXHRjb25zdCBwYXJhbXMgPSB7fTtcclxuXHRpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG5cdFx0Y29uc3QgcGFydHMgPSBpdGVtLnNwbGl0KFBBUkFNX1ZBTFVFX1NQTElUKTtcclxuXHRcdHBhcmFtc1twYXJ0c1swXS50b0xvd2VyQ2FzZSgpXSA9IHBhcnRzWzFdO1xyXG5cdH0pXHJcblx0XHJcblx0cmV0dXJuIHBhcmFtcztcclxufTtcclxuXHJcbmNvbnN0IGdldFZhbHVlID0gZnVuY3Rpb24oYVZhbHVlLCBhVG9rZW5pemVyKXtcclxuXHRsZXQgdmFsdWUgPSBhVmFsdWU7XHJcblx0bGV0IG1hdGNoID0gUkVHRVhfVkFMVUVMSU5FLmV4ZWMoYVRva2VuaXplci5saW5lcygpW2FUb2tlbml6ZXIuaW5kZXgoKSArIDFdKTtcclxuXHR3aGlsZShtYXRjaCAhPSBudWxsICYmIHR5cGVvZiBtYXRjaCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtYXRjaC5sZW5ndGggPiAwKXtcdFx0XHJcblx0XHR2YWx1ZSArPSBtYXRjaFsxXTtcclxuXHRcdGFUb2tlbml6ZXIuc2tpcCgpO1xyXG5cdFx0bWF0Y2ggPSBSRUdFWF9WQUxVRUxJTkUuZXhlYyhhVG9rZW5pemVyLmxpbmVzKClbYVRva2VuaXplci5pbmRleCgpICsgMV0pO1xyXG5cdH1cclxuXHRcclxuXHRyZXR1cm4gRVNDQVBFUi51bmVzY2FwZSh2YWx1ZSk7XHJcbn07XHJcblxyXG5cclxuY29uc3QgRGVzZXJpYWxpemVyID0gZnVuY3Rpb24oYUxpbmUsIGFUb2tlbml6ZXIpe1xyXG5cdGxldCBpbmRleCA9IGFMaW5lLnNlYXJjaChLRVlfVkFMVUVfU1BMSVQpO1xyXG5cdGlmKGluZGV4ID09IC0xKVxyXG5cdFx0cmV0dXJuO1xyXG5cdFxyXG5cdGNvbnN0IHJlc3VsdCA9IHtcclxuXHRcdFx0a2V5IDogYUxpbmUuc3Vic3RyaW5nKDAsIGluZGV4KSxcclxuXHRcdFx0dmFsdWUgOiBnZXRWYWx1ZShhTGluZS5zdWJzdHJpbmcoaW5kZXggKyAxKSwgYVRva2VuaXplcilcclxuXHR9O1xyXG5cdFxyXG5cdGluZGV4ID0gcmVzdWx0LmtleS5zZWFyY2goUEFSQU1fU1BMSVQpO1xyXG5cdGlmKGluZGV4ICE9IC0xKXtcclxuXHRcdHJlc3VsdC5wYXJhbWV0ZXIgPSBnZXRQYXJhbWV0ZXIocmVzdWx0LmtleS5zdWJzdHJpbmcoaW5kZXggKyAxKSk7XHJcblx0XHRyZXN1bHQua2V5ID0gcmVzdWx0LmtleS5zdWJzdHJpbmcoMCwgaW5kZXgpO1xyXG5cdH1cclxuXHRcdFxyXG5cdFxyXG5cdHJldHVybiByZXN1bHRcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERlc2VyaWFsaXplcjsiLCJpbXBvcnQgcGFyc2UgZnJvbSBcIi4vUGFyc2VyXCI7XHJcbmltcG9ydCBPYmplY3RVdGlscyBmcm9tIFwiQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvT2JqZWN0VXRpbHNcIjtcclxuXHJcblxyXG5jb25zdCBEQVRFVElNRSA9IC8oXFxkezR9KShcXGR7Mn0pKFxcZHsyfSlUKFxcZHsyfSkoXFxkezJ9KShcXGR7Mn0pLztcclxuY29uc3QgdG9EYXRlVGltZSA9IGFUb2tlbiA9PiB7XHJcblx0Y29uc3QgbWF0Y2ggPSBEQVRFVElNRS5leGVjKGFUb2tlbi52YWx1ZSk7XHJcblx0aWYoIW1hdGNoKVxyXG5cdFx0cmV0dXJuIGFUb2tlbi52YWx1ZTtcclxuXHRyZXR1cm4gbmV3IERhdGUocGFyc2VJbnQobWF0Y2hbMV0pXHJcblx0XHRcdCxwYXJzZUludChtYXRjaFsyXSlcclxuXHRcdFx0LHBhcnNlSW50KG1hdGNoWzNdKVxyXG5cdFx0XHQscGFyc2VJbnQobWF0Y2hbNF0pXHJcblx0XHRcdCxwYXJzZUludChtYXRjaFs1XSlcclxuXHRcdFx0LHBhcnNlSW50KG1hdGNoWzZdKSk7XHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0Y29uZmlnID0ge1xyXG5cdG9ubHlQcm9wZXJ0eVZhbHVlczogdHJ1ZSxcclxuXHRwcm9wZXJ0eXBhcnNlciA6IHtcclxuXHRcdG9yZ2FuaXplciA6IGFUb2tlbiA9PiB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0bmFtZSA6IC8oW15cIl0rKS9pLmV4ZWMoYVRva2VuLnBhcmFtZXRlcltcImNuXCJdKVsxXSxcclxuXHRcdFx0XHRtYWlsIDogL14obWFpbHRvOik/KC4rKSQvaS5leGVjKGFUb2tlbi52YWx1ZSlbMl1cdFx0XHJcblx0XHRcdH07XHJcblx0XHR9LFxyXG5cdFx0ZHRzdGFydCA6IHRvRGF0ZVRpbWUsXHJcblx0XHRkdGVuZCA6IHRvRGF0ZVRpbWVcclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCBidWlsZENvbmZpZyA9IGZ1bmN0aW9uKGFDb25maWcpe1xyXG5cdGlmKHR5cGVvZiBhQ29uZmlnID09PSBcInVuZGVmaW5lZFwiIHx8IGFDb25maWcgPT0gbnVsbClcclxuXHRcdHJldHVybiBkZWZhdWx0Y29uZmlnO1xyXG5cdFxyXG5cdHJldHVybiBPYmplY3RVdGlscy5tZXJnZSh7fSwgZGVmYXVsdGNvbmZpZywgYUNvbmZpZyk7XHJcbn07XHJcblxyXG5cclxuXHJcbmNvbnN0IFBhcnNlciA9IHtcclxuXHRwYXJzZSA6IChhVGV4dCwgYUNvbmZpZykgPT4ge1xyXG5cdFx0cmV0dXJuIHBhcnNlKGFUZXh0LCBidWlsZENvbmZpZyhhQ29uZmlnKSk7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFyc2VyO1xyXG5cclxuIiwiaW1wb3J0IFRva2VuaXplciBmcm9tIFwiLi9Ub2tlbml6ZXJcIjtcclxuaW1wb3J0IE9iamVjdFV0aWxzIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9PYmplY3RVdGlsc1wiO1xyXG5cclxuY29uc3QgQkVHSU5fVE9LRU4gPSAvXmJlZ2luJC9pO1xyXG5jb25zdCBFTkRfVE9LRU4gPSAvXmVuZCQvaTtcclxuXHJcbmNvbnN0IHBhcnNlUHJvcGVydHkgPSBmdW5jdGlvbihhVG9rZW4sIGFDb25maWcpe1xyXG5cdHRyeXtcclxuXHRcdGNvbnN0IGtleSA9IGFUb2tlbi5rZXkudG9Mb3dlckNhc2UoKTtcclxuXHRcdGlmKHR5cGVvZiBhQ29uZmlnLnByb3BlcnR5cGFyc2VyICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBhQ29uZmlnLnByb3BlcnR5cGFyc2VyW2tleV0gPT09IFwiZnVuY3Rpb25cIil7XHJcblx0XHRcdGNvbnN0IHJlc3VsdCA9IGFDb25maWcucHJvcGVydHlwYXJzZXJba2V5XShhVG9rZW4pO1xyXG5cdFx0XHRpZih0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRcdHJldHVybiByZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlID8gcmVzdWx0IDogUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XHJcblx0XHR9XHJcblx0fWNhdGNoIChlKXtcclxuXHRcdGNvbnNvbGUuZXJyb3IoZSlcclxuXHR9XHJcblx0XHJcblx0aWYoYUNvbmZpZy5vbmx5UHJvcGVydHlWYWx1ZXMpXHJcblx0XHRyZXR1cm4gIFByb21pc2UucmVzb2x2ZShhVG9rZW4udmFsdWUpO1x0XHJcblx0ZWxzZVx0XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcclxuXHRcdFx0XCJfdHlwZV9cIiA6IFwicHJvcGVydHlcIixcclxuXHRcdFx0XCJwYXJhbWV0ZXJcIiA6IGFUb2tlbi5wYXJhbWV0ZXIsXHJcblx0XHRcdFwidmFsdWVcIiA6IGFUb2tlbi52YWx1ZVxyXG5cdFx0fSk7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZVRva2VuID0gZnVuY3Rpb24oYVRva2VuLCBhVG9rZW5pemVyLCBhQ29uZmlnLCBhQ29udGV4dCl7XHRcclxuXHRpZihFTkRfVE9LRU4udGVzdChhVG9rZW4ua2V5KSlcclxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoYUNvbnRleHQpO1xyXG5cdGVsc2UgaWYoQkVHSU5fVE9LRU4udGVzdChhVG9rZW4ua2V5KSlcclxuXHRcdHJldHVybiBwYXJzZShhVG9rZW5pemVyLCBhQ29uZmlnLCB7fSlcclxuXHRcdC50aGVuKHJlc3VsdCA9PiB7XHJcblx0XHRcdGlmKHR5cGVvZiBhQ29udGV4dCA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XHJcblx0XHRcdFxyXG5cdFx0XHRjb25zdCBjb250ZXh0ID0gT2JqZWN0VXRpbHMuYXBwZW5kKGFUb2tlbi52YWx1ZS50b0xvd2VyQ2FzZSgpLCByZXN1bHQsIGFDb250ZXh0KTtcclxuXHRcdFx0cmV0dXJuIHBhcnNlKGFUb2tlbml6ZXIsIGFDb25maWcsIGNvbnRleHQpO1xyXG5cdFx0fSk7XHJcblx0IGVsc2Uge1xyXG5cdFx0cmV0dXJuIHBhcnNlUHJvcGVydHkoYVRva2VuLCBhQ29uZmlnKVxyXG5cdFx0LnRoZW4odmFsdWUgPT4gT2JqZWN0VXRpbHMuYXBwZW5kKGFUb2tlbi5rZXkudG9Mb3dlckNhc2UoKSwgdmFsdWUsIGFDb250ZXh0KSlcclxuXHRcdC50aGVuKGNvbnRleHQgPT4gcGFyc2UoYVRva2VuaXplciwgYUNvbmZpZywgY29udGV4dCkpO1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IHBhcnNlID0gZnVuY3Rpb24oYVRva2VuaXplciwgYUNvbmZpZywgYUNvbnRleHQpe1xyXG5cdHJldHVybiBhVG9rZW5pemVyLm5leHQoKVxyXG5cdC50aGVuKGFUb2tlbiA9PiB7XHJcblx0XHRpZihhVG9rZW4pXHJcblx0XHRcdHJldHVybiBwYXJzZVRva2VuKGFUb2tlbiwgYVRva2VuaXplciwgYUNvbmZpZywgYUNvbnRleHQpO1xyXG5cdFx0XHRcclxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoYUNvbnRleHQpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IFBhcnNlciA9IGZ1bmN0aW9uKGFUZXh0LCBhQ29uZmlnKXtcclxuXHRyZXR1cm4gcGFyc2UobmV3IFRva2VuaXplcihhVGV4dCksIChhQ29uZmlnIHx8IHt9KSlcclxuXHRcdC50aGVuKGFSZXN1bHQgPT4ge1xyXG5cdFx0XHRpZih0eXBlb2YgYUNvbmZpZy5tYXAgPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFDb25maWcubWFwKGFSZXN1bHQpKTtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoYVJlc3VsdCk7XHJcblx0XHR9KTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgUGFyc2VyOyIsImltcG9ydCBEZXNlcmlhbGl6ZXIgZnJvbSBcIi4vRGVzZXJpYWxpemVyXCI7XHJcblxyXG5jb25zdCBUb2tlbml6ZXIgPSBmdW5jdGlvbih0aGVMaW5lcywgYUluZGV4KXtcclxuXHRjb25zdCBsaW5lcyA9IHRoZUxpbmVzO1xyXG5cdGxldCBpbmRleCA9IGFJbmRleCB8fCAtMTtcclxuXHRsZXQgdG9rZW4gPSBudWxsO1xyXG5cdHJldHVybiB7XHJcblx0XHRyZXNldCA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdGluZGV4ID0gLTE7XHJcblx0XHR9LFxyXG5cdFx0c2tpcCA6IGZ1bmN0aW9uKGxlbmd0aCl7XHJcblx0XHRcdGluZGV4ICs9IChsZW5ndGggfHwgMSk7XHJcblx0XHR9LFxyXG5cdFx0aW5kZXggOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gaW5kZXg7XHJcblx0XHR9LFxyXG5cdFx0dG9rZW4gOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gbWF0Y2g7XHJcblx0XHR9LFxyXG5cdFx0bGluZXMgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gbGluZXM7XHJcblx0XHR9LFxyXG5cdFx0bmV4dCA6IGZ1bmN0aW9uKCl7XHRcdFx0XHJcblx0XHRcdGluZGV4Kys7XHJcblx0XHRcdGlmKGluZGV4IDwgbGluZXMubGVuZ3RoKVxyXG5cdFx0XHRcdHRva2VuID0gRGVzZXJpYWxpemVyKGxpbmVzW2luZGV4XSwgdGhpcyk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR0b2tlbiA9IG51bGw7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRva2VuKTtcclxuXHRcdH0sXHJcblx0XHRjbG9uZSA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBuZXcgVG9rZW5pemVyKGxpbmVzLCBpbmRleCk7XHJcblx0XHR9XHJcblx0fTtcdFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhVGV4dCl7XHJcblx0cmV0dXJuIG5ldyBUb2tlbml6ZXIoYVRleHQuc3BsaXQoL1xccj9cXG4vZykuZmlsdGVyKGxpbmUgPT4gbGluZS50cmltKCkubGVuZ3RoID4gMCkpXHJcbn07IiwiaW1wb3J0IFBhcnNlciBmcm9tIFwiLi9QYXJzZXJcIjtcclxuaW1wb3J0IElDYWxlbmRhciBmcm9tIFwiLi9JQ2FsZW5kYXJcIjtcclxuXHJcbmV4cG9ydCB7UGFyc2VyLCBJQ2FsZW5kYXJ9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUGFyc2VyLCBJQ2FsZW5kYXIgfSBmcm9tIFwiLi9zcmNcIjtcclxuXHJcbmV4cG9ydCB7IFBhcnNlciwgSUNhbGVuZGFyIH07XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==