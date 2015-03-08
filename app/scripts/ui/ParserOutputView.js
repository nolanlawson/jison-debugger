'use strict';

/** @jsx React.DOM */

var GrammarStore = require('../stores/GrammarStore');
var LexOutputView = require('./LexOutputView');
var ParsedResultView = require('./ParsedResultView');
var LexErrorView = require('./LexErrorView');

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
  _onChange: function () {
    var state = {
      parsedError: GrammarStore.getActiveParsedError(),
      parsedResult: GrammarStore.getActiveParsedResult()
    };
    this.setState(state);
  },
  render: function () {
    var baseStyle = {
      width: 400,
      height: 222,
      fontFamily: 'monospace',
      fontSize: 12
    };

    if (this.state.parsedError) {
      return (
        <div style={baseStyle}>
          <LexErrorView/>
        </div>
      );
    } else if (this.state.parsedResult) {
      return (
        <div style={baseStyle}>
          <LexOutputView/>
          <ParsedResultView/>
        </div>
      );
    } else {
      return (<div style={baseStyle}></div>)
    }
  }
});

module.exports = ParserOutputView;
