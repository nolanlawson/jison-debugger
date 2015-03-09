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

module.exports = {
  debounce: debounce
};
