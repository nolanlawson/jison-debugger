'use strict';

/** @jsx React.DOM */
var React = require('react');
var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var GrammarEditor = require('./GrammarEditor');
var TextToParseView = require('./TextToParseView');
var SampleGrammarLoader = require('./SampleGrammarLoader');

var Editor = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    return (
      <div>
        <GrammarEditor grammar={this.props.grammar} />
        <SampleGrammarLoader currentGrammar={this.props.grammar} />
        <TextToParseView textToParse={this.props.textToParse} />
      </div>
    )
  }
});

module.exports = Editor;
