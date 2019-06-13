#!/usr/bin/env node
const bvalid = require("bvalid");
const webthief = require("../../index");
const color = require("./bcli/color");
const logo = require("../helper/logo");
const download = require("./download");


var args = process.argv.slice(2);    
var valid_f = ["meta","getmata","html","gethtml","images","getsiteimages"];
var _f = args[0];
var _i = args[1];
var _o = args[2];
var dir = process.cwd();
var _bs = "\u0020";

if(bvalid.isString(_f) && !bvalid.isString(_i))
{
  process.stdout.write(color.fg(logo.cli_logo_op,[27, 194, 19])+"\n");
  var invalid_input_err = "   ";
  invalid_input_err += color.bold("No any option url found, please enter url first");
  invalid_input_err += "\n";
  process.stdout.write
  (
    color.fg(
      invalid_input_err,
      [255,255,0]
    )
  )
  process.exit(1);
}
else if((bvalid.isString(_f) && bvalid.isString(_i)) == false)
{
  process.stdout.write(color.fg(logo.cli_logo,[27, 194, 19])+"\n");
  process.exit(1);
}
else
{
  if(_f.trim().length === 0 || _i.trim().length === 0)
  {
    process.exit(1);
  }
  _f = _f.trim().toLowerCase();
  _i = _i.trim();
}

process.stdout.write(color.fg(logo.cli_logo_op,[27, 194, 19])+"\n");

function showOutput(obj){
  try
  {
    if(bvalid.isObject(obj))
    {
      var keys = Object.keys(obj);
      var opLine;
      var op_nf_txt;
      for(var i = 0 ; i < keys.length ; i++)
      {
        opLine = "";
        keys[i] = String(keys[i]);
        opLine += color.fg(keys[i],[255,255,255])+"\u0020➡\u0020\u0020";
        if(bvalid.isString(obj[keys[i]]) 
        || bvalid.isNumber(obj[keys[i]])
        || obj[keys[i]] == true || obj[keys[i]] == false)
        {
          obj[keys[i]] = String(obj[keys[i]]);
          if(keys[i].trim() != "success" )
          {
            if(obj[keys[i]].trim().length != 0)
            {
              opLine += "\u0020" + color.fg(obj[keys[i]],[0,255,0]);
            } else 
            {
              opLine += "\u0020" + color.fg("Not found",[0,255,0]);
            }
            console.log(opLine);
          }
        } else 
        {
          op_nf_txt = "\u0020" + color.fg("Not found",[0,255,0]);
          opLine += color.italic(op_nf_txt);
          console.log(opLine);
        }
      }
    }
  } catch(err)
  {
    console.log(obj);
  }
}

function showErrorOutput(obj)
{
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
  try
  {
    if(bvalid.isObject(obj))
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
        if(bvalid.isString(obj[keys[i]]) 
        || bvalid.isNumber(obj[keys[i]])
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
            console.log(opLine);
          }
        } else 
        {
          op_nf_txt = color.inv("\u0020" + color.fg("Not found",[255,0,0]));
          opLine += color.italic(op_nf_txt);
          console.log(opLine);
        }
      }
    }
  } catch(err)
  {
    console.log(obj);
  }
  process.exit(1);
}

if(valid_f.indexOf(_f)<0)
{
  var invalid_mode_err = "     ";
  invalid_mode_err += color.bold(_f +"\u0020"+"is a Invalid mode");
  invalid_mode_err += "\n";
  process.stdout.write
  (
    color.fg(
      invalid_mode_err,
      [255,0,0]
    )
  )
  process.exit(1);
}



if(_f == "gethtml" || _f == "html")
{
  webthief.getHtml(_i).then(function(data){
    showOutput(data);
    if(bvalid.isString(_o))
    {
      if(_o.trim() == "-d")
      {
        if(bvalid.isObject(data) && bvalid.isString(data.html))
        {
          download.downLoadHtml(data.html,_i,"html",dir,function(response){
            if(response.success == true){
              console.log(color.bold(response.message)+" in 🠮 "+dir);
            } else {
              showErrorOutput(response);
            }
          });
        } else {
          process.exit(1);
        }
      } else {
        process.exit(1);
      }
    }
  }).catch(function(error){
    showErrorOutput(error);
  });
}

if(_f == "getmeta" || _f == "meta")
{
  var option = {
    fields: ["*"]
  };
  webthief.getMeta(_i,option).then(function(data){
    if(bvalid.isObject(data) && bvalid.isObject(data.response))
    {
      showOutput(data.response);
    }
  }).catch(function(error){
      showErrorOutput(error);
  });
}

if(_f == "getsiteimages" || _f == "images")
{
  webthief.getSiteImages(_i).then(function(data){
    if(bvalid.isObject(data) && bvalid.isArray(data.response))
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
      if(bvalid.isString(_o) && (_o.trim() == "-d"))
      {
        console.log("\n");
        download.downloadImages(_i,data.response,dir,function(response){
          console.log("\n");
          if(response.success){
            console.log(color.fg(color.fg(color.bold(response.message),[0,255,0])));
          } else {
            console.log(color.bold(color.fg(color.bold(response.message),[255,0,0])));
          }
        });
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