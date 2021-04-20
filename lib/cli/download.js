const fs = require('fs');
const request = require('request');
const bvalid = require('bvalid');
const Regex = require('../helper/Regax');
const genFileName = require('./genFileName');

var img_b64_start = /^data:image\/(png|jpg|jpeg|gif|svg);base64,/i;
var img_content_type = /image\/(png|jpg|jpeg|gif|svg)/i;

var getSiteHostName = function (url) {
  var host;
  if (/^(https?|ftp):\/\//.test(url) === false) {
    url = 'http://' + url;
  }
  try {
    var urlPartsRegex = Regex.urlParts;
    host = url.match(urlPartsRegex);
    host = host ? host[4] : null;
  } catch (err) {
    host = null;
  }
  return host;
};

function getFileDummyName(url) {
  var dummy_name = getSiteHostName(url);
  if (bvalid.isNull(dummy_name) || bvalid.isUndefined(url)) {
    return 'webthief';
  } else {
    return dummy_name;
  }
}

var downloadBase64Image = function (base64, host, path, cb) {
  base64 = base64.trim();
  var content_type = base64.match(img_b64_start);
  if (content_type) {
    var img_ext = content_type[1].toLowerCase();
    //----------------------------------------------
    var opt = {
      name: host,
      ext: img_ext,
      path: path,
    };
    var fileName = genFileName.genName(opt);
    //----------------------------------------------

    base64 = base64.replace(img_b64_start, '');
    var binary = new Buffer(base64, 'base64').toString('binary');
    fs.writeFile(fileName, binary, 'binary', function (err) {
      if (err) {
        return cb(false);
      } else {
        return cb(true);
      }
    });
  } else {
    return cb(false);
  }
};

var downloadUrlImage = function (image_url, host, path, cb) {
  request.head(image_url, function (err, res, body) {
    var content_type = res ? res.headers['content-type'] : null;
    if (bvalid.isString(content_type)) {
      var img_detail = content_type.match(img_content_type);
      if (img_detail) {
        var img_ext = img_detail[1].toLowerCase();

        //---------------------------------------------------
        var opt = {
          name: host,
          ext: img_ext,
          path: path,
        };
        var fileName = genFileName.genName(opt);
        //---------------------------------------------------
        request
          .get(image_url)
          .on('error', function (err) {
            console.log(err);
          })
          .pipe(fs.createWriteStream(fileName))
          .on('close', cb);
      } else {
        return cb(true, fileName);
      }
    } else {
      return cb(true, null);
    }
  });
};

//--for download images
var downloadImages = function (url, images, path, cb) {
  var host = getSiteHostName(url);
  if (host) {
    if (bvalid.isArray(images)) {
      if (images.length === 0) {
        return cb('No images url found');
      } else {
        var startDownload = function (index, done) {
          if (index < images.length) {
            //--------------------------------------
            if (img_b64_start.test(images[index])) {
              //1) Base64 Case
              downloadBase64Image(images[index], host, path, function (resp) {
                if (resp) {
                  console.log(
                    '🠮 Downloaded image (' + Number(index + 1) + ') (base64)',
                  );
                  startDownload(index + 1, done);
                } else {
                  console.log('🠮 Download fail    (' + Number(index + 1) + ')');
                  startDownload(index + 1, done);
                }
              });
            } else {
              //2) URL image download
              try {
                downloadUrlImage(
                  images[index],
                  host,
                  path,
                  function (err, resp) {
                    if (err) {
                      console.log(
                        '🠮 Download fail    (' + Number(index + 1) + ')',
                      );
                      startDownload(index + 1, done);
                    } else {
                      console.log(
                        '🠮 Downloaded image (' + Number(index + 1) + ')',
                      );
                      startDownload(index + 1, done);
                    }
                  },
                );
              } catch (err) {
                console.log('🠮 Download fail    (' + Number(index + 1) + ')');
                startDownload(index + 1, done);
              }
            }
            //--------------------------------------
          } else {
            done();
          }
        };

        startDownload(0, function () {
          return cb({
            success: true,
            message: 'Download Completed',
          });
        });
      }
    } else {
      return cb({
        success: false,
        message: 'Second parameter should be array of images url',
      });
    }
  } else {
    return cb({
      success: false,
      message: 'Invalid base url',
    });
  }
};

var saveFile = function (fileName, path, data, cb) {
  if (fileName.slice(-1) == '/') {
    fileName = path + fileName;
  } else {
    fileName = path + '/' + fileName;
  }
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      return cb({
        success: false,
        message: 'Unable to save file right now something went wrong',
      });
    }
    return cb({
      success: true,
      message: 'Successfully downloaded',
    });
  });
};

var downLoadHtml = function (data, url, ext, path, cb) {
  var opt = {
    name: getFileDummyName(url),
    ext: ext,
    path: path,
  };
  if (bvalid.isString(data) == false || bvalid.isBuffer(data) == false) {
    if (bvalid.isString(ext) === false) {
      return cb({
        success: false,
        message: 'Download failed ! Invalid extension for file',
      });
    } else {
      var fileName = genFileName.genName(opt);
      saveFile(fileName, path, data, function (response) {
        return cb(response);
      });
    }
  } else {
    return cb({
      success: false,
      message: 'Download failed ! Invalid content for file',
    });
  }
};

exports.downLoadHtml = downLoadHtml;
exports.downloadImages = downloadImages;
