'use strict';

var through = require('through2');

module.exports = function (file) {
  if (!/\.jison$/.test(file)) {
    return through();
  }

  return through(function (buf, enc, next) {
    var contents = buf.toString('utf8');

    this.push('module.exports = ' + JSON.stringify(contents) + ';');
    next();
  });
};
