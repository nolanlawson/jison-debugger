'use strict';

var AppDispatcher = require('../dispatcher');
var ActionTypes = require('./ActionTypes');
var GrammarWorkerService = require('../data/GrammarWorkerService');

module.exports = {
  compileGrammar: function(grammar) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.COMPILE_GRAMMAR,
      grammar: grammar
    });
    GrammarWorkerService.compileGrammar(grammar);
  },
  changeGrammarSignificantly: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.GRAMMAR_CHANGED_SIGNIFICANTLY
    });
  }
};
