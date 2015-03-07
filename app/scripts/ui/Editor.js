'use strict';

/** @jsx React.DOM */
var React = require('react');

var Editor = React.createClass({
    getInitialState: function () {
        return {text: 'some text'};
    },
    handleChange: function(event) {
        this.setState({text: event.target.value});
    },
    render: function () {
        return (
            <textarea value={this.state.text} onChange={this.handleChange}></textarea>
        )
    }
});

module.exports = Editor;

