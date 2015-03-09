'use strict';

/** @jsx React.DOM */
var React = require('react');
var GrammarActionCreator = require('../actions/GrammarActionCreator');
var ParserActionCreator = require('../actions/ParserActionCreator');
var UserInputActionCreator = require('../actions/UserInputActionCreator');
var GrammarStore = require('../stores/GrammarStore');

var Editor = React.createClass({
  getInitialState: function () {
    return {
      grammarText: GrammarStore.getActiveGrammar(),
      textToParse: GrammarStore.getActiveTextToParse()
    };
  },
  componentDidMount: function () {
    this._recompileGrammar(this.state.grammarText);
  },
  _recompileGrammar: function (text) {
    GrammarActionCreator.compileGrammar(text);
  },
  handleGrammarChange: function (event) {
    var text = event.target.value;
    this._recompileGrammar(text);
    UserInputActionCreator.updateGrammar(text);
    this.state.grammarText = text;
    this.setState(this.state);
  },
  handleTextToParseChange: function (event) {
    var text = event.target.value;
    UserInputActionCreator.updateTextToParse(text);
    ParserActionCreator.parseText(text);
    this.state.textToParse = text;
    this.setState(this.state);
  },
  render: function () {

    var textAreaStyle = {
      width: 500,
      height: 450,
      fontSize: 12,
      fontFamily: 'monospace'
    };

    var inputStyle = {
      width: 500
    };

    return (
      <div>
        <h5>Write your grammar</h5>
        <textarea
          style={textAreaStyle}
          value={this.state.grammarText}
          onChange={this.handleGrammarChange}>
        </textarea>
        <div>
          <h5>Sample text to parse</h5>
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
