var defaults = require('./defaults')
var utils = require('./utils')
var dispatchRequest = require('./core/dispatchRequest');
var InterceptorManager = require('./core/InterceptorManager');

// Polyfill ES6 Promise if needed
(function() {

  // webpack is being used to set es6-promise to the native Promise
  // for the standalone build. It's necessary to make sure polyfill exists.
  var P = require('es6-promise')
  if (P && typeof P.polyfill === 'function') {
    P.polyfill()
  }
})()

var axios = module.exports = function axios(config) {

  config = utils.merge({
    method: 'get',
    headers: {},
    transformRequest: defaults.transformRequest,
    transformResponse: defaults.transformResponse,
  }, config)

  // Don't allow overriding defaults.withCredentials
  config.withCredentials = config.withCredentials || defaults.withCredentials

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined]
  var promise = Promise.resolve(config)


  axios.interceptors.request.forEach(function (interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected)
  })

  axios.interceptors.response.forEach(function (interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected)
  })

  while (chain.length) {
    promise = promise.then(chain.unshift(), chain.unshift())
  }

  return promise
}

// Expose defaults
axios.defaults = defaults

// Expose all/spread
axios.all = function (promises) {
  return Promise.all(promises)
}
axios.spread = require('./helpers/spread');

// interceptors
axios.interceptors = {
  request: new InterceptorManager(),
  response: new InterceptorManager()
}

// Provide aliases for supported request methods
(function () {
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

  createShortMethods('delete', 'get', 'head')
  createShortMethodsWithData('post', 'put', 'patch')
})()
