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

/***/ "./src/Parser.js":
/*!***********************!*\
  !*** ./src/Parser.js ***!
  \***********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Tokenizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tokenizer */ "./src/Tokenizer.js");
//https://tools.ietf.org/html/rfc5545#section-3.1


const parseProperty = function(aToken, aTokenizer){
	if(typeof aToken.value === "string")
		return aToken.value.trim();
	
	return aToken.value;
};

const append = function(aKey, aData, aContext){
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

const parse = function(aTokenizer, aContext){
	let data = aContext;
	let token = aTokenizer.next();
	while(token){
		console.log(token);
		if(token.key == "BEGIN"){
			console.log("BEGIN of", token.value);
			if(typeof data === "undefined")
				data = {};
			else{
				let object = parse(aTokenizer, {});
				append(token.value, object, data);
			}			
		} else if(token.key == "END"){
			console.log("END of", token.value);
			return data;
		} else {
			let value = parseProperty(token, aTokenizer);
			append(token.key, value, data);
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
			const match = REGEX_KEY.exec(lines[index++]);
			if(typeof match === "undefined" || match == null )
				return null;
			
			token = {
				key: match[1],
				value: getValue(match[4], this),
				parameter : getParams(match[3]),
				line: match[0]
			};			
			
			
			return token;
		},
		clone : function(){
			return new Tokenizer(text);
		}
	};	
};
/* harmony default export */ __webpack_exports__["a"] = (Tokenizer);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYnJvd3Nlci1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGFyc2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9Ub2tlbml6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBd0I7O0FBRXhCLDJDQUEyQyxTQUFJO0FBQy9DO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsVUFBVSxvREFBSTs7QUFFZCxFOzs7Ozs7Ozs7Ozs7O0FDUkE7QUFBQTtBQUNvQzs7QUFFcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFDO0FBQ0E7QUFDQTtBQUNBLE07QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0EsSTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLDBEQUFTO0FBQzNCOzs7QUFHZSwrREFBTSxFOzs7Ozs7Ozs7Ozs7O0FDeERyQiwyQkFBMkIsS0FBSztBQUNoQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxxRTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBLG9CO0FBQ0E7QUFDQSwwRTtBQUNBO0FBQ0Esb0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsb0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEs7OztBQUdBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEc7QUFDQTtBQUNlLGtFQUFTLEU7Ozs7Ozs7Ozs7Ozs7QUNyRXhCO0FBQThCOztBQUU5QjtBQUNBLFFBQVEsdURBQU07QUFDZDs7QUFFZSw2REFBSSxFIiwiZmlsZSI6ImRlZmF1bHRqcy1pY2FsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9icm93c2VyLWluZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHBhY2sgZnJvbSBcIi4vc3JjXCJcclxuXHJcbmNvbnN0IGdsb2JhbCA9IHdpbmRvdyB8fCBnbG9iYWwgfHwgc2VsZiB8fCB0aGlzIHx8IHt9O1xyXG5nbG9iYWwuZGVmYXVsdGpzID0gZ2xvYmFsLmRlZmF1bHRqcyB8fCB7fTtcclxuZ2xvYmFsLmRlZmF1bHRqcy5pY2FsID0gZ2xvYmFsLmRlZmF1bHRqcy5pY2FsIHx8IHtcclxuXHRWRVJTSU9OIDogXCIke3ZlcnNpb259XCIsXHJcblx0UGFyc2VyIDogcGFjay5QYXJzZXJcclxuXHRcdFxyXG59OyIsIi8vaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzU1NDUjc2VjdGlvbi0zLjFcclxuaW1wb3J0IFRva2VuaXplciBmcm9tIFwiLi9Ub2tlbml6ZXJcIjtcclxuXHJcbmNvbnN0IHBhcnNlUHJvcGVydHkgPSBmdW5jdGlvbihhVG9rZW4sIGFUb2tlbml6ZXIpe1xyXG5cdGlmKHR5cGVvZiBhVG9rZW4udmFsdWUgPT09IFwic3RyaW5nXCIpXHJcblx0XHRyZXR1cm4gYVRva2VuLnZhbHVlLnRyaW0oKTtcclxuXHRcclxuXHRyZXR1cm4gYVRva2VuLnZhbHVlO1xyXG59O1xyXG5cclxuY29uc3QgYXBwZW5kID0gZnVuY3Rpb24oYUtleSwgYURhdGEsIGFDb250ZXh0KXtcclxuXHRpZih0eXBlb2YgYURhdGEgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRyZXR1cm47XHJcblx0XHJcblx0bGV0IGtleSA9IGFLZXkudG9Mb3dlckNhc2UoKS50cmltKCk7XHRcclxuXHRpZih0eXBlb2YgYUNvbnRleHRba2V5XSA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdGFDb250ZXh0W2tleV0gPSBhRGF0YTtcclxuXHRlbHNle1x0XHRcclxuXHRcdGxldCBkYXRhID0gYUNvbnRleHRba2V5XTtcclxuXHRcdGlmKGRhdGEgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0ZGF0YS5wdXNoKGFEYXRhKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0YUNvbnRleHRba2V5XSA9IFthQ29udGV4dFtrZXldLCBhRGF0YV07XHJcblx0fVx0XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZSA9IGZ1bmN0aW9uKGFUb2tlbml6ZXIsIGFDb250ZXh0KXtcclxuXHRsZXQgZGF0YSA9IGFDb250ZXh0O1xyXG5cdGxldCB0b2tlbiA9IGFUb2tlbml6ZXIubmV4dCgpO1xyXG5cdHdoaWxlKHRva2VuKXtcclxuXHRcdGNvbnNvbGUubG9nKHRva2VuKTtcclxuXHRcdGlmKHRva2VuLmtleSA9PSBcIkJFR0lOXCIpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkJFR0lOIG9mXCIsIHRva2VuLnZhbHVlKTtcclxuXHRcdFx0aWYodHlwZW9mIGRhdGEgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdFx0ZGF0YSA9IHt9O1xyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdGxldCBvYmplY3QgPSBwYXJzZShhVG9rZW5pemVyLCB7fSk7XHJcblx0XHRcdFx0YXBwZW5kKHRva2VuLnZhbHVlLCBvYmplY3QsIGRhdGEpO1xyXG5cdFx0XHR9XHRcdFx0XHJcblx0XHR9IGVsc2UgaWYodG9rZW4ua2V5ID09IFwiRU5EXCIpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkVORCBvZlwiLCB0b2tlbi52YWx1ZSk7XHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IHZhbHVlID0gcGFyc2VQcm9wZXJ0eSh0b2tlbiwgYVRva2VuaXplcik7XHJcblx0XHRcdGFwcGVuZCh0b2tlbi5rZXksIHZhbHVlLCBkYXRhKTtcclxuXHRcdH1cclxuXHRcdHRva2VuID0gYVRva2VuaXplci5uZXh0KCk7XHJcblx0fVxyXG5cdHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuY29uc3QgUGFyc2VyID0gZnVuY3Rpb24oYVRleHQpe1xyXG5cdHJldHVybiBwYXJzZShuZXcgVG9rZW5pemVyKGFUZXh0KSk7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFyc2VyOyIsImNvbnN0IFJFR0VYX0tFWSA9IC9eKFteXFxzOjtdKykoOyhbXjpdKykpPzooLispJC87XHJcbmNvbnN0IFJFR0VYX1ZBTFVFTElORSA9IC9eKFxccysuKykkLztcclxuXHJcbmNvbnN0IGdldFBhcmFtcyA9IGZ1bmN0aW9uKHRleHQpe1xyXG5cdGlmKHRleHQgPT0gbnVsbCB8fCB0eXBlb2YgdGV4dCA9PT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdHJldHVybjtcclxuXHRcclxuXHRsZXQgcGFyYW1zID0ge307XHJcblx0dGV4dC5zcGxpdCgvOy9nKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG5cdFx0bGV0IHBhcmFtID0gaXRlbS5zcGxpdCgvPS9nKTtcclxuXHRcdHBhcmFtc1twYXJhbVswXV0gPSB0eXBlb2YgcGFyYW1bMV0gIT09IFwidW5kZWZpbmVkXCIgPyBwYXJhbVsxXSA6IFwiXCI7IFxyXG5cdH0pO1xyXG5cdFxyXG5cdHJldHVybiBwYXJhbXM7XHJcbn07XHJcblxyXG5jb25zdCBnZXRWYWx1ZSA9IGZ1bmN0aW9uKGFWYWx1ZSwgYVRva2VuaXplcil7XHJcblx0bGV0IHZhbHVlID0gYVZhbHVlO1x0XHJcblx0bGV0IG1hdGNoID0gUkVHRVhfVkFMVUVMSU5FLmV4ZWMoYVRva2VuaXplci5saW5lcygpW2FUb2tlbml6ZXIuaW5kZXgoKV0pO1xyXG5cdHdoaWxlKG1hdGNoICE9IG51bGwgJiYgdHlwZW9mIG1hdGNoICE9PSBcInVuZGVmaW5lZFwiICYmIG1hdGNoLmxlbmd0aCA+IDApe1x0XHRcclxuXHRcdHZhbHVlICs9IG1hdGNoWzFdO1xyXG5cdFx0YVRva2VuaXplci5za2lwKCk7XHRcdFxyXG5cdFx0bWF0Y2ggPSBSRUdFWF9WQUxVRUxJTkUuZXhlYyhhVG9rZW5pemVyLmxpbmVzKClbYVRva2VuaXplci5pbmRleCgpXSk7XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcbmNvbnN0IFRva2VuaXplciA9IGZ1bmN0aW9uKGFUZXh0KXtcdFxyXG5cdGxldCB0ZXh0ID0gYVRleHQ7XHJcblx0bGV0IGxpbmVzID0gYVRleHQuc3BsaXQoL1xccj9cXG4vZylcclxuXHRsZXQgaW5kZXggPSAwO1xyXG5cdGxldCB0b2tlbiA9IG51bGw7XHJcblx0cmV0dXJuIHtcdFx0XHJcblx0XHR0ZXh0IDogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIHRleHQ7XHJcblx0XHR9LFxyXG5cdFx0c2tpcCA6IGZ1bmN0aW9uKGxlbmd0aCl7XHJcblx0XHRcdGluZGV4ICs9IChsZW5ndGggfHwgMSk7XHJcblx0XHR9LFxyXG5cdFx0aW5kZXggOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gaW5kZXg7XHJcblx0XHR9LFxyXG5cdFx0dG9rZW4gOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gbWF0Y2g7XHJcblx0XHR9LFxyXG5cdFx0bGluZXMgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gbGluZXM7XHJcblx0XHR9LFxyXG5cdFx0bmV4dCA6IGZ1bmN0aW9uKCl7XHRcdFx0XHJcblx0XHRcdGNvbnN0IG1hdGNoID0gUkVHRVhfS0VZLmV4ZWMobGluZXNbaW5kZXgrK10pO1xyXG5cdFx0XHRpZih0eXBlb2YgbWF0Y2ggPT09IFwidW5kZWZpbmVkXCIgfHwgbWF0Y2ggPT0gbnVsbCApXHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFxyXG5cdFx0XHR0b2tlbiA9IHtcclxuXHRcdFx0XHRrZXk6IG1hdGNoWzFdLFxyXG5cdFx0XHRcdHZhbHVlOiBnZXRWYWx1ZShtYXRjaFs0XSwgdGhpcyksXHJcblx0XHRcdFx0cGFyYW1ldGVyIDogZ2V0UGFyYW1zKG1hdGNoWzNdKSxcclxuXHRcdFx0XHRsaW5lOiBtYXRjaFswXVxyXG5cdFx0XHR9O1x0XHRcdFxyXG5cdFx0XHRcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiB0b2tlbjtcclxuXHRcdH0sXHJcblx0XHRjbG9uZSA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBuZXcgVG9rZW5pemVyKHRleHQpO1xyXG5cdFx0fVxyXG5cdH07XHRcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgVG9rZW5pemVyOyIsImltcG9ydCBQYXJzZXIgZnJvbSBcIi4vUGFyc2VyXCI7XHJcblxyXG5jb25zdCBwYWNrID0ge1xyXG5cdFBhcnNlcjpQYXJzZXJcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBhY2s7ICJdLCJzb3VyY2VSb290IjoiIn0=