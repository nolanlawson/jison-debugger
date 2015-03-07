'use strict';

/** @jsx React.DOM */
var React = require('react');
var Jison = require('Jison');
var ebnf = require('ebnf-parser');

var Editor = React.createClass({
  getInitialState: function () {
    return {text: '/* description: Parses end executes mathematical expressions. */\n\n/* lexical grammar */\n%lex\n%%\n\n\\s+                   /* skip whitespace */\n[0-9]+("."[0-9]+)?\x08  return \'NUMBER\'\n"*"                   return \'*\'\n"/"                   return \'/\'\n"-"                   return \'-\'\n"+"                   return \'+\'\n"^"                   return \'^\'\n"("                   return \'(\'\n")"                   return \')\'\n"PI"                  return \'PI\'\n"E"                   return \'E\'\n<<EOF>>               return \'EOF\'\n.                     return \'INVALID\'\n\n/lex\n\n/* operator associations and precedence */\n\n%left \'+\' \'-\'\n%left \'*\' \'/\'\n%left \'^\'\n%left UMINUS\n\n%start expressions\n\n%% /* language grammar */\n\nexpressions\n    : e EOF\n        {return $1;}\n    ;\n\ne\n    : e \'+\' e\n        {$$ = $1+$3;}\n    | e \'-\' e\n        {$$ = $1-$3;}\n    | e \'*\' e\n        {$$ = $1*$3;}\n    | e \'/\' e\n        {$$ = $1/$3;}\n    | e \'^\' e\n        {$$ = Math.pow($1, $3);}\n    | \'-\' e %prec UMINUS\n        {$$ = -$2;}\n    | \'(\' e \')\'\n        {$$ = $2;}\n    | NUMBER\n        {$$ = Number(yytext);}\n    | E\n        {$$ = Math.E;}\n    | PI\n        {$$ = Math.PI;}\n    ;\n'};
  },
  handleChange: function (event) {

    var text = event.target.value;
    var parsed = ebnf.parse(text);
    console.log(parsed);

    this.setState({text: text});
  },
  render: function () {
    return (
      <textarea value={this.state.text} onChange={this.handleChange}></textarea>
    )
  }
});

module.exports = Editor;

