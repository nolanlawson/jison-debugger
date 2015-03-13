'use strict';

/** @jsx React.DOM */

/* global blobUtil */

var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var GrammarSuccessView = require('./GrammarSuccessView');
var GrammarErrorView = require('./GrammarErrorView');

var GrammarView = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    if (this.props.compiledError) {
      return (
        <div>
          <h5>Grammar error</h5>
          <GrammarErrorView compiledError={this.props.compiledError} />
        </div>
      )
    } else {
      return (
        <div>
          <h5>Compiled grammar</h5>
          <GrammarSuccessView
            compiledGrammar={this.props.compiledGrammar}
            compiledParser={this.props.compiledParser}
            />
        </div>
      )
    }
  }
});

module.exports = GrammarView;
