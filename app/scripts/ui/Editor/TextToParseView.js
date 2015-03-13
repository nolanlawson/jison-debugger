'use strict';

/** @jsx React.DOM */
var React = require('react');
var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var ParserActionCreator = require('../../actions/ParserActionCreator');
var UserInputActionCreator = require('../../actions/UserInputActionCreator');

var TextToParseView = React.createClass({
  mixins: [PureRenderMixin],
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
        <h5>Parse some text</h5>
        <input
          style={inputStyle}
          type="text"
          value={this.props.textToParse}
          onChange={this.handleTextToParseChange}>
        </input>
      </div>
    )
  }
});

module.exports = TextToParseView;
