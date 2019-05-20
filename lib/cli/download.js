const fs = require("fs");
const bvalid = require("bvalid");
const Regex = require("../helper/Regax");

var getSiteHostName = function(url)
{
  var host;
  try
  {
    var urlPartsRegex = Regex.urlParts;
    host = url.match(urlPartsRegex);
    host = host ? host[4] : null;
  }catch(err)
  {
    host = null;
  }
  return host;
}

function isExist(name,cb)
{
    fs.exists(name, function (exists) {
      if(exists)
      {
          return cb(true);
      }
      return cb(false);
    });
}

function getFileDummyName(url)
{
  var dummy_name = getSiteHostName(url);
  if(bvalid.isNull(dummy_name) || bvalid.isUndefined(url))
  {
    return "webthief";
  } else {
    return dummy_name;
  }
}

function createFileFinalName(dummy_name,ext,flag,cb)
{
  var fileName = "";
  if(flag == 0){
    var v = "";
  } else {
    var v = "("+String(flag)+")";
  }
  fileName = dummy_name + v + "." + ext;
  isExist(fileName,function(response){
      if(response==false)
      {
        cb(fileName);
      } else {
        flag++;
        createFileFinalName(dummy_name,ext,flag,cb);
      }
  });
}

var saveFile = function(fileName,path,data,cb){
  if(fileName.slice(-1)=="/"){
    fileName = path + fileName;
  } else {
    fileName = path + "/" + fileName;
  }
  fs.writeFile(fileName, data , function(err) {
    if(err) {
        return cb({
          success: false,
          message: "Unable to save file right now something went wrong"
        });
    }
    return cb({
      success: true,
      message: "Successfully downloaded"
    });
  });
}

var downLoadHtml = function(data,url,ext,path,cb){
  if(bvalid.isString(data) == false || bvalid.isBuffer(data) == false){
    if(bvalid.isString(ext) === false){
      return cb({
        success : false,
        message : "Download failed ! Invalid extension for file"
      });
    }
    var flag = 0;
    var dummy_name = getFileDummyName(url);
    if(dummy_name == undefined)
    {
      dummy_name = getFileDummyName("http://"+url);
    }
    createFileFinalName(dummy_name,ext,flag,function(fileName){
      saveFile(fileName,path,data,function(response){
        return cb(response);
      });
    });
  } else {
    return cb({
      success : false,
      message : "Download failed ! Invalid content for file"
    });
  }
}

exports.downLoadHtml = downLoadHtml;
exports.isExist = isExist;