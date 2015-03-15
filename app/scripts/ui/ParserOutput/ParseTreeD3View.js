'use strict';

/** @jsx React.DOM */
var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var TreeArtist = require('../util/TreeArtist');
var TreeBuilder = require('../util/TreeBuilder');

var ParseTreeD3View = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    var parserDebugger = this.props.parserDebugger || [];

    var root = TreeBuilder.buildTree(parserDebugger);

    var abstractSvg = TreeArtist.drawAbstractSvg(root);
    var svgHeight = abstractSvg.svgHeight;
    var svgWidth = abstractSvg.svgWidth;
    var allPathsAndNodes = abstractSvg.paths.slice().concat(abstractSvg.nodes);

    var transform = 'translate(' + (svgWidth / 2) + ',40)';

    return (
      <svg width="100%" height={svgHeight}>
        <g transform={transform}>
          {
            allPathsAndNodes.map(function (el) {

              if (el.drawFrom) { // path
                var path = el;
                var halfwayY = (path.drawFrom[1] + path.drawTo[1]) / 2;
                var d = 'M ' + path.drawFrom[0] + ',' + path.drawFrom[1] + ' ' +
                  'C' + path.drawFrom[0] + ',' + halfwayY + ' ' +
                  path.drawTo[0] + ',' + halfwayY + ' ' +
                  path.drawTo[0] + ',' + path.drawTo[1];
                return (
                  <path className="link" d={d}></path>
                )
              } else { // node
                var node = el;
                var translate = "translate(" + node.x + "," + node.y + ")";
                var textY = node.hasChildren ? -18 : 18;
                return (
                  <g className="node" transform={translate}>
                    <circle r="10"></circle>
                    <text y={textY} dy=".35em" textAnchor="middle">{node.name}</text>
                  </g>
                )
              }
            })
          }
        </g>
      </svg>
    );

/*
          <path className="link" d="M188.57142857142856,100C188.57142857142856,150 125.71428571428571,150 125.71428571428571,200"></path>
          <path className="link" d="M188.57142857142856,100C188.57142857142856,150 251.42857142857142,150 251.42857142857142,200"></path>
          <path className="link" d="M251.42857142857142,0C251.42857142857142,50 188.57142857142856,50 188.57142857142856,100"></path>
          <path className="link" d="M251.42857142857142,0C251.42857142857142,50 314.2857142857143,50 314.2857142857143,100"></path>
          <g className="node" transform="translate(314.2857142857143,100)">
            <circle r="10"></circle>
            <text y="18" dy=".35em" textAnchor="middle">Level 2: B</text>
          </g>
          <g className="node" transform="translate(251.42857142857142,200)">
            <circle r="10"></circle>
            <text y="18" dy=".35em" textAnchor="middle">Daughter of A</text>
          </g>
          <g className="node" transform="translate(125.71428571428571,200)">
            <circle r="10"></circle>
            <text y="18" dy=".35em" textAnchor="middle">Son of A</text>
          </g>
          <g className="node" transform="translate(188.57142857142856,100)">
            <circle r="10"></circle>
            <text y="-18" dy=".35em" textAnchor="middle">Level 2: A</text>
          </g>
          <g className="node" transform="translate(251.42857142857142,0)">
            <circle r="10"></circle>
            <text y="-18" dy=".35em" textAnchor="middle">Top Level</text>
          </g>
        </g>
      </svg>
    );
*/
    /*return (
      <pre>{JSON.stringify({nodes: nodes, paths: paths}, null, '  ')}</pre>
    );*/
  }
});

module.exports = ParseTreeD3View;

