'use strict';

function drawAbstractSvg(root) {

  var maxDepth = 0;
  var nodes = [];
  var paths = [];

  function calculateDepth(node, depth) {
    if (depth > maxDepth) {
      maxDepth = depth;
    }
    if (!node.children) {
      return;
    }
    node.children.forEach(function (child) {
      calculateDepth(child, depth + 1);
    });
  }

  calculateDepth(root, 0);

  var svgWidth = 500;
  var xIncrement = 200;
  var yIncrement = 100;
  var svgHeight = 80 + ((maxDepth + 1) * yIncrement);

  function generate(treeNode, depth, x) {
    var y = depth * yIncrement;
    var children = treeNode.children;
    nodes.push({
      name: treeNode.name,
      x: x,
      y: y,
      hasChildren: !!children
    });
    if (!children) {
      return;
    }
    var parentCenter = (children.length - 1) / 2;
    children.forEach(function (child, i) {
      var childX = x + ((i - parentCenter) * xIncrement);
      generate(child, depth + 1, childX);
      paths.push({
        drawFrom: [x, y],
        drawTo: [childX, (depth + 1) * yIncrement]
      });
    });
  }

  generate(root, 0, svgWidth / 2);

  var result = {
    paths: paths,
    nodes: nodes,
    svgHeight: svgHeight
  };

  return result;
}

module.exports = {
  drawAbstractSvg: drawAbstractSvg
};
