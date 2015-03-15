'use strict';

/** @jsx React.DOM */

var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var ParsedResultView = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    var style = {
      width: '100%',
      fontSize: 12
    };

    var parsedResult = this.props.parsedResult || '';
    return (
      <div style={style}>
        <h5>Parser result</h5>
        <pre>{parsedResult}</pre>
      </div>
    );

  }
});

module.exports = ParsedResultView;


