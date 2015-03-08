'use strict';

/** @jsx React.DOM */

var GrammarStore = require('../stores/GrammarStore');

var ParsedTextView = React.createClass({
  getInitialState: function () {
    var state = {
      parsedResult: GrammarStore.getActiveParsedResult(),
      parsedError: GrammarStore.getActiveCompiledError()
    };
    return state;
  },
  componentWillMount() {
    GrammarStore.addChangeListener(this._onChange);
  },
  _onChange: function () {
    var state = {
      parsedResult: GrammarStore.getActiveParsedResult(),
      parsedError: GrammarStore.getActiveCompiledError()
    };
    this.setState(state);
  },
  render: function () {
    var style = {
      width: 400,
      height: 222,
      fontFamily: 'monospace'
    };

    var display;
    if (this.state.parsedError) {
      display = this.state.parsedError.message;
    } else if (this.state.parsedResult) {
      display = JSON.stringify(this.state.parsedResult);
    } else {
      display = '';
    }

    return (
      <pre style={style}>{display}</pre>
    );
  }
});

module.exports = ParsedTextView;
