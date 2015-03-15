'use strict';

/** @jsx React.DOM */
var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var TreeArtist = require('../util/TreeArtist');
var TreeBuilder = require('../util/TreeBuilder');

var ParseTreeGraphView = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    var parserDebugger = this.props.parserDebugger || [];

    var root = TreeBuilder.buildTree(parserDebugger);

    var abstractSvg = TreeArtist.drawAbstractSvg(root);
    var svgHeight = abstractSvg.svgHeight;
    var svgWidth = abstractSvg.svgWidth;
    var allPathsAndNodes = abstractSvg.paths.slice().concat(abstractSvg.nodes);

    var transform = 'translate(' + (svgWidth / 2) + ',40)';

    var svgStyle = {
    };

    return (
      <svg style={svgStyle} width={svgWidth} height={svgHeight}>
        <g transform={transform}>
          {
            allPathsAndNodes.map(function (el, i) {

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

                if (node.subtitle) {
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
                  <g key={JSON.stringify(node)} className="tree-node" transform={translate}>
                    <title style={{fontFamily: 'monospace'}}>{node.output}</title>
                    <circle r="10"></circle>
                    {
                      labels.map(function (label, i) {
                        var labelKey = [label, i];
                        return (
                          <text
                            key={labelKey}
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

