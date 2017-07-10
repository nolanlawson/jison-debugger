/* jshint worker:true */
/* global Jison,bnf,parser,importScripts */

importScripts('./jison.js');
Jison.print = function () {};

function compileGrammar(self, grammar) {
  var compiledGrammar;

  try {
    compiledGrammar = JSON.parse(grammar);
  } catch (e) {
    // intentionally throw an error here if it fails to parse
    compiledGrammar = bnf.parse(grammar);
  }

  var log = [];
  
  Jison.print = function (msg) {
    log.push({
      action : 'jison',
      text : msg
    });
  };
  
  var compiledParser = new Jison.Parser(compiledGrammar).generate();

  self.postMessage({
    compiledGrammar,
    compiledParser,
    log});
}

function parseText(self, request) {
  var textToParse = request.textToParse;
  eval(request.compiledParser); // creates a global "parser" object
  var compiledParser = parser;

  Jison.lexDebugger = [];
  Jison.parserDebugger = request.log || [];
  var parsedResult;
  
  try {
    parsedResult = compiledParser.parse(textToParse);
  } catch (e) {
    self.postMessage({
      error: true,
      message: e.message,
      lexDebugger: Jison.lexDebugger
    });
    return;
  }

  self.postMessage({
    parsedResult: parsedResult,
    lexDebugger: Jison.lexDebugger,
    parserDebugger: Jison.parserDebugger
  });
}

// request to parse a grammar
self.addEventListener('message', function (e) {
  if (e.data.grammar) {
    compileGrammar(self, e.data.grammar);
  } else {
    parseText(self, e.data);
  }
});
