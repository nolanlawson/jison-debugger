'use strict';

var EventEmitter = require('events');
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher');
var ActionTypes = require('../actions/ActionTypes');
var constants = require('../util/constants');

var CHANGE_EVENT = 'change';

var activeParsedResult = null;
var activeParsedError = null;
var activeLexDebugger = null;
var activeParserDebugger = null;

var ParserOutputStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
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

ParserOutputStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.GRAMMAR_CHANGED_SIGNIFICANTLY:
      activeParsedResult = null;
      activeLexDebugger = null;
      activeParserDebugger = null;
      activeParsedError = null;
      ParserOutputStore.emitChange();
      break;
    case ActionTypes.TEXT_PARSED:
      activeParsedResult = action.parsedResult;
      activeLexDebugger = action.lexDebugger;
      activeParserDebugger = action.parserDebugger;
      activeParsedError = null;
      ParserOutputStore.emitChange();
      break;
    case ActionTypes.TEXT_ERRORED:
      activeParsedResult = null;
      activeLexDebugger = action.error.lexDebugger || [];
      activeParserDebugger = null;
      activeParsedError = action.error;
      ParserOutputStore.emitChange();
      break;
  }
});

module.exports = ParserOutputStore;
