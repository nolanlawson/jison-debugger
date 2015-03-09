'use strict';

/** @jsx React.DOM */

var GrammarStore = require('../stores/GrammarStore');

var LexErrorView = React.createClass({
  getInitialState: function () {
    var state = {
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
      parsedError: GrammarStore.getActiveParsedError()
    };
    this.setState(state);
  },
  render: function () {
    return (
      <div>
        <h5>Parser error</h5>
        <pre style={{fontSize: 11}}>{this.state.parsedError ? this.state.parsedError.message : ''}</pre>
      </div>
    );
  }
});

module.exports = LexErrorView;
