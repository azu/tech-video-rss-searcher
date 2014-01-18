/**
 * Created by azu on 2014/01/18.
 * LICENSE : MIT
 */
module.exports.onEnter = function (fn) {
    return function (proxyObject) {
        var event = proxyObject.original;
        if (event.which === 13) {
            fn.apply(null, arguments);
        }
    }
};