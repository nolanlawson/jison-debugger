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
    var preStyle = {fontSize: 11, border: '2px solid #D9534F'};
    
    return (
      <div>
        <h5>Parser error</h5>
        <pre style={preStyle}>{this.state.parsedError ? this.state.parsedError.message : ''}</pre>
      </div>
    );
  }
});

module.exports = LexErrorView;
