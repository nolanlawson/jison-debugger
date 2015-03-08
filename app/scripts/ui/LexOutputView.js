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
    var ulStyle = {
      width: 400,
      height: 122,
      fontSize: 13,
      listStyleType: 'none'
    };

    var lexDebugger = this.state.lexDebugger || [];

    return (
      <ul style={ulStyle}>
        {
          lexDebugger.map(function (token) {
            return (
              <li style={{float: 'left'}}>
                <span
                  style={{display:'block'}}
                  className="label label-default">
                    {token.tokenText || 'EOF'}
                </span>
                <span
                  style={{display:'block'}}
                  className={"label label-" + Colorizer.getColorFor(token.tokenName)}>
                    {token.tokenName}
                </span>
              </li>
            )
          })
        }
      </ul>
    );
  }
});

module.exports = LexOutputView;

