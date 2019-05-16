const Regax = require("./Regax");

exports.ValidUrl = function(_url){
    if(!(_url && (typeof _url ==='string'))){
        return false;
    }
    _url = _url.trim();
    return Regax.validUrl.test(_url);
}

exports.urlScheme = function(_url){
    if(!(_url && (typeof _url ==='string'))){
        return false;
    }
    _url = _url.trim();
    return Regax.urlScheme.test(_url);
}

exports.isString = function(variable){
    if(!variable) return false;
    if(typeof variable === 'string') return true;
    return false;
}

exports.isArray = function(variable){
    if(!variable) return false;
    if(variable instanceof Array) return true;
    return false;
}

exports.isObject = function(variable){
    if(!variable) return false;
    if(variable instanceof Object && !(variable instanceof Array)) return true;
    return false;
}

exports.isFunction = function(variable){
    if(!variable) return false;
    if(typeof variable === 'function') return true;
    return false;
}

exports.isHTMLcontentType = function(type){
    if(!type) return false;
    if(Regax.htmlContent.test(type)) return true;
    return false;
}

exports.getFinalRedirrectUrl = function(resp,_url){
    if(resp && resp.request){
        if(resp.request.href){
            return resp.request.href;
        }
        if(resp.request.uri && resp.request.uri.href){
            return resp.request.uri.href;
        }
        return _url;
    }
    return _url;
}