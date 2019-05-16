"use strict";
const request = require("request");
const Constants = require("../helper/Constants");
const Validation = require("../helper/Validation");

var data;

var optionMaker = function(type){
    if(type=="html" || !type){
        return {headers:Constants.requestHeader};
    }
    if(type=="image"){
        return {headers:Constants.requestHeader_image};
    }   
    return {headers:Constants.requestHeader}; 
}

exports.getHtml = function(_url,_options){
    return new Promise(function(resolve, reject) {

        var option = optionMaker(_url);
        option.url = _url;
        option.gzip = true;
        request.get(option, function(error, resp, body) {
            if (error) {
                var ec = error && Validation.isObject(error) 
                    && (Validation.isString(error.code)) 
                    && error["code"] ?
                     error["code"].trim() : "Undefined Error";
                data = {
                    success: false,
                    error: ec,
                    detail: Constants.errorMessage[ec]
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
                    detail: Constants.errorMessage["INVALID_HTML_CONTENT"]
                });
            }
        })

    })
}