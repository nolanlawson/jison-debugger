'use strict';

/** @jsx React.DOM */

var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var LexOutputView = require('./LexOutputView');
var ParsedResultView = require('./ParsedResultView');
var LexErrorView = require('./LexErrorView');
var ParseTreeView = require('./ParseTreeView');

var ParserOutputView = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    var baseStyle = {
      width: '100%',
      fontSize: 12
    };

    if (!this.props.compiledGrammar) {
      // current grammar is invalid
      return (<div style={baseStyle}></div>)
    } else if (this.props.parsedError) {
      return (
        <div style={baseStyle}>
          <LexOutputView lexDebugger={this.props.lexDebugger}/>
          <LexErrorView parsedError={this.props.parsedError}/>
        </div>
      );
    } else if (this.props.parsedResult) {
      return (
        <div style={baseStyle}>
          <LexOutputView lexDebugger={this.props.lexDebugger}/>
          <ParseTreeView parserDebugger={this.props.parserDebugger}/>
          <ParsedResultView parsedResult={this.props.parsedResult}/>
        </div>
      );
    } else {
      return (<div style={baseStyle}></div>)
    }
  }
});

module.exports = ParserOutputView;
