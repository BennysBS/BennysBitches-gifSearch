"use strict";

var benny = benny || {};

benny.getGifs = function(callback, data){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {

                var content = xhr.responseText;
                try {
                    callback(JSON.parse(content));
                } catch (e) {
                    callback(null);
                }
            }
        }
    };
    xhr.open("POST", "http://188.166.26.125:1337/", true);
    xhr.send(JSON.stringify(data));
};
