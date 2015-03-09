'use strict';

/** @jsx React.DOM */

var GrammarStore = require('../stores/GrammarStore');

var ParsedResultView = React.createClass({
  getInitialState: function () {
    var state = {
      parsedResult: GrammarStore.getActiveParsedResult(),
      parsedError: GrammarStore.getActiveParsedError()
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
      parsedResult: GrammarStore.getActiveParsedResult(),
      parsedError: GrammarStore.getActiveParsedError()
    };
    this.setState(state);
  },
  render: function () {
    var style = {width: 400, height: 100, fontSize: 12};

    var parsedResult = this.state.parsedResult || '';
    return (
      <div style={style}>
        <h5>Parser result</h5>
        <pre>{parsedResult}</pre>
      </div>
    );

  }
});

module.exports = ParsedResultView;


