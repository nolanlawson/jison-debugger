'use strict';

var worker = new Worker('worker/grammar-worker.js');
var ParsedTextActionCreator = require('../actions/ParsedTextActionCreator');
var GrammarOutputStore = require('../stores/GrammarOutputStore');
var debounce = require('../util/util').debounce();

var ParserWorkerService =  {
  parseText: function (text) {
    debounce(300, function () {
      if (!GrammarOutputStore.getActiveCompiledGrammar()) {
        return; // grammar is invalid, can't parse
      }

      worker.addEventListener('error', function (e) {
        ParsedTextActionCreator.textErrored(e);
      });
      worker.addEventListener('message', function (e) {
        if (e.data.error) {
          ParsedTextActionCreator.textErrored({
            message: e.data.message,
            lexDebugger: e.data.lexDebugger
          });
        } else {
          ParsedTextActionCreator.textParsed(e.data);
        }
      });
      // ask the web worker to parse the text for us
      worker.postMessage({
        textToParse: text,
        compiledParser: GrammarOutputStore.getActiveCompiledParser()
      });
    }.bind(this));
  }
};

module.exports = ParserWorkerService;
