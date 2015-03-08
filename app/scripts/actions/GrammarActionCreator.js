'use strict';

var AppDispatcher = require('../dispatcher');
var ActionTypes = require('./ActionTypes');
var GrammarWorkerService = require('../data/GrammarWorkerService');

module.exports = {
  compileGrammar(grammar) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.COMPILE_GRAMMAR,
      grammar: grammar
    });
    GrammarWorkerService.compileGrammar(grammar);
  }
};
