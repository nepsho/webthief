#!/usr/bin/env node
const Validation = require("../helper/Validation");
const webthief = require("../../index");
const color = require("./bcli/color");
const logo = require("../helper/logo");

var args = process.argv.slice(2);       

var f = args[0];
var i = args[1];
var o = args[2];
var _bs = "\u0020";
if((Validation.isString(f) && Validation.isString(i)) == false)
{
  process.stdout.write(color.fg(logo.cli_logo,[27, 194, 19])+"\n");
  process.exit(1);
} else
{
  if(f.trim().length === 0 || i.trim().length === 0)
  {
    process.exit(1);
  }
  f = f.trim().toLowerCase();
  i = i.trim();
}

process.stdout.write(color.fg(logo.cli_logo_op,[27, 194, 19])+"\n");

function showOutput(obj){
  try{
    if(Validation.isObject(obj))
    {
      var keys = Object.keys(obj);
      var opLine;
      var op_nf_txt;
      for(var i = 0 ; i < keys.length ; i++)
      {
        opLine = "";
        keys[i] = String(keys[i]);
        opLine += color.fg(keys[i],[255,255,255])+"\u0020➡\u0020\u0020";
        if(Validation.isString(obj[keys[i]]) || Validation.isNumber(obj[keys[i]]))
        {
          obj[keys[i]] = String(obj[keys[i]]);
          if(obj[keys[i]].trim().length != 0)
          {
            opLine += "\u0020" + color.fg('"' +obj[keys[i]]+ '"',[0,255,0]);
          } else 
          {
            opLine += "\u0020" + color.fg("Not found",[0,255,0]);
          }
        } else 
        {
          op_nf_txt = "\u0020" + color.fg("Not found",[0,255,0]);
          opLine += color.italic(op_nf_txt);
        }
        console.log(opLine);
      }
    }
  } catch(err){
    console.log(obj);
  }
}

function showErrorOutput(obj){
  var errorMsg = "";
  errorMsg += "Error occur:";
  errorMsg += "\n";
  process.stdout.write
  (
    color.inv(
        color.fg(
          errorMsg,
          [255,0,0]
        )
    )
  )
  try{
    if(Validation.isObject(obj))
    {
      var keys = Object.keys(obj);
      var opLine;
      var op_nf_txt;
      for(var i = 0 ; i < keys.length ; i++)
      {
        opLine = "";
        keys[i] = String(keys[i]);
        var key_name = keys[i].charAt(0).toUpperCase() + keys[i].slice(1);
        opLine += color.fg(key_name,[255,255,255]) + _bs + color.fg("➡",[255,0,0]) + _bs + _bs;
        if(Validation.isString(obj[keys[i]]) 
        || Validation.isNumber(obj[keys[i]])
        || obj[keys[i]] == true || obj[keys[i]] == false)
        {
          obj[keys[i]] = String(obj[keys[i]]);
          if(keys[i].trim() != "success" )
          {
            if(obj[keys[i]].trim().length != 0)
            {
              opLine += "\u0020" + color.fg('"' +obj[keys[i]]+ '"',[255,0,0]);
            } else 
            {
              opLine += "\u0020" + color.fg("Not found",[255,0,0]);
            }
          } else{
            opLine = "";
          }
        } else 
        {
          op_nf_txt = color.inv("\u0020" + color.fg("Not found",[255,0,0]));
          opLine += color.italic(op_nf_txt);
        }
        console.log(opLine);
      }
    }
  } catch(err){
    console.log(obj);
  }
}




if(f == "gethtml" || f == "html")
{
  webthief.getHtml(i).then(function(data){
    showOutput(data);
  }).catch(function(error){
    showErrorOutput(error);
  });
}

if(f == "getmeta" || f == "meta")
{
  var option = {
    fields: ["*"]
  };
  webthief.getMeta(i,option).then(function(data){
    if(Validation.isObject(data) && Validation.isObject(data.response))
    {
      showOutput(data.response);
    }
  }).catch(function(error){
      showErrorOutput(error);
  });
}

if(f == "getsiteimages" || f == "images")
{
  webthief.getSiteImages(i).then(function(data){
    if(Validation.isObject(data) && Validation.isArray(data.response))
    {
      for(var i = 0 ; i < data.response.length ; i++)
      {
        var space = _bs;
        var index = i+1;
        if(index<10){ space = _bs + _bs + _bs + _bs}
        else if(index>=10 && index < 100) { space = _bs + _bs + _bs}
        else if(index>=100 && index < 999) { space = _bs + _bs}
        else{ space = _bs}
        var op = "("+ index + ")" +space+ color.fg(data.response[i],[0,255,0]);
        console.log(op);
      }
      if(data.response.length == 0)
      {
        var no_img_err = "     ";
        no_img_err += color.bold("No any image on this website");
        no_img_err += "\n";
        process.stdout.write
        (
          color.fg(
            no_img_err,
            [255,0,0]
          )
        )
      }
    }
  }).catch(function(error){
    showErrorOutput(error);
  });
}