'use strict';

/** @jsx React.DOM */
var React = require('react');
var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var GrammarActionCreator = require('../actions/GrammarActionCreator');
var ParserActionCreator = require('../actions/ParserActionCreator');
var UserInputActionCreator = require('../actions/UserInputActionCreator');

var Editor = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function () {
    this._recompileGrammar(this.props.grammar);
  },
  _recompileGrammar: function (text) {
    GrammarActionCreator.compileGrammar(text);
  },
  handleGrammarChange: function (event) {
    var text = event.target.value;
    UserInputActionCreator.updateGrammar(text);
    this._recompileGrammar(text);
  },
  handleTextToParseChange: function (event) {
    var text = event.target.value;
    UserInputActionCreator.updateTextToParse(text);
    ParserActionCreator.parseText(text);
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
          value={this.props.grammar}
          onChange={this.handleGrammarChange}>
        </textarea>
        <div>
          <h5>Sample text to parse</h5>
          <input
            style={inputStyle}
            type="text"
            value={this.props.textToParse}
            onChange={this.handleTextToParseChange}>
          </input>
        </div>
      </div>
    )
  }
});

module.exports = Editor;
