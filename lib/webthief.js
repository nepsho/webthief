"use strict";
const Validation = require("./helper/Validation");
const Scraper = require("./utils/Scraper");
const ProcessWebthief = require("./utils/ProcessWebthief");


function validateCb(cb){
    try{
        if( cb != undefined || cb != null ){
            if(!Validation.isFunction(cb)){
                throw new Error("Callback should be a function")
            }
        }
    }catch(err){
        throw new Error("Callback should be function")
    }
    return {
        success: true
    }
}


exports.getMeta = function(_url,_option,cb){
    /*
    * Validate callback function if present
    */
    if(validateCb(cb).success==false){
        return cb(validateCb(cb))
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



exports.getHtml = function(_url,cb){
    /*
    * Validate callback function if present
    */
    if(validateCb(cb).success==false){
        return cb(validateCb(cb))
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


exports.getSiteImages = function(_url,cb){
    /*
    * Validate callback function if present
    */
    if(validateCb(cb).success==false){
        return cb(validateCb(cb))
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

    return Scraper.getHtml(_url).then(function(data) {
        if(cb){
            ProcessWebthief.getImagesFromSite(data.url,data.html).then(function(data) {
                return cb(data);
            }).catch(function(data) {
                return cb(data);
            });
        }
        return ProcessWebthief.getImagesFromSite(data.url,data.html);

    }).catch(function(data) {
        if(cb){
            return cb(data);
        }
        return new Promise(function(resolve, reject) {
            reject(data);     
        });
    });
}