"use strict";

var http = require("http");
var gif = require("./gif.js");

// Create the http server.
http.createServer(function (req, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"
    });

    var body = "";
    var data;

    req.on("data", function (chunk) {
        body += chunk.toString("utf8");

        try {
            data = JSON.parse(body);
        } catch (e) {
            //console.log("not corecct json format");
        }

        var a = getAction(data);
        try {
            a(function(result, err){
                if(err){ throw err; }
                var urls = getURL(result);
                res.write(JSON.stringify(urls));
                res.end();
            }, data);
        } catch (e) {
            //console.log(e);
        }

    });

}).listen(1337, "188.166.26.125");
console.log("sever running");


var actions = {
    "getSpecificData": function(callback, data){
        callback(searchData(data));
    },

    //"getAllData": function(callback) {},

    "default": function(callback, data){
        defaultAction(function(result){
            callback(result);
        });
    }
};

function searchData(data){
    var gifCollection = gif.getGifs();
    var nameReg = new RegExp(data.name);
    var matcedGifs = [];
    gifCollection.forEach(function(gif){
        // TODO: move this to diffrent function
        // match if gif.name contains data.name
        if(nameReg.test(gif.name)){
            matcedGifs.push(gif);
        }else{
            for (var dataTag of data.tags) {
                var tagReg = new RegExp(dataTag);

                for (var tag of gif.tags) {
                    if(tagReg.test(tag)){
                        matcedGifs.push(gif);
                    }
                }
            }
        }
    });
    return removeDuplicate(matcedGifs);
}

//TODO: might need to rewrite this :/
function removeDuplicate(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
}

function getURL(gifs){
    return gifs.map(function(gif){
        return gif.url;
    });
}

// determens what function to run
function getAction(data){
    if(data.hasOwnProperty("action")/* && data.hasOwnProperty(jsonSearch.name)
    && data.hasOwnProperty(jsonSearch.tags)*/){
        return actions[data.action] ? actions[data.action] : actions.default;
    }
    return actions.default;
}

// if there is no correct function to runt this will run
function defaultAction(callback){
    callback("No correct action blee");
}

/*
 * Test
*/
/*
var jsonSearch = {
    "action": "getSpecificData",
    "name":"ashdkjahd",
    "tags":["blue"]
};

var a = getAction(jsonSearch)
a(function(result, err){
    //console.log(result);
    var urls = getURL(result);
    console.log(urls);
}, jsonSearch);
*/
