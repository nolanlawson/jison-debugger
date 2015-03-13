'use strict';

/** @jsx React.DOM */

var React = window.React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var mountNode = document.getElementById('app');

var Editor = require("./ui/Editor/Editor");
var GrammarView = require("./ui/GrammarOutput/GrammarView");
var ParserOutputView = require("./ui/ParserOutput/ParserOutputView");
var GrammarInputStore = require('./stores/GrammarInputStore');
var GrammarOutputStore = require('./stores/GrammarOutputStore');
var ParserOutputStore = require('./stores/ParserOutputStore');
var ParserWorkerService = require('./data/ParserWorkerService');


var App = React.createClass({
  mixins: [PureRenderMixin],
  componentWillMount() {
    GrammarInputStore.addChangeListener(this._onGrammarInputChange);
    GrammarOutputStore.addChangeListener(this._onGrammarOutputChange);
    ParserOutputStore.addChangeListener(this._onParserOutputChange);
  },
  componentWillUnmount() {
    GrammarInputStore.removeChangeListener(this._onGrammarInputChange);
    GrammarOutputStore.removeChangeListener(this._onGrammarOutputChange);
    ParserOutputStore.removeChangeListener(this._onParserOutputChange);
  },
  getInitialState: function () {
    return this._getState();
  },
  _onGrammarInputChange: function () {
    this.replaceState(this._getState());
    if (GrammarOutputStore.getActiveCompiledGrammar()) {
      // current grammar is valid
      ParserWorkerService.parseText(GrammarInputStore.getActiveTextToParse());
    }
  },
  _onGrammarOutputChange: function () {
    this.replaceState(this._getState());
    if (GrammarOutputStore.getActiveCompiledGrammar()) {
      // current grammar is valid
      ParserWorkerService.parseText(GrammarInputStore.getActiveTextToParse());
    }
  },
  _onParserOutputChange: function () {
    this.replaceState(this._getState());
  },
  _getState: function () {
    return {
      grammar: GrammarInputStore.getActiveGrammar(),
      textToParse: GrammarInputStore.getActiveTextToParse(),
      compiledError: GrammarOutputStore.getActiveCompiledError(),
      compiledGrammar: GrammarOutputStore.getActiveCompiledGrammar(),
      compiledParser: GrammarOutputStore.getActiveCompiledParser(),
      parsedError: ParserOutputStore.getActiveParsedError(),
      parsedResult: ParserOutputStore.getActiveParsedResult(),
      parserDebugger: ParserOutputStore.getActiveParserDebugger(),
      lexDebugger: ParserOutputStore.getActiveLexDebugger()
    };
  },
  render: function () {
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
      <div className="row">
        <div className="col-md-5">
          <Editor {...editorProps}/>
        </div>
        <div className="col-md-7">
          <GrammarView {...grammarViewProps}/>
          <ParserOutputView {...parserOutputProps}/>
        </div>
      </div>
    );
  }
});

React.render(<App />, mountNode);

