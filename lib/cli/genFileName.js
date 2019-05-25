"use strict";
const fs = require("fs");
const os = require("os");
const bvalid = require("bvalid");
const base_dir = process.cwd();

/* Running platform */
const platform = bvalid.isString(os.platform()) ?
               os.platform().toLowerCase() : "";

const windowInvalid = [
  "CON", "PRN", "AUX", "CLOCK$",
  "COM1", "COM2", "COM3", "COM4",
  "COM6", "COM7", "COM8", "COM9",
  "LPT1", "LPT2", "LPT3", "LPT4",
  "LPT6", "LPT7", "LPT8", "LPT9",
  "LPT5", "COM5", "NUL", "LST"
];



function isExist(path,cb)
{
    var flag = false;
    try{
      fs.statSync(path);
      flag = true;
    }catch(err){
      flag = false;
    }
    if(bvalid.isFunction(cb)){return cb(flag)}
    else{return flag}
}


function InitialFileName(name,ext)
{
  if(bvalid.isString(name))
  {
    if(name.trim().length !== 0)
    {
      /*
      * Invalid name and symbols extraction
      */
      name = name.replace(/[\/:*?"<>|]/g,'');
      if(platform == "window" || platform == "windows")
      {
        console.log((name + ext).toUpperCase())
        if(windowInvalid.indexOf((name + ext).toUpperCase()) >= 0)
        {
          name = "_" + name;
        }
      }
      return name;
    }
    else{return "unnamed"}
  }
  else if(
     bvalid.isNull(name) ||
     bvalid.isUndefined(name)
  ){return "unnamed"}
  throw new Error("Invalid file name");
}

function createFileFinalName(dummy_name,ext,flag,path)
{
    var fileFullPath;
    var fileName = "";
    var v = (flag === 0) ? "" : "("+String(flag)+")";
    fileName = dummy_name + v + ext;

    fileFullPath = (path.slice(-1)==="/") ?
                   (path + fileName) :
                   (path + "/" + fileName);

    if(isExist(fileFullPath))
    {
      flag++;
      return createFileFinalName(dummy_name,ext,flag,path);
    }
    return fileName;
}

/*
* Genrate filename
*/
var genrateFilename = function(option,cb)
{
  var flag = 0;
  if(bvalid.isObject(option))
  {
    var _fname = option.name;
    var ext = option.ext;
    var path = option.path;
  } else if(bvalid.isArray(option))
  {
    var _fname = option[0];
    var ext = option[1];
    var path = option[2];
  }

  /* Extension */
  ext = bvalid.isString(ext) ?
        (
          (ext.trim().length !== 0) ? ("." +ext) : ("")
        ) : "";

  /* for unnamed file */
  _fname = InitialFileName(_fname,ext);

  /* Path Validation */
  if(bvalid.isString(path))
  {
    if(path.trim().length === 0)
    {
      path = base_dir;
    }
    else
    {
      if(isExist(path) === false)
      {
        throw Error("Path not exist");
      }
    }
  } else {
    path = base_dir;
  }


  var fileName = createFileFinalName(_fname,ext,flag,path);
  if(bvalid.isFunction(cb))
  {
    return cb(fileName)
  }
  else
  {
    return fileName
  }
}
exports.genName = genrateFilename;