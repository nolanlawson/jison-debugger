'use strict';

var worker = new Worker('worker/grammar-worker.js');
var CompiledGrammarActionCreator = require('../actions/CompiledGrammarActionCreator');

var debounce = require('../util/util').debounce();

var GrammarWorkerService =  {
  compileGrammar: function (grammar) {
    debounce(300, function () {
      worker.addEventListener('error', function (e) {
        CompiledGrammarActionCreator.grammarErrored(e);
      });
      worker.addEventListener('message', function (e) {
        CompiledGrammarActionCreator.grammarCompiled(e.data);
      });
      // ask the web worker to parse the grammar for us
      worker.postMessage({grammar: grammar});
    }.bind(this));
  }
};

module.exports = GrammarWorkerService;
