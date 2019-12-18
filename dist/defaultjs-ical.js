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
/******/ 	return __webpack_require__(__webpack_require__.s = "./browser-index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./browser-index.js":
/*!**************************!*\
  !*** ./browser-index.js ***!
  \**************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src */ "./src/index.js");


const global = window || global || self || undefined || {};
global.defaultjs = global.defaultjs || {};
global.defaultjs.ical = global.defaultjs.ical || {
	VERSION : "1.0.0-beta.1",
	Parser : _src__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].Parser,
	ICalendar : _src__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].ICalendar
};

if(typeof global.fetch === "function" 
	&& typeof global.Response !== "undefined" 
	&& typeof global.Response.prototype !== "undefined" 
	&& typeof global.Response.prototype.ical === "undefined"){
	global.Response.prototype.ical = function(aConfig){
		return this.text()
		.then(function(aText){
			return _src__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].ICalendar.parse(aText, aConfig);
		});
	}
};

/***/ }),

/***/ "./src/Deserializer.js":
/*!*****************************!*\
  !*** ./src/Deserializer.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//const REGEX_KEY = /^([^\s:;]+)(;([^:]+))?:(.+)$/;
const REGEX_VALUELINE = /^\s+(.+)$/;

const KEY_VALUE_SPLIT = /:/;
const PARAM_SPLIT = /;/;
const PARAM_VALUE_SPLIT = /=/;

const getParameter = function(aText){
	if(aText == null || typeof aText === "undefined")
		return;
	let items = aText.split(PARAM_SPLIT);	
	let params = {};
	for(let i = 0; i < items.length; i++){
		let parts = items[i].split(PARAM_VALUE_SPLIT);
		params[parts[0].toLowerCase()] = parts[1];
	}	
	
	return params;
};

const getValue = function(aValue, aTokenizer){
	let value = aValue;	
	let match = REGEX_VALUELINE.exec(aTokenizer.lines()[aTokenizer.index() + 1]);
	while(match != null && typeof match !== "undefined" && match.length > 0){		
		value += "\n" + match[1];
		aTokenizer.skip();		
		match = REGEX_VALUELINE.exec(aTokenizer.lines()[aTokenizer.index() + 1]);
	}
	
	return value;
};


const Deserializer = function(aLine, aTokenizer){
	let index = aLine.search(KEY_VALUE_SPLIT);
	if(index == -1)
		return;
	
	let result = {
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
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/Utils.js");




const DATETIME = /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/;
const toDateTime = function(aToken){
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
		organizer : function(aToken){
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
	
	return _Utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].updateObject({}, defaultconfig, aConfig);
};



const Parser = {
	"default" : defaultconfig,
	parse : function(aText, aConfig){
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
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/Utils.js");



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
		.then(function(aResult){
			if(typeof aContext === "undefined")
				return Promise.resolve(aResult);
			
			return _Utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].appendToObject(aToken.value.toLowerCase(), aResult, aContext)
			.then(parse.bind(null,aTokenizer, aConfig));
		});
	 else {
		return parseProperty(aToken, aConfig)
		.then(function(aValue){
			return _Utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].appendToObject(aToken.key.toLowerCase(), aValue, aContext);
		}).then(parse.bind(null ,aTokenizer, aConfig));
	}
};

const parse = function(aTokenizer, aConfig, aContext){
	return aTokenizer.next()
	.then(function(aToken){
		if(aToken)
			return parseToken(aToken, aTokenizer, aConfig, aContext);
			
		return Promise.resolve(aContext);
	});
};


const Parser = function(aText, aConfig){
	return parse(new _Tokenizer__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](aText), (aConfig || {})).then(function(aResult){
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
	return new Tokenizer(aText.split(/\r?\n/g))
});;

/***/ }),

/***/ "./src/Utils.js":
/*!**********************!*\
  !*** ./src/Utils.js ***!
  \**********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const appendToObject = function(aKey, aData, aObject){
	if(typeof aData !== "undefined"){		
		let key = aKey.toLowerCase().trim();	
		if(typeof aObject[key] === "undefined")
			aObject[key] = aData;
		else{		
			let data = aObject[key];
			if(data instanceof Array)
				data.push(aData);
			else
				aObject[key] = [aObject[key], aData];
		}
	}	
	return Promise.resolve(aObject);
};

const isObject = function(aObject){
	return typeof aObject !== "undefined" && aObject != null && aObject.constructor.name === "Object"
}

const updateObject = function(aTarget){	
	for(let i = 1; i < arguments.length; i++){
		const source = arguments[i];
		Object.getOwnPropertyNames(source).forEach(function(aKey){
			if(isObject(aTarget[aKey]))
				updateObject(aTarget[aKey], source[aKey]);
			else
				aTarget[aKey] = source[aKey];
		});
	}
	
	return aTarget;
}

/* harmony default export */ __webpack_exports__["a"] = ({
	appendToObject: appendToObject,
	updateObject : updateObject
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Parser */ "./src/Parser.js");
/* harmony import */ var _ICalendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ICalendar */ "./src/ICalendar.js");



const pack = {
	Parser : _Parser__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"],
	ICalendar : _ICalendar__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]
};

/* harmony default export */ __webpack_exports__["a"] = (pack);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYnJvd3Nlci1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRGVzZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL3NyYy9JQ2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVG9rZW5pemVyLmpzIiwid2VicGFjazovLy8uL3NyYy9VdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUF3Qjs7QUFFeEIsMkNBQTJDLFNBQUk7QUFDL0M7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixVQUFVLG9EQUFJO0FBQ2QsYUFBYSxvREFBSTtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsb0RBQUk7QUFDZCxHQUFHO0FBQ0g7QUFDQSxFOzs7Ozs7Ozs7Ozs7O0FDcEJBLDZCQUE2QixLQUFLO0FBQ2xDOztBQUVBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNDO0FBQ0E7QUFDQSxlQUFlLGtCQUFrQjtBQUNqQztBQUNBO0FBQ0EsRTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0I7QUFDQTtBQUNBLDBFO0FBQ0E7QUFDQSxvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFZSxxRUFBWSxFOzs7Ozs7Ozs7Ozs7O0FDckQzQjtBQUFBO0FBQTZCO0FBQ0Q7OztBQUc1QixzQkFBc0IsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxzREFBSyxnQkFBZ0I7QUFDN0I7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLCtEQUFLO0FBQ2Q7QUFDQTs7QUFFZSwrREFBTSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMvQ3RCO0FBQUE7QUFBb0M7QUFDUjs7QUFFNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQSx3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsbUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBOztBQUVBLFVBQVUsc0RBQUs7QUFDZjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxVQUFVLHNEQUFLO0FBQ2YsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjs7O0FBR0E7QUFDQSxrQkFBa0IsMERBQVMsdUJBQXVCO0FBQ2xEO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDZSwrREFBTSxFOzs7Ozs7Ozs7Ozs7O0FDbkVyQjtBQUEwQzs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSCxvQjtBQUNBO0FBQ0E7QUFDQSxZQUFZLHFFQUFZO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRztBQUNBO0FBQ2U7QUFDZjtBQUNBLENBQUMsRzs7Ozs7Ozs7Ozs7OztBQ3RDRDtBQUNBLGtDO0FBQ0Esc0M7QUFDQTtBQUNBO0FBQ0EsTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QztBQUNBLGVBQWUsc0JBQXNCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7OztBQ3JDRDtBQUFBO0FBQThCO0FBQ007O0FBRXBDO0FBQ0EsVUFBVSx1REFBTTtBQUNoQixhQUFhLDBEQUFTO0FBQ3RCOztBQUVlLDZEQUFJLEUiLCJmaWxlIjoiZGVmYXVsdGpzLWljYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Jyb3dzZXItaW5kZXguanNcIik7XG4iLCJpbXBvcnQgcGFjayBmcm9tIFwiLi9zcmNcIlxyXG5cclxuY29uc3QgZ2xvYmFsID0gd2luZG93IHx8IGdsb2JhbCB8fCBzZWxmIHx8IHRoaXMgfHwge307XHJcbmdsb2JhbC5kZWZhdWx0anMgPSBnbG9iYWwuZGVmYXVsdGpzIHx8IHt9O1xyXG5nbG9iYWwuZGVmYXVsdGpzLmljYWwgPSBnbG9iYWwuZGVmYXVsdGpzLmljYWwgfHwge1xyXG5cdFZFUlNJT04gOiBcIiR7dmVyc2lvbn1cIixcclxuXHRQYXJzZXIgOiBwYWNrLlBhcnNlcixcclxuXHRJQ2FsZW5kYXIgOiBwYWNrLklDYWxlbmRhclxyXG59O1xyXG5cclxuaWYodHlwZW9mIGdsb2JhbC5mZXRjaCA9PT0gXCJmdW5jdGlvblwiIFxyXG5cdCYmIHR5cGVvZiBnbG9iYWwuUmVzcG9uc2UgIT09IFwidW5kZWZpbmVkXCIgXHJcblx0JiYgdHlwZW9mIGdsb2JhbC5SZXNwb25zZS5wcm90b3R5cGUgIT09IFwidW5kZWZpbmVkXCIgXHJcblx0JiYgdHlwZW9mIGdsb2JhbC5SZXNwb25zZS5wcm90b3R5cGUuaWNhbCA9PT0gXCJ1bmRlZmluZWRcIil7XHJcblx0Z2xvYmFsLlJlc3BvbnNlLnByb3RvdHlwZS5pY2FsID0gZnVuY3Rpb24oYUNvbmZpZyl7XHJcblx0XHRyZXR1cm4gdGhpcy50ZXh0KClcclxuXHRcdC50aGVuKGZ1bmN0aW9uKGFUZXh0KXtcclxuXHRcdFx0cmV0dXJuIHBhY2suSUNhbGVuZGFyLnBhcnNlKGFUZXh0LCBhQ29uZmlnKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufTsiLCIvL2NvbnN0IFJFR0VYX0tFWSA9IC9eKFteXFxzOjtdKykoOyhbXjpdKykpPzooLispJC87XHJcbmNvbnN0IFJFR0VYX1ZBTFVFTElORSA9IC9eXFxzKyguKykkLztcclxuXHJcbmNvbnN0IEtFWV9WQUxVRV9TUExJVCA9IC86LztcclxuY29uc3QgUEFSQU1fU1BMSVQgPSAvOy87XHJcbmNvbnN0IFBBUkFNX1ZBTFVFX1NQTElUID0gLz0vO1xyXG5cclxuY29uc3QgZ2V0UGFyYW1ldGVyID0gZnVuY3Rpb24oYVRleHQpe1xyXG5cdGlmKGFUZXh0ID09IG51bGwgfHwgdHlwZW9mIGFUZXh0ID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0cmV0dXJuO1xyXG5cdGxldCBpdGVtcyA9IGFUZXh0LnNwbGl0KFBBUkFNX1NQTElUKTtcdFxyXG5cdGxldCBwYXJhbXMgPSB7fTtcclxuXHRmb3IobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspe1xyXG5cdFx0bGV0IHBhcnRzID0gaXRlbXNbaV0uc3BsaXQoUEFSQU1fVkFMVUVfU1BMSVQpO1xyXG5cdFx0cGFyYW1zW3BhcnRzWzBdLnRvTG93ZXJDYXNlKCldID0gcGFydHNbMV07XHJcblx0fVx0XHJcblx0XHJcblx0cmV0dXJuIHBhcmFtcztcclxufTtcclxuXHJcbmNvbnN0IGdldFZhbHVlID0gZnVuY3Rpb24oYVZhbHVlLCBhVG9rZW5pemVyKXtcclxuXHRsZXQgdmFsdWUgPSBhVmFsdWU7XHRcclxuXHRsZXQgbWF0Y2ggPSBSRUdFWF9WQUxVRUxJTkUuZXhlYyhhVG9rZW5pemVyLmxpbmVzKClbYVRva2VuaXplci5pbmRleCgpICsgMV0pO1xyXG5cdHdoaWxlKG1hdGNoICE9IG51bGwgJiYgdHlwZW9mIG1hdGNoICE9PSBcInVuZGVmaW5lZFwiICYmIG1hdGNoLmxlbmd0aCA+IDApe1x0XHRcclxuXHRcdHZhbHVlICs9IFwiXFxuXCIgKyBtYXRjaFsxXTtcclxuXHRcdGFUb2tlbml6ZXIuc2tpcCgpO1x0XHRcclxuXHRcdG1hdGNoID0gUkVHRVhfVkFMVUVMSU5FLmV4ZWMoYVRva2VuaXplci5saW5lcygpW2FUb2tlbml6ZXIuaW5kZXgoKSArIDFdKTtcclxuXHR9XHJcblx0XHJcblx0cmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IERlc2VyaWFsaXplciA9IGZ1bmN0aW9uKGFMaW5lLCBhVG9rZW5pemVyKXtcclxuXHRsZXQgaW5kZXggPSBhTGluZS5zZWFyY2goS0VZX1ZBTFVFX1NQTElUKTtcclxuXHRpZihpbmRleCA9PSAtMSlcclxuXHRcdHJldHVybjtcclxuXHRcclxuXHRsZXQgcmVzdWx0ID0ge1xyXG5cdFx0XHRrZXkgOiBhTGluZS5zdWJzdHJpbmcoMCwgaW5kZXgpLFxyXG5cdFx0XHR2YWx1ZSA6IGdldFZhbHVlKGFMaW5lLnN1YnN0cmluZyhpbmRleCArIDEpLCBhVG9rZW5pemVyKVxyXG5cdH07XHJcblx0XHJcblx0aW5kZXggPSByZXN1bHQua2V5LnNlYXJjaChQQVJBTV9TUExJVCk7XHJcblx0aWYoaW5kZXggIT0gLTEpe1xyXG5cdFx0cmVzdWx0LnBhcmFtZXRlciA9IGdldFBhcmFtZXRlcihyZXN1bHQua2V5LnN1YnN0cmluZyhpbmRleCArIDEpKTtcclxuXHRcdHJlc3VsdC5rZXkgPSByZXN1bHQua2V5LnN1YnN0cmluZygwLCBpbmRleCk7XHJcblx0fVxyXG5cdFx0XHJcblx0XHJcblx0cmV0dXJuIHJlc3VsdFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGVzZXJpYWxpemVyOyIsImltcG9ydCBwYXJzZSBmcm9tIFwiLi9QYXJzZXJcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XHJcblxyXG5cclxuY29uc3QgREFURVRJTUUgPSAvKFxcZHs0fSkoXFxkezJ9KShcXGR7Mn0pVChcXGR7Mn0pKFxcZHsyfSkoXFxkezJ9KS87XHJcbmNvbnN0IHRvRGF0ZVRpbWUgPSBmdW5jdGlvbihhVG9rZW4pe1xyXG5cdGNvbnN0IG1hdGNoID0gREFURVRJTUUuZXhlYyhhVG9rZW4udmFsdWUpO1xyXG5cdGlmKCFtYXRjaClcclxuXHRcdHJldHVybiBhVG9rZW4udmFsdWU7XHJcblx0cmV0dXJuIG5ldyBEYXRlKHBhcnNlSW50KG1hdGNoWzFdKVxyXG5cdFx0XHQscGFyc2VJbnQobWF0Y2hbMl0pXHJcblx0XHRcdCxwYXJzZUludChtYXRjaFszXSlcclxuXHRcdFx0LHBhcnNlSW50KG1hdGNoWzRdKVxyXG5cdFx0XHQscGFyc2VJbnQobWF0Y2hbNV0pXHJcblx0XHRcdCxwYXJzZUludChtYXRjaFs2XSkpO1xyXG59O1xyXG5cclxuY29uc3QgZGVmYXVsdGNvbmZpZyA9IHtcclxuXHRvbmx5UHJvcGVydHlWYWx1ZXM6IHRydWUsXHJcblx0cHJvcGVydHlwYXJzZXIgOiB7XHJcblx0XHRvcmdhbml6ZXIgOiBmdW5jdGlvbihhVG9rZW4pe1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdG5hbWUgOiAvKFteXCJdKykvaS5leGVjKGFUb2tlbi5wYXJhbWV0ZXJbXCJjblwiXSlbMV0sXHJcblx0XHRcdFx0bWFpbCA6IC9eKG1haWx0bzopPyguKykkL2kuZXhlYyhhVG9rZW4udmFsdWUpWzJdXHRcdFxyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdGR0c3RhcnQgOiB0b0RhdGVUaW1lLFxyXG5cdFx0ZHRlbmQgOiB0b0RhdGVUaW1lXHJcblx0fVxyXG59O1xyXG5cclxuY29uc3QgYnVpbGRDb25maWcgPSBmdW5jdGlvbihhQ29uZmlnKXtcclxuXHRpZih0eXBlb2YgYUNvbmZpZyA9PT0gXCJ1bmRlZmluZWRcIiB8fCBhQ29uZmlnID09IG51bGwpXHJcblx0XHRyZXR1cm4gZGVmYXVsdGNvbmZpZztcclxuXHRcclxuXHRyZXR1cm4gVXRpbHMudXBkYXRlT2JqZWN0KHt9LCBkZWZhdWx0Y29uZmlnLCBhQ29uZmlnKTtcclxufTtcclxuXHJcblxyXG5cclxuY29uc3QgUGFyc2VyID0ge1xyXG5cdFwiZGVmYXVsdFwiIDogZGVmYXVsdGNvbmZpZyxcclxuXHRwYXJzZSA6IGZ1bmN0aW9uKGFUZXh0LCBhQ29uZmlnKXtcclxuXHRcdHJldHVybiBwYXJzZShhVGV4dCwgYnVpbGRDb25maWcoYUNvbmZpZykpO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhcnNlcjtcclxuXHJcbiIsImltcG9ydCBUb2tlbml6ZXIgZnJvbSBcIi4vVG9rZW5pemVyXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi9VdGlsc1wiO1xyXG5cclxuY29uc3QgQkVHSU5fVE9LRU4gPSAvXmJlZ2luJC9pO1xyXG5jb25zdCBFTkRfVE9LRU4gPSAvXmVuZCQvaTtcclxuXHJcbmNvbnN0IHBhcnNlUHJvcGVydHkgPSBmdW5jdGlvbihhVG9rZW4sIGFDb25maWcpe1xyXG5cdHRyeXtcclxuXHRcdGNvbnN0IGtleSA9IGFUb2tlbi5rZXkudG9Mb3dlckNhc2UoKTtcclxuXHRcdGlmKHR5cGVvZiBhQ29uZmlnLnByb3BlcnR5cGFyc2VyICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBhQ29uZmlnLnByb3BlcnR5cGFyc2VyW2tleV0gPT09IFwiZnVuY3Rpb25cIil7XHJcblx0XHRcdGNvbnN0IHJlc3VsdCA9IGFDb25maWcucHJvcGVydHlwYXJzZXJba2V5XShhVG9rZW4pO1xyXG5cdFx0XHRpZih0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRcdHJldHVybiByZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlID8gcmVzdWx0IDogUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XHJcblx0XHR9XHJcblx0fWNhdGNoIChlKXtcclxuXHRcdGNvbnNvbGUuZXJyb3IoZSlcclxuXHR9XHJcblx0XHJcblx0aWYoYUNvbmZpZy5vbmx5UHJvcGVydHlWYWx1ZXMpXHJcblx0XHRyZXR1cm4gIFByb21pc2UucmVzb2x2ZShhVG9rZW4udmFsdWUpO1x0XHJcblx0ZWxzZVx0XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcclxuXHRcdFx0XCJfdHlwZV9cIiA6IFwicHJvcGVydHlcIixcclxuXHRcdFx0XCJwYXJhbWV0ZXJcIiA6IGFUb2tlbi5wYXJhbWV0ZXIsXHJcblx0XHRcdFwidmFsdWVcIiA6IGFUb2tlbi52YWx1ZVxyXG5cdFx0fSk7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZVRva2VuID0gZnVuY3Rpb24oYVRva2VuLCBhVG9rZW5pemVyLCBhQ29uZmlnLCBhQ29udGV4dCl7XHRcclxuXHRpZihFTkRfVE9LRU4udGVzdChhVG9rZW4ua2V5KSlcclxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoYUNvbnRleHQpO1xyXG5cdGVsc2UgaWYoQkVHSU5fVE9LRU4udGVzdChhVG9rZW4ua2V5KSlcclxuXHRcdHJldHVybiBwYXJzZShhVG9rZW5pemVyLCBhQ29uZmlnLCB7fSlcclxuXHRcdC50aGVuKGZ1bmN0aW9uKGFSZXN1bHQpe1xyXG5cdFx0XHRpZih0eXBlb2YgYUNvbnRleHQgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhUmVzdWx0KTtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBVdGlscy5hcHBlbmRUb09iamVjdChhVG9rZW4udmFsdWUudG9Mb3dlckNhc2UoKSwgYVJlc3VsdCwgYUNvbnRleHQpXHJcblx0XHRcdC50aGVuKHBhcnNlLmJpbmQobnVsbCxhVG9rZW5pemVyLCBhQ29uZmlnKSk7XHJcblx0XHR9KTtcclxuXHQgZWxzZSB7XHJcblx0XHRyZXR1cm4gcGFyc2VQcm9wZXJ0eShhVG9rZW4sIGFDb25maWcpXHJcblx0XHQudGhlbihmdW5jdGlvbihhVmFsdWUpe1xyXG5cdFx0XHRyZXR1cm4gVXRpbHMuYXBwZW5kVG9PYmplY3QoYVRva2VuLmtleS50b0xvd2VyQ2FzZSgpLCBhVmFsdWUsIGFDb250ZXh0KTtcclxuXHRcdH0pLnRoZW4ocGFyc2UuYmluZChudWxsICxhVG9rZW5pemVyLCBhQ29uZmlnKSk7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3QgcGFyc2UgPSBmdW5jdGlvbihhVG9rZW5pemVyLCBhQ29uZmlnLCBhQ29udGV4dCl7XHJcblx0cmV0dXJuIGFUb2tlbml6ZXIubmV4dCgpXHJcblx0LnRoZW4oZnVuY3Rpb24oYVRva2VuKXtcclxuXHRcdGlmKGFUb2tlbilcclxuXHRcdFx0cmV0dXJuIHBhcnNlVG9rZW4oYVRva2VuLCBhVG9rZW5pemVyLCBhQ29uZmlnLCBhQ29udGV4dCk7XHJcblx0XHRcdFxyXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhQ29udGV4dCk7XHJcblx0fSk7XHJcbn07XHJcblxyXG5cclxuY29uc3QgUGFyc2VyID0gZnVuY3Rpb24oYVRleHQsIGFDb25maWcpe1xyXG5cdHJldHVybiBwYXJzZShuZXcgVG9rZW5pemVyKGFUZXh0KSwgKGFDb25maWcgfHwge30pKS50aGVuKGZ1bmN0aW9uKGFSZXN1bHQpe1xyXG5cdFx0aWYodHlwZW9mIGFDb25maWcubWFwID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoYUNvbmZpZy5tYXAoYVJlc3VsdCkpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFSZXN1bHQpO1xyXG5cdH0pO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBQYXJzZXI7IiwiaW1wb3J0IERlc2VyaWFsaXplciBmcm9tIFwiLi9EZXNlcmlhbGl6ZXJcIjtcclxuXHJcbmNvbnN0IFRva2VuaXplciA9IGZ1bmN0aW9uKHRoZUxpbmVzLCBhSW5kZXgpe1xyXG5cdGxldCBsaW5lcyA9IHRoZUxpbmVzO1xyXG5cdGxldCBpbmRleCA9IGFJbmRleCB8fCAtMTtcclxuXHRsZXQgdG9rZW4gPSBudWxsO1xyXG5cdHJldHVybiB7XHJcblx0XHRyZXNldCA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdGluZGV4ID0gLTE7XHJcblx0XHR9LFxyXG5cdFx0c2tpcCA6IGZ1bmN0aW9uKGxlbmd0aCl7XHJcblx0XHRcdGluZGV4ICs9IChsZW5ndGggfHwgMSk7XHJcblx0XHR9LFxyXG5cdFx0aW5kZXggOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gaW5kZXg7XHJcblx0XHR9LFxyXG5cdFx0dG9rZW4gOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gbWF0Y2g7XHJcblx0XHR9LFxyXG5cdFx0bGluZXMgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gbGluZXM7XHJcblx0XHR9LFxyXG5cdFx0bmV4dCA6IGZ1bmN0aW9uKCl7XHRcdFx0XHJcblx0XHRcdGluZGV4Kys7XHJcblx0XHRcdGlmKGluZGV4IDwgbGluZXMubGVuZ3RoKVxyXG5cdFx0XHRcdHRva2VuID0gRGVzZXJpYWxpemVyKGxpbmVzW2luZGV4XSwgdGhpcyk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR0b2tlbiA9IG51bGw7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRva2VuKTtcclxuXHRcdH0sXHJcblx0XHRjbG9uZSA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBuZXcgVG9rZW5pemVyKGxpbmVzLCBpbmRleCk7XHJcblx0XHR9XHJcblx0fTtcdFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhVGV4dCl7XHJcblx0cmV0dXJuIG5ldyBUb2tlbml6ZXIoYVRleHQuc3BsaXQoL1xccj9cXG4vZykpXHJcbn07IiwiY29uc3QgYXBwZW5kVG9PYmplY3QgPSBmdW5jdGlvbihhS2V5LCBhRGF0YSwgYU9iamVjdCl7XHJcblx0aWYodHlwZW9mIGFEYXRhICE9PSBcInVuZGVmaW5lZFwiKXtcdFx0XHJcblx0XHRsZXQga2V5ID0gYUtleS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcdFxyXG5cdFx0aWYodHlwZW9mIGFPYmplY3Rba2V5XSA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0YU9iamVjdFtrZXldID0gYURhdGE7XHJcblx0XHRlbHNle1x0XHRcclxuXHRcdFx0bGV0IGRhdGEgPSBhT2JqZWN0W2tleV07XHJcblx0XHRcdGlmKGRhdGEgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0XHRkYXRhLnB1c2goYURhdGEpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0YU9iamVjdFtrZXldID0gW2FPYmplY3Rba2V5XSwgYURhdGFdO1xyXG5cdFx0fVxyXG5cdH1cdFxyXG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoYU9iamVjdCk7XHJcbn07XHJcblxyXG5jb25zdCBpc09iamVjdCA9IGZ1bmN0aW9uKGFPYmplY3Qpe1xyXG5cdHJldHVybiB0eXBlb2YgYU9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhT2JqZWN0ICE9IG51bGwgJiYgYU9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIk9iamVjdFwiXHJcbn1cclxuXHJcbmNvbnN0IHVwZGF0ZU9iamVjdCA9IGZ1bmN0aW9uKGFUYXJnZXQpe1x0XHJcblx0Zm9yKGxldCBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyl7XHJcblx0XHRjb25zdCBzb3VyY2UgPSBhcmd1bWVudHNbaV07XHJcblx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oYUtleSl7XHJcblx0XHRcdGlmKGlzT2JqZWN0KGFUYXJnZXRbYUtleV0pKVxyXG5cdFx0XHRcdHVwZGF0ZU9iamVjdChhVGFyZ2V0W2FLZXldLCBzb3VyY2VbYUtleV0pO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0YVRhcmdldFthS2V5XSA9IHNvdXJjZVthS2V5XTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRcclxuXHRyZXR1cm4gYVRhcmdldDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGFwcGVuZFRvT2JqZWN0OiBhcHBlbmRUb09iamVjdCxcclxuXHR1cGRhdGVPYmplY3QgOiB1cGRhdGVPYmplY3RcclxufTsiLCJpbXBvcnQgUGFyc2VyIGZyb20gXCIuL1BhcnNlclwiO1xyXG5pbXBvcnQgSUNhbGVuZGFyIGZyb20gXCIuL0lDYWxlbmRhclwiO1xyXG5cclxuY29uc3QgcGFjayA9IHtcclxuXHRQYXJzZXIgOiBQYXJzZXIsXHJcblx0SUNhbGVuZGFyIDogSUNhbGVuZGFyXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwYWNrOyJdLCJzb3VyY2VSb290IjoiIn0=