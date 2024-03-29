'use strict';

var userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36';

exports.apiConstants = {
  'User-Agent': userAgent,
};

exports.errorMessage = {
  CB_MUST_FUNCTION: 'Callback should be a function',
  INVALID_URL: 'Url is invalid',
  ENOTFOUND: 'Network error or host not found',
  UNABLE_TO_VERIFY_LEAF_SIGNATURE:
    'SSL invalid or may be not secure. Try to use with http if https used',
  INVALID_HTML_CONTENT: 'Expecting html content. No html content return by url',
  ERR_TLS_CERT_ALTNAME_INVALID: "This domain/ip is not in the cert's list",
  ECONNRESET: 'Connection reset or closed by host. Try again later',
  UNDEFINED_ERROR: 'Some undefined error occur',
};

exports.defaultFields = ['logo', 'title', 'description'];

exports.requestHeader = {
  'User-Agent': userAgent,
  'Content-Type': 'text/html; charset=utf-8',
  connection: 'keep-alive',
  'cache-control': 'max-age=0',
  'upgrade-insecure-requests': '1',
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
};

exports.requestHeader_image = {
  'User-Agent': userAgent,
  connection: 'keep-alive',
  'cache-control': 'max-age=0',
  'upgrade-insecure-requests': '1',
  accept: 'image/*',
};

exports.validFields_basic = [
  'logo',
  'description',
  'title',
  'keywords',
  'subject',
  'copyright',
  'language',
  'robots',
  'revised',
  'abstract',
  'topic',
  'summary',
  'author',
  'designer',
  'reply-to',
  'url',
  'category',
  'site_name',
  'email',
  'country-name',
  'phone_numbe',
];
