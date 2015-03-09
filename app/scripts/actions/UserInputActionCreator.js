'use strict';

var AppDispatcher = require('../dispatcher');
var ActionTypes = require('./ActionTypes');

module.exports = {
  updateTextToParse(text) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TEXT_TO_PARSE_CHANGED,
      textToParse: text
    });
  },
  updateGrammar(grammar) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.GRAMMAR_CHANGED,
      grammar: grammar
    });
  }
};
