"use strict";
const MetaExtractor = require("./MetaExtractor");
const Constants = require("../helper/Constants");
const bvalid = require("bvalid");

function checkWildCard(fields){
    if(
        bvalid.isString(fields[0]) &&
        fields[0].trim() == "*"
    ) {
        return {
            skip : true,
            fields : Constants.validFields_basic
        }
    }
    return {
        skip : false
    }
}

function getOptionFields(option){
    var _f;
    if(
        bvalid.isObject(option) &&
        bvalid.isArray(option.fields) &&
        option.fields.length != 0
    )
    {
        var _wc = checkWildCard(option.fields);
        if(_wc.skip)
        {
            return _wc.fields;
        }
        var finalValidFields = [];
        for(var i = 0 ; i < option.fields.length ; i++)
        {
            if(bvalid.isString(option.fields[i]))
            {
                _f = option.fields[i].trim();
                if(Constants.validFields_basic.indexOf(_f)>=0)
                {
                    if(finalValidFields.indexOf(_f) < 0)
                    {
                        finalValidFields.push(_f);
                    }
                }
            }
        }
        if(finalValidFields.length != 0)
        {
            return finalValidFields;
        }
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
        if(metaData.hasOwnProperty("logo"))
        {
            if(metaData["logo"].length==0)
            {
                if(imgOnWeb.length!=0)
                {
                    metaData["logo"] = imgOnWeb;
                }
            }
        }
        resolve({
            success: true,
            response: metaData
        });
    });
}


exports.getImagesFromSite = function(_url,_html){
    return new Promise(function(resolve, reject){
        var hostname = MetaExtractor.getSiteHostName(_url);
        var imgOnWeb = MetaExtractor.getImagesFromWebsite(hostname,_html);
        resolve({
            success: true,
            response: imgOnWeb
        });
    });
}

