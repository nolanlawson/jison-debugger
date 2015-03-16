'use strict';

/** @jsx React.DOM */

var PureRenderMixin = require('React/addons').addons.PureRenderMixin;
var Colorizer = require('./../util/Colorizer');
var safeStringify = require('../../util/util').safeStringify;

function createKey(token, i) {
  return JSON.stringify([safeStringify(token), i]);
}

var LexOutputView = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {

    var mainStyle = {
    };

    var ulStyle = {
      listStyleType: 'none',
      fontFamily: 'monospace',
      paddingLeft: 0
    };

    var lexDebugger = this.props.lexDebugger || [];

    return (
      <div style={mainStyle}>
        <h5>Tokens</h5>
        <ul style={ulStyle}>
          {
            lexDebugger.map(function (token, i) {
              var displayText = token.tokenText || 'EOF';
              if (/^\s+$/.test(displayText)) { // whitespace
                displayText = '\u00A0'; // nbsp, so it gets the proper height
              }
              return (
                <li key={createKey(token, i)} style={{display: 'inline-block'}}>
                  <span
                    className="label label-default token-text">
                      {displayText}
                  </span>
                  <span
                    style={{backgroundColor: Colorizer.getColorFor(token.tokenName)}}
                    className="label token-name"
                    >
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

