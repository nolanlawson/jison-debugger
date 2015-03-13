'use strict';

var EventEmitter = require('events');
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher');
var ActionTypes = require('../actions/ActionTypes');
var constants = require('../util/constants');

var CHANGE_EVENT = 'change';

var activeGrammar = localStorage.grammar || constants.INITIAL_GRAMMAR;
var activeTextToParse = localStorage.textToParse || constants.INITIAL_TEXT_TO_PARSE;

var GrammarInputStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getActiveGrammar() {
    return activeGrammar;
  },
  getActiveTextToParse() {
    return activeTextToParse;
  }
});

GrammarInputStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.GRAMMAR_CHANGED:
      activeGrammar = action.grammar;
      localStorage.grammar = action.grammar;
      GrammarInputStore.emitChange();
      break;
    case ActionTypes.TEXT_TO_PARSE_CHANGED:
      activeTextToParse = action.textToParse;
      localStorage.textToParse = action.textToParse;
      GrammarInputStore.emitChange();
      break;
  }
});

module.exports = GrammarInputStore;
