define("axios", ["undefined"], function(__WEBPACK_EXTERNAL_MODULE_3__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1)

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var Promise = __webpack_require__(3).Promise
	var defaults = __webpack_require__(4)
	var utils = __webpack_require__(5)
	
	var axios = module.exports = function axios(config) {
	  config = utils.merge({
	    method: 'get',
	    headers: {},
	    transformRequest: defaults.transformRequest,
	    transformResponse: defaults.transformResponse,
	  }, config)
	
	  // Don't allow overriding defaults.withCredentials
	  config.withCredentials = config.withCredentials || defaults.withCredentials
	
	  var promise = new Promise(function (resolve, reject) {
	    try {
	      // For browsers use XHR adapter
	      if (typeof window !== 'undefined') {
	        __webpack_require__(6)(resolve, reject, config)
	      }
	      // For node use HTTP adapter
	      else if (typeof process !== 'undefined') {
	        __webpack_require__(3)(resolve, reject, config)
	      }
	    } catch (e) {
	      reject(e)
	    }
	  })
	
	  function deprecatedMethod(method, instead, docs) {
	    try {
	      console.warn(
	        'DEPRECATED method `' + method + '`.' +
	        (instead ? ' Use `' + instead + '` instead.' : '') +
	        ' This method will be removed in a future release.');
	
	      if (docs) {
	        console.warn('For more information about usage see ' + docs);
	      }
	    } catch (e) {}
	  }
	
	  // Provide alias for success
	  promise.success = function success(fn) {
	    deprecatedMethod('success', 'then', 'https://github.com/mzabriskie/axios/blob/master/README.md#response-api');
	
	    promise.then(function(response) {
	      fn(response.data, response.status, response.headers, response.config)
	    })
	    return promise
	  }
	
	  // Provide alias for error
	  promise.error = function error(fn) {
	    deprecatedMethod('error', 'catch', 'https://github.com/mzabriskie/axios/blob/master/README.md#response-api');
	
	    promise.then(null, function(response) {
	      fn(response.data, response.status, response.headers, response.config)
	    })
	    return promise
	  }
	
	  return promise
	}
	
	// Expose defaults
	axios.defaults = defaults
	
	// Expose all/spread
	axios.all = function (promises) {
	  return Promise.all(promises)
	}
	axios.spread = __webpack_require__(12);
	
	// Provide aliases for supported request methods
	createShortMethods('delete', 'get', 'head');
	createShortMethodsWithData('post', 'put', 'patch');
	
	function createShortMethods() {
	  utils.forEach(arguments, function (method) {
	    axios[method] = function (url, config) {
	      return axios(utils.merge(config || {}, {
	        method: method,
	        url: url,
	      }))
	    }
	  })
	}
	
	function createShortMethodsWithData() {
	  utils.forEach(arguments, function (method) {
	    axios[method] = function (url, data, config) {
	      return axios(utils.merge(config || {}, {
	        method: method,
	        url: url,
	        data: data,
	      }))
	    }
	  })
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = undefined;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict'
	
	var utils = __webpack_require__(5)
	
	var JSON_START = /^\s*(\[|\{[^\{])/;
	var JSON_END = /[\}\]]\s*$/;
	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	module.exports = {
	  transformRequest: [function (data, headers) {
	    if (utils.isArrayBuffer(data)) {
	      return data
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer
	    }
	    if (utils.isObject(data) &&
	    !utils.isFile(data) &&
	    !utils.isBlob(data)) {
	      // Set application/json if no Content-Type has been specified
	      if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	        headers['Content-Type'] = 'application/json;charset=utf-8'
	      }
	      return JSON.stringify(data)
	    }
	    return data
	  }],
	
	  transformResponse: [function (data) {
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '')
	    }
	    if (JSON_START.test(data) && JSON_END.test(data)) {
	      data = JSON.parse(data)
	    }
	    return data
	  }],
	
	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE),
	  },
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN'
	}
	  

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]'
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]'
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    return ArrayBuffer.isView(val)
	  } else {
	    return (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer)
	  }
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string'
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number'
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined'
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object'
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]'
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]'
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]'
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '')
	}
	
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array or arguments callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return
	  }
	  
	  // Check if obj is array-like
	  var isArray = obj.constructor === Array || typeof obj.callee === 'function';
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray) {
	    obj = [obj]
	  }
	
	  // Iterate over array values
	  if (isArray) {
	    for (var i = 0; i < obj.length; i++) {
	      fn.call(null, obj[i], i, obj)
	    }
	  }
	  // Iterate over object keys
	  else {
	    for (var key in obj) {
	      if (Object.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj)
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(obj1/*, obj2, obj3, ...*/) {
	  var result = {}
	
	  forEach(arguments, function(obj) {
	    forEach(obj, function (val, key) {
	      result[key] = val[key]
	    })
	  })
	
	  return result
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  forEach: forEach,
	  merge: merge,
	  trim: trim
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var defaults = __webpack_require__(4);
	var utils = __webpack_require__(5);
	var buildUrl = __webpack_require__(7);
	var cookies = __webpack_require__(8);
	var parseHeaders = __webpack_require__(9);
	var transformData = __webpack_require__(10);
	var urlIsSameOrigin = __webpack_require__(11);
	
	module.exports = function xhrAdapter(resolve, reject, config) {
	  // Transform request data
	  var data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  )
	
	  // Merge headers
	  var headers = utils.merge(
	    defaults.headers.common,
	    defaults.headers[config.method] || {},
	    config.headers || {}
	  )
	
	  // Create the request
	  var request = new(XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP')
	  request.open(config.method, buildUrl(config.url, config.params), true)
	
	  // Listen for ready state
	  request.onreadystatechange = function() {
	    if (request && request.readyState === 4) {
	      // Prepare the response
	      var headers = parseHeaders(request.getAllResponseHeaders())
	      var response = {
	        data: transformData(
	          request.responseText,
	          headers,
	          config.transformResponse
	        ),
	        status: request.status,
	        headers: headers,
	        config: config
	      }
	
	      // Resolve or reject the Promise based on the status
	      (request.status >= 200 && request.status < 300
	        ? resolve
	        : reject)(
	          response
	        )
	
	      // Clean up request
	      request = null
	    }
	  }
	
	  // Add xsrf header
	  var xsrfValue = urlIsSameOrigin(config.url)
	    ? cookies.read(config.xsrfCookieName || defaults.xsrfCookieName)
	    : undefined
	
	  if (xsrfValue) {
	    headers[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue
	  }
	
	  // Add headers to the request
	  utils.forEach(headers, function(val, key) {
	    // Remove Content-Type if data is undefined
	    if (!data && key.toLowerCase() === 'content-type') {
	      delete headers[key]
	    }
	    // Otherwise add header to the request
	    else {
	      request.setRequestHeader(key, val)
	    }
	  })
	
	  // Add withCredentials to request if needed
	  if (config.withCredentials) {
	    request.withCredentials = true
	  }
	
	  // Add responseType to request if needed
	  if (config.responseType) {
	    try {
	      request.responseType = config.responseType
	    } catch (e) {
	      if (request.responseType !== 'json') {
	        throw e
	      }
	    }
	  }
	
	  if (utils.isArrayBuffer(data)) {
	    data = new DataView(data)
	  }
	
	  // Send the request
	  request.send(data)
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict'
	
	var utils = __webpack_require__(5)
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/gi, '+')
	}
	
	module.exports = function buildUrl(url, params) {
	  if (!params) {
	    return url
	  }
	
	  var parts = []
	
	  utils.forEach(params, function (val, key) {
	    if (val === null || typeof val === 'undefined') {
	      return
	    }
	
	    if (!utils.isArray(val)) {
	      val = [val]
	    }
	
	    utils.forEach(val, function (v) {
	      if (utils.isDate(val)) {
	        v = v.toISOString()
	      } else if (utils.isObject(val)) {
	        v = JSON.stringify(v)
	      }
	      parts.push(encode(key) + '=' + encode(v))
	    })
	  })
	
	  if (parts.length > 0) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&')
	  }
	
	  return url
	}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict'
	
	var utils = __webpack_require__(5)
	
	module.exports = {
	  write: function write(name, value, expires, path, domain, secure) {
	    var cookie = []
	    cookie.push(name + '=' + encodeURIComponent(value))
	
	    if (utils.isNumber(expires)) {
	      cookie.push('expires=' + new Date(expires).toGMTString())
	    }
	
	    if (utils.isString(path)) {
	      cookie.push('path=' + path)
	    }
	
	    if (utils.isString(domain)) {
	      cookie.push('domain=' + domain)
	    }
	
	    if (secure === true) {
	      cookie.push('secure')
	    }
	
	    document.cookie = cookie.join('; ')
	  },
	
	  read: function read(name) {
	    var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
	    return (match ? decodeURIComponent(match[3]) : null)
	  },
	
	  remove: function remove(name) {
	    this.write(name, '', Date.now() - 86400000)
	  }
	}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict'
	
	var utils = __webpack_require__(5)
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {}, key, val, i
	
	  if (!headers) {
	    return parsed
	  }
	
	  utils.forEach(headers.split('\n'), function(line) {
	    i = line.indexOf(':')
	    key = utils.trim(line.substr(0, i).toLowerCase())
	    val = utils.trim(line.substr(i + 1))
	
	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val
	    }
	  })
	
	  return parsed
	}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict'
	
	var utils = __webpack_require__(5)
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  utils.forEach(fns, function(fn) {
	    data = fn(data, headers)
	  })
	
	  return data
	}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict'
	
	var msie = /(msie|trident)/i.test(navigator.userAgent)
	var utils = __webpack_require__(5)
	var urlParsingNode = document.createElement('a')
	var originUrl = urlResolve(window.location.href)
	
	/**
	 * Parse a URL to discover it's components
	 *
	 * @param {String} url The URL to be parsed
	 * @returns {Object}
	 */
	function urlResolve(url) {
	  var href = url
	
	  if (msie) {
	    // IE needs attribute set twice to normalize properties
	    urlParsingNode.setAttribute('href', href)
	    href = urlParsingNode.href
	  }
	
	  urlParsingNode.setAttribute('href', href)
	
	  // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	  return {
	    href: urlParsingNode.href,
	    protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	    host: urlParsingNode.host,
	    search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	    hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	    hostname: urlParsingNode.hostname,
	    port: urlParsingNode.port,
	    pathname: (urlParsingNode.pathname.charAt(0) === '/')
	      ? urlParsingNode.pathname
	      : '/' + urlParsingNode.pathname
	  }
	}
	
	/**
	 * Determine if a URL shares the same origin as the current location
	 *
	 * @param {String} requestUrl The URL to test
	 * @returns {boolean} True if URL shares the same origin, otherwise false
	 */
	module.exports = function urlIsSameOrigin(requestUrl) {
	  var parsed = (utils.isString(requestUrl)) ? urlResolve(requestUrl) : requestUrl
	  return (parsed.protocol === originUrl.protocol &&
	        parsed.host === originUrl.host)
	}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function (arr) {
	    callback.apply(null, arr)
	  }
	}

/***/ })
/******/ ])});;
//# sourceMappingURL=axios.amd.standalone.map