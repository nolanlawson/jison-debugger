'use strict';
/* jshint worker:true */
/* global Jison,ebnf */
importScripts('./jison.js');
importScripts('./ebnf-parser.js');
Jison.print = function () {};

// request to parse a grammar
self.addEventListener('message', function (e) {
  if (typeof e.data !== 'string') {
    return;
  }

  var grammar = e.data;

  var cfg;

  try {
    cfg = JSON.parse(grammar);
  } catch (e) {
    // intentionally throw an error here if it fails to parse
    cfg = ebnf.parse(grammar);
  }

  self.postMessage({compiledGrammar: cfg});
});
