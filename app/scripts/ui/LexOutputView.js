'use strict';

/** @jsx React.DOM */

var GrammarStore = require('../stores/GrammarStore');
var Colorizer = require('./Colorizer');

var LexOutputView = React.createClass({
  getInitialState: function () {
    var state = {
      lexDebugger: GrammarStore.getActiveLexDebugger()
    };
    return state;
  },
  componentWillMount() {
    GrammarStore.addChangeListener(this._onChange);
  },
  _onChange: function () {
    var state = {
      lexDebugger: GrammarStore.getActiveLexDebugger()
    };
    this.setState(state);
  },
  render: function () {

    var mainStyle = {
      width: 400,
      height: 122
    };

    var ulStyle = {
      listStyleType: 'none'
    };

    var lexDebugger = this.state.lexDebugger || [];

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
      marginLeft: 2
    };

    return (
      <div style={mainStyle}>
        <h5>Tokens</h5>
        <ul style={ulStyle}>
          {
            lexDebugger.map(function (token) {
              return (
                <li style={{float: 'left'}}>
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

