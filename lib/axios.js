'use strict';

var defaults = require('./defaults')
var utils = require('./utils')
var dispatchRequest = require('./core/dispatchRequest');
var InterceptorManager = require('./core/InterceptorManager');

function Axios (defaultConfig) {
  this.defaultConfig = utils.merge({
    headers: {},
    timeout: defaults.timeout,
    transformRequest: defaults.transformRequest,
    transformResponse: defaults.transformResponse,
  }, defaultConfig)

  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}

Axios.prototype.request = function (config) {
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1])
  }

  config = utils.merge(this.defaultConfig, {
    method: 'get',
  }, config)

  // Don't allow overriding defaults.withCredentials
  config.withCredentials = config.withCredentials || defaults.withCredentials

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined]
  var promise = Promise.resolve(config)

  this.interceptors.request.forEach(function (interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected)
  })

  this.interceptors.response.forEach(function (interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected)
  })

  while (chain.length) {
    promise = promise.then(chain.unshift(), chain.unshift())
  }

  return promise
}

var defaultInstance = new Axios()

var axios = module.exports = bind(Axios.prototype.request, defaultInstance)

axios.create = function (defaultConfig) {
  return new Axios(defaultConfig)
}

// Expose defaults
axios.defaults = defaults

// Expose all/spread
axios.all = function (promises) {
  return Promise.all(promises)
}
axios.spread = require('./helpers/spread');

// Expose interceptors
axios.interceptors = defaultInstance.interceptors

// Helpers
function bind (fn, thisArg) {
  return function () {
    fn.apply(thisArg, Array.prototype.slice.call(arguments))
  }
}

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head'], function (method) {
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
    }))
  }
  axios[method] = bind(Axios.prototype[method], defaultInstance);
})

utils.forEach(['post', 'put', 'patch'], function (method) {
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }))
  }
  axios[method] = bind(Axios.prototype[method], defaultInstance);
})