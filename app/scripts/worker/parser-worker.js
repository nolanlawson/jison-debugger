'use strict';
/* jshint worker:true */
/* global Jison,ebnf */
importScripts('./jison.js');
Jison.print = function () {};

// request to parse a grammar
self.addEventListener('message', function (e) {

  var compiledGrammar = e.data.compiledGrammar;
  var textToParse = e.data.textToParse;

  Jison.lexDebugger = [];

  var parsedResult = new Jison.Parser(compiledGrammar).parse(textToParse);

  self.postMessage({parsedResult: parsedResult, lexDebugger: Jison.lexDebugger});
});
