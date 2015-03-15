'use strict';

var safeStringify = require('../../util/util').safeStringify;

function buildTree(parserDebugger) {
  var unresolvedProductions = [];
  var root;

  function handleShift(step) {
    for (var k = unresolvedProductions.length - 1; k >= 0; k--) {
      var unresolvedProduction = unresolvedProductions[k];
      if (unresolvedProduction.name === step.terminal) {
        // resolve as terminal, no children
        unresolvedProductions.splice(k, 1);
        unresolvedProduction.subtitle = step.text || "<<EOF>>";
      }
    }
  }

  function handleReduce(step) {
    var node;
    if (!root) {
      // root node
      node = root = {
        name: step.nonterminal,
        output: safeStringify(step.result),
        children: []
      }
    } else {
      // non-root, non-terminal
      for (var k = unresolvedProductions.length - 1; k >= 0; k--) {
        var unresolvedProduction = unresolvedProductions[k];
        if (unresolvedProduction.name === step.nonterminal) {
          // resolve
          unresolvedProductions.splice(k, 1);
          node = unresolvedProduction;
          node.output = safeStringify(step.text);
          break;
        }
      }
    }

    for (var j = 0; j < step.productions.length; j++) {
      var production = {
        name: step.productions[j],
        children: []
      };
      node.children.push(production);
      unresolvedProductions.push(production);
    }
  }

  // the way the parserDebugger is built up, I can walk
  // through it backwards from the root node and
  // build up the hierarchy that way. The list of unresolvedProductions
  // can also be used to walk through backwards and find
  // the correct node in the case of ambiguities, due to
  // how LALR grammars are built up.
  for (var i = parserDebugger.length - 1; i >= 0; i--) {
    var step = parserDebugger[i];
    if (step.action === 'shift') {
      handleShift(step);
    } else if (step.action === 'reduce') {
      handleReduce(step);
    }
  }

  return root;
}

module.exports = {
  buildTree: buildTree
}
