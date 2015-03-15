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
  _useRaw: function () {
    this.setState({raw: true});
  },
  _useTree: function () {
    this.setState({raw: false});
  },
  render: function () {

    var linkStyle = {cursor: 'pointer', marginLeft: 10};

    if (this.state.raw) {
      return (
        <div>
          <div>
            <h5 style={{display: 'inline-block'}}>Parse tree</h5>
            <a style={linkStyle} onClick={this._useTree} className="text-muted">
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
          <a style={linkStyle} onClick={this._useRaw} className="text-muted">
            Show log
          </a>
        </div>
        <ParseTreeGraphView {...this.props} />
      </div>
    );
  }
});

module.exports = ParseTreeView;

