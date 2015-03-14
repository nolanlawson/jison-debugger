'use strict';

/** @jsx React.DOM */
var React = require('react');
var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var GrammarActionCreator = require('../../actions/GrammarActionCreator');
var UserInputActionCreator = require('../../actions/UserInputActionCreator');

var constants = require('../../util/constants');
var sampleGrammars = constants.SAMPLE_GRAMMARS;

var SampleGrammarLoader = React.createClass({
  mixins: [PureRenderMixin],
  handleChange: function (event) {
    var sampleGrammarName = event.target.value;
    var sampleGrammar = sampleGrammars.filter(function (grammar) {
      return grammar.name == sampleGrammarName;
    })[0];

    if (!sampleGrammar) {
      // user chose the "choose a..." option
      return;
    }


    UserInputActionCreator.updateGrammar(sampleGrammar.grammar);
    UserInputActionCreator.updateTextToParse(sampleGrammar.sampleText);
    GrammarActionCreator.compileGrammar(sampleGrammar.grammar);
    GrammarActionCreator.changeGrammarSignificantly();
  },
  render: function () {
    var style = {
      width: '100%'
    };

    return (
      <div>
        <h5>Load a sample grammar</h5>
        <select name="sample-grammar" style={style} onChange={this.handleChange}>
          <option>Choose a grammar&hellip;</option>
          {
            sampleGrammars.map(function (sampleGrammar) {
              return (
                <option
                  key={sampleGrammar.name}
                  value={sampleGrammar.name}
                  >
                  {sampleGrammar.name}
                </option>
              )
            })
          }
        </select>
      </div>
    )
  }
});

module.exports = SampleGrammarLoader;
