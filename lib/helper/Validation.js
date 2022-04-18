const bvalid = require('bvalid');
const Regax = require('./Regax');

exports.urlScheme = function (_url) {
  if (bvalid.isString(_url)) {
    _url = _url.trim();
    return Regax.urlScheme.test(_url);
  }
  return false;
};

exports.isHTMLcontentType = function (type) {
  if (bvalid.isString(type)) {
    if (Regax.htmlContent.test(type)) return true;
  }
  return false;
};

exports.getFinalRedirrectUrl = function (resp, _url) {
  if (resp && resp.request) {
    if (resp.request.href) {
      return resp.request.href;
    }
    if (resp.request.uri && resp.request.uri.href) {
      return resp.request.uri.href;
    }
    return _url;
  }
  return _url;
};
