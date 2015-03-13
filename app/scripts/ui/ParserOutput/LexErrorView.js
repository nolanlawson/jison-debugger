'use strict';

/** @jsx React.DOM */

var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var LexErrorView = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    var preStyle = {
      width: '100%',
      fontSize: 11,
      border: '2px solid #D9534F'
    };

    return (
      <div>
        <h5>Parser error</h5>
        <pre style={preStyle}>{this.props.parsedError ? this.props.parsedError.message : ''}</pre>
      </div>
    );
  }
});

module.exports = LexErrorView;
