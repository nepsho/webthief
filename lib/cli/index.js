#!/usr/bin/env node
const { exec } = require("child_process");
const Validation = require("../helper/Validation");
const webthief = require("../../index");
const color = require("./bcli/color");
const logo = require("../helper/logo");

var args = process.argv.slice(2);       

var f = args[0];
var i = args[1];
var o = args[2];
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

if(f == "gethtml" || f == "html")
{
  webthief.getHtml(i).then(function(data){
    console.log(data);
  }).catch(function(error){
    console.log(error);
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
      console.log(data.response);
    }
  }).catch(function(error){
    console.log(error);
  });
}

if(f == "getsiteimages" || f == "images")
{
  webthief.getSiteImages(i).then(function(data){
    if(Validation.isObject(data) && Validation.isArray(data.response))
    {
      for(var i = 0 ; i < data.response.length ; i++)
      {
        console.log(color.fg(data.response[i],[0,255,0]));
      }
      if(data.response.length == 0)
      {
        process.stdout.write(
          color.fg("No images found",[255,0,0]) + "\n"
        )
      }
    }
  }).catch(function(error){
    console.log(error);
  });
}