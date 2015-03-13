'use strict';

/** @jsx React.DOM */

/* global blobUtil */

var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var GrammarErrorView = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    var style = {
      width: 400,
      height: 150,
      fontSize: 10,
      border: '2px solid #D9534F'
    };

    return (
      <pre style={style}>{this.props.compiledError.message}</pre>
    );
  }
});

module.exports = GrammarErrorView;
