'use strict';

var AppDispatcher = require('../dispatcher');
var ActionTypes = require('./ActionTypes');

module.exports = {
  compileGrammar(grammar) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.COMPILE_GRAMMAR,
      grammar: grammar
    });
  },
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
