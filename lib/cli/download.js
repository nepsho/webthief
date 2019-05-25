const fs = require("fs");
const bvalid = require("bvalid");
const Regex = require("../helper/Regax");
const genFileName = require("./genFileName");

var getSiteHostName = function(url)
{
  var host;
  try{
    var urlPartsRegex = Regex.urlParts;
    host = url.match(urlPartsRegex);
    host = host ? host[4] : null;
  }catch(err)
  {
    host = null;
  }
  return host;
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


var saveFile = function(fileName,path,data,cb){
  if(fileName.slice(-1)=="/"){
    fileName = path + fileName;
  } else {
    fileName = path + "/" + fileName;
  }
  fs.writeFile(fileName, data , function(err) {
    if(err){
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
  var opt = {
    name : getFileDummyName("http://"+url),
    ext : ext,
    path : path
  };
  if(bvalid.isString(data) == false || bvalid.isBuffer(data) == false)
  {
    if(bvalid.isString(ext) === false)
    {
      return cb({
        success : false,
        message : "Download failed ! Invalid extension for file"
      });
    } else {
      var fileName = genFileName.genName(opt);
      saveFile(fileName,path,data,function(response){
        return cb(response);
      });    
    }
  } else {
    return cb({
      success : false,
      message : "Download failed ! Invalid content for file"
    });
  }
}

exports.downLoadHtml = downLoadHtml;