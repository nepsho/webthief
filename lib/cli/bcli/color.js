"use strict";
const bcligen = require('./bcligen');

var backgroundClr = function(val,c){
    var clr = bcligen.genClr(c);
    var op = bcligen.getbcliOutput("bg",val,clr);
    return op;
}

var fontClr = function(val,c){
    var clr = bcligen.genClr(c);
    var op = bcligen.getbcliOutput("fg",val,clr);
    return op;
}

var fontInvClr = function(val){
    var op = bcligen.getbcliOutput("inv",val);
    return op;
}


var fontBold = function(val){
    var op = bcligen.getbcliOutput("bold",val);
    return op;
}

var fontItalic = function(val){
    var op = bcligen.getbcliOutput("italic",val);
    return op;
}

exports.bg = backgroundClr;

exports.fg = fontClr;

exports.inv = fontInvClr;

exports.bold = fontBold;

exports.italic = fontItalic;