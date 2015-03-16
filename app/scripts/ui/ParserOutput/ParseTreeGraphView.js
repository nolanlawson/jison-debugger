'use strict';

/** @jsx React.DOM */
var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var TreeArtist = require('../util/TreeArtist');
var TreeBuilder = require('../util/TreeBuilder');
var Colorizer = require('./../util/Colorizer');

var ParseTreeGraphView = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function () {
    return {zoom: 1}
  },
  render: function () {
    var parserDebugger = this.props.parserDebugger || [];

    var root = TreeBuilder.buildTree(parserDebugger);

    var abstractSvg = TreeArtist.drawAbstractSvg(root);
    var svgHeight = abstractSvg.svgHeight;
    var svgWidth = abstractSvg.svgWidth;
    var allPathsAndNodes = abstractSvg.paths.slice().concat(abstractSvg.nodes);

    var svgStyle = {
      width: '100%',
      maxHeight: svgHeight
    };

    var zoom = this.state.zoom;
    var yOffset = 40;
    var xOffset = 0;

    if (this.state.zoom !== 1) {
      svgStyle.transform = svgStyle.webkitTransform = 'scale3d(' + zoom + ',' + zoom + ',1)';
    }

    var transform = 'translate(' + (xOffset * zoom ) + ',' + (yOffset * zoom) + ')';

    // viewBox basically makes the SVG auto-responsive. 2015 is amazing.
    var viewBox = "0 0 " + svgWidth + " " + svgHeight;

    return (
      <svg version="1.1"
           preserveAspectRatio="xMinYMin meet"
           viewBox={viewBox}
           style={svgStyle}>
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
                  <path key={JSON.stringify(path)} className="tree-link" d={d}></path>
                )
              } else { // node
                var node = el;
                var translate = "translate(" + node.x + "," + node.y + ")";

                var labels = [{
                  value: node.name,
                  y: -20,
                  style: {
                    fontSize: 14,
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
                  }
                }];

                var nodeStyle = {};
                if (node.subtitle) {
                  // terminal
                  nodeStyle.stroke = Colorizer.getColorFor(node.name);
                  labels.push({
                    value: node.subtitle,
                    y: 20,
                    style: {
                      fontSize: 14,
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
                    }
                  });
                }

                return (
                  <g key={JSON.stringify(node)}
                      className="tree-node"
                      transform={translate}>
                    <title style={{fontFamily: 'monospace'}}>{node.output}</title>
                    <circle style={nodeStyle} r="10"></circle>
                    {
                      labels.map(function (label, i) {
                        var labelKey = [label, i];
                        return (
                          <text key={labelKey}
                              style={label.style}
                              y={label.y}
                              dy=".35em"
                              textAnchor="middle">
                            {label.value}
                          </text>
                        )
                      })
                    }
                  </g>
                )
              }
            })
          }
        </g>
      </svg>
    );
  }
});

module.exports = ParseTreeGraphView;

