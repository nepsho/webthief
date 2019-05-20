"use strict";

exports.base64 = /^data:image.*$/;
exports.htmlContent = /text\/html/;
exports.urlScheme = /^(?:(?:https?|ftp):\/\/)/i;
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