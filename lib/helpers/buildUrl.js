'use strict';

var utils = require('./../utils')

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/gi, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']')

}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildUrl(url, params, paramsSerializer) {
  if (!params) {
    return url
  }

  var serializedParams
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else {
    var parts = []

    utils.forEach(params, function (val, key) {
      if (val === null || typeof val === 'undefined') {
        return
      }

      if (utils.isArray(val)) {
        key = key + '[]'
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

    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}