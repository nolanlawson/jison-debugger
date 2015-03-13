'use strict';

// give each token type a relatively unique color
var colors = [
  'primary',
  'success',
  'info',
  'warning',
  'danger'
];
var colorIdx = 0;
var tokenNamesToColors = {};

function getColorFor(tokenName) {
  if (!tokenNamesToColors[tokenName]) {
    tokenNamesToColors[tokenName] = colors[colorIdx];
    colorIdx++;
    if (colorIdx == colors.length) {
      colorIdx = 0; // wrap back around
    }
  }

  return tokenNamesToColors[tokenName];
}

module.exports = {
  getColorFor: getColorFor
};
