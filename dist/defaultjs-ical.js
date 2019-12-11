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

const getParams = function(text){
	if(text == null || typeof text === "undefined")
		return;
	
	let params = {};
	text.split(/;/g).forEach(function(item){
		let param = item.split(/=/g);
		params[param[0]] = typeof param[1] !== "undefined" ? param[1] : ""; 
	});
	
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
	const match = REGEX_KEY.exec(aLine);
	if(typeof match === "undefined" || match == null )
		return null;
	
	return {
		key: match[1],
		value: getValue(match[4], aTokenizer),
		parameter : getParams(match[3])
	};	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYnJvd3Nlci1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRGVzZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL3NyYy9QYXJzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBd0I7O0FBRXhCLDJDQUEyQyxTQUFJO0FBQy9DO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsVUFBVSxvREFBSTs7QUFFZCxFOzs7Ozs7Ozs7Ozs7O0FDUkEsMkJBQTJCLEtBQUs7QUFDaEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYztBQUNkO0FBQ0EscUU7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEU7QUFDQTtBQUNBLG9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7QUFDQTs7QUFFZSxxRUFBWSxFOzs7Ozs7Ozs7Ozs7O0FDekMzQjtBQUFBO0FBQUE7QUFDb0M7QUFDUjs7QUFFNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQyxJQUFJLHNEQUFLO0FBQ1QsSTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHLHNEQUFLLDRCQUE0QixpREFBaUQ7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQiwwREFBUztBQUMzQjtBQUNlLCtEQUFNLEU7Ozs7Ozs7Ozs7Ozs7QUNwQ3JCO0FBQTBDO0FBQzFDLGtDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNILG9CO0FBQ0EsWUFBWSxxRUFBWSx1QjtBQUN4QjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHO0FBQ0E7QUFDZSxrRUFBUyxFOzs7Ozs7Ozs7Ozs7OztBQzlCeEI7QUFDQTtBQUNBOztBQUVBLHFDO0FBQ0E7QUFDQTtBQUNBLE07QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTtBQUNBOztBQUVlO0FBQ2Y7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7Ozs7QUNuQkQ7QUFBOEI7O0FBRTlCO0FBQ0EsUUFBUSx1REFBTTtBQUNkOztBQUVlLDZEQUFJLEUiLCJmaWxlIjoiZGVmYXVsdGpzLWljYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Jyb3dzZXItaW5kZXguanNcIik7XG4iLCJpbXBvcnQgcGFjayBmcm9tIFwiLi9zcmNcIlxyXG5cclxuY29uc3QgZ2xvYmFsID0gd2luZG93IHx8IGdsb2JhbCB8fCBzZWxmIHx8IHRoaXMgfHwge307XHJcbmdsb2JhbC5kZWZhdWx0anMgPSBnbG9iYWwuZGVmYXVsdGpzIHx8IHt9O1xyXG5nbG9iYWwuZGVmYXVsdGpzLmljYWwgPSBnbG9iYWwuZGVmYXVsdGpzLmljYWwgfHwge1xyXG5cdFZFUlNJT04gOiBcIiR7dmVyc2lvbn1cIixcclxuXHRQYXJzZXIgOiBwYWNrLlBhcnNlclxyXG5cdFx0XHJcbn07IiwiY29uc3QgUkVHRVhfS0VZID0gL14oW15cXHM6O10rKSg7KFteOl0rKSk/OiguKykkLztcclxuY29uc3QgUkVHRVhfVkFMVUVMSU5FID0gL14oXFxzKy4rKSQvO1xyXG5cclxuY29uc3QgZ2V0UGFyYW1zID0gZnVuY3Rpb24odGV4dCl7XHJcblx0aWYodGV4dCA9PSBudWxsIHx8IHR5cGVvZiB0ZXh0ID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0cmV0dXJuO1xyXG5cdFxyXG5cdGxldCBwYXJhbXMgPSB7fTtcclxuXHR0ZXh0LnNwbGl0KC87L2cpLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcblx0XHRsZXQgcGFyYW0gPSBpdGVtLnNwbGl0KC89L2cpO1xyXG5cdFx0cGFyYW1zW3BhcmFtWzBdXSA9IHR5cGVvZiBwYXJhbVsxXSAhPT0gXCJ1bmRlZmluZWRcIiA/IHBhcmFtWzFdIDogXCJcIjsgXHJcblx0fSk7XHJcblx0XHJcblx0cmV0dXJuIHBhcmFtcztcclxufTtcclxuXHJcbmNvbnN0IGdldFZhbHVlID0gZnVuY3Rpb24oYVZhbHVlLCBhVG9rZW5pemVyKXtcclxuXHRsZXQgdmFsdWUgPSBhVmFsdWU7XHJcblx0bGV0IG1hdGNoID0gUkVHRVhfVkFMVUVMSU5FLmV4ZWMoYVRva2VuaXplci5saW5lcygpW2FUb2tlbml6ZXIuaW5kZXgoKV0pO1xyXG5cdHdoaWxlKG1hdGNoICE9IG51bGwgJiYgdHlwZW9mIG1hdGNoICE9PSBcInVuZGVmaW5lZFwiICYmIG1hdGNoLmxlbmd0aCA+IDApe1x0XHRcclxuXHRcdHZhbHVlICs9IG1hdGNoWzFdO1xyXG5cdFx0YVRva2VuaXplci5za2lwKCk7XHRcdFxyXG5cdFx0bWF0Y2ggPSBSRUdFWF9WQUxVRUxJTkUuZXhlYyhhVG9rZW5pemVyLmxpbmVzKClbYVRva2VuaXplci5pbmRleCgpXSk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcblxyXG5jb25zdCBEZXNlcmlhbGl6ZXIgPSBmdW5jdGlvbihhTGluZSwgYVRva2VuaXplcil7XHJcblx0Y29uc3QgbWF0Y2ggPSBSRUdFWF9LRVkuZXhlYyhhTGluZSk7XHJcblx0aWYodHlwZW9mIG1hdGNoID09PSBcInVuZGVmaW5lZFwiIHx8IG1hdGNoID09IG51bGwgKVxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0XHJcblx0cmV0dXJuIHtcclxuXHRcdGtleTogbWF0Y2hbMV0sXHJcblx0XHR2YWx1ZTogZ2V0VmFsdWUobWF0Y2hbNF0sIGFUb2tlbml6ZXIpLFxyXG5cdFx0cGFyYW1ldGVyIDogZ2V0UGFyYW1zKG1hdGNoWzNdKVxyXG5cdH07XHRcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERlc2VyaWFsaXplcjsiLCIvL2h0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM1NTQ1I3NlY3Rpb24tMy4xXHJcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSBcIi4vVG9rZW5pemVyXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi9VdGlsc1wiO1xyXG5cclxuY29uc3QgcGFyc2VQcm9wZXJ0eSA9IGZ1bmN0aW9uKGFUb2tlbiwgYVRva2VuaXplcil7XHJcblx0aWYodHlwZW9mIGFUb2tlbi52YWx1ZSA9PT0gXCJzdHJpbmdcIilcclxuXHRcdHJldHVybiBhVG9rZW4udmFsdWUudHJpbSgpO1xyXG5cdFxyXG5cdHJldHVybiBhVG9rZW4udmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZSA9IGZ1bmN0aW9uKGFUb2tlbml6ZXIsIGFDb250ZXh0KXtcclxuXHRsZXQgZGF0YSA9IGFDb250ZXh0O1xyXG5cdGxldCB0b2tlbiA9IGFUb2tlbml6ZXIubmV4dCgpO1xyXG5cdHdoaWxlKHRva2VuKXtcclxuXHRcdGlmKHRva2VuLmtleSA9PSBcIkJFR0lOXCIpe1xyXG5cdFx0XHRpZih0eXBlb2YgZGF0YSA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0XHRkYXRhID0ge307XHJcblx0XHRcdGVsc2V7XHJcblx0XHRcdFx0bGV0IG9iamVjdCA9IHBhcnNlKGFUb2tlbml6ZXIsIHt9KTtcclxuXHRcdFx0XHRVdGlscy5hcHBlbmRUb09iamVjdCh0b2tlbi52YWx1ZSwgb2JqZWN0LCBkYXRhKTtcclxuXHRcdFx0fVx0XHRcdFxyXG5cdFx0fSBlbHNlIGlmKHRva2VuLmtleSA9PSBcIkVORFwiKVxyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRsZXQgdmFsdWUgPSBwYXJzZVByb3BlcnR5KHRva2VuLCBhVG9rZW5pemVyKTtcclxuXHRcdFx0VXRpbHMuYXBwZW5kVG9PYmplY3QodG9rZW4ua2V5LCB7dmFsdWUgOiB0b2tlbi52YWx1ZSwgcGFyYW1ldGVyIDogdG9rZW4ucGFyYW1ldGVyfSwgZGF0YSk7XHJcblx0XHR9XHJcblx0XHR0b2tlbiA9IGFUb2tlbml6ZXIubmV4dCgpO1xyXG5cdH1cclxuXHRyZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbmNvbnN0IFBhcnNlciA9IGZ1bmN0aW9uKGFUZXh0KXtcclxuXHRyZXR1cm4gcGFyc2UobmV3IFRva2VuaXplcihhVGV4dCkpO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBQYXJzZXI7IiwiaW1wb3J0IERlc2VyaWFsaXplciBmcm9tIFwiLi9EZXNlcmlhbGl6ZXJcIjtcclxuY29uc3QgVG9rZW5pemVyID0gZnVuY3Rpb24oYVRleHQpe1x0XHJcblx0bGV0IHRleHQgPSBhVGV4dDtcclxuXHRsZXQgbGluZXMgPSBhVGV4dC5zcGxpdCgvXFxyP1xcbi9nKVxyXG5cdGxldCBpbmRleCA9IDA7XHJcblx0bGV0IHRva2VuID0gbnVsbDtcclxuXHRyZXR1cm4ge1x0XHRcclxuXHRcdHRleHQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gdGV4dDtcclxuXHRcdH0sXHJcblx0XHRza2lwIDogZnVuY3Rpb24obGVuZ3RoKXtcclxuXHRcdFx0aW5kZXggKz0gKGxlbmd0aCB8fCAxKTtcclxuXHRcdH0sXHJcblx0XHRpbmRleCA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBpbmRleDtcclxuXHRcdH0sXHJcblx0XHR0b2tlbiA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBtYXRjaDtcclxuXHRcdH0sXHJcblx0XHRsaW5lcyA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBsaW5lcztcclxuXHRcdH0sXHJcblx0XHRuZXh0IDogZnVuY3Rpb24oKXtcdFx0XHRcdFx0XHJcblx0XHRcdHRva2VuICA9IERlc2VyaWFsaXplcihsaW5lc1tpbmRleCsrXSwgdGhpcyk7XHRcdFx0XHJcblx0XHRcdHJldHVybiB0b2tlbjtcclxuXHRcdH0sXHJcblx0XHRjbG9uZSA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBuZXcgVG9rZW5pemVyKHRleHQpO1xyXG5cdFx0fVxyXG5cdH07XHRcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgVG9rZW5pemVyOyIsIlxyXG5jb25zdCBhcHBlbmRUb09iamVjdCA9IGZ1bmN0aW9uKGFLZXksIGFEYXRhLCBhQ29udGV4dCl7XHJcblx0aWYodHlwZW9mIGFEYXRhID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0cmV0dXJuO1xyXG5cdFxyXG5cdGxldCBrZXkgPSBhS2V5LnRvTG93ZXJDYXNlKCkudHJpbSgpO1x0XHJcblx0aWYodHlwZW9mIGFDb250ZXh0W2tleV0gPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRhQ29udGV4dFtrZXldID0gYURhdGE7XHJcblx0ZWxzZXtcdFx0XHJcblx0XHRsZXQgZGF0YSA9IGFDb250ZXh0W2tleV07XHJcblx0XHRpZihkYXRhIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdGRhdGEucHVzaChhRGF0YSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdGFDb250ZXh0W2tleV0gPSBbYUNvbnRleHRba2V5XSwgYURhdGFdO1xyXG5cdH1cdFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGFwcGVuZFRvT2JqZWN0OiBhcHBlbmRUb09iamVjdFxyXG59OyIsImltcG9ydCBQYXJzZXIgZnJvbSBcIi4vUGFyc2VyXCI7XHJcblxyXG5jb25zdCBwYWNrID0ge1xyXG5cdFBhcnNlcjpQYXJzZXJcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBhY2s7ICJdLCJzb3VyY2VSb290IjoiIn0=