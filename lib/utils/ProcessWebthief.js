"use strict";
const MetaExtractor = require("./MetaExtractor");
const Constants = require("../helper/Constants");
const bvalid = require("bvalid");
const copy = require("obclone");

function checkWildCard(fields){
    var response = new Object();
    response.skip = false;
    if(
        bvalid.isString(fields[0]) &&
        fields[0].trim() == "*"
    ) {
        var resp_fields_arr = copy.deepcopy(Constants.validFields_basic);
        response.skip = true;
        response.fields = resp_fields_arr;
        return response;
    }
    return response;
}

function getOptionFields(option){
    var _f;
    var finalValidFields = new Array();
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
    finalValidFields = copy.deepcopy(Constants.defaultFields);
    return finalValidFields;
}


function nuliFyEmptyFields(_metos){
    var keys = Object.keys(_metos);
    for(var i = 0 ; i < keys.length ; i ++)
    {
        if(bvalid.isString(_metos[keys[i]])){
            if(_metos[keys[i]].trim().length === 0)
            {
                _metos[keys[i]] = null;
            }
        }
        else {
            _metos[keys[i]] = null;
        }
    }
    return _metos;
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
            response: nuliFyEmptyFields(
                copy.deepcopy(metaData)
            )
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