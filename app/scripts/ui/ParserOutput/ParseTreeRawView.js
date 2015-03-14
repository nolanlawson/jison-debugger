'use strict';

/** @jsx React.DOM */
var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var safeStringify = require('../../util/util').safeStringify;

var ParseTreeRawView = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {

    var preStyle = {
      width: '100%',
      fontSize: 11
    };

    var parserDebugger = this.props.parserDebugger || [];

    var text = parserDebugger.map(function (step) {
      var res = '';
      if (step.action === 'reduce') {
        res += ' --> ';
      }
      res += step.action + ': ' + safeStringify(step.text);
      if (step.action === 'reduce') {
        res += ' (' + step.nonterminal + ' -> ' + JSON.stringify(step.productions) + ')';
      } else if (step.action === 'shift') {
        res += ' (' + step.terminal + ')';
      }
      return res;
    }).join('\n');
    return (
      <pre style={preStyle}>{text}</pre>
    );
  }
});

module.exports = ParseTreeRawView;

