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
	ICalendar : _src__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].ICalendar		
};

/***/ }),

/***/ "./src/ICalendar.js":
/*!**************************!*\
  !*** ./src/ICalendar.js ***!
  \**************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _parse_Parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse/Parser */ "./src/parse/Parser.js");


const parserconfig = {
		
};



const Parser = { 
	parse : function(aText){
		return Object(_parse_Parser__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(aText, parserconfig);
	}
};

/* harmony default export */ __webpack_exports__["a"] = (Parser);



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _ICalendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ICalendar */ "./src/ICalendar.js");


const pack = {
	ICalendar : _ICalendar__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]
};

/* harmony default export */ __webpack_exports__["a"] = (pack);

/***/ }),

/***/ "./src/parse/Deserializer.js":
/*!***********************************!*\
  !*** ./src/parse/Deserializer.js ***!
  \***********************************/
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
		params[parts[0]] = parts[1];
	}	
	
	return params;
};

const getValue = function(aValue, aTokenizer){
	let value = aValue;	
	let match = REGEX_VALUELINE.exec(aTokenizer.lines()[aTokenizer.index() + 1]);
	while(match != null && typeof match !== "undefined" && match.length > 0){		
		value += "\n" + match[1];
		aTokenizer.skip();		
		match = REGEX_VALUELINE.exec(aTokenizer.lines()[aTokenizer.index()]);
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

/***/ "./src/parse/Parser.js":
/*!*****************************!*\
  !*** ./src/parse/Parser.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Tokenizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tokenizer */ "./src/parse/Tokenizer.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/parse/Utils.js");



const BEGIN_TOKEN = /^begin$/i;
const END_TOKEN = /^end$/i;

const parseProperty = function(aToken, aConfig){
	if(typeof aConfig.propertyparser !== "undefined" && typeof aConfig.propertyparser[aToken.key] === "function"){
		const result = aConfig.propertyparser[aToken.key](aToken);
		return result instanceof Promise ? result : Promise.resolve(result);
	}
	
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
	return parse(new _Tokenizer__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](aText), (aConfig || {}));
};
/* harmony default export */ __webpack_exports__["a"] = (Parser);

/***/ }),

/***/ "./src/parse/Tokenizer.js":
/*!********************************!*\
  !*** ./src/parse/Tokenizer.js ***!
  \********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Deserializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Deserializer */ "./src/parse/Deserializer.js");


const Tokenizer = function(theLines, aIndex){
	console.log("lines count", theLines.length);
	console.log("lines", theLines);
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
			console.log("token index:", index);
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

/***/ "./src/parse/Utils.js":
/*!****************************!*\
  !*** ./src/parse/Utils.js ***!
  \****************************/
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

/* harmony default export */ __webpack_exports__["a"] = ({
	appendToObject: appendToObject
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYnJvd3Nlci1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvSUNhbGVuZGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFyc2UvRGVzZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJzZS9QYXJzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnNlL1Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFyc2UvVXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUF3Qjs7QUFFeEIsMkNBQTJDLFNBQUk7QUFDL0M7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixhQUFhLG9EQUFJO0FBQ2pCLEU7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUFtQzs7QUFFbkM7O0FBRUE7Ozs7QUFJQSxnQjtBQUNBO0FBQ0EsU0FBUyxxRUFBSztBQUNkO0FBQ0E7O0FBRWUsK0RBQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDZHRCO0FBQW9DOztBQUVwQztBQUNBLGFBQWEsMERBQVM7QUFDdEI7O0FBRWUsNkRBQUksRTs7Ozs7Ozs7Ozs7OztBQ05uQiw2QkFBNkIsS0FBSztBQUNsQzs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQztBQUNBO0FBQ0EsZUFBZSxrQkFBa0I7QUFDakM7QUFDQTtBQUNBLEU7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9CO0FBQ0E7QUFDQSwwRTtBQUNBO0FBQ0Esb0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRWUscUVBQVksRTs7Ozs7Ozs7Ozs7OztBQ3JEM0I7QUFBQTtBQUFvQztBQUNSOztBQUU1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUEsbUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBOztBQUVBLFVBQVUsc0RBQUs7QUFDZjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxVQUFVLHNEQUFLO0FBQ2YsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjs7O0FBR0Esd0M7QUFDQSxrQkFBa0IsMERBQVMsdUJBQXVCO0FBQ2xEO0FBQ2UsK0RBQU0sRTs7Ozs7Ozs7Ozs7OztBQ3JEckI7QUFBMEM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsVztBQUNBO0FBQ0E7QUFDQSxZQUFZLHFFQUFZO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRztBQUNBO0FBQ2U7QUFDZjtBQUNBLENBQUMsRzs7Ozs7Ozs7Ozs7OztBQ3pDRDtBQUNBLGtDO0FBQ0Esc0M7QUFDQTtBQUNBO0FBQ0EsTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQSxDQUFDLEUiLCJmaWxlIjoiZGVmYXVsdGpzLWljYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Jyb3dzZXItaW5kZXguanNcIik7XG4iLCJpbXBvcnQgcGFjayBmcm9tIFwiLi9zcmNcIlxyXG5cclxuY29uc3QgZ2xvYmFsID0gd2luZG93IHx8IGdsb2JhbCB8fCBzZWxmIHx8IHRoaXMgfHwge307XHJcbmdsb2JhbC5kZWZhdWx0anMgPSBnbG9iYWwuZGVmYXVsdGpzIHx8IHt9O1xyXG5nbG9iYWwuZGVmYXVsdGpzLmljYWwgPSBnbG9iYWwuZGVmYXVsdGpzLmljYWwgfHwge1xyXG5cdFZFUlNJT04gOiBcIiR7dmVyc2lvbn1cIixcclxuXHRJQ2FsZW5kYXIgOiBwYWNrLklDYWxlbmRhclx0XHRcclxufTsiLCJpbXBvcnQgcGFyc2UgZnJvbSBcIi4vcGFyc2UvUGFyc2VyXCI7XHJcblxyXG5jb25zdCBwYXJzZXJjb25maWcgPSB7XHJcblx0XHRcclxufTtcclxuXHJcblxyXG5cclxuY29uc3QgUGFyc2VyID0geyBcclxuXHRwYXJzZSA6IGZ1bmN0aW9uKGFUZXh0KXtcclxuXHRcdHJldHVybiBwYXJzZShhVGV4dCwgcGFyc2VyY29uZmlnKTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYXJzZXI7XHJcblxyXG4iLCJpbXBvcnQgSUNhbGVuZGFyIGZyb20gXCIuL0lDYWxlbmRhclwiO1xyXG5cclxuY29uc3QgcGFjayA9IHtcclxuXHRJQ2FsZW5kYXIgOiBJQ2FsZW5kYXJcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBhY2s7IiwiLy9jb25zdCBSRUdFWF9LRVkgPSAvXihbXlxcczo7XSspKDsoW146XSspKT86KC4rKSQvO1xyXG5jb25zdCBSRUdFWF9WQUxVRUxJTkUgPSAvXlxccysoLispJC87XHJcblxyXG5jb25zdCBLRVlfVkFMVUVfU1BMSVQgPSAvOi87XHJcbmNvbnN0IFBBUkFNX1NQTElUID0gLzsvO1xyXG5jb25zdCBQQVJBTV9WQUxVRV9TUExJVCA9IC89LztcclxuXHJcbmNvbnN0IGdldFBhcmFtZXRlciA9IGZ1bmN0aW9uKGFUZXh0KXtcclxuXHRpZihhVGV4dCA9PSBudWxsIHx8IHR5cGVvZiBhVGV4dCA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdHJldHVybjtcclxuXHRsZXQgaXRlbXMgPSBhVGV4dC5zcGxpdChQQVJBTV9TUExJVCk7XHRcclxuXHRsZXQgcGFyYW1zID0ge307XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKXtcclxuXHRcdGxldCBwYXJ0cyA9IGl0ZW1zW2ldLnNwbGl0KFBBUkFNX1ZBTFVFX1NQTElUKTtcclxuXHRcdHBhcmFtc1twYXJ0c1swXV0gPSBwYXJ0c1sxXTtcclxuXHR9XHRcclxuXHRcclxuXHRyZXR1cm4gcGFyYW1zO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0VmFsdWUgPSBmdW5jdGlvbihhVmFsdWUsIGFUb2tlbml6ZXIpe1xyXG5cdGxldCB2YWx1ZSA9IGFWYWx1ZTtcdFxyXG5cdGxldCBtYXRjaCA9IFJFR0VYX1ZBTFVFTElORS5leGVjKGFUb2tlbml6ZXIubGluZXMoKVthVG9rZW5pemVyLmluZGV4KCkgKyAxXSk7XHJcblx0d2hpbGUobWF0Y2ggIT0gbnVsbCAmJiB0eXBlb2YgbWF0Y2ggIT09IFwidW5kZWZpbmVkXCIgJiYgbWF0Y2gubGVuZ3RoID4gMCl7XHRcdFxyXG5cdFx0dmFsdWUgKz0gXCJcXG5cIiArIG1hdGNoWzFdO1xyXG5cdFx0YVRva2VuaXplci5za2lwKCk7XHRcdFxyXG5cdFx0bWF0Y2ggPSBSRUdFWF9WQUxVRUxJTkUuZXhlYyhhVG9rZW5pemVyLmxpbmVzKClbYVRva2VuaXplci5pbmRleCgpXSk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcblxyXG5jb25zdCBEZXNlcmlhbGl6ZXIgPSBmdW5jdGlvbihhTGluZSwgYVRva2VuaXplcil7XHJcblx0bGV0IGluZGV4ID0gYUxpbmUuc2VhcmNoKEtFWV9WQUxVRV9TUExJVCk7XHJcblx0aWYoaW5kZXggPT0gLTEpXHJcblx0XHRyZXR1cm47XHJcblx0XHJcblx0bGV0IHJlc3VsdCA9IHtcclxuXHRcdFx0a2V5IDogYUxpbmUuc3Vic3RyaW5nKDAsIGluZGV4KSxcclxuXHRcdFx0dmFsdWUgOiBnZXRWYWx1ZShhTGluZS5zdWJzdHJpbmcoaW5kZXggKyAxKSwgYVRva2VuaXplcilcclxuXHR9O1xyXG5cdFxyXG5cdGluZGV4ID0gcmVzdWx0LmtleS5zZWFyY2goUEFSQU1fU1BMSVQpO1xyXG5cdGlmKGluZGV4ICE9IC0xKXtcclxuXHRcdHJlc3VsdC5wYXJhbWV0ZXIgPSBnZXRQYXJhbWV0ZXIocmVzdWx0LmtleS5zdWJzdHJpbmcoaW5kZXggKyAxKSk7XHJcblx0XHRyZXN1bHQua2V5ID0gcmVzdWx0LmtleS5zdWJzdHJpbmcoMCwgaW5kZXgpO1xyXG5cdH1cclxuXHRcdFxyXG5cdFxyXG5cdHJldHVybiByZXN1bHRcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERlc2VyaWFsaXplcjsiLCJpbXBvcnQgVG9rZW5pemVyIGZyb20gXCIuL1Rva2VuaXplclwiO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IEJFR0lOX1RPS0VOID0gL15iZWdpbiQvaTtcclxuY29uc3QgRU5EX1RPS0VOID0gL15lbmQkL2k7XHJcblxyXG5jb25zdCBwYXJzZVByb3BlcnR5ID0gZnVuY3Rpb24oYVRva2VuLCBhQ29uZmlnKXtcclxuXHRpZih0eXBlb2YgYUNvbmZpZy5wcm9wZXJ0eXBhcnNlciAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgYUNvbmZpZy5wcm9wZXJ0eXBhcnNlclthVG9rZW4ua2V5XSA9PT0gXCJmdW5jdGlvblwiKXtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IGFDb25maWcucHJvcGVydHlwYXJzZXJbYVRva2VuLmtleV0oYVRva2VuKTtcclxuXHRcdHJldHVybiByZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlID8gcmVzdWx0IDogUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xyXG5cdFx0XCJfdHlwZV9cIiA6IFwicHJvcGVydHlcIixcclxuXHRcdFwicGFyYW1ldGVyXCIgOiBhVG9rZW4ucGFyYW1ldGVyLFxyXG5cdFx0XCJ2YWx1ZVwiIDogYVRva2VuLnZhbHVlXHJcblx0fSk7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZVRva2VuID0gZnVuY3Rpb24oYVRva2VuLCBhVG9rZW5pemVyLCBhQ29uZmlnLCBhQ29udGV4dCl7XHRcclxuXHRpZihFTkRfVE9LRU4udGVzdChhVG9rZW4ua2V5KSlcclxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoYUNvbnRleHQpO1xyXG5cdGVsc2UgaWYoQkVHSU5fVE9LRU4udGVzdChhVG9rZW4ua2V5KSlcclxuXHRcdHJldHVybiBwYXJzZShhVG9rZW5pemVyLCBhQ29uZmlnLCB7fSlcclxuXHRcdC50aGVuKGZ1bmN0aW9uKGFSZXN1bHQpe1xyXG5cdFx0XHRpZih0eXBlb2YgYUNvbnRleHQgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhUmVzdWx0KTtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBVdGlscy5hcHBlbmRUb09iamVjdChhVG9rZW4udmFsdWUudG9Mb3dlckNhc2UoKSwgYVJlc3VsdCwgYUNvbnRleHQpXHJcblx0XHRcdC50aGVuKHBhcnNlLmJpbmQobnVsbCxhVG9rZW5pemVyLCBhQ29uZmlnKSk7XHJcblx0XHR9KTtcclxuXHQgZWxzZSB7XHJcblx0XHRyZXR1cm4gcGFyc2VQcm9wZXJ0eShhVG9rZW4sIGFDb25maWcpXHJcblx0XHQudGhlbihmdW5jdGlvbihhVmFsdWUpe1xyXG5cdFx0XHRyZXR1cm4gVXRpbHMuYXBwZW5kVG9PYmplY3QoYVRva2VuLmtleS50b0xvd2VyQ2FzZSgpLCBhVmFsdWUsIGFDb250ZXh0KTtcclxuXHRcdH0pLnRoZW4ocGFyc2UuYmluZChudWxsICxhVG9rZW5pemVyLCBhQ29uZmlnKSk7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3QgcGFyc2UgPSBmdW5jdGlvbihhVG9rZW5pemVyLCBhQ29uZmlnLCBhQ29udGV4dCl7XHJcblx0cmV0dXJuIGFUb2tlbml6ZXIubmV4dCgpXHJcblx0LnRoZW4oZnVuY3Rpb24oYVRva2VuKXtcclxuXHRcdGlmKGFUb2tlbilcclxuXHRcdFx0cmV0dXJuIHBhcnNlVG9rZW4oYVRva2VuLCBhVG9rZW5pemVyLCBhQ29uZmlnLCBhQ29udGV4dCk7XHJcblx0XHRcdFxyXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhQ29udGV4dCk7XHJcblx0fSk7XHJcbn07XHJcblxyXG5cclxuY29uc3QgUGFyc2VyID0gZnVuY3Rpb24oYVRleHQsIGFDb25maWcpe1x0XHJcblx0cmV0dXJuIHBhcnNlKG5ldyBUb2tlbml6ZXIoYVRleHQpLCAoYUNvbmZpZyB8fCB7fSkpO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBQYXJzZXI7IiwiaW1wb3J0IERlc2VyaWFsaXplciBmcm9tIFwiLi9EZXNlcmlhbGl6ZXJcIjtcclxuXHJcbmNvbnN0IFRva2VuaXplciA9IGZ1bmN0aW9uKHRoZUxpbmVzLCBhSW5kZXgpe1xyXG5cdGNvbnNvbGUubG9nKFwibGluZXMgY291bnRcIiwgdGhlTGluZXMubGVuZ3RoKTtcclxuXHRjb25zb2xlLmxvZyhcImxpbmVzXCIsIHRoZUxpbmVzKTtcclxuXHRsZXQgbGluZXMgPSB0aGVMaW5lcztcclxuXHRsZXQgaW5kZXggPSBhSW5kZXggfHwgLTE7XHJcblx0bGV0IHRva2VuID0gbnVsbDtcclxuXHRyZXR1cm4ge1xyXG5cdFx0cmVzZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRpbmRleCA9IC0xO1xyXG5cdFx0fSxcclxuXHRcdHNraXAgOiBmdW5jdGlvbihsZW5ndGgpe1xyXG5cdFx0XHRpbmRleCArPSAobGVuZ3RoIHx8IDEpO1xyXG5cdFx0fSxcclxuXHRcdGluZGV4IDogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIGluZGV4O1xyXG5cdFx0fSxcclxuXHRcdHRva2VuIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIG1hdGNoO1xyXG5cdFx0fSxcclxuXHRcdGxpbmVzIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIGxpbmVzO1xyXG5cdFx0fSxcclxuXHRcdG5leHQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRpbmRleCsrOyBcclxuXHRcdFx0Y29uc29sZS5sb2coXCJ0b2tlbiBpbmRleDpcIiwgaW5kZXgpO1xyXG5cdFx0XHRpZihpbmRleCA8IGxpbmVzLmxlbmd0aClcclxuXHRcdFx0XHR0b2tlbiA9IERlc2VyaWFsaXplcihsaW5lc1tpbmRleF0sIHRoaXMpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dG9rZW4gPSBudWxsO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh0b2tlbik7XHJcblx0XHR9LFxyXG5cdFx0Y2xvbmUgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gbmV3IFRva2VuaXplcihsaW5lcywgaW5kZXgpO1xyXG5cdFx0fVxyXG5cdH07XHRcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYVRleHQpe1xyXG5cdHJldHVybiBuZXcgVG9rZW5pemVyKGFUZXh0LnNwbGl0KC9cXHI/XFxuL2cpKVxyXG59OyIsImNvbnN0IGFwcGVuZFRvT2JqZWN0ID0gZnVuY3Rpb24oYUtleSwgYURhdGEsIGFPYmplY3Qpe1xyXG5cdGlmKHR5cGVvZiBhRGF0YSAhPT0gXCJ1bmRlZmluZWRcIil7XHRcdFxyXG5cdFx0bGV0IGtleSA9IGFLZXkudG9Mb3dlckNhc2UoKS50cmltKCk7XHRcclxuXHRcdGlmKHR5cGVvZiBhT2JqZWN0W2tleV0gPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdGFPYmplY3Rba2V5XSA9IGFEYXRhO1xyXG5cdFx0ZWxzZXtcdFx0XHJcblx0XHRcdGxldCBkYXRhID0gYU9iamVjdFtrZXldO1xyXG5cdFx0XHRpZihkYXRhIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdFx0ZGF0YS5wdXNoKGFEYXRhKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGFPYmplY3Rba2V5XSA9IFthT2JqZWN0W2tleV0sIGFEYXRhXTtcclxuXHRcdH1cclxuXHR9XHRcclxuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFPYmplY3QpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGFwcGVuZFRvT2JqZWN0OiBhcHBlbmRUb09iamVjdFxyXG59OyJdLCJzb3VyY2VSb290IjoiIn0=