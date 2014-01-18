!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.app||(f.app={})).js=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by azu on 2014/01/18.
 * LICENSE : MIT
 */
var Ractive = require("./../bower_components/ractive/build/Ractive.js");
var model = require("./model/search-model");
var ractive = new Ractive({
    el: 'container',
    template: '#myTemplate',
    data: { greeting: 'Hey', recipient: 'world' }
});



},{"./../bower_components/ractive/build/Ractive.js":3,"./model/search-model":2}],2:[function(require,module,exports){
module.exports = {
    searchIndex: [
        "i1",
        "i3",
        "index"
    ]
};
},{}],3:[function(require,module,exports){
/*
	
	Ractive - v0.3.9 - 2013-12-31
	==============================================================

	Next-generation DOM manipulation - http://ractivejs.org
	Follow @RactiveJS for updates

	--------------------------------------------------------------

	Copyright 2013 2013 Rich Harris and contributors

	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following
	conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.

*/

(function ( global ) {



var config_svg = function () {
        
        if (typeof document === 'undefined') {
            return;
        }
        return document && document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
    }();
var utils_create = function () {
        
        var create;
        try {
            Object.create(null);
            create = Object.create;
        } catch (err) {
            create = function () {
                var F = function () {
                };
                return function (proto, props) {
                    var obj;
                    if (proto === null) {
                        return {};
                    }
                    F.prototype = proto;
                    obj = new F();
                    if (props) {
                        Object.defineProperties(obj, props);
                    }
                    return obj;
                };
            }();
        }
        return create;
    }();
var config_namespaces = {
        html: 'http://www.w3.org/1999/xhtml',
        mathml: 'http://www.w3.org/1998/Math/MathML',
        svg: 'http://www.w3.org/2000/svg',
        xlink: 'http://www.w3.org/1999/xlink',
        xml: 'http://www.w3.org/XML/1998/namespace',
        xmlns: 'http://www.w3.org/2000/xmlns/'
    };
var utils_createElement = function (svg, namespaces) {
        
        if (!svg) {
            return function (type, ns) {
                if (ns && ns !== namespaces.html) {
                    throw 'This browser does not support namespaces other than http://www.w3.org/1999/xhtml. The most likely cause of this error is that you\'re trying to render SVG in an older browser. See https://github.com/RactiveJS/Ractive/wiki/SVG-and-older-browsers for more information';
                }
                return document.createElement(type);
            };
        } else {
            return function (type, ns) {
                if (!ns) {
                    return document.createElement(type);
                }
                return document.createElementNS(ns, type);
            };
        }
    }(config_svg, config_namespaces);
var config_isClient = function () {
        
        if (typeof document === 'object') {
            return true;
        }
        return false;
    }();
var utils_defineProperty = function (isClient) {
        
        try {
            Object.defineProperty({}, 'test', { value: 0 });
            if (isClient) {
                Object.defineProperty(document.createElement('div'), 'test', { value: 0 });
            }
            return Object.defineProperty;
        } catch (err) {
            return function (obj, prop, desc) {
                obj[prop] = desc.value;
            };
        }
    }(config_isClient);
var utils_defineProperties = function (createElement, defineProperty, isClient) {
        
        try {
            try {
                Object.defineProperties({}, { test: { value: 0 } });
            } catch (err) {
                throw err;
            }
            if (isClient) {
                Object.defineProperties(createElement('div'), { test: { value: 0 } });
            }
            return Object.defineProperties;
        } catch (err) {
            return function (obj, props) {
                var prop;
                for (prop in props) {
                    if (props.hasOwnProperty(prop)) {
                        defineProperty(obj, prop, props[prop]);
                    }
                }
            };
        }
    }(utils_createElement, utils_defineProperty, config_isClient);
var utils_normaliseKeypath = function () {
        
        var regex = /\[\s*(\*|[0-9]|[1-9][0-9]+)\s*\]/g;
        return function (keypath) {
            return (keypath || '').replace(regex, '.$1');
        };
    }();
var registries_adaptors = {};
var config_types = {
        TEXT: 1,
        INTERPOLATOR: 2,
        TRIPLE: 3,
        SECTION: 4,
        INVERTED: 5,
        CLOSING: 6,
        ELEMENT: 7,
        PARTIAL: 8,
        COMMENT: 9,
        DELIMCHANGE: 10,
        MUSTACHE: 11,
        TAG: 12,
        ATTRIBUTE: 13,
        COMPONENT: 15,
        NUMBER_LITERAL: 20,
        STRING_LITERAL: 21,
        ARRAY_LITERAL: 22,
        OBJECT_LITERAL: 23,
        BOOLEAN_LITERAL: 24,
        GLOBAL: 26,
        KEY_VALUE_PAIR: 27,
        REFERENCE: 30,
        REFINEMENT: 31,
        MEMBER: 32,
        PREFIX_OPERATOR: 33,
        BRACKETED: 34,
        CONDITIONAL: 35,
        INFIX_OPERATOR: 36,
        INVOCATION: 40
    };
var utils_isArray = function () {
        
        var toString = Object.prototype.toString;
        return function (thing) {
            return toString.call(thing) === '[object Array]';
        };
    }();
var shared_clearCache = function () {
        
        return function clearCache(ractive, keypath) {
            var cacheMap, wrappedProperty;
            if (wrappedProperty = ractive._wrapped[keypath]) {
                if (wrappedProperty.teardown() !== false) {
                    ractive._wrapped[keypath] = null;
                }
            }
            ractive._cache[keypath] = undefined;
            if (cacheMap = ractive._cacheMap[keypath]) {
                while (cacheMap.length) {
                    clearCache(ractive, cacheMap.pop());
                }
            }
        };
    }();
var shared_getValueFromCheckboxes = function () {
        
        return function (ractive, keypath) {
            var value, checkboxes, checkbox, len, i, rootEl;
            value = [];
            rootEl = ractive.rendered ? ractive.el : ractive.fragment.docFrag;
            checkboxes = rootEl.querySelectorAll('input[type="checkbox"][name="{{' + keypath + '}}"]');
            len = checkboxes.length;
            for (i = 0; i < len; i += 1) {
                checkbox = checkboxes[i];
                if (checkbox.hasAttribute('checked') || checkbox.checked) {
                    value[value.length] = checkbox._ractive.value;
                }
            }
            return value;
        };
    }();
var shared_preDomUpdate = function (getValueFromCheckboxes) {
        
        return function (ractive) {
            var deferred, evaluator, selectValue, attribute, keypath, radio;
            deferred = ractive._deferred;
            while (evaluator = deferred.evals.pop()) {
                evaluator.update().deferred = false;
            }
            while (selectValue = deferred.selectValues.pop()) {
                selectValue.deferredUpdate();
            }
            while (attribute = deferred.attrs.pop()) {
                attribute.update().deferred = false;
            }
            while (keypath = deferred.checkboxes.pop()) {
                ractive.set(keypath, getValueFromCheckboxes(ractive, keypath));
            }
            while (radio = deferred.radios.pop()) {
                radio.update();
            }
        };
    }(shared_getValueFromCheckboxes);
var shared_postDomUpdate = function () {
        
        return function (ractive) {
            var deferred, focusable, query, decorator, transition, observer;
            deferred = ractive._deferred;
            if (focusable = deferred.focusable) {
                focusable.focus();
                deferred.focusable = null;
            }
            while (query = deferred.liveQueries.pop()) {
                query._sort();
            }
            while (decorator = deferred.decorators.pop()) {
                decorator.init();
            }
            while (transition = deferred.transitions.pop()) {
                transition.init();
            }
            while (observer = deferred.observers.pop()) {
                observer.update();
            }
        };
    }();
var shared_makeTransitionManager = function () {
        
        var makeTransitionManager = function (root, callback) {
            var transitionManager, elementsToDetach, detachNodes, nodeHasNoTransitioningChildren;
            if (root._parent && root._parent._transitionManager) {
                return root._parent._transitionManager;
            }
            elementsToDetach = [];
            detachNodes = function () {
                var i, element;
                i = elementsToDetach.length;
                while (i--) {
                    element = elementsToDetach[i];
                    if (nodeHasNoTransitioningChildren(element.node)) {
                        element.detach();
                        elementsToDetach.splice(i, 1);
                    }
                }
            };
            nodeHasNoTransitioningChildren = function (node) {
                var i, candidate;
                i = transitionManager.active.length;
                while (i--) {
                    candidate = transitionManager.active[i];
                    if (node.contains(candidate)) {
                        return false;
                    }
                }
                return true;
            };
            transitionManager = {
                active: [],
                push: function (node) {
                    transitionManager.active[transitionManager.active.length] = node;
                },
                pop: function (node) {
                    var index;
                    index = transitionManager.active.indexOf(node);
                    if (index === -1) {
                        return;
                    }
                    transitionManager.active.splice(index, 1);
                    detachNodes();
                    if (!transitionManager.active.length && transitionManager._ready) {
                        transitionManager.complete();
                    }
                },
                complete: function () {
                    if (callback) {
                        callback.call(root);
                    }
                },
                ready: function () {
                    detachNodes();
                    transitionManager._ready = true;
                    if (!transitionManager.active.length) {
                        transitionManager.complete();
                    }
                },
                detachWhenReady: function (element) {
                    elementsToDetach[elementsToDetach.length] = element;
                }
            };
            return transitionManager;
        };
        return makeTransitionManager;
    }();
var shared_notifyDependants = function () {
        
        var notifyDependants, lastKey, starMaps = {};
        lastKey = /[^\.]+$/;
        notifyDependants = function (ractive, keypath, onlyDirect) {
            var i;
            if (ractive._patternObservers.length) {
                notifyPatternObservers(ractive, keypath, keypath, onlyDirect, true);
            }
            for (i = 0; i < ractive._deps.length; i += 1) {
                notifyDependantsAtPriority(ractive, keypath, i, onlyDirect);
            }
        };
        notifyDependants.multiple = function (ractive, keypaths, onlyDirect) {
            var i, j, len;
            len = keypaths.length;
            if (ractive._patternObservers.length) {
                i = len;
                while (i--) {
                    notifyPatternObservers(ractive, keypaths[i], keypaths[i], onlyDirect, true);
                }
            }
            for (i = 0; i < ractive._deps.length; i += 1) {
                if (ractive._deps[i]) {
                    j = len;
                    while (j--) {
                        notifyDependantsAtPriority(ractive, keypaths[j], i, onlyDirect);
                    }
                }
            }
        };
        return notifyDependants;
        function notifyDependantsAtPriority(ractive, keypath, priority, onlyDirect) {
            var depsByKeypath = ractive._deps[priority];
            if (!depsByKeypath) {
                return;
            }
            updateAll(depsByKeypath[keypath]);
            if (onlyDirect) {
                return;
            }
            cascade(ractive._depsMap[keypath], ractive, priority);
        }
        function updateAll(deps) {
            var i, len;
            if (deps) {
                len = deps.length;
                for (i = 0; i < len; i += 1) {
                    deps[i].update();
                }
            }
        }
        function cascade(childDeps, ractive, priority, onlyDirect) {
            var i;
            if (childDeps) {
                i = childDeps.length;
                while (i--) {
                    notifyDependantsAtPriority(ractive, childDeps[i], priority, onlyDirect);
                }
            }
        }
        function notifyPatternObservers(ractive, registeredKeypath, actualKeypath, isParentOfChangedKeypath, isTopLevelCall) {
            var i, patternObserver, children, child, key, childActualKeypath, potentialWildcardMatches, cascade;
            i = ractive._patternObservers.length;
            while (i--) {
                patternObserver = ractive._patternObservers[i];
                if (patternObserver.regex.test(actualKeypath)) {
                    patternObserver.update(actualKeypath);
                }
            }
            if (isParentOfChangedKeypath) {
                return;
            }
            cascade = function (keypath) {
                if (children = ractive._depsMap[keypath]) {
                    i = children.length;
                    while (i--) {
                        child = children[i];
                        key = lastKey.exec(child)[0];
                        childActualKeypath = actualKeypath + '.' + key;
                        notifyPatternObservers(ractive, child, childActualKeypath);
                    }
                }
            };
            if (isTopLevelCall) {
                potentialWildcardMatches = getPotentialWildcardMatches(actualKeypath);
                potentialWildcardMatches.forEach(cascade);
            } else {
                cascade(registeredKeypath);
            }
        }
        function getPotentialWildcardMatches(keypath) {
            var keys, starMap, mapper, i, result, wildcardKeypath;
            keys = keypath.split('.');
            starMap = getStarMap(keys.length);
            result = [];
            mapper = function (star, i) {
                return star ? '*' : keys[i];
            };
            i = starMap.length;
            while (i--) {
                wildcardKeypath = starMap[i].map(mapper).join('.');
                if (!result[wildcardKeypath]) {
                    result[result.length] = wildcardKeypath;
                    result[wildcardKeypath] = true;
                }
            }
            return result;
        }
        function getStarMap(num) {
            var ones = '', max, binary, starMap, mapper, i;
            if (!starMaps[num]) {
                starMap = [];
                while (ones.length < num) {
                    ones += 1;
                }
                max = parseInt(ones, 2);
                mapper = function (digit) {
                    return digit === '1';
                };
                for (i = 0; i <= max; i += 1) {
                    binary = i.toString(2);
                    while (binary.length < num) {
                        binary = '0' + binary;
                    }
                    starMap[i] = Array.prototype.map.call(binary, mapper);
                }
                starMaps[num] = starMap;
            }
            return starMaps[num];
        }
    }();
var Ractive_prototype_get_arrayAdaptor = function (types, defineProperty, isArray, clearCache, preDomUpdate, postDomUpdate, makeTransitionManager, notifyDependants) {
        
        var arrayAdaptor, notifyArrayDependants, ArrayWrapper, patchArrayMethods, unpatchArrayMethods, patchedArrayProto, testObj, mutatorMethods, noop, errorMessage;
        arrayAdaptor = {
            filter: function (object) {
                return isArray(object) && (!object._ractive || !object._ractive.setting);
            },
            wrap: function (ractive, array, keypath) {
                return new ArrayWrapper(ractive, array, keypath);
            }
        };
        ArrayWrapper = function (ractive, array, keypath) {
            this.root = ractive;
            this.value = array;
            this.keypath = keypath;
            if (!array._ractive) {
                defineProperty(array, '_ractive', {
                    value: {
                        wrappers: [],
                        instances: [],
                        setting: false
                    },
                    configurable: true
                });
                patchArrayMethods(array);
            }
            if (!array._ractive.instances[ractive._guid]) {
                array._ractive.instances[ractive._guid] = 0;
                array._ractive.instances.push(ractive);
            }
            array._ractive.instances[ractive._guid] += 1;
            array._ractive.wrappers.push(this);
        };
        ArrayWrapper.prototype = {
            get: function () {
                return this.value;
            },
            teardown: function () {
                var array, storage, wrappers, instances, index;
                array = this.value;
                storage = array._ractive;
                wrappers = storage.wrappers;
                instances = storage.instances;
                if (storage.setting) {
                    return false;
                }
                index = wrappers.indexOf(this);
                if (index === -1) {
                    throw new Error(errorMessage);
                }
                wrappers.splice(index, 1);
                if (!wrappers.length) {
                    delete array._ractive;
                    unpatchArrayMethods(this.value);
                } else {
                    instances[this.root._guid] -= 1;
                    if (!instances[this.root._guid]) {
                        index = instances.indexOf(this.root);
                        if (index === -1) {
                            throw new Error(errorMessage);
                        }
                        instances.splice(index, 1);
                    }
                }
            }
        };
        notifyArrayDependants = function (array, methodName, args) {
            var notifyKeypathDependants, queueDependants, wrappers, wrapper, i;
            notifyKeypathDependants = function (root, keypath) {
                var depsByKeypath, deps, keys, upstreamQueue, smartUpdateQueue, dumbUpdateQueue, i, changed, start, end, childKeypath, lengthUnchanged;
                if (methodName === 'sort' || methodName === 'reverse') {
                    root.set(keypath, array);
                    return;
                }
                clearCache(root, keypath);
                smartUpdateQueue = [];
                dumbUpdateQueue = [];
                for (i = 0; i < root._deps.length; i += 1) {
                    depsByKeypath = root._deps[i];
                    if (!depsByKeypath) {
                        continue;
                    }
                    deps = depsByKeypath[keypath];
                    if (deps) {
                        queueDependants(keypath, deps, smartUpdateQueue, dumbUpdateQueue);
                        preDomUpdate(root);
                        while (smartUpdateQueue.length) {
                            smartUpdateQueue.pop().smartUpdate(methodName, args);
                        }
                        while (dumbUpdateQueue.length) {
                            dumbUpdateQueue.pop().update();
                        }
                    }
                }
                if (methodName === 'splice' && args.length > 2 && args[1]) {
                    changed = Math.min(args[1], args.length - 2);
                    start = args[0];
                    end = start + changed;
                    if (args[1] === args.length - 2) {
                        lengthUnchanged = true;
                    }
                    for (i = start; i < end; i += 1) {
                        childKeypath = keypath + '.' + i;
                        notifyDependants(root, childKeypath);
                    }
                }
                preDomUpdate(root);
                upstreamQueue = [];
                keys = keypath.split('.');
                while (keys.length) {
                    keys.pop();
                    upstreamQueue[upstreamQueue.length] = keys.join('.');
                }
                notifyDependants.multiple(root, upstreamQueue, true);
                if (!lengthUnchanged) {
                    notifyDependants(root, keypath + '.length', true);
                }
            };
            queueDependants = function (keypath, deps, smartUpdateQueue, dumbUpdateQueue) {
                var k, dependant;
                k = deps.length;
                while (k--) {
                    dependant = deps[k];
                    if (dependant.type === types.REFERENCE) {
                        dependant.update();
                    } else if (dependant.keypath === keypath && dependant.type === types.SECTION && !dependant.inverted && dependant.docFrag) {
                        smartUpdateQueue[smartUpdateQueue.length] = dependant;
                    } else {
                        dumbUpdateQueue[dumbUpdateQueue.length] = dependant;
                    }
                }
            };
            wrappers = array._ractive.wrappers;
            i = wrappers.length;
            while (i--) {
                wrapper = wrappers[i];
                notifyKeypathDependants(wrapper.root, wrapper.keypath);
            }
        };
        patchedArrayProto = [];
        mutatorMethods = [
            'pop',
            'push',
            'reverse',
            'shift',
            'sort',
            'splice',
            'unshift'
        ];
        noop = function () {
        };
        mutatorMethods.forEach(function (methodName) {
            var method = function () {
                var result, instances, instance, i, previousTransitionManagers = {}, transitionManagers = {};
                result = Array.prototype[methodName].apply(this, arguments);
                instances = this._ractive.instances;
                i = instances.length;
                while (i--) {
                    instance = instances[i];
                    previousTransitionManagers[instance._guid] = instance._transitionManager;
                    instance._transitionManager = transitionManagers[instance._guid] = makeTransitionManager(instance, noop);
                }
                this._ractive.setting = true;
                notifyArrayDependants(this, methodName, arguments);
                this._ractive.setting = false;
                i = instances.length;
                while (i--) {
                    instance = instances[i];
                    instance._transitionManager = previousTransitionManagers[instance._guid];
                    transitionManagers[instance._guid].ready();
                    preDomUpdate(instance);
                    postDomUpdate(instance);
                }
                return result;
            };
            defineProperty(patchedArrayProto, methodName, { value: method });
        });
        testObj = {};
        if (testObj.__proto__) {
            patchArrayMethods = function (array) {
                array.__proto__ = patchedArrayProto;
            };
            unpatchArrayMethods = function (array) {
                array.__proto__ = Array.prototype;
            };
        } else {
            patchArrayMethods = function (array) {
                var i, methodName;
                i = mutatorMethods.length;
                while (i--) {
                    methodName = mutatorMethods[i];
                    defineProperty(array, methodName, {
                        value: patchedArrayProto[methodName],
                        configurable: true
                    });
                }
            };
            unpatchArrayMethods = function (array) {
                var i;
                i = mutatorMethods.length;
                while (i--) {
                    delete array[mutatorMethods[i]];
                }
            };
        }
        errorMessage = 'Something went wrong in a rather interesting way';
        return arrayAdaptor;
    }(config_types, utils_defineProperty, utils_isArray, shared_clearCache, shared_preDomUpdate, shared_postDomUpdate, shared_makeTransitionManager, shared_notifyDependants);
var Ractive_prototype_get_magicAdaptor = function () {
        
        var magicAdaptor, MagicWrapper;
        try {
            Object.defineProperty({}, 'test', { value: 0 });
        } catch (err) {
            return false;
        }
        magicAdaptor = {
            filter: function (object, keypath) {
                return !!keypath;
            },
            wrap: function (ractive, object, keypath) {
                return new MagicWrapper(ractive, object, keypath);
            }
        };
        MagicWrapper = function (ractive, object, keypath) {
            var wrapper = this, keys, prop, objKeypath, descriptor, wrappers, oldGet, oldSet, get, set;
            this.ractive = ractive;
            this.keypath = keypath;
            keys = keypath.split('.');
            this.prop = keys.pop();
            objKeypath = keys.join('.');
            this.obj = objKeypath ? ractive.get(objKeypath) : ractive.data;
            descriptor = this.originalDescriptor = Object.getOwnPropertyDescriptor(this.obj, this.prop);
            if (descriptor && descriptor.set && (wrappers = descriptor.set._ractiveWrappers)) {
                if (wrappers.indexOf(this) === -1) {
                    wrappers.push(this);
                }
                return;
            }
            if (descriptor && !descriptor.configurable) {
                throw new Error('Cannot use magic mode with property "' + prop + '" - object is not configurable');
            }
            if (descriptor) {
                this.value = descriptor.value;
                oldGet = descriptor.get;
                oldSet = descriptor.set;
            }
            get = oldGet || function () {
                return wrapper.value;
            };
            set = function (value) {
                var wrappers, wrapper, i;
                if (oldSet) {
                    oldSet(value);
                }
                wrappers = set._ractiveWrappers;
                i = wrappers.length;
                while (i--) {
                    wrapper = wrappers[i];
                    if (!wrapper.resetting) {
                        wrapper.ractive.set(wrapper.keypath, value);
                    }
                }
            };
            set._ractiveWrappers = [this];
            Object.defineProperty(this.obj, this.prop, {
                get: get,
                set: set,
                enumerable: true,
                configurable: true
            });
        };
        MagicWrapper.prototype = {
            get: function () {
                return this.value;
            },
            reset: function (value) {
                this.resetting = true;
                this.value = value;
                this.resetting = false;
            },
            teardown: function () {
                var descriptor, set, value, wrappers;
                descriptor = Object.getOwnPropertyDescriptor(this.obj, this.prop);
                set = descriptor.set;
                wrappers = set._ractiveWrappers;
                wrappers.splice(wrappers.indexOf(this), 1);
                if (!wrappers.length) {
                    value = this.obj[this.prop];
                    Object.defineProperty(this.obj, this.prop, this.originalDescriptor || {
                        writable: true,
                        enumerable: true,
                        configrable: true
                    });
                    this.obj[this.prop] = value;
                }
            }
        };
        return magicAdaptor;
    }();
var shared_adaptIfNecessary = function (adaptorRegistry, arrayAdaptor, magicAdaptor) {
        
        var prefixers = {};
        return function (ractive, keypath, value, isExpressionResult) {
            var len, i, adaptor, wrapped;
            len = ractive.adaptors.length;
            for (i = 0; i < len; i += 1) {
                adaptor = ractive.adaptors[i];
                if (typeof adaptor === 'string') {
                    if (!adaptorRegistry[adaptor]) {
                        throw new Error('Missing adaptor "' + adaptor + '"');
                    }
                    adaptor = ractive.adaptors[i] = adaptorRegistry[adaptor];
                }
                if (adaptor.filter(value, keypath, ractive)) {
                    wrapped = ractive._wrapped[keypath] = adaptor.wrap(ractive, value, keypath, getPrefixer(keypath));
                    wrapped.value = value;
                    return;
                }
            }
            if (!isExpressionResult) {
                if (ractive.magic && magicAdaptor.filter(value, keypath, ractive)) {
                    ractive._wrapped[keypath] = magicAdaptor.wrap(ractive, value, keypath);
                } else if (ractive.modifyArrays && arrayAdaptor.filter(value, keypath, ractive)) {
                    ractive._wrapped[keypath] = arrayAdaptor.wrap(ractive, value, keypath);
                }
            }
        };
        function prefixKeypath(obj, prefix) {
            var prefixed = {}, key;
            if (!prefix) {
                return obj;
            }
            prefix += '.';
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    prefixed[prefix + key] = obj[key];
                }
            }
            return prefixed;
        }
        function getPrefixer(rootKeypath) {
            var rootDot;
            if (!prefixers[rootKeypath]) {
                rootDot = rootKeypath ? rootKeypath + '.' : '';
                prefixers[rootKeypath] = function (relativeKeypath, value) {
                    var obj;
                    if (typeof relativeKeypath === 'string') {
                        obj = {};
                        obj[rootDot + relativeKeypath] = value;
                        return obj;
                    }
                    if (typeof relativeKeypath === 'object') {
                        return rootDot ? prefixKeypath(relativeKeypath, rootKeypath) : relativeKeypath;
                    }
                };
            }
            return prefixers[rootKeypath];
        }
    }(registries_adaptors, Ractive_prototype_get_arrayAdaptor, Ractive_prototype_get_magicAdaptor);
var Ractive_prototype_get__get = function (normaliseKeypath, adaptorRegistry, adaptIfNecessary) {
        
        var get, _get, retrieve;
        get = function (keypath) {
            if (this._captured && !this._captured[keypath]) {
                this._captured.push(keypath);
                this._captured[keypath] = true;
            }
            return _get(this, keypath);
        };
        _get = function (ractive, keypath) {
            var cache, cached, value, wrapped, evaluator;
            keypath = normaliseKeypath(keypath);
            cache = ractive._cache;
            if ((cached = cache[keypath]) !== undefined) {
                return cached;
            }
            if (wrapped = ractive._wrapped[keypath]) {
                value = wrapped.value;
            } else if (!keypath) {
                adaptIfNecessary(ractive, '', ractive.data);
                value = ractive.data;
            } else if (evaluator = ractive._evaluators[keypath]) {
                value = evaluator.value;
            } else {
                value = retrieve(ractive, keypath);
            }
            cache[keypath] = value;
            return value;
        };
        retrieve = function (ractive, keypath) {
            var keys, key, parentKeypath, parentValue, cacheMap, value, wrapped;
            keys = keypath.split('.');
            key = keys.pop();
            parentKeypath = keys.join('.');
            parentValue = _get(ractive, parentKeypath);
            if (wrapped = ractive._wrapped[parentKeypath]) {
                parentValue = wrapped.get();
            }
            if (parentValue === null || parentValue === undefined) {
                return;
            }
            if (!(cacheMap = ractive._cacheMap[parentKeypath])) {
                ractive._cacheMap[parentKeypath] = [keypath];
            } else {
                if (cacheMap.indexOf(keypath) === -1) {
                    cacheMap[cacheMap.length] = keypath;
                }
            }
            value = parentValue[key];
            adaptIfNecessary(ractive, keypath, value);
            ractive._cache[keypath] = value;
            return value;
        };
        return get;
    }(utils_normaliseKeypath, registries_adaptors, shared_adaptIfNecessary);
var utils_isObject = function () {
        
        var toString = Object.prototype.toString;
        return function (thing) {
            return typeof thing === 'object' && toString.call(thing) === '[object Object]';
        };
    }();
var utils_isEqual = function () {
        
        return function (a, b) {
            if (a === null && b === null) {
                return true;
            }
            if (typeof a === 'object' || typeof b === 'object') {
                return false;
            }
            return a === b;
        };
    }();
var shared_resolveRef = function () {
        
        var resolveRef;
        resolveRef = function (ractive, ref, contextStack) {
            var keypath, keys, lastKey, contextKeys, innerMostContext, postfix, parentKeypath, parentValue, wrapped, context, ancestorErrorMessage;
            ancestorErrorMessage = 'Could not resolve reference - too many "../" prefixes';
            if (ref === '.') {
                if (!contextStack.length) {
                    return '';
                }
                keypath = contextStack[contextStack.length - 1];
            } else if (ref.charAt(0) === '.') {
                context = contextStack[contextStack.length - 1];
                contextKeys = context ? context.split('.') : [];
                if (ref.substr(0, 3) === '../') {
                    while (ref.substr(0, 3) === '../') {
                        if (!contextKeys.length) {
                            throw new Error(ancestorErrorMessage);
                        }
                        contextKeys.pop();
                        ref = ref.substring(3);
                    }
                    contextKeys.push(ref);
                    keypath = contextKeys.join('.');
                } else if (!context) {
                    keypath = ref.substring(1);
                } else {
                    keypath = context + ref;
                }
            } else {
                keys = ref.split('.');
                lastKey = keys.pop();
                postfix = keys.length ? '.' + keys.join('.') : '';
                contextStack = contextStack.concat();
                while (contextStack.length) {
                    innerMostContext = contextStack.pop();
                    parentKeypath = innerMostContext + postfix;
                    parentValue = ractive.get(parentKeypath);
                    if (wrapped = ractive._wrapped[parentKeypath]) {
                        parentValue = wrapped.get();
                    }
                    if (typeof parentValue === 'object' && parentValue !== null && parentValue.hasOwnProperty(lastKey)) {
                        keypath = innerMostContext + '.' + ref;
                        break;
                    }
                }
                if (!keypath && ractive.get(ref) !== undefined) {
                    keypath = ref;
                }
            }
            return keypath ? keypath.replace(/^\./, '') : keypath;
        };
        return resolveRef;
    }();
var shared_attemptKeypathResolution = function (resolveRef) {
        
        var push = Array.prototype.push;
        return function (ractive) {
            var unresolved, keypath, leftover;
            while (unresolved = ractive._pendingResolution.pop()) {
                keypath = resolveRef(ractive, unresolved.ref, unresolved.contextStack);
                if (keypath !== undefined) {
                    unresolved.resolve(keypath);
                } else {
                    (leftover || (leftover = [])).push(unresolved);
                }
            }
            if (leftover) {
                push.apply(ractive._pendingResolution, leftover);
            }
        };
    }(shared_resolveRef);
var shared_processDeferredUpdates = function (preDomUpdate, postDomUpdate) {
        
        return function (ractive) {
            preDomUpdate(ractive);
            postDomUpdate(ractive);
        };
    }(shared_preDomUpdate, shared_postDomUpdate);
var Ractive_prototype_shared_replaceData = function () {
        
        return function (ractive, keypath, value) {
            var keys, accumulated, wrapped, obj, key, currentKeypath, keypathToClear;
            keys = keypath.split('.');
            accumulated = [];
            if (wrapped = ractive._wrapped['']) {
                if (wrapped.set) {
                    wrapped.set(keys.join('.'), value);
                }
                obj = wrapped.get();
            } else {
                obj = ractive.data;
            }
            while (keys.length > 1) {
                key = accumulated[accumulated.length] = keys.shift();
                currentKeypath = accumulated.join('.');
                if (wrapped = ractive._wrapped[currentKeypath]) {
                    if (wrapped.set) {
                        wrapped.set(keys.join('.'), value);
                    }
                    obj = wrapped.get();
                } else {
                    if (!obj.hasOwnProperty(key)) {
                        if (!keypathToClear) {
                            keypathToClear = currentKeypath;
                        }
                        obj[key] = /^\s*[0-9]+\s*$/.test(keys[0]) ? [] : {};
                    }
                    obj = obj[key];
                }
            }
            key = keys[0];
            obj[key] = value;
            return keypathToClear;
        };
    }();
var Ractive_prototype_set = function (isObject, isEqual, normaliseKeypath, clearCache, notifyDependants, attemptKeypathResolution, makeTransitionManager, processDeferredUpdates, replaceData) {
        
        var set, updateModel, getUpstreamChanges, resetWrapped;
        set = function (keypath, value, complete) {
            var map, changes, upstreamChanges, previousTransitionManager, transitionManager, i, changeHash;
            changes = [];
            if (isObject(keypath)) {
                map = keypath;
                complete = value;
            }
            if (map) {
                for (keypath in map) {
                    if (map.hasOwnProperty(keypath)) {
                        value = map[keypath];
                        keypath = normaliseKeypath(keypath);
                        updateModel(this, keypath, value, changes);
                    }
                }
            } else {
                keypath = normaliseKeypath(keypath);
                updateModel(this, keypath, value, changes);
            }
            if (!changes.length) {
                return;
            }
            previousTransitionManager = this._transitionManager;
            this._transitionManager = transitionManager = makeTransitionManager(this, complete);
            upstreamChanges = getUpstreamChanges(changes);
            if (upstreamChanges.length) {
                notifyDependants.multiple(this, upstreamChanges, true);
            }
            notifyDependants.multiple(this, changes);
            if (this._pendingResolution.length) {
                attemptKeypathResolution(this);
            }
            processDeferredUpdates(this);
            this._transitionManager = previousTransitionManager;
            transitionManager.ready();
            if (!this.firingChangeEvent) {
                this.firingChangeEvent = true;
                changeHash = {};
                i = changes.length;
                while (i--) {
                    changeHash[changes[i]] = this.get(changes[i]);
                }
                this.fire('change', changeHash);
                this.firingChangeEvent = false;
            }
            return this;
        };
        updateModel = function (ractive, keypath, value, changes) {
            var cached, previous, wrapped, keypathToClear, evaluator;
            if ((wrapped = ractive._wrapped[keypath]) && wrapped.reset) {
                if (resetWrapped(ractive, keypath, value, wrapped, changes) !== false) {
                    return;
                }
            }
            if (evaluator = ractive._evaluators[keypath]) {
                evaluator.value = value;
            }
            cached = ractive._cache[keypath];
            previous = ractive.get(keypath);
            if (previous !== value && !evaluator) {
                keypathToClear = replaceData(ractive, keypath, value);
            } else {
                if (value === cached && typeof value !== 'object') {
                    return;
                }
            }
            clearCache(ractive, keypathToClear || keypath);
            changes[changes.length] = keypath;
        };
        getUpstreamChanges = function (changes) {
            var upstreamChanges = [''], i, keypath, keys, upstreamKeypath;
            i = changes.length;
            while (i--) {
                keypath = changes[i];
                keys = keypath.split('.');
                while (keys.length > 1) {
                    keys.pop();
                    upstreamKeypath = keys.join('.');
                    if (!upstreamChanges[upstreamKeypath]) {
                        upstreamChanges[upstreamChanges.length] = upstreamKeypath;
                        upstreamChanges[upstreamKeypath] = true;
                    }
                }
            }
            return upstreamChanges;
        };
        resetWrapped = function (ractive, keypath, value, wrapped, changes) {
            var previous, cached, cacheMap, i;
            previous = wrapped.get();
            if (!isEqual(previous, value)) {
                if (wrapped.reset(value) === false) {
                    return false;
                }
            }
            value = wrapped.get();
            cached = ractive._cache[keypath];
            if (!isEqual(cached, value)) {
                ractive._cache[keypath] = value;
                cacheMap = ractive._cacheMap[keypath];
                if (cacheMap) {
                    i = cacheMap.length;
                    while (i--) {
                        clearCache(ractive, cacheMap[i]);
                    }
                }
                changes[changes.length] = keypath;
            }
        };
        return set;
    }(utils_isObject, utils_isEqual, utils_normaliseKeypath, shared_clearCache, shared_notifyDependants, shared_attemptKeypathResolution, shared_makeTransitionManager, shared_processDeferredUpdates, Ractive_prototype_shared_replaceData);
var Ractive_prototype_update = function (makeTransitionManager, attemptKeypathResolution, clearCache, notifyDependants, processDeferredUpdates) {
        
        return function (keypath, complete) {
            var transitionManager, previousTransitionManager;
            if (typeof keypath === 'function') {
                complete = keypath;
                keypath = '';
            }
            previousTransitionManager = this._transitionManager;
            this._transitionManager = transitionManager = makeTransitionManager(this, complete);
            attemptKeypathResolution(this);
            clearCache(this, keypath || '');
            notifyDependants(this, keypath || '');
            processDeferredUpdates(this);
            this._transitionManager = previousTransitionManager;
            transitionManager.ready();
            if (typeof keypath === 'string') {
                this.fire('update', keypath);
            } else {
                this.fire('update');
            }
            return this;
        };
    }(shared_makeTransitionManager, shared_attemptKeypathResolution, shared_clearCache, shared_notifyDependants, shared_processDeferredUpdates);
var utils_arrayContentsMatch = function (isArray) {
        
        return function (a, b) {
            var i;
            if (!isArray(a) || !isArray(b)) {
                return false;
            }
            if (a.length !== b.length) {
                return false;
            }
            i = a.length;
            while (i--) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
            return true;
        };
    }(utils_isArray);
var Ractive_prototype_updateModel = function (getValueFromCheckboxes, arrayContentsMatch, isEqual) {
        
        return function (keypath, cascade) {
            var values, deferredCheckboxes, i;
            if (typeof keypath !== 'string') {
                keypath = '';
                cascade = true;
            }
            consolidateChangedValues(this, keypath, values = {}, deferredCheckboxes = [], cascade);
            if (i = deferredCheckboxes.length) {
                while (i--) {
                    keypath = deferredCheckboxes[i];
                    values[keypath] = getValueFromCheckboxes(this, keypath);
                }
            }
            this.set(values);
        };
        function consolidateChangedValues(ractive, keypath, values, deferredCheckboxes, cascade) {
            var bindings, childDeps, i, binding, oldValue, newValue;
            bindings = ractive._twowayBindings[keypath];
            if (bindings) {
                i = bindings.length;
                while (i--) {
                    binding = bindings[i];
                    if (binding.radioName && !binding.node.checked) {
                        continue;
                    }
                    if (binding.checkboxName) {
                        if (binding.changed() && !deferredCheckboxes[keypath]) {
                            deferredCheckboxes[keypath] = true;
                            deferredCheckboxes[deferredCheckboxes.length] = keypath;
                        }
                        continue;
                    }
                    oldValue = binding.attr.value;
                    newValue = binding.value();
                    if (arrayContentsMatch(oldValue, newValue)) {
                        continue;
                    }
                    if (!isEqual(oldValue, newValue)) {
                        values[keypath] = newValue;
                    }
                }
            }
            if (!cascade) {
                return;
            }
            childDeps = ractive._depsMap[keypath];
            if (childDeps) {
                i = childDeps.length;
                while (i--) {
                    consolidateChangedValues(ractive, childDeps[i], values, deferredCheckboxes, cascade);
                }
            }
        }
    }(shared_getValueFromCheckboxes, utils_arrayContentsMatch, utils_isEqual);
var Ractive_prototype_animate_requestAnimationFrame = function () {
        
        if (typeof window === 'undefined') {
            return;
        }
        (function (vendors, lastTime, window) {
            var x, setTimeout;
            if (window.requestAnimationFrame) {
                return;
            }
            for (x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            }
            if (!window.requestAnimationFrame) {
                setTimeout = window.setTimeout;
                window.requestAnimationFrame = function (callback) {
                    var currTime, timeToCall, id;
                    currTime = Date.now();
                    timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    id = setTimeout(function () {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            }
        }([
            'ms',
            'moz',
            'webkit',
            'o'
        ], 0, window));
        return window.requestAnimationFrame;
    }();
var Ractive_prototype_animate_animations = function (rAF) {
        
        var queue = [];
        var animations = {
                tick: function () {
                    var i, animation;
                    for (i = 0; i < queue.length; i += 1) {
                        animation = queue[i];
                        if (!animation.tick()) {
                            queue.splice(i--, 1);
                        }
                    }
                    if (queue.length) {
                        rAF(animations.tick);
                    } else {
                        animations.running = false;
                    }
                },
                add: function (animation) {
                    queue[queue.length] = animation;
                    if (!animations.running) {
                        animations.running = true;
                        animations.tick();
                    }
                },
                abort: function (keypath, root) {
                    var i = queue.length, animation;
                    while (i--) {
                        animation = queue[i];
                        if (animation.root === root && animation.keypath === keypath) {
                            animation.stop();
                        }
                    }
                }
            };
        return animations;
    }(Ractive_prototype_animate_requestAnimationFrame);
var utils_warn = function () {
        
        if (typeof console !== 'undefined' && typeof console.warn === 'function' && typeof console.warn.apply === 'function') {
            return function () {
                console.warn.apply(console, arguments);
            };
        }
        return function () {
        };
    }();
var utils_isNumeric = function () {
        
        return function (thing) {
            return !isNaN(parseFloat(thing)) && isFinite(thing);
        };
    }();
var shared_interpolate = function (isArray, isObject, isNumeric) {
        
        var interpolate = function (from, to) {
            if (isNumeric(from) && isNumeric(to)) {
                return makeNumberInterpolator(+from, +to);
            }
            if (isArray(from) && isArray(to)) {
                return makeArrayInterpolator(from, to);
            }
            if (isObject(from) && isObject(to)) {
                return makeObjectInterpolator(from, to);
            }
            return function () {
                return to;
            };
        };
        return interpolate;
        function makeNumberInterpolator(from, to) {
            var delta = to - from;
            if (!delta) {
                return function () {
                    return from;
                };
            }
            return function (t) {
                return from + t * delta;
            };
        }
        function makeArrayInterpolator(from, to) {
            var intermediate, interpolators, len, i;
            intermediate = [];
            interpolators = [];
            i = len = Math.min(from.length, to.length);
            while (i--) {
                interpolators[i] = interpolate(from[i], to[i]);
            }
            for (i = len; i < from.length; i += 1) {
                intermediate[i] = from[i];
            }
            for (i = len; i < to.length; i += 1) {
                intermediate[i] = to[i];
            }
            return function (t) {
                var i = len;
                while (i--) {
                    intermediate[i] = interpolators[i](t);
                }
                return intermediate;
            };
        }
        function makeObjectInterpolator(from, to) {
            var properties = [], len, interpolators, intermediate, prop;
            intermediate = {};
            interpolators = {};
            for (prop in from) {
                if (from.hasOwnProperty(prop)) {
                    if (to.hasOwnProperty(prop)) {
                        properties[properties.length] = prop;
                        interpolators[prop] = interpolate(from[prop], to[prop]);
                    } else {
                        intermediate[prop] = from[prop];
                    }
                }
            }
            for (prop in to) {
                if (to.hasOwnProperty(prop) && !from.hasOwnProperty(prop)) {
                    intermediate[prop] = to[prop];
                }
            }
            len = properties.length;
            return function (t) {
                var i = len, prop;
                while (i--) {
                    prop = properties[i];
                    intermediate[prop] = interpolators[prop](t);
                }
                return intermediate;
            };
        }
    }(utils_isArray, utils_isObject, utils_isNumeric);
var Ractive_prototype_animate_Animation = function (warn, interpolate) {
        
        var Animation = function (options) {
            var key;
            this.startTime = Date.now();
            for (key in options) {
                if (options.hasOwnProperty(key)) {
                    this[key] = options[key];
                }
            }
            this.interpolator = interpolate(this.from, this.to);
            this.running = true;
        };
        Animation.prototype = {
            tick: function () {
                var elapsed, t, value, timeNow, index, keypath;
                keypath = this.keypath;
                if (this.running) {
                    timeNow = Date.now();
                    elapsed = timeNow - this.startTime;
                    if (elapsed >= this.duration) {
                        if (keypath !== null) {
                            this.root.set(keypath, this.to);
                        }
                        if (this.step) {
                            this.step(1, this.to);
                        }
                        if (this.complete) {
                            this.complete(1, this.to);
                        }
                        index = this.root._animations.indexOf(this);
                        if (index === -1) {
                            warn('Animation was not found');
                        }
                        this.root._animations.splice(index, 1);
                        this.running = false;
                        return false;
                    }
                    t = this.easing ? this.easing(elapsed / this.duration) : elapsed / this.duration;
                    if (keypath !== null) {
                        value = this.interpolator(t);
                        this.root.set(keypath, value);
                    }
                    if (this.step) {
                        this.step(t, value);
                    }
                    return true;
                }
                return false;
            },
            stop: function () {
                var index;
                this.running = false;
                index = this.root._animations.indexOf(this);
                if (index === -1) {
                    warn('Animation was not found');
                }
                this.root._animations.splice(index, 1);
            }
        };
        return Animation;
    }(utils_warn, shared_interpolate);
var registries_easing = function () {
        
        return {
            linear: function (pos) {
                return pos;
            },
            easeIn: function (pos) {
                return Math.pow(pos, 3);
            },
            easeOut: function (pos) {
                return Math.pow(pos - 1, 3) + 1;
            },
            easeInOut: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 3);
                }
                return 0.5 * (Math.pow(pos - 2, 3) + 2);
            }
        };
    }();
var Ractive_prototype_animate__animate = function (isEqual, animations, Animation, easingRegistry) {
        
        var noAnimation = {
                stop: function () {
                }
            };
        return function (keypath, to, options) {
            var k, animation, animations, easing, duration, step, complete, makeValueCollector, currentValues, collectValue, dummy, dummyOptions;
            if (typeof keypath === 'object') {
                options = to || {};
                easing = options.easing;
                duration = options.duration;
                animations = [];
                step = options.step;
                complete = options.complete;
                if (step || complete) {
                    currentValues = {};
                    options.step = null;
                    options.complete = null;
                    makeValueCollector = function (keypath) {
                        return function (t, value) {
                            currentValues[keypath] = value;
                        };
                    };
                }
                for (k in keypath) {
                    if (keypath.hasOwnProperty(k)) {
                        if (step || complete) {
                            collectValue = makeValueCollector(k);
                            options = {
                                easing: easing,
                                duration: duration
                            };
                            if (step) {
                                options.step = collectValue;
                            }
                            if (complete) {
                                options.complete = collectValue;
                            }
                        }
                        animations[animations.length] = animate(this, k, keypath[k], options);
                    }
                }
                if (step || complete) {
                    dummyOptions = {
                        easing: easing,
                        duration: duration
                    };
                    if (step) {
                        dummyOptions.step = function (t) {
                            step(t, currentValues);
                        };
                    }
                    if (complete) {
                        dummyOptions.complete = function (t) {
                            complete(t, currentValues);
                        };
                    }
                    animations[animations.length] = dummy = animate(this, null, null, dummyOptions);
                }
                return {
                    stop: function () {
                        while (animations.length) {
                            animations.pop().stop();
                        }
                        if (dummy) {
                            dummy.stop();
                        }
                    }
                };
            }
            options = options || {};
            animation = animate(this, keypath, to, options);
            return {
                stop: function () {
                    animation.stop();
                }
            };
        };
        function animate(root, keypath, to, options) {
            var easing, duration, animation, from;
            if (keypath !== null) {
                from = root.get(keypath);
            }
            animations.abort(keypath, root);
            if (isEqual(from, to)) {
                if (options.complete) {
                    options.complete(1, options.to);
                }
                return noAnimation;
            }
            if (options.easing) {
                if (typeof options.easing === 'function') {
                    easing = options.easing;
                } else {
                    if (root.easing && root.easing[options.easing]) {
                        easing = root.easing[options.easing];
                    } else {
                        easing = easingRegistry[options.easing];
                    }
                }
                if (typeof easing !== 'function') {
                    easing = null;
                }
            }
            duration = options.duration === undefined ? 400 : options.duration;
            animation = new Animation({
                keypath: keypath,
                from: from,
                to: to,
                root: root,
                duration: duration,
                easing: easing,
                step: options.step,
                complete: options.complete
            });
            animations.add(animation);
            root._animations[root._animations.length] = animation;
            return animation;
        }
    }(utils_isEqual, Ractive_prototype_animate_animations, Ractive_prototype_animate_Animation, registries_easing);
var Ractive_prototype_on = function () {
        
        return function (eventName, callback) {
            var self = this, listeners, n;
            if (typeof eventName === 'object') {
                listeners = [];
                for (n in eventName) {
                    if (eventName.hasOwnProperty(n)) {
                        listeners[listeners.length] = this.on(n, eventName[n]);
                    }
                }
                return {
                    cancel: function () {
                        while (listeners.length) {
                            listeners.pop().cancel();
                        }
                    }
                };
            }
            if (!this._subs[eventName]) {
                this._subs[eventName] = [callback];
            } else {
                this._subs[eventName].push(callback);
            }
            return {
                cancel: function () {
                    self.off(eventName, callback);
                }
            };
        };
    }();
var Ractive_prototype_off = function () {
        
        return function (eventName, callback) {
            var subscribers, index;
            if (!callback) {
                if (!eventName) {
                    for (eventName in this._subs) {
                        delete this._subs[eventName];
                    }
                } else {
                    this._subs[eventName] = [];
                }
            }
            subscribers = this._subs[eventName];
            if (subscribers) {
                index = subscribers.indexOf(callback);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
            }
        };
    }();
var shared_registerDependant = function () {
        
        return function (dependant) {
            var depsByKeypath, deps, keys, parentKeypath, map, ractive, keypath, priority;
            ractive = dependant.root;
            keypath = dependant.keypath;
            priority = dependant.priority;
            depsByKeypath = ractive._deps[priority] || (ractive._deps[priority] = {});
            deps = depsByKeypath[keypath] || (depsByKeypath[keypath] = []);
            deps[deps.length] = dependant;
            dependant.registered = true;
            if (!keypath) {
                return;
            }
            keys = keypath.split('.');
            while (keys.length) {
                keys.pop();
                parentKeypath = keys.join('.');
                map = ractive._depsMap[parentKeypath] || (ractive._depsMap[parentKeypath] = []);
                if (map[keypath] === undefined) {
                    map[keypath] = 0;
                    map[map.length] = keypath;
                }
                map[keypath] += 1;
                keypath = parentKeypath;
            }
        };
    }();
var shared_unregisterDependant = function () {
        
        return function (dependant) {
            var deps, index, keys, parentKeypath, map, ractive, keypath, priority;
            ractive = dependant.root;
            keypath = dependant.keypath;
            priority = dependant.priority;
            deps = ractive._deps[priority][keypath];
            index = deps.indexOf(dependant);
            if (index === -1 || !dependant.registered) {
                throw new Error('Attempted to remove a dependant that was no longer registered! This should not happen. If you are seeing this bug in development please raise an issue at https://github.com/RactiveJS/Ractive/issues - thanks');
            }
            deps.splice(index, 1);
            dependant.registered = false;
            if (!keypath) {
                return;
            }
            keys = keypath.split('.');
            while (keys.length) {
                keys.pop();
                parentKeypath = keys.join('.');
                map = ractive._depsMap[parentKeypath];
                map[keypath] -= 1;
                if (!map[keypath]) {
                    map.splice(map.indexOf(keypath), 1);
                    map[keypath] = undefined;
                }
                keypath = parentKeypath;
            }
        };
    }();
var Ractive_prototype_observe_Observer = function (isEqual) {
        
        var Observer = function (ractive, keypath, callback, options) {
            var self = this;
            this.root = ractive;
            this.keypath = keypath;
            this.callback = callback;
            this.defer = options.defer;
            this.debug = options.debug;
            this.proxy = {
                update: function () {
                    self.reallyUpdate();
                }
            };
            this.priority = 0;
            this.context = options && options.context ? options.context : ractive;
        };
        Observer.prototype = {
            init: function (immediate) {
                if (immediate !== false) {
                    this.update();
                } else {
                    this.value = this.root.get(this.keypath);
                }
            },
            update: function () {
                if (this.defer && this.ready) {
                    this.root._deferred.observers.push(this.proxy);
                    return;
                }
                this.reallyUpdate();
            },
            reallyUpdate: function () {
                var oldValue, newValue;
                oldValue = this.value;
                newValue = this.root.get(this.keypath);
                this.value = newValue;
                if (this.updating) {
                    return;
                }
                this.updating = true;
                if (!isEqual(newValue, oldValue) || !this.ready) {
                    try {
                        this.callback.call(this.context, newValue, oldValue, this.keypath);
                    } catch (err) {
                        if (this.debug || this.root.debug) {
                            throw err;
                        }
                    }
                }
                this.updating = false;
            }
        };
        return Observer;
    }(utils_isEqual);
var Ractive_prototype_observe_getPattern = function () {
        
        return function (ractive, pattern) {
            var keys, key, values, toGet, newToGet, expand, concatenate;
            keys = pattern.split('.');
            toGet = [];
            expand = function (keypath) {
                var value, key;
                value = ractive._wrapped[keypath] ? ractive._wrapped[keypath].get() : ractive.get(keypath);
                for (key in value) {
                    newToGet.push(keypath + '.' + key);
                }
            };
            concatenate = function (keypath) {
                return keypath + '.' + key;
            };
            while (key = keys.shift()) {
                if (key === '*') {
                    newToGet = [];
                    toGet.forEach(expand);
                    toGet = newToGet;
                } else {
                    if (!toGet[0]) {
                        toGet[0] = key;
                    } else {
                        toGet = toGet.map(concatenate);
                    }
                }
            }
            values = {};
            toGet.forEach(function (keypath) {
                values[keypath] = ractive.get(keypath);
            });
            return values;
        };
    }();
var Ractive_prototype_observe_PatternObserver = function (isEqual, getPattern) {
        
        var PatternObserver, wildcard = /\*/;
        PatternObserver = function (ractive, keypath, callback, options) {
            this.root = ractive;
            this.callback = callback;
            this.defer = options.defer;
            this.debug = options.debug;
            this.keypath = keypath;
            this.regex = new RegExp('^' + keypath.replace(/\./g, '\\.').replace(/\*/g, '[^\\.]+') + '$');
            this.values = {};
            if (this.defer) {
                this.proxies = [];
            }
            this.priority = 'pattern';
            this.context = options && options.context ? options.context : ractive;
        };
        PatternObserver.prototype = {
            init: function (immediate) {
                var values, keypath;
                values = getPattern(this.root, this.keypath);
                if (immediate !== false) {
                    for (keypath in values) {
                        if (values.hasOwnProperty(keypath)) {
                            this.update(keypath);
                        }
                    }
                } else {
                    this.values = values;
                }
            },
            update: function (keypath) {
                var values;
                if (wildcard.test(keypath)) {
                    values = getPattern(this.root, keypath);
                    for (keypath in values) {
                        if (values.hasOwnProperty(keypath)) {
                            this.update(keypath);
                        }
                    }
                    return;
                }
                if (this.defer && this.ready) {
                    this.root._deferred.observers.push(this.getProxy(keypath));
                    return;
                }
                this.reallyUpdate(keypath);
            },
            reallyUpdate: function (keypath) {
                var value = this.root.get(keypath);
                if (this.updating) {
                    this.values[keypath] = value;
                    return;
                }
                this.updating = true;
                if (!isEqual(value, this.values[keypath]) || !this.ready) {
                    try {
                        this.callback.call(this.context, value, this.values[keypath], keypath);
                    } catch (err) {
                        if (this.debug || this.root.debug) {
                            throw err;
                        }
                    }
                    this.values[keypath] = value;
                }
                this.updating = false;
            },
            getProxy: function (keypath) {
                var self = this;
                if (!this.proxies[keypath]) {
                    this.proxies[keypath] = {
                        update: function () {
                            self.reallyUpdate(keypath);
                        }
                    };
                }
                return this.proxies[keypath];
            }
        };
        return PatternObserver;
    }(utils_isEqual, Ractive_prototype_observe_getPattern);
var Ractive_prototype_observe_getObserverFacade = function (normaliseKeypath, registerDependant, unregisterDependant, Observer, PatternObserver) {
        
        var wildcard = /\*/, emptyObject = {};
        return function getObserverFacade(ractive, keypath, callback, options) {
            var observer, isPatternObserver;
            keypath = normaliseKeypath(keypath);
            options = options || emptyObject;
            if (wildcard.test(keypath)) {
                observer = new PatternObserver(ractive, keypath, callback, options);
                ractive._patternObservers.push(observer);
                isPatternObserver = true;
            } else {
                observer = new Observer(ractive, keypath, callback, options);
            }
            registerDependant(observer);
            observer.init(options.init);
            observer.ready = true;
            return {
                cancel: function () {
                    var index;
                    if (isPatternObserver) {
                        index = ractive._patternObservers.indexOf(observer);
                        if (index !== -1) {
                            ractive._patternObservers.splice(index, 1);
                        }
                    }
                    unregisterDependant(observer);
                }
            };
        };
    }(utils_normaliseKeypath, shared_registerDependant, shared_unregisterDependant, Ractive_prototype_observe_Observer, Ractive_prototype_observe_PatternObserver);
var Ractive_prototype_observe__observe = function (isObject, getObserverFacade) {
        
        return function observe(keypath, callback, options) {
            var observers = [], k;
            if (isObject(keypath)) {
                options = callback;
                for (k in keypath) {
                    if (keypath.hasOwnProperty(k)) {
                        callback = keypath[k];
                        observers[observers.length] = getObserverFacade(this, k, callback, options);
                    }
                }
                return {
                    cancel: function () {
                        while (observers.length) {
                            observers.pop().cancel();
                        }
                    }
                };
            }
            return getObserverFacade(this, keypath, callback, options);
        };
    }(utils_isObject, Ractive_prototype_observe_getObserverFacade);
var Ractive_prototype_fire = function () {
        
        return function (eventName) {
            var args, i, len, subscribers = this._subs[eventName];
            if (!subscribers) {
                return;
            }
            args = Array.prototype.slice.call(arguments, 1);
            for (i = 0, len = subscribers.length; i < len; i += 1) {
                subscribers[i].apply(this, args);
            }
        };
    }();
var Ractive_prototype_find = function () {
        
        return function (selector) {
            if (!this.el) {
                return null;
            }
            return this.fragment.find(selector);
        };
    }();
var utils_matches = function (isClient, createElement) {
        
        var div, methodNames, unprefixed, prefixed, vendors, i, j, makeFunction;
        if (!isClient) {
            return;
        }
        div = createElement('div');
        methodNames = [
            'matches',
            'matchesSelector'
        ];
        vendors = [
            'o',
            'ms',
            'moz',
            'webkit'
        ];
        makeFunction = function (methodName) {
            return function (node, selector) {
                return node[methodName](selector);
            };
        };
        i = methodNames.length;
        while (i--) {
            unprefixed = methodNames[i];
            if (div[unprefixed]) {
                return makeFunction(unprefixed);
            }
            j = vendors.length;
            while (j--) {
                prefixed = vendors[i] + unprefixed.substr(0, 1).toUpperCase() + unprefixed.substring(1);
                if (div[prefixed]) {
                    return makeFunction(prefixed);
                }
            }
        }
        return function (node, selector) {
            var nodes, i;
            nodes = (node.parentNode || node.document).querySelectorAll(selector);
            i = nodes.length;
            while (i--) {
                if (nodes[i] === node) {
                    return true;
                }
            }
            return false;
        };
    }(config_isClient, utils_createElement);
var Ractive_prototype_shared_makeQuery_test = function (matches) {
        
        return function (item, noDirty) {
            var itemMatches = this._isComponentQuery ? !this.selector || item.name === this.selector : matches(item.node, this.selector);
            if (itemMatches) {
                this.push(item.node || item.instance);
                if (!noDirty) {
                    this._makeDirty();
                }
                return true;
            }
        };
    }(utils_matches);
var Ractive_prototype_shared_makeQuery_cancel = function () {
        
        return function () {
            var liveQueries, selector, index;
            liveQueries = this._root[this._isComponentQuery ? 'liveComponentQueries' : 'liveQueries'];
            selector = this.selector;
            index = liveQueries.indexOf(selector);
            if (index !== -1) {
                liveQueries.splice(index, 1);
                liveQueries[selector] = null;
            }
        };
    }();
var Ractive_prototype_shared_makeQuery_sortByItemPosition = function () {
        
        return function (a, b) {
            var ancestryA, ancestryB, oldestA, oldestB, mutualAncestor, indexA, indexB, fragments, fragmentA, fragmentB;
            ancestryA = getAncestry(a.component || a._ractive.proxy);
            ancestryB = getAncestry(b.component || b._ractive.proxy);
            oldestA = ancestryA[ancestryA.length - 1];
            oldestB = ancestryB[ancestryB.length - 1];
            while (oldestA && oldestA === oldestB) {
                ancestryA.pop();
                ancestryB.pop();
                mutualAncestor = oldestA;
                oldestA = ancestryA[ancestryA.length - 1];
                oldestB = ancestryB[ancestryB.length - 1];
            }
            oldestA = oldestA.component || oldestA;
            oldestB = oldestB.component || oldestB;
            fragmentA = oldestA.parentFragment;
            fragmentB = oldestB.parentFragment;
            if (fragmentA === fragmentB) {
                indexA = fragmentA.items.indexOf(oldestA);
                indexB = fragmentB.items.indexOf(oldestB);
                return indexA - indexB || ancestryA.length - ancestryB.length;
            }
            if (fragments = mutualAncestor.fragments) {
                indexA = fragments.indexOf(fragmentA);
                indexB = fragments.indexOf(fragmentB);
                return indexA - indexB || ancestryA.length - ancestryB.length;
            }
            throw new Error('An unexpected condition was met while comparing the position of two components. Please file an issue at https://github.com/RactiveJS/Ractive/issues - thanks!');
        };
        function getParent(item) {
            var parentFragment;
            if (parentFragment = item.parentFragment) {
                return parentFragment.owner;
            }
            if (item.component && (parentFragment = item.component.parentFragment)) {
                return parentFragment.owner;
            }
        }
        function getAncestry(item) {
            var ancestry, ancestor;
            ancestry = [item];
            ancestor = getParent(item);
            while (ancestor) {
                ancestry.push(ancestor);
                ancestor = getParent(ancestor);
            }
            return ancestry;
        }
    }();
var Ractive_prototype_shared_makeQuery_sortByDocumentPosition = function (sortByItemPosition) {
        
        return function (node, otherNode) {
            var bitmask;
            if (node.compareDocumentPosition) {
                bitmask = node.compareDocumentPosition(otherNode);
                return bitmask & 2 ? 1 : -1;
            }
            return sortByItemPosition(node, otherNode);
        };
    }(Ractive_prototype_shared_makeQuery_sortByItemPosition);
var Ractive_prototype_shared_makeQuery_sort = function (sortByDocumentPosition, sortByItemPosition) {
        
        return function () {
            this.sort(this._isComponentQuery ? sortByItemPosition : sortByDocumentPosition);
            this._dirty = false;
        };
    }(Ractive_prototype_shared_makeQuery_sortByDocumentPosition, Ractive_prototype_shared_makeQuery_sortByItemPosition);
var Ractive_prototype_shared_makeQuery_dirty = function () {
        
        return function () {
            if (!this._dirty) {
                this._root._deferred.liveQueries.push(this);
                this._dirty = true;
            }
        };
    }();
var Ractive_prototype_shared_makeQuery_remove = function () {
        
        return function (item) {
            var index = this.indexOf(this._isComponentQuery ? item.instance : item.node);
            if (index !== -1) {
                this.splice(index, 1);
            }
        };
    }();
var Ractive_prototype_shared_makeQuery__makeQuery = function (defineProperties, test, cancel, sort, dirty, remove) {
        
        return function (ractive, selector, live, isComponentQuery) {
            var query;
            query = [];
            defineProperties(query, {
                selector: { value: selector },
                live: { value: live },
                _isComponentQuery: { value: isComponentQuery },
                _test: { value: test }
            });
            if (!live) {
                return query;
            }
            defineProperties(query, {
                cancel: { value: cancel },
                _root: { value: ractive },
                _sort: { value: sort },
                _makeDirty: { value: dirty },
                _remove: { value: remove },
                _dirty: {
                    value: false,
                    writable: true
                }
            });
            return query;
        };
    }(utils_defineProperties, Ractive_prototype_shared_makeQuery_test, Ractive_prototype_shared_makeQuery_cancel, Ractive_prototype_shared_makeQuery_sort, Ractive_prototype_shared_makeQuery_dirty, Ractive_prototype_shared_makeQuery_remove);
var Ractive_prototype_findAll = function (warn, matches, defineProperties, makeQuery) {
        
        return function (selector, options) {
            var liveQueries, query;
            if (!this.el) {
                return [];
            }
            options = options || {};
            liveQueries = this._liveQueries;
            if (query = liveQueries[selector]) {
                return options && options.live ? query : query.slice();
            }
            query = makeQuery(this, selector, !!options.live, false);
            if (query.live) {
                liveQueries.push(selector);
                liveQueries[selector] = query;
            }
            this.fragment.findAll(selector, query);
            return query;
        };
    }(utils_warn, utils_matches, utils_defineProperties, Ractive_prototype_shared_makeQuery__makeQuery);
var Ractive_prototype_findComponent = function () {
        
        return function (selector) {
            return this.fragment.findComponent(selector);
        };
    }();
var Ractive_prototype_findAllComponents = function (warn, matches, defineProperties, makeQuery) {
        
        return function (selector, options) {
            var liveQueries, query;
            options = options || {};
            liveQueries = this._liveComponentQueries;
            if (query = liveQueries[selector]) {
                return options && options.live ? query : query.slice();
            }
            query = makeQuery(this, selector, !!options.live, true);
            if (query.live) {
                liveQueries.push(selector);
                liveQueries[selector] = query;
            }
            this.fragment.findAllComponents(selector, query);
            return query;
        };
    }(utils_warn, utils_matches, utils_defineProperties, Ractive_prototype_shared_makeQuery__makeQuery);
var utils_getElement = function () {
        
        return function (input) {
            var output;
            if (typeof window === 'undefined' || !document || !input) {
                return null;
            }
            if (input.nodeType) {
                return input;
            }
            if (typeof input === 'string') {
                output = document.getElementById(input);
                if (!output && document.querySelector) {
                    output = document.querySelector(input);
                }
                if (output && output.nodeType) {
                    return output;
                }
            }
            if (input[0] && input[0].nodeType) {
                return input[0];
            }
            return null;
        };
    }();
var render_shared_initFragment = function (types, create) {
        
        return function (fragment, options) {
            var numItems, i, parentFragment, parentRefs, ref;
            fragment.owner = options.owner;
            parentFragment = fragment.owner.parentFragment;
            fragment.root = options.root;
            fragment.pNode = options.pNode;
            fragment.contextStack = options.contextStack || [];
            if (fragment.owner.type === types.SECTION) {
                fragment.index = options.index;
            }
            if (parentFragment) {
                parentRefs = parentFragment.indexRefs;
                if (parentRefs) {
                    fragment.indexRefs = create(null);
                    for (ref in parentRefs) {
                        fragment.indexRefs[ref] = parentRefs[ref];
                    }
                }
            }
            fragment.priority = parentFragment ? parentFragment.priority + 1 : 1;
            if (options.indexRef) {
                if (!fragment.indexRefs) {
                    fragment.indexRefs = {};
                }
                fragment.indexRefs[options.indexRef] = options.index;
            }
            fragment.items = [];
            numItems = options.descriptor ? options.descriptor.length : 0;
            for (i = 0; i < numItems; i += 1) {
                fragment.items[fragment.items.length] = fragment.createItem({
                    parentFragment: fragment,
                    descriptor: options.descriptor[i],
                    index: i
                });
            }
        };
    }(config_types, utils_create);
var render_DomFragment_shared_insertHtml = function (createElement) {
        
        var elementCache = {};
        return function (html, tagName, docFrag) {
            var container, nodes = [];
            if (html) {
                container = elementCache[tagName] || (elementCache[tagName] = createElement(tagName));
                container.innerHTML = html;
                while (container.firstChild) {
                    nodes[nodes.length] = container.firstChild;
                    docFrag.appendChild(container.firstChild);
                }
            }
            return nodes;
        };
    }(utils_createElement);
var render_DomFragment_Text = function (types) {
        
        var DomText, lessThan, greaterThan;
        lessThan = /</g;
        greaterThan = />/g;
        DomText = function (options, docFrag) {
            this.type = types.TEXT;
            this.descriptor = options.descriptor;
            if (docFrag) {
                this.node = document.createTextNode(options.descriptor);
                docFrag.appendChild(this.node);
            }
        };
        DomText.prototype = {
            detach: function () {
                this.node.parentNode.removeChild(this.node);
                return this.node;
            },
            teardown: function (destroy) {
                if (destroy) {
                    this.detach();
                }
            },
            firstNode: function () {
                return this.node;
            },
            toString: function () {
                return ('' + this.descriptor).replace(lessThan, '&lt;').replace(greaterThan, '&gt;');
            }
        };
        return DomText;
    }(config_types);
var shared_teardown = function (unregisterDependant) {
        
        return function (thing) {
            if (!thing.keypath) {
                var index = thing.root._pendingResolution.indexOf(thing);
                if (index !== -1) {
                    thing.root._pendingResolution.splice(index, 1);
                }
            } else {
                unregisterDependant(thing);
            }
        };
    }(shared_unregisterDependant);
var render_shared_Evaluator_Reference = function (types, isEqual, defineProperty, registerDependant, unregisterDependant) {
        
        var Reference, thisPattern;
        thisPattern = /this/;
        Reference = function (root, keypath, evaluator, argNum, priority) {
            var value;
            this.evaluator = evaluator;
            this.keypath = keypath;
            this.root = root;
            this.argNum = argNum;
            this.type = types.REFERENCE;
            this.priority = priority;
            value = root.get(keypath);
            if (typeof value === 'function') {
                value = wrapFunction(value, root, evaluator);
            }
            this.value = evaluator.values[argNum] = value;
            registerDependant(this);
        };
        Reference.prototype = {
            update: function () {
                var value = this.root.get(this.keypath);
                if (typeof value === 'function' && !value._nowrap) {
                    value = wrapFunction(value, this.root, this.evaluator);
                }
                if (!isEqual(value, this.value)) {
                    this.evaluator.values[this.argNum] = value;
                    this.evaluator.bubble();
                    this.value = value;
                }
            },
            teardown: function () {
                unregisterDependant(this);
            }
        };
        return Reference;
        function wrapFunction(fn, ractive, evaluator) {
            var prop, evaluators, index;
            if (!thisPattern.test(fn.toString())) {
                defineProperty(fn, '_nowrap', { value: true });
                return fn;
            }
            if (!fn['_' + ractive._guid]) {
                defineProperty(fn, '_' + ractive._guid, {
                    value: function () {
                        var originalCaptured, result, i, evaluator;
                        originalCaptured = ractive._captured;
                        if (!originalCaptured) {
                            ractive._captured = [];
                        }
                        result = fn.apply(ractive, arguments);
                        if (ractive._captured.length) {
                            i = evaluators.length;
                            while (i--) {
                                evaluator = evaluators[i];
                                evaluator.updateSoftDependencies(ractive._captured);
                            }
                        }
                        ractive._captured = originalCaptured;
                        return result;
                    },
                    writable: true
                });
                for (prop in fn) {
                    if (fn.hasOwnProperty(prop)) {
                        fn['_' + ractive._guid][prop] = fn[prop];
                    }
                }
                fn['_' + ractive._guid + '_evaluators'] = [];
            }
            evaluators = fn['_' + ractive._guid + '_evaluators'];
            index = evaluators.indexOf(evaluator);
            if (index === -1) {
                evaluators.push(evaluator);
            }
            return fn['_' + ractive._guid];
        }
    }(config_types, utils_isEqual, utils_defineProperty, shared_registerDependant, shared_unregisterDependant);
var render_shared_Evaluator_SoftReference = function (isEqual, registerDependant, unregisterDependant) {
        
        var SoftReference = function (root, keypath, evaluator) {
            this.root = root;
            this.keypath = keypath;
            this.priority = evaluator.priority;
            this.evaluator = evaluator;
            registerDependant(this);
        };
        SoftReference.prototype = {
            update: function () {
                var value = this.root.get(this.keypath);
                if (!isEqual(value, this.value)) {
                    this.evaluator.bubble();
                    this.value = value;
                }
            },
            teardown: function () {
                unregisterDependant(this);
            }
        };
        return SoftReference;
    }(utils_isEqual, shared_registerDependant, shared_unregisterDependant);
var render_shared_Evaluator__Evaluator = function (isEqual, defineProperty, clearCache, notifyDependants, registerDependant, unregisterDependant, adaptIfNecessary, Reference, SoftReference) {
        
        var Evaluator, cache = {};
        Evaluator = function (root, keypath, functionStr, args, priority) {
            var i, arg;
            this.root = root;
            this.keypath = keypath;
            this.priority = priority;
            this.fn = getFunctionFromString(functionStr, args.length);
            this.values = [];
            this.refs = [];
            i = args.length;
            while (i--) {
                if (arg = args[i]) {
                    if (arg[0]) {
                        this.values[i] = arg[1];
                    } else {
                        this.refs[this.refs.length] = new Reference(root, arg[1], this, i, priority);
                    }
                } else {
                    this.values[i] = undefined;
                }
            }
            this.selfUpdating = this.refs.length <= 1;
            this.update();
        };
        Evaluator.prototype = {
            bubble: function () {
                if (this.selfUpdating) {
                    this.update();
                } else if (!this.deferred) {
                    this.root._deferred.evals.push(this);
                    this.deferred = true;
                }
            },
            update: function () {
                var value;
                if (this.evaluating) {
                    return this;
                }
                this.evaluating = true;
                try {
                    value = this.fn.apply(null, this.values);
                } catch (err) {
                    if (this.root.debug) {
                        throw err;
                    } else {
                        value = undefined;
                    }
                }
                if (!isEqual(value, this.value)) {
                    clearCache(this.root, this.keypath);
                    this.root._cache[this.keypath] = value;
                    adaptIfNecessary(this.root, this.keypath, value, true);
                    this.value = value;
                    notifyDependants(this.root, this.keypath);
                }
                this.evaluating = false;
                return this;
            },
            teardown: function () {
                while (this.refs.length) {
                    this.refs.pop().teardown();
                }
                clearCache(this.root, this.keypath);
                this.root._evaluators[this.keypath] = null;
            },
            refresh: function () {
                if (!this.selfUpdating) {
                    this.deferred = true;
                }
                var i = this.refs.length;
                while (i--) {
                    this.refs[i].update();
                }
                if (this.deferred) {
                    this.update();
                    this.deferred = false;
                }
            },
            updateSoftDependencies: function (softDeps) {
                var i, keypath, ref;
                if (!this.softRefs) {
                    this.softRefs = [];
                }
                i = this.softRefs.length;
                while (i--) {
                    ref = this.softRefs[i];
                    if (!softDeps[ref.keypath]) {
                        this.softRefs.splice(i, 1);
                        this.softRefs[ref.keypath] = false;
                        ref.teardown();
                    }
                }
                i = softDeps.length;
                while (i--) {
                    keypath = softDeps[i];
                    if (!this.softRefs[keypath]) {
                        ref = new SoftReference(this.root, keypath, this);
                        this.softRefs[this.softRefs.length] = ref;
                        this.softRefs[keypath] = true;
                    }
                }
                this.selfUpdating = this.refs.length + this.softRefs.length <= 1;
            }
        };
        return Evaluator;
        function getFunctionFromString(str, i) {
            var fn, args;
            str = str.replace(/\$\{([0-9]+)\}/g, '_$1');
            if (cache[str]) {
                return cache[str];
            }
            args = [];
            while (i--) {
                args[i] = '_' + i;
            }
            fn = new Function(args.join(','), 'return(' + str + ')');
            cache[str] = fn;
            return fn;
        }
    }(utils_isEqual, utils_defineProperty, shared_clearCache, shared_notifyDependants, shared_registerDependant, shared_unregisterDependant, shared_adaptIfNecessary, render_shared_Evaluator_Reference, render_shared_Evaluator_SoftReference);
var render_shared_ExpressionResolver_ReferenceScout = function (resolveRef, teardown) {
        
        var ReferenceScout = function (resolver, ref, contextStack, argNum) {
            var keypath, root;
            root = this.root = resolver.root;
            keypath = resolveRef(root, ref, contextStack);
            if (keypath !== undefined) {
                resolver.resolveRef(argNum, false, keypath);
            } else {
                this.ref = ref;
                this.argNum = argNum;
                this.resolver = resolver;
                this.contextStack = contextStack;
                root._pendingResolution[root._pendingResolution.length] = this;
            }
        };
        ReferenceScout.prototype = {
            resolve: function (keypath) {
                this.keypath = keypath;
                this.resolver.resolveRef(this.argNum, false, keypath);
            },
            teardown: function () {
                if (!this.keypath) {
                    teardown(this);
                }
            }
        };
        return ReferenceScout;
    }(shared_resolveRef, shared_teardown);
var render_shared_ExpressionResolver_isRegularKeypath = function () {
        
        var keyPattern = /^(?:(?:[a-zA-Z$_][a-zA-Z$_0-9]*)|(?:[0-9]|[1-9][0-9]+))$/;
        return function (keypath) {
            var keys, key, i;
            keys = keypath.split('.');
            i = keys.length;
            while (i--) {
                key = keys[i];
                if (key === 'undefined' || !keyPattern.test(key)) {
                    return false;
                }
            }
            return true;
        };
    }();
var render_shared_ExpressionResolver_getKeypath = function (normaliseKeypath, isRegularKeypath) {
        
        return function (str, args) {
            var unique, normalised;
            unique = str.replace(/\$\{([0-9]+)\}/g, function (match, $1) {
                return args[$1] ? args[$1][1] : 'undefined';
            });
            normalised = normaliseKeypath(unique);
            if (isRegularKeypath(normalised)) {
                return normalised;
            }
            return '${' + unique.replace(/[\.\[\]]/g, '-') + '}';
        };
    }(utils_normaliseKeypath, render_shared_ExpressionResolver_isRegularKeypath);
var render_shared_ExpressionResolver_reassignDependants = function (registerDependant, unregisterDependant) {
        
        return function (ractive, oldKeypath, newKeypath) {
            var toReassign, i, dependant;
            toReassign = [];
            gatherDependants(ractive, oldKeypath, toReassign);
            i = toReassign.length;
            while (i--) {
                dependant = toReassign[i];
                unregisterDependant(dependant);
                dependant.keypath = dependant.keypath.replace(oldKeypath, newKeypath);
                registerDependant(dependant);
                dependant.update();
            }
        };
        function cascade(ractive, oldKeypath, toReassign) {
            var map, i;
            map = ractive._depsMap[oldKeypath];
            if (!map) {
                return;
            }
            i = map.length;
            while (i--) {
                gatherDependants(ractive, map[i], toReassign);
            }
        }
        function gatherDependants(ractive, oldKeypath, toReassign) {
            var priority, dependantsByKeypath, dependants, i;
            priority = ractive._deps.length;
            while (priority--) {
                dependantsByKeypath = ractive._deps[priority];
                if (dependantsByKeypath) {
                    dependants = dependantsByKeypath[oldKeypath];
                    if (dependants) {
                        i = dependants.length;
                        while (i--) {
                            toReassign.push(dependants[i]);
                        }
                    }
                }
            }
            cascade(ractive, oldKeypath, toReassign);
        }
    }(shared_registerDependant, shared_unregisterDependant);
var render_shared_ExpressionResolver__ExpressionResolver = function (Evaluator, ReferenceScout, getKeypath, reassignDependants) {
        
        var ExpressionResolver = function (mustache) {
            var expression, i, len, ref, indexRefs;
            this.root = mustache.root;
            this.mustache = mustache;
            this.args = [];
            this.scouts = [];
            expression = mustache.descriptor.x;
            indexRefs = mustache.parentFragment.indexRefs;
            this.str = expression.s;
            len = this.unresolved = this.args.length = expression.r ? expression.r.length : 0;
            if (!len) {
                this.resolved = this.ready = true;
                this.bubble();
                return;
            }
            for (i = 0; i < len; i += 1) {
                ref = expression.r[i];
                if (indexRefs && indexRefs[ref] !== undefined) {
                    this.resolveRef(i, true, indexRefs[ref]);
                } else {
                    this.scouts[this.scouts.length] = new ReferenceScout(this, ref, mustache.contextStack, i);
                }
            }
            this.ready = true;
            this.bubble();
        };
        ExpressionResolver.prototype = {
            bubble: function () {
                var oldKeypath;
                if (!this.ready) {
                    return;
                }
                oldKeypath = this.keypath;
                this.keypath = getKeypath(this.str, this.args);
                if (this.keypath.substr(0, 2) === '${') {
                    this.createEvaluator();
                }
                if (oldKeypath) {
                    reassignDependants(this.root, oldKeypath, this.keypath);
                } else {
                    this.mustache.resolve(this.keypath);
                }
            },
            teardown: function () {
                while (this.scouts.length) {
                    this.scouts.pop().teardown();
                }
            },
            resolveRef: function (argNum, isIndexRef, value) {
                this.args[argNum] = [
                    isIndexRef,
                    value
                ];
                this.bubble();
                this.resolved = !--this.unresolved;
            },
            createEvaluator: function () {
                if (!this.root._evaluators[this.keypath]) {
                    this.root._evaluators[this.keypath] = new Evaluator(this.root, this.keypath, this.str, this.args, this.mustache.priority);
                } else {
                    this.root._evaluators[this.keypath].refresh();
                }
            }
        };
        return ExpressionResolver;
    }(render_shared_Evaluator__Evaluator, render_shared_ExpressionResolver_ReferenceScout, render_shared_ExpressionResolver_getKeypath, render_shared_ExpressionResolver_reassignDependants);
var render_shared_initMustache = function (resolveRef, ExpressionResolver) {
        
        return function (mustache, options) {
            var keypath, indexRef, parentFragment;
            parentFragment = mustache.parentFragment = options.parentFragment;
            mustache.root = parentFragment.root;
            mustache.contextStack = parentFragment.contextStack;
            mustache.descriptor = options.descriptor;
            mustache.index = options.index || 0;
            mustache.priority = parentFragment.priority;
            mustache.type = options.descriptor.t;
            if (options.descriptor.r) {
                if (parentFragment.indexRefs && parentFragment.indexRefs[options.descriptor.r] !== undefined) {
                    indexRef = parentFragment.indexRefs[options.descriptor.r];
                    mustache.indexRef = options.descriptor.r;
                    mustache.value = indexRef;
                    mustache.render(mustache.value);
                } else {
                    keypath = resolveRef(mustache.root, options.descriptor.r, mustache.contextStack);
                    if (keypath !== undefined) {
                        mustache.resolve(keypath);
                    } else {
                        mustache.ref = options.descriptor.r;
                        mustache.root._pendingResolution[mustache.root._pendingResolution.length] = mustache;
                    }
                }
            }
            if (options.descriptor.x) {
                mustache.expressionResolver = new ExpressionResolver(mustache);
            }
            if (mustache.descriptor.n && !mustache.hasOwnProperty('value')) {
                mustache.render(undefined);
            }
        };
    }(shared_resolveRef, render_shared_ExpressionResolver__ExpressionResolver);
var render_shared_resolveMustache = function (types, registerDependant, unregisterDependant) {
        
        return function (keypath) {
            if (keypath === this.keypath) {
                return;
            }
            if (this.registered) {
                unregisterDependant(this);
            }
            this.keypath = keypath;
            registerDependant(this);
            this.update();
            if (this.root.twoway && this.parentFragment.owner.type === types.ATTRIBUTE) {
                this.parentFragment.owner.element.bind();
            }
            if (this.expressionResolver && this.expressionResolver.resolved) {
                this.expressionResolver = null;
            }
        };
    }(config_types, shared_registerDependant, shared_unregisterDependant);
var render_shared_updateMustache = function (isEqual) {
        
        return function () {
            var wrapped, value;
            value = this.root.get(this.keypath);
            if (wrapped = this.root._wrapped[this.keypath]) {
                value = wrapped.get();
            }
            if (!isEqual(value, this.value)) {
                this.render(value);
                this.value = value;
            }
        };
    }(utils_isEqual);
var render_DomFragment_Interpolator = function (types, teardown, initMustache, resolveMustache, updateMustache) {
        
        var DomInterpolator, lessThan, greaterThan;
        lessThan = /</g;
        greaterThan = />/g;
        DomInterpolator = function (options, docFrag) {
            this.type = types.INTERPOLATOR;
            if (docFrag) {
                this.node = document.createTextNode('');
                docFrag.appendChild(this.node);
            }
            initMustache(this, options);
        };
        DomInterpolator.prototype = {
            update: updateMustache,
            resolve: resolveMustache,
            detach: function () {
                this.node.parentNode.removeChild(this.node);
                return this.node;
            },
            teardown: function (destroy) {
                if (destroy) {
                    this.detach();
                }
                teardown(this);
            },
            render: function (value) {
                if (this.node) {
                    this.node.data = value == undefined ? '' : value;
                }
            },
            firstNode: function () {
                return this.node;
            },
            toString: function () {
                var value = this.value != undefined ? '' + this.value : '';
                return value.replace(lessThan, '&lt;').replace(greaterThan, '&gt;');
            }
        };
        return DomInterpolator;
    }(config_types, shared_teardown, render_shared_initMustache, render_shared_resolveMustache, render_shared_updateMustache);
var render_shared_updateSection = function (isArray, isObject, create) {
        
        return function (section, value) {
            var fragmentOptions;
            fragmentOptions = {
                descriptor: section.descriptor.f,
                root: section.root,
                pNode: section.parentFragment.pNode,
                owner: section
            };
            if (section.descriptor.n) {
                updateConditionalSection(section, value, true, fragmentOptions);
                return;
            }
            if (isArray(value)) {
                updateListSection(section, value, fragmentOptions);
            } else if (isObject(value)) {
                if (section.descriptor.i) {
                    updateListObjectSection(section, value, fragmentOptions);
                } else {
                    updateContextSection(section, fragmentOptions);
                }
            } else {
                updateConditionalSection(section, value, false, fragmentOptions);
            }
        };
        function updateListSection(section, value, fragmentOptions) {
            var i, length, fragmentsToRemove;
            length = value.length;
            if (length < section.length) {
                fragmentsToRemove = section.fragments.splice(length, section.length - length);
                while (fragmentsToRemove.length) {
                    fragmentsToRemove.pop().teardown(true);
                }
            } else {
                if (length > section.length) {
                    for (i = section.length; i < length; i += 1) {
                        fragmentOptions.contextStack = section.contextStack.concat(section.keypath + '.' + i);
                        fragmentOptions.index = i;
                        if (section.descriptor.i) {
                            fragmentOptions.indexRef = section.descriptor.i;
                        }
                        section.fragments[i] = section.createFragment(fragmentOptions);
                    }
                }
            }
            section.length = length;
        }
        function updateListObjectSection(section, value, fragmentOptions) {
            var id, fragmentsById;
            fragmentsById = section.fragmentsById || (section.fragmentsById = create(null));
            for (id in fragmentsById) {
                if (value[id] === undefined && fragmentsById[id]) {
                    fragmentsById[id].teardown(true);
                    fragmentsById[id] = null;
                }
            }
            for (id in value) {
                if (value[id] !== undefined && !fragmentsById[id]) {
                    fragmentOptions.contextStack = section.contextStack.concat(section.keypath + '.' + id);
                    fragmentOptions.index = id;
                    if (section.descriptor.i) {
                        fragmentOptions.indexRef = section.descriptor.i;
                    }
                    fragmentsById[id] = section.createFragment(fragmentOptions);
                }
            }
        }
        function updateContextSection(section, fragmentOptions) {
            if (!section.length) {
                fragmentOptions.contextStack = section.contextStack.concat(section.keypath);
                fragmentOptions.index = 0;
                section.fragments[0] = section.createFragment(fragmentOptions);
                section.length = 1;
            }
        }
        function updateConditionalSection(section, value, inverted, fragmentOptions) {
            var doRender, emptyArray, fragmentsToRemove, fragment;
            emptyArray = isArray(value) && value.length === 0;
            if (inverted) {
                doRender = emptyArray || !value;
            } else {
                doRender = value && !emptyArray;
            }
            if (doRender) {
                if (!section.length) {
                    fragmentOptions.contextStack = section.contextStack;
                    fragmentOptions.index = 0;
                    section.fragments[0] = section.createFragment(fragmentOptions);
                    section.length = 1;
                }
                if (section.length > 1) {
                    fragmentsToRemove = section.fragments.splice(1);
                    while (fragment = fragmentsToRemove.pop()) {
                        fragment.teardown(true);
                    }
                }
            } else if (section.length) {
                section.teardownFragments(true);
                section.length = 0;
            }
        }
    }(utils_isArray, utils_isObject, utils_create);
var render_DomFragment_Section_reassignFragment = function (types, unregisterDependant, ExpressionResolver) {
        
        return reassignFragment;
        function reassignFragment(fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath) {
            var i, item, context, query;
            if (fragment.html) {
                return;
            }
            if (fragment.indexRefs && fragment.indexRefs[indexRef] !== undefined) {
                fragment.indexRefs[indexRef] = newIndex;
            }
            i = fragment.contextStack.length;
            while (i--) {
                context = fragment.contextStack[i];
                if (context.substr(0, oldKeypath.length) === oldKeypath) {
                    fragment.contextStack[i] = context.replace(oldKeypath, newKeypath);
                }
            }
            i = fragment.items.length;
            while (i--) {
                item = fragment.items[i];
                switch (item.type) {
                case types.ELEMENT:
                    reassignElement(item, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath);
                    break;
                case types.PARTIAL:
                    reassignFragment(item.fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath);
                    break;
                case types.COMPONENT:
                    reassignFragment(item.instance.fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath);
                    if (query = fragment.root._liveComponentQueries[item.name]) {
                        query._makeDirty();
                    }
                    break;
                case types.SECTION:
                case types.INTERPOLATOR:
                case types.TRIPLE:
                    reassignMustache(item, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath);
                    break;
                }
            }
        }
        function reassignElement(element, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath) {
            var i, attribute, storage, masterEventName, proxies, proxy, binding, bindings, liveQueries, ractive;
            i = element.attributes.length;
            while (i--) {
                attribute = element.attributes[i];
                if (attribute.fragment) {
                    reassignFragment(attribute.fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath);
                    if (attribute.twoway) {
                        attribute.updateBindings();
                    }
                }
            }
            if (storage = element.node._ractive) {
                if (storage.keypath.substr(0, oldKeypath.length) === oldKeypath) {
                    storage.keypath = storage.keypath.replace(oldKeypath, newKeypath);
                }
                if (indexRef !== undefined) {
                    storage.index[indexRef] = newIndex;
                }
                for (masterEventName in storage.events) {
                    proxies = storage.events[masterEventName].proxies;
                    i = proxies.length;
                    while (i--) {
                        proxy = proxies[i];
                        if (typeof proxy.n === 'object') {
                            reassignFragment(proxy.a, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath);
                        }
                        if (proxy.d) {
                            reassignFragment(proxy.d, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath);
                        }
                    }
                }
                if (binding = storage.binding) {
                    if (binding.keypath.substr(0, oldKeypath.length) === oldKeypath) {
                        bindings = storage.root._twowayBindings[binding.keypath];
                        bindings.splice(bindings.indexOf(binding), 1);
                        binding.keypath = binding.keypath.replace(oldKeypath, newKeypath);
                        bindings = storage.root._twowayBindings[binding.keypath] || (storage.root._twowayBindings[binding.keypath] = []);
                        bindings.push(binding);
                    }
                }
            }
            if (element.fragment) {
                reassignFragment(element.fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath);
            }
            if (liveQueries = element.liveQueries) {
                ractive = element.root;
                i = liveQueries.length;
                while (i--) {
                    ractive._liveQueries[liveQueries[i]]._makeDirty();
                }
            }
        }
        function reassignMustache(mustache, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath) {
            var i;
            if (mustache.descriptor.x) {
                if (mustache.expressionResolver) {
                    mustache.expressionResolver.teardown();
                }
                mustache.expressionResolver = new ExpressionResolver(mustache);
            }
            if (mustache.keypath) {
                if (mustache.keypath.substr(0, oldKeypath.length) === oldKeypath) {
                    mustache.resolve(mustache.keypath.replace(oldKeypath, newKeypath));
                }
            } else if (mustache.indexRef === indexRef) {
                mustache.value = newIndex;
                mustache.render(newIndex);
            }
            if (mustache.fragments) {
                i = mustache.fragments.length;
                while (i--) {
                    reassignFragment(mustache.fragments[i], indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath);
                }
            }
        }
    }(config_types, shared_unregisterDependant, render_shared_ExpressionResolver__ExpressionResolver);
var render_DomFragment_Section_reassignFragments = function (types, reassignFragment, preDomUpdate) {
        
        return function (root, section, start, end, by) {
            var i, fragment, indexRef, oldIndex, newIndex, oldKeypath, newKeypath;
            indexRef = section.descriptor.i;
            for (i = start; i < end; i += 1) {
                fragment = section.fragments[i];
                oldIndex = i - by;
                newIndex = i;
                oldKeypath = section.keypath + '.' + (i - by);
                newKeypath = section.keypath + '.' + i;
                fragment.index += by;
                reassignFragment(fragment, indexRef, oldIndex, newIndex, by, oldKeypath, newKeypath);
            }
            preDomUpdate(root);
        };
    }(config_types, render_DomFragment_Section_reassignFragment, shared_preDomUpdate);
var render_DomFragment_Section_prototype_merge = function (reassignFragment) {
        
        return function (newIndices) {
            var section = this, parentFragment, firstChange, changed, i, newLength, newFragments, toTeardown, fragmentOptions, fragment, nextNode;
            parentFragment = this.parentFragment;
            newFragments = [];
            newIndices.forEach(function (newIndex, oldIndex) {
                var by, oldKeypath, newKeypath;
                if (newIndex === oldIndex) {
                    newFragments[newIndex] = section.fragments[oldIndex];
                    return;
                }
                if (firstChange === undefined) {
                    firstChange = oldIndex;
                }
                if (newIndex === -1) {
                    (toTeardown || (toTeardown = [])).push(section.fragments[oldIndex]);
                    return;
                }
                by = newIndex - oldIndex;
                oldKeypath = section.keypath + '.' + oldIndex;
                newKeypath = section.keypath + '.' + newIndex;
                reassignFragment(section.fragments[oldIndex], section.descriptor.i, oldIndex, newIndex, by, oldKeypath, newKeypath);
                newFragments[newIndex] = section.fragments[oldIndex];
                changed = true;
            });
            if (toTeardown) {
                while (fragment = toTeardown.pop()) {
                    fragment.teardown(true);
                }
            }
            if (firstChange === undefined) {
                firstChange = this.length;
            }
            newLength = this.root.get(this.keypath).length;
            if (newLength === firstChange) {
                return;
            }
            fragmentOptions = {
                descriptor: this.descriptor.f,
                root: this.root,
                pNode: parentFragment.pNode,
                owner: this
            };
            if (this.descriptor.i) {
                fragmentOptions.indexRef = this.descriptor.i;
            }
            for (i = firstChange; i < newLength; i += 1) {
                if (fragment = newFragments[i]) {
                    this.docFrag.appendChild(fragment.detach(false));
                } else {
                    fragmentOptions.contextStack = this.contextStack.concat(this.keypath + '.' + i);
                    fragmentOptions.index = i;
                    fragment = this.createFragment(fragmentOptions);
                }
                this.fragments[i] = fragment;
            }
            nextNode = parentFragment.findNextNode(this);
            parentFragment.pNode.insertBefore(this.docFrag, nextNode);
            this.length = newLength;
        };
    }(render_DomFragment_Section_reassignFragment);
var circular = function () {
        
        return [];
    }();
var render_DomFragment_Section__Section = function (types, isClient, initMustache, updateMustache, resolveMustache, updateSection, reassignFragment, reassignFragments, merge, teardown, circular) {
        
        var DomSection, DomFragment;
        circular.push(function () {
            DomFragment = circular.DomFragment;
        });
        DomSection = function (options, docFrag) {
            this.type = types.SECTION;
            this.inverted = !!options.descriptor.n;
            this.fragments = [];
            this.length = 0;
            if (docFrag) {
                this.docFrag = document.createDocumentFragment();
            }
            this.initialising = true;
            initMustache(this, options);
            if (docFrag) {
                docFrag.appendChild(this.docFrag);
            }
            this.initialising = false;
        };
        DomSection.prototype = {
            update: updateMustache,
            resolve: resolveMustache,
            smartUpdate: function (methodName, args) {
                var fragmentOptions;
                if (methodName === 'push' || methodName === 'unshift' || methodName === 'splice') {
                    fragmentOptions = {
                        descriptor: this.descriptor.f,
                        root: this.root,
                        pNode: this.parentFragment.pNode,
                        owner: this
                    };
                    if (this.descriptor.i) {
                        fragmentOptions.indexRef = this.descriptor.i;
                    }
                }
                if (this[methodName]) {
                    this.rendering = true;
                    this[methodName](fragmentOptions, args);
                    this.rendering = false;
                }
            },
            pop: function () {
                if (this.length) {
                    this.fragments.pop().teardown(true);
                    this.length -= 1;
                }
            },
            push: function (fragmentOptions, args) {
                var start, end, i;
                start = this.length;
                end = start + args.length;
                for (i = start; i < end; i += 1) {
                    fragmentOptions.contextStack = this.contextStack.concat(this.keypath + '.' + i);
                    fragmentOptions.index = i;
                    this.fragments[i] = this.createFragment(fragmentOptions);
                }
                this.length += args.length;
                this.parentFragment.pNode.insertBefore(this.docFrag, this.parentFragment.findNextNode(this));
            },
            shift: function () {
                this.splice(null, [
                    0,
                    1
                ]);
            },
            unshift: function (fragmentOptions, args) {
                this.splice(fragmentOptions, [
                    0,
                    0
                ].concat(new Array(args.length)));
            },
            splice: function (fragmentOptions, args) {
                var insertionPoint, addedItems, removedItems, balance, i, start, end, spliceArgs, reassignStart;
                if (!args.length) {
                    return;
                }
                start = +(args[0] < 0 ? this.length + args[0] : args[0]);
                addedItems = Math.max(0, args.length - 2);
                removedItems = args[1] !== undefined ? args[1] : this.length - start;
                removedItems = Math.min(removedItems, this.length - start);
                balance = addedItems - removedItems;
                if (!balance) {
                    return;
                }
                if (balance < 0) {
                    end = start - balance;
                    for (i = start; i < end; i += 1) {
                        this.fragments[i].teardown(true);
                    }
                    this.fragments.splice(start, -balance);
                } else {
                    end = start + balance;
                    insertionPoint = this.fragments[start] ? this.fragments[start].firstNode() : this.parentFragment.findNextNode(this);
                    spliceArgs = [
                        start,
                        0
                    ].concat(new Array(balance));
                    this.fragments.splice.apply(this.fragments, spliceArgs);
                    for (i = start; i < end; i += 1) {
                        fragmentOptions.contextStack = this.contextStack.concat(this.keypath + '.' + i);
                        fragmentOptions.index = i;
                        this.fragments[i] = this.createFragment(fragmentOptions);
                    }
                    this.parentFragment.pNode.insertBefore(this.docFrag, insertionPoint);
                }
                this.length += balance;
                reassignStart = start + addedItems;
                reassignFragments(this.root, this, reassignStart, this.length, balance);
            },
            merge: merge,
            detach: function () {
                var i, len;
                len = this.fragments.length;
                for (i = 0; i < len; i += 1) {
                    this.docFrag.appendChild(this.fragments[i].detach());
                }
                return this.docFrag;
            },
            teardown: function (destroy) {
                this.teardownFragments(destroy);
                teardown(this);
            },
            firstNode: function () {
                if (this.fragments[0]) {
                    return this.fragments[0].firstNode();
                }
                return this.parentFragment.findNextNode(this);
            },
            findNextNode: function (fragment) {
                if (this.fragments[fragment.index + 1]) {
                    return this.fragments[fragment.index + 1].firstNode();
                }
                return this.parentFragment.findNextNode(this);
            },
            teardownFragments: function (destroy) {
                var id, fragment;
                while (fragment = this.fragments.shift()) {
                    fragment.teardown(destroy);
                }
                if (this.fragmentsById) {
                    for (id in this.fragmentsById) {
                        if (this.fragments[id]) {
                            this.fragmentsById[id].teardown(destroy);
                            this.fragmentsById[id] = null;
                        }
                    }
                }
            },
            render: function (value) {
                var nextNode, wrapped;
                if (wrapped = this.root._wrapped[this.keypath]) {
                    value = wrapped.get();
                }
                if (this.rendering) {
                    return;
                }
                this.rendering = true;
                updateSection(this, value);
                this.rendering = false;
                if (this.docFrag && !this.docFrag.childNodes.length) {
                    return;
                }
                if (!this.initialising && isClient) {
                    nextNode = this.parentFragment.findNextNode(this);
                    if (nextNode && nextNode.parentNode === this.parentFragment.pNode) {
                        this.parentFragment.pNode.insertBefore(this.docFrag, nextNode);
                    } else {
                        this.parentFragment.pNode.appendChild(this.docFrag);
                    }
                }
            },
            createFragment: function (options) {
                var fragment = new DomFragment(options);
                if (this.docFrag) {
                    this.docFrag.appendChild(fragment.docFrag);
                }
                return fragment;
            },
            toString: function () {
                var str, i, id, len;
                str = '';
                i = 0;
                len = this.length;
                for (i = 0; i < len; i += 1) {
                    str += this.fragments[i].toString();
                }
                if (this.fragmentsById) {
                    for (id in this.fragmentsById) {
                        if (this.fragmentsById[id]) {
                            str += this.fragmentsById[id].toString();
                        }
                    }
                }
                return str;
            },
            find: function (selector) {
                var i, len, queryResult;
                len = this.fragments.length;
                for (i = 0; i < len; i += 1) {
                    if (queryResult = this.fragments[i].find(selector)) {
                        return queryResult;
                    }
                }
                return null;
            },
            findAll: function (selector, query) {
                var i, len;
                len = this.fragments.length;
                for (i = 0; i < len; i += 1) {
                    this.fragments[i].findAll(selector, query);
                }
            },
            findComponent: function (selector) {
                var i, len, queryResult;
                len = this.fragments.length;
                for (i = 0; i < len; i += 1) {
                    if (queryResult = this.fragments[i].findComponent(selector)) {
                        return queryResult;
                    }
                }
                return null;
            },
            findAllComponents: function (selector, query) {
                var i, len;
                len = this.fragments.length;
                for (i = 0; i < len; i += 1) {
                    this.fragments[i].findAllComponents(selector, query);
                }
            }
        };
        return DomSection;
    }(config_types, config_isClient, render_shared_initMustache, render_shared_updateMustache, render_shared_resolveMustache, render_shared_updateSection, render_DomFragment_Section_reassignFragment, render_DomFragment_Section_reassignFragments, render_DomFragment_Section_prototype_merge, shared_teardown, circular);
var render_DomFragment_Triple = function (types, matches, initMustache, updateMustache, resolveMustache, insertHtml, teardown) {
        
        var DomTriple = function (options, docFrag) {
            this.type = types.TRIPLE;
            if (docFrag) {
                this.nodes = [];
                this.docFrag = document.createDocumentFragment();
            }
            this.initialising = true;
            initMustache(this, options);
            if (docFrag) {
                docFrag.appendChild(this.docFrag);
            }
            this.initialising = false;
        };
        DomTriple.prototype = {
            update: updateMustache,
            resolve: resolveMustache,
            detach: function () {
                var i = this.nodes.length;
                while (i--) {
                    this.docFrag.appendChild(this.nodes[i]);
                }
                return this.docFrag;
            },
            teardown: function (destroy) {
                if (destroy) {
                    this.detach();
                    this.docFrag = this.nodes = null;
                }
                teardown(this);
            },
            firstNode: function () {
                if (this.nodes[0]) {
                    return this.nodes[0];
                }
                return this.parentFragment.findNextNode(this);
            },
            render: function (html) {
                var node, pNode;
                if (!this.nodes) {
                    return;
                }
                while (this.nodes.length) {
                    node = this.nodes.pop();
                    node.parentNode.removeChild(node);
                }
                if (!html) {
                    this.nodes = [];
                    return;
                }
                pNode = this.parentFragment.pNode;
                this.nodes = insertHtml(html, pNode.tagName, this.docFrag);
                if (!this.initialising) {
                    pNode.insertBefore(this.docFrag, this.parentFragment.findNextNode(this));
                }
            },
            toString: function () {
                return this.value != undefined ? this.value : '';
            },
            find: function (selector) {
                var i, len, node, queryResult;
                len = this.nodes.length;
                for (i = 0; i < len; i += 1) {
                    node = this.nodes[i];
                    if (node.nodeType !== 1) {
                        continue;
                    }
                    if (matches(node, selector)) {
                        return node;
                    }
                    if (queryResult = node.querySelector(selector)) {
                        return queryResult;
                    }
                }
                return null;
            },
            findAll: function (selector, queryResult) {
                var i, len, node, queryAllResult, numNodes, j;
                len = this.nodes.length;
                for (i = 0; i < len; i += 1) {
                    node = this.nodes[i];
                    if (node.nodeType !== 1) {
                        continue;
                    }
                    if (matches(node, selector)) {
                        queryResult.push(node);
                    }
                    if (queryAllResult = node.querySelectorAll(selector)) {
                        numNodes = queryAllResult.length;
                        for (j = 0; j < numNodes; j += 1) {
                            queryResult.push(queryAllResult[j]);
                        }
                    }
                }
            }
        };
        return DomTriple;
    }(config_types, utils_matches, render_shared_initMustache, render_shared_updateMustache, render_shared_resolveMustache, render_DomFragment_shared_insertHtml, shared_teardown);
var render_DomFragment_Element_initialise_getElementNamespace = function (namespaces) {
        
        return function (descriptor, parentNode) {
            if (descriptor.a && descriptor.a.xmlns) {
                return descriptor.a.xmlns;
            }
            return descriptor.e === 'svg' ? namespaces.svg : parentNode.namespaceURI || namespaces.html;
        };
    }(config_namespaces);
var render_DomFragment_shared_enforceCase = function () {
        
        var svgCamelCaseElements, svgCamelCaseAttributes, createMap, map;
        svgCamelCaseElements = 'altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath vkern'.split(' ');
        svgCamelCaseAttributes = 'attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits contentScriptType contentStyleType diffuseConstant edgeMode externalResourcesRequired filterRes filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan'.split(' ');
        createMap = function (items) {
            var map = {}, i = items.length;
            while (i--) {
                map[items[i].toLowerCase()] = items[i];
            }
            return map;
        };
        map = createMap(svgCamelCaseElements.concat(svgCamelCaseAttributes));
        return function (elementName) {
            var lowerCaseElementName = elementName.toLowerCase();
            return map[lowerCaseElementName] || lowerCaseElementName;
        };
    }();
var render_DomFragment_Attribute_helpers_determineNameAndNamespace = function (namespaces, enforceCase) {
        
        return function (attribute, name) {
            var colonIndex, namespacePrefix;
            colonIndex = name.indexOf(':');
            if (colonIndex !== -1) {
                namespacePrefix = name.substr(0, colonIndex);
                if (namespacePrefix !== 'xmlns') {
                    name = name.substring(colonIndex + 1);
                    attribute.name = enforceCase(name);
                    attribute.lcName = attribute.name.toLowerCase();
                    attribute.namespace = namespaces[namespacePrefix.toLowerCase()];
                    if (!attribute.namespace) {
                        throw 'Unknown namespace ("' + namespacePrefix + '")';
                    }
                    return;
                }
            }
            attribute.name = attribute.element.namespace !== namespaces.html ? enforceCase(name) : name;
            attribute.lcName = attribute.name.toLowerCase();
        };
    }(config_namespaces, render_DomFragment_shared_enforceCase);
var render_DomFragment_Attribute_helpers_setStaticAttribute = function (namespaces) {
        
        return function (attribute, options) {
            var node, value = options.value === null ? '' : options.value;
            if (node = options.pNode) {
                if (attribute.namespace) {
                    node.setAttributeNS(attribute.namespace, options.name, value);
                } else {
                    if (options.name === 'style' && node.style.setAttribute) {
                        node.style.setAttribute('cssText', value);
                    } else if (options.name === 'class' && (!node.namespaceURI || node.namespaceURI === namespaces.html)) {
                        node.className = value;
                    } else {
                        node.setAttribute(options.name, value);
                    }
                }
                if (attribute.name === 'id') {
                    options.root.nodes[options.value] = node;
                }
                if (attribute.name === 'value') {
                    node._ractive.value = options.value;
                }
            }
            attribute.value = options.value;
        };
    }(config_namespaces);
var render_DomFragment_Attribute_helpers_determinePropertyName = function (namespaces) {
        
        var propertyNames = {
                'accept-charset': 'acceptCharset',
                accesskey: 'accessKey',
                bgcolor: 'bgColor',
                'class': 'className',
                codebase: 'codeBase',
                colspan: 'colSpan',
                contenteditable: 'contentEditable',
                datetime: 'dateTime',
                dirname: 'dirName',
                'for': 'htmlFor',
                'http-equiv': 'httpEquiv',
                ismap: 'isMap',
                maxlength: 'maxLength',
                novalidate: 'noValidate',
                pubdate: 'pubDate',
                readonly: 'readOnly',
                rowspan: 'rowSpan',
                tabindex: 'tabIndex',
                usemap: 'useMap'
            };
        return function (attribute, options) {
            var propertyName;
            if (attribute.pNode && !attribute.namespace && (!options.pNode.namespaceURI || options.pNode.namespaceURI === namespaces.html)) {
                propertyName = propertyNames[attribute.name] || attribute.name;
                if (options.pNode[propertyName] !== undefined) {
                    attribute.propertyName = propertyName;
                }
                if (typeof options.pNode[propertyName] === 'boolean' || propertyName === 'value') {
                    attribute.useProperty = true;
                }
            }
        };
    }(config_namespaces);
var render_DomFragment_Attribute_prototype_bind = function (types, warn, arrayContentsMatch, getValueFromCheckboxes) {
        
        var bindAttribute, getInterpolator, updateModel, update, getBinding, inheritProperties, MultipleSelectBinding, SelectBinding, RadioNameBinding, CheckboxNameBinding, CheckedBinding, FileListBinding, ContentEditableBinding, GenericBinding;
        bindAttribute = function () {
            var node = this.pNode, interpolator, binding, bindings;
            if (!this.fragment) {
                return false;
            }
            interpolator = getInterpolator(this);
            if (!interpolator) {
                return false;
            }
            this.interpolator = interpolator;
            this.keypath = interpolator.keypath || interpolator.descriptor.r;
            binding = getBinding(this);
            if (!binding) {
                return false;
            }
            node._ractive.binding = this.element.binding = binding;
            this.twoway = true;
            bindings = this.root._twowayBindings[this.keypath] || (this.root._twowayBindings[this.keypath] = []);
            bindings[bindings.length] = binding;
            return true;
        };
        updateModel = function () {
            this._ractive.binding.update();
        };
        update = function () {
            var value = this._ractive.root.get(this._ractive.binding.keypath);
            this.value = value == undefined ? '' : value;
        };
        getInterpolator = function (attribute) {
            var item, errorMessage;
            if (attribute.fragment.items.length !== 1) {
                return null;
            }
            item = attribute.fragment.items[0];
            if (item.type !== types.INTERPOLATOR) {
                return null;
            }
            if (!item.keypath && !item.ref) {
                return null;
            }
            if (item.keypath && item.keypath.substr(0, 2) === '${') {
                errorMessage = 'You cannot set up two-way binding against an expression ' + item.keypath;
                if (attribute.root.debug) {
                    warn(errorMessage);
                }
                return null;
            }
            return item;
        };
        getBinding = function (attribute) {
            var node = attribute.pNode;
            if (node.tagName === 'SELECT') {
                return node.multiple ? new MultipleSelectBinding(attribute, node) : new SelectBinding(attribute, node);
            }
            if (node.type === 'checkbox' || node.type === 'radio') {
                if (attribute.propertyName === 'name') {
                    if (node.type === 'checkbox') {
                        return new CheckboxNameBinding(attribute, node);
                    }
                    if (node.type === 'radio') {
                        return new RadioNameBinding(attribute, node);
                    }
                }
                if (attribute.propertyName === 'checked') {
                    return new CheckedBinding(attribute, node);
                }
                return null;
            }
            if (attribute.lcName !== 'value') {
                warn('This is... odd');
            }
            if (node.type === 'file') {
                return new FileListBinding(attribute, node);
            }
            if (node.getAttribute('contenteditable')) {
                return new ContentEditableBinding(attribute, node);
            }
            return new GenericBinding(attribute, node);
        };
        MultipleSelectBinding = function (attribute, node) {
            var valueFromModel;
            inheritProperties(this, attribute, node);
            node.addEventListener('change', updateModel, false);
            valueFromModel = this.root.get(this.keypath);
            if (valueFromModel === undefined) {
                this.update();
            }
        };
        MultipleSelectBinding.prototype = {
            value: function () {
                var value, options, i, len;
                value = [];
                options = this.node.options;
                len = options.length;
                for (i = 0; i < len; i += 1) {
                    if (options[i].selected) {
                        value[value.length] = options[i]._ractive.value;
                    }
                }
                return value;
            },
            update: function () {
                var attribute, previousValue, value;
                attribute = this.attr;
                previousValue = attribute.value;
                value = this.value();
                if (previousValue === undefined || !arrayContentsMatch(value, previousValue)) {
                    attribute.receiving = true;
                    attribute.value = value;
                    this.root.set(this.keypath, value);
                    attribute.receiving = false;
                }
                return this;
            },
            deferUpdate: function () {
                if (this.deferred === true) {
                    return;
                }
                this.root._deferred.attrs.push(this);
                this.deferred = true;
            },
            teardown: function () {
                this.node.removeEventListener('change', updateModel, false);
            }
        };
        SelectBinding = function (attribute, node) {
            var valueFromModel;
            inheritProperties(this, attribute, node);
            node.addEventListener('change', updateModel, false);
            valueFromModel = this.root.get(this.keypath);
            if (valueFromModel === undefined) {
                this.update();
            }
        };
        SelectBinding.prototype = {
            value: function () {
                var options, i, len;
                options = this.node.options;
                len = options.length;
                for (i = 0; i < len; i += 1) {
                    if (options[i].selected) {
                        return options[i]._ractive.value;
                    }
                }
            },
            update: function () {
                var value = this.value();
                this.attr.receiving = true;
                this.attr.value = value;
                this.root.set(this.keypath, value);
                this.attr.receiving = false;
                return this;
            },
            deferUpdate: function () {
                if (this.deferred === true) {
                    return;
                }
                this.root._deferred.attrs.push(this);
                this.deferred = true;
            },
            teardown: function () {
                this.node.removeEventListener('change', updateModel, false);
            }
        };
        RadioNameBinding = function (attribute, node) {
            var valueFromModel;
            this.radioName = true;
            inheritProperties(this, attribute, node);
            node.name = '{{' + attribute.keypath + '}}';
            node.addEventListener('change', updateModel, false);
            if (node.attachEvent) {
                node.addEventListener('click', updateModel, false);
            }
            valueFromModel = this.root.get(this.keypath);
            if (valueFromModel !== undefined) {
                node.checked = valueFromModel == node._ractive.value;
            } else {
                this.root._deferred.radios.push(this);
            }
        };
        RadioNameBinding.prototype = {
            value: function () {
                return this.node._ractive ? this.node._ractive.value : this.node.value;
            },
            update: function () {
                var node = this.node;
                if (node.checked) {
                    this.attr.receiving = true;
                    this.root.set(this.keypath, this.value());
                    this.attr.receiving = false;
                }
            },
            teardown: function () {
                this.node.removeEventListener('change', updateModel, false);
                this.node.removeEventListener('click', updateModel, false);
            }
        };
        CheckboxNameBinding = function (attribute, node) {
            var valueFromModel, checked;
            this.checkboxName = true;
            inheritProperties(this, attribute, node);
            node.name = '{{' + this.keypath + '}}';
            node.addEventListener('change', updateModel, false);
            if (node.attachEvent) {
                node.addEventListener('click', updateModel, false);
            }
            valueFromModel = this.root.get(this.keypath);
            if (valueFromModel !== undefined) {
                checked = valueFromModel.indexOf(node._ractive.value) !== -1;
                node.checked = checked;
            } else {
                if (this.root._deferred.checkboxes.indexOf(this.keypath) === -1) {
                    this.root._deferred.checkboxes.push(this.keypath);
                }
            }
        };
        CheckboxNameBinding.prototype = {
            changed: function () {
                return this.node.checked !== !!this.checked;
            },
            update: function () {
                this.checked = this.node.checked;
                this.attr.receiving = true;
                this.root.set(this.keypath, getValueFromCheckboxes(this.root, this.keypath));
                this.attr.receiving = false;
            },
            teardown: function () {
                this.node.removeEventListener('change', updateModel, false);
                this.node.removeEventListener('click', updateModel, false);
            }
        };
        CheckedBinding = function (attribute, node) {
            inheritProperties(this, attribute, node);
            node.addEventListener('change', updateModel, false);
            if (node.attachEvent) {
                node.addEventListener('click', updateModel, false);
            }
        };
        CheckedBinding.prototype = {
            value: function () {
                return this.node.checked;
            },
            update: function () {
                this.attr.receiving = true;
                this.root.set(this.keypath, this.value());
                this.attr.receiving = false;
            },
            teardown: function () {
                this.node.removeEventListener('change', updateModel, false);
                this.node.removeEventListener('click', updateModel, false);
            }
        };
        FileListBinding = function (attribute, node) {
            inheritProperties(this, attribute, node);
            node.addEventListener('change', updateModel, false);
        };
        FileListBinding.prototype = {
            value: function () {
                return this.attr.pNode.files;
            },
            update: function () {
                this.attr.root.set(this.attr.keypath, this.value());
            },
            teardown: function () {
                this.node.removeEventListener('change', updateModel, false);
            }
        };
        ContentEditableBinding = function (attribute, node) {
            inheritProperties(this, attribute, node);
            node.addEventListener('change', updateModel, false);
            if (!this.root.lazy) {
                node.addEventListener('input', updateModel, false);
                if (node.attachEvent) {
                    node.addEventListener('keyup', updateModel, false);
                }
            }
        };
        ContentEditableBinding.prototype = {
            update: function () {
                this.attr.receiving = true;
                this.root.set(this.keypath, this.node.innerHTML);
                this.attr.receiving = false;
            },
            teardown: function () {
                this.node.removeEventListener('change', updateModel, false);
                this.node.removeEventListener('input', updateModel, false);
                this.node.removeEventListener('keyup', updateModel, false);
            }
        };
        GenericBinding = function (attribute, node) {
            inheritProperties(this, attribute, node);
            node.addEventListener('change', updateModel, false);
            if (!this.root.lazy) {
                node.addEventListener('input', updateModel, false);
                if (node.attachEvent) {
                    node.addEventListener('keyup', updateModel, false);
                }
            }
            this.node.addEventListener('blur', update, false);
        };
        GenericBinding.prototype = {
            value: function () {
                var value = this.attr.pNode.value;
                if (+value + '' === value && value.indexOf('e') === -1) {
                    value = +value;
                }
                return value;
            },
            update: function () {
                var attribute = this.attr, value = this.value();
                attribute.receiving = true;
                attribute.root.set(attribute.keypath, value);
                attribute.receiving = false;
            },
            teardown: function () {
                this.node.removeEventListener('change', updateModel, false);
                this.node.removeEventListener('input', updateModel, false);
                this.node.removeEventListener('keyup', updateModel, false);
                this.node.removeEventListener('blur', update, false);
            }
        };
        inheritProperties = function (binding, attribute, node) {
            binding.attr = attribute;
            binding.node = node;
            binding.root = attribute.root;
            binding.keypath = attribute.keypath;
        };
        return bindAttribute;
    }(config_types, utils_warn, utils_arrayContentsMatch, shared_getValueFromCheckboxes);
var render_DomFragment_Attribute_prototype_update = function (isArray, namespaces) {
        
        var updateAttribute, updateFileInputValue, deferSelect, initSelect, updateSelect, updateMultipleSelect, updateRadioName, updateCheckboxName, updateIEStyleAttribute, updateClassName, updateContentEditableValue, updateEverythingElse;
        updateAttribute = function () {
            var node;
            if (!this.ready) {
                return this;
            }
            node = this.pNode;
            if (node.tagName === 'SELECT' && this.lcName === 'value') {
                this.update = deferSelect;
                this.deferredUpdate = initSelect;
                return this.update();
            }
            if (this.isFileInputValue) {
                this.update = updateFileInputValue;
                return this;
            }
            if (this.twoway && this.lcName === 'name') {
                if (node.type === 'radio') {
                    this.update = updateRadioName;
                    return this.update();
                }
                if (node.type === 'checkbox') {
                    this.update = updateCheckboxName;
                    return this.update();
                }
            }
            if (this.lcName === 'style' && node.style.setAttribute) {
                this.update = updateIEStyleAttribute;
                return this.update();
            }
            if (this.lcName === 'class' && (!node.namespaceURI || node.namespaceURI === namespaces.html)) {
                this.update = updateClassName;
                return this.update();
            }
            if (node.getAttribute('contenteditable') && this.lcName === 'value') {
                this.update = updateContentEditableValue;
                return this.update();
            }
            this.update = updateEverythingElse;
            return this.update();
        };
        updateFileInputValue = function () {
            return this;
        };
        initSelect = function () {
            this.deferredUpdate = this.pNode.multiple ? updateMultipleSelect : updateSelect;
            this.deferredUpdate();
        };
        deferSelect = function () {
            this.root._deferred.selectValues.push(this);
            return this;
        };
        updateSelect = function () {
            var value = this.fragment.getValue(), options, option, i;
            this.value = this.pNode._ractive.value = value;
            options = this.pNode.options;
            i = options.length;
            while (i--) {
                option = options[i];
                if (option._ractive.value == value) {
                    option.selected = true;
                    return this;
                }
            }
            return this;
        };
        updateMultipleSelect = function () {
            var value = this.fragment.getValue(), options, i;
            if (!isArray(value)) {
                value = [value];
            }
            options = this.pNode.options;
            i = options.length;
            while (i--) {
                options[i].selected = value.indexOf(options[i]._ractive.value) !== -1;
            }
            this.value = value;
            return this;
        };
        updateRadioName = function () {
            var node, value;
            node = this.pNode;
            value = this.fragment.getValue();
            node.checked = value == node._ractive.value;
            return this;
        };
        updateCheckboxName = function () {
            var node, value;
            node = this.pNode;
            value = this.fragment.getValue();
            if (!isArray(value)) {
                node.checked = value == node._ractive.value;
                return this;
            }
            node.checked = value.indexOf(node._ractive.value) !== -1;
            return this;
        };
        updateIEStyleAttribute = function () {
            var node, value;
            node = this.pNode;
            value = this.fragment.getValue();
            if (value === undefined) {
                value = '';
            }
            if (value !== this.value) {
                node.style.setAttribute('cssText', value);
                this.value = value;
            }
            return this;
        };
        updateClassName = function () {
            var node, value;
            node = this.pNode;
            value = this.fragment.getValue();
            if (value === undefined) {
                value = '';
            }
            if (value !== this.value) {
                node.className = value;
                this.value = value;
            }
            return this;
        };
        updateContentEditableValue = function () {
            var node, value;
            node = this.pNode;
            value = this.fragment.getValue();
            if (value === undefined) {
                value = '';
            }
            if (value !== this.value) {
                if (!this.receiving) {
                    node.innerHTML = value;
                }
                this.value = value;
            }
            return this;
        };
        updateEverythingElse = function () {
            var node, value;
            node = this.pNode;
            value = this.fragment.getValue();
            if (this.isValueAttribute) {
                node._ractive.value = value;
            }
            if (value === undefined) {
                value = '';
            }
            if (value !== this.value) {
                if (this.useProperty) {
                    if (!this.receiving) {
                        node[this.propertyName] = value;
                    }
                    this.value = value;
                    return this;
                }
                if (this.namespace) {
                    node.setAttributeNS(this.namespace, this.name, value);
                    this.value = value;
                    return this;
                }
                if (this.lcName === 'id') {
                    if (this.value !== undefined) {
                        this.root.nodes[this.value] = undefined;
                    }
                    this.root.nodes[value] = node;
                }
                node.setAttribute(this.name, value);
                this.value = value;
            }
            return this;
        };
        return updateAttribute;
    }(utils_isArray, config_namespaces);
var parse_Tokenizer_utils_getStringMatch = function () {
        
        return function (string) {
            var substr;
            substr = this.str.substr(this.pos, string.length);
            if (substr === string) {
                this.pos += string.length;
                return string;
            }
            return null;
        };
    }();
var parse_Tokenizer_utils_allowWhitespace = function () {
        
        var leadingWhitespace = /^\s+/;
        return function () {
            var match = leadingWhitespace.exec(this.remaining());
            if (!match) {
                return null;
            }
            this.pos += match[0].length;
            return match[0];
        };
    }();
var parse_Tokenizer_utils_makeRegexMatcher = function () {
        
        return function (regex) {
            return function (tokenizer) {
                var match = regex.exec(tokenizer.str.substring(tokenizer.pos));
                if (!match) {
                    return null;
                }
                tokenizer.pos += match[0].length;
                return match[1] || match[0];
            };
        };
    }();
var parse_Tokenizer_getExpression_getPrimary_getLiteral_getStringLiteral_getEscapedChars = function () {
        
        return function (tokenizer) {
            var chars = '', character;
            character = getEscapedChar(tokenizer);
            while (character) {
                chars += character;
                character = getEscapedChar(tokenizer);
            }
            return chars || null;
        };
        function getEscapedChar(tokenizer) {
            var character;
            if (!tokenizer.getStringMatch('\\')) {
                return null;
            }
            character = tokenizer.str.charAt(tokenizer.pos);
            tokenizer.pos += 1;
            return character;
        }
    }();
var parse_Tokenizer_getExpression_getPrimary_getLiteral_getStringLiteral_getQuotedString = function (makeRegexMatcher, getEscapedChars) {
        
        var getUnescapedDoubleQuotedChars = makeRegexMatcher(/^[^\\"]+/), getUnescapedSingleQuotedChars = makeRegexMatcher(/^[^\\']+/);
        return function getQuotedString(tokenizer, singleQuotes) {
            var start, string, escaped, unescaped, next, matcher;
            start = tokenizer.pos;
            string = '';
            matcher = singleQuotes ? getUnescapedSingleQuotedChars : getUnescapedDoubleQuotedChars;
            escaped = getEscapedChars(tokenizer);
            if (escaped) {
                string += escaped;
            }
            unescaped = matcher(tokenizer);
            if (unescaped) {
                string += unescaped;
            }
            if (!string) {
                return '';
            }
            next = getQuotedString(tokenizer, singleQuotes);
            while (next !== '') {
                string += next;
            }
            return string;
        };
    }(parse_Tokenizer_utils_makeRegexMatcher, parse_Tokenizer_getExpression_getPrimary_getLiteral_getStringLiteral_getEscapedChars);
var parse_Tokenizer_getExpression_getPrimary_getLiteral_getStringLiteral__getStringLiteral = function (types, getQuotedString) {
        
        return function (tokenizer) {
            var start, string;
            start = tokenizer.pos;
            if (tokenizer.getStringMatch('"')) {
                string = getQuotedString(tokenizer, false);
                if (!tokenizer.getStringMatch('"')) {
                    tokenizer.pos = start;
                    return null;
                }
                return {
                    t: types.STRING_LITERAL,
                    v: string
                };
            }
            if (tokenizer.getStringMatch('\'')) {
                string = getQuotedString(tokenizer, true);
                if (!tokenizer.getStringMatch('\'')) {
                    tokenizer.pos = start;
                    return null;
                }
                return {
                    t: types.STRING_LITERAL,
                    v: string
                };
            }
            return null;
        };
    }(config_types, parse_Tokenizer_getExpression_getPrimary_getLiteral_getStringLiteral_getQuotedString);
var parse_Tokenizer_getExpression_getPrimary_getLiteral_getNumberLiteral = function (types, makeRegexMatcher) {
        
        var getNumber = makeRegexMatcher(/^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/);
        return function (tokenizer) {
            var result;
            if (result = getNumber(tokenizer)) {
                return {
                    t: types.NUMBER_LITERAL,
                    v: result
                };
            }
            return null;
        };
    }(config_types, parse_Tokenizer_utils_makeRegexMatcher);
var parse_Tokenizer_getExpression_shared_getName = function (makeRegexMatcher) {
        
        return makeRegexMatcher(/^[a-zA-Z_$][a-zA-Z_$0-9]*/);
    }(parse_Tokenizer_utils_makeRegexMatcher);
var parse_Tokenizer_getExpression_shared_getKey = function (getStringLiteral, getNumberLiteral, getName) {
        
        var identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
        return function (tokenizer) {
            var token;
            if (token = getStringLiteral(tokenizer)) {
                return identifier.test(token.v) ? token.v : '"' + token.v.replace(/"/g, '\\"') + '"';
            }
            if (token = getNumberLiteral(tokenizer)) {
                return token.v;
            }
            if (token = getName(tokenizer)) {
                return token;
            }
        };
    }(parse_Tokenizer_getExpression_getPrimary_getLiteral_getStringLiteral__getStringLiteral, parse_Tokenizer_getExpression_getPrimary_getLiteral_getNumberLiteral, parse_Tokenizer_getExpression_shared_getName);
var utils_parseJSON = function (getStringMatch, allowWhitespace, getStringLiteral, getKey) {
        
        var Tokenizer, specials, specialsPattern, numberPattern, placeholderPattern, placeholderAtStartPattern;
        specials = {
            'true': true,
            'false': false,
            'undefined': undefined,
            'null': null
        };
        specialsPattern = new RegExp('^(?:' + Object.keys(specials).join('|') + ')');
        numberPattern = /^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/;
        placeholderPattern = /\$\{([^\}]+)\}/g;
        placeholderAtStartPattern = /^\$\{([^\}]+)\}/;
        Tokenizer = function (str, values) {
            this.str = str;
            this.values = values;
            this.pos = 0;
            this.result = this.getToken();
        };
        Tokenizer.prototype = {
            remaining: function () {
                return this.str.substring(this.pos);
            },
            getStringMatch: getStringMatch,
            getToken: function () {
                this.allowWhitespace();
                return this.getPlaceholder() || this.getSpecial() || this.getNumber() || this.getString() || this.getObject() || this.getArray();
            },
            getPlaceholder: function () {
                var match;
                if (!this.values) {
                    return null;
                }
                if ((match = placeholderAtStartPattern.exec(this.remaining())) && this.values.hasOwnProperty(match[1])) {
                    this.pos += match[0].length;
                    return { v: this.values[match[1]] };
                }
            },
            getSpecial: function () {
                var match;
                if (match = specialsPattern.exec(this.remaining())) {
                    this.pos += match[0].length;
                    return { v: specials[match[0]] };
                }
            },
            getNumber: function () {
                var match;
                if (match = numberPattern.exec(this.remaining())) {
                    this.pos += match[0].length;
                    return { v: +match[0] };
                }
            },
            getString: function () {
                var stringLiteral = getStringLiteral(this), values;
                if (stringLiteral && (values = this.values)) {
                    return {
                        v: stringLiteral.v.replace(placeholderPattern, function (match, $1) {
                            return values[$1] || $1;
                        })
                    };
                }
                return stringLiteral;
            },
            getObject: function () {
                var result, pair;
                if (!this.getStringMatch('{')) {
                    return null;
                }
                result = {};
                while (pair = getKeyValuePair(this)) {
                    result[pair.key] = pair.value;
                    this.allowWhitespace();
                    if (this.getStringMatch('}')) {
                        return { v: result };
                    }
                    if (!this.getStringMatch(',')) {
                        return null;
                    }
                }
                return null;
            },
            getArray: function () {
                var result, valueToken;
                if (!this.getStringMatch('[')) {
                    return null;
                }
                result = [];
                while (valueToken = this.getToken()) {
                    result.push(valueToken.v);
                    if (this.getStringMatch(']')) {
                        return { v: result };
                    }
                    if (!this.getStringMatch(',')) {
                        return null;
                    }
                }
                return null;
            },
            allowWhitespace: allowWhitespace
        };
        function getKeyValuePair(tokenizer) {
            var key, valueToken, pair;
            tokenizer.allowWhitespace();
            key = getKey(tokenizer);
            if (!key) {
                return null;
            }
            pair = { key: key };
            tokenizer.allowWhitespace();
            if (!tokenizer.getStringMatch(':')) {
                return null;
            }
            tokenizer.allowWhitespace();
            valueToken = tokenizer.getToken();
            if (!valueToken) {
                return null;
            }
            pair.value = valueToken.v;
            return pair;
        }
        return function (str, values) {
            var tokenizer = new Tokenizer(str, values);
            if (tokenizer.result) {
                return {
                    value: tokenizer.result.v,
                    remaining: tokenizer.remaining()
                };
            }
            return null;
        };
    }(parse_Tokenizer_utils_getStringMatch, parse_Tokenizer_utils_allowWhitespace, parse_Tokenizer_getExpression_getPrimary_getLiteral_getStringLiteral__getStringLiteral, parse_Tokenizer_getExpression_shared_getKey);
var render_StringFragment_Interpolator = function (types, teardown, initMustache, updateMustache, resolveMustache) {
        
        var StringInterpolator = function (options) {
            this.type = types.INTERPOLATOR;
            initMustache(this, options);
        };
        StringInterpolator.prototype = {
            update: updateMustache,
            resolve: resolveMustache,
            render: function (value) {
                this.value = value;
                this.parentFragment.bubble();
            },
            teardown: function () {
                teardown(this);
            },
            toString: function () {
                if (this.value == undefined) {
                    return '';
                }
                return stringify(this.value);
            }
        };
        return StringInterpolator;
        function stringify(value) {
            if (typeof value === 'string') {
                return value;
            }
            return JSON.stringify(value);
        }
    }(config_types, shared_teardown, render_shared_initMustache, render_shared_updateMustache, render_shared_resolveMustache);
var render_StringFragment_Section = function (types, initMustache, updateMustache, resolveMustache, updateSection, teardown, circular) {
        
        var StringSection, StringFragment;
        circular.push(function () {
            StringFragment = circular.StringFragment;
        });
        StringSection = function (options) {
            this.type = types.SECTION;
            this.fragments = [];
            this.length = 0;
            initMustache(this, options);
        };
        StringSection.prototype = {
            update: updateMustache,
            resolve: resolveMustache,
            teardown: function () {
                this.teardownFragments();
                teardown(this);
            },
            teardownFragments: function () {
                while (this.fragments.length) {
                    this.fragments.shift().teardown();
                }
                this.length = 0;
            },
            bubble: function () {
                this.value = this.fragments.join('');
                this.parentFragment.bubble();
            },
            render: function (value) {
                var wrapped;
                if (wrapped = this.root._wrapped[this.keypath]) {
                    value = wrapped.get();
                }
                updateSection(this, value);
                this.parentFragment.bubble();
            },
            createFragment: function (options) {
                return new StringFragment(options);
            },
            toString: function () {
                return this.fragments.join('');
            }
        };
        return StringSection;
    }(config_types, render_shared_initMustache, render_shared_updateMustache, render_shared_resolveMustache, render_shared_updateSection, shared_teardown, circular);
var render_StringFragment_Text = function (types) {
        
        var StringText = function (text) {
            this.type = types.TEXT;
            this.text = text;
        };
        StringText.prototype = {
            toString: function () {
                return this.text;
            },
            teardown: function () {
            }
        };
        return StringText;
    }(config_types);
var render_StringFragment_prototype_toArgsList = function (warn, parseJSON) {
        
        return function () {
            var values, counter, jsonesque, guid, errorMessage, parsed, processItems;
            if (!this.argsList || this.dirty) {
                values = {};
                counter = 0;
                guid = this.root._guid;
                processItems = function (items) {
                    return items.map(function (item) {
                        var placeholderId, wrapped, value;
                        if (item.text) {
                            return item.text;
                        }
                        if (item.fragments) {
                            return item.fragments.map(function (fragment) {
                                return processItems(fragment.items);
                            }).join('');
                        }
                        placeholderId = guid + '-' + counter++;
                        if (wrapped = item.root._wrapped[item.keypath]) {
                            value = wrapped.value;
                        } else {
                            value = item.value;
                        }
                        values[placeholderId] = value;
                        return '${' + placeholderId + '}';
                    }).join('');
                };
                jsonesque = processItems(this.items);
                parsed = parseJSON('[' + jsonesque + ']', values);
                if (!parsed) {
                    errorMessage = 'Could not parse directive arguments (' + this.toString() + '). If you think this is a bug, please file an issue at http://github.com/RactiveJS/Ractive/issues';
                    if (this.root.debug) {
                        throw new Error(errorMessage);
                    } else {
                        warn(errorMessage);
                        this.argsList = [jsonesque];
                    }
                } else {
                    this.argsList = parsed.value;
                }
                this.dirty = false;
            }
            return this.argsList;
        };
    }(utils_warn, utils_parseJSON);
var render_StringFragment__StringFragment = function (types, parseJSON, initFragment, Interpolator, Section, Text, toArgsList, circular) {
        
        var StringFragment = function (options) {
            initFragment(this, options);
        };
        StringFragment.prototype = {
            createItem: function (options) {
                if (typeof options.descriptor === 'string') {
                    return new Text(options.descriptor);
                }
                switch (options.descriptor.t) {
                case types.INTERPOLATOR:
                    return new Interpolator(options);
                case types.TRIPLE:
                    return new Interpolator(options);
                case types.SECTION:
                    return new Section(options);
                default:
                    throw 'Something went wrong in a rather interesting way';
                }
            },
            bubble: function () {
                this.dirty = true;
                this.owner.bubble();
            },
            teardown: function () {
                var numItems, i;
                numItems = this.items.length;
                for (i = 0; i < numItems; i += 1) {
                    this.items[i].teardown();
                }
            },
            getValue: function () {
                var value;
                if (this.items.length === 1 && this.items[0].type === types.INTERPOLATOR) {
                    value = this.items[0].value;
                    if (value !== undefined) {
                        return value;
                    }
                }
                return this.toString();
            },
            isSimple: function () {
                var i, item, containsInterpolator;
                if (this.simple !== undefined) {
                    return this.simple;
                }
                i = this.items.length;
                while (i--) {
                    item = this.items[i];
                    if (item.type === types.TEXT) {
                        continue;
                    }
                    if (item.type === types.INTERPOLATOR) {
                        if (containsInterpolator) {
                            return false;
                        } else {
                            containsInterpolator = true;
                            continue;
                        }
                    }
                    return this.simple = false;
                }
                return this.simple = true;
            },
            toString: function () {
                return this.items.join('');
            },
            toJSON: function () {
                var value = this.getValue(), parsed;
                if (typeof value === 'string') {
                    parsed = parseJSON(value);
                    value = parsed ? parsed.value : value;
                }
                return value;
            },
            toArgsList: toArgsList
        };
        circular.StringFragment = StringFragment;
        return StringFragment;
    }(config_types, utils_parseJSON, render_shared_initFragment, render_StringFragment_Interpolator, render_StringFragment_Section, render_StringFragment_Text, render_StringFragment_prototype_toArgsList, circular);
var render_DomFragment_Attribute__Attribute = function (types, determineNameAndNamespace, setStaticAttribute, determinePropertyName, bind, update, StringFragment) {
        
        var DomAttribute = function (options) {
            this.type = types.ATTRIBUTE;
            this.element = options.element;
            determineNameAndNamespace(this, options.name);
            if (options.value === null || typeof options.value === 'string') {
                setStaticAttribute(this, options);
                return;
            }
            this.root = options.root;
            this.pNode = options.pNode;
            this.parentFragment = this.element.parentFragment;
            this.fragment = new StringFragment({
                descriptor: options.value,
                root: this.root,
                owner: this,
                contextStack: options.contextStack
            });
            if (!this.pNode) {
                return;
            }
            if (this.name === 'value') {
                this.isValueAttribute = true;
                if (this.pNode.tagName === 'INPUT' && this.pNode.type === 'file') {
                    this.isFileInputValue = true;
                }
            }
            determinePropertyName(this, options);
            this.selfUpdating = this.fragment.isSimple();
            this.ready = true;
        };
        DomAttribute.prototype = {
            bind: bind,
            update: update,
            updateBindings: function () {
                this.keypath = this.interpolator.keypath || this.interpolator.ref;
                if (this.propertyName === 'name') {
                    this.pNode.name = '{{' + this.keypath + '}}';
                }
            },
            teardown: function () {
                var i;
                if (this.boundEvents) {
                    i = this.boundEvents.length;
                    while (i--) {
                        this.pNode.removeEventListener(this.boundEvents[i], this.updateModel, false);
                    }
                }
                if (this.fragment) {
                    this.fragment.teardown();
                }
            },
            bubble: function () {
                if (this.selfUpdating) {
                    this.update();
                } else if (!this.deferred && this.ready) {
                    this.root._deferred.attrs.push(this);
                    this.deferred = true;
                }
            },
            toString: function () {
                var str;
                if (this.value === null) {
                    return this.name;
                }
                if (!this.fragment) {
                    return this.name + '=' + JSON.stringify(this.value);
                }
                str = this.fragment.toString();
                return this.name + '=' + JSON.stringify(str);
            }
        };
        return DomAttribute;
    }(config_types, render_DomFragment_Attribute_helpers_determineNameAndNamespace, render_DomFragment_Attribute_helpers_setStaticAttribute, render_DomFragment_Attribute_helpers_determinePropertyName, render_DomFragment_Attribute_prototype_bind, render_DomFragment_Attribute_prototype_update, render_StringFragment__StringFragment);
var render_DomFragment_Element_initialise_createElementAttributes = function (DomAttribute) {
        
        return function (element, attributes) {
            var attrName, attrValue, attr;
            element.attributes = [];
            for (attrName in attributes) {
                if (attributes.hasOwnProperty(attrName)) {
                    attrValue = attributes[attrName];
                    attr = new DomAttribute({
                        element: element,
                        name: attrName,
                        value: attrValue,
                        root: element.root,
                        pNode: element.node,
                        contextStack: element.parentFragment.contextStack
                    });
                    element.attributes[element.attributes.length] = element.attributes[attrName] = attr;
                    if (attrName !== 'name') {
                        attr.update();
                    }
                }
            }
            return element.attributes;
        };
    }(render_DomFragment_Attribute__Attribute);
var render_DomFragment_Element_initialise_appendElementChildren = function (warn, namespaces, StringFragment, circular) {
        
        var DomFragment, updateCss, updateScript;
        circular.push(function () {
            DomFragment = circular.DomFragment;
        });
        updateCss = function () {
            var node = this.node, content = this.fragment.toString();
            if (node.styleSheet) {
                node.styleSheet.cssText = content;
            }
            node.innerHTML = content;
        };
        updateScript = function () {
            if (!this.node.type || this.node.type === 'text/javascript') {
                warn('Script tag was updated. This does not cause the code to be re-evaluated!');
            }
            this.node.innerHTML = this.fragment.toString();
        };
        return function (element, node, descriptor, docFrag) {
            var liveQueries, i, selector, queryAllResult, j;
            if (element.lcName === 'script' || element.lcName === 'style') {
                element.fragment = new StringFragment({
                    descriptor: descriptor.f,
                    root: element.root,
                    contextStack: element.parentFragment.contextStack,
                    owner: element
                });
                if (docFrag) {
                    if (element.lcName === 'script') {
                        element.bubble = updateScript;
                        element.node.innerHTML = element.fragment.toString();
                    } else {
                        element.bubble = updateCss;
                        element.bubble();
                    }
                }
                return;
            }
            if (typeof descriptor.f === 'string' && (!node || (!node.namespaceURI || node.namespaceURI === namespaces.html))) {
                element.html = descriptor.f;
                if (docFrag) {
                    node.innerHTML = element.html;
                    liveQueries = element.root._liveQueries;
                    i = liveQueries.length;
                    while (i--) {
                        selector = liveQueries[i];
                        if ((queryAllResult = node.querySelectorAll(selector)) && (j = queryAllResult.length)) {
                            (element.liveQueries || (element.liveQueries = [])).push(selector);
                            element.liveQueries[selector] = [];
                            while (j--) {
                                element.liveQueries[selector][j] = queryAllResult[j];
                            }
                        }
                    }
                }
            } else {
                element.fragment = new DomFragment({
                    descriptor: descriptor.f,
                    root: element.root,
                    pNode: node,
                    contextStack: element.parentFragment.contextStack,
                    owner: element
                });
                if (docFrag) {
                    node.appendChild(element.fragment.docFrag);
                }
            }
        };
    }(utils_warn, config_namespaces, render_StringFragment__StringFragment, circular);
var render_DomFragment_Element_initialise_decorate_Decorator = function (warn, StringFragment) {
        
        var Decorator = function (descriptor, root, owner, contextStack) {
            var name, fragment, errorMessage;
            this.root = root;
            this.node = owner.node;
            name = descriptor.n || descriptor;
            if (typeof name !== 'string') {
                fragment = new StringFragment({
                    descriptor: name,
                    root: this.root,
                    owner: owner,
                    contextStack: contextStack
                });
                name = fragment.toString();
                fragment.teardown();
            }
            if (descriptor.a) {
                this.params = descriptor.a;
            } else if (descriptor.d) {
                fragment = new StringFragment({
                    descriptor: descriptor.d,
                    root: this.root,
                    owner: owner,
                    contextStack: contextStack
                });
                this.params = fragment.toArgsList();
                fragment.teardown();
            }
            this.fn = root.decorators[name];
            if (!this.fn) {
                errorMessage = 'Missing "' + name + '" decorator. You may need to download a plugin via https://github.com/RactiveJS/Ractive/wiki/Plugins#decorators';
                if (root.debug) {
                    throw new Error(errorMessage);
                } else {
                    warn(errorMessage);
                }
            }
        };
        Decorator.prototype = {
            init: function () {
                var result, args;
                if (this.params) {
                    args = [this.node].concat(this.params);
                    result = this.fn.apply(this.root, args);
                } else {
                    result = this.fn.call(this.root, this.node);
                }
                if (!result || !result.teardown) {
                    throw new Error('Decorator definition must return an object with a teardown method');
                }
                this.teardown = result.teardown;
            }
        };
        return Decorator;
    }(utils_warn, render_StringFragment__StringFragment);
var render_DomFragment_Element_initialise_decorate__decorate = function (Decorator) {
        
        return function (descriptor, root, owner, contextStack) {
            owner.decorator = new Decorator(descriptor, root, owner, contextStack);
            if (owner.decorator.fn) {
                root._deferred.decorators.push(owner.decorator);
            }
        };
    }(render_DomFragment_Element_initialise_decorate_Decorator);
var render_DomFragment_Element_initialise_addEventProxies_addEventProxy = function (warn, StringFragment) {
        
        var addEventProxy, MasterEventHandler, ProxyEvent, firePlainEvent, fireEventWithArgs, fireEventWithDynamicArgs, customHandlers, genericHandler, getCustomHandler;
        addEventProxy = function (element, triggerEventName, proxyDescriptor, contextStack, indexRefs) {
            var events, master;
            events = element.node._ractive.events;
            master = events[triggerEventName] || (events[triggerEventName] = new MasterEventHandler(element, triggerEventName, contextStack, indexRefs));
            master.add(proxyDescriptor);
        };
        MasterEventHandler = function (element, eventName, contextStack) {
            var definition;
            this.element = element;
            this.root = element.root;
            this.node = element.node;
            this.name = eventName;
            this.contextStack = contextStack;
            this.proxies = [];
            if (definition = this.root.events[eventName]) {
                this.custom = definition(this.node, getCustomHandler(eventName));
            } else {
                if (!('on' + eventName in this.node)) {
                    warn('Missing "' + this.name + '" event. You may need to download a plugin via https://github.com/RactiveJS/Ractive/wiki/Plugins#events');
                }
                this.node.addEventListener(eventName, genericHandler, false);
            }
        };
        MasterEventHandler.prototype = {
            add: function (proxy) {
                this.proxies[this.proxies.length] = new ProxyEvent(this.element, this.root, proxy, this.contextStack);
            },
            teardown: function () {
                var i;
                if (this.custom) {
                    this.custom.teardown();
                } else {
                    this.node.removeEventListener(this.name, genericHandler, false);
                }
                i = this.proxies.length;
                while (i--) {
                    this.proxies[i].teardown();
                }
            },
            fire: function (event) {
                var i = this.proxies.length;
                while (i--) {
                    this.proxies[i].fire(event);
                }
            }
        };
        ProxyEvent = function (element, ractive, descriptor, contextStack) {
            var name;
            this.root = ractive;
            name = descriptor.n || descriptor;
            if (typeof name === 'string') {
                this.n = name;
            } else {
                this.n = new StringFragment({
                    descriptor: descriptor.n,
                    root: this.root,
                    owner: element,
                    contextStack: contextStack
                });
            }
            if (descriptor.a) {
                this.a = descriptor.a;
                this.fire = fireEventWithArgs;
                return;
            }
            if (descriptor.d) {
                this.d = new StringFragment({
                    descriptor: descriptor.d,
                    root: this.root,
                    owner: element,
                    contextStack: contextStack
                });
                this.fire = fireEventWithDynamicArgs;
                return;
            }
            this.fire = firePlainEvent;
        };
        ProxyEvent.prototype = {
            teardown: function () {
                if (this.n.teardown) {
                    this.n.teardown();
                }
                if (this.d) {
                    this.d.teardown();
                }
            },
            bubble: function () {
            }
        };
        firePlainEvent = function (event) {
            this.root.fire(this.n.toString(), event);
        };
        fireEventWithArgs = function (event) {
            this.root.fire.apply(this.root, [
                this.n.toString(),
                event
            ].concat(this.a));
        };
        fireEventWithDynamicArgs = function (event) {
            var args = this.d.toArgsList();
            if (typeof args === 'string') {
                args = args.substr(1, args.length - 2);
            }
            this.root.fire.apply(this.root, [
                this.n.toString(),
                event
            ].concat(args));
        };
        genericHandler = function (event) {
            var storage = this._ractive;
            storage.events[event.type].fire({
                node: this,
                original: event,
                index: storage.index,
                keypath: storage.keypath,
                context: storage.root.get(storage.keypath)
            });
        };
        customHandlers = {};
        getCustomHandler = function (eventName) {
            if (customHandlers[eventName]) {
                return customHandlers[eventName];
            }
            return customHandlers[eventName] = function (event) {
                var storage = event.node._ractive;
                event.index = storage.index;
                event.keypath = storage.keypath;
                event.context = storage.root.get(storage.keypath);
                storage.events[eventName].fire(event);
            };
        };
        return addEventProxy;
    }(utils_warn, render_StringFragment__StringFragment);
var render_DomFragment_Element_initialise_addEventProxies__addEventProxies = function (addEventProxy) {
        
        return function (element, proxies) {
            var i, eventName, eventNames;
            for (eventName in proxies) {
                if (proxies.hasOwnProperty(eventName)) {
                    eventNames = eventName.split('-');
                    i = eventNames.length;
                    while (i--) {
                        addEventProxy(element, eventNames[i], proxies[eventName], element.parentFragment.contextStack);
                    }
                }
            }
        };
    }(render_DomFragment_Element_initialise_addEventProxies_addEventProxy);
var render_DomFragment_Element_initialise_updateLiveQueries = function () {
        
        return function (element) {
            var ractive, liveQueries, i, selector, query;
            ractive = element.root;
            liveQueries = ractive._liveQueries;
            i = liveQueries.length;
            while (i--) {
                selector = liveQueries[i];
                query = liveQueries[selector];
                if (query._test(element)) {
                    (element.liveQueries || (element.liveQueries = [])).push(selector);
                    element.liveQueries[selector] = [element.node];
                }
            }
        };
    }();
var utils_camelCase = function () {
        
        return function (hyphenatedStr) {
            return hyphenatedStr.replace(/-([a-zA-Z])/g, function (match, $1) {
                return $1.toUpperCase();
            });
        };
    }();
var utils_fillGaps = function () {
        
        return function (target, source) {
            var key;
            for (key in source) {
                if (source.hasOwnProperty(key) && !target.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
            return target;
        };
    }();
var render_DomFragment_Element_shared_executeTransition_Transition = function (isClient, createElement, warn, isNumeric, isArray, camelCase, fillGaps, StringFragment) {
        
        var Transition, testStyle, vendors, vendorPattern, unprefixPattern, prefixCache, CSS_TRANSITIONS_ENABLED, TRANSITION, TRANSITION_DURATION, TRANSITION_PROPERTY, TRANSITION_TIMING_FUNCTION, TRANSITIONEND;
        if (!isClient) {
            return;
        }
        testStyle = createElement('div').style;
        (function () {
            if (testStyle.transition !== undefined) {
                TRANSITION = 'transition';
                TRANSITIONEND = 'transitionend';
                CSS_TRANSITIONS_ENABLED = true;
            } else if (testStyle.webkitTransition !== undefined) {
                TRANSITION = 'webkitTransition';
                TRANSITIONEND = 'webkitTransitionEnd';
                CSS_TRANSITIONS_ENABLED = true;
            } else {
                CSS_TRANSITIONS_ENABLED = false;
            }
        }());
        if (TRANSITION) {
            TRANSITION_DURATION = TRANSITION + 'Duration';
            TRANSITION_PROPERTY = TRANSITION + 'Property';
            TRANSITION_TIMING_FUNCTION = TRANSITION + 'TimingFunction';
        }
        Transition = function (descriptor, root, owner, contextStack, isIntro) {
            var t = this, name, fragment, errorMessage;
            this.root = root;
            this.node = owner.node;
            this.isIntro = isIntro;
            this.originalStyle = this.node.getAttribute('style');
            this.complete = function (noReset) {
                if (!noReset && t.isIntro) {
                    t.resetStyle();
                }
                t._manager.pop(t.node);
                t.node._ractive.transition = null;
            };
            name = descriptor.n || descriptor;
            if (typeof name !== 'string') {
                fragment = new StringFragment({
                    descriptor: name,
                    root: this.root,
                    owner: owner,
                    contextStack: contextStack
                });
                name = fragment.toString();
                fragment.teardown();
            }
            this.name = name;
            if (descriptor.a) {
                this.params = descriptor.a;
            } else if (descriptor.d) {
                fragment = new StringFragment({
                    descriptor: descriptor.d,
                    root: this.root,
                    owner: owner,
                    contextStack: contextStack
                });
                this.params = fragment.toArgsList();
                fragment.teardown();
            }
            this._fn = root.transitions[name];
            if (!this._fn) {
                errorMessage = 'Missing "' + name + '" transition. You may need to download a plugin via https://github.com/RactiveJS/Ractive/wiki/Plugins#transitions';
                if (root.debug) {
                    throw new Error(errorMessage);
                } else {
                    warn(errorMessage);
                }
                return;
            }
        };
        Transition.prototype = {
            init: function () {
                if (this._inited) {
                    throw new Error('Cannot initialize a transition more than once');
                }
                this._inited = true;
                this._fn.apply(this.root, [this].concat(this.params));
            },
            getStyle: function (props) {
                var computedStyle, styles, i, prop, value;
                computedStyle = window.getComputedStyle(this.node);
                if (typeof props === 'string') {
                    value = computedStyle[prefix(props)];
                    if (value === '0px') {
                        value = 0;
                    }
                    return value;
                }
                if (!isArray(props)) {
                    throw new Error('Transition#getStyle must be passed a string, or an array of strings representing CSS properties');
                }
                styles = {};
                i = props.length;
                while (i--) {
                    prop = props[i];
                    value = computedStyle[prefix(prop)];
                    if (value === '0px') {
                        value = 0;
                    }
                    styles[prop] = value;
                }
                return styles;
            },
            setStyle: function (style, value) {
                var prop;
                if (typeof style === 'string') {
                    this.node.style[prefix(style)] = value;
                } else {
                    for (prop in style) {
                        if (style.hasOwnProperty(prop)) {
                            this.node.style[prefix(prop)] = style[prop];
                        }
                    }
                }
                return this;
            },
            animateStyle: function (style, value, options, complete) {
                var t = this, propertyNames, changedProperties, computedStyle, current, to, from, transitionEndHandler, i, prop;
                if (typeof style === 'string') {
                    to = {};
                    to[style] = value;
                } else {
                    to = style;
                    complete = options;
                    options = value;
                }
                if (!options) {
                    warn('The "' + t.name + '" transition does not supply an options object to `t.animateStyle()`. This will break in a future version of Ractive. For more info see https://github.com/RactiveJS/Ractive/issues/340');
                    options = t;
                    complete = t.complete;
                }
                if (!options.duration) {
                    t.setStyle(to);
                    if (complete) {
                        complete();
                    }
                }
                propertyNames = Object.keys(to);
                changedProperties = [];
                computedStyle = window.getComputedStyle(t.node);
                from = {};
                i = propertyNames.length;
                while (i--) {
                    prop = propertyNames[i];
                    current = computedStyle[prefix(prop)];
                    if (current === '0px') {
                        current = 0;
                    }
                    if (current != to[prop]) {
                        changedProperties[changedProperties.length] = prop;
                        t.node.style[prefix(prop)] = current;
                    }
                }
                if (!changedProperties.length) {
                    if (complete) {
                        complete();
                    }
                    return;
                }
                setTimeout(function () {
                    t.node.style[TRANSITION_PROPERTY] = propertyNames.map(prefix).map(hyphenate).join(',');
                    t.node.style[TRANSITION_TIMING_FUNCTION] = hyphenate(options.easing || 'linear');
                    t.node.style[TRANSITION_DURATION] = options.duration / 1000 + 's';
                    transitionEndHandler = function (event) {
                        var index;
                        index = changedProperties.indexOf(camelCase(unprefix(event.propertyName)));
                        if (index !== -1) {
                            changedProperties.splice(index, 1);
                        }
                        if (changedProperties.length) {
                            return;
                        }
                        t.root.fire(t.name + ':end');
                        t.node.removeEventListener(TRANSITIONEND, transitionEndHandler, false);
                        if (complete) {
                            complete();
                        }
                    };
                    t.node.addEventListener(TRANSITIONEND, transitionEndHandler, false);
                    setTimeout(function () {
                        var i = changedProperties.length;
                        while (i--) {
                            prop = changedProperties[i];
                            t.node.style[prefix(prop)] = to[prop];
                        }
                    }, 0);
                }, options.delay || 0);
            },
            resetStyle: function () {
                if (this.originalStyle) {
                    this.node.setAttribute('style', this.originalStyle);
                } else {
                    this.node.getAttribute('style');
                    this.node.removeAttribute('style');
                }
            },
            processParams: function (params, defaults) {
                if (typeof params === 'number') {
                    params = { duration: params };
                } else if (typeof params === 'string') {
                    if (params === 'slow') {
                        params = { duration: 600 };
                    } else if (params === 'fast') {
                        params = { duration: 200 };
                    } else {
                        params = { duration: 400 };
                    }
                } else if (!params) {
                    params = {};
                }
                return fillGaps(params, defaults);
            }
        };
        vendors = [
            'o',
            'ms',
            'moz',
            'webkit'
        ];
        vendorPattern = new RegExp('^(?:' + vendors.join('|') + ')([A-Z])');
        unprefixPattern = new RegExp('^-(?:' + vendors.join('|') + ')-');
        prefixCache = {};
        function prefix(prop) {
            var i, vendor, capped;
            if (!prefixCache[prop]) {
                if (testStyle[prop] !== undefined) {
                    prefixCache[prop] = prop;
                } else {
                    capped = prop.charAt(0).toUpperCase() + prop.substring(1);
                    i = vendors.length;
                    while (i--) {
                        vendor = vendors[i];
                        if (testStyle[vendor + capped] !== undefined) {
                            prefixCache[prop] = vendor + capped;
                            break;
                        }
                    }
                }
            }
            return prefixCache[prop];
        }
        function unprefix(prop) {
            return prop.replace(unprefixPattern, '');
        }
        function hyphenate(str) {
            var hyphenated;
            if (vendorPattern.test(str)) {
                str = '-' + str;
            }
            hyphenated = str.replace(/[A-Z]/g, function (match) {
                return '-' + match.toLowerCase();
            });
            return hyphenated;
        }
        return Transition;
    }(config_isClient, utils_createElement, utils_warn, utils_isNumeric, utils_isArray, utils_camelCase, utils_fillGaps, render_StringFragment__StringFragment);
var render_DomFragment_Element_shared_executeTransition__executeTransition = function (warn, Transition) {
        
        return function (descriptor, root, owner, contextStack, isIntro) {
            var transition, node, oldTransition;
            if (!root.transitionsEnabled || root._parent && !root._parent.transitionsEnabled) {
                return;
            }
            transition = new Transition(descriptor, root, owner, contextStack, isIntro);
            if (transition._fn) {
                node = transition.node;
                transition._manager = root._transitionManager;
                if (oldTransition = node._ractive.transition) {
                    oldTransition.complete();
                }
                node._ractive.transition = transition;
                transition._manager.push(node);
                if (isIntro) {
                    root._deferred.transitions.push(transition);
                } else {
                    transition.init();
                }
            }
        };
    }(utils_warn, render_DomFragment_Element_shared_executeTransition_Transition);
var render_DomFragment_Element_initialise__initialise = function (types, namespaces, create, defineProperty, matches, warn, createElement, getElementNamespace, createElementAttributes, appendElementChildren, decorate, addEventProxies, updateLiveQueries, executeTransition, enforceCase) {
        
        return function (element, options, docFrag) {
            var parentFragment, pNode, contextStack, descriptor, namespace, name, attributes, width, height, loadHandler, root, selectBinding, errorMessage;
            element.type = types.ELEMENT;
            parentFragment = element.parentFragment = options.parentFragment;
            pNode = parentFragment.pNode;
            contextStack = parentFragment.contextStack;
            descriptor = element.descriptor = options.descriptor;
            element.root = root = parentFragment.root;
            element.index = options.index;
            element.lcName = descriptor.e.toLowerCase();
            element.eventListeners = [];
            element.customEventListeners = [];
            if (pNode) {
                namespace = element.namespace = getElementNamespace(descriptor, pNode);
                name = namespace !== namespaces.html ? enforceCase(descriptor.e) : descriptor.e;
                element.node = createElement(name, namespace);
                defineProperty(element.node, '_ractive', {
                    value: {
                        proxy: element,
                        keypath: contextStack.length ? contextStack[contextStack.length - 1] : '',
                        index: parentFragment.indexRefs,
                        events: create(null),
                        root: root
                    }
                });
            }
            attributes = createElementAttributes(element, descriptor.a);
            if (descriptor.f) {
                if (element.node && element.node.getAttribute('contenteditable')) {
                    if (element.node.innerHTML) {
                        errorMessage = 'A pre-populated contenteditable element should not have children';
                        if (root.debug) {
                            throw new Error(errorMessage);
                        } else {
                            warn(errorMessage);
                        }
                    }
                }
                appendElementChildren(element, element.node, descriptor, docFrag);
            }
            if (docFrag && descriptor.v) {
                addEventProxies(element, descriptor.v);
            }
            if (docFrag) {
                if (root.twoway) {
                    element.bind();
                    if (element.node.getAttribute('contenteditable') && element.node._ractive.binding) {
                        element.node._ractive.binding.update();
                    }
                }
                if (attributes.name && !attributes.name.twoway) {
                    attributes.name.update();
                }
                if (element.node.tagName === 'IMG' && ((width = element.attributes.width) || (height = element.attributes.height))) {
                    element.node.addEventListener('load', loadHandler = function () {
                        if (width) {
                            element.node.width = width.value;
                        }
                        if (height) {
                            element.node.height = height.value;
                        }
                        element.node.removeEventListener('load', loadHandler, false);
                    }, false);
                }
                docFrag.appendChild(element.node);
                if (descriptor.o) {
                    decorate(descriptor.o, root, element, contextStack);
                }
                if (descriptor.t1) {
                    executeTransition(descriptor.t1, root, element, contextStack, true);
                }
                if (element.node.tagName === 'OPTION') {
                    if (pNode.tagName === 'SELECT' && (selectBinding = pNode._ractive.binding)) {
                        selectBinding.deferUpdate();
                    }
                    if (element.node._ractive.value == pNode._ractive.value) {
                        element.node.selected = true;
                    }
                }
                if (element.node.autofocus) {
                    root._deferred.focusable = element.node;
                }
            }
            updateLiveQueries(element);
        };
    }(config_types, config_namespaces, utils_create, utils_defineProperty, utils_matches, utils_warn, utils_createElement, render_DomFragment_Element_initialise_getElementNamespace, render_DomFragment_Element_initialise_createElementAttributes, render_DomFragment_Element_initialise_appendElementChildren, render_DomFragment_Element_initialise_decorate__decorate, render_DomFragment_Element_initialise_addEventProxies__addEventProxies, render_DomFragment_Element_initialise_updateLiveQueries, render_DomFragment_Element_shared_executeTransition__executeTransition, render_DomFragment_shared_enforceCase);
var render_DomFragment_Element_prototype_teardown = function (executeTransition) {
        
        return function (destroy) {
            var eventName, binding, bindings, i, liveQueries, selector, query, nodesToRemove, j;
            if (this.fragment) {
                this.fragment.teardown(false);
            }
            while (this.attributes.length) {
                this.attributes.pop().teardown();
            }
            if (this.node) {
                for (eventName in this.node._ractive.events) {
                    this.node._ractive.events[eventName].teardown();
                }
                if (binding = this.node._ractive.binding) {
                    binding.teardown();
                    bindings = this.root._twowayBindings[binding.attr.keypath];
                    bindings.splice(bindings.indexOf(binding), 1);
                }
            }
            if (this.decorator) {
                this.decorator.teardown();
            }
            if (this.descriptor.t2) {
                executeTransition(this.descriptor.t2, this.root, this, this.parentFragment.contextStack, false);
            }
            if (destroy) {
                this.root._transitionManager.detachWhenReady(this);
            }
            if (liveQueries = this.liveQueries) {
                i = liveQueries.length;
                while (i--) {
                    selector = liveQueries[i];
                    if (nodesToRemove = this.liveQueries[selector]) {
                        j = nodesToRemove.length;
                        query = this.root._liveQueries[selector];
                        while (j--) {
                            query._remove(nodesToRemove[j]);
                        }
                    }
                }
            }
        };
    }(render_DomFragment_Element_shared_executeTransition__executeTransition);
var config_voidElementNames = function () {
        
        return 'area base br col command doctype embed hr img input keygen link meta param source track wbr'.split(' ');
    }();
var render_DomFragment_Element_prototype_toString = function (voidElementNames) {
        
        return function () {
            var str, i, len;
            str = '<' + (this.descriptor.y ? '!doctype' : this.descriptor.e);
            len = this.attributes.length;
            for (i = 0; i < len; i += 1) {
                str += ' ' + this.attributes[i].toString();
            }
            str += '>';
            if (this.html) {
                str += this.html;
            } else if (this.fragment) {
                str += this.fragment.toString();
            }
            if (voidElementNames.indexOf(this.descriptor.e) === -1) {
                str += '</' + this.descriptor.e + '>';
            }
            return str;
        };
    }(config_voidElementNames);
var render_DomFragment_Element_prototype_find = function (matches) {
        
        return function (selector) {
            var queryResult;
            if (matches(this.node, selector)) {
                return this.node;
            }
            if (this.html && (queryResult = this.node.querySelector(selector))) {
                return queryResult;
            }
            if (this.fragment && this.fragment.find) {
                return this.fragment.find(selector);
            }
        };
    }(utils_matches);
var render_DomFragment_Element_prototype_findAll = function () {
        
        return function (selector, query) {
            var queryAllResult, i, numNodes, node, registeredNodes;
            if (query._test(this, true) && query.live) {
                (this.liveQueries || (this.liveQueries = [])).push(selector);
                this.liveQueries[selector] = [this.node];
            }
            if (this.html && (queryAllResult = this.node.querySelectorAll(selector)) && (numNodes = queryAllResult.length)) {
                if (query.live) {
                    if (!this.liveQueries[selector]) {
                        (this.liveQueries || (this.liveQueries = [])).push(selector);
                        this.liveQueries[selector] = [];
                    }
                    registeredNodes = this.liveQueries[selector];
                }
                for (i = 0; i < numNodes; i += 1) {
                    node = queryAllResult[i];
                    query.push(node);
                    if (query.live) {
                        registeredNodes.push(node);
                    }
                }
            }
            if (this.fragment) {
                this.fragment.findAll(selector, query);
            }
        };
    }();
var render_DomFragment_Element_prototype_findComponent = function () {
        
        return function (selector) {
            if (this.fragment) {
                return this.fragment.findComponent(selector);
            }
        };
    }();
var render_DomFragment_Element_prototype_findAllComponents = function () {
        
        return function (selector, query) {
            if (this.fragment) {
                this.fragment.findAllComponents(selector, query);
            }
        };
    }();
var render_DomFragment_Element_prototype_bind = function () {
        
        return function () {
            var attributes = this.attributes;
            if (!this.node) {
                return;
            }
            if (this.binding) {
                this.binding.teardown();
                this.binding = null;
            }
            if (this.node.getAttribute('contenteditable') && attributes.value && attributes.value.bind()) {
                return;
            }
            switch (this.descriptor.e) {
            case 'select':
            case 'textarea':
                if (attributes.value) {
                    attributes.value.bind();
                }
                return;
            case 'input':
                if (this.node.type === 'radio' || this.node.type === 'checkbox') {
                    if (attributes.name && attributes.name.bind()) {
                        return;
                    }
                    if (attributes.checked && attributes.checked.bind()) {
                        return;
                    }
                }
                if (attributes.value && attributes.value.bind()) {
                    return;
                }
            }
        };
    }();
var render_DomFragment_Element__Element = function (initialise, teardown, toString, find, findAll, findComponent, findAllComponents, bind) {
        
        var DomElement = function (options, docFrag) {
            initialise(this, options, docFrag);
        };
        DomElement.prototype = {
            detach: function () {
                if (this.node) {
                    if (this.node.parentNode) {
                        this.node.parentNode.removeChild(this.node);
                    }
                    return this.node;
                }
            },
            teardown: teardown,
            firstNode: function () {
                return this.node;
            },
            findNextNode: function () {
                return null;
            },
            bubble: function () {
            },
            toString: toString,
            find: find,
            findAll: findAll,
            findComponent: findComponent,
            findAllComponents: findAllComponents,
            bind: bind
        };
        return DomElement;
    }(render_DomFragment_Element_initialise__initialise, render_DomFragment_Element_prototype_teardown, render_DomFragment_Element_prototype_toString, render_DomFragment_Element_prototype_find, render_DomFragment_Element_prototype_findAll, render_DomFragment_Element_prototype_findComponent, render_DomFragment_Element_prototype_findAllComponents, render_DomFragment_Element_prototype_bind);
var config_errors = { missingParser: 'Missing Ractive.parse - cannot parse template. Either preparse or use the version that includes the parser' };
var registries_partials = {};
var parse_utils_stripHtmlComments = function () {
        
        return function (html) {
            var commentStart, commentEnd, processed;
            processed = '';
            while (html.length) {
                commentStart = html.indexOf('<!--');
                commentEnd = html.indexOf('-->');
                if (commentStart === -1 && commentEnd === -1) {
                    processed += html;
                    break;
                }
                if (commentStart !== -1 && commentEnd === -1) {
                    throw 'Illegal HTML - expected closing comment sequence (\'-->\')';
                }
                if (commentEnd !== -1 && commentStart === -1 || commentEnd < commentStart) {
                    throw 'Illegal HTML - unexpected closing comment sequence (\'-->\')';
                }
                processed += html.substr(0, commentStart);
                html = html.substring(commentEnd + 3);
            }
            return processed;
        };
    }();
var parse_utils_stripStandalones = function (types) {
        
        return function (tokens) {
            var i, current, backOne, backTwo, leadingLinebreak, trailingLinebreak;
            leadingLinebreak = /^\s*\r?\n/;
            trailingLinebreak = /\r?\n\s*$/;
            for (i = 2; i < tokens.length; i += 1) {
                current = tokens[i];
                backOne = tokens[i - 1];
                backTwo = tokens[i - 2];
                if (current.type === types.TEXT && backOne.type === types.MUSTACHE && backTwo.type === types.TEXT) {
                    if (trailingLinebreak.test(backTwo.value) && leadingLinebreak.test(current.value)) {
                        if (backOne.mustacheType !== types.INTERPOLATOR && backOne.mustacheType !== types.TRIPLE) {
                            backTwo.value = backTwo.value.replace(trailingLinebreak, '\n');
                        }
                        current.value = current.value.replace(leadingLinebreak, '');
                        if (current.value === '') {
                            tokens.splice(i--, 1);
                        }
                    }
                }
            }
            return tokens;
        };
    }(config_types);
var parse_utils_stripCommentTokens = function (types) {
        
        return function (tokens) {
            var i, current, previous, next;
            for (i = 0; i < tokens.length; i += 1) {
                current = tokens[i];
                previous = tokens[i - 1];
                next = tokens[i + 1];
                if (current.mustacheType === types.COMMENT || current.mustacheType === types.DELIMCHANGE) {
                    tokens.splice(i, 1);
                    if (previous && next) {
                        if (previous.type === types.TEXT && next.type === types.TEXT) {
                            previous.value += next.value;
                            tokens.splice(i, 1);
                        }
                    }
                    i -= 1;
                }
            }
            return tokens;
        };
    }(config_types);
var parse_Tokenizer_getMustache_getDelimiterChange = function (makeRegexMatcher) {
        
        var getDelimiter = makeRegexMatcher(/^[^\s=]+/);
        return function (tokenizer) {
            var start, opening, closing;
            if (!tokenizer.getStringMatch('=')) {
                return null;
            }
            start = tokenizer.pos;
            tokenizer.allowWhitespace();
            opening = getDelimiter(tokenizer);
            if (!opening) {
                tokenizer.pos = start;
                return null;
            }
            tokenizer.allowWhitespace();
            closing = getDelimiter(tokenizer);
            if (!closing) {
                tokenizer.pos = start;
                return null;
            }
            tokenizer.allowWhitespace();
            if (!tokenizer.getStringMatch('=')) {
                tokenizer.pos = start;
                return null;
            }
            return [
                opening,
                closing
            ];
        };
    }(parse_Tokenizer_utils_makeRegexMatcher);
var parse_Tokenizer_getMustache_getMustacheType = function (types) {
        
        var mustacheTypes = {
                '#': types.SECTION,
                '^': types.INVERTED,
                '/': types.CLOSING,
                '>': types.PARTIAL,
                '!': types.COMMENT,
                '&': types.TRIPLE
            };
        return function (tokenizer) {
            var type = mustacheTypes[tokenizer.str.charAt(tokenizer.pos)];
            if (!type) {
                return null;
            }
            tokenizer.pos += 1;
            return type;
        };
    }(config_types);
var parse_Tokenizer_getMustache_getMustacheContent = function (types, makeRegexMatcher, getMustacheType) {
        
        var getIndexRef = makeRegexMatcher(/^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/), arrayMember = /^[0-9][1-9]*$/;
        return function (tokenizer, isTriple) {
            var start, mustache, type, expr, i, remaining, index;
            start = tokenizer.pos;
            mustache = { type: isTriple ? types.TRIPLE : types.MUSTACHE };
            if (!isTriple) {
                if (expr = tokenizer.getExpression()) {
                    mustache.mustacheType = types.INTERPOLATOR;
                    tokenizer.allowWhitespace();
                    if (tokenizer.getStringMatch(tokenizer.delimiters[1])) {
                        tokenizer.pos -= tokenizer.delimiters[1].length;
                    } else {
                        tokenizer.pos = start;
                        expr = null;
                    }
                }
                if (!expr) {
                    type = getMustacheType(tokenizer);
                    if (type === types.TRIPLE) {
                        mustache = { type: types.TRIPLE };
                    } else {
                        mustache.mustacheType = type || types.INTERPOLATOR;
                    }
                    if (type === types.COMMENT || type === types.CLOSING) {
                        remaining = tokenizer.remaining();
                        index = remaining.indexOf(tokenizer.delimiters[1]);
                        if (index !== -1) {
                            mustache.ref = remaining.substr(0, index);
                            tokenizer.pos += index;
                            return mustache;
                        }
                    }
                }
            }
            if (!expr) {
                tokenizer.allowWhitespace();
                expr = tokenizer.getExpression();
            }
            while (expr.t === types.BRACKETED && expr.x) {
                expr = expr.x;
            }
            if (expr.t === types.REFERENCE) {
                mustache.ref = expr.n;
            } else if (expr.t === types.NUMBER_LITERAL && arrayMember.test(expr.v)) {
                mustache.ref = expr.v;
            } else {
                mustache.expression = expr;
            }
            i = getIndexRef(tokenizer);
            if (i !== null) {
                mustache.indexRef = i;
            }
            return mustache;
        };
    }(config_types, parse_Tokenizer_utils_makeRegexMatcher, parse_Tokenizer_getMustache_getMustacheType);
var parse_Tokenizer_getMustache__getMustache = function (types, getDelimiterChange, getMustacheContent) {
        
        return function () {
            var seekTripleFirst = this.tripleDelimiters[0].length > this.delimiters[0].length;
            return getMustache(this, seekTripleFirst) || getMustache(this, !seekTripleFirst);
        };
        function getMustache(tokenizer, seekTriple) {
            var start = tokenizer.pos, content, delimiters;
            delimiters = seekTriple ? tokenizer.tripleDelimiters : tokenizer.delimiters;
            if (!tokenizer.getStringMatch(delimiters[0])) {
                return null;
            }
            content = getDelimiterChange(tokenizer);
            if (content) {
                if (!tokenizer.getStringMatch(delimiters[1])) {
                    tokenizer.pos = start;
                    return null;
                }
                tokenizer[seekTriple ? 'tripleDelimiters' : 'delimiters'] = content;
                return {
                    type: types.MUSTACHE,
                    mustacheType: types.DELIMCHANGE
                };
            }
            tokenizer.allowWhitespace();
            content = getMustacheContent(tokenizer, seekTriple);
            if (content === null) {
                tokenizer.pos = start;
                return null;
            }
            tokenizer.allowWhitespace();
            if (!tokenizer.getStringMatch(delimiters[1])) {
                tokenizer.pos = start;
                return null;
            }
            return content;
        }
    }(config_types, parse_Tokenizer_getMustache_getDelimiterChange, parse_Tokenizer_getMustache_getMustacheContent);
var parse_Tokenizer_getComment_getComment = function (types) {
        
        return function () {
            var content, remaining, endIndex;
            if (!this.getStringMatch('<!--')) {
                return null;
            }
            remaining = this.remaining();
            endIndex = remaining.indexOf('-->');
            if (endIndex === -1) {
                throw new Error('Unexpected end of input (expected "-->" to close comment)');
            }
            content = remaining.substr(0, endIndex);
            this.pos += endIndex + 3;
            return {
                type: types.COMMENT,
                content: content
            };
        };
    }(config_types);
var parse_Tokenizer_utils_getLowestIndex = function () {
        
        return function (haystack, needles) {
            var i, index, lowest;
            i = needles.length;
            while (i--) {
                index = haystack.indexOf(needles[i]);
                if (!index) {
                    return 0;
                }
                if (index === -1) {
                    continue;
                }
                if (!lowest || index < lowest) {
                    lowest = index;
                }
            }
            return lowest || -1;
        };
    }();
var parse_Tokenizer_getTag__getTag = function (types, makeRegexMatcher, getLowestIndex) {
        
        var getTag, getOpeningTag, getClosingTag, getTagName, getAttributes, getAttribute, getAttributeName, getAttributeValue, getUnquotedAttributeValue, getUnquotedAttributeValueToken, getUnquotedAttributeValueText, getQuotedStringToken, getQuotedAttributeValue;
        getTag = function () {
            return getOpeningTag(this) || getClosingTag(this);
        };
        getOpeningTag = function (tokenizer) {
            var start, tag, attrs, lowerCaseName;
            start = tokenizer.pos;
            if (tokenizer.inside) {
                return null;
            }
            if (!tokenizer.getStringMatch('<')) {
                return null;
            }
            tag = { type: types.TAG };
            if (tokenizer.getStringMatch('!')) {
                tag.doctype = true;
            }
            tag.name = getTagName(tokenizer);
            if (!tag.name) {
                tokenizer.pos = start;
                return null;
            }
            attrs = getAttributes(tokenizer);
            if (attrs) {
                tag.attrs = attrs;
            }
            tokenizer.allowWhitespace();
            if (tokenizer.getStringMatch('/')) {
                tag.selfClosing = true;
            }
            if (!tokenizer.getStringMatch('>')) {
                tokenizer.pos = start;
                return null;
            }
            lowerCaseName = tag.name.toLowerCase();
            if (lowerCaseName === 'script' || lowerCaseName === 'style') {
                tokenizer.inside = lowerCaseName;
            }
            return tag;
        };
        getClosingTag = function (tokenizer) {
            var start, tag, expected;
            start = tokenizer.pos;
            expected = function (str) {
                throw new Error('Unexpected character ' + tokenizer.remaining().charAt(0) + ' (expected ' + str + ')');
            };
            if (!tokenizer.getStringMatch('<')) {
                return null;
            }
            tag = {
                type: types.TAG,
                closing: true
            };
            if (!tokenizer.getStringMatch('/')) {
                expected('"/"');
            }
            tag.name = getTagName(tokenizer);
            if (!tag.name) {
                expected('tag name');
            }
            if (!tokenizer.getStringMatch('>')) {
                expected('">"');
            }
            if (tokenizer.inside) {
                if (tag.name.toLowerCase() !== tokenizer.inside) {
                    tokenizer.pos = start;
                    return null;
                }
                tokenizer.inside = null;
            }
            return tag;
        };
        getTagName = makeRegexMatcher(/^[a-zA-Z]{1,}:?[a-zA-Z0-9\-]*/);
        getAttributes = function (tokenizer) {
            var start, attrs, attr;
            start = tokenizer.pos;
            tokenizer.allowWhitespace();
            attr = getAttribute(tokenizer);
            if (!attr) {
                tokenizer.pos = start;
                return null;
            }
            attrs = [];
            while (attr !== null) {
                attrs[attrs.length] = attr;
                tokenizer.allowWhitespace();
                attr = getAttribute(tokenizer);
            }
            return attrs;
        };
        getAttribute = function (tokenizer) {
            var attr, name, value;
            name = getAttributeName(tokenizer);
            if (!name) {
                return null;
            }
            attr = { name: name };
            value = getAttributeValue(tokenizer);
            if (value) {
                attr.value = value;
            }
            return attr;
        };
        getAttributeName = makeRegexMatcher(/^[^\s"'>\/=]+/);
        getAttributeValue = function (tokenizer) {
            var start, value;
            start = tokenizer.pos;
            tokenizer.allowWhitespace();
            if (!tokenizer.getStringMatch('=')) {
                tokenizer.pos = start;
                return null;
            }
            tokenizer.allowWhitespace();
            value = getQuotedAttributeValue(tokenizer, '\'') || getQuotedAttributeValue(tokenizer, '"') || getUnquotedAttributeValue(tokenizer);
            if (value === null) {
                tokenizer.pos = start;
                return null;
            }
            return value;
        };
        getUnquotedAttributeValueText = makeRegexMatcher(/^[^\s"'=<>`]+/);
        getUnquotedAttributeValueToken = function (tokenizer) {
            var start, text, index;
            start = tokenizer.pos;
            text = getUnquotedAttributeValueText(tokenizer);
            if (!text) {
                return null;
            }
            if ((index = text.indexOf(tokenizer.delimiters[0])) !== -1) {
                text = text.substr(0, index);
                tokenizer.pos = start + text.length;
            }
            return {
                type: types.TEXT,
                value: text
            };
        };
        getUnquotedAttributeValue = function (tokenizer) {
            var tokens, token;
            tokens = [];
            token = tokenizer.getMustache() || getUnquotedAttributeValueToken(tokenizer);
            while (token !== null) {
                tokens[tokens.length] = token;
                token = tokenizer.getMustache() || getUnquotedAttributeValueToken(tokenizer);
            }
            if (!tokens.length) {
                return null;
            }
            return tokens;
        };
        getQuotedAttributeValue = function (tokenizer, quoteMark) {
            var start, tokens, token;
            start = tokenizer.pos;
            if (!tokenizer.getStringMatch(quoteMark)) {
                return null;
            }
            tokens = [];
            token = tokenizer.getMustache() || getQuotedStringToken(tokenizer, quoteMark);
            while (token !== null) {
                tokens[tokens.length] = token;
                token = tokenizer.getMustache() || getQuotedStringToken(tokenizer, quoteMark);
            }
            if (!tokenizer.getStringMatch(quoteMark)) {
                tokenizer.pos = start;
                return null;
            }
            return tokens;
        };
        getQuotedStringToken = function (tokenizer, quoteMark) {
            var start, index, remaining;
            start = tokenizer.pos;
            remaining = tokenizer.remaining();
            index = getLowestIndex(remaining, [
                quoteMark,
                tokenizer.delimiters[0],
                tokenizer.delimiters[1]
            ]);
            if (index === -1) {
                throw new Error('Quoted attribute value must have a closing quote');
            }
            if (!index) {
                return null;
            }
            tokenizer.pos += index;
            return {
                type: types.TEXT,
                value: remaining.substr(0, index)
            };
        };
        return getTag;
    }(config_types, parse_Tokenizer_utils_makeRegexMatcher, parse_Tokenizer_utils_getLowestIndex);
var parse_Tokenizer_getText__getText = function (types, getLowestIndex) {
        
        return function () {
            var index, remaining, barrier;
            remaining = this.remaining();
            barrier = this.inside ? '</' + this.inside : '<';
            index = getLowestIndex(remaining, [
                barrier,
                this.delimiters[0],
                this.tripleDelimiters[0]
            ]);
            if (!index) {
                return null;
            }
            if (index === -1) {
                index = remaining.length;
            }
            this.pos += index;
            return {
                type: types.TEXT,
                value: remaining.substr(0, index)
            };
        };
    }(config_types, parse_Tokenizer_utils_getLowestIndex);
var parse_Tokenizer_getExpression_getPrimary_getLiteral_getBooleanLiteral = function (types) {
        
        return function (tokenizer) {
            var remaining = tokenizer.remaining();
            if (remaining.substr(0, 4) === 'true') {
                tokenizer.pos += 4;
                return {
                    t: types.BOOLEAN_LITERAL,
                    v: 'true'
                };
            }
            if (remaining.substr(0, 5) === 'false') {
                tokenizer.pos += 5;
                return {
                    t: types.BOOLEAN_LITERAL,
                    v: 'false'
                };
            }
            return null;
        };
    }(config_types);
var parse_Tokenizer_getExpression_getPrimary_getLiteral_getObjectLiteral_getKeyValuePair = function (types, getKey) {
        
        return function (tokenizer) {
            var start, key, value;
            start = tokenizer.pos;
            tokenizer.allowWhitespace();
            key = getKey(tokenizer);
            if (key === null) {
                tokenizer.pos = start;
                return null;
            }
            tokenizer.allowWhitespace();
            if (!tokenizer.getStringMatch(':')) {
                tokenizer.pos = start;
                return null;
            }
            tokenizer.allowWhitespace();
            value = tokenizer.getExpression();
            if (value === null) {
                tokenizer.pos = start;
                return null;
            }
            return {
                t: types.KEY_VALUE_PAIR,
                k: key,
                v: value
            };
        };
    }(config_types, parse_Tokenizer_getExpression_shared_getKey);
var parse_Tokenizer_getExpression_getPrimary_getLiteral_getObjectLiteral_getKeyValuePairs = function (getKeyValuePair) {
        
        return function getKeyValuePairs(tokenizer) {
            var start, pairs, pair, keyValuePairs;
            start = tokenizer.pos;
            pair = getKeyValuePair(tokenizer);
            if (pair === null) {
                return null;
            }
            pairs = [pair];
            if (tokenizer.getStringMatch(',')) {
                keyValuePairs = getKeyValuePairs(tokenizer);
                if (!keyValuePairs) {
                    tokenizer.pos = start;
                    return null;
                }
                return pairs.concat(keyValuePairs);
            }
            return pairs;
        };
    }(parse_Tokenizer_getExpression_getPrimary_getLiteral_getObjectLiteral_getKeyValuePair);
var parse_Tokenizer_getExpression_getPrimary_getLiteral_getObjectLiteral__getObjectLiteral = function (types, getKeyValuePairs) {
        
        return function (tokenizer) {
            var start, keyValuePairs;
            start = tokenizer.pos;
            tokenizer.allowWhitespace();
            if (!tokenizer.getStringMatch('{')) {
                tokenizer.pos = start;
                return null;
            }
            keyValuePairs = getKeyValuePairs(tokenizer);
            tokenizer.allowWhitespace();
            if (!tokenizer.getStringMatch('}')) {
                tokenizer.pos = start;
                return null;
            }
            return {
                t: types.OBJECT_LITERAL,
                m: keyValuePairs
            };
        };
    }(config_types, parse_Tokenizer_getExpression_getPrimary_getLiteral_getObjectLiteral_getKeyValuePairs);
var parse_Tokenizer_getExpression_shared_getExpressionList = function () {
        
        return function getExpressionList(tokenizer) {
            var start, expressions, expr, next;
            start = tokenizer.pos;
            tokenizer.allowWhitespace();
            expr = tokenizer.getExpression();
            if (expr === null) {
                return null;
            }
            expressions = [expr];
            tokenizer.allowWhitespace();
            if (tokenizer.getStringMatch(',')) {
                next = getExpressionList(tokenizer);
                if (next === null) {
                    tokenizer.pos = start;
                    return null;
                }
                expressions = expressions.concat(next);
            }
            return expressions;
        };
    }();
var parse_Tokenizer_getExpression_getPrimary_getLiteral_getArrayLiteral = function (types, getExpressionList) {
        
        return function (tokenizer) {
            var start, expressionList;
            start = tokenizer.pos;
            tokenizer.allowWhitespace();
            if (!tokenizer.getStringMatch('[')) {
                tokenizer.pos = start;
                return null;
            }
            expressionList = getExpressionList(tokenizer);
            if (!tokenizer.getStringMatch(']')) {
                tokenizer.pos = start;
                return null;
            }
            return {
                t: types.ARRAY_LITERAL,
                m: expressionList
            };
        };
    }(config_types, parse_Tokenizer_getExpression_shared_getExpressionList);
var parse_Tokenizer_getExpression_getPrimary_getLiteral__getLiteral = function (getNumberLiteral, getBooleanLiteral, getStringLiteral, getObjectLiteral, getArrayLiteral) {
        
        return function (tokenizer) {
            var literal = getNumberLiteral(tokenizer) || getBooleanLiteral(tokenizer) || getStringLiteral(tokenizer) || getObjectLiteral(tokenizer) || getArrayLiteral(tokenizer);
            return literal;
        };
    }(parse_Tokenizer_getExpression_getPrimary_getLiteral_getNumberLiteral, parse_Tokenizer_getExpression_getPrimary_getLiteral_getBooleanLiteral, parse_Tokenizer_getExpression_getPrimary_getLiteral_getStringLiteral__getStringLiteral, parse_Tokenizer_getExpression_getPrimary_getLiteral_getObjectLiteral__getObjectLiteral, parse_Tokenizer_getExpression_getPrimary_getLiteral_getArrayLiteral);
var parse_Tokenizer_getExpression_getPrimary_getReference = function (types, makeRegexMatcher, getName) {
        
        var getDotRefinement, getArrayRefinement, getArrayMember, globals;
        getDotRefinement = makeRegexMatcher(/^\.[a-zA-Z_$0-9]+/);
        getArrayRefinement = function (tokenizer) {
            var num = getArrayMember(tokenizer);
            if (num) {
                return '.' + num;
            }
            return null;
        };
        getArrayMember = makeRegexMatcher(/^\[(0|[1-9][0-9]*)\]/);
        globals = /^(?:Array|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null)$/;
        return function (tokenizer) {
            var startPos, ancestor, name, dot, combo, refinement, lastDotIndex;
            startPos = tokenizer.pos;
            ancestor = '';
            while (tokenizer.getStringMatch('../')) {
                ancestor += '../';
            }
            if (!ancestor) {
                dot = tokenizer.getStringMatch('.') || '';
            }
            name = getName(tokenizer) || '';
            if (!ancestor && !dot && globals.test(name)) {
                return {
                    t: types.GLOBAL,
                    v: name
                };
            }
            if (name === 'this' && !ancestor && !dot) {
                name = '.';
                startPos += 3;
            }
            combo = (ancestor || dot) + name;
            if (!combo) {
                return null;
            }
            while (refinement = getDotRefinement(tokenizer) || getArrayRefinement(tokenizer)) {
                combo += refinement;
            }
            if (tokenizer.getStringMatch('(')) {
                lastDotIndex = combo.lastIndexOf('.');
                if (lastDotIndex !== -1) {
                    combo = combo.substr(0, lastDotIndex);
                    tokenizer.pos = startPos + combo.length;
                } else {
                    tokenizer.pos -= 1;
                }
            }
            return {
                t: types.REFERENCE,
                n: combo
            };
        };
    }(config_types, parse_Tokenizer_utils_makeRegexMatcher, parse_Tokenizer_getExpression_shared_getName);
var parse_Tokenizer_getExpression_getPrimary_getBracketedExpression = function (types) {
        
        return function (tokenizer) {
            var start, expr;
            start = tokenizer.pos;
            if (!tokenizer.getStringMatch('(')) {
                return null;
            }
            tokenizer.allowWhitespace();
            expr = tokenizer.getExpression();
            if (!expr) {
                tokenizer.pos = start;
                return null;
            }
            tokenizer.allowWhitespace();
            if (!tokenizer.getStringMatch(')')) {
                tokenizer.pos = start;
                return null;
            }
            return {
                t: types.BRACKETED,
                x: expr
            };
        };
    }(config_types);
var parse_Tokenizer_getExpression_getPrimary__getPrimary = function (getLiteral, getReference, getBracketedExpression) {
        
        return function (tokenizer) {
            return getLiteral(tokenizer) || getReference(tokenizer) || getBracketedExpression(tokenizer);
        };
    }(parse_Tokenizer_getExpression_getPrimary_getLiteral__getLiteral, parse_Tokenizer_getExpression_getPrimary_getReference, parse_Tokenizer_getExpression_getPrimary_getBracketedExpression);
var parse_Tokenizer_getExpression_shared_getRefinement = function (types, getName) {
        
        return function getRefinement(tokenizer) {
            var start, name, expr;
            start = tokenizer.pos;
            tokenizer.allowWhitespace();
            if (tokenizer.getStringMatch('.')) {
                tokenizer.allowWhitespace();
                if (name = getName(tokenizer)) {
                    return {
                        t: types.REFINEMENT,
                        n: name
                    };
                }
                tokenizer.expected('a property name');
            }
            if (tokenizer.getStringMatch('[')) {
                tokenizer.allowWhitespace();
                expr = tokenizer.getExpression();
                if (!expr) {
                    tokenizer.expected('an expression');
                }
                tokenizer.allowWhitespace();
                if (!tokenizer.getStringMatch(']')) {
                    tokenizer.expected('"]"');
                }
                return {
                    t: types.REFINEMENT,
                    x: expr
                };
            }
            return null;
        };
    }(config_types, parse_Tokenizer_getExpression_shared_getName);
var parse_Tokenizer_getExpression_getMemberOrInvocation = function (types, getPrimary, getExpressionList, getRefinement) {
        
        return function (tokenizer) {
            var current, expression, refinement, expressionList;
            expression = getPrimary(tokenizer);
            if (!expression) {
                return null;
            }
            while (expression) {
                current = tokenizer.pos;
                if (refinement = getRefinement(tokenizer)) {
                    expression = {
                        t: types.MEMBER,
                        x: expression,
                        r: refinement
                    };
                } else if (tokenizer.getStringMatch('(')) {
                    tokenizer.allowWhitespace();
                    expressionList = getExpressionList(tokenizer);
                    tokenizer.allowWhitespace();
                    if (!tokenizer.getStringMatch(')')) {
                        tokenizer.pos = current;
                        break;
                    }
                    expression = {
                        t: types.INVOCATION,
                        x: expression
                    };
                    if (expressionList) {
                        expression.o = expressionList;
                    }
                } else {
                    break;
                }
            }
            return expression;
        };
    }(config_types, parse_Tokenizer_getExpression_getPrimary__getPrimary, parse_Tokenizer_getExpression_shared_getExpressionList, parse_Tokenizer_getExpression_shared_getRefinement);
var parse_Tokenizer_getExpression_getTypeOf = function (types, getMemberOrInvocation) {
        
        var getTypeOf, makePrefixSequenceMatcher;
        makePrefixSequenceMatcher = function (symbol, fallthrough) {
            return function (tokenizer) {
                var start, expression;
                if (!tokenizer.getStringMatch(symbol)) {
                    return fallthrough(tokenizer);
                }
                start = tokenizer.pos;
                tokenizer.allowWhitespace();
                expression = tokenizer.getExpression();
                if (!expression) {
                    tokenizer.expected('an expression');
                }
                return {
                    s: symbol,
                    o: expression,
                    t: types.PREFIX_OPERATOR
                };
            };
        };
        (function () {
            var i, len, matcher, prefixOperators, fallthrough;
            prefixOperators = '! ~ + - typeof'.split(' ');
            fallthrough = getMemberOrInvocation;
            for (i = 0, len = prefixOperators.length; i < len; i += 1) {
                matcher = makePrefixSequenceMatcher(prefixOperators[i], fallthrough);
                fallthrough = matcher;
            }
            getTypeOf = fallthrough;
        }());
        return getTypeOf;
    }(config_types, parse_Tokenizer_getExpression_getMemberOrInvocation);
var parse_Tokenizer_getExpression_getLogicalOr = function (types, getTypeOf) {
        
        var getLogicalOr, makeInfixSequenceMatcher;
        makeInfixSequenceMatcher = function (symbol, fallthrough) {
            return function (tokenizer) {
                var start, left, right;
                left = fallthrough(tokenizer);
                if (!left) {
                    return null;
                }
                start = tokenizer.pos;
                tokenizer.allowWhitespace();
                if (!tokenizer.getStringMatch(symbol)) {
                    tokenizer.pos = start;
                    return left;
                }
                if (symbol === 'in' && /[a-zA-Z_$0-9]/.test(tokenizer.remaining().charAt(0))) {
                    tokenizer.pos = start;
                    return left;
                }
                tokenizer.allowWhitespace();
                right = tokenizer.getExpression();
                if (!right) {
                    tokenizer.pos = start;
                    return left;
                }
                return {
                    t: types.INFIX_OPERATOR,
                    s: symbol,
                    o: [
                        left,
                        right
                    ]
                };
            };
        };
        (function () {
            var i, len, matcher, infixOperators, fallthrough;
            infixOperators = '* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||'.split(' ');
            fallthrough = getTypeOf;
            for (i = 0, len = infixOperators.length; i < len; i += 1) {
                matcher = makeInfixSequenceMatcher(infixOperators[i], fallthrough);
                fallthrough = matcher;
            }
            getLogicalOr = fallthrough;
        }());
        return getLogicalOr;
    }(config_types, parse_Tokenizer_getExpression_getTypeOf);
var parse_Tokenizer_getExpression_getConditional = function (types, getLogicalOr) {
        
        return function (tokenizer) {
            var start, expression, ifTrue, ifFalse;
            expression = getLogicalOr(tokenizer);
            if (!expression) {
                return null;
            }
            start = tokenizer.pos;
            tokenizer.allowWhitespace();
            if (!tokenizer.getStringMatch('?')) {
                tokenizer.pos = start;
                return expression;
            }
            tokenizer.allowWhitespace();
            ifTrue = tokenizer.getExpression();
            if (!ifTrue) {
                tokenizer.pos = start;
                return expression;
            }
            tokenizer.allowWhitespace();
            if (!tokenizer.getStringMatch(':')) {
                tokenizer.pos = start;
                return expression;
            }
            tokenizer.allowWhitespace();
            ifFalse = tokenizer.getExpression();
            if (!ifFalse) {
                tokenizer.pos = start;
                return expression;
            }
            return {
                t: types.CONDITIONAL,
                o: [
                    expression,
                    ifTrue,
                    ifFalse
                ]
            };
        };
    }(config_types, parse_Tokenizer_getExpression_getLogicalOr);
var parse_Tokenizer_getExpression__getExpression = function (getConditional) {
        
        return function () {
            return getConditional(this);
        };
    }(parse_Tokenizer_getExpression_getConditional);
var parse_Tokenizer__Tokenizer = function (getMustache, getComment, getTag, getText, getExpression, allowWhitespace, getStringMatch) {
        
        var Tokenizer;
        Tokenizer = function (str, options) {
            var token;
            this.str = str;
            this.pos = 0;
            this.delimiters = options.delimiters;
            this.tripleDelimiters = options.tripleDelimiters;
            this.tokens = [];
            while (this.pos < this.str.length) {
                token = this.getToken();
                if (token === null && this.remaining()) {
                    this.fail();
                }
                this.tokens.push(token);
            }
        };
        Tokenizer.prototype = {
            getToken: function () {
                var token = this.getMustache() || this.getComment() || this.getTag() || this.getText();
                return token;
            },
            getMustache: getMustache,
            getComment: getComment,
            getTag: getTag,
            getText: getText,
            getExpression: getExpression,
            allowWhitespace: allowWhitespace,
            getStringMatch: getStringMatch,
            remaining: function () {
                return this.str.substring(this.pos);
            },
            fail: function () {
                var last20, next20;
                last20 = this.str.substr(0, this.pos).substr(-20);
                if (last20.length === 20) {
                    last20 = '...' + last20;
                }
                next20 = this.remaining().substr(0, 20);
                if (next20.length === 20) {
                    next20 = next20 + '...';
                }
                throw new Error('Could not parse template: ' + (last20 ? last20 + '<- ' : '') + 'failed at character ' + this.pos + ' ->' + next20);
            },
            expected: function (thing) {
                var remaining = this.remaining().substr(0, 40);
                if (remaining.length === 40) {
                    remaining += '...';
                }
                throw new Error('Tokenizer failed: unexpected string "' + remaining + '" (expected ' + thing + ')');
            }
        };
        return Tokenizer;
    }(parse_Tokenizer_getMustache__getMustache, parse_Tokenizer_getComment_getComment, parse_Tokenizer_getTag__getTag, parse_Tokenizer_getText__getText, parse_Tokenizer_getExpression__getExpression, parse_Tokenizer_utils_allowWhitespace, parse_Tokenizer_utils_getStringMatch);
var parse_tokenize = function (stripHtmlComments, stripStandalones, stripCommentTokens, Tokenizer, circular) {
        
        var tokenize, Ractive;
        circular.push(function () {
            Ractive = circular.Ractive;
        });
        tokenize = function (template, options) {
            var tokenizer, tokens;
            options = options || {};
            if (options.stripComments !== false) {
                template = stripHtmlComments(template);
            }
            tokenizer = new Tokenizer(template, {
                delimiters: options.delimiters || (Ractive ? Ractive.delimiters : [
                    '{{',
                    '}}'
                ]),
                tripleDelimiters: options.tripleDelimiters || (Ractive ? Ractive.tripleDelimiters : [
                    '{{{',
                    '}}}'
                ])
            });
            tokens = tokenizer.tokens;
            stripStandalones(tokens);
            stripCommentTokens(tokens);
            return tokens;
        };
        return tokenize;
    }(parse_utils_stripHtmlComments, parse_utils_stripStandalones, parse_utils_stripCommentTokens, parse_Tokenizer__Tokenizer, circular);
var parse_Parser_getText_TextStub__TextStub = function (types) {
        
        var TextStub, htmlEntities, controlCharacters, namedEntityPattern, hexEntityPattern, decimalEntityPattern, validateCode, decodeCharacterReferences, whitespace;
        TextStub = function (token, preserveWhitespace) {
            this.text = preserveWhitespace ? token.value : token.value.replace(whitespace, ' ');
        };
        TextStub.prototype = {
            type: types.TEXT,
            toJSON: function () {
                return this.decoded || (this.decoded = decodeCharacterReferences(this.text));
            },
            toString: function () {
                return this.text;
            }
        };
        htmlEntities = {
            quot: 34,
            amp: 38,
            apos: 39,
            lt: 60,
            gt: 62,
            nbsp: 160,
            iexcl: 161,
            cent: 162,
            pound: 163,
            curren: 164,
            yen: 165,
            brvbar: 166,
            sect: 167,
            uml: 168,
            copy: 169,
            ordf: 170,
            laquo: 171,
            not: 172,
            shy: 173,
            reg: 174,
            macr: 175,
            deg: 176,
            plusmn: 177,
            sup2: 178,
            sup3: 179,
            acute: 180,
            micro: 181,
            para: 182,
            middot: 183,
            cedil: 184,
            sup1: 185,
            ordm: 186,
            raquo: 187,
            frac14: 188,
            frac12: 189,
            frac34: 190,
            iquest: 191,
            Agrave: 192,
            Aacute: 193,
            Acirc: 194,
            Atilde: 195,
            Auml: 196,
            Aring: 197,
            AElig: 198,
            Ccedil: 199,
            Egrave: 200,
            Eacute: 201,
            Ecirc: 202,
            Euml: 203,
            Igrave: 204,
            Iacute: 205,
            Icirc: 206,
            Iuml: 207,
            ETH: 208,
            Ntilde: 209,
            Ograve: 210,
            Oacute: 211,
            Ocirc: 212,
            Otilde: 213,
            Ouml: 214,
            times: 215,
            Oslash: 216,
            Ugrave: 217,
            Uacute: 218,
            Ucirc: 219,
            Uuml: 220,
            Yacute: 221,
            THORN: 222,
            szlig: 223,
            agrave: 224,
            aacute: 225,
            acirc: 226,
            atilde: 227,
            auml: 228,
            aring: 229,
            aelig: 230,
            ccedil: 231,
            egrave: 232,
            eacute: 233,
            ecirc: 234,
            euml: 235,
            igrave: 236,
            iacute: 237,
            icirc: 238,
            iuml: 239,
            eth: 240,
            ntilde: 241,
            ograve: 242,
            oacute: 243,
            ocirc: 244,
            otilde: 245,
            ouml: 246,
            divide: 247,
            oslash: 248,
            ugrave: 249,
            uacute: 250,
            ucirc: 251,
            uuml: 252,
            yacute: 253,
            thorn: 254,
            yuml: 255,
            OElig: 338,
            oelig: 339,
            Scaron: 352,
            scaron: 353,
            Yuml: 376,
            fnof: 402,
            circ: 710,
            tilde: 732,
            Alpha: 913,
            Beta: 914,
            Gamma: 915,
            Delta: 916,
            Epsilon: 917,
            Zeta: 918,
            Eta: 919,
            Theta: 920,
            Iota: 921,
            Kappa: 922,
            Lambda: 923,
            Mu: 924,
            Nu: 925,
            Xi: 926,
            Omicron: 927,
            Pi: 928,
            Rho: 929,
            Sigma: 931,
            Tau: 932,
            Upsilon: 933,
            Phi: 934,
            Chi: 935,
            Psi: 936,
            Omega: 937,
            alpha: 945,
            beta: 946,
            gamma: 947,
            delta: 948,
            epsilon: 949,
            zeta: 950,
            eta: 951,
            theta: 952,
            iota: 953,
            kappa: 954,
            lambda: 955,
            mu: 956,
            nu: 957,
            xi: 958,
            omicron: 959,
            pi: 960,
            rho: 961,
            sigmaf: 962,
            sigma: 963,
            tau: 964,
            upsilon: 965,
            phi: 966,
            chi: 967,
            psi: 968,
            omega: 969,
            thetasym: 977,
            upsih: 978,
            piv: 982,
            ensp: 8194,
            emsp: 8195,
            thinsp: 8201,
            zwnj: 8204,
            zwj: 8205,
            lrm: 8206,
            rlm: 8207,
            ndash: 8211,
            mdash: 8212,
            lsquo: 8216,
            rsquo: 8217,
            sbquo: 8218,
            ldquo: 8220,
            rdquo: 8221,
            bdquo: 8222,
            dagger: 8224,
            Dagger: 8225,
            bull: 8226,
            hellip: 8230,
            permil: 8240,
            prime: 8242,
            Prime: 8243,
            lsaquo: 8249,
            rsaquo: 8250,
            oline: 8254,
            frasl: 8260,
            euro: 8364,
            image: 8465,
            weierp: 8472,
            real: 8476,
            trade: 8482,
            alefsym: 8501,
            larr: 8592,
            uarr: 8593,
            rarr: 8594,
            darr: 8595,
            harr: 8596,
            crarr: 8629,
            lArr: 8656,
            uArr: 8657,
            rArr: 8658,
            dArr: 8659,
            hArr: 8660,
            forall: 8704,
            part: 8706,
            exist: 8707,
            empty: 8709,
            nabla: 8711,
            isin: 8712,
            notin: 8713,
            ni: 8715,
            prod: 8719,
            sum: 8721,
            minus: 8722,
            lowast: 8727,
            radic: 8730,
            prop: 8733,
            infin: 8734,
            ang: 8736,
            and: 8743,
            or: 8744,
            cap: 8745,
            cup: 8746,
            'int': 8747,
            there4: 8756,
            sim: 8764,
            cong: 8773,
            asymp: 8776,
            ne: 8800,
            equiv: 8801,
            le: 8804,
            ge: 8805,
            sub: 8834,
            sup: 8835,
            nsub: 8836,
            sube: 8838,
            supe: 8839,
            oplus: 8853,
            otimes: 8855,
            perp: 8869,
            sdot: 8901,
            lceil: 8968,
            rceil: 8969,
            lfloor: 8970,
            rfloor: 8971,
            lang: 9001,
            rang: 9002,
            loz: 9674,
            spades: 9824,
            clubs: 9827,
            hearts: 9829,
            diams: 9830
        };
        controlCharacters = [
            8364,
            129,
            8218,
            402,
            8222,
            8230,
            8224,
            8225,
            710,
            8240,
            352,
            8249,
            338,
            141,
            381,
            143,
            144,
            8216,
            8217,
            8220,
            8221,
            8226,
            8211,
            8212,
            732,
            8482,
            353,
            8250,
            339,
            157,
            382,
            376
        ];
        namedEntityPattern = new RegExp('&(' + Object.keys(htmlEntities).join('|') + ');?', 'g');
        hexEntityPattern = /&#x([0-9]+);?/g;
        decimalEntityPattern = /&#([0-9]+);?/g;
        validateCode = function (code) {
            if (!code) {
                return 65533;
            }
            if (code === 10) {
                return 32;
            }
            if (code < 128) {
                return code;
            }
            if (code <= 159) {
                return controlCharacters[code - 128];
            }
            if (code < 55296) {
                return code;
            }
            if (code <= 57343) {
                return 65533;
            }
            if (code <= 65535) {
                return code;
            }
            return 65533;
        };
        decodeCharacterReferences = function (html) {
            var result;
            result = html.replace(namedEntityPattern, function (match, name) {
                if (htmlEntities[name]) {
                    return String.fromCharCode(htmlEntities[name]);
                }
                return match;
            });
            result = result.replace(hexEntityPattern, function (match, hex) {
                return String.fromCharCode(validateCode(parseInt(hex, 16)));
            });
            result = result.replace(decimalEntityPattern, function (match, charCode) {
                return String.fromCharCode(validateCode(charCode));
            });
            return result;
        };
        whitespace = /\s+/g;
        return TextStub;
    }(config_types);
var parse_Parser_getText__getText = function (types, TextStub) {
        
        return function (token) {
            if (token.type === types.TEXT) {
                this.pos += 1;
                return new TextStub(token, this.preserveWhitespace);
            }
            return null;
        };
    }(config_types, parse_Parser_getText_TextStub__TextStub);
var parse_Parser_getComment_CommentStub__CommentStub = function (types) {
        
        var CommentStub;
        CommentStub = function (token) {
            this.content = token.content;
        };
        CommentStub.prototype = {
            toJSON: function () {
                return {
                    t: types.COMMENT,
                    f: this.content
                };
            },
            toString: function () {
                return '<!--' + this.content + '-->';
            }
        };
        return CommentStub;
    }(config_types);
var parse_Parser_getComment__getComment = function (types, CommentStub) {
        
        return function (token) {
            if (token.type === types.COMMENT) {
                this.pos += 1;
                return new CommentStub(token, this.preserveWhitespace);
            }
            return null;
        };
    }(config_types, parse_Parser_getComment_CommentStub__CommentStub);
var parse_Parser_getMustache_ExpressionStub__ExpressionStub = function (types, isObject) {
        
        var ExpressionStub, getRefs, stringify;
        ExpressionStub = function (token) {
            this.refs = [];
            getRefs(token, this.refs);
            this.str = stringify(token, this.refs);
        };
        ExpressionStub.prototype = {
            toJSON: function () {
                if (this.json) {
                    return this.json;
                }
                this.json = {
                    r: this.refs,
                    s: this.str
                };
                return this.json;
            }
        };
        getRefs = function (token, refs) {
            var i, list;
            if (token.t === types.REFERENCE) {
                if (refs.indexOf(token.n) === -1) {
                    refs.unshift(token.n);
                }
            }
            list = token.o || token.m;
            if (list) {
                if (isObject(list)) {
                    getRefs(list, refs);
                } else {
                    i = list.length;
                    while (i--) {
                        getRefs(list[i], refs);
                    }
                }
            }
            if (token.x) {
                getRefs(token.x, refs);
            }
            if (token.r) {
                getRefs(token.r, refs);
            }
            if (token.v) {
                getRefs(token.v, refs);
            }
        };
        stringify = function (token, refs) {
            var map = function (item) {
                return stringify(item, refs);
            };
            switch (token.t) {
            case types.BOOLEAN_LITERAL:
            case types.GLOBAL:
            case types.NUMBER_LITERAL:
                return token.v;
            case types.STRING_LITERAL:
                return '\'' + token.v.replace(/'/g, '\\\'') + '\'';
            case types.ARRAY_LITERAL:
                return '[' + (token.m ? token.m.map(map).join(',') : '') + ']';
            case types.OBJECT_LITERAL:
                return '{' + (token.m ? token.m.map(map).join(',') : '') + '}';
            case types.KEY_VALUE_PAIR:
                return token.k + ':' + stringify(token.v, refs);
            case types.PREFIX_OPERATOR:
                return (token.s === 'typeof' ? 'typeof ' : token.s) + stringify(token.o, refs);
            case types.INFIX_OPERATOR:
                return stringify(token.o[0], refs) + (token.s.substr(0, 2) === 'in' ? ' ' + token.s + ' ' : token.s) + stringify(token.o[1], refs);
            case types.INVOCATION:
                return stringify(token.x, refs) + '(' + (token.o ? token.o.map(map).join(',') : '') + ')';
            case types.BRACKETED:
                return '(' + stringify(token.x, refs) + ')';
            case types.MEMBER:
                return stringify(token.x, refs) + stringify(token.r, refs);
            case types.REFINEMENT:
                return token.n ? '.' + token.n : '[' + stringify(token.x, refs) + ']';
            case types.CONDITIONAL:
                return stringify(token.o[0], refs) + '?' + stringify(token.o[1], refs) + ':' + stringify(token.o[2], refs);
            case types.REFERENCE:
                return '${' + refs.indexOf(token.n) + '}';
            default:
                throw new Error('Could not stringify expression token. This error is unexpected');
            }
        };
        return ExpressionStub;
    }(config_types, utils_isObject);
var parse_Parser_getMustache_MustacheStub__MustacheStub = function (types, ExpressionStub) {
        
        var MustacheStub = function (token, parser) {
            this.type = token.type === types.TRIPLE ? types.TRIPLE : token.mustacheType;
            if (token.ref) {
                this.ref = token.ref;
            }
            if (token.expression) {
                this.expr = new ExpressionStub(token.expression);
            }
            parser.pos += 1;
        };
        MustacheStub.prototype = {
            toJSON: function () {
                var json;
                if (this.json) {
                    return this.json;
                }
                json = { t: this.type };
                if (this.ref) {
                    json.r = this.ref;
                }
                if (this.expr) {
                    json.x = this.expr.toJSON();
                }
                this.json = json;
                return json;
            },
            toString: function () {
                return false;
            }
        };
        return MustacheStub;
    }(config_types, parse_Parser_getMustache_ExpressionStub__ExpressionStub);
var parse_Parser_utils_stringifyStubs = function () {
        
        return function (items) {
            var str = '', itemStr, i, len;
            if (!items) {
                return '';
            }
            for (i = 0, len = items.length; i < len; i += 1) {
                itemStr = items[i].toString();
                if (itemStr === false) {
                    return false;
                }
                str += itemStr;
            }
            return str;
        };
    }();
var parse_Parser_utils_jsonifyStubs = function (stringifyStubs) {
        
        return function (items, noStringify) {
            var str, json;
            if (!noStringify) {
                str = stringifyStubs(items);
                if (str !== false) {
                    return str;
                }
            }
            json = items.map(function (item) {
                return item.toJSON(noStringify);
            });
            return json;
        };
    }(parse_Parser_utils_stringifyStubs);
var parse_Parser_getMustache_SectionStub__SectionStub = function (types, jsonifyStubs, ExpressionStub) {
        
        var SectionStub = function (firstToken, parser) {
            var next;
            this.ref = firstToken.ref;
            this.indexRef = firstToken.indexRef;
            this.inverted = firstToken.mustacheType === types.INVERTED;
            if (firstToken.expression) {
                this.expr = new ExpressionStub(firstToken.expression);
            }
            parser.pos += 1;
            this.items = [];
            next = parser.next();
            while (next) {
                if (next.mustacheType === types.CLOSING) {
                    if (next.ref.trim() === this.ref || this.expr) {
                        parser.pos += 1;
                        break;
                    } else {
                        throw new Error('Could not parse template: Illegal closing section');
                    }
                }
                this.items[this.items.length] = parser.getStub();
                next = parser.next();
            }
        };
        SectionStub.prototype = {
            toJSON: function (noStringify) {
                var json;
                if (this.json) {
                    return this.json;
                }
                json = { t: types.SECTION };
                if (this.ref) {
                    json.r = this.ref;
                }
                if (this.indexRef) {
                    json.i = this.indexRef;
                }
                if (this.inverted) {
                    json.n = true;
                }
                if (this.expr) {
                    json.x = this.expr.toJSON();
                }
                if (this.items.length) {
                    json.f = jsonifyStubs(this.items, noStringify);
                }
                this.json = json;
                return json;
            },
            toString: function () {
                return false;
            }
        };
        return SectionStub;
    }(config_types, parse_Parser_utils_jsonifyStubs, parse_Parser_getMustache_ExpressionStub__ExpressionStub);
var parse_Parser_getMustache__getMustache = function (types, MustacheStub, SectionStub) {
        
        return function (token) {
            if (token.type === types.MUSTACHE || token.type === types.TRIPLE) {
                if (token.mustacheType === types.SECTION || token.mustacheType === types.INVERTED) {
                    return new SectionStub(token, this);
                }
                return new MustacheStub(token, this);
            }
        };
    }(config_types, parse_Parser_getMustache_MustacheStub__MustacheStub, parse_Parser_getMustache_SectionStub__SectionStub);
var parse_Parser_getElement_ElementStub_utils_siblingsByTagName = function () {
        
        return {
            li: ['li'],
            dt: [
                'dt',
                'dd'
            ],
            dd: [
                'dt',
                'dd'
            ],
            p: 'address article aside blockquote dir div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr menu nav ol p pre section table ul'.split(' '),
            rt: [
                'rt',
                'rp'
            ],
            rp: [
                'rp',
                'rt'
            ],
            optgroup: ['optgroup'],
            option: [
                'option',
                'optgroup'
            ],
            thead: [
                'tbody',
                'tfoot'
            ],
            tbody: [
                'tbody',
                'tfoot'
            ],
            tr: ['tr'],
            td: [
                'td',
                'th'
            ],
            th: [
                'td',
                'th'
            ]
        };
    }();
var parse_Parser_getElement_ElementStub_utils_filterAttributes = function (isArray) {
        
        return function (items) {
            var attrs, proxies, filtered, i, len, item;
            filtered = {};
            attrs = [];
            proxies = [];
            len = items.length;
            for (i = 0; i < len; i += 1) {
                item = items[i];
                if (item.name === 'intro') {
                    if (filtered.intro) {
                        throw new Error('An element can only have one intro transition');
                    }
                    filtered.intro = item;
                } else if (item.name === 'outro') {
                    if (filtered.outro) {
                        throw new Error('An element can only have one outro transition');
                    }
                    filtered.outro = item;
                } else if (item.name === 'intro-outro') {
                    if (filtered.intro || filtered.outro) {
                        throw new Error('An element can only have one intro and one outro transition');
                    }
                    filtered.intro = item;
                    filtered.outro = deepClone(item);
                } else if (item.name.substr(0, 6) === 'proxy-') {
                    item.name = item.name.substring(6);
                    proxies[proxies.length] = item;
                } else if (item.name.substr(0, 3) === 'on-') {
                    item.name = item.name.substring(3);
                    proxies[proxies.length] = item;
                } else if (item.name === 'decorator') {
                    filtered.decorator = item;
                } else {
                    attrs[attrs.length] = item;
                }
            }
            filtered.attrs = attrs;
            filtered.proxies = proxies;
            return filtered;
        };
        function deepClone(obj) {
            var result, key;
            if (typeof obj !== 'object') {
                return obj;
            }
            if (isArray(obj)) {
                return obj.map(deepClone);
            }
            result = {};
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    result[key] = deepClone(obj[key]);
                }
            }
            return result;
        }
    }(utils_isArray);
var parse_Parser_getElement_ElementStub_utils_processDirective = function (types, parseJSON) {
        
        return function (directive) {
            var processed, tokens, token, colonIndex, throwError, directiveName, directiveArgs, parsed;
            throwError = function () {
                throw new Error('Illegal directive');
            };
            if (!directive.name || !directive.value) {
                throwError();
            }
            processed = { directiveType: directive.name };
            tokens = directive.value;
            directiveName = [];
            directiveArgs = [];
            while (tokens.length) {
                token = tokens.shift();
                if (token.type === types.TEXT) {
                    colonIndex = token.value.indexOf(':');
                    if (colonIndex === -1) {
                        directiveName[directiveName.length] = token;
                    } else {
                        if (colonIndex) {
                            directiveName[directiveName.length] = {
                                type: types.TEXT,
                                value: token.value.substr(0, colonIndex)
                            };
                        }
                        if (token.value.length > colonIndex + 1) {
                            directiveArgs[0] = {
                                type: types.TEXT,
                                value: token.value.substring(colonIndex + 1)
                            };
                        }
                        break;
                    }
                } else {
                    directiveName[directiveName.length] = token;
                }
            }
            directiveArgs = directiveArgs.concat(tokens);
            if (directiveName.length === 1 && directiveName[0].type === types.TEXT) {
                processed.name = directiveName[0].value;
            } else {
                processed.name = directiveName;
            }
            if (directiveArgs.length) {
                if (directiveArgs.length === 1 && directiveArgs[0].type === types.TEXT) {
                    parsed = parseJSON('[' + directiveArgs[0].value + ']');
                    processed.args = parsed ? parsed.value : directiveArgs[0].value;
                } else {
                    processed.dynamicArgs = directiveArgs;
                }
            }
            return processed;
        };
    }(config_types, utils_parseJSON);
var parse_Parser_StringStub_StringParser = function (getText, getMustache) {
        
        var StringParser;
        StringParser = function (tokens, options) {
            var stub;
            this.tokens = tokens || [];
            this.pos = 0;
            this.options = options;
            this.result = [];
            while (stub = this.getStub()) {
                this.result.push(stub);
            }
        };
        StringParser.prototype = {
            getStub: function () {
                var token = this.next();
                if (!token) {
                    return null;
                }
                return this.getText(token) || this.getMustache(token);
            },
            getText: getText,
            getMustache: getMustache,
            next: function () {
                return this.tokens[this.pos];
            }
        };
        return StringParser;
    }(parse_Parser_getText__getText, parse_Parser_getMustache__getMustache);
var parse_Parser_StringStub__StringStub = function (StringParser, stringifyStubs, jsonifyStubs) {
        
        var StringStub;
        StringStub = function (tokens) {
            var parser = new StringParser(tokens);
            this.stubs = parser.result;
        };
        StringStub.prototype = {
            toJSON: function (noStringify) {
                var json;
                if (this['json_' + noStringify]) {
                    return this['json_' + noStringify];
                }
                json = this['json_' + noStringify] = jsonifyStubs(this.stubs, noStringify);
                return json;
            },
            toString: function () {
                if (this.str !== undefined) {
                    return this.str;
                }
                this.str = stringifyStubs(this.stubs);
                return this.str;
            }
        };
        return StringStub;
    }(parse_Parser_StringStub_StringParser, parse_Parser_utils_stringifyStubs, parse_Parser_utils_jsonifyStubs);
var parse_Parser_getElement_ElementStub_utils_jsonifyDirective = function (StringStub) {
        
        return function (directive) {
            var result, name;
            if (typeof directive.name === 'string') {
                if (!directive.args && !directive.dynamicArgs) {
                    return directive.name;
                }
                name = directive.name;
            } else {
                name = new StringStub(directive.name).toJSON();
            }
            result = { n: name };
            if (directive.args) {
                result.a = directive.args;
                return result;
            }
            if (directive.dynamicArgs) {
                result.d = new StringStub(directive.dynamicArgs).toJSON();
            }
            return result;
        };
    }(parse_Parser_StringStub__StringStub);
var parse_Parser_getElement_ElementStub_toJSON = function (types, jsonifyStubs, jsonifyDirective) {
        
        return function (noStringify) {
            var json, name, value, proxy, i, len, attribute;
            if (this['json_' + noStringify]) {
                return this['json_' + noStringify];
            }
            if (this.component) {
                json = {
                    t: types.COMPONENT,
                    e: this.component
                };
            } else {
                json = {
                    t: types.ELEMENT,
                    e: this.tag
                };
            }
            if (this.doctype) {
                json.y = 1;
            }
            if (this.attributes && this.attributes.length) {
                json.a = {};
                len = this.attributes.length;
                for (i = 0; i < len; i += 1) {
                    attribute = this.attributes[i];
                    name = attribute.name;
                    if (json.a[name]) {
                        throw new Error('You cannot have multiple attributes with the same name');
                    }
                    if (attribute.value === null) {
                        value = null;
                    } else {
                        value = attribute.value.toJSON(noStringify);
                    }
                    json.a[name] = value;
                }
            }
            if (this.items && this.items.length) {
                json.f = jsonifyStubs(this.items, noStringify);
            }
            if (this.proxies && this.proxies.length) {
                json.v = {};
                len = this.proxies.length;
                for (i = 0; i < len; i += 1) {
                    proxy = this.proxies[i];
                    json.v[proxy.directiveType] = jsonifyDirective(proxy);
                }
            }
            if (this.intro) {
                json.t1 = jsonifyDirective(this.intro);
            }
            if (this.outro) {
                json.t2 = jsonifyDirective(this.outro);
            }
            if (this.decorator) {
                json.o = jsonifyDirective(this.decorator);
            }
            this['json_' + noStringify] = json;
            return json;
        };
    }(config_types, parse_Parser_utils_jsonifyStubs, parse_Parser_getElement_ElementStub_utils_jsonifyDirective);
var parse_Parser_getElement_ElementStub_toString = function (stringifyStubs, voidElementNames) {
        
        var htmlElements;
        htmlElements = 'a abbr acronym address applet area b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dfn dir div dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 h6 head hr html i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript object ol p param pre q s samp script select small span strike strong style sub sup textarea title tt u ul var article aside audio bdi canvas command data datagrid datalist details embed eventsource figcaption figure footer header hgroup keygen mark meter nav output progress ruby rp rt section source summary time track video wbr'.split(' ');
        return function () {
            var str, i, len, attrStr, name, attrValueStr, fragStr, isVoid;
            if (this.str !== undefined) {
                return this.str;
            }
            if (this.component) {
                return this.str = false;
            }
            if (htmlElements.indexOf(this.tag.toLowerCase()) === -1) {
                return this.str = false;
            }
            if (this.proxies || this.intro || this.outro || this.decorator) {
                return this.str = false;
            }
            fragStr = stringifyStubs(this.items);
            if (fragStr === false) {
                return this.str = false;
            }
            isVoid = voidElementNames.indexOf(this.tag.toLowerCase()) !== -1;
            str = '<' + this.tag;
            if (this.attributes) {
                for (i = 0, len = this.attributes.length; i < len; i += 1) {
                    name = this.attributes[i].name;
                    if (name.indexOf(':') !== -1) {
                        return this.str = false;
                    }
                    if (name === 'id' || name === 'intro' || name === 'outro') {
                        return this.str = false;
                    }
                    attrStr = ' ' + name;
                    if (this.attributes[i].value !== null) {
                        attrValueStr = this.attributes[i].value.toString();
                        if (attrValueStr === false) {
                            return this.str = false;
                        }
                        if (attrValueStr !== '') {
                            attrStr += '=';
                            if (/[\s"'=<>`]/.test(attrValueStr)) {
                                attrStr += '"' + attrValueStr.replace(/"/g, '&quot;') + '"';
                            } else {
                                attrStr += attrValueStr;
                            }
                        }
                    }
                    str += attrStr;
                }
            }
            if (this.selfClosing && !isVoid) {
                str += '/>';
                return this.str = str;
            }
            str += '>';
            if (isVoid) {
                return this.str = str;
            }
            str += fragStr;
            str += '</' + this.tag + '>';
            return this.str = str;
        };
    }(parse_Parser_utils_stringifyStubs, config_voidElementNames);
var parse_Parser_getElement_ElementStub__ElementStub = function (types, voidElementNames, warn, camelCase, stringifyStubs, siblingsByTagName, filterAttributes, processDirective, toJSON, toString, StringStub) {
        
        var ElementStub, allElementNames, closedByParentClose, onPattern, sanitize, leadingWhitespace = /^\s+/, trailingWhitespace = /\s+$/;
        ElementStub = function (firstToken, parser, preserveWhitespace) {
            var next, attrs, filtered, proxies, item, getFrag, lowerCaseTag;
            parser.pos += 1;
            getFrag = function (attr) {
                return {
                    name: attr.name,
                    value: attr.value ? new StringStub(attr.value) : null
                };
            };
            this.tag = firstToken.name;
            lowerCaseTag = firstToken.name.toLowerCase();
            if (lowerCaseTag.substr(0, 3) === 'rv-') {
                warn('The "rv-" prefix for components has been deprecated. Support will be removed in a future version');
                this.tag = this.tag.substring(3);
            }
            preserveWhitespace = preserveWhitespace || lowerCaseTag === 'pre';
            if (firstToken.attrs) {
                filtered = filterAttributes(firstToken.attrs);
                attrs = filtered.attrs;
                proxies = filtered.proxies;
                if (parser.options.sanitize && parser.options.sanitize.eventAttributes) {
                    attrs = attrs.filter(sanitize);
                }
                if (attrs.length) {
                    this.attributes = attrs.map(getFrag);
                }
                if (proxies.length) {
                    this.proxies = proxies.map(processDirective);
                }
                if (filtered.intro) {
                    this.intro = processDirective(filtered.intro);
                }
                if (filtered.outro) {
                    this.outro = processDirective(filtered.outro);
                }
                if (filtered.decorator) {
                    this.decorator = processDirective(filtered.decorator);
                }
            }
            if (firstToken.doctype) {
                this.doctype = true;
            }
            if (firstToken.selfClosing) {
                this.selfClosing = true;
            }
            if (voidElementNames.indexOf(lowerCaseTag) !== -1) {
                this.isVoid = true;
            }
            if (this.selfClosing || this.isVoid) {
                return;
            }
            this.siblings = siblingsByTagName[lowerCaseTag];
            this.items = [];
            next = parser.next();
            while (next) {
                if (next.mustacheType === types.CLOSING) {
                    break;
                }
                if (next.type === types.TAG) {
                    if (next.closing) {
                        if (next.name.toLowerCase() === lowerCaseTag) {
                            parser.pos += 1;
                        }
                        break;
                    } else if (this.siblings && this.siblings.indexOf(next.name.toLowerCase()) !== -1) {
                        break;
                    }
                }
                this.items[this.items.length] = parser.getStub();
                next = parser.next();
            }
            if (!preserveWhitespace) {
                item = this.items[0];
                if (item && item.type === types.TEXT) {
                    item.text = item.text.replace(leadingWhitespace, '');
                    if (!item.text) {
                        this.items.shift();
                    }
                }
                item = this.items[this.items.length - 1];
                if (item && item.type === types.TEXT) {
                    item.text = item.text.replace(trailingWhitespace, '');
                    if (!item.text) {
                        this.items.pop();
                    }
                }
            }
        };
        ElementStub.prototype = {
            toJSON: toJSON,
            toString: toString
        };
        allElementNames = 'a abbr acronym address applet area b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dfn dir div dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 h6 head hr html i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript object ol p param pre q s samp script select small span strike strong style sub sup textarea title tt u ul var article aside audio bdi canvas command data datagrid datalist details embed eventsource figcaption figure footer header hgroup keygen mark meter nav output progress ruby rp rt section source summary time track video wbr'.split(' ');
        closedByParentClose = 'li dd rt rp optgroup option tbody tfoot tr td th'.split(' ');
        onPattern = /^on[a-zA-Z]/;
        sanitize = function (attr) {
            var valid = !onPattern.test(attr.name);
            return valid;
        };
        return ElementStub;
    }(config_types, config_voidElementNames, utils_warn, utils_camelCase, parse_Parser_utils_stringifyStubs, parse_Parser_getElement_ElementStub_utils_siblingsByTagName, parse_Parser_getElement_ElementStub_utils_filterAttributes, parse_Parser_getElement_ElementStub_utils_processDirective, parse_Parser_getElement_ElementStub_toJSON, parse_Parser_getElement_ElementStub_toString, parse_Parser_StringStub__StringStub);
var parse_Parser_getElement__getElement = function (types, ElementStub) {
        
        return function (token) {
            if (this.options.sanitize && this.options.sanitize.elements) {
                if (this.options.sanitize.elements.indexOf(token.name.toLowerCase()) !== -1) {
                    return null;
                }
            }
            return new ElementStub(token, this);
        };
    }(config_types, parse_Parser_getElement_ElementStub__ElementStub);
var parse_Parser__Parser = function (getText, getComment, getMustache, getElement, jsonifyStubs) {
        
        var Parser;
        Parser = function (tokens, options) {
            var stub, stubs;
            this.tokens = tokens || [];
            this.pos = 0;
            this.options = options;
            this.preserveWhitespace = options.preserveWhitespace;
            stubs = [];
            while (stub = this.getStub()) {
                stubs.push(stub);
            }
            this.result = jsonifyStubs(stubs);
        };
        Parser.prototype = {
            getStub: function () {
                var token = this.next();
                if (!token) {
                    return null;
                }
                return this.getText(token) || this.getComment(token) || this.getMustache(token) || this.getElement(token);
            },
            getText: getText,
            getComment: getComment,
            getMustache: getMustache,
            getElement: getElement,
            next: function () {
                return this.tokens[this.pos];
            }
        };
        return Parser;
    }(parse_Parser_getText__getText, parse_Parser_getComment__getComment, parse_Parser_getMustache__getMustache, parse_Parser_getElement__getElement, parse_Parser_utils_jsonifyStubs);
var parse__parse = function (tokenize, types, Parser) {
        
        var parse, onlyWhitespace, inlinePartialStart, inlinePartialEnd, parseCompoundTemplate;
        onlyWhitespace = /^\s*$/;
        inlinePartialStart = /<!--\s*\{\{\s*>\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}\}\s*-->/;
        inlinePartialEnd = /<!--\s*\{\{\s*\/\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}\}\s*-->/;
        parse = function (template, options) {
            var tokens, json, token;
            options = options || {};
            if (inlinePartialStart.test(template)) {
                return parseCompoundTemplate(template, options);
            }
            if (options.sanitize === true) {
                options.sanitize = {
                    elements: 'applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title'.split(' '),
                    eventAttributes: true
                };
            }
            tokens = tokenize(template, options);
            if (!options.preserveWhitespace) {
                token = tokens[0];
                if (token && token.type === types.TEXT && onlyWhitespace.test(token.value)) {
                    tokens.shift();
                }
                token = tokens[tokens.length - 1];
                if (token && token.type === types.TEXT && onlyWhitespace.test(token.value)) {
                    tokens.pop();
                }
            }
            json = new Parser(tokens, options).result;
            if (typeof json === 'string') {
                return [json];
            }
            return json;
        };
        parseCompoundTemplate = function (template, options) {
            var mainTemplate, remaining, partials, name, startMatch, endMatch;
            partials = {};
            mainTemplate = '';
            remaining = template;
            while (startMatch = inlinePartialStart.exec(remaining)) {
                name = startMatch[1];
                mainTemplate += remaining.substr(0, startMatch.index);
                remaining = remaining.substring(startMatch.index + startMatch[0].length);
                endMatch = inlinePartialEnd.exec(remaining);
                if (!endMatch || endMatch[1] !== name) {
                    throw new Error('Inline partials must have a closing delimiter, and cannot be nested');
                }
                partials[name] = parse(remaining.substr(0, endMatch.index), options);
                remaining = remaining.substring(endMatch.index + endMatch[0].length);
            }
            return {
                main: parse(mainTemplate, options),
                partials: partials
            };
        };
        return parse;
    }(parse_tokenize, config_types, parse_Parser__Parser);
var render_DomFragment_Partial_getPartialDescriptor = function (errors, isClient, warn, isObject, partials, parse) {
        
        var getPartialDescriptor, registerPartial, getPartialFromRegistry, unpack;
        getPartialDescriptor = function (root, name) {
            var el, partial, errorMessage;
            if (partial = getPartialFromRegistry(root, name)) {
                return partial;
            }
            if (isClient) {
                el = document.getElementById(name);
                if (el && el.tagName === 'SCRIPT') {
                    if (!parse) {
                        throw new Error(errors.missingParser);
                    }
                    registerPartial(parse(el.innerHTML), name, partials);
                }
            }
            partial = partials[name];
            if (!partial) {
                errorMessage = 'Could not find descriptor for partial "' + name + '"';
                if (root.debug) {
                    throw new Error(errorMessage);
                } else {
                    warn(errorMessage);
                }
                return [];
            }
            return unpack(partial);
        };
        getPartialFromRegistry = function (registryOwner, name) {
            var partial;
            if (registryOwner.partials[name]) {
                if (typeof registryOwner.partials[name] === 'string') {
                    if (!parse) {
                        throw new Error(errors.missingParser);
                    }
                    partial = parse(registryOwner.partials[name], registryOwner.parseOptions);
                    registerPartial(partial, name, registryOwner.partials);
                }
                return unpack(registryOwner.partials[name]);
            }
        };
        registerPartial = function (partial, name, registry) {
            var key;
            if (isObject(partial)) {
                registry[name] = partial.main;
                for (key in partial.partials) {
                    if (partial.partials.hasOwnProperty(key)) {
                        registry[key] = partial.partials[key];
                    }
                }
            } else {
                registry[name] = partial;
            }
        };
        unpack = function (partial) {
            if (partial.length === 1 && typeof partial[0] === 'string') {
                return partial[0];
            }
            return partial;
        };
        return getPartialDescriptor;
    }(config_errors, config_isClient, utils_warn, utils_isObject, registries_partials, parse__parse);
var render_DomFragment_Partial__Partial = function (types, getPartialDescriptor, circular) {
        
        var DomPartial, DomFragment;
        circular.push(function () {
            DomFragment = circular.DomFragment;
        });
        DomPartial = function (options, docFrag) {
            var parentFragment = this.parentFragment = options.parentFragment, descriptor;
            this.type = types.PARTIAL;
            this.name = options.descriptor.r;
            this.index = options.index;
            if (!options.descriptor.r) {
                throw new Error('Partials must have a static reference (no expressions). This may change in a future version of Ractive.');
            }
            descriptor = getPartialDescriptor(parentFragment.root, options.descriptor.r);
            this.fragment = new DomFragment({
                descriptor: descriptor,
                root: parentFragment.root,
                pNode: parentFragment.pNode,
                contextStack: parentFragment.contextStack,
                owner: this
            });
            if (docFrag) {
                docFrag.appendChild(this.fragment.docFrag);
            }
        };
        DomPartial.prototype = {
            firstNode: function () {
                return this.fragment.firstNode();
            },
            findNextNode: function () {
                return this.parentFragment.findNextNode(this);
            },
            detach: function () {
                return this.fragment.detach();
            },
            teardown: function (destroy) {
                this.fragment.teardown(destroy);
            },
            toString: function () {
                return this.fragment.toString();
            },
            find: function (selector) {
                return this.fragment.find(selector);
            },
            findAll: function (selector, query) {
                return this.fragment.findAll(selector, query);
            },
            findComponent: function (selector) {
                return this.fragment.findComponent(selector);
            },
            findAllComponents: function (selector, query) {
                return this.fragment.findAllComponents(selector, query);
            }
        };
        return DomPartial;
    }(config_types, render_DomFragment_Partial_getPartialDescriptor, circular);
var render_DomFragment_Component_initialise_createModel_ComponentParameter = function (StringFragment) {
        
        var ComponentParameter = function (component, key, value) {
            this.parentFragment = component.parentFragment;
            this.component = component;
            this.key = key;
            this.fragment = new StringFragment({
                descriptor: value,
                root: component.root,
                owner: this,
                contextStack: component.parentFragment.contextStack
            });
            this.selfUpdating = this.fragment.isSimple();
            this.value = this.fragment.getValue();
        };
        ComponentParameter.prototype = {
            bubble: function () {
                if (this.selfUpdating) {
                    this.update();
                } else if (!this.deferred && this.ready) {
                    this.root._deferred.attrs.push(this);
                    this.deferred = true;
                }
            },
            update: function () {
                var value = this.fragment.getValue();
                this.component.instance.set(this.key, value);
                this.value = value;
            },
            teardown: function () {
                this.fragment.teardown();
            }
        };
        return ComponentParameter;
    }(render_StringFragment__StringFragment);
var render_DomFragment_Component_initialise_createModel__createModel = function (types, parseJSON, resolveRef, ComponentParameter) {
        
        return function (component, attributes, toBind) {
            var data, key, value;
            data = {};
            component.complexParameters = [];
            for (key in attributes) {
                if (attributes.hasOwnProperty(key)) {
                    value = getValue(component, key, attributes[key], toBind);
                    if (value !== undefined) {
                        data[key] = value;
                    }
                }
            }
            return data;
        };
        function getValue(component, key, descriptor, toBind) {
            var parameter, parsed, root, parentFragment, keypath;
            root = component.root;
            parentFragment = component.parentFragment;
            if (typeof descriptor === 'string') {
                parsed = parseJSON(descriptor);
                return parsed ? parsed.value : descriptor;
            }
            if (descriptor === null) {
                return true;
            }
            if (descriptor.length === 1 && descriptor[0].t === types.INTERPOLATOR && descriptor[0].r) {
                if (parentFragment.indexRefs && parentFragment.indexRefs[descriptor[0].r] !== undefined) {
                    return parentFragment.indexRefs[descriptor[0].r];
                }
                keypath = resolveRef(root, descriptor[0].r, parentFragment.contextStack) || descriptor[0].r;
                toBind.push({
                    childKeypath: key,
                    parentKeypath: keypath
                });
                return root.get(keypath);
            }
            parameter = new ComponentParameter(component, key, descriptor);
            component.complexParameters.push(parameter);
            return parameter.value;
        }
    }(config_types, utils_parseJSON, shared_resolveRef, render_DomFragment_Component_initialise_createModel_ComponentParameter);
var render_DomFragment_Component_initialise_createInstance = function () {
        
        return function (component, Component, data, docFrag, contentDescriptor) {
            var instance, parentFragment, partials, root;
            parentFragment = component.parentFragment;
            root = component.root;
            partials = { content: contentDescriptor || [] };
            instance = new Component({
                el: parentFragment.pNode.cloneNode(false),
                data: data,
                partials: partials,
                _parent: root,
                adaptors: root.adaptors
            });
            instance.component = component;
            component.instance = instance;
            instance.insert(docFrag);
            instance.fragment.pNode = parentFragment.pNode;
            return instance;
        };
    }();
var render_DomFragment_Component_initialise_createObservers = function () {
        
        var observeOptions = {
                init: false,
                debug: true
            };
        return function (component, toBind) {
            var pair, i;
            component.observers = [];
            i = toBind.length;
            while (i--) {
                pair = toBind[i];
                bind(component, pair.parentKeypath, pair.childKeypath);
            }
        };
        function bind(component, parentKeypath, childKeypath) {
            var parentInstance, childInstance, settingParent, settingChild, observers, observer, value;
            parentInstance = component.root;
            childInstance = component.instance;
            observers = component.observers;
            observer = parentInstance.observe(parentKeypath, function (value) {
                if (!settingParent && !parentInstance._wrapped[parentKeypath]) {
                    settingChild = true;
                    childInstance.set(childKeypath, value);
                    settingChild = false;
                }
            }, observeOptions);
            observers.push(observer);
            if (childInstance.twoway) {
                observer = childInstance.observe(childKeypath, function (value) {
                    if (!settingChild) {
                        settingParent = true;
                        parentInstance.set(parentKeypath, value);
                        settingParent = false;
                    }
                }, observeOptions);
                observers.push(observer);
                value = childInstance.get(childKeypath);
                if (value !== undefined) {
                    parentInstance.set(parentKeypath, value);
                }
            }
        }
    }();
var render_DomFragment_Component_initialise_propagateEvents = function (warn) {
        
        var errorMessage = 'Components currently only support simple events - you cannot include arguments. Sorry!';
        return function (component, eventsDescriptor) {
            var eventName;
            for (eventName in eventsDescriptor) {
                if (eventsDescriptor.hasOwnProperty(eventName)) {
                    propagateEvent(component.instance, component.root, eventName, eventsDescriptor[eventName]);
                }
            }
        };
        function propagateEvent(childInstance, parentInstance, eventName, proxyEventName) {
            if (typeof proxyEventName !== 'string') {
                if (parentInstance.debug) {
                    throw new Error(errorMessage);
                } else {
                    warn(errorMessage);
                    return;
                }
            }
            childInstance.on(eventName, function () {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(proxyEventName);
                parentInstance.fire.apply(parentInstance, args);
            });
        }
    }(utils_warn);
var render_DomFragment_Component_initialise_updateLiveQueries = function () {
        
        return function (component) {
            var ancestor, query;
            ancestor = component.root;
            while (ancestor) {
                if (query = ancestor._liveComponentQueries[component.name]) {
                    query.push(component.instance);
                }
                ancestor = ancestor._parent;
            }
        };
    }();
var render_DomFragment_Component_initialise__initialise = function (types, warn, createModel, createInstance, createObservers, propagateEvents, updateLiveQueries) {
        
        return function (component, options, docFrag) {
            var parentFragment, root, Component, data, toBind;
            parentFragment = component.parentFragment = options.parentFragment;
            root = parentFragment.root;
            component.root = root;
            component.type = types.COMPONENT;
            component.name = options.descriptor.e;
            component.index = options.index;
            component.observers = [];
            Component = root.components[options.descriptor.e];
            if (!Component) {
                throw new Error('Component "' + options.descriptor.e + '" not found');
            }
            toBind = [];
            data = createModel(component, options.descriptor.a, toBind);
            createInstance(component, Component, data, docFrag, options.descriptor.f);
            createObservers(component, toBind);
            propagateEvents(component, options.descriptor.v);
            if (options.descriptor.t1 || options.descriptor.t2 || options.descriptor.o) {
                warn('The "intro", "outro" and "decorator" directives have no effect on components');
            }
            updateLiveQueries(component);
        };
    }(config_types, utils_warn, render_DomFragment_Component_initialise_createModel__createModel, render_DomFragment_Component_initialise_createInstance, render_DomFragment_Component_initialise_createObservers, render_DomFragment_Component_initialise_propagateEvents, render_DomFragment_Component_initialise_updateLiveQueries);
var render_DomFragment_Component__Component = function (initialise) {
        
        var DomComponent = function (options, docFrag) {
            initialise(this, options, docFrag);
        };
        DomComponent.prototype = {
            firstNode: function () {
                return this.instance.fragment.firstNode();
            },
            findNextNode: function () {
                return this.parentFragment.findNextNode(this);
            },
            detach: function () {
                return this.instance.fragment.detach();
            },
            teardown: function () {
                var query;
                while (this.complexParameters.length) {
                    this.complexParameters.pop().teardown();
                }
                while (this.observers.length) {
                    this.observers.pop().cancel();
                }
                if (query = this.root._liveComponentQueries[this.name]) {
                    query._remove(this);
                }
                this.instance.teardown();
            },
            toString: function () {
                return this.instance.fragment.toString();
            },
            find: function (selector) {
                return this.instance.fragment.find(selector);
            },
            findAll: function (selector, query) {
                return this.instance.fragment.findAll(selector, query);
            },
            findComponent: function (selector) {
                if (!selector || selector === this.name) {
                    return this.instance;
                }
                return null;
            },
            findAllComponents: function (selector, query) {
                query._test(this, true);
                if (this.instance.fragment) {
                    this.instance.fragment.findAllComponents(selector, query);
                }
            }
        };
        return DomComponent;
    }(render_DomFragment_Component_initialise__initialise);
var render_DomFragment_Comment = function (types) {
        
        var DomComment = function (options, docFrag) {
            this.type = types.COMMENT;
            this.descriptor = options.descriptor;
            if (docFrag) {
                this.node = document.createComment(options.descriptor.f);
                docFrag.appendChild(this.node);
            }
        };
        DomComment.prototype = {
            detach: function () {
                this.node.parentNode.removeChild(this.node);
                return this.node;
            },
            teardown: function (destroy) {
                if (destroy) {
                    this.detach();
                }
            },
            firstNode: function () {
                return this.node;
            },
            toString: function () {
                return '<!--' + this.descriptor.f + '-->';
            }
        };
        return DomComment;
    }(config_types);
var render_DomFragment__DomFragment = function (types, matches, initFragment, insertHtml, Text, Interpolator, Section, Triple, Element, Partial, Component, Comment, circular) {
        
        var DomFragment = function (options) {
            if (options.pNode) {
                this.docFrag = document.createDocumentFragment();
            }
            if (typeof options.descriptor === 'string') {
                this.html = options.descriptor;
                if (this.docFrag) {
                    this.nodes = insertHtml(this.html, options.pNode.tagName, this.docFrag);
                }
            } else {
                initFragment(this, options);
            }
        };
        DomFragment.prototype = {
            detach: function () {
                var len, i;
                if (this.nodes) {
                    i = this.nodes.length;
                    while (i--) {
                        this.docFrag.appendChild(this.nodes[i]);
                    }
                } else if (this.items) {
                    len = this.items.length;
                    for (i = 0; i < len; i += 1) {
                        this.docFrag.appendChild(this.items[i].detach());
                    }
                }
                return this.docFrag;
            },
            createItem: function (options) {
                if (typeof options.descriptor === 'string') {
                    return new Text(options, this.docFrag);
                }
                switch (options.descriptor.t) {
                case types.INTERPOLATOR:
                    return new Interpolator(options, this.docFrag);
                case types.SECTION:
                    return new Section(options, this.docFrag);
                case types.TRIPLE:
                    return new Triple(options, this.docFrag);
                case types.ELEMENT:
                    if (this.root.components[options.descriptor.e]) {
                        return new Component(options, this.docFrag);
                    }
                    return new Element(options, this.docFrag);
                case types.PARTIAL:
                    return new Partial(options, this.docFrag);
                case types.COMMENT:
                    return new Comment(options, this.docFrag);
                default:
                    throw new Error('Something very strange happened. Please file an issue at https://github.com/RactiveJS/Ractive/issues. Thanks!');
                }
            },
            teardown: function (destroy) {
                var node;
                if (this.nodes && destroy) {
                    while (node = this.nodes.pop()) {
                        node.parentNode.removeChild(node);
                    }
                } else if (this.items) {
                    while (this.items.length) {
                        this.items.pop().teardown(destroy);
                    }
                }
                this.nodes = this.items = this.docFrag = null;
            },
            firstNode: function () {
                if (this.items && this.items[0]) {
                    return this.items[0].firstNode();
                } else if (this.nodes) {
                    return this.nodes[0] || null;
                }
                return null;
            },
            findNextNode: function (item) {
                var index = item.index;
                if (this.items[index + 1]) {
                    return this.items[index + 1].firstNode();
                }
                if (this.owner === this.root) {
                    if (!this.owner.component) {
                        return null;
                    }
                    return this.owner.component.findNextNode();
                }
                return this.owner.findNextNode(this);
            },
            toString: function () {
                var html, i, len, item;
                if (this.html) {
                    return this.html;
                }
                html = '';
                if (!this.items) {
                    return html;
                }
                len = this.items.length;
                for (i = 0; i < len; i += 1) {
                    item = this.items[i];
                    html += item.toString();
                }
                return html;
            },
            find: function (selector) {
                var i, len, item, node, queryResult;
                if (this.nodes) {
                    len = this.nodes.length;
                    for (i = 0; i < len; i += 1) {
                        node = this.nodes[i];
                        if (node.nodeType !== 1) {
                            continue;
                        }
                        if (matches(node, selector)) {
                            return node;
                        }
                        if (queryResult = node.querySelector(selector)) {
                            return queryResult;
                        }
                    }
                    return null;
                }
                if (this.items) {
                    len = this.items.length;
                    for (i = 0; i < len; i += 1) {
                        item = this.items[i];
                        if (item.find && (queryResult = item.find(selector))) {
                            return queryResult;
                        }
                    }
                    return null;
                }
            },
            findAll: function (selector, query) {
                var i, len, item, node, queryAllResult, numNodes, j;
                if (this.nodes) {
                    len = this.nodes.length;
                    for (i = 0; i < len; i += 1) {
                        node = this.nodes[i];
                        if (node.nodeType !== 1) {
                            continue;
                        }
                        if (matches(node, selector)) {
                            query.push(node);
                        }
                        if (queryAllResult = node.querySelectorAll(selector)) {
                            numNodes = queryAllResult.length;
                            for (j = 0; j < numNodes; j += 1) {
                                query.push(queryAllResult[j]);
                            }
                        }
                    }
                } else if (this.items) {
                    len = this.items.length;
                    for (i = 0; i < len; i += 1) {
                        item = this.items[i];
                        if (item.findAll) {
                            item.findAll(selector, query);
                        }
                    }
                }
                return query;
            },
            findComponent: function (selector) {
                var len, i, item, queryResult;
                if (this.items) {
                    len = this.items.length;
                    for (i = 0; i < len; i += 1) {
                        item = this.items[i];
                        if (item.findComponent && (queryResult = item.findComponent(selector))) {
                            return queryResult;
                        }
                    }
                    return null;
                }
            },
            findAllComponents: function (selector, query) {
                var i, len, item;
                if (this.items) {
                    len = this.items.length;
                    for (i = 0; i < len; i += 1) {
                        item = this.items[i];
                        if (item.findAllComponents) {
                            item.findAllComponents(selector, query);
                        }
                    }
                }
                return query;
            }
        };
        circular.DomFragment = DomFragment;
        return DomFragment;
    }(config_types, utils_matches, render_shared_initFragment, render_DomFragment_shared_insertHtml, render_DomFragment_Text, render_DomFragment_Interpolator, render_DomFragment_Section__Section, render_DomFragment_Triple, render_DomFragment_Element__Element, render_DomFragment_Partial__Partial, render_DomFragment_Component__Component, render_DomFragment_Comment, circular);
var Ractive_prototype_render = function (getElement, makeTransitionManager, preDomUpdate, postDomUpdate, DomFragment) {
        
        return function (target, complete) {
            var transitionManager;
            if (!this._initing) {
                throw new Error('You cannot call ractive.render() directly!');
            }
            this._transitionManager = transitionManager = makeTransitionManager(this, complete);
            this.fragment = new DomFragment({
                descriptor: this.template,
                root: this,
                owner: this,
                pNode: target
            });
            preDomUpdate(this);
            if (target) {
                target.appendChild(this.fragment.docFrag);
            }
            postDomUpdate(this);
            this._transitionManager = null;
            transitionManager.ready();
            this.rendered = true;
        };
    }(utils_getElement, shared_makeTransitionManager, shared_preDomUpdate, shared_postDomUpdate, render_DomFragment__DomFragment);
var Ractive_prototype_renderHTML = function (warn) {
        
        return function () {
            warn('renderHTML() has been deprecated and will be removed in a future version. Please use toHTML() instead');
            return this.toHTML();
        };
    }(utils_warn);
var Ractive_prototype_toHTML = function () {
        
        return function () {
            return this.fragment.toString();
        };
    }();
var Ractive_prototype_teardown = function (makeTransitionManager, clearCache) {
        
        return function (complete) {
            var keypath, transitionManager, previousTransitionManager;
            this.fire('teardown');
            previousTransitionManager = this._transitionManager;
            this._transitionManager = transitionManager = makeTransitionManager(this, complete);
            this.fragment.teardown(true);
            while (this._animations[0]) {
                this._animations[0].stop();
            }
            for (keypath in this._cache) {
                clearCache(this, keypath);
            }
            this._transitionManager = previousTransitionManager;
            transitionManager.ready();
        };
    }(shared_makeTransitionManager, shared_clearCache);
var Ractive_prototype_shared_add = function (isNumeric) {
        
        return function (root, keypath, d) {
            var value;
            if (typeof keypath !== 'string' || !isNumeric(d)) {
                if (root.debug) {
                    throw new Error('Bad arguments');
                }
                return;
            }
            value = root.get(keypath);
            if (value === undefined) {
                value = 0;
            }
            if (!isNumeric(value)) {
                if (root.debug) {
                    throw new Error('Cannot add to a non-numeric value');
                }
                return;
            }
            root.set(keypath, value + d);
        };
    }(utils_isNumeric);
var Ractive_prototype_add = function (add) {
        
        return function (keypath, d) {
            add(this, keypath, d === undefined ? 1 : d);
        };
    }(Ractive_prototype_shared_add);
var Ractive_prototype_subtract = function (add) {
        
        return function (keypath, d) {
            add(this, keypath, d === undefined ? -1 : -d);
        };
    }(Ractive_prototype_shared_add);
var Ractive_prototype_toggle = function () {
        
        return function (keypath) {
            var value;
            if (typeof keypath !== 'string') {
                if (this.debug) {
                    throw new Error('Bad arguments');
                }
                return;
            }
            value = this.get(keypath);
            this.set(keypath, !value);
        };
    }();
var Ractive_prototype_merge_mapOldToNewIndex = function () {
        
        return function (oldArray, newArray) {
            var usedIndices, mapper, firstUnusedIndex, newIndices, changed;
            usedIndices = {};
            firstUnusedIndex = 0;
            mapper = function (item, i) {
                var index, start, len;
                start = firstUnusedIndex;
                len = newArray.length;
                do {
                    index = newArray.indexOf(item, start);
                    if (index === -1) {
                        changed = true;
                        return -1;
                    }
                    start = index + 1;
                } while (usedIndices[index] && start < len);
                if (index === firstUnusedIndex) {
                    firstUnusedIndex += 1;
                }
                if (index !== i) {
                    changed = true;
                }
                usedIndices[index] = true;
                return index;
            };
            newIndices = oldArray.map(mapper);
            newIndices.unchanged = !changed;
            return newIndices;
        };
    }();
var Ractive_prototype_merge_queueDependants = function (types) {
        
        return function queueDependants(keypath, deps, mergeQueue, updateQueue) {
            var i, dependant;
            i = deps.length;
            while (i--) {
                dependant = deps[i];
                if (dependant.type === types.REFERENCE) {
                    dependant.update();
                } else if (dependant.keypath === keypath && dependant.type === types.SECTION && !dependant.inverted && dependant.docFrag) {
                    mergeQueue[mergeQueue.length] = dependant;
                } else {
                    updateQueue[updateQueue.length] = dependant;
                }
            }
        };
    }(config_types);
var Ractive_prototype_merge__merge = function (warn, isArray, clearCache, preDomUpdate, processDeferredUpdates, makeTransitionManager, notifyDependants, replaceData, mapOldToNewIndex, queueDependants) {
        
        var identifiers = {};
        return function (keypath, array, options) {
            var currentArray, oldArray, newArray, identifier, lengthUnchanged, i, newIndices, mergeQueue, updateQueue, depsByKeypath, deps, transitionManager, previousTransitionManager, upstreamQueue, keys;
            currentArray = this.get(keypath);
            if (!isArray(currentArray) || !isArray(array)) {
                return this.set(keypath, array, options && options.complete);
            }
            lengthUnchanged = currentArray.length === array.length;
            if (options && options.compare) {
                if (options.compare === true) {
                    identifier = stringify;
                } else if (typeof options.compare === 'string') {
                    identifier = getIdentifier(options.compare);
                } else if (typeof options.compare == 'function') {
                    identifier = options.compare;
                } else {
                    throw new Error('The `compare` option must be a function, or a string representing an identifying field (or `true` to use JSON.stringify)');
                }
                try {
                    oldArray = currentArray.map(identifier);
                    newArray = array.map(identifier);
                } catch (err) {
                    if (this.debug) {
                        throw err;
                    } else {
                        warn('Merge operation: comparison failed. Falling back to identity checking');
                    }
                    oldArray = currentArray;
                    newArray = array;
                }
            } else {
                oldArray = currentArray;
                newArray = array;
            }
            newIndices = mapOldToNewIndex(oldArray, newArray);
            clearCache(this, keypath);
            replaceData(this, keypath, array);
            if (newIndices.unchanged && lengthUnchanged) {
                return;
            }
            previousTransitionManager = this._transitionManager;
            this._transitionManager = transitionManager = makeTransitionManager(this, options && options.complete);
            mergeQueue = [];
            updateQueue = [];
            for (i = 0; i < this._deps.length; i += 1) {
                depsByKeypath = this._deps[i];
                if (!depsByKeypath) {
                    continue;
                }
                deps = depsByKeypath[keypath];
                if (deps) {
                    queueDependants(keypath, deps, mergeQueue, updateQueue);
                    preDomUpdate(this);
                    while (mergeQueue.length) {
                        mergeQueue.pop().merge(newIndices);
                    }
                    while (updateQueue.length) {
                        updateQueue.pop().update();
                    }
                }
            }
            processDeferredUpdates(this);
            upstreamQueue = [];
            keys = keypath.split('.');
            while (keys.length) {
                keys.pop();
                upstreamQueue[upstreamQueue.length] = keys.join('.');
            }
            notifyDependants.multiple(this, upstreamQueue, true);
            if (oldArray.length !== newArray.length) {
                notifyDependants(this, keypath + '.length', true);
            }
            this._transitionManager = previousTransitionManager;
            transitionManager.ready();
        };
        function stringify(item) {
            return JSON.stringify(item);
        }
        function getIdentifier(str) {
            if (!identifiers[str]) {
                identifiers[str] = function (item) {
                    return item[str];
                };
            }
            return identifiers[str];
        }
    }(utils_warn, utils_isArray, shared_clearCache, shared_preDomUpdate, shared_processDeferredUpdates, shared_makeTransitionManager, shared_notifyDependants, Ractive_prototype_shared_replaceData, Ractive_prototype_merge_mapOldToNewIndex, Ractive_prototype_merge_queueDependants);
var Ractive_prototype_detach = function () {
        
        return function () {
            return this.fragment.detach();
        };
    }();
var Ractive_prototype_insert = function (getElement) {
        
        return function (target, anchor) {
            target = getElement(target);
            anchor = getElement(anchor) || null;
            if (!target) {
                throw new Error('You must specify a valid target to insert into');
            }
            target.insertBefore(this.detach(), anchor);
            this.fragment.pNode = target;
        };
    }(utils_getElement);
var Ractive_prototype__prototype = function (get, set, update, updateModel, animate, on, off, observe, fire, find, findAll, findComponent, findAllComponents, render, renderHTML, toHTML, teardown, add, subtract, toggle, merge, detach, insert) {
        
        return {
            get: get,
            set: set,
            update: update,
            updateModel: updateModel,
            animate: animate,
            on: on,
            off: off,
            observe: observe,
            fire: fire,
            find: find,
            findAll: findAll,
            findComponent: findComponent,
            findAllComponents: findAllComponents,
            renderHTML: renderHTML,
            toHTML: toHTML,
            render: render,
            teardown: teardown,
            add: add,
            subtract: subtract,
            toggle: toggle,
            merge: merge,
            detach: detach,
            insert: insert
        };
    }(Ractive_prototype_get__get, Ractive_prototype_set, Ractive_prototype_update, Ractive_prototype_updateModel, Ractive_prototype_animate__animate, Ractive_prototype_on, Ractive_prototype_off, Ractive_prototype_observe__observe, Ractive_prototype_fire, Ractive_prototype_find, Ractive_prototype_findAll, Ractive_prototype_findComponent, Ractive_prototype_findAllComponents, Ractive_prototype_render, Ractive_prototype_renderHTML, Ractive_prototype_toHTML, Ractive_prototype_teardown, Ractive_prototype_add, Ractive_prototype_subtract, Ractive_prototype_toggle, Ractive_prototype_merge__merge, Ractive_prototype_detach, Ractive_prototype_insert);
var extend_registries = function () {
        
        return [
            'partials',
            'transitions',
            'events',
            'components',
            'decorators',
            'data'
        ];
    }();
var extend_initOptions = function () {
        
        return [
            'el',
            'template',
            'complete',
            'modifyArrays',
            'magic',
            'twoway',
            'lazy',
            'append',
            'preserveWhitespace',
            'sanitize',
            'stripComments',
            'noIntro',
            'transitionsEnabled',
            'adaptors'
        ];
    }();
var extend_inheritFromParent = function (registries, initOptions, create) {
        
        return function (Child, Parent) {
            registries.forEach(function (property) {
                if (Parent[property]) {
                    Child[property] = create(Parent[property]);
                }
            });
            initOptions.forEach(function (property) {
                Child[property] = Parent[property];
            });
        };
    }(extend_registries, extend_initOptions, utils_create);
var extend_wrapMethod = function () {
        
        return function (method, superMethod) {
            if (/_super/.test(method)) {
                return function () {
                    var _super = this._super, result;
                    this._super = superMethod;
                    result = method.apply(this, arguments);
                    this._super = _super;
                    return result;
                };
            } else {
                return method;
            }
        };
    }();
var extend_utils_augment = function () {
        
        return function (target, source) {
            var key;
            for (key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
            return target;
        };
    }();
var extend_inheritFromChildProps = function (registries, initOptions, wrapMethod, augment) {
        
        var blacklist, blacklisted;
        blacklist = registries.concat(initOptions);
        blacklisted = {};
        blacklist.forEach(function (property) {
            blacklisted[property] = true;
        });
        return function (Child, childProps) {
            var key, member;
            registries.forEach(function (property) {
                var value = childProps[property];
                if (value) {
                    if (Child[property]) {
                        augment(Child[property], value);
                    } else {
                        Child[property] = value;
                    }
                }
            });
            initOptions.forEach(function (property) {
                var value = childProps[property];
                if (value !== undefined) {
                    if (typeof value === 'function' && typeof Child[property] === 'function') {
                        Child[property] = wrapMethod(value, Child[property]);
                    } else {
                        Child[property] = childProps[property];
                    }
                }
            });
            for (key in childProps) {
                if (childProps.hasOwnProperty(key) && !blacklisted[key]) {
                    member = childProps[key];
                    if (typeof member === 'function' && typeof Child.prototype[key] === 'function') {
                        Child.prototype[key] = wrapMethod(member, Child.prototype[key]);
                    } else {
                        Child.prototype[key] = member;
                    }
                }
            }
        };
    }(extend_registries, extend_initOptions, extend_wrapMethod, extend_utils_augment);
var extend_extractInlinePartials = function (isObject, augment) {
        
        return function (Child, childProps) {
            if (isObject(Child.template)) {
                if (!Child.partials) {
                    Child.partials = {};
                }
                augment(Child.partials, Child.template.partials);
                if (childProps.partials) {
                    augment(Child.partials, childProps.partials);
                }
                Child.template = Child.template.main;
            }
        };
    }(utils_isObject, extend_utils_augment);
var extend_conditionallyParseTemplate = function (errors, isClient, parse) {
        
        return function (Child) {
            var templateEl;
            if (typeof Child.template === 'string') {
                if (!parse) {
                    throw new Error(errors.missingParser);
                }
                if (Child.template.charAt(0) === '#' && isClient) {
                    templateEl = document.getElementById(Child.template.substring(1));
                    if (templateEl && templateEl.tagName === 'SCRIPT') {
                        Child.template = parse(templateEl.innerHTML, Child);
                    } else {
                        throw new Error('Could not find template element (' + Child.template + ')');
                    }
                } else {
                    Child.template = parse(Child.template, Child);
                }
            }
        };
    }(config_errors, config_isClient, parse__parse);
var extend_conditionallyParsePartials = function (errors, parse) {
        
        return function (Child) {
            var key;
            if (Child.partials) {
                for (key in Child.partials) {
                    if (Child.partials.hasOwnProperty(key) && typeof Child.partials[key] === 'string') {
                        if (!parse) {
                            throw new Error(errors.missingParser);
                        }
                        Child.partials[key] = parse(Child.partials[key], Child);
                    }
                }
            }
        };
    }(config_errors, parse__parse);
var extend_utils_clone = function () {
        
        return function (source) {
            var target = {}, key;
            for (key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
            return target;
        };
    }();
var utils_extend = function () {
        
        return function (target) {
            var prop, source, sources = Array.prototype.slice.call(arguments, 1);
            while (source = sources.shift()) {
                for (prop in source) {
                    if (source.hasOwnProperty(prop)) {
                        target[prop] = source[prop];
                    }
                }
            }
            return target;
        };
    }();
var Ractive_initialise = function (isClient, errors, warn, create, extend, defineProperty, defineProperties, getElement, isObject, magicAdaptor, parse) {
        
        var getObject, getArray, defaultOptions, registries;
        getObject = function () {
            return {};
        };
        getArray = function () {
            return [];
        };
        defaultOptions = create(null);
        defineProperties(defaultOptions, {
            preserveWhitespace: {
                enumerable: true,
                value: false
            },
            append: {
                enumerable: true,
                value: false
            },
            twoway: {
                enumerable: true,
                value: true
            },
            modifyArrays: {
                enumerable: true,
                value: true
            },
            data: {
                enumerable: true,
                value: getObject
            },
            lazy: {
                enumerable: true,
                value: false
            },
            debug: {
                enumerable: true,
                value: false
            },
            transitions: {
                enumerable: true,
                value: getObject
            },
            decorators: {
                enumerable: true,
                value: getObject
            },
            events: {
                enumerable: true,
                value: getObject
            },
            noIntro: {
                enumerable: true,
                value: false
            },
            transitionsEnabled: {
                enumerable: true,
                value: true
            },
            magic: {
                enumerable: true,
                value: false
            },
            adaptors: {
                enumerable: true,
                value: getArray
            }
        });
        registries = [
            'components',
            'decorators',
            'events',
            'partials',
            'transitions',
            'data'
        ];
        return function (ractive, options) {
            var key, template, templateEl, parsedTemplate;
            for (key in defaultOptions) {
                if (options[key] === undefined) {
                    options[key] = typeof defaultOptions[key] === 'function' ? defaultOptions[key]() : defaultOptions[key];
                }
            }
            defineProperties(ractive, {
                _initing: {
                    value: true,
                    writable: true
                },
                _guid: {
                    value: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r, v;
                        r = Math.random() * 16 | 0;
                        v = c == 'x' ? r : r & 3 | 8;
                        return v.toString(16);
                    })
                },
                _subs: {
                    value: create(null),
                    configurable: true
                },
                _cache: { value: {} },
                _cacheMap: { value: create(null) },
                _deps: { value: [] },
                _depsMap: { value: create(null) },
                _patternObservers: { value: [] },
                _pendingResolution: { value: [] },
                _deferred: { value: {} },
                _evaluators: { value: create(null) },
                _twowayBindings: { value: {} },
                _transitionManager: {
                    value: null,
                    writable: true
                },
                _animations: { value: [] },
                nodes: { value: {} },
                _wrapped: { value: create(null) },
                _liveQueries: { value: [] },
                _liveComponentQueries: { value: [] }
            });
            defineProperties(ractive._deferred, {
                attrs: { value: [] },
                evals: { value: [] },
                selectValues: { value: [] },
                checkboxes: { value: [] },
                radios: { value: [] },
                observers: { value: [] },
                transitions: { value: [] },
                liveQueries: { value: [] },
                decorators: { value: [] },
                focusable: {
                    value: null,
                    writable: true
                }
            });
            ractive.adaptors = options.adaptors;
            ractive.modifyArrays = options.modifyArrays;
            ractive.magic = options.magic;
            ractive.twoway = options.twoway;
            ractive.lazy = options.lazy;
            ractive.debug = options.debug;
            if (ractive.magic && !magicAdaptor) {
                throw new Error('Getters and setters (magic mode) are not supported in this browser');
            }
            if (options._parent) {
                defineProperty(ractive, '_parent', { value: options._parent });
            }
            if (options.el) {
                ractive.el = getElement(options.el);
                if (!ractive.el && ractive.debug) {
                    throw new Error('Could not find container element');
                }
            }
            if (options.eventDefinitions) {
                warn('ractive.eventDefinitions has been deprecated in favour of ractive.events. Support will be removed in future versions');
                options.events = options.eventDefinitions;
            }
            registries.forEach(function (registry) {
                if (ractive.constructor[registry]) {
                    ractive[registry] = extend(create(ractive.constructor[registry] || {}), options[registry]);
                } else if (options[registry]) {
                    ractive[registry] = options[registry];
                }
            });
            template = options.template;
            if (typeof template === 'string') {
                if (!parse) {
                    throw new Error(errors.missingParser);
                }
                if (template.charAt(0) === '#' && isClient) {
                    templateEl = document.getElementById(template.substring(1));
                    if (templateEl) {
                        parsedTemplate = parse(templateEl.innerHTML, options);
                    } else {
                        throw new Error('Could not find template element (' + template + ')');
                    }
                } else {
                    parsedTemplate = parse(template, options);
                }
            } else {
                parsedTemplate = template;
            }
            if (isObject(parsedTemplate)) {
                extend(ractive.partials, parsedTemplate.partials);
                parsedTemplate = parsedTemplate.main;
            }
            if (parsedTemplate && parsedTemplate.length === 1 && typeof parsedTemplate[0] === 'string') {
                parsedTemplate = parsedTemplate[0];
            }
            ractive.template = parsedTemplate;
            extend(ractive.partials, options.partials);
            ractive.parseOptions = {
                preserveWhitespace: options.preserveWhitespace,
                sanitize: options.sanitize,
                stripComments: options.stripComments
            };
            ractive.transitionsEnabled = options.noIntro ? false : options.transitionsEnabled;
            if (isClient && !ractive.el) {
                ractive.el = document.createDocumentFragment();
            }
            if (ractive.el && !options.append) {
                ractive.el.innerHTML = '';
            }
            ractive.render(ractive.el, options.complete);
            ractive.transitionsEnabled = options.transitionsEnabled;
            ractive._initing = false;
        };
    }(config_isClient, config_errors, utils_warn, utils_create, utils_extend, utils_defineProperty, utils_defineProperties, utils_getElement, utils_isObject, Ractive_prototype_get_magicAdaptor, parse__parse);
var extend_initChildInstance = function (fillGaps, initOptions, clone, wrapMethod, initialise) {
        
        return function (child, Child, options) {
            initOptions.forEach(function (property) {
                var value = options[property], defaultValue = Child[property];
                if (typeof value === 'function' && typeof defaultValue === 'function') {
                    options[property] = wrapMethod(value, defaultValue);
                } else if (value === undefined && defaultValue !== undefined) {
                    options[property] = defaultValue;
                }
            });
            if (child.beforeInit) {
                child.beforeInit(options);
            }
            initialise(child, options);
            if (child.init) {
                child.init(options);
            }
        };
    }(utils_fillGaps, extend_initOptions, extend_utils_clone, extend_wrapMethod, Ractive_initialise);
var extend__extend = function (create, inheritFromParent, inheritFromChildProps, extractInlinePartials, conditionallyParseTemplate, conditionallyParsePartials, initChildInstance, circular) {
        
        var Ractive;
        circular.push(function () {
            Ractive = circular.Ractive;
        });
        return function (childProps) {
            var Parent = this, Child;
            Child = function (options) {
                initChildInstance(this, Child, options || {});
            };
            Child.prototype = create(Parent.prototype);
            Child.prototype.constructor = Child;
            inheritFromParent(Child, Parent);
            inheritFromChildProps(Child, childProps);
            conditionallyParseTemplate(Child);
            extractInlinePartials(Child, childProps);
            conditionallyParsePartials(Child);
            Child.extend = Parent.extend;
            return Child;
        };
    }(utils_create, extend_inheritFromParent, extend_inheritFromChildProps, extend_extractInlinePartials, extend_conditionallyParseTemplate, extend_conditionallyParsePartials, extend_initChildInstance, circular);
var Ractive__Ractive = function (svg, create, defineProperties, prototype, partialRegistry, adaptorRegistry, easingRegistry, Ractive_extend, parse, initialise, circular) {
        
        var Ractive = function (options) {
            initialise(this, options);
        };
        defineProperties(Ractive, {
            prototype: { value: prototype },
            partials: { value: partialRegistry },
            adaptors: { value: adaptorRegistry },
            easing: { value: easingRegistry },
            transitions: { value: {} },
            events: { value: {} },
            components: { value: {} },
            decorators: { value: {} },
            svg: { value: svg },
            VERSION: { value: '0.3.9' }
        });
        Ractive.eventDefinitions = Ractive.events;
        Ractive.prototype.constructor = Ractive;
        Ractive.delimiters = [
            '{{',
            '}}'
        ];
        Ractive.tripleDelimiters = [
            '{{{',
            '}}}'
        ];
        Ractive.extend = Ractive_extend;
        Ractive.parse = parse;
        circular.Ractive = Ractive;
        return Ractive;
    }(config_svg, utils_create, utils_defineProperties, Ractive_prototype__prototype, registries_partials, registries_adaptors, registries_easing, extend__extend, parse__parse, Ractive_initialise, circular);
var Ractive = function (Ractive, circular) {
        
        if (typeof window !== 'undefined' && window.Node && !window.Node.prototype.contains && window.HTMLElement && window.HTMLElement.prototype.contains) {
            window.Node.prototype.contains = window.HTMLElement.prototype.contains;
        }
        while (circular.length) {
            circular.pop()();
        }
        return Ractive;
    }(Ractive__Ractive, circular);
// export as Common JS module...
if ( typeof module !== "undefined" && module.exports ) {
	module.exports = Ractive;
}

// ... or as AMD module
else if ( typeof define === "function" && define.amd ) {
	define( function () {
		return Ractive;
	});
}

// ... or as browser global
else {
	global.Ractive = Ractive;
}

}( typeof window !== 'undefined' ? window : this ));
},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvYXp1L0Ryb3Bib3gvd29ya3NwYWNlL0phdmFTY3JpcHQvcHJvamVjdC90ZWNoLXZpZGVvLXJzcy1zZWFyY2hlci9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXp1L0Ryb3Bib3gvd29ya3NwYWNlL0phdmFTY3JpcHQvcHJvamVjdC90ZWNoLXZpZGVvLXJzcy1zZWFyY2hlci9hcHAvYXBwLmpzIiwiL1VzZXJzL2F6dS9Ecm9wYm94L3dvcmtzcGFjZS9KYXZhU2NyaXB0L3Byb2plY3QvdGVjaC12aWRlby1yc3Mtc2VhcmNoZXIvYXBwL21vZGVsL3NlYXJjaC1tb2RlbC5qcyIsIi9Vc2Vycy9henUvRHJvcGJveC93b3Jrc3BhY2UvSmF2YVNjcmlwdC9wcm9qZWN0L3RlY2gtdmlkZW8tcnNzLXNlYXJjaGVyL2Jvd2VyX2NvbXBvbmVudHMvcmFjdGl2ZS9idWlsZC9SYWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgYXp1IG9uIDIwMTQvMDEvMTguXG4gKiBMSUNFTlNFIDogTUlUXG4gKi9cbnZhciBSYWN0aXZlID0gcmVxdWlyZShcIi4vLi4vYm93ZXJfY29tcG9uZW50cy9yYWN0aXZlL2J1aWxkL1JhY3RpdmUuanNcIik7XG52YXIgbW9kZWwgPSByZXF1aXJlKFwiLi9tb2RlbC9zZWFyY2gtbW9kZWxcIik7XG52YXIgcmFjdGl2ZSA9IG5ldyBSYWN0aXZlKHtcbiAgICBlbDogJ2NvbnRhaW5lcicsXG4gICAgdGVtcGxhdGU6ICcjbXlUZW1wbGF0ZScsXG4gICAgZGF0YTogeyBncmVldGluZzogJ0hleScsIHJlY2lwaWVudDogJ3dvcmxkJyB9XG59KTtcblxuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzZWFyY2hJbmRleDogW1xuICAgICAgICBcImkxXCIsXG4gICAgICAgIFwiaTNcIixcbiAgICAgICAgXCJpbmRleFwiXG4gICAgXVxufTsiLCIvKlxuXHRcblx0UmFjdGl2ZSAtIHYwLjMuOSAtIDIwMTMtMTItMzFcblx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHROZXh0LWdlbmVyYXRpb24gRE9NIG1hbmlwdWxhdGlvbiAtIGh0dHA6Ly9yYWN0aXZlanMub3JnXG5cdEZvbGxvdyBAUmFjdGl2ZUpTIGZvciB1cGRhdGVzXG5cblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRDb3B5cmlnaHQgMjAxMyAyMDEzIFJpY2ggSGFycmlzIGFuZCBjb250cmlidXRvcnNcblxuXHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuXHRvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuXHRmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXRcblx0cmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsXG5cdGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZVxuXHRTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xuXHRjb25kaXRpb25zOlxuXG5cdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG5cdGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5cdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG5cdEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFU1xuXHRPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORFxuXHROT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVFxuXHRIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcblx0V0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG5cdEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1Jcblx0T1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4qL1xuXG4oZnVuY3Rpb24gKCBnbG9iYWwgKSB7XG5cblxuXG52YXIgY29uZmlnX3N2ZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRvY3VtZW50ICYmIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUoJ2h0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjQmFzaWNTdHJ1Y3R1cmUnLCAnMS4xJyk7XG4gICAgfSgpO1xudmFyIHV0aWxzX2NyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBjcmVhdGU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgICAgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHByb3RvLCBwcm9wcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBGLnByb3RvdHlwZSA9IHByb3RvO1xuICAgICAgICAgICAgICAgICAgICBvYmogPSBuZXcgRigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcHJvcHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlO1xuICAgIH0oKTtcbnZhciBjb25maWdfbmFtZXNwYWNlcyA9IHtcbiAgICAgICAgaHRtbDogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLFxuICAgICAgICBtYXRobWw6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJyxcbiAgICAgICAgc3ZnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICB4bGluazogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLFxuICAgICAgICB4bWw6ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnLFxuICAgICAgICB4bWxuczogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJ1xuICAgIH07XG52YXIgdXRpbHNfY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIChzdmcsIG5hbWVzcGFjZXMpIHtcbiAgICAgICAgXG4gICAgICAgIGlmICghc3ZnKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHR5cGUsIG5zKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5zICYmIG5zICE9PSBuYW1lc3BhY2VzLmh0bWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgJ1RoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IG5hbWVzcGFjZXMgb3RoZXIgdGhhbiBodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sLiBUaGUgbW9zdCBsaWtlbHkgY2F1c2Ugb2YgdGhpcyBlcnJvciBpcyB0aGF0IHlvdVxcJ3JlIHRyeWluZyB0byByZW5kZXIgU1ZHIGluIGFuIG9sZGVyIGJyb3dzZXIuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUmFjdGl2ZUpTL1JhY3RpdmUvd2lraS9TVkctYW5kLW9sZGVyLWJyb3dzZXJzIGZvciBtb3JlIGluZm9ybWF0aW9uJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0eXBlLCBucykge1xuICAgICAgICAgICAgICAgIGlmICghbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobnMsIHR5cGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0oY29uZmlnX3N2ZywgY29uZmlnX25hbWVzcGFjZXMpO1xudmFyIGNvbmZpZ19pc0NsaWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSgpO1xudmFyIHV0aWxzX2RlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKGlzQ2xpZW50KSB7XG4gICAgICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAndGVzdCcsIHsgdmFsdWU6IDAgfSk7XG4gICAgICAgICAgICBpZiAoaXNDbGllbnQpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksICd0ZXN0JywgeyB2YWx1ZTogMCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIHByb3AsIGRlc2MpIHtcbiAgICAgICAgICAgICAgICBvYmpbcHJvcF0gPSBkZXNjLnZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0oY29uZmlnX2lzQ2xpZW50KTtcbnZhciB1dGlsc19kZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKGNyZWF0ZUVsZW1lbnQsIGRlZmluZVByb3BlcnR5LCBpc0NsaWVudCkge1xuICAgICAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoe30sIHsgdGVzdDogeyB2YWx1ZTogMCB9IH0pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQ2xpZW50KSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY3JlYXRlRWxlbWVudCgnZGl2JyksIHsgdGVzdDogeyB2YWx1ZTogMCB9IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqLCBwcm9wcykge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wO1xuICAgICAgICAgICAgICAgIGZvciAocHJvcCBpbiBwcm9wcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcHMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgcHJvcHNbcHJvcF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0odXRpbHNfY3JlYXRlRWxlbWVudCwgdXRpbHNfZGVmaW5lUHJvcGVydHksIGNvbmZpZ19pc0NsaWVudCk7XG52YXIgdXRpbHNfbm9ybWFsaXNlS2V5cGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciByZWdleCA9IC9cXFtcXHMqKFxcKnxbMC05XXxbMS05XVswLTldKylcXHMqXFxdL2c7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoa2V5cGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIChrZXlwYXRoIHx8ICcnKS5yZXBsYWNlKHJlZ2V4LCAnLiQxJyk7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHJlZ2lzdHJpZXNfYWRhcHRvcnMgPSB7fTtcbnZhciBjb25maWdfdHlwZXMgPSB7XG4gICAgICAgIFRFWFQ6IDEsXG4gICAgICAgIElOVEVSUE9MQVRPUjogMixcbiAgICAgICAgVFJJUExFOiAzLFxuICAgICAgICBTRUNUSU9OOiA0LFxuICAgICAgICBJTlZFUlRFRDogNSxcbiAgICAgICAgQ0xPU0lORzogNixcbiAgICAgICAgRUxFTUVOVDogNyxcbiAgICAgICAgUEFSVElBTDogOCxcbiAgICAgICAgQ09NTUVOVDogOSxcbiAgICAgICAgREVMSU1DSEFOR0U6IDEwLFxuICAgICAgICBNVVNUQUNIRTogMTEsXG4gICAgICAgIFRBRzogMTIsXG4gICAgICAgIEFUVFJJQlVURTogMTMsXG4gICAgICAgIENPTVBPTkVOVDogMTUsXG4gICAgICAgIE5VTUJFUl9MSVRFUkFMOiAyMCxcbiAgICAgICAgU1RSSU5HX0xJVEVSQUw6IDIxLFxuICAgICAgICBBUlJBWV9MSVRFUkFMOiAyMixcbiAgICAgICAgT0JKRUNUX0xJVEVSQUw6IDIzLFxuICAgICAgICBCT09MRUFOX0xJVEVSQUw6IDI0LFxuICAgICAgICBHTE9CQUw6IDI2LFxuICAgICAgICBLRVlfVkFMVUVfUEFJUjogMjcsXG4gICAgICAgIFJFRkVSRU5DRTogMzAsXG4gICAgICAgIFJFRklORU1FTlQ6IDMxLFxuICAgICAgICBNRU1CRVI6IDMyLFxuICAgICAgICBQUkVGSVhfT1BFUkFUT1I6IDMzLFxuICAgICAgICBCUkFDS0VURUQ6IDM0LFxuICAgICAgICBDT05ESVRJT05BTDogMzUsXG4gICAgICAgIElORklYX09QRVJBVE9SOiAzNixcbiAgICAgICAgSU5WT0NBVElPTjogNDBcbiAgICB9O1xudmFyIHV0aWxzX2lzQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRoaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh0aGluZykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHNoYXJlZF9jbGVhckNhY2hlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNsZWFyQ2FjaGUocmFjdGl2ZSwga2V5cGF0aCkge1xuICAgICAgICAgICAgdmFyIGNhY2hlTWFwLCB3cmFwcGVkUHJvcGVydHk7XG4gICAgICAgICAgICBpZiAod3JhcHBlZFByb3BlcnR5ID0gcmFjdGl2ZS5fd3JhcHBlZFtrZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgIGlmICh3cmFwcGVkUHJvcGVydHkudGVhcmRvd24oKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFjdGl2ZS5fd3JhcHBlZFtrZXlwYXRoXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmFjdGl2ZS5fY2FjaGVba2V5cGF0aF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoY2FjaGVNYXAgPSByYWN0aXZlLl9jYWNoZU1hcFtrZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChjYWNoZU1hcC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJDYWNoZShyYWN0aXZlLCBjYWNoZU1hcC5wb3AoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciBzaGFyZWRfZ2V0VmFsdWVGcm9tQ2hlY2tib3hlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocmFjdGl2ZSwga2V5cGF0aCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlLCBjaGVja2JveGVzLCBjaGVja2JveCwgbGVuLCBpLCByb290RWw7XG4gICAgICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgICAgICAgcm9vdEVsID0gcmFjdGl2ZS5yZW5kZXJlZCA/IHJhY3RpdmUuZWwgOiByYWN0aXZlLmZyYWdtZW50LmRvY0ZyYWc7XG4gICAgICAgICAgICBjaGVja2JveGVzID0gcm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXVtuYW1lPVwie3snICsga2V5cGF0aCArICd9fVwiXScpO1xuICAgICAgICAgICAgbGVuID0gY2hlY2tib3hlcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBjaGVja2JveCA9IGNoZWNrYm94ZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrYm94Lmhhc0F0dHJpYnV0ZSgnY2hlY2tlZCcpIHx8IGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVbdmFsdWUubGVuZ3RoXSA9IGNoZWNrYm94Ll9yYWN0aXZlLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgc2hhcmVkX3ByZURvbVVwZGF0ZSA9IGZ1bmN0aW9uIChnZXRWYWx1ZUZyb21DaGVja2JveGVzKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHJhY3RpdmUpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCwgZXZhbHVhdG9yLCBzZWxlY3RWYWx1ZSwgYXR0cmlidXRlLCBrZXlwYXRoLCByYWRpbztcbiAgICAgICAgICAgIGRlZmVycmVkID0gcmFjdGl2ZS5fZGVmZXJyZWQ7XG4gICAgICAgICAgICB3aGlsZSAoZXZhbHVhdG9yID0gZGVmZXJyZWQuZXZhbHMucG9wKCkpIHtcbiAgICAgICAgICAgICAgICBldmFsdWF0b3IudXBkYXRlKCkuZGVmZXJyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChzZWxlY3RWYWx1ZSA9IGRlZmVycmVkLnNlbGVjdFZhbHVlcy5wb3AoKSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlLmRlZmVycmVkVXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoYXR0cmlidXRlID0gZGVmZXJyZWQuYXR0cnMucG9wKCkpIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUudXBkYXRlKCkuZGVmZXJyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChrZXlwYXRoID0gZGVmZXJyZWQuY2hlY2tib3hlcy5wb3AoKSkge1xuICAgICAgICAgICAgICAgIHJhY3RpdmUuc2V0KGtleXBhdGgsIGdldFZhbHVlRnJvbUNoZWNrYm94ZXMocmFjdGl2ZSwga2V5cGF0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKHJhZGlvID0gZGVmZXJyZWQucmFkaW9zLnBvcCgpKSB7XG4gICAgICAgICAgICAgICAgcmFkaW8udXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfShzaGFyZWRfZ2V0VmFsdWVGcm9tQ2hlY2tib3hlcyk7XG52YXIgc2hhcmVkX3Bvc3REb21VcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHJhY3RpdmUpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCwgZm9jdXNhYmxlLCBxdWVyeSwgZGVjb3JhdG9yLCB0cmFuc2l0aW9uLCBvYnNlcnZlcjtcbiAgICAgICAgICAgIGRlZmVycmVkID0gcmFjdGl2ZS5fZGVmZXJyZWQ7XG4gICAgICAgICAgICBpZiAoZm9jdXNhYmxlID0gZGVmZXJyZWQuZm9jdXNhYmxlKSB7XG4gICAgICAgICAgICAgICAgZm9jdXNhYmxlLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQuZm9jdXNhYmxlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChxdWVyeSA9IGRlZmVycmVkLmxpdmVRdWVyaWVzLnBvcCgpKSB7XG4gICAgICAgICAgICAgICAgcXVlcnkuX3NvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChkZWNvcmF0b3IgPSBkZWZlcnJlZC5kZWNvcmF0b3JzLnBvcCgpKSB7XG4gICAgICAgICAgICAgICAgZGVjb3JhdG9yLmluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlICh0cmFuc2l0aW9uID0gZGVmZXJyZWQudHJhbnNpdGlvbnMucG9wKCkpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLmluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChvYnNlcnZlciA9IGRlZmVycmVkLm9ic2VydmVycy5wb3AoKSkge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciBzaGFyZWRfbWFrZVRyYW5zaXRpb25NYW5hZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIG1ha2VUcmFuc2l0aW9uTWFuYWdlciA9IGZ1bmN0aW9uIChyb290LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyLCBlbGVtZW50c1RvRGV0YWNoLCBkZXRhY2hOb2Rlcywgbm9kZUhhc05vVHJhbnNpdGlvbmluZ0NoaWxkcmVuO1xuICAgICAgICAgICAgaWYgKHJvb3QuX3BhcmVudCAmJiByb290Ll9wYXJlbnQuX3RyYW5zaXRpb25NYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvb3QuX3BhcmVudC5fdHJhbnNpdGlvbk1hbmFnZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGVtZW50c1RvRGV0YWNoID0gW107XG4gICAgICAgICAgICBkZXRhY2hOb2RlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgZWxlbWVudDtcbiAgICAgICAgICAgICAgICBpID0gZWxlbWVudHNUb0RldGFjaC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudHNUb0RldGFjaFtpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVIYXNOb1RyYW5zaXRpb25pbmdDaGlsZHJlbihlbGVtZW50Lm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRldGFjaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHNUb0RldGFjaC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbm9kZUhhc05vVHJhbnNpdGlvbmluZ0NoaWxkcmVuID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgY2FuZGlkYXRlO1xuICAgICAgICAgICAgICAgIGkgPSB0cmFuc2l0aW9uTWFuYWdlci5hY3RpdmUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlID0gdHJhbnNpdGlvbk1hbmFnZXIuYWN0aXZlW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5jb250YWlucyhjYW5kaWRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdHJhbnNpdGlvbk1hbmFnZXIgPSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiBbXSxcbiAgICAgICAgICAgICAgICBwdXNoOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uTWFuYWdlci5hY3RpdmVbdHJhbnNpdGlvbk1hbmFnZXIuYWN0aXZlLmxlbmd0aF0gPSBub2RlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9wOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gdHJhbnNpdGlvbk1hbmFnZXIuYWN0aXZlLmluZGV4T2Yobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uTWFuYWdlci5hY3RpdmUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWNoTm9kZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc2l0aW9uTWFuYWdlci5hY3RpdmUubGVuZ3RoICYmIHRyYW5zaXRpb25NYW5hZ2VyLl9yZWFkeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbk1hbmFnZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHJvb3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBkZXRhY2hOb2RlcygpO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uTWFuYWdlci5fcmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRyYW5zaXRpb25NYW5hZ2VyLmFjdGl2ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRldGFjaFdoZW5SZWFkeTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHNUb0RldGFjaFtlbGVtZW50c1RvRGV0YWNoLmxlbmd0aF0gPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gdHJhbnNpdGlvbk1hbmFnZXI7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBtYWtlVHJhbnNpdGlvbk1hbmFnZXI7XG4gICAgfSgpO1xudmFyIHNoYXJlZF9ub3RpZnlEZXBlbmRhbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIG5vdGlmeURlcGVuZGFudHMsIGxhc3RLZXksIHN0YXJNYXBzID0ge307XG4gICAgICAgIGxhc3RLZXkgPSAvW15cXC5dKyQvO1xuICAgICAgICBub3RpZnlEZXBlbmRhbnRzID0gZnVuY3Rpb24gKHJhY3RpdmUsIGtleXBhdGgsIG9ubHlEaXJlY3QpIHtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgaWYgKHJhY3RpdmUuX3BhdHRlcm5PYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbm90aWZ5UGF0dGVybk9ic2VydmVycyhyYWN0aXZlLCBrZXlwYXRoLCBrZXlwYXRoLCBvbmx5RGlyZWN0LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCByYWN0aXZlLl9kZXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgbm90aWZ5RGVwZW5kYW50c0F0UHJpb3JpdHkocmFjdGl2ZSwga2V5cGF0aCwgaSwgb25seURpcmVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG5vdGlmeURlcGVuZGFudHMubXVsdGlwbGUgPSBmdW5jdGlvbiAocmFjdGl2ZSwga2V5cGF0aHMsIG9ubHlEaXJlY3QpIHtcbiAgICAgICAgICAgIHZhciBpLCBqLCBsZW47XG4gICAgICAgICAgICBsZW4gPSBrZXlwYXRocy5sZW5ndGg7XG4gICAgICAgICAgICBpZiAocmFjdGl2ZS5fcGF0dGVybk9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpID0gbGVuO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZ5UGF0dGVybk9ic2VydmVycyhyYWN0aXZlLCBrZXlwYXRoc1tpXSwga2V5cGF0aHNbaV0sIG9ubHlEaXJlY3QsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCByYWN0aXZlLl9kZXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJhY3RpdmUuX2RlcHNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaiA9IGxlbjtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZ5RGVwZW5kYW50c0F0UHJpb3JpdHkocmFjdGl2ZSwga2V5cGF0aHNbal0sIGksIG9ubHlEaXJlY3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm90aWZ5RGVwZW5kYW50cztcbiAgICAgICAgZnVuY3Rpb24gbm90aWZ5RGVwZW5kYW50c0F0UHJpb3JpdHkocmFjdGl2ZSwga2V5cGF0aCwgcHJpb3JpdHksIG9ubHlEaXJlY3QpIHtcbiAgICAgICAgICAgIHZhciBkZXBzQnlLZXlwYXRoID0gcmFjdGl2ZS5fZGVwc1twcmlvcml0eV07XG4gICAgICAgICAgICBpZiAoIWRlcHNCeUtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1cGRhdGVBbGwoZGVwc0J5S2V5cGF0aFtrZXlwYXRoXSk7XG4gICAgICAgICAgICBpZiAob25seURpcmVjdCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2NhZGUocmFjdGl2ZS5fZGVwc01hcFtrZXlwYXRoXSwgcmFjdGl2ZSwgcHJpb3JpdHkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUFsbChkZXBzKSB7XG4gICAgICAgICAgICB2YXIgaSwgbGVuO1xuICAgICAgICAgICAgaWYgKGRlcHMpIHtcbiAgICAgICAgICAgICAgICBsZW4gPSBkZXBzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVwc1tpXS51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2FzY2FkZShjaGlsZERlcHMsIHJhY3RpdmUsIHByaW9yaXR5LCBvbmx5RGlyZWN0KSB7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIGlmIChjaGlsZERlcHMpIHtcbiAgICAgICAgICAgICAgICBpID0gY2hpbGREZXBzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmeURlcGVuZGFudHNBdFByaW9yaXR5KHJhY3RpdmUsIGNoaWxkRGVwc1tpXSwgcHJpb3JpdHksIG9ubHlEaXJlY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBub3RpZnlQYXR0ZXJuT2JzZXJ2ZXJzKHJhY3RpdmUsIHJlZ2lzdGVyZWRLZXlwYXRoLCBhY3R1YWxLZXlwYXRoLCBpc1BhcmVudE9mQ2hhbmdlZEtleXBhdGgsIGlzVG9wTGV2ZWxDYWxsKSB7XG4gICAgICAgICAgICB2YXIgaSwgcGF0dGVybk9ic2VydmVyLCBjaGlsZHJlbiwgY2hpbGQsIGtleSwgY2hpbGRBY3R1YWxLZXlwYXRoLCBwb3RlbnRpYWxXaWxkY2FyZE1hdGNoZXMsIGNhc2NhZGU7XG4gICAgICAgICAgICBpID0gcmFjdGl2ZS5fcGF0dGVybk9ic2VydmVycy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgcGF0dGVybk9ic2VydmVyID0gcmFjdGl2ZS5fcGF0dGVybk9ic2VydmVyc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAocGF0dGVybk9ic2VydmVyLnJlZ2V4LnRlc3QoYWN0dWFsS2V5cGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybk9ic2VydmVyLnVwZGF0ZShhY3R1YWxLZXlwYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNQYXJlbnRPZkNoYW5nZWRLZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzY2FkZSA9IGZ1bmN0aW9uIChrZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuID0gcmFjdGl2ZS5fZGVwc01hcFtrZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgICAgICBpID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0gbGFzdEtleS5leGVjKGNoaWxkKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkQWN0dWFsS2V5cGF0aCA9IGFjdHVhbEtleXBhdGggKyAnLicgKyBrZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RpZnlQYXR0ZXJuT2JzZXJ2ZXJzKHJhY3RpdmUsIGNoaWxkLCBjaGlsZEFjdHVhbEtleXBhdGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChpc1RvcExldmVsQ2FsbCkge1xuICAgICAgICAgICAgICAgIHBvdGVudGlhbFdpbGRjYXJkTWF0Y2hlcyA9IGdldFBvdGVudGlhbFdpbGRjYXJkTWF0Y2hlcyhhY3R1YWxLZXlwYXRoKTtcbiAgICAgICAgICAgICAgICBwb3RlbnRpYWxXaWxkY2FyZE1hdGNoZXMuZm9yRWFjaChjYXNjYWRlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FzY2FkZShyZWdpc3RlcmVkS2V5cGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0UG90ZW50aWFsV2lsZGNhcmRNYXRjaGVzKGtleXBhdGgpIHtcbiAgICAgICAgICAgIHZhciBrZXlzLCBzdGFyTWFwLCBtYXBwZXIsIGksIHJlc3VsdCwgd2lsZGNhcmRLZXlwYXRoO1xuICAgICAgICAgICAga2V5cyA9IGtleXBhdGguc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIHN0YXJNYXAgPSBnZXRTdGFyTWFwKGtleXMubGVuZ3RoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgbWFwcGVyID0gZnVuY3Rpb24gKHN0YXIsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhciA/ICcqJyA6IGtleXNbaV07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaSA9IHN0YXJNYXAubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIHdpbGRjYXJkS2V5cGF0aCA9IHN0YXJNYXBbaV0ubWFwKG1hcHBlcikuam9pbignLicpO1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0W3dpbGRjYXJkS2V5cGF0aF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gd2lsZGNhcmRLZXlwYXRoO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbd2lsZGNhcmRLZXlwYXRoXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRTdGFyTWFwKG51bSkge1xuICAgICAgICAgICAgdmFyIG9uZXMgPSAnJywgbWF4LCBiaW5hcnksIHN0YXJNYXAsIG1hcHBlciwgaTtcbiAgICAgICAgICAgIGlmICghc3Rhck1hcHNbbnVtXSkge1xuICAgICAgICAgICAgICAgIHN0YXJNYXAgPSBbXTtcbiAgICAgICAgICAgICAgICB3aGlsZSAob25lcy5sZW5ndGggPCBudW0pIHtcbiAgICAgICAgICAgICAgICAgICAgb25lcyArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtYXggPSBwYXJzZUludChvbmVzLCAyKTtcbiAgICAgICAgICAgICAgICBtYXBwZXIgPSBmdW5jdGlvbiAoZGlnaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpZ2l0ID09PSAnMSc7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDw9IG1heDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeSA9IGkudG9TdHJpbmcoMik7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChiaW5hcnkubGVuZ3RoIDwgbnVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5hcnkgPSAnMCcgKyBiaW5hcnk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3Rhck1hcFtpXSA9IEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChiaW5hcnksIG1hcHBlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXJNYXBzW251bV0gPSBzdGFyTWFwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0YXJNYXBzW251bV07XG4gICAgICAgIH1cbiAgICB9KCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfZ2V0X2FycmF5QWRhcHRvciA9IGZ1bmN0aW9uICh0eXBlcywgZGVmaW5lUHJvcGVydHksIGlzQXJyYXksIGNsZWFyQ2FjaGUsIHByZURvbVVwZGF0ZSwgcG9zdERvbVVwZGF0ZSwgbWFrZVRyYW5zaXRpb25NYW5hZ2VyLCBub3RpZnlEZXBlbmRhbnRzKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgYXJyYXlBZGFwdG9yLCBub3RpZnlBcnJheURlcGVuZGFudHMsIEFycmF5V3JhcHBlciwgcGF0Y2hBcnJheU1ldGhvZHMsIHVucGF0Y2hBcnJheU1ldGhvZHMsIHBhdGNoZWRBcnJheVByb3RvLCB0ZXN0T2JqLCBtdXRhdG9yTWV0aG9kcywgbm9vcCwgZXJyb3JNZXNzYWdlO1xuICAgICAgICBhcnJheUFkYXB0b3IgPSB7XG4gICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNBcnJheShvYmplY3QpICYmICghb2JqZWN0Ll9yYWN0aXZlIHx8ICFvYmplY3QuX3JhY3RpdmUuc2V0dGluZyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd3JhcDogZnVuY3Rpb24gKHJhY3RpdmUsIGFycmF5LCBrZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheVdyYXBwZXIocmFjdGl2ZSwgYXJyYXksIGtleXBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBBcnJheVdyYXBwZXIgPSBmdW5jdGlvbiAocmFjdGl2ZSwgYXJyYXksIGtleXBhdGgpIHtcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IHJhY3RpdmU7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gYXJyYXk7XG4gICAgICAgICAgICB0aGlzLmtleXBhdGggPSBrZXlwYXRoO1xuICAgICAgICAgICAgaWYgKCFhcnJheS5fcmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGRlZmluZVByb3BlcnR5KGFycmF5LCAnX3JhY3RpdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyczogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZzogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGF0Y2hBcnJheU1ldGhvZHMoYXJyYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFhcnJheS5fcmFjdGl2ZS5pbnN0YW5jZXNbcmFjdGl2ZS5fZ3VpZF0pIHtcbiAgICAgICAgICAgICAgICBhcnJheS5fcmFjdGl2ZS5pbnN0YW5jZXNbcmFjdGl2ZS5fZ3VpZF0gPSAwO1xuICAgICAgICAgICAgICAgIGFycmF5Ll9yYWN0aXZlLmluc3RhbmNlcy5wdXNoKHJhY3RpdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXJyYXkuX3JhY3RpdmUuaW5zdGFuY2VzW3JhY3RpdmUuX2d1aWRdICs9IDE7XG4gICAgICAgICAgICBhcnJheS5fcmFjdGl2ZS53cmFwcGVycy5wdXNoKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICBBcnJheVdyYXBwZXIucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJyYXksIHN0b3JhZ2UsIHdyYXBwZXJzLCBpbnN0YW5jZXMsIGluZGV4O1xuICAgICAgICAgICAgICAgIGFycmF5ID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgICAgICBzdG9yYWdlID0gYXJyYXkuX3JhY3RpdmU7XG4gICAgICAgICAgICAgICAgd3JhcHBlcnMgPSBzdG9yYWdlLndyYXBwZXJzO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlcyA9IHN0b3JhZ2UuaW5zdGFuY2VzO1xuICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlLnNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbmRleCA9IHdyYXBwZXJzLmluZGV4T2YodGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd3JhcHBlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBpZiAoIXdyYXBwZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXJyYXkuX3JhY3RpdmU7XG4gICAgICAgICAgICAgICAgICAgIHVucGF0Y2hBcnJheU1ldGhvZHModGhpcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VzW3RoaXMucm9vdC5fZ3VpZF0gLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpbnN0YW5jZXNbdGhpcy5yb290Ll9ndWlkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpbnN0YW5jZXMuaW5kZXhPZih0aGlzLnJvb3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG5vdGlmeUFycmF5RGVwZW5kYW50cyA9IGZ1bmN0aW9uIChhcnJheSwgbWV0aG9kTmFtZSwgYXJncykge1xuICAgICAgICAgICAgdmFyIG5vdGlmeUtleXBhdGhEZXBlbmRhbnRzLCBxdWV1ZURlcGVuZGFudHMsIHdyYXBwZXJzLCB3cmFwcGVyLCBpO1xuICAgICAgICAgICAgbm90aWZ5S2V5cGF0aERlcGVuZGFudHMgPSBmdW5jdGlvbiAocm9vdCwga2V5cGF0aCkge1xuICAgICAgICAgICAgICAgIHZhciBkZXBzQnlLZXlwYXRoLCBkZXBzLCBrZXlzLCB1cHN0cmVhbVF1ZXVlLCBzbWFydFVwZGF0ZVF1ZXVlLCBkdW1iVXBkYXRlUXVldWUsIGksIGNoYW5nZWQsIHN0YXJ0LCBlbmQsIGNoaWxkS2V5cGF0aCwgbGVuZ3RoVW5jaGFuZ2VkO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2ROYW1lID09PSAnc29ydCcgfHwgbWV0aG9kTmFtZSA9PT0gJ3JldmVyc2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvb3Quc2V0KGtleXBhdGgsIGFycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbGVhckNhY2hlKHJvb3QsIGtleXBhdGgpO1xuICAgICAgICAgICAgICAgIHNtYXJ0VXBkYXRlUXVldWUgPSBbXTtcbiAgICAgICAgICAgICAgICBkdW1iVXBkYXRlUXVldWUgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcm9vdC5fZGVwcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBkZXBzQnlLZXlwYXRoID0gcm9vdC5fZGVwc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkZXBzQnlLZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkZXBzID0gZGVwc0J5S2V5cGF0aFtrZXlwYXRoXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlRGVwZW5kYW50cyhrZXlwYXRoLCBkZXBzLCBzbWFydFVwZGF0ZVF1ZXVlLCBkdW1iVXBkYXRlUXVldWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJlRG9tVXBkYXRlKHJvb3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHNtYXJ0VXBkYXRlUXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc21hcnRVcGRhdGVRdWV1ZS5wb3AoKS5zbWFydFVwZGF0ZShtZXRob2ROYW1lLCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChkdW1iVXBkYXRlUXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVtYlVwZGF0ZVF1ZXVlLnBvcCgpLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtZXRob2ROYW1lID09PSAnc3BsaWNlJyAmJiBhcmdzLmxlbmd0aCA+IDIgJiYgYXJnc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkID0gTWF0aC5taW4oYXJnc1sxXSwgYXJncy5sZW5ndGggLSAyKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBhcmdzWzBdO1xuICAgICAgICAgICAgICAgICAgICBlbmQgPSBzdGFydCArIGNoYW5nZWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmdzWzFdID09PSBhcmdzLmxlbmd0aCAtIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aFVuY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRLZXlwYXRoID0ga2V5cGF0aCArICcuJyArIGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RpZnlEZXBlbmRhbnRzKHJvb3QsIGNoaWxkS2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJlRG9tVXBkYXRlKHJvb3QpO1xuICAgICAgICAgICAgICAgIHVwc3RyZWFtUXVldWUgPSBbXTtcbiAgICAgICAgICAgICAgICBrZXlzID0ga2V5cGF0aC5zcGxpdCgnLicpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBrZXlzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICB1cHN0cmVhbVF1ZXVlW3Vwc3RyZWFtUXVldWUubGVuZ3RoXSA9IGtleXMuam9pbignLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub3RpZnlEZXBlbmRhbnRzLm11bHRpcGxlKHJvb3QsIHVwc3RyZWFtUXVldWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIGlmICghbGVuZ3RoVW5jaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmeURlcGVuZGFudHMocm9vdCwga2V5cGF0aCArICcubGVuZ3RoJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHF1ZXVlRGVwZW5kYW50cyA9IGZ1bmN0aW9uIChrZXlwYXRoLCBkZXBzLCBzbWFydFVwZGF0ZVF1ZXVlLCBkdW1iVXBkYXRlUXVldWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgaywgZGVwZW5kYW50O1xuICAgICAgICAgICAgICAgIGsgPSBkZXBzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoay0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGFudCA9IGRlcHNba107XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXBlbmRhbnQudHlwZSA9PT0gdHlwZXMuUkVGRVJFTkNFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXBlbmRhbnQudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVwZW5kYW50LmtleXBhdGggPT09IGtleXBhdGggJiYgZGVwZW5kYW50LnR5cGUgPT09IHR5cGVzLlNFQ1RJT04gJiYgIWRlcGVuZGFudC5pbnZlcnRlZCAmJiBkZXBlbmRhbnQuZG9jRnJhZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc21hcnRVcGRhdGVRdWV1ZVtzbWFydFVwZGF0ZVF1ZXVlLmxlbmd0aF0gPSBkZXBlbmRhbnQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdW1iVXBkYXRlUXVldWVbZHVtYlVwZGF0ZVF1ZXVlLmxlbmd0aF0gPSBkZXBlbmRhbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd3JhcHBlcnMgPSBhcnJheS5fcmFjdGl2ZS53cmFwcGVycztcbiAgICAgICAgICAgIGkgPSB3cmFwcGVycy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgd3JhcHBlciA9IHdyYXBwZXJzW2ldO1xuICAgICAgICAgICAgICAgIG5vdGlmeUtleXBhdGhEZXBlbmRhbnRzKHdyYXBwZXIucm9vdCwgd3JhcHBlci5rZXlwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcGF0Y2hlZEFycmF5UHJvdG8gPSBbXTtcbiAgICAgICAgbXV0YXRvck1ldGhvZHMgPSBbXG4gICAgICAgICAgICAncG9wJyxcbiAgICAgICAgICAgICdwdXNoJyxcbiAgICAgICAgICAgICdyZXZlcnNlJyxcbiAgICAgICAgICAgICdzaGlmdCcsXG4gICAgICAgICAgICAnc29ydCcsXG4gICAgICAgICAgICAnc3BsaWNlJyxcbiAgICAgICAgICAgICd1bnNoaWZ0J1xuICAgICAgICBdO1xuICAgICAgICBub29wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB9O1xuICAgICAgICBtdXRhdG9yTWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQsIGluc3RhbmNlcywgaW5zdGFuY2UsIGksIHByZXZpb3VzVHJhbnNpdGlvbk1hbmFnZXJzID0ge30sIHRyYW5zaXRpb25NYW5hZ2VycyA9IHt9O1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IEFycmF5LnByb3RvdHlwZVttZXRob2ROYW1lXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlcyA9IHRoaXMuX3JhY3RpdmUuaW5zdGFuY2VzO1xuICAgICAgICAgICAgICAgIGkgPSBpbnN0YW5jZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBpbnN0YW5jZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzVHJhbnNpdGlvbk1hbmFnZXJzW2luc3RhbmNlLl9ndWlkXSA9IGluc3RhbmNlLl90cmFuc2l0aW9uTWFuYWdlcjtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuX3RyYW5zaXRpb25NYW5hZ2VyID0gdHJhbnNpdGlvbk1hbmFnZXJzW2luc3RhbmNlLl9ndWlkXSA9IG1ha2VUcmFuc2l0aW9uTWFuYWdlcihpbnN0YW5jZSwgbm9vcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3JhY3RpdmUuc2V0dGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgbm90aWZ5QXJyYXlEZXBlbmRhbnRzKHRoaXMsIG1ldGhvZE5hbWUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmFjdGl2ZS5zZXR0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaSA9IGluc3RhbmNlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IGluc3RhbmNlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuX3RyYW5zaXRpb25NYW5hZ2VyID0gcHJldmlvdXNUcmFuc2l0aW9uTWFuYWdlcnNbaW5zdGFuY2UuX2d1aWRdO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uTWFuYWdlcnNbaW5zdGFuY2UuX2d1aWRdLnJlYWR5KCk7XG4gICAgICAgICAgICAgICAgICAgIHByZURvbVVwZGF0ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIHBvc3REb21VcGRhdGUoaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRlZmluZVByb3BlcnR5KHBhdGNoZWRBcnJheVByb3RvLCBtZXRob2ROYW1lLCB7IHZhbHVlOiBtZXRob2QgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0ZXN0T2JqID0ge307XG4gICAgICAgIGlmICh0ZXN0T2JqLl9fcHJvdG9fXykge1xuICAgICAgICAgICAgcGF0Y2hBcnJheU1ldGhvZHMgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5fX3Byb3RvX18gPSBwYXRjaGVkQXJyYXlQcm90bztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB1bnBhdGNoQXJyYXlNZXRob2RzID0gZnVuY3Rpb24gKGFycmF5KSB7XG4gICAgICAgICAgICAgICAgYXJyYXkuX19wcm90b19fID0gQXJyYXkucHJvdG90eXBlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdGNoQXJyYXlNZXRob2RzID0gZnVuY3Rpb24gKGFycmF5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGksIG1ldGhvZE5hbWU7XG4gICAgICAgICAgICAgICAgaSA9IG11dGF0b3JNZXRob2RzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZE5hbWUgPSBtdXRhdG9yTWV0aG9kc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkoYXJyYXksIG1ldGhvZE5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwYXRjaGVkQXJyYXlQcm90b1ttZXRob2ROYW1lXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdW5wYXRjaEFycmF5TWV0aG9kcyA9IGZ1bmN0aW9uIChhcnJheSkge1xuICAgICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICAgIGkgPSBtdXRhdG9yTWV0aG9kcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXJyYXlbbXV0YXRvck1ldGhvZHNbaV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3JNZXNzYWdlID0gJ1NvbWV0aGluZyB3ZW50IHdyb25nIGluIGEgcmF0aGVyIGludGVyZXN0aW5nIHdheSc7XG4gICAgICAgIHJldHVybiBhcnJheUFkYXB0b3I7XG4gICAgfShjb25maWdfdHlwZXMsIHV0aWxzX2RlZmluZVByb3BlcnR5LCB1dGlsc19pc0FycmF5LCBzaGFyZWRfY2xlYXJDYWNoZSwgc2hhcmVkX3ByZURvbVVwZGF0ZSwgc2hhcmVkX3Bvc3REb21VcGRhdGUsIHNoYXJlZF9tYWtlVHJhbnNpdGlvbk1hbmFnZXIsIHNoYXJlZF9ub3RpZnlEZXBlbmRhbnRzKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9nZXRfbWFnaWNBZGFwdG9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hZ2ljQWRhcHRvciwgTWFnaWNXcmFwcGVyO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAndGVzdCcsIHsgdmFsdWU6IDAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIG1hZ2ljQWRhcHRvciA9IHtcbiAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKG9iamVjdCwga2V5cGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIWtleXBhdGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd3JhcDogZnVuY3Rpb24gKHJhY3RpdmUsIG9iamVjdCwga2V5cGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTWFnaWNXcmFwcGVyKHJhY3RpdmUsIG9iamVjdCwga2V5cGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIE1hZ2ljV3JhcHBlciA9IGZ1bmN0aW9uIChyYWN0aXZlLCBvYmplY3QsIGtleXBhdGgpIHtcbiAgICAgICAgICAgIHZhciB3cmFwcGVyID0gdGhpcywga2V5cywgcHJvcCwgb2JqS2V5cGF0aCwgZGVzY3JpcHRvciwgd3JhcHBlcnMsIG9sZEdldCwgb2xkU2V0LCBnZXQsIHNldDtcbiAgICAgICAgICAgIHRoaXMucmFjdGl2ZSA9IHJhY3RpdmU7XG4gICAgICAgICAgICB0aGlzLmtleXBhdGggPSBrZXlwYXRoO1xuICAgICAgICAgICAga2V5cyA9IGtleXBhdGguc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIHRoaXMucHJvcCA9IGtleXMucG9wKCk7XG4gICAgICAgICAgICBvYmpLZXlwYXRoID0ga2V5cy5qb2luKCcuJyk7XG4gICAgICAgICAgICB0aGlzLm9iaiA9IG9iaktleXBhdGggPyByYWN0aXZlLmdldChvYmpLZXlwYXRoKSA6IHJhY3RpdmUuZGF0YTtcbiAgICAgICAgICAgIGRlc2NyaXB0b3IgPSB0aGlzLm9yaWdpbmFsRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcy5vYmosIHRoaXMucHJvcCk7XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnNldCAmJiAod3JhcHBlcnMgPSBkZXNjcmlwdG9yLnNldC5fcmFjdGl2ZVdyYXBwZXJzKSkge1xuICAgICAgICAgICAgICAgIGlmICh3cmFwcGVycy5pbmRleE9mKHRoaXMpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVycy5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiAhZGVzY3JpcHRvci5jb25maWd1cmFibGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgbWFnaWMgbW9kZSB3aXRoIHByb3BlcnR5IFwiJyArIHByb3AgKyAnXCIgLSBvYmplY3QgaXMgbm90IGNvbmZpZ3VyYWJsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgICAgICAgICAgICAgICBvbGRHZXQgPSBkZXNjcmlwdG9yLmdldDtcbiAgICAgICAgICAgICAgICBvbGRTZXQgPSBkZXNjcmlwdG9yLnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdldCA9IG9sZEdldCB8fCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXIudmFsdWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZXJzLCB3cmFwcGVyLCBpO1xuICAgICAgICAgICAgICAgIGlmIChvbGRTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkU2V0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd3JhcHBlcnMgPSBzZXQuX3JhY3RpdmVXcmFwcGVycztcbiAgICAgICAgICAgICAgICBpID0gd3JhcHBlcnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlciA9IHdyYXBwZXJzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXdyYXBwZXIucmVzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLnJhY3RpdmUuc2V0KHdyYXBwZXIua2V5cGF0aCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNldC5fcmFjdGl2ZVdyYXBwZXJzID0gW3RoaXNdO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMub2JqLCB0aGlzLnByb3AsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgICAgICAgICBzZXQ6IHNldCxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIE1hZ2ljV3JhcHBlci5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldHRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0dGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0b3IsIHNldCwgdmFsdWUsIHdyYXBwZXJzO1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMub2JqLCB0aGlzLnByb3ApO1xuICAgICAgICAgICAgICAgIHNldCA9IGRlc2NyaXB0b3Iuc2V0O1xuICAgICAgICAgICAgICAgIHdyYXBwZXJzID0gc2V0Ll9yYWN0aXZlV3JhcHBlcnM7XG4gICAgICAgICAgICAgICAgd3JhcHBlcnMuc3BsaWNlKHdyYXBwZXJzLmluZGV4T2YodGhpcyksIDEpO1xuICAgICAgICAgICAgICAgIGlmICghd3JhcHBlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5vYmpbdGhpcy5wcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMub2JqLCB0aGlzLnByb3AsIHRoaXMub3JpZ2luYWxEZXNjcmlwdG9yIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3JhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9ialt0aGlzLnByb3BdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbWFnaWNBZGFwdG9yO1xuICAgIH0oKTtcbnZhciBzaGFyZWRfYWRhcHRJZk5lY2Vzc2FyeSA9IGZ1bmN0aW9uIChhZGFwdG9yUmVnaXN0cnksIGFycmF5QWRhcHRvciwgbWFnaWNBZGFwdG9yKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgcHJlZml4ZXJzID0ge307XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocmFjdGl2ZSwga2V5cGF0aCwgdmFsdWUsIGlzRXhwcmVzc2lvblJlc3VsdCkge1xuICAgICAgICAgICAgdmFyIGxlbiwgaSwgYWRhcHRvciwgd3JhcHBlZDtcbiAgICAgICAgICAgIGxlbiA9IHJhY3RpdmUuYWRhcHRvcnMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgYWRhcHRvciA9IHJhY3RpdmUuYWRhcHRvcnNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhZGFwdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWFkYXB0b3JSZWdpc3RyeVthZGFwdG9yXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGFkYXB0b3IgXCInICsgYWRhcHRvciArICdcIicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFkYXB0b3IgPSByYWN0aXZlLmFkYXB0b3JzW2ldID0gYWRhcHRvclJlZ2lzdHJ5W2FkYXB0b3JdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWRhcHRvci5maWx0ZXIodmFsdWUsIGtleXBhdGgsIHJhY3RpdmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZWQgPSByYWN0aXZlLl93cmFwcGVkW2tleXBhdGhdID0gYWRhcHRvci53cmFwKHJhY3RpdmUsIHZhbHVlLCBrZXlwYXRoLCBnZXRQcmVmaXhlcihrZXlwYXRoKSk7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZWQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNFeHByZXNzaW9uUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJhY3RpdmUubWFnaWMgJiYgbWFnaWNBZGFwdG9yLmZpbHRlcih2YWx1ZSwga2V5cGF0aCwgcmFjdGl2ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFjdGl2ZS5fd3JhcHBlZFtrZXlwYXRoXSA9IG1hZ2ljQWRhcHRvci53cmFwKHJhY3RpdmUsIHZhbHVlLCBrZXlwYXRoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJhY3RpdmUubW9kaWZ5QXJyYXlzICYmIGFycmF5QWRhcHRvci5maWx0ZXIodmFsdWUsIGtleXBhdGgsIHJhY3RpdmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhY3RpdmUuX3dyYXBwZWRba2V5cGF0aF0gPSBhcnJheUFkYXB0b3Iud3JhcChyYWN0aXZlLCB2YWx1ZSwga2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBwcmVmaXhLZXlwYXRoKG9iaiwgcHJlZml4KSB7XG4gICAgICAgICAgICB2YXIgcHJlZml4ZWQgPSB7fSwga2V5O1xuICAgICAgICAgICAgaWYgKCFwcmVmaXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJlZml4ICs9ICcuJztcbiAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBwcmVmaXhlZFtwcmVmaXggKyBrZXldID0gb2JqW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZWZpeGVkO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldFByZWZpeGVyKHJvb3RLZXlwYXRoKSB7XG4gICAgICAgICAgICB2YXIgcm9vdERvdDtcbiAgICAgICAgICAgIGlmICghcHJlZml4ZXJzW3Jvb3RLZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgIHJvb3REb3QgPSByb290S2V5cGF0aCA/IHJvb3RLZXlwYXRoICsgJy4nIDogJyc7XG4gICAgICAgICAgICAgICAgcHJlZml4ZXJzW3Jvb3RLZXlwYXRoXSA9IGZ1bmN0aW9uIChyZWxhdGl2ZUtleXBhdGgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmo7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVsYXRpdmVLZXlwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbcm9vdERvdCArIHJlbGF0aXZlS2V5cGF0aF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWxhdGl2ZUtleXBhdGggPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm9vdERvdCA/IHByZWZpeEtleXBhdGgocmVsYXRpdmVLZXlwYXRoLCByb290S2V5cGF0aCkgOiByZWxhdGl2ZUtleXBhdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZWZpeGVyc1tyb290S2V5cGF0aF07XG4gICAgICAgIH1cbiAgICB9KHJlZ2lzdHJpZXNfYWRhcHRvcnMsIFJhY3RpdmVfcHJvdG90eXBlX2dldF9hcnJheUFkYXB0b3IsIFJhY3RpdmVfcHJvdG90eXBlX2dldF9tYWdpY0FkYXB0b3IpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX2dldF9fZ2V0ID0gZnVuY3Rpb24gKG5vcm1hbGlzZUtleXBhdGgsIGFkYXB0b3JSZWdpc3RyeSwgYWRhcHRJZk5lY2Vzc2FyeSkge1xuICAgICAgICBcbiAgICAgICAgdmFyIGdldCwgX2dldCwgcmV0cmlldmU7XG4gICAgICAgIGdldCA9IGZ1bmN0aW9uIChrZXlwYXRoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2FwdHVyZWQgJiYgIXRoaXMuX2NhcHR1cmVkW2tleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FwdHVyZWQucHVzaChrZXlwYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYXB0dXJlZFtrZXlwYXRoXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX2dldCh0aGlzLCBrZXlwYXRoKTtcbiAgICAgICAgfTtcbiAgICAgICAgX2dldCA9IGZ1bmN0aW9uIChyYWN0aXZlLCBrZXlwYXRoKSB7XG4gICAgICAgICAgICB2YXIgY2FjaGUsIGNhY2hlZCwgdmFsdWUsIHdyYXBwZWQsIGV2YWx1YXRvcjtcbiAgICAgICAgICAgIGtleXBhdGggPSBub3JtYWxpc2VLZXlwYXRoKGtleXBhdGgpO1xuICAgICAgICAgICAgY2FjaGUgPSByYWN0aXZlLl9jYWNoZTtcbiAgICAgICAgICAgIGlmICgoY2FjaGVkID0gY2FjaGVba2V5cGF0aF0pICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHdyYXBwZWQgPSByYWN0aXZlLl93cmFwcGVkW2tleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwcGVkLnZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgha2V5cGF0aCkge1xuICAgICAgICAgICAgICAgIGFkYXB0SWZOZWNlc3NhcnkocmFjdGl2ZSwgJycsIHJhY3RpdmUuZGF0YSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSByYWN0aXZlLmRhdGE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2YWx1YXRvciA9IHJhY3RpdmUuX2V2YWx1YXRvcnNba2V5cGF0aF0pIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGV2YWx1YXRvci52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSByZXRyaWV2ZShyYWN0aXZlLCBrZXlwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhY2hlW2tleXBhdGhdID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIHJldHJpZXZlID0gZnVuY3Rpb24gKHJhY3RpdmUsIGtleXBhdGgpIHtcbiAgICAgICAgICAgIHZhciBrZXlzLCBrZXksIHBhcmVudEtleXBhdGgsIHBhcmVudFZhbHVlLCBjYWNoZU1hcCwgdmFsdWUsIHdyYXBwZWQ7XG4gICAgICAgICAgICBrZXlzID0ga2V5cGF0aC5zcGxpdCgnLicpO1xuICAgICAgICAgICAga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgICAgIHBhcmVudEtleXBhdGggPSBrZXlzLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIHBhcmVudFZhbHVlID0gX2dldChyYWN0aXZlLCBwYXJlbnRLZXlwYXRoKTtcbiAgICAgICAgICAgIGlmICh3cmFwcGVkID0gcmFjdGl2ZS5fd3JhcHBlZFtwYXJlbnRLZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgIHBhcmVudFZhbHVlID0gd3JhcHBlZC5nZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJlbnRWYWx1ZSA9PT0gbnVsbCB8fCBwYXJlbnRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoY2FjaGVNYXAgPSByYWN0aXZlLl9jYWNoZU1hcFtwYXJlbnRLZXlwYXRoXSkpIHtcbiAgICAgICAgICAgICAgICByYWN0aXZlLl9jYWNoZU1hcFtwYXJlbnRLZXlwYXRoXSA9IFtrZXlwYXRoXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlTWFwLmluZGV4T2Yoa2V5cGF0aCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlTWFwW2NhY2hlTWFwLmxlbmd0aF0gPSBrZXlwYXRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlID0gcGFyZW50VmFsdWVba2V5XTtcbiAgICAgICAgICAgIGFkYXB0SWZOZWNlc3NhcnkocmFjdGl2ZSwga2V5cGF0aCwgdmFsdWUpO1xuICAgICAgICAgICAgcmFjdGl2ZS5fY2FjaGVba2V5cGF0aF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGdldDtcbiAgICB9KHV0aWxzX25vcm1hbGlzZUtleXBhdGgsIHJlZ2lzdHJpZXNfYWRhcHRvcnMsIHNoYXJlZF9hZGFwdElmTmVjZXNzYXJ5KTtcbnZhciB1dGlsc19pc09iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGhpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnICYmIHRvU3RyaW5nLmNhbGwodGhpbmcpID09PSAnW29iamVjdCBPYmplY3RdJztcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgdXRpbHNfaXNFcXVhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgaWYgKGEgPT09IG51bGwgJiYgYiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgYiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYSA9PT0gYjtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgc2hhcmVkX3Jlc29sdmVSZWYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgcmVzb2x2ZVJlZjtcbiAgICAgICAgcmVzb2x2ZVJlZiA9IGZ1bmN0aW9uIChyYWN0aXZlLCByZWYsIGNvbnRleHRTdGFjaykge1xuICAgICAgICAgICAgdmFyIGtleXBhdGgsIGtleXMsIGxhc3RLZXksIGNvbnRleHRLZXlzLCBpbm5lck1vc3RDb250ZXh0LCBwb3N0Zml4LCBwYXJlbnRLZXlwYXRoLCBwYXJlbnRWYWx1ZSwgd3JhcHBlZCwgY29udGV4dCwgYW5jZXN0b3JFcnJvck1lc3NhZ2U7XG4gICAgICAgICAgICBhbmNlc3RvckVycm9yTWVzc2FnZSA9ICdDb3VsZCBub3QgcmVzb2x2ZSByZWZlcmVuY2UgLSB0b28gbWFueSBcIi4uL1wiIHByZWZpeGVzJztcbiAgICAgICAgICAgIGlmIChyZWYgPT09ICcuJykge1xuICAgICAgICAgICAgICAgIGlmICghY29udGV4dFN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGtleXBhdGggPSBjb250ZXh0U3RhY2tbY29udGV4dFN0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZWYuY2hhckF0KDApID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gY29udGV4dFN0YWNrW2NvbnRleHRTdGFjay5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBjb250ZXh0S2V5cyA9IGNvbnRleHQgPyBjb250ZXh0LnNwbGl0KCcuJykgOiBbXTtcbiAgICAgICAgICAgICAgICBpZiAocmVmLnN1YnN0cigwLCAzKSA9PT0gJy4uLycpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHJlZi5zdWJzdHIoMCwgMykgPT09ICcuLi8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRleHRLZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihhbmNlc3RvckVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0S2V5cy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZiA9IHJlZi5zdWJzdHJpbmcoMyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29udGV4dEtleXMucHVzaChyZWYpO1xuICAgICAgICAgICAgICAgICAgICBrZXlwYXRoID0gY29udGV4dEtleXMuam9pbignLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5cGF0aCA9IHJlZi5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAga2V5cGF0aCA9IGNvbnRleHQgKyByZWY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBrZXlzID0gcmVmLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgICAgbGFzdEtleSA9IGtleXMucG9wKCk7XG4gICAgICAgICAgICAgICAgcG9zdGZpeCA9IGtleXMubGVuZ3RoID8gJy4nICsga2V5cy5qb2luKCcuJykgOiAnJztcbiAgICAgICAgICAgICAgICBjb250ZXh0U3RhY2sgPSBjb250ZXh0U3RhY2suY29uY2F0KCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbnRleHRTdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJNb3N0Q29udGV4dCA9IGNvbnRleHRTdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50S2V5cGF0aCA9IGlubmVyTW9zdENvbnRleHQgKyBwb3N0Zml4O1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRWYWx1ZSA9IHJhY3RpdmUuZ2V0KHBhcmVudEtleXBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAod3JhcHBlZCA9IHJhY3RpdmUuX3dyYXBwZWRbcGFyZW50S2V5cGF0aF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudFZhbHVlID0gd3JhcHBlZC5nZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBhcmVudFZhbHVlID09PSAnb2JqZWN0JyAmJiBwYXJlbnRWYWx1ZSAhPT0gbnVsbCAmJiBwYXJlbnRWYWx1ZS5oYXNPd25Qcm9wZXJ0eShsYXN0S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5cGF0aCA9IGlubmVyTW9zdENvbnRleHQgKyAnLicgKyByZWY7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWtleXBhdGggJiYgcmFjdGl2ZS5nZXQocmVmKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXBhdGggPSByZWY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGtleXBhdGggPyBrZXlwYXRoLnJlcGxhY2UoL15cXC4vLCAnJykgOiBrZXlwYXRoO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzb2x2ZVJlZjtcbiAgICB9KCk7XG52YXIgc2hhcmVkX2F0dGVtcHRLZXlwYXRoUmVzb2x1dGlvbiA9IGZ1bmN0aW9uIChyZXNvbHZlUmVmKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgcHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHJhY3RpdmUpIHtcbiAgICAgICAgICAgIHZhciB1bnJlc29sdmVkLCBrZXlwYXRoLCBsZWZ0b3ZlcjtcbiAgICAgICAgICAgIHdoaWxlICh1bnJlc29sdmVkID0gcmFjdGl2ZS5fcGVuZGluZ1Jlc29sdXRpb24ucG9wKCkpIHtcbiAgICAgICAgICAgICAgICBrZXlwYXRoID0gcmVzb2x2ZVJlZihyYWN0aXZlLCB1bnJlc29sdmVkLnJlZiwgdW5yZXNvbHZlZC5jb250ZXh0U3RhY2spO1xuICAgICAgICAgICAgICAgIGlmIChrZXlwYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5yZXNvbHZlZC5yZXNvbHZlKGtleXBhdGgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIChsZWZ0b3ZlciB8fCAobGVmdG92ZXIgPSBbXSkpLnB1c2godW5yZXNvbHZlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxlZnRvdmVyKSB7XG4gICAgICAgICAgICAgICAgcHVzaC5hcHBseShyYWN0aXZlLl9wZW5kaW5nUmVzb2x1dGlvbiwgbGVmdG92ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oc2hhcmVkX3Jlc29sdmVSZWYpO1xudmFyIHNoYXJlZF9wcm9jZXNzRGVmZXJyZWRVcGRhdGVzID0gZnVuY3Rpb24gKHByZURvbVVwZGF0ZSwgcG9zdERvbVVwZGF0ZSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyYWN0aXZlKSB7XG4gICAgICAgICAgICBwcmVEb21VcGRhdGUocmFjdGl2ZSk7XG4gICAgICAgICAgICBwb3N0RG9tVXBkYXRlKHJhY3RpdmUpO1xuICAgICAgICB9O1xuICAgIH0oc2hhcmVkX3ByZURvbVVwZGF0ZSwgc2hhcmVkX3Bvc3REb21VcGRhdGUpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX3NoYXJlZF9yZXBsYWNlRGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocmFjdGl2ZSwga2V5cGF0aCwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBrZXlzLCBhY2N1bXVsYXRlZCwgd3JhcHBlZCwgb2JqLCBrZXksIGN1cnJlbnRLZXlwYXRoLCBrZXlwYXRoVG9DbGVhcjtcbiAgICAgICAgICAgIGtleXMgPSBrZXlwYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBhY2N1bXVsYXRlZCA9IFtdO1xuICAgICAgICAgICAgaWYgKHdyYXBwZWQgPSByYWN0aXZlLl93cmFwcGVkWycnXSkge1xuICAgICAgICAgICAgICAgIGlmICh3cmFwcGVkLnNldCkge1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVkLnNldChrZXlzLmpvaW4oJy4nKSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvYmogPSB3cmFwcGVkLmdldCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmogPSByYWN0aXZlLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoa2V5cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gYWNjdW11bGF0ZWRbYWNjdW11bGF0ZWQubGVuZ3RoXSA9IGtleXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50S2V5cGF0aCA9IGFjY3VtdWxhdGVkLmpvaW4oJy4nKTtcbiAgICAgICAgICAgICAgICBpZiAod3JhcHBlZCA9IHJhY3RpdmUuX3dyYXBwZWRbY3VycmVudEtleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3cmFwcGVkLnNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlZC5zZXQoa2V5cy5qb2luKCcuJyksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvYmogPSB3cmFwcGVkLmdldCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgha2V5cGF0aFRvQ2xlYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlwYXRoVG9DbGVhciA9IGN1cnJlbnRLZXlwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2tleV0gPSAvXlxccypbMC05XStcXHMqJC8udGVzdChrZXlzWzBdKSA/IFtdIDoge307XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5ID0ga2V5c1swXTtcbiAgICAgICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4ga2V5cGF0aFRvQ2xlYXI7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX3NldCA9IGZ1bmN0aW9uIChpc09iamVjdCwgaXNFcXVhbCwgbm9ybWFsaXNlS2V5cGF0aCwgY2xlYXJDYWNoZSwgbm90aWZ5RGVwZW5kYW50cywgYXR0ZW1wdEtleXBhdGhSZXNvbHV0aW9uLCBtYWtlVHJhbnNpdGlvbk1hbmFnZXIsIHByb2Nlc3NEZWZlcnJlZFVwZGF0ZXMsIHJlcGxhY2VEYXRhKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgc2V0LCB1cGRhdGVNb2RlbCwgZ2V0VXBzdHJlYW1DaGFuZ2VzLCByZXNldFdyYXBwZWQ7XG4gICAgICAgIHNldCA9IGZ1bmN0aW9uIChrZXlwYXRoLCB2YWx1ZSwgY29tcGxldGUpIHtcbiAgICAgICAgICAgIHZhciBtYXAsIGNoYW5nZXMsIHVwc3RyZWFtQ2hhbmdlcywgcHJldmlvdXNUcmFuc2l0aW9uTWFuYWdlciwgdHJhbnNpdGlvbk1hbmFnZXIsIGksIGNoYW5nZUhhc2g7XG4gICAgICAgICAgICBjaGFuZ2VzID0gW107XG4gICAgICAgICAgICBpZiAoaXNPYmplY3Qoa2V5cGF0aCkpIHtcbiAgICAgICAgICAgICAgICBtYXAgPSBrZXlwYXRoO1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICAgICAgZm9yIChrZXlwYXRoIGluIG1hcCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWFwLmhhc093blByb3BlcnR5KGtleXBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IG1hcFtrZXlwYXRoXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXBhdGggPSBub3JtYWxpc2VLZXlwYXRoKGtleXBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTW9kZWwodGhpcywga2V5cGF0aCwgdmFsdWUsIGNoYW5nZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBrZXlwYXRoID0gbm9ybWFsaXNlS2V5cGF0aChrZXlwYXRoKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVNb2RlbCh0aGlzLCBrZXlwYXRoLCB2YWx1ZSwgY2hhbmdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNoYW5nZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlvdXNUcmFuc2l0aW9uTWFuYWdlciA9IHRoaXMuX3RyYW5zaXRpb25NYW5hZ2VyO1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbk1hbmFnZXIgPSB0cmFuc2l0aW9uTWFuYWdlciA9IG1ha2VUcmFuc2l0aW9uTWFuYWdlcih0aGlzLCBjb21wbGV0ZSk7XG4gICAgICAgICAgICB1cHN0cmVhbUNoYW5nZXMgPSBnZXRVcHN0cmVhbUNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICAgICAgICBpZiAodXBzdHJlYW1DaGFuZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG5vdGlmeURlcGVuZGFudHMubXVsdGlwbGUodGhpcywgdXBzdHJlYW1DaGFuZ2VzLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vdGlmeURlcGVuZGFudHMubXVsdGlwbGUodGhpcywgY2hhbmdlcyk7XG4gICAgICAgICAgICBpZiAodGhpcy5fcGVuZGluZ1Jlc29sdXRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdEtleXBhdGhSZXNvbHV0aW9uKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvY2Vzc0RlZmVycmVkVXBkYXRlcyh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25NYW5hZ2VyID0gcHJldmlvdXNUcmFuc2l0aW9uTWFuYWdlcjtcbiAgICAgICAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLnJlYWR5KCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlyaW5nQ2hhbmdlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmluZ0NoYW5nZUV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VIYXNoID0ge307XG4gICAgICAgICAgICAgICAgaSA9IGNoYW5nZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlSGFzaFtjaGFuZ2VzW2ldXSA9IHRoaXMuZ2V0KGNoYW5nZXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ2NoYW5nZScsIGNoYW5nZUhhc2gpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyaW5nQ2hhbmdlRXZlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICB1cGRhdGVNb2RlbCA9IGZ1bmN0aW9uIChyYWN0aXZlLCBrZXlwYXRoLCB2YWx1ZSwgY2hhbmdlcykge1xuICAgICAgICAgICAgdmFyIGNhY2hlZCwgcHJldmlvdXMsIHdyYXBwZWQsIGtleXBhdGhUb0NsZWFyLCBldmFsdWF0b3I7XG4gICAgICAgICAgICBpZiAoKHdyYXBwZWQgPSByYWN0aXZlLl93cmFwcGVkW2tleXBhdGhdKSAmJiB3cmFwcGVkLnJlc2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc2V0V3JhcHBlZChyYWN0aXZlLCBrZXlwYXRoLCB2YWx1ZSwgd3JhcHBlZCwgY2hhbmdlcykgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZhbHVhdG9yID0gcmFjdGl2ZS5fZXZhbHVhdG9yc1trZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgIGV2YWx1YXRvci52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FjaGVkID0gcmFjdGl2ZS5fY2FjaGVba2V5cGF0aF07XG4gICAgICAgICAgICBwcmV2aW91cyA9IHJhY3RpdmUuZ2V0KGtleXBhdGgpO1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzICE9PSB2YWx1ZSAmJiAhZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICAgICAga2V5cGF0aFRvQ2xlYXIgPSByZXBsYWNlRGF0YShyYWN0aXZlLCBrZXlwYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gY2FjaGVkICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsZWFyQ2FjaGUocmFjdGl2ZSwga2V5cGF0aFRvQ2xlYXIgfHwga2V5cGF0aCk7XG4gICAgICAgICAgICBjaGFuZ2VzW2NoYW5nZXMubGVuZ3RoXSA9IGtleXBhdGg7XG4gICAgICAgIH07XG4gICAgICAgIGdldFVwc3RyZWFtQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICB2YXIgdXBzdHJlYW1DaGFuZ2VzID0gWycnXSwgaSwga2V5cGF0aCwga2V5cywgdXBzdHJlYW1LZXlwYXRoO1xuICAgICAgICAgICAgaSA9IGNoYW5nZXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGtleXBhdGggPSBjaGFuZ2VzW2ldO1xuICAgICAgICAgICAgICAgIGtleXMgPSBrZXlwYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGtleXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBrZXlzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICB1cHN0cmVhbUtleXBhdGggPSBrZXlzLmpvaW4oJy4nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF1cHN0cmVhbUNoYW5nZXNbdXBzdHJlYW1LZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBzdHJlYW1DaGFuZ2VzW3Vwc3RyZWFtQ2hhbmdlcy5sZW5ndGhdID0gdXBzdHJlYW1LZXlwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBzdHJlYW1DaGFuZ2VzW3Vwc3RyZWFtS2V5cGF0aF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVwc3RyZWFtQ2hhbmdlcztcbiAgICAgICAgfTtcbiAgICAgICAgcmVzZXRXcmFwcGVkID0gZnVuY3Rpb24gKHJhY3RpdmUsIGtleXBhdGgsIHZhbHVlLCB3cmFwcGVkLCBjaGFuZ2VzKSB7XG4gICAgICAgICAgICB2YXIgcHJldmlvdXMsIGNhY2hlZCwgY2FjaGVNYXAsIGk7XG4gICAgICAgICAgICBwcmV2aW91cyA9IHdyYXBwZWQuZ2V0KCk7XG4gICAgICAgICAgICBpZiAoIWlzRXF1YWwocHJldmlvdXMsIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICh3cmFwcGVkLnJlc2V0KHZhbHVlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlID0gd3JhcHBlZC5nZXQoKTtcbiAgICAgICAgICAgIGNhY2hlZCA9IHJhY3RpdmUuX2NhY2hlW2tleXBhdGhdO1xuICAgICAgICAgICAgaWYgKCFpc0VxdWFsKGNhY2hlZCwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmFjdGl2ZS5fY2FjaGVba2V5cGF0aF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBjYWNoZU1hcCA9IHJhY3RpdmUuX2NhY2hlTWFwW2tleXBhdGhdO1xuICAgICAgICAgICAgICAgIGlmIChjYWNoZU1hcCkge1xuICAgICAgICAgICAgICAgICAgICBpID0gY2FjaGVNYXAubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckNhY2hlKHJhY3RpdmUsIGNhY2hlTWFwW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGFuZ2VzW2NoYW5nZXMubGVuZ3RoXSA9IGtleXBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBzZXQ7XG4gICAgfSh1dGlsc19pc09iamVjdCwgdXRpbHNfaXNFcXVhbCwgdXRpbHNfbm9ybWFsaXNlS2V5cGF0aCwgc2hhcmVkX2NsZWFyQ2FjaGUsIHNoYXJlZF9ub3RpZnlEZXBlbmRhbnRzLCBzaGFyZWRfYXR0ZW1wdEtleXBhdGhSZXNvbHV0aW9uLCBzaGFyZWRfbWFrZVRyYW5zaXRpb25NYW5hZ2VyLCBzaGFyZWRfcHJvY2Vzc0RlZmVycmVkVXBkYXRlcywgUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX3JlcGxhY2VEYXRhKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV91cGRhdGUgPSBmdW5jdGlvbiAobWFrZVRyYW5zaXRpb25NYW5hZ2VyLCBhdHRlbXB0S2V5cGF0aFJlc29sdXRpb24sIGNsZWFyQ2FjaGUsIG5vdGlmeURlcGVuZGFudHMsIHByb2Nlc3NEZWZlcnJlZFVwZGF0ZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoa2V5cGF0aCwgY29tcGxldGUpIHtcbiAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uTWFuYWdlciwgcHJldmlvdXNUcmFuc2l0aW9uTWFuYWdlcjtcbiAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5cGF0aCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlID0ga2V5cGF0aDtcbiAgICAgICAgICAgICAgICBrZXlwYXRoID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aW91c1RyYW5zaXRpb25NYW5hZ2VyID0gdGhpcy5fdHJhbnNpdGlvbk1hbmFnZXI7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uTWFuYWdlciA9IHRyYW5zaXRpb25NYW5hZ2VyID0gbWFrZVRyYW5zaXRpb25NYW5hZ2VyKHRoaXMsIGNvbXBsZXRlKTtcbiAgICAgICAgICAgIGF0dGVtcHRLZXlwYXRoUmVzb2x1dGlvbih0aGlzKTtcbiAgICAgICAgICAgIGNsZWFyQ2FjaGUodGhpcywga2V5cGF0aCB8fCAnJyk7XG4gICAgICAgICAgICBub3RpZnlEZXBlbmRhbnRzKHRoaXMsIGtleXBhdGggfHwgJycpO1xuICAgICAgICAgICAgcHJvY2Vzc0RlZmVycmVkVXBkYXRlcyh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25NYW5hZ2VyID0gcHJldmlvdXNUcmFuc2l0aW9uTWFuYWdlcjtcbiAgICAgICAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLnJlYWR5KCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGtleXBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCd1cGRhdGUnLCBrZXlwYXRoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCd1cGRhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgIH0oc2hhcmVkX21ha2VUcmFuc2l0aW9uTWFuYWdlciwgc2hhcmVkX2F0dGVtcHRLZXlwYXRoUmVzb2x1dGlvbiwgc2hhcmVkX2NsZWFyQ2FjaGUsIHNoYXJlZF9ub3RpZnlEZXBlbmRhbnRzLCBzaGFyZWRfcHJvY2Vzc0RlZmVycmVkVXBkYXRlcyk7XG52YXIgdXRpbHNfYXJyYXlDb250ZW50c01hdGNoID0gZnVuY3Rpb24gKGlzQXJyYXkpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICBpZiAoIWlzQXJyYXkoYSkgfHwgIWlzQXJyYXkoYikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSA9IGEubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICB9KHV0aWxzX2lzQXJyYXkpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX3VwZGF0ZU1vZGVsID0gZnVuY3Rpb24gKGdldFZhbHVlRnJvbUNoZWNrYm94ZXMsIGFycmF5Q29udGVudHNNYXRjaCwgaXNFcXVhbCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChrZXlwYXRoLCBjYXNjYWRlKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWVzLCBkZWZlcnJlZENoZWNrYm94ZXMsIGk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGtleXBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAga2V5cGF0aCA9ICcnO1xuICAgICAgICAgICAgICAgIGNhc2NhZGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29saWRhdGVDaGFuZ2VkVmFsdWVzKHRoaXMsIGtleXBhdGgsIHZhbHVlcyA9IHt9LCBkZWZlcnJlZENoZWNrYm94ZXMgPSBbXSwgY2FzY2FkZSk7XG4gICAgICAgICAgICBpZiAoaSA9IGRlZmVycmVkQ2hlY2tib3hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXBhdGggPSBkZWZlcnJlZENoZWNrYm94ZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc1trZXlwYXRoXSA9IGdldFZhbHVlRnJvbUNoZWNrYm94ZXModGhpcywga2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXQodmFsdWVzKTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gY29uc29saWRhdGVDaGFuZ2VkVmFsdWVzKHJhY3RpdmUsIGtleXBhdGgsIHZhbHVlcywgZGVmZXJyZWRDaGVja2JveGVzLCBjYXNjYWRlKSB7XG4gICAgICAgICAgICB2YXIgYmluZGluZ3MsIGNoaWxkRGVwcywgaSwgYmluZGluZywgb2xkVmFsdWUsIG5ld1ZhbHVlO1xuICAgICAgICAgICAgYmluZGluZ3MgPSByYWN0aXZlLl90d293YXlCaW5kaW5nc1trZXlwYXRoXTtcbiAgICAgICAgICAgIGlmIChiaW5kaW5ncykge1xuICAgICAgICAgICAgICAgIGkgPSBiaW5kaW5ncy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBiaW5kaW5nID0gYmluZGluZ3NbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChiaW5kaW5nLnJhZGlvTmFtZSAmJiAhYmluZGluZy5ub2RlLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChiaW5kaW5nLmNoZWNrYm94TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJpbmRpbmcuY2hhbmdlZCgpICYmICFkZWZlcnJlZENoZWNrYm94ZXNba2V5cGF0aF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZENoZWNrYm94ZXNba2V5cGF0aF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkQ2hlY2tib3hlc1tkZWZlcnJlZENoZWNrYm94ZXMubGVuZ3RoXSA9IGtleXBhdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZSA9IGJpbmRpbmcuYXR0ci52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBiaW5kaW5nLnZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJheUNvbnRlbnRzTWF0Y2gob2xkVmFsdWUsIG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0VxdWFsKG9sZFZhbHVlLCBuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlc1trZXlwYXRoXSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjYXNjYWRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hpbGREZXBzID0gcmFjdGl2ZS5fZGVwc01hcFtrZXlwYXRoXTtcbiAgICAgICAgICAgIGlmIChjaGlsZERlcHMpIHtcbiAgICAgICAgICAgICAgICBpID0gY2hpbGREZXBzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGlkYXRlQ2hhbmdlZFZhbHVlcyhyYWN0aXZlLCBjaGlsZERlcHNbaV0sIHZhbHVlcywgZGVmZXJyZWRDaGVja2JveGVzLCBjYXNjYWRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KHNoYXJlZF9nZXRWYWx1ZUZyb21DaGVja2JveGVzLCB1dGlsc19hcnJheUNvbnRlbnRzTWF0Y2gsIHV0aWxzX2lzRXF1YWwpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX2FuaW1hdGVfcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgKGZ1bmN0aW9uICh2ZW5kb3JzLCBsYXN0VGltZSwgd2luZG93KSB7XG4gICAgICAgICAgICB2YXIgeCwgc2V0VGltZW91dDtcbiAgICAgICAgICAgIGlmICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK3gpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0gKyAnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQ7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3VyclRpbWUsIHRpbWVUb0NhbGwsIGlkO1xuICAgICAgICAgICAgICAgICAgICBjdXJyVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpO1xuICAgICAgICAgICAgICAgICAgICB9LCB0aW1lVG9DYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KFtcbiAgICAgICAgICAgICdtcycsXG4gICAgICAgICAgICAnbW96JyxcbiAgICAgICAgICAgICd3ZWJraXQnLFxuICAgICAgICAgICAgJ28nXG4gICAgICAgIF0sIDAsIHdpbmRvdykpO1xuICAgICAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTtcbiAgICB9KCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfYW5pbWF0ZV9hbmltYXRpb25zID0gZnVuY3Rpb24gKHJBRikge1xuICAgICAgICBcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHZhciBhbmltYXRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGksIGFuaW1hdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24gPSBxdWV1ZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYW5pbWF0aW9uLnRpY2soKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlLnNwbGljZShpLS0sIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJBRihhbmltYXRpb25zLnRpY2spO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9ucy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGFkZDogZnVuY3Rpb24gKGFuaW1hdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZVtxdWV1ZS5sZW5ndGhdID0gYW5pbWF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWFuaW1hdGlvbnMucnVubmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9ucy5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbnMudGljaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhYm9ydDogZnVuY3Rpb24gKGtleXBhdGgsIHJvb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBxdWV1ZS5sZW5ndGgsIGFuaW1hdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uID0gcXVldWVbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uLnJvb3QgPT09IHJvb3QgJiYgYW5pbWF0aW9uLmtleXBhdGggPT09IGtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24uc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGFuaW1hdGlvbnM7XG4gICAgfShSYWN0aXZlX3Byb3RvdHlwZV9hbmltYXRlX3JlcXVlc3RBbmltYXRpb25GcmFtZSk7XG52YXIgdXRpbHNfd2FybiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgY29uc29sZS53YXJuLmFwcGx5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciB1dGlsc19pc051bWVyaWMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRoaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQodGhpbmcpKSAmJiBpc0Zpbml0ZSh0aGluZyk7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHNoYXJlZF9pbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uIChpc0FycmF5LCBpc09iamVjdCwgaXNOdW1lcmljKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgaW50ZXJwb2xhdGUgPSBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgICAgICAgICAgIGlmIChpc051bWVyaWMoZnJvbSkgJiYgaXNOdW1lcmljKHRvKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYWtlTnVtYmVySW50ZXJwb2xhdG9yKCtmcm9tLCArdG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQXJyYXkoZnJvbSkgJiYgaXNBcnJheSh0bykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFrZUFycmF5SW50ZXJwb2xhdG9yKGZyb20sIHRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc09iamVjdChmcm9tKSAmJiBpc09iamVjdCh0bykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFrZU9iamVjdEludGVycG9sYXRvcihmcm9tLCB0byk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0bztcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBpbnRlcnBvbGF0ZTtcbiAgICAgICAgZnVuY3Rpb24gbWFrZU51bWJlckludGVycG9sYXRvcihmcm9tLCB0bykge1xuICAgICAgICAgICAgdmFyIGRlbHRhID0gdG8gLSBmcm9tO1xuICAgICAgICAgICAgaWYgKCFkZWx0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmcm9tO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJvbSArIHQgKiBkZWx0YTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbWFrZUFycmF5SW50ZXJwb2xhdG9yKGZyb20sIHRvKSB7XG4gICAgICAgICAgICB2YXIgaW50ZXJtZWRpYXRlLCBpbnRlcnBvbGF0b3JzLCBsZW4sIGk7XG4gICAgICAgICAgICBpbnRlcm1lZGlhdGUgPSBbXTtcbiAgICAgICAgICAgIGludGVycG9sYXRvcnMgPSBbXTtcbiAgICAgICAgICAgIGkgPSBsZW4gPSBNYXRoLm1pbihmcm9tLmxlbmd0aCwgdG8ubGVuZ3RoKTtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBpbnRlcnBvbGF0b3JzW2ldID0gaW50ZXJwb2xhdGUoZnJvbVtpXSwgdG9baV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gbGVuOyBpIDwgZnJvbS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGludGVybWVkaWF0ZVtpXSA9IGZyb21baV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSBsZW47IGkgPCB0by5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGludGVybWVkaWF0ZVtpXSA9IHRvW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBsZW47XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBpbnRlcm1lZGlhdGVbaV0gPSBpbnRlcnBvbGF0b3JzW2ldKHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJtZWRpYXRlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBtYWtlT2JqZWN0SW50ZXJwb2xhdG9yKGZyb20sIHRvKSB7XG4gICAgICAgICAgICB2YXIgcHJvcGVydGllcyA9IFtdLCBsZW4sIGludGVycG9sYXRvcnMsIGludGVybWVkaWF0ZSwgcHJvcDtcbiAgICAgICAgICAgIGludGVybWVkaWF0ZSA9IHt9O1xuICAgICAgICAgICAgaW50ZXJwb2xhdG9ycyA9IHt9O1xuICAgICAgICAgICAgZm9yIChwcm9wIGluIGZyb20pIHtcbiAgICAgICAgICAgICAgICBpZiAoZnJvbS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG8uaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbcHJvcGVydGllcy5sZW5ndGhdID0gcHJvcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVycG9sYXRvcnNbcHJvcF0gPSBpbnRlcnBvbGF0ZShmcm9tW3Byb3BdLCB0b1twcm9wXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcm1lZGlhdGVbcHJvcF0gPSBmcm9tW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChwcm9wIGluIHRvKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvLmhhc093blByb3BlcnR5KHByb3ApICYmICFmcm9tLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVybWVkaWF0ZVtwcm9wXSA9IHRvW3Byb3BdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxlbiA9IHByb3BlcnRpZXMubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBsZW4sIHByb3A7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9wID0gcHJvcGVydGllc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJtZWRpYXRlW3Byb3BdID0gaW50ZXJwb2xhdG9yc1twcm9wXSh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVybWVkaWF0ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KHV0aWxzX2lzQXJyYXksIHV0aWxzX2lzT2JqZWN0LCB1dGlsc19pc051bWVyaWMpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX2FuaW1hdGVfQW5pbWF0aW9uID0gZnVuY3Rpb24gKHdhcm4sIGludGVycG9sYXRlKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgQW5pbWF0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBrZXk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbnRlcnBvbGF0b3IgPSBpbnRlcnBvbGF0ZSh0aGlzLmZyb20sIHRoaXMudG8pO1xuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgQW5pbWF0aW9uLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHRpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxhcHNlZCwgdCwgdmFsdWUsIHRpbWVOb3csIGluZGV4LCBrZXlwYXRoO1xuICAgICAgICAgICAgICAgIGtleXBhdGggPSB0aGlzLmtleXBhdGg7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucnVubmluZykge1xuICAgICAgICAgICAgICAgICAgICB0aW1lTm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgZWxhcHNlZCA9IHRpbWVOb3cgLSB0aGlzLnN0YXJ0VGltZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsYXBzZWQgPj0gdGhpcy5kdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleXBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3Quc2V0KGtleXBhdGgsIHRoaXMudG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RlcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RlcCgxLCB0aGlzLnRvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZSgxLCB0aGlzLnRvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gdGhpcy5yb290Ll9hbmltYXRpb25zLmluZGV4T2YodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FybignQW5pbWF0aW9uIHdhcyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdC5fYW5pbWF0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdCA9IHRoaXMuZWFzaW5nID8gdGhpcy5lYXNpbmcoZWxhcHNlZCAvIHRoaXMuZHVyYXRpb24pIDogZWxhcHNlZCAvIHRoaXMuZHVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlwYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuaW50ZXJwb2xhdG9yKHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290LnNldChrZXlwYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RlcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwKHQsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzLnJvb3QuX2FuaW1hdGlvbnMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHdhcm4oJ0FuaW1hdGlvbiB3YXMgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5fYW5pbWF0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQW5pbWF0aW9uO1xuICAgIH0odXRpbHNfd2Fybiwgc2hhcmVkX2ludGVycG9sYXRlKTtcbnZhciByZWdpc3RyaWVzX2Vhc2luZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsaW5lYXI6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVhc2VJbjogZnVuY3Rpb24gKHBvcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnBvdyhwb3MsIDMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVhc2VPdXQ6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5wb3cocG9zIC0gMSwgMykgKyAxO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVhc2VJbk91dDogZnVuY3Rpb24gKHBvcykge1xuICAgICAgICAgICAgICAgIGlmICgocG9zIC89IDAuNSkgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdyhwb3MsIDMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogKE1hdGgucG93KHBvcyAtIDIsIDMpICsgMik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX2FuaW1hdGVfX2FuaW1hdGUgPSBmdW5jdGlvbiAoaXNFcXVhbCwgYW5pbWF0aW9ucywgQW5pbWF0aW9uLCBlYXNpbmdSZWdpc3RyeSkge1xuICAgICAgICBcbiAgICAgICAgdmFyIG5vQW5pbWF0aW9uID0ge1xuICAgICAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGtleXBhdGgsIHRvLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgaywgYW5pbWF0aW9uLCBhbmltYXRpb25zLCBlYXNpbmcsIGR1cmF0aW9uLCBzdGVwLCBjb21wbGV0ZSwgbWFrZVZhbHVlQ29sbGVjdG9yLCBjdXJyZW50VmFsdWVzLCBjb2xsZWN0VmFsdWUsIGR1bW15LCBkdW1teU9wdGlvbnM7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGtleXBhdGggPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHRvIHx8IHt9O1xuICAgICAgICAgICAgICAgIGVhc2luZyA9IG9wdGlvbnMuZWFzaW5nO1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbjtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25zID0gW107XG4gICAgICAgICAgICAgICAgc3RlcCA9IG9wdGlvbnMuc3RlcDtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSA9IG9wdGlvbnMuY29tcGxldGU7XG4gICAgICAgICAgICAgICAgaWYgKHN0ZXAgfHwgY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFZhbHVlcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnN0ZXAgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbXBsZXRlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgbWFrZVZhbHVlQ29sbGVjdG9yID0gZnVuY3Rpb24gKGtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWVzW2tleXBhdGhdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGsgaW4ga2V5cGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5cGF0aC5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXAgfHwgY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0VmFsdWUgPSBtYWtlVmFsdWVDb2xsZWN0b3Ioayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWFzaW5nOiBlYXNpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zdGVwID0gY29sbGVjdFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb21wbGV0ZSA9IGNvbGxlY3RWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25zW2FuaW1hdGlvbnMubGVuZ3RoXSA9IGFuaW1hdGUodGhpcywgaywga2V5cGF0aFtrXSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0ZXAgfHwgY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZHVtbXlPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWFzaW5nOiBlYXNpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1bW15T3B0aW9ucy5zdGVwID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwKHQsIGN1cnJlbnRWYWx1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1bW15T3B0aW9ucy5jb21wbGV0ZSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGUodCwgY3VycmVudFZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbnNbYW5pbWF0aW9ucy5sZW5ndGhdID0gZHVtbXkgPSBhbmltYXRlKHRoaXMsIG51bGwsIG51bGwsIGR1bW15T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChhbmltYXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbnMucG9wKCkuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR1bW15KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVtbXkuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICAgICAgYW5pbWF0aW9uID0gYW5pbWF0ZSh0aGlzLCBrZXlwYXRoLCB0bywgb3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBhbmltYXRlKHJvb3QsIGtleXBhdGgsIHRvLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgZWFzaW5nLCBkdXJhdGlvbiwgYW5pbWF0aW9uLCBmcm9tO1xuICAgICAgICAgICAgaWYgKGtleXBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmcm9tID0gcm9vdC5nZXQoa2V5cGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbmltYXRpb25zLmFib3J0KGtleXBhdGgsIHJvb3QpO1xuICAgICAgICAgICAgaWYgKGlzRXF1YWwoZnJvbSwgdG8pKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb21wbGV0ZSgxLCBvcHRpb25zLnRvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vQW5pbWF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZWFzaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmVhc2luZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBlYXNpbmcgPSBvcHRpb25zLmVhc2luZztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAocm9vdC5lYXNpbmcgJiYgcm9vdC5lYXNpbmdbb3B0aW9ucy5lYXNpbmddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNpbmcgPSByb290LmVhc2luZ1tvcHRpb25zLmVhc2luZ107XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNpbmcgPSBlYXNpbmdSZWdpc3RyeVtvcHRpb25zLmVhc2luZ107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlYXNpbmcgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZWFzaW5nID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gPT09IHVuZGVmaW5lZCA/IDQwMCA6IG9wdGlvbnMuZHVyYXRpb247XG4gICAgICAgICAgICBhbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICBrZXlwYXRoOiBrZXlwYXRoLFxuICAgICAgICAgICAgICAgIGZyb206IGZyb20sXG4gICAgICAgICAgICAgICAgdG86IHRvLFxuICAgICAgICAgICAgICAgIHJvb3Q6IHJvb3QsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgIGVhc2luZzogZWFzaW5nLFxuICAgICAgICAgICAgICAgIHN0ZXA6IG9wdGlvbnMuc3RlcCxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogb3B0aW9ucy5jb21wbGV0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhbmltYXRpb25zLmFkZChhbmltYXRpb24pO1xuICAgICAgICAgICAgcm9vdC5fYW5pbWF0aW9uc1tyb290Ll9hbmltYXRpb25zLmxlbmd0aF0gPSBhbmltYXRpb247XG4gICAgICAgICAgICByZXR1cm4gYW5pbWF0aW9uO1xuICAgICAgICB9XG4gICAgfSh1dGlsc19pc0VxdWFsLCBSYWN0aXZlX3Byb3RvdHlwZV9hbmltYXRlX2FuaW1hdGlvbnMsIFJhY3RpdmVfcHJvdG90eXBlX2FuaW1hdGVfQW5pbWF0aW9uLCByZWdpc3RyaWVzX2Vhc2luZyk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcywgbGlzdGVuZXJzLCBuO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBldmVudE5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChuIGluIGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnROYW1lLmhhc093blByb3BlcnR5KG4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aF0gPSB0aGlzLm9uKG4sIGV2ZW50TmFtZVtuXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5wb3AoKS5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3N1YnNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N1YnNbZXZlbnROYW1lXSA9IFtjYWxsYmFja107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N1YnNbZXZlbnROYW1lXS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2FuY2VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub2ZmKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX29mZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIHN1YnNjcmliZXJzLCBpbmRleDtcbiAgICAgICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGV2ZW50TmFtZSBpbiB0aGlzLl9zdWJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fc3Vic1tldmVudE5hbWVdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3Vic1tldmVudE5hbWVdID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3Vic2NyaWJlcnMgPSB0aGlzLl9zdWJzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICBpZiAoc3Vic2NyaWJlcnMpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IHN1YnNjcmliZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHNoYXJlZF9yZWdpc3RlckRlcGVuZGFudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGVwZW5kYW50KSB7XG4gICAgICAgICAgICB2YXIgZGVwc0J5S2V5cGF0aCwgZGVwcywga2V5cywgcGFyZW50S2V5cGF0aCwgbWFwLCByYWN0aXZlLCBrZXlwYXRoLCBwcmlvcml0eTtcbiAgICAgICAgICAgIHJhY3RpdmUgPSBkZXBlbmRhbnQucm9vdDtcbiAgICAgICAgICAgIGtleXBhdGggPSBkZXBlbmRhbnQua2V5cGF0aDtcbiAgICAgICAgICAgIHByaW9yaXR5ID0gZGVwZW5kYW50LnByaW9yaXR5O1xuICAgICAgICAgICAgZGVwc0J5S2V5cGF0aCA9IHJhY3RpdmUuX2RlcHNbcHJpb3JpdHldIHx8IChyYWN0aXZlLl9kZXBzW3ByaW9yaXR5XSA9IHt9KTtcbiAgICAgICAgICAgIGRlcHMgPSBkZXBzQnlLZXlwYXRoW2tleXBhdGhdIHx8IChkZXBzQnlLZXlwYXRoW2tleXBhdGhdID0gW10pO1xuICAgICAgICAgICAgZGVwc1tkZXBzLmxlbmd0aF0gPSBkZXBlbmRhbnQ7XG4gICAgICAgICAgICBkZXBlbmRhbnQucmVnaXN0ZXJlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIWtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXlzID0ga2V5cGF0aC5zcGxpdCgnLicpO1xuICAgICAgICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAga2V5cy5wb3AoKTtcbiAgICAgICAgICAgICAgICBwYXJlbnRLZXlwYXRoID0ga2V5cy5qb2luKCcuJyk7XG4gICAgICAgICAgICAgICAgbWFwID0gcmFjdGl2ZS5fZGVwc01hcFtwYXJlbnRLZXlwYXRoXSB8fCAocmFjdGl2ZS5fZGVwc01hcFtwYXJlbnRLZXlwYXRoXSA9IFtdKTtcbiAgICAgICAgICAgICAgICBpZiAobWFwW2tleXBhdGhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwW2tleXBhdGhdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbWFwW21hcC5sZW5ndGhdID0ga2V5cGF0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbWFwW2tleXBhdGhdICs9IDE7XG4gICAgICAgICAgICAgICAga2V5cGF0aCA9IHBhcmVudEtleXBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHNoYXJlZF91bnJlZ2lzdGVyRGVwZW5kYW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkZXBlbmRhbnQpIHtcbiAgICAgICAgICAgIHZhciBkZXBzLCBpbmRleCwga2V5cywgcGFyZW50S2V5cGF0aCwgbWFwLCByYWN0aXZlLCBrZXlwYXRoLCBwcmlvcml0eTtcbiAgICAgICAgICAgIHJhY3RpdmUgPSBkZXBlbmRhbnQucm9vdDtcbiAgICAgICAgICAgIGtleXBhdGggPSBkZXBlbmRhbnQua2V5cGF0aDtcbiAgICAgICAgICAgIHByaW9yaXR5ID0gZGVwZW5kYW50LnByaW9yaXR5O1xuICAgICAgICAgICAgZGVwcyA9IHJhY3RpdmUuX2RlcHNbcHJpb3JpdHldW2tleXBhdGhdO1xuICAgICAgICAgICAgaW5kZXggPSBkZXBzLmluZGV4T2YoZGVwZW5kYW50KTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEgfHwgIWRlcGVuZGFudC5yZWdpc3RlcmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0ZWQgdG8gcmVtb3ZlIGEgZGVwZW5kYW50IHRoYXQgd2FzIG5vIGxvbmdlciByZWdpc3RlcmVkISBUaGlzIHNob3VsZCBub3QgaGFwcGVuLiBJZiB5b3UgYXJlIHNlZWluZyB0aGlzIGJ1ZyBpbiBkZXZlbG9wbWVudCBwbGVhc2UgcmFpc2UgYW4gaXNzdWUgYXQgaHR0cHM6Ly9naXRodWIuY29tL1JhY3RpdmVKUy9SYWN0aXZlL2lzc3VlcyAtIHRoYW5rcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVwcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZGVwZW5kYW50LnJlZ2lzdGVyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICgha2V5cGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleXMgPSBrZXlwYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBrZXlzLnBvcCgpO1xuICAgICAgICAgICAgICAgIHBhcmVudEtleXBhdGggPSBrZXlzLmpvaW4oJy4nKTtcbiAgICAgICAgICAgICAgICBtYXAgPSByYWN0aXZlLl9kZXBzTWFwW3BhcmVudEtleXBhdGhdO1xuICAgICAgICAgICAgICAgIG1hcFtrZXlwYXRoXSAtPSAxO1xuICAgICAgICAgICAgICAgIGlmICghbWFwW2tleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcC5zcGxpY2UobWFwLmluZGV4T2Yoa2V5cGF0aCksIDEpO1xuICAgICAgICAgICAgICAgICAgICBtYXBba2V5cGF0aF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGtleXBhdGggPSBwYXJlbnRLZXlwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9vYnNlcnZlX09ic2VydmVyID0gZnVuY3Rpb24gKGlzRXF1YWwpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBPYnNlcnZlciA9IGZ1bmN0aW9uIChyYWN0aXZlLCBrZXlwYXRoLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5yb290ID0gcmFjdGl2ZTtcbiAgICAgICAgICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLmRlZmVyID0gb3B0aW9ucy5kZWZlcjtcbiAgICAgICAgICAgIHRoaXMuZGVidWcgPSBvcHRpb25zLmRlYnVnO1xuICAgICAgICAgICAgdGhpcy5wcm94eSA9IHtcbiAgICAgICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWFsbHlVcGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5wcmlvcml0eSA9IDA7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQgPSBvcHRpb25zICYmIG9wdGlvbnMuY29udGV4dCA/IG9wdGlvbnMuY29udGV4dCA6IHJhY3RpdmU7XG4gICAgICAgIH07XG4gICAgICAgIE9ic2VydmVyLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW1tZWRpYXRlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnJvb3QuZ2V0KHRoaXMua2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlZmVyICYmIHRoaXMucmVhZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290Ll9kZWZlcnJlZC5vYnNlcnZlcnMucHVzaCh0aGlzLnByb3h5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnJlYWxseVVwZGF0ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlYWxseVVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBvbGRWYWx1ZSwgbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy5yb290LmdldCh0aGlzLmtleXBhdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51cGRhdGluZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICghaXNFcXVhbChuZXdWYWx1ZSwgb2xkVmFsdWUpIHx8ICF0aGlzLnJlYWR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy5jb250ZXh0LCBuZXdWYWx1ZSwgb2xkVmFsdWUsIHRoaXMua2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcgfHwgdGhpcy5yb290LmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIE9ic2VydmVyO1xuICAgIH0odXRpbHNfaXNFcXVhbCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfb2JzZXJ2ZV9nZXRQYXR0ZXJuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyYWN0aXZlLCBwYXR0ZXJuKSB7XG4gICAgICAgICAgICB2YXIga2V5cywga2V5LCB2YWx1ZXMsIHRvR2V0LCBuZXdUb0dldCwgZXhwYW5kLCBjb25jYXRlbmF0ZTtcbiAgICAgICAgICAgIGtleXMgPSBwYXR0ZXJuLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICB0b0dldCA9IFtdO1xuICAgICAgICAgICAgZXhwYW5kID0gZnVuY3Rpb24gKGtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUsIGtleTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHJhY3RpdmUuX3dyYXBwZWRba2V5cGF0aF0gPyByYWN0aXZlLl93cmFwcGVkW2tleXBhdGhdLmdldCgpIDogcmFjdGl2ZS5nZXQoa2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VG9HZXQucHVzaChrZXlwYXRoICsgJy4nICsga2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uY2F0ZW5hdGUgPSBmdW5jdGlvbiAoa2V5cGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXlwYXRoICsgJy4nICsga2V5O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdoaWxlIChrZXkgPSBrZXlzLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnKicpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VG9HZXQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdG9HZXQuZm9yRWFjaChleHBhbmQpO1xuICAgICAgICAgICAgICAgICAgICB0b0dldCA9IG5ld1RvR2V0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdG9HZXRbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvR2V0WzBdID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9HZXQgPSB0b0dldC5tYXAoY29uY2F0ZW5hdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWVzID0ge307XG4gICAgICAgICAgICB0b0dldC5mb3JFYWNoKGZ1bmN0aW9uIChrZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzW2tleXBhdGhdID0gcmFjdGl2ZS5nZXQoa2V5cGF0aCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX29ic2VydmVfUGF0dGVybk9ic2VydmVyID0gZnVuY3Rpb24gKGlzRXF1YWwsIGdldFBhdHRlcm4pIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBQYXR0ZXJuT2JzZXJ2ZXIsIHdpbGRjYXJkID0gL1xcKi87XG4gICAgICAgIFBhdHRlcm5PYnNlcnZlciA9IGZ1bmN0aW9uIChyYWN0aXZlLCBrZXlwYXRoLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5yb290ID0gcmFjdGl2ZTtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgICAgIHRoaXMuZGVmZXIgPSBvcHRpb25zLmRlZmVyO1xuICAgICAgICAgICAgdGhpcy5kZWJ1ZyA9IG9wdGlvbnMuZGVidWc7XG4gICAgICAgICAgICB0aGlzLmtleXBhdGggPSBrZXlwYXRoO1xuICAgICAgICAgICAgdGhpcy5yZWdleCA9IG5ldyBSZWdFeHAoJ14nICsga2V5cGF0aC5yZXBsYWNlKC9cXC4vZywgJ1xcXFwuJykucmVwbGFjZSgvXFwqL2csICdbXlxcXFwuXSsnKSArICckJyk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlcyA9IHt9O1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVmZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3hpZXMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHJpb3JpdHkgPSAncGF0dGVybic7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQgPSBvcHRpb25zICYmIG9wdGlvbnMuY29udGV4dCA/IG9wdGlvbnMuY29udGV4dCA6IHJhY3RpdmU7XG4gICAgICAgIH07XG4gICAgICAgIFBhdHRlcm5PYnNlcnZlci5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlcywga2V5cGF0aDtcbiAgICAgICAgICAgICAgICB2YWx1ZXMgPSBnZXRQYXR0ZXJuKHRoaXMucm9vdCwgdGhpcy5rZXlwYXRoKTtcbiAgICAgICAgICAgICAgICBpZiAoaW1tZWRpYXRlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGtleXBhdGggaW4gdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KGtleXBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoa2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcyA9IHZhbHVlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoa2V5cGF0aCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZXM7XG4gICAgICAgICAgICAgICAgaWYgKHdpbGRjYXJkLnRlc3Qoa2V5cGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzID0gZ2V0UGF0dGVybih0aGlzLnJvb3QsIGtleXBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGtleXBhdGggaW4gdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KGtleXBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoa2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWZlciAmJiB0aGlzLnJlYWR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdC5fZGVmZXJyZWQub2JzZXJ2ZXJzLnB1c2godGhpcy5nZXRQcm94eShrZXlwYXRoKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5yZWFsbHlVcGRhdGUoa2V5cGF0aCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVhbGx5VXBkYXRlOiBmdW5jdGlvbiAoa2V5cGF0aCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMucm9vdC5nZXQoa2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXBkYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNba2V5cGF0aF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRXF1YWwodmFsdWUsIHRoaXMudmFsdWVzW2tleXBhdGhdKSB8fCAhdGhpcy5yZWFkeSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjay5jYWxsKHRoaXMuY29udGV4dCwgdmFsdWUsIHRoaXMudmFsdWVzW2tleXBhdGhdLCBrZXlwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1ZyB8fCB0aGlzLnJvb3QuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNba2V5cGF0aF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFByb3h5OiBmdW5jdGlvbiAoa2V5cGF0aCkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucHJveGllc1trZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3hpZXNba2V5cGF0aF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlYWxseVVwZGF0ZShrZXlwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJveGllc1trZXlwYXRoXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFBhdHRlcm5PYnNlcnZlcjtcbiAgICB9KHV0aWxzX2lzRXF1YWwsIFJhY3RpdmVfcHJvdG90eXBlX29ic2VydmVfZ2V0UGF0dGVybik7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfb2JzZXJ2ZV9nZXRPYnNlcnZlckZhY2FkZSA9IGZ1bmN0aW9uIChub3JtYWxpc2VLZXlwYXRoLCByZWdpc3RlckRlcGVuZGFudCwgdW5yZWdpc3RlckRlcGVuZGFudCwgT2JzZXJ2ZXIsIFBhdHRlcm5PYnNlcnZlcikge1xuICAgICAgICBcbiAgICAgICAgdmFyIHdpbGRjYXJkID0gL1xcKi8sIGVtcHR5T2JqZWN0ID0ge307XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBnZXRPYnNlcnZlckZhY2FkZShyYWN0aXZlLCBrZXlwYXRoLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIG9ic2VydmVyLCBpc1BhdHRlcm5PYnNlcnZlcjtcbiAgICAgICAgICAgIGtleXBhdGggPSBub3JtYWxpc2VLZXlwYXRoKGtleXBhdGgpO1xuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwgZW1wdHlPYmplY3Q7XG4gICAgICAgICAgICBpZiAod2lsZGNhcmQudGVzdChrZXlwYXRoKSkge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyID0gbmV3IFBhdHRlcm5PYnNlcnZlcihyYWN0aXZlLCBrZXlwYXRoLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgcmFjdGl2ZS5fcGF0dGVybk9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcbiAgICAgICAgICAgICAgICBpc1BhdHRlcm5PYnNlcnZlciA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyID0gbmV3IE9ic2VydmVyKHJhY3RpdmUsIGtleXBhdGgsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlZ2lzdGVyRGVwZW5kYW50KG9ic2VydmVyKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmluaXQob3B0aW9ucy5pbml0KTtcbiAgICAgICAgICAgIG9ic2VydmVyLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2FuY2VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUGF0dGVybk9ic2VydmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHJhY3RpdmUuX3BhdHRlcm5PYnNlcnZlcnMuaW5kZXhPZihvYnNlcnZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFjdGl2ZS5fcGF0dGVybk9ic2VydmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHVucmVnaXN0ZXJEZXBlbmRhbnQob2JzZXJ2ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSh1dGlsc19ub3JtYWxpc2VLZXlwYXRoLCBzaGFyZWRfcmVnaXN0ZXJEZXBlbmRhbnQsIHNoYXJlZF91bnJlZ2lzdGVyRGVwZW5kYW50LCBSYWN0aXZlX3Byb3RvdHlwZV9vYnNlcnZlX09ic2VydmVyLCBSYWN0aXZlX3Byb3RvdHlwZV9vYnNlcnZlX1BhdHRlcm5PYnNlcnZlcik7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfb2JzZXJ2ZV9fb2JzZXJ2ZSA9IGZ1bmN0aW9uIChpc09iamVjdCwgZ2V0T2JzZXJ2ZXJGYWNhZGUpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBvYnNlcnZlKGtleXBhdGgsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gW10sIGs7XG4gICAgICAgICAgICBpZiAoaXNPYmplY3Qoa2V5cGF0aCkpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgZm9yIChrIGluIGtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleXBhdGguaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0ga2V5cGF0aFtrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyc1tvYnNlcnZlcnMubGVuZ3RoXSA9IGdldE9ic2VydmVyRmFjYWRlKHRoaXMsIGssIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChvYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLnBvcCgpLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBnZXRPYnNlcnZlckZhY2FkZSh0aGlzLCBrZXlwYXRoLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgfSh1dGlsc19pc09iamVjdCwgUmFjdGl2ZV9wcm90b3R5cGVfb2JzZXJ2ZV9nZXRPYnNlcnZlckZhY2FkZSk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfZmlyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgICAgICB2YXIgYXJncywgaSwgbGVuLCBzdWJzY3JpYmVycyA9IHRoaXMuX3N1YnNbZXZlbnROYW1lXTtcbiAgICAgICAgICAgIGlmICghc3Vic2NyaWJlcnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHN1YnNjcmliZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX2ZpbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYWdtZW50LmZpbmQoc2VsZWN0b3IpO1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciB1dGlsc19tYXRjaGVzID0gZnVuY3Rpb24gKGlzQ2xpZW50LCBjcmVhdGVFbGVtZW50KSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZGl2LCBtZXRob2ROYW1lcywgdW5wcmVmaXhlZCwgcHJlZml4ZWQsIHZlbmRvcnMsIGksIGosIG1ha2VGdW5jdGlvbjtcbiAgICAgICAgaWYgKCFpc0NsaWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBtZXRob2ROYW1lcyA9IFtcbiAgICAgICAgICAgICdtYXRjaGVzJyxcbiAgICAgICAgICAgICdtYXRjaGVzU2VsZWN0b3InXG4gICAgICAgIF07XG4gICAgICAgIHZlbmRvcnMgPSBbXG4gICAgICAgICAgICAnbycsXG4gICAgICAgICAgICAnbXMnLFxuICAgICAgICAgICAgJ21veicsXG4gICAgICAgICAgICAnd2Via2l0J1xuICAgICAgICBdO1xuICAgICAgICBtYWtlRnVuY3Rpb24gPSBmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChub2RlLCBzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlW21ldGhvZE5hbWVdKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIGkgPSBtZXRob2ROYW1lcy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIHVucHJlZml4ZWQgPSBtZXRob2ROYW1lc1tpXTtcbiAgICAgICAgICAgIGlmIChkaXZbdW5wcmVmaXhlZF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFrZUZ1bmN0aW9uKHVucHJlZml4ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaiA9IHZlbmRvcnMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICAgICAgICAgIHByZWZpeGVkID0gdmVuZG9yc1tpXSArIHVucHJlZml4ZWQuc3Vic3RyKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyB1bnByZWZpeGVkLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgICBpZiAoZGl2W3ByZWZpeGVkXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFrZUZ1bmN0aW9uKHByZWZpeGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChub2RlLCBzZWxlY3Rvcikge1xuICAgICAgICAgICAgdmFyIG5vZGVzLCBpO1xuICAgICAgICAgICAgbm9kZXMgPSAobm9kZS5wYXJlbnROb2RlIHx8IG5vZGUuZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgaSA9IG5vZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZXNbaV0gPT09IG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX2lzQ2xpZW50LCB1dGlsc19jcmVhdGVFbGVtZW50KTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfbWFrZVF1ZXJ5X3Rlc3QgPSBmdW5jdGlvbiAobWF0Y2hlcykge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpdGVtLCBub0RpcnR5KSB7XG4gICAgICAgICAgICB2YXIgaXRlbU1hdGNoZXMgPSB0aGlzLl9pc0NvbXBvbmVudFF1ZXJ5ID8gIXRoaXMuc2VsZWN0b3IgfHwgaXRlbS5uYW1lID09PSB0aGlzLnNlbGVjdG9yIDogbWF0Y2hlcyhpdGVtLm5vZGUsIHRoaXMuc2VsZWN0b3IpO1xuICAgICAgICAgICAgaWYgKGl0ZW1NYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKGl0ZW0ubm9kZSB8fCBpdGVtLmluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICBpZiAoIW5vRGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFrZURpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0odXRpbHNfbWF0Y2hlcyk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX21ha2VRdWVyeV9jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGxpdmVRdWVyaWVzLCBzZWxlY3RvciwgaW5kZXg7XG4gICAgICAgICAgICBsaXZlUXVlcmllcyA9IHRoaXMuX3Jvb3RbdGhpcy5faXNDb21wb25lbnRRdWVyeSA/ICdsaXZlQ29tcG9uZW50UXVlcmllcycgOiAnbGl2ZVF1ZXJpZXMnXTtcbiAgICAgICAgICAgIHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvcjtcbiAgICAgICAgICAgIGluZGV4ID0gbGl2ZVF1ZXJpZXMuaW5kZXhPZihzZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbGl2ZVF1ZXJpZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBsaXZlUXVlcmllc1tzZWxlY3Rvcl0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfbWFrZVF1ZXJ5X3NvcnRCeUl0ZW1Qb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgdmFyIGFuY2VzdHJ5QSwgYW5jZXN0cnlCLCBvbGRlc3RBLCBvbGRlc3RCLCBtdXR1YWxBbmNlc3RvciwgaW5kZXhBLCBpbmRleEIsIGZyYWdtZW50cywgZnJhZ21lbnRBLCBmcmFnbWVudEI7XG4gICAgICAgICAgICBhbmNlc3RyeUEgPSBnZXRBbmNlc3RyeShhLmNvbXBvbmVudCB8fCBhLl9yYWN0aXZlLnByb3h5KTtcbiAgICAgICAgICAgIGFuY2VzdHJ5QiA9IGdldEFuY2VzdHJ5KGIuY29tcG9uZW50IHx8IGIuX3JhY3RpdmUucHJveHkpO1xuICAgICAgICAgICAgb2xkZXN0QSA9IGFuY2VzdHJ5QVthbmNlc3RyeUEubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBvbGRlc3RCID0gYW5jZXN0cnlCW2FuY2VzdHJ5Qi5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIHdoaWxlIChvbGRlc3RBICYmIG9sZGVzdEEgPT09IG9sZGVzdEIpIHtcbiAgICAgICAgICAgICAgICBhbmNlc3RyeUEucG9wKCk7XG4gICAgICAgICAgICAgICAgYW5jZXN0cnlCLnBvcCgpO1xuICAgICAgICAgICAgICAgIG11dHVhbEFuY2VzdG9yID0gb2xkZXN0QTtcbiAgICAgICAgICAgICAgICBvbGRlc3RBID0gYW5jZXN0cnlBW2FuY2VzdHJ5QS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBvbGRlc3RCID0gYW5jZXN0cnlCW2FuY2VzdHJ5Qi5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9sZGVzdEEgPSBvbGRlc3RBLmNvbXBvbmVudCB8fCBvbGRlc3RBO1xuICAgICAgICAgICAgb2xkZXN0QiA9IG9sZGVzdEIuY29tcG9uZW50IHx8IG9sZGVzdEI7XG4gICAgICAgICAgICBmcmFnbWVudEEgPSBvbGRlc3RBLnBhcmVudEZyYWdtZW50O1xuICAgICAgICAgICAgZnJhZ21lbnRCID0gb2xkZXN0Qi5wYXJlbnRGcmFnbWVudDtcbiAgICAgICAgICAgIGlmIChmcmFnbWVudEEgPT09IGZyYWdtZW50Qikge1xuICAgICAgICAgICAgICAgIGluZGV4QSA9IGZyYWdtZW50QS5pdGVtcy5pbmRleE9mKG9sZGVzdEEpO1xuICAgICAgICAgICAgICAgIGluZGV4QiA9IGZyYWdtZW50Qi5pdGVtcy5pbmRleE9mKG9sZGVzdEIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleEEgLSBpbmRleEIgfHwgYW5jZXN0cnlBLmxlbmd0aCAtIGFuY2VzdHJ5Qi5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZnJhZ21lbnRzID0gbXV0dWFsQW5jZXN0b3IuZnJhZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhBID0gZnJhZ21lbnRzLmluZGV4T2YoZnJhZ21lbnRBKTtcbiAgICAgICAgICAgICAgICBpbmRleEIgPSBmcmFnbWVudHMuaW5kZXhPZihmcmFnbWVudEIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleEEgLSBpbmRleEIgfHwgYW5jZXN0cnlBLmxlbmd0aCAtIGFuY2VzdHJ5Qi5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuIHVuZXhwZWN0ZWQgY29uZGl0aW9uIHdhcyBtZXQgd2hpbGUgY29tcGFyaW5nIHRoZSBwb3NpdGlvbiBvZiB0d28gY29tcG9uZW50cy4gUGxlYXNlIGZpbGUgYW4gaXNzdWUgYXQgaHR0cHM6Ly9naXRodWIuY29tL1JhY3RpdmVKUy9SYWN0aXZlL2lzc3VlcyAtIHRoYW5rcyEnKTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0UGFyZW50KGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnRGcmFnbWVudDtcbiAgICAgICAgICAgIGlmIChwYXJlbnRGcmFnbWVudCA9IGl0ZW0ucGFyZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50RnJhZ21lbnQub3duZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXRlbS5jb21wb25lbnQgJiYgKHBhcmVudEZyYWdtZW50ID0gaXRlbS5jb21wb25lbnQucGFyZW50RnJhZ21lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudEZyYWdtZW50Lm93bmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldEFuY2VzdHJ5KGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBhbmNlc3RyeSwgYW5jZXN0b3I7XG4gICAgICAgICAgICBhbmNlc3RyeSA9IFtpdGVtXTtcbiAgICAgICAgICAgIGFuY2VzdG9yID0gZ2V0UGFyZW50KGl0ZW0pO1xuICAgICAgICAgICAgd2hpbGUgKGFuY2VzdG9yKSB7XG4gICAgICAgICAgICAgICAgYW5jZXN0cnkucHVzaChhbmNlc3Rvcik7XG4gICAgICAgICAgICAgICAgYW5jZXN0b3IgPSBnZXRQYXJlbnQoYW5jZXN0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFuY2VzdHJ5O1xuICAgICAgICB9XG4gICAgfSgpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX3NoYXJlZF9tYWtlUXVlcnlfc29ydEJ5RG9jdW1lbnRQb3NpdGlvbiA9IGZ1bmN0aW9uIChzb3J0QnlJdGVtUG9zaXRpb24pIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobm9kZSwgb3RoZXJOb2RlKSB7XG4gICAgICAgICAgICB2YXIgYml0bWFzaztcbiAgICAgICAgICAgIGlmIChub2RlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgYml0bWFzayA9IG5vZGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24ob3RoZXJOb2RlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0bWFzayAmIDIgPyAxIDogLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc29ydEJ5SXRlbVBvc2l0aW9uKG5vZGUsIG90aGVyTm9kZSk7XG4gICAgICAgIH07XG4gICAgfShSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfbWFrZVF1ZXJ5X3NvcnRCeUl0ZW1Qb3NpdGlvbik7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX21ha2VRdWVyeV9zb3J0ID0gZnVuY3Rpb24gKHNvcnRCeURvY3VtZW50UG9zaXRpb24sIHNvcnRCeUl0ZW1Qb3NpdGlvbikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc29ydCh0aGlzLl9pc0NvbXBvbmVudFF1ZXJ5ID8gc29ydEJ5SXRlbVBvc2l0aW9uIDogc29ydEJ5RG9jdW1lbnRQb3NpdGlvbik7XG4gICAgICAgICAgICB0aGlzLl9kaXJ0eSA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgIH0oUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX21ha2VRdWVyeV9zb3J0QnlEb2N1bWVudFBvc2l0aW9uLCBSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfbWFrZVF1ZXJ5X3NvcnRCeUl0ZW1Qb3NpdGlvbik7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX21ha2VRdWVyeV9kaXJ0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2RpcnR5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm9vdC5fZGVmZXJyZWQubGl2ZVF1ZXJpZXMucHVzaCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX3NoYXJlZF9tYWtlUXVlcnlfcmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4T2YodGhpcy5faXNDb21wb25lbnRRdWVyeSA/IGl0ZW0uaW5zdGFuY2UgOiBpdGVtLm5vZGUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX21ha2VRdWVyeV9fbWFrZVF1ZXJ5ID0gZnVuY3Rpb24gKGRlZmluZVByb3BlcnRpZXMsIHRlc3QsIGNhbmNlbCwgc29ydCwgZGlydHksIHJlbW92ZSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyYWN0aXZlLCBzZWxlY3RvciwgbGl2ZSwgaXNDb21wb25lbnRRdWVyeSkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5O1xuICAgICAgICAgICAgcXVlcnkgPSBbXTtcbiAgICAgICAgICAgIGRlZmluZVByb3BlcnRpZXMocXVlcnksIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogeyB2YWx1ZTogc2VsZWN0b3IgfSxcbiAgICAgICAgICAgICAgICBsaXZlOiB7IHZhbHVlOiBsaXZlIH0sXG4gICAgICAgICAgICAgICAgX2lzQ29tcG9uZW50UXVlcnk6IHsgdmFsdWU6IGlzQ29tcG9uZW50UXVlcnkgfSxcbiAgICAgICAgICAgICAgICBfdGVzdDogeyB2YWx1ZTogdGVzdCB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghbGl2ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmluZVByb3BlcnRpZXMocXVlcnksIHtcbiAgICAgICAgICAgICAgICBjYW5jZWw6IHsgdmFsdWU6IGNhbmNlbCB9LFxuICAgICAgICAgICAgICAgIF9yb290OiB7IHZhbHVlOiByYWN0aXZlIH0sXG4gICAgICAgICAgICAgICAgX3NvcnQ6IHsgdmFsdWU6IHNvcnQgfSxcbiAgICAgICAgICAgICAgICBfbWFrZURpcnR5OiB7IHZhbHVlOiBkaXJ0eSB9LFxuICAgICAgICAgICAgICAgIF9yZW1vdmU6IHsgdmFsdWU6IHJlbW92ZSB9LFxuICAgICAgICAgICAgICAgIF9kaXJ0eToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgICAgIH07XG4gICAgfSh1dGlsc19kZWZpbmVQcm9wZXJ0aWVzLCBSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfbWFrZVF1ZXJ5X3Rlc3QsIFJhY3RpdmVfcHJvdG90eXBlX3NoYXJlZF9tYWtlUXVlcnlfY2FuY2VsLCBSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfbWFrZVF1ZXJ5X3NvcnQsIFJhY3RpdmVfcHJvdG90eXBlX3NoYXJlZF9tYWtlUXVlcnlfZGlydHksIFJhY3RpdmVfcHJvdG90eXBlX3NoYXJlZF9tYWtlUXVlcnlfcmVtb3ZlKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9maW5kQWxsID0gZnVuY3Rpb24gKHdhcm4sIG1hdGNoZXMsIGRlZmluZVByb3BlcnRpZXMsIG1ha2VRdWVyeSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzZWxlY3Rvciwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGxpdmVRdWVyaWVzLCBxdWVyeTtcbiAgICAgICAgICAgIGlmICghdGhpcy5lbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICAgICAgbGl2ZVF1ZXJpZXMgPSB0aGlzLl9saXZlUXVlcmllcztcbiAgICAgICAgICAgIGlmIChxdWVyeSA9IGxpdmVRdWVyaWVzW3NlbGVjdG9yXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zICYmIG9wdGlvbnMubGl2ZSA/IHF1ZXJ5IDogcXVlcnkuc2xpY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXJ5ID0gbWFrZVF1ZXJ5KHRoaXMsIHNlbGVjdG9yLCAhIW9wdGlvbnMubGl2ZSwgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKHF1ZXJ5LmxpdmUpIHtcbiAgICAgICAgICAgICAgICBsaXZlUXVlcmllcy5wdXNoKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBsaXZlUXVlcmllc1tzZWxlY3Rvcl0gPSBxdWVyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQuZmluZEFsbChzZWxlY3RvciwgcXVlcnkpO1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgICAgICB9O1xuICAgIH0odXRpbHNfd2FybiwgdXRpbHNfbWF0Y2hlcywgdXRpbHNfZGVmaW5lUHJvcGVydGllcywgUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX21ha2VRdWVyeV9fbWFrZVF1ZXJ5KTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9maW5kQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJhZ21lbnQuZmluZENvbXBvbmVudChzZWxlY3Rvcik7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX2ZpbmRBbGxDb21wb25lbnRzID0gZnVuY3Rpb24gKHdhcm4sIG1hdGNoZXMsIGRlZmluZVByb3BlcnRpZXMsIG1ha2VRdWVyeSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzZWxlY3Rvciwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGxpdmVRdWVyaWVzLCBxdWVyeTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICAgICAgbGl2ZVF1ZXJpZXMgPSB0aGlzLl9saXZlQ29tcG9uZW50UXVlcmllcztcbiAgICAgICAgICAgIGlmIChxdWVyeSA9IGxpdmVRdWVyaWVzW3NlbGVjdG9yXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zICYmIG9wdGlvbnMubGl2ZSA/IHF1ZXJ5IDogcXVlcnkuc2xpY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXJ5ID0gbWFrZVF1ZXJ5KHRoaXMsIHNlbGVjdG9yLCAhIW9wdGlvbnMubGl2ZSwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAocXVlcnkubGl2ZSkge1xuICAgICAgICAgICAgICAgIGxpdmVRdWVyaWVzLnB1c2goc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGxpdmVRdWVyaWVzW3NlbGVjdG9yXSA9IHF1ZXJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mcmFnbWVudC5maW5kQWxsQ29tcG9uZW50cyhzZWxlY3RvciwgcXVlcnkpO1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgICAgICB9O1xuICAgIH0odXRpbHNfd2FybiwgdXRpbHNfbWF0Y2hlcywgdXRpbHNfZGVmaW5lUHJvcGVydGllcywgUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX21ha2VRdWVyeV9fbWFrZVF1ZXJ5KTtcbnZhciB1dGlsc19nZXRFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICAgICAgdmFyIG91dHB1dDtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhZG9jdW1lbnQgfHwgIWlucHV0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5wdXQubm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlucHV0KTtcbiAgICAgICAgICAgICAgICBpZiAoIW91dHB1dCAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaW5wdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob3V0cHV0ICYmIG91dHB1dC5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbnB1dFswXSAmJiBpbnB1dFswXS5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dFswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciByZW5kZXJfc2hhcmVkX2luaXRGcmFnbWVudCA9IGZ1bmN0aW9uICh0eXBlcywgY3JlYXRlKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGZyYWdtZW50LCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgbnVtSXRlbXMsIGksIHBhcmVudEZyYWdtZW50LCBwYXJlbnRSZWZzLCByZWY7XG4gICAgICAgICAgICBmcmFnbWVudC5vd25lciA9IG9wdGlvbnMub3duZXI7XG4gICAgICAgICAgICBwYXJlbnRGcmFnbWVudCA9IGZyYWdtZW50Lm93bmVyLnBhcmVudEZyYWdtZW50O1xuICAgICAgICAgICAgZnJhZ21lbnQucm9vdCA9IG9wdGlvbnMucm9vdDtcbiAgICAgICAgICAgIGZyYWdtZW50LnBOb2RlID0gb3B0aW9ucy5wTm9kZTtcbiAgICAgICAgICAgIGZyYWdtZW50LmNvbnRleHRTdGFjayA9IG9wdGlvbnMuY29udGV4dFN0YWNrIHx8IFtdO1xuICAgICAgICAgICAgaWYgKGZyYWdtZW50Lm93bmVyLnR5cGUgPT09IHR5cGVzLlNFQ1RJT04pIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC5pbmRleCA9IG9wdGlvbnMuaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRSZWZzID0gcGFyZW50RnJhZ21lbnQuaW5kZXhSZWZzO1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRSZWZzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50LmluZGV4UmVmcyA9IGNyZWF0ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChyZWYgaW4gcGFyZW50UmVmcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQuaW5kZXhSZWZzW3JlZl0gPSBwYXJlbnRSZWZzW3JlZl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmcmFnbWVudC5wcmlvcml0eSA9IHBhcmVudEZyYWdtZW50ID8gcGFyZW50RnJhZ21lbnQucHJpb3JpdHkgKyAxIDogMTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmluZGV4UmVmKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFmcmFnbWVudC5pbmRleFJlZnMpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQuaW5kZXhSZWZzID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZyYWdtZW50LmluZGV4UmVmc1tvcHRpb25zLmluZGV4UmVmXSA9IG9wdGlvbnMuaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmcmFnbWVudC5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgbnVtSXRlbXMgPSBvcHRpb25zLmRlc2NyaXB0b3IgPyBvcHRpb25zLmRlc2NyaXB0b3IubGVuZ3RoIDogMDtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBudW1JdGVtczsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuaXRlbXNbZnJhZ21lbnQuaXRlbXMubGVuZ3RoXSA9IGZyYWdtZW50LmNyZWF0ZUl0ZW0oe1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRGcmFnbWVudDogZnJhZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0b3I6IG9wdGlvbnMuZGVzY3JpcHRvcltpXSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcywgdXRpbHNfY3JlYXRlKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfc2hhcmVkX2luc2VydEh0bWwgPSBmdW5jdGlvbiAoY3JlYXRlRWxlbWVudCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIGVsZW1lbnRDYWNoZSA9IHt9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGh0bWwsIHRhZ05hbWUsIGRvY0ZyYWcpIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIsIG5vZGVzID0gW107XG4gICAgICAgICAgICBpZiAoaHRtbCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGVsZW1lbnRDYWNoZVt0YWdOYW1lXSB8fCAoZWxlbWVudENhY2hlW3RhZ05hbWVdID0gY3JlYXRlRWxlbWVudCh0YWdOYW1lKSk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzW25vZGVzLmxlbmd0aF0gPSBjb250YWluZXIuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZChjb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICB9O1xuICAgIH0odXRpbHNfY3JlYXRlRWxlbWVudCk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X1RleHQgPSBmdW5jdGlvbiAodHlwZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBEb21UZXh0LCBsZXNzVGhhbiwgZ3JlYXRlclRoYW47XG4gICAgICAgIGxlc3NUaGFuID0gLzwvZztcbiAgICAgICAgZ3JlYXRlclRoYW4gPSAvPi9nO1xuICAgICAgICBEb21UZXh0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGRvY0ZyYWcpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGVzLlRFWFQ7XG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0b3IgPSBvcHRpb25zLmRlc2NyaXB0b3I7XG4gICAgICAgICAgICBpZiAoZG9jRnJhZykge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG9wdGlvbnMuZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZCh0aGlzLm5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBEb21UZXh0LnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIGRldGFjaDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKGRlc3Ryb3kpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVzdHJveSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaXJzdE5vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgnJyArIHRoaXMuZGVzY3JpcHRvcikucmVwbGFjZShsZXNzVGhhbiwgJyZsdDsnKS5yZXBsYWNlKGdyZWF0ZXJUaGFuLCAnJmd0OycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRG9tVGV4dDtcbiAgICB9KGNvbmZpZ190eXBlcyk7XG52YXIgc2hhcmVkX3RlYXJkb3duID0gZnVuY3Rpb24gKHVucmVnaXN0ZXJEZXBlbmRhbnQpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGhpbmcpIHtcbiAgICAgICAgICAgIGlmICghdGhpbmcua2V5cGF0aCkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaW5nLnJvb3QuX3BlbmRpbmdSZXNvbHV0aW9uLmluZGV4T2YodGhpbmcpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpbmcucm9vdC5fcGVuZGluZ1Jlc29sdXRpb24uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVucmVnaXN0ZXJEZXBlbmRhbnQodGhpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oc2hhcmVkX3VucmVnaXN0ZXJEZXBlbmRhbnQpO1xudmFyIHJlbmRlcl9zaGFyZWRfRXZhbHVhdG9yX1JlZmVyZW5jZSA9IGZ1bmN0aW9uICh0eXBlcywgaXNFcXVhbCwgZGVmaW5lUHJvcGVydHksIHJlZ2lzdGVyRGVwZW5kYW50LCB1bnJlZ2lzdGVyRGVwZW5kYW50KSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgUmVmZXJlbmNlLCB0aGlzUGF0dGVybjtcbiAgICAgICAgdGhpc1BhdHRlcm4gPSAvdGhpcy87XG4gICAgICAgIFJlZmVyZW5jZSA9IGZ1bmN0aW9uIChyb290LCBrZXlwYXRoLCBldmFsdWF0b3IsIGFyZ051bSwgcHJpb3JpdHkpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZXZhbHVhdG9yID0gZXZhbHVhdG9yO1xuICAgICAgICAgICAgdGhpcy5rZXlwYXRoID0ga2V5cGF0aDtcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgICAgICAgICB0aGlzLmFyZ051bSA9IGFyZ051bTtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGVzLlJFRkVSRU5DRTtcbiAgICAgICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgICAgIHZhbHVlID0gcm9vdC5nZXQoa2V5cGF0aCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwRnVuY3Rpb24odmFsdWUsIHJvb3QsIGV2YWx1YXRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gZXZhbHVhdG9yLnZhbHVlc1thcmdOdW1dID0gdmFsdWU7XG4gICAgICAgICAgICByZWdpc3RlckRlcGVuZGFudCh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgUmVmZXJlbmNlLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMucm9vdC5nZXQodGhpcy5rZXlwYXRoKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmICF2YWx1ZS5fbm93cmFwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gd3JhcEZ1bmN0aW9uKHZhbHVlLCB0aGlzLnJvb3QsIHRoaXMuZXZhbHVhdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpc0VxdWFsKHZhbHVlLCB0aGlzLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2YWx1YXRvci52YWx1ZXNbdGhpcy5hcmdOdW1dID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZhbHVhdG9yLmJ1YmJsZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdW5yZWdpc3RlckRlcGVuZGFudCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFJlZmVyZW5jZTtcbiAgICAgICAgZnVuY3Rpb24gd3JhcEZ1bmN0aW9uKGZuLCByYWN0aXZlLCBldmFsdWF0b3IpIHtcbiAgICAgICAgICAgIHZhciBwcm9wLCBldmFsdWF0b3JzLCBpbmRleDtcbiAgICAgICAgICAgIGlmICghdGhpc1BhdHRlcm4udGVzdChmbi50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgICAgIGRlZmluZVByb3BlcnR5KGZuLCAnX25vd3JhcCcsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFmblsnXycgKyByYWN0aXZlLl9ndWlkXSkge1xuICAgICAgICAgICAgICAgIGRlZmluZVByb3BlcnR5KGZuLCAnXycgKyByYWN0aXZlLl9ndWlkLCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxDYXB0dXJlZCwgcmVzdWx0LCBpLCBldmFsdWF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbENhcHR1cmVkID0gcmFjdGl2ZS5fY2FwdHVyZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9yaWdpbmFsQ2FwdHVyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWN0aXZlLl9jYXB0dXJlZCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZm4uYXBwbHkocmFjdGl2ZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWN0aXZlLl9jYXB0dXJlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gZXZhbHVhdG9ycy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsdWF0b3IgPSBldmFsdWF0b3JzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsdWF0b3IudXBkYXRlU29mdERlcGVuZGVuY2llcyhyYWN0aXZlLl9jYXB0dXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmFjdGl2ZS5fY2FwdHVyZWQgPSBvcmlnaW5hbENhcHR1cmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBmb3IgKHByb3AgaW4gZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZuLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmblsnXycgKyByYWN0aXZlLl9ndWlkXVtwcm9wXSA9IGZuW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZuWydfJyArIHJhY3RpdmUuX2d1aWQgKyAnX2V2YWx1YXRvcnMnXSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXZhbHVhdG9ycyA9IGZuWydfJyArIHJhY3RpdmUuX2d1aWQgKyAnX2V2YWx1YXRvcnMnXTtcbiAgICAgICAgICAgIGluZGV4ID0gZXZhbHVhdG9ycy5pbmRleE9mKGV2YWx1YXRvcik7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZXZhbHVhdG9ycy5wdXNoKGV2YWx1YXRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZm5bJ18nICsgcmFjdGl2ZS5fZ3VpZF07XG4gICAgICAgIH1cbiAgICB9KGNvbmZpZ190eXBlcywgdXRpbHNfaXNFcXVhbCwgdXRpbHNfZGVmaW5lUHJvcGVydHksIHNoYXJlZF9yZWdpc3RlckRlcGVuZGFudCwgc2hhcmVkX3VucmVnaXN0ZXJEZXBlbmRhbnQpO1xudmFyIHJlbmRlcl9zaGFyZWRfRXZhbHVhdG9yX1NvZnRSZWZlcmVuY2UgPSBmdW5jdGlvbiAoaXNFcXVhbCwgcmVnaXN0ZXJEZXBlbmRhbnQsIHVucmVnaXN0ZXJEZXBlbmRhbnQpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBTb2Z0UmVmZXJlbmNlID0gZnVuY3Rpb24gKHJvb3QsIGtleXBhdGgsIGV2YWx1YXRvcikge1xuICAgICAgICAgICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICAgICAgICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgICAgICAgICB0aGlzLnByaW9yaXR5ID0gZXZhbHVhdG9yLnByaW9yaXR5O1xuICAgICAgICAgICAgdGhpcy5ldmFsdWF0b3IgPSBldmFsdWF0b3I7XG4gICAgICAgICAgICByZWdpc3RlckRlcGVuZGFudCh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgU29mdFJlZmVyZW5jZS5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnJvb3QuZ2V0KHRoaXMua2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0VxdWFsKHZhbHVlLCB0aGlzLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2YWx1YXRvci5idWJibGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHVucmVnaXN0ZXJEZXBlbmRhbnQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTb2Z0UmVmZXJlbmNlO1xuICAgIH0odXRpbHNfaXNFcXVhbCwgc2hhcmVkX3JlZ2lzdGVyRGVwZW5kYW50LCBzaGFyZWRfdW5yZWdpc3RlckRlcGVuZGFudCk7XG52YXIgcmVuZGVyX3NoYXJlZF9FdmFsdWF0b3JfX0V2YWx1YXRvciA9IGZ1bmN0aW9uIChpc0VxdWFsLCBkZWZpbmVQcm9wZXJ0eSwgY2xlYXJDYWNoZSwgbm90aWZ5RGVwZW5kYW50cywgcmVnaXN0ZXJEZXBlbmRhbnQsIHVucmVnaXN0ZXJEZXBlbmRhbnQsIGFkYXB0SWZOZWNlc3NhcnksIFJlZmVyZW5jZSwgU29mdFJlZmVyZW5jZSkge1xuICAgICAgICBcbiAgICAgICAgdmFyIEV2YWx1YXRvciwgY2FjaGUgPSB7fTtcbiAgICAgICAgRXZhbHVhdG9yID0gZnVuY3Rpb24gKHJvb3QsIGtleXBhdGgsIGZ1bmN0aW9uU3RyLCBhcmdzLCBwcmlvcml0eSkge1xuICAgICAgICAgICAgdmFyIGksIGFyZztcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgICAgICAgICB0aGlzLmtleXBhdGggPSBrZXlwYXRoO1xuICAgICAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICAgICAgdGhpcy5mbiA9IGdldEZ1bmN0aW9uRnJvbVN0cmluZyhmdW5jdGlvblN0ciwgYXJncy5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucmVmcyA9IFtdO1xuICAgICAgICAgICAgaSA9IGFyZ3MubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGlmIChhcmcgPSBhcmdzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmdbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzW2ldID0gYXJnWzFdO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzW3RoaXMucmVmcy5sZW5ndGhdID0gbmV3IFJlZmVyZW5jZShyb290LCBhcmdbMV0sIHRoaXMsIGksIHByaW9yaXR5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzW2ldID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VsZlVwZGF0aW5nID0gdGhpcy5yZWZzLmxlbmd0aCA8PSAxO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgRXZhbHVhdG9yLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIGJ1YmJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGZVcGRhdGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuZGVmZXJyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290Ll9kZWZlcnJlZC5ldmFscy5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmVycmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV2YWx1YXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZXZhbHVhdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmZuLmFwcGx5KG51bGwsIHRoaXMudmFsdWVzKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9vdC5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpc0VxdWFsKHZhbHVlLCB0aGlzLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckNhY2hlKHRoaXMucm9vdCwgdGhpcy5rZXlwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290Ll9jYWNoZVt0aGlzLmtleXBhdGhdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGFkYXB0SWZOZWNlc3NhcnkodGhpcy5yb290LCB0aGlzLmtleXBhdGgsIHZhbHVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBub3RpZnlEZXBlbmRhbnRzKHRoaXMucm9vdCwgdGhpcy5rZXlwYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ldmFsdWF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5yZWZzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnMucG9wKCkudGVhcmRvd24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xlYXJDYWNoZSh0aGlzLnJvb3QsIHRoaXMua2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290Ll9ldmFsdWF0b3JzW3RoaXMua2V5cGF0aF0gPSBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2VsZlVwZGF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmZXJyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgaSA9IHRoaXMucmVmcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnNbaV0udXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlZmVycmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmZXJyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlU29mdERlcGVuZGVuY2llczogZnVuY3Rpb24gKHNvZnREZXBzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGksIGtleXBhdGgsIHJlZjtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc29mdFJlZnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb2Z0UmVmcyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpID0gdGhpcy5zb2Z0UmVmcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICByZWYgPSB0aGlzLnNvZnRSZWZzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNvZnREZXBzW3JlZi5rZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb2Z0UmVmcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvZnRSZWZzW3JlZi5rZXlwYXRoXSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmLnRlYXJkb3duKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaSA9IHNvZnREZXBzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXBhdGggPSBzb2Z0RGVwc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNvZnRSZWZzW2tleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWYgPSBuZXcgU29mdFJlZmVyZW5jZSh0aGlzLnJvb3QsIGtleXBhdGgsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb2Z0UmVmc1t0aGlzLnNvZnRSZWZzLmxlbmd0aF0gPSByZWY7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvZnRSZWZzW2tleXBhdGhdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGZVcGRhdGluZyA9IHRoaXMucmVmcy5sZW5ndGggKyB0aGlzLnNvZnRSZWZzLmxlbmd0aCA8PSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRXZhbHVhdG9yO1xuICAgICAgICBmdW5jdGlvbiBnZXRGdW5jdGlvbkZyb21TdHJpbmcoc3RyLCBpKSB7XG4gICAgICAgICAgICB2YXIgZm4sIGFyZ3M7XG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFwkXFx7KFswLTldKylcXH0vZywgJ18kMScpO1xuICAgICAgICAgICAgaWYgKGNhY2hlW3N0cl0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVbc3RyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBhcmdzW2ldID0gJ18nICsgaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZuID0gbmV3IEZ1bmN0aW9uKGFyZ3Muam9pbignLCcpLCAncmV0dXJuKCcgKyBzdHIgKyAnKScpO1xuICAgICAgICAgICAgY2FjaGVbc3RyXSA9IGZuO1xuICAgICAgICAgICAgcmV0dXJuIGZuO1xuICAgICAgICB9XG4gICAgfSh1dGlsc19pc0VxdWFsLCB1dGlsc19kZWZpbmVQcm9wZXJ0eSwgc2hhcmVkX2NsZWFyQ2FjaGUsIHNoYXJlZF9ub3RpZnlEZXBlbmRhbnRzLCBzaGFyZWRfcmVnaXN0ZXJEZXBlbmRhbnQsIHNoYXJlZF91bnJlZ2lzdGVyRGVwZW5kYW50LCBzaGFyZWRfYWRhcHRJZk5lY2Vzc2FyeSwgcmVuZGVyX3NoYXJlZF9FdmFsdWF0b3JfUmVmZXJlbmNlLCByZW5kZXJfc2hhcmVkX0V2YWx1YXRvcl9Tb2Z0UmVmZXJlbmNlKTtcbnZhciByZW5kZXJfc2hhcmVkX0V4cHJlc3Npb25SZXNvbHZlcl9SZWZlcmVuY2VTY291dCA9IGZ1bmN0aW9uIChyZXNvbHZlUmVmLCB0ZWFyZG93bikge1xuICAgICAgICBcbiAgICAgICAgdmFyIFJlZmVyZW5jZVNjb3V0ID0gZnVuY3Rpb24gKHJlc29sdmVyLCByZWYsIGNvbnRleHRTdGFjaywgYXJnTnVtKSB7XG4gICAgICAgICAgICB2YXIga2V5cGF0aCwgcm9vdDtcbiAgICAgICAgICAgIHJvb3QgPSB0aGlzLnJvb3QgPSByZXNvbHZlci5yb290O1xuICAgICAgICAgICAga2V5cGF0aCA9IHJlc29sdmVSZWYocm9vdCwgcmVmLCBjb250ZXh0U3RhY2spO1xuICAgICAgICAgICAgaWYgKGtleXBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmVyLnJlc29sdmVSZWYoYXJnTnVtLCBmYWxzZSwga2V5cGF0aCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmID0gcmVmO1xuICAgICAgICAgICAgICAgIHRoaXMuYXJnTnVtID0gYXJnTnVtO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZXIgPSByZXNvbHZlcjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRTdGFjayA9IGNvbnRleHRTdGFjaztcbiAgICAgICAgICAgICAgICByb290Ll9wZW5kaW5nUmVzb2x1dGlvbltyb290Ll9wZW5kaW5nUmVzb2x1dGlvbi5sZW5ndGhdID0gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgUmVmZXJlbmNlU2NvdXQucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgcmVzb2x2ZTogZnVuY3Rpb24gKGtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleXBhdGggPSBrZXlwYXRoO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZXIucmVzb2x2ZVJlZih0aGlzLmFyZ051bSwgZmFsc2UsIGtleXBhdGgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVhcmRvd24odGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUmVmZXJlbmNlU2NvdXQ7XG4gICAgfShzaGFyZWRfcmVzb2x2ZVJlZiwgc2hhcmVkX3RlYXJkb3duKTtcbnZhciByZW5kZXJfc2hhcmVkX0V4cHJlc3Npb25SZXNvbHZlcl9pc1JlZ3VsYXJLZXlwYXRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIGtleVBhdHRlcm4gPSAvXig/Oig/OlthLXpBLVokX11bYS16QS1aJF8wLTldKil8KD86WzAtOV18WzEtOV1bMC05XSspKSQvO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGtleXBhdGgpIHtcbiAgICAgICAgICAgIHZhciBrZXlzLCBrZXksIGk7XG4gICAgICAgICAgICBrZXlzID0ga2V5cGF0aC5zcGxpdCgnLicpO1xuICAgICAgICAgICAgaSA9IGtleXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ3VuZGVmaW5lZCcgfHwgIWtleVBhdHRlcm4udGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgcmVuZGVyX3NoYXJlZF9FeHByZXNzaW9uUmVzb2x2ZXJfZ2V0S2V5cGF0aCA9IGZ1bmN0aW9uIChub3JtYWxpc2VLZXlwYXRoLCBpc1JlZ3VsYXJLZXlwYXRoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0ciwgYXJncykge1xuICAgICAgICAgICAgdmFyIHVuaXF1ZSwgbm9ybWFsaXNlZDtcbiAgICAgICAgICAgIHVuaXF1ZSA9IHN0ci5yZXBsYWNlKC9cXCRcXHsoWzAtOV0rKVxcfS9nLCBmdW5jdGlvbiAobWF0Y2gsICQxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyZ3NbJDFdID8gYXJnc1skMV1bMV0gOiAndW5kZWZpbmVkJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbm9ybWFsaXNlZCA9IG5vcm1hbGlzZUtleXBhdGgodW5pcXVlKTtcbiAgICAgICAgICAgIGlmIChpc1JlZ3VsYXJLZXlwYXRoKG5vcm1hbGlzZWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vcm1hbGlzZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJyR7JyArIHVuaXF1ZS5yZXBsYWNlKC9bXFwuXFxbXFxdXS9nLCAnLScpICsgJ30nO1xuICAgICAgICB9O1xuICAgIH0odXRpbHNfbm9ybWFsaXNlS2V5cGF0aCwgcmVuZGVyX3NoYXJlZF9FeHByZXNzaW9uUmVzb2x2ZXJfaXNSZWd1bGFyS2V5cGF0aCk7XG52YXIgcmVuZGVyX3NoYXJlZF9FeHByZXNzaW9uUmVzb2x2ZXJfcmVhc3NpZ25EZXBlbmRhbnRzID0gZnVuY3Rpb24gKHJlZ2lzdGVyRGVwZW5kYW50LCB1bnJlZ2lzdGVyRGVwZW5kYW50KSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHJhY3RpdmUsIG9sZEtleXBhdGgsIG5ld0tleXBhdGgpIHtcbiAgICAgICAgICAgIHZhciB0b1JlYXNzaWduLCBpLCBkZXBlbmRhbnQ7XG4gICAgICAgICAgICB0b1JlYXNzaWduID0gW107XG4gICAgICAgICAgICBnYXRoZXJEZXBlbmRhbnRzKHJhY3RpdmUsIG9sZEtleXBhdGgsIHRvUmVhc3NpZ24pO1xuICAgICAgICAgICAgaSA9IHRvUmVhc3NpZ24ubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGRlcGVuZGFudCA9IHRvUmVhc3NpZ25baV07XG4gICAgICAgICAgICAgICAgdW5yZWdpc3RlckRlcGVuZGFudChkZXBlbmRhbnQpO1xuICAgICAgICAgICAgICAgIGRlcGVuZGFudC5rZXlwYXRoID0gZGVwZW5kYW50LmtleXBhdGgucmVwbGFjZShvbGRLZXlwYXRoLCBuZXdLZXlwYXRoKTtcbiAgICAgICAgICAgICAgICByZWdpc3RlckRlcGVuZGFudChkZXBlbmRhbnQpO1xuICAgICAgICAgICAgICAgIGRlcGVuZGFudC51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gY2FzY2FkZShyYWN0aXZlLCBvbGRLZXlwYXRoLCB0b1JlYXNzaWduKSB7XG4gICAgICAgICAgICB2YXIgbWFwLCBpO1xuICAgICAgICAgICAgbWFwID0gcmFjdGl2ZS5fZGVwc01hcFtvbGRLZXlwYXRoXTtcbiAgICAgICAgICAgIGlmICghbWFwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSA9IG1hcC5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgZ2F0aGVyRGVwZW5kYW50cyhyYWN0aXZlLCBtYXBbaV0sIHRvUmVhc3NpZ24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdhdGhlckRlcGVuZGFudHMocmFjdGl2ZSwgb2xkS2V5cGF0aCwgdG9SZWFzc2lnbikge1xuICAgICAgICAgICAgdmFyIHByaW9yaXR5LCBkZXBlbmRhbnRzQnlLZXlwYXRoLCBkZXBlbmRhbnRzLCBpO1xuICAgICAgICAgICAgcHJpb3JpdHkgPSByYWN0aXZlLl9kZXBzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChwcmlvcml0eS0tKSB7XG4gICAgICAgICAgICAgICAgZGVwZW5kYW50c0J5S2V5cGF0aCA9IHJhY3RpdmUuX2RlcHNbcHJpb3JpdHldO1xuICAgICAgICAgICAgICAgIGlmIChkZXBlbmRhbnRzQnlLZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGFudHMgPSBkZXBlbmRhbnRzQnlLZXlwYXRoW29sZEtleXBhdGhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVwZW5kYW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGRlcGVuZGFudHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUmVhc3NpZ24ucHVzaChkZXBlbmRhbnRzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2NhZGUocmFjdGl2ZSwgb2xkS2V5cGF0aCwgdG9SZWFzc2lnbik7XG4gICAgICAgIH1cbiAgICB9KHNoYXJlZF9yZWdpc3RlckRlcGVuZGFudCwgc2hhcmVkX3VucmVnaXN0ZXJEZXBlbmRhbnQpO1xudmFyIHJlbmRlcl9zaGFyZWRfRXhwcmVzc2lvblJlc29sdmVyX19FeHByZXNzaW9uUmVzb2x2ZXIgPSBmdW5jdGlvbiAoRXZhbHVhdG9yLCBSZWZlcmVuY2VTY291dCwgZ2V0S2V5cGF0aCwgcmVhc3NpZ25EZXBlbmRhbnRzKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgRXhwcmVzc2lvblJlc29sdmVyID0gZnVuY3Rpb24gKG11c3RhY2hlKSB7XG4gICAgICAgICAgICB2YXIgZXhwcmVzc2lvbiwgaSwgbGVuLCByZWYsIGluZGV4UmVmcztcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IG11c3RhY2hlLnJvb3Q7XG4gICAgICAgICAgICB0aGlzLm11c3RhY2hlID0gbXVzdGFjaGU7XG4gICAgICAgICAgICB0aGlzLmFyZ3MgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuc2NvdXRzID0gW107XG4gICAgICAgICAgICBleHByZXNzaW9uID0gbXVzdGFjaGUuZGVzY3JpcHRvci54O1xuICAgICAgICAgICAgaW5kZXhSZWZzID0gbXVzdGFjaGUucGFyZW50RnJhZ21lbnQuaW5kZXhSZWZzO1xuICAgICAgICAgICAgdGhpcy5zdHIgPSBleHByZXNzaW9uLnM7XG4gICAgICAgICAgICBsZW4gPSB0aGlzLnVucmVzb2x2ZWQgPSB0aGlzLmFyZ3MubGVuZ3RoID0gZXhwcmVzc2lvbi5yID8gZXhwcmVzc2lvbi5yLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICBpZiAoIWxlbikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZWQgPSB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1YmJsZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIHJlZiA9IGV4cHJlc3Npb24ucltpXTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhSZWZzICYmIGluZGV4UmVmc1tyZWZdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlUmVmKGksIHRydWUsIGluZGV4UmVmc1tyZWZdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3V0c1t0aGlzLnNjb3V0cy5sZW5ndGhdID0gbmV3IFJlZmVyZW5jZVNjb3V0KHRoaXMsIHJlZiwgbXVzdGFjaGUuY29udGV4dFN0YWNrLCBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYnViYmxlKCk7XG4gICAgICAgIH07XG4gICAgICAgIEV4cHJlc3Npb25SZXNvbHZlci5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBidWJibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkS2V5cGF0aDtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucmVhZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvbGRLZXlwYXRoID0gdGhpcy5rZXlwYXRoO1xuICAgICAgICAgICAgICAgIHRoaXMua2V5cGF0aCA9IGdldEtleXBhdGgodGhpcy5zdHIsIHRoaXMuYXJncyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMua2V5cGF0aC5zdWJzdHIoMCwgMikgPT09ICckeycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVFdmFsdWF0b3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9sZEtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVhc3NpZ25EZXBlbmRhbnRzKHRoaXMucm9vdCwgb2xkS2V5cGF0aCwgdGhpcy5rZXlwYXRoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm11c3RhY2hlLnJlc29sdmUodGhpcy5rZXlwYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5zY291dHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvdXRzLnBvcCgpLnRlYXJkb3duKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc29sdmVSZWY6IGZ1bmN0aW9uIChhcmdOdW0sIGlzSW5kZXhSZWYsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcmdzW2FyZ051bV0gPSBbXG4gICAgICAgICAgICAgICAgICAgIGlzSW5kZXhSZWYsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1YmJsZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZWQgPSAhLS10aGlzLnVucmVzb2x2ZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JlYXRlRXZhbHVhdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJvb3QuX2V2YWx1YXRvcnNbdGhpcy5rZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3QuX2V2YWx1YXRvcnNbdGhpcy5rZXlwYXRoXSA9IG5ldyBFdmFsdWF0b3IodGhpcy5yb290LCB0aGlzLmtleXBhdGgsIHRoaXMuc3RyLCB0aGlzLmFyZ3MsIHRoaXMubXVzdGFjaGUucHJpb3JpdHkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdC5fZXZhbHVhdG9yc1t0aGlzLmtleXBhdGhdLnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBFeHByZXNzaW9uUmVzb2x2ZXI7XG4gICAgfShyZW5kZXJfc2hhcmVkX0V2YWx1YXRvcl9fRXZhbHVhdG9yLCByZW5kZXJfc2hhcmVkX0V4cHJlc3Npb25SZXNvbHZlcl9SZWZlcmVuY2VTY291dCwgcmVuZGVyX3NoYXJlZF9FeHByZXNzaW9uUmVzb2x2ZXJfZ2V0S2V5cGF0aCwgcmVuZGVyX3NoYXJlZF9FeHByZXNzaW9uUmVzb2x2ZXJfcmVhc3NpZ25EZXBlbmRhbnRzKTtcbnZhciByZW5kZXJfc2hhcmVkX2luaXRNdXN0YWNoZSA9IGZ1bmN0aW9uIChyZXNvbHZlUmVmLCBFeHByZXNzaW9uUmVzb2x2ZXIpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobXVzdGFjaGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBrZXlwYXRoLCBpbmRleFJlZiwgcGFyZW50RnJhZ21lbnQ7XG4gICAgICAgICAgICBwYXJlbnRGcmFnbWVudCA9IG11c3RhY2hlLnBhcmVudEZyYWdtZW50ID0gb3B0aW9ucy5wYXJlbnRGcmFnbWVudDtcbiAgICAgICAgICAgIG11c3RhY2hlLnJvb3QgPSBwYXJlbnRGcmFnbWVudC5yb290O1xuICAgICAgICAgICAgbXVzdGFjaGUuY29udGV4dFN0YWNrID0gcGFyZW50RnJhZ21lbnQuY29udGV4dFN0YWNrO1xuICAgICAgICAgICAgbXVzdGFjaGUuZGVzY3JpcHRvciA9IG9wdGlvbnMuZGVzY3JpcHRvcjtcbiAgICAgICAgICAgIG11c3RhY2hlLmluZGV4ID0gb3B0aW9ucy5pbmRleCB8fCAwO1xuICAgICAgICAgICAgbXVzdGFjaGUucHJpb3JpdHkgPSBwYXJlbnRGcmFnbWVudC5wcmlvcml0eTtcbiAgICAgICAgICAgIG11c3RhY2hlLnR5cGUgPSBvcHRpb25zLmRlc2NyaXB0b3IudDtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlc2NyaXB0b3Iucikge1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRGcmFnbWVudC5pbmRleFJlZnMgJiYgcGFyZW50RnJhZ21lbnQuaW5kZXhSZWZzW29wdGlvbnMuZGVzY3JpcHRvci5yXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4UmVmID0gcGFyZW50RnJhZ21lbnQuaW5kZXhSZWZzW29wdGlvbnMuZGVzY3JpcHRvci5yXTtcbiAgICAgICAgICAgICAgICAgICAgbXVzdGFjaGUuaW5kZXhSZWYgPSBvcHRpb25zLmRlc2NyaXB0b3IucjtcbiAgICAgICAgICAgICAgICAgICAgbXVzdGFjaGUudmFsdWUgPSBpbmRleFJlZjtcbiAgICAgICAgICAgICAgICAgICAgbXVzdGFjaGUucmVuZGVyKG11c3RhY2hlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBrZXlwYXRoID0gcmVzb2x2ZVJlZihtdXN0YWNoZS5yb290LCBvcHRpb25zLmRlc2NyaXB0b3IuciwgbXVzdGFjaGUuY29udGV4dFN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleXBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbXVzdGFjaGUucmVzb2x2ZShrZXlwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG11c3RhY2hlLnJlZiA9IG9wdGlvbnMuZGVzY3JpcHRvci5yO1xuICAgICAgICAgICAgICAgICAgICAgICAgbXVzdGFjaGUucm9vdC5fcGVuZGluZ1Jlc29sdXRpb25bbXVzdGFjaGUucm9vdC5fcGVuZGluZ1Jlc29sdXRpb24ubGVuZ3RoXSA9IG11c3RhY2hlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGVzY3JpcHRvci54KSB7XG4gICAgICAgICAgICAgICAgbXVzdGFjaGUuZXhwcmVzc2lvblJlc29sdmVyID0gbmV3IEV4cHJlc3Npb25SZXNvbHZlcihtdXN0YWNoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXVzdGFjaGUuZGVzY3JpcHRvci5uICYmICFtdXN0YWNoZS5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSkge1xuICAgICAgICAgICAgICAgIG11c3RhY2hlLnJlbmRlcih1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oc2hhcmVkX3Jlc29sdmVSZWYsIHJlbmRlcl9zaGFyZWRfRXhwcmVzc2lvblJlc29sdmVyX19FeHByZXNzaW9uUmVzb2x2ZXIpO1xudmFyIHJlbmRlcl9zaGFyZWRfcmVzb2x2ZU11c3RhY2hlID0gZnVuY3Rpb24gKHR5cGVzLCByZWdpc3RlckRlcGVuZGFudCwgdW5yZWdpc3RlckRlcGVuZGFudCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChrZXlwYXRoKSB7XG4gICAgICAgICAgICBpZiAoa2V5cGF0aCA9PT0gdGhpcy5rZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucmVnaXN0ZXJlZCkge1xuICAgICAgICAgICAgICAgIHVucmVnaXN0ZXJEZXBlbmRhbnQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmtleXBhdGggPSBrZXlwYXRoO1xuICAgICAgICAgICAgcmVnaXN0ZXJEZXBlbmRhbnQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMucm9vdC50d293YXkgJiYgdGhpcy5wYXJlbnRGcmFnbWVudC5vd25lci50eXBlID09PSB0eXBlcy5BVFRSSUJVVEUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEZyYWdtZW50Lm93bmVyLmVsZW1lbnQuYmluZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZXhwcmVzc2lvblJlc29sdmVyICYmIHRoaXMuZXhwcmVzc2lvblJlc29sdmVyLnJlc29sdmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHByZXNzaW9uUmVzb2x2ZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCBzaGFyZWRfcmVnaXN0ZXJEZXBlbmRhbnQsIHNoYXJlZF91bnJlZ2lzdGVyRGVwZW5kYW50KTtcbnZhciByZW5kZXJfc2hhcmVkX3VwZGF0ZU11c3RhY2hlID0gZnVuY3Rpb24gKGlzRXF1YWwpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgd3JhcHBlZCwgdmFsdWU7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMucm9vdC5nZXQodGhpcy5rZXlwYXRoKTtcbiAgICAgICAgICAgIGlmICh3cmFwcGVkID0gdGhpcy5yb290Ll93cmFwcGVkW3RoaXMua2V5cGF0aF0pIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBwZWQuZ2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzRXF1YWwodmFsdWUsIHRoaXMudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIodmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KHV0aWxzX2lzRXF1YWwpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9JbnRlcnBvbGF0b3IgPSBmdW5jdGlvbiAodHlwZXMsIHRlYXJkb3duLCBpbml0TXVzdGFjaGUsIHJlc29sdmVNdXN0YWNoZSwgdXBkYXRlTXVzdGFjaGUpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBEb21JbnRlcnBvbGF0b3IsIGxlc3NUaGFuLCBncmVhdGVyVGhhbjtcbiAgICAgICAgbGVzc1RoYW4gPSAvPC9nO1xuICAgICAgICBncmVhdGVyVGhhbiA9IC8+L2c7XG4gICAgICAgIERvbUludGVycG9sYXRvciA9IGZ1bmN0aW9uIChvcHRpb25zLCBkb2NGcmFnKSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlcy5JTlRFUlBPTEFUT1I7XG4gICAgICAgICAgICBpZiAoZG9jRnJhZykge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICAgICAgICAgICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKHRoaXMubm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbml0TXVzdGFjaGUodGhpcywgb3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgICAgIERvbUludGVycG9sYXRvci5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICB1cGRhdGU6IHVwZGF0ZU11c3RhY2hlLFxuICAgICAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZU11c3RhY2hlLFxuICAgICAgICAgICAgZGV0YWNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoZGVzdHJveSkge1xuICAgICAgICAgICAgICAgIGlmIChkZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRlYXJkb3duKHRoaXMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGF0YSA9IHZhbHVlID09IHVuZGVmaW5lZCA/ICcnIDogdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpcnN0Tm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnZhbHVlICE9IHVuZGVmaW5lZCA/ICcnICsgdGhpcy52YWx1ZSA6ICcnO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKGxlc3NUaGFuLCAnJmx0OycpLnJlcGxhY2UoZ3JlYXRlclRoYW4sICcmZ3Q7Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBEb21JbnRlcnBvbGF0b3I7XG4gICAgfShjb25maWdfdHlwZXMsIHNoYXJlZF90ZWFyZG93biwgcmVuZGVyX3NoYXJlZF9pbml0TXVzdGFjaGUsIHJlbmRlcl9zaGFyZWRfcmVzb2x2ZU11c3RhY2hlLCByZW5kZXJfc2hhcmVkX3VwZGF0ZU11c3RhY2hlKTtcbnZhciByZW5kZXJfc2hhcmVkX3VwZGF0ZVNlY3Rpb24gPSBmdW5jdGlvbiAoaXNBcnJheSwgaXNPYmplY3QsIGNyZWF0ZSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzZWN0aW9uLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGZyYWdtZW50T3B0aW9ucztcbiAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdG9yOiBzZWN0aW9uLmRlc2NyaXB0b3IuZixcbiAgICAgICAgICAgICAgICByb290OiBzZWN0aW9uLnJvb3QsXG4gICAgICAgICAgICAgICAgcE5vZGU6IHNlY3Rpb24ucGFyZW50RnJhZ21lbnQucE5vZGUsXG4gICAgICAgICAgICAgICAgb3duZXI6IHNlY3Rpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5kZXNjcmlwdG9yLm4pIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVDb25kaXRpb25hbFNlY3Rpb24oc2VjdGlvbiwgdmFsdWUsIHRydWUsIGZyYWdtZW50T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlTGlzdFNlY3Rpb24oc2VjdGlvbiwgdmFsdWUsIGZyYWdtZW50T3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmIChzZWN0aW9uLmRlc2NyaXB0b3IuaSkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVMaXN0T2JqZWN0U2VjdGlvbihzZWN0aW9uLCB2YWx1ZSwgZnJhZ21lbnRPcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDb250ZXh0U2VjdGlvbihzZWN0aW9uLCBmcmFnbWVudE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlQ29uZGl0aW9uYWxTZWN0aW9uKHNlY3Rpb24sIHZhbHVlLCBmYWxzZSwgZnJhZ21lbnRPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlTGlzdFNlY3Rpb24oc2VjdGlvbiwgdmFsdWUsIGZyYWdtZW50T3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGksIGxlbmd0aCwgZnJhZ21lbnRzVG9SZW1vdmU7XG4gICAgICAgICAgICBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobGVuZ3RoIDwgc2VjdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudHNUb1JlbW92ZSA9IHNlY3Rpb24uZnJhZ21lbnRzLnNwbGljZShsZW5ndGgsIHNlY3Rpb24ubGVuZ3RoIC0gbGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZnJhZ21lbnRzVG9SZW1vdmUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50c1RvUmVtb3ZlLnBvcCgpLnRlYXJkb3duKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGxlbmd0aCA+IHNlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IHNlY3Rpb24ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucy5jb250ZXh0U3RhY2sgPSBzZWN0aW9uLmNvbnRleHRTdGFjay5jb25jYXQoc2VjdGlvbi5rZXlwYXRoICsgJy4nICsgaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudE9wdGlvbnMuaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlY3Rpb24uZGVzY3JpcHRvci5pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRPcHRpb25zLmluZGV4UmVmID0gc2VjdGlvbi5kZXNjcmlwdG9yLmk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uLmZyYWdtZW50c1tpXSA9IHNlY3Rpb24uY3JlYXRlRnJhZ21lbnQoZnJhZ21lbnRPcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlY3Rpb24ubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUxpc3RPYmplY3RTZWN0aW9uKHNlY3Rpb24sIHZhbHVlLCBmcmFnbWVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBpZCwgZnJhZ21lbnRzQnlJZDtcbiAgICAgICAgICAgIGZyYWdtZW50c0J5SWQgPSBzZWN0aW9uLmZyYWdtZW50c0J5SWQgfHwgKHNlY3Rpb24uZnJhZ21lbnRzQnlJZCA9IGNyZWF0ZShudWxsKSk7XG4gICAgICAgICAgICBmb3IgKGlkIGluIGZyYWdtZW50c0J5SWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVbaWRdID09PSB1bmRlZmluZWQgJiYgZnJhZ21lbnRzQnlJZFtpZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzQnlJZFtpZF0udGVhcmRvd24odHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50c0J5SWRbaWRdID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGlkIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlW2lkXSAhPT0gdW5kZWZpbmVkICYmICFmcmFnbWVudHNCeUlkW2lkXSkge1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudE9wdGlvbnMuY29udGV4dFN0YWNrID0gc2VjdGlvbi5jb250ZXh0U3RhY2suY29uY2F0KHNlY3Rpb24ua2V5cGF0aCArICcuJyArIGlkKTtcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRPcHRpb25zLmluZGV4ID0gaWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWN0aW9uLmRlc2NyaXB0b3IuaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRPcHRpb25zLmluZGV4UmVmID0gc2VjdGlvbi5kZXNjcmlwdG9yLmk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzQnlJZFtpZF0gPSBzZWN0aW9uLmNyZWF0ZUZyYWdtZW50KGZyYWdtZW50T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbnRleHRTZWN0aW9uKHNlY3Rpb24sIGZyYWdtZW50T3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKCFzZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucy5jb250ZXh0U3RhY2sgPSBzZWN0aW9uLmNvbnRleHRTdGFjay5jb25jYXQoc2VjdGlvbi5rZXlwYXRoKTtcbiAgICAgICAgICAgICAgICBmcmFnbWVudE9wdGlvbnMuaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHNlY3Rpb24uZnJhZ21lbnRzWzBdID0gc2VjdGlvbi5jcmVhdGVGcmFnbWVudChmcmFnbWVudE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHNlY3Rpb24ubGVuZ3RoID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVDb25kaXRpb25hbFNlY3Rpb24oc2VjdGlvbiwgdmFsdWUsIGludmVydGVkLCBmcmFnbWVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBkb1JlbmRlciwgZW1wdHlBcnJheSwgZnJhZ21lbnRzVG9SZW1vdmUsIGZyYWdtZW50O1xuICAgICAgICAgICAgZW1wdHlBcnJheSA9IGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgIGlmIChpbnZlcnRlZCkge1xuICAgICAgICAgICAgICAgIGRvUmVuZGVyID0gZW1wdHlBcnJheSB8fCAhdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvUmVuZGVyID0gdmFsdWUgJiYgIWVtcHR5QXJyYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9SZW5kZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucy5jb250ZXh0U3RhY2sgPSBzZWN0aW9uLmNvbnRleHRTdGFjaztcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRPcHRpb25zLmluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgc2VjdGlvbi5mcmFnbWVudHNbMF0gPSBzZWN0aW9uLmNyZWF0ZUZyYWdtZW50KGZyYWdtZW50T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb24ubGVuZ3RoID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlY3Rpb24ubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHNUb1JlbW92ZSA9IHNlY3Rpb24uZnJhZ21lbnRzLnNwbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGZyYWdtZW50ID0gZnJhZ21lbnRzVG9SZW1vdmUucG9wKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50LnRlYXJkb3duKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24udGVhcmRvd25GcmFnbWVudHModHJ1ZSk7XG4gICAgICAgICAgICAgICAgc2VjdGlvbi5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSh1dGlsc19pc0FycmF5LCB1dGlsc19pc09iamVjdCwgdXRpbHNfY3JlYXRlKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfU2VjdGlvbl9yZWFzc2lnbkZyYWdtZW50ID0gZnVuY3Rpb24gKHR5cGVzLCB1bnJlZ2lzdGVyRGVwZW5kYW50LCBFeHByZXNzaW9uUmVzb2x2ZXIpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZWFzc2lnbkZyYWdtZW50O1xuICAgICAgICBmdW5jdGlvbiByZWFzc2lnbkZyYWdtZW50KGZyYWdtZW50LCBpbmRleFJlZiwgb2xkSW5kZXgsIG5ld0luZGV4LCBieSwgb2xkS2V5cGF0aCwgbmV3S2V5cGF0aCkge1xuICAgICAgICAgICAgdmFyIGksIGl0ZW0sIGNvbnRleHQsIHF1ZXJ5O1xuICAgICAgICAgICAgaWYgKGZyYWdtZW50Lmh0bWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZnJhZ21lbnQuaW5kZXhSZWZzICYmIGZyYWdtZW50LmluZGV4UmVmc1tpbmRleFJlZl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50LmluZGV4UmVmc1tpbmRleFJlZl0gPSBuZXdJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgPSBmcmFnbWVudC5jb250ZXh0U3RhY2subGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBmcmFnbWVudC5jb250ZXh0U3RhY2tbaV07XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuc3Vic3RyKDAsIG9sZEtleXBhdGgubGVuZ3RoKSA9PT0gb2xkS2V5cGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudC5jb250ZXh0U3RhY2tbaV0gPSBjb250ZXh0LnJlcGxhY2Uob2xkS2V5cGF0aCwgbmV3S2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSA9IGZyYWdtZW50Lml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gZnJhZ21lbnQuaXRlbXNbaV07XG4gICAgICAgICAgICAgICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkVMRU1FTlQ6XG4gICAgICAgICAgICAgICAgICAgIHJlYXNzaWduRWxlbWVudChpdGVtLCBpbmRleFJlZiwgb2xkSW5kZXgsIG5ld0luZGV4LCBieSwgb2xkS2V5cGF0aCwgbmV3S2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUEFSVElBTDpcbiAgICAgICAgICAgICAgICAgICAgcmVhc3NpZ25GcmFnbWVudChpdGVtLmZyYWdtZW50LCBpbmRleFJlZiwgb2xkSW5kZXgsIG5ld0luZGV4LCBieSwgb2xkS2V5cGF0aCwgbmV3S2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuQ09NUE9ORU5UOlxuICAgICAgICAgICAgICAgICAgICByZWFzc2lnbkZyYWdtZW50KGl0ZW0uaW5zdGFuY2UuZnJhZ21lbnQsIGluZGV4UmVmLCBvbGRJbmRleCwgbmV3SW5kZXgsIGJ5LCBvbGRLZXlwYXRoLCBuZXdLZXlwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXJ5ID0gZnJhZ21lbnQucm9vdC5fbGl2ZUNvbXBvbmVudFF1ZXJpZXNbaXRlbS5uYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnkuX21ha2VEaXJ0eSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuU0VDVElPTjpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLklOVEVSUE9MQVRPUjpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRSSVBMRTpcbiAgICAgICAgICAgICAgICAgICAgcmVhc3NpZ25NdXN0YWNoZShpdGVtLCBpbmRleFJlZiwgb2xkSW5kZXgsIG5ld0luZGV4LCBieSwgb2xkS2V5cGF0aCwgbmV3S2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiByZWFzc2lnbkVsZW1lbnQoZWxlbWVudCwgaW5kZXhSZWYsIG9sZEluZGV4LCBuZXdJbmRleCwgYnksIG9sZEtleXBhdGgsIG5ld0tleXBhdGgpIHtcbiAgICAgICAgICAgIHZhciBpLCBhdHRyaWJ1dGUsIHN0b3JhZ2UsIG1hc3RlckV2ZW50TmFtZSwgcHJveGllcywgcHJveHksIGJpbmRpbmcsIGJpbmRpbmdzLCBsaXZlUXVlcmllcywgcmFjdGl2ZTtcbiAgICAgICAgICAgIGkgPSBlbGVtZW50LmF0dHJpYnV0ZXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSA9IGVsZW1lbnQuYXR0cmlidXRlc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlLmZyYWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlYXNzaWduRnJhZ21lbnQoYXR0cmlidXRlLmZyYWdtZW50LCBpbmRleFJlZiwgb2xkSW5kZXgsIG5ld0luZGV4LCBieSwgb2xkS2V5cGF0aCwgbmV3S2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUudHdvd2F5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUudXBkYXRlQmluZGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdG9yYWdlID0gZWxlbWVudC5ub2RlLl9yYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0b3JhZ2Uua2V5cGF0aC5zdWJzdHIoMCwgb2xkS2V5cGF0aC5sZW5ndGgpID09PSBvbGRLZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2Uua2V5cGF0aCA9IHN0b3JhZ2Uua2V5cGF0aC5yZXBsYWNlKG9sZEtleXBhdGgsIG5ld0tleXBhdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhSZWYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdG9yYWdlLmluZGV4W2luZGV4UmVmXSA9IG5ld0luZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKG1hc3RlckV2ZW50TmFtZSBpbiBzdG9yYWdlLmV2ZW50cykge1xuICAgICAgICAgICAgICAgICAgICBwcm94aWVzID0gc3RvcmFnZS5ldmVudHNbbWFzdGVyRXZlbnROYW1lXS5wcm94aWVzO1xuICAgICAgICAgICAgICAgICAgICBpID0gcHJveGllcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3h5ID0gcHJveGllc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJveHkubiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFzc2lnbkZyYWdtZW50KHByb3h5LmEsIGluZGV4UmVmLCBvbGRJbmRleCwgbmV3SW5kZXgsIGJ5LCBvbGRLZXlwYXRoLCBuZXdLZXlwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm94eS5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhc3NpZ25GcmFnbWVudChwcm94eS5kLCBpbmRleFJlZiwgb2xkSW5kZXgsIG5ld0luZGV4LCBieSwgb2xkS2V5cGF0aCwgbmV3S2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGJpbmRpbmcgPSBzdG9yYWdlLmJpbmRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJpbmRpbmcua2V5cGF0aC5zdWJzdHIoMCwgb2xkS2V5cGF0aC5sZW5ndGgpID09PSBvbGRLZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5kaW5ncyA9IHN0b3JhZ2Uucm9vdC5fdHdvd2F5QmluZGluZ3NbYmluZGluZy5rZXlwYXRoXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmRpbmdzLnNwbGljZShiaW5kaW5ncy5pbmRleE9mKGJpbmRpbmcpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmRpbmcua2V5cGF0aCA9IGJpbmRpbmcua2V5cGF0aC5yZXBsYWNlKG9sZEtleXBhdGgsIG5ld0tleXBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmluZGluZ3MgPSBzdG9yYWdlLnJvb3QuX3R3b3dheUJpbmRpbmdzW2JpbmRpbmcua2V5cGF0aF0gfHwgKHN0b3JhZ2Uucm9vdC5fdHdvd2F5QmluZGluZ3NbYmluZGluZy5rZXlwYXRoXSA9IFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmRpbmdzLnB1c2goYmluZGluZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5mcmFnbWVudCkge1xuICAgICAgICAgICAgICAgIHJlYXNzaWduRnJhZ21lbnQoZWxlbWVudC5mcmFnbWVudCwgaW5kZXhSZWYsIG9sZEluZGV4LCBuZXdJbmRleCwgYnksIG9sZEtleXBhdGgsIG5ld0tleXBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpdmVRdWVyaWVzID0gZWxlbWVudC5saXZlUXVlcmllcykge1xuICAgICAgICAgICAgICAgIHJhY3RpdmUgPSBlbGVtZW50LnJvb3Q7XG4gICAgICAgICAgICAgICAgaSA9IGxpdmVRdWVyaWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhY3RpdmUuX2xpdmVRdWVyaWVzW2xpdmVRdWVyaWVzW2ldXS5fbWFrZURpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHJlYXNzaWduTXVzdGFjaGUobXVzdGFjaGUsIGluZGV4UmVmLCBvbGRJbmRleCwgbmV3SW5kZXgsIGJ5LCBvbGRLZXlwYXRoLCBuZXdLZXlwYXRoKSB7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIGlmIChtdXN0YWNoZS5kZXNjcmlwdG9yLngpIHtcbiAgICAgICAgICAgICAgICBpZiAobXVzdGFjaGUuZXhwcmVzc2lvblJlc29sdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIG11c3RhY2hlLmV4cHJlc3Npb25SZXNvbHZlci50ZWFyZG93bigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtdXN0YWNoZS5leHByZXNzaW9uUmVzb2x2ZXIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKG11c3RhY2hlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtdXN0YWNoZS5rZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG11c3RhY2hlLmtleXBhdGguc3Vic3RyKDAsIG9sZEtleXBhdGgubGVuZ3RoKSA9PT0gb2xkS2V5cGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBtdXN0YWNoZS5yZXNvbHZlKG11c3RhY2hlLmtleXBhdGgucmVwbGFjZShvbGRLZXlwYXRoLCBuZXdLZXlwYXRoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtdXN0YWNoZS5pbmRleFJlZiA9PT0gaW5kZXhSZWYpIHtcbiAgICAgICAgICAgICAgICBtdXN0YWNoZS52YWx1ZSA9IG5ld0luZGV4O1xuICAgICAgICAgICAgICAgIG11c3RhY2hlLnJlbmRlcihuZXdJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXVzdGFjaGUuZnJhZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgaSA9IG11c3RhY2hlLmZyYWdtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICByZWFzc2lnbkZyYWdtZW50KG11c3RhY2hlLmZyYWdtZW50c1tpXSwgaW5kZXhSZWYsIG9sZEluZGV4LCBuZXdJbmRleCwgYnksIG9sZEtleXBhdGgsIG5ld0tleXBhdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0oY29uZmlnX3R5cGVzLCBzaGFyZWRfdW5yZWdpc3RlckRlcGVuZGFudCwgcmVuZGVyX3NoYXJlZF9FeHByZXNzaW9uUmVzb2x2ZXJfX0V4cHJlc3Npb25SZXNvbHZlcik7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X1NlY3Rpb25fcmVhc3NpZ25GcmFnbWVudHMgPSBmdW5jdGlvbiAodHlwZXMsIHJlYXNzaWduRnJhZ21lbnQsIHByZURvbVVwZGF0ZSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyb290LCBzZWN0aW9uLCBzdGFydCwgZW5kLCBieSkge1xuICAgICAgICAgICAgdmFyIGksIGZyYWdtZW50LCBpbmRleFJlZiwgb2xkSW5kZXgsIG5ld0luZGV4LCBvbGRLZXlwYXRoLCBuZXdLZXlwYXRoO1xuICAgICAgICAgICAgaW5kZXhSZWYgPSBzZWN0aW9uLmRlc2NyaXB0b3IuaTtcbiAgICAgICAgICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudCA9IHNlY3Rpb24uZnJhZ21lbnRzW2ldO1xuICAgICAgICAgICAgICAgIG9sZEluZGV4ID0gaSAtIGJ5O1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBvbGRLZXlwYXRoID0gc2VjdGlvbi5rZXlwYXRoICsgJy4nICsgKGkgLSBieSk7XG4gICAgICAgICAgICAgICAgbmV3S2V5cGF0aCA9IHNlY3Rpb24ua2V5cGF0aCArICcuJyArIGk7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuaW5kZXggKz0gYnk7XG4gICAgICAgICAgICAgICAgcmVhc3NpZ25GcmFnbWVudChmcmFnbWVudCwgaW5kZXhSZWYsIG9sZEluZGV4LCBuZXdJbmRleCwgYnksIG9sZEtleXBhdGgsIG5ld0tleXBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJlRG9tVXBkYXRlKHJvb3QpO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCByZW5kZXJfRG9tRnJhZ21lbnRfU2VjdGlvbl9yZWFzc2lnbkZyYWdtZW50LCBzaGFyZWRfcHJlRG9tVXBkYXRlKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfU2VjdGlvbl9wcm90b3R5cGVfbWVyZ2UgPSBmdW5jdGlvbiAocmVhc3NpZ25GcmFnbWVudCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChuZXdJbmRpY2VzKSB7XG4gICAgICAgICAgICB2YXIgc2VjdGlvbiA9IHRoaXMsIHBhcmVudEZyYWdtZW50LCBmaXJzdENoYW5nZSwgY2hhbmdlZCwgaSwgbmV3TGVuZ3RoLCBuZXdGcmFnbWVudHMsIHRvVGVhcmRvd24sIGZyYWdtZW50T3B0aW9ucywgZnJhZ21lbnQsIG5leHROb2RlO1xuICAgICAgICAgICAgcGFyZW50RnJhZ21lbnQgPSB0aGlzLnBhcmVudEZyYWdtZW50O1xuICAgICAgICAgICAgbmV3RnJhZ21lbnRzID0gW107XG4gICAgICAgICAgICBuZXdJbmRpY2VzLmZvckVhY2goZnVuY3Rpb24gKG5ld0luZGV4LCBvbGRJbmRleCkge1xuICAgICAgICAgICAgICAgIHZhciBieSwgb2xkS2V5cGF0aCwgbmV3S2V5cGF0aDtcbiAgICAgICAgICAgICAgICBpZiAobmV3SW5kZXggPT09IG9sZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZyYWdtZW50c1tuZXdJbmRleF0gPSBzZWN0aW9uLmZyYWdtZW50c1tvbGRJbmRleF07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0Q2hhbmdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RDaGFuZ2UgPSBvbGRJbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5ld0luZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAodG9UZWFyZG93biB8fCAodG9UZWFyZG93biA9IFtdKSkucHVzaChzZWN0aW9uLmZyYWdtZW50c1tvbGRJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ5ID0gbmV3SW5kZXggLSBvbGRJbmRleDtcbiAgICAgICAgICAgICAgICBvbGRLZXlwYXRoID0gc2VjdGlvbi5rZXlwYXRoICsgJy4nICsgb2xkSW5kZXg7XG4gICAgICAgICAgICAgICAgbmV3S2V5cGF0aCA9IHNlY3Rpb24ua2V5cGF0aCArICcuJyArIG5ld0luZGV4O1xuICAgICAgICAgICAgICAgIHJlYXNzaWduRnJhZ21lbnQoc2VjdGlvbi5mcmFnbWVudHNbb2xkSW5kZXhdLCBzZWN0aW9uLmRlc2NyaXB0b3IuaSwgb2xkSW5kZXgsIG5ld0luZGV4LCBieSwgb2xkS2V5cGF0aCwgbmV3S2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgbmV3RnJhZ21lbnRzW25ld0luZGV4XSA9IHNlY3Rpb24uZnJhZ21lbnRzW29sZEluZGV4XTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHRvVGVhcmRvd24pIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZnJhZ21lbnQgPSB0b1RlYXJkb3duLnBvcCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50LnRlYXJkb3duKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJzdENoYW5nZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZmlyc3RDaGFuZ2UgPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld0xlbmd0aCA9IHRoaXMucm9vdC5nZXQodGhpcy5rZXlwYXRoKS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobmV3TGVuZ3RoID09PSBmaXJzdENoYW5nZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdG9yOiB0aGlzLmRlc2NyaXB0b3IuZixcbiAgICAgICAgICAgICAgICByb290OiB0aGlzLnJvb3QsXG4gICAgICAgICAgICAgICAgcE5vZGU6IHBhcmVudEZyYWdtZW50LnBOb2RlLFxuICAgICAgICAgICAgICAgIG93bmVyOiB0aGlzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVzY3JpcHRvci5pKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnRPcHRpb25zLmluZGV4UmVmID0gdGhpcy5kZXNjcmlwdG9yLmk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSBmaXJzdENoYW5nZTsgaSA8IG5ld0xlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZyYWdtZW50ID0gbmV3RnJhZ21lbnRzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jRnJhZy5hcHBlbmRDaGlsZChmcmFnbWVudC5kZXRhY2goZmFsc2UpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudE9wdGlvbnMuY29udGV4dFN0YWNrID0gdGhpcy5jb250ZXh0U3RhY2suY29uY2F0KHRoaXMua2V5cGF0aCArICcuJyArIGkpO1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudE9wdGlvbnMuaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudCA9IHRoaXMuY3JlYXRlRnJhZ21lbnQoZnJhZ21lbnRPcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudHNbaV0gPSBmcmFnbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHROb2RlID0gcGFyZW50RnJhZ21lbnQuZmluZE5leHROb2RlKHRoaXMpO1xuICAgICAgICAgICAgcGFyZW50RnJhZ21lbnQucE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuZG9jRnJhZywgbmV4dE5vZGUpO1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBuZXdMZW5ndGg7XG4gICAgICAgIH07XG4gICAgfShyZW5kZXJfRG9tRnJhZ21lbnRfU2VjdGlvbl9yZWFzc2lnbkZyYWdtZW50KTtcbnZhciBjaXJjdWxhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9KCk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X1NlY3Rpb25fX1NlY3Rpb24gPSBmdW5jdGlvbiAodHlwZXMsIGlzQ2xpZW50LCBpbml0TXVzdGFjaGUsIHVwZGF0ZU11c3RhY2hlLCByZXNvbHZlTXVzdGFjaGUsIHVwZGF0ZVNlY3Rpb24sIHJlYXNzaWduRnJhZ21lbnQsIHJlYXNzaWduRnJhZ21lbnRzLCBtZXJnZSwgdGVhcmRvd24sIGNpcmN1bGFyKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgRG9tU2VjdGlvbiwgRG9tRnJhZ21lbnQ7XG4gICAgICAgIGNpcmN1bGFyLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgRG9tRnJhZ21lbnQgPSBjaXJjdWxhci5Eb21GcmFnbWVudDtcbiAgICAgICAgfSk7XG4gICAgICAgIERvbVNlY3Rpb24gPSBmdW5jdGlvbiAob3B0aW9ucywgZG9jRnJhZykge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZXMuU0VDVElPTjtcbiAgICAgICAgICAgIHRoaXMuaW52ZXJ0ZWQgPSAhIW9wdGlvbnMuZGVzY3JpcHRvci5uO1xuICAgICAgICAgICAgdGhpcy5mcmFnbWVudHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGlmIChkb2NGcmFnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXNpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaW5pdE11c3RhY2hlKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKGRvY0ZyYWcpIHtcbiAgICAgICAgICAgICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKHRoaXMuZG9jRnJhZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpc2luZyA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICBEb21TZWN0aW9uLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlTXVzdGFjaGUsXG4gICAgICAgICAgICByZXNvbHZlOiByZXNvbHZlTXVzdGFjaGUsXG4gICAgICAgICAgICBzbWFydFVwZGF0ZTogZnVuY3Rpb24gKG1ldGhvZE5hbWUsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgZnJhZ21lbnRPcHRpb25zO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2ROYW1lID09PSAncHVzaCcgfHwgbWV0aG9kTmFtZSA9PT0gJ3Vuc2hpZnQnIHx8IG1ldGhvZE5hbWUgPT09ICdzcGxpY2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0b3I6IHRoaXMuZGVzY3JpcHRvci5mLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9vdDogdGhpcy5yb290LFxuICAgICAgICAgICAgICAgICAgICAgICAgcE5vZGU6IHRoaXMucGFyZW50RnJhZ21lbnQucE5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBvd25lcjogdGhpc1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kZXNjcmlwdG9yLmkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucy5pbmRleFJlZiA9IHRoaXMuZGVzY3JpcHRvci5pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzW21ldGhvZE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1ttZXRob2ROYW1lXShmcmFnbWVudE9wdGlvbnMsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudHMucG9wKCkudGVhcmRvd24odHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoIC09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uIChmcmFnbWVudE9wdGlvbnMsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQsIGVuZCwgaTtcbiAgICAgICAgICAgICAgICBzdGFydCA9IHRoaXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgYXJncy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudE9wdGlvbnMuY29udGV4dFN0YWNrID0gdGhpcy5jb250ZXh0U3RhY2suY29uY2F0KHRoaXMua2V5cGF0aCArICcuJyArIGkpO1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudE9wdGlvbnMuaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50c1tpXSA9IHRoaXMuY3JlYXRlRnJhZ21lbnQoZnJhZ21lbnRPcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggKz0gYXJncy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRGcmFnbWVudC5wTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb2NGcmFnLCB0aGlzLnBhcmVudEZyYWdtZW50LmZpbmROZXh0Tm9kZSh0aGlzKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hpZnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwbGljZShudWxsLCBbXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bnNoaWZ0OiBmdW5jdGlvbiAoZnJhZ21lbnRPcHRpb25zLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGxpY2UoZnJhZ21lbnRPcHRpb25zLCBbXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICBdLmNvbmNhdChuZXcgQXJyYXkoYXJncy5sZW5ndGgpKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BsaWNlOiBmdW5jdGlvbiAoZnJhZ21lbnRPcHRpb25zLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluc2VydGlvblBvaW50LCBhZGRlZEl0ZW1zLCByZW1vdmVkSXRlbXMsIGJhbGFuY2UsIGksIHN0YXJ0LCBlbmQsIHNwbGljZUFyZ3MsIHJlYXNzaWduU3RhcnQ7XG4gICAgICAgICAgICAgICAgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gKyhhcmdzWzBdIDwgMCA/IHRoaXMubGVuZ3RoICsgYXJnc1swXSA6IGFyZ3NbMF0pO1xuICAgICAgICAgICAgICAgIGFkZGVkSXRlbXMgPSBNYXRoLm1heCgwLCBhcmdzLmxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgICAgIHJlbW92ZWRJdGVtcyA9IGFyZ3NbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3NbMV0gOiB0aGlzLmxlbmd0aCAtIHN0YXJ0O1xuICAgICAgICAgICAgICAgIHJlbW92ZWRJdGVtcyA9IE1hdGgubWluKHJlbW92ZWRJdGVtcywgdGhpcy5sZW5ndGggLSBzdGFydCk7XG4gICAgICAgICAgICAgICAgYmFsYW5jZSA9IGFkZGVkSXRlbXMgLSByZW1vdmVkSXRlbXM7XG4gICAgICAgICAgICAgICAgaWYgKCFiYWxhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGJhbGFuY2UgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IHN0YXJ0IC0gYmFsYW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudHNbaV0udGVhcmRvd24odHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudHMuc3BsaWNlKHN0YXJ0LCAtYmFsYW5jZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gc3RhcnQgKyBiYWxhbmNlO1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnRpb25Qb2ludCA9IHRoaXMuZnJhZ21lbnRzW3N0YXJ0XSA/IHRoaXMuZnJhZ21lbnRzW3N0YXJ0XS5maXJzdE5vZGUoKSA6IHRoaXMucGFyZW50RnJhZ21lbnQuZmluZE5leHROb2RlKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBzcGxpY2VBcmdzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgIF0uY29uY2F0KG5ldyBBcnJheShiYWxhbmNlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRzLnNwbGljZS5hcHBseSh0aGlzLmZyYWdtZW50cywgc3BsaWNlQXJncyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucy5jb250ZXh0U3RhY2sgPSB0aGlzLmNvbnRleHRTdGFjay5jb25jYXQodGhpcy5rZXlwYXRoICsgJy4nICsgaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudE9wdGlvbnMuaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudHNbaV0gPSB0aGlzLmNyZWF0ZUZyYWdtZW50KGZyYWdtZW50T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRGcmFnbWVudC5wTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb2NGcmFnLCBpbnNlcnRpb25Qb2ludCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoICs9IGJhbGFuY2U7XG4gICAgICAgICAgICAgICAgcmVhc3NpZ25TdGFydCA9IHN0YXJ0ICsgYWRkZWRJdGVtcztcbiAgICAgICAgICAgICAgICByZWFzc2lnbkZyYWdtZW50cyh0aGlzLnJvb3QsIHRoaXMsIHJlYXNzaWduU3RhcnQsIHRoaXMubGVuZ3RoLCBiYWxhbmNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZXJnZTogbWVyZ2UsXG4gICAgICAgICAgICBkZXRhY2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgbGVuO1xuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMuZnJhZ21lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2NGcmFnLmFwcGVuZENoaWxkKHRoaXMuZnJhZ21lbnRzW2ldLmRldGFjaCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9jRnJhZztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKGRlc3Ryb3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlYXJkb3duRnJhZ21lbnRzKGRlc3Ryb3kpO1xuICAgICAgICAgICAgICAgIHRlYXJkb3duKHRoaXMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpcnN0Tm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyYWdtZW50c1swXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mcmFnbWVudHNbMF0uZmlyc3ROb2RlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudEZyYWdtZW50LmZpbmROZXh0Tm9kZSh0aGlzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kTmV4dE5vZGU6IGZ1bmN0aW9uIChmcmFnbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyYWdtZW50c1tmcmFnbWVudC5pbmRleCArIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYWdtZW50c1tmcmFnbWVudC5pbmRleCArIDFdLmZpcnN0Tm9kZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRGcmFnbWVudC5maW5kTmV4dE5vZGUodGhpcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd25GcmFnbWVudHM6IGZ1bmN0aW9uIChkZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkLCBmcmFnbWVudDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZnJhZ21lbnQgPSB0aGlzLmZyYWdtZW50cy5zaGlmdCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50LnRlYXJkb3duKGRlc3Ryb3kpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmFnbWVudHNCeUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaWQgaW4gdGhpcy5mcmFnbWVudHNCeUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmFnbWVudHNbaWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudHNCeUlkW2lkXS50ZWFyZG93bihkZXN0cm95KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50c0J5SWRbaWRdID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0Tm9kZSwgd3JhcHBlZDtcbiAgICAgICAgICAgICAgICBpZiAod3JhcHBlZCA9IHRoaXMucm9vdC5fd3JhcHBlZFt0aGlzLmtleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gd3JhcHBlZC5nZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVuZGVyaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVNlY3Rpb24odGhpcywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZG9jRnJhZyAmJiAhdGhpcy5kb2NGcmFnLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpc2luZyAmJiBpc0NsaWVudCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0Tm9kZSA9IHRoaXMucGFyZW50RnJhZ21lbnQuZmluZE5leHROb2RlKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dE5vZGUgJiYgbmV4dE5vZGUucGFyZW50Tm9kZSA9PT0gdGhpcy5wYXJlbnRGcmFnbWVudC5wTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRGcmFnbWVudC5wTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb2NGcmFnLCBuZXh0Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEZyYWdtZW50LnBOb2RlLmFwcGVuZENoaWxkKHRoaXMuZG9jRnJhZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JlYXRlRnJhZ21lbnQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZyYWdtZW50ID0gbmV3IERvbUZyYWdtZW50KG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRvY0ZyYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2NGcmFnLmFwcGVuZENoaWxkKGZyYWdtZW50LmRvY0ZyYWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZnJhZ21lbnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RyLCBpLCBpZCwgbGVuO1xuICAgICAgICAgICAgICAgIHN0ciA9ICcnO1xuICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gdGhpcy5mcmFnbWVudHNbaV0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJhZ21lbnRzQnlJZCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGlkIGluIHRoaXMuZnJhZ21lbnRzQnlJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJhZ21lbnRzQnlJZFtpZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gdGhpcy5mcmFnbWVudHNCeUlkW2lkXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIGksIGxlbiwgcXVlcnlSZXN1bHQ7XG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5mcmFnbWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnlSZXN1bHQgPSB0aGlzLmZyYWdtZW50c1tpXS5maW5kKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5UmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmRBbGw6IGZ1bmN0aW9uIChzZWxlY3RvciwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgbGVuO1xuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMuZnJhZ21lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudHNbaV0uZmluZEFsbChzZWxlY3RvciwgcXVlcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kQ29tcG9uZW50OiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgbGVuLCBxdWVyeVJlc3VsdDtcbiAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLmZyYWdtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWVyeVJlc3VsdCA9IHRoaXMuZnJhZ21lbnRzW2ldLmZpbmRDb21wb25lbnQoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnlSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZEFsbENvbXBvbmVudHM6IGZ1bmN0aW9uIChzZWxlY3RvciwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgbGVuO1xuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMuZnJhZ21lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudHNbaV0uZmluZEFsbENvbXBvbmVudHMoc2VsZWN0b3IsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBEb21TZWN0aW9uO1xuICAgIH0oY29uZmlnX3R5cGVzLCBjb25maWdfaXNDbGllbnQsIHJlbmRlcl9zaGFyZWRfaW5pdE11c3RhY2hlLCByZW5kZXJfc2hhcmVkX3VwZGF0ZU11c3RhY2hlLCByZW5kZXJfc2hhcmVkX3Jlc29sdmVNdXN0YWNoZSwgcmVuZGVyX3NoYXJlZF91cGRhdGVTZWN0aW9uLCByZW5kZXJfRG9tRnJhZ21lbnRfU2VjdGlvbl9yZWFzc2lnbkZyYWdtZW50LCByZW5kZXJfRG9tRnJhZ21lbnRfU2VjdGlvbl9yZWFzc2lnbkZyYWdtZW50cywgcmVuZGVyX0RvbUZyYWdtZW50X1NlY3Rpb25fcHJvdG90eXBlX21lcmdlLCBzaGFyZWRfdGVhcmRvd24sIGNpcmN1bGFyKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfVHJpcGxlID0gZnVuY3Rpb24gKHR5cGVzLCBtYXRjaGVzLCBpbml0TXVzdGFjaGUsIHVwZGF0ZU11c3RhY2hlLCByZXNvbHZlTXVzdGFjaGUsIGluc2VydEh0bWwsIHRlYXJkb3duKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgRG9tVHJpcGxlID0gZnVuY3Rpb24gKG9wdGlvbnMsIGRvY0ZyYWcpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGVzLlRSSVBMRTtcbiAgICAgICAgICAgIGlmIChkb2NGcmFnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGlzaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGluaXRNdXN0YWNoZSh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChkb2NGcmFnKSB7XG4gICAgICAgICAgICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZCh0aGlzLmRvY0ZyYWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXNpbmcgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgRG9tVHJpcGxlLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlTXVzdGFjaGUsXG4gICAgICAgICAgICByZXNvbHZlOiByZXNvbHZlTXVzdGFjaGUsXG4gICAgICAgICAgICBkZXRhY2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IHRoaXMubm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2NGcmFnLmFwcGVuZENoaWxkKHRoaXMubm9kZXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb2NGcmFnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoZGVzdHJveSkge1xuICAgICAgICAgICAgICAgIGlmIChkZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jRnJhZyA9IHRoaXMubm9kZXMgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0ZWFyZG93bih0aGlzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaXJzdE5vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2Rlc1swXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ub2Rlc1swXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50RnJhZ21lbnQuZmluZE5leHROb2RlKHRoaXMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKGh0bWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSwgcE5vZGU7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMubm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5vZGVzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghaHRtbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcE5vZGUgPSB0aGlzLnBhcmVudEZyYWdtZW50LnBOb2RlO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZXMgPSBpbnNlcnRIdG1sKGh0bWwsIHBOb2RlLnRhZ05hbWUsIHRoaXMuZG9jRnJhZyk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpc2luZykge1xuICAgICAgICAgICAgICAgICAgICBwTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb2NGcmFnLCB0aGlzLnBhcmVudEZyYWdtZW50LmZpbmROZXh0Tm9kZSh0aGlzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgIT0gdW5kZWZpbmVkID8gdGhpcy52YWx1ZSA6ICcnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmQ6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHZhciBpLCBsZW4sIG5vZGUsIHF1ZXJ5UmVzdWx0O1xuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMubm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5ub2Rlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgIT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzKG5vZGUsIHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXJ5UmVzdWx0ID0gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5UmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmRBbGw6IGZ1bmN0aW9uIChzZWxlY3RvciwgcXVlcnlSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgbGVuLCBub2RlLCBxdWVyeUFsbFJlc3VsdCwgbnVtTm9kZXMsIGo7XG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5ub2Rlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5vZGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMobm9kZSwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeVJlc3VsdC5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWVyeUFsbFJlc3VsdCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bU5vZGVzID0gcXVlcnlBbGxSZXN1bHQubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IG51bU5vZGVzOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeVJlc3VsdC5wdXNoKHF1ZXJ5QWxsUmVzdWx0W2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIERvbVRyaXBsZTtcbiAgICB9KGNvbmZpZ190eXBlcywgdXRpbHNfbWF0Y2hlcywgcmVuZGVyX3NoYXJlZF9pbml0TXVzdGFjaGUsIHJlbmRlcl9zaGFyZWRfdXBkYXRlTXVzdGFjaGUsIHJlbmRlcl9zaGFyZWRfcmVzb2x2ZU11c3RhY2hlLCByZW5kZXJfRG9tRnJhZ21lbnRfc2hhcmVkX2luc2VydEh0bWwsIHNoYXJlZF90ZWFyZG93bik7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfaW5pdGlhbGlzZV9nZXRFbGVtZW50TmFtZXNwYWNlID0gZnVuY3Rpb24gKG5hbWVzcGFjZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGVzY3JpcHRvciwgcGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IuYSAmJiBkZXNjcmlwdG9yLmEueG1sbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRvci5hLnhtbG5zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3IuZSA9PT0gJ3N2ZycgPyBuYW1lc3BhY2VzLnN2ZyA6IHBhcmVudE5vZGUubmFtZXNwYWNlVVJJIHx8IG5hbWVzcGFjZXMuaHRtbDtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ19uYW1lc3BhY2VzKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfc2hhcmVkX2VuZm9yY2VDYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIHN2Z0NhbWVsQ2FzZUVsZW1lbnRzLCBzdmdDYW1lbENhc2VBdHRyaWJ1dGVzLCBjcmVhdGVNYXAsIG1hcDtcbiAgICAgICAgc3ZnQ2FtZWxDYXNlRWxlbWVudHMgPSAnYWx0R2x5cGggYWx0R2x5cGhEZWYgYWx0R2x5cGhJdGVtIGFuaW1hdGVDb2xvciBhbmltYXRlTW90aW9uIGFuaW1hdGVUcmFuc2Zvcm0gY2xpcFBhdGggZmVCbGVuZCBmZUNvbG9yTWF0cml4IGZlQ29tcG9uZW50VHJhbnNmZXIgZmVDb21wb3NpdGUgZmVDb252b2x2ZU1hdHJpeCBmZURpZmZ1c2VMaWdodGluZyBmZURpc3BsYWNlbWVudE1hcCBmZURpc3RhbnRMaWdodCBmZUZsb29kIGZlRnVuY0EgZmVGdW5jQiBmZUZ1bmNHIGZlRnVuY1IgZmVHYXVzc2lhbkJsdXIgZmVJbWFnZSBmZU1lcmdlIGZlTWVyZ2VOb2RlIGZlTW9ycGhvbG9neSBmZU9mZnNldCBmZVBvaW50TGlnaHQgZmVTcGVjdWxhckxpZ2h0aW5nIGZlU3BvdExpZ2h0IGZlVGlsZSBmZVR1cmJ1bGVuY2UgZm9yZWlnbk9iamVjdCBnbHlwaFJlZiBsaW5lYXJHcmFkaWVudCByYWRpYWxHcmFkaWVudCB0ZXh0UGF0aCB2a2Vybicuc3BsaXQoJyAnKTtcbiAgICAgICAgc3ZnQ2FtZWxDYXNlQXR0cmlidXRlcyA9ICdhdHRyaWJ1dGVOYW1lIGF0dHJpYnV0ZVR5cGUgYmFzZUZyZXF1ZW5jeSBiYXNlUHJvZmlsZSBjYWxjTW9kZSBjbGlwUGF0aFVuaXRzIGNvbnRlbnRTY3JpcHRUeXBlIGNvbnRlbnRTdHlsZVR5cGUgZGlmZnVzZUNvbnN0YW50IGVkZ2VNb2RlIGV4dGVybmFsUmVzb3VyY2VzUmVxdWlyZWQgZmlsdGVyUmVzIGZpbHRlclVuaXRzIGdseXBoUmVmIGdyYWRpZW50VHJhbnNmb3JtIGdyYWRpZW50VW5pdHMga2VybmVsTWF0cml4IGtlcm5lbFVuaXRMZW5ndGgga2V5UG9pbnRzIGtleVNwbGluZXMga2V5VGltZXMgbGVuZ3RoQWRqdXN0IGxpbWl0aW5nQ29uZUFuZ2xlIG1hcmtlckhlaWdodCBtYXJrZXJVbml0cyBtYXJrZXJXaWR0aCBtYXNrQ29udGVudFVuaXRzIG1hc2tVbml0cyBudW1PY3RhdmVzIHBhdGhMZW5ndGggcGF0dGVybkNvbnRlbnRVbml0cyBwYXR0ZXJuVHJhbnNmb3JtIHBhdHRlcm5Vbml0cyBwb2ludHNBdFggcG9pbnRzQXRZIHBvaW50c0F0WiBwcmVzZXJ2ZUFscGhhIHByZXNlcnZlQXNwZWN0UmF0aW8gcHJpbWl0aXZlVW5pdHMgcmVmWCByZWZZIHJlcGVhdENvdW50IHJlcGVhdER1ciByZXF1aXJlZEV4dGVuc2lvbnMgcmVxdWlyZWRGZWF0dXJlcyBzcGVjdWxhckNvbnN0YW50IHNwZWN1bGFyRXhwb25lbnQgc3ByZWFkTWV0aG9kIHN0YXJ0T2Zmc2V0IHN0ZERldmlhdGlvbiBzdGl0Y2hUaWxlcyBzdXJmYWNlU2NhbGUgc3lzdGVtTGFuZ3VhZ2UgdGFibGVWYWx1ZXMgdGFyZ2V0WCB0YXJnZXRZIHRleHRMZW5ndGggdmlld0JveCB2aWV3VGFyZ2V0IHhDaGFubmVsU2VsZWN0b3IgeUNoYW5uZWxTZWxlY3RvciB6b29tQW5kUGFuJy5zcGxpdCgnICcpO1xuICAgICAgICBjcmVhdGVNYXAgPSBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICAgIHZhciBtYXAgPSB7fSwgaSA9IGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBtYXBbaXRlbXNbaV0udG9Mb3dlckNhc2UoKV0gPSBpdGVtc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtYXA7XG4gICAgICAgIH07XG4gICAgICAgIG1hcCA9IGNyZWF0ZU1hcChzdmdDYW1lbENhc2VFbGVtZW50cy5jb25jYXQoc3ZnQ2FtZWxDYXNlQXR0cmlidXRlcykpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW1lbnROYW1lKSB7XG4gICAgICAgICAgICB2YXIgbG93ZXJDYXNlRWxlbWVudE5hbWUgPSBlbGVtZW50TmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIG1hcFtsb3dlckNhc2VFbGVtZW50TmFtZV0gfHwgbG93ZXJDYXNlRWxlbWVudE5hbWU7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9BdHRyaWJ1dGVfaGVscGVyc19kZXRlcm1pbmVOYW1lQW5kTmFtZXNwYWNlID0gZnVuY3Rpb24gKG5hbWVzcGFjZXMsIGVuZm9yY2VDYXNlKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGF0dHJpYnV0ZSwgbmFtZSkge1xuICAgICAgICAgICAgdmFyIGNvbG9uSW5kZXgsIG5hbWVzcGFjZVByZWZpeDtcbiAgICAgICAgICAgIGNvbG9uSW5kZXggPSBuYW1lLmluZGV4T2YoJzonKTtcbiAgICAgICAgICAgIGlmIChjb2xvbkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIG5hbWVzcGFjZVByZWZpeCA9IG5hbWUuc3Vic3RyKDAsIGNvbG9uSW5kZXgpO1xuICAgICAgICAgICAgICAgIGlmIChuYW1lc3BhY2VQcmVmaXggIT09ICd4bWxucycpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKGNvbG9uSW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlLm5hbWUgPSBlbmZvcmNlQ2FzZShuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlLmxjTmFtZSA9IGF0dHJpYnV0ZS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS5uYW1lc3BhY2UgPSBuYW1lc3BhY2VzW25hbWVzcGFjZVByZWZpeC50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhdHRyaWJ1dGUubmFtZXNwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyAnVW5rbm93biBuYW1lc3BhY2UgKFwiJyArIG5hbWVzcGFjZVByZWZpeCArICdcIiknO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdHRyaWJ1dGUubmFtZSA9IGF0dHJpYnV0ZS5lbGVtZW50Lm5hbWVzcGFjZSAhPT0gbmFtZXNwYWNlcy5odG1sID8gZW5mb3JjZUNhc2UobmFtZSkgOiBuYW1lO1xuICAgICAgICAgICAgYXR0cmlidXRlLmxjTmFtZSA9IGF0dHJpYnV0ZS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH07XG4gICAgfShjb25maWdfbmFtZXNwYWNlcywgcmVuZGVyX0RvbUZyYWdtZW50X3NoYXJlZF9lbmZvcmNlQ2FzZSk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0F0dHJpYnV0ZV9oZWxwZXJzX3NldFN0YXRpY0F0dHJpYnV0ZSA9IGZ1bmN0aW9uIChuYW1lc3BhY2VzKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGF0dHJpYnV0ZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIG5vZGUsIHZhbHVlID0gb3B0aW9ucy52YWx1ZSA9PT0gbnVsbCA/ICcnIDogb3B0aW9ucy52YWx1ZTtcbiAgICAgICAgICAgIGlmIChub2RlID0gb3B0aW9ucy5wTm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUubmFtZXNwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlTlMoYXR0cmlidXRlLm5hbWVzcGFjZSwgb3B0aW9ucy5uYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubmFtZSA9PT0gJ3N0eWxlJyAmJiBub2RlLnN0eWxlLnNldEF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zdHlsZS5zZXRBdHRyaWJ1dGUoJ2Nzc1RleHQnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5uYW1lID09PSAnY2xhc3MnICYmICghbm9kZS5uYW1lc3BhY2VVUkkgfHwgbm9kZS5uYW1lc3BhY2VVUkkgPT09IG5hbWVzcGFjZXMuaHRtbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY2xhc3NOYW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShvcHRpb25zLm5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlLm5hbWUgPT09ICdpZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5yb290Lm5vZGVzW29wdGlvbnMudmFsdWVdID0gbm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS5uYW1lID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuX3JhY3RpdmUudmFsdWUgPSBvcHRpb25zLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF0dHJpYnV0ZS52YWx1ZSA9IG9wdGlvbnMudmFsdWU7XG4gICAgICAgIH07XG4gICAgfShjb25maWdfbmFtZXNwYWNlcyk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0F0dHJpYnV0ZV9oZWxwZXJzX2RldGVybWluZVByb3BlcnR5TmFtZSA9IGZ1bmN0aW9uIChuYW1lc3BhY2VzKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgcHJvcGVydHlOYW1lcyA9IHtcbiAgICAgICAgICAgICAgICAnYWNjZXB0LWNoYXJzZXQnOiAnYWNjZXB0Q2hhcnNldCcsXG4gICAgICAgICAgICAgICAgYWNjZXNza2V5OiAnYWNjZXNzS2V5JyxcbiAgICAgICAgICAgICAgICBiZ2NvbG9yOiAnYmdDb2xvcicsXG4gICAgICAgICAgICAgICAgJ2NsYXNzJzogJ2NsYXNzTmFtZScsXG4gICAgICAgICAgICAgICAgY29kZWJhc2U6ICdjb2RlQmFzZScsXG4gICAgICAgICAgICAgICAgY29sc3BhbjogJ2NvbFNwYW4nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRlZGl0YWJsZTogJ2NvbnRlbnRFZGl0YWJsZScsXG4gICAgICAgICAgICAgICAgZGF0ZXRpbWU6ICdkYXRlVGltZScsXG4gICAgICAgICAgICAgICAgZGlybmFtZTogJ2Rpck5hbWUnLFxuICAgICAgICAgICAgICAgICdmb3InOiAnaHRtbEZvcicsXG4gICAgICAgICAgICAgICAgJ2h0dHAtZXF1aXYnOiAnaHR0cEVxdWl2JyxcbiAgICAgICAgICAgICAgICBpc21hcDogJ2lzTWFwJyxcbiAgICAgICAgICAgICAgICBtYXhsZW5ndGg6ICdtYXhMZW5ndGgnLFxuICAgICAgICAgICAgICAgIG5vdmFsaWRhdGU6ICdub1ZhbGlkYXRlJyxcbiAgICAgICAgICAgICAgICBwdWJkYXRlOiAncHViRGF0ZScsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHk6ICdyZWFkT25seScsXG4gICAgICAgICAgICAgICAgcm93c3BhbjogJ3Jvd1NwYW4nLFxuICAgICAgICAgICAgICAgIHRhYmluZGV4OiAndGFiSW5kZXgnLFxuICAgICAgICAgICAgICAgIHVzZW1hcDogJ3VzZU1hcCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYXR0cmlidXRlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgcHJvcGVydHlOYW1lO1xuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS5wTm9kZSAmJiAhYXR0cmlidXRlLm5hbWVzcGFjZSAmJiAoIW9wdGlvbnMucE5vZGUubmFtZXNwYWNlVVJJIHx8IG9wdGlvbnMucE5vZGUubmFtZXNwYWNlVVJJID09PSBuYW1lc3BhY2VzLmh0bWwpKSB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lc1thdHRyaWJ1dGUubmFtZV0gfHwgYXR0cmlidXRlLm5hbWU7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucE5vZGVbcHJvcGVydHlOYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS5wcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5wTm9kZVtwcm9wZXJ0eU5hbWVdID09PSAnYm9vbGVhbicgfHwgcHJvcGVydHlOYW1lID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS51c2VQcm9wZXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oY29uZmlnX25hbWVzcGFjZXMpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9BdHRyaWJ1dGVfcHJvdG90eXBlX2JpbmQgPSBmdW5jdGlvbiAodHlwZXMsIHdhcm4sIGFycmF5Q29udGVudHNNYXRjaCwgZ2V0VmFsdWVGcm9tQ2hlY2tib3hlcykge1xuICAgICAgICBcbiAgICAgICAgdmFyIGJpbmRBdHRyaWJ1dGUsIGdldEludGVycG9sYXRvciwgdXBkYXRlTW9kZWwsIHVwZGF0ZSwgZ2V0QmluZGluZywgaW5oZXJpdFByb3BlcnRpZXMsIE11bHRpcGxlU2VsZWN0QmluZGluZywgU2VsZWN0QmluZGluZywgUmFkaW9OYW1lQmluZGluZywgQ2hlY2tib3hOYW1lQmluZGluZywgQ2hlY2tlZEJpbmRpbmcsIEZpbGVMaXN0QmluZGluZywgQ29udGVudEVkaXRhYmxlQmluZGluZywgR2VuZXJpY0JpbmRpbmc7XG4gICAgICAgIGJpbmRBdHRyaWJ1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMucE5vZGUsIGludGVycG9sYXRvciwgYmluZGluZywgYmluZGluZ3M7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZnJhZ21lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnRlcnBvbGF0b3IgPSBnZXRJbnRlcnBvbGF0b3IodGhpcyk7XG4gICAgICAgICAgICBpZiAoIWludGVycG9sYXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW50ZXJwb2xhdG9yID0gaW50ZXJwb2xhdG9yO1xuICAgICAgICAgICAgdGhpcy5rZXlwYXRoID0gaW50ZXJwb2xhdG9yLmtleXBhdGggfHwgaW50ZXJwb2xhdG9yLmRlc2NyaXB0b3IucjtcbiAgICAgICAgICAgIGJpbmRpbmcgPSBnZXRCaW5kaW5nKHRoaXMpO1xuICAgICAgICAgICAgaWYgKCFiaW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5fcmFjdGl2ZS5iaW5kaW5nID0gdGhpcy5lbGVtZW50LmJpbmRpbmcgPSBiaW5kaW5nO1xuICAgICAgICAgICAgdGhpcy50d293YXkgPSB0cnVlO1xuICAgICAgICAgICAgYmluZGluZ3MgPSB0aGlzLnJvb3QuX3R3b3dheUJpbmRpbmdzW3RoaXMua2V5cGF0aF0gfHwgKHRoaXMucm9vdC5fdHdvd2F5QmluZGluZ3NbdGhpcy5rZXlwYXRoXSA9IFtdKTtcbiAgICAgICAgICAgIGJpbmRpbmdzW2JpbmRpbmdzLmxlbmd0aF0gPSBiaW5kaW5nO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHVwZGF0ZU1vZGVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fcmFjdGl2ZS5iaW5kaW5nLnVwZGF0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICB1cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLl9yYWN0aXZlLnJvb3QuZ2V0KHRoaXMuX3JhY3RpdmUuYmluZGluZy5rZXlwYXRoKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZSA9PSB1bmRlZmluZWQgPyAnJyA6IHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICBnZXRJbnRlcnBvbGF0b3IgPSBmdW5jdGlvbiAoYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSwgZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS5mcmFnbWVudC5pdGVtcy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZW0gPSBhdHRyaWJ1dGUuZnJhZ21lbnQuaXRlbXNbMF07XG4gICAgICAgICAgICBpZiAoaXRlbS50eXBlICE9PSB0eXBlcy5JTlRFUlBPTEFUT1IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXRlbS5rZXlwYXRoICYmICFpdGVtLnJlZikge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGl0ZW0ua2V5cGF0aCAmJiBpdGVtLmtleXBhdGguc3Vic3RyKDAsIDIpID09PSAnJHsnKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gJ1lvdSBjYW5ub3Qgc2V0IHVwIHR3by13YXkgYmluZGluZyBhZ2FpbnN0IGFuIGV4cHJlc3Npb24gJyArIGl0ZW0ua2V5cGF0aDtcbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlLnJvb3QuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgd2FybihlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9O1xuICAgICAgICBnZXRCaW5kaW5nID0gZnVuY3Rpb24gKGF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBhdHRyaWJ1dGUucE5vZGU7XG4gICAgICAgICAgICBpZiAobm9kZS50YWdOYW1lID09PSAnU0VMRUNUJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlLm11bHRpcGxlID8gbmV3IE11bHRpcGxlU2VsZWN0QmluZGluZyhhdHRyaWJ1dGUsIG5vZGUpIDogbmV3IFNlbGVjdEJpbmRpbmcoYXR0cmlidXRlLCBub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdjaGVja2JveCcgfHwgbm9kZS50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS5wcm9wZXJ0eU5hbWUgPT09ICduYW1lJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENoZWNrYm94TmFtZUJpbmRpbmcoYXR0cmlidXRlLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJhZGlvTmFtZUJpbmRpbmcoYXR0cmlidXRlLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlLnByb3BlcnR5TmFtZSA9PT0gJ2NoZWNrZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ2hlY2tlZEJpbmRpbmcoYXR0cmlidXRlLCBub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlLmxjTmFtZSAhPT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgICAgIHdhcm4oJ1RoaXMgaXMuLi4gb2RkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnZmlsZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZpbGVMaXN0QmluZGluZyhhdHRyaWJ1dGUsIG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUuZ2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29udGVudEVkaXRhYmxlQmluZGluZyhhdHRyaWJ1dGUsIG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmljQmluZGluZyhhdHRyaWJ1dGUsIG5vZGUpO1xuICAgICAgICB9O1xuICAgICAgICBNdWx0aXBsZVNlbGVjdEJpbmRpbmcgPSBmdW5jdGlvbiAoYXR0cmlidXRlLCBub2RlKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWVGcm9tTW9kZWw7XG4gICAgICAgICAgICBpbmhlcml0UHJvcGVydGllcyh0aGlzLCBhdHRyaWJ1dGUsIG5vZGUpO1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgdmFsdWVGcm9tTW9kZWwgPSB0aGlzLnJvb3QuZ2V0KHRoaXMua2V5cGF0aCk7XG4gICAgICAgICAgICBpZiAodmFsdWVGcm9tTW9kZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIE11bHRpcGxlU2VsZWN0QmluZGluZy5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSwgb3B0aW9ucywgaSwgbGVuO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gW107XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHRoaXMubm9kZS5vcHRpb25zO1xuICAgICAgICAgICAgICAgIGxlbiA9IG9wdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uc1tpXS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVbdmFsdWUubGVuZ3RoXSA9IG9wdGlvbnNbaV0uX3JhY3RpdmUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGUsIHByZXZpb3VzVmFsdWUsIHZhbHVlO1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSA9IHRoaXMuYXR0cjtcbiAgICAgICAgICAgICAgICBwcmV2aW91c1ZhbHVlID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlID09PSB1bmRlZmluZWQgfHwgIWFycmF5Q29udGVudHNNYXRjaCh2YWx1ZSwgcHJldmlvdXNWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlLnJlY2VpdmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3Quc2V0KHRoaXMua2V5cGF0aCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUucmVjZWl2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmVyVXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVmZXJyZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnJvb3QuX2RlZmVycmVkLmF0dHJzLnB1c2godGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWZlcnJlZCA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgU2VsZWN0QmluZGluZyA9IGZ1bmN0aW9uIChhdHRyaWJ1dGUsIG5vZGUpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZUZyb21Nb2RlbDtcbiAgICAgICAgICAgIGluaGVyaXRQcm9wZXJ0aWVzKHRoaXMsIGF0dHJpYnV0ZSwgbm9kZSk7XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICB2YWx1ZUZyb21Nb2RlbCA9IHRoaXMucm9vdC5nZXQodGhpcy5rZXlwYXRoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZUZyb21Nb2RlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgU2VsZWN0QmluZGluZy5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zLCBpLCBsZW47XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHRoaXMubm9kZS5vcHRpb25zO1xuICAgICAgICAgICAgICAgIGxlbiA9IG9wdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uc1tpXS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnNbaV0uX3JhY3RpdmUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52YWx1ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0ci5yZWNlaXZpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0ci52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5zZXQodGhpcy5rZXlwYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyLnJlY2VpdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmVyVXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVmZXJyZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnJvb3QuX2RlZmVycmVkLmF0dHJzLnB1c2godGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWZlcnJlZCA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgUmFkaW9OYW1lQmluZGluZyA9IGZ1bmN0aW9uIChhdHRyaWJ1dGUsIG5vZGUpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZUZyb21Nb2RlbDtcbiAgICAgICAgICAgIHRoaXMucmFkaW9OYW1lID0gdHJ1ZTtcbiAgICAgICAgICAgIGluaGVyaXRQcm9wZXJ0aWVzKHRoaXMsIGF0dHJpYnV0ZSwgbm9kZSk7XG4gICAgICAgICAgICBub2RlLm5hbWUgPSAne3snICsgYXR0cmlidXRlLmtleXBhdGggKyAnfX0nO1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKG5vZGUuYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlRnJvbU1vZGVsID0gdGhpcy5yb290LmdldCh0aGlzLmtleXBhdGgpO1xuICAgICAgICAgICAgaWYgKHZhbHVlRnJvbU1vZGVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBub2RlLmNoZWNrZWQgPSB2YWx1ZUZyb21Nb2RlbCA9PSBub2RlLl9yYWN0aXZlLnZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3QuX2RlZmVycmVkLnJhZGlvcy5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBSYWRpb05hbWVCaW5kaW5nLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5fcmFjdGl2ZSA/IHRoaXMubm9kZS5fcmFjdGl2ZS52YWx1ZSA6IHRoaXMubm9kZS52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ci5yZWNlaXZpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3Quc2V0KHRoaXMua2V5cGF0aCwgdGhpcy52YWx1ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyLnJlY2VpdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIENoZWNrYm94TmFtZUJpbmRpbmcgPSBmdW5jdGlvbiAoYXR0cmlidXRlLCBub2RlKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWVGcm9tTW9kZWwsIGNoZWNrZWQ7XG4gICAgICAgICAgICB0aGlzLmNoZWNrYm94TmFtZSA9IHRydWU7XG4gICAgICAgICAgICBpbmhlcml0UHJvcGVydGllcyh0aGlzLCBhdHRyaWJ1dGUsIG5vZGUpO1xuICAgICAgICAgICAgbm9kZS5uYW1lID0gJ3t7JyArIHRoaXMua2V5cGF0aCArICd9fSc7XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAobm9kZS5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWVGcm9tTW9kZWwgPSB0aGlzLnJvb3QuZ2V0KHRoaXMua2V5cGF0aCk7XG4gICAgICAgICAgICBpZiAodmFsdWVGcm9tTW9kZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNoZWNrZWQgPSB2YWx1ZUZyb21Nb2RlbC5pbmRleE9mKG5vZGUuX3JhY3RpdmUudmFsdWUpICE9PSAtMTtcbiAgICAgICAgICAgICAgICBub2RlLmNoZWNrZWQgPSBjaGVja2VkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb290Ll9kZWZlcnJlZC5jaGVja2JveGVzLmluZGV4T2YodGhpcy5rZXlwYXRoKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290Ll9kZWZlcnJlZC5jaGVja2JveGVzLnB1c2godGhpcy5rZXlwYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIENoZWNrYm94TmFtZUJpbmRpbmcucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgY2hhbmdlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGUuY2hlY2tlZCAhPT0gISF0aGlzLmNoZWNrZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5ub2RlLmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyLnJlY2VpdmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290LnNldCh0aGlzLmtleXBhdGgsIGdldFZhbHVlRnJvbUNoZWNrYm94ZXModGhpcy5yb290LCB0aGlzLmtleXBhdGgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHIucmVjZWl2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBDaGVja2VkQmluZGluZyA9IGZ1bmN0aW9uIChhdHRyaWJ1dGUsIG5vZGUpIHtcbiAgICAgICAgICAgIGluaGVyaXRQcm9wZXJ0aWVzKHRoaXMsIGF0dHJpYnV0ZSwgbm9kZSk7XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAobm9kZS5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBDaGVja2VkQmluZGluZy5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGUuY2hlY2tlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHIucmVjZWl2aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3Quc2V0KHRoaXMua2V5cGF0aCwgdGhpcy52YWx1ZSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHIucmVjZWl2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBGaWxlTGlzdEJpbmRpbmcgPSBmdW5jdGlvbiAoYXR0cmlidXRlLCBub2RlKSB7XG4gICAgICAgICAgICBpbmhlcml0UHJvcGVydGllcyh0aGlzLCBhdHRyaWJ1dGUsIG5vZGUpO1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICB9O1xuICAgICAgICBGaWxlTGlzdEJpbmRpbmcucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hdHRyLnBOb2RlLmZpbGVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0ci5yb290LnNldCh0aGlzLmF0dHIua2V5cGF0aCwgdGhpcy52YWx1ZSgpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBDb250ZW50RWRpdGFibGVCaW5kaW5nID0gZnVuY3Rpb24gKGF0dHJpYnV0ZSwgbm9kZSkge1xuICAgICAgICAgICAgaW5oZXJpdFByb3BlcnRpZXModGhpcywgYXR0cmlidXRlLCBub2RlKTtcbiAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5yb290LmxhenkpIHtcbiAgICAgICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIENvbnRlbnRFZGl0YWJsZUJpbmRpbmcucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyLnJlY2VpdmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290LnNldCh0aGlzLmtleXBhdGgsIHRoaXMubm9kZS5pbm5lckhUTUwpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0ci5yZWNlaXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgR2VuZXJpY0JpbmRpbmcgPSBmdW5jdGlvbiAoYXR0cmlidXRlLCBub2RlKSB7XG4gICAgICAgICAgICBpbmhlcml0UHJvcGVydGllcyh0aGlzLCBhdHRyaWJ1dGUsIG5vZGUpO1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnJvb3QubGF6eSkge1xuICAgICAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdXBkYXRlLCBmYWxzZSk7XG4gICAgICAgIH07XG4gICAgICAgIEdlbmVyaWNCaW5kaW5nLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5hdHRyLnBOb2RlLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICgrdmFsdWUgKyAnJyA9PT0gdmFsdWUgJiYgdmFsdWUuaW5kZXhPZignZScpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICt2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGUgPSB0aGlzLmF0dHIsIHZhbHVlID0gdGhpcy52YWx1ZSgpO1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS5yZWNlaXZpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS5yb290LnNldChhdHRyaWJ1dGUua2V5cGF0aCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS5yZWNlaXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHVwZGF0ZSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpbmhlcml0UHJvcGVydGllcyA9IGZ1bmN0aW9uIChiaW5kaW5nLCBhdHRyaWJ1dGUsIG5vZGUpIHtcbiAgICAgICAgICAgIGJpbmRpbmcuYXR0ciA9IGF0dHJpYnV0ZTtcbiAgICAgICAgICAgIGJpbmRpbmcubm9kZSA9IG5vZGU7XG4gICAgICAgICAgICBiaW5kaW5nLnJvb3QgPSBhdHRyaWJ1dGUucm9vdDtcbiAgICAgICAgICAgIGJpbmRpbmcua2V5cGF0aCA9IGF0dHJpYnV0ZS5rZXlwYXRoO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYmluZEF0dHJpYnV0ZTtcbiAgICB9KGNvbmZpZ190eXBlcywgdXRpbHNfd2FybiwgdXRpbHNfYXJyYXlDb250ZW50c01hdGNoLCBzaGFyZWRfZ2V0VmFsdWVGcm9tQ2hlY2tib3hlcyk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0F0dHJpYnV0ZV9wcm90b3R5cGVfdXBkYXRlID0gZnVuY3Rpb24gKGlzQXJyYXksIG5hbWVzcGFjZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciB1cGRhdGVBdHRyaWJ1dGUsIHVwZGF0ZUZpbGVJbnB1dFZhbHVlLCBkZWZlclNlbGVjdCwgaW5pdFNlbGVjdCwgdXBkYXRlU2VsZWN0LCB1cGRhdGVNdWx0aXBsZVNlbGVjdCwgdXBkYXRlUmFkaW9OYW1lLCB1cGRhdGVDaGVja2JveE5hbWUsIHVwZGF0ZUlFU3R5bGVBdHRyaWJ1dGUsIHVwZGF0ZUNsYXNzTmFtZSwgdXBkYXRlQ29udGVudEVkaXRhYmxlVmFsdWUsIHVwZGF0ZUV2ZXJ5dGhpbmdFbHNlO1xuICAgICAgICB1cGRhdGVBdHRyaWJ1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWFkeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZSA9IHRoaXMucE5vZGU7XG4gICAgICAgICAgICBpZiAobm9kZS50YWdOYW1lID09PSAnU0VMRUNUJyAmJiB0aGlzLmxjTmFtZSA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlID0gZGVmZXJTZWxlY3Q7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWZlcnJlZFVwZGF0ZSA9IGluaXRTZWxlY3Q7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5pc0ZpbGVJbnB1dFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUgPSB1cGRhdGVGaWxlSW5wdXRWYWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnR3b3dheSAmJiB0aGlzLmxjTmFtZSA9PT0gJ25hbWUnKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZVJhZGlvTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUgPSB1cGRhdGVDaGVja2JveE5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmxjTmFtZSA9PT0gJ3N0eWxlJyAmJiBub2RlLnN0eWxlLnNldEF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlID0gdXBkYXRlSUVTdHlsZUF0dHJpYnV0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmxjTmFtZSA9PT0gJ2NsYXNzJyAmJiAoIW5vZGUubmFtZXNwYWNlVVJJIHx8IG5vZGUubmFtZXNwYWNlVVJJID09PSBuYW1lc3BhY2VzLmh0bWwpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUgPSB1cGRhdGVDbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScpICYmIHRoaXMubGNOYW1lID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUgPSB1cGRhdGVDb250ZW50RWRpdGFibGVWYWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlID0gdXBkYXRlRXZlcnl0aGluZ0Vsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlRmlsZUlucHV0VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgaW5pdFNlbGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmZXJyZWRVcGRhdGUgPSB0aGlzLnBOb2RlLm11bHRpcGxlID8gdXBkYXRlTXVsdGlwbGVTZWxlY3QgOiB1cGRhdGVTZWxlY3Q7XG4gICAgICAgICAgICB0aGlzLmRlZmVycmVkVXBkYXRlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGRlZmVyU2VsZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5yb290Ll9kZWZlcnJlZC5zZWxlY3RWYWx1ZXMucHVzaCh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICB1cGRhdGVTZWxlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmZyYWdtZW50LmdldFZhbHVlKCksIG9wdGlvbnMsIG9wdGlvbiwgaTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnBOb2RlLl9yYWN0aXZlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICBvcHRpb25zID0gdGhpcy5wTm9kZS5vcHRpb25zO1xuICAgICAgICAgICAgaSA9IG9wdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbiA9IG9wdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5fcmFjdGl2ZS52YWx1ZSA9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlTXVsdGlwbGVTZWxlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmZyYWdtZW50LmdldFZhbHVlKCksIG9wdGlvbnMsIGk7XG4gICAgICAgICAgICBpZiAoIWlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBbdmFsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3B0aW9ucyA9IHRoaXMucE5vZGUub3B0aW9ucztcbiAgICAgICAgICAgIGkgPSBvcHRpb25zLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zW2ldLnNlbGVjdGVkID0gdmFsdWUuaW5kZXhPZihvcHRpb25zW2ldLl9yYWN0aXZlLnZhbHVlKSAhPT0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlUmFkaW9OYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5vZGUsIHZhbHVlO1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMucE5vZGU7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZnJhZ21lbnQuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIG5vZGUuY2hlY2tlZCA9IHZhbHVlID09IG5vZGUuX3JhY3RpdmUudmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlQ2hlY2tib3hOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5vZGUsIHZhbHVlO1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMucE5vZGU7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZnJhZ21lbnQuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGlmICghaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBub2RlLmNoZWNrZWQgPSB2YWx1ZSA9PSBub2RlLl9yYWN0aXZlLnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5jaGVja2VkID0gdmFsdWUuaW5kZXhPZihub2RlLl9yYWN0aXZlLnZhbHVlKSAhPT0gLTE7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlSUVTdHlsZUF0dHJpYnV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBub2RlLCB2YWx1ZTtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLnBOb2RlO1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmZyYWdtZW50LmdldFZhbHVlKCk7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLnNldEF0dHJpYnV0ZSgnY3NzVGV4dCcsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlQ2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5vZGUsIHZhbHVlO1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMucE5vZGU7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZnJhZ21lbnQuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIG5vZGUuY2xhc3NOYW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHVwZGF0ZUNvbnRlbnRFZGl0YWJsZVZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5vZGUsIHZhbHVlO1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMucE5vZGU7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZnJhZ21lbnQuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZWNlaXZpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHVwZGF0ZUV2ZXJ5dGhpbmdFbHNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5vZGUsIHZhbHVlO1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMucE5vZGU7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZnJhZ21lbnQuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsdWVBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgICAgICBub2RlLl9yYWN0aXZlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VQcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucmVjZWl2aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlW3RoaXMucHJvcGVydHlOYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hbWVzcGFjZSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZU5TKHRoaXMubmFtZXNwYWNlLCB0aGlzLm5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGNOYW1lID09PSAnaWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdC5ub2Rlc1t0aGlzLnZhbHVlXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3Qubm9kZXNbdmFsdWVdID0gbm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUodGhpcy5uYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB1cGRhdGVBdHRyaWJ1dGU7XG4gICAgfSh1dGlsc19pc0FycmF5LCBjb25maWdfbmFtZXNwYWNlcyk7XG52YXIgcGFyc2VfVG9rZW5pemVyX3V0aWxzX2dldFN0cmluZ01hdGNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgICAgIHZhciBzdWJzdHI7XG4gICAgICAgICAgICBzdWJzdHIgPSB0aGlzLnN0ci5zdWJzdHIodGhpcy5wb3MsIHN0cmluZy5sZW5ndGgpO1xuICAgICAgICAgICAgaWYgKHN1YnN0ciA9PT0gc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3MgKz0gc3RyaW5nLmxlbmd0aDtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHBhcnNlX1Rva2VuaXplcl91dGlsc19hbGxvd1doaXRlc3BhY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgbGVhZGluZ1doaXRlc3BhY2UgPSAvXlxccysvO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gbGVhZGluZ1doaXRlc3BhY2UuZXhlYyh0aGlzLnJlbWFpbmluZygpKTtcbiAgICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucG9zICs9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaFswXTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgcGFyc2VfVG9rZW5pemVyX3V0aWxzX21ha2VSZWdleE1hdGNoZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHJlZ2V4KSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHJlZ2V4LmV4ZWModG9rZW5pemVyLnN0ci5zdWJzdHJpbmcodG9rZW5pemVyLnBvcykpO1xuICAgICAgICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgKz0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9nZXRTdHJpbmdMaXRlcmFsX2dldEVzY2FwZWRDaGFycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgY2hhcnMgPSAnJywgY2hhcmFjdGVyO1xuICAgICAgICAgICAgY2hhcmFjdGVyID0gZ2V0RXNjYXBlZENoYXIodG9rZW5pemVyKTtcbiAgICAgICAgICAgIHdoaWxlIChjaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgICAgICBjaGFycyArPSBjaGFyYWN0ZXI7XG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyID0gZ2V0RXNjYXBlZENoYXIodG9rZW5pemVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjaGFycyB8fCBudWxsO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBnZXRFc2NhcGVkQ2hhcih0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXI7XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnXFxcXCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSB0b2tlbml6ZXIuc3RyLmNoYXJBdCh0b2tlbml6ZXIucG9zKTtcbiAgICAgICAgICAgIHRva2VuaXplci5wb3MgKz0gMTtcbiAgICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICB9KCk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldFN0cmluZ0xpdGVyYWxfZ2V0UXVvdGVkU3RyaW5nID0gZnVuY3Rpb24gKG1ha2VSZWdleE1hdGNoZXIsIGdldEVzY2FwZWRDaGFycykge1xuICAgICAgICBcbiAgICAgICAgdmFyIGdldFVuZXNjYXBlZERvdWJsZVF1b3RlZENoYXJzID0gbWFrZVJlZ2V4TWF0Y2hlcigvXlteXFxcXFwiXSsvKSwgZ2V0VW5lc2NhcGVkU2luZ2xlUXVvdGVkQ2hhcnMgPSBtYWtlUmVnZXhNYXRjaGVyKC9eW15cXFxcJ10rLyk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBnZXRRdW90ZWRTdHJpbmcodG9rZW5pemVyLCBzaW5nbGVRdW90ZXMpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCwgc3RyaW5nLCBlc2NhcGVkLCB1bmVzY2FwZWQsIG5leHQsIG1hdGNoZXI7XG4gICAgICAgICAgICBzdGFydCA9IHRva2VuaXplci5wb3M7XG4gICAgICAgICAgICBzdHJpbmcgPSAnJztcbiAgICAgICAgICAgIG1hdGNoZXIgPSBzaW5nbGVRdW90ZXMgPyBnZXRVbmVzY2FwZWRTaW5nbGVRdW90ZWRDaGFycyA6IGdldFVuZXNjYXBlZERvdWJsZVF1b3RlZENoYXJzO1xuICAgICAgICAgICAgZXNjYXBlZCA9IGdldEVzY2FwZWRDaGFycyh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgaWYgKGVzY2FwZWQpIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gZXNjYXBlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVuZXNjYXBlZCA9IG1hdGNoZXIodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmICh1bmVzY2FwZWQpIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gdW5lc2NhcGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0ID0gZ2V0UXVvdGVkU3RyaW5nKHRva2VuaXplciwgc2luZ2xlUXVvdGVzKTtcbiAgICAgICAgICAgIHdoaWxlIChuZXh0ICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICAgICAgfTtcbiAgICB9KHBhcnNlX1Rva2VuaXplcl91dGlsc19tYWtlUmVnZXhNYXRjaGVyLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRQcmltYXJ5X2dldExpdGVyYWxfZ2V0U3RyaW5nTGl0ZXJhbF9nZXRFc2NhcGVkQ2hhcnMpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9nZXRTdHJpbmdMaXRlcmFsX19nZXRTdHJpbmdMaXRlcmFsID0gZnVuY3Rpb24gKHR5cGVzLCBnZXRRdW90ZWRTdHJpbmcpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQsIHN0cmluZztcbiAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgIGlmICh0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJ1wiJykpIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgPSBnZXRRdW90ZWRTdHJpbmcodG9rZW5pemVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJ1wiJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdDogdHlwZXMuU1RSSU5HX0xJVEVSQUwsXG4gICAgICAgICAgICAgICAgICAgIHY6IHN0cmluZ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCdcXCcnKSkge1xuICAgICAgICAgICAgICAgIHN0cmluZyA9IGdldFF1b3RlZFN0cmluZyh0b2tlbml6ZXIsIHRydWUpO1xuICAgICAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCdcXCcnKSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0OiB0eXBlcy5TVFJJTkdfTElURVJBTCxcbiAgICAgICAgICAgICAgICAgICAgdjogc3RyaW5nXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRQcmltYXJ5X2dldExpdGVyYWxfZ2V0U3RyaW5nTGl0ZXJhbF9nZXRRdW90ZWRTdHJpbmcpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9nZXROdW1iZXJMaXRlcmFsID0gZnVuY3Rpb24gKHR5cGVzLCBtYWtlUmVnZXhNYXRjaGVyKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZ2V0TnVtYmVyID0gbWFrZVJlZ2V4TWF0Y2hlcigvXig/OlsrLV0/KSg/Oig/Oig/OjB8WzEtOV1cXGQqKT9cXC5cXGQrKXwoPzooPzowfFsxLTldXFxkKilcXC4pfCg/OjB8WzEtOV1cXGQqKSkoPzpbZUVdWystXT9cXGQrKT8vKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID0gZ2V0TnVtYmVyKHRva2VuaXplcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0OiB0eXBlcy5OVU1CRVJfTElURVJBTCxcbiAgICAgICAgICAgICAgICAgICAgdjogcmVzdWx0XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9Ub2tlbml6ZXJfdXRpbHNfbWFrZVJlZ2V4TWF0Y2hlcik7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fc2hhcmVkX2dldE5hbWUgPSBmdW5jdGlvbiAobWFrZVJlZ2V4TWF0Y2hlcikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG1ha2VSZWdleE1hdGNoZXIoL15bYS16QS1aXyRdW2EtekEtWl8kMC05XSovKTtcbiAgICB9KHBhcnNlX1Rva2VuaXplcl91dGlsc19tYWtlUmVnZXhNYXRjaGVyKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9zaGFyZWRfZ2V0S2V5ID0gZnVuY3Rpb24gKGdldFN0cmluZ0xpdGVyYWwsIGdldE51bWJlckxpdGVyYWwsIGdldE5hbWUpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBpZGVudGlmaWVyID0gL15bYS16QS1aXyRdW2EtekEtWl8kMC05XSokLztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciB0b2tlbjtcbiAgICAgICAgICAgIGlmICh0b2tlbiA9IGdldFN0cmluZ0xpdGVyYWwodG9rZW5pemVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpZGVudGlmaWVyLnRlc3QodG9rZW4udikgPyB0b2tlbi52IDogJ1wiJyArIHRva2VuLnYucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b2tlbiA9IGdldE51bWJlckxpdGVyYWwodG9rZW5pemVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbi52O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRva2VuID0gZ2V0TmFtZSh0b2tlbml6ZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0ocGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldFN0cmluZ0xpdGVyYWxfX2dldFN0cmluZ0xpdGVyYWwsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9nZXROdW1iZXJMaXRlcmFsLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9zaGFyZWRfZ2V0TmFtZSk7XG52YXIgdXRpbHNfcGFyc2VKU09OID0gZnVuY3Rpb24gKGdldFN0cmluZ01hdGNoLCBhbGxvd1doaXRlc3BhY2UsIGdldFN0cmluZ0xpdGVyYWwsIGdldEtleSkge1xuICAgICAgICBcbiAgICAgICAgdmFyIFRva2VuaXplciwgc3BlY2lhbHMsIHNwZWNpYWxzUGF0dGVybiwgbnVtYmVyUGF0dGVybiwgcGxhY2Vob2xkZXJQYXR0ZXJuLCBwbGFjZWhvbGRlckF0U3RhcnRQYXR0ZXJuO1xuICAgICAgICBzcGVjaWFscyA9IHtcbiAgICAgICAgICAgICd0cnVlJzogdHJ1ZSxcbiAgICAgICAgICAgICdmYWxzZSc6IGZhbHNlLFxuICAgICAgICAgICAgJ3VuZGVmaW5lZCc6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICdudWxsJzogbnVsbFxuICAgICAgICB9O1xuICAgICAgICBzcGVjaWFsc1BhdHRlcm4gPSBuZXcgUmVnRXhwKCdeKD86JyArIE9iamVjdC5rZXlzKHNwZWNpYWxzKS5qb2luKCd8JykgKyAnKScpO1xuICAgICAgICBudW1iZXJQYXR0ZXJuID0gL14oPzpbKy1dPykoPzooPzooPzowfFsxLTldXFxkKik/XFwuXFxkKyl8KD86KD86MHxbMS05XVxcZCopXFwuKXwoPzowfFsxLTldXFxkKikpKD86W2VFXVsrLV0/XFxkKyk/LztcbiAgICAgICAgcGxhY2Vob2xkZXJQYXR0ZXJuID0gL1xcJFxceyhbXlxcfV0rKVxcfS9nO1xuICAgICAgICBwbGFjZWhvbGRlckF0U3RhcnRQYXR0ZXJuID0gL15cXCRcXHsoW15cXH1dKylcXH0vO1xuICAgICAgICBUb2tlbml6ZXIgPSBmdW5jdGlvbiAoc3RyLCB2YWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc3RyID0gc3RyO1xuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICAgICAgICB0aGlzLnBvcyA9IDA7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdCA9IHRoaXMuZ2V0VG9rZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgVG9rZW5pemVyLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHJlbWFpbmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0ci5zdWJzdHJpbmcodGhpcy5wb3MpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFN0cmluZ01hdGNoOiBnZXRTdHJpbmdNYXRjaCxcbiAgICAgICAgICAgIGdldFRva2VuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQbGFjZWhvbGRlcigpIHx8IHRoaXMuZ2V0U3BlY2lhbCgpIHx8IHRoaXMuZ2V0TnVtYmVyKCkgfHwgdGhpcy5nZXRTdHJpbmcoKSB8fCB0aGlzLmdldE9iamVjdCgpIHx8IHRoaXMuZ2V0QXJyYXkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRQbGFjZWhvbGRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaDtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKG1hdGNoID0gcGxhY2Vob2xkZXJBdFN0YXJ0UGF0dGVybi5leGVjKHRoaXMucmVtYWluaW5nKCkpKSAmJiB0aGlzLnZhbHVlcy5oYXNPd25Qcm9wZXJ0eShtYXRjaFsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgKz0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2OiB0aGlzLnZhbHVlc1ttYXRjaFsxXV0gfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U3BlY2lhbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaDtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPSBzcGVjaWFsc1BhdHRlcm4uZXhlYyh0aGlzLnJlbWFpbmluZygpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyArPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHY6IHNwZWNpYWxzW21hdGNoWzBdXSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXROdW1iZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoID0gbnVtYmVyUGF0dGVybi5leGVjKHRoaXMucmVtYWluaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zICs9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdjogK21hdGNoWzBdIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFN0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzdHJpbmdMaXRlcmFsID0gZ2V0U3RyaW5nTGl0ZXJhbCh0aGlzKSwgdmFsdWVzO1xuICAgICAgICAgICAgICAgIGlmIChzdHJpbmdMaXRlcmFsICYmICh2YWx1ZXMgPSB0aGlzLnZhbHVlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHY6IHN0cmluZ0xpdGVyYWwudi5yZXBsYWNlKHBsYWNlaG9sZGVyUGF0dGVybiwgZnVuY3Rpb24gKG1hdGNoLCAkMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXNbJDFdIHx8ICQxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZ0xpdGVyYWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0T2JqZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCwgcGFpcjtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ2V0U3RyaW5nTWF0Y2goJ3snKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0ge307XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBhaXIgPSBnZXRLZXlWYWx1ZVBhaXIodGhpcykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3BhaXIua2V5XSA9IHBhaXIudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFN0cmluZ01hdGNoKCd9JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHY6IHJlc3VsdCB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5nZXRTdHJpbmdNYXRjaCgnLCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRBcnJheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQsIHZhbHVlVG9rZW47XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmdldFN0cmluZ01hdGNoKCdbJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgIHdoaWxlICh2YWx1ZVRva2VuID0gdGhpcy5nZXRUb2tlbigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlVG9rZW4udik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFN0cmluZ01hdGNoKCddJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHY6IHJlc3VsdCB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5nZXRTdHJpbmdNYXRjaCgnLCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbGxvd1doaXRlc3BhY2U6IGFsbG93V2hpdGVzcGFjZVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBnZXRLZXlWYWx1ZVBhaXIodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIga2V5LCB2YWx1ZVRva2VuLCBwYWlyO1xuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAga2V5ID0gZ2V0S2V5KHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFpciA9IHsga2V5OiBrZXkgfTtcbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCc6JykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIHZhbHVlVG9rZW4gPSB0b2tlbml6ZXIuZ2V0VG9rZW4oKTtcbiAgICAgICAgICAgIGlmICghdmFsdWVUb2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFpci52YWx1ZSA9IHZhbHVlVG9rZW4udjtcbiAgICAgICAgICAgIHJldHVybiBwYWlyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RyLCB2YWx1ZXMpIHtcbiAgICAgICAgICAgIHZhciB0b2tlbml6ZXIgPSBuZXcgVG9rZW5pemVyKHN0ciwgdmFsdWVzKTtcbiAgICAgICAgICAgIGlmICh0b2tlbml6ZXIucmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRva2VuaXplci5yZXN1bHQudixcbiAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nOiB0b2tlbml6ZXIucmVtYWluaW5nKClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgfShwYXJzZV9Ub2tlbml6ZXJfdXRpbHNfZ2V0U3RyaW5nTWF0Y2gsIHBhcnNlX1Rva2VuaXplcl91dGlsc19hbGxvd1doaXRlc3BhY2UsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9nZXRTdHJpbmdMaXRlcmFsX19nZXRTdHJpbmdMaXRlcmFsLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9zaGFyZWRfZ2V0S2V5KTtcbnZhciByZW5kZXJfU3RyaW5nRnJhZ21lbnRfSW50ZXJwb2xhdG9yID0gZnVuY3Rpb24gKHR5cGVzLCB0ZWFyZG93biwgaW5pdE11c3RhY2hlLCB1cGRhdGVNdXN0YWNoZSwgcmVzb2x2ZU11c3RhY2hlKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgU3RyaW5nSW50ZXJwb2xhdG9yID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGVzLklOVEVSUE9MQVRPUjtcbiAgICAgICAgICAgIGluaXRNdXN0YWNoZSh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgICAgU3RyaW5nSW50ZXJwb2xhdG9yLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlTXVzdGFjaGUsXG4gICAgICAgICAgICByZXNvbHZlOiByZXNvbHZlTXVzdGFjaGUsXG4gICAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEZyYWdtZW50LmJ1YmJsZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGVhcmRvd24odGhpcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5naWZ5KHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gU3RyaW5nSW50ZXJwb2xhdG9yO1xuICAgICAgICBmdW5jdGlvbiBzdHJpbmdpZnkodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0oY29uZmlnX3R5cGVzLCBzaGFyZWRfdGVhcmRvd24sIHJlbmRlcl9zaGFyZWRfaW5pdE11c3RhY2hlLCByZW5kZXJfc2hhcmVkX3VwZGF0ZU11c3RhY2hlLCByZW5kZXJfc2hhcmVkX3Jlc29sdmVNdXN0YWNoZSk7XG52YXIgcmVuZGVyX1N0cmluZ0ZyYWdtZW50X1NlY3Rpb24gPSBmdW5jdGlvbiAodHlwZXMsIGluaXRNdXN0YWNoZSwgdXBkYXRlTXVzdGFjaGUsIHJlc29sdmVNdXN0YWNoZSwgdXBkYXRlU2VjdGlvbiwgdGVhcmRvd24sIGNpcmN1bGFyKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgU3RyaW5nU2VjdGlvbiwgU3RyaW5nRnJhZ21lbnQ7XG4gICAgICAgIGNpcmN1bGFyLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgU3RyaW5nRnJhZ21lbnQgPSBjaXJjdWxhci5TdHJpbmdGcmFnbWVudDtcbiAgICAgICAgfSk7XG4gICAgICAgIFN0cmluZ1NlY3Rpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZXMuU0VDVElPTjtcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRzID0gW107XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBpbml0TXVzdGFjaGUodGhpcywgb3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgICAgIFN0cmluZ1NlY3Rpb24ucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdXBkYXRlOiB1cGRhdGVNdXN0YWNoZSxcbiAgICAgICAgICAgIHJlc29sdmU6IHJlc29sdmVNdXN0YWNoZSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZWFyZG93bkZyYWdtZW50cygpO1xuICAgICAgICAgICAgICAgIHRlYXJkb3duKHRoaXMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duRnJhZ21lbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuZnJhZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50cy5zaGlmdCgpLnRlYXJkb3duKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBidWJibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5mcmFnbWVudHMuam9pbignJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRGcmFnbWVudC5idWJibGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciB3cmFwcGVkO1xuICAgICAgICAgICAgICAgIGlmICh3cmFwcGVkID0gdGhpcy5yb290Ll93cmFwcGVkW3RoaXMua2V5cGF0aF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwcGVkLmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1cGRhdGVTZWN0aW9uKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEZyYWdtZW50LmJ1YmJsZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyZWF0ZUZyYWdtZW50OiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU3RyaW5nRnJhZ21lbnQob3B0aW9ucyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mcmFnbWVudHMuam9pbignJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTdHJpbmdTZWN0aW9uO1xuICAgIH0oY29uZmlnX3R5cGVzLCByZW5kZXJfc2hhcmVkX2luaXRNdXN0YWNoZSwgcmVuZGVyX3NoYXJlZF91cGRhdGVNdXN0YWNoZSwgcmVuZGVyX3NoYXJlZF9yZXNvbHZlTXVzdGFjaGUsIHJlbmRlcl9zaGFyZWRfdXBkYXRlU2VjdGlvbiwgc2hhcmVkX3RlYXJkb3duLCBjaXJjdWxhcik7XG52YXIgcmVuZGVyX1N0cmluZ0ZyYWdtZW50X1RleHQgPSBmdW5jdGlvbiAodHlwZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBTdHJpbmdUZXh0ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGVzLlRFWFQ7XG4gICAgICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICB9O1xuICAgICAgICBTdHJpbmdUZXh0LnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGV4dDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gU3RyaW5nVGV4dDtcbiAgICB9KGNvbmZpZ190eXBlcyk7XG52YXIgcmVuZGVyX1N0cmluZ0ZyYWdtZW50X3Byb3RvdHlwZV90b0FyZ3NMaXN0ID0gZnVuY3Rpb24gKHdhcm4sIHBhcnNlSlNPTikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZXMsIGNvdW50ZXIsIGpzb25lc3F1ZSwgZ3VpZCwgZXJyb3JNZXNzYWdlLCBwYXJzZWQsIHByb2Nlc3NJdGVtcztcbiAgICAgICAgICAgIGlmICghdGhpcy5hcmdzTGlzdCB8fCB0aGlzLmRpcnR5KSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzID0ge307XG4gICAgICAgICAgICAgICAgY291bnRlciA9IDA7XG4gICAgICAgICAgICAgICAgZ3VpZCA9IHRoaXMucm9vdC5fZ3VpZDtcbiAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbXMgPSBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBsYWNlaG9sZGVySWQsIHdyYXBwZWQsIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5mcmFnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5mcmFnbWVudHMubWFwKGZ1bmN0aW9uIChmcmFnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc0l0ZW1zKGZyYWdtZW50Lml0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVySWQgPSBndWlkICsgJy0nICsgY291bnRlcisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdyYXBwZWQgPSBpdGVtLnJvb3QuX3dyYXBwZWRbaXRlbS5rZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gd3JhcHBlZC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBpdGVtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzW3BsYWNlaG9sZGVySWRdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyR7JyArIHBsYWNlaG9sZGVySWQgKyAnfSc7XG4gICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAganNvbmVzcXVlID0gcHJvY2Vzc0l0ZW1zKHRoaXMuaXRlbXMpO1xuICAgICAgICAgICAgICAgIHBhcnNlZCA9IHBhcnNlSlNPTignWycgKyBqc29uZXNxdWUgKyAnXScsIHZhbHVlcyk7XG4gICAgICAgICAgICAgICAgaWYgKCFwYXJzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gJ0NvdWxkIG5vdCBwYXJzZSBkaXJlY3RpdmUgYXJndW1lbnRzICgnICsgdGhpcy50b1N0cmluZygpICsgJykuIElmIHlvdSB0aGluayB0aGlzIGlzIGEgYnVnLCBwbGVhc2UgZmlsZSBhbiBpc3N1ZSBhdCBodHRwOi8vZ2l0aHViLmNvbS9SYWN0aXZlSlMvUmFjdGl2ZS9pc3N1ZXMnO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb290LmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXJnc0xpc3QgPSBbanNvbmVzcXVlXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJnc0xpc3QgPSBwYXJzZWQudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFyZ3NMaXN0O1xuICAgICAgICB9O1xuICAgIH0odXRpbHNfd2FybiwgdXRpbHNfcGFyc2VKU09OKTtcbnZhciByZW5kZXJfU3RyaW5nRnJhZ21lbnRfX1N0cmluZ0ZyYWdtZW50ID0gZnVuY3Rpb24gKHR5cGVzLCBwYXJzZUpTT04sIGluaXRGcmFnbWVudCwgSW50ZXJwb2xhdG9yLCBTZWN0aW9uLCBUZXh0LCB0b0FyZ3NMaXN0LCBjaXJjdWxhcikge1xuICAgICAgICBcbiAgICAgICAgdmFyIFN0cmluZ0ZyYWdtZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGluaXRGcmFnbWVudCh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgICAgU3RyaW5nRnJhZ21lbnQucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgY3JlYXRlSXRlbTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZGVzY3JpcHRvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBUZXh0KG9wdGlvbnMuZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaCAob3B0aW9ucy5kZXNjcmlwdG9yLnQpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLklOVEVSUE9MQVRPUjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnRlcnBvbGF0b3Iob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5UUklQTEU6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSW50ZXJwb2xhdG9yKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuU0VDVElPTjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTZWN0aW9uKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93ICdTb21ldGhpbmcgd2VudCB3cm9uZyBpbiBhIHJhdGhlciBpbnRlcmVzdGluZyB3YXknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBidWJibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm93bmVyLmJ1YmJsZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG51bUl0ZW1zLCBpO1xuICAgICAgICAgICAgICAgIG51bUl0ZW1zID0gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG51bUl0ZW1zOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtc1tpXS50ZWFyZG93bigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPT09IDEgJiYgdGhpcy5pdGVtc1swXS50eXBlID09PSB0eXBlcy5JTlRFUlBPTEFUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLml0ZW1zWzBdLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTaW1wbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgaXRlbSwgY29udGFpbnNJbnRlcnBvbGF0b3I7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2ltcGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2ltcGxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpID0gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5pdGVtc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gdHlwZXMuVEVYVCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gdHlwZXMuSU5URVJQT0xBVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFpbnNJbnRlcnBvbGF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5zSW50ZXJwb2xhdG9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaW1wbGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2ltcGxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmpvaW4oJycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvSlNPTjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKSwgcGFyc2VkO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZCA9IHBhcnNlSlNPTih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VkID8gcGFyc2VkLnZhbHVlIDogdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b0FyZ3NMaXN0OiB0b0FyZ3NMaXN0XG4gICAgICAgIH07XG4gICAgICAgIGNpcmN1bGFyLlN0cmluZ0ZyYWdtZW50ID0gU3RyaW5nRnJhZ21lbnQ7XG4gICAgICAgIHJldHVybiBTdHJpbmdGcmFnbWVudDtcbiAgICB9KGNvbmZpZ190eXBlcywgdXRpbHNfcGFyc2VKU09OLCByZW5kZXJfc2hhcmVkX2luaXRGcmFnbWVudCwgcmVuZGVyX1N0cmluZ0ZyYWdtZW50X0ludGVycG9sYXRvciwgcmVuZGVyX1N0cmluZ0ZyYWdtZW50X1NlY3Rpb24sIHJlbmRlcl9TdHJpbmdGcmFnbWVudF9UZXh0LCByZW5kZXJfU3RyaW5nRnJhZ21lbnRfcHJvdG90eXBlX3RvQXJnc0xpc3QsIGNpcmN1bGFyKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfQXR0cmlidXRlX19BdHRyaWJ1dGUgPSBmdW5jdGlvbiAodHlwZXMsIGRldGVybWluZU5hbWVBbmROYW1lc3BhY2UsIHNldFN0YXRpY0F0dHJpYnV0ZSwgZGV0ZXJtaW5lUHJvcGVydHlOYW1lLCBiaW5kLCB1cGRhdGUsIFN0cmluZ0ZyYWdtZW50KSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgRG9tQXR0cmlidXRlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGVzLkFUVFJJQlVURTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IG9wdGlvbnMuZWxlbWVudDtcbiAgICAgICAgICAgIGRldGVybWluZU5hbWVBbmROYW1lc3BhY2UodGhpcywgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnZhbHVlID09PSBudWxsIHx8IHR5cGVvZiBvcHRpb25zLnZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHNldFN0YXRpY0F0dHJpYnV0ZSh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJvb3QgPSBvcHRpb25zLnJvb3Q7XG4gICAgICAgICAgICB0aGlzLnBOb2RlID0gb3B0aW9ucy5wTm9kZTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50RnJhZ21lbnQgPSB0aGlzLmVsZW1lbnQucGFyZW50RnJhZ21lbnQ7XG4gICAgICAgICAgICB0aGlzLmZyYWdtZW50ID0gbmV3IFN0cmluZ0ZyYWdtZW50KHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdG9yOiBvcHRpb25zLnZhbHVlLFxuICAgICAgICAgICAgICAgIHJvb3Q6IHRoaXMucm9vdCxcbiAgICAgICAgICAgICAgICBvd25lcjogdGhpcyxcbiAgICAgICAgICAgICAgICBjb250ZXh0U3RhY2s6IG9wdGlvbnMuY29udGV4dFN0YWNrXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghdGhpcy5wTm9kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm5hbWUgPT09ICd2YWx1ZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmFsdWVBdHRyaWJ1dGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBOb2RlLnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgdGhpcy5wTm9kZS50eXBlID09PSAnZmlsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0ZpbGVJbnB1dFZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXRlcm1pbmVQcm9wZXJ0eU5hbWUodGhpcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLnNlbGZVcGRhdGluZyA9IHRoaXMuZnJhZ21lbnQuaXNTaW1wbGUoKTtcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBEb21BdHRyaWJ1dGUucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgYmluZDogYmluZCxcbiAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlLFxuICAgICAgICAgICAgdXBkYXRlQmluZGluZ3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleXBhdGggPSB0aGlzLmludGVycG9sYXRvci5rZXlwYXRoIHx8IHRoaXMuaW50ZXJwb2xhdG9yLnJlZjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wZXJ0eU5hbWUgPT09ICduYW1lJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBOb2RlLm5hbWUgPSAne3snICsgdGhpcy5rZXlwYXRoICsgJ319JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ib3VuZEV2ZW50cykge1xuICAgICAgICAgICAgICAgICAgICBpID0gdGhpcy5ib3VuZEV2ZW50cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucE5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmJvdW5kRXZlbnRzW2ldLCB0aGlzLnVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJhZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudC50ZWFyZG93bigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBidWJibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxmVXBkYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmRlZmVycmVkICYmIHRoaXMucmVhZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290Ll9kZWZlcnJlZC5hdHRycy5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmVycmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RyO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5mcmFnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgJz0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0ciA9IHRoaXMuZnJhZ21lbnQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgJz0nICsgSlNPTi5zdHJpbmdpZnkoc3RyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIERvbUF0dHJpYnV0ZTtcbiAgICB9KGNvbmZpZ190eXBlcywgcmVuZGVyX0RvbUZyYWdtZW50X0F0dHJpYnV0ZV9oZWxwZXJzX2RldGVybWluZU5hbWVBbmROYW1lc3BhY2UsIHJlbmRlcl9Eb21GcmFnbWVudF9BdHRyaWJ1dGVfaGVscGVyc19zZXRTdGF0aWNBdHRyaWJ1dGUsIHJlbmRlcl9Eb21GcmFnbWVudF9BdHRyaWJ1dGVfaGVscGVyc19kZXRlcm1pbmVQcm9wZXJ0eU5hbWUsIHJlbmRlcl9Eb21GcmFnbWVudF9BdHRyaWJ1dGVfcHJvdG90eXBlX2JpbmQsIHJlbmRlcl9Eb21GcmFnbWVudF9BdHRyaWJ1dGVfcHJvdG90eXBlX3VwZGF0ZSwgcmVuZGVyX1N0cmluZ0ZyYWdtZW50X19TdHJpbmdGcmFnbWVudCk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfaW5pdGlhbGlzZV9jcmVhdGVFbGVtZW50QXR0cmlidXRlcyA9IGZ1bmN0aW9uIChEb21BdHRyaWJ1dGUpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cmlidXRlcykge1xuICAgICAgICAgICAgdmFyIGF0dHJOYW1lLCBhdHRyVmFsdWUsIGF0dHI7XG4gICAgICAgICAgICBlbGVtZW50LmF0dHJpYnV0ZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoYXR0ck5hbWUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGF0dHJOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBhdHRyVmFsdWUgPSBhdHRyaWJ1dGVzW2F0dHJOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgYXR0ciA9IG5ldyBEb21BdHRyaWJ1dGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGF0dHJOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGF0dHJWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3Q6IGVsZW1lbnQucm9vdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBOb2RlOiBlbGVtZW50Lm5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0U3RhY2s6IGVsZW1lbnQucGFyZW50RnJhZ21lbnQuY29udGV4dFN0YWNrXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmF0dHJpYnV0ZXNbZWxlbWVudC5hdHRyaWJ1dGVzLmxlbmd0aF0gPSBlbGVtZW50LmF0dHJpYnV0ZXNbYXR0ck5hbWVdID0gYXR0cjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJOYW1lICE9PSAnbmFtZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHIudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5hdHRyaWJ1dGVzO1xuICAgICAgICB9O1xuICAgIH0ocmVuZGVyX0RvbUZyYWdtZW50X0F0dHJpYnV0ZV9fQXR0cmlidXRlKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9pbml0aWFsaXNlX2FwcGVuZEVsZW1lbnRDaGlsZHJlbiA9IGZ1bmN0aW9uICh3YXJuLCBuYW1lc3BhY2VzLCBTdHJpbmdGcmFnbWVudCwgY2lyY3VsYXIpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBEb21GcmFnbWVudCwgdXBkYXRlQ3NzLCB1cGRhdGVTY3JpcHQ7XG4gICAgICAgIGNpcmN1bGFyLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgRG9tRnJhZ21lbnQgPSBjaXJjdWxhci5Eb21GcmFnbWVudDtcbiAgICAgICAgfSk7XG4gICAgICAgIHVwZGF0ZUNzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlLCBjb250ZW50ID0gdGhpcy5mcmFnbWVudC50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKG5vZGUuc3R5bGVTaGVldCkge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlU2NyaXB0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm5vZGUudHlwZSB8fCB0aGlzLm5vZGUudHlwZSA9PT0gJ3RleHQvamF2YXNjcmlwdCcpIHtcbiAgICAgICAgICAgICAgICB3YXJuKCdTY3JpcHQgdGFnIHdhcyB1cGRhdGVkLiBUaGlzIGRvZXMgbm90IGNhdXNlIHRoZSBjb2RlIHRvIGJlIHJlLWV2YWx1YXRlZCEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubm9kZS5pbm5lckhUTUwgPSB0aGlzLmZyYWdtZW50LnRvU3RyaW5nKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZWxlbWVudCwgbm9kZSwgZGVzY3JpcHRvciwgZG9jRnJhZykge1xuICAgICAgICAgICAgdmFyIGxpdmVRdWVyaWVzLCBpLCBzZWxlY3RvciwgcXVlcnlBbGxSZXN1bHQsIGo7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5sY05hbWUgPT09ICdzY3JpcHQnIHx8IGVsZW1lbnQubGNOYW1lID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5mcmFnbWVudCA9IG5ldyBTdHJpbmdGcmFnbWVudCh7XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0b3I6IGRlc2NyaXB0b3IuZixcbiAgICAgICAgICAgICAgICAgICAgcm9vdDogZWxlbWVudC5yb290LFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0U3RhY2s6IGVsZW1lbnQucGFyZW50RnJhZ21lbnQuY29udGV4dFN0YWNrLFxuICAgICAgICAgICAgICAgICAgICBvd25lcjogZWxlbWVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChkb2NGcmFnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmxjTmFtZSA9PT0gJ3NjcmlwdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYnViYmxlID0gdXBkYXRlU2NyaXB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5ub2RlLmlubmVySFRNTCA9IGVsZW1lbnQuZnJhZ21lbnQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYnViYmxlID0gdXBkYXRlQ3NzO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5idWJibGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlc2NyaXB0b3IuZiA9PT0gJ3N0cmluZycgJiYgKCFub2RlIHx8ICghbm9kZS5uYW1lc3BhY2VVUkkgfHwgbm9kZS5uYW1lc3BhY2VVUkkgPT09IG5hbWVzcGFjZXMuaHRtbCkpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5odG1sID0gZGVzY3JpcHRvci5mO1xuICAgICAgICAgICAgICAgIGlmIChkb2NGcmFnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuaW5uZXJIVE1MID0gZWxlbWVudC5odG1sO1xuICAgICAgICAgICAgICAgICAgICBsaXZlUXVlcmllcyA9IGVsZW1lbnQucm9vdC5fbGl2ZVF1ZXJpZXM7XG4gICAgICAgICAgICAgICAgICAgIGkgPSBsaXZlUXVlcmllcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gbGl2ZVF1ZXJpZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHF1ZXJ5QWxsUmVzdWx0ID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkgJiYgKGogPSBxdWVyeUFsbFJlc3VsdC5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVsZW1lbnQubGl2ZVF1ZXJpZXMgfHwgKGVsZW1lbnQubGl2ZVF1ZXJpZXMgPSBbXSkpLnB1c2goc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubGl2ZVF1ZXJpZXNbc2VsZWN0b3JdID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmxpdmVRdWVyaWVzW3NlbGVjdG9yXVtqXSA9IHF1ZXJ5QWxsUmVzdWx0W2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5mcmFnbWVudCA9IG5ldyBEb21GcmFnbWVudCh7XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0b3I6IGRlc2NyaXB0b3IuZixcbiAgICAgICAgICAgICAgICAgICAgcm9vdDogZWxlbWVudC5yb290LFxuICAgICAgICAgICAgICAgICAgICBwTm9kZTogbm9kZSxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dFN0YWNrOiBlbGVtZW50LnBhcmVudEZyYWdtZW50LmNvbnRleHRTdGFjayxcbiAgICAgICAgICAgICAgICAgICAgb3duZXI6IGVsZW1lbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoZG9jRnJhZykge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGVsZW1lbnQuZnJhZ21lbnQuZG9jRnJhZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0odXRpbHNfd2FybiwgY29uZmlnX25hbWVzcGFjZXMsIHJlbmRlcl9TdHJpbmdGcmFnbWVudF9fU3RyaW5nRnJhZ21lbnQsIGNpcmN1bGFyKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9pbml0aWFsaXNlX2RlY29yYXRlX0RlY29yYXRvciA9IGZ1bmN0aW9uICh3YXJuLCBTdHJpbmdGcmFnbWVudCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIERlY29yYXRvciA9IGZ1bmN0aW9uIChkZXNjcmlwdG9yLCByb290LCBvd25lciwgY29udGV4dFN0YWNrKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSwgZnJhZ21lbnQsIGVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgICAgICAgICB0aGlzLm5vZGUgPSBvd25lci5ub2RlO1xuICAgICAgICAgICAgbmFtZSA9IGRlc2NyaXB0b3IubiB8fCBkZXNjcmlwdG9yO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gbmV3IFN0cmluZ0ZyYWdtZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRvcjogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcm9vdDogdGhpcy5yb290LFxuICAgICAgICAgICAgICAgICAgICBvd25lcjogb3duZXIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRTdGFjazogY29udGV4dFN0YWNrXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbmFtZSA9IGZyYWdtZW50LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQudGVhcmRvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yLmEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcyA9IGRlc2NyaXB0b3IuYTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVzY3JpcHRvci5kKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSBuZXcgU3RyaW5nRnJhZ21lbnQoe1xuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdG9yOiBkZXNjcmlwdG9yLmQsXG4gICAgICAgICAgICAgICAgICAgIHJvb3Q6IHRoaXMucm9vdCxcbiAgICAgICAgICAgICAgICAgICAgb3duZXI6IG93bmVyLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0U3RhY2s6IGNvbnRleHRTdGFja1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zID0gZnJhZ21lbnQudG9BcmdzTGlzdCgpO1xuICAgICAgICAgICAgICAgIGZyYWdtZW50LnRlYXJkb3duKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZuID0gcm9vdC5kZWNvcmF0b3JzW25hbWVdO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmZuKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gJ01pc3NpbmcgXCInICsgbmFtZSArICdcIiBkZWNvcmF0b3IuIFlvdSBtYXkgbmVlZCB0byBkb3dubG9hZCBhIHBsdWdpbiB2aWEgaHR0cHM6Ly9naXRodWIuY29tL1JhY3RpdmVKUy9SYWN0aXZlL3dpa2kvUGx1Z2lucyNkZWNvcmF0b3JzJztcbiAgICAgICAgICAgICAgICBpZiAocm9vdC5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3YXJuKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBEZWNvcmF0b3IucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQsIGFyZ3M7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBbdGhpcy5ub2RlXS5jb25jYXQodGhpcy5wYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmZuLmFwcGx5KHRoaXMucm9vdCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5mbi5jYWxsKHRoaXMucm9vdCwgdGhpcy5ub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQgfHwgIXJlc3VsdC50ZWFyZG93bikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RlY29yYXRvciBkZWZpbml0aW9uIG11c3QgcmV0dXJuIGFuIG9iamVjdCB3aXRoIGEgdGVhcmRvd24gbWV0aG9kJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudGVhcmRvd24gPSByZXN1bHQudGVhcmRvd247XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBEZWNvcmF0b3I7XG4gICAgfSh1dGlsc193YXJuLCByZW5kZXJfU3RyaW5nRnJhZ21lbnRfX1N0cmluZ0ZyYWdtZW50KTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9pbml0aWFsaXNlX2RlY29yYXRlX19kZWNvcmF0ZSA9IGZ1bmN0aW9uIChEZWNvcmF0b3IpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGVzY3JpcHRvciwgcm9vdCwgb3duZXIsIGNvbnRleHRTdGFjaykge1xuICAgICAgICAgICAgb3duZXIuZGVjb3JhdG9yID0gbmV3IERlY29yYXRvcihkZXNjcmlwdG9yLCByb290LCBvd25lciwgY29udGV4dFN0YWNrKTtcbiAgICAgICAgICAgIGlmIChvd25lci5kZWNvcmF0b3IuZm4pIHtcbiAgICAgICAgICAgICAgICByb290Ll9kZWZlcnJlZC5kZWNvcmF0b3JzLnB1c2gob3duZXIuZGVjb3JhdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X2luaXRpYWxpc2VfZGVjb3JhdGVfRGVjb3JhdG9yKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9pbml0aWFsaXNlX2FkZEV2ZW50UHJveGllc19hZGRFdmVudFByb3h5ID0gZnVuY3Rpb24gKHdhcm4sIFN0cmluZ0ZyYWdtZW50KSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgYWRkRXZlbnRQcm94eSwgTWFzdGVyRXZlbnRIYW5kbGVyLCBQcm94eUV2ZW50LCBmaXJlUGxhaW5FdmVudCwgZmlyZUV2ZW50V2l0aEFyZ3MsIGZpcmVFdmVudFdpdGhEeW5hbWljQXJncywgY3VzdG9tSGFuZGxlcnMsIGdlbmVyaWNIYW5kbGVyLCBnZXRDdXN0b21IYW5kbGVyO1xuICAgICAgICBhZGRFdmVudFByb3h5ID0gZnVuY3Rpb24gKGVsZW1lbnQsIHRyaWdnZXJFdmVudE5hbWUsIHByb3h5RGVzY3JpcHRvciwgY29udGV4dFN0YWNrLCBpbmRleFJlZnMpIHtcbiAgICAgICAgICAgIHZhciBldmVudHMsIG1hc3RlcjtcbiAgICAgICAgICAgIGV2ZW50cyA9IGVsZW1lbnQubm9kZS5fcmFjdGl2ZS5ldmVudHM7XG4gICAgICAgICAgICBtYXN0ZXIgPSBldmVudHNbdHJpZ2dlckV2ZW50TmFtZV0gfHwgKGV2ZW50c1t0cmlnZ2VyRXZlbnROYW1lXSA9IG5ldyBNYXN0ZXJFdmVudEhhbmRsZXIoZWxlbWVudCwgdHJpZ2dlckV2ZW50TmFtZSwgY29udGV4dFN0YWNrLCBpbmRleFJlZnMpKTtcbiAgICAgICAgICAgIG1hc3Rlci5hZGQocHJveHlEZXNjcmlwdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgTWFzdGVyRXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50TmFtZSwgY29udGV4dFN0YWNrKSB7XG4gICAgICAgICAgICB2YXIgZGVmaW5pdGlvbjtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnJvb3QgPSBlbGVtZW50LnJvb3Q7XG4gICAgICAgICAgICB0aGlzLm5vZGUgPSBlbGVtZW50Lm5vZGU7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBldmVudE5hbWU7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHRTdGFjayA9IGNvbnRleHRTdGFjaztcbiAgICAgICAgICAgIHRoaXMucHJveGllcyA9IFtdO1xuICAgICAgICAgICAgaWYgKGRlZmluaXRpb24gPSB0aGlzLnJvb3QuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbSA9IGRlZmluaXRpb24odGhpcy5ub2RlLCBnZXRDdXN0b21IYW5kbGVyKGV2ZW50TmFtZSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoISgnb24nICsgZXZlbnROYW1lIGluIHRoaXMubm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgd2FybignTWlzc2luZyBcIicgKyB0aGlzLm5hbWUgKyAnXCIgZXZlbnQuIFlvdSBtYXkgbmVlZCB0byBkb3dubG9hZCBhIHBsdWdpbiB2aWEgaHR0cHM6Ly9naXRodWIuY29tL1JhY3RpdmVKUy9SYWN0aXZlL3dpa2kvUGx1Z2lucyNldmVudHMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBnZW5lcmljSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBNYXN0ZXJFdmVudEhhbmRsZXIucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiAocHJveHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3hpZXNbdGhpcy5wcm94aWVzLmxlbmd0aF0gPSBuZXcgUHJveHlFdmVudCh0aGlzLmVsZW1lbnQsIHRoaXMucm9vdCwgcHJveHksIHRoaXMuY29udGV4dFN0YWNrKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbS50ZWFyZG93bigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMubmFtZSwgZ2VuZXJpY0hhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaSA9IHRoaXMucHJveGllcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3hpZXNbaV0udGVhcmRvd24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlyZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSB0aGlzLnByb3hpZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm94aWVzW2ldLmZpcmUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgUHJveHlFdmVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCByYWN0aXZlLCBkZXNjcmlwdG9yLCBjb250ZXh0U3RhY2spIHtcbiAgICAgICAgICAgIHZhciBuYW1lO1xuICAgICAgICAgICAgdGhpcy5yb290ID0gcmFjdGl2ZTtcbiAgICAgICAgICAgIG5hbWUgPSBkZXNjcmlwdG9yLm4gfHwgZGVzY3JpcHRvcjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm4gPSBuYW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm4gPSBuZXcgU3RyaW5nRnJhZ21lbnQoe1xuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdG9yOiBkZXNjcmlwdG9yLm4sXG4gICAgICAgICAgICAgICAgICAgIHJvb3Q6IHRoaXMucm9vdCxcbiAgICAgICAgICAgICAgICAgICAgb3duZXI6IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRTdGFjazogY29udGV4dFN0YWNrXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRvci5hKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hID0gZGVzY3JpcHRvci5hO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSA9IGZpcmVFdmVudFdpdGhBcmdzO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yLmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmQgPSBuZXcgU3RyaW5nRnJhZ21lbnQoe1xuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdG9yOiBkZXNjcmlwdG9yLmQsXG4gICAgICAgICAgICAgICAgICAgIHJvb3Q6IHRoaXMucm9vdCxcbiAgICAgICAgICAgICAgICAgICAgb3duZXI6IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRTdGFjazogY29udGV4dFN0YWNrXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlID0gZmlyZUV2ZW50V2l0aER5bmFtaWNBcmdzO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZmlyZSA9IGZpcmVQbGFpbkV2ZW50O1xuICAgICAgICB9O1xuICAgICAgICBQcm94eUV2ZW50LnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubi50ZWFyZG93bikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm4udGVhcmRvd24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmQudGVhcmRvd24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnViYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZpcmVQbGFpbkV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnJvb3QuZmlyZSh0aGlzLm4udG9TdHJpbmcoKSwgZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgICBmaXJlRXZlbnRXaXRoQXJncyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5yb290LmZpcmUuYXBwbHkodGhpcy5yb290LCBbXG4gICAgICAgICAgICAgICAgdGhpcy5uLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgIF0uY29uY2F0KHRoaXMuYSkpO1xuICAgICAgICB9O1xuICAgICAgICBmaXJlRXZlbnRXaXRoRHluYW1pY0FyZ3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gdGhpcy5kLnRvQXJnc0xpc3QoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBhcmdzID0gYXJncy5zdWJzdHIoMSwgYXJncy5sZW5ndGggLSAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucm9vdC5maXJlLmFwcGx5KHRoaXMucm9vdCwgW1xuICAgICAgICAgICAgICAgIHRoaXMubi50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICBdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgIH07XG4gICAgICAgIGdlbmVyaWNIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgc3RvcmFnZSA9IHRoaXMuX3JhY3RpdmU7XG4gICAgICAgICAgICBzdG9yYWdlLmV2ZW50c1tldmVudC50eXBlXS5maXJlKHtcbiAgICAgICAgICAgICAgICBub2RlOiB0aGlzLFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsOiBldmVudCxcbiAgICAgICAgICAgICAgICBpbmRleDogc3RvcmFnZS5pbmRleCxcbiAgICAgICAgICAgICAgICBrZXlwYXRoOiBzdG9yYWdlLmtleXBhdGgsXG4gICAgICAgICAgICAgICAgY29udGV4dDogc3RvcmFnZS5yb290LmdldChzdG9yYWdlLmtleXBhdGgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgY3VzdG9tSGFuZGxlcnMgPSB7fTtcbiAgICAgICAgZ2V0Q3VzdG9tSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgIGlmIChjdXN0b21IYW5kbGVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1c3RvbUhhbmRsZXJzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VzdG9tSGFuZGxlcnNbZXZlbnROYW1lXSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBzdG9yYWdlID0gZXZlbnQubm9kZS5fcmFjdGl2ZTtcbiAgICAgICAgICAgICAgICBldmVudC5pbmRleCA9IHN0b3JhZ2UuaW5kZXg7XG4gICAgICAgICAgICAgICAgZXZlbnQua2V5cGF0aCA9IHN0b3JhZ2Uua2V5cGF0aDtcbiAgICAgICAgICAgICAgICBldmVudC5jb250ZXh0ID0gc3RvcmFnZS5yb290LmdldChzdG9yYWdlLmtleXBhdGgpO1xuICAgICAgICAgICAgICAgIHN0b3JhZ2UuZXZlbnRzW2V2ZW50TmFtZV0uZmlyZShldmVudCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYWRkRXZlbnRQcm94eTtcbiAgICB9KHV0aWxzX3dhcm4sIHJlbmRlcl9TdHJpbmdGcmFnbWVudF9fU3RyaW5nRnJhZ21lbnQpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X2luaXRpYWxpc2VfYWRkRXZlbnRQcm94aWVzX19hZGRFdmVudFByb3hpZXMgPSBmdW5jdGlvbiAoYWRkRXZlbnRQcm94eSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50LCBwcm94aWVzKSB7XG4gICAgICAgICAgICB2YXIgaSwgZXZlbnROYW1lLCBldmVudE5hbWVzO1xuICAgICAgICAgICAgZm9yIChldmVudE5hbWUgaW4gcHJveGllcykge1xuICAgICAgICAgICAgICAgIGlmIChwcm94aWVzLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lcyA9IGV2ZW50TmFtZS5zcGxpdCgnLScpO1xuICAgICAgICAgICAgICAgICAgICBpID0gZXZlbnROYW1lcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEV2ZW50UHJveHkoZWxlbWVudCwgZXZlbnROYW1lc1tpXSwgcHJveGllc1tldmVudE5hbWVdLCBlbGVtZW50LnBhcmVudEZyYWdtZW50LmNvbnRleHRTdGFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfShyZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9pbml0aWFsaXNlX2FkZEV2ZW50UHJveGllc19hZGRFdmVudFByb3h5KTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9pbml0aWFsaXNlX3VwZGF0ZUxpdmVRdWVyaWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgcmFjdGl2ZSwgbGl2ZVF1ZXJpZXMsIGksIHNlbGVjdG9yLCBxdWVyeTtcbiAgICAgICAgICAgIHJhY3RpdmUgPSBlbGVtZW50LnJvb3Q7XG4gICAgICAgICAgICBsaXZlUXVlcmllcyA9IHJhY3RpdmUuX2xpdmVRdWVyaWVzO1xuICAgICAgICAgICAgaSA9IGxpdmVRdWVyaWVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9IGxpdmVRdWVyaWVzW2ldO1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gbGl2ZVF1ZXJpZXNbc2VsZWN0b3JdO1xuICAgICAgICAgICAgICAgIGlmIChxdWVyeS5fdGVzdChlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAoZWxlbWVudC5saXZlUXVlcmllcyB8fCAoZWxlbWVudC5saXZlUXVlcmllcyA9IFtdKSkucHVzaChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubGl2ZVF1ZXJpZXNbc2VsZWN0b3JdID0gW2VsZW1lbnQubm9kZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciB1dGlsc19jYW1lbENhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGh5cGhlbmF0ZWRTdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBoeXBoZW5hdGVkU3RyLnJlcGxhY2UoLy0oW2EtekEtWl0pL2csIGZ1bmN0aW9uIChtYXRjaCwgJDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJDEudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciB1dGlsc19maWxsR2FwcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICAgICAgICAgIHZhciBrZXk7XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KGtleSkgJiYgIXRhcmdldC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfc2hhcmVkX2V4ZWN1dGVUcmFuc2l0aW9uX1RyYW5zaXRpb24gPSBmdW5jdGlvbiAoaXNDbGllbnQsIGNyZWF0ZUVsZW1lbnQsIHdhcm4sIGlzTnVtZXJpYywgaXNBcnJheSwgY2FtZWxDYXNlLCBmaWxsR2FwcywgU3RyaW5nRnJhZ21lbnQpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBUcmFuc2l0aW9uLCB0ZXN0U3R5bGUsIHZlbmRvcnMsIHZlbmRvclBhdHRlcm4sIHVucHJlZml4UGF0dGVybiwgcHJlZml4Q2FjaGUsIENTU19UUkFOU0lUSU9OU19FTkFCTEVELCBUUkFOU0lUSU9OLCBUUkFOU0lUSU9OX0RVUkFUSU9OLCBUUkFOU0lUSU9OX1BST1BFUlRZLCBUUkFOU0lUSU9OX1RJTUlOR19GVU5DVElPTiwgVFJBTlNJVElPTkVORDtcbiAgICAgICAgaWYgKCFpc0NsaWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRlc3RTdHlsZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpLnN0eWxlO1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRlc3RTdHlsZS50cmFuc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBUUkFOU0lUSU9OID0gJ3RyYW5zaXRpb24nO1xuICAgICAgICAgICAgICAgIFRSQU5TSVRJT05FTkQgPSAndHJhbnNpdGlvbmVuZCc7XG4gICAgICAgICAgICAgICAgQ1NTX1RSQU5TSVRJT05TX0VOQUJMRUQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXN0U3R5bGUud2Via2l0VHJhbnNpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgVFJBTlNJVElPTiA9ICd3ZWJraXRUcmFuc2l0aW9uJztcbiAgICAgICAgICAgICAgICBUUkFOU0lUSU9ORU5EID0gJ3dlYmtpdFRyYW5zaXRpb25FbmQnO1xuICAgICAgICAgICAgICAgIENTU19UUkFOU0lUSU9OU19FTkFCTEVEID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgQ1NTX1RSQU5TSVRJT05TX0VOQUJMRUQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSgpKTtcbiAgICAgICAgaWYgKFRSQU5TSVRJT04pIHtcbiAgICAgICAgICAgIFRSQU5TSVRJT05fRFVSQVRJT04gPSBUUkFOU0lUSU9OICsgJ0R1cmF0aW9uJztcbiAgICAgICAgICAgIFRSQU5TSVRJT05fUFJPUEVSVFkgPSBUUkFOU0lUSU9OICsgJ1Byb3BlcnR5JztcbiAgICAgICAgICAgIFRSQU5TSVRJT05fVElNSU5HX0ZVTkNUSU9OID0gVFJBTlNJVElPTiArICdUaW1pbmdGdW5jdGlvbic7XG4gICAgICAgIH1cbiAgICAgICAgVHJhbnNpdGlvbiA9IGZ1bmN0aW9uIChkZXNjcmlwdG9yLCByb290LCBvd25lciwgY29udGV4dFN0YWNrLCBpc0ludHJvKSB7XG4gICAgICAgICAgICB2YXIgdCA9IHRoaXMsIG5hbWUsIGZyYWdtZW50LCBlcnJvck1lc3NhZ2U7XG4gICAgICAgICAgICB0aGlzLnJvb3QgPSByb290O1xuICAgICAgICAgICAgdGhpcy5ub2RlID0gb3duZXIubm9kZTtcbiAgICAgICAgICAgIHRoaXMuaXNJbnRybyA9IGlzSW50cm87XG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsU3R5bGUgPSB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZSA9IGZ1bmN0aW9uIChub1Jlc2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFub1Jlc2V0ICYmIHQuaXNJbnRybykge1xuICAgICAgICAgICAgICAgICAgICB0LnJlc2V0U3R5bGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdC5fbWFuYWdlci5wb3AodC5ub2RlKTtcbiAgICAgICAgICAgICAgICB0Lm5vZGUuX3JhY3RpdmUudHJhbnNpdGlvbiA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbmFtZSA9IGRlc2NyaXB0b3IubiB8fCBkZXNjcmlwdG9yO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gbmV3IFN0cmluZ0ZyYWdtZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRvcjogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcm9vdDogdGhpcy5yb290LFxuICAgICAgICAgICAgICAgICAgICBvd25lcjogb3duZXIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRTdGFjazogY29udGV4dFN0YWNrXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbmFtZSA9IGZyYWdtZW50LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQudGVhcmRvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRvci5hKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMgPSBkZXNjcmlwdG9yLmE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRlc2NyaXB0b3IuZCkge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gbmV3IFN0cmluZ0ZyYWdtZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRvcjogZGVzY3JpcHRvci5kLFxuICAgICAgICAgICAgICAgICAgICByb290OiB0aGlzLnJvb3QsXG4gICAgICAgICAgICAgICAgICAgIG93bmVyOiBvd25lcixcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dFN0YWNrOiBjb250ZXh0U3RhY2tcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcyA9IGZyYWdtZW50LnRvQXJnc0xpc3QoKTtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC50ZWFyZG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZm4gPSByb290LnRyYW5zaXRpb25zW25hbWVdO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9mbikge1xuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9ICdNaXNzaW5nIFwiJyArIG5hbWUgKyAnXCIgdHJhbnNpdGlvbi4gWW91IG1heSBuZWVkIHRvIGRvd25sb2FkIGEgcGx1Z2luIHZpYSBodHRwczovL2dpdGh1Yi5jb20vUmFjdGl2ZUpTL1JhY3RpdmUvd2lraS9QbHVnaW5zI3RyYW5zaXRpb25zJztcbiAgICAgICAgICAgICAgICBpZiAocm9vdC5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3YXJuKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgVHJhbnNpdGlvbi5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luaXRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbml0aWFsaXplIGEgdHJhbnNpdGlvbiBtb3JlIHRoYW4gb25jZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZuLmFwcGx5KHRoaXMucm9vdCwgW3RoaXNdLmNvbmNhdCh0aGlzLnBhcmFtcykpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFN0eWxlOiBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29tcHV0ZWRTdHlsZSwgc3R5bGVzLCBpLCBwcm9wLCB2YWx1ZTtcbiAgICAgICAgICAgICAgICBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5ub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByb3BzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNvbXB1dGVkU3R5bGVbcHJlZml4KHByb3BzKV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJzBweCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghaXNBcnJheShwcm9wcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc2l0aW9uI2dldFN0eWxlIG11c3QgYmUgcGFzc2VkIGEgc3RyaW5nLCBvciBhbiBhcnJheSBvZiBzdHJpbmdzIHJlcHJlc2VudGluZyBDU1MgcHJvcGVydGllcycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHlsZXMgPSB7fTtcbiAgICAgICAgICAgICAgICBpID0gcHJvcHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNvbXB1dGVkU3R5bGVbcHJlZml4KHByb3ApXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnMHB4Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlc1twcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFN0eWxlOiBmdW5jdGlvbiAoc3R5bGUsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3A7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHlsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlW3ByZWZpeChzdHlsZSldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChwcm9wIGluIHN0eWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGUuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGVbcHJlZml4KHByb3ApXSA9IHN0eWxlW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGVTdHlsZTogZnVuY3Rpb24gKHN0eWxlLCB2YWx1ZSwgb3B0aW9ucywgY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXMsIHByb3BlcnR5TmFtZXMsIGNoYW5nZWRQcm9wZXJ0aWVzLCBjb21wdXRlZFN0eWxlLCBjdXJyZW50LCB0bywgZnJvbSwgdHJhbnNpdGlvbkVuZEhhbmRsZXIsIGksIHByb3A7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHlsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdG8gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgdG9bc3R5bGVdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG8gPSBzdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGUgPSBvcHRpb25zO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB3YXJuKCdUaGUgXCInICsgdC5uYW1lICsgJ1wiIHRyYW5zaXRpb24gZG9lcyBub3Qgc3VwcGx5IGFuIG9wdGlvbnMgb2JqZWN0IHRvIGB0LmFuaW1hdGVTdHlsZSgpYC4gVGhpcyB3aWxsIGJyZWFrIGluIGEgZnV0dXJlIHZlcnNpb24gb2YgUmFjdGl2ZS4gRm9yIG1vcmUgaW5mbyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL1JhY3RpdmVKUy9SYWN0aXZlL2lzc3Vlcy8zNDAnKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlID0gdC5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHQuc2V0U3R5bGUodG8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lcyA9IE9iamVjdC5rZXlzKHRvKTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkUHJvcGVydGllcyA9IFtdO1xuICAgICAgICAgICAgICAgIGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0Lm5vZGUpO1xuICAgICAgICAgICAgICAgIGZyb20gPSB7fTtcbiAgICAgICAgICAgICAgICBpID0gcHJvcGVydHlOYW1lcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9wID0gcHJvcGVydHlOYW1lc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGNvbXB1dGVkU3R5bGVbcHJlZml4KHByb3ApXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT09ICcwcHgnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudCAhPSB0b1twcm9wXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFByb3BlcnRpZXNbY2hhbmdlZFByb3BlcnRpZXMubGVuZ3RoXSA9IHByb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICB0Lm5vZGUuc3R5bGVbcHJlZml4KHByb3ApXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFjaGFuZ2VkUHJvcGVydGllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHQubm9kZS5zdHlsZVtUUkFOU0lUSU9OX1BST1BFUlRZXSA9IHByb3BlcnR5TmFtZXMubWFwKHByZWZpeCkubWFwKGh5cGhlbmF0ZSkuam9pbignLCcpO1xuICAgICAgICAgICAgICAgICAgICB0Lm5vZGUuc3R5bGVbVFJBTlNJVElPTl9USU1JTkdfRlVOQ1RJT05dID0gaHlwaGVuYXRlKG9wdGlvbnMuZWFzaW5nIHx8ICdsaW5lYXInKTtcbiAgICAgICAgICAgICAgICAgICAgdC5ub2RlLnN0eWxlW1RSQU5TSVRJT05fRFVSQVRJT05dID0gb3B0aW9ucy5kdXJhdGlvbiAvIDEwMDAgKyAncyc7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25FbmRIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGNoYW5nZWRQcm9wZXJ0aWVzLmluZGV4T2YoY2FtZWxDYXNlKHVucHJlZml4KGV2ZW50LnByb3BlcnR5TmFtZSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkUHJvcGVydGllcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZWRQcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHQucm9vdC5maXJlKHQubmFtZSArICc6ZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0Lm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihUUkFOU0lUSU9ORU5ELCB0cmFuc2l0aW9uRW5kSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdC5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoVFJBTlNJVElPTkVORCwgdHJhbnNpdGlvbkVuZEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGNoYW5nZWRQcm9wZXJ0aWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wID0gY2hhbmdlZFByb3BlcnRpZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5ub2RlLnN0eWxlW3ByZWZpeChwcm9wKV0gPSB0b1twcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfSwgb3B0aW9ucy5kZWxheSB8fCAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNldFN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3JpZ2luYWxTdHlsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsIHRoaXMub3JpZ2luYWxTdHlsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldEF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvY2Vzc1BhcmFtczogZnVuY3Rpb24gKHBhcmFtcywgZGVmYXVsdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0geyBkdXJhdGlvbjogcGFyYW1zIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zID09PSAnc2xvdycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IHsgZHVyYXRpb246IDYwMCB9O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcyA9PT0gJ2Zhc3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMgPSB7IGR1cmF0aW9uOiAyMDAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IHsgZHVyYXRpb246IDQwMCB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghcGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsbEdhcHMocGFyYW1zLCBkZWZhdWx0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZlbmRvcnMgPSBbXG4gICAgICAgICAgICAnbycsXG4gICAgICAgICAgICAnbXMnLFxuICAgICAgICAgICAgJ21veicsXG4gICAgICAgICAgICAnd2Via2l0J1xuICAgICAgICBdO1xuICAgICAgICB2ZW5kb3JQYXR0ZXJuID0gbmV3IFJlZ0V4cCgnXig/OicgKyB2ZW5kb3JzLmpvaW4oJ3wnKSArICcpKFtBLVpdKScpO1xuICAgICAgICB1bnByZWZpeFBhdHRlcm4gPSBuZXcgUmVnRXhwKCdeLSg/OicgKyB2ZW5kb3JzLmpvaW4oJ3wnKSArICcpLScpO1xuICAgICAgICBwcmVmaXhDYWNoZSA9IHt9O1xuICAgICAgICBmdW5jdGlvbiBwcmVmaXgocHJvcCkge1xuICAgICAgICAgICAgdmFyIGksIHZlbmRvciwgY2FwcGVkO1xuICAgICAgICAgICAgaWYgKCFwcmVmaXhDYWNoZVtwcm9wXSkge1xuICAgICAgICAgICAgICAgIGlmICh0ZXN0U3R5bGVbcHJvcF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBwcmVmaXhDYWNoZVtwcm9wXSA9IHByb3A7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FwcGVkID0gcHJvcC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3Auc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgICAgICAgICBpID0gdmVuZG9ycy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlbmRvciA9IHZlbmRvcnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVzdFN0eWxlW3ZlbmRvciArIGNhcHBlZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWZpeENhY2hlW3Byb3BdID0gdmVuZG9yICsgY2FwcGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZWZpeENhY2hlW3Byb3BdO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHVucHJlZml4KHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wLnJlcGxhY2UodW5wcmVmaXhQYXR0ZXJuLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaHlwaGVuYXRlKHN0cikge1xuICAgICAgICAgICAgdmFyIGh5cGhlbmF0ZWQ7XG4gICAgICAgICAgICBpZiAodmVuZG9yUGF0dGVybi50ZXN0KHN0cikpIHtcbiAgICAgICAgICAgICAgICBzdHIgPSAnLScgKyBzdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoeXBoZW5hdGVkID0gc3RyLnJlcGxhY2UoL1tBLVpdL2csIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnLScgKyBtYXRjaC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gaHlwaGVuYXRlZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVHJhbnNpdGlvbjtcbiAgICB9KGNvbmZpZ19pc0NsaWVudCwgdXRpbHNfY3JlYXRlRWxlbWVudCwgdXRpbHNfd2FybiwgdXRpbHNfaXNOdW1lcmljLCB1dGlsc19pc0FycmF5LCB1dGlsc19jYW1lbENhc2UsIHV0aWxzX2ZpbGxHYXBzLCByZW5kZXJfU3RyaW5nRnJhZ21lbnRfX1N0cmluZ0ZyYWdtZW50KTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9zaGFyZWRfZXhlY3V0ZVRyYW5zaXRpb25fX2V4ZWN1dGVUcmFuc2l0aW9uID0gZnVuY3Rpb24gKHdhcm4sIFRyYW5zaXRpb24pIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGVzY3JpcHRvciwgcm9vdCwgb3duZXIsIGNvbnRleHRTdGFjaywgaXNJbnRybykge1xuICAgICAgICAgICAgdmFyIHRyYW5zaXRpb24sIG5vZGUsIG9sZFRyYW5zaXRpb247XG4gICAgICAgICAgICBpZiAoIXJvb3QudHJhbnNpdGlvbnNFbmFibGVkIHx8IHJvb3QuX3BhcmVudCAmJiAhcm9vdC5fcGFyZW50LnRyYW5zaXRpb25zRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyYW5zaXRpb24gPSBuZXcgVHJhbnNpdGlvbihkZXNjcmlwdG9yLCByb290LCBvd25lciwgY29udGV4dFN0YWNrLCBpc0ludHJvKTtcbiAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uLl9mbikge1xuICAgICAgICAgICAgICAgIG5vZGUgPSB0cmFuc2l0aW9uLm5vZGU7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbi5fbWFuYWdlciA9IHJvb3QuX3RyYW5zaXRpb25NYW5hZ2VyO1xuICAgICAgICAgICAgICAgIGlmIChvbGRUcmFuc2l0aW9uID0gbm9kZS5fcmFjdGl2ZS50cmFuc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZFRyYW5zaXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZS5fcmFjdGl2ZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvbjtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLl9tYW5hZ2VyLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzSW50cm8pIHtcbiAgICAgICAgICAgICAgICAgICAgcm9vdC5fZGVmZXJyZWQudHJhbnNpdGlvbnMucHVzaCh0cmFuc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLmluaXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSh1dGlsc193YXJuLCByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9zaGFyZWRfZXhlY3V0ZVRyYW5zaXRpb25fVHJhbnNpdGlvbik7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfaW5pdGlhbGlzZV9faW5pdGlhbGlzZSA9IGZ1bmN0aW9uICh0eXBlcywgbmFtZXNwYWNlcywgY3JlYXRlLCBkZWZpbmVQcm9wZXJ0eSwgbWF0Y2hlcywgd2FybiwgY3JlYXRlRWxlbWVudCwgZ2V0RWxlbWVudE5hbWVzcGFjZSwgY3JlYXRlRWxlbWVudEF0dHJpYnV0ZXMsIGFwcGVuZEVsZW1lbnRDaGlsZHJlbiwgZGVjb3JhdGUsIGFkZEV2ZW50UHJveGllcywgdXBkYXRlTGl2ZVF1ZXJpZXMsIGV4ZWN1dGVUcmFuc2l0aW9uLCBlbmZvcmNlQ2FzZSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zLCBkb2NGcmFnKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50RnJhZ21lbnQsIHBOb2RlLCBjb250ZXh0U3RhY2ssIGRlc2NyaXB0b3IsIG5hbWVzcGFjZSwgbmFtZSwgYXR0cmlidXRlcywgd2lkdGgsIGhlaWdodCwgbG9hZEhhbmRsZXIsIHJvb3QsIHNlbGVjdEJpbmRpbmcsIGVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgIGVsZW1lbnQudHlwZSA9IHR5cGVzLkVMRU1FTlQ7XG4gICAgICAgICAgICBwYXJlbnRGcmFnbWVudCA9IGVsZW1lbnQucGFyZW50RnJhZ21lbnQgPSBvcHRpb25zLnBhcmVudEZyYWdtZW50O1xuICAgICAgICAgICAgcE5vZGUgPSBwYXJlbnRGcmFnbWVudC5wTm9kZTtcbiAgICAgICAgICAgIGNvbnRleHRTdGFjayA9IHBhcmVudEZyYWdtZW50LmNvbnRleHRTdGFjaztcbiAgICAgICAgICAgIGRlc2NyaXB0b3IgPSBlbGVtZW50LmRlc2NyaXB0b3IgPSBvcHRpb25zLmRlc2NyaXB0b3I7XG4gICAgICAgICAgICBlbGVtZW50LnJvb3QgPSByb290ID0gcGFyZW50RnJhZ21lbnQucm9vdDtcbiAgICAgICAgICAgIGVsZW1lbnQuaW5kZXggPSBvcHRpb25zLmluZGV4O1xuICAgICAgICAgICAgZWxlbWVudC5sY05hbWUgPSBkZXNjcmlwdG9yLmUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZXZlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgICAgIGVsZW1lbnQuY3VzdG9tRXZlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgICAgIGlmIChwTm9kZSkge1xuICAgICAgICAgICAgICAgIG5hbWVzcGFjZSA9IGVsZW1lbnQubmFtZXNwYWNlID0gZ2V0RWxlbWVudE5hbWVzcGFjZShkZXNjcmlwdG9yLCBwTm9kZSk7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5hbWVzcGFjZSAhPT0gbmFtZXNwYWNlcy5odG1sID8gZW5mb3JjZUNhc2UoZGVzY3JpcHRvci5lKSA6IGRlc2NyaXB0b3IuZTtcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm5vZGUgPSBjcmVhdGVFbGVtZW50KG5hbWUsIG5hbWVzcGFjZSk7XG4gICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkoZWxlbWVudC5ub2RlLCAnX3JhY3RpdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm94eTogZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXBhdGg6IGNvbnRleHRTdGFjay5sZW5ndGggPyBjb250ZXh0U3RhY2tbY29udGV4dFN0YWNrLmxlbmd0aCAtIDFdIDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogcGFyZW50RnJhZ21lbnQuaW5kZXhSZWZzLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBjcmVhdGUobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICByb290OiByb290XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSBjcmVhdGVFbGVtZW50QXR0cmlidXRlcyhlbGVtZW50LCBkZXNjcmlwdG9yLmEpO1xuICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IuZikge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm5vZGUgJiYgZWxlbWVudC5ub2RlLmdldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZS5pbm5lckhUTUwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9ICdBIHByZS1wb3B1bGF0ZWQgY29udGVudGVkaXRhYmxlIGVsZW1lbnQgc2hvdWxkIG5vdCBoYXZlIGNoaWxkcmVuJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb290LmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcHBlbmRFbGVtZW50Q2hpbGRyZW4oZWxlbWVudCwgZWxlbWVudC5ub2RlLCBkZXNjcmlwdG9yLCBkb2NGcmFnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkb2NGcmFnICYmIGRlc2NyaXB0b3Iudikge1xuICAgICAgICAgICAgICAgIGFkZEV2ZW50UHJveGllcyhlbGVtZW50LCBkZXNjcmlwdG9yLnYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRvY0ZyYWcpIHtcbiAgICAgICAgICAgICAgICBpZiAocm9vdC50d293YXkpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5iaW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm5vZGUuZ2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnKSAmJiBlbGVtZW50Lm5vZGUuX3JhY3RpdmUuYmluZGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5ub2RlLl9yYWN0aXZlLmJpbmRpbmcudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXMubmFtZSAmJiAhYXR0cmlidXRlcy5uYW1lLnR3b3dheSkge1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLm5hbWUudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm5vZGUudGFnTmFtZSA9PT0gJ0lNRycgJiYgKCh3aWR0aCA9IGVsZW1lbnQuYXR0cmlidXRlcy53aWR0aCkgfHwgKGhlaWdodCA9IGVsZW1lbnQuYXR0cmlidXRlcy5oZWlnaHQpKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGxvYWRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5ub2RlLndpZHRoID0gd2lkdGgudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5ub2RlLmhlaWdodCA9IGhlaWdodC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgbG9hZEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKGVsZW1lbnQubm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3Iubykge1xuICAgICAgICAgICAgICAgICAgICBkZWNvcmF0ZShkZXNjcmlwdG9yLm8sIHJvb3QsIGVsZW1lbnQsIGNvbnRleHRTdGFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yLnQxKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4ZWN1dGVUcmFuc2l0aW9uKGRlc2NyaXB0b3IudDEsIHJvb3QsIGVsZW1lbnQsIGNvbnRleHRTdGFjaywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm5vZGUudGFnTmFtZSA9PT0gJ09QVElPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBOb2RlLnRhZ05hbWUgPT09ICdTRUxFQ1QnICYmIChzZWxlY3RCaW5kaW5nID0gcE5vZGUuX3JhY3RpdmUuYmluZGluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdEJpbmRpbmcuZGVmZXJVcGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5ub2RlLl9yYWN0aXZlLnZhbHVlID09IHBOb2RlLl9yYWN0aXZlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5vZGUuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm5vZGUuYXV0b2ZvY3VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvb3QuX2RlZmVycmVkLmZvY3VzYWJsZSA9IGVsZW1lbnQubm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1cGRhdGVMaXZlUXVlcmllcyhlbGVtZW50KTtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcywgY29uZmlnX25hbWVzcGFjZXMsIHV0aWxzX2NyZWF0ZSwgdXRpbHNfZGVmaW5lUHJvcGVydHksIHV0aWxzX21hdGNoZXMsIHV0aWxzX3dhcm4sIHV0aWxzX2NyZWF0ZUVsZW1lbnQsIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X2luaXRpYWxpc2VfZ2V0RWxlbWVudE5hbWVzcGFjZSwgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfaW5pdGlhbGlzZV9jcmVhdGVFbGVtZW50QXR0cmlidXRlcywgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfaW5pdGlhbGlzZV9hcHBlbmRFbGVtZW50Q2hpbGRyZW4sIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X2luaXRpYWxpc2VfZGVjb3JhdGVfX2RlY29yYXRlLCByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9pbml0aWFsaXNlX2FkZEV2ZW50UHJveGllc19fYWRkRXZlbnRQcm94aWVzLCByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9pbml0aWFsaXNlX3VwZGF0ZUxpdmVRdWVyaWVzLCByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9zaGFyZWRfZXhlY3V0ZVRyYW5zaXRpb25fX2V4ZWN1dGVUcmFuc2l0aW9uLCByZW5kZXJfRG9tRnJhZ21lbnRfc2hhcmVkX2VuZm9yY2VDYXNlKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9wcm90b3R5cGVfdGVhcmRvd24gPSBmdW5jdGlvbiAoZXhlY3V0ZVRyYW5zaXRpb24pIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGVzdHJveSkge1xuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSwgYmluZGluZywgYmluZGluZ3MsIGksIGxpdmVRdWVyaWVzLCBzZWxlY3RvciwgcXVlcnksIG5vZGVzVG9SZW1vdmUsIGo7XG4gICAgICAgICAgICBpZiAodGhpcy5mcmFnbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQudGVhcmRvd24oZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKHRoaXMuYXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZXMucG9wKCkudGVhcmRvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGV2ZW50TmFtZSBpbiB0aGlzLm5vZGUuX3JhY3RpdmUuZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5fcmFjdGl2ZS5ldmVudHNbZXZlbnROYW1lXS50ZWFyZG93bigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYmluZGluZyA9IHRoaXMubm9kZS5fcmFjdGl2ZS5iaW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGJpbmRpbmcudGVhcmRvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgYmluZGluZ3MgPSB0aGlzLnJvb3QuX3R3b3dheUJpbmRpbmdzW2JpbmRpbmcuYXR0ci5rZXlwYXRoXTtcbiAgICAgICAgICAgICAgICAgICAgYmluZGluZ3Muc3BsaWNlKGJpbmRpbmdzLmluZGV4T2YoYmluZGluZyksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRlY29yYXRvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjb3JhdG9yLnRlYXJkb3duKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5kZXNjcmlwdG9yLnQyKSB7XG4gICAgICAgICAgICAgICAgZXhlY3V0ZVRyYW5zaXRpb24odGhpcy5kZXNjcmlwdG9yLnQyLCB0aGlzLnJvb3QsIHRoaXMsIHRoaXMucGFyZW50RnJhZ21lbnQuY29udGV4dFN0YWNrLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVzdHJveSkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5fdHJhbnNpdGlvbk1hbmFnZXIuZGV0YWNoV2hlblJlYWR5KHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpdmVRdWVyaWVzID0gdGhpcy5saXZlUXVlcmllcykge1xuICAgICAgICAgICAgICAgIGkgPSBsaXZlUXVlcmllcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciA9IGxpdmVRdWVyaWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZXNUb1JlbW92ZSA9IHRoaXMubGl2ZVF1ZXJpZXNbc2VsZWN0b3JdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqID0gbm9kZXNUb1JlbW92ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeSA9IHRoaXMucm9vdC5fbGl2ZVF1ZXJpZXNbc2VsZWN0b3JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5Ll9yZW1vdmUobm9kZXNUb1JlbW92ZVtqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfShyZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9zaGFyZWRfZXhlY3V0ZVRyYW5zaXRpb25fX2V4ZWN1dGVUcmFuc2l0aW9uKTtcbnZhciBjb25maWdfdm9pZEVsZW1lbnROYW1lcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiAnYXJlYSBiYXNlIGJyIGNvbCBjb21tYW5kIGRvY3R5cGUgZW1iZWQgaHIgaW1nIGlucHV0IGtleWdlbiBsaW5rIG1ldGEgcGFyYW0gc291cmNlIHRyYWNrIHdicicuc3BsaXQoJyAnKTtcbiAgICB9KCk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfcHJvdG90eXBlX3RvU3RyaW5nID0gZnVuY3Rpb24gKHZvaWRFbGVtZW50TmFtZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RyLCBpLCBsZW47XG4gICAgICAgICAgICBzdHIgPSAnPCcgKyAodGhpcy5kZXNjcmlwdG9yLnkgPyAnIWRvY3R5cGUnIDogdGhpcy5kZXNjcmlwdG9yLmUpO1xuICAgICAgICAgICAgbGVuID0gdGhpcy5hdHRyaWJ1dGVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIHN0ciArPSAnICcgKyB0aGlzLmF0dHJpYnV0ZXNbaV0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ciArPSAnPic7XG4gICAgICAgICAgICBpZiAodGhpcy5odG1sKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IHRoaXMuaHRtbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5mcmFnbWVudCkge1xuICAgICAgICAgICAgICAgIHN0ciArPSB0aGlzLmZyYWdtZW50LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodm9pZEVsZW1lbnROYW1lcy5pbmRleE9mKHRoaXMuZGVzY3JpcHRvci5lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gJzwvJyArIHRoaXMuZGVzY3JpcHRvci5lICsgJz4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ192b2lkRWxlbWVudE5hbWVzKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9wcm90b3R5cGVfZmluZCA9IGZ1bmN0aW9uIChtYXRjaGVzKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnlSZXN1bHQ7XG4gICAgICAgICAgICBpZiAobWF0Y2hlcyh0aGlzLm5vZGUsIHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5odG1sICYmIChxdWVyeVJlc3VsdCA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnlSZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5mcmFnbWVudCAmJiB0aGlzLmZyYWdtZW50LmZpbmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mcmFnbWVudC5maW5kKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KHV0aWxzX21hdGNoZXMpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X3Byb3RvdHlwZV9maW5kQWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzZWxlY3RvciwgcXVlcnkpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeUFsbFJlc3VsdCwgaSwgbnVtTm9kZXMsIG5vZGUsIHJlZ2lzdGVyZWROb2RlcztcbiAgICAgICAgICAgIGlmIChxdWVyeS5fdGVzdCh0aGlzLCB0cnVlKSAmJiBxdWVyeS5saXZlKSB7XG4gICAgICAgICAgICAgICAgKHRoaXMubGl2ZVF1ZXJpZXMgfHwgKHRoaXMubGl2ZVF1ZXJpZXMgPSBbXSkpLnB1c2goc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIHRoaXMubGl2ZVF1ZXJpZXNbc2VsZWN0b3JdID0gW3RoaXMubm9kZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5odG1sICYmIChxdWVyeUFsbFJlc3VsdCA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkgJiYgKG51bU5vZGVzID0gcXVlcnlBbGxSZXN1bHQubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIGlmIChxdWVyeS5saXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5saXZlUXVlcmllc1tzZWxlY3Rvcl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmxpdmVRdWVyaWVzIHx8ICh0aGlzLmxpdmVRdWVyaWVzID0gW10pKS5wdXNoKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGl2ZVF1ZXJpZXNbc2VsZWN0b3JdID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJlZE5vZGVzID0gdGhpcy5saXZlUXVlcmllc1tzZWxlY3Rvcl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBudW1Ob2RlczsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBxdWVyeUFsbFJlc3VsdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXJ5LmxpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyZWROb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZnJhZ21lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50LmZpbmRBbGwoc2VsZWN0b3IsIHF1ZXJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfcHJvdG90eXBlX2ZpbmRDb21wb25lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mcmFnbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYWdtZW50LmZpbmRDb21wb25lbnQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9wcm90b3R5cGVfZmluZEFsbENvbXBvbmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlbGVjdG9yLCBxdWVyeSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZnJhZ21lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50LmZpbmRBbGxDb21wb25lbnRzKHNlbGVjdG9yLCBxdWVyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X3Byb3RvdHlwZV9iaW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gdGhpcy5hdHRyaWJ1dGVzO1xuICAgICAgICAgICAgaWYgKCF0aGlzLm5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5iaW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kaW5nLnRlYXJkb3duKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kaW5nID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnKSAmJiBhdHRyaWJ1dGVzLnZhbHVlICYmIGF0dHJpYnV0ZXMudmFsdWUuYmluZCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmRlc2NyaXB0b3IuZSkge1xuICAgICAgICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnZhbHVlLmJpbmQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSAnaW5wdXQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUudHlwZSA9PT0gJ3JhZGlvJyB8fCB0aGlzLm5vZGUudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlcy5uYW1lICYmIGF0dHJpYnV0ZXMubmFtZS5iaW5kKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlcy5jaGVja2VkICYmIGF0dHJpYnV0ZXMuY2hlY2tlZC5iaW5kKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlcy52YWx1ZSAmJiBhdHRyaWJ1dGVzLnZhbHVlLmJpbmQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9fRWxlbWVudCA9IGZ1bmN0aW9uIChpbml0aWFsaXNlLCB0ZWFyZG93biwgdG9TdHJpbmcsIGZpbmQsIGZpbmRBbGwsIGZpbmRDb21wb25lbnQsIGZpbmRBbGxDb21wb25lbnRzLCBiaW5kKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgRG9tRWxlbWVudCA9IGZ1bmN0aW9uIChvcHRpb25zLCBkb2NGcmFnKSB7XG4gICAgICAgICAgICBpbml0aWFsaXNlKHRoaXMsIG9wdGlvbnMsIGRvY0ZyYWcpO1xuICAgICAgICB9O1xuICAgICAgICBEb21FbGVtZW50LnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIGRldGFjaDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiB0ZWFyZG93bixcbiAgICAgICAgICAgIGZpcnN0Tm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZE5leHROb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnViYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHJpbmc6IHRvU3RyaW5nLFxuICAgICAgICAgICAgZmluZDogZmluZCxcbiAgICAgICAgICAgIGZpbmRBbGw6IGZpbmRBbGwsXG4gICAgICAgICAgICBmaW5kQ29tcG9uZW50OiBmaW5kQ29tcG9uZW50LFxuICAgICAgICAgICAgZmluZEFsbENvbXBvbmVudHM6IGZpbmRBbGxDb21wb25lbnRzLFxuICAgICAgICAgICAgYmluZDogYmluZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRG9tRWxlbWVudDtcbiAgICB9KHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X2luaXRpYWxpc2VfX2luaXRpYWxpc2UsIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X3Byb3RvdHlwZV90ZWFyZG93biwgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfcHJvdG90eXBlX3RvU3RyaW5nLCByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9wcm90b3R5cGVfZmluZCwgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfcHJvdG90eXBlX2ZpbmRBbGwsIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X3Byb3RvdHlwZV9maW5kQ29tcG9uZW50LCByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9wcm90b3R5cGVfZmluZEFsbENvbXBvbmVudHMsIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X3Byb3RvdHlwZV9iaW5kKTtcbnZhciBjb25maWdfZXJyb3JzID0geyBtaXNzaW5nUGFyc2VyOiAnTWlzc2luZyBSYWN0aXZlLnBhcnNlIC0gY2Fubm90IHBhcnNlIHRlbXBsYXRlLiBFaXRoZXIgcHJlcGFyc2Ugb3IgdXNlIHRoZSB2ZXJzaW9uIHRoYXQgaW5jbHVkZXMgdGhlIHBhcnNlcicgfTtcbnZhciByZWdpc3RyaWVzX3BhcnRpYWxzID0ge307XG52YXIgcGFyc2VfdXRpbHNfc3RyaXBIdG1sQ29tbWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGh0bWwpIHtcbiAgICAgICAgICAgIHZhciBjb21tZW50U3RhcnQsIGNvbW1lbnRFbmQsIHByb2Nlc3NlZDtcbiAgICAgICAgICAgIHByb2Nlc3NlZCA9ICcnO1xuICAgICAgICAgICAgd2hpbGUgKGh0bWwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29tbWVudFN0YXJ0ID0gaHRtbC5pbmRleE9mKCc8IS0tJyk7XG4gICAgICAgICAgICAgICAgY29tbWVudEVuZCA9IGh0bWwuaW5kZXhPZignLS0+Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbW1lbnRTdGFydCA9PT0gLTEgJiYgY29tbWVudEVuZCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkICs9IGh0bWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY29tbWVudFN0YXJ0ICE9PSAtMSAmJiBjb21tZW50RW5kID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyAnSWxsZWdhbCBIVE1MIC0gZXhwZWN0ZWQgY2xvc2luZyBjb21tZW50IHNlcXVlbmNlIChcXCctLT5cXCcpJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvbW1lbnRFbmQgIT09IC0xICYmIGNvbW1lbnRTdGFydCA9PT0gLTEgfHwgY29tbWVudEVuZCA8IGNvbW1lbnRTdGFydCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyAnSWxsZWdhbCBIVE1MIC0gdW5leHBlY3RlZCBjbG9zaW5nIGNvbW1lbnQgc2VxdWVuY2UgKFxcJy0tPlxcJyknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9jZXNzZWQgKz0gaHRtbC5zdWJzdHIoMCwgY29tbWVudFN0YXJ0KTtcbiAgICAgICAgICAgICAgICBodG1sID0gaHRtbC5zdWJzdHJpbmcoY29tbWVudEVuZCArIDMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NlZDtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgcGFyc2VfdXRpbHNfc3RyaXBTdGFuZGFsb25lcyA9IGZ1bmN0aW9uICh0eXBlcykge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbnMpIHtcbiAgICAgICAgICAgIHZhciBpLCBjdXJyZW50LCBiYWNrT25lLCBiYWNrVHdvLCBsZWFkaW5nTGluZWJyZWFrLCB0cmFpbGluZ0xpbmVicmVhaztcbiAgICAgICAgICAgIGxlYWRpbmdMaW5lYnJlYWsgPSAvXlxccypcXHI/XFxuLztcbiAgICAgICAgICAgIHRyYWlsaW5nTGluZWJyZWFrID0gL1xccj9cXG5cXHMqJC87XG4gICAgICAgICAgICBmb3IgKGkgPSAyOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgICAgICBiYWNrT25lID0gdG9rZW5zW2kgLSAxXTtcbiAgICAgICAgICAgICAgICBiYWNrVHdvID0gdG9rZW5zW2kgLSAyXTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudC50eXBlID09PSB0eXBlcy5URVhUICYmIGJhY2tPbmUudHlwZSA9PT0gdHlwZXMuTVVTVEFDSEUgJiYgYmFja1R3by50eXBlID09PSB0eXBlcy5URVhUKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFpbGluZ0xpbmVicmVhay50ZXN0KGJhY2tUd28udmFsdWUpICYmIGxlYWRpbmdMaW5lYnJlYWsudGVzdChjdXJyZW50LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhY2tPbmUubXVzdGFjaGVUeXBlICE9PSB0eXBlcy5JTlRFUlBPTEFUT1IgJiYgYmFja09uZS5tdXN0YWNoZVR5cGUgIT09IHR5cGVzLlRSSVBMRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tUd28udmFsdWUgPSBiYWNrVHdvLnZhbHVlLnJlcGxhY2UodHJhaWxpbmdMaW5lYnJlYWssICdcXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQudmFsdWUgPSBjdXJyZW50LnZhbHVlLnJlcGxhY2UobGVhZGluZ0xpbmVicmVhaywgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQudmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5zLnNwbGljZShpLS0sIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRva2VucztcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcyk7XG52YXIgcGFyc2VfdXRpbHNfc3RyaXBDb21tZW50VG9rZW5zID0gZnVuY3Rpb24gKHR5cGVzKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRva2Vucykge1xuICAgICAgICAgICAgdmFyIGksIGN1cnJlbnQsIHByZXZpb3VzLCBuZXh0O1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSB0b2tlbnNbaV07XG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSB0b2tlbnNbaSAtIDFdO1xuICAgICAgICAgICAgICAgIG5leHQgPSB0b2tlbnNbaSArIDFdO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Lm11c3RhY2hlVHlwZSA9PT0gdHlwZXMuQ09NTUVOVCB8fCBjdXJyZW50Lm11c3RhY2hlVHlwZSA9PT0gdHlwZXMuREVMSU1DSEFOR0UpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzICYmIG5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91cy50eXBlID09PSB0eXBlcy5URVhUICYmIG5leHQudHlwZSA9PT0gdHlwZXMuVEVYVCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzLnZhbHVlICs9IG5leHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpIC09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRva2VucztcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcyk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldE11c3RhY2hlX2dldERlbGltaXRlckNoYW5nZSA9IGZ1bmN0aW9uIChtYWtlUmVnZXhNYXRjaGVyKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZ2V0RGVsaW1pdGVyID0gbWFrZVJlZ2V4TWF0Y2hlcigvXlteXFxzPV0rLyk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQsIG9wZW5pbmcsIGNsb3Npbmc7XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnPScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGFydCA9IHRva2VuaXplci5wb3M7XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBvcGVuaW5nID0gZ2V0RGVsaW1pdGVyKHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAoIW9wZW5pbmcpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBjbG9zaW5nID0gZ2V0RGVsaW1pdGVyKHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAoIWNsb3NpbmcpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnPScpKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICBvcGVuaW5nLFxuICAgICAgICAgICAgICAgIGNsb3NpbmdcbiAgICAgICAgICAgIF07XG4gICAgICAgIH07XG4gICAgfShwYXJzZV9Ub2tlbml6ZXJfdXRpbHNfbWFrZVJlZ2V4TWF0Y2hlcik7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldE11c3RhY2hlX2dldE11c3RhY2hlVHlwZSA9IGZ1bmN0aW9uICh0eXBlcykge1xuICAgICAgICBcbiAgICAgICAgdmFyIG11c3RhY2hlVHlwZXMgPSB7XG4gICAgICAgICAgICAgICAgJyMnOiB0eXBlcy5TRUNUSU9OLFxuICAgICAgICAgICAgICAgICdeJzogdHlwZXMuSU5WRVJURUQsXG4gICAgICAgICAgICAgICAgJy8nOiB0eXBlcy5DTE9TSU5HLFxuICAgICAgICAgICAgICAgICc+JzogdHlwZXMuUEFSVElBTCxcbiAgICAgICAgICAgICAgICAnISc6IHR5cGVzLkNPTU1FTlQsXG4gICAgICAgICAgICAgICAgJyYnOiB0eXBlcy5UUklQTEVcbiAgICAgICAgICAgIH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IG11c3RhY2hlVHlwZXNbdG9rZW5pemVyLnN0ci5jaGFyQXQodG9rZW5pemVyLnBvcyldO1xuICAgICAgICAgICAgaWYgKCF0eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbml6ZXIucG9zICs9IDE7XG4gICAgICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcyk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldE11c3RhY2hlX2dldE11c3RhY2hlQ29udGVudCA9IGZ1bmN0aW9uICh0eXBlcywgbWFrZVJlZ2V4TWF0Y2hlciwgZ2V0TXVzdGFjaGVUeXBlKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZ2V0SW5kZXhSZWYgPSBtYWtlUmVnZXhNYXRjaGVyKC9eXFxzKjpcXHMqKFthLXpBLVpfJF1bYS16QS1aXyQwLTldKikvKSwgYXJyYXlNZW1iZXIgPSAvXlswLTldWzEtOV0qJC87XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5pemVyLCBpc1RyaXBsZSkge1xuICAgICAgICAgICAgdmFyIHN0YXJ0LCBtdXN0YWNoZSwgdHlwZSwgZXhwciwgaSwgcmVtYWluaW5nLCBpbmRleDtcbiAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgIG11c3RhY2hlID0geyB0eXBlOiBpc1RyaXBsZSA/IHR5cGVzLlRSSVBMRSA6IHR5cGVzLk1VU1RBQ0hFIH07XG4gICAgICAgICAgICBpZiAoIWlzVHJpcGxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV4cHIgPSB0b2tlbml6ZXIuZ2V0RXhwcmVzc2lvbigpKSB7XG4gICAgICAgICAgICAgICAgICAgIG11c3RhY2hlLm11c3RhY2hlVHlwZSA9IHR5cGVzLklOVEVSUE9MQVRPUjtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW5pemVyLmdldFN0cmluZ01hdGNoKHRva2VuaXplci5kZWxpbWl0ZXJzWzFdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyAtPSB0b2tlbml6ZXIuZGVsaW1pdGVyc1sxXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHByID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWV4cHIpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IGdldE11c3RhY2hlVHlwZSh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gdHlwZXMuVFJJUExFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtdXN0YWNoZSA9IHsgdHlwZTogdHlwZXMuVFJJUExFIH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtdXN0YWNoZS5tdXN0YWNoZVR5cGUgPSB0eXBlIHx8IHR5cGVzLklOVEVSUE9MQVRPUjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gdHlwZXMuQ09NTUVOVCB8fCB0eXBlID09PSB0eXBlcy5DTE9TSU5HKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1haW5pbmcgPSB0b2tlbml6ZXIucmVtYWluaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHJlbWFpbmluZy5pbmRleE9mKHRva2VuaXplci5kZWxpbWl0ZXJzWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdXN0YWNoZS5yZWYgPSByZW1haW5pbmcuc3Vic3RyKDAsIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zICs9IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtdXN0YWNoZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZXhwcikge1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgICAgICBleHByID0gdG9rZW5pemVyLmdldEV4cHJlc3Npb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChleHByLnQgPT09IHR5cGVzLkJSQUNLRVRFRCAmJiBleHByLngpIHtcbiAgICAgICAgICAgICAgICBleHByID0gZXhwci54O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV4cHIudCA9PT0gdHlwZXMuUkVGRVJFTkNFKSB7XG4gICAgICAgICAgICAgICAgbXVzdGFjaGUucmVmID0gZXhwci5uO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChleHByLnQgPT09IHR5cGVzLk5VTUJFUl9MSVRFUkFMICYmIGFycmF5TWVtYmVyLnRlc3QoZXhwci52KSkge1xuICAgICAgICAgICAgICAgIG11c3RhY2hlLnJlZiA9IGV4cHIudjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbXVzdGFjaGUuZXhwcmVzc2lvbiA9IGV4cHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gZ2V0SW5kZXhSZWYodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmIChpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbXVzdGFjaGUuaW5kZXhSZWYgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG11c3RhY2hlO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9Ub2tlbml6ZXJfdXRpbHNfbWFrZVJlZ2V4TWF0Y2hlciwgcGFyc2VfVG9rZW5pemVyX2dldE11c3RhY2hlX2dldE11c3RhY2hlVHlwZSk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldE11c3RhY2hlX19nZXRNdXN0YWNoZSA9IGZ1bmN0aW9uICh0eXBlcywgZ2V0RGVsaW1pdGVyQ2hhbmdlLCBnZXRNdXN0YWNoZUNvbnRlbnQpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2Vla1RyaXBsZUZpcnN0ID0gdGhpcy50cmlwbGVEZWxpbWl0ZXJzWzBdLmxlbmd0aCA+IHRoaXMuZGVsaW1pdGVyc1swXS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TXVzdGFjaGUodGhpcywgc2Vla1RyaXBsZUZpcnN0KSB8fCBnZXRNdXN0YWNoZSh0aGlzLCAhc2Vla1RyaXBsZUZpcnN0KTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0TXVzdGFjaGUodG9rZW5pemVyLCBzZWVrVHJpcGxlKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0b2tlbml6ZXIucG9zLCBjb250ZW50LCBkZWxpbWl0ZXJzO1xuICAgICAgICAgICAgZGVsaW1pdGVycyA9IHNlZWtUcmlwbGUgPyB0b2tlbml6ZXIudHJpcGxlRGVsaW1pdGVycyA6IHRva2VuaXplci5kZWxpbWl0ZXJzO1xuICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goZGVsaW1pdGVyc1swXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRlbnQgPSBnZXREZWxpbWl0ZXJDaGFuZ2UodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goZGVsaW1pdGVyc1sxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyW3NlZWtUcmlwbGUgPyAndHJpcGxlRGVsaW1pdGVycycgOiAnZGVsaW1pdGVycyddID0gY29udGVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlcy5NVVNUQUNIRSxcbiAgICAgICAgICAgICAgICAgICAgbXVzdGFjaGVUeXBlOiB0eXBlcy5ERUxJTUNIQU5HRVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBjb250ZW50ID0gZ2V0TXVzdGFjaGVDb250ZW50KHRva2VuaXplciwgc2Vla1RyaXBsZSk7XG4gICAgICAgICAgICBpZiAoY29udGVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKGRlbGltaXRlcnNbMV0pKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9KGNvbmZpZ190eXBlcywgcGFyc2VfVG9rZW5pemVyX2dldE11c3RhY2hlX2dldERlbGltaXRlckNoYW5nZSwgcGFyc2VfVG9rZW5pemVyX2dldE11c3RhY2hlX2dldE11c3RhY2hlQ29udGVudCk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldENvbW1lbnRfZ2V0Q29tbWVudCA9IGZ1bmN0aW9uICh0eXBlcykge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjb250ZW50LCByZW1haW5pbmcsIGVuZEluZGV4O1xuICAgICAgICAgICAgaWYgKCF0aGlzLmdldFN0cmluZ01hdGNoKCc8IS0tJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlbWFpbmluZyA9IHRoaXMucmVtYWluaW5nKCk7XG4gICAgICAgICAgICBlbmRJbmRleCA9IHJlbWFpbmluZy5pbmRleE9mKCctLT4nKTtcbiAgICAgICAgICAgIGlmIChlbmRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgZW5kIG9mIGlucHV0IChleHBlY3RlZCBcIi0tPlwiIHRvIGNsb3NlIGNvbW1lbnQpJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250ZW50ID0gcmVtYWluaW5nLnN1YnN0cigwLCBlbmRJbmRleCk7XG4gICAgICAgICAgICB0aGlzLnBvcyArPSBlbmRJbmRleCArIDM7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVzLkNPTU1FTlQsXG4gICAgICAgICAgICAgICAgY29udGVudDogY29udGVudFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcyk7XG52YXIgcGFyc2VfVG9rZW5pemVyX3V0aWxzX2dldExvd2VzdEluZGV4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChoYXlzdGFjaywgbmVlZGxlcykge1xuICAgICAgICAgICAgdmFyIGksIGluZGV4LCBsb3dlc3Q7XG4gICAgICAgICAgICBpID0gbmVlZGxlcy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBoYXlzdGFjay5pbmRleE9mKG5lZWRsZXNbaV0pO1xuICAgICAgICAgICAgICAgIGlmICghaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghbG93ZXN0IHx8IGluZGV4IDwgbG93ZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxvd2VzdCA9IGluZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsb3dlc3QgfHwgLTE7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9nZXRUYWdfX2dldFRhZyA9IGZ1bmN0aW9uICh0eXBlcywgbWFrZVJlZ2V4TWF0Y2hlciwgZ2V0TG93ZXN0SW5kZXgpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBnZXRUYWcsIGdldE9wZW5pbmdUYWcsIGdldENsb3NpbmdUYWcsIGdldFRhZ05hbWUsIGdldEF0dHJpYnV0ZXMsIGdldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlTmFtZSwgZ2V0QXR0cmlidXRlVmFsdWUsIGdldFVucXVvdGVkQXR0cmlidXRlVmFsdWUsIGdldFVucXVvdGVkQXR0cmlidXRlVmFsdWVUb2tlbiwgZ2V0VW5xdW90ZWRBdHRyaWJ1dGVWYWx1ZVRleHQsIGdldFF1b3RlZFN0cmluZ1Rva2VuLCBnZXRRdW90ZWRBdHRyaWJ1dGVWYWx1ZTtcbiAgICAgICAgZ2V0VGFnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldE9wZW5pbmdUYWcodGhpcykgfHwgZ2V0Q2xvc2luZ1RhZyh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgZ2V0T3BlbmluZ1RhZyA9IGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCwgdGFnLCBhdHRycywgbG93ZXJDYXNlTmFtZTtcbiAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgIGlmICh0b2tlbml6ZXIuaW5zaWRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnPCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWcgPSB7IHR5cGU6IHR5cGVzLlRBRyB9O1xuICAgICAgICAgICAgaWYgKHRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnIScpKSB7XG4gICAgICAgICAgICAgICAgdGFnLmRvY3R5cGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFnLm5hbWUgPSBnZXRUYWdOYW1lKHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAoIXRhZy5uYW1lKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXR0cnMgPSBnZXRBdHRyaWJ1dGVzKHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAoYXR0cnMpIHtcbiAgICAgICAgICAgICAgICB0YWcuYXR0cnMgPSBhdHRycztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGlmICh0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJy8nKSkge1xuICAgICAgICAgICAgICAgIHRhZy5zZWxmQ2xvc2luZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnPicpKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG93ZXJDYXNlTmFtZSA9IHRhZy5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAobG93ZXJDYXNlTmFtZSA9PT0gJ3NjcmlwdCcgfHwgbG93ZXJDYXNlTmFtZSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5pbnNpZGUgPSBsb3dlckNhc2VOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRhZztcbiAgICAgICAgfTtcbiAgICAgICAgZ2V0Q2xvc2luZ1RhZyA9IGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCwgdGFnLCBleHBlY3RlZDtcbiAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgIGV4cGVjdGVkID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBjaGFyYWN0ZXIgJyArIHRva2VuaXplci5yZW1haW5pbmcoKS5jaGFyQXQoMCkgKyAnIChleHBlY3RlZCAnICsgc3RyICsgJyknKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnPCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWcgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZXMuVEFHLFxuICAgICAgICAgICAgICAgIGNsb3Npbmc6IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnLycpKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0ZWQoJ1wiL1wiJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWcubmFtZSA9IGdldFRhZ05hbWUodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmICghdGFnLm5hbWUpIHtcbiAgICAgICAgICAgICAgICBleHBlY3RlZCgndGFnIG5hbWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCc+JykpIHtcbiAgICAgICAgICAgICAgICBleHBlY3RlZCgnXCI+XCInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b2tlbml6ZXIuaW5zaWRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhZy5uYW1lLnRvTG93ZXJDYXNlKCkgIT09IHRva2VuaXplci5pbnNpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLmluc2lkZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGFnO1xuICAgICAgICB9O1xuICAgICAgICBnZXRUYWdOYW1lID0gbWFrZVJlZ2V4TWF0Y2hlcigvXlthLXpBLVpdezEsfTo/W2EtekEtWjAtOVxcLV0qLyk7XG4gICAgICAgIGdldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQsIGF0dHJzLCBhdHRyO1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgYXR0ciA9IGdldEF0dHJpYnV0ZSh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgaWYgKCFhdHRyKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXR0cnMgPSBbXTtcbiAgICAgICAgICAgIHdoaWxlIChhdHRyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXR0cnNbYXR0cnMubGVuZ3RoXSA9IGF0dHI7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgICAgIGF0dHIgPSBnZXRBdHRyaWJ1dGUodG9rZW5pemVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhdHRycztcbiAgICAgICAgfTtcbiAgICAgICAgZ2V0QXR0cmlidXRlID0gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIGF0dHIsIG5hbWUsIHZhbHVlO1xuICAgICAgICAgICAgbmFtZSA9IGdldEF0dHJpYnV0ZU5hbWUodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXR0ciA9IHsgbmFtZTogbmFtZSB9O1xuICAgICAgICAgICAgdmFsdWUgPSBnZXRBdHRyaWJ1dGVWYWx1ZSh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgYXR0ci52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF0dHI7XG4gICAgICAgIH07XG4gICAgICAgIGdldEF0dHJpYnV0ZU5hbWUgPSBtYWtlUmVnZXhNYXRjaGVyKC9eW15cXHNcIic+XFwvPV0rLyk7XG4gICAgICAgIGdldEF0dHJpYnV0ZVZhbHVlID0gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIHN0YXJ0LCB2YWx1ZTtcbiAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCc9JykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICB2YWx1ZSA9IGdldFF1b3RlZEF0dHJpYnV0ZVZhbHVlKHRva2VuaXplciwgJ1xcJycpIHx8IGdldFF1b3RlZEF0dHJpYnV0ZVZhbHVlKHRva2VuaXplciwgJ1wiJykgfHwgZ2V0VW5xdW90ZWRBdHRyaWJ1dGVWYWx1ZSh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICBnZXRVbnF1b3RlZEF0dHJpYnV0ZVZhbHVlVGV4dCA9IG1ha2VSZWdleE1hdGNoZXIoL15bXlxcc1wiJz08PmBdKy8pO1xuICAgICAgICBnZXRVbnF1b3RlZEF0dHJpYnV0ZVZhbHVlVG9rZW4gPSBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQsIHRleHQsIGluZGV4O1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgdGV4dCA9IGdldFVucXVvdGVkQXR0cmlidXRlVmFsdWVUZXh0KHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoaW5kZXggPSB0ZXh0LmluZGV4T2YodG9rZW5pemVyLmRlbGltaXRlcnNbMF0pKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHIoMCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydCArIHRleHQubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlcy5URVhULFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZXh0XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBnZXRVbnF1b3RlZEF0dHJpYnV0ZVZhbHVlID0gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIHRva2VucywgdG9rZW47XG4gICAgICAgICAgICB0b2tlbnMgPSBbXTtcbiAgICAgICAgICAgIHRva2VuID0gdG9rZW5pemVyLmdldE11c3RhY2hlKCkgfHwgZ2V0VW5xdW90ZWRBdHRyaWJ1dGVWYWx1ZVRva2VuKHRva2VuaXplcik7XG4gICAgICAgICAgICB3aGlsZSAodG9rZW4gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0b2tlbnNbdG9rZW5zLmxlbmd0aF0gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IHRva2VuaXplci5nZXRNdXN0YWNoZSgpIHx8IGdldFVucXVvdGVkQXR0cmlidXRlVmFsdWVUb2tlbih0b2tlbml6ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG9rZW5zO1xuICAgICAgICB9O1xuICAgICAgICBnZXRRdW90ZWRBdHRyaWJ1dGVWYWx1ZSA9IGZ1bmN0aW9uICh0b2tlbml6ZXIsIHF1b3RlTWFyaykge1xuICAgICAgICAgICAgdmFyIHN0YXJ0LCB0b2tlbnMsIHRva2VuO1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2gocXVvdGVNYXJrKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW5zID0gW107XG4gICAgICAgICAgICB0b2tlbiA9IHRva2VuaXplci5nZXRNdXN0YWNoZSgpIHx8IGdldFF1b3RlZFN0cmluZ1Rva2VuKHRva2VuaXplciwgcXVvdGVNYXJrKTtcbiAgICAgICAgICAgIHdoaWxlICh0b2tlbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRva2Vuc1t0b2tlbnMubGVuZ3RoXSA9IHRva2VuO1xuICAgICAgICAgICAgICAgIHRva2VuID0gdG9rZW5pemVyLmdldE11c3RhY2hlKCkgfHwgZ2V0UXVvdGVkU3RyaW5nVG9rZW4odG9rZW5pemVyLCBxdW90ZU1hcmspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2gocXVvdGVNYXJrKSkge1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0b2tlbnM7XG4gICAgICAgIH07XG4gICAgICAgIGdldFF1b3RlZFN0cmluZ1Rva2VuID0gZnVuY3Rpb24gKHRva2VuaXplciwgcXVvdGVNYXJrKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQsIGluZGV4LCByZW1haW5pbmc7XG4gICAgICAgICAgICBzdGFydCA9IHRva2VuaXplci5wb3M7XG4gICAgICAgICAgICByZW1haW5pbmcgPSB0b2tlbml6ZXIucmVtYWluaW5nKCk7XG4gICAgICAgICAgICBpbmRleCA9IGdldExvd2VzdEluZGV4KHJlbWFpbmluZywgW1xuICAgICAgICAgICAgICAgIHF1b3RlTWFyayxcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIuZGVsaW1pdGVyc1swXSxcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIuZGVsaW1pdGVyc1sxXVxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdRdW90ZWQgYXR0cmlidXRlIHZhbHVlIG11c3QgaGF2ZSBhIGNsb3NpbmcgcXVvdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2VuaXplci5wb3MgKz0gaW5kZXg7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVzLlRFWFQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHJlbWFpbmluZy5zdWJzdHIoMCwgaW5kZXgpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ2V0VGFnO1xuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9Ub2tlbml6ZXJfdXRpbHNfbWFrZVJlZ2V4TWF0Y2hlciwgcGFyc2VfVG9rZW5pemVyX3V0aWxzX2dldExvd2VzdEluZGV4KTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0VGV4dF9fZ2V0VGV4dCA9IGZ1bmN0aW9uICh0eXBlcywgZ2V0TG93ZXN0SW5kZXgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXgsIHJlbWFpbmluZywgYmFycmllcjtcbiAgICAgICAgICAgIHJlbWFpbmluZyA9IHRoaXMucmVtYWluaW5nKCk7XG4gICAgICAgICAgICBiYXJyaWVyID0gdGhpcy5pbnNpZGUgPyAnPC8nICsgdGhpcy5pbnNpZGUgOiAnPCc7XG4gICAgICAgICAgICBpbmRleCA9IGdldExvd2VzdEluZGV4KHJlbWFpbmluZywgW1xuICAgICAgICAgICAgICAgIGJhcnJpZXIsXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxpbWl0ZXJzWzBdLFxuICAgICAgICAgICAgICAgIHRoaXMudHJpcGxlRGVsaW1pdGVyc1swXVxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBpZiAoIWluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSByZW1haW5pbmcubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wb3MgKz0gaW5kZXg7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVzLlRFWFQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHJlbWFpbmluZy5zdWJzdHIoMCwgaW5kZXgpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9Ub2tlbml6ZXJfdXRpbHNfZ2V0TG93ZXN0SW5kZXgpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9nZXRCb29sZWFuTGl0ZXJhbCA9IGZ1bmN0aW9uICh0eXBlcykge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciByZW1haW5pbmcgPSB0b2tlbml6ZXIucmVtYWluaW5nKCk7XG4gICAgICAgICAgICBpZiAocmVtYWluaW5nLnN1YnN0cigwLCA0KSA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyArPSA0O1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHQ6IHR5cGVzLkJPT0xFQU5fTElURVJBTCxcbiAgICAgICAgICAgICAgICAgICAgdjogJ3RydWUnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZW1haW5pbmcuc3Vic3RyKDAsIDUpID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyArPSA1O1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHQ6IHR5cGVzLkJPT0xFQU5fTElURVJBTCxcbiAgICAgICAgICAgICAgICAgICAgdjogJ2ZhbHNlJ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcyk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldE9iamVjdExpdGVyYWxfZ2V0S2V5VmFsdWVQYWlyID0gZnVuY3Rpb24gKHR5cGVzLCBnZXRLZXkpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQsIGtleSwgdmFsdWU7XG4gICAgICAgICAgICBzdGFydCA9IHRva2VuaXplci5wb3M7XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBrZXkgPSBnZXRLZXkodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnOicpKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgdmFsdWUgPSB0b2tlbml6ZXIuZ2V0RXhwcmVzc2lvbigpO1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0OiB0eXBlcy5LRVlfVkFMVUVfUEFJUixcbiAgICAgICAgICAgICAgICBrOiBrZXksXG4gICAgICAgICAgICAgICAgdjogdmFsdWVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfShjb25maWdfdHlwZXMsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX3NoYXJlZF9nZXRLZXkpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9nZXRPYmplY3RMaXRlcmFsX2dldEtleVZhbHVlUGFpcnMgPSBmdW5jdGlvbiAoZ2V0S2V5VmFsdWVQYWlyKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gZ2V0S2V5VmFsdWVQYWlycyh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCwgcGFpcnMsIHBhaXIsIGtleVZhbHVlUGFpcnM7XG4gICAgICAgICAgICBzdGFydCA9IHRva2VuaXplci5wb3M7XG4gICAgICAgICAgICBwYWlyID0gZ2V0S2V5VmFsdWVQYWlyKHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAocGFpciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFpcnMgPSBbcGFpcl07XG4gICAgICAgICAgICBpZiAodG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCcsJykpIHtcbiAgICAgICAgICAgICAgICBrZXlWYWx1ZVBhaXJzID0gZ2V0S2V5VmFsdWVQYWlycyh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgICAgIGlmICgha2V5VmFsdWVQYWlycykge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcGFpcnMuY29uY2F0KGtleVZhbHVlUGFpcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhaXJzO1xuICAgICAgICB9O1xuICAgIH0ocGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldE9iamVjdExpdGVyYWxfZ2V0S2V5VmFsdWVQYWlyKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRQcmltYXJ5X2dldExpdGVyYWxfZ2V0T2JqZWN0TGl0ZXJhbF9fZ2V0T2JqZWN0TGl0ZXJhbCA9IGZ1bmN0aW9uICh0eXBlcywgZ2V0S2V5VmFsdWVQYWlycykge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCwga2V5VmFsdWVQYWlycztcbiAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCd7JykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXlWYWx1ZVBhaXJzID0gZ2V0S2V5VmFsdWVQYWlycyh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJ30nKSkge1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdDogdHlwZXMuT0JKRUNUX0xJVEVSQUwsXG4gICAgICAgICAgICAgICAgbToga2V5VmFsdWVQYWlyc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcywgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldE9iamVjdExpdGVyYWxfZ2V0S2V5VmFsdWVQYWlycyk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fc2hhcmVkX2dldEV4cHJlc3Npb25MaXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGdldEV4cHJlc3Npb25MaXN0KHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIHN0YXJ0LCBleHByZXNzaW9ucywgZXhwciwgbmV4dDtcbiAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGV4cHIgPSB0b2tlbml6ZXIuZ2V0RXhwcmVzc2lvbigpO1xuICAgICAgICAgICAgaWYgKGV4cHIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cHJlc3Npb25zID0gW2V4cHJdO1xuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgaWYgKHRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnLCcpKSB7XG4gICAgICAgICAgICAgICAgbmV4dCA9IGdldEV4cHJlc3Npb25MaXN0KHRva2VuaXplcik7XG4gICAgICAgICAgICAgICAgaWYgKG5leHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbnMgPSBleHByZXNzaW9ucy5jb25jYXQobmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZXhwcmVzc2lvbnM7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9nZXRBcnJheUxpdGVyYWwgPSBmdW5jdGlvbiAodHlwZXMsIGdldEV4cHJlc3Npb25MaXN0KSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIHN0YXJ0LCBleHByZXNzaW9uTGlzdDtcbiAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCdbJykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHByZXNzaW9uTGlzdCA9IGdldEV4cHJlc3Npb25MaXN0KHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnXScpKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0OiB0eXBlcy5BUlJBWV9MSVRFUkFMLFxuICAgICAgICAgICAgICAgIG06IGV4cHJlc3Npb25MaXN0XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9zaGFyZWRfZ2V0RXhwcmVzc2lvbkxpc3QpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9fZ2V0TGl0ZXJhbCA9IGZ1bmN0aW9uIChnZXROdW1iZXJMaXRlcmFsLCBnZXRCb29sZWFuTGl0ZXJhbCwgZ2V0U3RyaW5nTGl0ZXJhbCwgZ2V0T2JqZWN0TGl0ZXJhbCwgZ2V0QXJyYXlMaXRlcmFsKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIGxpdGVyYWwgPSBnZXROdW1iZXJMaXRlcmFsKHRva2VuaXplcikgfHwgZ2V0Qm9vbGVhbkxpdGVyYWwodG9rZW5pemVyKSB8fCBnZXRTdHJpbmdMaXRlcmFsKHRva2VuaXplcikgfHwgZ2V0T2JqZWN0TGl0ZXJhbCh0b2tlbml6ZXIpIHx8IGdldEFycmF5TGl0ZXJhbCh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgcmV0dXJuIGxpdGVyYWw7XG4gICAgICAgIH07XG4gICAgfShwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRQcmltYXJ5X2dldExpdGVyYWxfZ2V0TnVtYmVyTGl0ZXJhbCwgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldEJvb2xlYW5MaXRlcmFsLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRQcmltYXJ5X2dldExpdGVyYWxfZ2V0U3RyaW5nTGl0ZXJhbF9fZ2V0U3RyaW5nTGl0ZXJhbCwgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldE9iamVjdExpdGVyYWxfX2dldE9iamVjdExpdGVyYWwsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9nZXRBcnJheUxpdGVyYWwpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0UmVmZXJlbmNlID0gZnVuY3Rpb24gKHR5cGVzLCBtYWtlUmVnZXhNYXRjaGVyLCBnZXROYW1lKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZ2V0RG90UmVmaW5lbWVudCwgZ2V0QXJyYXlSZWZpbmVtZW50LCBnZXRBcnJheU1lbWJlciwgZ2xvYmFscztcbiAgICAgICAgZ2V0RG90UmVmaW5lbWVudCA9IG1ha2VSZWdleE1hdGNoZXIoL15cXC5bYS16QS1aXyQwLTldKy8pO1xuICAgICAgICBnZXRBcnJheVJlZmluZW1lbnQgPSBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgbnVtID0gZ2V0QXJyYXlNZW1iZXIodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmIChudW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJy4nICsgbnVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIGdldEFycmF5TWVtYmVyID0gbWFrZVJlZ2V4TWF0Y2hlcigvXlxcWygwfFsxLTldWzAtOV0qKVxcXS8pO1xuICAgICAgICBnbG9iYWxzID0gL14oPzpBcnJheXxEYXRlfFJlZ0V4cHxkZWNvZGVVUklDb21wb25lbnR8ZGVjb2RlVVJJfGVuY29kZVVSSUNvbXBvbmVudHxlbmNvZGVVUkl8aXNGaW5pdGV8aXNOYU58cGFyc2VGbG9hdHxwYXJzZUludHxKU09OfE1hdGh8TmFOfHVuZGVmaW5lZHxudWxsKSQvO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIHN0YXJ0UG9zLCBhbmNlc3RvciwgbmFtZSwgZG90LCBjb21ibywgcmVmaW5lbWVudCwgbGFzdERvdEluZGV4O1xuICAgICAgICAgICAgc3RhcnRQb3MgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgYW5jZXN0b3IgPSAnJztcbiAgICAgICAgICAgIHdoaWxlICh0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJy4uLycpKSB7XG4gICAgICAgICAgICAgICAgYW5jZXN0b3IgKz0gJy4uLyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWFuY2VzdG9yKSB7XG4gICAgICAgICAgICAgICAgZG90ID0gdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCcuJykgfHwgJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuYW1lID0gZ2V0TmFtZSh0b2tlbml6ZXIpIHx8ICcnO1xuICAgICAgICAgICAgaWYgKCFhbmNlc3RvciAmJiAhZG90ICYmIGdsb2JhbHMudGVzdChuYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHQ6IHR5cGVzLkdMT0JBTCxcbiAgICAgICAgICAgICAgICAgICAgdjogbmFtZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gJ3RoaXMnICYmICFhbmNlc3RvciAmJiAhZG90KSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9ICcuJztcbiAgICAgICAgICAgICAgICBzdGFydFBvcyArPSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tYm8gPSAoYW5jZXN0b3IgfHwgZG90KSArIG5hbWU7XG4gICAgICAgICAgICBpZiAoIWNvbWJvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAocmVmaW5lbWVudCA9IGdldERvdFJlZmluZW1lbnQodG9rZW5pemVyKSB8fCBnZXRBcnJheVJlZmluZW1lbnQodG9rZW5pemVyKSkge1xuICAgICAgICAgICAgICAgIGNvbWJvICs9IHJlZmluZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCcoJykpIHtcbiAgICAgICAgICAgICAgICBsYXN0RG90SW5kZXggPSBjb21iby5sYXN0SW5kZXhPZignLicpO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0RG90SW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbWJvID0gY29tYm8uc3Vic3RyKDAsIGxhc3REb3RJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydFBvcyArIGNvbWJvLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zIC09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0OiB0eXBlcy5SRUZFUkVOQ0UsXG4gICAgICAgICAgICAgICAgbjogY29tYm9cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfShjb25maWdfdHlwZXMsIHBhcnNlX1Rva2VuaXplcl91dGlsc19tYWtlUmVnZXhNYXRjaGVyLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9zaGFyZWRfZ2V0TmFtZSk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRCcmFja2V0ZWRFeHByZXNzaW9uID0gZnVuY3Rpb24gKHR5cGVzKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIHN0YXJ0LCBleHByO1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJygnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgZXhwciA9IHRva2VuaXplci5nZXRFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICBpZiAoIWV4cHIpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnKScpKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0OiB0eXBlcy5CUkFDS0VURUQsXG4gICAgICAgICAgICAgICAgeDogZXhwclxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcyk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9fZ2V0UHJpbWFyeSA9IGZ1bmN0aW9uIChnZXRMaXRlcmFsLCBnZXRSZWZlcmVuY2UsIGdldEJyYWNrZXRlZEV4cHJlc3Npb24pIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TGl0ZXJhbCh0b2tlbml6ZXIpIHx8IGdldFJlZmVyZW5jZSh0b2tlbml6ZXIpIHx8IGdldEJyYWNrZXRlZEV4cHJlc3Npb24odG9rZW5pemVyKTtcbiAgICAgICAgfTtcbiAgICB9KHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9fZ2V0TGl0ZXJhbCwgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRSZWZlcmVuY2UsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0QnJhY2tldGVkRXhwcmVzc2lvbik7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fc2hhcmVkX2dldFJlZmluZW1lbnQgPSBmdW5jdGlvbiAodHlwZXMsIGdldE5hbWUpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBnZXRSZWZpbmVtZW50KHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIHN0YXJ0LCBuYW1lLCBleHByO1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgaWYgKHRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnLicpKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgICAgIGlmIChuYW1lID0gZ2V0TmFtZSh0b2tlbml6ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0OiB0eXBlcy5SRUZJTkVNRU5ULFxuICAgICAgICAgICAgICAgICAgICAgICAgbjogbmFtZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIuZXhwZWN0ZWQoJ2EgcHJvcGVydHkgbmFtZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnWycpKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgICAgIGV4cHIgPSB0b2tlbml6ZXIuZ2V0RXhwcmVzc2lvbigpO1xuICAgICAgICAgICAgICAgIGlmICghZXhwcikge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIuZXhwZWN0ZWQoJ2FuIGV4cHJlc3Npb24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCddJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5pemVyLmV4cGVjdGVkKCdcIl1cIicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0OiB0eXBlcy5SRUZJTkVNRU5ULFxuICAgICAgICAgICAgICAgICAgICB4OiBleHByXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9zaGFyZWRfZ2V0TmFtZSk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0TWVtYmVyT3JJbnZvY2F0aW9uID0gZnVuY3Rpb24gKHR5cGVzLCBnZXRQcmltYXJ5LCBnZXRFeHByZXNzaW9uTGlzdCwgZ2V0UmVmaW5lbWVudCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50LCBleHByZXNzaW9uLCByZWZpbmVtZW50LCBleHByZXNzaW9uTGlzdDtcbiAgICAgICAgICAgIGV4cHJlc3Npb24gPSBnZXRQcmltYXJ5KHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAoIWV4cHJlc3Npb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChleHByZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHRva2VuaXplci5wb3M7XG4gICAgICAgICAgICAgICAgaWYgKHJlZmluZW1lbnQgPSBnZXRSZWZpbmVtZW50KHRva2VuaXplcikpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQ6IHR5cGVzLk1FTUJFUixcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGV4cHJlc3Npb24sXG4gICAgICAgICAgICAgICAgICAgICAgICByOiByZWZpbmVtZW50XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJygnKSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb25MaXN0ID0gZ2V0RXhwcmVzc2lvbkxpc3QodG9rZW5pemVyKTtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnKScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0OiB0eXBlcy5JTlZPQ0FUSU9OLFxuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXhwcmVzc2lvblxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwcmVzc2lvbkxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb24ubyA9IGV4cHJlc3Npb25MaXN0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGV4cHJlc3Npb247XG4gICAgICAgIH07XG4gICAgfShjb25maWdfdHlwZXMsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfX2dldFByaW1hcnksIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX3NoYXJlZF9nZXRFeHByZXNzaW9uTGlzdCwgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fc2hhcmVkX2dldFJlZmluZW1lbnQpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFR5cGVPZiA9IGZ1bmN0aW9uICh0eXBlcywgZ2V0TWVtYmVyT3JJbnZvY2F0aW9uKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZ2V0VHlwZU9mLCBtYWtlUHJlZml4U2VxdWVuY2VNYXRjaGVyO1xuICAgICAgICBtYWtlUHJlZml4U2VxdWVuY2VNYXRjaGVyID0gZnVuY3Rpb24gKHN5bWJvbCwgZmFsbHRocm91Z2gpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0LCBleHByZXNzaW9uO1xuICAgICAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKHN5bWJvbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbGx0aHJvdWdoKHRva2VuaXplcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IHRva2VuaXplci5nZXRFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFleHByZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuaXplci5leHBlY3RlZCgnYW4gZXhwcmVzc2lvbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzOiBzeW1ib2wsXG4gICAgICAgICAgICAgICAgICAgIG86IGV4cHJlc3Npb24sXG4gICAgICAgICAgICAgICAgICAgIHQ6IHR5cGVzLlBSRUZJWF9PUEVSQVRPUlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGksIGxlbiwgbWF0Y2hlciwgcHJlZml4T3BlcmF0b3JzLCBmYWxsdGhyb3VnaDtcbiAgICAgICAgICAgIHByZWZpeE9wZXJhdG9ycyA9ICchIH4gKyAtIHR5cGVvZicuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgIGZhbGx0aHJvdWdoID0gZ2V0TWVtYmVyT3JJbnZvY2F0aW9uO1xuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcHJlZml4T3BlcmF0b3JzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hlciA9IG1ha2VQcmVmaXhTZXF1ZW5jZU1hdGNoZXIocHJlZml4T3BlcmF0b3JzW2ldLCBmYWxsdGhyb3VnaCk7XG4gICAgICAgICAgICAgICAgZmFsbHRocm91Z2ggPSBtYXRjaGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2V0VHlwZU9mID0gZmFsbHRocm91Z2g7XG4gICAgICAgIH0oKSk7XG4gICAgICAgIHJldHVybiBnZXRUeXBlT2Y7XG4gICAgfShjb25maWdfdHlwZXMsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldE1lbWJlck9ySW52b2NhdGlvbik7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0TG9naWNhbE9yID0gZnVuY3Rpb24gKHR5cGVzLCBnZXRUeXBlT2YpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBnZXRMb2dpY2FsT3IsIG1ha2VJbmZpeFNlcXVlbmNlTWF0Y2hlcjtcbiAgICAgICAgbWFrZUluZml4U2VxdWVuY2VNYXRjaGVyID0gZnVuY3Rpb24gKHN5bWJvbCwgZmFsbHRocm91Z2gpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0LCBsZWZ0LCByaWdodDtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gZmFsbHRocm91Z2godG9rZW5pemVyKTtcbiAgICAgICAgICAgICAgICBpZiAoIWxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goc3ltYm9sKSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3ltYm9sID09PSAnaW4nICYmIC9bYS16QS1aXyQwLTldLy50ZXN0KHRva2VuaXplci5yZW1haW5pbmcoKS5jaGFyQXQoMCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxlZnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgICAgICByaWdodCA9IHRva2VuaXplci5nZXRFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFyaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0OiB0eXBlcy5JTkZJWF9PUEVSQVRPUixcbiAgICAgICAgICAgICAgICAgICAgczogc3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICBvOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGksIGxlbiwgbWF0Y2hlciwgaW5maXhPcGVyYXRvcnMsIGZhbGx0aHJvdWdoO1xuICAgICAgICAgICAgaW5maXhPcGVyYXRvcnMgPSAnKiAvICUgKyAtIDw8ID4+ID4+PiA8IDw9ID4gPj0gaW4gaW5zdGFuY2VvZiA9PSAhPSA9PT0gIT09ICYgXiB8ICYmIHx8Jy5zcGxpdCgnICcpO1xuICAgICAgICAgICAgZmFsbHRocm91Z2ggPSBnZXRUeXBlT2Y7XG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBpbmZpeE9wZXJhdG9ycy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIG1hdGNoZXIgPSBtYWtlSW5maXhTZXF1ZW5jZU1hdGNoZXIoaW5maXhPcGVyYXRvcnNbaV0sIGZhbGx0aHJvdWdoKTtcbiAgICAgICAgICAgICAgICBmYWxsdGhyb3VnaCA9IG1hdGNoZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZXRMb2dpY2FsT3IgPSBmYWxsdGhyb3VnaDtcbiAgICAgICAgfSgpKTtcbiAgICAgICAgcmV0dXJuIGdldExvZ2ljYWxPcjtcbiAgICB9KGNvbmZpZ190eXBlcywgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0VHlwZU9mKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRDb25kaXRpb25hbCA9IGZ1bmN0aW9uICh0eXBlcywgZ2V0TG9naWNhbE9yKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIHN0YXJ0LCBleHByZXNzaW9uLCBpZlRydWUsIGlmRmFsc2U7XG4gICAgICAgICAgICBleHByZXNzaW9uID0gZ2V0TG9naWNhbE9yKHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAoIWV4cHJlc3Npb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCc/JykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4cHJlc3Npb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBpZlRydWUgPSB0b2tlbml6ZXIuZ2V0RXhwcmVzc2lvbigpO1xuICAgICAgICAgICAgaWYgKCFpZlRydWUpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4cHJlc3Npb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnOicpKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBleHByZXNzaW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgaWZGYWxzZSA9IHRva2VuaXplci5nZXRFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICBpZiAoIWlmRmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4cHJlc3Npb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHQ6IHR5cGVzLkNPTkRJVElPTkFMLFxuICAgICAgICAgICAgICAgIG86IFtcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbixcbiAgICAgICAgICAgICAgICAgICAgaWZUcnVlLFxuICAgICAgICAgICAgICAgICAgICBpZkZhbHNlXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcywgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0TG9naWNhbE9yKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9fZ2V0RXhwcmVzc2lvbiA9IGZ1bmN0aW9uIChnZXRDb25kaXRpb25hbCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRDb25kaXRpb25hbCh0aGlzKTtcbiAgICAgICAgfTtcbiAgICB9KHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldENvbmRpdGlvbmFsKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfX1Rva2VuaXplciA9IGZ1bmN0aW9uIChnZXRNdXN0YWNoZSwgZ2V0Q29tbWVudCwgZ2V0VGFnLCBnZXRUZXh0LCBnZXRFeHByZXNzaW9uLCBhbGxvd1doaXRlc3BhY2UsIGdldFN0cmluZ01hdGNoKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgVG9rZW5pemVyO1xuICAgICAgICBUb2tlbml6ZXIgPSBmdW5jdGlvbiAoc3RyLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW47XG4gICAgICAgICAgICB0aGlzLnN0ciA9IHN0cjtcbiAgICAgICAgICAgIHRoaXMucG9zID0gMDtcbiAgICAgICAgICAgIHRoaXMuZGVsaW1pdGVycyA9IG9wdGlvbnMuZGVsaW1pdGVycztcbiAgICAgICAgICAgIHRoaXMudHJpcGxlRGVsaW1pdGVycyA9IG9wdGlvbnMudHJpcGxlRGVsaW1pdGVycztcbiAgICAgICAgICAgIHRoaXMudG9rZW5zID0gW107XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5wb3MgPCB0aGlzLnN0ci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKTtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4gPT09IG51bGwgJiYgdGhpcy5yZW1haW5pbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhaWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFRva2VuaXplci5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBnZXRUb2tlbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IHRoaXMuZ2V0TXVzdGFjaGUoKSB8fCB0aGlzLmdldENvbW1lbnQoKSB8fCB0aGlzLmdldFRhZygpIHx8IHRoaXMuZ2V0VGV4dCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRNdXN0YWNoZTogZ2V0TXVzdGFjaGUsXG4gICAgICAgICAgICBnZXRDb21tZW50OiBnZXRDb21tZW50LFxuICAgICAgICAgICAgZ2V0VGFnOiBnZXRUYWcsXG4gICAgICAgICAgICBnZXRUZXh0OiBnZXRUZXh0LFxuICAgICAgICAgICAgZ2V0RXhwcmVzc2lvbjogZ2V0RXhwcmVzc2lvbixcbiAgICAgICAgICAgIGFsbG93V2hpdGVzcGFjZTogYWxsb3dXaGl0ZXNwYWNlLFxuICAgICAgICAgICAgZ2V0U3RyaW5nTWF0Y2g6IGdldFN0cmluZ01hdGNoLFxuICAgICAgICAgICAgcmVtYWluaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyLnN1YnN0cmluZyh0aGlzLnBvcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBsYXN0MjAsIG5leHQyMDtcbiAgICAgICAgICAgICAgICBsYXN0MjAgPSB0aGlzLnN0ci5zdWJzdHIoMCwgdGhpcy5wb3MpLnN1YnN0cigtMjApO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0MjAubGVuZ3RoID09PSAyMCkge1xuICAgICAgICAgICAgICAgICAgICBsYXN0MjAgPSAnLi4uJyArIGxhc3QyMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV4dDIwID0gdGhpcy5yZW1haW5pbmcoKS5zdWJzdHIoMCwgMjApO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0MjAubGVuZ3RoID09PSAyMCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0MjAgPSBuZXh0MjAgKyAnLi4uJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgcGFyc2UgdGVtcGxhdGU6ICcgKyAobGFzdDIwID8gbGFzdDIwICsgJzwtICcgOiAnJykgKyAnZmFpbGVkIGF0IGNoYXJhY3RlciAnICsgdGhpcy5wb3MgKyAnIC0+JyArIG5leHQyMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXhwZWN0ZWQ6IGZ1bmN0aW9uICh0aGluZykge1xuICAgICAgICAgICAgICAgIHZhciByZW1haW5pbmcgPSB0aGlzLnJlbWFpbmluZygpLnN1YnN0cigwLCA0MCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlbWFpbmluZy5sZW5ndGggPT09IDQwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZyArPSAnLi4uJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUb2tlbml6ZXIgZmFpbGVkOiB1bmV4cGVjdGVkIHN0cmluZyBcIicgKyByZW1haW5pbmcgKyAnXCIgKGV4cGVjdGVkICcgKyB0aGluZyArICcpJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBUb2tlbml6ZXI7XG4gICAgfShwYXJzZV9Ub2tlbml6ZXJfZ2V0TXVzdGFjaGVfX2dldE11c3RhY2hlLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0Q29tbWVudF9nZXRDb21tZW50LCBwYXJzZV9Ub2tlbml6ZXJfZ2V0VGFnX19nZXRUYWcsIHBhcnNlX1Rva2VuaXplcl9nZXRUZXh0X19nZXRUZXh0LCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9fZ2V0RXhwcmVzc2lvbiwgcGFyc2VfVG9rZW5pemVyX3V0aWxzX2FsbG93V2hpdGVzcGFjZSwgcGFyc2VfVG9rZW5pemVyX3V0aWxzX2dldFN0cmluZ01hdGNoKTtcbnZhciBwYXJzZV90b2tlbml6ZSA9IGZ1bmN0aW9uIChzdHJpcEh0bWxDb21tZW50cywgc3RyaXBTdGFuZGFsb25lcywgc3RyaXBDb21tZW50VG9rZW5zLCBUb2tlbml6ZXIsIGNpcmN1bGFyKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgdG9rZW5pemUsIFJhY3RpdmU7XG4gICAgICAgIGNpcmN1bGFyLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUmFjdGl2ZSA9IGNpcmN1bGFyLlJhY3RpdmU7XG4gICAgICAgIH0pO1xuICAgICAgICB0b2tlbml6ZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIHRva2VuaXplciwgdG9rZW5zO1xuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zdHJpcENvbW1lbnRzICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gc3RyaXBIdG1sQ29tbWVudHModGVtcGxhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW5pemVyID0gbmV3IFRva2VuaXplcih0ZW1wbGF0ZSwge1xuICAgICAgICAgICAgICAgIGRlbGltaXRlcnM6IG9wdGlvbnMuZGVsaW1pdGVycyB8fCAoUmFjdGl2ZSA/IFJhY3RpdmUuZGVsaW1pdGVycyA6IFtcbiAgICAgICAgICAgICAgICAgICAgJ3t7JyxcbiAgICAgICAgICAgICAgICAgICAgJ319J1xuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIHRyaXBsZURlbGltaXRlcnM6IG9wdGlvbnMudHJpcGxlRGVsaW1pdGVycyB8fCAoUmFjdGl2ZSA/IFJhY3RpdmUudHJpcGxlRGVsaW1pdGVycyA6IFtcbiAgICAgICAgICAgICAgICAgICAgJ3t7eycsXG4gICAgICAgICAgICAgICAgICAgICd9fX0nXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdG9rZW5zID0gdG9rZW5pemVyLnRva2VucztcbiAgICAgICAgICAgIHN0cmlwU3RhbmRhbG9uZXModG9rZW5zKTtcbiAgICAgICAgICAgIHN0cmlwQ29tbWVudFRva2Vucyh0b2tlbnMpO1xuICAgICAgICAgICAgcmV0dXJuIHRva2VucztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRva2VuaXplO1xuICAgIH0ocGFyc2VfdXRpbHNfc3RyaXBIdG1sQ29tbWVudHMsIHBhcnNlX3V0aWxzX3N0cmlwU3RhbmRhbG9uZXMsIHBhcnNlX3V0aWxzX3N0cmlwQ29tbWVudFRva2VucywgcGFyc2VfVG9rZW5pemVyX19Ub2tlbml6ZXIsIGNpcmN1bGFyKTtcbnZhciBwYXJzZV9QYXJzZXJfZ2V0VGV4dF9UZXh0U3R1Yl9fVGV4dFN0dWIgPSBmdW5jdGlvbiAodHlwZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBUZXh0U3R1YiwgaHRtbEVudGl0aWVzLCBjb250cm9sQ2hhcmFjdGVycywgbmFtZWRFbnRpdHlQYXR0ZXJuLCBoZXhFbnRpdHlQYXR0ZXJuLCBkZWNpbWFsRW50aXR5UGF0dGVybiwgdmFsaWRhdGVDb2RlLCBkZWNvZGVDaGFyYWN0ZXJSZWZlcmVuY2VzLCB3aGl0ZXNwYWNlO1xuICAgICAgICBUZXh0U3R1YiA9IGZ1bmN0aW9uICh0b2tlbiwgcHJlc2VydmVXaGl0ZXNwYWNlKSB7XG4gICAgICAgICAgICB0aGlzLnRleHQgPSBwcmVzZXJ2ZVdoaXRlc3BhY2UgPyB0b2tlbi52YWx1ZSA6IHRva2VuLnZhbHVlLnJlcGxhY2Uod2hpdGVzcGFjZSwgJyAnKTtcbiAgICAgICAgfTtcbiAgICAgICAgVGV4dFN0dWIucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdHlwZTogdHlwZXMuVEVYVCxcbiAgICAgICAgICAgIHRvSlNPTjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZWQgfHwgKHRoaXMuZGVjb2RlZCA9IGRlY29kZUNoYXJhY3RlclJlZmVyZW5jZXModGhpcy50ZXh0KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBodG1sRW50aXRpZXMgPSB7XG4gICAgICAgICAgICBxdW90OiAzNCxcbiAgICAgICAgICAgIGFtcDogMzgsXG4gICAgICAgICAgICBhcG9zOiAzOSxcbiAgICAgICAgICAgIGx0OiA2MCxcbiAgICAgICAgICAgIGd0OiA2MixcbiAgICAgICAgICAgIG5ic3A6IDE2MCxcbiAgICAgICAgICAgIGlleGNsOiAxNjEsXG4gICAgICAgICAgICBjZW50OiAxNjIsXG4gICAgICAgICAgICBwb3VuZDogMTYzLFxuICAgICAgICAgICAgY3VycmVuOiAxNjQsXG4gICAgICAgICAgICB5ZW46IDE2NSxcbiAgICAgICAgICAgIGJydmJhcjogMTY2LFxuICAgICAgICAgICAgc2VjdDogMTY3LFxuICAgICAgICAgICAgdW1sOiAxNjgsXG4gICAgICAgICAgICBjb3B5OiAxNjksXG4gICAgICAgICAgICBvcmRmOiAxNzAsXG4gICAgICAgICAgICBsYXF1bzogMTcxLFxuICAgICAgICAgICAgbm90OiAxNzIsXG4gICAgICAgICAgICBzaHk6IDE3MyxcbiAgICAgICAgICAgIHJlZzogMTc0LFxuICAgICAgICAgICAgbWFjcjogMTc1LFxuICAgICAgICAgICAgZGVnOiAxNzYsXG4gICAgICAgICAgICBwbHVzbW46IDE3NyxcbiAgICAgICAgICAgIHN1cDI6IDE3OCxcbiAgICAgICAgICAgIHN1cDM6IDE3OSxcbiAgICAgICAgICAgIGFjdXRlOiAxODAsXG4gICAgICAgICAgICBtaWNybzogMTgxLFxuICAgICAgICAgICAgcGFyYTogMTgyLFxuICAgICAgICAgICAgbWlkZG90OiAxODMsXG4gICAgICAgICAgICBjZWRpbDogMTg0LFxuICAgICAgICAgICAgc3VwMTogMTg1LFxuICAgICAgICAgICAgb3JkbTogMTg2LFxuICAgICAgICAgICAgcmFxdW86IDE4NyxcbiAgICAgICAgICAgIGZyYWMxNDogMTg4LFxuICAgICAgICAgICAgZnJhYzEyOiAxODksXG4gICAgICAgICAgICBmcmFjMzQ6IDE5MCxcbiAgICAgICAgICAgIGlxdWVzdDogMTkxLFxuICAgICAgICAgICAgQWdyYXZlOiAxOTIsXG4gICAgICAgICAgICBBYWN1dGU6IDE5MyxcbiAgICAgICAgICAgIEFjaXJjOiAxOTQsXG4gICAgICAgICAgICBBdGlsZGU6IDE5NSxcbiAgICAgICAgICAgIEF1bWw6IDE5NixcbiAgICAgICAgICAgIEFyaW5nOiAxOTcsXG4gICAgICAgICAgICBBRWxpZzogMTk4LFxuICAgICAgICAgICAgQ2NlZGlsOiAxOTksXG4gICAgICAgICAgICBFZ3JhdmU6IDIwMCxcbiAgICAgICAgICAgIEVhY3V0ZTogMjAxLFxuICAgICAgICAgICAgRWNpcmM6IDIwMixcbiAgICAgICAgICAgIEV1bWw6IDIwMyxcbiAgICAgICAgICAgIElncmF2ZTogMjA0LFxuICAgICAgICAgICAgSWFjdXRlOiAyMDUsXG4gICAgICAgICAgICBJY2lyYzogMjA2LFxuICAgICAgICAgICAgSXVtbDogMjA3LFxuICAgICAgICAgICAgRVRIOiAyMDgsXG4gICAgICAgICAgICBOdGlsZGU6IDIwOSxcbiAgICAgICAgICAgIE9ncmF2ZTogMjEwLFxuICAgICAgICAgICAgT2FjdXRlOiAyMTEsXG4gICAgICAgICAgICBPY2lyYzogMjEyLFxuICAgICAgICAgICAgT3RpbGRlOiAyMTMsXG4gICAgICAgICAgICBPdW1sOiAyMTQsXG4gICAgICAgICAgICB0aW1lczogMjE1LFxuICAgICAgICAgICAgT3NsYXNoOiAyMTYsXG4gICAgICAgICAgICBVZ3JhdmU6IDIxNyxcbiAgICAgICAgICAgIFVhY3V0ZTogMjE4LFxuICAgICAgICAgICAgVWNpcmM6IDIxOSxcbiAgICAgICAgICAgIFV1bWw6IDIyMCxcbiAgICAgICAgICAgIFlhY3V0ZTogMjIxLFxuICAgICAgICAgICAgVEhPUk46IDIyMixcbiAgICAgICAgICAgIHN6bGlnOiAyMjMsXG4gICAgICAgICAgICBhZ3JhdmU6IDIyNCxcbiAgICAgICAgICAgIGFhY3V0ZTogMjI1LFxuICAgICAgICAgICAgYWNpcmM6IDIyNixcbiAgICAgICAgICAgIGF0aWxkZTogMjI3LFxuICAgICAgICAgICAgYXVtbDogMjI4LFxuICAgICAgICAgICAgYXJpbmc6IDIyOSxcbiAgICAgICAgICAgIGFlbGlnOiAyMzAsXG4gICAgICAgICAgICBjY2VkaWw6IDIzMSxcbiAgICAgICAgICAgIGVncmF2ZTogMjMyLFxuICAgICAgICAgICAgZWFjdXRlOiAyMzMsXG4gICAgICAgICAgICBlY2lyYzogMjM0LFxuICAgICAgICAgICAgZXVtbDogMjM1LFxuICAgICAgICAgICAgaWdyYXZlOiAyMzYsXG4gICAgICAgICAgICBpYWN1dGU6IDIzNyxcbiAgICAgICAgICAgIGljaXJjOiAyMzgsXG4gICAgICAgICAgICBpdW1sOiAyMzksXG4gICAgICAgICAgICBldGg6IDI0MCxcbiAgICAgICAgICAgIG50aWxkZTogMjQxLFxuICAgICAgICAgICAgb2dyYXZlOiAyNDIsXG4gICAgICAgICAgICBvYWN1dGU6IDI0MyxcbiAgICAgICAgICAgIG9jaXJjOiAyNDQsXG4gICAgICAgICAgICBvdGlsZGU6IDI0NSxcbiAgICAgICAgICAgIG91bWw6IDI0NixcbiAgICAgICAgICAgIGRpdmlkZTogMjQ3LFxuICAgICAgICAgICAgb3NsYXNoOiAyNDgsXG4gICAgICAgICAgICB1Z3JhdmU6IDI0OSxcbiAgICAgICAgICAgIHVhY3V0ZTogMjUwLFxuICAgICAgICAgICAgdWNpcmM6IDI1MSxcbiAgICAgICAgICAgIHV1bWw6IDI1MixcbiAgICAgICAgICAgIHlhY3V0ZTogMjUzLFxuICAgICAgICAgICAgdGhvcm46IDI1NCxcbiAgICAgICAgICAgIHl1bWw6IDI1NSxcbiAgICAgICAgICAgIE9FbGlnOiAzMzgsXG4gICAgICAgICAgICBvZWxpZzogMzM5LFxuICAgICAgICAgICAgU2Nhcm9uOiAzNTIsXG4gICAgICAgICAgICBzY2Fyb246IDM1MyxcbiAgICAgICAgICAgIFl1bWw6IDM3NixcbiAgICAgICAgICAgIGZub2Y6IDQwMixcbiAgICAgICAgICAgIGNpcmM6IDcxMCxcbiAgICAgICAgICAgIHRpbGRlOiA3MzIsXG4gICAgICAgICAgICBBbHBoYTogOTEzLFxuICAgICAgICAgICAgQmV0YTogOTE0LFxuICAgICAgICAgICAgR2FtbWE6IDkxNSxcbiAgICAgICAgICAgIERlbHRhOiA5MTYsXG4gICAgICAgICAgICBFcHNpbG9uOiA5MTcsXG4gICAgICAgICAgICBaZXRhOiA5MTgsXG4gICAgICAgICAgICBFdGE6IDkxOSxcbiAgICAgICAgICAgIFRoZXRhOiA5MjAsXG4gICAgICAgICAgICBJb3RhOiA5MjEsXG4gICAgICAgICAgICBLYXBwYTogOTIyLFxuICAgICAgICAgICAgTGFtYmRhOiA5MjMsXG4gICAgICAgICAgICBNdTogOTI0LFxuICAgICAgICAgICAgTnU6IDkyNSxcbiAgICAgICAgICAgIFhpOiA5MjYsXG4gICAgICAgICAgICBPbWljcm9uOiA5MjcsXG4gICAgICAgICAgICBQaTogOTI4LFxuICAgICAgICAgICAgUmhvOiA5MjksXG4gICAgICAgICAgICBTaWdtYTogOTMxLFxuICAgICAgICAgICAgVGF1OiA5MzIsXG4gICAgICAgICAgICBVcHNpbG9uOiA5MzMsXG4gICAgICAgICAgICBQaGk6IDkzNCxcbiAgICAgICAgICAgIENoaTogOTM1LFxuICAgICAgICAgICAgUHNpOiA5MzYsXG4gICAgICAgICAgICBPbWVnYTogOTM3LFxuICAgICAgICAgICAgYWxwaGE6IDk0NSxcbiAgICAgICAgICAgIGJldGE6IDk0NixcbiAgICAgICAgICAgIGdhbW1hOiA5NDcsXG4gICAgICAgICAgICBkZWx0YTogOTQ4LFxuICAgICAgICAgICAgZXBzaWxvbjogOTQ5LFxuICAgICAgICAgICAgemV0YTogOTUwLFxuICAgICAgICAgICAgZXRhOiA5NTEsXG4gICAgICAgICAgICB0aGV0YTogOTUyLFxuICAgICAgICAgICAgaW90YTogOTUzLFxuICAgICAgICAgICAga2FwcGE6IDk1NCxcbiAgICAgICAgICAgIGxhbWJkYTogOTU1LFxuICAgICAgICAgICAgbXU6IDk1NixcbiAgICAgICAgICAgIG51OiA5NTcsXG4gICAgICAgICAgICB4aTogOTU4LFxuICAgICAgICAgICAgb21pY3JvbjogOTU5LFxuICAgICAgICAgICAgcGk6IDk2MCxcbiAgICAgICAgICAgIHJobzogOTYxLFxuICAgICAgICAgICAgc2lnbWFmOiA5NjIsXG4gICAgICAgICAgICBzaWdtYTogOTYzLFxuICAgICAgICAgICAgdGF1OiA5NjQsXG4gICAgICAgICAgICB1cHNpbG9uOiA5NjUsXG4gICAgICAgICAgICBwaGk6IDk2NixcbiAgICAgICAgICAgIGNoaTogOTY3LFxuICAgICAgICAgICAgcHNpOiA5NjgsXG4gICAgICAgICAgICBvbWVnYTogOTY5LFxuICAgICAgICAgICAgdGhldGFzeW06IDk3NyxcbiAgICAgICAgICAgIHVwc2loOiA5NzgsXG4gICAgICAgICAgICBwaXY6IDk4MixcbiAgICAgICAgICAgIGVuc3A6IDgxOTQsXG4gICAgICAgICAgICBlbXNwOiA4MTk1LFxuICAgICAgICAgICAgdGhpbnNwOiA4MjAxLFxuICAgICAgICAgICAgenduajogODIwNCxcbiAgICAgICAgICAgIHp3ajogODIwNSxcbiAgICAgICAgICAgIGxybTogODIwNixcbiAgICAgICAgICAgIHJsbTogODIwNyxcbiAgICAgICAgICAgIG5kYXNoOiA4MjExLFxuICAgICAgICAgICAgbWRhc2g6IDgyMTIsXG4gICAgICAgICAgICBsc3F1bzogODIxNixcbiAgICAgICAgICAgIHJzcXVvOiA4MjE3LFxuICAgICAgICAgICAgc2JxdW86IDgyMTgsXG4gICAgICAgICAgICBsZHF1bzogODIyMCxcbiAgICAgICAgICAgIHJkcXVvOiA4MjIxLFxuICAgICAgICAgICAgYmRxdW86IDgyMjIsXG4gICAgICAgICAgICBkYWdnZXI6IDgyMjQsXG4gICAgICAgICAgICBEYWdnZXI6IDgyMjUsXG4gICAgICAgICAgICBidWxsOiA4MjI2LFxuICAgICAgICAgICAgaGVsbGlwOiA4MjMwLFxuICAgICAgICAgICAgcGVybWlsOiA4MjQwLFxuICAgICAgICAgICAgcHJpbWU6IDgyNDIsXG4gICAgICAgICAgICBQcmltZTogODI0MyxcbiAgICAgICAgICAgIGxzYXF1bzogODI0OSxcbiAgICAgICAgICAgIHJzYXF1bzogODI1MCxcbiAgICAgICAgICAgIG9saW5lOiA4MjU0LFxuICAgICAgICAgICAgZnJhc2w6IDgyNjAsXG4gICAgICAgICAgICBldXJvOiA4MzY0LFxuICAgICAgICAgICAgaW1hZ2U6IDg0NjUsXG4gICAgICAgICAgICB3ZWllcnA6IDg0NzIsXG4gICAgICAgICAgICByZWFsOiA4NDc2LFxuICAgICAgICAgICAgdHJhZGU6IDg0ODIsXG4gICAgICAgICAgICBhbGVmc3ltOiA4NTAxLFxuICAgICAgICAgICAgbGFycjogODU5MixcbiAgICAgICAgICAgIHVhcnI6IDg1OTMsXG4gICAgICAgICAgICByYXJyOiA4NTk0LFxuICAgICAgICAgICAgZGFycjogODU5NSxcbiAgICAgICAgICAgIGhhcnI6IDg1OTYsXG4gICAgICAgICAgICBjcmFycjogODYyOSxcbiAgICAgICAgICAgIGxBcnI6IDg2NTYsXG4gICAgICAgICAgICB1QXJyOiA4NjU3LFxuICAgICAgICAgICAgckFycjogODY1OCxcbiAgICAgICAgICAgIGRBcnI6IDg2NTksXG4gICAgICAgICAgICBoQXJyOiA4NjYwLFxuICAgICAgICAgICAgZm9yYWxsOiA4NzA0LFxuICAgICAgICAgICAgcGFydDogODcwNixcbiAgICAgICAgICAgIGV4aXN0OiA4NzA3LFxuICAgICAgICAgICAgZW1wdHk6IDg3MDksXG4gICAgICAgICAgICBuYWJsYTogODcxMSxcbiAgICAgICAgICAgIGlzaW46IDg3MTIsXG4gICAgICAgICAgICBub3RpbjogODcxMyxcbiAgICAgICAgICAgIG5pOiA4NzE1LFxuICAgICAgICAgICAgcHJvZDogODcxOSxcbiAgICAgICAgICAgIHN1bTogODcyMSxcbiAgICAgICAgICAgIG1pbnVzOiA4NzIyLFxuICAgICAgICAgICAgbG93YXN0OiA4NzI3LFxuICAgICAgICAgICAgcmFkaWM6IDg3MzAsXG4gICAgICAgICAgICBwcm9wOiA4NzMzLFxuICAgICAgICAgICAgaW5maW46IDg3MzQsXG4gICAgICAgICAgICBhbmc6IDg3MzYsXG4gICAgICAgICAgICBhbmQ6IDg3NDMsXG4gICAgICAgICAgICBvcjogODc0NCxcbiAgICAgICAgICAgIGNhcDogODc0NSxcbiAgICAgICAgICAgIGN1cDogODc0NixcbiAgICAgICAgICAgICdpbnQnOiA4NzQ3LFxuICAgICAgICAgICAgdGhlcmU0OiA4NzU2LFxuICAgICAgICAgICAgc2ltOiA4NzY0LFxuICAgICAgICAgICAgY29uZzogODc3MyxcbiAgICAgICAgICAgIGFzeW1wOiA4Nzc2LFxuICAgICAgICAgICAgbmU6IDg4MDAsXG4gICAgICAgICAgICBlcXVpdjogODgwMSxcbiAgICAgICAgICAgIGxlOiA4ODA0LFxuICAgICAgICAgICAgZ2U6IDg4MDUsXG4gICAgICAgICAgICBzdWI6IDg4MzQsXG4gICAgICAgICAgICBzdXA6IDg4MzUsXG4gICAgICAgICAgICBuc3ViOiA4ODM2LFxuICAgICAgICAgICAgc3ViZTogODgzOCxcbiAgICAgICAgICAgIHN1cGU6IDg4MzksXG4gICAgICAgICAgICBvcGx1czogODg1MyxcbiAgICAgICAgICAgIG90aW1lczogODg1NSxcbiAgICAgICAgICAgIHBlcnA6IDg4NjksXG4gICAgICAgICAgICBzZG90OiA4OTAxLFxuICAgICAgICAgICAgbGNlaWw6IDg5NjgsXG4gICAgICAgICAgICByY2VpbDogODk2OSxcbiAgICAgICAgICAgIGxmbG9vcjogODk3MCxcbiAgICAgICAgICAgIHJmbG9vcjogODk3MSxcbiAgICAgICAgICAgIGxhbmc6IDkwMDEsXG4gICAgICAgICAgICByYW5nOiA5MDAyLFxuICAgICAgICAgICAgbG96OiA5Njc0LFxuICAgICAgICAgICAgc3BhZGVzOiA5ODI0LFxuICAgICAgICAgICAgY2x1YnM6IDk4MjcsXG4gICAgICAgICAgICBoZWFydHM6IDk4MjksXG4gICAgICAgICAgICBkaWFtczogOTgzMFxuICAgICAgICB9O1xuICAgICAgICBjb250cm9sQ2hhcmFjdGVycyA9IFtcbiAgICAgICAgICAgIDgzNjQsXG4gICAgICAgICAgICAxMjksXG4gICAgICAgICAgICA4MjE4LFxuICAgICAgICAgICAgNDAyLFxuICAgICAgICAgICAgODIyMixcbiAgICAgICAgICAgIDgyMzAsXG4gICAgICAgICAgICA4MjI0LFxuICAgICAgICAgICAgODIyNSxcbiAgICAgICAgICAgIDcxMCxcbiAgICAgICAgICAgIDgyNDAsXG4gICAgICAgICAgICAzNTIsXG4gICAgICAgICAgICA4MjQ5LFxuICAgICAgICAgICAgMzM4LFxuICAgICAgICAgICAgMTQxLFxuICAgICAgICAgICAgMzgxLFxuICAgICAgICAgICAgMTQzLFxuICAgICAgICAgICAgMTQ0LFxuICAgICAgICAgICAgODIxNixcbiAgICAgICAgICAgIDgyMTcsXG4gICAgICAgICAgICA4MjIwLFxuICAgICAgICAgICAgODIyMSxcbiAgICAgICAgICAgIDgyMjYsXG4gICAgICAgICAgICA4MjExLFxuICAgICAgICAgICAgODIxMixcbiAgICAgICAgICAgIDczMixcbiAgICAgICAgICAgIDg0ODIsXG4gICAgICAgICAgICAzNTMsXG4gICAgICAgICAgICA4MjUwLFxuICAgICAgICAgICAgMzM5LFxuICAgICAgICAgICAgMTU3LFxuICAgICAgICAgICAgMzgyLFxuICAgICAgICAgICAgMzc2XG4gICAgICAgIF07XG4gICAgICAgIG5hbWVkRW50aXR5UGF0dGVybiA9IG5ldyBSZWdFeHAoJyYoJyArIE9iamVjdC5rZXlzKGh0bWxFbnRpdGllcykuam9pbignfCcpICsgJyk7PycsICdnJyk7XG4gICAgICAgIGhleEVudGl0eVBhdHRlcm4gPSAvJiN4KFswLTldKyk7Py9nO1xuICAgICAgICBkZWNpbWFsRW50aXR5UGF0dGVybiA9IC8mIyhbMC05XSspOz8vZztcbiAgICAgICAgdmFsaWRhdGVDb2RlID0gZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiA2NTUzMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb2RlID09PSAxMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAzMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb2RlIDwgMTI4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29kZSA8PSAxNTkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbENoYXJhY3RlcnNbY29kZSAtIDEyOF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29kZSA8IDU1Mjk2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29kZSA8PSA1NzM0Mykge1xuICAgICAgICAgICAgICAgIHJldHVybiA2NTUzMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb2RlIDw9IDY1NTM1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gNjU1MzM7XG4gICAgICAgIH07XG4gICAgICAgIGRlY29kZUNoYXJhY3RlclJlZmVyZW5jZXMgPSBmdW5jdGlvbiAoaHRtbCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIHJlc3VsdCA9IGh0bWwucmVwbGFjZShuYW1lZEVudGl0eVBhdHRlcm4sIGZ1bmN0aW9uIChtYXRjaCwgbmFtZSkge1xuICAgICAgICAgICAgICAgIGlmIChodG1sRW50aXRpZXNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoaHRtbEVudGl0aWVzW25hbWVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShoZXhFbnRpdHlQYXR0ZXJuLCBmdW5jdGlvbiAobWF0Y2gsIGhleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHZhbGlkYXRlQ29kZShwYXJzZUludChoZXgsIDE2KSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShkZWNpbWFsRW50aXR5UGF0dGVybiwgZnVuY3Rpb24gKG1hdGNoLCBjaGFyQ29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHZhbGlkYXRlQ29kZShjaGFyQ29kZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICB3aGl0ZXNwYWNlID0gL1xccysvZztcbiAgICAgICAgcmV0dXJuIFRleHRTdHViO1xuICAgIH0oY29uZmlnX3R5cGVzKTtcbnZhciBwYXJzZV9QYXJzZXJfZ2V0VGV4dF9fZ2V0VGV4dCA9IGZ1bmN0aW9uICh0eXBlcywgVGV4dFN0dWIpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIGlmICh0b2tlbi50eXBlID09PSB0eXBlcy5URVhUKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFRleHRTdHViKHRva2VuLCB0aGlzLnByZXNlcnZlV2hpdGVzcGFjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcywgcGFyc2VfUGFyc2VyX2dldFRleHRfVGV4dFN0dWJfX1RleHRTdHViKTtcbnZhciBwYXJzZV9QYXJzZXJfZ2V0Q29tbWVudF9Db21tZW50U3R1Yl9fQ29tbWVudFN0dWIgPSBmdW5jdGlvbiAodHlwZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBDb21tZW50U3R1YjtcbiAgICAgICAgQ29tbWVudFN0dWIgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHRva2VuLmNvbnRlbnQ7XG4gICAgICAgIH07XG4gICAgICAgIENvbW1lbnRTdHViLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHRvSlNPTjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHQ6IHR5cGVzLkNPTU1FTlQsXG4gICAgICAgICAgICAgICAgICAgIGY6IHRoaXMuY29udGVudFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJzwhLS0nICsgdGhpcy5jb250ZW50ICsgJy0tPic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBDb21tZW50U3R1YjtcbiAgICB9KGNvbmZpZ190eXBlcyk7XG52YXIgcGFyc2VfUGFyc2VyX2dldENvbW1lbnRfX2dldENvbW1lbnQgPSBmdW5jdGlvbiAodHlwZXMsIENvbW1lbnRTdHViKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gdHlwZXMuQ09NTUVOVCkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb21tZW50U3R1Yih0b2tlbiwgdGhpcy5wcmVzZXJ2ZVdoaXRlc3BhY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgfShjb25maWdfdHlwZXMsIHBhcnNlX1BhcnNlcl9nZXRDb21tZW50X0NvbW1lbnRTdHViX19Db21tZW50U3R1Yik7XG52YXIgcGFyc2VfUGFyc2VyX2dldE11c3RhY2hlX0V4cHJlc3Npb25TdHViX19FeHByZXNzaW9uU3R1YiA9IGZ1bmN0aW9uICh0eXBlcywgaXNPYmplY3QpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBFeHByZXNzaW9uU3R1YiwgZ2V0UmVmcywgc3RyaW5naWZ5O1xuICAgICAgICBFeHByZXNzaW9uU3R1YiA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgdGhpcy5yZWZzID0gW107XG4gICAgICAgICAgICBnZXRSZWZzKHRva2VuLCB0aGlzLnJlZnMpO1xuICAgICAgICAgICAgdGhpcy5zdHIgPSBzdHJpbmdpZnkodG9rZW4sIHRoaXMucmVmcyk7XG4gICAgICAgIH07XG4gICAgICAgIEV4cHJlc3Npb25TdHViLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHRvSlNPTjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuanNvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5qc29uID0ge1xuICAgICAgICAgICAgICAgICAgICByOiB0aGlzLnJlZnMsXG4gICAgICAgICAgICAgICAgICAgIHM6IHRoaXMuc3RyXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5qc29uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBnZXRSZWZzID0gZnVuY3Rpb24gKHRva2VuLCByZWZzKSB7XG4gICAgICAgICAgICB2YXIgaSwgbGlzdDtcbiAgICAgICAgICAgIGlmICh0b2tlbi50ID09PSB0eXBlcy5SRUZFUkVOQ0UpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVmcy5pbmRleE9mKHRva2VuLm4pID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZWZzLnVuc2hpZnQodG9rZW4ubik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGlzdCA9IHRva2VuLm8gfHwgdG9rZW4ubTtcbiAgICAgICAgICAgIGlmIChsaXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgICAgICAgICAgICAgICAgIGdldFJlZnMobGlzdCwgcmVmcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IGxpc3QubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRSZWZzKGxpc3RbaV0sIHJlZnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRva2VuLngpIHtcbiAgICAgICAgICAgICAgICBnZXRSZWZzKHRva2VuLngsIHJlZnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRva2VuLnIpIHtcbiAgICAgICAgICAgICAgICBnZXRSZWZzKHRva2VuLnIsIHJlZnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRva2VuLnYpIHtcbiAgICAgICAgICAgICAgICBnZXRSZWZzKHRva2VuLnYsIHJlZnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzdHJpbmdpZnkgPSBmdW5jdGlvbiAodG9rZW4sIHJlZnMpIHtcbiAgICAgICAgICAgIHZhciBtYXAgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmdpZnkoaXRlbSwgcmVmcyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3dpdGNoICh0b2tlbi50KSB7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkJPT0xFQU5fTElURVJBTDpcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuR0xPQkFMOlxuICAgICAgICAgICAgY2FzZSB0eXBlcy5OVU1CRVJfTElURVJBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4udjtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuU1RSSU5HX0xJVEVSQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdcXCcnICsgdG9rZW4udi5yZXBsYWNlKC8nL2csICdcXFxcXFwnJykgKyAnXFwnJztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuQVJSQVlfTElURVJBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1snICsgKHRva2VuLm0gPyB0b2tlbi5tLm1hcChtYXApLmpvaW4oJywnKSA6ICcnKSArICddJztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT0JKRUNUX0xJVEVSQUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuICd7JyArICh0b2tlbi5tID8gdG9rZW4ubS5tYXAobWFwKS5qb2luKCcsJykgOiAnJykgKyAnfSc7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLktFWV9WQUxVRV9QQUlSOlxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbi5rICsgJzonICsgc3RyaW5naWZ5KHRva2VuLnYsIHJlZnMpO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5QUkVGSVhfT1BFUkFUT1I6XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0b2tlbi5zID09PSAndHlwZW9mJyA/ICd0eXBlb2YgJyA6IHRva2VuLnMpICsgc3RyaW5naWZ5KHRva2VuLm8sIHJlZnMpO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5JTkZJWF9PUEVSQVRPUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5naWZ5KHRva2VuLm9bMF0sIHJlZnMpICsgKHRva2VuLnMuc3Vic3RyKDAsIDIpID09PSAnaW4nID8gJyAnICsgdG9rZW4ucyArICcgJyA6IHRva2VuLnMpICsgc3RyaW5naWZ5KHRva2VuLm9bMV0sIHJlZnMpO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5JTlZPQ0FUSU9OOlxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmdpZnkodG9rZW4ueCwgcmVmcykgKyAnKCcgKyAodG9rZW4ubyA/IHRva2VuLm8ubWFwKG1hcCkuam9pbignLCcpIDogJycpICsgJyknO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5CUkFDS0VURUQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICcoJyArIHN0cmluZ2lmeSh0b2tlbi54LCByZWZzKSArICcpJztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuTUVNQkVSOlxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmdpZnkodG9rZW4ueCwgcmVmcykgKyBzdHJpbmdpZnkodG9rZW4uciwgcmVmcyk7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLlJFRklORU1FTlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuLm4gPyAnLicgKyB0b2tlbi5uIDogJ1snICsgc3RyaW5naWZ5KHRva2VuLngsIHJlZnMpICsgJ10nO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5DT05ESVRJT05BTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5naWZ5KHRva2VuLm9bMF0sIHJlZnMpICsgJz8nICsgc3RyaW5naWZ5KHRva2VuLm9bMV0sIHJlZnMpICsgJzonICsgc3RyaW5naWZ5KHRva2VuLm9bMl0sIHJlZnMpO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5SRUZFUkVOQ0U6XG4gICAgICAgICAgICAgICAgcmV0dXJuICckeycgKyByZWZzLmluZGV4T2YodG9rZW4ubikgKyAnfSc7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHN0cmluZ2lmeSBleHByZXNzaW9uIHRva2VuLiBUaGlzIGVycm9yIGlzIHVuZXhwZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEV4cHJlc3Npb25TdHViO1xuICAgIH0oY29uZmlnX3R5cGVzLCB1dGlsc19pc09iamVjdCk7XG52YXIgcGFyc2VfUGFyc2VyX2dldE11c3RhY2hlX011c3RhY2hlU3R1Yl9fTXVzdGFjaGVTdHViID0gZnVuY3Rpb24gKHR5cGVzLCBFeHByZXNzaW9uU3R1Yikge1xuICAgICAgICBcbiAgICAgICAgdmFyIE11c3RhY2hlU3R1YiA9IGZ1bmN0aW9uICh0b2tlbiwgcGFyc2VyKSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0b2tlbi50eXBlID09PSB0eXBlcy5UUklQTEUgPyB0eXBlcy5UUklQTEUgOiB0b2tlbi5tdXN0YWNoZVR5cGU7XG4gICAgICAgICAgICBpZiAodG9rZW4ucmVmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWYgPSB0b2tlbi5yZWY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW4uZXhwcmVzc2lvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwciA9IG5ldyBFeHByZXNzaW9uU3R1Yih0b2tlbi5leHByZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcnNlci5wb3MgKz0gMTtcbiAgICAgICAgfTtcbiAgICAgICAgTXVzdGFjaGVTdHViLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHRvSlNPTjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBqc29uO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuanNvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAganNvbiA9IHsgdDogdGhpcy50eXBlIH07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIGpzb24uciA9IHRoaXMucmVmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leHByKSB7XG4gICAgICAgICAgICAgICAgICAgIGpzb24ueCA9IHRoaXMuZXhwci50b0pTT04oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5qc29uID0ganNvbjtcbiAgICAgICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIE11c3RhY2hlU3R1YjtcbiAgICB9KGNvbmZpZ190eXBlcywgcGFyc2VfUGFyc2VyX2dldE11c3RhY2hlX0V4cHJlc3Npb25TdHViX19FeHByZXNzaW9uU3R1Yik7XG52YXIgcGFyc2VfUGFyc2VyX3V0aWxzX3N0cmluZ2lmeVN0dWJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICAgICAgdmFyIHN0ciA9ICcnLCBpdGVtU3RyLCBpLCBsZW47XG4gICAgICAgICAgICBpZiAoIWl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gaXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpdGVtU3RyID0gaXRlbXNbaV0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbVN0ciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHIgKz0gaXRlbVN0cjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHBhcnNlX1BhcnNlcl91dGlsc19qc29uaWZ5U3R1YnMgPSBmdW5jdGlvbiAoc3RyaW5naWZ5U3R1YnMpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoaXRlbXMsIG5vU3RyaW5naWZ5KSB7XG4gICAgICAgICAgICB2YXIgc3RyLCBqc29uO1xuICAgICAgICAgICAgaWYgKCFub1N0cmluZ2lmeSkge1xuICAgICAgICAgICAgICAgIHN0ciA9IHN0cmluZ2lmeVN0dWJzKGl0ZW1zKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RyICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGpzb24gPSBpdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS50b0pTT04obm9TdHJpbmdpZnkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfTtcbiAgICB9KHBhcnNlX1BhcnNlcl91dGlsc19zdHJpbmdpZnlTdHVicyk7XG52YXIgcGFyc2VfUGFyc2VyX2dldE11c3RhY2hlX1NlY3Rpb25TdHViX19TZWN0aW9uU3R1YiA9IGZ1bmN0aW9uICh0eXBlcywganNvbmlmeVN0dWJzLCBFeHByZXNzaW9uU3R1Yikge1xuICAgICAgICBcbiAgICAgICAgdmFyIFNlY3Rpb25TdHViID0gZnVuY3Rpb24gKGZpcnN0VG9rZW4sIHBhcnNlcikge1xuICAgICAgICAgICAgdmFyIG5leHQ7XG4gICAgICAgICAgICB0aGlzLnJlZiA9IGZpcnN0VG9rZW4ucmVmO1xuICAgICAgICAgICAgdGhpcy5pbmRleFJlZiA9IGZpcnN0VG9rZW4uaW5kZXhSZWY7XG4gICAgICAgICAgICB0aGlzLmludmVydGVkID0gZmlyc3RUb2tlbi5tdXN0YWNoZVR5cGUgPT09IHR5cGVzLklOVkVSVEVEO1xuICAgICAgICAgICAgaWYgKGZpcnN0VG9rZW4uZXhwcmVzc2lvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwciA9IG5ldyBFeHByZXNzaW9uU3R1YihmaXJzdFRva2VuLmV4cHJlc3Npb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyc2VyLnBvcyArPSAxO1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgbmV4dCA9IHBhcnNlci5uZXh0KCk7XG4gICAgICAgICAgICB3aGlsZSAobmV4dCkge1xuICAgICAgICAgICAgICAgIGlmIChuZXh0Lm11c3RhY2hlVHlwZSA9PT0gdHlwZXMuQ0xPU0lORykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dC5yZWYudHJpbSgpID09PSB0aGlzLnJlZiB8fCB0aGlzLmV4cHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5wb3MgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgcGFyc2UgdGVtcGxhdGU6IElsbGVnYWwgY2xvc2luZyBzZWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc1t0aGlzLml0ZW1zLmxlbmd0aF0gPSBwYXJzZXIuZ2V0U3R1YigpO1xuICAgICAgICAgICAgICAgIG5leHQgPSBwYXJzZXIubmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBTZWN0aW9uU3R1Yi5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICB0b0pTT046IGZ1bmN0aW9uIChub1N0cmluZ2lmeSkge1xuICAgICAgICAgICAgICAgIHZhciBqc29uO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuanNvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAganNvbiA9IHsgdDogdHlwZXMuU0VDVElPTiB9O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlZikge1xuICAgICAgICAgICAgICAgICAgICBqc29uLnIgPSB0aGlzLnJlZjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXhSZWYpIHtcbiAgICAgICAgICAgICAgICAgICAganNvbi5pID0gdGhpcy5pbmRleFJlZjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW52ZXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAganNvbi5uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhwcikge1xuICAgICAgICAgICAgICAgICAgICBqc29uLnggPSB0aGlzLmV4cHIudG9KU09OKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBqc29uLmYgPSBqc29uaWZ5U3R1YnModGhpcy5pdGVtcywgbm9TdHJpbmdpZnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmpzb24gPSBqc29uO1xuICAgICAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gU2VjdGlvblN0dWI7XG4gICAgfShjb25maWdfdHlwZXMsIHBhcnNlX1BhcnNlcl91dGlsc19qc29uaWZ5U3R1YnMsIHBhcnNlX1BhcnNlcl9nZXRNdXN0YWNoZV9FeHByZXNzaW9uU3R1Yl9fRXhwcmVzc2lvblN0dWIpO1xudmFyIHBhcnNlX1BhcnNlcl9nZXRNdXN0YWNoZV9fZ2V0TXVzdGFjaGUgPSBmdW5jdGlvbiAodHlwZXMsIE11c3RhY2hlU3R1YiwgU2VjdGlvblN0dWIpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIGlmICh0b2tlbi50eXBlID09PSB0eXBlcy5NVVNUQUNIRSB8fCB0b2tlbi50eXBlID09PSB0eXBlcy5UUklQTEUpIHtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4ubXVzdGFjaGVUeXBlID09PSB0eXBlcy5TRUNUSU9OIHx8IHRva2VuLm11c3RhY2hlVHlwZSA9PT0gdHlwZXMuSU5WRVJURUQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTZWN0aW9uU3R1Yih0b2tlbiwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTXVzdGFjaGVTdHViKHRva2VuLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcywgcGFyc2VfUGFyc2VyX2dldE11c3RhY2hlX011c3RhY2hlU3R1Yl9fTXVzdGFjaGVTdHViLCBwYXJzZV9QYXJzZXJfZ2V0TXVzdGFjaGVfU2VjdGlvblN0dWJfX1NlY3Rpb25TdHViKTtcbnZhciBwYXJzZV9QYXJzZXJfZ2V0RWxlbWVudF9FbGVtZW50U3R1Yl91dGlsc19zaWJsaW5nc0J5VGFnTmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsaTogWydsaSddLFxuICAgICAgICAgICAgZHQ6IFtcbiAgICAgICAgICAgICAgICAnZHQnLFxuICAgICAgICAgICAgICAgICdkZCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkZDogW1xuICAgICAgICAgICAgICAgICdkdCcsXG4gICAgICAgICAgICAgICAgJ2RkJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHA6ICdhZGRyZXNzIGFydGljbGUgYXNpZGUgYmxvY2txdW90ZSBkaXIgZGl2IGRsIGZpZWxkc2V0IGZvb3RlciBmb3JtIGgxIGgyIGgzIGg0IGg1IGg2IGhlYWRlciBoZ3JvdXAgaHIgbWVudSBuYXYgb2wgcCBwcmUgc2VjdGlvbiB0YWJsZSB1bCcuc3BsaXQoJyAnKSxcbiAgICAgICAgICAgIHJ0OiBbXG4gICAgICAgICAgICAgICAgJ3J0JyxcbiAgICAgICAgICAgICAgICAncnAnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcnA6IFtcbiAgICAgICAgICAgICAgICAncnAnLFxuICAgICAgICAgICAgICAgICdydCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBvcHRncm91cDogWydvcHRncm91cCddLFxuICAgICAgICAgICAgb3B0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ29wdGlvbicsXG4gICAgICAgICAgICAgICAgJ29wdGdyb3VwJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHRoZWFkOiBbXG4gICAgICAgICAgICAgICAgJ3Rib2R5JyxcbiAgICAgICAgICAgICAgICAndGZvb3QnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgdGJvZHk6IFtcbiAgICAgICAgICAgICAgICAndGJvZHknLFxuICAgICAgICAgICAgICAgICd0Zm9vdCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB0cjogWyd0ciddLFxuICAgICAgICAgICAgdGQ6IFtcbiAgICAgICAgICAgICAgICAndGQnLFxuICAgICAgICAgICAgICAgICd0aCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB0aDogW1xuICAgICAgICAgICAgICAgICd0ZCcsXG4gICAgICAgICAgICAgICAgJ3RoJ1xuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciBwYXJzZV9QYXJzZXJfZ2V0RWxlbWVudF9FbGVtZW50U3R1Yl91dGlsc19maWx0ZXJBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKGlzQXJyYXkpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICAgIHZhciBhdHRycywgcHJveGllcywgZmlsdGVyZWQsIGksIGxlbiwgaXRlbTtcbiAgICAgICAgICAgIGZpbHRlcmVkID0ge307XG4gICAgICAgICAgICBhdHRycyA9IFtdO1xuICAgICAgICAgICAgcHJveGllcyA9IFtdO1xuICAgICAgICAgICAgbGVuID0gaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5hbWUgPT09ICdpbnRybycpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkLmludHJvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuIGVsZW1lbnQgY2FuIG9ubHkgaGF2ZSBvbmUgaW50cm8gdHJhbnNpdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkLmludHJvID0gaXRlbTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ubmFtZSA9PT0gJ291dHJvJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWQub3V0cm8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQW4gZWxlbWVudCBjYW4gb25seSBoYXZlIG9uZSBvdXRybyB0cmFuc2l0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWQub3V0cm8gPSBpdGVtO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5uYW1lID09PSAnaW50cm8tb3V0cm8nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5pbnRybyB8fCBmaWx0ZXJlZC5vdXRybykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbiBlbGVtZW50IGNhbiBvbmx5IGhhdmUgb25lIGludHJvIGFuZCBvbmUgb3V0cm8gdHJhbnNpdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkLmludHJvID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWQub3V0cm8gPSBkZWVwQ2xvbmUoaXRlbSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLm5hbWUuc3Vic3RyKDAsIDYpID09PSAncHJveHktJykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLm5hbWUgPSBpdGVtLm5hbWUuc3Vic3RyaW5nKDYpO1xuICAgICAgICAgICAgICAgICAgICBwcm94aWVzW3Byb3hpZXMubGVuZ3RoXSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLm5hbWUuc3Vic3RyKDAsIDMpID09PSAnb24tJykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLm5hbWUgPSBpdGVtLm5hbWUuc3Vic3RyaW5nKDMpO1xuICAgICAgICAgICAgICAgICAgICBwcm94aWVzW3Byb3hpZXMubGVuZ3RoXSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLm5hbWUgPT09ICdkZWNvcmF0b3InKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkLmRlY29yYXRvciA9IGl0ZW07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnNbYXR0cnMubGVuZ3RoXSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsdGVyZWQuYXR0cnMgPSBhdHRycztcbiAgICAgICAgICAgIGZpbHRlcmVkLnByb3hpZXMgPSBwcm94aWVzO1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBkZWVwQ2xvbmUob2JqKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0LCBrZXk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmoubWFwKGRlZXBDbG9uZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgPSB7fTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IGRlZXBDbG9uZShvYmpba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH0odXRpbHNfaXNBcnJheSk7XG52YXIgcGFyc2VfUGFyc2VyX2dldEVsZW1lbnRfRWxlbWVudFN0dWJfdXRpbHNfcHJvY2Vzc0RpcmVjdGl2ZSA9IGZ1bmN0aW9uICh0eXBlcywgcGFyc2VKU09OKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGRpcmVjdGl2ZSkge1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NlZCwgdG9rZW5zLCB0b2tlbiwgY29sb25JbmRleCwgdGhyb3dFcnJvciwgZGlyZWN0aXZlTmFtZSwgZGlyZWN0aXZlQXJncywgcGFyc2VkO1xuICAgICAgICAgICAgdGhyb3dFcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgZGlyZWN0aXZlJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCFkaXJlY3RpdmUubmFtZSB8fCAhZGlyZWN0aXZlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3dFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvY2Vzc2VkID0geyBkaXJlY3RpdmVUeXBlOiBkaXJlY3RpdmUubmFtZSB9O1xuICAgICAgICAgICAgdG9rZW5zID0gZGlyZWN0aXZlLnZhbHVlO1xuICAgICAgICAgICAgZGlyZWN0aXZlTmFtZSA9IFtdO1xuICAgICAgICAgICAgZGlyZWN0aXZlQXJncyA9IFtdO1xuICAgICAgICAgICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IHRva2Vucy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbi50eXBlID09PSB0eXBlcy5URVhUKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9uSW5kZXggPSB0b2tlbi52YWx1ZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xvbkluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlTmFtZVtkaXJlY3RpdmVOYW1lLmxlbmd0aF0gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xvbkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlTmFtZVtkaXJlY3RpdmVOYW1lLmxlbmd0aF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVzLlRFWFQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0b2tlbi52YWx1ZS5zdWJzdHIoMCwgY29sb25JbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlLmxlbmd0aCA+IGNvbG9uSW5kZXggKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlQXJnc1swXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZXMuVEVYVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRva2VuLnZhbHVlLnN1YnN0cmluZyhjb2xvbkluZGV4ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVOYW1lW2RpcmVjdGl2ZU5hbWUubGVuZ3RoXSA9IHRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpcmVjdGl2ZUFyZ3MgPSBkaXJlY3RpdmVBcmdzLmNvbmNhdCh0b2tlbnMpO1xuICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZU5hbWUubGVuZ3RoID09PSAxICYmIGRpcmVjdGl2ZU5hbWVbMF0udHlwZSA9PT0gdHlwZXMuVEVYVCkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZC5uYW1lID0gZGlyZWN0aXZlTmFtZVswXS52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkLm5hbWUgPSBkaXJlY3RpdmVOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZUFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZUFyZ3MubGVuZ3RoID09PSAxICYmIGRpcmVjdGl2ZUFyZ3NbMF0udHlwZSA9PT0gdHlwZXMuVEVYVCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZWQgPSBwYXJzZUpTT04oJ1snICsgZGlyZWN0aXZlQXJnc1swXS52YWx1ZSArICddJyk7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZC5hcmdzID0gcGFyc2VkID8gcGFyc2VkLnZhbHVlIDogZGlyZWN0aXZlQXJnc1swXS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZWQuZHluYW1pY0FyZ3MgPSBkaXJlY3RpdmVBcmdzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzZWQ7XG4gICAgICAgIH07XG4gICAgfShjb25maWdfdHlwZXMsIHV0aWxzX3BhcnNlSlNPTik7XG52YXIgcGFyc2VfUGFyc2VyX1N0cmluZ1N0dWJfU3RyaW5nUGFyc2VyID0gZnVuY3Rpb24gKGdldFRleHQsIGdldE11c3RhY2hlKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgU3RyaW5nUGFyc2VyO1xuICAgICAgICBTdHJpbmdQYXJzZXIgPSBmdW5jdGlvbiAodG9rZW5zLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgc3R1YjtcbiAgICAgICAgICAgIHRoaXMudG9rZW5zID0gdG9rZW5zIHx8IFtdO1xuICAgICAgICAgICAgdGhpcy5wb3MgPSAwO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gW107XG4gICAgICAgICAgICB3aGlsZSAoc3R1YiA9IHRoaXMuZ2V0U3R1YigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQucHVzaChzdHViKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgU3RyaW5nUGFyc2VyLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIGdldFN0dWI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUZXh0KHRva2VuKSB8fCB0aGlzLmdldE11c3RhY2hlKHRva2VuKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRUZXh0OiBnZXRUZXh0LFxuICAgICAgICAgICAgZ2V0TXVzdGFjaGU6IGdldE11c3RhY2hlLFxuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLnBvc107XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTdHJpbmdQYXJzZXI7XG4gICAgfShwYXJzZV9QYXJzZXJfZ2V0VGV4dF9fZ2V0VGV4dCwgcGFyc2VfUGFyc2VyX2dldE11c3RhY2hlX19nZXRNdXN0YWNoZSk7XG52YXIgcGFyc2VfUGFyc2VyX1N0cmluZ1N0dWJfX1N0cmluZ1N0dWIgPSBmdW5jdGlvbiAoU3RyaW5nUGFyc2VyLCBzdHJpbmdpZnlTdHVicywganNvbmlmeVN0dWJzKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgU3RyaW5nU3R1YjtcbiAgICAgICAgU3RyaW5nU3R1YiA9IGZ1bmN0aW9uICh0b2tlbnMpIHtcbiAgICAgICAgICAgIHZhciBwYXJzZXIgPSBuZXcgU3RyaW5nUGFyc2VyKHRva2Vucyk7XG4gICAgICAgICAgICB0aGlzLnN0dWJzID0gcGFyc2VyLnJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgU3RyaW5nU3R1Yi5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICB0b0pTT046IGZ1bmN0aW9uIChub1N0cmluZ2lmeSkge1xuICAgICAgICAgICAgICAgIHZhciBqc29uO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzWydqc29uXycgKyBub1N0cmluZ2lmeV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbJ2pzb25fJyArIG5vU3RyaW5naWZ5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAganNvbiA9IHRoaXNbJ2pzb25fJyArIG5vU3RyaW5naWZ5XSA9IGpzb25pZnlTdHVicyh0aGlzLnN0dWJzLCBub1N0cmluZ2lmeSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdHIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc3RyID0gc3RyaW5naWZ5U3R1YnModGhpcy5zdHVicyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gU3RyaW5nU3R1YjtcbiAgICB9KHBhcnNlX1BhcnNlcl9TdHJpbmdTdHViX1N0cmluZ1BhcnNlciwgcGFyc2VfUGFyc2VyX3V0aWxzX3N0cmluZ2lmeVN0dWJzLCBwYXJzZV9QYXJzZXJfdXRpbHNfanNvbmlmeVN0dWJzKTtcbnZhciBwYXJzZV9QYXJzZXJfZ2V0RWxlbWVudF9FbGVtZW50U3R1Yl91dGlsc19qc29uaWZ5RGlyZWN0aXZlID0gZnVuY3Rpb24gKFN0cmluZ1N0dWIpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGlyZWN0aXZlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0LCBuYW1lO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkaXJlY3RpdmUubmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRpcmVjdGl2ZS5hcmdzICYmICFkaXJlY3RpdmUuZHluYW1pY0FyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZS5uYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuYW1lID0gZGlyZWN0aXZlLm5hbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuZXcgU3RyaW5nU3R1YihkaXJlY3RpdmUubmFtZSkudG9KU09OKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgPSB7IG46IG5hbWUgfTtcbiAgICAgICAgICAgIGlmIChkaXJlY3RpdmUuYXJncykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5hID0gZGlyZWN0aXZlLmFyZ3M7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkaXJlY3RpdmUuZHluYW1pY0FyZ3MpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZCA9IG5ldyBTdHJpbmdTdHViKGRpcmVjdGl2ZS5keW5hbWljQXJncykudG9KU09OKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgIH0ocGFyc2VfUGFyc2VyX1N0cmluZ1N0dWJfX1N0cmluZ1N0dWIpO1xudmFyIHBhcnNlX1BhcnNlcl9nZXRFbGVtZW50X0VsZW1lbnRTdHViX3RvSlNPTiA9IGZ1bmN0aW9uICh0eXBlcywganNvbmlmeVN0dWJzLCBqc29uaWZ5RGlyZWN0aXZlKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5vU3RyaW5naWZ5KSB7XG4gICAgICAgICAgICB2YXIganNvbiwgbmFtZSwgdmFsdWUsIHByb3h5LCBpLCBsZW4sIGF0dHJpYnV0ZTtcbiAgICAgICAgICAgIGlmICh0aGlzWydqc29uXycgKyBub1N0cmluZ2lmeV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1snanNvbl8nICsgbm9TdHJpbmdpZnldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgdDogdHlwZXMuQ09NUE9ORU5ULFxuICAgICAgICAgICAgICAgICAgICBlOiB0aGlzLmNvbXBvbmVudFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHQ6IHR5cGVzLkVMRU1FTlQsXG4gICAgICAgICAgICAgICAgICAgIGU6IHRoaXMudGFnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRvY3R5cGUpIHtcbiAgICAgICAgICAgICAgICBqc29uLnkgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlcyAmJiB0aGlzLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAganNvbi5hID0ge307XG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5hdHRyaWJ1dGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBuYW1lID0gYXR0cmlidXRlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChqc29uLmFbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbm5vdCBoYXZlIG11bHRpcGxlIGF0dHJpYnV0ZXMgd2l0aCB0aGUgc2FtZSBuYW1lJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBhdHRyaWJ1dGUudmFsdWUudG9KU09OKG5vU3RyaW5naWZ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBqc29uLmFbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGpzb24uZiA9IGpzb25pZnlTdHVicyh0aGlzLml0ZW1zLCBub1N0cmluZ2lmeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm94aWVzICYmIHRoaXMucHJveGllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBqc29uLnYgPSB7fTtcbiAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLnByb3hpZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBwcm94eSA9IHRoaXMucHJveGllc1tpXTtcbiAgICAgICAgICAgICAgICAgICAganNvbi52W3Byb3h5LmRpcmVjdGl2ZVR5cGVdID0ganNvbmlmeURpcmVjdGl2ZShwcm94eSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuaW50cm8pIHtcbiAgICAgICAgICAgICAgICBqc29uLnQxID0ganNvbmlmeURpcmVjdGl2ZSh0aGlzLmludHJvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm91dHJvKSB7XG4gICAgICAgICAgICAgICAganNvbi50MiA9IGpzb25pZnlEaXJlY3RpdmUodGhpcy5vdXRybyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5kZWNvcmF0b3IpIHtcbiAgICAgICAgICAgICAgICBqc29uLm8gPSBqc29uaWZ5RGlyZWN0aXZlKHRoaXMuZGVjb3JhdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXNbJ2pzb25fJyArIG5vU3RyaW5naWZ5XSA9IGpzb247XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcywgcGFyc2VfUGFyc2VyX3V0aWxzX2pzb25pZnlTdHVicywgcGFyc2VfUGFyc2VyX2dldEVsZW1lbnRfRWxlbWVudFN0dWJfdXRpbHNfanNvbmlmeURpcmVjdGl2ZSk7XG52YXIgcGFyc2VfUGFyc2VyX2dldEVsZW1lbnRfRWxlbWVudFN0dWJfdG9TdHJpbmcgPSBmdW5jdGlvbiAoc3RyaW5naWZ5U3R1YnMsIHZvaWRFbGVtZW50TmFtZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBodG1sRWxlbWVudHM7XG4gICAgICAgIGh0bWxFbGVtZW50cyA9ICdhIGFiYnIgYWNyb255bSBhZGRyZXNzIGFwcGxldCBhcmVhIGIgYmFzZSBiYXNlZm9udCBiZG8gYmlnIGJsb2NrcXVvdGUgYm9keSBiciBidXR0b24gY2FwdGlvbiBjZW50ZXIgY2l0ZSBjb2RlIGNvbCBjb2xncm91cCBkZCBkZWwgZGZuIGRpciBkaXYgZGwgZHQgZW0gZmllbGRzZXQgZm9udCBmb3JtIGZyYW1lIGZyYW1lc2V0IGgxIGgyIGgzIGg0IGg1IGg2IGhlYWQgaHIgaHRtbCBpIGlmcmFtZSBpbWcgaW5wdXQgaW5zIGlzaW5kZXgga2JkIGxhYmVsIGxlZ2VuZCBsaSBsaW5rIG1hcCBtZW51IG1ldGEgbm9mcmFtZXMgbm9zY3JpcHQgb2JqZWN0IG9sIHAgcGFyYW0gcHJlIHEgcyBzYW1wIHNjcmlwdCBzZWxlY3Qgc21hbGwgc3BhbiBzdHJpa2Ugc3Ryb25nIHN0eWxlIHN1YiBzdXAgdGV4dGFyZWEgdGl0bGUgdHQgdSB1bCB2YXIgYXJ0aWNsZSBhc2lkZSBhdWRpbyBiZGkgY2FudmFzIGNvbW1hbmQgZGF0YSBkYXRhZ3JpZCBkYXRhbGlzdCBkZXRhaWxzIGVtYmVkIGV2ZW50c291cmNlIGZpZ2NhcHRpb24gZmlndXJlIGZvb3RlciBoZWFkZXIgaGdyb3VwIGtleWdlbiBtYXJrIG1ldGVyIG5hdiBvdXRwdXQgcHJvZ3Jlc3MgcnVieSBycCBydCBzZWN0aW9uIHNvdXJjZSBzdW1tYXJ5IHRpbWUgdHJhY2sgdmlkZW8gd2JyJy5zcGxpdCgnICcpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN0ciwgaSwgbGVuLCBhdHRyU3RyLCBuYW1lLCBhdHRyVmFsdWVTdHIsIGZyYWdTdHIsIGlzVm9pZDtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0ciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaHRtbEVsZW1lbnRzLmluZGV4T2YodGhpcy50YWcudG9Mb3dlckNhc2UoKSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wcm94aWVzIHx8IHRoaXMuaW50cm8gfHwgdGhpcy5vdXRybyB8fCB0aGlzLmRlY29yYXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0ciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnJhZ1N0ciA9IHN0cmluZ2lmeVN0dWJzKHRoaXMuaXRlbXMpO1xuICAgICAgICAgICAgaWYgKGZyYWdTdHIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpc1ZvaWQgPSB2b2lkRWxlbWVudE5hbWVzLmluZGV4T2YodGhpcy50YWcudG9Mb3dlckNhc2UoKSkgIT09IC0xO1xuICAgICAgICAgICAgc3RyID0gJzwnICsgdGhpcy50YWc7XG4gICAgICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gdGhpcy5hdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSB0aGlzLmF0dHJpYnV0ZXNbaV0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignOicpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdpZCcgfHwgbmFtZSA9PT0gJ2ludHJvJyB8fCBuYW1lID09PSAnb3V0cm8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhdHRyU3RyID0gJyAnICsgbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlc1tpXS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0clZhbHVlU3RyID0gdGhpcy5hdHRyaWJ1dGVzW2ldLnZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0clZhbHVlU3RyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0ciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJWYWx1ZVN0ciAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyU3RyICs9ICc9JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoL1tcXHNcIic9PD5gXS8udGVzdChhdHRyVmFsdWVTdHIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJTdHIgKz0gJ1wiJyArIGF0dHJWYWx1ZVN0ci5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JykgKyAnXCInO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJTdHIgKz0gYXR0clZhbHVlU3RyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gYXR0clN0cjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxmQ2xvc2luZyAmJiAhaXNWb2lkKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9ICcvPic7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyID0gc3RyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyICs9ICc+JztcbiAgICAgICAgICAgIGlmIChpc1ZvaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHIgPSBzdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHIgKz0gZnJhZ1N0cjtcbiAgICAgICAgICAgIHN0ciArPSAnPC8nICsgdGhpcy50YWcgKyAnPic7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHIgPSBzdHI7XG4gICAgICAgIH07XG4gICAgfShwYXJzZV9QYXJzZXJfdXRpbHNfc3RyaW5naWZ5U3R1YnMsIGNvbmZpZ192b2lkRWxlbWVudE5hbWVzKTtcbnZhciBwYXJzZV9QYXJzZXJfZ2V0RWxlbWVudF9FbGVtZW50U3R1Yl9fRWxlbWVudFN0dWIgPSBmdW5jdGlvbiAodHlwZXMsIHZvaWRFbGVtZW50TmFtZXMsIHdhcm4sIGNhbWVsQ2FzZSwgc3RyaW5naWZ5U3R1YnMsIHNpYmxpbmdzQnlUYWdOYW1lLCBmaWx0ZXJBdHRyaWJ1dGVzLCBwcm9jZXNzRGlyZWN0aXZlLCB0b0pTT04sIHRvU3RyaW5nLCBTdHJpbmdTdHViKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgRWxlbWVudFN0dWIsIGFsbEVsZW1lbnROYW1lcywgY2xvc2VkQnlQYXJlbnRDbG9zZSwgb25QYXR0ZXJuLCBzYW5pdGl6ZSwgbGVhZGluZ1doaXRlc3BhY2UgPSAvXlxccysvLCB0cmFpbGluZ1doaXRlc3BhY2UgPSAvXFxzKyQvO1xuICAgICAgICBFbGVtZW50U3R1YiA9IGZ1bmN0aW9uIChmaXJzdFRva2VuLCBwYXJzZXIsIHByZXNlcnZlV2hpdGVzcGFjZSkge1xuICAgICAgICAgICAgdmFyIG5leHQsIGF0dHJzLCBmaWx0ZXJlZCwgcHJveGllcywgaXRlbSwgZ2V0RnJhZywgbG93ZXJDYXNlVGFnO1xuICAgICAgICAgICAgcGFyc2VyLnBvcyArPSAxO1xuICAgICAgICAgICAgZ2V0RnJhZyA9IGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYXR0ci5uYW1lLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYXR0ci52YWx1ZSA/IG5ldyBTdHJpbmdTdHViKGF0dHIudmFsdWUpIDogbnVsbFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy50YWcgPSBmaXJzdFRva2VuLm5hbWU7XG4gICAgICAgICAgICBsb3dlckNhc2VUYWcgPSBmaXJzdFRva2VuLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChsb3dlckNhc2VUYWcuc3Vic3RyKDAsIDMpID09PSAncnYtJykge1xuICAgICAgICAgICAgICAgIHdhcm4oJ1RoZSBcInJ2LVwiIHByZWZpeCBmb3IgY29tcG9uZW50cyBoYXMgYmVlbiBkZXByZWNhdGVkLiBTdXBwb3J0IHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uJyk7XG4gICAgICAgICAgICAgICAgdGhpcy50YWcgPSB0aGlzLnRhZy5zdWJzdHJpbmcoMyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmVzZXJ2ZVdoaXRlc3BhY2UgPSBwcmVzZXJ2ZVdoaXRlc3BhY2UgfHwgbG93ZXJDYXNlVGFnID09PSAncHJlJztcbiAgICAgICAgICAgIGlmIChmaXJzdFRva2VuLmF0dHJzKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyZWQgPSBmaWx0ZXJBdHRyaWJ1dGVzKGZpcnN0VG9rZW4uYXR0cnMpO1xuICAgICAgICAgICAgICAgIGF0dHJzID0gZmlsdGVyZWQuYXR0cnM7XG4gICAgICAgICAgICAgICAgcHJveGllcyA9IGZpbHRlcmVkLnByb3hpZXM7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlci5vcHRpb25zLnNhbml0aXplICYmIHBhcnNlci5vcHRpb25zLnNhbml0aXplLmV2ZW50QXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgICAgICBhdHRycyA9IGF0dHJzLmZpbHRlcihzYW5pdGl6ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhdHRycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cnMubWFwKGdldEZyYWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocHJveGllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm94aWVzID0gcHJveGllcy5tYXAocHJvY2Vzc0RpcmVjdGl2ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5pbnRybykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvID0gcHJvY2Vzc0RpcmVjdGl2ZShmaWx0ZXJlZC5pbnRybyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5vdXRybykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dHJvID0gcHJvY2Vzc0RpcmVjdGl2ZShmaWx0ZXJlZC5vdXRybyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5kZWNvcmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3IgPSBwcm9jZXNzRGlyZWN0aXZlKGZpbHRlcmVkLmRlY29yYXRvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpcnN0VG9rZW4uZG9jdHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9jdHlwZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyc3RUb2tlbi5zZWxmQ2xvc2luZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZkNsb3NpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZvaWRFbGVtZW50TmFtZXMuaW5kZXhPZihsb3dlckNhc2VUYWcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNWb2lkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGZDbG9zaW5nIHx8IHRoaXMuaXNWb2lkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zaWJsaW5ncyA9IHNpYmxpbmdzQnlUYWdOYW1lW2xvd2VyQ2FzZVRhZ107XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgICAgICBuZXh0ID0gcGFyc2VyLm5leHQoKTtcbiAgICAgICAgICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHQubXVzdGFjaGVUeXBlID09PSB0eXBlcy5DTE9TSU5HKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobmV4dC50eXBlID09PSB0eXBlcy5UQUcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHQuY2xvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHQubmFtZS50b0xvd2VyQ2FzZSgpID09PSBsb3dlckNhc2VUYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucG9zICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNpYmxpbmdzICYmIHRoaXMuc2libGluZ3MuaW5kZXhPZihuZXh0Lm5hbWUudG9Mb3dlckNhc2UoKSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zW3RoaXMuaXRlbXMubGVuZ3RoXSA9IHBhcnNlci5nZXRTdHViKCk7XG4gICAgICAgICAgICAgICAgbmV4dCA9IHBhcnNlci5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXByZXNlcnZlV2hpdGVzcGFjZSkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLml0ZW1zWzBdO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0udHlwZSA9PT0gdHlwZXMuVEVYVCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnRleHQgPSBpdGVtLnRleHQucmVwbGFjZShsZWFkaW5nV2hpdGVzcGFjZSwgJycpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLml0ZW1zW3RoaXMuaXRlbXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS50eXBlID09PSB0eXBlcy5URVhUKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udGV4dCA9IGl0ZW0udGV4dC5yZXBsYWNlKHRyYWlsaW5nV2hpdGVzcGFjZSwgJycpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgRWxlbWVudFN0dWIucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdG9KU09OOiB0b0pTT04sXG4gICAgICAgICAgICB0b1N0cmluZzogdG9TdHJpbmdcbiAgICAgICAgfTtcbiAgICAgICAgYWxsRWxlbWVudE5hbWVzID0gJ2EgYWJiciBhY3JvbnltIGFkZHJlc3MgYXBwbGV0IGFyZWEgYiBiYXNlIGJhc2Vmb250IGJkbyBiaWcgYmxvY2txdW90ZSBib2R5IGJyIGJ1dHRvbiBjYXB0aW9uIGNlbnRlciBjaXRlIGNvZGUgY29sIGNvbGdyb3VwIGRkIGRlbCBkZm4gZGlyIGRpdiBkbCBkdCBlbSBmaWVsZHNldCBmb250IGZvcm0gZnJhbWUgZnJhbWVzZXQgaDEgaDIgaDMgaDQgaDUgaDYgaGVhZCBociBodG1sIGkgaWZyYW1lIGltZyBpbnB1dCBpbnMgaXNpbmRleCBrYmQgbGFiZWwgbGVnZW5kIGxpIGxpbmsgbWFwIG1lbnUgbWV0YSBub2ZyYW1lcyBub3NjcmlwdCBvYmplY3Qgb2wgcCBwYXJhbSBwcmUgcSBzIHNhbXAgc2NyaXB0IHNlbGVjdCBzbWFsbCBzcGFuIHN0cmlrZSBzdHJvbmcgc3R5bGUgc3ViIHN1cCB0ZXh0YXJlYSB0aXRsZSB0dCB1IHVsIHZhciBhcnRpY2xlIGFzaWRlIGF1ZGlvIGJkaSBjYW52YXMgY29tbWFuZCBkYXRhIGRhdGFncmlkIGRhdGFsaXN0IGRldGFpbHMgZW1iZWQgZXZlbnRzb3VyY2UgZmlnY2FwdGlvbiBmaWd1cmUgZm9vdGVyIGhlYWRlciBoZ3JvdXAga2V5Z2VuIG1hcmsgbWV0ZXIgbmF2IG91dHB1dCBwcm9ncmVzcyBydWJ5IHJwIHJ0IHNlY3Rpb24gc291cmNlIHN1bW1hcnkgdGltZSB0cmFjayB2aWRlbyB3YnInLnNwbGl0KCcgJyk7XG4gICAgICAgIGNsb3NlZEJ5UGFyZW50Q2xvc2UgPSAnbGkgZGQgcnQgcnAgb3B0Z3JvdXAgb3B0aW9uIHRib2R5IHRmb290IHRyIHRkIHRoJy5zcGxpdCgnICcpO1xuICAgICAgICBvblBhdHRlcm4gPSAvXm9uW2EtekEtWl0vO1xuICAgICAgICBzYW5pdGl6ZSA9IGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICAgICAgICB2YXIgdmFsaWQgPSAhb25QYXR0ZXJuLnRlc3QoYXR0ci5uYW1lKTtcbiAgICAgICAgICAgIHJldHVybiB2YWxpZDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEVsZW1lbnRTdHViO1xuICAgIH0oY29uZmlnX3R5cGVzLCBjb25maWdfdm9pZEVsZW1lbnROYW1lcywgdXRpbHNfd2FybiwgdXRpbHNfY2FtZWxDYXNlLCBwYXJzZV9QYXJzZXJfdXRpbHNfc3RyaW5naWZ5U3R1YnMsIHBhcnNlX1BhcnNlcl9nZXRFbGVtZW50X0VsZW1lbnRTdHViX3V0aWxzX3NpYmxpbmdzQnlUYWdOYW1lLCBwYXJzZV9QYXJzZXJfZ2V0RWxlbWVudF9FbGVtZW50U3R1Yl91dGlsc19maWx0ZXJBdHRyaWJ1dGVzLCBwYXJzZV9QYXJzZXJfZ2V0RWxlbWVudF9FbGVtZW50U3R1Yl91dGlsc19wcm9jZXNzRGlyZWN0aXZlLCBwYXJzZV9QYXJzZXJfZ2V0RWxlbWVudF9FbGVtZW50U3R1Yl90b0pTT04sIHBhcnNlX1BhcnNlcl9nZXRFbGVtZW50X0VsZW1lbnRTdHViX3RvU3RyaW5nLCBwYXJzZV9QYXJzZXJfU3RyaW5nU3R1Yl9fU3RyaW5nU3R1Yik7XG52YXIgcGFyc2VfUGFyc2VyX2dldEVsZW1lbnRfX2dldEVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZXMsIEVsZW1lbnRTdHViKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNhbml0aXplICYmIHRoaXMub3B0aW9ucy5zYW5pdGl6ZS5lbGVtZW50cykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2FuaXRpemUuZWxlbWVudHMuaW5kZXhPZih0b2tlbi5uYW1lLnRvTG93ZXJDYXNlKCkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVsZW1lbnRTdHViKHRva2VuLCB0aGlzKTtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcywgcGFyc2VfUGFyc2VyX2dldEVsZW1lbnRfRWxlbWVudFN0dWJfX0VsZW1lbnRTdHViKTtcbnZhciBwYXJzZV9QYXJzZXJfX1BhcnNlciA9IGZ1bmN0aW9uIChnZXRUZXh0LCBnZXRDb21tZW50LCBnZXRNdXN0YWNoZSwgZ2V0RWxlbWVudCwganNvbmlmeVN0dWJzKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgUGFyc2VyO1xuICAgICAgICBQYXJzZXIgPSBmdW5jdGlvbiAodG9rZW5zLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgc3R1Yiwgc3R1YnM7XG4gICAgICAgICAgICB0aGlzLnRva2VucyA9IHRva2VucyB8fCBbXTtcbiAgICAgICAgICAgIHRoaXMucG9zID0gMDtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICB0aGlzLnByZXNlcnZlV2hpdGVzcGFjZSA9IG9wdGlvbnMucHJlc2VydmVXaGl0ZXNwYWNlO1xuICAgICAgICAgICAgc3R1YnMgPSBbXTtcbiAgICAgICAgICAgIHdoaWxlIChzdHViID0gdGhpcy5nZXRTdHViKCkpIHtcbiAgICAgICAgICAgICAgICBzdHVicy5wdXNoKHN0dWIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSBqc29uaWZ5U3R1YnMoc3R1YnMpO1xuICAgICAgICB9O1xuICAgICAgICBQYXJzZXIucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgZ2V0U3R1YjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IHRoaXMubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRleHQodG9rZW4pIHx8IHRoaXMuZ2V0Q29tbWVudCh0b2tlbikgfHwgdGhpcy5nZXRNdXN0YWNoZSh0b2tlbikgfHwgdGhpcy5nZXRFbGVtZW50KHRva2VuKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRUZXh0OiBnZXRUZXh0LFxuICAgICAgICAgICAgZ2V0Q29tbWVudDogZ2V0Q29tbWVudCxcbiAgICAgICAgICAgIGdldE11c3RhY2hlOiBnZXRNdXN0YWNoZSxcbiAgICAgICAgICAgIGdldEVsZW1lbnQ6IGdldEVsZW1lbnQsXG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMucG9zXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFBhcnNlcjtcbiAgICB9KHBhcnNlX1BhcnNlcl9nZXRUZXh0X19nZXRUZXh0LCBwYXJzZV9QYXJzZXJfZ2V0Q29tbWVudF9fZ2V0Q29tbWVudCwgcGFyc2VfUGFyc2VyX2dldE11c3RhY2hlX19nZXRNdXN0YWNoZSwgcGFyc2VfUGFyc2VyX2dldEVsZW1lbnRfX2dldEVsZW1lbnQsIHBhcnNlX1BhcnNlcl91dGlsc19qc29uaWZ5U3R1YnMpO1xudmFyIHBhcnNlX19wYXJzZSA9IGZ1bmN0aW9uICh0b2tlbml6ZSwgdHlwZXMsIFBhcnNlcikge1xuICAgICAgICBcbiAgICAgICAgdmFyIHBhcnNlLCBvbmx5V2hpdGVzcGFjZSwgaW5saW5lUGFydGlhbFN0YXJ0LCBpbmxpbmVQYXJ0aWFsRW5kLCBwYXJzZUNvbXBvdW5kVGVtcGxhdGU7XG4gICAgICAgIG9ubHlXaGl0ZXNwYWNlID0gL15cXHMqJC87XG4gICAgICAgIGlubGluZVBhcnRpYWxTdGFydCA9IC88IS0tXFxzKlxce1xce1xccyo+XFxzKihbYS16QS1aXyRdW2EtekEtWl8kMC05XSopXFxzKn1cXH1cXHMqLS0+LztcbiAgICAgICAgaW5saW5lUGFydGlhbEVuZCA9IC88IS0tXFxzKlxce1xce1xccypcXC9cXHMqKFthLXpBLVpfJF1bYS16QS1aXyQwLTldKilcXHMqfVxcfVxccyotLT4vO1xuICAgICAgICBwYXJzZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIHRva2VucywganNvbiwgdG9rZW47XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgICAgIGlmIChpbmxpbmVQYXJ0aWFsU3RhcnQudGVzdCh0ZW1wbGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VDb21wb3VuZFRlbXBsYXRlKHRlbXBsYXRlLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLnNhbml0aXplID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5zYW5pdGl6ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6ICdhcHBsZXQgYmFzZSBiYXNlZm9udCBib2R5IGZyYW1lIGZyYW1lc2V0IGhlYWQgaHRtbCBpc2luZGV4IGxpbmsgbWV0YSBub2ZyYW1lcyBub3NjcmlwdCBvYmplY3QgcGFyYW0gc2NyaXB0IHN0eWxlIHRpdGxlJy5zcGxpdCgnICcpLFxuICAgICAgICAgICAgICAgICAgICBldmVudEF0dHJpYnV0ZXM6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW5zID0gdG9rZW5pemUodGVtcGxhdGUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnByZXNlcnZlV2hpdGVzcGFjZSkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gdG9rZW5zWzBdO1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi50eXBlID09PSB0eXBlcy5URVhUICYmIG9ubHlXaGl0ZXNwYWNlLnRlc3QodG9rZW4udmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2Vucy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuICYmIHRva2VuLnR5cGUgPT09IHR5cGVzLlRFWFQgJiYgb25seVdoaXRlc3BhY2UudGVzdCh0b2tlbi52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5zLnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGpzb24gPSBuZXcgUGFyc2VyKHRva2Vucywgb3B0aW9ucykucmVzdWx0O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBqc29uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBbanNvbl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfTtcbiAgICAgICAgcGFyc2VDb21wb3VuZFRlbXBsYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgbWFpblRlbXBsYXRlLCByZW1haW5pbmcsIHBhcnRpYWxzLCBuYW1lLCBzdGFydE1hdGNoLCBlbmRNYXRjaDtcbiAgICAgICAgICAgIHBhcnRpYWxzID0ge307XG4gICAgICAgICAgICBtYWluVGVtcGxhdGUgPSAnJztcbiAgICAgICAgICAgIHJlbWFpbmluZyA9IHRlbXBsYXRlO1xuICAgICAgICAgICAgd2hpbGUgKHN0YXJ0TWF0Y2ggPSBpbmxpbmVQYXJ0aWFsU3RhcnQuZXhlYyhyZW1haW5pbmcpKSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IHN0YXJ0TWF0Y2hbMV07XG4gICAgICAgICAgICAgICAgbWFpblRlbXBsYXRlICs9IHJlbWFpbmluZy5zdWJzdHIoMCwgc3RhcnRNYXRjaC5pbmRleCk7XG4gICAgICAgICAgICAgICAgcmVtYWluaW5nID0gcmVtYWluaW5nLnN1YnN0cmluZyhzdGFydE1hdGNoLmluZGV4ICsgc3RhcnRNYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGVuZE1hdGNoID0gaW5saW5lUGFydGlhbEVuZC5leGVjKHJlbWFpbmluZyk7XG4gICAgICAgICAgICAgICAgaWYgKCFlbmRNYXRjaCB8fCBlbmRNYXRjaFsxXSAhPT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lubGluZSBwYXJ0aWFscyBtdXN0IGhhdmUgYSBjbG9zaW5nIGRlbGltaXRlciwgYW5kIGNhbm5vdCBiZSBuZXN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFydGlhbHNbbmFtZV0gPSBwYXJzZShyZW1haW5pbmcuc3Vic3RyKDAsIGVuZE1hdGNoLmluZGV4KSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgcmVtYWluaW5nID0gcmVtYWluaW5nLnN1YnN0cmluZyhlbmRNYXRjaC5pbmRleCArIGVuZE1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG1haW46IHBhcnNlKG1haW5UZW1wbGF0ZSwgb3B0aW9ucyksXG4gICAgICAgICAgICAgICAgcGFydGlhbHM6IHBhcnRpYWxzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcGFyc2U7XG4gICAgfShwYXJzZV90b2tlbml6ZSwgY29uZmlnX3R5cGVzLCBwYXJzZV9QYXJzZXJfX1BhcnNlcik7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X1BhcnRpYWxfZ2V0UGFydGlhbERlc2NyaXB0b3IgPSBmdW5jdGlvbiAoZXJyb3JzLCBpc0NsaWVudCwgd2FybiwgaXNPYmplY3QsIHBhcnRpYWxzLCBwYXJzZSkge1xuICAgICAgICBcbiAgICAgICAgdmFyIGdldFBhcnRpYWxEZXNjcmlwdG9yLCByZWdpc3RlclBhcnRpYWwsIGdldFBhcnRpYWxGcm9tUmVnaXN0cnksIHVucGFjaztcbiAgICAgICAgZ2V0UGFydGlhbERlc2NyaXB0b3IgPSBmdW5jdGlvbiAocm9vdCwgbmFtZSkge1xuICAgICAgICAgICAgdmFyIGVsLCBwYXJ0aWFsLCBlcnJvck1lc3NhZ2U7XG4gICAgICAgICAgICBpZiAocGFydGlhbCA9IGdldFBhcnRpYWxGcm9tUmVnaXN0cnkocm9vdCwgbmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFydGlhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0NsaWVudCkge1xuICAgICAgICAgICAgICAgIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKGVsICYmIGVsLnRhZ05hbWUgPT09ICdTQ1JJUFQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcGFyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMubWlzc2luZ1BhcnNlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJQYXJ0aWFsKHBhcnNlKGVsLmlubmVySFRNTCksIG5hbWUsIHBhcnRpYWxzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJ0aWFsID0gcGFydGlhbHNbbmFtZV07XG4gICAgICAgICAgICBpZiAoIXBhcnRpYWwpIHtcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSAnQ291bGQgbm90IGZpbmQgZGVzY3JpcHRvciBmb3IgcGFydGlhbCBcIicgKyBuYW1lICsgJ1wiJztcbiAgICAgICAgICAgICAgICBpZiAocm9vdC5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3YXJuKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bnBhY2socGFydGlhbCk7XG4gICAgICAgIH07XG4gICAgICAgIGdldFBhcnRpYWxGcm9tUmVnaXN0cnkgPSBmdW5jdGlvbiAocmVnaXN0cnlPd25lciwgbmFtZSkge1xuICAgICAgICAgICAgdmFyIHBhcnRpYWw7XG4gICAgICAgICAgICBpZiAocmVnaXN0cnlPd25lci5wYXJ0aWFsc1tuYW1lXSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVnaXN0cnlPd25lci5wYXJ0aWFsc1tuYW1lXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5taXNzaW5nUGFyc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsID0gcGFyc2UocmVnaXN0cnlPd25lci5wYXJ0aWFsc1tuYW1lXSwgcmVnaXN0cnlPd25lci5wYXJzZU9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlclBhcnRpYWwocGFydGlhbCwgbmFtZSwgcmVnaXN0cnlPd25lci5wYXJ0aWFscyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB1bnBhY2socmVnaXN0cnlPd25lci5wYXJ0aWFsc1tuYW1lXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlZ2lzdGVyUGFydGlhbCA9IGZ1bmN0aW9uIChwYXJ0aWFsLCBuYW1lLCByZWdpc3RyeSkge1xuICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgIGlmIChpc09iamVjdChwYXJ0aWFsKSkge1xuICAgICAgICAgICAgICAgIHJlZ2lzdHJ5W25hbWVdID0gcGFydGlhbC5tYWluO1xuICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIHBhcnRpYWwucGFydGlhbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnRpYWwucGFydGlhbHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVnaXN0cnlba2V5XSA9IHBhcnRpYWwucGFydGlhbHNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVnaXN0cnlbbmFtZV0gPSBwYXJ0aWFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB1bnBhY2sgPSBmdW5jdGlvbiAocGFydGlhbCkge1xuICAgICAgICAgICAgaWYgKHBhcnRpYWwubGVuZ3RoID09PSAxICYmIHR5cGVvZiBwYXJ0aWFsWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJ0aWFsWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcnRpYWw7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBnZXRQYXJ0aWFsRGVzY3JpcHRvcjtcbiAgICB9KGNvbmZpZ19lcnJvcnMsIGNvbmZpZ19pc0NsaWVudCwgdXRpbHNfd2FybiwgdXRpbHNfaXNPYmplY3QsIHJlZ2lzdHJpZXNfcGFydGlhbHMsIHBhcnNlX19wYXJzZSk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X1BhcnRpYWxfX1BhcnRpYWwgPSBmdW5jdGlvbiAodHlwZXMsIGdldFBhcnRpYWxEZXNjcmlwdG9yLCBjaXJjdWxhcikge1xuICAgICAgICBcbiAgICAgICAgdmFyIERvbVBhcnRpYWwsIERvbUZyYWdtZW50O1xuICAgICAgICBjaXJjdWxhci5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIERvbUZyYWdtZW50ID0gY2lyY3VsYXIuRG9tRnJhZ21lbnQ7XG4gICAgICAgIH0pO1xuICAgICAgICBEb21QYXJ0aWFsID0gZnVuY3Rpb24gKG9wdGlvbnMsIGRvY0ZyYWcpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnRGcmFnbWVudCA9IHRoaXMucGFyZW50RnJhZ21lbnQgPSBvcHRpb25zLnBhcmVudEZyYWdtZW50LCBkZXNjcmlwdG9yO1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZXMuUEFSVElBTDtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG9wdGlvbnMuZGVzY3JpcHRvci5yO1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IG9wdGlvbnMuaW5kZXg7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuZGVzY3JpcHRvci5yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJ0aWFscyBtdXN0IGhhdmUgYSBzdGF0aWMgcmVmZXJlbmNlIChubyBleHByZXNzaW9ucykuIFRoaXMgbWF5IGNoYW5nZSBpbiBhIGZ1dHVyZSB2ZXJzaW9uIG9mIFJhY3RpdmUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXNjcmlwdG9yID0gZ2V0UGFydGlhbERlc2NyaXB0b3IocGFyZW50RnJhZ21lbnQucm9vdCwgb3B0aW9ucy5kZXNjcmlwdG9yLnIpO1xuICAgICAgICAgICAgdGhpcy5mcmFnbWVudCA9IG5ldyBEb21GcmFnbWVudCh7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRvcjogZGVzY3JpcHRvcixcbiAgICAgICAgICAgICAgICByb290OiBwYXJlbnRGcmFnbWVudC5yb290LFxuICAgICAgICAgICAgICAgIHBOb2RlOiBwYXJlbnRGcmFnbWVudC5wTm9kZSxcbiAgICAgICAgICAgICAgICBjb250ZXh0U3RhY2s6IHBhcmVudEZyYWdtZW50LmNvbnRleHRTdGFjayxcbiAgICAgICAgICAgICAgICBvd25lcjogdGhpc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZG9jRnJhZykge1xuICAgICAgICAgICAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQodGhpcy5mcmFnbWVudC5kb2NGcmFnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgRG9tUGFydGlhbC5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBmaXJzdE5vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mcmFnbWVudC5maXJzdE5vZGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kTmV4dE5vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRGcmFnbWVudC5maW5kTmV4dE5vZGUodGhpcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGV0YWNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJhZ21lbnQuZGV0YWNoKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uIChkZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudC50ZWFyZG93bihkZXN0cm95KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYWdtZW50LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJhZ21lbnQuZmluZChzZWxlY3Rvcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZEFsbDogZnVuY3Rpb24gKHNlbGVjdG9yLCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYWdtZW50LmZpbmRBbGwoc2VsZWN0b3IsIHF1ZXJ5KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kQ29tcG9uZW50OiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mcmFnbWVudC5maW5kQ29tcG9uZW50KHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kQWxsQ29tcG9uZW50czogZnVuY3Rpb24gKHNlbGVjdG9yLCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYWdtZW50LmZpbmRBbGxDb21wb25lbnRzKHNlbGVjdG9yLCBxdWVyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBEb21QYXJ0aWFsO1xuICAgIH0oY29uZmlnX3R5cGVzLCByZW5kZXJfRG9tRnJhZ21lbnRfUGFydGlhbF9nZXRQYXJ0aWFsRGVzY3JpcHRvciwgY2lyY3VsYXIpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9Db21wb25lbnRfaW5pdGlhbGlzZV9jcmVhdGVNb2RlbF9Db21wb25lbnRQYXJhbWV0ZXIgPSBmdW5jdGlvbiAoU3RyaW5nRnJhZ21lbnQpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBDb21wb25lbnRQYXJhbWV0ZXIgPSBmdW5jdGlvbiAoY29tcG9uZW50LCBrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudEZyYWdtZW50ID0gY29tcG9uZW50LnBhcmVudEZyYWdtZW50O1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQgPSBuZXcgU3RyaW5nRnJhZ21lbnQoe1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0b3I6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHJvb3Q6IGNvbXBvbmVudC5yb290LFxuICAgICAgICAgICAgICAgIG93bmVyOiB0aGlzLFxuICAgICAgICAgICAgICAgIGNvbnRleHRTdGFjazogY29tcG9uZW50LnBhcmVudEZyYWdtZW50LmNvbnRleHRTdGFja1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNlbGZVcGRhdGluZyA9IHRoaXMuZnJhZ21lbnQuaXNTaW1wbGUoKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmZyYWdtZW50LmdldFZhbHVlKCk7XG4gICAgICAgIH07XG4gICAgICAgIENvbXBvbmVudFBhcmFtZXRlci5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBidWJibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxmVXBkYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmRlZmVycmVkICYmIHRoaXMucmVhZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290Ll9kZWZlcnJlZC5hdHRycy5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmVycmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5mcmFnbWVudC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLnNldCh0aGlzLmtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQudGVhcmRvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIENvbXBvbmVudFBhcmFtZXRlcjtcbiAgICB9KHJlbmRlcl9TdHJpbmdGcmFnbWVudF9fU3RyaW5nRnJhZ21lbnQpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9Db21wb25lbnRfaW5pdGlhbGlzZV9jcmVhdGVNb2RlbF9fY3JlYXRlTW9kZWwgPSBmdW5jdGlvbiAodHlwZXMsIHBhcnNlSlNPTiwgcmVzb2x2ZVJlZiwgQ29tcG9uZW50UGFyYW1ldGVyKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNvbXBvbmVudCwgYXR0cmlidXRlcywgdG9CaW5kKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSwga2V5LCB2YWx1ZTtcbiAgICAgICAgICAgIGRhdGEgPSB7fTtcbiAgICAgICAgICAgIGNvbXBvbmVudC5jb21wbGV4UGFyYW1ldGVycyA9IFtdO1xuICAgICAgICAgICAgZm9yIChrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBnZXRWYWx1ZShjb21wb25lbnQsIGtleSwgYXR0cmlidXRlc1trZXldLCB0b0JpbmQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0VmFsdWUoY29tcG9uZW50LCBrZXksIGRlc2NyaXB0b3IsIHRvQmluZCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlciwgcGFyc2VkLCByb290LCBwYXJlbnRGcmFnbWVudCwga2V5cGF0aDtcbiAgICAgICAgICAgIHJvb3QgPSBjb21wb25lbnQucm9vdDtcbiAgICAgICAgICAgIHBhcmVudEZyYWdtZW50ID0gY29tcG9uZW50LnBhcmVudEZyYWdtZW50O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZXNjcmlwdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHBhcnNlZCA9IHBhcnNlSlNPTihkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VkID8gcGFyc2VkLnZhbHVlIDogZGVzY3JpcHRvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRvci5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRvclswXS50ID09PSB0eXBlcy5JTlRFUlBPTEFUT1IgJiYgZGVzY3JpcHRvclswXS5yKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudEZyYWdtZW50LmluZGV4UmVmcyAmJiBwYXJlbnRGcmFnbWVudC5pbmRleFJlZnNbZGVzY3JpcHRvclswXS5yXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnRGcmFnbWVudC5pbmRleFJlZnNbZGVzY3JpcHRvclswXS5yXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5cGF0aCA9IHJlc29sdmVSZWYocm9vdCwgZGVzY3JpcHRvclswXS5yLCBwYXJlbnRGcmFnbWVudC5jb250ZXh0U3RhY2spIHx8IGRlc2NyaXB0b3JbMF0ucjtcbiAgICAgICAgICAgICAgICB0b0JpbmQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkS2V5cGF0aDoga2V5LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRLZXlwYXRoOiBrZXlwYXRoXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvb3QuZ2V0KGtleXBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyYW1ldGVyID0gbmV3IENvbXBvbmVudFBhcmFtZXRlcihjb21wb25lbnQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICBjb21wb25lbnQuY29tcGxleFBhcmFtZXRlcnMucHVzaChwYXJhbWV0ZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtZXRlci52YWx1ZTtcbiAgICAgICAgfVxuICAgIH0oY29uZmlnX3R5cGVzLCB1dGlsc19wYXJzZUpTT04sIHNoYXJlZF9yZXNvbHZlUmVmLCByZW5kZXJfRG9tRnJhZ21lbnRfQ29tcG9uZW50X2luaXRpYWxpc2VfY3JlYXRlTW9kZWxfQ29tcG9uZW50UGFyYW1ldGVyKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfQ29tcG9uZW50X2luaXRpYWxpc2VfY3JlYXRlSW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNvbXBvbmVudCwgQ29tcG9uZW50LCBkYXRhLCBkb2NGcmFnLCBjb250ZW50RGVzY3JpcHRvcikge1xuICAgICAgICAgICAgdmFyIGluc3RhbmNlLCBwYXJlbnRGcmFnbWVudCwgcGFydGlhbHMsIHJvb3Q7XG4gICAgICAgICAgICBwYXJlbnRGcmFnbWVudCA9IGNvbXBvbmVudC5wYXJlbnRGcmFnbWVudDtcbiAgICAgICAgICAgIHJvb3QgPSBjb21wb25lbnQucm9vdDtcbiAgICAgICAgICAgIHBhcnRpYWxzID0geyBjb250ZW50OiBjb250ZW50RGVzY3JpcHRvciB8fCBbXSB9O1xuICAgICAgICAgICAgaW5zdGFuY2UgPSBuZXcgQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgICBlbDogcGFyZW50RnJhZ21lbnQucE5vZGUuY2xvbmVOb2RlKGZhbHNlKSxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgIHBhcnRpYWxzOiBwYXJ0aWFscyxcbiAgICAgICAgICAgICAgICBfcGFyZW50OiByb290LFxuICAgICAgICAgICAgICAgIGFkYXB0b3JzOiByb290LmFkYXB0b3JzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGluc3RhbmNlLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICAgICAgICAgIGNvbXBvbmVudC5pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgICAgICAgICAgaW5zdGFuY2UuaW5zZXJ0KGRvY0ZyYWcpO1xuICAgICAgICAgICAgaW5zdGFuY2UuZnJhZ21lbnQucE5vZGUgPSBwYXJlbnRGcmFnbWVudC5wTm9kZTtcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0NvbXBvbmVudF9pbml0aWFsaXNlX2NyZWF0ZU9ic2VydmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBvYnNlcnZlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBpbml0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkZWJ1ZzogdHJ1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjb21wb25lbnQsIHRvQmluZCkge1xuICAgICAgICAgICAgdmFyIHBhaXIsIGk7XG4gICAgICAgICAgICBjb21wb25lbnQub2JzZXJ2ZXJzID0gW107XG4gICAgICAgICAgICBpID0gdG9CaW5kLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBwYWlyID0gdG9CaW5kW2ldO1xuICAgICAgICAgICAgICAgIGJpbmQoY29tcG9uZW50LCBwYWlyLnBhcmVudEtleXBhdGgsIHBhaXIuY2hpbGRLZXlwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gYmluZChjb21wb25lbnQsIHBhcmVudEtleXBhdGgsIGNoaWxkS2V5cGF0aCkge1xuICAgICAgICAgICAgdmFyIHBhcmVudEluc3RhbmNlLCBjaGlsZEluc3RhbmNlLCBzZXR0aW5nUGFyZW50LCBzZXR0aW5nQ2hpbGQsIG9ic2VydmVycywgb2JzZXJ2ZXIsIHZhbHVlO1xuICAgICAgICAgICAgcGFyZW50SW5zdGFuY2UgPSBjb21wb25lbnQucm9vdDtcbiAgICAgICAgICAgIGNoaWxkSW5zdGFuY2UgPSBjb21wb25lbnQuaW5zdGFuY2U7XG4gICAgICAgICAgICBvYnNlcnZlcnMgPSBjb21wb25lbnQub2JzZXJ2ZXJzO1xuICAgICAgICAgICAgb2JzZXJ2ZXIgPSBwYXJlbnRJbnN0YW5jZS5vYnNlcnZlKHBhcmVudEtleXBhdGgsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghc2V0dGluZ1BhcmVudCAmJiAhcGFyZW50SW5zdGFuY2UuX3dyYXBwZWRbcGFyZW50S2V5cGF0aF0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ0NoaWxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRJbnN0YW5jZS5zZXQoY2hpbGRLZXlwYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdDaGlsZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG9ic2VydmVPcHRpb25zKTtcbiAgICAgICAgICAgIG9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcbiAgICAgICAgICAgIGlmIChjaGlsZEluc3RhbmNlLnR3b3dheSkge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyID0gY2hpbGRJbnN0YW5jZS5vYnNlcnZlKGNoaWxkS2V5cGF0aCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZ0NoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nUGFyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudEluc3RhbmNlLnNldChwYXJlbnRLZXlwYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nUGFyZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBvYnNlcnZlT3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gY2hpbGRJbnN0YW5jZS5nZXQoY2hpbGRLZXlwYXRoKTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRJbnN0YW5jZS5zZXQocGFyZW50S2V5cGF0aCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0oKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfQ29tcG9uZW50X2luaXRpYWxpc2VfcHJvcGFnYXRlRXZlbnRzID0gZnVuY3Rpb24gKHdhcm4pIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSAnQ29tcG9uZW50cyBjdXJyZW50bHkgb25seSBzdXBwb3J0IHNpbXBsZSBldmVudHMgLSB5b3UgY2Fubm90IGluY2x1ZGUgYXJndW1lbnRzLiBTb3JyeSEnO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNvbXBvbmVudCwgZXZlbnRzRGVzY3JpcHRvcikge1xuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZTtcbiAgICAgICAgICAgIGZvciAoZXZlbnROYW1lIGluIGV2ZW50c0Rlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRzRGVzY3JpcHRvci5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BhZ2F0ZUV2ZW50KGNvbXBvbmVudC5pbnN0YW5jZSwgY29tcG9uZW50LnJvb3QsIGV2ZW50TmFtZSwgZXZlbnRzRGVzY3JpcHRvcltldmVudE5hbWVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIHByb3BhZ2F0ZUV2ZW50KGNoaWxkSW5zdGFuY2UsIHBhcmVudEluc3RhbmNlLCBldmVudE5hbWUsIHByb3h5RXZlbnROYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3h5RXZlbnROYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRJbnN0YW5jZS5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3YXJuKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGlsZEluc3RhbmNlLm9uKGV2ZW50TmFtZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICBhcmdzLnVuc2hpZnQocHJveHlFdmVudE5hbWUpO1xuICAgICAgICAgICAgICAgIHBhcmVudEluc3RhbmNlLmZpcmUuYXBwbHkocGFyZW50SW5zdGFuY2UsIGFyZ3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KHV0aWxzX3dhcm4pO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9Db21wb25lbnRfaW5pdGlhbGlzZV91cGRhdGVMaXZlUXVlcmllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICB2YXIgYW5jZXN0b3IsIHF1ZXJ5O1xuICAgICAgICAgICAgYW5jZXN0b3IgPSBjb21wb25lbnQucm9vdDtcbiAgICAgICAgICAgIHdoaWxlIChhbmNlc3Rvcikge1xuICAgICAgICAgICAgICAgIGlmIChxdWVyeSA9IGFuY2VzdG9yLl9saXZlQ29tcG9uZW50UXVlcmllc1tjb21wb25lbnQubmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkucHVzaChjb21wb25lbnQuaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhbmNlc3RvciA9IGFuY2VzdG9yLl9wYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9Db21wb25lbnRfaW5pdGlhbGlzZV9faW5pdGlhbGlzZSA9IGZ1bmN0aW9uICh0eXBlcywgd2FybiwgY3JlYXRlTW9kZWwsIGNyZWF0ZUluc3RhbmNlLCBjcmVhdGVPYnNlcnZlcnMsIHByb3BhZ2F0ZUV2ZW50cywgdXBkYXRlTGl2ZVF1ZXJpZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50LCBvcHRpb25zLCBkb2NGcmFnKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50RnJhZ21lbnQsIHJvb3QsIENvbXBvbmVudCwgZGF0YSwgdG9CaW5kO1xuICAgICAgICAgICAgcGFyZW50RnJhZ21lbnQgPSBjb21wb25lbnQucGFyZW50RnJhZ21lbnQgPSBvcHRpb25zLnBhcmVudEZyYWdtZW50O1xuICAgICAgICAgICAgcm9vdCA9IHBhcmVudEZyYWdtZW50LnJvb3Q7XG4gICAgICAgICAgICBjb21wb25lbnQucm9vdCA9IHJvb3Q7XG4gICAgICAgICAgICBjb21wb25lbnQudHlwZSA9IHR5cGVzLkNPTVBPTkVOVDtcbiAgICAgICAgICAgIGNvbXBvbmVudC5uYW1lID0gb3B0aW9ucy5kZXNjcmlwdG9yLmU7XG4gICAgICAgICAgICBjb21wb25lbnQuaW5kZXggPSBvcHRpb25zLmluZGV4O1xuICAgICAgICAgICAgY29tcG9uZW50Lm9ic2VydmVycyA9IFtdO1xuICAgICAgICAgICAgQ29tcG9uZW50ID0gcm9vdC5jb21wb25lbnRzW29wdGlvbnMuZGVzY3JpcHRvci5lXTtcbiAgICAgICAgICAgIGlmICghQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb21wb25lbnQgXCInICsgb3B0aW9ucy5kZXNjcmlwdG9yLmUgKyAnXCIgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b0JpbmQgPSBbXTtcbiAgICAgICAgICAgIGRhdGEgPSBjcmVhdGVNb2RlbChjb21wb25lbnQsIG9wdGlvbnMuZGVzY3JpcHRvci5hLCB0b0JpbmQpO1xuICAgICAgICAgICAgY3JlYXRlSW5zdGFuY2UoY29tcG9uZW50LCBDb21wb25lbnQsIGRhdGEsIGRvY0ZyYWcsIG9wdGlvbnMuZGVzY3JpcHRvci5mKTtcbiAgICAgICAgICAgIGNyZWF0ZU9ic2VydmVycyhjb21wb25lbnQsIHRvQmluZCk7XG4gICAgICAgICAgICBwcm9wYWdhdGVFdmVudHMoY29tcG9uZW50LCBvcHRpb25zLmRlc2NyaXB0b3Iudik7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kZXNjcmlwdG9yLnQxIHx8IG9wdGlvbnMuZGVzY3JpcHRvci50MiB8fCBvcHRpb25zLmRlc2NyaXB0b3Iubykge1xuICAgICAgICAgICAgICAgIHdhcm4oJ1RoZSBcImludHJvXCIsIFwib3V0cm9cIiBhbmQgXCJkZWNvcmF0b3JcIiBkaXJlY3RpdmVzIGhhdmUgbm8gZWZmZWN0IG9uIGNvbXBvbmVudHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZUxpdmVRdWVyaWVzKGNvbXBvbmVudCk7XG4gICAgICAgIH07XG4gICAgfShjb25maWdfdHlwZXMsIHV0aWxzX3dhcm4sIHJlbmRlcl9Eb21GcmFnbWVudF9Db21wb25lbnRfaW5pdGlhbGlzZV9jcmVhdGVNb2RlbF9fY3JlYXRlTW9kZWwsIHJlbmRlcl9Eb21GcmFnbWVudF9Db21wb25lbnRfaW5pdGlhbGlzZV9jcmVhdGVJbnN0YW5jZSwgcmVuZGVyX0RvbUZyYWdtZW50X0NvbXBvbmVudF9pbml0aWFsaXNlX2NyZWF0ZU9ic2VydmVycywgcmVuZGVyX0RvbUZyYWdtZW50X0NvbXBvbmVudF9pbml0aWFsaXNlX3Byb3BhZ2F0ZUV2ZW50cywgcmVuZGVyX0RvbUZyYWdtZW50X0NvbXBvbmVudF9pbml0aWFsaXNlX3VwZGF0ZUxpdmVRdWVyaWVzKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfQ29tcG9uZW50X19Db21wb25lbnQgPSBmdW5jdGlvbiAoaW5pdGlhbGlzZSkge1xuICAgICAgICBcbiAgICAgICAgdmFyIERvbUNvbXBvbmVudCA9IGZ1bmN0aW9uIChvcHRpb25zLCBkb2NGcmFnKSB7XG4gICAgICAgICAgICBpbml0aWFsaXNlKHRoaXMsIG9wdGlvbnMsIGRvY0ZyYWcpO1xuICAgICAgICB9O1xuICAgICAgICBEb21Db21wb25lbnQucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgZmlyc3ROb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UuZnJhZ21lbnQuZmlyc3ROb2RlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZE5leHROb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50RnJhZ21lbnQuZmluZE5leHROb2RlKHRoaXMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRldGFjaDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlLmZyYWdtZW50LmRldGFjaCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5O1xuICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmNvbXBsZXhQYXJhbWV0ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXhQYXJhbWV0ZXJzLnBvcCgpLnRlYXJkb3duKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnMucG9wKCkuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChxdWVyeSA9IHRoaXMucm9vdC5fbGl2ZUNvbXBvbmVudFF1ZXJpZXNbdGhpcy5uYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeS5fcmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlLnRlYXJkb3duKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZS5mcmFnbWVudC50b1N0cmluZygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmQ6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlLmZyYWdtZW50LmZpbmQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmRBbGw6IGZ1bmN0aW9uIChzZWxlY3RvciwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZS5mcmFnbWVudC5maW5kQWxsKHNlbGVjdG9yLCBxdWVyeSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZENvbXBvbmVudDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gdGhpcy5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kQWxsQ29tcG9uZW50czogZnVuY3Rpb24gKHNlbGVjdG9yLCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5Ll90ZXN0KHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluc3RhbmNlLmZyYWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UuZnJhZ21lbnQuZmluZEFsbENvbXBvbmVudHMoc2VsZWN0b3IsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBEb21Db21wb25lbnQ7XG4gICAgfShyZW5kZXJfRG9tRnJhZ21lbnRfQ29tcG9uZW50X2luaXRpYWxpc2VfX2luaXRpYWxpc2UpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9Db21tZW50ID0gZnVuY3Rpb24gKHR5cGVzKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgRG9tQ29tbWVudCA9IGZ1bmN0aW9uIChvcHRpb25zLCBkb2NGcmFnKSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlcy5DT01NRU5UO1xuICAgICAgICAgICAgdGhpcy5kZXNjcmlwdG9yID0gb3B0aW9ucy5kZXNjcmlwdG9yO1xuICAgICAgICAgICAgaWYgKGRvY0ZyYWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KG9wdGlvbnMuZGVzY3JpcHRvci5mKTtcbiAgICAgICAgICAgICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKHRoaXMubm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIERvbUNvbW1lbnQucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgZGV0YWNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoZGVzdHJveSkge1xuICAgICAgICAgICAgICAgIGlmIChkZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpcnN0Tm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJzwhLS0nICsgdGhpcy5kZXNjcmlwdG9yLmYgKyAnLS0+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIERvbUNvbW1lbnQ7XG4gICAgfShjb25maWdfdHlwZXMpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9fRG9tRnJhZ21lbnQgPSBmdW5jdGlvbiAodHlwZXMsIG1hdGNoZXMsIGluaXRGcmFnbWVudCwgaW5zZXJ0SHRtbCwgVGV4dCwgSW50ZXJwb2xhdG9yLCBTZWN0aW9uLCBUcmlwbGUsIEVsZW1lbnQsIFBhcnRpYWwsIENvbXBvbmVudCwgQ29tbWVudCwgY2lyY3VsYXIpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBEb21GcmFnbWVudCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wTm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5kZXNjcmlwdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMuaHRtbCA9IG9wdGlvbnMuZGVzY3JpcHRvcjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kb2NGcmFnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZXMgPSBpbnNlcnRIdG1sKHRoaXMuaHRtbCwgb3B0aW9ucy5wTm9kZS50YWdOYW1lLCB0aGlzLmRvY0ZyYWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5pdEZyYWdtZW50KHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBEb21GcmFnbWVudC5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBkZXRhY2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGVuLCBpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSB0aGlzLm5vZGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2NGcmFnLmFwcGVuZENoaWxkKHRoaXMubm9kZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jRnJhZy5hcHBlbmRDaGlsZCh0aGlzLml0ZW1zW2ldLmRldGFjaCgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb2NGcmFnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyZWF0ZUl0ZW06IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmRlc2NyaXB0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVGV4dChvcHRpb25zLCB0aGlzLmRvY0ZyYWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wdGlvbnMuZGVzY3JpcHRvci50KSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5JTlRFUlBPTEFUT1I6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSW50ZXJwb2xhdG9yKG9wdGlvbnMsIHRoaXMuZG9jRnJhZyk7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5TRUNUSU9OOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNlY3Rpb24ob3B0aW9ucywgdGhpcy5kb2NGcmFnKTtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRSSVBMRTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBUcmlwbGUob3B0aW9ucywgdGhpcy5kb2NGcmFnKTtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkVMRU1FTlQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvb3QuY29tcG9uZW50c1tvcHRpb25zLmRlc2NyaXB0b3IuZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29tcG9uZW50KG9wdGlvbnMsIHRoaXMuZG9jRnJhZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFbGVtZW50KG9wdGlvbnMsIHRoaXMuZG9jRnJhZyk7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5QQVJUSUFMOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFBhcnRpYWwob3B0aW9ucywgdGhpcy5kb2NGcmFnKTtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkNPTU1FTlQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29tbWVudChvcHRpb25zLCB0aGlzLmRvY0ZyYWcpO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHZlcnkgc3RyYW5nZSBoYXBwZW5lZC4gUGxlYXNlIGZpbGUgYW4gaXNzdWUgYXQgaHR0cHM6Ly9naXRodWIuY29tL1JhY3RpdmVKUy9SYWN0aXZlL2lzc3Vlcy4gVGhhbmtzIScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKGRlc3Ryb3kpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlcyAmJiBkZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChub2RlID0gdGhpcy5ub2Rlcy5wb3AoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wb3AoKS50ZWFyZG93bihkZXN0cm95KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVzID0gdGhpcy5pdGVtcyA9IHRoaXMuZG9jRnJhZyA9IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlyc3ROb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtc1swXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1swXS5maXJzdE5vZGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZXNbMF0gfHwgbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZE5leHROb2RlOiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGl0ZW0uaW5kZXg7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXRlbXNbaW5kZXggKyAxXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1tpbmRleCArIDFdLmZpcnN0Tm9kZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vd25lciA9PT0gdGhpcy5yb290KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5vd25lci5jb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm93bmVyLmNvbXBvbmVudC5maW5kTmV4dE5vZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3duZXIuZmluZE5leHROb2RlKHRoaXMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGh0bWwsIGksIGxlbiwgaXRlbTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5odG1sKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmh0bWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGh0bWwgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5pdGVtc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSBpdGVtLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmQ6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHZhciBpLCBsZW4sIGl0ZW0sIG5vZGUsIHF1ZXJ5UmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMubm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5vZGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgIT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzKG5vZGUsIHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXJ5UmVzdWx0ID0gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeVJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuaXRlbXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5maW5kICYmIChxdWVyeVJlc3VsdCA9IGl0ZW0uZmluZChzZWxlY3RvcikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5UmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kQWxsOiBmdW5jdGlvbiAoc2VsZWN0b3IsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGksIGxlbiwgaXRlbSwgbm9kZSwgcXVlcnlBbGxSZXN1bHQsIG51bU5vZGVzLCBqO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMubm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5vZGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgIT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzKG5vZGUsIHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5LnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnlBbGxSZXN1bHQgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtTm9kZXMgPSBxdWVyeUFsbFJlc3VsdC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IG51bU5vZGVzOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnkucHVzaChxdWVyeUFsbFJlc3VsdFtqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uZmluZEFsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZmluZEFsbChzZWxlY3RvciwgcXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kQ29tcG9uZW50OiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGVuLCBpLCBpdGVtLCBxdWVyeVJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5pdGVtc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmZpbmRDb21wb25lbnQgJiYgKHF1ZXJ5UmVzdWx0ID0gaXRlbS5maW5kQ29tcG9uZW50KHNlbGVjdG9yKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnlSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmRBbGxDb21wb25lbnRzOiBmdW5jdGlvbiAoc2VsZWN0b3IsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGksIGxlbiwgaXRlbTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5pdGVtc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmZpbmRBbGxDb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5maW5kQWxsQ29tcG9uZW50cyhzZWxlY3RvciwgcXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY2lyY3VsYXIuRG9tRnJhZ21lbnQgPSBEb21GcmFnbWVudDtcbiAgICAgICAgcmV0dXJuIERvbUZyYWdtZW50O1xuICAgIH0oY29uZmlnX3R5cGVzLCB1dGlsc19tYXRjaGVzLCByZW5kZXJfc2hhcmVkX2luaXRGcmFnbWVudCwgcmVuZGVyX0RvbUZyYWdtZW50X3NoYXJlZF9pbnNlcnRIdG1sLCByZW5kZXJfRG9tRnJhZ21lbnRfVGV4dCwgcmVuZGVyX0RvbUZyYWdtZW50X0ludGVycG9sYXRvciwgcmVuZGVyX0RvbUZyYWdtZW50X1NlY3Rpb25fX1NlY3Rpb24sIHJlbmRlcl9Eb21GcmFnbWVudF9UcmlwbGUsIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X19FbGVtZW50LCByZW5kZXJfRG9tRnJhZ21lbnRfUGFydGlhbF9fUGFydGlhbCwgcmVuZGVyX0RvbUZyYWdtZW50X0NvbXBvbmVudF9fQ29tcG9uZW50LCByZW5kZXJfRG9tRnJhZ21lbnRfQ29tbWVudCwgY2lyY3VsYXIpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX3JlbmRlciA9IGZ1bmN0aW9uIChnZXRFbGVtZW50LCBtYWtlVHJhbnNpdGlvbk1hbmFnZXIsIHByZURvbVVwZGF0ZSwgcG9zdERvbVVwZGF0ZSwgRG9tRnJhZ21lbnQpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBjb21wbGV0ZSkge1xuICAgICAgICAgICAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9pbml0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2Fubm90IGNhbGwgcmFjdGl2ZS5yZW5kZXIoKSBkaXJlY3RseSEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25NYW5hZ2VyID0gdHJhbnNpdGlvbk1hbmFnZXIgPSBtYWtlVHJhbnNpdGlvbk1hbmFnZXIodGhpcywgY29tcGxldGUpO1xuICAgICAgICAgICAgdGhpcy5mcmFnbWVudCA9IG5ldyBEb21GcmFnbWVudCh7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRvcjogdGhpcy50ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICByb290OiB0aGlzLFxuICAgICAgICAgICAgICAgIG93bmVyOiB0aGlzLFxuICAgICAgICAgICAgICAgIHBOb2RlOiB0YXJnZXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHJlRG9tVXBkYXRlKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZCh0aGlzLmZyYWdtZW50LmRvY0ZyYWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9zdERvbVVwZGF0ZSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25NYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLnJlYWR5KCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICB9KHV0aWxzX2dldEVsZW1lbnQsIHNoYXJlZF9tYWtlVHJhbnNpdGlvbk1hbmFnZXIsIHNoYXJlZF9wcmVEb21VcGRhdGUsIHNoYXJlZF9wb3N0RG9tVXBkYXRlLCByZW5kZXJfRG9tRnJhZ21lbnRfX0RvbUZyYWdtZW50KTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9yZW5kZXJIVE1MID0gZnVuY3Rpb24gKHdhcm4pIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3YXJuKCdyZW5kZXJIVE1MKCkgaGFzIGJlZW4gZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb24uIFBsZWFzZSB1c2UgdG9IVE1MKCkgaW5zdGVhZCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9IVE1MKCk7XG4gICAgICAgIH07XG4gICAgfSh1dGlsc193YXJuKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV90b0hUTUwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJhZ21lbnQudG9TdHJpbmcoKTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfdGVhcmRvd24gPSBmdW5jdGlvbiAobWFrZVRyYW5zaXRpb25NYW5hZ2VyLCBjbGVhckNhY2hlKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNvbXBsZXRlKSB7XG4gICAgICAgICAgICB2YXIga2V5cGF0aCwgdHJhbnNpdGlvbk1hbmFnZXIsIHByZXZpb3VzVHJhbnNpdGlvbk1hbmFnZXI7XG4gICAgICAgICAgICB0aGlzLmZpcmUoJ3RlYXJkb3duJyk7XG4gICAgICAgICAgICBwcmV2aW91c1RyYW5zaXRpb25NYW5hZ2VyID0gdGhpcy5fdHJhbnNpdGlvbk1hbmFnZXI7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uTWFuYWdlciA9IHRyYW5zaXRpb25NYW5hZ2VyID0gbWFrZVRyYW5zaXRpb25NYW5hZ2VyKHRoaXMsIGNvbXBsZXRlKTtcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQudGVhcmRvd24odHJ1ZSk7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5fYW5pbWF0aW9uc1swXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbnNbMF0uc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChrZXlwYXRoIGluIHRoaXMuX2NhY2hlKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJDYWNoZSh0aGlzLCBrZXlwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25NYW5hZ2VyID0gcHJldmlvdXNUcmFuc2l0aW9uTWFuYWdlcjtcbiAgICAgICAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLnJlYWR5KCk7XG4gICAgICAgIH07XG4gICAgfShzaGFyZWRfbWFrZVRyYW5zaXRpb25NYW5hZ2VyLCBzaGFyZWRfY2xlYXJDYWNoZSk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX2FkZCA9IGZ1bmN0aW9uIChpc051bWVyaWMpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocm9vdCwga2V5cGF0aCwgZCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXlwYXRoICE9PSAnc3RyaW5nJyB8fCAhaXNOdW1lcmljKGQpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvb3QuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYWQgYXJndW1lbnRzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlID0gcm9vdC5nZXQoa2V5cGF0aCk7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNOdW1lcmljKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmIChyb290LmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGFkZCB0byBhIG5vbi1udW1lcmljIHZhbHVlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvb3Quc2V0KGtleXBhdGgsIHZhbHVlICsgZCk7XG4gICAgICAgIH07XG4gICAgfSh1dGlsc19pc051bWVyaWMpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX2FkZCA9IGZ1bmN0aW9uIChhZGQpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoa2V5cGF0aCwgZCkge1xuICAgICAgICAgICAgYWRkKHRoaXMsIGtleXBhdGgsIGQgPT09IHVuZGVmaW5lZCA/IDEgOiBkKTtcbiAgICAgICAgfTtcbiAgICB9KFJhY3RpdmVfcHJvdG90eXBlX3NoYXJlZF9hZGQpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX3N1YnRyYWN0ID0gZnVuY3Rpb24gKGFkZCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChrZXlwYXRoLCBkKSB7XG4gICAgICAgICAgICBhZGQodGhpcywga2V5cGF0aCwgZCA9PT0gdW5kZWZpbmVkID8gLTEgOiAtZCk7XG4gICAgICAgIH07XG4gICAgfShSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfYWRkKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV90b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGtleXBhdGgpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5cGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBhcmd1bWVudHMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmdldChrZXlwYXRoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0KGtleXBhdGgsICF2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX21lcmdlX21hcE9sZFRvTmV3SW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9sZEFycmF5LCBuZXdBcnJheSkge1xuICAgICAgICAgICAgdmFyIHVzZWRJbmRpY2VzLCBtYXBwZXIsIGZpcnN0VW51c2VkSW5kZXgsIG5ld0luZGljZXMsIGNoYW5nZWQ7XG4gICAgICAgICAgICB1c2VkSW5kaWNlcyA9IHt9O1xuICAgICAgICAgICAgZmlyc3RVbnVzZWRJbmRleCA9IDA7XG4gICAgICAgICAgICBtYXBwZXIgPSBmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCwgc3RhcnQsIGxlbjtcbiAgICAgICAgICAgICAgICBzdGFydCA9IGZpcnN0VW51c2VkSW5kZXg7XG4gICAgICAgICAgICAgICAgbGVuID0gbmV3QXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBuZXdBcnJheS5pbmRleE9mKGl0ZW0sIHN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBpbmRleCArIDE7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAodXNlZEluZGljZXNbaW5kZXhdICYmIHN0YXJ0IDwgbGVuKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IGZpcnN0VW51c2VkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RVbnVzZWRJbmRleCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVzZWRJbmRpY2VzW2luZGV4XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5ld0luZGljZXMgPSBvbGRBcnJheS5tYXAobWFwcGVyKTtcbiAgICAgICAgICAgIG5ld0luZGljZXMudW5jaGFuZ2VkID0gIWNoYW5nZWQ7XG4gICAgICAgICAgICByZXR1cm4gbmV3SW5kaWNlcztcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfbWVyZ2VfcXVldWVEZXBlbmRhbnRzID0gZnVuY3Rpb24gKHR5cGVzKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gcXVldWVEZXBlbmRhbnRzKGtleXBhdGgsIGRlcHMsIG1lcmdlUXVldWUsIHVwZGF0ZVF1ZXVlKSB7XG4gICAgICAgICAgICB2YXIgaSwgZGVwZW5kYW50O1xuICAgICAgICAgICAgaSA9IGRlcHMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGRlcGVuZGFudCA9IGRlcHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGRlcGVuZGFudC50eXBlID09PSB0eXBlcy5SRUZFUkVOQ0UpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kYW50LnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVwZW5kYW50LmtleXBhdGggPT09IGtleXBhdGggJiYgZGVwZW5kYW50LnR5cGUgPT09IHR5cGVzLlNFQ1RJT04gJiYgIWRlcGVuZGFudC5pbnZlcnRlZCAmJiBkZXBlbmRhbnQuZG9jRnJhZykge1xuICAgICAgICAgICAgICAgICAgICBtZXJnZVF1ZXVlW21lcmdlUXVldWUubGVuZ3RoXSA9IGRlcGVuZGFudDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVRdWV1ZVt1cGRhdGVRdWV1ZS5sZW5ndGhdID0gZGVwZW5kYW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcyk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfbWVyZ2VfX21lcmdlID0gZnVuY3Rpb24gKHdhcm4sIGlzQXJyYXksIGNsZWFyQ2FjaGUsIHByZURvbVVwZGF0ZSwgcHJvY2Vzc0RlZmVycmVkVXBkYXRlcywgbWFrZVRyYW5zaXRpb25NYW5hZ2VyLCBub3RpZnlEZXBlbmRhbnRzLCByZXBsYWNlRGF0YSwgbWFwT2xkVG9OZXdJbmRleCwgcXVldWVEZXBlbmRhbnRzKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgaWRlbnRpZmllcnMgPSB7fTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChrZXlwYXRoLCBhcnJheSwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRBcnJheSwgb2xkQXJyYXksIG5ld0FycmF5LCBpZGVudGlmaWVyLCBsZW5ndGhVbmNoYW5nZWQsIGksIG5ld0luZGljZXMsIG1lcmdlUXVldWUsIHVwZGF0ZVF1ZXVlLCBkZXBzQnlLZXlwYXRoLCBkZXBzLCB0cmFuc2l0aW9uTWFuYWdlciwgcHJldmlvdXNUcmFuc2l0aW9uTWFuYWdlciwgdXBzdHJlYW1RdWV1ZSwga2V5cztcbiAgICAgICAgICAgIGN1cnJlbnRBcnJheSA9IHRoaXMuZ2V0KGtleXBhdGgpO1xuICAgICAgICAgICAgaWYgKCFpc0FycmF5KGN1cnJlbnRBcnJheSkgfHwgIWlzQXJyYXkoYXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0KGtleXBhdGgsIGFycmF5LCBvcHRpb25zICYmIG9wdGlvbnMuY29tcGxldGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGVuZ3RoVW5jaGFuZ2VkID0gY3VycmVudEFycmF5Lmxlbmd0aCA9PT0gYXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5jb21wYXJlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29tcGFyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyID0gc3RyaW5naWZ5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuY29tcGFyZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpZmllciA9IGdldElkZW50aWZpZXIob3B0aW9ucy5jb21wYXJlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmNvbXBhcmUgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyID0gb3B0aW9ucy5jb21wYXJlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGBjb21wYXJlYCBvcHRpb24gbXVzdCBiZSBhIGZ1bmN0aW9uLCBvciBhIHN0cmluZyByZXByZXNlbnRpbmcgYW4gaWRlbnRpZnlpbmcgZmllbGQgKG9yIGB0cnVlYCB0byB1c2UgSlNPTi5zdHJpbmdpZnkpJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZEFycmF5ID0gY3VycmVudEFycmF5Lm1hcChpZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QXJyYXkgPSBhcnJheS5tYXAoaWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdNZXJnZSBvcGVyYXRpb246IGNvbXBhcmlzb24gZmFpbGVkLiBGYWxsaW5nIGJhY2sgdG8gaWRlbnRpdHkgY2hlY2tpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvbGRBcnJheSA9IGN1cnJlbnRBcnJheTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QXJyYXkgPSBhcnJheTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9sZEFycmF5ID0gY3VycmVudEFycmF5O1xuICAgICAgICAgICAgICAgIG5ld0FycmF5ID0gYXJyYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdJbmRpY2VzID0gbWFwT2xkVG9OZXdJbmRleChvbGRBcnJheSwgbmV3QXJyYXkpO1xuICAgICAgICAgICAgY2xlYXJDYWNoZSh0aGlzLCBrZXlwYXRoKTtcbiAgICAgICAgICAgIHJlcGxhY2VEYXRhKHRoaXMsIGtleXBhdGgsIGFycmF5KTtcbiAgICAgICAgICAgIGlmIChuZXdJbmRpY2VzLnVuY2hhbmdlZCAmJiBsZW5ndGhVbmNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aW91c1RyYW5zaXRpb25NYW5hZ2VyID0gdGhpcy5fdHJhbnNpdGlvbk1hbmFnZXI7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uTWFuYWdlciA9IHRyYW5zaXRpb25NYW5hZ2VyID0gbWFrZVRyYW5zaXRpb25NYW5hZ2VyKHRoaXMsIG9wdGlvbnMgJiYgb3B0aW9ucy5jb21wbGV0ZSk7XG4gICAgICAgICAgICBtZXJnZVF1ZXVlID0gW107XG4gICAgICAgICAgICB1cGRhdGVRdWV1ZSA9IFtdO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuX2RlcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBkZXBzQnlLZXlwYXRoID0gdGhpcy5fZGVwc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIWRlcHNCeUtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlcHMgPSBkZXBzQnlLZXlwYXRoW2tleXBhdGhdO1xuICAgICAgICAgICAgICAgIGlmIChkZXBzKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlRGVwZW5kYW50cyhrZXlwYXRoLCBkZXBzLCBtZXJnZVF1ZXVlLCB1cGRhdGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHByZURvbVVwZGF0ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG1lcmdlUXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJnZVF1ZXVlLnBvcCgpLm1lcmdlKG5ld0luZGljZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh1cGRhdGVRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVF1ZXVlLnBvcCgpLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvY2Vzc0RlZmVycmVkVXBkYXRlcyh0aGlzKTtcbiAgICAgICAgICAgIHVwc3RyZWFtUXVldWUgPSBbXTtcbiAgICAgICAgICAgIGtleXMgPSBrZXlwYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBrZXlzLnBvcCgpO1xuICAgICAgICAgICAgICAgIHVwc3RyZWFtUXVldWVbdXBzdHJlYW1RdWV1ZS5sZW5ndGhdID0ga2V5cy5qb2luKCcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub3RpZnlEZXBlbmRhbnRzLm11bHRpcGxlKHRoaXMsIHVwc3RyZWFtUXVldWUsIHRydWUpO1xuICAgICAgICAgICAgaWYgKG9sZEFycmF5Lmxlbmd0aCAhPT0gbmV3QXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbm90aWZ5RGVwZW5kYW50cyh0aGlzLCBrZXlwYXRoICsgJy5sZW5ndGgnLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25NYW5hZ2VyID0gcHJldmlvdXNUcmFuc2l0aW9uTWFuYWdlcjtcbiAgICAgICAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLnJlYWR5KCk7XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIHN0cmluZ2lmeShpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0SWRlbnRpZmllcihzdHIpIHtcbiAgICAgICAgICAgIGlmICghaWRlbnRpZmllcnNbc3RyXSkge1xuICAgICAgICAgICAgICAgIGlkZW50aWZpZXJzW3N0cl0gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVtzdHJdO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaWRlbnRpZmllcnNbc3RyXTtcbiAgICAgICAgfVxuICAgIH0odXRpbHNfd2FybiwgdXRpbHNfaXNBcnJheSwgc2hhcmVkX2NsZWFyQ2FjaGUsIHNoYXJlZF9wcmVEb21VcGRhdGUsIHNoYXJlZF9wcm9jZXNzRGVmZXJyZWRVcGRhdGVzLCBzaGFyZWRfbWFrZVRyYW5zaXRpb25NYW5hZ2VyLCBzaGFyZWRfbm90aWZ5RGVwZW5kYW50cywgUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX3JlcGxhY2VEYXRhLCBSYWN0aXZlX3Byb3RvdHlwZV9tZXJnZV9tYXBPbGRUb05ld0luZGV4LCBSYWN0aXZlX3Byb3RvdHlwZV9tZXJnZV9xdWV1ZURlcGVuZGFudHMpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX2RldGFjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mcmFnbWVudC5kZXRhY2goKTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfaW5zZXJ0ID0gZnVuY3Rpb24gKGdldEVsZW1lbnQpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBhbmNob3IpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IGdldEVsZW1lbnQodGFyZ2V0KTtcbiAgICAgICAgICAgIGFuY2hvciA9IGdldEVsZW1lbnQoYW5jaG9yKSB8fCBudWxsO1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgYSB2YWxpZCB0YXJnZXQgdG8gaW5zZXJ0IGludG8nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldC5pbnNlcnRCZWZvcmUodGhpcy5kZXRhY2goKSwgYW5jaG9yKTtcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQucE5vZGUgPSB0YXJnZXQ7XG4gICAgICAgIH07XG4gICAgfSh1dGlsc19nZXRFbGVtZW50KTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9fcHJvdG90eXBlID0gZnVuY3Rpb24gKGdldCwgc2V0LCB1cGRhdGUsIHVwZGF0ZU1vZGVsLCBhbmltYXRlLCBvbiwgb2ZmLCBvYnNlcnZlLCBmaXJlLCBmaW5kLCBmaW5kQWxsLCBmaW5kQ29tcG9uZW50LCBmaW5kQWxsQ29tcG9uZW50cywgcmVuZGVyLCByZW5kZXJIVE1MLCB0b0hUTUwsIHRlYXJkb3duLCBhZGQsIHN1YnRyYWN0LCB0b2dnbGUsIG1lcmdlLCBkZXRhY2gsIGluc2VydCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldDogZ2V0LFxuICAgICAgICAgICAgc2V0OiBzZXQsXG4gICAgICAgICAgICB1cGRhdGU6IHVwZGF0ZSxcbiAgICAgICAgICAgIHVwZGF0ZU1vZGVsOiB1cGRhdGVNb2RlbCxcbiAgICAgICAgICAgIGFuaW1hdGU6IGFuaW1hdGUsXG4gICAgICAgICAgICBvbjogb24sXG4gICAgICAgICAgICBvZmY6IG9mZixcbiAgICAgICAgICAgIG9ic2VydmU6IG9ic2VydmUsXG4gICAgICAgICAgICBmaXJlOiBmaXJlLFxuICAgICAgICAgICAgZmluZDogZmluZCxcbiAgICAgICAgICAgIGZpbmRBbGw6IGZpbmRBbGwsXG4gICAgICAgICAgICBmaW5kQ29tcG9uZW50OiBmaW5kQ29tcG9uZW50LFxuICAgICAgICAgICAgZmluZEFsbENvbXBvbmVudHM6IGZpbmRBbGxDb21wb25lbnRzLFxuICAgICAgICAgICAgcmVuZGVySFRNTDogcmVuZGVySFRNTCxcbiAgICAgICAgICAgIHRvSFRNTDogdG9IVE1MLFxuICAgICAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgICAgICB0ZWFyZG93bjogdGVhcmRvd24sXG4gICAgICAgICAgICBhZGQ6IGFkZCxcbiAgICAgICAgICAgIHN1YnRyYWN0OiBzdWJ0cmFjdCxcbiAgICAgICAgICAgIHRvZ2dsZTogdG9nZ2xlLFxuICAgICAgICAgICAgbWVyZ2U6IG1lcmdlLFxuICAgICAgICAgICAgZGV0YWNoOiBkZXRhY2gsXG4gICAgICAgICAgICBpbnNlcnQ6IGluc2VydFxuICAgICAgICB9O1xuICAgIH0oUmFjdGl2ZV9wcm90b3R5cGVfZ2V0X19nZXQsIFJhY3RpdmVfcHJvdG90eXBlX3NldCwgUmFjdGl2ZV9wcm90b3R5cGVfdXBkYXRlLCBSYWN0aXZlX3Byb3RvdHlwZV91cGRhdGVNb2RlbCwgUmFjdGl2ZV9wcm90b3R5cGVfYW5pbWF0ZV9fYW5pbWF0ZSwgUmFjdGl2ZV9wcm90b3R5cGVfb24sIFJhY3RpdmVfcHJvdG90eXBlX29mZiwgUmFjdGl2ZV9wcm90b3R5cGVfb2JzZXJ2ZV9fb2JzZXJ2ZSwgUmFjdGl2ZV9wcm90b3R5cGVfZmlyZSwgUmFjdGl2ZV9wcm90b3R5cGVfZmluZCwgUmFjdGl2ZV9wcm90b3R5cGVfZmluZEFsbCwgUmFjdGl2ZV9wcm90b3R5cGVfZmluZENvbXBvbmVudCwgUmFjdGl2ZV9wcm90b3R5cGVfZmluZEFsbENvbXBvbmVudHMsIFJhY3RpdmVfcHJvdG90eXBlX3JlbmRlciwgUmFjdGl2ZV9wcm90b3R5cGVfcmVuZGVySFRNTCwgUmFjdGl2ZV9wcm90b3R5cGVfdG9IVE1MLCBSYWN0aXZlX3Byb3RvdHlwZV90ZWFyZG93biwgUmFjdGl2ZV9wcm90b3R5cGVfYWRkLCBSYWN0aXZlX3Byb3RvdHlwZV9zdWJ0cmFjdCwgUmFjdGl2ZV9wcm90b3R5cGVfdG9nZ2xlLCBSYWN0aXZlX3Byb3RvdHlwZV9tZXJnZV9fbWVyZ2UsIFJhY3RpdmVfcHJvdG90eXBlX2RldGFjaCwgUmFjdGl2ZV9wcm90b3R5cGVfaW5zZXJ0KTtcbnZhciBleHRlbmRfcmVnaXN0cmllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAncGFydGlhbHMnLFxuICAgICAgICAgICAgJ3RyYW5zaXRpb25zJyxcbiAgICAgICAgICAgICdldmVudHMnLFxuICAgICAgICAgICAgJ2NvbXBvbmVudHMnLFxuICAgICAgICAgICAgJ2RlY29yYXRvcnMnLFxuICAgICAgICAgICAgJ2RhdGEnXG4gICAgICAgIF07XG4gICAgfSgpO1xudmFyIGV4dGVuZF9pbml0T3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAnZWwnLFxuICAgICAgICAgICAgJ3RlbXBsYXRlJyxcbiAgICAgICAgICAgICdjb21wbGV0ZScsXG4gICAgICAgICAgICAnbW9kaWZ5QXJyYXlzJyxcbiAgICAgICAgICAgICdtYWdpYycsXG4gICAgICAgICAgICAndHdvd2F5JyxcbiAgICAgICAgICAgICdsYXp5JyxcbiAgICAgICAgICAgICdhcHBlbmQnLFxuICAgICAgICAgICAgJ3ByZXNlcnZlV2hpdGVzcGFjZScsXG4gICAgICAgICAgICAnc2FuaXRpemUnLFxuICAgICAgICAgICAgJ3N0cmlwQ29tbWVudHMnLFxuICAgICAgICAgICAgJ25vSW50cm8nLFxuICAgICAgICAgICAgJ3RyYW5zaXRpb25zRW5hYmxlZCcsXG4gICAgICAgICAgICAnYWRhcHRvcnMnXG4gICAgICAgIF07XG4gICAgfSgpO1xudmFyIGV4dGVuZF9pbmhlcml0RnJvbVBhcmVudCA9IGZ1bmN0aW9uIChyZWdpc3RyaWVzLCBpbml0T3B0aW9ucywgY3JlYXRlKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKENoaWxkLCBQYXJlbnQpIHtcbiAgICAgICAgICAgIHJlZ2lzdHJpZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICBpZiAoUGFyZW50W3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgICBDaGlsZFtwcm9wZXJ0eV0gPSBjcmVhdGUoUGFyZW50W3Byb3BlcnR5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbml0T3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIENoaWxkW3Byb3BlcnR5XSA9IFBhcmVudFtwcm9wZXJ0eV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9KGV4dGVuZF9yZWdpc3RyaWVzLCBleHRlbmRfaW5pdE9wdGlvbnMsIHV0aWxzX2NyZWF0ZSk7XG52YXIgZXh0ZW5kX3dyYXBNZXRob2QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1ldGhvZCwgc3VwZXJNZXRob2QpIHtcbiAgICAgICAgICAgIGlmICgvX3N1cGVyLy50ZXN0KG1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3N1cGVyID0gdGhpcy5fc3VwZXIsIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSBzdXBlck1ldGhvZDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gbWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N1cGVyID0gX3N1cGVyO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIGV4dGVuZF91dGlsc19hdWdtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIGV4dGVuZF9pbmhlcml0RnJvbUNoaWxkUHJvcHMgPSBmdW5jdGlvbiAocmVnaXN0cmllcywgaW5pdE9wdGlvbnMsIHdyYXBNZXRob2QsIGF1Z21lbnQpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBibGFja2xpc3QsIGJsYWNrbGlzdGVkO1xuICAgICAgICBibGFja2xpc3QgPSByZWdpc3RyaWVzLmNvbmNhdChpbml0T3B0aW9ucyk7XG4gICAgICAgIGJsYWNrbGlzdGVkID0ge307XG4gICAgICAgIGJsYWNrbGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgYmxhY2tsaXN0ZWRbcHJvcGVydHldID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoQ2hpbGQsIGNoaWxkUHJvcHMpIHtcbiAgICAgICAgICAgIHZhciBrZXksIG1lbWJlcjtcbiAgICAgICAgICAgIHJlZ2lzdHJpZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBjaGlsZFByb3BzW3Byb3BlcnR5XTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKENoaWxkW3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXVnbWVudChDaGlsZFtwcm9wZXJ0eV0sIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENoaWxkW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbml0T3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGNoaWxkUHJvcHNbcHJvcGVydHldO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIENoaWxkW3Byb3BlcnR5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ2hpbGRbcHJvcGVydHldID0gd3JhcE1ldGhvZCh2YWx1ZSwgQ2hpbGRbcHJvcGVydHldKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENoaWxkW3Byb3BlcnR5XSA9IGNoaWxkUHJvcHNbcHJvcGVydHldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBjaGlsZFByb3BzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkUHJvcHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhYmxhY2tsaXN0ZWRba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBtZW1iZXIgPSBjaGlsZFByb3BzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtYmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBDaGlsZC5wcm90b3R5cGVba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ2hpbGQucHJvdG90eXBlW2tleV0gPSB3cmFwTWV0aG9kKG1lbWJlciwgQ2hpbGQucHJvdG90eXBlW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ2hpbGQucHJvdG90eXBlW2tleV0gPSBtZW1iZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfShleHRlbmRfcmVnaXN0cmllcywgZXh0ZW5kX2luaXRPcHRpb25zLCBleHRlbmRfd3JhcE1ldGhvZCwgZXh0ZW5kX3V0aWxzX2F1Z21lbnQpO1xudmFyIGV4dGVuZF9leHRyYWN0SW5saW5lUGFydGlhbHMgPSBmdW5jdGlvbiAoaXNPYmplY3QsIGF1Z21lbnQpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoQ2hpbGQsIGNoaWxkUHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChpc09iamVjdChDaGlsZC50ZW1wbGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUNoaWxkLnBhcnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIENoaWxkLnBhcnRpYWxzID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGF1Z21lbnQoQ2hpbGQucGFydGlhbHMsIENoaWxkLnRlbXBsYXRlLnBhcnRpYWxzKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRQcm9wcy5wYXJ0aWFscykge1xuICAgICAgICAgICAgICAgICAgICBhdWdtZW50KENoaWxkLnBhcnRpYWxzLCBjaGlsZFByb3BzLnBhcnRpYWxzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgQ2hpbGQudGVtcGxhdGUgPSBDaGlsZC50ZW1wbGF0ZS5tYWluO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0odXRpbHNfaXNPYmplY3QsIGV4dGVuZF91dGlsc19hdWdtZW50KTtcbnZhciBleHRlbmRfY29uZGl0aW9uYWxseVBhcnNlVGVtcGxhdGUgPSBmdW5jdGlvbiAoZXJyb3JzLCBpc0NsaWVudCwgcGFyc2UpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoQ2hpbGQpIHtcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZUVsO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBDaGlsZC50ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXBhcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMubWlzc2luZ1BhcnNlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChDaGlsZC50ZW1wbGF0ZS5jaGFyQXQoMCkgPT09ICcjJyAmJiBpc0NsaWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoQ2hpbGQudGVtcGxhdGUuc3Vic3RyaW5nKDEpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBsYXRlRWwgJiYgdGVtcGxhdGVFbC50YWdOYW1lID09PSAnU0NSSVBUJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ2hpbGQudGVtcGxhdGUgPSBwYXJzZSh0ZW1wbGF0ZUVsLmlubmVySFRNTCwgQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCB0ZW1wbGF0ZSBlbGVtZW50ICgnICsgQ2hpbGQudGVtcGxhdGUgKyAnKScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgQ2hpbGQudGVtcGxhdGUgPSBwYXJzZShDaGlsZC50ZW1wbGF0ZSwgQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ19lcnJvcnMsIGNvbmZpZ19pc0NsaWVudCwgcGFyc2VfX3BhcnNlKTtcbnZhciBleHRlbmRfY29uZGl0aW9uYWxseVBhcnNlUGFydGlhbHMgPSBmdW5jdGlvbiAoZXJyb3JzLCBwYXJzZSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChDaGlsZCkge1xuICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgIGlmIChDaGlsZC5wYXJ0aWFscykge1xuICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIENoaWxkLnBhcnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDaGlsZC5wYXJ0aWFscy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHR5cGVvZiBDaGlsZC5wYXJ0aWFsc1trZXldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMubWlzc2luZ1BhcnNlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBDaGlsZC5wYXJ0aWFsc1trZXldID0gcGFyc2UoQ2hpbGQucGFydGlhbHNba2V5XSwgQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oY29uZmlnX2Vycm9ycywgcGFyc2VfX3BhcnNlKTtcbnZhciBleHRlbmRfdXRpbHNfY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHt9LCBrZXk7XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciB1dGlsc19leHRlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgdmFyIHByb3AsIHNvdXJjZSwgc291cmNlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICB3aGlsZSAoc291cmNlID0gc291cmNlcy5zaGlmdCgpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChwcm9wIGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciBSYWN0aXZlX2luaXRpYWxpc2UgPSBmdW5jdGlvbiAoaXNDbGllbnQsIGVycm9ycywgd2FybiwgY3JlYXRlLCBleHRlbmQsIGRlZmluZVByb3BlcnR5LCBkZWZpbmVQcm9wZXJ0aWVzLCBnZXRFbGVtZW50LCBpc09iamVjdCwgbWFnaWNBZGFwdG9yLCBwYXJzZSkge1xuICAgICAgICBcbiAgICAgICAgdmFyIGdldE9iamVjdCwgZ2V0QXJyYXksIGRlZmF1bHRPcHRpb25zLCByZWdpc3RyaWVzO1xuICAgICAgICBnZXRPYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH07XG4gICAgICAgIGdldEFycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0T3B0aW9ucyA9IGNyZWF0ZShudWxsKTtcbiAgICAgICAgZGVmaW5lUHJvcGVydGllcyhkZWZhdWx0T3B0aW9ucywge1xuICAgICAgICAgICAgcHJlc2VydmVXaGl0ZXNwYWNlOiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhcHBlbmQ6IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR3b3dheToge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb2RpZnlBcnJheXM6IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGdldE9iamVjdFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxhenk6IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlYnVnOiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmFuc2l0aW9uczoge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGdldE9iamVjdFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlY29yYXRvcnM6IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBnZXRPYmplY3RcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBnZXRPYmplY3RcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub0ludHJvOiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmFuc2l0aW9uc0VuYWJsZWQ6IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWFnaWM6IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkYXB0b3JzOiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZ2V0QXJyYXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlZ2lzdHJpZXMgPSBbXG4gICAgICAgICAgICAnY29tcG9uZW50cycsXG4gICAgICAgICAgICAnZGVjb3JhdG9ycycsXG4gICAgICAgICAgICAnZXZlbnRzJyxcbiAgICAgICAgICAgICdwYXJ0aWFscycsXG4gICAgICAgICAgICAndHJhbnNpdGlvbnMnLFxuICAgICAgICAgICAgJ2RhdGEnXG4gICAgICAgIF07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocmFjdGl2ZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGtleSwgdGVtcGxhdGUsIHRlbXBsYXRlRWwsIHBhcnNlZFRlbXBsYXRlO1xuICAgICAgICAgICAgZm9yIChrZXkgaW4gZGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uc1trZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gdHlwZW9mIGRlZmF1bHRPcHRpb25zW2tleV0gPT09ICdmdW5jdGlvbicgPyBkZWZhdWx0T3B0aW9uc1trZXldKCkgOiBkZWZhdWx0T3B0aW9uc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmluZVByb3BlcnRpZXMocmFjdGl2ZSwge1xuICAgICAgICAgICAgICAgIF9pbml0aW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2d1aWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByLCB2O1xuICAgICAgICAgICAgICAgICAgICAgICAgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gYyA9PSAneCcgPyByIDogciAmIDMgfCA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX3N1YnM6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNyZWF0ZShudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfY2FjaGU6IHsgdmFsdWU6IHt9IH0sXG4gICAgICAgICAgICAgICAgX2NhY2hlTWFwOiB7IHZhbHVlOiBjcmVhdGUobnVsbCkgfSxcbiAgICAgICAgICAgICAgICBfZGVwczogeyB2YWx1ZTogW10gfSxcbiAgICAgICAgICAgICAgICBfZGVwc01hcDogeyB2YWx1ZTogY3JlYXRlKG51bGwpIH0sXG4gICAgICAgICAgICAgICAgX3BhdHRlcm5PYnNlcnZlcnM6IHsgdmFsdWU6IFtdIH0sXG4gICAgICAgICAgICAgICAgX3BlbmRpbmdSZXNvbHV0aW9uOiB7IHZhbHVlOiBbXSB9LFxuICAgICAgICAgICAgICAgIF9kZWZlcnJlZDogeyB2YWx1ZToge30gfSxcbiAgICAgICAgICAgICAgICBfZXZhbHVhdG9yczogeyB2YWx1ZTogY3JlYXRlKG51bGwpIH0sXG4gICAgICAgICAgICAgICAgX3R3b3dheUJpbmRpbmdzOiB7IHZhbHVlOiB7fSB9LFxuICAgICAgICAgICAgICAgIF90cmFuc2l0aW9uTWFuYWdlcjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9hbmltYXRpb25zOiB7IHZhbHVlOiBbXSB9LFxuICAgICAgICAgICAgICAgIG5vZGVzOiB7IHZhbHVlOiB7fSB9LFxuICAgICAgICAgICAgICAgIF93cmFwcGVkOiB7IHZhbHVlOiBjcmVhdGUobnVsbCkgfSxcbiAgICAgICAgICAgICAgICBfbGl2ZVF1ZXJpZXM6IHsgdmFsdWU6IFtdIH0sXG4gICAgICAgICAgICAgICAgX2xpdmVDb21wb25lbnRRdWVyaWVzOiB7IHZhbHVlOiBbXSB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRlZmluZVByb3BlcnRpZXMocmFjdGl2ZS5fZGVmZXJyZWQsIHtcbiAgICAgICAgICAgICAgICBhdHRyczogeyB2YWx1ZTogW10gfSxcbiAgICAgICAgICAgICAgICBldmFsczogeyB2YWx1ZTogW10gfSxcbiAgICAgICAgICAgICAgICBzZWxlY3RWYWx1ZXM6IHsgdmFsdWU6IFtdIH0sXG4gICAgICAgICAgICAgICAgY2hlY2tib3hlczogeyB2YWx1ZTogW10gfSxcbiAgICAgICAgICAgICAgICByYWRpb3M6IHsgdmFsdWU6IFtdIH0sXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJzOiB7IHZhbHVlOiBbXSB9LFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25zOiB7IHZhbHVlOiBbXSB9LFxuICAgICAgICAgICAgICAgIGxpdmVRdWVyaWVzOiB7IHZhbHVlOiBbXSB9LFxuICAgICAgICAgICAgICAgIGRlY29yYXRvcnM6IHsgdmFsdWU6IFtdIH0sXG4gICAgICAgICAgICAgICAgZm9jdXNhYmxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmFjdGl2ZS5hZGFwdG9ycyA9IG9wdGlvbnMuYWRhcHRvcnM7XG4gICAgICAgICAgICByYWN0aXZlLm1vZGlmeUFycmF5cyA9IG9wdGlvbnMubW9kaWZ5QXJyYXlzO1xuICAgICAgICAgICAgcmFjdGl2ZS5tYWdpYyA9IG9wdGlvbnMubWFnaWM7XG4gICAgICAgICAgICByYWN0aXZlLnR3b3dheSA9IG9wdGlvbnMudHdvd2F5O1xuICAgICAgICAgICAgcmFjdGl2ZS5sYXp5ID0gb3B0aW9ucy5sYXp5O1xuICAgICAgICAgICAgcmFjdGl2ZS5kZWJ1ZyA9IG9wdGlvbnMuZGVidWc7XG4gICAgICAgICAgICBpZiAocmFjdGl2ZS5tYWdpYyAmJiAhbWFnaWNBZGFwdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHZXR0ZXJzIGFuZCBzZXR0ZXJzIChtYWdpYyBtb2RlKSBhcmUgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLl9wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBkZWZpbmVQcm9wZXJ0eShyYWN0aXZlLCAnX3BhcmVudCcsIHsgdmFsdWU6IG9wdGlvbnMuX3BhcmVudCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmVsKSB7XG4gICAgICAgICAgICAgICAgcmFjdGl2ZS5lbCA9IGdldEVsZW1lbnQob3B0aW9ucy5lbCk7XG4gICAgICAgICAgICAgICAgaWYgKCFyYWN0aXZlLmVsICYmIHJhY3RpdmUuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBjb250YWluZXIgZWxlbWVudCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmV2ZW50RGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB3YXJuKCdyYWN0aXZlLmV2ZW50RGVmaW5pdGlvbnMgaGFzIGJlZW4gZGVwcmVjYXRlZCBpbiBmYXZvdXIgb2YgcmFjdGl2ZS5ldmVudHMuIFN1cHBvcnQgd2lsbCBiZSByZW1vdmVkIGluIGZ1dHVyZSB2ZXJzaW9ucycpO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuZXZlbnRzID0gb3B0aW9ucy5ldmVudERlZmluaXRpb25zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVnaXN0cmllcy5mb3JFYWNoKGZ1bmN0aW9uIChyZWdpc3RyeSkge1xuICAgICAgICAgICAgICAgIGlmIChyYWN0aXZlLmNvbnN0cnVjdG9yW3JlZ2lzdHJ5XSkge1xuICAgICAgICAgICAgICAgICAgICByYWN0aXZlW3JlZ2lzdHJ5XSA9IGV4dGVuZChjcmVhdGUocmFjdGl2ZS5jb25zdHJ1Y3RvcltyZWdpc3RyeV0gfHwge30pLCBvcHRpb25zW3JlZ2lzdHJ5XSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zW3JlZ2lzdHJ5XSkge1xuICAgICAgICAgICAgICAgICAgICByYWN0aXZlW3JlZ2lzdHJ5XSA9IG9wdGlvbnNbcmVnaXN0cnldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXBhcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcnMubWlzc2luZ1BhcnNlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0ZW1wbGF0ZS5jaGFyQXQoMCkgPT09ICcjJyAmJiBpc0NsaWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGUuc3Vic3RyaW5nKDEpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBsYXRlRWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZFRlbXBsYXRlID0gcGFyc2UodGVtcGxhdGVFbC5pbm5lckhUTUwsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCB0ZW1wbGF0ZSBlbGVtZW50ICgnICsgdGVtcGxhdGUgKyAnKScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkVGVtcGxhdGUgPSBwYXJzZSh0ZW1wbGF0ZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJzZWRUZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KHBhcnNlZFRlbXBsYXRlKSkge1xuICAgICAgICAgICAgICAgIGV4dGVuZChyYWN0aXZlLnBhcnRpYWxzLCBwYXJzZWRUZW1wbGF0ZS5wYXJ0aWFscyk7XG4gICAgICAgICAgICAgICAgcGFyc2VkVGVtcGxhdGUgPSBwYXJzZWRUZW1wbGF0ZS5tYWluO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcnNlZFRlbXBsYXRlICYmIHBhcnNlZFRlbXBsYXRlLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgcGFyc2VkVGVtcGxhdGVbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkVGVtcGxhdGUgPSBwYXJzZWRUZW1wbGF0ZVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJhY3RpdmUudGVtcGxhdGUgPSBwYXJzZWRUZW1wbGF0ZTtcbiAgICAgICAgICAgIGV4dGVuZChyYWN0aXZlLnBhcnRpYWxzLCBvcHRpb25zLnBhcnRpYWxzKTtcbiAgICAgICAgICAgIHJhY3RpdmUucGFyc2VPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHByZXNlcnZlV2hpdGVzcGFjZTogb3B0aW9ucy5wcmVzZXJ2ZVdoaXRlc3BhY2UsXG4gICAgICAgICAgICAgICAgc2FuaXRpemU6IG9wdGlvbnMuc2FuaXRpemUsXG4gICAgICAgICAgICAgICAgc3RyaXBDb21tZW50czogb3B0aW9ucy5zdHJpcENvbW1lbnRzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmFjdGl2ZS50cmFuc2l0aW9uc0VuYWJsZWQgPSBvcHRpb25zLm5vSW50cm8gPyBmYWxzZSA6IG9wdGlvbnMudHJhbnNpdGlvbnNFbmFibGVkO1xuICAgICAgICAgICAgaWYgKGlzQ2xpZW50ICYmICFyYWN0aXZlLmVsKSB7XG4gICAgICAgICAgICAgICAgcmFjdGl2ZS5lbCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyYWN0aXZlLmVsICYmICFvcHRpb25zLmFwcGVuZCkge1xuICAgICAgICAgICAgICAgIHJhY3RpdmUuZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYWN0aXZlLnJlbmRlcihyYWN0aXZlLmVsLCBvcHRpb25zLmNvbXBsZXRlKTtcbiAgICAgICAgICAgIHJhY3RpdmUudHJhbnNpdGlvbnNFbmFibGVkID0gb3B0aW9ucy50cmFuc2l0aW9uc0VuYWJsZWQ7XG4gICAgICAgICAgICByYWN0aXZlLl9pbml0aW5nID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgfShjb25maWdfaXNDbGllbnQsIGNvbmZpZ19lcnJvcnMsIHV0aWxzX3dhcm4sIHV0aWxzX2NyZWF0ZSwgdXRpbHNfZXh0ZW5kLCB1dGlsc19kZWZpbmVQcm9wZXJ0eSwgdXRpbHNfZGVmaW5lUHJvcGVydGllcywgdXRpbHNfZ2V0RWxlbWVudCwgdXRpbHNfaXNPYmplY3QsIFJhY3RpdmVfcHJvdG90eXBlX2dldF9tYWdpY0FkYXB0b3IsIHBhcnNlX19wYXJzZSk7XG52YXIgZXh0ZW5kX2luaXRDaGlsZEluc3RhbmNlID0gZnVuY3Rpb24gKGZpbGxHYXBzLCBpbml0T3B0aW9ucywgY2xvbmUsIHdyYXBNZXRob2QsIGluaXRpYWxpc2UpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY2hpbGQsIENoaWxkLCBvcHRpb25zKSB7XG4gICAgICAgICAgICBpbml0T3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IG9wdGlvbnNbcHJvcGVydHldLCBkZWZhdWx0VmFsdWUgPSBDaGlsZFtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNbcHJvcGVydHldID0gd3JhcE1ldGhvZCh2YWx1ZSwgZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1twcm9wZXJ0eV0gPSBkZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY2hpbGQuYmVmb3JlSW5pdCkge1xuICAgICAgICAgICAgICAgIGNoaWxkLmJlZm9yZUluaXQob3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbml0aWFsaXNlKGNoaWxkLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChjaGlsZC5pbml0KSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuaW5pdChvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KHV0aWxzX2ZpbGxHYXBzLCBleHRlbmRfaW5pdE9wdGlvbnMsIGV4dGVuZF91dGlsc19jbG9uZSwgZXh0ZW5kX3dyYXBNZXRob2QsIFJhY3RpdmVfaW5pdGlhbGlzZSk7XG52YXIgZXh0ZW5kX19leHRlbmQgPSBmdW5jdGlvbiAoY3JlYXRlLCBpbmhlcml0RnJvbVBhcmVudCwgaW5oZXJpdEZyb21DaGlsZFByb3BzLCBleHRyYWN0SW5saW5lUGFydGlhbHMsIGNvbmRpdGlvbmFsbHlQYXJzZVRlbXBsYXRlLCBjb25kaXRpb25hbGx5UGFyc2VQYXJ0aWFscywgaW5pdENoaWxkSW5zdGFuY2UsIGNpcmN1bGFyKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgUmFjdGl2ZTtcbiAgICAgICAgY2lyY3VsYXIucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBSYWN0aXZlID0gY2lyY3VsYXIuUmFjdGl2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY2hpbGRQcm9wcykge1xuICAgICAgICAgICAgdmFyIFBhcmVudCA9IHRoaXMsIENoaWxkO1xuICAgICAgICAgICAgQ2hpbGQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGluaXRDaGlsZEluc3RhbmNlKHRoaXMsIENoaWxkLCBvcHRpb25zIHx8IHt9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBDaGlsZC5wcm90b3R5cGUgPSBjcmVhdGUoUGFyZW50LnByb3RvdHlwZSk7XG4gICAgICAgICAgICBDaGlsZC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDaGlsZDtcbiAgICAgICAgICAgIGluaGVyaXRGcm9tUGFyZW50KENoaWxkLCBQYXJlbnQpO1xuICAgICAgICAgICAgaW5oZXJpdEZyb21DaGlsZFByb3BzKENoaWxkLCBjaGlsZFByb3BzKTtcbiAgICAgICAgICAgIGNvbmRpdGlvbmFsbHlQYXJzZVRlbXBsYXRlKENoaWxkKTtcbiAgICAgICAgICAgIGV4dHJhY3RJbmxpbmVQYXJ0aWFscyhDaGlsZCwgY2hpbGRQcm9wcyk7XG4gICAgICAgICAgICBjb25kaXRpb25hbGx5UGFyc2VQYXJ0aWFscyhDaGlsZCk7XG4gICAgICAgICAgICBDaGlsZC5leHRlbmQgPSBQYXJlbnQuZXh0ZW5kO1xuICAgICAgICAgICAgcmV0dXJuIENoaWxkO1xuICAgICAgICB9O1xuICAgIH0odXRpbHNfY3JlYXRlLCBleHRlbmRfaW5oZXJpdEZyb21QYXJlbnQsIGV4dGVuZF9pbmhlcml0RnJvbUNoaWxkUHJvcHMsIGV4dGVuZF9leHRyYWN0SW5saW5lUGFydGlhbHMsIGV4dGVuZF9jb25kaXRpb25hbGx5UGFyc2VUZW1wbGF0ZSwgZXh0ZW5kX2NvbmRpdGlvbmFsbHlQYXJzZVBhcnRpYWxzLCBleHRlbmRfaW5pdENoaWxkSW5zdGFuY2UsIGNpcmN1bGFyKTtcbnZhciBSYWN0aXZlX19SYWN0aXZlID0gZnVuY3Rpb24gKHN2ZywgY3JlYXRlLCBkZWZpbmVQcm9wZXJ0aWVzLCBwcm90b3R5cGUsIHBhcnRpYWxSZWdpc3RyeSwgYWRhcHRvclJlZ2lzdHJ5LCBlYXNpbmdSZWdpc3RyeSwgUmFjdGl2ZV9leHRlbmQsIHBhcnNlLCBpbml0aWFsaXNlLCBjaXJjdWxhcikge1xuICAgICAgICBcbiAgICAgICAgdmFyIFJhY3RpdmUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgaW5pdGlhbGlzZSh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgICAgZGVmaW5lUHJvcGVydGllcyhSYWN0aXZlLCB7XG4gICAgICAgICAgICBwcm90b3R5cGU6IHsgdmFsdWU6IHByb3RvdHlwZSB9LFxuICAgICAgICAgICAgcGFydGlhbHM6IHsgdmFsdWU6IHBhcnRpYWxSZWdpc3RyeSB9LFxuICAgICAgICAgICAgYWRhcHRvcnM6IHsgdmFsdWU6IGFkYXB0b3JSZWdpc3RyeSB9LFxuICAgICAgICAgICAgZWFzaW5nOiB7IHZhbHVlOiBlYXNpbmdSZWdpc3RyeSB9LFxuICAgICAgICAgICAgdHJhbnNpdGlvbnM6IHsgdmFsdWU6IHt9IH0sXG4gICAgICAgICAgICBldmVudHM6IHsgdmFsdWU6IHt9IH0sXG4gICAgICAgICAgICBjb21wb25lbnRzOiB7IHZhbHVlOiB7fSB9LFxuICAgICAgICAgICAgZGVjb3JhdG9yczogeyB2YWx1ZToge30gfSxcbiAgICAgICAgICAgIHN2ZzogeyB2YWx1ZTogc3ZnIH0sXG4gICAgICAgICAgICBWRVJTSU9OOiB7IHZhbHVlOiAnMC4zLjknIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFJhY3RpdmUuZXZlbnREZWZpbml0aW9ucyA9IFJhY3RpdmUuZXZlbnRzO1xuICAgICAgICBSYWN0aXZlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJhY3RpdmU7XG4gICAgICAgIFJhY3RpdmUuZGVsaW1pdGVycyA9IFtcbiAgICAgICAgICAgICd7eycsXG4gICAgICAgICAgICAnfX0nXG4gICAgICAgIF07XG4gICAgICAgIFJhY3RpdmUudHJpcGxlRGVsaW1pdGVycyA9IFtcbiAgICAgICAgICAgICd7e3snLFxuICAgICAgICAgICAgJ319fSdcbiAgICAgICAgXTtcbiAgICAgICAgUmFjdGl2ZS5leHRlbmQgPSBSYWN0aXZlX2V4dGVuZDtcbiAgICAgICAgUmFjdGl2ZS5wYXJzZSA9IHBhcnNlO1xuICAgICAgICBjaXJjdWxhci5SYWN0aXZlID0gUmFjdGl2ZTtcbiAgICAgICAgcmV0dXJuIFJhY3RpdmU7XG4gICAgfShjb25maWdfc3ZnLCB1dGlsc19jcmVhdGUsIHV0aWxzX2RlZmluZVByb3BlcnRpZXMsIFJhY3RpdmVfcHJvdG90eXBlX19wcm90b3R5cGUsIHJlZ2lzdHJpZXNfcGFydGlhbHMsIHJlZ2lzdHJpZXNfYWRhcHRvcnMsIHJlZ2lzdHJpZXNfZWFzaW5nLCBleHRlbmRfX2V4dGVuZCwgcGFyc2VfX3BhcnNlLCBSYWN0aXZlX2luaXRpYWxpc2UsIGNpcmN1bGFyKTtcbnZhciBSYWN0aXZlID0gZnVuY3Rpb24gKFJhY3RpdmUsIGNpcmN1bGFyKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk5vZGUgJiYgIXdpbmRvdy5Ob2RlLnByb3RvdHlwZS5jb250YWlucyAmJiB3aW5kb3cuSFRNTEVsZW1lbnQgJiYgd2luZG93LkhUTUxFbGVtZW50LnByb3RvdHlwZS5jb250YWlucykge1xuICAgICAgICAgICAgd2luZG93Lk5vZGUucHJvdG90eXBlLmNvbnRhaW5zID0gd2luZG93LkhUTUxFbGVtZW50LnByb3RvdHlwZS5jb250YWlucztcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoY2lyY3VsYXIubGVuZ3RoKSB7XG4gICAgICAgICAgICBjaXJjdWxhci5wb3AoKSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSYWN0aXZlO1xuICAgIH0oUmFjdGl2ZV9fUmFjdGl2ZSwgY2lyY3VsYXIpO1xuLy8gZXhwb3J0IGFzIENvbW1vbiBKUyBtb2R1bGUuLi5cbmlmICggdHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cyApIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBSYWN0aXZlO1xufVxuXG4vLyAuLi4gb3IgYXMgQU1EIG1vZHVsZVxuZWxzZSBpZiAoIHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kICkge1xuXHRkZWZpbmUoIGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gUmFjdGl2ZTtcblx0fSk7XG59XG5cbi8vIC4uLiBvciBhcyBicm93c2VyIGdsb2JhbFxuZWxzZSB7XG5cdGdsb2JhbC5SYWN0aXZlID0gUmFjdGl2ZTtcbn1cblxufSggdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0aGlzICkpOyJdfQ==
(1)
});
