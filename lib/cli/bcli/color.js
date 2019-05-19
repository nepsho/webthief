"use strict";
const bcligen = require('./bcligen');

var backgroundClr = function(val,c){
    var clr = bcligen.genClr(c);
    var op = bcligen.getbcliOutput("bg",val,clr);
    return op;
}

var foregroundClr = function(val,c){
    var clr = bcligen.genClr(c);
    var op = bcligen.getbcliOutput("fg",val,clr);
    return op;
}

var themeA = function(val)
{
    return bcligen.themeMaker("A",val);
}

var themeB = function(val)
{
    return bcligen.themeMaker("B",val);
}

var themeC = function(val)
{
    return bcligen.themeMaker("C",val);
}

exports.bg = backgroundClr;

exports.fg = foregroundClr;

exports.theme = {
    nepion : themeA,
    dark : themeB,
    bruno : themeC
}