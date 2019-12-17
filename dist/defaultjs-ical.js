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
	const key = aToken.key.toLowerCase();
	if(typeof aConfig.mapper !== "undefined" && typeof aConfig.mapper[key] === "function"){
		const result = aConfig.mapper[key](aToken);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYnJvd3Nlci1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvSUNhbGVuZGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFyc2UvRGVzZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJzZS9QYXJzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnNlL1Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFyc2UvVXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUF3Qjs7QUFFeEIsMkNBQTJDLFNBQUk7QUFDL0M7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixhQUFhLG9EQUFJO0FBQ2pCLEU7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTtBQUNBOzs7O0FBSUEsZ0I7QUFDQTtBQUNBLFNBQVMscUVBQUs7QUFDZDtBQUNBOztBQUVlLCtEQUFNLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3RCdEI7QUFBb0M7O0FBRXBDO0FBQ0EsYUFBYSwwREFBUztBQUN0Qjs7QUFFZSw2REFBSSxFOzs7Ozs7Ozs7Ozs7O0FDTm5CLDZCQUE2QixLQUFLO0FBQ2xDOztBQUVBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNDO0FBQ0E7QUFDQSxlQUFlLGtCQUFrQjtBQUNqQztBQUNBO0FBQ0EsRTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0I7QUFDQTtBQUNBLDBFO0FBQ0E7QUFDQSxvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFZSxxRUFBWSxFOzs7Ozs7Ozs7Ozs7O0FDckQzQjtBQUFBO0FBQW9DO0FBQ1I7O0FBRTVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBLG1FO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQSxVQUFVLHNEQUFLO0FBQ2Y7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsVUFBVSxzREFBSztBQUNmLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBLHdDO0FBQ0Esa0JBQWtCLDBEQUFTLHVCQUF1QjtBQUNsRDtBQUNlLCtEQUFNLEU7Ozs7Ozs7Ozs7Ozs7QUN0RHJCO0FBQTBDOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLFlBQVkscUVBQVk7QUFDeEI7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHO0FBQ0E7QUFDZTtBQUNmO0FBQ0EsQ0FBQyxHOzs7Ozs7Ozs7Ozs7O0FDdENEO0FBQ0Esa0M7QUFDQSxzQztBQUNBO0FBQ0E7QUFDQSxPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTtBQUNBO0FBQ0E7O0FBRWU7QUFDZjtBQUNBLENBQUMsRSIsImZpbGUiOiJkZWZhdWx0anMtaWNhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYnJvd3Nlci1pbmRleC5qc1wiKTtcbiIsImltcG9ydCBwYWNrIGZyb20gXCIuL3NyY1wiXHJcblxyXG5jb25zdCBnbG9iYWwgPSB3aW5kb3cgfHwgZ2xvYmFsIHx8IHNlbGYgfHwgdGhpcyB8fCB7fTtcclxuZ2xvYmFsLmRlZmF1bHRqcyA9IGdsb2JhbC5kZWZhdWx0anMgfHwge307XHJcbmdsb2JhbC5kZWZhdWx0anMuaWNhbCA9IGdsb2JhbC5kZWZhdWx0anMuaWNhbCB8fCB7XHJcblx0VkVSU0lPTiA6IFwiJHt2ZXJzaW9ufVwiLFxyXG5cdElDYWxlbmRhciA6IHBhY2suSUNhbGVuZGFyXHRcdFxyXG59OyIsImltcG9ydCBwYXJzZSBmcm9tIFwiLi9wYXJzZS9QYXJzZXJcIjtcclxuXHJcbmNvbnN0IHBhcnNlcmNvbmZpZyA9IHtcclxuXHRtYXBwZXIgOiB7XHJcblx0XHRvcmdhbml6ZXIgOiBmdW5jdGlvbihhVG9rZW4pe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhhVG9rZW4pO1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdG5hbWUgOiAvKFteXCJdKykvaS5leGVjKGFUb2tlbi5wYXJhbWV0ZXJbXCJjblwiXSlbMV0sXHJcblx0XHRcdFx0bWFpbCA6IC9eKG1haWx0bzopPyguKykkL2kuZXhlYyhhVG9rZW4udmFsdWUpWzJdXHRcdFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cdFx0XHJcbn07XHJcblxyXG5cclxuXHJcbmNvbnN0IFBhcnNlciA9IHsgXHJcblx0cGFyc2UgOiBmdW5jdGlvbihhVGV4dCl7XHJcblx0XHRyZXR1cm4gcGFyc2UoYVRleHQsIHBhcnNlcmNvbmZpZyk7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFyc2VyO1xyXG5cclxuIiwiaW1wb3J0IElDYWxlbmRhciBmcm9tIFwiLi9JQ2FsZW5kYXJcIjtcclxuXHJcbmNvbnN0IHBhY2sgPSB7XHJcblx0SUNhbGVuZGFyIDogSUNhbGVuZGFyXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwYWNrOyIsIi8vY29uc3QgUkVHRVhfS0VZID0gL14oW15cXHM6O10rKSg7KFteOl0rKSk/OiguKykkLztcclxuY29uc3QgUkVHRVhfVkFMVUVMSU5FID0gL15cXHMrKC4rKSQvO1xyXG5cclxuY29uc3QgS0VZX1ZBTFVFX1NQTElUID0gLzovO1xyXG5jb25zdCBQQVJBTV9TUExJVCA9IC87LztcclxuY29uc3QgUEFSQU1fVkFMVUVfU1BMSVQgPSAvPS87XHJcblxyXG5jb25zdCBnZXRQYXJhbWV0ZXIgPSBmdW5jdGlvbihhVGV4dCl7XHJcblx0aWYoYVRleHQgPT0gbnVsbCB8fCB0eXBlb2YgYVRleHQgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRyZXR1cm47XHJcblx0bGV0IGl0ZW1zID0gYVRleHQuc3BsaXQoUEFSQU1fU1BMSVQpO1x0XHJcblx0bGV0IHBhcmFtcyA9IHt9O1xyXG5cdGZvcihsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKyl7XHJcblx0XHRsZXQgcGFydHMgPSBpdGVtc1tpXS5zcGxpdChQQVJBTV9WQUxVRV9TUExJVCk7XHJcblx0XHRwYXJhbXNbcGFydHNbMF0udG9Mb3dlckNhc2UoKV0gPSBwYXJ0c1sxXTtcclxuXHR9XHRcclxuXHRcclxuXHRyZXR1cm4gcGFyYW1zO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0VmFsdWUgPSBmdW5jdGlvbihhVmFsdWUsIGFUb2tlbml6ZXIpe1xyXG5cdGxldCB2YWx1ZSA9IGFWYWx1ZTtcdFxyXG5cdGxldCBtYXRjaCA9IFJFR0VYX1ZBTFVFTElORS5leGVjKGFUb2tlbml6ZXIubGluZXMoKVthVG9rZW5pemVyLmluZGV4KCkgKyAxXSk7XHJcblx0d2hpbGUobWF0Y2ggIT0gbnVsbCAmJiB0eXBlb2YgbWF0Y2ggIT09IFwidW5kZWZpbmVkXCIgJiYgbWF0Y2gubGVuZ3RoID4gMCl7XHRcdFxyXG5cdFx0dmFsdWUgKz0gXCJcXG5cIiArIG1hdGNoWzFdO1xyXG5cdFx0YVRva2VuaXplci5za2lwKCk7XHRcdFxyXG5cdFx0bWF0Y2ggPSBSRUdFWF9WQUxVRUxJTkUuZXhlYyhhVG9rZW5pemVyLmxpbmVzKClbYVRva2VuaXplci5pbmRleCgpXSk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcblxyXG5jb25zdCBEZXNlcmlhbGl6ZXIgPSBmdW5jdGlvbihhTGluZSwgYVRva2VuaXplcil7XHJcblx0bGV0IGluZGV4ID0gYUxpbmUuc2VhcmNoKEtFWV9WQUxVRV9TUExJVCk7XHJcblx0aWYoaW5kZXggPT0gLTEpXHJcblx0XHRyZXR1cm47XHJcblx0XHJcblx0bGV0IHJlc3VsdCA9IHtcclxuXHRcdFx0a2V5IDogYUxpbmUuc3Vic3RyaW5nKDAsIGluZGV4KSxcclxuXHRcdFx0dmFsdWUgOiBnZXRWYWx1ZShhTGluZS5zdWJzdHJpbmcoaW5kZXggKyAxKSwgYVRva2VuaXplcilcclxuXHR9O1xyXG5cdFxyXG5cdGluZGV4ID0gcmVzdWx0LmtleS5zZWFyY2goUEFSQU1fU1BMSVQpO1xyXG5cdGlmKGluZGV4ICE9IC0xKXtcclxuXHRcdHJlc3VsdC5wYXJhbWV0ZXIgPSBnZXRQYXJhbWV0ZXIocmVzdWx0LmtleS5zdWJzdHJpbmcoaW5kZXggKyAxKSk7XHJcblx0XHRyZXN1bHQua2V5ID0gcmVzdWx0LmtleS5zdWJzdHJpbmcoMCwgaW5kZXgpO1xyXG5cdH1cclxuXHRcdFxyXG5cdFxyXG5cdHJldHVybiByZXN1bHRcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERlc2VyaWFsaXplcjsiLCJpbXBvcnQgVG9rZW5pemVyIGZyb20gXCIuL1Rva2VuaXplclwiO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IEJFR0lOX1RPS0VOID0gL15iZWdpbiQvaTtcclxuY29uc3QgRU5EX1RPS0VOID0gL15lbmQkL2k7XHJcblxyXG5jb25zdCBwYXJzZVByb3BlcnR5ID0gZnVuY3Rpb24oYVRva2VuLCBhQ29uZmlnKXtcclxuXHRjb25zdCBrZXkgPSBhVG9rZW4ua2V5LnRvTG93ZXJDYXNlKCk7XHJcblx0aWYodHlwZW9mIGFDb25maWcubWFwcGVyICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBhQ29uZmlnLm1hcHBlcltrZXldID09PSBcImZ1bmN0aW9uXCIpe1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gYUNvbmZpZy5tYXBwZXJba2V5XShhVG9rZW4pO1xyXG5cdFx0cmV0dXJuIHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UgPyByZXN1bHQgOiBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcclxuXHR9XHJcblx0XHJcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XHJcblx0XHRcIl90eXBlX1wiIDogXCJwcm9wZXJ0eVwiLFxyXG5cdFx0XCJwYXJhbWV0ZXJcIiA6IGFUb2tlbi5wYXJhbWV0ZXIsXHJcblx0XHRcInZhbHVlXCIgOiBhVG9rZW4udmFsdWVcclxuXHR9KTtcclxufTtcclxuXHJcbmNvbnN0IHBhcnNlVG9rZW4gPSBmdW5jdGlvbihhVG9rZW4sIGFUb2tlbml6ZXIsIGFDb25maWcsIGFDb250ZXh0KXtcdFxyXG5cdGlmKEVORF9UT0tFTi50ZXN0KGFUb2tlbi5rZXkpKVxyXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhQ29udGV4dCk7XHJcblx0ZWxzZSBpZihCRUdJTl9UT0tFTi50ZXN0KGFUb2tlbi5rZXkpKVxyXG5cdFx0cmV0dXJuIHBhcnNlKGFUb2tlbml6ZXIsIGFDb25maWcsIHt9KVxyXG5cdFx0LnRoZW4oZnVuY3Rpb24oYVJlc3VsdCl7XHJcblx0XHRcdGlmKHR5cGVvZiBhQ29udGV4dCA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFSZXN1bHQpO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIFV0aWxzLmFwcGVuZFRvT2JqZWN0KGFUb2tlbi52YWx1ZS50b0xvd2VyQ2FzZSgpLCBhUmVzdWx0LCBhQ29udGV4dClcclxuXHRcdFx0LnRoZW4ocGFyc2UuYmluZChudWxsLGFUb2tlbml6ZXIsIGFDb25maWcpKTtcclxuXHRcdH0pO1xyXG5cdCBlbHNlIHtcclxuXHRcdHJldHVybiBwYXJzZVByb3BlcnR5KGFUb2tlbiwgYUNvbmZpZylcclxuXHRcdC50aGVuKGZ1bmN0aW9uKGFWYWx1ZSl7XHJcblx0XHRcdHJldHVybiBVdGlscy5hcHBlbmRUb09iamVjdChhVG9rZW4ua2V5LnRvTG93ZXJDYXNlKCksIGFWYWx1ZSwgYUNvbnRleHQpO1xyXG5cdFx0fSkudGhlbihwYXJzZS5iaW5kKG51bGwgLGFUb2tlbml6ZXIsIGFDb25maWcpKTtcclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZSA9IGZ1bmN0aW9uKGFUb2tlbml6ZXIsIGFDb25maWcsIGFDb250ZXh0KXtcclxuXHRyZXR1cm4gYVRva2VuaXplci5uZXh0KClcclxuXHQudGhlbihmdW5jdGlvbihhVG9rZW4pe1xyXG5cdFx0aWYoYVRva2VuKVxyXG5cdFx0XHRyZXR1cm4gcGFyc2VUb2tlbihhVG9rZW4sIGFUb2tlbml6ZXIsIGFDb25maWcsIGFDb250ZXh0KTtcclxuXHRcdFx0XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFDb250ZXh0KTtcclxuXHR9KTtcclxufTtcclxuXHJcblxyXG5jb25zdCBQYXJzZXIgPSBmdW5jdGlvbihhVGV4dCwgYUNvbmZpZyl7XHRcclxuXHRyZXR1cm4gcGFyc2UobmV3IFRva2VuaXplcihhVGV4dCksIChhQ29uZmlnIHx8IHt9KSk7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IFBhcnNlcjsiLCJpbXBvcnQgRGVzZXJpYWxpemVyIGZyb20gXCIuL0Rlc2VyaWFsaXplclwiO1xyXG5cclxuY29uc3QgVG9rZW5pemVyID0gZnVuY3Rpb24odGhlTGluZXMsIGFJbmRleCl7XHJcblx0bGV0IGxpbmVzID0gdGhlTGluZXM7XHJcblx0bGV0IGluZGV4ID0gYUluZGV4IHx8IC0xO1xyXG5cdGxldCB0b2tlbiA9IG51bGw7XHJcblx0cmV0dXJuIHtcclxuXHRcdHJlc2V0IDogZnVuY3Rpb24oKXtcclxuXHRcdFx0aW5kZXggPSAtMTtcclxuXHRcdH0sXHJcblx0XHRza2lwIDogZnVuY3Rpb24obGVuZ3RoKXtcclxuXHRcdFx0aW5kZXggKz0gKGxlbmd0aCB8fCAxKTtcclxuXHRcdH0sXHJcblx0XHRpbmRleCA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBpbmRleDtcclxuXHRcdH0sXHJcblx0XHR0b2tlbiA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBtYXRjaDtcclxuXHRcdH0sXHJcblx0XHRsaW5lcyA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBsaW5lcztcclxuXHRcdH0sXHJcblx0XHRuZXh0IDogZnVuY3Rpb24oKXtcclxuXHRcdFx0aW5kZXgrKztcclxuXHRcdFx0aWYoaW5kZXggPCBsaW5lcy5sZW5ndGgpXHJcblx0XHRcdFx0dG9rZW4gPSBEZXNlcmlhbGl6ZXIobGluZXNbaW5kZXhdLCB0aGlzKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHRva2VuID0gbnVsbDtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodG9rZW4pO1xyXG5cdFx0fSxcclxuXHRcdGNsb25lIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIG5ldyBUb2tlbml6ZXIobGluZXMsIGluZGV4KTtcclxuXHRcdH1cclxuXHR9O1x0XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGFUZXh0KXtcclxuXHRyZXR1cm4gbmV3IFRva2VuaXplcihhVGV4dC5zcGxpdCgvXFxyP1xcbi9nKSlcclxufTsiLCJjb25zdCBhcHBlbmRUb09iamVjdCA9IGZ1bmN0aW9uKGFLZXksIGFEYXRhLCBhT2JqZWN0KXtcclxuXHRpZih0eXBlb2YgYURhdGEgIT09IFwidW5kZWZpbmVkXCIpe1x0XHRcclxuXHRcdGxldCBrZXkgPSBhS2V5LnRvTG93ZXJDYXNlKCkudHJpbSgpO1x0XHJcblx0XHRpZih0eXBlb2YgYU9iamVjdFtrZXldID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRhT2JqZWN0W2tleV0gPSBhRGF0YTtcclxuXHRcdGVsc2V7XHRcdFxyXG5cdFx0XHRsZXQgZGF0YSA9IGFPYmplY3Rba2V5XTtcclxuXHRcdFx0aWYoZGF0YSBpbnN0YW5jZW9mIEFycmF5KVxyXG5cdFx0XHRcdGRhdGEucHVzaChhRGF0YSk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRhT2JqZWN0W2tleV0gPSBbYU9iamVjdFtrZXldLCBhRGF0YV07XHJcblx0XHR9XHJcblx0fVx0XHJcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhT2JqZWN0KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRhcHBlbmRUb09iamVjdDogYXBwZW5kVG9PYmplY3RcclxufTsiXSwic291cmNlUm9vdCI6IiJ9