'use strict';

var AppDispatcher = require('../dispatcher');
var ActionTypes = require('./ActionTypes');

module.exports = {
  grammarErrored: function (error) {
    AppDispatcher.handleWorkerAction({
      type: ActionTypes.GRAMMAR_ERRORED,
      error: error
    });
  },
  grammarCompiled: function (compiled) {
    AppDispatcher.handleWorkerAction({
      type: ActionTypes.GRAMMAR_COMPILED,
      compiledGrammar: compiled
    });
  }
};
