'use strict';

var AppDispatcher = require('../dispatcher');
var ActionTypes = require('./ActionTypes');
var ParserWorkerService = require('../data/ParserWorkerService');

module.exports = {
  parseText(text) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PARSE_TEXT,
      textToParse: text
    });
    ParserWorkerService.parseText(text);
  }
};
