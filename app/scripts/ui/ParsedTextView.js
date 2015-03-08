'use strict';

/** @jsx React.DOM */

var GrammarStore = require('../stores/GrammarStore');
var LexOutputView = require('./LexOutputView');

var ParsedTextView = React.createClass({
  getInitialState: function () {
    var state = {
      parsedResult: GrammarStore.getActiveParsedResult(),
      lexDebugger: GrammarStore.getActiveLexDebugger(),
      parsedError: GrammarStore.getActiveParsedError()
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
      parsedError: GrammarStore.getActiveParsedError()
    };
    this.setState(state);
  },
  render: function () {
    var baseStyle = { width: 400, height: 222, fontFamily: 'monospace', fontSize: 12};
    var style2 = {width: 400, height: 100, fontFamily: 'monospace', fontSize: 12};

    if (this.state.parsedError) {
      return (
        <div>
          <pre style={baseStyle}>{this.state.parsedError.message}</pre>
        </div>
      );
    } else if (this.state.parsedResult) {
      var parsedResult = this.state.parsedResult;
      return (
        <div>
          <LexOutputView/>
          <pre style={style2}>{parsedResult}</pre>
        </div>
      );
    } else {
      return (<div><pre style={baseStyle}></pre></div>)
    }
  }
});

module.exports = ParsedTextView;
