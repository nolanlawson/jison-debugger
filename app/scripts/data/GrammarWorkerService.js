'use strict';

var worker = new Worker('/worker/grammar-worker.js');
var CompiledGrammarActionCreator = require('../actions/CompiledGrammarActionCreator');

var GrammarWorkerService =  {
  compileGrammar: function (grammar) {
    worker.addEventListener('error', function (e) {
      CompiledGrammarActionCreator.grammarErrored(e);
    });
    worker.addEventListener('message', function (e) {
      CompiledGrammarActionCreator.grammarCompiled(e.data.result.compiledGrammar);
    });
    // ask the web worker to parse the grammar for us
    worker.postMessage(grammar);
  }
};

module.exports = GrammarWorkerService;
