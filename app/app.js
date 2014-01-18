/**
 * Created by azu on 2014/01/18.
 * LICENSE : MIT
 */
var Ractive = require("ractive");
var subscribersModel = require("./models/subscriber-model");
var searchBox = new Ractive({
    el: 'search-box',
    template: '#racive-search-box',
    data: {
        tag: ""
    }
});
var searchResult = new Ractive({
    el: 'search-result',
    template: '#racive-search-result',
    data: {
        tag: searchBox.get("tag")
    }
});
var subscriberBox = new Ractive({
    el: 'subscriber-box',
    template: '#racive-subscriber-box',
    data: {
        tags: subscribersModel.getList()
    }
});
searchResult.on("addToList", function (proxyObject) {
    subscribersModel.push(searchBox.get("tag"));
});
searchBox.observe("tag", function(newValue) {
    searchResult.set("tag", newValue);
});

searchBox.on("onEnter", require("./lib/wrapper-key-event").onEnter(function (event) {
    searchResult.set("tag", event.context.tag);
}));

