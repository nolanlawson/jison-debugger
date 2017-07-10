'use strict';

/** @jsx React.DOM */
var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ParserActionCreator = require('../../actions/ParserActionCreator');
var UserInputActionCreator = require('../../actions/UserInputActionCreator');

var TextToParseView = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function () {
    return {multiline: false};
  },
  _toggleMultiline: function () {
    this.setState({multiline: !this.state.multiline});
  },
  handleTextToParseChange: function (event) {
    var text = event.target.value;
    UserInputActionCreator.updateTextToParse(text);
    ParserActionCreator.parseText(text);
  },
  render: function () {

    var inputStyle = {
      width: '100%'
    };

    return (
      <div>
        <div>
          <h5 style={{display: 'inline-block'}}>Parse some text</h5>
          <a onClick={this._toggleMultiline} className="text-muted muted-link">
            {this.state.multiline ? 'Single-line' : 'Multiline'}
          </a>
        </div>
        { this.state.multiline ?
          (
            <textarea
              style={inputStyle}
              type="text"
              value={this.props.textToParse}
              onChange={this.handleTextToParseChange}>
            </textarea>
          )
          :
          (
            <input
              style={inputStyle}
              type="text"
              value={this.props.textToParse}
              onChange={this.handleTextToParseChange}>
            </input>
          )
        }
      </div>
    )
  }
});

module.exports = TextToParseView;
