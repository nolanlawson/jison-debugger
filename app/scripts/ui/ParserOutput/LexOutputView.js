'use strict';

/** @jsx React.DOM */

var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var Colorizer = require('./../util/Colorizer');

function createKey(token, i) {
  return JSON.stringify([token, i]);
}

var LexOutputView = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {

    var mainStyle = {
      width: 400
    };

    var ulStyle = {
      listStyleType: 'none',
      fontFamily: 'monospace',
      maxHeight: 100,
      paddingLeft: 0
    };

    var lexDebugger = this.props.lexDebugger || [];

    var tokenTextStyle = {
      fontWeight: 'normal',
      display:'block',
      fontSize: 13,
      marginLeft: 2,
      marginBottom: 2
    };

    var tokenNameStyle = {
      fontWeight: 'normal',
      display:'block',
      fontSize: 13,
      marginLeft: 2,
      marginBottom: 2
    };

    return (
      <div style={mainStyle}>
        <h5>Tokens</h5>
        <ul style={ulStyle}>
          {
            lexDebugger.map(function (token, i) {
              return (
                <li key={createKey(token, i)} style={{display: 'inline-block'}}>
                  <span
                    style={tokenTextStyle}
                    className="label label-default">
                      {token.tokenText || 'EOF'}
                  </span>
                  <span
                    style={tokenNameStyle}
                    className={"label label-" + Colorizer.getColorFor(token.tokenName)}>
                      {token.tokenName}
                  </span>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
});

module.exports = LexOutputView;

