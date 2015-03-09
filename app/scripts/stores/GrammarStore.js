'use strict';

var EventEmitter = require('events');
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher');
var ActionTypes = require('../actions/ActionTypes');

var CHANGE_EVENT = 'change';

var activeCompiledGrammar = null;
var activeCompiledParser = null;
var activeCompiledError = null;
var activeParsedResult = null;
var activeParsedError = null;
var activeLexDebugger = null;
var activeParserDebugger = null;

var GrammarStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getActiveCompiledGrammar() {
    return activeCompiledGrammar;
  },
  getActiveCompiledParser() {
    return activeCompiledParser;
  },
  getActiveCompiledError() {
    return activeCompiledError;
  },
  getActiveParsedResult() {
    return activeParsedResult;
  },
  getActiveParsedError() {
    return activeParsedError;
  },
  getActiveLexDebugger() {
    return activeLexDebugger;
  },
  getActiveParserDebugger() {
    return activeParserDebugger;
  }
});

GrammarStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.GRAMMAR_COMPILED:
      activeCompiledGrammar = action.compiledGrammar;
      activeCompiledParser = action.compiledParser;
      activeCompiledError = null;
      GrammarStore.emitChange();
      break;
    case ActionTypes.GRAMMAR_ERRORED:
      activeCompiledGrammar = null;
      activeCompiledParser = null;
      activeCompiledError = action.error;
      GrammarStore.emitChange();
      break;
    case ActionTypes.TEXT_PARSED:
      activeParsedResult = action.parsedResult;
      activeLexDebugger = action.lexDebugger;
      activeParserDebugger = action.parserDebugger;
      activeParsedError = null;
      GrammarStore.emitChange();
      break;
    case ActionTypes.TEXT_ERRORED:
      activeParsedResult = null;
      activeLexDebugger = null;
      activeParserDebugger = null;
      activeParsedError = action.error;
      GrammarStore.emitChange();
      break;
  }
});

module.exports = GrammarStore;
