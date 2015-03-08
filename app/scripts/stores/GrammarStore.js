'use strict';

var EventEmitter = require('events');
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher');
var ActionTypes = require('../actions/ActionTypes');

var CHANGE_EVENT = 'change';

var activeGrammar = null;

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
  getActiveGrammar() {
    return activeGrammar;
  }
});

GrammarStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.EMAIL_CREATED:
      activeGrammar = action.compiledGrammar;
      GrammarStore.emitChange();
      break;
  }
});

module.exports = GrammarStore;
