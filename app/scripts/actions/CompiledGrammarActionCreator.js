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
  grammarCompiled: function (data) {
    AppDispatcher.handleWorkerAction({
      type: ActionTypes.GRAMMAR_COMPILED,
      compiledGrammar: data.compiledGrammar,
      compiledParser: data.compiledParser
    });
  }
};
