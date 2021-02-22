var utils = require('./../utils')

function encode(val) {
  'use strict';
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/gi, '+')
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildUrl(url, params) {
  'use strict';
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