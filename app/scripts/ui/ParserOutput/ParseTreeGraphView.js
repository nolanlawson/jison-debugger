'use strict';

/** @jsx React.DOM */
var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var TreeArtist = require('../util/TreeArtist');
var TreeBuilder = require('../util/TreeBuilder');
var Colorizer = require('./../util/Colorizer');

var ParseTreeGraphView = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function () {
    return {expanded: false};
  },
  _toggleExpanded: function () {
    this.setState({expanded: !this.state.expanded});
  },
  render: function () {
    var parserDebugger = this.props.parserDebugger || [];

    var root = TreeBuilder.buildTree(parserDebugger);

    var abstractSvg = TreeArtist.drawAbstractSvg(root);
    var svgHeight = abstractSvg.svgHeight + abstractSvg.yPadding;
    var svgWidth = abstractSvg.svgWidth;
    var yOffset = abstractSvg.yOffset;
    var allPathsAndNodes = abstractSvg.paths.slice().concat(abstractSvg.nodes);

    var transform = 'translate(0,' + yOffset + ')';

    // viewBox basically makes the SVG auto-responsive. 2015 is amazing.
    var viewBox = "0 0 " + svgWidth + " " + svgHeight;

    function renderPath(path) {
      var halfwayY = (path.drawFrom[1] + path.drawTo[1]) / 2;
      var d = 'M ' + path.drawFrom[0] + ',' + path.drawFrom[1] + ' ' +
        'C' + path.drawFrom[0] + ',' + halfwayY + ' ' +
        path.drawTo[0] + ',' + halfwayY + ' ' +
        path.drawTo[0] + ',' + path.drawTo[1];

      return (
        <path key={JSON.stringify(path)} className="tree-link" d={d}></path>
      )
    }

    function renderNode(node) {
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

    var svgStyle = {
      width: '100%',
      maxHeight: svgHeight
    };

    var containerStyle = {
      position: 'relative'
    };

    var buttonStyle = {
      position: 'absolute',
      right: 20,
      bottom: 0,
      padding: '3px 5px 0px 5px'
    };

    var innerButtonStyle = {
      position: 'absolute',
      right: 20,
      top: 15,
      padding: '2px 9px 0px 9px',
      color: '#777'
    };

    var modalStyle = {
      position: 'fixed',
      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.2)',
      borderRadius: 6,
      top: 20,
      left: 20,
      right: 20,
      bottom: 20,
      zIndex: 999999,
      paddingTop: 60,
      paddingBottom: 60,
      textAlign: 'center'
    };

    var modalSvgStyle = {
      height: '100%',
      maxWidth: '100%'
    };

    return (
      <div style={containerStyle}>
        <svg version="1.1"
             preserveAspectRatio="xMinYMin meet"
             viewBox={viewBox}
             style={svgStyle}>
          <g transform={transform}>
            {
              allPathsAndNodes.map(function (el) {

                if (el.drawFrom) { // path
                  return renderPath(el);
                } else { // node
                  return renderNode(el);
                }
              })
            }
          </g>
        </svg>
       { this.state.expanded &&
         (
           <div>
             <div className="modal-backdrop"></div>
             <div style={modalStyle}>
               <svg version="1.1"
                    preserveAspectRatio="xMinYMin meet"
                    viewBox={viewBox}
                    style={modalSvgStyle}>
                 <g transform={transform}>
                  {
                    allPathsAndNodes.map(function (el) {
                      return el.drawFrom ? renderPath(el) : renderNode(el);
                    })
                  }
                 </g>
               </svg>
               <button onClick={this._toggleExpanded}
                 style={innerButtonStyle}
                 type="button"
                 className="btn btn-default"
                 aria-label="close">
                   <span style={{fontSize: 24, fontWeight: 'bold', fontFamily: 'monospace'}}>&times;</span>
                 </button>
             </div>
           </div>
         )
       }

        <button onClick={this._toggleExpanded}
                style={buttonStyle}
                type="button"
                className="btn btn-default btn-fullscreen"
                aria-label="expand">
          <svg version="1.1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 100 100">
            <path className="fullscreen-stroke" d="M100,91.748V69c0-3.866-3.134-7-7-7s-7,3.134-7,7v7.101L69.808,59.908c-2.734-2.734-7.166-2.734-9.899,0  c-2.734,2.734-2.734,7.166,0,9.9L76.101,86H69c-3.866,0-7,3.134-7,7c0,3.866,3.134,7,7,7h22.748c2.252,0,4.62-0.185,6.344-1.908  S100,94.019,100,91.748z"/>
            <path className="fullscreen-stroke" d="M0,91.748V69c0-3.866,3.134-7,7-7s7,3.134,7,7v7.101l16.121-16.192c2.734-2.734,7.13-2.734,9.864,0  c2.734,2.734,2.716,7.166-0.018,9.9L23.757,86h7.101c3.866,0,7,3.134,7,7c0,3.866-3.134,7-7,7H8.11  c-2.252,0-4.549-0.185-6.273-1.908S0,94.019,0,91.748z"/>
            <path className="fullscreen-stroke" d="M100,8.11v22.748c0,3.866-3.134,7-7,7s-7-3.134-7-7v-7.101L69.808,39.95c-2.734,2.734-7.166,2.734-9.899,0  c-2.734-2.734-2.734-7.095,0-9.828L76.101,14H69c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7h22.748c2.252,0,4.62,0.114,6.344,1.837  S100,5.839,100,8.11z"/>
            <path className="fullscreen-stroke" d="M0,8.11v22.748c0,3.866,3.134,7,7,7s7-3.134,7-7v-7.101L30.121,39.95c2.734,2.734,7.13,2.734,9.864,0  c2.734-2.734,2.716-7.095-0.018-9.828L23.757,14h7.101c3.866,0,7-3.134,7-7c0-3.866-3.134-7-7-7H8.11  C5.858,0,3.561,0.114,1.837,1.837S0,5.839,0,8.11z"/>
          </svg>
        </button>
      </div>
    );
  }
});

module.exports = ParseTreeGraphView;

