"use strict";

var benny = benny || {};

benny.search = {
    "action": "getSpecificData",
    "name":"camel",
    "tags":[]
};

benny.init = function(){
    var imageHolder = document.querySelector("#imgHolder");


    benny.getInputValue(function(name){
        benny.removeImages(imageHolder);
        benny.getGifs(function(result){
            if(Object.prototype.toString.call(result) === '[object Array]' ){
                var images = benny.generateImageHolders(result.length);
                benny.appendImages(imageHolder, benny.addSrcToImages(images, result));
            }
        }, benny.createSearchData(name));

    });
};

benny.getInputValue = function(callback){
    var input = document.querySelector("#nameInput");
    input.addEventListener("keyup", function(e){
        callback(input.value);
    }, false);

};

benny.createSearchData = function(name, tags){
    return {
        "action": "getSpecificData",
        "name": name,
        "tags": [name]
    };
};

benny.generateImageHolders = function(length){
    var images = [];
    for (var i = 0; i < length; i++) {
        images.push(document.createElement("img"));
    }
    return images;
};

benny.addSrcToImages = function(images, urls){
    for (var i = 0; i < images.length; i++) {
        images[i].src = urls[i];
    }
    return images;
};

benny.appendImages = function(imageHolder, images){

    for (var i = 0; i < images.length; i++) {
        imageHolder.appendChild(images[i]);
    }
};

benny.removeImages = function(imageHolder){
    while (imageHolder.hasChildNodes()) {
        imageHolder.removeChild(imageHolder.lastChild);
    }
}

window.onload = benny.init;
