'use strict';

/** @jsx React.DOM */

var React = window.React = require('react');
var Editor = require("./ui/Editor");
var mountNode = document.getElementById("app");

var App = React.createClass({
  render: function() {
    return (
        <Editor />
    );
  }
});


React.renderComponent(<App />, mountNode);

