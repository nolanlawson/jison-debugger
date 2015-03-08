'use strict';

/** @jsx React.DOM */
var React = require('react');
var GrammarActionCreator = require('../actions/GrammarActionCreator');
var GrammarStore = require('../stores/GrammarStore');

var INITIAL_GRAMMAR = '/* description: Parses end executes mathematical expressions. */\n\n/* lexical grammar */\n%lex\n%%\n\n\\s+                   /* skip whitespace */\n[0-9]+("."[0-9]+)?\x08  return \'NUMBER\'\n"*"                   return \'*\'\n"/"                   return \'/\'\n"-"                   return \'-\'\n"+"                   return \'+\'\n"^"                   return \'^\'\n"("                   return \'(\'\n")"                   return \')\'\n"PI"                  return \'PI\'\n"E"                   return \'E\'\n<<EOF>>               return \'EOF\'\n.                     return \'INVALID\'\n\n/lex\n\n/* operator associations and precedence */\n\n%left \'+\' \'-\'\n%left \'*\' \'/\'\n%left \'^\'\n%left UMINUS\n\n%start expressions\n\n%% /* language grammar */\n\nexpressions\n    : e EOF\n        {return $1;}\n    ;\n\ne\n    : e \'+\' e\n        {$$ = $1+$3;}\n    | e \'-\' e\n        {$$ = $1-$3;}\n    | e \'*\' e\n        {$$ = $1*$3;}\n    | e \'/\' e\n        {$$ = $1/$3;}\n    | e \'^\' e\n        {$$ = Math.pow($1, $3);}\n    | \'-\' e %prec UMINUS\n        {$$ = -$2;}\n    | \'(\' e \')\'\n        {$$ = $2;}\n    | NUMBER\n        {$$ = Number(yytext);}\n    | E\n        {$$ = Math.E;}\n    | PI\n        {$$ = Math.PI;}\n    ;\n';

var Editor = React.createClass({
  getInitialState: function () {
    return {text: INITIAL_GRAMMAR};
  },
  componentDidMount: function () {
    this._recompileGrammar(INITIAL_GRAMMAR);
  },
  _recompileGrammar: function (text) {
    GrammarActionCreator.compileGrammar(text);
  },
  handleChange: function (event) {
    var text = event.target.value;
    this._recompileGrammar(text);
    this.setState({text: text});
  },
  render: function () {

    var style = {
      width: 500,
      height: 500,
      fontFamily: 'monospace'
    };

    return (
      <div>
        <textarea style={style} value={this.state.text} onChange={this.handleChange}></textarea>
      </div>
    )
  }
});

module.exports = Editor;

module.exports = Editor;

