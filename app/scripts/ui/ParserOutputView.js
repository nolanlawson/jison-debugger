'use strict';

/** @jsx React.DOM */

var GrammarStore = require('../stores/GrammarStore');
var LexOutputView = require('./LexOutputView');
var ParsedResultView = require('./ParsedResultView');
var LexErrorView = require('./LexErrorView');
var ParseTreeView = require('./ParseTreeView');
var ParserWorkerService = require('../data/ParserWorkerService');

var ParserOutputView = React.createClass({
  getInitialState: function () {
    var state = {
      parsedError: GrammarStore.getActiveParsedError(),
      parsedResult: GrammarStore.getActiveParsedResult()
    };
    return state;
  },
  componentWillMount() {
    GrammarStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    GrammarStore.removeChangeListener(this._onChange);
  },
  _onChange: function () {
    var state = {
      parsedError: GrammarStore.getActiveParsedError(),
      parsedResult: GrammarStore.getActiveParsedResult()
    };
    this.setState(state);
    if (GrammarStore.getActiveCompiledGrammar()) {
      // current grammar is valid
      ParserWorkerService.parseText(GrammarStore.getActiveTextToParse());
    }
  },
  render: function () {
    var baseStyle = {
      width: 400,
      height: 222,
      fontSize: 12
    };

    if (!GrammarStore.getActiveCompiledGrammar()) {
      // current grammar is invalid
      return (<div style={baseStyle}></div>)
    } else if (this.state.parsedError) {
      return (
        <div style={baseStyle}>
          <LexErrorView/>
        </div>
      );
    } else if (this.state.parsedResult) {
      return (
        <div style={baseStyle}>
          <LexOutputView/>
          <ParseTreeView/>
          <ParsedResultView/>
        </div>
      );
    } else {
      return (<div style={baseStyle}></div>)
    }
  }
});

module.exports = ParserOutputView;
