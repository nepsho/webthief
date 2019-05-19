"use strict";

var valid_url_reg = new RegExp(
    "^" +
      "(?:(?:(?:https?|ftp):)?\\/\\/)?" +
      "(?:\\S+(?::\\S*)?@)?" +
      "(?:" +
        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
      "|" +
        //----Domain and host name-------
        "(?:"+
            "(?![-_])(?:[-\\w\\u00a1-\\uffff]{0,62}[a-z0-9\\u00a1-\\uffff]\\.)+"+
        ")"+
        //-------------------------------
        "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
      ")" +
      "(?::\\d{2,5})?" +
      "(?:[/?#]\\S*)?" +
    "$", "i"
);


exports.base64 = /^data:image.*$/;
exports.htmlContent = /text\/html/;
exports.urlScheme = /^(?:(?:https?|ftp):\/\/)/i;
exports.validUrl = valid_url_reg;
exports.urlParts = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i;
exports.imgUrl = /<img[^>]*?src=["']([^<]*?)["'][^>]*?>/i;
exports.allImgUrl = /<img[^>]*?src\s*=\s*["']([^<]*?)["'][^>]*?>/ig;

//Reg for detect selected content
exports.scriptContent = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
exports.cssContent = /<style\b[^<]*(?:(?!<\/>)<[^<]*)*<\/style>/gi;
exports.bodyContent = /<body\b[^<]*(?:(?!<\/>)<[^<]*)*<\/body>/gi;

//title logo detect reg
exports.title = /<title[^>]*?>([^<]+)<\/title>/i;
exports.logo = /<link[^>]*?rel\s*=\s*[^>]*? icon[^>]*?href\s*=\s*["']([^<]*?)["'][^>]*?>/i;
exports.logo_a = /<link[^>]*?rel\s*=\s*[^>]*?touch-icon[^>]*?href\s*=\s*["']([^<]*?)["'][^>]*?>/i;
exports.logo_b = /<link[^>]*?rel\s*=\s*[^>]*?icon[^>]*?href\s*=\s*["']([^<]*?)["'][^>]*?>/i;

//basic meta tag reg gen
exports.metaRegGenrator_basic = function(meta){
    if(meta && meta.trim().length){
        var RegA = new RegExp('<meta[^>]*?name\s*=\s*[^>]*?'+meta+'[^>]*?content\s*=\s*["\']([^<]*?)["\'][^>]*?>','i');
        var RegB = new RegExp('<meta[^>]*?content\s*=\s*["\']([^<]*?)["\'][^>]*?name\s*=\s*[^>]*?'+meta+'[^>]*?>','i');
        return {
            "a":RegA,
            "b":RegB
        }
    }
}

//OpenGraph meta tag reg gen
exports.metaRegGenrator_og = function(meta){
    if(meta && meta.trim().length){
        var RegA = new RegExp('<meta[^>]*?name\s*=\s*[^>]*?og:'+meta+'[^>]*?content\s*=\s*["\']([^<]*?)["\'][^>]*?>','i');
        var RegB = new RegExp('<meta[^>]*?content\s*=\s*["\']([^<]*?)["\'][^>]*?name\s*=\s*[^>]*?og:'+meta+'[^>]*?>','i');
        return {
            "a":RegA,
            "b":RegB
        }
    }
}

exports.metaRegGenrator_og_prop = function(meta){
    if(meta && meta.trim().length){
        var RegA = new RegExp('<meta[^>]*?property\s*=\s*[^>]*?og:'+meta+'[^>]*?content\s*=\s*["\']([^<]*?)["\'][^>]*?>','i');
        var RegB = new RegExp('<meta[^>]*?content\s*=\s*["\']([^<]*?)["\'][^>]*?property\s*=\s*[^>]*?og:'+meta+'[^>]*?>','i');
        return {
            "a":RegA,
            "b":RegB
        }
    }
}

