'use strict';

/** @jsx React.DOM */

var GrammarStore = require('../stores/GrammarStore');

var ParsedTextView = React.createClass({
  getInitialState: function () {
    var state = {
      parsedResult: GrammarStore.getActiveParsedResult(),
      lexDebugger: GrammarStore.getActiveLexDebugger(),
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
      lexDebugger: GrammarStore.getActiveLexDebugger(),
      parsedError: GrammarStore.getActiveCompiledError()
    };
    this.setState(state);
  },
  render: function () {
    var baseStyle = { width: 400, height: 222, fontFamily: 'monospace'};
    var style1 =  { width: 400, height: 122, fontFamily: 'monospace'}
    var style2 = {width: 400, height: 100, fontFamily: 'monospace'};

    if (this.state.parsedError) {
      return (
        <div>
          <pre style={baseStyle}>{this.state.parsedError}</pre>
        </div>
      );
    } else if (this.state.parsedResult) {
      var lexDebugger = JSON.stringify(this.state.lexDebugger);
      var parsedResult = this.state.parsedResult;
      return (
        <div>
          <pre style={style1}>{lexDebugger}</pre>
          <pre style={style2}>{parsedResult}</pre>
        </div>
      );
    } else {
      return (<div><pre style={baseStyle}></pre></div>)
    }
  }
});

module.exports = ParsedTextView;
