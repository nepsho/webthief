'use strict';
const bvalid = require('bvalid');
const Validation = require('./helper/Validation');
const Scraper = require('./utils/Scraper');
const ProcessWebthief = require('./utils/ProcessWebthief');
const Constants = require('./helper/Constants');
const ErrMsg = Constants.errorMessage;

/*
 * Validate callback and throw error if not valid callback
 */
function validateCb(cb) {
  if (
    !(bvalid.isNull(cb) || bvalid.isUndefined(cb)) &&
    !bvalid.isFunction(cb)
  ) {
    throw new Error(ErrMsg.CB_MUST_FUNCTION);
  }
  return {
    success: true,
  };
}

exports.getMeta = function (_url, _option, cb) {
  /*
   * Validate callback function if present
   */
  if (validateCb(cb).success == false) {
    return cb(validateCb(cb));
  }

  /*
   * To validate url before process
   */
  if (!bvalid.isUrl(_url)) {
    if (cb) {
      cb({
        success: false,
        error: 'INVALID_URL',
        detail: ErrMsg.INVALID_URL,
      });
      return;
    } else {
      return new Promise(function (resolve, reject) {
        reject({
          success: false,
          error: 'INVALID_URL',
          detail: ErrMsg.INVALID_URL,
        });
      });
    }
  }

  /*
   * In case no url scheme found
   */
  if (!Validation.urlScheme(_url)) {
    _url = 'http://' + _url;
  }

  return Scraper.getHtml(_url)
    .then(function (data) {
      if (cb) {
        ProcessWebthief.getWebsiteDetails(data.url, data.html, _option)
          .then(function (data) {
            return cb(data);
          })
          .catch(function (data) {
            return cb(data);
          });
      } else {
        return ProcessWebthief.getWebsiteDetails(data.url, data.html, _option);
      }
    })
    .catch(function (data) {
      if (cb) {
        return cb(data);
      } else {
        return new Promise(function (resolve, reject) {
          reject(data);
        });
      }
    });
};

exports.getHtml = function (_url, cb) {
  /*
   * Validate callback function if present
   */
  if (validateCb(cb).success == false) {
    return cb(validateCb(cb));
  }

  /*
   * To validate url before process
   */
  if (!bvalid.isUrl(_url)) {
    if (cb) {
      return cb({
        success: false,
        error: 'INVALID_URL',
        detail: ErrMsg.INVALID_URL,
      });
    } else {
      return new Promise(function (resolve, reject) {
        reject({
          success: false,
          error: 'INVALID_URL',
          detail: ErrMsg.INVALID_URL,
        });
      });
    }
  }

  /*
   * In case no url scheme found
   */
  if (!Validation.urlScheme(_url)) {
    _url = 'http://' + _url;
  }

  if (cb) {
    Scraper.getHtml(_url)
      .then(function (data) {
        cb(data);
      })
      .catch(function (data) {
        cb(data);
      });
  } else {
    return Scraper.getHtml(_url);
  }
};

exports.getSiteImages = function (_url, cb) {
  /*
   * Validate callback function if present
   */
  if (validateCb(cb).success == false) {
    return cb(validateCb(cb));
  }

  /*
   * To validate url before process
   */
  if (!bvalid.isUrl(_url)) {
    if (cb) {
      return cb({
        success: false,
        error: 'INVALID_URL',
        detail: ErrMsg.INVALID_URL,
      });
    } else {
      return new Promise(function (resolve, reject) {
        reject({
          success: false,
          error: 'INVALID_URL',
          detail: ErrMsg.INVALID_URL,
        });
      });
    }
  }

  /*
   * In case no url scheme found
   */
  if (!Validation.urlScheme(_url)) {
    _url = 'http://' + _url;
  }

  return Scraper.getHtml(_url)
    .then(function (data) {
      if (cb) {
        ProcessWebthief.getImagesFromSite(data.url, data.html)
          .then(function (data) {
            return cb(data);
          })
          .catch(function (data) {
            return cb(data);
          });
      } else {
        return ProcessWebthief.getImagesFromSite(data.url, data.html);
      }
    })
    .catch(function (data) {
      if (cb) {
        return cb(data);
      } else {
        return new Promise(function (resolve, reject) {
          reject(data);
        });
      }
    });
};
