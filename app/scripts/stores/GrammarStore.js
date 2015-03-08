'use strict';

var EventEmitter = require('events');
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher');
var ActionTypes = require('../actions/ActionTypes');

var CHANGE_EVENT = 'change';

var activeCompiledGrammar = null;
var activeCompiledError = null;

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
  getActiveCompiledError() {
    return activeCompiledError;
  }
});

GrammarStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.GRAMMAR_COMPILED:
      console.log('grammar compiled');
      activeCompiledGrammar = action.compiledGrammar;
      activeCompiledError = null;
      GrammarStore.emitChange();
      break;
    case ActionTypes.GRAMMAR_ERRORED:
      console.log('grammar errored');
      activeCompiledGrammar = null;
      activeCompiledError = action.error;
      GrammarStore.emitChange();
      break;
  }
});

module.exports = GrammarStore;
