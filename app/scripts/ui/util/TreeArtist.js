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

  var xIncrement = 60; // really a minimum. may expand if nodes have verbose text
  var yIncrement = 50;
  var svgHeight = ((maxDepth + 1) * yIncrement);
  var yPadding = 40;


  function calculateNeededXIncrement(node) {
    var estimatedNeededWidth = Math.max(node.name.length,
      node.subtitle ? node.subtitle.length : 0);
    estimatedNeededWidth *= 7; // 14px
    if (estimatedNeededWidth > xIncrement) {
      xIncrement = estimatedNeededWidth;
    }
    if (node.children) {
      node.children.forEach(function (child, i) {
        calculateNeededXIncrement(child);
      });
    }
  }

  calculateNeededXIncrement(root);

  function calculateSubtreeWidth(node) {
    node.width = 0;
    if (node.children) {
      node.children.forEach(function (child, i) {
        calculateSubtreeWidth(child);
        node.width += child.width;
        if (i > 0) {
          node.width += xIncrement;
        }
      });
    }
  }

  calculateSubtreeWidth(root);

  function generate(treeNode, depth, x) {
    var y = depth * yIncrement;
    var children = treeNode.children;
    nodes.push({
      name: treeNode.name,
      subtitle: treeNode.subtitle,
      output: treeNode.output,
      x: x,
      y: y,
      hasChildren: !!children
    });
    if (!children) {
      return;
    }

    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      var childX = 0;
      for (var j = 0; j < i; j++) {
        childX += children[j].width;
        childX += xIncrement;
      }
      childX += (child.width / 2);
      childX = x + (childX - (treeNode.width / 2));
      generate(child, depth + 1, childX);
      paths.push({
        drawFrom: [x, y],
        drawTo: [childX, (depth + 1) * yIncrement]
      });
    }
  }

  generate(root, 0, xIncrement + (root.width / 2));

  var result = {
    paths: paths,
    nodes: nodes,
    svgHeight: svgHeight + yPadding,
    svgWidth: root.width + (xIncrement * 2)
  };

  return result;
}

module.exports = {
  drawAbstractSvg: drawAbstractSvg
};
