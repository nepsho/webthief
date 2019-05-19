#!/usr/bin/env node
const { exec } = require("child_process");
const Validation = require("../helper/Validation");
const webthief = require("../../index");

var args = process.argv.slice(2);

var f = args[0];
var i = args[1];
var o = args[2];

if((Validation.isString(f) && Validation.isString(i)) == false)
{
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
    console.log(data);
  }).catch(function(error){
    console.log(error);
  });
}

if(f == "getsiteimages" || f == "images")
{
  webthief.getSiteImages(i).then(function(data){
    console.log(data);
  }).catch(function(error){
    console.log(error);
  });
}