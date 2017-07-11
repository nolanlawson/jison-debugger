'use strict';

var EventEmitter = require('events');
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher');
var ActionTypes = require('../actions/ActionTypes');

var CHANGE_EVENT = 'change';

var activeCompiledGrammar = null;
var activeCompiledParser = null;
var activeCompiledError = null;
var activeCompiledLog = null;

var GrammarOutputStore = assign({}, EventEmitter.prototype, {
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
  getActiveCompiledLog() {
    return activeCompiledLog;
  },
  getActiveCompiledParser() {
    return activeCompiledParser;
  },
  getActiveCompiledError() {
    return activeCompiledError;
  }
});

GrammarOutputStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
  case ActionTypes.GRAMMAR_CHANGED_SIGNIFICANTLY:
    activeCompiledGrammar = null;
    activeCompiledError = null;
    activeCompiledParser = null;
    activeCompiledLog = null;
    
    GrammarOutputStore.emitChange();
    break;
  case ActionTypes.GRAMMAR_COMPILED:
    activeCompiledGrammar = action.compiledGrammar;
    activeCompiledParser = action.compiledParser;
    activeCompiledError = null;
    activeCompiledLog = action.log;
    
    GrammarOutputStore.emitChange();
    break;
  case ActionTypes.GRAMMAR_ERRORED:
    activeCompiledGrammar = null;
    activeCompiledParser = null;
    activeCompiledError = action.error;
    activeCompiledLog = null;
    
    GrammarOutputStore.emitChange();
    break;
  }
});

module.exports = GrammarOutputStore;
