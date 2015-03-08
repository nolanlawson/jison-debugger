'use strict';

/** @jsx React.DOM */
var React = require('react');
var GrammarActionCreator = require('../actions/GrammarActionCreator');
var ParserActionCreator = require('../actions/ParserActionCreator');
var GrammarStore = require('../stores/GrammarStore');
var constants = require('../util/constants');

var INITIAL_GRAMMAR = constants.INITIAL_GRAMMAR;
var INITIAL_TEXT_TO_PARSE = constants.INITIAL_TEXT_TO_PARSE;

var Editor = React.createClass({
  getInitialState: function () {
    return {grammarText: INITIAL_GRAMMAR, textToParse: INITIAL_TEXT_TO_PARSE};
  },
  componentDidMount: function () {
    this._recompileGrammar(INITIAL_GRAMMAR);
  },
  _recompileGrammar: function (text) {
    GrammarActionCreator.compileGrammar(text);
  },
  _reparseText: function (text) {
    ParserActionCreator.parseText(text);
  },
  handleGrammarChange: function (event) {
    var text = event.target.value;
    this._recompileGrammar(text);
    this.state.grammarText = text;
    this.setState(this.state);
  },
  handleTextToParseChange: function (event) {
    var text = event.target.value;
    this._reparseText(text);
    this.state.textToParse = text;
    this.setState(this.state);
  },
  render: function () {

    var textAreaStyle = {
      width: 500,
      height: 500,
      fontSize: 12,
      fontFamily: 'monospace'
    };

    var inputStyle = {
      width: 500
    };

    return (
      <div>
        <textarea
          style={textAreaStyle}
          value={this.state.grammarText}
          onChange={this.handleGrammarChange}>
        </textarea>
        <div>
          <input
            style={inputStyle}
            type="text"
            value={this.state.textToParse}
            onChange={this.handleTextToParseChange}>
          </input>
        </div>
      </div>
    )
  }
});

module.exports = Editor;

module.exports = Editor;

