'use strict';

var Dispatcher = require('flux/dispatcher');
var PayloadSources = require('./payload-sources');
var assign = require('react/lib/assign');

var AppDispatcher = assign(new Dispatcher(), {

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
