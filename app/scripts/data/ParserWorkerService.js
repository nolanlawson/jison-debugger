'use strict';

var worker = new Worker('worker/grammar-worker.js');
var ParsedTextActionCreator = require('../actions/ParsedTextActionCreator');
var GrammarStore = require('../stores/GrammarStore');
var debounce = require('../util/util').debounce();

var ParserWorkerService =  {
  parseText: function (text) {
    debounce(700, function () {
      if (!GrammarStore.getActiveCompiledGrammar()) {
        return; // grammar is invalid, can't parse
      }

      worker.addEventListener('error', function (e) {
        ParsedTextActionCreator.textErrored(e);
      });
      worker.addEventListener('message', function (e) {
        ParsedTextActionCreator.textParsed(e.data);
      });
      // ask the web worker to parse the text for us
      worker.postMessage({
        textToParse: text,
        compiledParser: GrammarStore.getActiveCompiledParser()
      });
    }.bind(this));
  }
};

module.exports = ParserWorkerService;
