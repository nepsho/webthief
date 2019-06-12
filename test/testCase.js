const webthief = require("../");

const url = "https://nepsho.github.io/example/meta_tags.html";
var err;
function test_html_1(cb){
    err = null;
    webthief.getHtml(url,function(data){
        if(!data){
            err = Error("Error at test_html_1");
        } else if(data){
            if(!data.success){
                err = new Error("Error at test_html_1");
            }
        }
        return cb(err);
    });
}

function test_html_2(cb){
    err = null;
    webthief.getHtml(url).then(function(data) {
        if(!data){
            err = new Error("Error at test_html_2");
        } else if(data){
            if(!data.success){
                err = new Error("Error at test_html_2");
            }
        }
        return cb(err);
    }).catch(function(data) {
        err = new Error("Error at test_html_2");
        return cb(err);
    });
}

function test_meta_1(cb){
    err = null;
    webthief.getMeta(url,{fields:["*"]},function(data){
        if(!data){
            err = new Error("Error at test_meta_1");
        } else if(data){
            if(!data.success){
                err = new Error("Error at test_meta_1");
            }
        }
        return cb(err);
    });
}

function test_meta_2(cb){
    err = null;
    webthief.getMeta(url,{fields:["*"]}).then(function(data) {
        if(!data){
            err = new Error("Error at test_meta_2");
        } else if(data){
            if(!data.success){
                err = new Error("Error at test_meta_2");
            }
        }
        return cb(err);
    }).catch(function(data) {
        err = new Error("Error at test_meta_2");
        return cb(err);
    });
}

function test_image_1(cb){
    err = null;
    webthief.getSiteImages(url,function(data){
        if(!data){
            err = new Error("Error at test_image_1");
        } else if(data){
            if(!data.success){
                err = new Error("Error at test_image_1");
            }
        }
        return cb(err);
    });
}

function test_image_2(cb){
    err = null;
    webthief.getSiteImages(url).then(function(data) {
        if(!data){
            err = new Error("Error at test_image_2");
        } else if(data){
            if(!data.success){
                err = new Error("Error at test_image_2");
            }
        }
        return cb(err);
    }).catch(function(data) {
        err = new Error("Error at test_image_2");
        return cb(err);
    });
}

function startHtml_test(cb){
    test_html_1(function(err_1){
        if(err_1){return cb(err_1)}
        test_html_2(function(err_2){
            return cb(err_2);
        })
    })
}

function startMeta_test(cb){
    test_meta_1(function(err_1){
        if(err_1){return cb(err_1)}
        test_meta_2(function(err_2){
            return cb(err_2);
        })
    })
}

function startImages_test(cb){
    test_image_1(function(err_1){
        if(err_1){return cb(err_1)}
        test_image_2(function(err_2){
            return cb(err_2);
        })
    })
}


var startTest = function(cb){
    startHtml_test(function(er1){
        if(er1){return cb(er1)}
        startMeta_test(function(er2){
            if(er2){return cb(er2)}
            startImages_test(function(er3){
                if(er3){return cb(er3)}
                console.log("----All Test Cases Passed----");
            })
        })
    })
}

startTest(function(error){
    console.log(error);
})