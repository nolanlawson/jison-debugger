'use strict';

/** @jsx React.DOM */

/* global blobUtil */

var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var GrammarView = React.createClass({
  mixins: [PureRenderMixin],
  download: function () {
    var parser = this.props.compiledParser;
    var blob = blobUtil.createBlob([parser],
      {type: 'text/javascript'}
    );
    window.open(blobUtil.createObjectURL(blob));
  },
  downloadJSON: function () {
    var grammar = this.props.compiledGrammar;
    var blob = blobUtil.createBlob(
      [JSON.stringify(grammar, null, '  ')],
      {type: 'application/json'}
    );
    window.open(blobUtil.createObjectURL(blob));
  },
  render: function () {
    var style = {
      width: 400,
      height: 150,
      fontSize: 10
    };

    var display;
    if (this.props.compiledError) {
      display = this.props.compiledError.message;
      style.border = '2px solid #D9534F';
    } else if (this.props.compiledGrammar) {
      display = JSON.stringify(this.props.compiledGrammar, null, '  ');
    } else {
      display = '';
    }

    return (
      <div>
        <h5>Compiled grammar</h5>
        <pre style={style}>{display}</pre>
        <div>
          <button
            className={"btn btn-primary " + (this.props.compiledError ? 'disabled' : '')}
            title="Download a Jison parser that will create a window.parser object"
            type="button"
            onClick={this.download}
          >
              Download as JavaScript
          </button>
          <button
            style={{marginLeft: 5}}
            className={"btn " + (this.props.compiledError ? 'disabled' : '')}
            title="Download the JSON grammar you see here. You will need to create it with new Jison.Parser(grammar)"
            type="button"
            onClick={this.downloadJSON}
          >
              Download as JSON
          </button>
        </div>
      </div>
    );
  }
});

module.exports = GrammarView;
