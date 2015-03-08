'use strict';

/** @jsx React.DOM */

var GrammarStore = require('../stores/GrammarStore');

var GrammarView = React.createClass({
  getInitialState: function () {
    var state = {
      compiledError: GrammarStore.getActiveCompiledError(),
      compiledGrammar: GrammarStore.getActiveCompiledGrammar()
    };
    return state;
  },
  componentWillMount() {
    GrammarStore.addChangeListener(this._onChange);
  },
  _onChange: function () {
    var state = {
      compiledError: GrammarStore.getActiveCompiledError(),
      compiledGrammar: GrammarStore.getActiveCompiledGrammar()
    };
    console.log('setting state', state);
    this.setState(state);
  },
  render: function () {
    var style = {
      width: 400,
      height: 500,
      fontFamily: 'monospace'
    };

    var display;
    if (this.state.compiledError) {
      display = this.state.compiledError.message;
    } else if (this.state.compiledGrammar) {
      display = JSON.stringify(this.state.compiledGrammar);
    } else {
      display = '';
    }

    return (
      <pre style={style}>{display}</pre>
    );
  }
});

module.exports = GrammarView;
