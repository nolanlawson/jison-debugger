'use strict';

/** @jsx React.DOM */

/* global blobUtil */

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
  componentWillUnmount() {
    GrammarStore.removeChangeListener(this._onChange);
  },
  _onChange: function () {
    var state = {
      compiledError: GrammarStore.getActiveCompiledError(),
      compiledGrammar: GrammarStore.getActiveCompiledGrammar()
    };
    this.setState(state);
  },
  download: function () {
    var parser = GrammarStore.getActiveCompiledParser();
    var blob = blobUtil.createBlob([parser],
      {type: 'text/javascript'}
    );
    window.open(blobUtil.createObjectURL(blob));
  },
  downloadJSON: function () {
    var grammar = GrammarStore.getActiveCompiledGrammar();
    var blob = blobUtil.createBlob(
      [JSON.stringify(grammar, null, '  ')],
      {type: 'application/json'}
    );
    window.open(blobUtil.createObjectURL(blob));
  },
  render: function () {
    var style = {
      width: 400,
      height: 150,
      fontSize: 10
    };

    var display;
    if (this.state.compiledError) {
      display = this.state.compiledError.message;
      style.border = '2px solid #D9534F';
    } else if (this.state.compiledGrammar) {
      display = JSON.stringify(this.state.compiledGrammar, null, '  ');
    } else {
      display = '';
    }

    return (
      <div>
        <h5>Compiled grammar</h5>
        <pre style={style}>{display}</pre>
        <div>
          <button
            className={"btn btn-primary " + (this.state.compiledError ? 'disabled' : '')}
            title="Download a Jison parser that will create a window.parser object"
            type="button"
            onClick={this.download}
          >
              Download as JavaScript
          </button>
          <button
            style={{marginLeft: 5}}
            className={"btn " + (this.state.compiledError ? 'disabled' : '')}
            title="Download the JSON grammar you see here. You will need to create it with new Jison.Parser(grammar)"
            type="button"
            onClick={this.downloadJSON}
          >
              Download as JSON
          </button>
        </div>
      </div>
    );
  }
});

module.exports = GrammarView;
