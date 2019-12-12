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
	Parser : _src__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].Parser
		
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
const REGEX_KEY = /^([^\s:;]+)(;([^:]+))?:(.+)$/;
const REGEX_VALUELINE = /^(\s+.+)$/;

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
	let match = REGEX_VALUELINE.exec(aTokenizer.lines()[aTokenizer.index()]);
	while(match != null && typeof match !== "undefined" && match.length > 0){		
		value += match[1];
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
//https://tools.ietf.org/html/rfc5545#section-3.1



const parseProperty = function(aToken, aTokenizer){
	if(typeof aToken.value === "string")
		return aToken.value.trim();
	
	return aToken.value;
};

const parse = function(aTokenizer, aContext){
	let data = aContext;
	let token = aTokenizer.next();
	while(token){
		if(token.key == "BEGIN"){
			if(typeof data === "undefined")
				data = {};
			else{
				let object = parse(aTokenizer, {});
				_Utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].appendToObject(token.value, object, data);
			}			
		} else if(token.key == "END")
			return data;
		else {
			let value = parseProperty(token, aTokenizer);
			_Utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].appendToObject(token.key, {value : token.value, parameter : token.parameter}, data);
		}
		token = aTokenizer.next();
	}
	return data;
};

const Parser = function(aText){
	return parse(new _Tokenizer__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](aText));
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

const Tokenizer = function(aText){	
	let text = aText;
	let lines = aText.split(/\r?\n/g)
	let index = 0;
	let token = null;
	return {		
		text : function(){
			return text;
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
			token  = Object(_Deserializer__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(lines[index++], this);			
			return token;
		},
		clone : function(){
			return new Tokenizer(text);
		}
	};	
};
/* harmony default export */ __webpack_exports__["a"] = (Tokenizer);

/***/ }),

/***/ "./src/Utils.js":
/*!**********************!*\
  !*** ./src/Utils.js ***!
  \**********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const appendToObject = function(aKey, aData, aContext){
	if(typeof aData === "undefined")
		return;
	
	let key = aKey.toLowerCase().trim();	
	if(typeof aContext[key] === "undefined")
		aContext[key] = aData;
	else{		
		let data = aContext[key];
		if(data instanceof Array)
			data.push(aData);
		else
			aContext[key] = [aContext[key], aData];
	}	
};

/* harmony default export */ __webpack_exports__["a"] = ({
	appendToObject: appendToObject
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


const pack = {
	Parser:_Parser__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]
};

/* harmony default export */ __webpack_exports__["a"] = (pack); 

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYnJvd3Nlci1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRGVzZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL3NyYy9QYXJzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBd0I7O0FBRXhCLDJDQUEyQyxTQUFJO0FBQy9DO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsVUFBVSxvREFBSTs7QUFFZCxFOzs7Ozs7Ozs7Ozs7O0FDUkEsMkJBQTJCLEtBQUs7QUFDaEM7O0FBRUE7QUFDQSxzQkFBc0I7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0M7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDO0FBQ0E7QUFDQSxFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQjtBQUNBO0FBQ0EsMEU7QUFDQTtBQUNBLG9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVlLHFFQUFZLEU7Ozs7Ozs7Ozs7Ozs7QUNyRDNCO0FBQUE7QUFBQTtBQUNvQztBQUNSOztBQUU1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDLElBQUksc0RBQUs7QUFDVCxJO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUcsc0RBQUssNEJBQTRCLGlEQUFpRDtBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLDBEQUFTO0FBQzNCO0FBQ2UsK0RBQU0sRTs7Ozs7Ozs7Ozs7OztBQ3BDckI7QUFBMEM7QUFDMUMsa0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsb0I7QUFDQSxZQUFZLHFFQUFZLHVCO0FBQ3hCO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEc7QUFDQTtBQUNlLGtFQUFTLEU7Ozs7Ozs7Ozs7Ozs7O0FDOUJ4QjtBQUNBO0FBQ0E7O0FBRUEscUM7QUFDQTtBQUNBO0FBQ0EsTTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFO0FBQ0E7O0FBRWU7QUFDZjtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7OztBQ25CRDtBQUE4Qjs7QUFFOUI7QUFDQSxRQUFRLHVEQUFNO0FBQ2Q7O0FBRWUsNkRBQUksRSIsImZpbGUiOiJkZWZhdWx0anMtaWNhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYnJvd3Nlci1pbmRleC5qc1wiKTtcbiIsImltcG9ydCBwYWNrIGZyb20gXCIuL3NyY1wiXHJcblxyXG5jb25zdCBnbG9iYWwgPSB3aW5kb3cgfHwgZ2xvYmFsIHx8IHNlbGYgfHwgdGhpcyB8fCB7fTtcclxuZ2xvYmFsLmRlZmF1bHRqcyA9IGdsb2JhbC5kZWZhdWx0anMgfHwge307XHJcbmdsb2JhbC5kZWZhdWx0anMuaWNhbCA9IGdsb2JhbC5kZWZhdWx0anMuaWNhbCB8fCB7XHJcblx0VkVSU0lPTiA6IFwiJHt2ZXJzaW9ufVwiLFxyXG5cdFBhcnNlciA6IHBhY2suUGFyc2VyXHJcblx0XHRcclxufTsiLCJjb25zdCBSRUdFWF9LRVkgPSAvXihbXlxcczo7XSspKDsoW146XSspKT86KC4rKSQvO1xyXG5jb25zdCBSRUdFWF9WQUxVRUxJTkUgPSAvXihcXHMrLispJC87XHJcblxyXG5jb25zdCBLRVlfVkFMVUVfU1BMSVQgPSAvOi87XHJcbmNvbnN0IFBBUkFNX1NQTElUID0gLzsvO1xyXG5jb25zdCBQQVJBTV9WQUxVRV9TUExJVCA9IC89LztcclxuXHJcbmNvbnN0IGdldFBhcmFtZXRlciA9IGZ1bmN0aW9uKGFUZXh0KXtcclxuXHRpZihhVGV4dCA9PSBudWxsIHx8IHR5cGVvZiBhVGV4dCA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdHJldHVybjtcclxuXHRsZXQgaXRlbXMgPSBhVGV4dC5zcGxpdChQQVJBTV9TUExJVCk7XHRcclxuXHRsZXQgcGFyYW1zID0ge307XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKXtcclxuXHRcdGxldCBwYXJ0cyA9IGl0ZW1zW2ldLnNwbGl0KFBBUkFNX1ZBTFVFX1NQTElUKTtcclxuXHRcdHBhcmFtc1twYXJ0c1swXV0gPSBwYXJ0c1sxXTtcclxuXHR9XHRcclxuXHRcclxuXHRyZXR1cm4gcGFyYW1zO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0VmFsdWUgPSBmdW5jdGlvbihhVmFsdWUsIGFUb2tlbml6ZXIpe1xyXG5cdGxldCB2YWx1ZSA9IGFWYWx1ZTtcdFxyXG5cdGxldCBtYXRjaCA9IFJFR0VYX1ZBTFVFTElORS5leGVjKGFUb2tlbml6ZXIubGluZXMoKVthVG9rZW5pemVyLmluZGV4KCldKTtcclxuXHR3aGlsZShtYXRjaCAhPSBudWxsICYmIHR5cGVvZiBtYXRjaCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtYXRjaC5sZW5ndGggPiAwKXtcdFx0XHJcblx0XHR2YWx1ZSArPSBtYXRjaFsxXTtcclxuXHRcdGFUb2tlbml6ZXIuc2tpcCgpO1x0XHRcclxuXHRcdG1hdGNoID0gUkVHRVhfVkFMVUVMSU5FLmV4ZWMoYVRva2VuaXplci5saW5lcygpW2FUb2tlbml6ZXIuaW5kZXgoKV0pO1xyXG5cdH1cclxuXHRcclxuXHRyZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5cclxuY29uc3QgRGVzZXJpYWxpemVyID0gZnVuY3Rpb24oYUxpbmUsIGFUb2tlbml6ZXIpe1xyXG5cdGxldCBpbmRleCA9IGFMaW5lLnNlYXJjaChLRVlfVkFMVUVfU1BMSVQpO1xyXG5cdGlmKGluZGV4ID09IC0xKVxyXG5cdFx0cmV0dXJuO1xyXG5cdFxyXG5cdGxldCByZXN1bHQgPSB7XHJcblx0XHRcdGtleSA6IGFMaW5lLnN1YnN0cmluZygwLCBpbmRleCksXHJcblx0XHRcdHZhbHVlIDogZ2V0VmFsdWUoYUxpbmUuc3Vic3RyaW5nKGluZGV4ICsgMSksIGFUb2tlbml6ZXIpXHJcblx0fTtcclxuXHRcclxuXHRpbmRleCA9IHJlc3VsdC5rZXkuc2VhcmNoKFBBUkFNX1NQTElUKTtcclxuXHRpZihpbmRleCAhPSAtMSl7XHJcblx0XHRyZXN1bHQucGFyYW1ldGVyID0gZ2V0UGFyYW1ldGVyKHJlc3VsdC5rZXkuc3Vic3RyaW5nKGluZGV4ICsgMSkpO1xyXG5cdFx0cmVzdWx0LmtleSA9IHJlc3VsdC5rZXkuc3Vic3RyaW5nKDAsIGluZGV4KTtcclxuXHR9XHJcblx0XHRcclxuXHRcclxuXHRyZXR1cm4gcmVzdWx0XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZXNlcmlhbGl6ZXI7IiwiLy9odHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTU0NSNzZWN0aW9uLTMuMVxyXG5pbXBvcnQgVG9rZW5pemVyIGZyb20gXCIuL1Rva2VuaXplclwiO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IHBhcnNlUHJvcGVydHkgPSBmdW5jdGlvbihhVG9rZW4sIGFUb2tlbml6ZXIpe1xyXG5cdGlmKHR5cGVvZiBhVG9rZW4udmFsdWUgPT09IFwic3RyaW5nXCIpXHJcblx0XHRyZXR1cm4gYVRva2VuLnZhbHVlLnRyaW0oKTtcclxuXHRcclxuXHRyZXR1cm4gYVRva2VuLnZhbHVlO1xyXG59O1xyXG5cclxuY29uc3QgcGFyc2UgPSBmdW5jdGlvbihhVG9rZW5pemVyLCBhQ29udGV4dCl7XHJcblx0bGV0IGRhdGEgPSBhQ29udGV4dDtcclxuXHRsZXQgdG9rZW4gPSBhVG9rZW5pemVyLm5leHQoKTtcclxuXHR3aGlsZSh0b2tlbil7XHJcblx0XHRpZih0b2tlbi5rZXkgPT0gXCJCRUdJTlwiKXtcclxuXHRcdFx0aWYodHlwZW9mIGRhdGEgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdFx0ZGF0YSA9IHt9O1xyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdGxldCBvYmplY3QgPSBwYXJzZShhVG9rZW5pemVyLCB7fSk7XHJcblx0XHRcdFx0VXRpbHMuYXBwZW5kVG9PYmplY3QodG9rZW4udmFsdWUsIG9iamVjdCwgZGF0YSk7XHJcblx0XHRcdH1cdFx0XHRcclxuXHRcdH0gZWxzZSBpZih0b2tlbi5rZXkgPT0gXCJFTkRcIilcclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0bGV0IHZhbHVlID0gcGFyc2VQcm9wZXJ0eSh0b2tlbiwgYVRva2VuaXplcik7XHJcblx0XHRcdFV0aWxzLmFwcGVuZFRvT2JqZWN0KHRva2VuLmtleSwge3ZhbHVlIDogdG9rZW4udmFsdWUsIHBhcmFtZXRlciA6IHRva2VuLnBhcmFtZXRlcn0sIGRhdGEpO1xyXG5cdFx0fVxyXG5cdFx0dG9rZW4gPSBhVG9rZW5pemVyLm5leHQoKTtcclxuXHR9XHJcblx0cmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5jb25zdCBQYXJzZXIgPSBmdW5jdGlvbihhVGV4dCl7XHJcblx0cmV0dXJuIHBhcnNlKG5ldyBUb2tlbml6ZXIoYVRleHQpKTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgUGFyc2VyOyIsImltcG9ydCBEZXNlcmlhbGl6ZXIgZnJvbSBcIi4vRGVzZXJpYWxpemVyXCI7XHJcbmNvbnN0IFRva2VuaXplciA9IGZ1bmN0aW9uKGFUZXh0KXtcdFxyXG5cdGxldCB0ZXh0ID0gYVRleHQ7XHJcblx0bGV0IGxpbmVzID0gYVRleHQuc3BsaXQoL1xccj9cXG4vZylcclxuXHRsZXQgaW5kZXggPSAwO1xyXG5cdGxldCB0b2tlbiA9IG51bGw7XHJcblx0cmV0dXJuIHtcdFx0XHJcblx0XHR0ZXh0IDogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIHRleHQ7XHJcblx0XHR9LFxyXG5cdFx0c2tpcCA6IGZ1bmN0aW9uKGxlbmd0aCl7XHJcblx0XHRcdGluZGV4ICs9IChsZW5ndGggfHwgMSk7XHJcblx0XHR9LFxyXG5cdFx0aW5kZXggOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gaW5kZXg7XHJcblx0XHR9LFxyXG5cdFx0dG9rZW4gOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gbWF0Y2g7XHJcblx0XHR9LFxyXG5cdFx0bGluZXMgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gbGluZXM7XHJcblx0XHR9LFxyXG5cdFx0bmV4dCA6IGZ1bmN0aW9uKCl7XHRcdFx0XHRcdFxyXG5cdFx0XHR0b2tlbiAgPSBEZXNlcmlhbGl6ZXIobGluZXNbaW5kZXgrK10sIHRoaXMpO1x0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdG9rZW47XHJcblx0XHR9LFxyXG5cdFx0Y2xvbmUgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gbmV3IFRva2VuaXplcih0ZXh0KTtcclxuXHRcdH1cclxuXHR9O1x0XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IFRva2VuaXplcjsiLCJcclxuY29uc3QgYXBwZW5kVG9PYmplY3QgPSBmdW5jdGlvbihhS2V5LCBhRGF0YSwgYUNvbnRleHQpe1xyXG5cdGlmKHR5cGVvZiBhRGF0YSA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdHJldHVybjtcclxuXHRcclxuXHRsZXQga2V5ID0gYUtleS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcdFxyXG5cdGlmKHR5cGVvZiBhQ29udGV4dFtrZXldID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0YUNvbnRleHRba2V5XSA9IGFEYXRhO1xyXG5cdGVsc2V7XHRcdFxyXG5cdFx0bGV0IGRhdGEgPSBhQ29udGV4dFtrZXldO1xyXG5cdFx0aWYoZGF0YSBpbnN0YW5jZW9mIEFycmF5KVxyXG5cdFx0XHRkYXRhLnB1c2goYURhdGEpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRhQ29udGV4dFtrZXldID0gW2FDb250ZXh0W2tleV0sIGFEYXRhXTtcclxuXHR9XHRcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRhcHBlbmRUb09iamVjdDogYXBwZW5kVG9PYmplY3RcclxufTsiLCJpbXBvcnQgUGFyc2VyIGZyb20gXCIuL1BhcnNlclwiO1xyXG5cclxuY29uc3QgcGFjayA9IHtcclxuXHRQYXJzZXI6UGFyc2VyXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwYWNrOyAiXSwic291cmNlUm9vdCI6IiJ9