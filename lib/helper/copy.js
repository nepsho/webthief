const bvalid = require("bvalid");

exports.deepcopy = function(value){
    if(
        bvalid.isArray(value)  ||
        bvalid.isObject(value) ||
        bvalid.isString(value) ||
        bvalid.isNumber(value) ||
        bvalid.isNull(value)
    ) {
        return JSON.parse(JSON.stringify(value));
    }
    var type = Object.prototype.toString.call(value);
    var error = "You can not copy "+type;
    throw new Error(error);
}