'use strict';

/** @jsx React.DOM */
var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var ParseTreeRawView = require('./ParseTreeRawView');
var ParseTreeGraphView = require('./ParseTreeGraphView');

var ParseTreeView = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function () {
    return {raw: false}
  },
  _toggleRaw: function () {
    this.setState({raw: !this.state.raw});
  },
  render: function () {
    if (this.state.raw) {
      return (
        <div>
          <div>
            <h5 style={{display: 'inline-block'}}>Parse tree</h5>
            <a onClick={this._toggleRaw} className="text-muted muted-link">
              Show graph
            </a>
          </div>
          <ParseTreeRawView {...this.props} />
        </div>
      )
    }

    return (
      <div>
        <div>
          <h5 style={{display: 'inline-block'}}>Parse tree</h5>
          <a onClick={this._toggleRaw} className="text-muted muted-link">
            Show log
          </a>
        </div>
        <ParseTreeGraphView {...this.props} />
      </div>
    );
  }
});

module.exports = ParseTreeView;

