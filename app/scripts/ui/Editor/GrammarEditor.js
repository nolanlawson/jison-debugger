'use strict';

/** @jsx React.DOM */
var React = require('react');
var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var GrammarActionCreator = require('../../actions/GrammarActionCreator');
var UserInputActionCreator = require('../../actions/UserInputActionCreator');

var GrammarEditor = React.createClass({
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
  render: function () {
    var textAreaStyle = {
      height: 400,
      width: '100%',
      fontSize: 12,
      fontFamily: 'monospace'
    };

    return (
      <div>
        <h5>Write your grammar</h5>
        <textarea
          style={textAreaStyle}
          value={this.props.grammar}
          onChange={this.handleGrammarChange}>
        </textarea>
      </div>
    )
  }
});

module.exports = GrammarEditor;
