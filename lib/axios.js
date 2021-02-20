var Promise = require('es6-promise').Promise

function axios(options) {
  options = merge({
    method: 'get',
    transformRequest: defaults.transformRequest,
    transformResponse: defaults.transformResponse,
  }, options)

  var promise = new Promise(function (resolve, reject) {
    var request = new(XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0')

    function onload() {
      if (request.status >= 200 && request.status < 300) {
        resolve(transformData(options.data, options.headers, options.transformResponse))
      } else {
        onerror()
      }
    }

    function onerror() {
      reject(
        parse(request.responseText) ||
        new Error('Can\'t connect to ' + JSON.stringify(options.url))
      )
    }

    try {
      request.open(options.method, options.url, true)
      request.onreadystatechange = function() {
        if (request.readyState === 4) {
          onload()
        }
      }

      request.onload = request.load = onload
      request.onerror = request.error = onerror

      var headers = merge(
        defaults.headers.common,
        defaults.headers[options.method] || {},
        options.headers || {}
      )

      for (var key in headers) {
        if (headers.hasOwnProperty(key)) {
          request.setRequestHeader(key, headers[key])
        }
      }
    } catch (e) {
      reject(e)
    }

    request.send(transformData(options.data, options.headers, options.transformRequest))
  })

  promise.success = function (fn) {
    promise.then(function(response) {
      fn(response)
    })
    return promise
  }

  promise.error = function (fn) {
    promise.then(null, function(response) {
      fn(response)
    })
    return promise
  }

  return promise
}

var CONTENT_TYPE_APPLICATION_JSON = {'Content-Type': 'application/json;charset=utf-8'};
var defaults = axios.defaults = {
  transformRequest: [function (data) {
    return data ? JSON.stringify(data) : null
  }],

  transformResponse: [function (data) {
    return parse(data)
  }],

  headers: {
    common: {'Accept': 'application/json, text/plain, */*'},
    patch: merge(CONTENT_TYPE_APPLICATION_JSON),
    post: merge(CONTENT_TYPE_APPLICATION_JSON),
    put: merge(CONTENT_TYPE_APPLICATION_JSON),
  }
}

function transformData(data, headers, fns) {
  if (typeof fns === 'function') {
    return fn(data, headers)
  }

  forEach(fns, function(fn) {
    data = fn(data, headers)
  })

  return data
}

function parse(response) {
  try {
    return JSON.parse(response)
  } catch (e) {
    return response
  }
}

function merge() {
  var result = {}

  forEach(arguments, function(obj) {
    for (var key in obj) {
      if (Object.hasOwnProperty.call(object, key)) {
        result[key] = obj[key]
      }
    }
  })

  return result
}

function forEach(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    fn.call(null, arr[i], i, arr)
  }
}

function createShortMethods() {
  forEach(arguments, function (method) {
    axios[method] = function (url, options) {
      return axios(merge(options || {}, {
        method: method,
        url: url,
      }))
    }
  })
}

function createShortMethodsWithData() {
  forEach(arguments, function (method) {
    axios[method] = function (url, data, options) {
      return axios(merge(options || {}, {
        method: method,
        url: url,
        data: data,
      }))
    }
  })
}

createShortMethods('delete', 'get', 'head')
createShortMethodsWithData('post', 'put', 'patch')

module.exports = axios