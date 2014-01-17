/**
 * Created by azu on 2014/01/18.
 * LICENSE : MIT
 */
var Ractive = require("ractive");
var model = require("./model/search-model");
var ractive = new Ractive({
    el: 'container',
    template: '#myTemplate',
    data: { greeting: 'Hey', recipient: 'world' }
});