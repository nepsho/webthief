"use strict";
const Validation = require("./helper/Validation");
const Scraper = require("./utils/Scraper");
const ProcessWebthief = require("./utils/ProcessWebthief");

exports.getmeta = function(_url,_option,cb){
    /*
    * Validate callback function if present
    */
    if(cb){
        if(!Validation.isFunction(cb)){
            return cb({
                success:false,
                error:"INVALID_CALLBACK",
                detail:"Callback should be function"
            });
        }
    }

    /*
    * To validate url before process
    */
    if(!(Validation.ValidUrl(_url))){
        if(cb){
            cb({
                success:false,
                error:"INVALID_URL",
                detail:"Url is invalid"
            });
            return;
        }
        return new Promise(function(resolve, reject) {
            reject(
                {
                    success:false,
                    error:"INVALID_URL",
                    detail:"Url is invalid"
                }
            )            
        });
    }

    /*
    * In case no url scheme found
    */
    if(!Validation.urlScheme(_url)){
        _url = "http://"+_url;
    }

    return Scraper.getHtml(_url).then(function(data) {
        if(cb){
            ProcessWebthief.getWebsiteDetails(data.url,data.html,_option).then(function(data) {
                return cb(data);
            }).catch(function(data) {
                return cb(data);
            });
        }
        return ProcessWebthief.getWebsiteDetails(data.url,data.html,_option);

    }).catch(function(data) {
        if(cb){
            return cb(data);
        }
        return new Promise(function(resolve, reject) {
            reject(data);     
        });
    });
}



exports.gethtml = function(_url,cb){
    /*
    * Validate callback function if present
    */
    if(cb){
        if(!Validation.isFunction(cb)){
            return cb({
                success:false,
                error:"INVALID_CALLBACK",
                detail:"Callback should be function"
            });
        }
    }

    /*
    * To validate url before process
    */
    if(!(Validation.ValidUrl(_url))){
        if(cb){
            return cb({
                success:false,
                error:"INVALID_URL",
                detail:"Url is invalid"
            });
        }
        return new Promise(function(resolve, reject) {
            reject(
                {
                    success:false,
                    error:"INVALID_URL",
                    detail:"Url is invalid"
                }
            )
        });
    }

    /*
    * In case no url scheme found
    */
    if(!Validation.urlScheme(_url)){
        _url = "http://"+_url;
    }

    if(cb){
        Scraper.getHtml(_url).then(function(data) {
            cb(data);
        }).catch(function(data) {
            cb(data);
        });
    }else{
        return Scraper.getHtml(_url);
    }
}
