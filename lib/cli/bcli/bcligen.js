'use strict';
const util = require('util');
const bvalid = require('bvalid');

exports.genClr = function (c) {
  if (bvalid.isArray(c)) {
    if (bvalid.isNumber(c[0])) {
      var r = Math.abs(c[0]);
      r = Math.floor(c[0]);
      if (r > 255) {
        return '';
      }
    }
    if (bvalid.isNumber(c[1])) {
      var g = Math.abs(c[1]);
      g = Math.floor(c[1]);
      if (g > 255) {
        return '';
      }
    }
    if (bvalid.isNumber(c[2])) {
      var b = Math.abs(c[2]);
      b = Math.floor(c[2]);
      if (b > 255) {
        return '';
      }
    }
    return `${r};${g};${b}`;
  }
  return '';
};

var generateContentWithClr = function (type, val, clr) {
  var fop;
  var e_fop;
  var op = util.format(val);
  if (type == 'bg') {
    fop = '\u001B[48;2;' + clr + 'm';
    e_fop = '\u001B[49m';
  } else if (type == 'fg') {
    fop = '\u001B[38;2;' + clr + 'm';
    e_fop = '\u001B[39m';
  } else if (type == 'inv') {
    fop = '\u001B[7m';
    e_fop = '\u001B[27m';
  } else if (type == 'bold') {
    fop = '\u001B[1m';
    e_fop = '\u001B[22m';
  } else if (type == 'italic') {
    fop = '\u001B[3m';
    e_fop = '\u001B[23m';
  }
  for (var i = 0; i < op.length; i++) {
    fop += op[i];
  }
  fop += e_fop;
  return fop;
};

var createFreeSpace = function (n) {
  var op = '';
  for (var i = 0; i < n; i++) {
    op = op + '\u0020';
  }
  return op;
};

var makeOptimalBackSpace = function (val) {
  var need = 0;
  var op = '';
  try {
    var ipt = val.split(/\r?\n/);
    var ipt_new = val.split(/\r?\n/);
    ipt_new.sort(function (a, b) {
      return b.length - a.length;
    })[0];
    var max = ipt_new[0].length;
    if (ipt.length > 1) {
      op = ipt[0] + '\n';
      for (var i = 1; i < ipt.length; i++) {
        need = max - ipt[i].length;
        op += ipt[i] + createFreeSpace(need) + '\n';
      }
    }
  } catch (err) {
    return val;
  }
  return op;
};

exports.getbcliOutput = generateContentWithClr;
