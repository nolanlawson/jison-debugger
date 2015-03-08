'use strict';

var worker = new Worker('/worker/parser-worker.js');
var GrammarStore = require('../stores/GrammarStore');
var ParsedTextActionCreator = require('../actions/ParsedTextActionCreator');
var debounce = require('../util/util').debounce;

var ParserWorkerService =  {
  parseText: function (text) {
    debounce(700, function () {
      worker.addEventListener('error', function (e) {
        ParsedTextActionCreator.textErrored(e);
      });
      worker.addEventListener('message', function (e) {
        ParsedTextActionCreator.textParsed(e.data);
      });
      // ask the web worker to parse the text for us
      worker.postMessage({
        compiledGrammar: GrammarStore.getActiveCompiledGrammar(),
        textToParse: text
      });
    }.bind(this));
  }
};

module.exports = ParserWorkerService;
