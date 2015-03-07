'use strict';

var worker = new Worker('../assets/js/worker.js');
var GrammarActionCreator = require('../actions/GrammarActionCreator');

module.exports = {
  compileGrammar: function (grammar) {
    worker.addEventListener('error', function (e) {
      GrammarActionCreator.grammarErrored(e);
    });
    worker.addEventListener('message', function (e) {
      var compiled = e.data.result;
      GrammarActionCreator.grammarCompiled(compiled);
    });
    // ask the web worker to parse the grammar for us
    worker.postMessage(grammar);
  }
};
