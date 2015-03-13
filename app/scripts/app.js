'use strict';

/** @jsx React.DOM */

var React = window.React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var mountNode = document.getElementById('app');

var Editor = require("./ui/Editor/Editor");
var GrammarView = require("./ui/GrammarOutput/GrammarView");
var ParserOutputView = require("./ui/ParserOutput/ParserOutputView");
var GrammarStore = require('./stores/GrammarStore');
var ParserWorkerService = require('./data/ParserWorkerService');

var App = React.createClass({
  mixins: [PureRenderMixin],
  componentWillMount() {
    GrammarStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    GrammarStore.removeChangeListener(this._onChange);
  },
  getInitialState: function () {
    return this._getState();
  },
  _onChange: function () {
    this.replaceState(this._getState());
    if (GrammarStore.getActiveCompiledGrammar()) {
      // current grammar is valid
      ParserWorkerService.parseText(GrammarStore.getActiveTextToParse());
    }
  },
  _getState: function () {
    return {
      grammar: GrammarStore.getActiveGrammar(),
      textToParse: GrammarStore.getActiveTextToParse(),
      compiledError: GrammarStore.getActiveCompiledError(),
      compiledGrammar: GrammarStore.getActiveCompiledGrammar(),
      compiledParser: GrammarStore.getActiveCompiledParser(),
      parsedError: GrammarStore.getActiveParsedError(),
      parsedResult: GrammarStore.getActiveParsedResult(),
      parserDebugger: GrammarStore.getActiveParserDebugger(),
      lexDebugger: GrammarStore.getActiveLexDebugger()
    };
  },
  render: function () {
    var liStyle = {
      display: 'inline-block',
      verticalAlign: 'top',
      paddingLeft: 5,
      paddingRight: 5
    };

    var editorProps = {
      grammar: this.state.grammar,
      textToParse: this.state.textToParse
    };

    var grammarViewProps = {
      compiledError: this.state.compiledError,
      compiledGrammar: this.state.compiledGrammar,
      compiledParser: this.state.compiledParser
    };

    var parserOutputProps = {
      parsedError: this.state.parsedError,
      parsedResult: this.state.parsedResult,
      lexDebugger: this.state.lexDebugger,
      parserDebugger: this.state.parserDebugger,
      compiledGrammar: this.state.compiledGrammar
    };

    return (
        <ul style={{listStyleType: 'none'}}>
          <li style={liStyle}>
            <Editor {...editorProps}/>
          </li>
          <li style={liStyle}>
            <div>
              <GrammarView {...grammarViewProps}/>
              <ParserOutputView {...parserOutputProps}/>
            </div>
          </li>
        </ul>
    );
  }
});

React.render(<App />, mountNode);

