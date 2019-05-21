"use strict";
const request = require("request");
const bvalid = require("bvalid");
const Constants = require("../helper/Constants");
const Validation = require("../helper/Validation");
const copy = require("../helper/copy");

var data;

var optionMaker = function(type){
    if(type=="html" || !type){
        return {headers: copy.deepcopy(Constants.requestHeader)};
    }
    if(type=="image"){
        return {headers: copy.deepcopy(Constants.requestHeader_image)};
    }   
    return {headers: copy.deepcopy(Constants.requestHeader)}; 
}

exports.getHtml = function(_url,_options){
    return new Promise(function(resolve, reject) {
        var option = optionMaker(_url);
        option.url = _url;
        option.gzip = true;
        request.get(option, function(error, resp, body) {
            if (error) {
                try {
                    var ec = error && (bvalid.isString(error.code)) 
                    && error["code"] ?
                    error["code"].trim() : "Undefined_Error";
                } catch(err) {
                    var ec = "UNDEFINED_ERROR";
                }
                data = {
                    success: false,
                    error: ec,
                    detail: copy.deepcopy(Constants.errorMessage[ec])
                }
                return reject(data);
            } else {
                if(Validation.isHTMLcontentType(resp.headers["content-type"])){
                    body = body ? body : "";
                    var finalUrl = Validation.getFinalRedirrectUrl(resp,_url);
                    var statusCode = resp.statusCode || 200;
                    data = {
                        url: finalUrl,
                        status: statusCode,
                        success: true,
                        html: body
                    }
                    return resolve(data);
                }
                return reject({
                    success: false,
                    error: "INVALID_CONTENT",
                    detail: copy.deepcopy(Constants.errorMessage["INVALID_HTML_CONTENT"])
                });
            }
        })
    })
}