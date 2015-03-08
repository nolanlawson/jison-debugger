'use strict';

var dispatcher = require('flux-dispatcher');
var PayloadSources = require('./payload-sources');
var assign = require('object-assign');

var AppDispatcher = assign(dispatcher, {

  handleViewAction(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleWorkerAction(action) {
    var payload = {
      source: PayloadSources.WORKER_ACTION,
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = AppDispatcher;
