if (typeof Promise === 'undefined') {
  require('promise/lib/rejection-tracking').enable(); // eslint-disable-line global-require
  window.Promise = require('promise/lib/es6-extensions.js'); // eslint-disable-line global-require
}

require('whatwg-fetch');

Object.assign = require('object-assign');

