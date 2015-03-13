'use strict';

function debounce() {
  var timeout;
  return function debounce(delay, fun) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      fun();
      timeout = null;
    }, delay);
  };
}

function safeStringify(obj, arg1, arg2) {
  try {
    return JSON.stringify(obj, arg1, arg2);
  } catch (err) {
    return obj.toString();
  }
}

module.exports = {
  debounce: debounce,
  safeStringify: safeStringify
};
