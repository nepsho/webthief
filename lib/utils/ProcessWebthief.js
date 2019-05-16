"use strict";
const MetaExtractor = require("./MetaExtractor");
const Constants = require("../helper/Constants");
const Validation = require("../helper/Validation");

function refineOptionIfAllMeta(_option){
    if(_option.fields.length==1){
        if(Validation.isString(_option.fields[0])
        && _option.fields[0].trim()=="*"){
            return {
                dontSkip: false,
                fields: Constants.validFields_basic
            }
        } else {
            var _f = _option.fields[0].trim().toLowerCase();
            if(Constants.validFields_basic.indexOf(_f)>=0){
                return {
                    dontSkip: false,
                    fields: [_f]
                }
            }
        }
    }
    return {
        dontSkip: true
    }
}

function getOptionFields(option){
    var _f;
    if(option && option.fields &&
      (Validation.isArray(option.fields) && option.fields.length!=0)){
        var optionChecker = refineOptionIfAllMeta(option);
        //---process if no any auto fields
        if(optionChecker.dontSkip){
            var _fields=[];
            for(var i = 0 ; i < option.fields.length ; i++){
                _f = option.fields[i].trim().toLowerCase();
                if(Constants.validFields_basic.indexOf(_f)>=0){
                    if(_fields.indexOf(_f)<0){
                        _fields.push(_f);
                    }
                }
            }
            _fields = _fields.length == 0 ? Constants.defaultFields : _fields;
            return _fields;
        }
        //---process if auto fields
        return optionChecker.fields;
    }
    return Constants.defaultFields;
}

exports.getWebsiteDetails = function(_url,_html,_option){
    return new Promise(function(resolve, reject) {
        var hostname = MetaExtractor.getSiteHostName(_url);
        var imgOnWeb = MetaExtractor.getImageOnWebsite(hostname,_html);
        _html = MetaExtractor.removeHtmlScripts(_html);
        _html = MetaExtractor.removeHtmlBody(_html);
        _html = MetaExtractor.removeHtmlCSS(_html);
        var metaData = MetaExtractor.returnMetaData(_html,getOptionFields(_option),hostname);
        if(metaData.hasOwnProperty("logo")){
            if(metaData["logo"].length==0){
                if(imgOnWeb.length!=0){
                    metaData["logo"] = imgOnWeb;
                }
            }
        }
        resolve(metaData);
    });
}


exports.getImagesFromSite = function(_url,_html){
    return new Promise(function(resolve, reject) {
        var hostname = MetaExtractor.getSiteHostName(_url);
        var imgOnWeb = MetaExtractor.getImagesFromWebsite(hostname,_html);
        resolve(imgOnWeb);
    });
}

