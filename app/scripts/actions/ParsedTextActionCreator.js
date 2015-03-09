'use strict';

var AppDispatcher = require('../dispatcher');
var ActionTypes = require('./ActionTypes');

module.exports = {
  textParsed: function (data) {
    AppDispatcher.handleWorkerAction({
      type: ActionTypes.TEXT_PARSED,
      parsedResult: data.parsedResult,
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
