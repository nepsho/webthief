"use strict";
const util = require('util');

const themeMap = {
    nepion : "16;13;49",
    dark : "0;0;0",
    bruno : "126;48;10"
}

function isValidData(variable){
    if((typeof variable === "undefined") ||
    ((typeof variable === "object") && (variable === null))){
      return false;
    }
    return true;
}

var isArray = function(variable){
    if(isValidData(variable) && variable instanceof Array) return true;
    return false;
}

var isNumber = function(variable){
    if(isValidData(variable) && (typeof variable === "number") 
    && (variable.constructor.name === 'Number')) return true;
    return false;
}

exports.genClr = function(c){
    if(isArray(c))
    {
        if(isNumber(c[0])) {
            var r = Math.abs(c[0]);
            r = Math.floor(c[0]);
            if(r>255)
            {
                return "";    
            }
        }
        if(isNumber(c[1])) {
            var g = Math.abs(c[1]);
            g = Math.floor(c[1]);
            if(g>255)
            {
                return "";    
            }
        }
        if(isNumber(c[2])) {
            var b = Math.abs(c[2]);
            b = Math.floor(c[2]);
            if(b>255)
            {
                return "";    
            }
        }
        return `${r};${g};${b}`;
    }
    return "";
}

var generateContentWithClr = function(type,val,clr)
{
    var fop;
    var e_fop;
    var op = util.format(val);
    if(type == "bg")
    {
        fop = "\u001B[48;2;" + clr + "m";
        e_fop = "\u001B[49m";
    } else 
    {
        fop = "\u001B[38;2;" + clr + "m";
        e_fop = "\u001B[39m";
    }
    for(var i = 0 ; i < op.length ; i++)
    {
        fop += op[i];
    }
    fop += e_fop;
    return fop;
}


var createFreeSpace = function(n)
{
    var op = "";
    for(var i = 0 ; i < n ; i++)
    {
        op = op + "\u0020";
    }
    return op;
}

var makeOptimalBackSpace = function(val)
{
    var need = 0;
    var op = "";
    try{
        var ipt = val.split(/\r?\n/);
        var ipt_new = val.split(/\r?\n/);
        ipt_new.sort(function (a, b) { return b.length - a.length })[0];
        var max = ipt_new[0].length;
        if(ipt.length > 1)
        {   
            op = ipt[0] + "\n";
            for(var i = 1 ; i < ipt.length ; i++)
            {
                need = max - ipt[i].length;
                op += ipt[i] + createFreeSpace(need) + "\n";
            }
        }
    }
    catch(err)
    {
        return val
    }
    return op;
}


exports.themeMaker = function(type,val)
{
    val = makeOptimalBackSpace(val);
    var op;
    if(type == "A" || type == "a" || type == 1)
    {
        op = generateContentWithClr("bg",val,themeMap["nepion"]);
    } else if(type == "B" || type == "b" || type == 2)
    {
        op = generateContentWithClr("bg",val,themeMap["dark"]);
    } else if(type == "C" || type == "c" || type == 3)
    {
        op = generateContentWithClr("bg",val,themeMap["bruno"]);
    }
    return op;
}

exports.getbcliOutput = generateContentWithClr;