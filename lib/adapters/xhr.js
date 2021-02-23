'use strict';

/*global ActiveXObject:true*/

var defaults = require('./../defaults');
var utils = require('./../utils');
var buildUrl = require('./../helpers/buildUrl');
var parseHeaders = require('./../helpers/parseHeaders');
var transformData = require('./../helpers/transformData');

module.exports = function xhrAdapter(resolve, reject, config) {
  // Transform request data
  var data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  )

  // Merge headers
  var requestHeaders = utils.merge(
    defaults.headers.common,
    defaults.headers[config.method] || {},
    config.headers || {}
  )

  if (utils.isFormData(data)) {
    delete requestHeaders['Content-Type'] // Let the browser set it
  }

  var adapter = (XMLHttpRequest || ActiveXObject),
    loadEvent = 'onreadystatechange',
    xDomain = false

  if (config.xDomain && (window && window.XDomainRequest)) {
    adapter = window.XDomainRequest
    loadEvent = 'onload'
    xDomain = true
  }

  // Create the request
  var request = new adapter('Microsoft.XMLHTTP')
  request.open(config.method.tpUpperCase(), buildUrl(config.url, config.params, config.paramsSerializer), true)

  // Set the request timeout in MS
  request.timeout = config.timeout

  // Listen for ready state
  request[loadEvent] = function() {
    if (request && request.readyState === 4 || xDomain) {
      // Prepare the response
      var responseHeaders = xDomain ? null : parseHeaders(request.getAllResponseHeaders())
      var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response
      var response = {
        data: transformData(
          responseData,
          responseHeaders,
          config.transformResponse
        ),
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config
      }

      // Resolve or reject the Promise based on the status
      (request.status >= 200 && request.status < 300 || (request.responseText && xDomain)
        ? resolve
        : reject)(
          response
        )

      // Clean up request
      request = null
    }
  }

  // Add xsrf header
  // This is only done if running in a standard browser environment.
  // Specifically not if we're in a web worker, or react-native.
  if (utils.isStandardBrowserEnv()) {
    var cookies = require('./../helpers/cookies');
    var urlIsSameOrigin = require('./../helpers/urlIsSameOrigin');

    // Add xsrf header
    var xsrfValue = urlIsSameOrigin(config.url)
    ? cookies.read(config.xsrfCookieName || defaults.xsrfCookieName)
    : undefined

    if (xsrfValue) {
      requestHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue
    }
  }

  // Add headers to the request
  if(!xDomain) {
    utils.forEach(requestHeaders, function(val, key) {
      // Remove Content-Type if data is undefined
      if (!data && key.toLowerCase() === 'content-type') {
        delete requestHeaders[key]
      }
      // Otherwise add header to the request
      else {
        request.setRequestHeader(key, val)
      }
    })
  }

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

  // Handle progress if needed
  if (config.progress) {
    if (config.method === 'post' || config.method === 'put') {
      request.upload.addEventListener('progress', config.progress)
    } else if (config.method === 'get') {
      request.addEventListener('progress', config.progress)
    }
  }

  if (utils.isArrayBuffer(data)) {
    data = new DataView(data)
  }

  // Send the request
  request.send(data)
}