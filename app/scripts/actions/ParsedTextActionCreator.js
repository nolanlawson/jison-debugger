'use strict';

var AppDispatcher = require('../dispatcher');
var ActionTypes = require('./ActionTypes');
var safeStringify = require('../util/util').safeStringify;

module.exports = {
  textParsed: function (data) {
    AppDispatcher.handleWorkerAction({
      type: ActionTypes.TEXT_PARSED,
      parsedResult: safeStringify(data.parsedResult, null, '  '),
      lexDebugger: data.lexDebugger,
      parserDebugger: data.parserDebugger
    });
  },
  textErrored: function (error) {
    AppDispatcher.handleWorkerAction({
      type: ActionTypes.TEXT_ERRORED,
      error: error
    });
  }
};
