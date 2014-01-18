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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvYXp1L0Ryb3Bib3gvd29ya3NwYWNlL0phdmFTY3JpcHQvcHJvamVjdC90ZWNoLXZpZGVvLXJzcy1zZWFyY2hlci9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYXp1L0Ryb3Bib3gvd29ya3NwYWNlL0phdmFTY3JpcHQvcHJvamVjdC90ZWNoLXZpZGVvLXJzcy1zZWFyY2hlci9hcHAvYXBwLmpzIiwiL1VzZXJzL2F6dS9Ecm9wYm94L3dvcmtzcGFjZS9KYXZhU2NyaXB0L3Byb2plY3QvdGVjaC12aWRlby1yc3Mtc2VhcmNoZXIvYXBwL21vZGVsL3NlYXJjaC1tb2RlbC5qcyIsIi9Vc2Vycy9henUvRHJvcGJveC93b3Jrc3BhY2UvSmF2YVNjcmlwdC9wcm9qZWN0L3RlY2gtdmlkZW8tcnNzLXNlYXJjaGVyL2Jvd2VyX2NvbXBvbmVudHMvcmFjdGl2ZS9idWlsZC9SYWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGF6dSBvbiAyMDE0LzAxLzE4LlxuICogTElDRU5TRSA6IE1JVFxuICovXG52YXIgUmFjdGl2ZSA9IHJlcXVpcmUoXCIuLy4uL2Jvd2VyX2NvbXBvbmVudHMvcmFjdGl2ZS9idWlsZC9SYWN0aXZlLmpzXCIpO1xudmFyIG1vZGVsID0gcmVxdWlyZShcIi4vbW9kZWwvc2VhcmNoLW1vZGVsXCIpO1xudmFyIHJhY3RpdmUgPSBuZXcgUmFjdGl2ZSh7XG4gICAgZWw6ICdjb250YWluZXInLFxuICAgIHRlbXBsYXRlOiAnI215VGVtcGxhdGUnLFxuICAgIGRhdGE6IHsgZ3JlZXRpbmc6ICdIZXknLCByZWNpcGllbnQ6ICd3b3JsZCcgfVxufSk7XG5cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHNlYXJjaEluZGV4OiBbXG4gICAgICAgIFwiaTFcIixcbiAgICAgICAgXCJpM1wiLFxuICAgICAgICBcImluZGV4XCJcbiAgICBdXG59OyIsIi8qXG5cdFxuXHRSYWN0aXZlIC0gdjAuMy45IC0gMjAxMy0xMi0zMVxuXHQ9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdE5leHQtZ2VuZXJhdGlvbiBET00gbWFuaXB1bGF0aW9uIC0gaHR0cDovL3JhY3RpdmVqcy5vcmdcblx0Rm9sbG93IEBSYWN0aXZlSlMgZm9yIHVwZGF0ZXNcblxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdENvcHlyaWdodCAyMDEzIDIwMTMgUmljaCBIYXJyaXMgYW5kIGNvbnRyaWJ1dG9yc1xuXG5cdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG5cdG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG5cdGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dFxuXHRyZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSxcblx0Y29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlXG5cdFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nXG5cdGNvbmRpdGlvbnM6XG5cblx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcblx0aW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcblx0RVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTXG5cdE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG5cdE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUXG5cdEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLFxuXHRXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcblx0RlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUlxuXHRPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbiovXG5cbihmdW5jdGlvbiAoIGdsb2JhbCApIHtcblxuXG5cbnZhciBjb25maWdfc3ZnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZG9jdW1lbnQgJiYgZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZSgnaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNCYXNpY1N0cnVjdHVyZScsICcxLjEnKTtcbiAgICB9KCk7XG52YXIgdXRpbHNfY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIGNyZWF0ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgICBjcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgRiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAocHJvdG8sIHByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmo7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIEYucHJvdG90eXBlID0gcHJvdG87XG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IG5ldyBGKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMob2JqLCBwcm9wcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGU7XG4gICAgfSgpO1xudmFyIGNvbmZpZ19uYW1lc3BhY2VzID0ge1xuICAgICAgICBodG1sOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsXG4gICAgICAgIG1hdGhtbDogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwnLFxuICAgICAgICBzdmc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgIHhsaW5rOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsXG4gICAgICAgIHhtbDogJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZScsXG4gICAgICAgIHhtbG5zOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nXG4gICAgfTtcbnZhciB1dGlsc19jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKHN2ZywgbmFtZXNwYWNlcykge1xuICAgICAgICBcbiAgICAgICAgaWYgKCFzdmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodHlwZSwgbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAobnMgJiYgbnMgIT09IG5hbWVzcGFjZXMuaHRtbCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyAnVGhpcyBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgbmFtZXNwYWNlcyBvdGhlciB0aGFuIGh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwuIFRoZSBtb3N0IGxpa2VseSBjYXVzZSBvZiB0aGlzIGVycm9yIGlzIHRoYXQgeW91XFwncmUgdHJ5aW5nIHRvIHJlbmRlciBTVkcgaW4gYW4gb2xkZXIgYnJvd3Nlci4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9SYWN0aXZlSlMvUmFjdGl2ZS93aWtpL1NWRy1hbmQtb2xkZXItYnJvd3NlcnMgZm9yIG1vcmUgaW5mb3JtYXRpb24nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHR5cGUsIG5zKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFucykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhucywgdHlwZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfShjb25maWdfc3ZnLCBjb25maWdfbmFtZXNwYWNlcyk7XG52YXIgY29uZmlnX2lzQ2xpZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KCk7XG52YXIgdXRpbHNfZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAoaXNDbGllbnQpIHtcbiAgICAgICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICd0ZXN0JywgeyB2YWx1ZTogMCB9KTtcbiAgICAgICAgICAgIGlmIChpc0NsaWVudCkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSwgJ3Rlc3QnLCB7IHZhbHVlOiAwIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaiwgcHJvcCwgZGVzYykge1xuICAgICAgICAgICAgICAgIG9ialtwcm9wXSA9IGRlc2MudmFsdWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfShjb25maWdfaXNDbGllbnQpO1xudmFyIHV0aWxzX2RlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAoY3JlYXRlRWxlbWVudCwgZGVmaW5lUHJvcGVydHksIGlzQ2xpZW50KSB7XG4gICAgICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh7fSwgeyB0ZXN0OiB7IHZhbHVlOiAwIH0gfSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNDbGllbnQpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjcmVhdGVFbGVtZW50KCdkaXYnKSwgeyB0ZXN0OiB7IHZhbHVlOiAwIH0gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnRpZXM7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIHByb3BzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3A7XG4gICAgICAgICAgICAgICAgZm9yIChwcm9wIGluIHByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCBwcm9wc1twcm9wXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSh1dGlsc19jcmVhdGVFbGVtZW50LCB1dGlsc19kZWZpbmVQcm9wZXJ0eSwgY29uZmlnX2lzQ2xpZW50KTtcbnZhciB1dGlsc19ub3JtYWxpc2VLZXlwYXRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlZ2V4ID0gL1xcW1xccyooXFwqfFswLTldfFsxLTldWzAtOV0rKVxccypcXF0vZztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChrZXlwYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gKGtleXBhdGggfHwgJycpLnJlcGxhY2UocmVnZXgsICcuJDEnKTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgcmVnaXN0cmllc19hZGFwdG9ycyA9IHt9O1xudmFyIGNvbmZpZ190eXBlcyA9IHtcbiAgICAgICAgVEVYVDogMSxcbiAgICAgICAgSU5URVJQT0xBVE9SOiAyLFxuICAgICAgICBUUklQTEU6IDMsXG4gICAgICAgIFNFQ1RJT046IDQsXG4gICAgICAgIElOVkVSVEVEOiA1LFxuICAgICAgICBDTE9TSU5HOiA2LFxuICAgICAgICBFTEVNRU5UOiA3LFxuICAgICAgICBQQVJUSUFMOiA4LFxuICAgICAgICBDT01NRU5UOiA5LFxuICAgICAgICBERUxJTUNIQU5HRTogMTAsXG4gICAgICAgIE1VU1RBQ0hFOiAxMSxcbiAgICAgICAgVEFHOiAxMixcbiAgICAgICAgQVRUUklCVVRFOiAxMyxcbiAgICAgICAgQ09NUE9ORU5UOiAxNSxcbiAgICAgICAgTlVNQkVSX0xJVEVSQUw6IDIwLFxuICAgICAgICBTVFJJTkdfTElURVJBTDogMjEsXG4gICAgICAgIEFSUkFZX0xJVEVSQUw6IDIyLFxuICAgICAgICBPQkpFQ1RfTElURVJBTDogMjMsXG4gICAgICAgIEJPT0xFQU5fTElURVJBTDogMjQsXG4gICAgICAgIEdMT0JBTDogMjYsXG4gICAgICAgIEtFWV9WQUxVRV9QQUlSOiAyNyxcbiAgICAgICAgUkVGRVJFTkNFOiAzMCxcbiAgICAgICAgUkVGSU5FTUVOVDogMzEsXG4gICAgICAgIE1FTUJFUjogMzIsXG4gICAgICAgIFBSRUZJWF9PUEVSQVRPUjogMzMsXG4gICAgICAgIEJSQUNLRVRFRDogMzQsXG4gICAgICAgIENPTkRJVElPTkFMOiAzNSxcbiAgICAgICAgSU5GSVhfT1BFUkFUT1I6IDM2LFxuICAgICAgICBJTlZPQ0FUSU9OOiA0MFxuICAgIH07XG52YXIgdXRpbHNfaXNBcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGhpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHRoaW5nKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgc2hhcmVkX2NsZWFyQ2FjaGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gY2xlYXJDYWNoZShyYWN0aXZlLCBrZXlwYXRoKSB7XG4gICAgICAgICAgICB2YXIgY2FjaGVNYXAsIHdyYXBwZWRQcm9wZXJ0eTtcbiAgICAgICAgICAgIGlmICh3cmFwcGVkUHJvcGVydHkgPSByYWN0aXZlLl93cmFwcGVkW2tleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHdyYXBwZWRQcm9wZXJ0eS50ZWFyZG93bigpICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICByYWN0aXZlLl93cmFwcGVkW2tleXBhdGhdID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYWN0aXZlLl9jYWNoZVtrZXlwYXRoXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChjYWNoZU1hcCA9IHJhY3RpdmUuX2NhY2hlTWFwW2tleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGNhY2hlTWFwLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckNhY2hlKHJhY3RpdmUsIGNhY2hlTWFwLnBvcCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHNoYXJlZF9nZXRWYWx1ZUZyb21DaGVja2JveGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyYWN0aXZlLCBrZXlwYXRoKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUsIGNoZWNrYm94ZXMsIGNoZWNrYm94LCBsZW4sIGksIHJvb3RFbDtcbiAgICAgICAgICAgIHZhbHVlID0gW107XG4gICAgICAgICAgICByb290RWwgPSByYWN0aXZlLnJlbmRlcmVkID8gcmFjdGl2ZS5lbCA6IHJhY3RpdmUuZnJhZ21lbnQuZG9jRnJhZztcbiAgICAgICAgICAgIGNoZWNrYm94ZXMgPSByb290RWwucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdW25hbWU9XCJ7eycgKyBrZXlwYXRoICsgJ319XCJdJyk7XG4gICAgICAgICAgICBsZW4gPSBjaGVja2JveGVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94ID0gY2hlY2tib3hlc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tib3guaGFzQXR0cmlidXRlKCdjaGVja2VkJykgfHwgY2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZVt2YWx1ZS5sZW5ndGhdID0gY2hlY2tib3guX3JhY3RpdmUudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciBzaGFyZWRfcHJlRG9tVXBkYXRlID0gZnVuY3Rpb24gKGdldFZhbHVlRnJvbUNoZWNrYm94ZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocmFjdGl2ZSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkLCBldmFsdWF0b3IsIHNlbGVjdFZhbHVlLCBhdHRyaWJ1dGUsIGtleXBhdGgsIHJhZGlvO1xuICAgICAgICAgICAgZGVmZXJyZWQgPSByYWN0aXZlLl9kZWZlcnJlZDtcbiAgICAgICAgICAgIHdoaWxlIChldmFsdWF0b3IgPSBkZWZlcnJlZC5ldmFscy5wb3AoKSkge1xuICAgICAgICAgICAgICAgIGV2YWx1YXRvci51cGRhdGUoKS5kZWZlcnJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKHNlbGVjdFZhbHVlID0gZGVmZXJyZWQuc2VsZWN0VmFsdWVzLnBvcCgpKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUuZGVmZXJyZWRVcGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChhdHRyaWJ1dGUgPSBkZWZlcnJlZC5hdHRycy5wb3AoKSkge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS51cGRhdGUoKS5kZWZlcnJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGtleXBhdGggPSBkZWZlcnJlZC5jaGVja2JveGVzLnBvcCgpKSB7XG4gICAgICAgICAgICAgICAgcmFjdGl2ZS5zZXQoa2V5cGF0aCwgZ2V0VmFsdWVGcm9tQ2hlY2tib3hlcyhyYWN0aXZlLCBrZXlwYXRoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAocmFkaW8gPSBkZWZlcnJlZC5yYWRpb3MucG9wKCkpIHtcbiAgICAgICAgICAgICAgICByYWRpby51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KHNoYXJlZF9nZXRWYWx1ZUZyb21DaGVja2JveGVzKTtcbnZhciBzaGFyZWRfcG9zdERvbVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocmFjdGl2ZSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkLCBmb2N1c2FibGUsIHF1ZXJ5LCBkZWNvcmF0b3IsIHRyYW5zaXRpb24sIG9ic2VydmVyO1xuICAgICAgICAgICAgZGVmZXJyZWQgPSByYWN0aXZlLl9kZWZlcnJlZDtcbiAgICAgICAgICAgIGlmIChmb2N1c2FibGUgPSBkZWZlcnJlZC5mb2N1c2FibGUpIHtcbiAgICAgICAgICAgICAgICBmb2N1c2FibGUuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5mb2N1c2FibGUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKHF1ZXJ5ID0gZGVmZXJyZWQubGl2ZVF1ZXJpZXMucG9wKCkpIHtcbiAgICAgICAgICAgICAgICBxdWVyeS5fc29ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGRlY29yYXRvciA9IGRlZmVycmVkLmRlY29yYXRvcnMucG9wKCkpIHtcbiAgICAgICAgICAgICAgICBkZWNvcmF0b3IuaW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKHRyYW5zaXRpb24gPSBkZWZlcnJlZC50cmFuc2l0aW9ucy5wb3AoKSkge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb24uaW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKG9ic2VydmVyID0gZGVmZXJyZWQub2JzZXJ2ZXJzLnBvcCgpKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIudXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHNoYXJlZF9tYWtlVHJhbnNpdGlvbk1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWFrZVRyYW5zaXRpb25NYW5hZ2VyID0gZnVuY3Rpb24gKHJvb3QsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIsIGVsZW1lbnRzVG9EZXRhY2gsIGRldGFjaE5vZGVzLCBub2RlSGFzTm9UcmFuc2l0aW9uaW5nQ2hpbGRyZW47XG4gICAgICAgICAgICBpZiAocm9vdC5fcGFyZW50ICYmIHJvb3QuX3BhcmVudC5fdHJhbnNpdGlvbk1hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdC5fcGFyZW50Ll90cmFuc2l0aW9uTWFuYWdlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsZW1lbnRzVG9EZXRhY2ggPSBbXTtcbiAgICAgICAgICAgIGRldGFjaE5vZGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpLCBlbGVtZW50O1xuICAgICAgICAgICAgICAgIGkgPSBlbGVtZW50c1RvRGV0YWNoLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50c1RvRGV0YWNoW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZUhhc05vVHJhbnNpdGlvbmluZ0NoaWxkcmVuKGVsZW1lbnQubm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZGV0YWNoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50c1RvRGV0YWNoLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBub2RlSGFzTm9UcmFuc2l0aW9uaW5nQ2hpbGRyZW4gPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBpLCBjYW5kaWRhdGU7XG4gICAgICAgICAgICAgICAgaSA9IHRyYW5zaXRpb25NYW5hZ2VyLmFjdGl2ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSB0cmFuc2l0aW9uTWFuYWdlci5hY3RpdmVbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmNvbnRhaW5zKGNhbmRpZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0cmFuc2l0aW9uTWFuYWdlciA9IHtcbiAgICAgICAgICAgICAgICBhY3RpdmU6IFtdLFxuICAgICAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLmFjdGl2ZVt0cmFuc2l0aW9uTWFuYWdlci5hY3RpdmUubGVuZ3RoXSA9IG5vZGU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb3A6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB0cmFuc2l0aW9uTWFuYWdlci5hY3RpdmUuaW5kZXhPZihub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLmFjdGl2ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICBkZXRhY2hOb2RlcygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRyYW5zaXRpb25NYW5hZ2VyLmFjdGl2ZS5sZW5ndGggJiYgdHJhbnNpdGlvbk1hbmFnZXIuX3JlYWR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uTWFuYWdlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwocm9vdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFjaE5vZGVzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLl9yZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHJhbnNpdGlvbk1hbmFnZXIuYWN0aXZlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbk1hbmFnZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGV0YWNoV2hlblJlYWR5OiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50c1RvRGV0YWNoW2VsZW1lbnRzVG9EZXRhY2gubGVuZ3RoXSA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2l0aW9uTWFuYWdlcjtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG1ha2VUcmFuc2l0aW9uTWFuYWdlcjtcbiAgICB9KCk7XG52YXIgc2hhcmVkX25vdGlmeURlcGVuZGFudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgbm90aWZ5RGVwZW5kYW50cywgbGFzdEtleSwgc3Rhck1hcHMgPSB7fTtcbiAgICAgICAgbGFzdEtleSA9IC9bXlxcLl0rJC87XG4gICAgICAgIG5vdGlmeURlcGVuZGFudHMgPSBmdW5jdGlvbiAocmFjdGl2ZSwga2V5cGF0aCwgb25seURpcmVjdCkge1xuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICBpZiAocmFjdGl2ZS5fcGF0dGVybk9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBub3RpZnlQYXR0ZXJuT2JzZXJ2ZXJzKHJhY3RpdmUsIGtleXBhdGgsIGtleXBhdGgsIG9ubHlEaXJlY3QsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHJhY3RpdmUuX2RlcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBub3RpZnlEZXBlbmRhbnRzQXRQcmlvcml0eShyYWN0aXZlLCBrZXlwYXRoLCBpLCBvbmx5RGlyZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbm90aWZ5RGVwZW5kYW50cy5tdWx0aXBsZSA9IGZ1bmN0aW9uIChyYWN0aXZlLCBrZXlwYXRocywgb25seURpcmVjdCkge1xuICAgICAgICAgICAgdmFyIGksIGosIGxlbjtcbiAgICAgICAgICAgIGxlbiA9IGtleXBhdGhzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChyYWN0aXZlLl9wYXR0ZXJuT2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGkgPSBsZW47XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBub3RpZnlQYXR0ZXJuT2JzZXJ2ZXJzKHJhY3RpdmUsIGtleXBhdGhzW2ldLCBrZXlwYXRoc1tpXSwgb25seURpcmVjdCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHJhY3RpdmUuX2RlcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAocmFjdGl2ZS5fZGVwc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBqID0gbGVuO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RpZnlEZXBlbmRhbnRzQXRQcmlvcml0eShyYWN0aXZlLCBrZXlwYXRoc1tqXSwgaSwgb25seURpcmVjdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub3RpZnlEZXBlbmRhbnRzO1xuICAgICAgICBmdW5jdGlvbiBub3RpZnlEZXBlbmRhbnRzQXRQcmlvcml0eShyYWN0aXZlLCBrZXlwYXRoLCBwcmlvcml0eSwgb25seURpcmVjdCkge1xuICAgICAgICAgICAgdmFyIGRlcHNCeUtleXBhdGggPSByYWN0aXZlLl9kZXBzW3ByaW9yaXR5XTtcbiAgICAgICAgICAgIGlmICghZGVwc0J5S2V5cGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZUFsbChkZXBzQnlLZXlwYXRoW2tleXBhdGhdKTtcbiAgICAgICAgICAgIGlmIChvbmx5RGlyZWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzY2FkZShyYWN0aXZlLl9kZXBzTWFwW2tleXBhdGhdLCByYWN0aXZlLCBwcmlvcml0eSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQWxsKGRlcHMpIHtcbiAgICAgICAgICAgIHZhciBpLCBsZW47XG4gICAgICAgICAgICBpZiAoZGVwcykge1xuICAgICAgICAgICAgICAgIGxlbiA9IGRlcHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBkZXBzW2ldLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjYXNjYWRlKGNoaWxkRGVwcywgcmFjdGl2ZSwgcHJpb3JpdHksIG9ubHlEaXJlY3QpIHtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgaWYgKGNoaWxkRGVwcykge1xuICAgICAgICAgICAgICAgIGkgPSBjaGlsZERlcHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZ5RGVwZW5kYW50c0F0UHJpb3JpdHkocmFjdGl2ZSwgY2hpbGREZXBzW2ldLCBwcmlvcml0eSwgb25seURpcmVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5vdGlmeVBhdHRlcm5PYnNlcnZlcnMocmFjdGl2ZSwgcmVnaXN0ZXJlZEtleXBhdGgsIGFjdHVhbEtleXBhdGgsIGlzUGFyZW50T2ZDaGFuZ2VkS2V5cGF0aCwgaXNUb3BMZXZlbENhbGwpIHtcbiAgICAgICAgICAgIHZhciBpLCBwYXR0ZXJuT2JzZXJ2ZXIsIGNoaWxkcmVuLCBjaGlsZCwga2V5LCBjaGlsZEFjdHVhbEtleXBhdGgsIHBvdGVudGlhbFdpbGRjYXJkTWF0Y2hlcywgY2FzY2FkZTtcbiAgICAgICAgICAgIGkgPSByYWN0aXZlLl9wYXR0ZXJuT2JzZXJ2ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBwYXR0ZXJuT2JzZXJ2ZXIgPSByYWN0aXZlLl9wYXR0ZXJuT2JzZXJ2ZXJzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuT2JzZXJ2ZXIucmVnZXgudGVzdChhY3R1YWxLZXlwYXRoKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuT2JzZXJ2ZXIudXBkYXRlKGFjdHVhbEtleXBhdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1BhcmVudE9mQ2hhbmdlZEtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNjYWRlID0gZnVuY3Rpb24gKGtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4gPSByYWN0aXZlLl9kZXBzTWFwW2tleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXkgPSBsYXN0S2V5LmV4ZWMoY2hpbGQpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRBY3R1YWxLZXlwYXRoID0gYWN0dWFsS2V5cGF0aCArICcuJyArIGtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmeVBhdHRlcm5PYnNlcnZlcnMocmFjdGl2ZSwgY2hpbGQsIGNoaWxkQWN0dWFsS2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGlzVG9wTGV2ZWxDYWxsKSB7XG4gICAgICAgICAgICAgICAgcG90ZW50aWFsV2lsZGNhcmRNYXRjaGVzID0gZ2V0UG90ZW50aWFsV2lsZGNhcmRNYXRjaGVzKGFjdHVhbEtleXBhdGgpO1xuICAgICAgICAgICAgICAgIHBvdGVudGlhbFdpbGRjYXJkTWF0Y2hlcy5mb3JFYWNoKGNhc2NhZGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYXNjYWRlKHJlZ2lzdGVyZWRLZXlwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRQb3RlbnRpYWxXaWxkY2FyZE1hdGNoZXMoa2V5cGF0aCkge1xuICAgICAgICAgICAgdmFyIGtleXMsIHN0YXJNYXAsIG1hcHBlciwgaSwgcmVzdWx0LCB3aWxkY2FyZEtleXBhdGg7XG4gICAgICAgICAgICBrZXlzID0ga2V5cGF0aC5zcGxpdCgnLicpO1xuICAgICAgICAgICAgc3Rhck1hcCA9IGdldFN0YXJNYXAoa2V5cy5sZW5ndGgpO1xuICAgICAgICAgICAgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBtYXBwZXIgPSBmdW5jdGlvbiAoc3RhciwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFyID8gJyonIDoga2V5c1tpXTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpID0gc3Rhck1hcC5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgd2lsZGNhcmRLZXlwYXRoID0gc3Rhck1hcFtpXS5tYXAobWFwcGVyKS5qb2luKCcuJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHRbd2lsZGNhcmRLZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSB3aWxkY2FyZEtleXBhdGg7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFt3aWxkY2FyZEtleXBhdGhdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldFN0YXJNYXAobnVtKSB7XG4gICAgICAgICAgICB2YXIgb25lcyA9ICcnLCBtYXgsIGJpbmFyeSwgc3Rhck1hcCwgbWFwcGVyLCBpO1xuICAgICAgICAgICAgaWYgKCFzdGFyTWFwc1tudW1dKSB7XG4gICAgICAgICAgICAgICAgc3Rhck1hcCA9IFtdO1xuICAgICAgICAgICAgICAgIHdoaWxlIChvbmVzLmxlbmd0aCA8IG51bSkge1xuICAgICAgICAgICAgICAgICAgICBvbmVzICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1heCA9IHBhcnNlSW50KG9uZXMsIDIpO1xuICAgICAgICAgICAgICAgIG1hcHBlciA9IGZ1bmN0aW9uIChkaWdpdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGlnaXQgPT09ICcxJztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPD0gbWF4OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYmluYXJ5ID0gaS50b1N0cmluZygyKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGJpbmFyeS5sZW5ndGggPCBudW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeSA9ICcwJyArIGJpbmFyeTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdGFyTWFwW2ldID0gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGJpbmFyeSwgbWFwcGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3Rhck1hcHNbbnVtXSA9IHN0YXJNYXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3Rhck1hcHNbbnVtXTtcbiAgICAgICAgfVxuICAgIH0oKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9nZXRfYXJyYXlBZGFwdG9yID0gZnVuY3Rpb24gKHR5cGVzLCBkZWZpbmVQcm9wZXJ0eSwgaXNBcnJheSwgY2xlYXJDYWNoZSwgcHJlRG9tVXBkYXRlLCBwb3N0RG9tVXBkYXRlLCBtYWtlVHJhbnNpdGlvbk1hbmFnZXIsIG5vdGlmeURlcGVuZGFudHMpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBhcnJheUFkYXB0b3IsIG5vdGlmeUFycmF5RGVwZW5kYW50cywgQXJyYXlXcmFwcGVyLCBwYXRjaEFycmF5TWV0aG9kcywgdW5wYXRjaEFycmF5TWV0aG9kcywgcGF0Y2hlZEFycmF5UHJvdG8sIHRlc3RPYmosIG11dGF0b3JNZXRob2RzLCBub29wLCBlcnJvck1lc3NhZ2U7XG4gICAgICAgIGFycmF5QWRhcHRvciA9IHtcbiAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0FycmF5KG9iamVjdCkgJiYgKCFvYmplY3QuX3JhY3RpdmUgfHwgIW9iamVjdC5fcmFjdGl2ZS5zZXR0aW5nKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3cmFwOiBmdW5jdGlvbiAocmFjdGl2ZSwgYXJyYXksIGtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5V3JhcHBlcihyYWN0aXZlLCBhcnJheSwga2V5cGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIEFycmF5V3JhcHBlciA9IGZ1bmN0aW9uIChyYWN0aXZlLCBhcnJheSwga2V5cGF0aCkge1xuICAgICAgICAgICAgdGhpcy5yb290ID0gcmFjdGl2ZTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBhcnJheTtcbiAgICAgICAgICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgICAgICAgICBpZiAoIWFycmF5Ll9yYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkoYXJyYXksICdfcmFjdGl2ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXJzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlczogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwYXRjaEFycmF5TWV0aG9kcyhhcnJheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWFycmF5Ll9yYWN0aXZlLmluc3RhbmNlc1tyYWN0aXZlLl9ndWlkXSkge1xuICAgICAgICAgICAgICAgIGFycmF5Ll9yYWN0aXZlLmluc3RhbmNlc1tyYWN0aXZlLl9ndWlkXSA9IDA7XG4gICAgICAgICAgICAgICAgYXJyYXkuX3JhY3RpdmUuaW5zdGFuY2VzLnB1c2gocmFjdGl2ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcnJheS5fcmFjdGl2ZS5pbnN0YW5jZXNbcmFjdGl2ZS5fZ3VpZF0gKz0gMTtcbiAgICAgICAgICAgIGFycmF5Ll9yYWN0aXZlLndyYXBwZXJzLnB1c2godGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIEFycmF5V3JhcHBlci5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhcnJheSwgc3RvcmFnZSwgd3JhcHBlcnMsIGluc3RhbmNlcywgaW5kZXg7XG4gICAgICAgICAgICAgICAgYXJyYXkgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgICAgIHN0b3JhZ2UgPSBhcnJheS5fcmFjdGl2ZTtcbiAgICAgICAgICAgICAgICB3cmFwcGVycyA9IHN0b3JhZ2Uud3JhcHBlcnM7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VzID0gc3RvcmFnZS5pbnN0YW5jZXM7XG4gICAgICAgICAgICAgICAgaWYgKHN0b3JhZ2Uuc2V0dGluZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluZGV4ID0gd3JhcHBlcnMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3cmFwcGVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIGlmICghd3JhcHBlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhcnJheS5fcmFjdGl2ZTtcbiAgICAgICAgICAgICAgICAgICAgdW5wYXRjaEFycmF5TWV0aG9kcyh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZXNbdGhpcy5yb290Ll9ndWlkXSAtPSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWluc3RhbmNlc1t0aGlzLnJvb3QuX2d1aWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGluc3RhbmNlcy5pbmRleE9mKHRoaXMucm9vdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbm90aWZ5QXJyYXlEZXBlbmRhbnRzID0gZnVuY3Rpb24gKGFycmF5LCBtZXRob2ROYW1lLCBhcmdzKSB7XG4gICAgICAgICAgICB2YXIgbm90aWZ5S2V5cGF0aERlcGVuZGFudHMsIHF1ZXVlRGVwZW5kYW50cywgd3JhcHBlcnMsIHdyYXBwZXIsIGk7XG4gICAgICAgICAgICBub3RpZnlLZXlwYXRoRGVwZW5kYW50cyA9IGZ1bmN0aW9uIChyb290LCBrZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlcHNCeUtleXBhdGgsIGRlcHMsIGtleXMsIHVwc3RyZWFtUXVldWUsIHNtYXJ0VXBkYXRlUXVldWUsIGR1bWJVcGRhdGVRdWV1ZSwgaSwgY2hhbmdlZCwgc3RhcnQsIGVuZCwgY2hpbGRLZXlwYXRoLCBsZW5ndGhVbmNoYW5nZWQ7XG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZE5hbWUgPT09ICdzb3J0JyB8fCBtZXRob2ROYW1lID09PSAncmV2ZXJzZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcm9vdC5zZXQoa2V5cGF0aCwgYXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsZWFyQ2FjaGUocm9vdCwga2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgc21hcnRVcGRhdGVRdWV1ZSA9IFtdO1xuICAgICAgICAgICAgICAgIGR1bWJVcGRhdGVRdWV1ZSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCByb290Ll9kZXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlcHNCeUtleXBhdGggPSByb290Ll9kZXBzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRlcHNCeUtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRlcHMgPSBkZXBzQnlLZXlwYXRoW2tleXBhdGhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVwcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWVEZXBlbmRhbnRzKGtleXBhdGgsIGRlcHMsIHNtYXJ0VXBkYXRlUXVldWUsIGR1bWJVcGRhdGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVEb21VcGRhdGUocm9vdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoc21hcnRVcGRhdGVRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbWFydFVwZGF0ZVF1ZXVlLnBvcCgpLnNtYXJ0VXBkYXRlKG1ldGhvZE5hbWUsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGR1bWJVcGRhdGVRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdW1iVXBkYXRlUXVldWUucG9wKCkudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZE5hbWUgPT09ICdzcGxpY2UnICYmIGFyZ3MubGVuZ3RoID4gMiAmJiBhcmdzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWQgPSBNYXRoLm1pbihhcmdzWzFdLCBhcmdzLmxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgICAgICAgICBzdGFydCA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgY2hhbmdlZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3NbMV0gPT09IGFyZ3MubGVuZ3RoIC0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoVW5jaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEtleXBhdGggPSBrZXlwYXRoICsgJy4nICsgaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmeURlcGVuZGFudHMocm9vdCwgY2hpbGRLZXlwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmVEb21VcGRhdGUocm9vdCk7XG4gICAgICAgICAgICAgICAgdXBzdHJlYW1RdWV1ZSA9IFtdO1xuICAgICAgICAgICAgICAgIGtleXMgPSBrZXlwYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHVwc3RyZWFtUXVldWVbdXBzdHJlYW1RdWV1ZS5sZW5ndGhdID0ga2V5cy5qb2luKCcuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5vdGlmeURlcGVuZGFudHMubXVsdGlwbGUocm9vdCwgdXBzdHJlYW1RdWV1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFsZW5ndGhVbmNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZ5RGVwZW5kYW50cyhyb290LCBrZXlwYXRoICsgJy5sZW5ndGgnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcXVldWVEZXBlbmRhbnRzID0gZnVuY3Rpb24gKGtleXBhdGgsIGRlcHMsIHNtYXJ0VXBkYXRlUXVldWUsIGR1bWJVcGRhdGVRdWV1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBrLCBkZXBlbmRhbnQ7XG4gICAgICAgICAgICAgICAgayA9IGRlcHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChrLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kYW50ID0gZGVwc1trXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcGVuZGFudC50eXBlID09PSB0eXBlcy5SRUZFUkVOQ0UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcGVuZGFudC51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZXBlbmRhbnQua2V5cGF0aCA9PT0ga2V5cGF0aCAmJiBkZXBlbmRhbnQudHlwZSA9PT0gdHlwZXMuU0VDVElPTiAmJiAhZGVwZW5kYW50LmludmVydGVkICYmIGRlcGVuZGFudC5kb2NGcmFnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFydFVwZGF0ZVF1ZXVlW3NtYXJ0VXBkYXRlUXVldWUubGVuZ3RoXSA9IGRlcGVuZGFudDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1bWJVcGRhdGVRdWV1ZVtkdW1iVXBkYXRlUXVldWUubGVuZ3RoXSA9IGRlcGVuZGFudDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3cmFwcGVycyA9IGFycmF5Ll9yYWN0aXZlLndyYXBwZXJzO1xuICAgICAgICAgICAgaSA9IHdyYXBwZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICB3cmFwcGVyID0gd3JhcHBlcnNbaV07XG4gICAgICAgICAgICAgICAgbm90aWZ5S2V5cGF0aERlcGVuZGFudHMod3JhcHBlci5yb290LCB3cmFwcGVyLmtleXBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBwYXRjaGVkQXJyYXlQcm90byA9IFtdO1xuICAgICAgICBtdXRhdG9yTWV0aG9kcyA9IFtcbiAgICAgICAgICAgICdwb3AnLFxuICAgICAgICAgICAgJ3B1c2gnLFxuICAgICAgICAgICAgJ3JldmVyc2UnLFxuICAgICAgICAgICAgJ3NoaWZ0JyxcbiAgICAgICAgICAgICdzb3J0JyxcbiAgICAgICAgICAgICdzcGxpY2UnLFxuICAgICAgICAgICAgJ3Vuc2hpZnQnXG4gICAgICAgIF07XG4gICAgICAgIG5vb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH07XG4gICAgICAgIG11dGF0b3JNZXRob2RzLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBtZXRob2QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCwgaW5zdGFuY2VzLCBpbnN0YW5jZSwgaSwgcHJldmlvdXNUcmFuc2l0aW9uTWFuYWdlcnMgPSB7fSwgdHJhbnNpdGlvbk1hbmFnZXJzID0ge307XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gQXJyYXkucHJvdG90eXBlW21ldGhvZE5hbWVdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VzID0gdGhpcy5fcmFjdGl2ZS5pbnN0YW5jZXM7XG4gICAgICAgICAgICAgICAgaSA9IGluc3RhbmNlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IGluc3RhbmNlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNUcmFuc2l0aW9uTWFuYWdlcnNbaW5zdGFuY2UuX2d1aWRdID0gaW5zdGFuY2UuX3RyYW5zaXRpb25NYW5hZ2VyO1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5fdHJhbnNpdGlvbk1hbmFnZXIgPSB0cmFuc2l0aW9uTWFuYWdlcnNbaW5zdGFuY2UuX2d1aWRdID0gbWFrZVRyYW5zaXRpb25NYW5hZ2VyKGluc3RhbmNlLCBub29wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fcmFjdGl2ZS5zZXR0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBub3RpZnlBcnJheURlcGVuZGFudHModGhpcywgbWV0aG9kTmFtZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yYWN0aXZlLnNldHRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpID0gaW5zdGFuY2VzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlID0gaW5zdGFuY2VzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5fdHJhbnNpdGlvbk1hbmFnZXIgPSBwcmV2aW91c1RyYW5zaXRpb25NYW5hZ2Vyc1tpbnN0YW5jZS5fZ3VpZF07XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25NYW5hZ2Vyc1tpbnN0YW5jZS5fZ3VpZF0ucmVhZHkoKTtcbiAgICAgICAgICAgICAgICAgICAgcHJlRG9tVXBkYXRlKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdERvbVVwZGF0ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkocGF0Y2hlZEFycmF5UHJvdG8sIG1ldGhvZE5hbWUsIHsgdmFsdWU6IG1ldGhvZCB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRlc3RPYmogPSB7fTtcbiAgICAgICAgaWYgKHRlc3RPYmouX19wcm90b19fKSB7XG4gICAgICAgICAgICBwYXRjaEFycmF5TWV0aG9kcyA9IGZ1bmN0aW9uIChhcnJheSkge1xuICAgICAgICAgICAgICAgIGFycmF5Ll9fcHJvdG9fXyA9IHBhdGNoZWRBcnJheVByb3RvO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHVucGF0Y2hBcnJheU1ldGhvZHMgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5fX3Byb3RvX18gPSBBcnJheS5wcm90b3R5cGU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0Y2hBcnJheU1ldGhvZHMgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgbWV0aG9kTmFtZTtcbiAgICAgICAgICAgICAgICBpID0gbXV0YXRvck1ldGhvZHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kTmFtZSA9IG11dGF0b3JNZXRob2RzW2ldO1xuICAgICAgICAgICAgICAgICAgICBkZWZpbmVQcm9wZXJ0eShhcnJheSwgbWV0aG9kTmFtZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHBhdGNoZWRBcnJheVByb3RvW21ldGhvZE5hbWVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB1bnBhdGNoQXJyYXlNZXRob2RzID0gZnVuY3Rpb24gKGFycmF5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICAgICAgaSA9IG11dGF0b3JNZXRob2RzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhcnJheVttdXRhdG9yTWV0aG9kc1tpXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlcnJvck1lc3NhZ2UgPSAnU29tZXRoaW5nIHdlbnQgd3JvbmcgaW4gYSByYXRoZXIgaW50ZXJlc3Rpbmcgd2F5JztcbiAgICAgICAgcmV0dXJuIGFycmF5QWRhcHRvcjtcbiAgICB9KGNvbmZpZ190eXBlcywgdXRpbHNfZGVmaW5lUHJvcGVydHksIHV0aWxzX2lzQXJyYXksIHNoYXJlZF9jbGVhckNhY2hlLCBzaGFyZWRfcHJlRG9tVXBkYXRlLCBzaGFyZWRfcG9zdERvbVVwZGF0ZSwgc2hhcmVkX21ha2VUcmFuc2l0aW9uTWFuYWdlciwgc2hhcmVkX25vdGlmeURlcGVuZGFudHMpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX2dldF9tYWdpY0FkYXB0b3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWFnaWNBZGFwdG9yLCBNYWdpY1dyYXBwZXI7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICd0ZXN0JywgeyB2YWx1ZTogMCB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbWFnaWNBZGFwdG9yID0ge1xuICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAob2JqZWN0LCBrZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEha2V5cGF0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3cmFwOiBmdW5jdGlvbiAocmFjdGl2ZSwgb2JqZWN0LCBrZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNYWdpY1dyYXBwZXIocmFjdGl2ZSwgb2JqZWN0LCBrZXlwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgTWFnaWNXcmFwcGVyID0gZnVuY3Rpb24gKHJhY3RpdmUsIG9iamVjdCwga2V5cGF0aCkge1xuICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSB0aGlzLCBrZXlzLCBwcm9wLCBvYmpLZXlwYXRoLCBkZXNjcmlwdG9yLCB3cmFwcGVycywgb2xkR2V0LCBvbGRTZXQsIGdldCwgc2V0O1xuICAgICAgICAgICAgdGhpcy5yYWN0aXZlID0gcmFjdGl2ZTtcbiAgICAgICAgICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgICAgICAgICBrZXlzID0ga2V5cGF0aC5zcGxpdCgnLicpO1xuICAgICAgICAgICAgdGhpcy5wcm9wID0ga2V5cy5wb3AoKTtcbiAgICAgICAgICAgIG9iaktleXBhdGggPSBrZXlzLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIHRoaXMub2JqID0gb2JqS2V5cGF0aCA/IHJhY3RpdmUuZ2V0KG9iaktleXBhdGgpIDogcmFjdGl2ZS5kYXRhO1xuICAgICAgICAgICAgZGVzY3JpcHRvciA9IHRoaXMub3JpZ2luYWxEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLm9iaiwgdGhpcy5wcm9wKTtcbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3Iuc2V0ICYmICh3cmFwcGVycyA9IGRlc2NyaXB0b3Iuc2V0Ll9yYWN0aXZlV3JhcHBlcnMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHdyYXBwZXJzLmluZGV4T2YodGhpcykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXJzLnB1c2godGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yICYmICFkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVzZSBtYWdpYyBtb2RlIHdpdGggcHJvcGVydHkgXCInICsgcHJvcCArICdcIiAtIG9iamVjdCBpcyBub3QgY29uZmlndXJhYmxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBkZXNjcmlwdG9yLnZhbHVlO1xuICAgICAgICAgICAgICAgIG9sZEdldCA9IGRlc2NyaXB0b3IuZ2V0O1xuICAgICAgICAgICAgICAgIG9sZFNldCA9IGRlc2NyaXB0b3Iuc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2V0ID0gb2xkR2V0IHx8IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd3JhcHBlci52YWx1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgd3JhcHBlcnMsIHdyYXBwZXIsIGk7XG4gICAgICAgICAgICAgICAgaWYgKG9sZFNldCkge1xuICAgICAgICAgICAgICAgICAgICBvbGRTZXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3cmFwcGVycyA9IHNldC5fcmFjdGl2ZVdyYXBwZXJzO1xuICAgICAgICAgICAgICAgIGkgPSB3cmFwcGVycy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyID0gd3JhcHBlcnNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICghd3JhcHBlci5yZXNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIucmFjdGl2ZS5zZXQod3JhcHBlci5rZXlwYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2V0Ll9yYWN0aXZlV3JhcHBlcnMgPSBbdGhpc107XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5vYmosIHRoaXMucHJvcCwge1xuICAgICAgICAgICAgICAgIGdldDogZ2V0LFxuICAgICAgICAgICAgICAgIHNldDogc2V0LFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgTWFnaWNXcmFwcGVyLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0dGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXR0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVzY3JpcHRvciwgc2V0LCB2YWx1ZSwgd3JhcHBlcnM7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcy5vYmosIHRoaXMucHJvcCk7XG4gICAgICAgICAgICAgICAgc2V0ID0gZGVzY3JpcHRvci5zZXQ7XG4gICAgICAgICAgICAgICAgd3JhcHBlcnMgPSBzZXQuX3JhY3RpdmVXcmFwcGVycztcbiAgICAgICAgICAgICAgICB3cmFwcGVycy5zcGxpY2Uod3JhcHBlcnMuaW5kZXhPZih0aGlzKSwgMSk7XG4gICAgICAgICAgICAgICAgaWYgKCF3cmFwcGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLm9ialt0aGlzLnByb3BdO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5vYmosIHRoaXMucHJvcCwgdGhpcy5vcmlnaW5hbERlc2NyaXB0b3IgfHwge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlncmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqW3RoaXMucHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBtYWdpY0FkYXB0b3I7XG4gICAgfSgpO1xudmFyIHNoYXJlZF9hZGFwdElmTmVjZXNzYXJ5ID0gZnVuY3Rpb24gKGFkYXB0b3JSZWdpc3RyeSwgYXJyYXlBZGFwdG9yLCBtYWdpY0FkYXB0b3IpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBwcmVmaXhlcnMgPSB7fTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyYWN0aXZlLCBrZXlwYXRoLCB2YWx1ZSwgaXNFeHByZXNzaW9uUmVzdWx0KSB7XG4gICAgICAgICAgICB2YXIgbGVuLCBpLCBhZGFwdG9yLCB3cmFwcGVkO1xuICAgICAgICAgICAgbGVuID0gcmFjdGl2ZS5hZGFwdG9ycy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBhZGFwdG9yID0gcmFjdGl2ZS5hZGFwdG9yc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFkYXB0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYWRhcHRvclJlZ2lzdHJ5W2FkYXB0b3JdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgYWRhcHRvciBcIicgKyBhZGFwdG9yICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYWRhcHRvciA9IHJhY3RpdmUuYWRhcHRvcnNbaV0gPSBhZGFwdG9yUmVnaXN0cnlbYWRhcHRvcl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhZGFwdG9yLmZpbHRlcih2YWx1ZSwga2V5cGF0aCwgcmFjdGl2ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlZCA9IHJhY3RpdmUuX3dyYXBwZWRba2V5cGF0aF0gPSBhZGFwdG9yLndyYXAocmFjdGl2ZSwgdmFsdWUsIGtleXBhdGgsIGdldFByZWZpeGVyKGtleXBhdGgpKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlZC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc0V4cHJlc3Npb25SZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBpZiAocmFjdGl2ZS5tYWdpYyAmJiBtYWdpY0FkYXB0b3IuZmlsdGVyKHZhbHVlLCBrZXlwYXRoLCByYWN0aXZlKSkge1xuICAgICAgICAgICAgICAgICAgICByYWN0aXZlLl93cmFwcGVkW2tleXBhdGhdID0gbWFnaWNBZGFwdG9yLndyYXAocmFjdGl2ZSwgdmFsdWUsIGtleXBhdGgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmFjdGl2ZS5tb2RpZnlBcnJheXMgJiYgYXJyYXlBZGFwdG9yLmZpbHRlcih2YWx1ZSwga2V5cGF0aCwgcmFjdGl2ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFjdGl2ZS5fd3JhcHBlZFtrZXlwYXRoXSA9IGFycmF5QWRhcHRvci53cmFwKHJhY3RpdmUsIHZhbHVlLCBrZXlwYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIHByZWZpeEtleXBhdGgob2JqLCBwcmVmaXgpIHtcbiAgICAgICAgICAgIHZhciBwcmVmaXhlZCA9IHt9LCBrZXk7XG4gICAgICAgICAgICBpZiAoIXByZWZpeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmVmaXggKz0gJy4nO1xuICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZWZpeGVkW3ByZWZpeCArIGtleV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0UHJlZml4ZXIocm9vdEtleXBhdGgpIHtcbiAgICAgICAgICAgIHZhciByb290RG90O1xuICAgICAgICAgICAgaWYgKCFwcmVmaXhlcnNbcm9vdEtleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgcm9vdERvdCA9IHJvb3RLZXlwYXRoID8gcm9vdEtleXBhdGggKyAnLicgOiAnJztcbiAgICAgICAgICAgICAgICBwcmVmaXhlcnNbcm9vdEtleXBhdGhdID0gZnVuY3Rpb24gKHJlbGF0aXZlS2V5cGF0aCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iajtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWxhdGl2ZUtleXBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ialtyb290RG90ICsgcmVsYXRpdmVLZXlwYXRoXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlbGF0aXZlS2V5cGF0aCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByb290RG90ID8gcHJlZml4S2V5cGF0aChyZWxhdGl2ZUtleXBhdGgsIHJvb3RLZXlwYXRoKSA6IHJlbGF0aXZlS2V5cGF0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4ZXJzW3Jvb3RLZXlwYXRoXTtcbiAgICAgICAgfVxuICAgIH0ocmVnaXN0cmllc19hZGFwdG9ycywgUmFjdGl2ZV9wcm90b3R5cGVfZ2V0X2FycmF5QWRhcHRvciwgUmFjdGl2ZV9wcm90b3R5cGVfZ2V0X21hZ2ljQWRhcHRvcik7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfZ2V0X19nZXQgPSBmdW5jdGlvbiAobm9ybWFsaXNlS2V5cGF0aCwgYWRhcHRvclJlZ2lzdHJ5LCBhZGFwdElmTmVjZXNzYXJ5KSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZ2V0LCBfZ2V0LCByZXRyaWV2ZTtcbiAgICAgICAgZ2V0ID0gZnVuY3Rpb24gKGtleXBhdGgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jYXB0dXJlZCAmJiAhdGhpcy5fY2FwdHVyZWRba2V5cGF0aF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYXB0dXJlZC5wdXNoKGtleXBhdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhcHR1cmVkW2tleXBhdGhdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfZ2V0KHRoaXMsIGtleXBhdGgpO1xuICAgICAgICB9O1xuICAgICAgICBfZ2V0ID0gZnVuY3Rpb24gKHJhY3RpdmUsIGtleXBhdGgpIHtcbiAgICAgICAgICAgIHZhciBjYWNoZSwgY2FjaGVkLCB2YWx1ZSwgd3JhcHBlZCwgZXZhbHVhdG9yO1xuICAgICAgICAgICAga2V5cGF0aCA9IG5vcm1hbGlzZUtleXBhdGgoa2V5cGF0aCk7XG4gICAgICAgICAgICBjYWNoZSA9IHJhY3RpdmUuX2NhY2hlO1xuICAgICAgICAgICAgaWYgKChjYWNoZWQgPSBjYWNoZVtrZXlwYXRoXSkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAod3JhcHBlZCA9IHJhY3RpdmUuX3dyYXBwZWRba2V5cGF0aF0pIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBwZWQudmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFrZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgYWRhcHRJZk5lY2Vzc2FyeShyYWN0aXZlLCAnJywgcmFjdGl2ZS5kYXRhKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHJhY3RpdmUuZGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZhbHVhdG9yID0gcmFjdGl2ZS5fZXZhbHVhdG9yc1trZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gZXZhbHVhdG9yLnZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHJldHJpZXZlKHJhY3RpdmUsIGtleXBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FjaGVba2V5cGF0aF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0cmlldmUgPSBmdW5jdGlvbiAocmFjdGl2ZSwga2V5cGF0aCkge1xuICAgICAgICAgICAgdmFyIGtleXMsIGtleSwgcGFyZW50S2V5cGF0aCwgcGFyZW50VmFsdWUsIGNhY2hlTWFwLCB2YWx1ZSwgd3JhcHBlZDtcbiAgICAgICAgICAgIGtleXMgPSBrZXlwYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICAgICAgcGFyZW50S2V5cGF0aCA9IGtleXMuam9pbignLicpO1xuICAgICAgICAgICAgcGFyZW50VmFsdWUgPSBfZ2V0KHJhY3RpdmUsIHBhcmVudEtleXBhdGgpO1xuICAgICAgICAgICAgaWYgKHdyYXBwZWQgPSByYWN0aXZlLl93cmFwcGVkW3BhcmVudEtleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50VmFsdWUgPSB3cmFwcGVkLmdldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmVudFZhbHVlID09PSBudWxsIHx8IHBhcmVudFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShjYWNoZU1hcCA9IHJhY3RpdmUuX2NhY2hlTWFwW3BhcmVudEtleXBhdGhdKSkge1xuICAgICAgICAgICAgICAgIHJhY3RpdmUuX2NhY2hlTWFwW3BhcmVudEtleXBhdGhdID0gW2tleXBhdGhdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FjaGVNYXAuaW5kZXhPZihrZXlwYXRoKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVNYXBbY2FjaGVNYXAubGVuZ3RoXSA9IGtleXBhdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSBwYXJlbnRWYWx1ZVtrZXldO1xuICAgICAgICAgICAgYWRhcHRJZk5lY2Vzc2FyeShyYWN0aXZlLCBrZXlwYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgICByYWN0aXZlLl9jYWNoZVtrZXlwYXRoXSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ2V0O1xuICAgIH0odXRpbHNfbm9ybWFsaXNlS2V5cGF0aCwgcmVnaXN0cmllc19hZGFwdG9ycywgc2hhcmVkX2FkYXB0SWZOZWNlc3NhcnkpO1xudmFyIHV0aWxzX2lzT2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0aGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmcuY2FsbCh0aGluZykgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciB1dGlsc19pc0VxdWFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICBpZiAoYSA9PT0gbnVsbCAmJiBiID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhID09PSBiO1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciBzaGFyZWRfcmVzb2x2ZVJlZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciByZXNvbHZlUmVmO1xuICAgICAgICByZXNvbHZlUmVmID0gZnVuY3Rpb24gKHJhY3RpdmUsIHJlZiwgY29udGV4dFN0YWNrKSB7XG4gICAgICAgICAgICB2YXIga2V5cGF0aCwga2V5cywgbGFzdEtleSwgY29udGV4dEtleXMsIGlubmVyTW9zdENvbnRleHQsIHBvc3RmaXgsIHBhcmVudEtleXBhdGgsIHBhcmVudFZhbHVlLCB3cmFwcGVkLCBjb250ZXh0LCBhbmNlc3RvckVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgIGFuY2VzdG9yRXJyb3JNZXNzYWdlID0gJ0NvdWxkIG5vdCByZXNvbHZlIHJlZmVyZW5jZSAtIHRvbyBtYW55IFwiLi4vXCIgcHJlZml4ZXMnO1xuICAgICAgICAgICAgaWYgKHJlZiA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0U3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5cGF0aCA9IGNvbnRleHRTdGFja1tjb250ZXh0U3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlZi5jaGFyQXQoMCkgPT09ICcuJykge1xuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBjb250ZXh0U3RhY2tbY29udGV4dFN0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGNvbnRleHRLZXlzID0gY29udGV4dCA/IGNvbnRleHQuc3BsaXQoJy4nKSA6IFtdO1xuICAgICAgICAgICAgICAgIGlmIChyZWYuc3Vic3RyKDAsIDMpID09PSAnLi4vJykge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocmVmLnN1YnN0cigwLCAzKSA9PT0gJy4uLycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dEtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGFuY2VzdG9yRXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRLZXlzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmID0gcmVmLnN1YnN0cmluZygzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0S2V5cy5wdXNoKHJlZik7XG4gICAgICAgICAgICAgICAgICAgIGtleXBhdGggPSBjb250ZXh0S2V5cy5qb2luKCcuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBrZXlwYXRoID0gcmVmLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBrZXlwYXRoID0gY29udGV4dCArIHJlZjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGtleXMgPSByZWYuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgICAgICBsYXN0S2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgICAgICAgICBwb3N0Zml4ID0ga2V5cy5sZW5ndGggPyAnLicgKyBrZXlzLmpvaW4oJy4nKSA6ICcnO1xuICAgICAgICAgICAgICAgIGNvbnRleHRTdGFjayA9IGNvbnRleHRTdGFjay5jb25jYXQoKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoY29udGV4dFN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpbm5lck1vc3RDb250ZXh0ID0gY29udGV4dFN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRLZXlwYXRoID0gaW5uZXJNb3N0Q29udGV4dCArIHBvc3RmaXg7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudFZhbHVlID0gcmFjdGl2ZS5nZXQocGFyZW50S2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3cmFwcGVkID0gcmFjdGl2ZS5fd3JhcHBlZFtwYXJlbnRLZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50VmFsdWUgPSB3cmFwcGVkLmdldCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyZW50VmFsdWUgPT09ICdvYmplY3QnICYmIHBhcmVudFZhbHVlICE9PSBudWxsICYmIHBhcmVudFZhbHVlLmhhc093blByb3BlcnR5KGxhc3RLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlwYXRoID0gaW5uZXJNb3N0Q29udGV4dCArICcuJyArIHJlZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgha2V5cGF0aCAmJiByYWN0aXZlLmdldChyZWYpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5cGF0aCA9IHJlZjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ga2V5cGF0aCA/IGtleXBhdGgucmVwbGFjZSgvXlxcLi8sICcnKSA6IGtleXBhdGg7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXNvbHZlUmVmO1xuICAgIH0oKTtcbnZhciBzaGFyZWRfYXR0ZW1wdEtleXBhdGhSZXNvbHV0aW9uID0gZnVuY3Rpb24gKHJlc29sdmVSZWYpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBwdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocmFjdGl2ZSkge1xuICAgICAgICAgICAgdmFyIHVucmVzb2x2ZWQsIGtleXBhdGgsIGxlZnRvdmVyO1xuICAgICAgICAgICAgd2hpbGUgKHVucmVzb2x2ZWQgPSByYWN0aXZlLl9wZW5kaW5nUmVzb2x1dGlvbi5wb3AoKSkge1xuICAgICAgICAgICAgICAgIGtleXBhdGggPSByZXNvbHZlUmVmKHJhY3RpdmUsIHVucmVzb2x2ZWQucmVmLCB1bnJlc29sdmVkLmNvbnRleHRTdGFjayk7XG4gICAgICAgICAgICAgICAgaWYgKGtleXBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB1bnJlc29sdmVkLnJlc29sdmUoa2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgKGxlZnRvdmVyIHx8IChsZWZ0b3ZlciA9IFtdKSkucHVzaCh1bnJlc29sdmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGVmdG92ZXIpIHtcbiAgICAgICAgICAgICAgICBwdXNoLmFwcGx5KHJhY3RpdmUuX3BlbmRpbmdSZXNvbHV0aW9uLCBsZWZ0b3Zlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfShzaGFyZWRfcmVzb2x2ZVJlZik7XG52YXIgc2hhcmVkX3Byb2Nlc3NEZWZlcnJlZFVwZGF0ZXMgPSBmdW5jdGlvbiAocHJlRG9tVXBkYXRlLCBwb3N0RG9tVXBkYXRlKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHJhY3RpdmUpIHtcbiAgICAgICAgICAgIHByZURvbVVwZGF0ZShyYWN0aXZlKTtcbiAgICAgICAgICAgIHBvc3REb21VcGRhdGUocmFjdGl2ZSk7XG4gICAgICAgIH07XG4gICAgfShzaGFyZWRfcHJlRG9tVXBkYXRlLCBzaGFyZWRfcG9zdERvbVVwZGF0ZSk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX3JlcGxhY2VEYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyYWN0aXZlLCBrZXlwYXRoLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGtleXMsIGFjY3VtdWxhdGVkLCB3cmFwcGVkLCBvYmosIGtleSwgY3VycmVudEtleXBhdGgsIGtleXBhdGhUb0NsZWFyO1xuICAgICAgICAgICAga2V5cyA9IGtleXBhdGguc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGFjY3VtdWxhdGVkID0gW107XG4gICAgICAgICAgICBpZiAod3JhcHBlZCA9IHJhY3RpdmUuX3dyYXBwZWRbJyddKSB7XG4gICAgICAgICAgICAgICAgaWYgKHdyYXBwZWQuc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZWQuc2V0KGtleXMuam9pbignLicpLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9iaiA9IHdyYXBwZWQuZ2V0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9iaiA9IHJhY3RpdmUuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBrZXkgPSBhY2N1bXVsYXRlZFthY2N1bXVsYXRlZC5sZW5ndGhdID0ga2V5cy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRLZXlwYXRoID0gYWNjdW11bGF0ZWQuam9pbignLicpO1xuICAgICAgICAgICAgICAgIGlmICh3cmFwcGVkID0gcmFjdGl2ZS5fd3JhcHBlZFtjdXJyZW50S2V5cGF0aF0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdyYXBwZWQuc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVkLnNldChrZXlzLmpvaW4oJy4nKSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IHdyYXBwZWQuZ2V0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlwYXRoVG9DbGVhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXBhdGhUb0NsZWFyID0gY3VycmVudEtleXBhdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpba2V5XSA9IC9eXFxzKlswLTldK1xccyokLy50ZXN0KGtleXNbMF0pID8gW10gOiB7fTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvYmogPSBvYmpba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXkgPSBrZXlzWzBdO1xuICAgICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBrZXlwYXRoVG9DbGVhcjtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfc2V0ID0gZnVuY3Rpb24gKGlzT2JqZWN0LCBpc0VxdWFsLCBub3JtYWxpc2VLZXlwYXRoLCBjbGVhckNhY2hlLCBub3RpZnlEZXBlbmRhbnRzLCBhdHRlbXB0S2V5cGF0aFJlc29sdXRpb24sIG1ha2VUcmFuc2l0aW9uTWFuYWdlciwgcHJvY2Vzc0RlZmVycmVkVXBkYXRlcywgcmVwbGFjZURhdGEpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBzZXQsIHVwZGF0ZU1vZGVsLCBnZXRVcHN0cmVhbUNoYW5nZXMsIHJlc2V0V3JhcHBlZDtcbiAgICAgICAgc2V0ID0gZnVuY3Rpb24gKGtleXBhdGgsIHZhbHVlLCBjb21wbGV0ZSkge1xuICAgICAgICAgICAgdmFyIG1hcCwgY2hhbmdlcywgdXBzdHJlYW1DaGFuZ2VzLCBwcmV2aW91c1RyYW5zaXRpb25NYW5hZ2VyLCB0cmFuc2l0aW9uTWFuYWdlciwgaSwgY2hhbmdlSGFzaDtcbiAgICAgICAgICAgIGNoYW5nZXMgPSBbXTtcbiAgICAgICAgICAgIGlmIChpc09iamVjdChrZXlwYXRoKSkge1xuICAgICAgICAgICAgICAgIG1hcCA9IGtleXBhdGg7XG4gICAgICAgICAgICAgICAgY29tcGxldGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGtleXBhdGggaW4gbWFwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXAuaGFzT3duUHJvcGVydHkoa2V5cGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gbWFwW2tleXBhdGhdO1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5cGF0aCA9IG5vcm1hbGlzZUtleXBhdGgoa2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVNb2RlbCh0aGlzLCBrZXlwYXRoLCB2YWx1ZSwgY2hhbmdlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGtleXBhdGggPSBub3JtYWxpc2VLZXlwYXRoKGtleXBhdGgpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZU1vZGVsKHRoaXMsIGtleXBhdGgsIHZhbHVlLCBjaGFuZ2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY2hhbmdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aW91c1RyYW5zaXRpb25NYW5hZ2VyID0gdGhpcy5fdHJhbnNpdGlvbk1hbmFnZXI7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uTWFuYWdlciA9IHRyYW5zaXRpb25NYW5hZ2VyID0gbWFrZVRyYW5zaXRpb25NYW5hZ2VyKHRoaXMsIGNvbXBsZXRlKTtcbiAgICAgICAgICAgIHVwc3RyZWFtQ2hhbmdlcyA9IGdldFVwc3RyZWFtQ2hhbmdlcyhjaGFuZ2VzKTtcbiAgICAgICAgICAgIGlmICh1cHN0cmVhbUNoYW5nZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbm90aWZ5RGVwZW5kYW50cy5tdWx0aXBsZSh0aGlzLCB1cHN0cmVhbUNoYW5nZXMsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm90aWZ5RGVwZW5kYW50cy5tdWx0aXBsZSh0aGlzLCBjaGFuZ2VzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wZW5kaW5nUmVzb2x1dGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhdHRlbXB0S2V5cGF0aFJlc29sdXRpb24odGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9jZXNzRGVmZXJyZWRVcGRhdGVzKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbk1hbmFnZXIgPSBwcmV2aW91c1RyYW5zaXRpb25NYW5hZ2VyO1xuICAgICAgICAgICAgdHJhbnNpdGlvbk1hbmFnZXIucmVhZHkoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5maXJpbmdDaGFuZ2VFdmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyaW5nQ2hhbmdlRXZlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNoYW5nZUhhc2ggPSB7fTtcbiAgICAgICAgICAgICAgICBpID0gY2hhbmdlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VIYXNoW2NoYW5nZXNbaV1dID0gdGhpcy5nZXQoY2hhbmdlc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgnY2hhbmdlJywgY2hhbmdlSGFzaCk7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJpbmdDaGFuZ2VFdmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHVwZGF0ZU1vZGVsID0gZnVuY3Rpb24gKHJhY3RpdmUsIGtleXBhdGgsIHZhbHVlLCBjaGFuZ2VzKSB7XG4gICAgICAgICAgICB2YXIgY2FjaGVkLCBwcmV2aW91cywgd3JhcHBlZCwga2V5cGF0aFRvQ2xlYXIsIGV2YWx1YXRvcjtcbiAgICAgICAgICAgIGlmICgod3JhcHBlZCA9IHJhY3RpdmUuX3dyYXBwZWRba2V5cGF0aF0pICYmIHdyYXBwZWQucmVzZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzZXRXcmFwcGVkKHJhY3RpdmUsIGtleXBhdGgsIHZhbHVlLCB3cmFwcGVkLCBjaGFuZ2VzKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChldmFsdWF0b3IgPSByYWN0aXZlLl9ldmFsdWF0b3JzW2tleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgZXZhbHVhdG9yLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWNoZWQgPSByYWN0aXZlLl9jYWNoZVtrZXlwYXRoXTtcbiAgICAgICAgICAgIHByZXZpb3VzID0gcmFjdGl2ZS5nZXQoa2V5cGF0aCk7XG4gICAgICAgICAgICBpZiAocHJldmlvdXMgIT09IHZhbHVlICYmICFldmFsdWF0b3IpIHtcbiAgICAgICAgICAgICAgICBrZXlwYXRoVG9DbGVhciA9IHJlcGxhY2VEYXRhKHJhY3RpdmUsIGtleXBhdGgsIHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBjYWNoZWQgJiYgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xlYXJDYWNoZShyYWN0aXZlLCBrZXlwYXRoVG9DbGVhciB8fCBrZXlwYXRoKTtcbiAgICAgICAgICAgIGNoYW5nZXNbY2hhbmdlcy5sZW5ndGhdID0ga2V5cGF0aDtcbiAgICAgICAgfTtcbiAgICAgICAgZ2V0VXBzdHJlYW1DaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHZhciB1cHN0cmVhbUNoYW5nZXMgPSBbJyddLCBpLCBrZXlwYXRoLCBrZXlzLCB1cHN0cmVhbUtleXBhdGg7XG4gICAgICAgICAgICBpID0gY2hhbmdlcy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAga2V5cGF0aCA9IGNoYW5nZXNbaV07XG4gICAgICAgICAgICAgICAga2V5cyA9IGtleXBhdGguc3BsaXQoJy4nKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoa2V5cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHVwc3RyZWFtS2V5cGF0aCA9IGtleXMuam9pbignLicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXVwc3RyZWFtQ2hhbmdlc1t1cHN0cmVhbUtleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cHN0cmVhbUNoYW5nZXNbdXBzdHJlYW1DaGFuZ2VzLmxlbmd0aF0gPSB1cHN0cmVhbUtleXBhdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cHN0cmVhbUNoYW5nZXNbdXBzdHJlYW1LZXlwYXRoXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXBzdHJlYW1DaGFuZ2VzO1xuICAgICAgICB9O1xuICAgICAgICByZXNldFdyYXBwZWQgPSBmdW5jdGlvbiAocmFjdGl2ZSwga2V5cGF0aCwgdmFsdWUsIHdyYXBwZWQsIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHZhciBwcmV2aW91cywgY2FjaGVkLCBjYWNoZU1hcCwgaTtcbiAgICAgICAgICAgIHByZXZpb3VzID0gd3JhcHBlZC5nZXQoKTtcbiAgICAgICAgICAgIGlmICghaXNFcXVhbChwcmV2aW91cywgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHdyYXBwZWQucmVzZXQodmFsdWUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSB3cmFwcGVkLmdldCgpO1xuICAgICAgICAgICAgY2FjaGVkID0gcmFjdGl2ZS5fY2FjaGVba2V5cGF0aF07XG4gICAgICAgICAgICBpZiAoIWlzRXF1YWwoY2FjaGVkLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByYWN0aXZlLl9jYWNoZVtrZXlwYXRoXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGNhY2hlTWFwID0gcmFjdGl2ZS5fY2FjaGVNYXBba2V5cGF0aF07XG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlTWFwKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSBjYWNoZU1hcC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQ2FjaGUocmFjdGl2ZSwgY2FjaGVNYXBbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoYW5nZXNbY2hhbmdlcy5sZW5ndGhdID0ga2V5cGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHNldDtcbiAgICB9KHV0aWxzX2lzT2JqZWN0LCB1dGlsc19pc0VxdWFsLCB1dGlsc19ub3JtYWxpc2VLZXlwYXRoLCBzaGFyZWRfY2xlYXJDYWNoZSwgc2hhcmVkX25vdGlmeURlcGVuZGFudHMsIHNoYXJlZF9hdHRlbXB0S2V5cGF0aFJlc29sdXRpb24sIHNoYXJlZF9tYWtlVHJhbnNpdGlvbk1hbmFnZXIsIHNoYXJlZF9wcm9jZXNzRGVmZXJyZWRVcGRhdGVzLCBSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfcmVwbGFjZURhdGEpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX3VwZGF0ZSA9IGZ1bmN0aW9uIChtYWtlVHJhbnNpdGlvbk1hbmFnZXIsIGF0dGVtcHRLZXlwYXRoUmVzb2x1dGlvbiwgY2xlYXJDYWNoZSwgbm90aWZ5RGVwZW5kYW50cywgcHJvY2Vzc0RlZmVycmVkVXBkYXRlcykge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChrZXlwYXRoLCBjb21wbGV0ZSkge1xuICAgICAgICAgICAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyLCBwcmV2aW91c1RyYW5zaXRpb25NYW5hZ2VyO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXlwYXRoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29tcGxldGUgPSBrZXlwYXRoO1xuICAgICAgICAgICAgICAgIGtleXBhdGggPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpb3VzVHJhbnNpdGlvbk1hbmFnZXIgPSB0aGlzLl90cmFuc2l0aW9uTWFuYWdlcjtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25NYW5hZ2VyID0gdHJhbnNpdGlvbk1hbmFnZXIgPSBtYWtlVHJhbnNpdGlvbk1hbmFnZXIodGhpcywgY29tcGxldGUpO1xuICAgICAgICAgICAgYXR0ZW1wdEtleXBhdGhSZXNvbHV0aW9uKHRoaXMpO1xuICAgICAgICAgICAgY2xlYXJDYWNoZSh0aGlzLCBrZXlwYXRoIHx8ICcnKTtcbiAgICAgICAgICAgIG5vdGlmeURlcGVuZGFudHModGhpcywga2V5cGF0aCB8fCAnJyk7XG4gICAgICAgICAgICBwcm9jZXNzRGVmZXJyZWRVcGRhdGVzKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbk1hbmFnZXIgPSBwcmV2aW91c1RyYW5zaXRpb25NYW5hZ2VyO1xuICAgICAgICAgICAgdHJhbnNpdGlvbk1hbmFnZXIucmVhZHkoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5cGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3VwZGF0ZScsIGtleXBhdGgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3VwZGF0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgfShzaGFyZWRfbWFrZVRyYW5zaXRpb25NYW5hZ2VyLCBzaGFyZWRfYXR0ZW1wdEtleXBhdGhSZXNvbHV0aW9uLCBzaGFyZWRfY2xlYXJDYWNoZSwgc2hhcmVkX25vdGlmeURlcGVuZGFudHMsIHNoYXJlZF9wcm9jZXNzRGVmZXJyZWRVcGRhdGVzKTtcbnZhciB1dGlsc19hcnJheUNvbnRlbnRzTWF0Y2ggPSBmdW5jdGlvbiAoaXNBcnJheSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIGlmICghaXNBcnJheShhKSB8fCAhaXNBcnJheShiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gYS5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgIH0odXRpbHNfaXNBcnJheSk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfdXBkYXRlTW9kZWwgPSBmdW5jdGlvbiAoZ2V0VmFsdWVGcm9tQ2hlY2tib3hlcywgYXJyYXlDb250ZW50c01hdGNoLCBpc0VxdWFsKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGtleXBhdGgsIGNhc2NhZGUpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZXMsIGRlZmVycmVkQ2hlY2tib3hlcywgaTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5cGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBrZXlwYXRoID0gJyc7XG4gICAgICAgICAgICAgICAgY2FzY2FkZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xpZGF0ZUNoYW5nZWRWYWx1ZXModGhpcywga2V5cGF0aCwgdmFsdWVzID0ge30sIGRlZmVycmVkQ2hlY2tib3hlcyA9IFtdLCBjYXNjYWRlKTtcbiAgICAgICAgICAgIGlmIChpID0gZGVmZXJyZWRDaGVja2JveGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAga2V5cGF0aCA9IGRlZmVycmVkQ2hlY2tib3hlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzW2tleXBhdGhdID0gZ2V0VmFsdWVGcm9tQ2hlY2tib3hlcyh0aGlzLCBrZXlwYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldCh2YWx1ZXMpO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBjb25zb2xpZGF0ZUNoYW5nZWRWYWx1ZXMocmFjdGl2ZSwga2V5cGF0aCwgdmFsdWVzLCBkZWZlcnJlZENoZWNrYm94ZXMsIGNhc2NhZGUpIHtcbiAgICAgICAgICAgIHZhciBiaW5kaW5ncywgY2hpbGREZXBzLCBpLCBiaW5kaW5nLCBvbGRWYWx1ZSwgbmV3VmFsdWU7XG4gICAgICAgICAgICBiaW5kaW5ncyA9IHJhY3RpdmUuX3R3b3dheUJpbmRpbmdzW2tleXBhdGhdO1xuICAgICAgICAgICAgaWYgKGJpbmRpbmdzKSB7XG4gICAgICAgICAgICAgICAgaSA9IGJpbmRpbmdzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGJpbmRpbmcgPSBiaW5kaW5nc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJpbmRpbmcucmFkaW9OYW1lICYmICFiaW5kaW5nLm5vZGUuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGJpbmRpbmcuY2hlY2tib3hOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmluZGluZy5jaGFuZ2VkKCkgJiYgIWRlZmVycmVkQ2hlY2tib3hlc1trZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkQ2hlY2tib3hlc1trZXlwYXRoXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWRDaGVja2JveGVzW2RlZmVycmVkQ2hlY2tib3hlcy5sZW5ndGhdID0ga2V5cGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlID0gYmluZGluZy5hdHRyLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IGJpbmRpbmcudmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5Q29udGVudHNNYXRjaChvbGRWYWx1ZSwgbmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRXF1YWwob2xkVmFsdWUsIG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzW2tleXBhdGhdID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNhc2NhZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGlsZERlcHMgPSByYWN0aXZlLl9kZXBzTWFwW2tleXBhdGhdO1xuICAgICAgICAgICAgaWYgKGNoaWxkRGVwcykge1xuICAgICAgICAgICAgICAgIGkgPSBjaGlsZERlcHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29saWRhdGVDaGFuZ2VkVmFsdWVzKHJhY3RpdmUsIGNoaWxkRGVwc1tpXSwgdmFsdWVzLCBkZWZlcnJlZENoZWNrYm94ZXMsIGNhc2NhZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0oc2hhcmVkX2dldFZhbHVlRnJvbUNoZWNrYm94ZXMsIHV0aWxzX2FycmF5Q29udGVudHNNYXRjaCwgdXRpbHNfaXNFcXVhbCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfYW5pbWF0ZV9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAoZnVuY3Rpb24gKHZlbmRvcnMsIGxhc3RUaW1lLCB3aW5kb3cpIHtcbiAgICAgICAgICAgIHZhciB4LCBzZXRUaW1lb3V0O1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dDtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyVGltZSwgdGltZVRvQ2FsbCwgaWQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIHRpbWVUb0NhbGwpO1xuICAgICAgICAgICAgICAgICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0oW1xuICAgICAgICAgICAgJ21zJyxcbiAgICAgICAgICAgICdtb3onLFxuICAgICAgICAgICAgJ3dlYmtpdCcsXG4gICAgICAgICAgICAnbydcbiAgICAgICAgXSwgMCwgd2luZG93KSk7XG4gICAgICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICAgIH0oKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9hbmltYXRlX2FuaW1hdGlvbnMgPSBmdW5jdGlvbiAockFGKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaSwgYW5pbWF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbiA9IHF1ZXVlW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhbmltYXRpb24udGljaygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUuc3BsaWNlKGktLSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgckFGKGFuaW1hdGlvbnMudGljayk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25zLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiAoYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlW3F1ZXVlLmxlbmd0aF0gPSBhbmltYXRpb247XG4gICAgICAgICAgICAgICAgICAgIGlmICghYW5pbWF0aW9ucy5ydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25zLnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9ucy50aWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGFib3J0OiBmdW5jdGlvbiAoa2V5cGF0aCwgcm9vdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IHF1ZXVlLmxlbmd0aCwgYW5pbWF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24gPSBxdWV1ZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb24ucm9vdCA9PT0gcm9vdCAmJiBhbmltYXRpb24ua2V5cGF0aCA9PT0ga2V5cGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYW5pbWF0aW9ucztcbiAgICB9KFJhY3RpdmVfcHJvdG90eXBlX2FuaW1hdGVfcmVxdWVzdEFuaW1hdGlvbkZyYW1lKTtcbnZhciB1dGlsc193YXJuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS53YXJuID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBjb25zb2xlLndhcm4uYXBwbHkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHV0aWxzX2lzTnVtZXJpYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGhpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdCh0aGluZykpICYmIGlzRmluaXRlKHRoaW5nKTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgc2hhcmVkX2ludGVycG9sYXRlID0gZnVuY3Rpb24gKGlzQXJyYXksIGlzT2JqZWN0LCBpc051bWVyaWMpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBpbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uIChmcm9tLCB0bykge1xuICAgICAgICAgICAgaWYgKGlzTnVtZXJpYyhmcm9tKSAmJiBpc051bWVyaWModG8pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ha2VOdW1iZXJJbnRlcnBvbGF0b3IoK2Zyb20sICt0byk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNBcnJheShmcm9tKSAmJiBpc0FycmF5KHRvKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYWtlQXJyYXlJbnRlcnBvbGF0b3IoZnJvbSwgdG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGZyb20pICYmIGlzT2JqZWN0KHRvKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYWtlT2JqZWN0SW50ZXJwb2xhdG9yKGZyb20sIHRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGludGVycG9sYXRlO1xuICAgICAgICBmdW5jdGlvbiBtYWtlTnVtYmVySW50ZXJwb2xhdG9yKGZyb20sIHRvKSB7XG4gICAgICAgICAgICB2YXIgZGVsdGEgPSB0byAtIGZyb207XG4gICAgICAgICAgICBpZiAoIWRlbHRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb207XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmcm9tICsgdCAqIGRlbHRhO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBtYWtlQXJyYXlJbnRlcnBvbGF0b3IoZnJvbSwgdG8pIHtcbiAgICAgICAgICAgIHZhciBpbnRlcm1lZGlhdGUsIGludGVycG9sYXRvcnMsIGxlbiwgaTtcbiAgICAgICAgICAgIGludGVybWVkaWF0ZSA9IFtdO1xuICAgICAgICAgICAgaW50ZXJwb2xhdG9ycyA9IFtdO1xuICAgICAgICAgICAgaSA9IGxlbiA9IE1hdGgubWluKGZyb20ubGVuZ3RoLCB0by5sZW5ndGgpO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGludGVycG9sYXRvcnNbaV0gPSBpbnRlcnBvbGF0ZShmcm9tW2ldLCB0b1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSBsZW47IGkgPCBmcm9tLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgaW50ZXJtZWRpYXRlW2ldID0gZnJvbVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IGxlbjsgaSA8IHRvLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgaW50ZXJtZWRpYXRlW2ldID0gdG9baV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IGxlbjtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVybWVkaWF0ZVtpXSA9IGludGVycG9sYXRvcnNbaV0odCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcm1lZGlhdGU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG1ha2VPYmplY3RJbnRlcnBvbGF0b3IoZnJvbSwgdG8pIHtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0aWVzID0gW10sIGxlbiwgaW50ZXJwb2xhdG9ycywgaW50ZXJtZWRpYXRlLCBwcm9wO1xuICAgICAgICAgICAgaW50ZXJtZWRpYXRlID0ge307XG4gICAgICAgICAgICBpbnRlcnBvbGF0b3JzID0ge307XG4gICAgICAgICAgICBmb3IgKHByb3AgaW4gZnJvbSkge1xuICAgICAgICAgICAgICAgIGlmIChmcm9tLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0by5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllc1twcm9wZXJ0aWVzLmxlbmd0aF0gPSBwcm9wO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJwb2xhdG9yc1twcm9wXSA9IGludGVycG9sYXRlKGZyb21bcHJvcF0sIHRvW3Byb3BdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVybWVkaWF0ZVtwcm9wXSA9IGZyb21bcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHByb3AgaW4gdG8pIHtcbiAgICAgICAgICAgICAgICBpZiAodG8uaGFzT3duUHJvcGVydHkocHJvcCkgJiYgIWZyb20uaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJtZWRpYXRlW3Byb3BdID0gdG9bcHJvcF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGVuID0gcHJvcGVydGllcy5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IGxlbiwgcHJvcDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3AgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpbnRlcm1lZGlhdGVbcHJvcF0gPSBpbnRlcnBvbGF0b3JzW3Byb3BdKHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJtZWRpYXRlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0odXRpbHNfaXNBcnJheSwgdXRpbHNfaXNPYmplY3QsIHV0aWxzX2lzTnVtZXJpYyk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfYW5pbWF0ZV9BbmltYXRpb24gPSBmdW5jdGlvbiAod2FybiwgaW50ZXJwb2xhdGUpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBBbmltYXRpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmludGVycG9sYXRvciA9IGludGVycG9sYXRlKHRoaXMuZnJvbSwgdGhpcy50byk7XG4gICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBBbmltYXRpb24ucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBlbGFwc2VkLCB0LCB2YWx1ZSwgdGltZU5vdywgaW5kZXgsIGtleXBhdGg7XG4gICAgICAgICAgICAgICAga2V5cGF0aCA9IHRoaXMua2V5cGF0aDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVOb3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICBlbGFwc2VkID0gdGltZU5vdyAtIHRoaXMuc3RhcnRUaW1lO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxhcHNlZCA+PSB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5cGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdC5zZXQoa2V5cGF0aCwgdGhpcy50byk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGVwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwKDEsIHRoaXMudG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlKDEsIHRoaXMudG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzLnJvb3QuX2FuaW1hdGlvbnMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuKCdBbmltYXRpb24gd2FzIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290Ll9hbmltYXRpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ID0gdGhpcy5lYXNpbmcgPyB0aGlzLmVhc2luZyhlbGFwc2VkIC8gdGhpcy5kdXJhdGlvbikgOiBlbGFwc2VkIC8gdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleXBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5pbnRlcnBvbGF0b3IodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3Quc2V0KGtleXBhdGgsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGVwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXAodCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMucm9vdC5fYW5pbWF0aW9ucy5pbmRleE9mKHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgd2FybignQW5pbWF0aW9uIHdhcyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5yb290Ll9hbmltYXRpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBBbmltYXRpb247XG4gICAgfSh1dGlsc193YXJuLCBzaGFyZWRfaW50ZXJwb2xhdGUpO1xudmFyIHJlZ2lzdHJpZXNfZWFzaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxpbmVhcjogZnVuY3Rpb24gKHBvcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3M7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWFzZUluOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucG93KHBvcywgMyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWFzZU91dDogZnVuY3Rpb24gKHBvcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnBvdyhwb3MgLSAxLCAzKSArIDE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWFzZUluT3V0OiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgICAgICAgICAgaWYgKChwb3MgLz0gMC41KSA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIE1hdGgucG93KHBvcywgMyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiAoTWF0aC5wb3cocG9zIC0gMiwgMykgKyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfYW5pbWF0ZV9fYW5pbWF0ZSA9IGZ1bmN0aW9uIChpc0VxdWFsLCBhbmltYXRpb25zLCBBbmltYXRpb24sIGVhc2luZ1JlZ2lzdHJ5KSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgbm9BbmltYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoa2V5cGF0aCwgdG8sIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBrLCBhbmltYXRpb24sIGFuaW1hdGlvbnMsIGVhc2luZywgZHVyYXRpb24sIHN0ZXAsIGNvbXBsZXRlLCBtYWtlVmFsdWVDb2xsZWN0b3IsIGN1cnJlbnRWYWx1ZXMsIGNvbGxlY3RWYWx1ZSwgZHVtbXksIGR1bW15T3B0aW9ucztcbiAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5cGF0aCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gdG8gfHwge307XG4gICAgICAgICAgICAgICAgZWFzaW5nID0gb3B0aW9ucy5lYXNpbmc7XG4gICAgICAgICAgICAgICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbnMgPSBbXTtcbiAgICAgICAgICAgICAgICBzdGVwID0gb3B0aW9ucy5zdGVwO1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlID0gb3B0aW9ucy5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICBpZiAoc3RlcCB8fCBjb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWVzID0ge307XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc3RlcCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29tcGxldGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBtYWtlVmFsdWVDb2xsZWN0b3IgPSBmdW5jdGlvbiAoa2V5cGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZXNba2V5cGF0aF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoayBpbiBrZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlwYXRoLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcCB8fCBjb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3RWYWx1ZSA9IG1ha2VWYWx1ZUNvbGxlY3RvcihrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlYXNpbmc6IGVhc2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnN0ZXAgPSBjb2xsZWN0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbXBsZXRlID0gY29sbGVjdFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbnNbYW5pbWF0aW9ucy5sZW5ndGhdID0gYW5pbWF0ZSh0aGlzLCBrLCBrZXlwYXRoW2tdLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RlcCB8fCBjb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICBkdW1teU9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNpbmc6IGVhc2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVtbXlPcHRpb25zLnN0ZXAgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAodCwgY3VycmVudFZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVtbXlPcHRpb25zLmNvbXBsZXRlID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZSh0LCBjdXJyZW50VmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uc1thbmltYXRpb25zLmxlbmd0aF0gPSBkdW1teSA9IGFuaW1hdGUodGhpcywgbnVsbCwgbnVsbCwgZHVtbXlPcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGFuaW1hdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9ucy5wb3AoKS5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHVtbXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdW1teS5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgICAgICBhbmltYXRpb24gPSBhbmltYXRlKHRoaXMsIGtleXBhdGgsIHRvLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24uc3RvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGFuaW1hdGUocm9vdCwga2V5cGF0aCwgdG8sIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBlYXNpbmcsIGR1cmF0aW9uLCBhbmltYXRpb24sIGZyb207XG4gICAgICAgICAgICBpZiAoa2V5cGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZyb20gPSByb290LmdldChrZXlwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFuaW1hdGlvbnMuYWJvcnQoa2V5cGF0aCwgcm9vdCk7XG4gICAgICAgICAgICBpZiAoaXNFcXVhbChmcm9tLCB0bykpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5jb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbXBsZXRlKDEsIG9wdGlvbnMudG8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbm9BbmltYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5lYXNpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZWFzaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGVhc2luZyA9IG9wdGlvbnMuZWFzaW5nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb290LmVhc2luZyAmJiByb290LmVhc2luZ1tvcHRpb25zLmVhc2luZ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2luZyA9IHJvb3QuZWFzaW5nW29wdGlvbnMuZWFzaW5nXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2luZyA9IGVhc2luZ1JlZ2lzdHJ5W29wdGlvbnMuZWFzaW5nXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVhc2luZyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBlYXNpbmcgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiA9PT0gdW5kZWZpbmVkID8gNDAwIDogb3B0aW9ucy5kdXJhdGlvbjtcbiAgICAgICAgICAgIGFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgICAgIGtleXBhdGg6IGtleXBhdGgsXG4gICAgICAgICAgICAgICAgZnJvbTogZnJvbSxcbiAgICAgICAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgICAgICAgcm9vdDogcm9vdCxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgZWFzaW5nOiBlYXNpbmcsXG4gICAgICAgICAgICAgICAgc3RlcDogb3B0aW9ucy5zdGVwLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBvcHRpb25zLmNvbXBsZXRlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFuaW1hdGlvbnMuYWRkKGFuaW1hdGlvbik7XG4gICAgICAgICAgICByb290Ll9hbmltYXRpb25zW3Jvb3QuX2FuaW1hdGlvbnMubGVuZ3RoXSA9IGFuaW1hdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBhbmltYXRpb247XG4gICAgICAgIH1cbiAgICB9KHV0aWxzX2lzRXF1YWwsIFJhY3RpdmVfcHJvdG90eXBlX2FuaW1hdGVfYW5pbWF0aW9ucywgUmFjdGl2ZV9wcm90b3R5cGVfYW5pbWF0ZV9BbmltYXRpb24sIHJlZ2lzdHJpZXNfZWFzaW5nKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9vbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLCBsaXN0ZW5lcnMsIG47XG4gICAgICAgICAgICBpZiAodHlwZW9mIGV2ZW50TmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKG4gaW4gZXZlbnROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudE5hbWUuaGFzT3duUHJvcGVydHkobikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoXSA9IHRoaXMub24obiwgZXZlbnROYW1lW25dKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnBvcCgpLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5fc3Vic1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Vic1tldmVudE5hbWVdID0gW2NhbGxiYWNrXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Vic1tldmVudE5hbWVdLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjYW5jZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vZmYoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfb2ZmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgc3Vic2NyaWJlcnMsIGluZGV4O1xuICAgICAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGlmICghZXZlbnROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoZXZlbnROYW1lIGluIHRoaXMuX3N1YnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9zdWJzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdWJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpYmVycyA9IHRoaXMuX3N1YnNbZXZlbnROYW1lXTtcbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVycykge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gc3Vic2NyaWJlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgc2hhcmVkX3JlZ2lzdGVyRGVwZW5kYW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkZXBlbmRhbnQpIHtcbiAgICAgICAgICAgIHZhciBkZXBzQnlLZXlwYXRoLCBkZXBzLCBrZXlzLCBwYXJlbnRLZXlwYXRoLCBtYXAsIHJhY3RpdmUsIGtleXBhdGgsIHByaW9yaXR5O1xuICAgICAgICAgICAgcmFjdGl2ZSA9IGRlcGVuZGFudC5yb290O1xuICAgICAgICAgICAga2V5cGF0aCA9IGRlcGVuZGFudC5rZXlwYXRoO1xuICAgICAgICAgICAgcHJpb3JpdHkgPSBkZXBlbmRhbnQucHJpb3JpdHk7XG4gICAgICAgICAgICBkZXBzQnlLZXlwYXRoID0gcmFjdGl2ZS5fZGVwc1twcmlvcml0eV0gfHwgKHJhY3RpdmUuX2RlcHNbcHJpb3JpdHldID0ge30pO1xuICAgICAgICAgICAgZGVwcyA9IGRlcHNCeUtleXBhdGhba2V5cGF0aF0gfHwgKGRlcHNCeUtleXBhdGhba2V5cGF0aF0gPSBbXSk7XG4gICAgICAgICAgICBkZXBzW2RlcHMubGVuZ3RoXSA9IGRlcGVuZGFudDtcbiAgICAgICAgICAgIGRlcGVuZGFudC5yZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICgha2V5cGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleXMgPSBrZXlwYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBrZXlzLnBvcCgpO1xuICAgICAgICAgICAgICAgIHBhcmVudEtleXBhdGggPSBrZXlzLmpvaW4oJy4nKTtcbiAgICAgICAgICAgICAgICBtYXAgPSByYWN0aXZlLl9kZXBzTWFwW3BhcmVudEtleXBhdGhdIHx8IChyYWN0aXZlLl9kZXBzTWFwW3BhcmVudEtleXBhdGhdID0gW10pO1xuICAgICAgICAgICAgICAgIGlmIChtYXBba2V5cGF0aF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBtYXBba2V5cGF0aF0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBtYXBbbWFwLmxlbmd0aF0gPSBrZXlwYXRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtYXBba2V5cGF0aF0gKz0gMTtcbiAgICAgICAgICAgICAgICBrZXlwYXRoID0gcGFyZW50S2V5cGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgc2hhcmVkX3VucmVnaXN0ZXJEZXBlbmRhbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGRlcGVuZGFudCkge1xuICAgICAgICAgICAgdmFyIGRlcHMsIGluZGV4LCBrZXlzLCBwYXJlbnRLZXlwYXRoLCBtYXAsIHJhY3RpdmUsIGtleXBhdGgsIHByaW9yaXR5O1xuICAgICAgICAgICAgcmFjdGl2ZSA9IGRlcGVuZGFudC5yb290O1xuICAgICAgICAgICAga2V5cGF0aCA9IGRlcGVuZGFudC5rZXlwYXRoO1xuICAgICAgICAgICAgcHJpb3JpdHkgPSBkZXBlbmRhbnQucHJpb3JpdHk7XG4gICAgICAgICAgICBkZXBzID0gcmFjdGl2ZS5fZGVwc1twcmlvcml0eV1ba2V5cGF0aF07XG4gICAgICAgICAgICBpbmRleCA9IGRlcHMuaW5kZXhPZihkZXBlbmRhbnQpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSB8fCAhZGVwZW5kYW50LnJlZ2lzdGVyZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHRlZCB0byByZW1vdmUgYSBkZXBlbmRhbnQgdGhhdCB3YXMgbm8gbG9uZ2VyIHJlZ2lzdGVyZWQhIFRoaXMgc2hvdWxkIG5vdCBoYXBwZW4uIElmIHlvdSBhcmUgc2VlaW5nIHRoaXMgYnVnIGluIGRldmVsb3BtZW50IHBsZWFzZSByYWlzZSBhbiBpc3N1ZSBhdCBodHRwczovL2dpdGh1Yi5jb20vUmFjdGl2ZUpTL1JhY3RpdmUvaXNzdWVzIC0gdGhhbmtzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXBzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBkZXBlbmRhbnQucmVnaXN0ZXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFrZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5cyA9IGtleXBhdGguc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGtleXMucG9wKCk7XG4gICAgICAgICAgICAgICAgcGFyZW50S2V5cGF0aCA9IGtleXMuam9pbignLicpO1xuICAgICAgICAgICAgICAgIG1hcCA9IHJhY3RpdmUuX2RlcHNNYXBbcGFyZW50S2V5cGF0aF07XG4gICAgICAgICAgICAgICAgbWFwW2tleXBhdGhdIC09IDE7XG4gICAgICAgICAgICAgICAgaWYgKCFtYXBba2V5cGF0aF0pIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwLnNwbGljZShtYXAuaW5kZXhPZihrZXlwYXRoKSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIG1hcFtrZXlwYXRoXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5cGF0aCA9IHBhcmVudEtleXBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX29ic2VydmVfT2JzZXJ2ZXIgPSBmdW5jdGlvbiAoaXNFcXVhbCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIE9ic2VydmVyID0gZnVuY3Rpb24gKHJhY3RpdmUsIGtleXBhdGgsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnJvb3QgPSByYWN0aXZlO1xuICAgICAgICAgICAgdGhpcy5rZXlwYXRoID0ga2V5cGF0aDtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgICAgIHRoaXMuZGVmZXIgPSBvcHRpb25zLmRlZmVyO1xuICAgICAgICAgICAgdGhpcy5kZWJ1ZyA9IG9wdGlvbnMuZGVidWc7XG4gICAgICAgICAgICB0aGlzLnByb3h5ID0ge1xuICAgICAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlYWxseVVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnByaW9yaXR5ID0gMDtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5jb250ZXh0ID8gb3B0aW9ucy5jb250ZXh0IDogcmFjdGl2ZTtcbiAgICAgICAgfTtcbiAgICAgICAgT2JzZXJ2ZXIucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKGltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChpbW1lZGlhdGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucm9vdC5nZXQodGhpcy5rZXlwYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVmZXIgJiYgdGhpcy5yZWFkeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3QuX2RlZmVycmVkLm9ic2VydmVycy5wdXNoKHRoaXMucHJveHkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucmVhbGx5VXBkYXRlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVhbGx5VXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZFZhbHVlLCBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLnJvb3QuZ2V0KHRoaXMua2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnVwZGF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgfHwgIXRoaXMucmVhZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2suY2FsbCh0aGlzLmNvbnRleHQsIG5ld1ZhbHVlLCBvbGRWYWx1ZSwgdGhpcy5rZXlwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1ZyB8fCB0aGlzLnJvb3QuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gT2JzZXJ2ZXI7XG4gICAgfSh1dGlsc19pc0VxdWFsKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9vYnNlcnZlX2dldFBhdHRlcm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHJhY3RpdmUsIHBhdHRlcm4pIHtcbiAgICAgICAgICAgIHZhciBrZXlzLCBrZXksIHZhbHVlcywgdG9HZXQsIG5ld1RvR2V0LCBleHBhbmQsIGNvbmNhdGVuYXRlO1xuICAgICAgICAgICAga2V5cyA9IHBhdHRlcm4uc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIHRvR2V0ID0gW107XG4gICAgICAgICAgICBleHBhbmQgPSBmdW5jdGlvbiAoa2V5cGF0aCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSwga2V5O1xuICAgICAgICAgICAgICAgIHZhbHVlID0gcmFjdGl2ZS5fd3JhcHBlZFtrZXlwYXRoXSA/IHJhY3RpdmUuX3dyYXBwZWRba2V5cGF0aF0uZ2V0KCkgOiByYWN0aXZlLmdldChrZXlwYXRoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdUb0dldC5wdXNoKGtleXBhdGggKyAnLicgKyBrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25jYXRlbmF0ZSA9IGZ1bmN0aW9uIChrZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleXBhdGggKyAnLicgKyBrZXk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2hpbGUgKGtleSA9IGtleXMuc2hpZnQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICcqJykge1xuICAgICAgICAgICAgICAgICAgICBuZXdUb0dldCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0b0dldC5mb3JFYWNoKGV4cGFuZCk7XG4gICAgICAgICAgICAgICAgICAgIHRvR2V0ID0gbmV3VG9HZXQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0b0dldFswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9HZXRbMF0gPSBrZXk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b0dldCA9IHRvR2V0Lm1hcChjb25jYXRlbmF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZXMgPSB7fTtcbiAgICAgICAgICAgIHRvR2V0LmZvckVhY2goZnVuY3Rpb24gKGtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXNba2V5cGF0aF0gPSByYWN0aXZlLmdldChrZXlwYXRoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfb2JzZXJ2ZV9QYXR0ZXJuT2JzZXJ2ZXIgPSBmdW5jdGlvbiAoaXNFcXVhbCwgZ2V0UGF0dGVybikge1xuICAgICAgICBcbiAgICAgICAgdmFyIFBhdHRlcm5PYnNlcnZlciwgd2lsZGNhcmQgPSAvXFwqLztcbiAgICAgICAgUGF0dGVybk9ic2VydmVyID0gZnVuY3Rpb24gKHJhY3RpdmUsIGtleXBhdGgsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnJvb3QgPSByYWN0aXZlO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgdGhpcy5kZWZlciA9IG9wdGlvbnMuZGVmZXI7XG4gICAgICAgICAgICB0aGlzLmRlYnVnID0gb3B0aW9ucy5kZWJ1ZztcbiAgICAgICAgICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgICAgICAgICB0aGlzLnJlZ2V4ID0gbmV3IFJlZ0V4cCgnXicgKyBrZXlwYXRoLnJlcGxhY2UoL1xcLi9nLCAnXFxcXC4nKS5yZXBsYWNlKC9cXCovZywgJ1teXFxcXC5dKycpICsgJyQnKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzID0ge307XG4gICAgICAgICAgICBpZiAodGhpcy5kZWZlcikge1xuICAgICAgICAgICAgICAgIHRoaXMucHJveGllcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcmlvcml0eSA9ICdwYXR0ZXJuJztcbiAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5jb250ZXh0ID8gb3B0aW9ucy5jb250ZXh0IDogcmFjdGl2ZTtcbiAgICAgICAgfTtcbiAgICAgICAgUGF0dGVybk9ic2VydmVyLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVzLCBrZXlwYXRoO1xuICAgICAgICAgICAgICAgIHZhbHVlcyA9IGdldFBhdHRlcm4odGhpcy5yb290LCB0aGlzLmtleXBhdGgpO1xuICAgICAgICAgICAgICAgIGlmIChpbW1lZGlhdGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoa2V5cGF0aCBpbiB2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkoa2V5cGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZShrZXlwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChrZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlcztcbiAgICAgICAgICAgICAgICBpZiAod2lsZGNhcmQudGVzdChrZXlwYXRoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSBnZXRQYXR0ZXJuKHRoaXMucm9vdCwga2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoa2V5cGF0aCBpbiB2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkoa2V5cGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZShrZXlwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlZmVyICYmIHRoaXMucmVhZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290Ll9kZWZlcnJlZC5vYnNlcnZlcnMucHVzaCh0aGlzLmdldFByb3h5KGtleXBhdGgpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnJlYWxseVVwZGF0ZShrZXlwYXRoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWFsbHlVcGRhdGU6IGZ1bmN0aW9uIChrZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5yb290LmdldChrZXlwYXRoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51cGRhdGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlc1trZXlwYXRoXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICghaXNFcXVhbCh2YWx1ZSwgdGhpcy52YWx1ZXNba2V5cGF0aF0pIHx8ICF0aGlzLnJlYWR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy5jb250ZXh0LCB2YWx1ZSwgdGhpcy52YWx1ZXNba2V5cGF0aF0sIGtleXBhdGgpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnIHx8IHRoaXMucm9vdC5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlc1trZXlwYXRoXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0UHJveHk6IGZ1bmN0aW9uIChrZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wcm94aWVzW2tleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJveGllc1trZXlwYXRoXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVhbGx5VXBkYXRlKGtleXBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm94aWVzW2tleXBhdGhdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUGF0dGVybk9ic2VydmVyO1xuICAgIH0odXRpbHNfaXNFcXVhbCwgUmFjdGl2ZV9wcm90b3R5cGVfb2JzZXJ2ZV9nZXRQYXR0ZXJuKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9vYnNlcnZlX2dldE9ic2VydmVyRmFjYWRlID0gZnVuY3Rpb24gKG5vcm1hbGlzZUtleXBhdGgsIHJlZ2lzdGVyRGVwZW5kYW50LCB1bnJlZ2lzdGVyRGVwZW5kYW50LCBPYnNlcnZlciwgUGF0dGVybk9ic2VydmVyKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgd2lsZGNhcmQgPSAvXFwqLywgZW1wdHlPYmplY3QgPSB7fTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGdldE9ic2VydmVyRmFjYWRlKHJhY3RpdmUsIGtleXBhdGgsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXIsIGlzUGF0dGVybk9ic2VydmVyO1xuICAgICAgICAgICAga2V5cGF0aCA9IG5vcm1hbGlzZUtleXBhdGgoa2V5cGF0aCk7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCBlbXB0eU9iamVjdDtcbiAgICAgICAgICAgIGlmICh3aWxkY2FyZC50ZXN0KGtleXBhdGgpKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIgPSBuZXcgUGF0dGVybk9ic2VydmVyKHJhY3RpdmUsIGtleXBhdGgsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICByYWN0aXZlLl9wYXR0ZXJuT2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICAgICAgICAgICAgICAgIGlzUGF0dGVybk9ic2VydmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXIocmFjdGl2ZSwga2V5cGF0aCwgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVnaXN0ZXJEZXBlbmRhbnQob2JzZXJ2ZXIpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuaW5pdChvcHRpb25zLmluaXQpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjYW5jZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNQYXR0ZXJuT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gcmFjdGl2ZS5fcGF0dGVybk9ic2VydmVycy5pbmRleE9mKG9ic2VydmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWN0aXZlLl9wYXR0ZXJuT2JzZXJ2ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdW5yZWdpc3RlckRlcGVuZGFudChvYnNlcnZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9KHV0aWxzX25vcm1hbGlzZUtleXBhdGgsIHNoYXJlZF9yZWdpc3RlckRlcGVuZGFudCwgc2hhcmVkX3VucmVnaXN0ZXJEZXBlbmRhbnQsIFJhY3RpdmVfcHJvdG90eXBlX29ic2VydmVfT2JzZXJ2ZXIsIFJhY3RpdmVfcHJvdG90eXBlX29ic2VydmVfUGF0dGVybk9ic2VydmVyKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9vYnNlcnZlX19vYnNlcnZlID0gZnVuY3Rpb24gKGlzT2JqZWN0LCBnZXRPYnNlcnZlckZhY2FkZSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9ic2VydmUoa2V5cGF0aCwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBvYnNlcnZlcnMgPSBbXSwgaztcbiAgICAgICAgICAgIGlmIChpc09iamVjdChrZXlwYXRoKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICBmb3IgKGsgaW4ga2V5cGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5cGF0aC5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBrZXlwYXRoW2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXJzW29ic2VydmVycy5sZW5ndGhdID0gZ2V0T2JzZXJ2ZXJGYWNhZGUodGhpcywgaywgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlcnMucG9wKCkuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGdldE9ic2VydmVyRmFjYWRlKHRoaXMsIGtleXBhdGgsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICB9KHV0aWxzX2lzT2JqZWN0LCBSYWN0aXZlX3Byb3RvdHlwZV9vYnNlcnZlX2dldE9ic2VydmVyRmFjYWRlKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9maXJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzLCBpLCBsZW4sIHN1YnNjcmliZXJzID0gdGhpcy5fc3Vic1tldmVudE5hbWVdO1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVycykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gc3Vic2NyaWJlcnMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfZmluZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5lbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJhZ21lbnQuZmluZChzZWxlY3Rvcik7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHV0aWxzX21hdGNoZXMgPSBmdW5jdGlvbiAoaXNDbGllbnQsIGNyZWF0ZUVsZW1lbnQpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBkaXYsIG1ldGhvZE5hbWVzLCB1bnByZWZpeGVkLCBwcmVmaXhlZCwgdmVuZG9ycywgaSwgaiwgbWFrZUZ1bmN0aW9uO1xuICAgICAgICBpZiAoIWlzQ2xpZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG1ldGhvZE5hbWVzID0gW1xuICAgICAgICAgICAgJ21hdGNoZXMnLFxuICAgICAgICAgICAgJ21hdGNoZXNTZWxlY3RvcidcbiAgICAgICAgXTtcbiAgICAgICAgdmVuZG9ycyA9IFtcbiAgICAgICAgICAgICdvJyxcbiAgICAgICAgICAgICdtcycsXG4gICAgICAgICAgICAnbW96JyxcbiAgICAgICAgICAgICd3ZWJraXQnXG4gICAgICAgIF07XG4gICAgICAgIG1ha2VGdW5jdGlvbiA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5vZGUsIHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVbbWV0aG9kTmFtZV0oc2VsZWN0b3IpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgaSA9IG1ldGhvZE5hbWVzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdW5wcmVmaXhlZCA9IG1ldGhvZE5hbWVzW2ldO1xuICAgICAgICAgICAgaWYgKGRpdlt1bnByZWZpeGVkXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYWtlRnVuY3Rpb24odW5wcmVmaXhlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqID0gdmVuZG9ycy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgICAgICAgICAgcHJlZml4ZWQgPSB2ZW5kb3JzW2ldICsgdW5wcmVmaXhlZC5zdWJzdHIoMCwgMSkudG9VcHBlckNhc2UoKSArIHVucHJlZml4ZWQuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgICAgIGlmIChkaXZbcHJlZml4ZWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYWtlRnVuY3Rpb24ocHJlZml4ZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5vZGUsIHNlbGVjdG9yKSB7XG4gICAgICAgICAgICB2YXIgbm9kZXMsIGk7XG4gICAgICAgICAgICBub2RlcyA9IChub2RlLnBhcmVudE5vZGUgfHwgbm9kZS5kb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICBpID0gbm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGlmIChub2Rlc1tpXSA9PT0gbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgfShjb25maWdfaXNDbGllbnQsIHV0aWxzX2NyZWF0ZUVsZW1lbnQpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX3NoYXJlZF9tYWtlUXVlcnlfdGVzdCA9IGZ1bmN0aW9uIChtYXRjaGVzKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGl0ZW0sIG5vRGlydHkpIHtcbiAgICAgICAgICAgIHZhciBpdGVtTWF0Y2hlcyA9IHRoaXMuX2lzQ29tcG9uZW50UXVlcnkgPyAhdGhpcy5zZWxlY3RvciB8fCBpdGVtLm5hbWUgPT09IHRoaXMuc2VsZWN0b3IgOiBtYXRjaGVzKGl0ZW0ubm9kZSwgdGhpcy5zZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAoaXRlbU1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2goaXRlbS5ub2RlIHx8IGl0ZW0uaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgIGlmICghbm9EaXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWtlRGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSh1dGlsc19tYXRjaGVzKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfbWFrZVF1ZXJ5X2NhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbGl2ZVF1ZXJpZXMsIHNlbGVjdG9yLCBpbmRleDtcbiAgICAgICAgICAgIGxpdmVRdWVyaWVzID0gdGhpcy5fcm9vdFt0aGlzLl9pc0NvbXBvbmVudFF1ZXJ5ID8gJ2xpdmVDb21wb25lbnRRdWVyaWVzJyA6ICdsaXZlUXVlcmllcyddO1xuICAgICAgICAgICAgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yO1xuICAgICAgICAgICAgaW5kZXggPSBsaXZlUXVlcmllcy5pbmRleE9mKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsaXZlUXVlcmllcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIGxpdmVRdWVyaWVzW3NlbGVjdG9yXSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX3NoYXJlZF9tYWtlUXVlcnlfc29ydEJ5SXRlbVBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICB2YXIgYW5jZXN0cnlBLCBhbmNlc3RyeUIsIG9sZGVzdEEsIG9sZGVzdEIsIG11dHVhbEFuY2VzdG9yLCBpbmRleEEsIGluZGV4QiwgZnJhZ21lbnRzLCBmcmFnbWVudEEsIGZyYWdtZW50QjtcbiAgICAgICAgICAgIGFuY2VzdHJ5QSA9IGdldEFuY2VzdHJ5KGEuY29tcG9uZW50IHx8IGEuX3JhY3RpdmUucHJveHkpO1xuICAgICAgICAgICAgYW5jZXN0cnlCID0gZ2V0QW5jZXN0cnkoYi5jb21wb25lbnQgfHwgYi5fcmFjdGl2ZS5wcm94eSk7XG4gICAgICAgICAgICBvbGRlc3RBID0gYW5jZXN0cnlBW2FuY2VzdHJ5QS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIG9sZGVzdEIgPSBhbmNlc3RyeUJbYW5jZXN0cnlCLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgd2hpbGUgKG9sZGVzdEEgJiYgb2xkZXN0QSA9PT0gb2xkZXN0Qikge1xuICAgICAgICAgICAgICAgIGFuY2VzdHJ5QS5wb3AoKTtcbiAgICAgICAgICAgICAgICBhbmNlc3RyeUIucG9wKCk7XG4gICAgICAgICAgICAgICAgbXV0dWFsQW5jZXN0b3IgPSBvbGRlc3RBO1xuICAgICAgICAgICAgICAgIG9sZGVzdEEgPSBhbmNlc3RyeUFbYW5jZXN0cnlBLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIG9sZGVzdEIgPSBhbmNlc3RyeUJbYW5jZXN0cnlCLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2xkZXN0QSA9IG9sZGVzdEEuY29tcG9uZW50IHx8IG9sZGVzdEE7XG4gICAgICAgICAgICBvbGRlc3RCID0gb2xkZXN0Qi5jb21wb25lbnQgfHwgb2xkZXN0QjtcbiAgICAgICAgICAgIGZyYWdtZW50QSA9IG9sZGVzdEEucGFyZW50RnJhZ21lbnQ7XG4gICAgICAgICAgICBmcmFnbWVudEIgPSBvbGRlc3RCLnBhcmVudEZyYWdtZW50O1xuICAgICAgICAgICAgaWYgKGZyYWdtZW50QSA9PT0gZnJhZ21lbnRCKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhBID0gZnJhZ21lbnRBLml0ZW1zLmluZGV4T2Yob2xkZXN0QSk7XG4gICAgICAgICAgICAgICAgaW5kZXhCID0gZnJhZ21lbnRCLml0ZW1zLmluZGV4T2Yob2xkZXN0Qik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4QSAtIGluZGV4QiB8fCBhbmNlc3RyeUEubGVuZ3RoIC0gYW5jZXN0cnlCLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmcmFnbWVudHMgPSBtdXR1YWxBbmNlc3Rvci5mcmFnbWVudHMpIHtcbiAgICAgICAgICAgICAgICBpbmRleEEgPSBmcmFnbWVudHMuaW5kZXhPZihmcmFnbWVudEEpO1xuICAgICAgICAgICAgICAgIGluZGV4QiA9IGZyYWdtZW50cy5pbmRleE9mKGZyYWdtZW50Qik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4QSAtIGluZGV4QiB8fCBhbmNlc3RyeUEubGVuZ3RoIC0gYW5jZXN0cnlCLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQW4gdW5leHBlY3RlZCBjb25kaXRpb24gd2FzIG1ldCB3aGlsZSBjb21wYXJpbmcgdGhlIHBvc2l0aW9uIG9mIHR3byBjb21wb25lbnRzLiBQbGVhc2UgZmlsZSBhbiBpc3N1ZSBhdCBodHRwczovL2dpdGh1Yi5jb20vUmFjdGl2ZUpTL1JhY3RpdmUvaXNzdWVzIC0gdGhhbmtzIScpO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBnZXRQYXJlbnQoaXRlbSkge1xuICAgICAgICAgICAgdmFyIHBhcmVudEZyYWdtZW50O1xuICAgICAgICAgICAgaWYgKHBhcmVudEZyYWdtZW50ID0gaXRlbS5wYXJlbnRGcmFnbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnRGcmFnbWVudC5vd25lcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpdGVtLmNvbXBvbmVudCAmJiAocGFyZW50RnJhZ21lbnQgPSBpdGVtLmNvbXBvbmVudC5wYXJlbnRGcmFnbWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50RnJhZ21lbnQub3duZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0QW5jZXN0cnkoaXRlbSkge1xuICAgICAgICAgICAgdmFyIGFuY2VzdHJ5LCBhbmNlc3RvcjtcbiAgICAgICAgICAgIGFuY2VzdHJ5ID0gW2l0ZW1dO1xuICAgICAgICAgICAgYW5jZXN0b3IgPSBnZXRQYXJlbnQoaXRlbSk7XG4gICAgICAgICAgICB3aGlsZSAoYW5jZXN0b3IpIHtcbiAgICAgICAgICAgICAgICBhbmNlc3RyeS5wdXNoKGFuY2VzdG9yKTtcbiAgICAgICAgICAgICAgICBhbmNlc3RvciA9IGdldFBhcmVudChhbmNlc3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYW5jZXN0cnk7XG4gICAgICAgIH1cbiAgICB9KCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX21ha2VRdWVyeV9zb3J0QnlEb2N1bWVudFBvc2l0aW9uID0gZnVuY3Rpb24gKHNvcnRCeUl0ZW1Qb3NpdGlvbikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChub2RlLCBvdGhlck5vZGUpIHtcbiAgICAgICAgICAgIHZhciBiaXRtYXNrO1xuICAgICAgICAgICAgaWYgKG5vZGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBiaXRtYXNrID0gbm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihvdGhlck5vZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBiaXRtYXNrICYgMiA/IDEgOiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzb3J0QnlJdGVtUG9zaXRpb24obm9kZSwgb3RoZXJOb2RlKTtcbiAgICAgICAgfTtcbiAgICB9KFJhY3RpdmVfcHJvdG90eXBlX3NoYXJlZF9tYWtlUXVlcnlfc29ydEJ5SXRlbVBvc2l0aW9uKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfbWFrZVF1ZXJ5X3NvcnQgPSBmdW5jdGlvbiAoc29ydEJ5RG9jdW1lbnRQb3NpdGlvbiwgc29ydEJ5SXRlbVBvc2l0aW9uKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zb3J0KHRoaXMuX2lzQ29tcG9uZW50UXVlcnkgPyBzb3J0QnlJdGVtUG9zaXRpb24gOiBzb3J0QnlEb2N1bWVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgfShSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfbWFrZVF1ZXJ5X3NvcnRCeURvY3VtZW50UG9zaXRpb24sIFJhY3RpdmVfcHJvdG90eXBlX3NoYXJlZF9tYWtlUXVlcnlfc29ydEJ5SXRlbVBvc2l0aW9uKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfbWFrZVF1ZXJ5X2RpcnR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZGlydHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb290Ll9kZWZlcnJlZC5saXZlUXVlcmllcy5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX21ha2VRdWVyeV9yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuaW5kZXhPZih0aGlzLl9pc0NvbXBvbmVudFF1ZXJ5ID8gaXRlbS5pbnN0YW5jZSA6IGl0ZW0ubm9kZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfbWFrZVF1ZXJ5X19tYWtlUXVlcnkgPSBmdW5jdGlvbiAoZGVmaW5lUHJvcGVydGllcywgdGVzdCwgY2FuY2VsLCBzb3J0LCBkaXJ0eSwgcmVtb3ZlKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHJhY3RpdmUsIHNlbGVjdG9yLCBsaXZlLCBpc0NvbXBvbmVudFF1ZXJ5KSB7XG4gICAgICAgICAgICB2YXIgcXVlcnk7XG4gICAgICAgICAgICBxdWVyeSA9IFtdO1xuICAgICAgICAgICAgZGVmaW5lUHJvcGVydGllcyhxdWVyeSwge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiB7IHZhbHVlOiBzZWxlY3RvciB9LFxuICAgICAgICAgICAgICAgIGxpdmU6IHsgdmFsdWU6IGxpdmUgfSxcbiAgICAgICAgICAgICAgICBfaXNDb21wb25lbnRRdWVyeTogeyB2YWx1ZTogaXNDb21wb25lbnRRdWVyeSB9LFxuICAgICAgICAgICAgICAgIF90ZXN0OiB7IHZhbHVlOiB0ZXN0IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFsaXZlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmaW5lUHJvcGVydGllcyhxdWVyeSwge1xuICAgICAgICAgICAgICAgIGNhbmNlbDogeyB2YWx1ZTogY2FuY2VsIH0sXG4gICAgICAgICAgICAgICAgX3Jvb3Q6IHsgdmFsdWU6IHJhY3RpdmUgfSxcbiAgICAgICAgICAgICAgICBfc29ydDogeyB2YWx1ZTogc29ydCB9LFxuICAgICAgICAgICAgICAgIF9tYWtlRGlydHk6IHsgdmFsdWU6IGRpcnR5IH0sXG4gICAgICAgICAgICAgICAgX3JlbW92ZTogeyB2YWx1ZTogcmVtb3ZlIH0sXG4gICAgICAgICAgICAgICAgX2RpcnR5OiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBxdWVyeTtcbiAgICAgICAgfTtcbiAgICB9KHV0aWxzX2RlZmluZVByb3BlcnRpZXMsIFJhY3RpdmVfcHJvdG90eXBlX3NoYXJlZF9tYWtlUXVlcnlfdGVzdCwgUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX21ha2VRdWVyeV9jYW5jZWwsIFJhY3RpdmVfcHJvdG90eXBlX3NoYXJlZF9tYWtlUXVlcnlfc29ydCwgUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX21ha2VRdWVyeV9kaXJ0eSwgUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX21ha2VRdWVyeV9yZW1vdmUpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX2ZpbmRBbGwgPSBmdW5jdGlvbiAod2FybiwgbWF0Y2hlcywgZGVmaW5lUHJvcGVydGllcywgbWFrZVF1ZXJ5KSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlbGVjdG9yLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgbGl2ZVF1ZXJpZXMsIHF1ZXJ5O1xuICAgICAgICAgICAgaWYgKCF0aGlzLmVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgICAgICBsaXZlUXVlcmllcyA9IHRoaXMuX2xpdmVRdWVyaWVzO1xuICAgICAgICAgICAgaWYgKHF1ZXJ5ID0gbGl2ZVF1ZXJpZXNbc2VsZWN0b3JdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMgJiYgb3B0aW9ucy5saXZlID8gcXVlcnkgOiBxdWVyeS5zbGljZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVlcnkgPSBtYWtlUXVlcnkodGhpcywgc2VsZWN0b3IsICEhb3B0aW9ucy5saXZlLCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAocXVlcnkubGl2ZSkge1xuICAgICAgICAgICAgICAgIGxpdmVRdWVyaWVzLnB1c2goc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGxpdmVRdWVyaWVzW3NlbGVjdG9yXSA9IHF1ZXJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mcmFnbWVudC5maW5kQWxsKHNlbGVjdG9yLCBxdWVyeSk7XG4gICAgICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgICAgIH07XG4gICAgfSh1dGlsc193YXJuLCB1dGlsc19tYXRjaGVzLCB1dGlsc19kZWZpbmVQcm9wZXJ0aWVzLCBSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfbWFrZVF1ZXJ5X19tYWtlUXVlcnkpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX2ZpbmRDb21wb25lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mcmFnbWVudC5maW5kQ29tcG9uZW50KHNlbGVjdG9yKTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfZmluZEFsbENvbXBvbmVudHMgPSBmdW5jdGlvbiAod2FybiwgbWF0Y2hlcywgZGVmaW5lUHJvcGVydGllcywgbWFrZVF1ZXJ5KSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlbGVjdG9yLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgbGl2ZVF1ZXJpZXMsIHF1ZXJ5O1xuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgICAgICBsaXZlUXVlcmllcyA9IHRoaXMuX2xpdmVDb21wb25lbnRRdWVyaWVzO1xuICAgICAgICAgICAgaWYgKHF1ZXJ5ID0gbGl2ZVF1ZXJpZXNbc2VsZWN0b3JdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMgJiYgb3B0aW9ucy5saXZlID8gcXVlcnkgOiBxdWVyeS5zbGljZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVlcnkgPSBtYWtlUXVlcnkodGhpcywgc2VsZWN0b3IsICEhb3B0aW9ucy5saXZlLCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChxdWVyeS5saXZlKSB7XG4gICAgICAgICAgICAgICAgbGl2ZVF1ZXJpZXMucHVzaChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgbGl2ZVF1ZXJpZXNbc2VsZWN0b3JdID0gcXVlcnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZyYWdtZW50LmZpbmRBbGxDb21wb25lbnRzKHNlbGVjdG9yLCBxdWVyeSk7XG4gICAgICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgICAgIH07XG4gICAgfSh1dGlsc193YXJuLCB1dGlsc19tYXRjaGVzLCB1dGlsc19kZWZpbmVQcm9wZXJ0aWVzLCBSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfbWFrZVF1ZXJ5X19tYWtlUXVlcnkpO1xudmFyIHV0aWxzX2dldEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgICAgICB2YXIgb3V0cHV0O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICFkb2N1bWVudCB8fCAhaW5wdXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbnB1dC5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5wdXQpO1xuICAgICAgICAgICAgICAgIGlmICghb3V0cHV0ICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpbnB1dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvdXRwdXQgJiYgb3V0cHV0Lm5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlucHV0WzBdICYmIGlucHV0WzBdLm5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0WzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHJlbmRlcl9zaGFyZWRfaW5pdEZyYWdtZW50ID0gZnVuY3Rpb24gKHR5cGVzLCBjcmVhdGUpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZnJhZ21lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBudW1JdGVtcywgaSwgcGFyZW50RnJhZ21lbnQsIHBhcmVudFJlZnMsIHJlZjtcbiAgICAgICAgICAgIGZyYWdtZW50Lm93bmVyID0gb3B0aW9ucy5vd25lcjtcbiAgICAgICAgICAgIHBhcmVudEZyYWdtZW50ID0gZnJhZ21lbnQub3duZXIucGFyZW50RnJhZ21lbnQ7XG4gICAgICAgICAgICBmcmFnbWVudC5yb290ID0gb3B0aW9ucy5yb290O1xuICAgICAgICAgICAgZnJhZ21lbnQucE5vZGUgPSBvcHRpb25zLnBOb2RlO1xuICAgICAgICAgICAgZnJhZ21lbnQuY29udGV4dFN0YWNrID0gb3B0aW9ucy5jb250ZXh0U3RhY2sgfHwgW107XG4gICAgICAgICAgICBpZiAoZnJhZ21lbnQub3duZXIudHlwZSA9PT0gdHlwZXMuU0VDVElPTikge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50LmluZGV4ID0gb3B0aW9ucy5pbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJlbnRGcmFnbWVudCkge1xuICAgICAgICAgICAgICAgIHBhcmVudFJlZnMgPSBwYXJlbnRGcmFnbWVudC5pbmRleFJlZnM7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudFJlZnMpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQuaW5kZXhSZWZzID0gY3JlYXRlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHJlZiBpbiBwYXJlbnRSZWZzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudC5pbmRleFJlZnNbcmVmXSA9IHBhcmVudFJlZnNbcmVmXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZyYWdtZW50LnByaW9yaXR5ID0gcGFyZW50RnJhZ21lbnQgPyBwYXJlbnRGcmFnbWVudC5wcmlvcml0eSArIDEgOiAxO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaW5kZXhSZWYpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZyYWdtZW50LmluZGV4UmVmcykge1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudC5pbmRleFJlZnMgPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuaW5kZXhSZWZzW29wdGlvbnMuaW5kZXhSZWZdID0gb3B0aW9ucy5pbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZyYWdtZW50Lml0ZW1zID0gW107XG4gICAgICAgICAgICBudW1JdGVtcyA9IG9wdGlvbnMuZGVzY3JpcHRvciA/IG9wdGlvbnMuZGVzY3JpcHRvci5sZW5ndGggOiAwO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG51bUl0ZW1zOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC5pdGVtc1tmcmFnbWVudC5pdGVtcy5sZW5ndGhdID0gZnJhZ21lbnQuY3JlYXRlSXRlbSh7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudEZyYWdtZW50OiBmcmFnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRvcjogb3B0aW9ucy5kZXNjcmlwdG9yW2ldLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCB1dGlsc19jcmVhdGUpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9zaGFyZWRfaW5zZXJ0SHRtbCA9IGZ1bmN0aW9uIChjcmVhdGVFbGVtZW50KSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZWxlbWVudENhY2hlID0ge307XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoaHRtbCwgdGFnTmFtZSwgZG9jRnJhZykge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciwgbm9kZXMgPSBbXTtcbiAgICAgICAgICAgIGlmIChodG1sKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gZWxlbWVudENhY2hlW3RhZ05hbWVdIHx8IChlbGVtZW50Q2FjaGVbdGFnTmFtZV0gPSBjcmVhdGVFbGVtZW50KHRhZ05hbWUpKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXNbbm9kZXMubGVuZ3RoXSA9IGNvbnRhaW5lci5maXJzdENoaWxkO1xuICAgICAgICAgICAgICAgICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKGNvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgIH07XG4gICAgfSh1dGlsc19jcmVhdGVFbGVtZW50KTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfVGV4dCA9IGZ1bmN0aW9uICh0eXBlcykge1xuICAgICAgICBcbiAgICAgICAgdmFyIERvbVRleHQsIGxlc3NUaGFuLCBncmVhdGVyVGhhbjtcbiAgICAgICAgbGVzc1RoYW4gPSAvPC9nO1xuICAgICAgICBncmVhdGVyVGhhbiA9IC8+L2c7XG4gICAgICAgIERvbVRleHQgPSBmdW5jdGlvbiAob3B0aW9ucywgZG9jRnJhZykge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZXMuVEVYVDtcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRvciA9IG9wdGlvbnMuZGVzY3JpcHRvcjtcbiAgICAgICAgICAgIGlmIChkb2NGcmFnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUob3B0aW9ucy5kZXNjcmlwdG9yKTtcbiAgICAgICAgICAgICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKHRoaXMubm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIERvbVRleHQucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgZGV0YWNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoZGVzdHJveSkge1xuICAgICAgICAgICAgICAgIGlmIChkZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpcnN0Tm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCcnICsgdGhpcy5kZXNjcmlwdG9yKS5yZXBsYWNlKGxlc3NUaGFuLCAnJmx0OycpLnJlcGxhY2UoZ3JlYXRlclRoYW4sICcmZ3Q7Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBEb21UZXh0O1xuICAgIH0oY29uZmlnX3R5cGVzKTtcbnZhciBzaGFyZWRfdGVhcmRvd24gPSBmdW5jdGlvbiAodW5yZWdpc3RlckRlcGVuZGFudCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0aGluZykge1xuICAgICAgICAgICAgaWYgKCF0aGluZy5rZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpbmcucm9vdC5fcGVuZGluZ1Jlc29sdXRpb24uaW5kZXhPZih0aGluZyk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGluZy5yb290Ll9wZW5kaW5nUmVzb2x1dGlvbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdW5yZWdpc3RlckRlcGVuZGFudCh0aGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfShzaGFyZWRfdW5yZWdpc3RlckRlcGVuZGFudCk7XG52YXIgcmVuZGVyX3NoYXJlZF9FdmFsdWF0b3JfUmVmZXJlbmNlID0gZnVuY3Rpb24gKHR5cGVzLCBpc0VxdWFsLCBkZWZpbmVQcm9wZXJ0eSwgcmVnaXN0ZXJEZXBlbmRhbnQsIHVucmVnaXN0ZXJEZXBlbmRhbnQpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBSZWZlcmVuY2UsIHRoaXNQYXR0ZXJuO1xuICAgICAgICB0aGlzUGF0dGVybiA9IC90aGlzLztcbiAgICAgICAgUmVmZXJlbmNlID0gZnVuY3Rpb24gKHJvb3QsIGtleXBhdGgsIGV2YWx1YXRvciwgYXJnTnVtLCBwcmlvcml0eSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ldmFsdWF0b3IgPSBldmFsdWF0b3I7XG4gICAgICAgICAgICB0aGlzLmtleXBhdGggPSBrZXlwYXRoO1xuICAgICAgICAgICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICAgICAgICAgIHRoaXMuYXJnTnVtID0gYXJnTnVtO1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZXMuUkVGRVJFTkNFO1xuICAgICAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICAgICAgdmFsdWUgPSByb290LmdldChrZXlwYXRoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBGdW5jdGlvbih2YWx1ZSwgcm9vdCwgZXZhbHVhdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBldmFsdWF0b3IudmFsdWVzW2FyZ051bV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJlZ2lzdGVyRGVwZW5kYW50KHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICBSZWZlcmVuY2UucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5yb290LmdldCh0aGlzLmtleXBhdGgpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgJiYgIXZhbHVlLl9ub3dyYXApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwRnVuY3Rpb24odmFsdWUsIHRoaXMucm9vdCwgdGhpcy5ldmFsdWF0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWlzRXF1YWwodmFsdWUsIHRoaXMudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZhbHVhdG9yLnZhbHVlc1t0aGlzLmFyZ051bV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmFsdWF0b3IuYnViYmxlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB1bnJlZ2lzdGVyRGVwZW5kYW50KHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUmVmZXJlbmNlO1xuICAgICAgICBmdW5jdGlvbiB3cmFwRnVuY3Rpb24oZm4sIHJhY3RpdmUsIGV2YWx1YXRvcikge1xuICAgICAgICAgICAgdmFyIHByb3AsIGV2YWx1YXRvcnMsIGluZGV4O1xuICAgICAgICAgICAgaWYgKCF0aGlzUGF0dGVybi50ZXN0KGZuLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkoZm4sICdfbm93cmFwJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWZuWydfJyArIHJhY3RpdmUuX2d1aWRdKSB7XG4gICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkoZm4sICdfJyArIHJhY3RpdmUuX2d1aWQsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbENhcHR1cmVkLCByZXN1bHQsIGksIGV2YWx1YXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsQ2FwdHVyZWQgPSByYWN0aXZlLl9jYXB0dXJlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3JpZ2luYWxDYXB0dXJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhY3RpdmUuX2NhcHR1cmVkID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmbi5hcHBseShyYWN0aXZlLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhY3RpdmUuX2NhcHR1cmVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBldmFsdWF0b3JzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2YWx1YXRvciA9IGV2YWx1YXRvcnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2YWx1YXRvci51cGRhdGVTb2Z0RGVwZW5kZW5jaWVzKHJhY3RpdmUuX2NhcHR1cmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByYWN0aXZlLl9jYXB0dXJlZCA9IG9yaWdpbmFsQ2FwdHVyZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGZvciAocHJvcCBpbiBmbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm4uaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuWydfJyArIHJhY3RpdmUuX2d1aWRdW3Byb3BdID0gZm5bcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm5bJ18nICsgcmFjdGl2ZS5fZ3VpZCArICdfZXZhbHVhdG9ycyddID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldmFsdWF0b3JzID0gZm5bJ18nICsgcmFjdGl2ZS5fZ3VpZCArICdfZXZhbHVhdG9ycyddO1xuICAgICAgICAgICAgaW5kZXggPSBldmFsdWF0b3JzLmluZGV4T2YoZXZhbHVhdG9yKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBldmFsdWF0b3JzLnB1c2goZXZhbHVhdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmblsnXycgKyByYWN0aXZlLl9ndWlkXTtcbiAgICAgICAgfVxuICAgIH0oY29uZmlnX3R5cGVzLCB1dGlsc19pc0VxdWFsLCB1dGlsc19kZWZpbmVQcm9wZXJ0eSwgc2hhcmVkX3JlZ2lzdGVyRGVwZW5kYW50LCBzaGFyZWRfdW5yZWdpc3RlckRlcGVuZGFudCk7XG52YXIgcmVuZGVyX3NoYXJlZF9FdmFsdWF0b3JfU29mdFJlZmVyZW5jZSA9IGZ1bmN0aW9uIChpc0VxdWFsLCByZWdpc3RlckRlcGVuZGFudCwgdW5yZWdpc3RlckRlcGVuZGFudCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIFNvZnRSZWZlcmVuY2UgPSBmdW5jdGlvbiAocm9vdCwga2V5cGF0aCwgZXZhbHVhdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnJvb3QgPSByb290O1xuICAgICAgICAgICAgdGhpcy5rZXlwYXRoID0ga2V5cGF0aDtcbiAgICAgICAgICAgIHRoaXMucHJpb3JpdHkgPSBldmFsdWF0b3IucHJpb3JpdHk7XG4gICAgICAgICAgICB0aGlzLmV2YWx1YXRvciA9IGV2YWx1YXRvcjtcbiAgICAgICAgICAgIHJlZ2lzdGVyRGVwZW5kYW50KHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICBTb2Z0UmVmZXJlbmNlLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMucm9vdC5nZXQodGhpcy5rZXlwYXRoKTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRXF1YWwodmFsdWUsIHRoaXMudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZhbHVhdG9yLmJ1YmJsZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdW5yZWdpc3RlckRlcGVuZGFudCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFNvZnRSZWZlcmVuY2U7XG4gICAgfSh1dGlsc19pc0VxdWFsLCBzaGFyZWRfcmVnaXN0ZXJEZXBlbmRhbnQsIHNoYXJlZF91bnJlZ2lzdGVyRGVwZW5kYW50KTtcbnZhciByZW5kZXJfc2hhcmVkX0V2YWx1YXRvcl9fRXZhbHVhdG9yID0gZnVuY3Rpb24gKGlzRXF1YWwsIGRlZmluZVByb3BlcnR5LCBjbGVhckNhY2hlLCBub3RpZnlEZXBlbmRhbnRzLCByZWdpc3RlckRlcGVuZGFudCwgdW5yZWdpc3RlckRlcGVuZGFudCwgYWRhcHRJZk5lY2Vzc2FyeSwgUmVmZXJlbmNlLCBTb2Z0UmVmZXJlbmNlKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgRXZhbHVhdG9yLCBjYWNoZSA9IHt9O1xuICAgICAgICBFdmFsdWF0b3IgPSBmdW5jdGlvbiAocm9vdCwga2V5cGF0aCwgZnVuY3Rpb25TdHIsIGFyZ3MsIHByaW9yaXR5KSB7XG4gICAgICAgICAgICB2YXIgaSwgYXJnO1xuICAgICAgICAgICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICAgICAgICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgICAgICB0aGlzLmZuID0gZ2V0RnVuY3Rpb25Gcm9tU3RyaW5nKGZ1bmN0aW9uU3RyLCBhcmdzLmxlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5yZWZzID0gW107XG4gICAgICAgICAgICBpID0gYXJncy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZyA9IGFyZ3NbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ1swXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNbaV0gPSBhcmdbMV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnNbdGhpcy5yZWZzLmxlbmd0aF0gPSBuZXcgUmVmZXJlbmNlKHJvb3QsIGFyZ1sxXSwgdGhpcywgaSwgcHJpb3JpdHkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNbaV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZWxmVXBkYXRpbmcgPSB0aGlzLnJlZnMubGVuZ3RoIDw9IDE7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICBFdmFsdWF0b3IucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgYnViYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZlVwZGF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5kZWZlcnJlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3QuX2RlZmVycmVkLmV2YWxzLnB1c2godGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmZXJyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXZhbHVhdGluZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ldmFsdWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZm4uYXBwbHkobnVsbCwgdGhpcy52YWx1ZXMpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb290LmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWlzRXF1YWwodmFsdWUsIHRoaXMudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQ2FjaGUodGhpcy5yb290LCB0aGlzLmtleXBhdGgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3QuX2NhY2hlW3RoaXMua2V5cGF0aF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRJZk5lY2Vzc2FyeSh0aGlzLnJvb3QsIHRoaXMua2V5cGF0aCwgdmFsdWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmeURlcGVuZGFudHModGhpcy5yb290LCB0aGlzLmtleXBhdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmV2YWx1YXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLnJlZnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcy5wb3AoKS50ZWFyZG93bigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbGVhckNhY2hlKHRoaXMucm9vdCwgdGhpcy5rZXlwYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3QuX2V2YWx1YXRvcnNbdGhpcy5rZXlwYXRoXSA9IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVmcmVzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZWxmVXBkYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZlcnJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBpID0gdGhpcy5yZWZzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmc1tpXS51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVmZXJyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZlcnJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGVTb2Z0RGVwZW5kZW5jaWVzOiBmdW5jdGlvbiAoc29mdERlcHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwga2V5cGF0aCwgcmVmO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zb2Z0UmVmcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvZnRSZWZzID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGkgPSB0aGlzLnNvZnRSZWZzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZiA9IHRoaXMuc29mdFJlZnNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICghc29mdERlcHNbcmVmLmtleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvZnRSZWZzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc29mdFJlZnNbcmVmLmtleXBhdGhdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWYudGVhcmRvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpID0gc29mdERlcHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAga2V5cGF0aCA9IHNvZnREZXBzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc29mdFJlZnNba2V5cGF0aF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZiA9IG5ldyBTb2Z0UmVmZXJlbmNlKHRoaXMucm9vdCwga2V5cGF0aCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvZnRSZWZzW3RoaXMuc29mdFJlZnMubGVuZ3RoXSA9IHJlZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc29mdFJlZnNba2V5cGF0aF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZlVwZGF0aW5nID0gdGhpcy5yZWZzLmxlbmd0aCArIHRoaXMuc29mdFJlZnMubGVuZ3RoIDw9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBFdmFsdWF0b3I7XG4gICAgICAgIGZ1bmN0aW9uIGdldEZ1bmN0aW9uRnJvbVN0cmluZyhzdHIsIGkpIHtcbiAgICAgICAgICAgIHZhciBmbiwgYXJncztcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9cXCRcXHsoWzAtOV0rKVxcfS9nLCAnXyQxJyk7XG4gICAgICAgICAgICBpZiAoY2FjaGVbc3RyXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZVtzdHJdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXJncyA9IFtdO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGFyZ3NbaV0gPSAnXycgKyBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm4gPSBuZXcgRnVuY3Rpb24oYXJncy5qb2luKCcsJyksICdyZXR1cm4oJyArIHN0ciArICcpJyk7XG4gICAgICAgICAgICBjYWNoZVtzdHJdID0gZm47XG4gICAgICAgICAgICByZXR1cm4gZm47XG4gICAgICAgIH1cbiAgICB9KHV0aWxzX2lzRXF1YWwsIHV0aWxzX2RlZmluZVByb3BlcnR5LCBzaGFyZWRfY2xlYXJDYWNoZSwgc2hhcmVkX25vdGlmeURlcGVuZGFudHMsIHNoYXJlZF9yZWdpc3RlckRlcGVuZGFudCwgc2hhcmVkX3VucmVnaXN0ZXJEZXBlbmRhbnQsIHNoYXJlZF9hZGFwdElmTmVjZXNzYXJ5LCByZW5kZXJfc2hhcmVkX0V2YWx1YXRvcl9SZWZlcmVuY2UsIHJlbmRlcl9zaGFyZWRfRXZhbHVhdG9yX1NvZnRSZWZlcmVuY2UpO1xudmFyIHJlbmRlcl9zaGFyZWRfRXhwcmVzc2lvblJlc29sdmVyX1JlZmVyZW5jZVNjb3V0ID0gZnVuY3Rpb24gKHJlc29sdmVSZWYsIHRlYXJkb3duKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgUmVmZXJlbmNlU2NvdXQgPSBmdW5jdGlvbiAocmVzb2x2ZXIsIHJlZiwgY29udGV4dFN0YWNrLCBhcmdOdW0pIHtcbiAgICAgICAgICAgIHZhciBrZXlwYXRoLCByb290O1xuICAgICAgICAgICAgcm9vdCA9IHRoaXMucm9vdCA9IHJlc29sdmVyLnJvb3Q7XG4gICAgICAgICAgICBrZXlwYXRoID0gcmVzb2x2ZVJlZihyb290LCByZWYsIGNvbnRleHRTdGFjayk7XG4gICAgICAgICAgICBpZiAoa2V5cGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZXIucmVzb2x2ZVJlZihhcmdOdW0sIGZhbHNlLCBrZXlwYXRoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWYgPSByZWY7XG4gICAgICAgICAgICAgICAgdGhpcy5hcmdOdW0gPSBhcmdOdW07XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlciA9IHJlc29sdmVyO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dFN0YWNrID0gY29udGV4dFN0YWNrO1xuICAgICAgICAgICAgICAgIHJvb3QuX3BlbmRpbmdSZXNvbHV0aW9uW3Jvb3QuX3BlbmRpbmdSZXNvbHV0aW9uLmxlbmd0aF0gPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBSZWZlcmVuY2VTY291dC5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICByZXNvbHZlOiBmdW5jdGlvbiAoa2V5cGF0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlci5yZXNvbHZlUmVmKHRoaXMuYXJnTnVtLCBmYWxzZSwga2V5cGF0aCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMua2V5cGF0aCkge1xuICAgICAgICAgICAgICAgICAgICB0ZWFyZG93bih0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBSZWZlcmVuY2VTY291dDtcbiAgICB9KHNoYXJlZF9yZXNvbHZlUmVmLCBzaGFyZWRfdGVhcmRvd24pO1xudmFyIHJlbmRlcl9zaGFyZWRfRXhwcmVzc2lvblJlc29sdmVyX2lzUmVndWxhcktleXBhdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIga2V5UGF0dGVybiA9IC9eKD86KD86W2EtekEtWiRfXVthLXpBLVokXzAtOV0qKXwoPzpbMC05XXxbMS05XVswLTldKykpJC87XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoa2V5cGF0aCkge1xuICAgICAgICAgICAgdmFyIGtleXMsIGtleSwgaTtcbiAgICAgICAgICAgIGtleXMgPSBrZXlwYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBpID0ga2V5cy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAndW5kZWZpbmVkJyB8fCAha2V5UGF0dGVybi50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciByZW5kZXJfc2hhcmVkX0V4cHJlc3Npb25SZXNvbHZlcl9nZXRLZXlwYXRoID0gZnVuY3Rpb24gKG5vcm1hbGlzZUtleXBhdGgsIGlzUmVndWxhcktleXBhdGgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RyLCBhcmdzKSB7XG4gICAgICAgICAgICB2YXIgdW5pcXVlLCBub3JtYWxpc2VkO1xuICAgICAgICAgICAgdW5pcXVlID0gc3RyLnJlcGxhY2UoL1xcJFxceyhbMC05XSspXFx9L2csIGZ1bmN0aW9uIChtYXRjaCwgJDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJnc1skMV0gPyBhcmdzWyQxXVsxXSA6ICd1bmRlZmluZWQnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBub3JtYWxpc2VkID0gbm9ybWFsaXNlS2V5cGF0aCh1bmlxdWUpO1xuICAgICAgICAgICAgaWYgKGlzUmVndWxhcktleXBhdGgobm9ybWFsaXNlZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9ybWFsaXNlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnJHsnICsgdW5pcXVlLnJlcGxhY2UoL1tcXC5cXFtcXF1dL2csICctJykgKyAnfSc7XG4gICAgICAgIH07XG4gICAgfSh1dGlsc19ub3JtYWxpc2VLZXlwYXRoLCByZW5kZXJfc2hhcmVkX0V4cHJlc3Npb25SZXNvbHZlcl9pc1JlZ3VsYXJLZXlwYXRoKTtcbnZhciByZW5kZXJfc2hhcmVkX0V4cHJlc3Npb25SZXNvbHZlcl9yZWFzc2lnbkRlcGVuZGFudHMgPSBmdW5jdGlvbiAocmVnaXN0ZXJEZXBlbmRhbnQsIHVucmVnaXN0ZXJEZXBlbmRhbnQpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocmFjdGl2ZSwgb2xkS2V5cGF0aCwgbmV3S2V5cGF0aCkge1xuICAgICAgICAgICAgdmFyIHRvUmVhc3NpZ24sIGksIGRlcGVuZGFudDtcbiAgICAgICAgICAgIHRvUmVhc3NpZ24gPSBbXTtcbiAgICAgICAgICAgIGdhdGhlckRlcGVuZGFudHMocmFjdGl2ZSwgb2xkS2V5cGF0aCwgdG9SZWFzc2lnbik7XG4gICAgICAgICAgICBpID0gdG9SZWFzc2lnbi5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgZGVwZW5kYW50ID0gdG9SZWFzc2lnbltpXTtcbiAgICAgICAgICAgICAgICB1bnJlZ2lzdGVyRGVwZW5kYW50KGRlcGVuZGFudCk7XG4gICAgICAgICAgICAgICAgZGVwZW5kYW50LmtleXBhdGggPSBkZXBlbmRhbnQua2V5cGF0aC5yZXBsYWNlKG9sZEtleXBhdGgsIG5ld0tleXBhdGgpO1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVyRGVwZW5kYW50KGRlcGVuZGFudCk7XG4gICAgICAgICAgICAgICAgZGVwZW5kYW50LnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBjYXNjYWRlKHJhY3RpdmUsIG9sZEtleXBhdGgsIHRvUmVhc3NpZ24pIHtcbiAgICAgICAgICAgIHZhciBtYXAsIGk7XG4gICAgICAgICAgICBtYXAgPSByYWN0aXZlLl9kZXBzTWFwW29sZEtleXBhdGhdO1xuICAgICAgICAgICAgaWYgKCFtYXApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gbWFwLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBnYXRoZXJEZXBlbmRhbnRzKHJhY3RpdmUsIG1hcFtpXSwgdG9SZWFzc2lnbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2F0aGVyRGVwZW5kYW50cyhyYWN0aXZlLCBvbGRLZXlwYXRoLCB0b1JlYXNzaWduKSB7XG4gICAgICAgICAgICB2YXIgcHJpb3JpdHksIGRlcGVuZGFudHNCeUtleXBhdGgsIGRlcGVuZGFudHMsIGk7XG4gICAgICAgICAgICBwcmlvcml0eSA9IHJhY3RpdmUuX2RlcHMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKHByaW9yaXR5LS0pIHtcbiAgICAgICAgICAgICAgICBkZXBlbmRhbnRzQnlLZXlwYXRoID0gcmFjdGl2ZS5fZGVwc1twcmlvcml0eV07XG4gICAgICAgICAgICAgICAgaWYgKGRlcGVuZGFudHNCeUtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kYW50cyA9IGRlcGVuZGFudHNCeUtleXBhdGhbb2xkS2V5cGF0aF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXBlbmRhbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gZGVwZW5kYW50cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9SZWFzc2lnbi5wdXNoKGRlcGVuZGFudHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzY2FkZShyYWN0aXZlLCBvbGRLZXlwYXRoLCB0b1JlYXNzaWduKTtcbiAgICAgICAgfVxuICAgIH0oc2hhcmVkX3JlZ2lzdGVyRGVwZW5kYW50LCBzaGFyZWRfdW5yZWdpc3RlckRlcGVuZGFudCk7XG52YXIgcmVuZGVyX3NoYXJlZF9FeHByZXNzaW9uUmVzb2x2ZXJfX0V4cHJlc3Npb25SZXNvbHZlciA9IGZ1bmN0aW9uIChFdmFsdWF0b3IsIFJlZmVyZW5jZVNjb3V0LCBnZXRLZXlwYXRoLCByZWFzc2lnbkRlcGVuZGFudHMpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBFeHByZXNzaW9uUmVzb2x2ZXIgPSBmdW5jdGlvbiAobXVzdGFjaGUpIHtcbiAgICAgICAgICAgIHZhciBleHByZXNzaW9uLCBpLCBsZW4sIHJlZiwgaW5kZXhSZWZzO1xuICAgICAgICAgICAgdGhpcy5yb290ID0gbXVzdGFjaGUucm9vdDtcbiAgICAgICAgICAgIHRoaXMubXVzdGFjaGUgPSBtdXN0YWNoZTtcbiAgICAgICAgICAgIHRoaXMuYXJncyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5zY291dHMgPSBbXTtcbiAgICAgICAgICAgIGV4cHJlc3Npb24gPSBtdXN0YWNoZS5kZXNjcmlwdG9yLng7XG4gICAgICAgICAgICBpbmRleFJlZnMgPSBtdXN0YWNoZS5wYXJlbnRGcmFnbWVudC5pbmRleFJlZnM7XG4gICAgICAgICAgICB0aGlzLnN0ciA9IGV4cHJlc3Npb24ucztcbiAgICAgICAgICAgIGxlbiA9IHRoaXMudW5yZXNvbHZlZCA9IHRoaXMuYXJncy5sZW5ndGggPSBleHByZXNzaW9uLnIgPyBleHByZXNzaW9uLnIubGVuZ3RoIDogMDtcbiAgICAgICAgICAgIGlmICghbGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlZCA9IHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYnViYmxlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgcmVmID0gZXhwcmVzc2lvbi5yW2ldO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleFJlZnMgJiYgaW5kZXhSZWZzW3JlZl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmVSZWYoaSwgdHJ1ZSwgaW5kZXhSZWZzW3JlZl0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvdXRzW3RoaXMuc2NvdXRzLmxlbmd0aF0gPSBuZXcgUmVmZXJlbmNlU2NvdXQodGhpcywgcmVmLCBtdXN0YWNoZS5jb250ZXh0U3RhY2ssIGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5idWJibGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgRXhwcmVzc2lvblJlc29sdmVyLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIGJ1YmJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBvbGRLZXlwYXRoO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZWFkeSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9sZEtleXBhdGggPSB0aGlzLmtleXBhdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlwYXRoID0gZ2V0S2V5cGF0aCh0aGlzLnN0ciwgdGhpcy5hcmdzKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5rZXlwYXRoLnN1YnN0cigwLCAyKSA9PT0gJyR7Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUV2YWx1YXRvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob2xkS2V5cGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZWFzc2lnbkRlcGVuZGFudHModGhpcy5yb290LCBvbGRLZXlwYXRoLCB0aGlzLmtleXBhdGgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXVzdGFjaGUucmVzb2x2ZSh0aGlzLmtleXBhdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLnNjb3V0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY291dHMucG9wKCkudGVhcmRvd24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzb2x2ZVJlZjogZnVuY3Rpb24gKGFyZ051bSwgaXNJbmRleFJlZiwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFyZ3NbYXJnTnVtXSA9IFtcbiAgICAgICAgICAgICAgICAgICAgaXNJbmRleFJlZixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIHRoaXMuYnViYmxlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlZCA9ICEtLXRoaXMudW5yZXNvbHZlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcmVhdGVFdmFsdWF0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucm9vdC5fZXZhbHVhdG9yc1t0aGlzLmtleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdC5fZXZhbHVhdG9yc1t0aGlzLmtleXBhdGhdID0gbmV3IEV2YWx1YXRvcih0aGlzLnJvb3QsIHRoaXMua2V5cGF0aCwgdGhpcy5zdHIsIHRoaXMuYXJncywgdGhpcy5tdXN0YWNoZS5wcmlvcml0eSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290Ll9ldmFsdWF0b3JzW3RoaXMua2V5cGF0aF0ucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEV4cHJlc3Npb25SZXNvbHZlcjtcbiAgICB9KHJlbmRlcl9zaGFyZWRfRXZhbHVhdG9yX19FdmFsdWF0b3IsIHJlbmRlcl9zaGFyZWRfRXhwcmVzc2lvblJlc29sdmVyX1JlZmVyZW5jZVNjb3V0LCByZW5kZXJfc2hhcmVkX0V4cHJlc3Npb25SZXNvbHZlcl9nZXRLZXlwYXRoLCByZW5kZXJfc2hhcmVkX0V4cHJlc3Npb25SZXNvbHZlcl9yZWFzc2lnbkRlcGVuZGFudHMpO1xudmFyIHJlbmRlcl9zaGFyZWRfaW5pdE11c3RhY2hlID0gZnVuY3Rpb24gKHJlc29sdmVSZWYsIEV4cHJlc3Npb25SZXNvbHZlcikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtdXN0YWNoZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGtleXBhdGgsIGluZGV4UmVmLCBwYXJlbnRGcmFnbWVudDtcbiAgICAgICAgICAgIHBhcmVudEZyYWdtZW50ID0gbXVzdGFjaGUucGFyZW50RnJhZ21lbnQgPSBvcHRpb25zLnBhcmVudEZyYWdtZW50O1xuICAgICAgICAgICAgbXVzdGFjaGUucm9vdCA9IHBhcmVudEZyYWdtZW50LnJvb3Q7XG4gICAgICAgICAgICBtdXN0YWNoZS5jb250ZXh0U3RhY2sgPSBwYXJlbnRGcmFnbWVudC5jb250ZXh0U3RhY2s7XG4gICAgICAgICAgICBtdXN0YWNoZS5kZXNjcmlwdG9yID0gb3B0aW9ucy5kZXNjcmlwdG9yO1xuICAgICAgICAgICAgbXVzdGFjaGUuaW5kZXggPSBvcHRpb25zLmluZGV4IHx8IDA7XG4gICAgICAgICAgICBtdXN0YWNoZS5wcmlvcml0eSA9IHBhcmVudEZyYWdtZW50LnByaW9yaXR5O1xuICAgICAgICAgICAgbXVzdGFjaGUudHlwZSA9IG9wdGlvbnMuZGVzY3JpcHRvci50O1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGVzY3JpcHRvci5yKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudEZyYWdtZW50LmluZGV4UmVmcyAmJiBwYXJlbnRGcmFnbWVudC5pbmRleFJlZnNbb3B0aW9ucy5kZXNjcmlwdG9yLnJdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhSZWYgPSBwYXJlbnRGcmFnbWVudC5pbmRleFJlZnNbb3B0aW9ucy5kZXNjcmlwdG9yLnJdO1xuICAgICAgICAgICAgICAgICAgICBtdXN0YWNoZS5pbmRleFJlZiA9IG9wdGlvbnMuZGVzY3JpcHRvci5yO1xuICAgICAgICAgICAgICAgICAgICBtdXN0YWNoZS52YWx1ZSA9IGluZGV4UmVmO1xuICAgICAgICAgICAgICAgICAgICBtdXN0YWNoZS5yZW5kZXIobXVzdGFjaGUudmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXBhdGggPSByZXNvbHZlUmVmKG11c3RhY2hlLnJvb3QsIG9wdGlvbnMuZGVzY3JpcHRvci5yLCBtdXN0YWNoZS5jb250ZXh0U3RhY2spO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5cGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtdXN0YWNoZS5yZXNvbHZlKGtleXBhdGgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbXVzdGFjaGUucmVmID0gb3B0aW9ucy5kZXNjcmlwdG9yLnI7XG4gICAgICAgICAgICAgICAgICAgICAgICBtdXN0YWNoZS5yb290Ll9wZW5kaW5nUmVzb2x1dGlvblttdXN0YWNoZS5yb290Ll9wZW5kaW5nUmVzb2x1dGlvbi5sZW5ndGhdID0gbXVzdGFjaGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kZXNjcmlwdG9yLngpIHtcbiAgICAgICAgICAgICAgICBtdXN0YWNoZS5leHByZXNzaW9uUmVzb2x2ZXIgPSBuZXcgRXhwcmVzc2lvblJlc29sdmVyKG11c3RhY2hlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtdXN0YWNoZS5kZXNjcmlwdG9yLm4gJiYgIW11c3RhY2hlLmhhc093blByb3BlcnR5KCd2YWx1ZScpKSB7XG4gICAgICAgICAgICAgICAgbXVzdGFjaGUucmVuZGVyKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfShzaGFyZWRfcmVzb2x2ZVJlZiwgcmVuZGVyX3NoYXJlZF9FeHByZXNzaW9uUmVzb2x2ZXJfX0V4cHJlc3Npb25SZXNvbHZlcik7XG52YXIgcmVuZGVyX3NoYXJlZF9yZXNvbHZlTXVzdGFjaGUgPSBmdW5jdGlvbiAodHlwZXMsIHJlZ2lzdGVyRGVwZW5kYW50LCB1bnJlZ2lzdGVyRGVwZW5kYW50KSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGtleXBhdGgpIHtcbiAgICAgICAgICAgIGlmIChrZXlwYXRoID09PSB0aGlzLmtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5yZWdpc3RlcmVkKSB7XG4gICAgICAgICAgICAgICAgdW5yZWdpc3RlckRlcGVuZGFudCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgICAgICAgICByZWdpc3RlckRlcGVuZGFudCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5yb290LnR3b3dheSAmJiB0aGlzLnBhcmVudEZyYWdtZW50Lm93bmVyLnR5cGUgPT09IHR5cGVzLkFUVFJJQlVURSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50RnJhZ21lbnQub3duZXIuZWxlbWVudC5iaW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5leHByZXNzaW9uUmVzb2x2ZXIgJiYgdGhpcy5leHByZXNzaW9uUmVzb2x2ZXIucmVzb2x2ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cHJlc3Npb25SZXNvbHZlciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfShjb25maWdfdHlwZXMsIHNoYXJlZF9yZWdpc3RlckRlcGVuZGFudCwgc2hhcmVkX3VucmVnaXN0ZXJEZXBlbmRhbnQpO1xudmFyIHJlbmRlcl9zaGFyZWRfdXBkYXRlTXVzdGFjaGUgPSBmdW5jdGlvbiAoaXNFcXVhbCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB3cmFwcGVkLCB2YWx1ZTtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5yb290LmdldCh0aGlzLmtleXBhdGgpO1xuICAgICAgICAgICAgaWYgKHdyYXBwZWQgPSB0aGlzLnJvb3QuX3dyYXBwZWRbdGhpcy5rZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gd3JhcHBlZC5nZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNFcXVhbCh2YWx1ZSwgdGhpcy52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0odXRpbHNfaXNFcXVhbCk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0ludGVycG9sYXRvciA9IGZ1bmN0aW9uICh0eXBlcywgdGVhcmRvd24sIGluaXRNdXN0YWNoZSwgcmVzb2x2ZU11c3RhY2hlLCB1cGRhdGVNdXN0YWNoZSkge1xuICAgICAgICBcbiAgICAgICAgdmFyIERvbUludGVycG9sYXRvciwgbGVzc1RoYW4sIGdyZWF0ZXJUaGFuO1xuICAgICAgICBsZXNzVGhhbiA9IC88L2c7XG4gICAgICAgIGdyZWF0ZXJUaGFuID0gLz4vZztcbiAgICAgICAgRG9tSW50ZXJwb2xhdG9yID0gZnVuY3Rpb24gKG9wdGlvbnMsIGRvY0ZyYWcpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGVzLklOVEVSUE9MQVRPUjtcbiAgICAgICAgICAgIGlmIChkb2NGcmFnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgICAgICAgICAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQodGhpcy5ub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluaXRNdXN0YWNoZSh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgICAgRG9tSW50ZXJwb2xhdG9yLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlTXVzdGFjaGUsXG4gICAgICAgICAgICByZXNvbHZlOiByZXNvbHZlTXVzdGFjaGUsXG4gICAgICAgICAgICBkZXRhY2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uIChkZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlc3Ryb3kpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGVhcmRvd24odGhpcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kYXRhID0gdmFsdWUgPT0gdW5kZWZpbmVkID8gJycgOiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlyc3ROb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMudmFsdWUgIT0gdW5kZWZpbmVkID8gJycgKyB0aGlzLnZhbHVlIDogJyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UobGVzc1RoYW4sICcmbHQ7JykucmVwbGFjZShncmVhdGVyVGhhbiwgJyZndDsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIERvbUludGVycG9sYXRvcjtcbiAgICB9KGNvbmZpZ190eXBlcywgc2hhcmVkX3RlYXJkb3duLCByZW5kZXJfc2hhcmVkX2luaXRNdXN0YWNoZSwgcmVuZGVyX3NoYXJlZF9yZXNvbHZlTXVzdGFjaGUsIHJlbmRlcl9zaGFyZWRfdXBkYXRlTXVzdGFjaGUpO1xudmFyIHJlbmRlcl9zaGFyZWRfdXBkYXRlU2VjdGlvbiA9IGZ1bmN0aW9uIChpc0FycmF5LCBpc09iamVjdCwgY3JlYXRlKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlY3Rpb24sIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgZnJhZ21lbnRPcHRpb25zO1xuICAgICAgICAgICAgZnJhZ21lbnRPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0b3I6IHNlY3Rpb24uZGVzY3JpcHRvci5mLFxuICAgICAgICAgICAgICAgIHJvb3Q6IHNlY3Rpb24ucm9vdCxcbiAgICAgICAgICAgICAgICBwTm9kZTogc2VjdGlvbi5wYXJlbnRGcmFnbWVudC5wTm9kZSxcbiAgICAgICAgICAgICAgICBvd25lcjogc2VjdGlvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChzZWN0aW9uLmRlc2NyaXB0b3Iubikge1xuICAgICAgICAgICAgICAgIHVwZGF0ZUNvbmRpdGlvbmFsU2VjdGlvbihzZWN0aW9uLCB2YWx1ZSwgdHJ1ZSwgZnJhZ21lbnRPcHRpb25zKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVMaXN0U2VjdGlvbihzZWN0aW9uLCB2YWx1ZSwgZnJhZ21lbnRPcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlY3Rpb24uZGVzY3JpcHRvci5pKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUxpc3RPYmplY3RTZWN0aW9uKHNlY3Rpb24sIHZhbHVlLCBmcmFnbWVudE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNvbnRleHRTZWN0aW9uKHNlY3Rpb24sIGZyYWdtZW50T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVDb25kaXRpb25hbFNlY3Rpb24oc2VjdGlvbiwgdmFsdWUsIGZhbHNlLCBmcmFnbWVudE9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiB1cGRhdGVMaXN0U2VjdGlvbihzZWN0aW9uLCB2YWx1ZSwgZnJhZ21lbnRPcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgaSwgbGVuZ3RoLCBmcmFnbWVudHNUb1JlbW92ZTtcbiAgICAgICAgICAgIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChsZW5ndGggPCBzZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50c1RvUmVtb3ZlID0gc2VjdGlvbi5mcmFnbWVudHMuc3BsaWNlKGxlbmd0aCwgc2VjdGlvbi5sZW5ndGggLSBsZW5ndGgpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChmcmFnbWVudHNUb1JlbW92ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzVG9SZW1vdmUucG9wKCkudGVhcmRvd24odHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAobGVuZ3RoID4gc2VjdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gc2VjdGlvbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRPcHRpb25zLmNvbnRleHRTdGFjayA9IHNlY3Rpb24uY29udGV4dFN0YWNrLmNvbmNhdChzZWN0aW9uLmtleXBhdGggKyAnLicgKyBpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucy5pbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VjdGlvbi5kZXNjcmlwdG9yLmkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudE9wdGlvbnMuaW5kZXhSZWYgPSBzZWN0aW9uLmRlc2NyaXB0b3IuaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb24uZnJhZ21lbnRzW2ldID0gc2VjdGlvbi5jcmVhdGVGcmFnbWVudChmcmFnbWVudE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VjdGlvbi5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlTGlzdE9iamVjdFNlY3Rpb24oc2VjdGlvbiwgdmFsdWUsIGZyYWdtZW50T3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGlkLCBmcmFnbWVudHNCeUlkO1xuICAgICAgICAgICAgZnJhZ21lbnRzQnlJZCA9IHNlY3Rpb24uZnJhZ21lbnRzQnlJZCB8fCAoc2VjdGlvbi5mcmFnbWVudHNCeUlkID0gY3JlYXRlKG51bGwpKTtcbiAgICAgICAgICAgIGZvciAoaWQgaW4gZnJhZ21lbnRzQnlJZCkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVtpZF0gPT09IHVuZGVmaW5lZCAmJiBmcmFnbWVudHNCeUlkW2lkXSkge1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHNCeUlkW2lkXS50ZWFyZG93bih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzQnlJZFtpZF0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaWQgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVbaWRdICE9PSB1bmRlZmluZWQgJiYgIWZyYWdtZW50c0J5SWRbaWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucy5jb250ZXh0U3RhY2sgPSBzZWN0aW9uLmNvbnRleHRTdGFjay5jb25jYXQoc2VjdGlvbi5rZXlwYXRoICsgJy4nICsgaWQpO1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudE9wdGlvbnMuaW5kZXggPSBpZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlY3Rpb24uZGVzY3JpcHRvci5pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudE9wdGlvbnMuaW5kZXhSZWYgPSBzZWN0aW9uLmRlc2NyaXB0b3IuaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHNCeUlkW2lkXSA9IHNlY3Rpb24uY3JlYXRlRnJhZ21lbnQoZnJhZ21lbnRPcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQ29udGV4dFNlY3Rpb24oc2VjdGlvbiwgZnJhZ21lbnRPcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoIXNlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnRPcHRpb25zLmNvbnRleHRTdGFjayA9IHNlY3Rpb24uY29udGV4dFN0YWNrLmNvbmNhdChzZWN0aW9uLmtleXBhdGgpO1xuICAgICAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucy5pbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgc2VjdGlvbi5mcmFnbWVudHNbMF0gPSBzZWN0aW9uLmNyZWF0ZUZyYWdtZW50KGZyYWdtZW50T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgc2VjdGlvbi5sZW5ndGggPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbmRpdGlvbmFsU2VjdGlvbihzZWN0aW9uLCB2YWx1ZSwgaW52ZXJ0ZWQsIGZyYWdtZW50T3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGRvUmVuZGVyLCBlbXB0eUFycmF5LCBmcmFnbWVudHNUb1JlbW92ZSwgZnJhZ21lbnQ7XG4gICAgICAgICAgICBlbXB0eUFycmF5ID0gaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgaWYgKGludmVydGVkKSB7XG4gICAgICAgICAgICAgICAgZG9SZW5kZXIgPSBlbXB0eUFycmF5IHx8ICF2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9SZW5kZXIgPSB2YWx1ZSAmJiAhZW1wdHlBcnJheTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkb1JlbmRlcikge1xuICAgICAgICAgICAgICAgIGlmICghc2VjdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRPcHRpb25zLmNvbnRleHRTdGFjayA9IHNlY3Rpb24uY29udGV4dFN0YWNrO1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudE9wdGlvbnMuaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICBzZWN0aW9uLmZyYWdtZW50c1swXSA9IHNlY3Rpb24uY3JlYXRlRnJhZ21lbnQoZnJhZ21lbnRPcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgc2VjdGlvbi5sZW5ndGggPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2VjdGlvbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50c1RvUmVtb3ZlID0gc2VjdGlvbi5mcmFnbWVudHMuc3BsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZnJhZ21lbnQgPSBmcmFnbWVudHNUb1JlbW92ZS5wb3AoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQudGVhcmRvd24odHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc2VjdGlvbi50ZWFyZG93bkZyYWdtZW50cyh0cnVlKTtcbiAgICAgICAgICAgICAgICBzZWN0aW9uLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KHV0aWxzX2lzQXJyYXksIHV0aWxzX2lzT2JqZWN0LCB1dGlsc19jcmVhdGUpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9TZWN0aW9uX3JlYXNzaWduRnJhZ21lbnQgPSBmdW5jdGlvbiAodHlwZXMsIHVucmVnaXN0ZXJEZXBlbmRhbnQsIEV4cHJlc3Npb25SZXNvbHZlcikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlYXNzaWduRnJhZ21lbnQ7XG4gICAgICAgIGZ1bmN0aW9uIHJlYXNzaWduRnJhZ21lbnQoZnJhZ21lbnQsIGluZGV4UmVmLCBvbGRJbmRleCwgbmV3SW5kZXgsIGJ5LCBvbGRLZXlwYXRoLCBuZXdLZXlwYXRoKSB7XG4gICAgICAgICAgICB2YXIgaSwgaXRlbSwgY29udGV4dCwgcXVlcnk7XG4gICAgICAgICAgICBpZiAoZnJhZ21lbnQuaHRtbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmcmFnbWVudC5pbmRleFJlZnMgJiYgZnJhZ21lbnQuaW5kZXhSZWZzW2luZGV4UmVmXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuaW5kZXhSZWZzW2luZGV4UmVmXSA9IG5ld0luZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSA9IGZyYWdtZW50LmNvbnRleHRTdGFjay5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dCA9IGZyYWdtZW50LmNvbnRleHRTdGFja1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5zdWJzdHIoMCwgb2xkS2V5cGF0aC5sZW5ndGgpID09PSBvbGRLZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50LmNvbnRleHRTdGFja1tpXSA9IGNvbnRleHQucmVwbGFjZShvbGRLZXlwYXRoLCBuZXdLZXlwYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gZnJhZ21lbnQuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSBmcmFnbWVudC5pdGVtc1tpXTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuRUxFTUVOVDpcbiAgICAgICAgICAgICAgICAgICAgcmVhc3NpZ25FbGVtZW50KGl0ZW0sIGluZGV4UmVmLCBvbGRJbmRleCwgbmV3SW5kZXgsIGJ5LCBvbGRLZXlwYXRoLCBuZXdLZXlwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5QQVJUSUFMOlxuICAgICAgICAgICAgICAgICAgICByZWFzc2lnbkZyYWdtZW50KGl0ZW0uZnJhZ21lbnQsIGluZGV4UmVmLCBvbGRJbmRleCwgbmV3SW5kZXgsIGJ5LCBvbGRLZXlwYXRoLCBuZXdLZXlwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5DT01QT05FTlQ6XG4gICAgICAgICAgICAgICAgICAgIHJlYXNzaWduRnJhZ21lbnQoaXRlbS5pbnN0YW5jZS5mcmFnbWVudCwgaW5kZXhSZWYsIG9sZEluZGV4LCBuZXdJbmRleCwgYnksIG9sZEtleXBhdGgsIG5ld0tleXBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnkgPSBmcmFnbWVudC5yb290Ll9saXZlQ29tcG9uZW50UXVlcmllc1tpdGVtLm5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeS5fbWFrZURpcnR5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5TRUNUSU9OOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSU5URVJQT0xBVE9SOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVFJJUExFOlxuICAgICAgICAgICAgICAgICAgICByZWFzc2lnbk11c3RhY2hlKGl0ZW0sIGluZGV4UmVmLCBvbGRJbmRleCwgbmV3SW5kZXgsIGJ5LCBvbGRLZXlwYXRoLCBuZXdLZXlwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHJlYXNzaWduRWxlbWVudChlbGVtZW50LCBpbmRleFJlZiwgb2xkSW5kZXgsIG5ld0luZGV4LCBieSwgb2xkS2V5cGF0aCwgbmV3S2V5cGF0aCkge1xuICAgICAgICAgICAgdmFyIGksIGF0dHJpYnV0ZSwgc3RvcmFnZSwgbWFzdGVyRXZlbnROYW1lLCBwcm94aWVzLCBwcm94eSwgYmluZGluZywgYmluZGluZ3MsIGxpdmVRdWVyaWVzLCByYWN0aXZlO1xuICAgICAgICAgICAgaSA9IGVsZW1lbnQuYXR0cmlidXRlcy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlID0gZWxlbWVudC5hdHRyaWJ1dGVzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUuZnJhZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVhc3NpZ25GcmFnbWVudChhdHRyaWJ1dGUuZnJhZ21lbnQsIGluZGV4UmVmLCBvbGRJbmRleCwgbmV3SW5kZXgsIGJ5LCBvbGRLZXlwYXRoLCBuZXdLZXlwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS50d293YXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS51cGRhdGVCaW5kaW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0b3JhZ2UgPSBlbGVtZW50Lm5vZGUuX3JhY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RvcmFnZS5rZXlwYXRoLnN1YnN0cigwLCBvbGRLZXlwYXRoLmxlbmd0aCkgPT09IG9sZEtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcmFnZS5rZXlwYXRoID0gc3RvcmFnZS5rZXlwYXRoLnJlcGxhY2Uob2xkS2V5cGF0aCwgbmV3S2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpbmRleFJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2UuaW5kZXhbaW5kZXhSZWZdID0gbmV3SW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAobWFzdGVyRXZlbnROYW1lIGluIHN0b3JhZ2UuZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3hpZXMgPSBzdG9yYWdlLmV2ZW50c1ttYXN0ZXJFdmVudE5hbWVdLnByb3hpZXM7XG4gICAgICAgICAgICAgICAgICAgIGkgPSBwcm94aWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJveHkgPSBwcm94aWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm94eS5uID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYXNzaWduRnJhZ21lbnQocHJveHkuYSwgaW5kZXhSZWYsIG9sZEluZGV4LCBuZXdJbmRleCwgYnksIG9sZEtleXBhdGgsIG5ld0tleXBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3h5LmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFzc2lnbkZyYWdtZW50KHByb3h5LmQsIGluZGV4UmVmLCBvbGRJbmRleCwgbmV3SW5kZXgsIGJ5LCBvbGRLZXlwYXRoLCBuZXdLZXlwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYmluZGluZyA9IHN0b3JhZ2UuYmluZGluZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmluZGluZy5rZXlwYXRoLnN1YnN0cigwLCBvbGRLZXlwYXRoLmxlbmd0aCkgPT09IG9sZEtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmRpbmdzID0gc3RvcmFnZS5yb290Ll90d293YXlCaW5kaW5nc1tiaW5kaW5nLmtleXBhdGhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmluZGluZ3Muc3BsaWNlKGJpbmRpbmdzLmluZGV4T2YoYmluZGluZyksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmluZGluZy5rZXlwYXRoID0gYmluZGluZy5rZXlwYXRoLnJlcGxhY2Uob2xkS2V5cGF0aCwgbmV3S2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5kaW5ncyA9IHN0b3JhZ2Uucm9vdC5fdHdvd2F5QmluZGluZ3NbYmluZGluZy5rZXlwYXRoXSB8fCAoc3RvcmFnZS5yb290Ll90d293YXlCaW5kaW5nc1tiaW5kaW5nLmtleXBhdGhdID0gW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmluZGluZ3MucHVzaChiaW5kaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbGVtZW50LmZyYWdtZW50KSB7XG4gICAgICAgICAgICAgICAgcmVhc3NpZ25GcmFnbWVudChlbGVtZW50LmZyYWdtZW50LCBpbmRleFJlZiwgb2xkSW5kZXgsIG5ld0luZGV4LCBieSwgb2xkS2V5cGF0aCwgbmV3S2V5cGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGl2ZVF1ZXJpZXMgPSBlbGVtZW50LmxpdmVRdWVyaWVzKSB7XG4gICAgICAgICAgICAgICAgcmFjdGl2ZSA9IGVsZW1lbnQucm9vdDtcbiAgICAgICAgICAgICAgICBpID0gbGl2ZVF1ZXJpZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmFjdGl2ZS5fbGl2ZVF1ZXJpZXNbbGl2ZVF1ZXJpZXNbaV1dLl9tYWtlRGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcmVhc3NpZ25NdXN0YWNoZShtdXN0YWNoZSwgaW5kZXhSZWYsIG9sZEluZGV4LCBuZXdJbmRleCwgYnksIG9sZEtleXBhdGgsIG5ld0tleXBhdGgpIHtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgaWYgKG11c3RhY2hlLmRlc2NyaXB0b3IueCkge1xuICAgICAgICAgICAgICAgIGlmIChtdXN0YWNoZS5leHByZXNzaW9uUmVzb2x2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbXVzdGFjaGUuZXhwcmVzc2lvblJlc29sdmVyLnRlYXJkb3duKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG11c3RhY2hlLmV4cHJlc3Npb25SZXNvbHZlciA9IG5ldyBFeHByZXNzaW9uUmVzb2x2ZXIobXVzdGFjaGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG11c3RhY2hlLmtleXBhdGgpIHtcbiAgICAgICAgICAgICAgICBpZiAobXVzdGFjaGUua2V5cGF0aC5zdWJzdHIoMCwgb2xkS2V5cGF0aC5sZW5ndGgpID09PSBvbGRLZXlwYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIG11c3RhY2hlLnJlc29sdmUobXVzdGFjaGUua2V5cGF0aC5yZXBsYWNlKG9sZEtleXBhdGgsIG5ld0tleXBhdGgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG11c3RhY2hlLmluZGV4UmVmID09PSBpbmRleFJlZikge1xuICAgICAgICAgICAgICAgIG11c3RhY2hlLnZhbHVlID0gbmV3SW5kZXg7XG4gICAgICAgICAgICAgICAgbXVzdGFjaGUucmVuZGVyKG5ld0luZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtdXN0YWNoZS5mcmFnbWVudHMpIHtcbiAgICAgICAgICAgICAgICBpID0gbXVzdGFjaGUuZnJhZ21lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlYXNzaWduRnJhZ21lbnQobXVzdGFjaGUuZnJhZ21lbnRzW2ldLCBpbmRleFJlZiwgb2xkSW5kZXgsIG5ld0luZGV4LCBieSwgb2xkS2V5cGF0aCwgbmV3S2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfShjb25maWdfdHlwZXMsIHNoYXJlZF91bnJlZ2lzdGVyRGVwZW5kYW50LCByZW5kZXJfc2hhcmVkX0V4cHJlc3Npb25SZXNvbHZlcl9fRXhwcmVzc2lvblJlc29sdmVyKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfU2VjdGlvbl9yZWFzc2lnbkZyYWdtZW50cyA9IGZ1bmN0aW9uICh0eXBlcywgcmVhc3NpZ25GcmFnbWVudCwgcHJlRG9tVXBkYXRlKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHJvb3QsIHNlY3Rpb24sIHN0YXJ0LCBlbmQsIGJ5KSB7XG4gICAgICAgICAgICB2YXIgaSwgZnJhZ21lbnQsIGluZGV4UmVmLCBvbGRJbmRleCwgbmV3SW5kZXgsIG9sZEtleXBhdGgsIG5ld0tleXBhdGg7XG4gICAgICAgICAgICBpbmRleFJlZiA9IHNlY3Rpb24uZGVzY3JpcHRvci5pO1xuICAgICAgICAgICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gc2VjdGlvbi5mcmFnbWVudHNbaV07XG4gICAgICAgICAgICAgICAgb2xkSW5kZXggPSBpIC0gYnk7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIG9sZEtleXBhdGggPSBzZWN0aW9uLmtleXBhdGggKyAnLicgKyAoaSAtIGJ5KTtcbiAgICAgICAgICAgICAgICBuZXdLZXlwYXRoID0gc2VjdGlvbi5rZXlwYXRoICsgJy4nICsgaTtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC5pbmRleCArPSBieTtcbiAgICAgICAgICAgICAgICByZWFzc2lnbkZyYWdtZW50KGZyYWdtZW50LCBpbmRleFJlZiwgb2xkSW5kZXgsIG5ld0luZGV4LCBieSwgb2xkS2V5cGF0aCwgbmV3S2V5cGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmVEb21VcGRhdGUocm9vdCk7XG4gICAgICAgIH07XG4gICAgfShjb25maWdfdHlwZXMsIHJlbmRlcl9Eb21GcmFnbWVudF9TZWN0aW9uX3JlYXNzaWduRnJhZ21lbnQsIHNoYXJlZF9wcmVEb21VcGRhdGUpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9TZWN0aW9uX3Byb3RvdHlwZV9tZXJnZSA9IGZ1bmN0aW9uIChyZWFzc2lnbkZyYWdtZW50KSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5ld0luZGljZXMpIHtcbiAgICAgICAgICAgIHZhciBzZWN0aW9uID0gdGhpcywgcGFyZW50RnJhZ21lbnQsIGZpcnN0Q2hhbmdlLCBjaGFuZ2VkLCBpLCBuZXdMZW5ndGgsIG5ld0ZyYWdtZW50cywgdG9UZWFyZG93biwgZnJhZ21lbnRPcHRpb25zLCBmcmFnbWVudCwgbmV4dE5vZGU7XG4gICAgICAgICAgICBwYXJlbnRGcmFnbWVudCA9IHRoaXMucGFyZW50RnJhZ21lbnQ7XG4gICAgICAgICAgICBuZXdGcmFnbWVudHMgPSBbXTtcbiAgICAgICAgICAgIG5ld0luZGljZXMuZm9yRWFjaChmdW5jdGlvbiAobmV3SW5kZXgsIG9sZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ5LCBvbGRLZXlwYXRoLCBuZXdLZXlwYXRoO1xuICAgICAgICAgICAgICAgIGlmIChuZXdJbmRleCA9PT0gb2xkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RnJhZ21lbnRzW25ld0luZGV4XSA9IHNlY3Rpb24uZnJhZ21lbnRzW29sZEluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RDaGFuZ2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdENoYW5nZSA9IG9sZEluZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobmV3SW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICh0b1RlYXJkb3duIHx8ICh0b1RlYXJkb3duID0gW10pKS5wdXNoKHNlY3Rpb24uZnJhZ21lbnRzW29sZEluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnkgPSBuZXdJbmRleCAtIG9sZEluZGV4O1xuICAgICAgICAgICAgICAgIG9sZEtleXBhdGggPSBzZWN0aW9uLmtleXBhdGggKyAnLicgKyBvbGRJbmRleDtcbiAgICAgICAgICAgICAgICBuZXdLZXlwYXRoID0gc2VjdGlvbi5rZXlwYXRoICsgJy4nICsgbmV3SW5kZXg7XG4gICAgICAgICAgICAgICAgcmVhc3NpZ25GcmFnbWVudChzZWN0aW9uLmZyYWdtZW50c1tvbGRJbmRleF0sIHNlY3Rpb24uZGVzY3JpcHRvci5pLCBvbGRJbmRleCwgbmV3SW5kZXgsIGJ5LCBvbGRLZXlwYXRoLCBuZXdLZXlwYXRoKTtcbiAgICAgICAgICAgICAgICBuZXdGcmFnbWVudHNbbmV3SW5kZXhdID0gc2VjdGlvbi5mcmFnbWVudHNbb2xkSW5kZXhdO1xuICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodG9UZWFyZG93bikge1xuICAgICAgICAgICAgICAgIHdoaWxlIChmcmFnbWVudCA9IHRvVGVhcmRvd24ucG9wKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQudGVhcmRvd24odHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpcnN0Q2hhbmdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmaXJzdENoYW5nZSA9IHRoaXMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3TGVuZ3RoID0gdGhpcy5yb290LmdldCh0aGlzLmtleXBhdGgpLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChuZXdMZW5ndGggPT09IGZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnJhZ21lbnRPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0b3I6IHRoaXMuZGVzY3JpcHRvci5mLFxuICAgICAgICAgICAgICAgIHJvb3Q6IHRoaXMucm9vdCxcbiAgICAgICAgICAgICAgICBwTm9kZTogcGFyZW50RnJhZ21lbnQucE5vZGUsXG4gICAgICAgICAgICAgICAgb3duZXI6IHRoaXNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5kZXNjcmlwdG9yLmkpIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudE9wdGlvbnMuaW5kZXhSZWYgPSB0aGlzLmRlc2NyaXB0b3IuaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IGZpcnN0Q2hhbmdlOyBpIDwgbmV3TGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZnJhZ21lbnQgPSBuZXdGcmFnbWVudHNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2NGcmFnLmFwcGVuZENoaWxkKGZyYWdtZW50LmRldGFjaChmYWxzZSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucy5jb250ZXh0U3RhY2sgPSB0aGlzLmNvbnRleHRTdGFjay5jb25jYXQodGhpcy5rZXlwYXRoICsgJy4nICsgaSk7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucy5pbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gdGhpcy5jcmVhdGVGcmFnbWVudChmcmFnbWVudE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50c1tpXSA9IGZyYWdtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dE5vZGUgPSBwYXJlbnRGcmFnbWVudC5maW5kTmV4dE5vZGUodGhpcyk7XG4gICAgICAgICAgICBwYXJlbnRGcmFnbWVudC5wTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb2NGcmFnLCBuZXh0Tm9kZSk7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IG5ld0xlbmd0aDtcbiAgICAgICAgfTtcbiAgICB9KHJlbmRlcl9Eb21GcmFnbWVudF9TZWN0aW9uX3JlYXNzaWduRnJhZ21lbnQpO1xudmFyIGNpcmN1bGFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH0oKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfU2VjdGlvbl9fU2VjdGlvbiA9IGZ1bmN0aW9uICh0eXBlcywgaXNDbGllbnQsIGluaXRNdXN0YWNoZSwgdXBkYXRlTXVzdGFjaGUsIHJlc29sdmVNdXN0YWNoZSwgdXBkYXRlU2VjdGlvbiwgcmVhc3NpZ25GcmFnbWVudCwgcmVhc3NpZ25GcmFnbWVudHMsIG1lcmdlLCB0ZWFyZG93biwgY2lyY3VsYXIpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBEb21TZWN0aW9uLCBEb21GcmFnbWVudDtcbiAgICAgICAgY2lyY3VsYXIucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBEb21GcmFnbWVudCA9IGNpcmN1bGFyLkRvbUZyYWdtZW50O1xuICAgICAgICB9KTtcbiAgICAgICAgRG9tU2VjdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zLCBkb2NGcmFnKSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlcy5TRUNUSU9OO1xuICAgICAgICAgICAgdGhpcy5pbnZlcnRlZCA9ICEhb3B0aW9ucy5kZXNjcmlwdG9yLm47XG4gICAgICAgICAgICB0aGlzLmZyYWdtZW50cyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgaWYgKGRvY0ZyYWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpc2luZyA9IHRydWU7XG4gICAgICAgICAgICBpbml0TXVzdGFjaGUodGhpcywgb3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoZG9jRnJhZykge1xuICAgICAgICAgICAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQodGhpcy5kb2NGcmFnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGlzaW5nID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIERvbVNlY3Rpb24ucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdXBkYXRlOiB1cGRhdGVNdXN0YWNoZSxcbiAgICAgICAgICAgIHJlc29sdmU6IHJlc29sdmVNdXN0YWNoZSxcbiAgICAgICAgICAgIHNtYXJ0VXBkYXRlOiBmdW5jdGlvbiAobWV0aG9kTmFtZSwgYXJncykge1xuICAgICAgICAgICAgICAgIHZhciBmcmFnbWVudE9wdGlvbnM7XG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZE5hbWUgPT09ICdwdXNoJyB8fCBtZXRob2ROYW1lID09PSAndW5zaGlmdCcgfHwgbWV0aG9kTmFtZSA9PT0gJ3NwbGljZScpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRvcjogdGhpcy5kZXNjcmlwdG9yLmYsXG4gICAgICAgICAgICAgICAgICAgICAgICByb290OiB0aGlzLnJvb3QsXG4gICAgICAgICAgICAgICAgICAgICAgICBwTm9kZTogdGhpcy5wYXJlbnRGcmFnbWVudC5wTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG93bmVyOiB0aGlzXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlc2NyaXB0b3IuaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRPcHRpb25zLmluZGV4UmVmID0gdGhpcy5kZXNjcmlwdG9yLmk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbbWV0aG9kTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzW21ldGhvZE5hbWVdKGZyYWdtZW50T3B0aW9ucywgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50cy5wb3AoKS50ZWFyZG93bih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggLT0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHVzaDogZnVuY3Rpb24gKGZyYWdtZW50T3B0aW9ucywgYXJncykge1xuICAgICAgICAgICAgICAgIHZhciBzdGFydCwgZW5kLCBpO1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZW5kID0gc3RhcnQgKyBhcmdzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucy5jb250ZXh0U3RhY2sgPSB0aGlzLmNvbnRleHRTdGFjay5jb25jYXQodGhpcy5rZXlwYXRoICsgJy4nICsgaSk7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucy5pbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRzW2ldID0gdGhpcy5jcmVhdGVGcmFnbWVudChmcmFnbWVudE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCArPSBhcmdzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEZyYWdtZW50LnBOb2RlLmluc2VydEJlZm9yZSh0aGlzLmRvY0ZyYWcsIHRoaXMucGFyZW50RnJhZ21lbnQuZmluZE5leHROb2RlKHRoaXMpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaGlmdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3BsaWNlKG51bGwsIFtcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuc2hpZnQ6IGZ1bmN0aW9uIChmcmFnbWVudE9wdGlvbnMsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwbGljZShmcmFnbWVudE9wdGlvbnMsIFtcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgIF0uY29uY2F0KG5ldyBBcnJheShhcmdzLmxlbmd0aCkpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGxpY2U6IGZ1bmN0aW9uIChmcmFnbWVudE9wdGlvbnMsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5zZXJ0aW9uUG9pbnQsIGFkZGVkSXRlbXMsIHJlbW92ZWRJdGVtcywgYmFsYW5jZSwgaSwgc3RhcnQsIGVuZCwgc3BsaWNlQXJncywgcmVhc3NpZ25TdGFydDtcbiAgICAgICAgICAgICAgICBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RhcnQgPSArKGFyZ3NbMF0gPCAwID8gdGhpcy5sZW5ndGggKyBhcmdzWzBdIDogYXJnc1swXSk7XG4gICAgICAgICAgICAgICAgYWRkZWRJdGVtcyA9IE1hdGgubWF4KDAsIGFyZ3MubGVuZ3RoIC0gMik7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZEl0ZW1zID0gYXJnc1sxXSAhPT0gdW5kZWZpbmVkID8gYXJnc1sxXSA6IHRoaXMubGVuZ3RoIC0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZEl0ZW1zID0gTWF0aC5taW4ocmVtb3ZlZEl0ZW1zLCB0aGlzLmxlbmd0aCAtIHN0YXJ0KTtcbiAgICAgICAgICAgICAgICBiYWxhbmNlID0gYWRkZWRJdGVtcyAtIHJlbW92ZWRJdGVtcztcbiAgICAgICAgICAgICAgICBpZiAoIWJhbGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYmFsYW5jZSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gc3RhcnQgLSBiYWxhbmNlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50c1tpXS50ZWFyZG93bih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50cy5zcGxpY2Uoc3RhcnQsIC1iYWxhbmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbmQgPSBzdGFydCArIGJhbGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGluc2VydGlvblBvaW50ID0gdGhpcy5mcmFnbWVudHNbc3RhcnRdID8gdGhpcy5mcmFnbWVudHNbc3RhcnRdLmZpcnN0Tm9kZSgpIDogdGhpcy5wYXJlbnRGcmFnbWVudC5maW5kTmV4dE5vZGUodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHNwbGljZUFyZ3MgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgXS5jb25jYXQobmV3IEFycmF5KGJhbGFuY2UpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudHMuc3BsaWNlLmFwcGx5KHRoaXMuZnJhZ21lbnRzLCBzcGxpY2VBcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRPcHRpb25zLmNvbnRleHRTdGFjayA9IHRoaXMuY29udGV4dFN0YWNrLmNvbmNhdCh0aGlzLmtleXBhdGggKyAnLicgKyBpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50T3B0aW9ucy5pbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50c1tpXSA9IHRoaXMuY3JlYXRlRnJhZ21lbnQoZnJhZ21lbnRPcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEZyYWdtZW50LnBOb2RlLmluc2VydEJlZm9yZSh0aGlzLmRvY0ZyYWcsIGluc2VydGlvblBvaW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggKz0gYmFsYW5jZTtcbiAgICAgICAgICAgICAgICByZWFzc2lnblN0YXJ0ID0gc3RhcnQgKyBhZGRlZEl0ZW1zO1xuICAgICAgICAgICAgICAgIHJlYXNzaWduRnJhZ21lbnRzKHRoaXMucm9vdCwgdGhpcywgcmVhc3NpZ25TdGFydCwgdGhpcy5sZW5ndGgsIGJhbGFuY2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1lcmdlOiBtZXJnZSxcbiAgICAgICAgICAgIGRldGFjaDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpLCBsZW47XG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5mcmFnbWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY0ZyYWcuYXBwZW5kQ2hpbGQodGhpcy5mcmFnbWVudHNbaV0uZGV0YWNoKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb2NGcmFnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoZGVzdHJveSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGVhcmRvd25GcmFnbWVudHMoZGVzdHJveSk7XG4gICAgICAgICAgICAgICAgdGVhcmRvd24odGhpcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlyc3ROb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJhZ21lbnRzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYWdtZW50c1swXS5maXJzdE5vZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50RnJhZ21lbnQuZmluZE5leHROb2RlKHRoaXMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmROZXh0Tm9kZTogZnVuY3Rpb24gKGZyYWdtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJhZ21lbnRzW2ZyYWdtZW50LmluZGV4ICsgMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJhZ21lbnRzW2ZyYWdtZW50LmluZGV4ICsgMV0uZmlyc3ROb2RlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudEZyYWdtZW50LmZpbmROZXh0Tm9kZSh0aGlzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bkZyYWdtZW50czogZnVuY3Rpb24gKGRlc3Ryb3kpIHtcbiAgICAgICAgICAgICAgICB2YXIgaWQsIGZyYWdtZW50O1xuICAgICAgICAgICAgICAgIHdoaWxlIChmcmFnbWVudCA9IHRoaXMuZnJhZ21lbnRzLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQudGVhcmRvd24oZGVzdHJveSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyYWdtZW50c0J5SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpZCBpbiB0aGlzLmZyYWdtZW50c0J5SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyYWdtZW50c1tpZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50c0J5SWRbaWRdLnRlYXJkb3duKGRlc3Ryb3kpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRzQnlJZFtpZF0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHROb2RlLCB3cmFwcGVkO1xuICAgICAgICAgICAgICAgIGlmICh3cmFwcGVkID0gdGhpcy5yb290Ll93cmFwcGVkW3RoaXMua2V5cGF0aF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwcGVkLmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZW5kZXJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlU2VjdGlvbih0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kb2NGcmFnICYmICF0aGlzLmRvY0ZyYWcuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGlzaW5nICYmIGlzQ2xpZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHROb2RlID0gdGhpcy5wYXJlbnRGcmFnbWVudC5maW5kTmV4dE5vZGUodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0Tm9kZSAmJiBuZXh0Tm9kZS5wYXJlbnROb2RlID09PSB0aGlzLnBhcmVudEZyYWdtZW50LnBOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEZyYWdtZW50LnBOb2RlLmluc2VydEJlZm9yZSh0aGlzLmRvY0ZyYWcsIG5leHROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50RnJhZ21lbnQucE5vZGUuYXBwZW5kQ2hpbGQodGhpcy5kb2NGcmFnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcmVhdGVGcmFnbWVudDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgZnJhZ21lbnQgPSBuZXcgRG9tRnJhZ21lbnQob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZG9jRnJhZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY0ZyYWcuYXBwZW5kQ2hpbGQoZnJhZ21lbnQuZG9jRnJhZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmcmFnbWVudDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzdHIsIGksIGlkLCBsZW47XG4gICAgICAgICAgICAgICAgc3RyID0gJyc7XG4gICAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSB0aGlzLmZyYWdtZW50c1tpXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmFnbWVudHNCeUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaWQgaW4gdGhpcy5mcmFnbWVudHNCeUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmFnbWVudHNCeUlkW2lkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSB0aGlzLmZyYWdtZW50c0J5SWRbaWRdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgbGVuLCBxdWVyeVJlc3VsdDtcbiAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLmZyYWdtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWVyeVJlc3VsdCA9IHRoaXMuZnJhZ21lbnRzW2ldLmZpbmQoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnlSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZEFsbDogZnVuY3Rpb24gKHNlbGVjdG9yLCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciBpLCBsZW47XG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5mcmFnbWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50c1tpXS5maW5kQWxsKHNlbGVjdG9yLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmRDb21wb25lbnQ6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHZhciBpLCBsZW4sIHF1ZXJ5UmVzdWx0O1xuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMuZnJhZ21lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXJ5UmVzdWx0ID0gdGhpcy5mcmFnbWVudHNbaV0uZmluZENvbXBvbmVudChzZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeVJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kQWxsQ29tcG9uZW50czogZnVuY3Rpb24gKHNlbGVjdG9yLCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciBpLCBsZW47XG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5mcmFnbWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50c1tpXS5maW5kQWxsQ29tcG9uZW50cyhzZWxlY3RvciwgcXVlcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIERvbVNlY3Rpb247XG4gICAgfShjb25maWdfdHlwZXMsIGNvbmZpZ19pc0NsaWVudCwgcmVuZGVyX3NoYXJlZF9pbml0TXVzdGFjaGUsIHJlbmRlcl9zaGFyZWRfdXBkYXRlTXVzdGFjaGUsIHJlbmRlcl9zaGFyZWRfcmVzb2x2ZU11c3RhY2hlLCByZW5kZXJfc2hhcmVkX3VwZGF0ZVNlY3Rpb24sIHJlbmRlcl9Eb21GcmFnbWVudF9TZWN0aW9uX3JlYXNzaWduRnJhZ21lbnQsIHJlbmRlcl9Eb21GcmFnbWVudF9TZWN0aW9uX3JlYXNzaWduRnJhZ21lbnRzLCByZW5kZXJfRG9tRnJhZ21lbnRfU2VjdGlvbl9wcm90b3R5cGVfbWVyZ2UsIHNoYXJlZF90ZWFyZG93biwgY2lyY3VsYXIpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9UcmlwbGUgPSBmdW5jdGlvbiAodHlwZXMsIG1hdGNoZXMsIGluaXRNdXN0YWNoZSwgdXBkYXRlTXVzdGFjaGUsIHJlc29sdmVNdXN0YWNoZSwgaW5zZXJ0SHRtbCwgdGVhcmRvd24pIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBEb21UcmlwbGUgPSBmdW5jdGlvbiAob3B0aW9ucywgZG9jRnJhZykge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZXMuVFJJUExFO1xuICAgICAgICAgICAgaWYgKGRvY0ZyYWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVzID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5kb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXNpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaW5pdE11c3RhY2hlKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKGRvY0ZyYWcpIHtcbiAgICAgICAgICAgICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKHRoaXMuZG9jRnJhZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpc2luZyA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICBEb21UcmlwbGUucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdXBkYXRlOiB1cGRhdGVNdXN0YWNoZSxcbiAgICAgICAgICAgIHJlc29sdmU6IHJlc29sdmVNdXN0YWNoZSxcbiAgICAgICAgICAgIGRldGFjaDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gdGhpcy5ub2Rlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY0ZyYWcuYXBwZW5kQ2hpbGQodGhpcy5ub2Rlc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRvY0ZyYWc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uIChkZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlc3Ryb3kpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2NGcmFnID0gdGhpcy5ub2RlcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRlYXJkb3duKHRoaXMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpcnN0Tm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGVzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGVzWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRGcmFnbWVudC5maW5kTmV4dE5vZGUodGhpcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoaHRtbCkge1xuICAgICAgICAgICAgICAgIHZhciBub2RlLCBwTm9kZTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubm9kZXMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFodG1sKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwTm9kZSA9IHRoaXMucGFyZW50RnJhZ21lbnQucE5vZGU7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlcyA9IGluc2VydEh0bWwoaHRtbCwgcE5vZGUudGFnTmFtZSwgdGhpcy5kb2NGcmFnKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGlzaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHBOb2RlLmluc2VydEJlZm9yZSh0aGlzLmRvY0ZyYWcsIHRoaXMucGFyZW50RnJhZ21lbnQuZmluZE5leHROb2RlKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSAhPSB1bmRlZmluZWQgPyB0aGlzLnZhbHVlIDogJyc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIGksIGxlbiwgbm9kZSwgcXVlcnlSZXN1bHQ7XG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5ub2Rlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5vZGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMobm9kZSwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnlSZXN1bHQgPSBub2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnlSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZEFsbDogZnVuY3Rpb24gKHNlbGVjdG9yLCBxdWVyeVJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHZhciBpLCBsZW4sIG5vZGUsIHF1ZXJ5QWxsUmVzdWx0LCBudW1Ob2RlcywgajtcbiAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLm5vZGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubm9kZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcyhub2RlLCBzZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5UmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXJ5QWxsUmVzdWx0ID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnVtTm9kZXMgPSBxdWVyeUFsbFJlc3VsdC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbnVtTm9kZXM7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5UmVzdWx0LnB1c2gocXVlcnlBbGxSZXN1bHRbal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRG9tVHJpcGxlO1xuICAgIH0oY29uZmlnX3R5cGVzLCB1dGlsc19tYXRjaGVzLCByZW5kZXJfc2hhcmVkX2luaXRNdXN0YWNoZSwgcmVuZGVyX3NoYXJlZF91cGRhdGVNdXN0YWNoZSwgcmVuZGVyX3NoYXJlZF9yZXNvbHZlTXVzdGFjaGUsIHJlbmRlcl9Eb21GcmFnbWVudF9zaGFyZWRfaW5zZXJ0SHRtbCwgc2hhcmVkX3RlYXJkb3duKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9pbml0aWFsaXNlX2dldEVsZW1lbnROYW1lc3BhY2UgPSBmdW5jdGlvbiAobmFtZXNwYWNlcykge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkZXNjcmlwdG9yLCBwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRvci5hICYmIGRlc2NyaXB0b3IuYS54bWxucykge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdG9yLmEueG1sbnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRvci5lID09PSAnc3ZnJyA/IG5hbWVzcGFjZXMuc3ZnIDogcGFyZW50Tm9kZS5uYW1lc3BhY2VVUkkgfHwgbmFtZXNwYWNlcy5odG1sO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX25hbWVzcGFjZXMpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9zaGFyZWRfZW5mb3JjZUNhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgc3ZnQ2FtZWxDYXNlRWxlbWVudHMsIHN2Z0NhbWVsQ2FzZUF0dHJpYnV0ZXMsIGNyZWF0ZU1hcCwgbWFwO1xuICAgICAgICBzdmdDYW1lbENhc2VFbGVtZW50cyA9ICdhbHRHbHlwaCBhbHRHbHlwaERlZiBhbHRHbHlwaEl0ZW0gYW5pbWF0ZUNvbG9yIGFuaW1hdGVNb3Rpb24gYW5pbWF0ZVRyYW5zZm9ybSBjbGlwUGF0aCBmZUJsZW5kIGZlQ29sb3JNYXRyaXggZmVDb21wb25lbnRUcmFuc2ZlciBmZUNvbXBvc2l0ZSBmZUNvbnZvbHZlTWF0cml4IGZlRGlmZnVzZUxpZ2h0aW5nIGZlRGlzcGxhY2VtZW50TWFwIGZlRGlzdGFudExpZ2h0IGZlRmxvb2QgZmVGdW5jQSBmZUZ1bmNCIGZlRnVuY0cgZmVGdW5jUiBmZUdhdXNzaWFuQmx1ciBmZUltYWdlIGZlTWVyZ2UgZmVNZXJnZU5vZGUgZmVNb3JwaG9sb2d5IGZlT2Zmc2V0IGZlUG9pbnRMaWdodCBmZVNwZWN1bGFyTGlnaHRpbmcgZmVTcG90TGlnaHQgZmVUaWxlIGZlVHVyYnVsZW5jZSBmb3JlaWduT2JqZWN0IGdseXBoUmVmIGxpbmVhckdyYWRpZW50IHJhZGlhbEdyYWRpZW50IHRleHRQYXRoIHZrZXJuJy5zcGxpdCgnICcpO1xuICAgICAgICBzdmdDYW1lbENhc2VBdHRyaWJ1dGVzID0gJ2F0dHJpYnV0ZU5hbWUgYXR0cmlidXRlVHlwZSBiYXNlRnJlcXVlbmN5IGJhc2VQcm9maWxlIGNhbGNNb2RlIGNsaXBQYXRoVW5pdHMgY29udGVudFNjcmlwdFR5cGUgY29udGVudFN0eWxlVHlwZSBkaWZmdXNlQ29uc3RhbnQgZWRnZU1vZGUgZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZCBmaWx0ZXJSZXMgZmlsdGVyVW5pdHMgZ2x5cGhSZWYgZ3JhZGllbnRUcmFuc2Zvcm0gZ3JhZGllbnRVbml0cyBrZXJuZWxNYXRyaXgga2VybmVsVW5pdExlbmd0aCBrZXlQb2ludHMga2V5U3BsaW5lcyBrZXlUaW1lcyBsZW5ndGhBZGp1c3QgbGltaXRpbmdDb25lQW5nbGUgbWFya2VySGVpZ2h0IG1hcmtlclVuaXRzIG1hcmtlcldpZHRoIG1hc2tDb250ZW50VW5pdHMgbWFza1VuaXRzIG51bU9jdGF2ZXMgcGF0aExlbmd0aCBwYXR0ZXJuQ29udGVudFVuaXRzIHBhdHRlcm5UcmFuc2Zvcm0gcGF0dGVyblVuaXRzIHBvaW50c0F0WCBwb2ludHNBdFkgcG9pbnRzQXRaIHByZXNlcnZlQWxwaGEgcHJlc2VydmVBc3BlY3RSYXRpbyBwcmltaXRpdmVVbml0cyByZWZYIHJlZlkgcmVwZWF0Q291bnQgcmVwZWF0RHVyIHJlcXVpcmVkRXh0ZW5zaW9ucyByZXF1aXJlZEZlYXR1cmVzIHNwZWN1bGFyQ29uc3RhbnQgc3BlY3VsYXJFeHBvbmVudCBzcHJlYWRNZXRob2Qgc3RhcnRPZmZzZXQgc3RkRGV2aWF0aW9uIHN0aXRjaFRpbGVzIHN1cmZhY2VTY2FsZSBzeXN0ZW1MYW5ndWFnZSB0YWJsZVZhbHVlcyB0YXJnZXRYIHRhcmdldFkgdGV4dExlbmd0aCB2aWV3Qm94IHZpZXdUYXJnZXQgeENoYW5uZWxTZWxlY3RvciB5Q2hhbm5lbFNlbGVjdG9yIHpvb21BbmRQYW4nLnNwbGl0KCcgJyk7XG4gICAgICAgIGNyZWF0ZU1hcCA9IGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICAgICAgdmFyIG1hcCA9IHt9LCBpID0gaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIG1hcFtpdGVtc1tpXS50b0xvd2VyQ2FzZSgpXSA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgICAgfTtcbiAgICAgICAgbWFwID0gY3JlYXRlTWFwKHN2Z0NhbWVsQ2FzZUVsZW1lbnRzLmNvbmNhdChzdmdDYW1lbENhc2VBdHRyaWJ1dGVzKSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZWxlbWVudE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBsb3dlckNhc2VFbGVtZW50TmFtZSA9IGVsZW1lbnROYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICByZXR1cm4gbWFwW2xvd2VyQ2FzZUVsZW1lbnROYW1lXSB8fCBsb3dlckNhc2VFbGVtZW50TmFtZTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0F0dHJpYnV0ZV9oZWxwZXJzX2RldGVybWluZU5hbWVBbmROYW1lc3BhY2UgPSBmdW5jdGlvbiAobmFtZXNwYWNlcywgZW5mb3JjZUNhc2UpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYXR0cmlidXRlLCBuYW1lKSB7XG4gICAgICAgICAgICB2YXIgY29sb25JbmRleCwgbmFtZXNwYWNlUHJlZml4O1xuICAgICAgICAgICAgY29sb25JbmRleCA9IG5hbWUuaW5kZXhPZignOicpO1xuICAgICAgICAgICAgaWYgKGNvbG9uSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlUHJlZml4ID0gbmFtZS5zdWJzdHIoMCwgY29sb25JbmRleCk7XG4gICAgICAgICAgICAgICAgaWYgKG5hbWVzcGFjZVByZWZpeCAhPT0gJ3htbG5zJykge1xuICAgICAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoY29sb25JbmRleCArIDEpO1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUubmFtZSA9IGVuZm9yY2VDYXNlKG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUubGNOYW1lID0gYXR0cmlidXRlLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlLm5hbWVzcGFjZSA9IG5hbWVzcGFjZXNbbmFtZXNwYWNlUHJlZml4LnRvTG93ZXJDYXNlKCldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWF0dHJpYnV0ZS5uYW1lc3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93ICdVbmtub3duIG5hbWVzcGFjZSAoXCInICsgbmFtZXNwYWNlUHJlZml4ICsgJ1wiKSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF0dHJpYnV0ZS5uYW1lID0gYXR0cmlidXRlLmVsZW1lbnQubmFtZXNwYWNlICE9PSBuYW1lc3BhY2VzLmh0bWwgPyBlbmZvcmNlQ2FzZShuYW1lKSA6IG5hbWU7XG4gICAgICAgICAgICBhdHRyaWJ1dGUubGNOYW1lID0gYXR0cmlidXRlLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ19uYW1lc3BhY2VzLCByZW5kZXJfRG9tRnJhZ21lbnRfc2hhcmVkX2VuZm9yY2VDYXNlKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfQXR0cmlidXRlX2hlbHBlcnNfc2V0U3RhdGljQXR0cmlidXRlID0gZnVuY3Rpb24gKG5hbWVzcGFjZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYXR0cmlidXRlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSwgdmFsdWUgPSBvcHRpb25zLnZhbHVlID09PSBudWxsID8gJycgOiBvcHRpb25zLnZhbHVlO1xuICAgICAgICAgICAgaWYgKG5vZGUgPSBvcHRpb25zLnBOb2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS5uYW1lc3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGVOUyhhdHRyaWJ1dGUubmFtZXNwYWNlLCBvcHRpb25zLm5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5uYW1lID09PSAnc3R5bGUnICYmIG5vZGUuc3R5bGUuc2V0QXR0cmlidXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnN0eWxlLnNldEF0dHJpYnV0ZSgnY3NzVGV4dCcsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLm5hbWUgPT09ICdjbGFzcycgJiYgKCFub2RlLm5hbWVzcGFjZVVSSSB8fCBub2RlLm5hbWVzcGFjZVVSSSA9PT0gbmFtZXNwYWNlcy5odG1sKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKG9wdGlvbnMubmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUubmFtZSA9PT0gJ2lkJykge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnJvb3Qubm9kZXNbb3B0aW9ucy52YWx1ZV0gPSBub2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlLm5hbWUgPT09ICd2YWx1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5fcmFjdGl2ZS52YWx1ZSA9IG9wdGlvbnMudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXR0cmlidXRlLnZhbHVlID0gb3B0aW9ucy52YWx1ZTtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ19uYW1lc3BhY2VzKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfQXR0cmlidXRlX2hlbHBlcnNfZGV0ZXJtaW5lUHJvcGVydHlOYW1lID0gZnVuY3Rpb24gKG5hbWVzcGFjZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBwcm9wZXJ0eU5hbWVzID0ge1xuICAgICAgICAgICAgICAgICdhY2NlcHQtY2hhcnNldCc6ICdhY2NlcHRDaGFyc2V0JyxcbiAgICAgICAgICAgICAgICBhY2Nlc3NrZXk6ICdhY2Nlc3NLZXknLFxuICAgICAgICAgICAgICAgIGJnY29sb3I6ICdiZ0NvbG9yJyxcbiAgICAgICAgICAgICAgICAnY2xhc3MnOiAnY2xhc3NOYW1lJyxcbiAgICAgICAgICAgICAgICBjb2RlYmFzZTogJ2NvZGVCYXNlJyxcbiAgICAgICAgICAgICAgICBjb2xzcGFuOiAnY29sU3BhbicsXG4gICAgICAgICAgICAgICAgY29udGVudGVkaXRhYmxlOiAnY29udGVudEVkaXRhYmxlJyxcbiAgICAgICAgICAgICAgICBkYXRldGltZTogJ2RhdGVUaW1lJyxcbiAgICAgICAgICAgICAgICBkaXJuYW1lOiAnZGlyTmFtZScsXG4gICAgICAgICAgICAgICAgJ2Zvcic6ICdodG1sRm9yJyxcbiAgICAgICAgICAgICAgICAnaHR0cC1lcXVpdic6ICdodHRwRXF1aXYnLFxuICAgICAgICAgICAgICAgIGlzbWFwOiAnaXNNYXAnLFxuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogJ21heExlbmd0aCcsXG4gICAgICAgICAgICAgICAgbm92YWxpZGF0ZTogJ25vVmFsaWRhdGUnLFxuICAgICAgICAgICAgICAgIHB1YmRhdGU6ICdwdWJEYXRlJyxcbiAgICAgICAgICAgICAgICByZWFkb25seTogJ3JlYWRPbmx5JyxcbiAgICAgICAgICAgICAgICByb3dzcGFuOiAncm93U3BhbicsXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg6ICd0YWJJbmRleCcsXG4gICAgICAgICAgICAgICAgdXNlbWFwOiAndXNlTWFwJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhdHRyaWJ1dGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eU5hbWU7XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlLnBOb2RlICYmICFhdHRyaWJ1dGUubmFtZXNwYWNlICYmICghb3B0aW9ucy5wTm9kZS5uYW1lc3BhY2VVUkkgfHwgb3B0aW9ucy5wTm9kZS5uYW1lc3BhY2VVUkkgPT09IG5hbWVzcGFjZXMuaHRtbCkpIHtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWVzW2F0dHJpYnV0ZS5uYW1lXSB8fCBhdHRyaWJ1dGUubmFtZTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5wTm9kZVtwcm9wZXJ0eU5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnBOb2RlW3Byb3BlcnR5TmFtZV0gPT09ICdib29sZWFuJyB8fCBwcm9wZXJ0eU5hbWUgPT09ICd2YWx1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlLnVzZVByb3BlcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfShjb25maWdfbmFtZXNwYWNlcyk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0F0dHJpYnV0ZV9wcm90b3R5cGVfYmluZCA9IGZ1bmN0aW9uICh0eXBlcywgd2FybiwgYXJyYXlDb250ZW50c01hdGNoLCBnZXRWYWx1ZUZyb21DaGVja2JveGVzKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgYmluZEF0dHJpYnV0ZSwgZ2V0SW50ZXJwb2xhdG9yLCB1cGRhdGVNb2RlbCwgdXBkYXRlLCBnZXRCaW5kaW5nLCBpbmhlcml0UHJvcGVydGllcywgTXVsdGlwbGVTZWxlY3RCaW5kaW5nLCBTZWxlY3RCaW5kaW5nLCBSYWRpb05hbWVCaW5kaW5nLCBDaGVja2JveE5hbWVCaW5kaW5nLCBDaGVja2VkQmluZGluZywgRmlsZUxpc3RCaW5kaW5nLCBDb250ZW50RWRpdGFibGVCaW5kaW5nLCBHZW5lcmljQmluZGluZztcbiAgICAgICAgYmluZEF0dHJpYnV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5wTm9kZSwgaW50ZXJwb2xhdG9yLCBiaW5kaW5nLCBiaW5kaW5ncztcbiAgICAgICAgICAgIGlmICghdGhpcy5mcmFnbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGludGVycG9sYXRvciA9IGdldEludGVycG9sYXRvcih0aGlzKTtcbiAgICAgICAgICAgIGlmICghaW50ZXJwb2xhdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbnRlcnBvbGF0b3IgPSBpbnRlcnBvbGF0b3I7XG4gICAgICAgICAgICB0aGlzLmtleXBhdGggPSBpbnRlcnBvbGF0b3Iua2V5cGF0aCB8fCBpbnRlcnBvbGF0b3IuZGVzY3JpcHRvci5yO1xuICAgICAgICAgICAgYmluZGluZyA9IGdldEJpbmRpbmcodGhpcyk7XG4gICAgICAgICAgICBpZiAoIWJpbmRpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLl9yYWN0aXZlLmJpbmRpbmcgPSB0aGlzLmVsZW1lbnQuYmluZGluZyA9IGJpbmRpbmc7XG4gICAgICAgICAgICB0aGlzLnR3b3dheSA9IHRydWU7XG4gICAgICAgICAgICBiaW5kaW5ncyA9IHRoaXMucm9vdC5fdHdvd2F5QmluZGluZ3NbdGhpcy5rZXlwYXRoXSB8fCAodGhpcy5yb290Ll90d293YXlCaW5kaW5nc1t0aGlzLmtleXBhdGhdID0gW10pO1xuICAgICAgICAgICAgYmluZGluZ3NbYmluZGluZ3MubGVuZ3RoXSA9IGJpbmRpbmc7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlTW9kZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9yYWN0aXZlLmJpbmRpbmcudXBkYXRlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuX3JhY3RpdmUucm9vdC5nZXQodGhpcy5fcmFjdGl2ZS5iaW5kaW5nLmtleXBhdGgpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlID09IHVuZGVmaW5lZCA/ICcnIDogdmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIGdldEludGVycG9sYXRvciA9IGZ1bmN0aW9uIChhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHZhciBpdGVtLCBlcnJvck1lc3NhZ2U7XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlLmZyYWdtZW50Lml0ZW1zLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbSA9IGF0dHJpYnV0ZS5mcmFnbWVudC5pdGVtc1swXTtcbiAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgIT09IHR5cGVzLklOVEVSUE9MQVRPUikge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpdGVtLmtleXBhdGggJiYgIWl0ZW0ucmVmKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXRlbS5rZXlwYXRoICYmIGl0ZW0ua2V5cGF0aC5zdWJzdHIoMCwgMikgPT09ICckeycpIHtcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSAnWW91IGNhbm5vdCBzZXQgdXAgdHdvLXdheSBiaW5kaW5nIGFnYWluc3QgYW4gZXhwcmVzc2lvbiAnICsgaXRlbS5rZXlwYXRoO1xuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUucm9vdC5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICB3YXJuKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH07XG4gICAgICAgIGdldEJpbmRpbmcgPSBmdW5jdGlvbiAoYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGF0dHJpYnV0ZS5wTm9kZTtcbiAgICAgICAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUubXVsdGlwbGUgPyBuZXcgTXVsdGlwbGVTZWxlY3RCaW5kaW5nKGF0dHJpYnV0ZSwgbm9kZSkgOiBuZXcgU2VsZWN0QmluZGluZyhhdHRyaWJ1dGUsIG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ2NoZWNrYm94JyB8fCBub2RlLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlLnByb3BlcnR5TmFtZSA9PT0gJ25hbWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ2hlY2tib3hOYW1lQmluZGluZyhhdHRyaWJ1dGUsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmFkaW9OYW1lQmluZGluZyhhdHRyaWJ1dGUsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUucHJvcGVydHlOYW1lID09PSAnY2hlY2tlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGVja2VkQmluZGluZyhhdHRyaWJ1dGUsIG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUubGNOYW1lICE9PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgd2FybignVGhpcyBpcy4uLiBvZGQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRmlsZUxpc3RCaW5kaW5nKGF0dHJpYnV0ZSwgbm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb250ZW50RWRpdGFibGVCaW5kaW5nKGF0dHJpYnV0ZSwgbm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IEdlbmVyaWNCaW5kaW5nKGF0dHJpYnV0ZSwgbm9kZSk7XG4gICAgICAgIH07XG4gICAgICAgIE11bHRpcGxlU2VsZWN0QmluZGluZyA9IGZ1bmN0aW9uIChhdHRyaWJ1dGUsIG5vZGUpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZUZyb21Nb2RlbDtcbiAgICAgICAgICAgIGluaGVyaXRQcm9wZXJ0aWVzKHRoaXMsIGF0dHJpYnV0ZSwgbm9kZSk7XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICB2YWx1ZUZyb21Nb2RlbCA9IHRoaXMucm9vdC5nZXQodGhpcy5rZXlwYXRoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZUZyb21Nb2RlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgTXVsdGlwbGVTZWxlY3RCaW5kaW5nLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlLCBvcHRpb25zLCBpLCBsZW47XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBbXTtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gdGhpcy5ub2RlLm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgbGVuID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zW2ldLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVt2YWx1ZS5sZW5ndGhdID0gb3B0aW9uc1tpXS5fcmFjdGl2ZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZSwgcHJldmlvdXNWYWx1ZSwgdmFsdWU7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlID0gdGhpcy5hdHRyO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzVmFsdWUgPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUgPT09IHVuZGVmaW5lZCB8fCAhYXJyYXlDb250ZW50c01hdGNoKHZhbHVlLCBwcmV2aW91c1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUucmVjZWl2aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdC5zZXQodGhpcy5rZXlwYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS5yZWNlaXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVmZXJVcGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWZlcnJlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5fZGVmZXJyZWQuYXR0cnMucHVzaCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmVycmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBTZWxlY3RCaW5kaW5nID0gZnVuY3Rpb24gKGF0dHJpYnV0ZSwgbm9kZSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlRnJvbU1vZGVsO1xuICAgICAgICAgICAgaW5oZXJpdFByb3BlcnRpZXModGhpcywgYXR0cmlidXRlLCBub2RlKTtcbiAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgIHZhbHVlRnJvbU1vZGVsID0gdGhpcy5yb290LmdldCh0aGlzLmtleXBhdGgpO1xuICAgICAgICAgICAgaWYgKHZhbHVlRnJvbU1vZGVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBTZWxlY3RCaW5kaW5nLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMsIGksIGxlbjtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gdGhpcy5ub2RlLm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgbGVuID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zW2ldLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uc1tpXS5fcmFjdGl2ZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnZhbHVlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyLnJlY2VpdmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290LnNldCh0aGlzLmtleXBhdGgsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHIucmVjZWl2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVmZXJVcGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWZlcnJlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5fZGVmZXJyZWQuYXR0cnMucHVzaCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmVycmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBSYWRpb05hbWVCaW5kaW5nID0gZnVuY3Rpb24gKGF0dHJpYnV0ZSwgbm9kZSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlRnJvbU1vZGVsO1xuICAgICAgICAgICAgdGhpcy5yYWRpb05hbWUgPSB0cnVlO1xuICAgICAgICAgICAgaW5oZXJpdFByb3BlcnRpZXModGhpcywgYXR0cmlidXRlLCBub2RlKTtcbiAgICAgICAgICAgIG5vZGUubmFtZSA9ICd7eycgKyBhdHRyaWJ1dGUua2V5cGF0aCArICd9fSc7XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAobm9kZS5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWVGcm9tTW9kZWwgPSB0aGlzLnJvb3QuZ2V0KHRoaXMua2V5cGF0aCk7XG4gICAgICAgICAgICBpZiAodmFsdWVGcm9tTW9kZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG5vZGUuY2hlY2tlZCA9IHZhbHVlRnJvbU1vZGVsID09IG5vZGUuX3JhY3RpdmUudmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5fZGVmZXJyZWQucmFkaW9zLnB1c2godGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFJhZGlvTmFtZUJpbmRpbmcucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlLl9yYWN0aXZlID8gdGhpcy5ub2RlLl9yYWN0aXZlLnZhbHVlIDogdGhpcy5ub2RlLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyLnJlY2VpdmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdC5zZXQodGhpcy5rZXlwYXRoLCB0aGlzLnZhbHVlKCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHIucmVjZWl2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgQ2hlY2tib3hOYW1lQmluZGluZyA9IGZ1bmN0aW9uIChhdHRyaWJ1dGUsIG5vZGUpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZUZyb21Nb2RlbCwgY2hlY2tlZDtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tib3hOYW1lID0gdHJ1ZTtcbiAgICAgICAgICAgIGluaGVyaXRQcm9wZXJ0aWVzKHRoaXMsIGF0dHJpYnV0ZSwgbm9kZSk7XG4gICAgICAgICAgICBub2RlLm5hbWUgPSAne3snICsgdGhpcy5rZXlwYXRoICsgJ319JztcbiAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChub2RlLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZUZyb21Nb2RlbCA9IHRoaXMucm9vdC5nZXQodGhpcy5rZXlwYXRoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZUZyb21Nb2RlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tlZCA9IHZhbHVlRnJvbU1vZGVsLmluZGV4T2Yobm9kZS5fcmFjdGl2ZS52YWx1ZSkgIT09IC0xO1xuICAgICAgICAgICAgICAgIG5vZGUuY2hlY2tlZCA9IGNoZWNrZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvb3QuX2RlZmVycmVkLmNoZWNrYm94ZXMuaW5kZXhPZih0aGlzLmtleXBhdGgpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3QuX2RlZmVycmVkLmNoZWNrYm94ZXMucHVzaCh0aGlzLmtleXBhdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgQ2hlY2tib3hOYW1lQmluZGluZy5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBjaGFuZ2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5jaGVja2VkICE9PSAhIXRoaXMuY2hlY2tlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLm5vZGUuY2hlY2tlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHIucmVjZWl2aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3Quc2V0KHRoaXMua2V5cGF0aCwgZ2V0VmFsdWVGcm9tQ2hlY2tib3hlcyh0aGlzLnJvb3QsIHRoaXMua2V5cGF0aCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0ci5yZWNlaXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIENoZWNrZWRCaW5kaW5nID0gZnVuY3Rpb24gKGF0dHJpYnV0ZSwgbm9kZSkge1xuICAgICAgICAgICAgaW5oZXJpdFByb3BlcnRpZXModGhpcywgYXR0cmlidXRlLCBub2RlKTtcbiAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChub2RlLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIENoZWNrZWRCaW5kaW5nLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5jaGVja2VkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0ci5yZWNlaXZpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5zZXQodGhpcy5rZXlwYXRoLCB0aGlzLnZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0ci5yZWNlaXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIEZpbGVMaXN0QmluZGluZyA9IGZ1bmN0aW9uIChhdHRyaWJ1dGUsIG5vZGUpIHtcbiAgICAgICAgICAgIGluaGVyaXRQcm9wZXJ0aWVzKHRoaXMsIGF0dHJpYnV0ZSwgbm9kZSk7XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgIH07XG4gICAgICAgIEZpbGVMaXN0QmluZGluZy5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmF0dHIucE5vZGUuZmlsZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyLnJvb3Quc2V0KHRoaXMuYXR0ci5rZXlwYXRoLCB0aGlzLnZhbHVlKCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIENvbnRlbnRFZGl0YWJsZUJpbmRpbmcgPSBmdW5jdGlvbiAoYXR0cmlidXRlLCBub2RlKSB7XG4gICAgICAgICAgICBpbmhlcml0UHJvcGVydGllcyh0aGlzLCBhdHRyaWJ1dGUsIG5vZGUpO1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnJvb3QubGF6eSkge1xuICAgICAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgQ29udGVudEVkaXRhYmxlQmluZGluZy5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHIucmVjZWl2aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3Quc2V0KHRoaXMua2V5cGF0aCwgdGhpcy5ub2RlLmlubmVySFRNTCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyLnJlY2VpdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBHZW5lcmljQmluZGluZyA9IGZ1bmN0aW9uIChhdHRyaWJ1dGUsIG5vZGUpIHtcbiAgICAgICAgICAgIGluaGVyaXRQcm9wZXJ0aWVzKHRoaXMsIGF0dHJpYnV0ZSwgbm9kZSk7XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMucm9vdC5sYXp5KSB7XG4gICAgICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB1cGRhdGUsIGZhbHNlKTtcbiAgICAgICAgfTtcbiAgICAgICAgR2VuZXJpY0JpbmRpbmcucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmF0dHIucE5vZGUudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKCt2YWx1ZSArICcnID09PSB2YWx1ZSAmJiB2YWx1ZS5pbmRleE9mKCdlJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gK3ZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IHRoaXMuYXR0ciwgdmFsdWUgPSB0aGlzLnZhbHVlKCk7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlLnJlY2VpdmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlLnJvb3Quc2V0KGF0dHJpYnV0ZS5rZXlwYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlLnJlY2VpdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZU1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGVNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdXBkYXRlLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGluaGVyaXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKGJpbmRpbmcsIGF0dHJpYnV0ZSwgbm9kZSkge1xuICAgICAgICAgICAgYmluZGluZy5hdHRyID0gYXR0cmlidXRlO1xuICAgICAgICAgICAgYmluZGluZy5ub2RlID0gbm9kZTtcbiAgICAgICAgICAgIGJpbmRpbmcucm9vdCA9IGF0dHJpYnV0ZS5yb290O1xuICAgICAgICAgICAgYmluZGluZy5rZXlwYXRoID0gYXR0cmlidXRlLmtleXBhdGg7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBiaW5kQXR0cmlidXRlO1xuICAgIH0oY29uZmlnX3R5cGVzLCB1dGlsc193YXJuLCB1dGlsc19hcnJheUNvbnRlbnRzTWF0Y2gsIHNoYXJlZF9nZXRWYWx1ZUZyb21DaGVja2JveGVzKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfQXR0cmlidXRlX3Byb3RvdHlwZV91cGRhdGUgPSBmdW5jdGlvbiAoaXNBcnJheSwgbmFtZXNwYWNlcykge1xuICAgICAgICBcbiAgICAgICAgdmFyIHVwZGF0ZUF0dHJpYnV0ZSwgdXBkYXRlRmlsZUlucHV0VmFsdWUsIGRlZmVyU2VsZWN0LCBpbml0U2VsZWN0LCB1cGRhdGVTZWxlY3QsIHVwZGF0ZU11bHRpcGxlU2VsZWN0LCB1cGRhdGVSYWRpb05hbWUsIHVwZGF0ZUNoZWNrYm94TmFtZSwgdXBkYXRlSUVTdHlsZUF0dHJpYnV0ZSwgdXBkYXRlQ2xhc3NOYW1lLCB1cGRhdGVDb250ZW50RWRpdGFibGVWYWx1ZSwgdXBkYXRlRXZlcnl0aGluZ0Vsc2U7XG4gICAgICAgIHVwZGF0ZUF0dHJpYnV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBub2RlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnJlYWR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlID0gdGhpcy5wTm9kZTtcbiAgICAgICAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09ICdTRUxFQ1QnICYmIHRoaXMubGNOYW1lID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUgPSBkZWZlclNlbGVjdDtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmVycmVkVXBkYXRlID0gaW5pdFNlbGVjdDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmlzRmlsZUlucHV0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZUZpbGVJbnB1dFZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudHdvd2F5ICYmIHRoaXMubGNOYW1lID09PSAnbmFtZScpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlID0gdXBkYXRlUmFkaW9OYW1lO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZUNoZWNrYm94TmFtZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubGNOYW1lID09PSAnc3R5bGUnICYmIG5vZGUuc3R5bGUuc2V0QXR0cmlidXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUgPSB1cGRhdGVJRVN0eWxlQXR0cmlidXRlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubGNOYW1lID09PSAnY2xhc3MnICYmICghbm9kZS5uYW1lc3BhY2VVUkkgfHwgbm9kZS5uYW1lc3BhY2VVUkkgPT09IG5hbWVzcGFjZXMuaHRtbCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZUNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLmdldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJykgJiYgdGhpcy5sY05hbWUgPT09ICd2YWx1ZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZUNvbnRlbnRFZGl0YWJsZVZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGUgPSB1cGRhdGVFdmVyeXRoaW5nRWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICB1cGRhdGVGaWxlSW5wdXRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBpbml0U2VsZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5kZWZlcnJlZFVwZGF0ZSA9IHRoaXMucE5vZGUubXVsdGlwbGUgPyB1cGRhdGVNdWx0aXBsZVNlbGVjdCA6IHVwZGF0ZVNlbGVjdDtcbiAgICAgICAgICAgIHRoaXMuZGVmZXJyZWRVcGRhdGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgZGVmZXJTZWxlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnJvb3QuX2RlZmVycmVkLnNlbGVjdFZhbHVlcy5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHVwZGF0ZVNlbGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZnJhZ21lbnQuZ2V0VmFsdWUoKSwgb3B0aW9ucywgb3B0aW9uLCBpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucE5vZGUuX3JhY3RpdmUudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB0aGlzLnBOb2RlLm9wdGlvbnM7XG4gICAgICAgICAgICBpID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uID0gb3B0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLl9yYWN0aXZlLnZhbHVlID09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICB1cGRhdGVNdWx0aXBsZVNlbGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZnJhZ21lbnQuZ2V0VmFsdWUoKSwgb3B0aW9ucywgaTtcbiAgICAgICAgICAgIGlmICghaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFt2YWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcHRpb25zID0gdGhpcy5wTm9kZS5vcHRpb25zO1xuICAgICAgICAgICAgaSA9IG9wdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnNbaV0uc2VsZWN0ZWQgPSB2YWx1ZS5pbmRleE9mKG9wdGlvbnNbaV0uX3JhY3RpdmUudmFsdWUpICE9PSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICB1cGRhdGVSYWRpb05hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSwgdmFsdWU7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5wTm9kZTtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5mcmFnbWVudC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgbm9kZS5jaGVja2VkID0gdmFsdWUgPT0gbm9kZS5fcmFjdGl2ZS52YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICB1cGRhdGVDaGVja2JveE5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSwgdmFsdWU7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5wTm9kZTtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5mcmFnbWVudC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgaWYgKCFpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIG5vZGUuY2hlY2tlZCA9IHZhbHVlID09IG5vZGUuX3JhY3RpdmUudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLmNoZWNrZWQgPSB2YWx1ZS5pbmRleE9mKG5vZGUuX3JhY3RpdmUudmFsdWUpICE9PSAtMTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICB1cGRhdGVJRVN0eWxlQXR0cmlidXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5vZGUsIHZhbHVlO1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMucE5vZGU7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZnJhZ21lbnQuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUuc2V0QXR0cmlidXRlKCdjc3NUZXh0JywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICB1cGRhdGVDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSwgdmFsdWU7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5wTm9kZTtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5mcmFnbWVudC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlQ29udGVudEVkaXRhYmxlVmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSwgdmFsdWU7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5wTm9kZTtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5mcmFnbWVudC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJlY2VpdmluZykge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlRXZlcnl0aGluZ0Vsc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSwgdmFsdWU7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5wTm9kZTtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5mcmFnbWVudC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWx1ZUF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgICAgIG5vZGUuX3JhY3RpdmUudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnVzZVByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZWNlaXZpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVbdGhpcy5wcm9wZXJ0eU5hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmFtZXNwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlTlModGhpcy5uYW1lc3BhY2UsIHRoaXMubmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sY05hbWUgPT09ICdpZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290Lm5vZGVzW3RoaXMudmFsdWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdC5ub2Rlc1t2YWx1ZV0gPSBub2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSh0aGlzLm5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZUF0dHJpYnV0ZTtcbiAgICB9KHV0aWxzX2lzQXJyYXksIGNvbmZpZ19uYW1lc3BhY2VzKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfdXRpbHNfZ2V0U3RyaW5nTWF0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICAgICAgdmFyIHN1YnN0cjtcbiAgICAgICAgICAgIHN1YnN0ciA9IHRoaXMuc3RyLnN1YnN0cih0aGlzLnBvcywgc3RyaW5nLmxlbmd0aCk7XG4gICAgICAgICAgICBpZiAoc3Vic3RyID09PSBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcyArPSBzdHJpbmcubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgcGFyc2VfVG9rZW5pemVyX3V0aWxzX2FsbG93V2hpdGVzcGFjZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBsZWFkaW5nV2hpdGVzcGFjZSA9IC9eXFxzKy87XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsZWFkaW5nV2hpdGVzcGFjZS5leGVjKHRoaXMucmVtYWluaW5nKCkpO1xuICAgICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wb3MgKz0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzBdO1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfdXRpbHNfbWFrZVJlZ2V4TWF0Y2hlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocmVnZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gcmVnZXguZXhlYyh0b2tlbml6ZXIuc3RyLnN1YnN0cmluZyh0b2tlbml6ZXIucG9zKSk7XG4gICAgICAgICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyArPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzFdIHx8IG1hdGNoWzBdO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldFN0cmluZ0xpdGVyYWxfZ2V0RXNjYXBlZENoYXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciBjaGFycyA9ICcnLCBjaGFyYWN0ZXI7XG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBnZXRFc2NhcGVkQ2hhcih0b2tlbml6ZXIpO1xuICAgICAgICAgICAgd2hpbGUgKGNoYXJhY3Rlcikge1xuICAgICAgICAgICAgICAgIGNoYXJzICs9IGNoYXJhY3RlcjtcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgPSBnZXRFc2NhcGVkQ2hhcih0b2tlbml6ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNoYXJzIHx8IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGdldEVzY2FwZWRDaGFyKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIGNoYXJhY3RlcjtcbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCdcXFxcJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoYXJhY3RlciA9IHRva2VuaXplci5zdHIuY2hhckF0KHRva2VuaXplci5wb3MpO1xuICAgICAgICAgICAgdG9rZW5pemVyLnBvcyArPSAxO1xuICAgICAgICAgICAgcmV0dXJuIGNoYXJhY3RlcjtcbiAgICAgICAgfVxuICAgIH0oKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRQcmltYXJ5X2dldExpdGVyYWxfZ2V0U3RyaW5nTGl0ZXJhbF9nZXRRdW90ZWRTdHJpbmcgPSBmdW5jdGlvbiAobWFrZVJlZ2V4TWF0Y2hlciwgZ2V0RXNjYXBlZENoYXJzKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZ2V0VW5lc2NhcGVkRG91YmxlUXVvdGVkQ2hhcnMgPSBtYWtlUmVnZXhNYXRjaGVyKC9eW15cXFxcXCJdKy8pLCBnZXRVbmVzY2FwZWRTaW5nbGVRdW90ZWRDaGFycyA9IG1ha2VSZWdleE1hdGNoZXIoL15bXlxcXFwnXSsvKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGdldFF1b3RlZFN0cmluZyh0b2tlbml6ZXIsIHNpbmdsZVF1b3Rlcykge1xuICAgICAgICAgICAgdmFyIHN0YXJ0LCBzdHJpbmcsIGVzY2FwZWQsIHVuZXNjYXBlZCwgbmV4dCwgbWF0Y2hlcjtcbiAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgIHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgbWF0Y2hlciA9IHNpbmdsZVF1b3RlcyA/IGdldFVuZXNjYXBlZFNpbmdsZVF1b3RlZENoYXJzIDogZ2V0VW5lc2NhcGVkRG91YmxlUXVvdGVkQ2hhcnM7XG4gICAgICAgICAgICBlc2NhcGVkID0gZ2V0RXNjYXBlZENoYXJzKHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAoZXNjYXBlZCkge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBlc2NhcGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdW5lc2NhcGVkID0gbWF0Y2hlcih0b2tlbml6ZXIpO1xuICAgICAgICAgICAgaWYgKHVuZXNjYXBlZCkge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSB1bmVzY2FwZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXN0cmluZykge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHQgPSBnZXRRdW90ZWRTdHJpbmcodG9rZW5pemVyLCBzaW5nbGVRdW90ZXMpO1xuICAgICAgICAgICAgd2hpbGUgKG5leHQgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nICs9IG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgICAgICB9O1xuICAgIH0ocGFyc2VfVG9rZW5pemVyX3V0aWxzX21ha2VSZWdleE1hdGNoZXIsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9nZXRTdHJpbmdMaXRlcmFsX2dldEVzY2FwZWRDaGFycyk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldFN0cmluZ0xpdGVyYWxfX2dldFN0cmluZ0xpdGVyYWwgPSBmdW5jdGlvbiAodHlwZXMsIGdldFF1b3RlZFN0cmluZykge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCwgc3RyaW5nO1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgaWYgKHRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnXCInKSkge1xuICAgICAgICAgICAgICAgIHN0cmluZyA9IGdldFF1b3RlZFN0cmluZyh0b2tlbml6ZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnXCInKSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0OiB0eXBlcy5TVFJJTkdfTElURVJBTCxcbiAgICAgICAgICAgICAgICAgICAgdjogc3RyaW5nXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJ1xcJycpKSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nID0gZ2V0UXVvdGVkU3RyaW5nKHRva2VuaXplciwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJ1xcJycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHQ6IHR5cGVzLlNUUklOR19MSVRFUkFMLFxuICAgICAgICAgICAgICAgICAgICB2OiBzdHJpbmdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgfShjb25maWdfdHlwZXMsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9nZXRTdHJpbmdMaXRlcmFsX2dldFF1b3RlZFN0cmluZyk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldE51bWJlckxpdGVyYWwgPSBmdW5jdGlvbiAodHlwZXMsIG1ha2VSZWdleE1hdGNoZXIpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBnZXROdW1iZXIgPSBtYWtlUmVnZXhNYXRjaGVyKC9eKD86WystXT8pKD86KD86KD86MHxbMS05XVxcZCopP1xcLlxcZCspfCg/Oig/OjB8WzEtOV1cXGQqKVxcLil8KD86MHxbMS05XVxcZCopKSg/OltlRV1bKy1dP1xcZCspPy8pO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPSBnZXROdW1iZXIodG9rZW5pemVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHQ6IHR5cGVzLk5VTUJFUl9MSVRFUkFMLFxuICAgICAgICAgICAgICAgICAgICB2OiByZXN1bHRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgfShjb25maWdfdHlwZXMsIHBhcnNlX1Rva2VuaXplcl91dGlsc19tYWtlUmVnZXhNYXRjaGVyKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9zaGFyZWRfZ2V0TmFtZSA9IGZ1bmN0aW9uIChtYWtlUmVnZXhNYXRjaGVyKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbWFrZVJlZ2V4TWF0Y2hlcigvXlthLXpBLVpfJF1bYS16QS1aXyQwLTldKi8pO1xuICAgIH0ocGFyc2VfVG9rZW5pemVyX3V0aWxzX21ha2VSZWdleE1hdGNoZXIpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX3NoYXJlZF9nZXRLZXkgPSBmdW5jdGlvbiAoZ2V0U3RyaW5nTGl0ZXJhbCwgZ2V0TnVtYmVyTGl0ZXJhbCwgZ2V0TmFtZSkge1xuICAgICAgICBcbiAgICAgICAgdmFyIGlkZW50aWZpZXIgPSAvXlthLXpBLVpfJF1bYS16QS1aXyQwLTldKiQvO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIHRva2VuO1xuICAgICAgICAgICAgaWYgKHRva2VuID0gZ2V0U3RyaW5nTGl0ZXJhbCh0b2tlbml6ZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkZW50aWZpZXIudGVzdCh0b2tlbi52KSA/IHRva2VuLnYgOiAnXCInICsgdG9rZW4udi5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCInO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRva2VuID0gZ2V0TnVtYmVyTGl0ZXJhbCh0b2tlbml6ZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuLnY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW4gPSBnZXROYW1lKHRva2VuaXplcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfShwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRQcmltYXJ5X2dldExpdGVyYWxfZ2V0U3RyaW5nTGl0ZXJhbF9fZ2V0U3RyaW5nTGl0ZXJhbCwgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldE51bWJlckxpdGVyYWwsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX3NoYXJlZF9nZXROYW1lKTtcbnZhciB1dGlsc19wYXJzZUpTT04gPSBmdW5jdGlvbiAoZ2V0U3RyaW5nTWF0Y2gsIGFsbG93V2hpdGVzcGFjZSwgZ2V0U3RyaW5nTGl0ZXJhbCwgZ2V0S2V5KSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgVG9rZW5pemVyLCBzcGVjaWFscywgc3BlY2lhbHNQYXR0ZXJuLCBudW1iZXJQYXR0ZXJuLCBwbGFjZWhvbGRlclBhdHRlcm4sIHBsYWNlaG9sZGVyQXRTdGFydFBhdHRlcm47XG4gICAgICAgIHNwZWNpYWxzID0ge1xuICAgICAgICAgICAgJ3RydWUnOiB0cnVlLFxuICAgICAgICAgICAgJ2ZhbHNlJzogZmFsc2UsXG4gICAgICAgICAgICAndW5kZWZpbmVkJzogdW5kZWZpbmVkLFxuICAgICAgICAgICAgJ251bGwnOiBudWxsXG4gICAgICAgIH07XG4gICAgICAgIHNwZWNpYWxzUGF0dGVybiA9IG5ldyBSZWdFeHAoJ14oPzonICsgT2JqZWN0LmtleXMoc3BlY2lhbHMpLmpvaW4oJ3wnKSArICcpJyk7XG4gICAgICAgIG51bWJlclBhdHRlcm4gPSAvXig/OlsrLV0/KSg/Oig/Oig/OjB8WzEtOV1cXGQqKT9cXC5cXGQrKXwoPzooPzowfFsxLTldXFxkKilcXC4pfCg/OjB8WzEtOV1cXGQqKSkoPzpbZUVdWystXT9cXGQrKT8vO1xuICAgICAgICBwbGFjZWhvbGRlclBhdHRlcm4gPSAvXFwkXFx7KFteXFx9XSspXFx9L2c7XG4gICAgICAgIHBsYWNlaG9sZGVyQXRTdGFydFBhdHRlcm4gPSAvXlxcJFxceyhbXlxcfV0rKVxcfS87XG4gICAgICAgIFRva2VuaXplciA9IGZ1bmN0aW9uIChzdHIsIHZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5zdHIgPSBzdHI7XG4gICAgICAgICAgICB0aGlzLnZhbHVlcyA9IHZhbHVlcztcbiAgICAgICAgICAgIHRoaXMucG9zID0gMDtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gdGhpcy5nZXRUb2tlbigpO1xuICAgICAgICB9O1xuICAgICAgICBUb2tlbml6ZXIucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgcmVtYWluaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyLnN1YnN0cmluZyh0aGlzLnBvcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U3RyaW5nTWF0Y2g6IGdldFN0cmluZ01hdGNoLFxuICAgICAgICAgICAgZ2V0VG9rZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFBsYWNlaG9sZGVyKCkgfHwgdGhpcy5nZXRTcGVjaWFsKCkgfHwgdGhpcy5nZXROdW1iZXIoKSB8fCB0aGlzLmdldFN0cmluZygpIHx8IHRoaXMuZ2V0T2JqZWN0KCkgfHwgdGhpcy5nZXRBcnJheSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFBsYWNlaG9sZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy52YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgobWF0Y2ggPSBwbGFjZWhvbGRlckF0U3RhcnRQYXR0ZXJuLmV4ZWModGhpcy5yZW1haW5pbmcoKSkpICYmIHRoaXMudmFsdWVzLmhhc093blByb3BlcnR5KG1hdGNoWzFdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcyArPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHY6IHRoaXMudmFsdWVzW21hdGNoWzFdXSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTcGVjaWFsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9IHNwZWNpYWxzUGF0dGVybi5leGVjKHRoaXMucmVtYWluaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zICs9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdjogc3BlY2lhbHNbbWF0Y2hbMF1dIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldE51bWJlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaDtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPSBudW1iZXJQYXR0ZXJuLmV4ZWModGhpcy5yZW1haW5pbmcoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgKz0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2OiArbWF0Y2hbMF0gfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZ0xpdGVyYWwgPSBnZXRTdHJpbmdMaXRlcmFsKHRoaXMpLCB2YWx1ZXM7XG4gICAgICAgICAgICAgICAgaWYgKHN0cmluZ0xpdGVyYWwgJiYgKHZhbHVlcyA9IHRoaXMudmFsdWVzKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdjogc3RyaW5nTGl0ZXJhbC52LnJlcGxhY2UocGxhY2Vob2xkZXJQYXR0ZXJuLCBmdW5jdGlvbiAobWF0Y2gsICQxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlc1skMV0gfHwgJDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nTGl0ZXJhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRPYmplY3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0LCBwYWlyO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5nZXRTdHJpbmdNYXRjaCgneycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQgPSB7fTtcbiAgICAgICAgICAgICAgICB3aGlsZSAocGFpciA9IGdldEtleVZhbHVlUGFpcih0aGlzKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbcGFpci5rZXldID0gcGFpci52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0U3RyaW5nTWF0Y2goJ30nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdjogcmVzdWx0IH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmdldFN0cmluZ01hdGNoKCcsJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEFycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCwgdmFsdWVUb2tlbjtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ2V0U3RyaW5nTWF0Y2goJ1snKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgd2hpbGUgKHZhbHVlVG9rZW4gPSB0aGlzLmdldFRva2VuKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWVUb2tlbi52KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0U3RyaW5nTWF0Y2goJ10nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdjogcmVzdWx0IH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmdldFN0cmluZ01hdGNoKCcsJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFsbG93V2hpdGVzcGFjZTogYWxsb3dXaGl0ZXNwYWNlXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGdldEtleVZhbHVlUGFpcih0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciBrZXksIHZhbHVlVG9rZW4sIHBhaXI7XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBrZXkgPSBnZXRLZXkodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWlyID0geyBrZXk6IGtleSB9O1xuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJzonKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgdmFsdWVUb2tlbiA9IHRva2VuaXplci5nZXRUb2tlbigpO1xuICAgICAgICAgICAgaWYgKCF2YWx1ZVRva2VuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWlyLnZhbHVlID0gdmFsdWVUb2tlbi52O1xuICAgICAgICAgICAgcmV0dXJuIHBhaXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdHIsIHZhbHVlcykge1xuICAgICAgICAgICAgdmFyIHRva2VuaXplciA9IG5ldyBUb2tlbml6ZXIoc3RyLCB2YWx1ZXMpO1xuICAgICAgICAgICAgaWYgKHRva2VuaXplci5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdG9rZW5pemVyLnJlc3VsdC52LFxuICAgICAgICAgICAgICAgICAgICByZW1haW5pbmc6IHRva2VuaXplci5yZW1haW5pbmcoKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9KHBhcnNlX1Rva2VuaXplcl91dGlsc19nZXRTdHJpbmdNYXRjaCwgcGFyc2VfVG9rZW5pemVyX3V0aWxzX2FsbG93V2hpdGVzcGFjZSwgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldFN0cmluZ0xpdGVyYWxfX2dldFN0cmluZ0xpdGVyYWwsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX3NoYXJlZF9nZXRLZXkpO1xudmFyIHJlbmRlcl9TdHJpbmdGcmFnbWVudF9JbnRlcnBvbGF0b3IgPSBmdW5jdGlvbiAodHlwZXMsIHRlYXJkb3duLCBpbml0TXVzdGFjaGUsIHVwZGF0ZU11c3RhY2hlLCByZXNvbHZlTXVzdGFjaGUpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBTdHJpbmdJbnRlcnBvbGF0b3IgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZXMuSU5URVJQT0xBVE9SO1xuICAgICAgICAgICAgaW5pdE11c3RhY2hlKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgICAgICBTdHJpbmdJbnRlcnBvbGF0b3IucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdXBkYXRlOiB1cGRhdGVNdXN0YWNoZSxcbiAgICAgICAgICAgIHJlc29sdmU6IHJlc29sdmVNdXN0YWNoZSxcbiAgICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50RnJhZ21lbnQuYnViYmxlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0ZWFyZG93bih0aGlzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmdpZnkodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTdHJpbmdJbnRlcnBvbGF0b3I7XG4gICAgICAgIGZ1bmN0aW9uIHN0cmluZ2lmeSh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICB9XG4gICAgfShjb25maWdfdHlwZXMsIHNoYXJlZF90ZWFyZG93biwgcmVuZGVyX3NoYXJlZF9pbml0TXVzdGFjaGUsIHJlbmRlcl9zaGFyZWRfdXBkYXRlTXVzdGFjaGUsIHJlbmRlcl9zaGFyZWRfcmVzb2x2ZU11c3RhY2hlKTtcbnZhciByZW5kZXJfU3RyaW5nRnJhZ21lbnRfU2VjdGlvbiA9IGZ1bmN0aW9uICh0eXBlcywgaW5pdE11c3RhY2hlLCB1cGRhdGVNdXN0YWNoZSwgcmVzb2x2ZU11c3RhY2hlLCB1cGRhdGVTZWN0aW9uLCB0ZWFyZG93biwgY2lyY3VsYXIpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBTdHJpbmdTZWN0aW9uLCBTdHJpbmdGcmFnbWVudDtcbiAgICAgICAgY2lyY3VsYXIucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBTdHJpbmdGcmFnbWVudCA9IGNpcmN1bGFyLlN0cmluZ0ZyYWdtZW50O1xuICAgICAgICB9KTtcbiAgICAgICAgU3RyaW5nU2VjdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlcy5TRUNUSU9OO1xuICAgICAgICAgICAgdGhpcy5mcmFnbWVudHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGluaXRNdXN0YWNoZSh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgICAgU3RyaW5nU2VjdGlvbi5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICB1cGRhdGU6IHVwZGF0ZU11c3RhY2hlLFxuICAgICAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZU11c3RhY2hlLFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlYXJkb3duRnJhZ21lbnRzKCk7XG4gICAgICAgICAgICAgICAgdGVhcmRvd24odGhpcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd25GcmFnbWVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5mcmFnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRzLnNoaWZ0KCkudGVhcmRvd24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJ1YmJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmZyYWdtZW50cy5qb2luKCcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEZyYWdtZW50LmJ1YmJsZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZWQ7XG4gICAgICAgICAgICAgICAgaWYgKHdyYXBwZWQgPSB0aGlzLnJvb3QuX3dyYXBwZWRbdGhpcy5rZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBwZWQuZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVwZGF0ZVNlY3Rpb24odGhpcywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50RnJhZ21lbnQuYnViYmxlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JlYXRlRnJhZ21lbnQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTdHJpbmdGcmFnbWVudChvcHRpb25zKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYWdtZW50cy5qb2luKCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFN0cmluZ1NlY3Rpb247XG4gICAgfShjb25maWdfdHlwZXMsIHJlbmRlcl9zaGFyZWRfaW5pdE11c3RhY2hlLCByZW5kZXJfc2hhcmVkX3VwZGF0ZU11c3RhY2hlLCByZW5kZXJfc2hhcmVkX3Jlc29sdmVNdXN0YWNoZSwgcmVuZGVyX3NoYXJlZF91cGRhdGVTZWN0aW9uLCBzaGFyZWRfdGVhcmRvd24sIGNpcmN1bGFyKTtcbnZhciByZW5kZXJfU3RyaW5nRnJhZ21lbnRfVGV4dCA9IGZ1bmN0aW9uICh0eXBlcykge1xuICAgICAgICBcbiAgICAgICAgdmFyIFN0cmluZ1RleHQgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZXMuVEVYVDtcbiAgICAgICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIH07XG4gICAgICAgIFN0cmluZ1RleHQucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTdHJpbmdUZXh0O1xuICAgIH0oY29uZmlnX3R5cGVzKTtcbnZhciByZW5kZXJfU3RyaW5nRnJhZ21lbnRfcHJvdG90eXBlX3RvQXJnc0xpc3QgPSBmdW5jdGlvbiAod2FybiwgcGFyc2VKU09OKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlcywgY291bnRlciwganNvbmVzcXVlLCBndWlkLCBlcnJvck1lc3NhZ2UsIHBhcnNlZCwgcHJvY2Vzc0l0ZW1zO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFyZ3NMaXN0IHx8IHRoaXMuZGlydHkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMgPSB7fTtcbiAgICAgICAgICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgICAgICAgICBndWlkID0gdGhpcy5yb290Ll9ndWlkO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtcyA9IGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXJJZCwgd3JhcHBlZCwgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmZyYWdtZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmZyYWdtZW50cy5tYXAoZnVuY3Rpb24gKGZyYWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzSXRlbXMoZnJhZ21lbnQuaXRlbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJJZCA9IGd1aWQgKyAnLScgKyBjb3VudGVyKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod3JhcHBlZCA9IGl0ZW0ucm9vdC5fd3JhcHBlZFtpdGVtLmtleXBhdGhdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwcGVkLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGl0ZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbcGxhY2Vob2xkZXJJZF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJHsnICsgcGxhY2Vob2xkZXJJZCArICd9JztcbiAgICAgICAgICAgICAgICAgICAgfSkuam9pbignJyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBqc29uZXNxdWUgPSBwcm9jZXNzSXRlbXModGhpcy5pdGVtcyk7XG4gICAgICAgICAgICAgICAgcGFyc2VkID0gcGFyc2VKU09OKCdbJyArIGpzb25lc3F1ZSArICddJywgdmFsdWVzKTtcbiAgICAgICAgICAgICAgICBpZiAoIXBhcnNlZCkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSAnQ291bGQgbm90IHBhcnNlIGRpcmVjdGl2ZSBhcmd1bWVudHMgKCcgKyB0aGlzLnRvU3RyaW5nKCkgKyAnKS4gSWYgeW91IHRoaW5rIHRoaXMgaXMgYSBidWcsIHBsZWFzZSBmaWxlIGFuIGlzc3VlIGF0IGh0dHA6Ly9naXRodWIuY29tL1JhY3RpdmVKUy9SYWN0aXZlL2lzc3Vlcyc7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvb3QuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2FybihlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcmdzTGlzdCA9IFtqc29uZXNxdWVdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcmdzTGlzdCA9IHBhcnNlZC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJnc0xpc3Q7XG4gICAgICAgIH07XG4gICAgfSh1dGlsc193YXJuLCB1dGlsc19wYXJzZUpTT04pO1xudmFyIHJlbmRlcl9TdHJpbmdGcmFnbWVudF9fU3RyaW5nRnJhZ21lbnQgPSBmdW5jdGlvbiAodHlwZXMsIHBhcnNlSlNPTiwgaW5pdEZyYWdtZW50LCBJbnRlcnBvbGF0b3IsIFNlY3Rpb24sIFRleHQsIHRvQXJnc0xpc3QsIGNpcmN1bGFyKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgU3RyaW5nRnJhZ21lbnQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgaW5pdEZyYWdtZW50KHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgICAgICBTdHJpbmdGcmFnbWVudC5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBjcmVhdGVJdGVtOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5kZXNjcmlwdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFRleHQob3B0aW9ucy5kZXNjcmlwdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvcHRpb25zLmRlc2NyaXB0b3IudCkge1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSU5URVJQT0xBVE9SOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEludGVycG9sYXRvcihvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRSSVBMRTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnRlcnBvbGF0b3Iob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5TRUNUSU9OOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNlY3Rpb24ob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgJ1NvbWV0aGluZyB3ZW50IHdyb25nIGluIGEgcmF0aGVyIGludGVyZXN0aW5nIHdheSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJ1YmJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMub3duZXIuYnViYmxlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbnVtSXRlbXMsIGk7XG4gICAgICAgICAgICAgICAgbnVtSXRlbXMgPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtSXRlbXM7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zW2ldLnRlYXJkb3duKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMSAmJiB0aGlzLml0ZW1zWzBdLnR5cGUgPT09IHR5cGVzLklOVEVSUE9MQVRPUikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuaXRlbXNbMF0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1NpbXBsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpLCBpdGVtLCBjb250YWluc0ludGVycG9sYXRvcjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaW1wbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaW1wbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGkgPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSB0eXBlcy5URVhUKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSB0eXBlcy5JTlRFUlBPTEFUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250YWluc0ludGVycG9sYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbnNJbnRlcnBvbGF0b3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNpbXBsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaW1wbGUgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuam9pbignJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9KU09OOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpLCBwYXJzZWQ7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkID0gcGFyc2VKU09OKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZWQgPyBwYXJzZWQudmFsdWUgOiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvQXJnc0xpc3Q6IHRvQXJnc0xpc3RcbiAgICAgICAgfTtcbiAgICAgICAgY2lyY3VsYXIuU3RyaW5nRnJhZ21lbnQgPSBTdHJpbmdGcmFnbWVudDtcbiAgICAgICAgcmV0dXJuIFN0cmluZ0ZyYWdtZW50O1xuICAgIH0oY29uZmlnX3R5cGVzLCB1dGlsc19wYXJzZUpTT04sIHJlbmRlcl9zaGFyZWRfaW5pdEZyYWdtZW50LCByZW5kZXJfU3RyaW5nRnJhZ21lbnRfSW50ZXJwb2xhdG9yLCByZW5kZXJfU3RyaW5nRnJhZ21lbnRfU2VjdGlvbiwgcmVuZGVyX1N0cmluZ0ZyYWdtZW50X1RleHQsIHJlbmRlcl9TdHJpbmdGcmFnbWVudF9wcm90b3R5cGVfdG9BcmdzTGlzdCwgY2lyY3VsYXIpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9BdHRyaWJ1dGVfX0F0dHJpYnV0ZSA9IGZ1bmN0aW9uICh0eXBlcywgZGV0ZXJtaW5lTmFtZUFuZE5hbWVzcGFjZSwgc2V0U3RhdGljQXR0cmlidXRlLCBkZXRlcm1pbmVQcm9wZXJ0eU5hbWUsIGJpbmQsIHVwZGF0ZSwgU3RyaW5nRnJhZ21lbnQpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBEb21BdHRyaWJ1dGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZXMuQVRUUklCVVRFO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gb3B0aW9ucy5lbGVtZW50O1xuICAgICAgICAgICAgZGV0ZXJtaW5lTmFtZUFuZE5hbWVzcGFjZSh0aGlzLCBvcHRpb25zLm5hbWUpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMudmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIG9wdGlvbnMudmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgc2V0U3RhdGljQXR0cmlidXRlKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucm9vdCA9IG9wdGlvbnMucm9vdDtcbiAgICAgICAgICAgIHRoaXMucE5vZGUgPSBvcHRpb25zLnBOb2RlO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRGcmFnbWVudCA9IHRoaXMuZWxlbWVudC5wYXJlbnRGcmFnbWVudDtcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQgPSBuZXcgU3RyaW5nRnJhZ21lbnQoe1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0b3I6IG9wdGlvbnMudmFsdWUsXG4gICAgICAgICAgICAgICAgcm9vdDogdGhpcy5yb290LFxuICAgICAgICAgICAgICAgIG93bmVyOiB0aGlzLFxuICAgICAgICAgICAgICAgIGNvbnRleHRTdGFjazogb3B0aW9ucy5jb250ZXh0U3RhY2tcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBOb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubmFtZSA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNWYWx1ZUF0dHJpYnV0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucE5vZGUudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiB0aGlzLnBOb2RlLnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRmlsZUlucHV0VmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRldGVybWluZVByb3BlcnR5TmFtZSh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZlVwZGF0aW5nID0gdGhpcy5mcmFnbWVudC5pc1NpbXBsZSgpO1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIERvbUF0dHJpYnV0ZS5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBiaW5kOiBiaW5kLFxuICAgICAgICAgICAgdXBkYXRlOiB1cGRhdGUsXG4gICAgICAgICAgICB1cGRhdGVCaW5kaW5nczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5cGF0aCA9IHRoaXMuaW50ZXJwb2xhdG9yLmtleXBhdGggfHwgdGhpcy5pbnRlcnBvbGF0b3IucmVmO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BlcnR5TmFtZSA9PT0gJ25hbWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucE5vZGUubmFtZSA9ICd7eycgKyB0aGlzLmtleXBhdGggKyAnfX0nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJvdW5kRXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSB0aGlzLmJvdW5kRXZlbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuYm91bmRFdmVudHNbaV0sIHRoaXMudXBkYXRlTW9kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmFnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50LnRlYXJkb3duKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJ1YmJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGZVcGRhdGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuZGVmZXJyZWQgJiYgdGhpcy5yZWFkeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3QuX2RlZmVycmVkLmF0dHJzLnB1c2godGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmZXJyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzdHI7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZyYWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAnPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyID0gdGhpcy5mcmFnbWVudC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAnPScgKyBKU09OLnN0cmluZ2lmeShzdHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRG9tQXR0cmlidXRlO1xuICAgIH0oY29uZmlnX3R5cGVzLCByZW5kZXJfRG9tRnJhZ21lbnRfQXR0cmlidXRlX2hlbHBlcnNfZGV0ZXJtaW5lTmFtZUFuZE5hbWVzcGFjZSwgcmVuZGVyX0RvbUZyYWdtZW50X0F0dHJpYnV0ZV9oZWxwZXJzX3NldFN0YXRpY0F0dHJpYnV0ZSwgcmVuZGVyX0RvbUZyYWdtZW50X0F0dHJpYnV0ZV9oZWxwZXJzX2RldGVybWluZVByb3BlcnR5TmFtZSwgcmVuZGVyX0RvbUZyYWdtZW50X0F0dHJpYnV0ZV9wcm90b3R5cGVfYmluZCwgcmVuZGVyX0RvbUZyYWdtZW50X0F0dHJpYnV0ZV9wcm90b3R5cGVfdXBkYXRlLCByZW5kZXJfU3RyaW5nRnJhZ21lbnRfX1N0cmluZ0ZyYWdtZW50KTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9pbml0aWFsaXNlX2NyZWF0ZUVsZW1lbnRBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKERvbUF0dHJpYnV0ZSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICB2YXIgYXR0ck5hbWUsIGF0dHJWYWx1ZSwgYXR0cjtcbiAgICAgICAgICAgIGVsZW1lbnQuYXR0cmlidXRlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChhdHRyTmFtZSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJWYWx1ZSA9IGF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuICAgICAgICAgICAgICAgICAgICBhdHRyID0gbmV3IERvbUF0dHJpYnV0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYXR0ck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYXR0clZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9vdDogZWxlbWVudC5yb290LFxuICAgICAgICAgICAgICAgICAgICAgICAgcE5vZGU6IGVsZW1lbnQubm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRTdGFjazogZWxlbWVudC5wYXJlbnRGcmFnbWVudC5jb250ZXh0U3RhY2tcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXR0cmlidXRlc1tlbGVtZW50LmF0dHJpYnV0ZXMubGVuZ3RoXSA9IGVsZW1lbnQuYXR0cmlidXRlc1thdHRyTmFtZV0gPSBhdHRyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ck5hbWUgIT09ICduYW1lJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ci51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmF0dHJpYnV0ZXM7XG4gICAgICAgIH07XG4gICAgfShyZW5kZXJfRG9tRnJhZ21lbnRfQXR0cmlidXRlX19BdHRyaWJ1dGUpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X2luaXRpYWxpc2VfYXBwZW5kRWxlbWVudENoaWxkcmVuID0gZnVuY3Rpb24gKHdhcm4sIG5hbWVzcGFjZXMsIFN0cmluZ0ZyYWdtZW50LCBjaXJjdWxhcikge1xuICAgICAgICBcbiAgICAgICAgdmFyIERvbUZyYWdtZW50LCB1cGRhdGVDc3MsIHVwZGF0ZVNjcmlwdDtcbiAgICAgICAgY2lyY3VsYXIucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBEb21GcmFnbWVudCA9IGNpcmN1bGFyLkRvbUZyYWdtZW50O1xuICAgICAgICB9KTtcbiAgICAgICAgdXBkYXRlQ3NzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGUsIGNvbnRlbnQgPSB0aGlzLmZyYWdtZW50LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAobm9kZS5zdHlsZVNoZWV0KSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgICAgICB9O1xuICAgICAgICB1cGRhdGVTY3JpcHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMubm9kZS50eXBlIHx8IHRoaXMubm9kZS50eXBlID09PSAndGV4dC9qYXZhc2NyaXB0Jykge1xuICAgICAgICAgICAgICAgIHdhcm4oJ1NjcmlwdCB0YWcgd2FzIHVwZGF0ZWQuIFRoaXMgZG9lcyBub3QgY2F1c2UgdGhlIGNvZGUgdG8gYmUgcmUtZXZhbHVhdGVkIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ub2RlLmlubmVySFRNTCA9IHRoaXMuZnJhZ21lbnQudG9TdHJpbmcoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50LCBub2RlLCBkZXNjcmlwdG9yLCBkb2NGcmFnKSB7XG4gICAgICAgICAgICB2YXIgbGl2ZVF1ZXJpZXMsIGksIHNlbGVjdG9yLCBxdWVyeUFsbFJlc3VsdCwgajtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmxjTmFtZSA9PT0gJ3NjcmlwdCcgfHwgZWxlbWVudC5sY05hbWUgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmZyYWdtZW50ID0gbmV3IFN0cmluZ0ZyYWdtZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRvcjogZGVzY3JpcHRvci5mLFxuICAgICAgICAgICAgICAgICAgICByb290OiBlbGVtZW50LnJvb3QsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRTdGFjazogZWxlbWVudC5wYXJlbnRGcmFnbWVudC5jb250ZXh0U3RhY2ssXG4gICAgICAgICAgICAgICAgICAgIG93bmVyOiBlbGVtZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGRvY0ZyYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQubGNOYW1lID09PSAnc2NyaXB0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5idWJibGUgPSB1cGRhdGVTY3JpcHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5vZGUuaW5uZXJIVE1MID0gZWxlbWVudC5mcmFnbWVudC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5idWJibGUgPSB1cGRhdGVDc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmJ1YmJsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGVzY3JpcHRvci5mID09PSAnc3RyaW5nJyAmJiAoIW5vZGUgfHwgKCFub2RlLm5hbWVzcGFjZVVSSSB8fCBub2RlLm5hbWVzcGFjZVVSSSA9PT0gbmFtZXNwYWNlcy5odG1sKSkpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwgPSBkZXNjcmlwdG9yLmY7XG4gICAgICAgICAgICAgICAgaWYgKGRvY0ZyYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBlbGVtZW50Lmh0bWw7XG4gICAgICAgICAgICAgICAgICAgIGxpdmVRdWVyaWVzID0gZWxlbWVudC5yb290Ll9saXZlUXVlcmllcztcbiAgICAgICAgICAgICAgICAgICAgaSA9IGxpdmVRdWVyaWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IgPSBsaXZlUXVlcmllc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocXVlcnlBbGxSZXN1bHQgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKSAmJiAoaiA9IHF1ZXJ5QWxsUmVzdWx0Lmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZWxlbWVudC5saXZlUXVlcmllcyB8fCAoZWxlbWVudC5saXZlUXVlcmllcyA9IFtdKSkucHVzaChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5saXZlUXVlcmllc1tzZWxlY3Rvcl0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubGl2ZVF1ZXJpZXNbc2VsZWN0b3JdW2pdID0gcXVlcnlBbGxSZXN1bHRbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmZyYWdtZW50ID0gbmV3IERvbUZyYWdtZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRvcjogZGVzY3JpcHRvci5mLFxuICAgICAgICAgICAgICAgICAgICByb290OiBlbGVtZW50LnJvb3QsXG4gICAgICAgICAgICAgICAgICAgIHBOb2RlOiBub2RlLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0U3RhY2s6IGVsZW1lbnQucGFyZW50RnJhZ21lbnQuY29udGV4dFN0YWNrLFxuICAgICAgICAgICAgICAgICAgICBvd25lcjogZWxlbWVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChkb2NGcmFnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoZWxlbWVudC5mcmFnbWVudC5kb2NGcmFnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSh1dGlsc193YXJuLCBjb25maWdfbmFtZXNwYWNlcywgcmVuZGVyX1N0cmluZ0ZyYWdtZW50X19TdHJpbmdGcmFnbWVudCwgY2lyY3VsYXIpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X2luaXRpYWxpc2VfZGVjb3JhdGVfRGVjb3JhdG9yID0gZnVuY3Rpb24gKHdhcm4sIFN0cmluZ0ZyYWdtZW50KSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgRGVjb3JhdG9yID0gZnVuY3Rpb24gKGRlc2NyaXB0b3IsIHJvb3QsIG93bmVyLCBjb250ZXh0U3RhY2spIHtcbiAgICAgICAgICAgIHZhciBuYW1lLCBmcmFnbWVudCwgZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IG93bmVyLm5vZGU7XG4gICAgICAgICAgICBuYW1lID0gZGVzY3JpcHRvci5uIHx8IGRlc2NyaXB0b3I7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSBuZXcgU3RyaW5nRnJhZ21lbnQoe1xuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdG9yOiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICByb290OiB0aGlzLnJvb3QsXG4gICAgICAgICAgICAgICAgICAgIG93bmVyOiBvd25lcixcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dFN0YWNrOiBjb250ZXh0U3RhY2tcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuYW1lID0gZnJhZ21lbnQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC50ZWFyZG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IuYSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zID0gZGVzY3JpcHRvci5hO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkZXNjcmlwdG9yLmQpIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudCA9IG5ldyBTdHJpbmdGcmFnbWVudCh7XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0b3I6IGRlc2NyaXB0b3IuZCxcbiAgICAgICAgICAgICAgICAgICAgcm9vdDogdGhpcy5yb290LFxuICAgICAgICAgICAgICAgICAgICBvd25lcjogb3duZXIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRTdGFjazogY29udGV4dFN0YWNrXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMgPSBmcmFnbWVudC50b0FyZ3NMaXN0KCk7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQudGVhcmRvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZm4gPSByb290LmRlY29yYXRvcnNbbmFtZV07XG4gICAgICAgICAgICBpZiAoIXRoaXMuZm4pIHtcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSAnTWlzc2luZyBcIicgKyBuYW1lICsgJ1wiIGRlY29yYXRvci4gWW91IG1heSBuZWVkIHRvIGRvd25sb2FkIGEgcGx1Z2luIHZpYSBodHRwczovL2dpdGh1Yi5jb20vUmFjdGl2ZUpTL1JhY3RpdmUvd2lraS9QbHVnaW5zI2RlY29yYXRvcnMnO1xuICAgICAgICAgICAgICAgIGlmIChyb290LmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdhcm4oZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIERlY29yYXRvci5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCwgYXJncztcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IFt0aGlzLm5vZGVdLmNvbmNhdCh0aGlzLnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZm4uYXBwbHkodGhpcy5yb290LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmZuLmNhbGwodGhpcy5yb290LCB0aGlzLm5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCB8fCAhcmVzdWx0LnRlYXJkb3duKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGVjb3JhdG9yIGRlZmluaXRpb24gbXVzdCByZXR1cm4gYW4gb2JqZWN0IHdpdGggYSB0ZWFyZG93biBtZXRob2QnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50ZWFyZG93biA9IHJlc3VsdC50ZWFyZG93bjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIERlY29yYXRvcjtcbiAgICB9KHV0aWxzX3dhcm4sIHJlbmRlcl9TdHJpbmdGcmFnbWVudF9fU3RyaW5nRnJhZ21lbnQpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X2luaXRpYWxpc2VfZGVjb3JhdGVfX2RlY29yYXRlID0gZnVuY3Rpb24gKERlY29yYXRvcikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkZXNjcmlwdG9yLCByb290LCBvd25lciwgY29udGV4dFN0YWNrKSB7XG4gICAgICAgICAgICBvd25lci5kZWNvcmF0b3IgPSBuZXcgRGVjb3JhdG9yKGRlc2NyaXB0b3IsIHJvb3QsIG93bmVyLCBjb250ZXh0U3RhY2spO1xuICAgICAgICAgICAgaWYgKG93bmVyLmRlY29yYXRvci5mbikge1xuICAgICAgICAgICAgICAgIHJvb3QuX2RlZmVycmVkLmRlY29yYXRvcnMucHVzaChvd25lci5kZWNvcmF0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0ocmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfaW5pdGlhbGlzZV9kZWNvcmF0ZV9EZWNvcmF0b3IpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X2luaXRpYWxpc2VfYWRkRXZlbnRQcm94aWVzX2FkZEV2ZW50UHJveHkgPSBmdW5jdGlvbiAod2FybiwgU3RyaW5nRnJhZ21lbnQpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBhZGRFdmVudFByb3h5LCBNYXN0ZXJFdmVudEhhbmRsZXIsIFByb3h5RXZlbnQsIGZpcmVQbGFpbkV2ZW50LCBmaXJlRXZlbnRXaXRoQXJncywgZmlyZUV2ZW50V2l0aER5bmFtaWNBcmdzLCBjdXN0b21IYW5kbGVycywgZ2VuZXJpY0hhbmRsZXIsIGdldEN1c3RvbUhhbmRsZXI7XG4gICAgICAgIGFkZEV2ZW50UHJveHkgPSBmdW5jdGlvbiAoZWxlbWVudCwgdHJpZ2dlckV2ZW50TmFtZSwgcHJveHlEZXNjcmlwdG9yLCBjb250ZXh0U3RhY2ssIGluZGV4UmVmcykge1xuICAgICAgICAgICAgdmFyIGV2ZW50cywgbWFzdGVyO1xuICAgICAgICAgICAgZXZlbnRzID0gZWxlbWVudC5ub2RlLl9yYWN0aXZlLmV2ZW50cztcbiAgICAgICAgICAgIG1hc3RlciA9IGV2ZW50c1t0cmlnZ2VyRXZlbnROYW1lXSB8fCAoZXZlbnRzW3RyaWdnZXJFdmVudE5hbWVdID0gbmV3IE1hc3RlckV2ZW50SGFuZGxlcihlbGVtZW50LCB0cmlnZ2VyRXZlbnROYW1lLCBjb250ZXh0U3RhY2ssIGluZGV4UmVmcykpO1xuICAgICAgICAgICAgbWFzdGVyLmFkZChwcm94eURlc2NyaXB0b3IpO1xuICAgICAgICB9O1xuICAgICAgICBNYXN0ZXJFdmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoZWxlbWVudCwgZXZlbnROYW1lLCBjb250ZXh0U3RhY2spIHtcbiAgICAgICAgICAgIHZhciBkZWZpbml0aW9uO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IGVsZW1lbnQucm9vdDtcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IGVsZW1lbnQubm9kZTtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGV2ZW50TmFtZTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dFN0YWNrID0gY29udGV4dFN0YWNrO1xuICAgICAgICAgICAgdGhpcy5wcm94aWVzID0gW107XG4gICAgICAgICAgICBpZiAoZGVmaW5pdGlvbiA9IHRoaXMucm9vdC5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tID0gZGVmaW5pdGlvbih0aGlzLm5vZGUsIGdldEN1c3RvbUhhbmRsZXIoZXZlbnROYW1lKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghKCdvbicgKyBldmVudE5hbWUgaW4gdGhpcy5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICB3YXJuKCdNaXNzaW5nIFwiJyArIHRoaXMubmFtZSArICdcIiBldmVudC4gWW91IG1heSBuZWVkIHRvIGRvd25sb2FkIGEgcGx1Z2luIHZpYSBodHRwczovL2dpdGh1Yi5jb20vUmFjdGl2ZUpTL1JhY3RpdmUvd2lraS9QbHVnaW5zI2V2ZW50cycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGdlbmVyaWNIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIE1hc3RlckV2ZW50SGFuZGxlci5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uIChwcm94eSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJveGllc1t0aGlzLnByb3hpZXMubGVuZ3RoXSA9IG5ldyBQcm94eUV2ZW50KHRoaXMuZWxlbWVudCwgdGhpcy5yb290LCBwcm94eSwgdGhpcy5jb250ZXh0U3RhY2spO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tLnRlYXJkb3duKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5uYW1lLCBnZW5lcmljSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpID0gdGhpcy5wcm94aWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJveGllc1tpXS50ZWFyZG93bigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaXJlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IHRoaXMucHJveGllcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3hpZXNbaV0uZmlyZShldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBQcm94eUV2ZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIHJhY3RpdmUsIGRlc2NyaXB0b3IsIGNvbnRleHRTdGFjaykge1xuICAgICAgICAgICAgdmFyIG5hbWU7XG4gICAgICAgICAgICB0aGlzLnJvb3QgPSByYWN0aXZlO1xuICAgICAgICAgICAgbmFtZSA9IGRlc2NyaXB0b3IubiB8fCBkZXNjcmlwdG9yO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMubiA9IG5hbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubiA9IG5ldyBTdHJpbmdGcmFnbWVudCh7XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0b3I6IGRlc2NyaXB0b3IubixcbiAgICAgICAgICAgICAgICAgICAgcm9vdDogdGhpcy5yb290LFxuICAgICAgICAgICAgICAgICAgICBvd25lcjogZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dFN0YWNrOiBjb250ZXh0U3RhY2tcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yLmEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmEgPSBkZXNjcmlwdG9yLmE7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlID0gZmlyZUV2ZW50V2l0aEFyZ3M7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IuZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZCA9IG5ldyBTdHJpbmdGcmFnbWVudCh7XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0b3I6IGRlc2NyaXB0b3IuZCxcbiAgICAgICAgICAgICAgICAgICAgcm9vdDogdGhpcy5yb290LFxuICAgICAgICAgICAgICAgICAgICBvd25lcjogZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dFN0YWNrOiBjb250ZXh0U3RhY2tcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUgPSBmaXJlRXZlbnRXaXRoRHluYW1pY0FyZ3M7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5maXJlID0gZmlyZVBsYWluRXZlbnQ7XG4gICAgICAgIH07XG4gICAgICAgIFByb3h5RXZlbnQucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uLnRlYXJkb3duKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubi50ZWFyZG93bigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZC50ZWFyZG93bigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBidWJibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZmlyZVBsYWluRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMucm9vdC5maXJlKHRoaXMubi50b1N0cmluZygpLCBldmVudCk7XG4gICAgICAgIH07XG4gICAgICAgIGZpcmVFdmVudFdpdGhBcmdzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnJvb3QuZmlyZS5hcHBseSh0aGlzLnJvb3QsIFtcbiAgICAgICAgICAgICAgICB0aGlzLm4udG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgXS5jb25jYXQodGhpcy5hKSk7XG4gICAgICAgIH07XG4gICAgICAgIGZpcmVFdmVudFdpdGhEeW5hbWljQXJncyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSB0aGlzLmQudG9BcmdzTGlzdCgpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmdzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmdzLnN1YnN0cigxLCBhcmdzLmxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yb290LmZpcmUuYXBwbHkodGhpcy5yb290LCBbXG4gICAgICAgICAgICAgICAgdGhpcy5uLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgIF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgfTtcbiAgICAgICAgZ2VuZXJpY0hhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBzdG9yYWdlID0gdGhpcy5fcmFjdGl2ZTtcbiAgICAgICAgICAgIHN0b3JhZ2UuZXZlbnRzW2V2ZW50LnR5cGVdLmZpcmUoe1xuICAgICAgICAgICAgICAgIG5vZGU6IHRoaXMsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWw6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGluZGV4OiBzdG9yYWdlLmluZGV4LFxuICAgICAgICAgICAgICAgIGtleXBhdGg6IHN0b3JhZ2Uua2V5cGF0aCxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiBzdG9yYWdlLnJvb3QuZ2V0KHN0b3JhZ2Uua2V5cGF0aClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBjdXN0b21IYW5kbGVycyA9IHt9O1xuICAgICAgICBnZXRDdXN0b21IYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgaWYgKGN1c3RvbUhhbmRsZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VzdG9tSGFuZGxlcnNbZXZlbnROYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjdXN0b21IYW5kbGVyc1tldmVudE5hbWVdID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0b3JhZ2UgPSBldmVudC5ub2RlLl9yYWN0aXZlO1xuICAgICAgICAgICAgICAgIGV2ZW50LmluZGV4ID0gc3RvcmFnZS5pbmRleDtcbiAgICAgICAgICAgICAgICBldmVudC5rZXlwYXRoID0gc3RvcmFnZS5rZXlwYXRoO1xuICAgICAgICAgICAgICAgIGV2ZW50LmNvbnRleHQgPSBzdG9yYWdlLnJvb3QuZ2V0KHN0b3JhZ2Uua2V5cGF0aCk7XG4gICAgICAgICAgICAgICAgc3RvcmFnZS5ldmVudHNbZXZlbnROYW1lXS5maXJlKGV2ZW50KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhZGRFdmVudFByb3h5O1xuICAgIH0odXRpbHNfd2FybiwgcmVuZGVyX1N0cmluZ0ZyYWdtZW50X19TdHJpbmdGcmFnbWVudCk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfaW5pdGlhbGlzZV9hZGRFdmVudFByb3hpZXNfX2FkZEV2ZW50UHJveGllcyA9IGZ1bmN0aW9uIChhZGRFdmVudFByb3h5KSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW1lbnQsIHByb3hpZXMpIHtcbiAgICAgICAgICAgIHZhciBpLCBldmVudE5hbWUsIGV2ZW50TmFtZXM7XG4gICAgICAgICAgICBmb3IgKGV2ZW50TmFtZSBpbiBwcm94aWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3hpZXMuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWVzID0gZXZlbnROYW1lLnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgICAgIGkgPSBldmVudE5hbWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkRXZlbnRQcm94eShlbGVtZW50LCBldmVudE5hbWVzW2ldLCBwcm94aWVzW2V2ZW50TmFtZV0sIGVsZW1lbnQucGFyZW50RnJhZ21lbnQuY29udGV4dFN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X2luaXRpYWxpc2VfYWRkRXZlbnRQcm94aWVzX2FkZEV2ZW50UHJveHkpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X2luaXRpYWxpc2VfdXBkYXRlTGl2ZVF1ZXJpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciByYWN0aXZlLCBsaXZlUXVlcmllcywgaSwgc2VsZWN0b3IsIHF1ZXJ5O1xuICAgICAgICAgICAgcmFjdGl2ZSA9IGVsZW1lbnQucm9vdDtcbiAgICAgICAgICAgIGxpdmVRdWVyaWVzID0gcmFjdGl2ZS5fbGl2ZVF1ZXJpZXM7XG4gICAgICAgICAgICBpID0gbGl2ZVF1ZXJpZXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gbGl2ZVF1ZXJpZXNbaV07XG4gICAgICAgICAgICAgICAgcXVlcnkgPSBsaXZlUXVlcmllc1tzZWxlY3Rvcl07XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXJ5Ll90ZXN0KGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIChlbGVtZW50LmxpdmVRdWVyaWVzIHx8IChlbGVtZW50LmxpdmVRdWVyaWVzID0gW10pKS5wdXNoKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5saXZlUXVlcmllc1tzZWxlY3Rvcl0gPSBbZWxlbWVudC5ub2RlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHV0aWxzX2NhbWVsQ2FzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoaHlwaGVuYXRlZFN0cikge1xuICAgICAgICAgICAgcmV0dXJuIGh5cGhlbmF0ZWRTdHIucmVwbGFjZSgvLShbYS16QS1aXSkvZywgZnVuY3Rpb24gKG1hdGNoLCAkMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkMS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHV0aWxzX2ZpbGxHYXBzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhdGFyZ2V0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9zaGFyZWRfZXhlY3V0ZVRyYW5zaXRpb25fVHJhbnNpdGlvbiA9IGZ1bmN0aW9uIChpc0NsaWVudCwgY3JlYXRlRWxlbWVudCwgd2FybiwgaXNOdW1lcmljLCBpc0FycmF5LCBjYW1lbENhc2UsIGZpbGxHYXBzLCBTdHJpbmdGcmFnbWVudCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIFRyYW5zaXRpb24sIHRlc3RTdHlsZSwgdmVuZG9ycywgdmVuZG9yUGF0dGVybiwgdW5wcmVmaXhQYXR0ZXJuLCBwcmVmaXhDYWNoZSwgQ1NTX1RSQU5TSVRJT05TX0VOQUJMRUQsIFRSQU5TSVRJT04sIFRSQU5TSVRJT05fRFVSQVRJT04sIFRSQU5TSVRJT05fUFJPUEVSVFksIFRSQU5TSVRJT05fVElNSU5HX0ZVTkNUSU9OLCBUUkFOU0lUSU9ORU5EO1xuICAgICAgICBpZiAoIWlzQ2xpZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGVzdFN0eWxlID0gY3JlYXRlRWxlbWVudCgnZGl2Jykuc3R5bGU7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGVzdFN0eWxlLnRyYW5zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIFRSQU5TSVRJT04gPSAndHJhbnNpdGlvbic7XG4gICAgICAgICAgICAgICAgVFJBTlNJVElPTkVORCA9ICd0cmFuc2l0aW9uZW5kJztcbiAgICAgICAgICAgICAgICBDU1NfVFJBTlNJVElPTlNfRU5BQkxFRCA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRlc3RTdHlsZS53ZWJraXRUcmFuc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBUUkFOU0lUSU9OID0gJ3dlYmtpdFRyYW5zaXRpb24nO1xuICAgICAgICAgICAgICAgIFRSQU5TSVRJT05FTkQgPSAnd2Via2l0VHJhbnNpdGlvbkVuZCc7XG4gICAgICAgICAgICAgICAgQ1NTX1RSQU5TSVRJT05TX0VOQUJMRUQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBDU1NfVFJBTlNJVElPTlNfRU5BQkxFRCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KCkpO1xuICAgICAgICBpZiAoVFJBTlNJVElPTikge1xuICAgICAgICAgICAgVFJBTlNJVElPTl9EVVJBVElPTiA9IFRSQU5TSVRJT04gKyAnRHVyYXRpb24nO1xuICAgICAgICAgICAgVFJBTlNJVElPTl9QUk9QRVJUWSA9IFRSQU5TSVRJT04gKyAnUHJvcGVydHknO1xuICAgICAgICAgICAgVFJBTlNJVElPTl9USU1JTkdfRlVOQ1RJT04gPSBUUkFOU0lUSU9OICsgJ1RpbWluZ0Z1bmN0aW9uJztcbiAgICAgICAgfVxuICAgICAgICBUcmFuc2l0aW9uID0gZnVuY3Rpb24gKGRlc2NyaXB0b3IsIHJvb3QsIG93bmVyLCBjb250ZXh0U3RhY2ssIGlzSW50cm8pIHtcbiAgICAgICAgICAgIHZhciB0ID0gdGhpcywgbmFtZSwgZnJhZ21lbnQsIGVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgICAgICAgICB0aGlzLm5vZGUgPSBvd25lci5ub2RlO1xuICAgICAgICAgICAgdGhpcy5pc0ludHJvID0gaXNJbnRybztcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxTdHlsZSA9IHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlID0gZnVuY3Rpb24gKG5vUmVzZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5vUmVzZXQgJiYgdC5pc0ludHJvKSB7XG4gICAgICAgICAgICAgICAgICAgIHQucmVzZXRTdHlsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0Ll9tYW5hZ2VyLnBvcCh0Lm5vZGUpO1xuICAgICAgICAgICAgICAgIHQubm9kZS5fcmFjdGl2ZS50cmFuc2l0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBuYW1lID0gZGVzY3JpcHRvci5uIHx8IGRlc2NyaXB0b3I7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSBuZXcgU3RyaW5nRnJhZ21lbnQoe1xuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdG9yOiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICByb290OiB0aGlzLnJvb3QsXG4gICAgICAgICAgICAgICAgICAgIG93bmVyOiBvd25lcixcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dFN0YWNrOiBjb250ZXh0U3RhY2tcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuYW1lID0gZnJhZ21lbnQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC50ZWFyZG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yLmEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcyA9IGRlc2NyaXB0b3IuYTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVzY3JpcHRvci5kKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSBuZXcgU3RyaW5nRnJhZ21lbnQoe1xuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdG9yOiBkZXNjcmlwdG9yLmQsXG4gICAgICAgICAgICAgICAgICAgIHJvb3Q6IHRoaXMucm9vdCxcbiAgICAgICAgICAgICAgICAgICAgb3duZXI6IG93bmVyLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0U3RhY2s6IGNvbnRleHRTdGFja1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zID0gZnJhZ21lbnQudG9BcmdzTGlzdCgpO1xuICAgICAgICAgICAgICAgIGZyYWdtZW50LnRlYXJkb3duKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9mbiA9IHJvb3QudHJhbnNpdGlvbnNbbmFtZV07XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2ZuKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gJ01pc3NpbmcgXCInICsgbmFtZSArICdcIiB0cmFuc2l0aW9uLiBZb3UgbWF5IG5lZWQgdG8gZG93bmxvYWQgYSBwbHVnaW4gdmlhIGh0dHBzOi8vZ2l0aHViLmNvbS9SYWN0aXZlSlMvUmFjdGl2ZS93aWtpL1BsdWdpbnMjdHJhbnNpdGlvbnMnO1xuICAgICAgICAgICAgICAgIGlmIChyb290LmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdhcm4oZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBUcmFuc2l0aW9uLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faW5pdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGluaXRpYWxpemUgYSB0cmFuc2l0aW9uIG1vcmUgdGhhbiBvbmNlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2luaXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fZm4uYXBwbHkodGhpcy5yb290LCBbdGhpc10uY29uY2F0KHRoaXMucGFyYW1zKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U3R5bGU6IGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgICAgICAgICAgIHZhciBjb21wdXRlZFN0eWxlLCBzdHlsZXMsIGksIHByb3AsIHZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLm5vZGUpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY29tcHV0ZWRTdHlsZVtwcmVmaXgocHJvcHMpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnMHB4Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpc0FycmF5KHByb3BzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyYW5zaXRpb24jZ2V0U3R5bGUgbXVzdCBiZSBwYXNzZWQgYSBzdHJpbmcsIG9yIGFuIGFycmF5IG9mIHN0cmluZ3MgcmVwcmVzZW50aW5nIENTUyBwcm9wZXJ0aWVzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0eWxlcyA9IHt9O1xuICAgICAgICAgICAgICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9wID0gcHJvcHNbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY29tcHV0ZWRTdHlsZVtwcmVmaXgocHJvcCldO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09ICcwcHgnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0U3R5bGU6IGZ1bmN0aW9uIChzdHlsZSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0eWxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3R5bGVbcHJlZml4KHN0eWxlKV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHByb3AgaW4gc3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdHlsZVtwcmVmaXgocHJvcCldID0gc3R5bGVbcHJvcF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0ZVN0eWxlOiBmdW5jdGlvbiAoc3R5bGUsIHZhbHVlLCBvcHRpb25zLCBjb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcywgcHJvcGVydHlOYW1lcywgY2hhbmdlZFByb3BlcnRpZXMsIGNvbXB1dGVkU3R5bGUsIGN1cnJlbnQsIHRvLCBmcm9tLCB0cmFuc2l0aW9uRW5kSGFuZGxlciwgaSwgcHJvcDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0eWxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB0byA9IHt9O1xuICAgICAgICAgICAgICAgICAgICB0b1tzdHlsZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0byA9IHN0eWxlO1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZSA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHdhcm4oJ1RoZSBcIicgKyB0Lm5hbWUgKyAnXCIgdHJhbnNpdGlvbiBkb2VzIG5vdCBzdXBwbHkgYW4gb3B0aW9ucyBvYmplY3QgdG8gYHQuYW5pbWF0ZVN0eWxlKClgLiBUaGlzIHdpbGwgYnJlYWsgaW4gYSBmdXR1cmUgdmVyc2lvbiBvZiBSYWN0aXZlLiBGb3IgbW9yZSBpbmZvIHNlZSBodHRwczovL2dpdGh1Yi5jb20vUmFjdGl2ZUpTL1JhY3RpdmUvaXNzdWVzLzM0MCcpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gdDtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGUgPSB0LmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdC5zZXRTdHlsZSh0byk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmtleXModG8pO1xuICAgICAgICAgICAgICAgIGNoYW5nZWRQcm9wZXJ0aWVzID0gW107XG4gICAgICAgICAgICAgICAgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHQubm9kZSk7XG4gICAgICAgICAgICAgICAgZnJvbSA9IHt9O1xuICAgICAgICAgICAgICAgIGkgPSBwcm9wZXJ0eU5hbWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3AgPSBwcm9wZXJ0eU5hbWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY29tcHV0ZWRTdHlsZVtwcmVmaXgocHJvcCldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA9PT0gJzBweCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ICE9IHRvW3Byb3BdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkUHJvcGVydGllc1tjaGFuZ2VkUHJvcGVydGllcy5sZW5ndGhdID0gcHJvcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQubm9kZS5zdHlsZVtwcmVmaXgocHJvcCldID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWNoYW5nZWRQcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5ub2RlLnN0eWxlW1RSQU5TSVRJT05fUFJPUEVSVFldID0gcHJvcGVydHlOYW1lcy5tYXAocHJlZml4KS5tYXAoaHlwaGVuYXRlKS5qb2luKCcsJyk7XG4gICAgICAgICAgICAgICAgICAgIHQubm9kZS5zdHlsZVtUUkFOU0lUSU9OX1RJTUlOR19GVU5DVElPTl0gPSBoeXBoZW5hdGUob3B0aW9ucy5lYXNpbmcgfHwgJ2xpbmVhcicpO1xuICAgICAgICAgICAgICAgICAgICB0Lm5vZGUuc3R5bGVbVFJBTlNJVElPTl9EVVJBVElPTl0gPSBvcHRpb25zLmR1cmF0aW9uIC8gMTAwMCArICdzJztcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbkVuZEhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gY2hhbmdlZFByb3BlcnRpZXMuaW5kZXhPZihjYW1lbENhc2UodW5wcmVmaXgoZXZlbnQucHJvcGVydHlOYW1lKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZWRQcm9wZXJ0aWVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZFByb3BlcnRpZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdC5yb290LmZpcmUodC5uYW1lICsgJzplbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFRSQU5TSVRJT05FTkQsIHRyYW5zaXRpb25FbmRIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0Lm5vZGUuYWRkRXZlbnRMaXN0ZW5lcihUUkFOU0lUSU9ORU5ELCB0cmFuc2l0aW9uRW5kSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gY2hhbmdlZFByb3BlcnRpZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3AgPSBjaGFuZ2VkUHJvcGVydGllc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Lm5vZGUuc3R5bGVbcHJlZml4KHByb3ApXSA9IHRvW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9LCBvcHRpb25zLmRlbGF5IHx8IDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc2V0U3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcmlnaW5hbFN0eWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgdGhpcy5vcmlnaW5hbFN0eWxlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9jZXNzUGFyYW1zOiBmdW5jdGlvbiAocGFyYW1zLCBkZWZhdWx0cykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMgPSB7IGR1cmF0aW9uOiBwYXJhbXMgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMgPT09ICdzbG93Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0geyBkdXJhdGlvbjogNjAwIH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zID09PSAnZmFzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IHsgZHVyYXRpb246IDIwMCB9O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0geyBkdXJhdGlvbjogNDAwIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmaWxsR2FwcyhwYXJhbXMsIGRlZmF1bHRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmVuZG9ycyA9IFtcbiAgICAgICAgICAgICdvJyxcbiAgICAgICAgICAgICdtcycsXG4gICAgICAgICAgICAnbW96JyxcbiAgICAgICAgICAgICd3ZWJraXQnXG4gICAgICAgIF07XG4gICAgICAgIHZlbmRvclBhdHRlcm4gPSBuZXcgUmVnRXhwKCdeKD86JyArIHZlbmRvcnMuam9pbignfCcpICsgJykoW0EtWl0pJyk7XG4gICAgICAgIHVucHJlZml4UGF0dGVybiA9IG5ldyBSZWdFeHAoJ14tKD86JyArIHZlbmRvcnMuam9pbignfCcpICsgJyktJyk7XG4gICAgICAgIHByZWZpeENhY2hlID0ge307XG4gICAgICAgIGZ1bmN0aW9uIHByZWZpeChwcm9wKSB7XG4gICAgICAgICAgICB2YXIgaSwgdmVuZG9yLCBjYXBwZWQ7XG4gICAgICAgICAgICBpZiAoIXByZWZpeENhY2hlW3Byb3BdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRlc3RTdHlsZVtwcm9wXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZWZpeENhY2hlW3Byb3BdID0gcHJvcDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYXBwZWQgPSBwcm9wLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcC5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICAgICAgICAgIGkgPSB2ZW5kb3JzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVuZG9yID0gdmVuZG9yc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0U3R5bGVbdmVuZG9yICsgY2FwcGVkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZml4Q2FjaGVbcHJvcF0gPSB2ZW5kb3IgKyBjYXBwZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4Q2FjaGVbcHJvcF07XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdW5wcmVmaXgocHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AucmVwbGFjZSh1bnByZWZpeFBhdHRlcm4sICcnKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBoeXBoZW5hdGUoc3RyKSB7XG4gICAgICAgICAgICB2YXIgaHlwaGVuYXRlZDtcbiAgICAgICAgICAgIGlmICh2ZW5kb3JQYXR0ZXJuLnRlc3Qoc3RyKSkge1xuICAgICAgICAgICAgICAgIHN0ciA9ICctJyArIHN0cjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh5cGhlbmF0ZWQgPSBzdHIucmVwbGFjZSgvW0EtWl0vZywgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICctJyArIG1hdGNoLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBoeXBoZW5hdGVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBUcmFuc2l0aW9uO1xuICAgIH0oY29uZmlnX2lzQ2xpZW50LCB1dGlsc19jcmVhdGVFbGVtZW50LCB1dGlsc193YXJuLCB1dGlsc19pc051bWVyaWMsIHV0aWxzX2lzQXJyYXksIHV0aWxzX2NhbWVsQ2FzZSwgdXRpbHNfZmlsbEdhcHMsIHJlbmRlcl9TdHJpbmdGcmFnbWVudF9fU3RyaW5nRnJhZ21lbnQpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X3NoYXJlZF9leGVjdXRlVHJhbnNpdGlvbl9fZXhlY3V0ZVRyYW5zaXRpb24gPSBmdW5jdGlvbiAod2FybiwgVHJhbnNpdGlvbikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkZXNjcmlwdG9yLCByb290LCBvd25lciwgY29udGV4dFN0YWNrLCBpc0ludHJvKSB7XG4gICAgICAgICAgICB2YXIgdHJhbnNpdGlvbiwgbm9kZSwgb2xkVHJhbnNpdGlvbjtcbiAgICAgICAgICAgIGlmICghcm9vdC50cmFuc2l0aW9uc0VuYWJsZWQgfHwgcm9vdC5fcGFyZW50ICYmICFyb290Ll9wYXJlbnQudHJhbnNpdGlvbnNFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJhbnNpdGlvbiA9IG5ldyBUcmFuc2l0aW9uKGRlc2NyaXB0b3IsIHJvb3QsIG93bmVyLCBjb250ZXh0U3RhY2ssIGlzSW50cm8pO1xuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb24uX2ZuKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IHRyYW5zaXRpb24ubm9kZTtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLl9tYW5hZ2VyID0gcm9vdC5fdHJhbnNpdGlvbk1hbmFnZXI7XG4gICAgICAgICAgICAgICAgaWYgKG9sZFRyYW5zaXRpb24gPSBub2RlLl9yYWN0aXZlLnRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkVHJhbnNpdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBub2RlLl9yYWN0aXZlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uO1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb24uX21hbmFnZXIucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNJbnRybykge1xuICAgICAgICAgICAgICAgICAgICByb290Ll9kZWZlcnJlZC50cmFuc2l0aW9ucy5wdXNoKHRyYW5zaXRpb24pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24uaW5pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KHV0aWxzX3dhcm4sIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X3NoYXJlZF9leGVjdXRlVHJhbnNpdGlvbl9UcmFuc2l0aW9uKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9pbml0aWFsaXNlX19pbml0aWFsaXNlID0gZnVuY3Rpb24gKHR5cGVzLCBuYW1lc3BhY2VzLCBjcmVhdGUsIGRlZmluZVByb3BlcnR5LCBtYXRjaGVzLCB3YXJuLCBjcmVhdGVFbGVtZW50LCBnZXRFbGVtZW50TmFtZXNwYWNlLCBjcmVhdGVFbGVtZW50QXR0cmlidXRlcywgYXBwZW5kRWxlbWVudENoaWxkcmVuLCBkZWNvcmF0ZSwgYWRkRXZlbnRQcm94aWVzLCB1cGRhdGVMaXZlUXVlcmllcywgZXhlY3V0ZVRyYW5zaXRpb24sIGVuZm9yY2VDYXNlKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMsIGRvY0ZyYWcpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnRGcmFnbWVudCwgcE5vZGUsIGNvbnRleHRTdGFjaywgZGVzY3JpcHRvciwgbmFtZXNwYWNlLCBuYW1lLCBhdHRyaWJ1dGVzLCB3aWR0aCwgaGVpZ2h0LCBsb2FkSGFuZGxlciwgcm9vdCwgc2VsZWN0QmluZGluZywgZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgZWxlbWVudC50eXBlID0gdHlwZXMuRUxFTUVOVDtcbiAgICAgICAgICAgIHBhcmVudEZyYWdtZW50ID0gZWxlbWVudC5wYXJlbnRGcmFnbWVudCA9IG9wdGlvbnMucGFyZW50RnJhZ21lbnQ7XG4gICAgICAgICAgICBwTm9kZSA9IHBhcmVudEZyYWdtZW50LnBOb2RlO1xuICAgICAgICAgICAgY29udGV4dFN0YWNrID0gcGFyZW50RnJhZ21lbnQuY29udGV4dFN0YWNrO1xuICAgICAgICAgICAgZGVzY3JpcHRvciA9IGVsZW1lbnQuZGVzY3JpcHRvciA9IG9wdGlvbnMuZGVzY3JpcHRvcjtcbiAgICAgICAgICAgIGVsZW1lbnQucm9vdCA9IHJvb3QgPSBwYXJlbnRGcmFnbWVudC5yb290O1xuICAgICAgICAgICAgZWxlbWVudC5pbmRleCA9IG9wdGlvbnMuaW5kZXg7XG4gICAgICAgICAgICBlbGVtZW50LmxjTmFtZSA9IGRlc2NyaXB0b3IuZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgZWxlbWVudC5ldmVudExpc3RlbmVycyA9IFtdO1xuICAgICAgICAgICAgZWxlbWVudC5jdXN0b21FdmVudExpc3RlbmVycyA9IFtdO1xuICAgICAgICAgICAgaWYgKHBOb2RlKSB7XG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlID0gZWxlbWVudC5uYW1lc3BhY2UgPSBnZXRFbGVtZW50TmFtZXNwYWNlKGRlc2NyaXB0b3IsIHBOb2RlKTtcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZXNwYWNlICE9PSBuYW1lc3BhY2VzLmh0bWwgPyBlbmZvcmNlQ2FzZShkZXNjcmlwdG9yLmUpIDogZGVzY3JpcHRvci5lO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQubm9kZSA9IGNyZWF0ZUVsZW1lbnQobmFtZSwgbmFtZXNwYWNlKTtcbiAgICAgICAgICAgICAgICBkZWZpbmVQcm9wZXJ0eShlbGVtZW50Lm5vZGUsICdfcmFjdGl2ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3h5OiBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5cGF0aDogY29udGV4dFN0YWNrLmxlbmd0aCA/IGNvbnRleHRTdGFja1tjb250ZXh0U3RhY2subGVuZ3RoIC0gMV0gOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBwYXJlbnRGcmFnbWVudC5pbmRleFJlZnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHM6IGNyZWF0ZShudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3Q6IHJvb3RcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXR0cmlidXRlcyA9IGNyZWF0ZUVsZW1lbnRBdHRyaWJ1dGVzKGVsZW1lbnQsIGRlc2NyaXB0b3IuYSk7XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRvci5mKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZSAmJiBlbGVtZW50Lm5vZGUuZ2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5ub2RlLmlubmVySFRNTCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gJ0EgcHJlLXBvcHVsYXRlZCBjb250ZW50ZWRpdGFibGUgZWxlbWVudCBzaG91bGQgbm90IGhhdmUgY2hpbGRyZW4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvb3QuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FybihlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFwcGVuZEVsZW1lbnRDaGlsZHJlbihlbGVtZW50LCBlbGVtZW50Lm5vZGUsIGRlc2NyaXB0b3IsIGRvY0ZyYWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRvY0ZyYWcgJiYgZGVzY3JpcHRvci52KSB7XG4gICAgICAgICAgICAgICAgYWRkRXZlbnRQcm94aWVzKGVsZW1lbnQsIGRlc2NyaXB0b3Iudik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9jRnJhZykge1xuICAgICAgICAgICAgICAgIGlmIChyb290LnR3b3dheSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmJpbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScpICYmIGVsZW1lbnQubm9kZS5fcmFjdGl2ZS5iaW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5vZGUuX3JhY3RpdmUuYmluZGluZy51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlcy5uYW1lICYmICFhdHRyaWJ1dGVzLm5hbWUudHdvd2F5KSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMubmFtZS51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZS50YWdOYW1lID09PSAnSU1HJyAmJiAoKHdpZHRoID0gZWxlbWVudC5hdHRyaWJ1dGVzLndpZHRoKSB8fCAoaGVpZ2h0ID0gZWxlbWVudC5hdHRyaWJ1dGVzLmhlaWdodCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubm9kZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgbG9hZEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5vZGUud2lkdGggPSB3aWR0aC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5vZGUuaGVpZ2h0ID0gaGVpZ2h0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBsb2FkSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQoZWxlbWVudC5ub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoZGVzY3JpcHRvci5vKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlY29yYXRlKGRlc2NyaXB0b3Iubywgcm9vdCwgZWxlbWVudCwgY29udGV4dFN0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IudDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZVRyYW5zaXRpb24oZGVzY3JpcHRvci50MSwgcm9vdCwgZWxlbWVudCwgY29udGV4dFN0YWNrLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZS50YWdOYW1lID09PSAnT1BUSU9OJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocE5vZGUudGFnTmFtZSA9PT0gJ1NFTEVDVCcgJiYgKHNlbGVjdEJpbmRpbmcgPSBwTm9kZS5fcmFjdGl2ZS5iaW5kaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0QmluZGluZy5kZWZlclVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm5vZGUuX3JhY3RpdmUudmFsdWUgPT0gcE5vZGUuX3JhY3RpdmUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubm9kZS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZS5hdXRvZm9jdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcm9vdC5fZGVmZXJyZWQuZm9jdXNhYmxlID0gZWxlbWVudC5ub2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZUxpdmVRdWVyaWVzKGVsZW1lbnQpO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCBjb25maWdfbmFtZXNwYWNlcywgdXRpbHNfY3JlYXRlLCB1dGlsc19kZWZpbmVQcm9wZXJ0eSwgdXRpbHNfbWF0Y2hlcywgdXRpbHNfd2FybiwgdXRpbHNfY3JlYXRlRWxlbWVudCwgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfaW5pdGlhbGlzZV9nZXRFbGVtZW50TmFtZXNwYWNlLCByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9pbml0aWFsaXNlX2NyZWF0ZUVsZW1lbnRBdHRyaWJ1dGVzLCByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9pbml0aWFsaXNlX2FwcGVuZEVsZW1lbnRDaGlsZHJlbiwgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfaW5pdGlhbGlzZV9kZWNvcmF0ZV9fZGVjb3JhdGUsIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X2luaXRpYWxpc2VfYWRkRXZlbnRQcm94aWVzX19hZGRFdmVudFByb3hpZXMsIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X2luaXRpYWxpc2VfdXBkYXRlTGl2ZVF1ZXJpZXMsIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X3NoYXJlZF9leGVjdXRlVHJhbnNpdGlvbl9fZXhlY3V0ZVRyYW5zaXRpb24sIHJlbmRlcl9Eb21GcmFnbWVudF9zaGFyZWRfZW5mb3JjZUNhc2UpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X3Byb3RvdHlwZV90ZWFyZG93biA9IGZ1bmN0aW9uIChleGVjdXRlVHJhbnNpdGlvbikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkZXN0cm95KSB7XG4gICAgICAgICAgICB2YXIgZXZlbnROYW1lLCBiaW5kaW5nLCBiaW5kaW5ncywgaSwgbGl2ZVF1ZXJpZXMsIHNlbGVjdG9yLCBxdWVyeSwgbm9kZXNUb1JlbW92ZSwgajtcbiAgICAgICAgICAgIGlmICh0aGlzLmZyYWdtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudC50ZWFyZG93bihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5hdHRyaWJ1dGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlcy5wb3AoKS50ZWFyZG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZSkge1xuICAgICAgICAgICAgICAgIGZvciAoZXZlbnROYW1lIGluIHRoaXMubm9kZS5fcmFjdGl2ZS5ldmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLl9yYWN0aXZlLmV2ZW50c1tldmVudE5hbWVdLnRlYXJkb3duKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChiaW5kaW5nID0gdGhpcy5ub2RlLl9yYWN0aXZlLmJpbmRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgYmluZGluZy50ZWFyZG93bigpO1xuICAgICAgICAgICAgICAgICAgICBiaW5kaW5ncyA9IHRoaXMucm9vdC5fdHdvd2F5QmluZGluZ3NbYmluZGluZy5hdHRyLmtleXBhdGhdO1xuICAgICAgICAgICAgICAgICAgICBiaW5kaW5ncy5zcGxpY2UoYmluZGluZ3MuaW5kZXhPZihiaW5kaW5nKSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZGVjb3JhdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNvcmF0b3IudGVhcmRvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRlc2NyaXB0b3IudDIpIHtcbiAgICAgICAgICAgICAgICBleGVjdXRlVHJhbnNpdGlvbih0aGlzLmRlc2NyaXB0b3IudDIsIHRoaXMucm9vdCwgdGhpcywgdGhpcy5wYXJlbnRGcmFnbWVudC5jb250ZXh0U3RhY2ssIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290Ll90cmFuc2l0aW9uTWFuYWdlci5kZXRhY2hXaGVuUmVhZHkodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGl2ZVF1ZXJpZXMgPSB0aGlzLmxpdmVRdWVyaWVzKSB7XG4gICAgICAgICAgICAgICAgaSA9IGxpdmVRdWVyaWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gbGl2ZVF1ZXJpZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2Rlc1RvUmVtb3ZlID0gdGhpcy5saXZlUXVlcmllc1tzZWxlY3Rvcl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGogPSBub2Rlc1RvUmVtb3ZlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5ID0gdGhpcy5yb290Ll9saXZlUXVlcmllc1tzZWxlY3Rvcl07XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnkuX3JlbW92ZShub2Rlc1RvUmVtb3ZlW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X3NoYXJlZF9leGVjdXRlVHJhbnNpdGlvbl9fZXhlY3V0ZVRyYW5zaXRpb24pO1xudmFyIGNvbmZpZ192b2lkRWxlbWVudE5hbWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuICdhcmVhIGJhc2UgYnIgY29sIGNvbW1hbmQgZG9jdHlwZSBlbWJlZCBociBpbWcgaW5wdXQga2V5Z2VuIGxpbmsgbWV0YSBwYXJhbSBzb3VyY2UgdHJhY2sgd2JyJy5zcGxpdCgnICcpO1xuICAgIH0oKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9wcm90b3R5cGVfdG9TdHJpbmcgPSBmdW5jdGlvbiAodm9pZEVsZW1lbnROYW1lcykge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdHIsIGksIGxlbjtcbiAgICAgICAgICAgIHN0ciA9ICc8JyArICh0aGlzLmRlc2NyaXB0b3IueSA/ICchZG9jdHlwZScgOiB0aGlzLmRlc2NyaXB0b3IuZSk7XG4gICAgICAgICAgICBsZW4gPSB0aGlzLmF0dHJpYnV0ZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9ICcgJyArIHRoaXMuYXR0cmlidXRlc1tpXS50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyICs9ICc+JztcbiAgICAgICAgICAgIGlmICh0aGlzLmh0bWwpIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gdGhpcy5odG1sO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZyYWdtZW50KSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IHRoaXMuZnJhZ21lbnQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2b2lkRWxlbWVudE5hbWVzLmluZGV4T2YodGhpcy5kZXNjcmlwdG9yLmUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHN0ciArPSAnPC8nICsgdGhpcy5kZXNjcmlwdG9yLmUgKyAnPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3ZvaWRFbGVtZW50TmFtZXMpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X3Byb3RvdHlwZV9maW5kID0gZnVuY3Rpb24gKG1hdGNoZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeVJlc3VsdDtcbiAgICAgICAgICAgIGlmIChtYXRjaGVzKHRoaXMubm9kZSwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmh0bWwgJiYgKHF1ZXJ5UmVzdWx0ID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeVJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmZyYWdtZW50ICYmIHRoaXMuZnJhZ21lbnQuZmluZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYWdtZW50LmZpbmQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0odXRpbHNfbWF0Y2hlcyk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfcHJvdG90eXBlX2ZpbmRBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlbGVjdG9yLCBxdWVyeSkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5QWxsUmVzdWx0LCBpLCBudW1Ob2Rlcywgbm9kZSwgcmVnaXN0ZXJlZE5vZGVzO1xuICAgICAgICAgICAgaWYgKHF1ZXJ5Ll90ZXN0KHRoaXMsIHRydWUpICYmIHF1ZXJ5LmxpdmUpIHtcbiAgICAgICAgICAgICAgICAodGhpcy5saXZlUXVlcmllcyB8fCAodGhpcy5saXZlUXVlcmllcyA9IFtdKSkucHVzaChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5saXZlUXVlcmllc1tzZWxlY3Rvcl0gPSBbdGhpcy5ub2RlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmh0bWwgJiYgKHF1ZXJ5QWxsUmVzdWx0ID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKSAmJiAobnVtTm9kZXMgPSBxdWVyeUFsbFJlc3VsdC5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXJ5LmxpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmxpdmVRdWVyaWVzW3NlbGVjdG9yXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMubGl2ZVF1ZXJpZXMgfHwgKHRoaXMubGl2ZVF1ZXJpZXMgPSBbXSkpLnB1c2goc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXZlUXVlcmllc1tzZWxlY3Rvcl0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlcmVkTm9kZXMgPSB0aGlzLmxpdmVRdWVyaWVzW3NlbGVjdG9yXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG51bU5vZGVzOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHF1ZXJ5QWxsUmVzdWx0W2ldO1xuICAgICAgICAgICAgICAgICAgICBxdWVyeS5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnkubGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJlZE5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5mcmFnbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQuZmluZEFsbChzZWxlY3RvciwgcXVlcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9wcm90b3R5cGVfZmluZENvbXBvbmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZyYWdtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJhZ21lbnQuZmluZENvbXBvbmVudChzZWxlY3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X3Byb3RvdHlwZV9maW5kQWxsQ29tcG9uZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VsZWN0b3IsIHF1ZXJ5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mcmFnbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQuZmluZEFsbENvbXBvbmVudHMoc2VsZWN0b3IsIHF1ZXJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfcHJvdG90eXBlX2JpbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSB0aGlzLmF0dHJpYnV0ZXM7XG4gICAgICAgICAgICBpZiAoIXRoaXMubm9kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmJpbmRpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRpbmcudGVhcmRvd24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRpbmcgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScpICYmIGF0dHJpYnV0ZXMudmFsdWUgJiYgYXR0cmlidXRlcy52YWx1ZS5iaW5kKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZGVzY3JpcHRvci5lKSB7XG4gICAgICAgICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICAgICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMudmFsdWUuYmluZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlICdpbnB1dCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS50eXBlID09PSAncmFkaW8nIHx8IHRoaXMubm9kZS50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLm5hbWUgJiYgYXR0cmlidXRlcy5uYW1lLmJpbmQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLmNoZWNrZWQgJiYgYXR0cmlidXRlcy5jaGVja2VkLmJpbmQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLnZhbHVlICYmIGF0dHJpYnV0ZXMudmFsdWUuYmluZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X19FbGVtZW50ID0gZnVuY3Rpb24gKGluaXRpYWxpc2UsIHRlYXJkb3duLCB0b1N0cmluZywgZmluZCwgZmluZEFsbCwgZmluZENvbXBvbmVudCwgZmluZEFsbENvbXBvbmVudHMsIGJpbmQpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBEb21FbGVtZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGRvY0ZyYWcpIHtcbiAgICAgICAgICAgIGluaXRpYWxpc2UodGhpcywgb3B0aW9ucywgZG9jRnJhZyk7XG4gICAgICAgIH07XG4gICAgICAgIERvbUVsZW1lbnQucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgZGV0YWNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IHRlYXJkb3duLFxuICAgICAgICAgICAgZmlyc3ROb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kTmV4dE5vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBidWJibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cmluZzogdG9TdHJpbmcsXG4gICAgICAgICAgICBmaW5kOiBmaW5kLFxuICAgICAgICAgICAgZmluZEFsbDogZmluZEFsbCxcbiAgICAgICAgICAgIGZpbmRDb21wb25lbnQ6IGZpbmRDb21wb25lbnQsXG4gICAgICAgICAgICBmaW5kQWxsQ29tcG9uZW50czogZmluZEFsbENvbXBvbmVudHMsXG4gICAgICAgICAgICBiaW5kOiBiaW5kXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBEb21FbGVtZW50O1xuICAgIH0ocmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfaW5pdGlhbGlzZV9faW5pdGlhbGlzZSwgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfcHJvdG90eXBlX3RlYXJkb3duLCByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9wcm90b3R5cGVfdG9TdHJpbmcsIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X3Byb3RvdHlwZV9maW5kLCByZW5kZXJfRG9tRnJhZ21lbnRfRWxlbWVudF9wcm90b3R5cGVfZmluZEFsbCwgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfcHJvdG90eXBlX2ZpbmRDb21wb25lbnQsIHJlbmRlcl9Eb21GcmFnbWVudF9FbGVtZW50X3Byb3RvdHlwZV9maW5kQWxsQ29tcG9uZW50cywgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfcHJvdG90eXBlX2JpbmQpO1xudmFyIGNvbmZpZ19lcnJvcnMgPSB7IG1pc3NpbmdQYXJzZXI6ICdNaXNzaW5nIFJhY3RpdmUucGFyc2UgLSBjYW5ub3QgcGFyc2UgdGVtcGxhdGUuIEVpdGhlciBwcmVwYXJzZSBvciB1c2UgdGhlIHZlcnNpb24gdGhhdCBpbmNsdWRlcyB0aGUgcGFyc2VyJyB9O1xudmFyIHJlZ2lzdHJpZXNfcGFydGlhbHMgPSB7fTtcbnZhciBwYXJzZV91dGlsc19zdHJpcEh0bWxDb21tZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoaHRtbCkge1xuICAgICAgICAgICAgdmFyIGNvbW1lbnRTdGFydCwgY29tbWVudEVuZCwgcHJvY2Vzc2VkO1xuICAgICAgICAgICAgcHJvY2Vzc2VkID0gJyc7XG4gICAgICAgICAgICB3aGlsZSAoaHRtbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb21tZW50U3RhcnQgPSBodG1sLmluZGV4T2YoJzwhLS0nKTtcbiAgICAgICAgICAgICAgICBjb21tZW50RW5kID0gaHRtbC5pbmRleE9mKCctLT4nKTtcbiAgICAgICAgICAgICAgICBpZiAoY29tbWVudFN0YXJ0ID09PSAtMSAmJiBjb21tZW50RW5kID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZWQgKz0gaHRtbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb21tZW50U3RhcnQgIT09IC0xICYmIGNvbW1lbnRFbmQgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93ICdJbGxlZ2FsIEhUTUwgLSBleHBlY3RlZCBjbG9zaW5nIGNvbW1lbnQgc2VxdWVuY2UgKFxcJy0tPlxcJyknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY29tbWVudEVuZCAhPT0gLTEgJiYgY29tbWVudFN0YXJ0ID09PSAtMSB8fCBjb21tZW50RW5kIDwgY29tbWVudFN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93ICdJbGxlZ2FsIEhUTUwgLSB1bmV4cGVjdGVkIGNsb3NpbmcgY29tbWVudCBzZXF1ZW5jZSAoXFwnLS0+XFwnKSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByb2Nlc3NlZCArPSBodG1sLnN1YnN0cigwLCBjb21tZW50U3RhcnQpO1xuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sLnN1YnN0cmluZyhjb21tZW50RW5kICsgMyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzc2VkO1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciBwYXJzZV91dGlsc19zdHJpcFN0YW5kYWxvbmVzID0gZnVuY3Rpb24gKHR5cGVzKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRva2Vucykge1xuICAgICAgICAgICAgdmFyIGksIGN1cnJlbnQsIGJhY2tPbmUsIGJhY2tUd28sIGxlYWRpbmdMaW5lYnJlYWssIHRyYWlsaW5nTGluZWJyZWFrO1xuICAgICAgICAgICAgbGVhZGluZ0xpbmVicmVhayA9IC9eXFxzKlxccj9cXG4vO1xuICAgICAgICAgICAgdHJhaWxpbmdMaW5lYnJlYWsgPSAvXFxyP1xcblxccyokLztcbiAgICAgICAgICAgIGZvciAoaSA9IDI7IGkgPCB0b2tlbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gdG9rZW5zW2ldO1xuICAgICAgICAgICAgICAgIGJhY2tPbmUgPSB0b2tlbnNbaSAtIDFdO1xuICAgICAgICAgICAgICAgIGJhY2tUd28gPSB0b2tlbnNbaSAtIDJdO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LnR5cGUgPT09IHR5cGVzLlRFWFQgJiYgYmFja09uZS50eXBlID09PSB0eXBlcy5NVVNUQUNIRSAmJiBiYWNrVHdvLnR5cGUgPT09IHR5cGVzLlRFWFQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYWlsaW5nTGluZWJyZWFrLnRlc3QoYmFja1R3by52YWx1ZSkgJiYgbGVhZGluZ0xpbmVicmVhay50ZXN0KGN1cnJlbnQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFja09uZS5tdXN0YWNoZVR5cGUgIT09IHR5cGVzLklOVEVSUE9MQVRPUiAmJiBiYWNrT25lLm11c3RhY2hlVHlwZSAhPT0gdHlwZXMuVFJJUExFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja1R3by52YWx1ZSA9IGJhY2tUd28udmFsdWUucmVwbGFjZSh0cmFpbGluZ0xpbmVicmVhaywgJ1xcbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudC52YWx1ZSA9IGN1cnJlbnQudmFsdWUucmVwbGFjZShsZWFkaW5nTGluZWJyZWFrLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMuc3BsaWNlKGktLSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG9rZW5zO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzKTtcbnZhciBwYXJzZV91dGlsc19zdHJpcENvbW1lbnRUb2tlbnMgPSBmdW5jdGlvbiAodHlwZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5zKSB7XG4gICAgICAgICAgICB2YXIgaSwgY3VycmVudCwgcHJldmlvdXMsIG5leHQ7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IHRva2Vuc1tpIC0gMV07XG4gICAgICAgICAgICAgICAgbmV4dCA9IHRva2Vuc1tpICsgMV07XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQubXVzdGFjaGVUeXBlID09PSB0eXBlcy5DT01NRU5UIHx8IGN1cnJlbnQubXVzdGFjaGVUeXBlID09PSB0eXBlcy5ERUxJTUNIQU5HRSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMgJiYgbmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzLnR5cGUgPT09IHR5cGVzLlRFWFQgJiYgbmV4dC50eXBlID09PSB0eXBlcy5URVhUKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMudmFsdWUgKz0gbmV4dC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGkgLT0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG9rZW5zO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0TXVzdGFjaGVfZ2V0RGVsaW1pdGVyQ2hhbmdlID0gZnVuY3Rpb24gKG1ha2VSZWdleE1hdGNoZXIpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBnZXREZWxpbWl0ZXIgPSBtYWtlUmVnZXhNYXRjaGVyKC9eW15cXHM9XSsvKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCwgb3BlbmluZywgY2xvc2luZztcbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCc9JykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIG9wZW5pbmcgPSBnZXREZWxpbWl0ZXIodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmICghb3BlbmluZykge1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGNsb3NpbmcgPSBnZXREZWxpbWl0ZXIodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmICghY2xvc2luZykge1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCc9JykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIG9wZW5pbmcsXG4gICAgICAgICAgICAgICAgY2xvc2luZ1xuICAgICAgICAgICAgXTtcbiAgICAgICAgfTtcbiAgICB9KHBhcnNlX1Rva2VuaXplcl91dGlsc19tYWtlUmVnZXhNYXRjaGVyKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0TXVzdGFjaGVfZ2V0TXVzdGFjaGVUeXBlID0gZnVuY3Rpb24gKHR5cGVzKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgbXVzdGFjaGVUeXBlcyA9IHtcbiAgICAgICAgICAgICAgICAnIyc6IHR5cGVzLlNFQ1RJT04sXG4gICAgICAgICAgICAgICAgJ14nOiB0eXBlcy5JTlZFUlRFRCxcbiAgICAgICAgICAgICAgICAnLyc6IHR5cGVzLkNMT1NJTkcsXG4gICAgICAgICAgICAgICAgJz4nOiB0eXBlcy5QQVJUSUFMLFxuICAgICAgICAgICAgICAgICchJzogdHlwZXMuQ09NTUVOVCxcbiAgICAgICAgICAgICAgICAnJic6IHR5cGVzLlRSSVBMRVxuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gbXVzdGFjaGVUeXBlc1t0b2tlbml6ZXIuc3RyLmNoYXJBdCh0b2tlbml6ZXIucG9zKV07XG4gICAgICAgICAgICBpZiAoIXR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2VuaXplci5wb3MgKz0gMTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0TXVzdGFjaGVfZ2V0TXVzdGFjaGVDb250ZW50ID0gZnVuY3Rpb24gKHR5cGVzLCBtYWtlUmVnZXhNYXRjaGVyLCBnZXRNdXN0YWNoZVR5cGUpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBnZXRJbmRleFJlZiA9IG1ha2VSZWdleE1hdGNoZXIoL15cXHMqOlxccyooW2EtekEtWl8kXVthLXpBLVpfJDAtOV0qKS8pLCBhcnJheU1lbWJlciA9IC9eWzAtOV1bMS05XSokLztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbml6ZXIsIGlzVHJpcGxlKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQsIG11c3RhY2hlLCB0eXBlLCBleHByLCBpLCByZW1haW5pbmcsIGluZGV4O1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgbXVzdGFjaGUgPSB7IHR5cGU6IGlzVHJpcGxlID8gdHlwZXMuVFJJUExFIDogdHlwZXMuTVVTVEFDSEUgfTtcbiAgICAgICAgICAgIGlmICghaXNUcmlwbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhwciA9IHRva2VuaXplci5nZXRFeHByZXNzaW9uKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbXVzdGFjaGUubXVzdGFjaGVUeXBlID0gdHlwZXMuSU5URVJQT0xBVE9SO1xuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2godG9rZW5pemVyLmRlbGltaXRlcnNbMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zIC09IHRva2VuaXplci5kZWxpbWl0ZXJzWzFdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZXhwcikge1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gZ2V0TXVzdGFjaGVUeXBlKHRva2VuaXplcik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSB0eXBlcy5UUklQTEUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG11c3RhY2hlID0geyB0eXBlOiB0eXBlcy5UUklQTEUgfTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG11c3RhY2hlLm11c3RhY2hlVHlwZSA9IHR5cGUgfHwgdHlwZXMuSU5URVJQT0xBVE9SO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSB0eXBlcy5DT01NRU5UIHx8IHR5cGUgPT09IHR5cGVzLkNMT1NJTkcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZyA9IHRva2VuaXplci5yZW1haW5pbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gcmVtYWluaW5nLmluZGV4T2YodG9rZW5pemVyLmRlbGltaXRlcnNbMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11c3RhY2hlLnJlZiA9IHJlbWFpbmluZy5zdWJzdHIoMCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgKz0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG11c3RhY2hlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFleHByKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgICAgIGV4cHIgPSB0b2tlbml6ZXIuZ2V0RXhwcmVzc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGV4cHIudCA9PT0gdHlwZXMuQlJBQ0tFVEVEICYmIGV4cHIueCkge1xuICAgICAgICAgICAgICAgIGV4cHIgPSBleHByLng7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXhwci50ID09PSB0eXBlcy5SRUZFUkVOQ0UpIHtcbiAgICAgICAgICAgICAgICBtdXN0YWNoZS5yZWYgPSBleHByLm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV4cHIudCA9PT0gdHlwZXMuTlVNQkVSX0xJVEVSQUwgJiYgYXJyYXlNZW1iZXIudGVzdChleHByLnYpKSB7XG4gICAgICAgICAgICAgICAgbXVzdGFjaGUucmVmID0gZXhwci52O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtdXN0YWNoZS5leHByZXNzaW9uID0gZXhwcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgPSBnZXRJbmRleFJlZih0b2tlbml6ZXIpO1xuICAgICAgICAgICAgaWYgKGkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBtdXN0YWNoZS5pbmRleFJlZiA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbXVzdGFjaGU7XG4gICAgICAgIH07XG4gICAgfShjb25maWdfdHlwZXMsIHBhcnNlX1Rva2VuaXplcl91dGlsc19tYWtlUmVnZXhNYXRjaGVyLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0TXVzdGFjaGVfZ2V0TXVzdGFjaGVUeXBlKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0TXVzdGFjaGVfX2dldE11c3RhY2hlID0gZnVuY3Rpb24gKHR5cGVzLCBnZXREZWxpbWl0ZXJDaGFuZ2UsIGdldE11c3RhY2hlQ29udGVudCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWVrVHJpcGxlRmlyc3QgPSB0aGlzLnRyaXBsZURlbGltaXRlcnNbMF0ubGVuZ3RoID4gdGhpcy5kZWxpbWl0ZXJzWzBdLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBnZXRNdXN0YWNoZSh0aGlzLCBzZWVrVHJpcGxlRmlyc3QpIHx8IGdldE11c3RhY2hlKHRoaXMsICFzZWVrVHJpcGxlRmlyc3QpO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBnZXRNdXN0YWNoZSh0b2tlbml6ZXIsIHNlZWtUcmlwbGUpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHRva2VuaXplci5wb3MsIGNvbnRlbnQsIGRlbGltaXRlcnM7XG4gICAgICAgICAgICBkZWxpbWl0ZXJzID0gc2Vla1RyaXBsZSA/IHRva2VuaXplci50cmlwbGVEZWxpbWl0ZXJzIDogdG9rZW5pemVyLmRlbGltaXRlcnM7XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaChkZWxpbWl0ZXJzWzBdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGVudCA9IGdldERlbGltaXRlckNoYW5nZSh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaChkZWxpbWl0ZXJzWzFdKSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b2tlbml6ZXJbc2Vla1RyaXBsZSA/ICd0cmlwbGVEZWxpbWl0ZXJzJyA6ICdkZWxpbWl0ZXJzJ10gPSBjb250ZW50O1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVzLk1VU1RBQ0hFLFxuICAgICAgICAgICAgICAgICAgICBtdXN0YWNoZVR5cGU6IHR5cGVzLkRFTElNQ0hBTkdFXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBnZXRNdXN0YWNoZUNvbnRlbnQodG9rZW5pemVyLCBzZWVrVHJpcGxlKTtcbiAgICAgICAgICAgIGlmIChjb250ZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goZGVsaW1pdGVyc1sxXSkpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgICAgfVxuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0TXVzdGFjaGVfZ2V0RGVsaW1pdGVyQ2hhbmdlLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0TXVzdGFjaGVfZ2V0TXVzdGFjaGVDb250ZW50KTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0Q29tbWVudF9nZXRDb21tZW50ID0gZnVuY3Rpb24gKHR5cGVzKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNvbnRlbnQsIHJlbWFpbmluZywgZW5kSW5kZXg7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2V0U3RyaW5nTWF0Y2goJzwhLS0nKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVtYWluaW5nID0gdGhpcy5yZW1haW5pbmcoKTtcbiAgICAgICAgICAgIGVuZEluZGV4ID0gcmVtYWluaW5nLmluZGV4T2YoJy0tPicpO1xuICAgICAgICAgICAgaWYgKGVuZEluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBlbmQgb2YgaW5wdXQgKGV4cGVjdGVkIFwiLS0+XCIgdG8gY2xvc2UgY29tbWVudCknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRlbnQgPSByZW1haW5pbmcuc3Vic3RyKDAsIGVuZEluZGV4KTtcbiAgICAgICAgICAgIHRoaXMucG9zICs9IGVuZEluZGV4ICsgMztcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZXMuQ09NTUVOVCxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfdXRpbHNfZ2V0TG93ZXN0SW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGhheXN0YWNrLCBuZWVkbGVzKSB7XG4gICAgICAgICAgICB2YXIgaSwgaW5kZXgsIGxvd2VzdDtcbiAgICAgICAgICAgIGkgPSBuZWVkbGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGhheXN0YWNrLmluZGV4T2YobmVlZGxlc1tpXSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFsb3dlc3QgfHwgaW5kZXggPCBsb3dlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbG93ZXN0ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxvd2VzdCB8fCAtMTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldFRhZ19fZ2V0VGFnID0gZnVuY3Rpb24gKHR5cGVzLCBtYWtlUmVnZXhNYXRjaGVyLCBnZXRMb3dlc3RJbmRleCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIGdldFRhZywgZ2V0T3BlbmluZ1RhZywgZ2V0Q2xvc2luZ1RhZywgZ2V0VGFnTmFtZSwgZ2V0QXR0cmlidXRlcywgZ2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGVOYW1lLCBnZXRBdHRyaWJ1dGVWYWx1ZSwgZ2V0VW5xdW90ZWRBdHRyaWJ1dGVWYWx1ZSwgZ2V0VW5xdW90ZWRBdHRyaWJ1dGVWYWx1ZVRva2VuLCBnZXRVbnF1b3RlZEF0dHJpYnV0ZVZhbHVlVGV4dCwgZ2V0UXVvdGVkU3RyaW5nVG9rZW4sIGdldFF1b3RlZEF0dHJpYnV0ZVZhbHVlO1xuICAgICAgICBnZXRUYWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0T3BlbmluZ1RhZyh0aGlzKSB8fCBnZXRDbG9zaW5nVGFnKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICBnZXRPcGVuaW5nVGFnID0gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIHN0YXJ0LCB0YWcsIGF0dHJzLCBsb3dlckNhc2VOYW1lO1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgaWYgKHRva2VuaXplci5pbnNpZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCc8JykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhZyA9IHsgdHlwZTogdHlwZXMuVEFHIH07XG4gICAgICAgICAgICBpZiAodG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCchJykpIHtcbiAgICAgICAgICAgICAgICB0YWcuZG9jdHlwZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWcubmFtZSA9IGdldFRhZ05hbWUodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmICghdGFnLm5hbWUpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdHRycyA9IGdldEF0dHJpYnV0ZXModG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmIChhdHRycykge1xuICAgICAgICAgICAgICAgIHRhZy5hdHRycyA9IGF0dHJzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgaWYgKHRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnLycpKSB7XG4gICAgICAgICAgICAgICAgdGFnLnNlbGZDbG9zaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCc+JykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb3dlckNhc2VOYW1lID0gdGFnLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChsb3dlckNhc2VOYW1lID09PSAnc2NyaXB0JyB8fCBsb3dlckNhc2VOYW1lID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLmluc2lkZSA9IGxvd2VyQ2FzZU5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGFnO1xuICAgICAgICB9O1xuICAgICAgICBnZXRDbG9zaW5nVGFnID0gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIHN0YXJ0LCB0YWcsIGV4cGVjdGVkO1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgZXhwZWN0ZWQgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIGNoYXJhY3RlciAnICsgdG9rZW5pemVyLnJlbWFpbmluZygpLmNoYXJBdCgwKSArICcgKGV4cGVjdGVkICcgKyBzdHIgKyAnKScpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCc8JykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhZyA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlcy5UQUcsXG4gICAgICAgICAgICAgICAgY2xvc2luZzogdHJ1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCcvJykpIHtcbiAgICAgICAgICAgICAgICBleHBlY3RlZCgnXCIvXCInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhZy5uYW1lID0gZ2V0VGFnTmFtZSh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgaWYgKCF0YWcubmFtZSkge1xuICAgICAgICAgICAgICAgIGV4cGVjdGVkKCd0YWcgbmFtZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJz4nKSkge1xuICAgICAgICAgICAgICAgIGV4cGVjdGVkKCdcIj5cIicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRva2VuaXplci5pbnNpZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFnLm5hbWUudG9Mb3dlckNhc2UoKSAhPT0gdG9rZW5pemVyLmluc2lkZSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIuaW5zaWRlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0YWc7XG4gICAgICAgIH07XG4gICAgICAgIGdldFRhZ05hbWUgPSBtYWtlUmVnZXhNYXRjaGVyKC9eW2EtekEtWl17MSx9Oj9bYS16QS1aMC05XFwtXSovKTtcbiAgICAgICAgZ2V0QXR0cmlidXRlcyA9IGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCwgYXR0cnMsIGF0dHI7XG4gICAgICAgICAgICBzdGFydCA9IHRva2VuaXplci5wb3M7XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBhdHRyID0gZ2V0QXR0cmlidXRlKHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAoIWF0dHIpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdHRycyA9IFtdO1xuICAgICAgICAgICAgd2hpbGUgKGF0dHIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhdHRyc1thdHRycy5sZW5ndGhdID0gYXR0cjtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICAgICAgYXR0ciA9IGdldEF0dHJpYnV0ZSh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF0dHJzO1xuICAgICAgICB9O1xuICAgICAgICBnZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgYXR0ciwgbmFtZSwgdmFsdWU7XG4gICAgICAgICAgICBuYW1lID0gZ2V0QXR0cmlidXRlTmFtZSh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdHRyID0geyBuYW1lOiBuYW1lIH07XG4gICAgICAgICAgICB2YWx1ZSA9IGdldEF0dHJpYnV0ZVZhbHVlKHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBhdHRyLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXR0cjtcbiAgICAgICAgfTtcbiAgICAgICAgZ2V0QXR0cmlidXRlTmFtZSA9IG1ha2VSZWdleE1hdGNoZXIoL15bXlxcc1wiJz5cXC89XSsvKTtcbiAgICAgICAgZ2V0QXR0cmlidXRlVmFsdWUgPSBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQsIHZhbHVlO1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJz0nKSkge1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIHZhbHVlID0gZ2V0UXVvdGVkQXR0cmlidXRlVmFsdWUodG9rZW5pemVyLCAnXFwnJykgfHwgZ2V0UXVvdGVkQXR0cmlidXRlVmFsdWUodG9rZW5pemVyLCAnXCInKSB8fCBnZXRVbnF1b3RlZEF0dHJpYnV0ZVZhbHVlKHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIGdldFVucXVvdGVkQXR0cmlidXRlVmFsdWVUZXh0ID0gbWFrZVJlZ2V4TWF0Y2hlcigvXlteXFxzXCInPTw+YF0rLyk7XG4gICAgICAgIGdldFVucXVvdGVkQXR0cmlidXRlVmFsdWVUb2tlbiA9IGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCwgdGV4dCwgaW5kZXg7XG4gICAgICAgICAgICBzdGFydCA9IHRva2VuaXplci5wb3M7XG4gICAgICAgICAgICB0ZXh0ID0gZ2V0VW5xdW90ZWRBdHRyaWJ1dGVWYWx1ZVRleHQodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmICghdGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChpbmRleCA9IHRleHQuaW5kZXhPZih0b2tlbml6ZXIuZGVsaW1pdGVyc1swXSkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cigwLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0ICsgdGV4dC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVzLlRFWFQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRleHRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIGdldFVucXVvdGVkQXR0cmlidXRlVmFsdWUgPSBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW5zLCB0b2tlbjtcbiAgICAgICAgICAgIHRva2VucyA9IFtdO1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbml6ZXIuZ2V0TXVzdGFjaGUoKSB8fCBnZXRVbnF1b3RlZEF0dHJpYnV0ZVZhbHVlVG9rZW4odG9rZW5pemVyKTtcbiAgICAgICAgICAgIHdoaWxlICh0b2tlbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRva2Vuc1t0b2tlbnMubGVuZ3RoXSA9IHRva2VuO1xuICAgICAgICAgICAgICAgIHRva2VuID0gdG9rZW5pemVyLmdldE11c3RhY2hlKCkgfHwgZ2V0VW5xdW90ZWRBdHRyaWJ1dGVWYWx1ZVRva2VuKHRva2VuaXplcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0b2tlbnM7XG4gICAgICAgIH07XG4gICAgICAgIGdldFF1b3RlZEF0dHJpYnV0ZVZhbHVlID0gZnVuY3Rpb24gKHRva2VuaXplciwgcXVvdGVNYXJrKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQsIHRva2VucywgdG9rZW47XG4gICAgICAgICAgICBzdGFydCA9IHRva2VuaXplci5wb3M7XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaChxdW90ZU1hcmspKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbnMgPSBbXTtcbiAgICAgICAgICAgIHRva2VuID0gdG9rZW5pemVyLmdldE11c3RhY2hlKCkgfHwgZ2V0UXVvdGVkU3RyaW5nVG9rZW4odG9rZW5pemVyLCBxdW90ZU1hcmspO1xuICAgICAgICAgICAgd2hpbGUgKHRva2VuICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5zW3Rva2Vucy5sZW5ndGhdID0gdG9rZW47XG4gICAgICAgICAgICAgICAgdG9rZW4gPSB0b2tlbml6ZXIuZ2V0TXVzdGFjaGUoKSB8fCBnZXRRdW90ZWRTdHJpbmdUb2tlbih0b2tlbml6ZXIsIHF1b3RlTWFyayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaChxdW90ZU1hcmspKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRva2VucztcbiAgICAgICAgfTtcbiAgICAgICAgZ2V0UXVvdGVkU3RyaW5nVG9rZW4gPSBmdW5jdGlvbiAodG9rZW5pemVyLCBxdW90ZU1hcmspIHtcbiAgICAgICAgICAgIHZhciBzdGFydCwgaW5kZXgsIHJlbWFpbmluZztcbiAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgIHJlbWFpbmluZyA9IHRva2VuaXplci5yZW1haW5pbmcoKTtcbiAgICAgICAgICAgIGluZGV4ID0gZ2V0TG93ZXN0SW5kZXgocmVtYWluaW5nLCBbXG4gICAgICAgICAgICAgICAgcXVvdGVNYXJrLFxuICAgICAgICAgICAgICAgIHRva2VuaXplci5kZWxpbWl0ZXJzWzBdLFxuICAgICAgICAgICAgICAgIHRva2VuaXplci5kZWxpbWl0ZXJzWzFdXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1F1b3RlZCBhdHRyaWJ1dGUgdmFsdWUgbXVzdCBoYXZlIGEgY2xvc2luZyBxdW90ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpbmRleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW5pemVyLnBvcyArPSBpbmRleDtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZXMuVEVYVCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogcmVtYWluaW5nLnN1YnN0cigwLCBpbmRleClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBnZXRUYWc7XG4gICAgfShjb25maWdfdHlwZXMsIHBhcnNlX1Rva2VuaXplcl91dGlsc19tYWtlUmVnZXhNYXRjaGVyLCBwYXJzZV9Ub2tlbml6ZXJfdXRpbHNfZ2V0TG93ZXN0SW5kZXgpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9nZXRUZXh0X19nZXRUZXh0ID0gZnVuY3Rpb24gKHR5cGVzLCBnZXRMb3dlc3RJbmRleCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCwgcmVtYWluaW5nLCBiYXJyaWVyO1xuICAgICAgICAgICAgcmVtYWluaW5nID0gdGhpcy5yZW1haW5pbmcoKTtcbiAgICAgICAgICAgIGJhcnJpZXIgPSB0aGlzLmluc2lkZSA/ICc8LycgKyB0aGlzLmluc2lkZSA6ICc8JztcbiAgICAgICAgICAgIGluZGV4ID0gZ2V0TG93ZXN0SW5kZXgocmVtYWluaW5nLCBbXG4gICAgICAgICAgICAgICAgYmFycmllcixcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGltaXRlcnNbMF0sXG4gICAgICAgICAgICAgICAgdGhpcy50cmlwbGVEZWxpbWl0ZXJzWzBdXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGlmICghaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IHJlbWFpbmluZy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBvcyArPSBpbmRleDtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZXMuVEVYVCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogcmVtYWluaW5nLnN1YnN0cigwLCBpbmRleClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfShjb25maWdfdHlwZXMsIHBhcnNlX1Rva2VuaXplcl91dGlsc19nZXRMb3dlc3RJbmRleCk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldEJvb2xlYW5MaXRlcmFsID0gZnVuY3Rpb24gKHR5cGVzKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIHJlbWFpbmluZyA9IHRva2VuaXplci5yZW1haW5pbmcoKTtcbiAgICAgICAgICAgIGlmIChyZW1haW5pbmcuc3Vic3RyKDAsIDQpID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zICs9IDQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdDogdHlwZXMuQk9PTEVBTl9MSVRFUkFMLFxuICAgICAgICAgICAgICAgICAgICB2OiAndHJ1ZSdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlbWFpbmluZy5zdWJzdHIoMCwgNSkgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zICs9IDU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdDogdHlwZXMuQk9PTEVBTl9MSVRFUkFMLFxuICAgICAgICAgICAgICAgICAgICB2OiAnZmFsc2UnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRQcmltYXJ5X2dldExpdGVyYWxfZ2V0T2JqZWN0TGl0ZXJhbF9nZXRLZXlWYWx1ZVBhaXIgPSBmdW5jdGlvbiAodHlwZXMsIGdldEtleSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCwga2V5LCB2YWx1ZTtcbiAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGtleSA9IGdldEtleSh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCc6JykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICB2YWx1ZSA9IHRva2VuaXplci5nZXRFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHQ6IHR5cGVzLktFWV9WQUxVRV9QQUlSLFxuICAgICAgICAgICAgICAgIGs6IGtleSxcbiAgICAgICAgICAgICAgICB2OiB2YWx1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcywgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fc2hhcmVkX2dldEtleSk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldE9iamVjdExpdGVyYWxfZ2V0S2V5VmFsdWVQYWlycyA9IGZ1bmN0aW9uIChnZXRLZXlWYWx1ZVBhaXIpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBnZXRLZXlWYWx1ZVBhaXJzKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIHN0YXJ0LCBwYWlycywgcGFpciwga2V5VmFsdWVQYWlycztcbiAgICAgICAgICAgIHN0YXJ0ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgIHBhaXIgPSBnZXRLZXlWYWx1ZVBhaXIodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmIChwYWlyID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWlycyA9IFtwYWlyXTtcbiAgICAgICAgICAgIGlmICh0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJywnKSkge1xuICAgICAgICAgICAgICAgIGtleVZhbHVlUGFpcnMgPSBnZXRLZXlWYWx1ZVBhaXJzKHRva2VuaXplcik7XG4gICAgICAgICAgICAgICAgaWYgKCFrZXlWYWx1ZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwYWlycy5jb25jYXQoa2V5VmFsdWVQYWlycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFpcnM7XG4gICAgICAgIH07XG4gICAgfShwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRQcmltYXJ5X2dldExpdGVyYWxfZ2V0T2JqZWN0TGl0ZXJhbF9nZXRLZXlWYWx1ZVBhaXIpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9nZXRPYmplY3RMaXRlcmFsX19nZXRPYmplY3RMaXRlcmFsID0gZnVuY3Rpb24gKHR5cGVzLCBnZXRLZXlWYWx1ZVBhaXJzKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIHN0YXJ0LCBrZXlWYWx1ZVBhaXJzO1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJ3snKSkge1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleVZhbHVlUGFpcnMgPSBnZXRLZXlWYWx1ZVBhaXJzKHRva2VuaXplcik7XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnfScpKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0OiB0eXBlcy5PQkpFQ1RfTElURVJBTCxcbiAgICAgICAgICAgICAgICBtOiBrZXlWYWx1ZVBhaXJzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRQcmltYXJ5X2dldExpdGVyYWxfZ2V0T2JqZWN0TGl0ZXJhbF9nZXRLZXlWYWx1ZVBhaXJzKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9zaGFyZWRfZ2V0RXhwcmVzc2lvbkxpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gZ2V0RXhwcmVzc2lvbkxpc3QodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQsIGV4cHJlc3Npb25zLCBleHByLCBuZXh0O1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgZXhwciA9IHRva2VuaXplci5nZXRFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICBpZiAoZXhwciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhwcmVzc2lvbnMgPSBbZXhwcl07XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBpZiAodG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCcsJykpIHtcbiAgICAgICAgICAgICAgICBuZXh0ID0gZ2V0RXhwcmVzc2lvbkxpc3QodG9rZW5pemVyKTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBleHByZXNzaW9ucyA9IGV4cHJlc3Npb25zLmNvbmNhdChuZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBleHByZXNzaW9ucztcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldEFycmF5TGl0ZXJhbCA9IGZ1bmN0aW9uICh0eXBlcywgZ2V0RXhwcmVzc2lvbkxpc3QpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQsIGV4cHJlc3Npb25MaXN0O1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJ1snKSkge1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cHJlc3Npb25MaXN0ID0gZ2V0RXhwcmVzc2lvbkxpc3QodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCddJykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHQ6IHR5cGVzLkFSUkFZX0xJVEVSQUwsXG4gICAgICAgICAgICAgICAgbTogZXhwcmVzc2lvbkxpc3RcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfShjb25maWdfdHlwZXMsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX3NoYXJlZF9nZXRFeHByZXNzaW9uTGlzdCk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX19nZXRMaXRlcmFsID0gZnVuY3Rpb24gKGdldE51bWJlckxpdGVyYWwsIGdldEJvb2xlYW5MaXRlcmFsLCBnZXRTdHJpbmdMaXRlcmFsLCBnZXRPYmplY3RMaXRlcmFsLCBnZXRBcnJheUxpdGVyYWwpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgbGl0ZXJhbCA9IGdldE51bWJlckxpdGVyYWwodG9rZW5pemVyKSB8fCBnZXRCb29sZWFuTGl0ZXJhbCh0b2tlbml6ZXIpIHx8IGdldFN0cmluZ0xpdGVyYWwodG9rZW5pemVyKSB8fCBnZXRPYmplY3RMaXRlcmFsKHRva2VuaXplcikgfHwgZ2V0QXJyYXlMaXRlcmFsKHRva2VuaXplcik7XG4gICAgICAgICAgICByZXR1cm4gbGl0ZXJhbDtcbiAgICAgICAgfTtcbiAgICB9KHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9nZXROdW1iZXJMaXRlcmFsLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRQcmltYXJ5X2dldExpdGVyYWxfZ2V0Qm9vbGVhbkxpdGVyYWwsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldFByaW1hcnlfZ2V0TGl0ZXJhbF9nZXRTdHJpbmdMaXRlcmFsX19nZXRTdHJpbmdMaXRlcmFsLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRQcmltYXJ5X2dldExpdGVyYWxfZ2V0T2JqZWN0TGl0ZXJhbF9fZ2V0T2JqZWN0TGl0ZXJhbCwgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX2dldEFycmF5TGl0ZXJhbCk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRSZWZlcmVuY2UgPSBmdW5jdGlvbiAodHlwZXMsIG1ha2VSZWdleE1hdGNoZXIsIGdldE5hbWUpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBnZXREb3RSZWZpbmVtZW50LCBnZXRBcnJheVJlZmluZW1lbnQsIGdldEFycmF5TWVtYmVyLCBnbG9iYWxzO1xuICAgICAgICBnZXREb3RSZWZpbmVtZW50ID0gbWFrZVJlZ2V4TWF0Y2hlcigvXlxcLlthLXpBLVpfJDAtOV0rLyk7XG4gICAgICAgIGdldEFycmF5UmVmaW5lbWVudCA9IGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciBudW0gPSBnZXRBcnJheU1lbWJlcih0b2tlbml6ZXIpO1xuICAgICAgICAgICAgaWYgKG51bSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnLicgKyBudW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgZ2V0QXJyYXlNZW1iZXIgPSBtYWtlUmVnZXhNYXRjaGVyKC9eXFxbKDB8WzEtOV1bMC05XSopXFxdLyk7XG4gICAgICAgIGdsb2JhbHMgPSAvXig/OkFycmF5fERhdGV8UmVnRXhwfGRlY29kZVVSSUNvbXBvbmVudHxkZWNvZGVVUkl8ZW5jb2RlVVJJQ29tcG9uZW50fGVuY29kZVVSSXxpc0Zpbml0ZXxpc05hTnxwYXJzZUZsb2F0fHBhcnNlSW50fEpTT058TWF0aHxOYU58dW5kZWZpbmVkfG51bGwpJC87XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnRQb3MsIGFuY2VzdG9yLCBuYW1lLCBkb3QsIGNvbWJvLCByZWZpbmVtZW50LCBsYXN0RG90SW5kZXg7XG4gICAgICAgICAgICBzdGFydFBvcyA9IHRva2VuaXplci5wb3M7XG4gICAgICAgICAgICBhbmNlc3RvciA9ICcnO1xuICAgICAgICAgICAgd2hpbGUgKHRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnLi4vJykpIHtcbiAgICAgICAgICAgICAgICBhbmNlc3RvciArPSAnLi4vJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYW5jZXN0b3IpIHtcbiAgICAgICAgICAgICAgICBkb3QgPSB0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJy4nKSB8fCAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5hbWUgPSBnZXROYW1lKHRva2VuaXplcikgfHwgJyc7XG4gICAgICAgICAgICBpZiAoIWFuY2VzdG9yICYmICFkb3QgJiYgZ2xvYmFscy50ZXN0KG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdDogdHlwZXMuR0xPQkFMLFxuICAgICAgICAgICAgICAgICAgICB2OiBuYW1lXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lID09PSAndGhpcycgJiYgIWFuY2VzdG9yICYmICFkb3QpIHtcbiAgICAgICAgICAgICAgICBuYW1lID0gJy4nO1xuICAgICAgICAgICAgICAgIHN0YXJ0UG9zICs9IDM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21ibyA9IChhbmNlc3RvciB8fCBkb3QpICsgbmFtZTtcbiAgICAgICAgICAgIGlmICghY29tYm8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChyZWZpbmVtZW50ID0gZ2V0RG90UmVmaW5lbWVudCh0b2tlbml6ZXIpIHx8IGdldEFycmF5UmVmaW5lbWVudCh0b2tlbml6ZXIpKSB7XG4gICAgICAgICAgICAgICAgY29tYm8gKz0gcmVmaW5lbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJygnKSkge1xuICAgICAgICAgICAgICAgIGxhc3REb3RJbmRleCA9IGNvbWJvLmxhc3RJbmRleE9mKCcuJyk7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3REb3RJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tYm8gPSBjb21iby5zdWJzdHIoMCwgbGFzdERvdEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0UG9zICsgY29tYm8ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgLT0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHQ6IHR5cGVzLlJFRkVSRU5DRSxcbiAgICAgICAgICAgICAgICBuOiBjb21ib1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcywgcGFyc2VfVG9rZW5pemVyX3V0aWxzX21ha2VSZWdleE1hdGNoZXIsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX3NoYXJlZF9nZXROYW1lKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRQcmltYXJ5X2dldEJyYWNrZXRlZEV4cHJlc3Npb24gPSBmdW5jdGlvbiAodHlwZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQsIGV4cHI7XG4gICAgICAgICAgICBzdGFydCA9IHRva2VuaXplci5wb3M7XG4gICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnKCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBleHByID0gdG9rZW5pemVyLmdldEV4cHJlc3Npb24oKTtcbiAgICAgICAgICAgIGlmICghZXhwcikge1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCcpJykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHQ6IHR5cGVzLkJSQUNLRVRFRCxcbiAgICAgICAgICAgICAgICB4OiBleHByXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRQcmltYXJ5X19nZXRQcmltYXJ5ID0gZnVuY3Rpb24gKGdldExpdGVyYWwsIGdldFJlZmVyZW5jZSwgZ2V0QnJhY2tldGVkRXhwcmVzc2lvbikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRMaXRlcmFsKHRva2VuaXplcikgfHwgZ2V0UmVmZXJlbmNlKHRva2VuaXplcikgfHwgZ2V0QnJhY2tldGVkRXhwcmVzc2lvbih0b2tlbml6ZXIpO1xuICAgICAgICB9O1xuICAgIH0ocGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRMaXRlcmFsX19nZXRMaXRlcmFsLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRQcmltYXJ5X2dldFJlZmVyZW5jZSwgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9nZXRCcmFja2V0ZWRFeHByZXNzaW9uKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9zaGFyZWRfZ2V0UmVmaW5lbWVudCA9IGZ1bmN0aW9uICh0eXBlcywgZ2V0TmFtZSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGdldFJlZmluZW1lbnQodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQsIG5hbWUsIGV4cHI7XG4gICAgICAgICAgICBzdGFydCA9IHRva2VuaXplci5wb3M7XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBpZiAodG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCcuJykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgPSBnZXROYW1lKHRva2VuaXplcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQ6IHR5cGVzLlJFRklORU1FTlQsXG4gICAgICAgICAgICAgICAgICAgICAgICBuOiBuYW1lXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRva2VuaXplci5leHBlY3RlZCgnYSBwcm9wZXJ0eSBuYW1lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCdbJykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICAgICAgZXhwciA9IHRva2VuaXplci5nZXRFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFleHByKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuaXplci5leHBlY3RlZCgnYW4gZXhwcmVzc2lvbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJ10nKSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIuZXhwZWN0ZWQoJ1wiXVwiJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHQ6IHR5cGVzLlJFRklORU1FTlQsXG4gICAgICAgICAgICAgICAgICAgIHg6IGV4cHJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgfShjb25maWdfdHlwZXMsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX3NoYXJlZF9nZXROYW1lKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRNZW1iZXJPckludm9jYXRpb24gPSBmdW5jdGlvbiAodHlwZXMsIGdldFByaW1hcnksIGdldEV4cHJlc3Npb25MaXN0LCBnZXRSZWZpbmVtZW50KSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRva2VuaXplcikge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQsIGV4cHJlc3Npb24sIHJlZmluZW1lbnQsIGV4cHJlc3Npb25MaXN0O1xuICAgICAgICAgICAgZXhwcmVzc2lvbiA9IGdldFByaW1hcnkodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmICghZXhwcmVzc2lvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGV4cHJlc3Npb24pIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gdG9rZW5pemVyLnBvcztcbiAgICAgICAgICAgICAgICBpZiAocmVmaW5lbWVudCA9IGdldFJlZmluZW1lbnQodG9rZW5pemVyKSkge1xuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdDogdHlwZXMuTUVNQkVSLFxuICAgICAgICAgICAgICAgICAgICAgICAgeDogZXhwcmVzc2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHI6IHJlZmluZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuaXplci5nZXRTdHJpbmdNYXRjaCgnKCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbkxpc3QgPSBnZXRFeHByZXNzaW9uTGlzdCh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCcpJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQ6IHR5cGVzLklOVk9DQVRJT04sXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBleHByZXNzaW9uXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmIChleHByZXNzaW9uTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5vID0gZXhwcmVzc2lvbkxpc3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZXhwcmVzc2lvbjtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcywgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0UHJpbWFyeV9fZ2V0UHJpbWFyeSwgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fc2hhcmVkX2dldEV4cHJlc3Npb25MaXN0LCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9zaGFyZWRfZ2V0UmVmaW5lbWVudCk7XG52YXIgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0VHlwZU9mID0gZnVuY3Rpb24gKHR5cGVzLCBnZXRNZW1iZXJPckludm9jYXRpb24pIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBnZXRUeXBlT2YsIG1ha2VQcmVmaXhTZXF1ZW5jZU1hdGNoZXI7XG4gICAgICAgIG1ha2VQcmVmaXhTZXF1ZW5jZU1hdGNoZXIgPSBmdW5jdGlvbiAoc3ltYm9sLCBmYWxsdGhyb3VnaCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQsIGV4cHJlc3Npb247XG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goc3ltYm9sKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsbHRocm91Z2godG9rZW5pemVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uID0gdG9rZW5pemVyLmdldEV4cHJlc3Npb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoIWV4cHJlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5pemVyLmV4cGVjdGVkKCdhbiBleHByZXNzaW9uJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHM6IHN5bWJvbCxcbiAgICAgICAgICAgICAgICAgICAgbzogZXhwcmVzc2lvbixcbiAgICAgICAgICAgICAgICAgICAgdDogdHlwZXMuUFJFRklYX09QRVJBVE9SXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaSwgbGVuLCBtYXRjaGVyLCBwcmVmaXhPcGVyYXRvcnMsIGZhbGx0aHJvdWdoO1xuICAgICAgICAgICAgcHJlZml4T3BlcmF0b3JzID0gJyEgfiArIC0gdHlwZW9mJy5zcGxpdCgnICcpO1xuICAgICAgICAgICAgZmFsbHRocm91Z2ggPSBnZXRNZW1iZXJPckludm9jYXRpb247XG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBwcmVmaXhPcGVyYXRvcnMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBtYXRjaGVyID0gbWFrZVByZWZpeFNlcXVlbmNlTWF0Y2hlcihwcmVmaXhPcGVyYXRvcnNbaV0sIGZhbGx0aHJvdWdoKTtcbiAgICAgICAgICAgICAgICBmYWxsdGhyb3VnaCA9IG1hdGNoZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZXRUeXBlT2YgPSBmYWxsdGhyb3VnaDtcbiAgICAgICAgfSgpKTtcbiAgICAgICAgcmV0dXJuIGdldFR5cGVPZjtcbiAgICB9KGNvbmZpZ190eXBlcywgcGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0TWVtYmVyT3JJbnZvY2F0aW9uKTtcbnZhciBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRMb2dpY2FsT3IgPSBmdW5jdGlvbiAodHlwZXMsIGdldFR5cGVPZikge1xuICAgICAgICBcbiAgICAgICAgdmFyIGdldExvZ2ljYWxPciwgbWFrZUluZml4U2VxdWVuY2VNYXRjaGVyO1xuICAgICAgICBtYWtlSW5maXhTZXF1ZW5jZU1hdGNoZXIgPSBmdW5jdGlvbiAoc3ltYm9sLCBmYWxsdGhyb3VnaCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQsIGxlZnQsIHJpZ2h0O1xuICAgICAgICAgICAgICAgIGxlZnQgPSBmYWxsdGhyb3VnaCh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgICAgIGlmICghbGVmdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRva2VuaXplci5nZXRTdHJpbmdNYXRjaChzeW1ib2wpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxlZnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzeW1ib2wgPT09ICdpbicgJiYgL1thLXpBLVpfJDAtOV0vLnRlc3QodG9rZW5pemVyLnJlbWFpbmluZygpLmNoYXJBdCgwKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5pemVyLnBvcyA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGVmdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgICAgIHJpZ2h0ID0gdG9rZW5pemVyLmdldEV4cHJlc3Npb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxlZnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHQ6IHR5cGVzLklORklYX09QRVJBVE9SLFxuICAgICAgICAgICAgICAgICAgICBzOiBzeW1ib2wsXG4gICAgICAgICAgICAgICAgICAgIG86IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodFxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaSwgbGVuLCBtYXRjaGVyLCBpbmZpeE9wZXJhdG9ycywgZmFsbHRocm91Z2g7XG4gICAgICAgICAgICBpbmZpeE9wZXJhdG9ycyA9ICcqIC8gJSArIC0gPDwgPj4gPj4+IDwgPD0gPiA+PSBpbiBpbnN0YW5jZW9mID09ICE9ID09PSAhPT0gJiBeIHwgJiYgfHwnLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICBmYWxsdGhyb3VnaCA9IGdldFR5cGVPZjtcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGluZml4T3BlcmF0b3JzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hlciA9IG1ha2VJbmZpeFNlcXVlbmNlTWF0Y2hlcihpbmZpeE9wZXJhdG9yc1tpXSwgZmFsbHRocm91Z2gpO1xuICAgICAgICAgICAgICAgIGZhbGx0aHJvdWdoID0gbWF0Y2hlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdldExvZ2ljYWxPciA9IGZhbGx0aHJvdWdoO1xuICAgICAgICB9KCkpO1xuICAgICAgICByZXR1cm4gZ2V0TG9naWNhbE9yO1xuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRUeXBlT2YpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX2dldENvbmRpdGlvbmFsID0gZnVuY3Rpb24gKHR5cGVzLCBnZXRMb2dpY2FsT3IpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW5pemVyKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQsIGV4cHJlc3Npb24sIGlmVHJ1ZSwgaWZGYWxzZTtcbiAgICAgICAgICAgIGV4cHJlc3Npb24gPSBnZXRMb2dpY2FsT3IodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGlmICghZXhwcmVzc2lvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbml6ZXIucG9zO1xuICAgICAgICAgICAgdG9rZW5pemVyLmFsbG93V2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgaWYgKCF0b2tlbml6ZXIuZ2V0U3RyaW5nTWF0Y2goJz8nKSkge1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhwcmVzc2lvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGlmVHJ1ZSA9IHRva2VuaXplci5nZXRFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICBpZiAoIWlmVHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhwcmVzc2lvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2VuaXplci5hbGxvd1doaXRlc3BhY2UoKTtcbiAgICAgICAgICAgIGlmICghdG9rZW5pemVyLmdldFN0cmluZ01hdGNoKCc6JykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbml6ZXIucG9zID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4cHJlc3Npb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbml6ZXIuYWxsb3dXaGl0ZXNwYWNlKCk7XG4gICAgICAgICAgICBpZkZhbHNlID0gdG9rZW5pemVyLmdldEV4cHJlc3Npb24oKTtcbiAgICAgICAgICAgIGlmICghaWZGYWxzZSkge1xuICAgICAgICAgICAgICAgIHRva2VuaXplci5wb3MgPSBzdGFydDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhwcmVzc2lvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdDogdHlwZXMuQ09ORElUSU9OQUwsXG4gICAgICAgICAgICAgICAgbzogW1xuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uLFxuICAgICAgICAgICAgICAgICAgICBpZlRydWUsXG4gICAgICAgICAgICAgICAgICAgIGlmRmFsc2VcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9Ub2tlbml6ZXJfZ2V0RXhwcmVzc2lvbl9nZXRMb2dpY2FsT3IpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX19nZXRFeHByZXNzaW9uID0gZnVuY3Rpb24gKGdldENvbmRpdGlvbmFsKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldENvbmRpdGlvbmFsKHRoaXMpO1xuICAgICAgICB9O1xuICAgIH0ocGFyc2VfVG9rZW5pemVyX2dldEV4cHJlc3Npb25fZ2V0Q29uZGl0aW9uYWwpO1xudmFyIHBhcnNlX1Rva2VuaXplcl9fVG9rZW5pemVyID0gZnVuY3Rpb24gKGdldE11c3RhY2hlLCBnZXRDb21tZW50LCBnZXRUYWcsIGdldFRleHQsIGdldEV4cHJlc3Npb24sIGFsbG93V2hpdGVzcGFjZSwgZ2V0U3RyaW5nTWF0Y2gpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBUb2tlbml6ZXI7XG4gICAgICAgIFRva2VuaXplciA9IGZ1bmN0aW9uIChzdHIsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciB0b2tlbjtcbiAgICAgICAgICAgIHRoaXMuc3RyID0gc3RyO1xuICAgICAgICAgICAgdGhpcy5wb3MgPSAwO1xuICAgICAgICAgICAgdGhpcy5kZWxpbWl0ZXJzID0gb3B0aW9ucy5kZWxpbWl0ZXJzO1xuICAgICAgICAgICAgdGhpcy50cmlwbGVEZWxpbWl0ZXJzID0gb3B0aW9ucy50cmlwbGVEZWxpbWl0ZXJzO1xuICAgICAgICAgICAgdGhpcy50b2tlbnMgPSBbXTtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLnBvcyA8IHRoaXMuc3RyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gdGhpcy5nZXRUb2tlbigpO1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbiA9PT0gbnVsbCAmJiB0aGlzLnJlbWFpbmluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFpbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgVG9rZW5pemVyLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIGdldFRva2VuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRva2VuID0gdGhpcy5nZXRNdXN0YWNoZSgpIHx8IHRoaXMuZ2V0Q29tbWVudCgpIHx8IHRoaXMuZ2V0VGFnKCkgfHwgdGhpcy5nZXRUZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldE11c3RhY2hlOiBnZXRNdXN0YWNoZSxcbiAgICAgICAgICAgIGdldENvbW1lbnQ6IGdldENvbW1lbnQsXG4gICAgICAgICAgICBnZXRUYWc6IGdldFRhZyxcbiAgICAgICAgICAgIGdldFRleHQ6IGdldFRleHQsXG4gICAgICAgICAgICBnZXRFeHByZXNzaW9uOiBnZXRFeHByZXNzaW9uLFxuICAgICAgICAgICAgYWxsb3dXaGl0ZXNwYWNlOiBhbGxvd1doaXRlc3BhY2UsXG4gICAgICAgICAgICBnZXRTdHJpbmdNYXRjaDogZ2V0U3RyaW5nTWF0Y2gsXG4gICAgICAgICAgICByZW1haW5pbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHIuc3Vic3RyaW5nKHRoaXMucG9zKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhc3QyMCwgbmV4dDIwO1xuICAgICAgICAgICAgICAgIGxhc3QyMCA9IHRoaXMuc3RyLnN1YnN0cigwLCB0aGlzLnBvcykuc3Vic3RyKC0yMCk7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3QyMC5sZW5ndGggPT09IDIwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3QyMCA9ICcuLi4nICsgbGFzdDIwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0MjAgPSB0aGlzLnJlbWFpbmluZygpLnN1YnN0cigwLCAyMCk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHQyMC5sZW5ndGggPT09IDIwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQyMCA9IG5leHQyMCArICcuLi4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBwYXJzZSB0ZW1wbGF0ZTogJyArIChsYXN0MjAgPyBsYXN0MjAgKyAnPC0gJyA6ICcnKSArICdmYWlsZWQgYXQgY2hhcmFjdGVyICcgKyB0aGlzLnBvcyArICcgLT4nICsgbmV4dDIwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleHBlY3RlZDogZnVuY3Rpb24gKHRoaW5nKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlbWFpbmluZyA9IHRoaXMucmVtYWluaW5nKCkuc3Vic3RyKDAsIDQwKTtcbiAgICAgICAgICAgICAgICBpZiAocmVtYWluaW5nLmxlbmd0aCA9PT0gNDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nICs9ICcuLi4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Rva2VuaXplciBmYWlsZWQ6IHVuZXhwZWN0ZWQgc3RyaW5nIFwiJyArIHJlbWFpbmluZyArICdcIiAoZXhwZWN0ZWQgJyArIHRoaW5nICsgJyknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFRva2VuaXplcjtcbiAgICB9KHBhcnNlX1Rva2VuaXplcl9nZXRNdXN0YWNoZV9fZ2V0TXVzdGFjaGUsIHBhcnNlX1Rva2VuaXplcl9nZXRDb21tZW50X2dldENvbW1lbnQsIHBhcnNlX1Rva2VuaXplcl9nZXRUYWdfX2dldFRhZywgcGFyc2VfVG9rZW5pemVyX2dldFRleHRfX2dldFRleHQsIHBhcnNlX1Rva2VuaXplcl9nZXRFeHByZXNzaW9uX19nZXRFeHByZXNzaW9uLCBwYXJzZV9Ub2tlbml6ZXJfdXRpbHNfYWxsb3dXaGl0ZXNwYWNlLCBwYXJzZV9Ub2tlbml6ZXJfdXRpbHNfZ2V0U3RyaW5nTWF0Y2gpO1xudmFyIHBhcnNlX3Rva2VuaXplID0gZnVuY3Rpb24gKHN0cmlwSHRtbENvbW1lbnRzLCBzdHJpcFN0YW5kYWxvbmVzLCBzdHJpcENvbW1lbnRUb2tlbnMsIFRva2VuaXplciwgY2lyY3VsYXIpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciB0b2tlbml6ZSwgUmFjdGl2ZTtcbiAgICAgICAgY2lyY3VsYXIucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBSYWN0aXZlID0gY2lyY3VsYXIuUmFjdGl2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRva2VuaXplID0gZnVuY3Rpb24gKHRlbXBsYXRlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW5pemVyLCB0b2tlbnM7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnN0cmlwQ29tbWVudHMgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGUgPSBzdHJpcEh0bWxDb21tZW50cyh0ZW1wbGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbml6ZXIgPSBuZXcgVG9rZW5pemVyKHRlbXBsYXRlLCB7XG4gICAgICAgICAgICAgICAgZGVsaW1pdGVyczogb3B0aW9ucy5kZWxpbWl0ZXJzIHx8IChSYWN0aXZlID8gUmFjdGl2ZS5kZWxpbWl0ZXJzIDogW1xuICAgICAgICAgICAgICAgICAgICAne3snLFxuICAgICAgICAgICAgICAgICAgICAnfX0nXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgdHJpcGxlRGVsaW1pdGVyczogb3B0aW9ucy50cmlwbGVEZWxpbWl0ZXJzIHx8IChSYWN0aXZlID8gUmFjdGl2ZS50cmlwbGVEZWxpbWl0ZXJzIDogW1xuICAgICAgICAgICAgICAgICAgICAne3t7JyxcbiAgICAgICAgICAgICAgICAgICAgJ319fSdcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0b2tlbnMgPSB0b2tlbml6ZXIudG9rZW5zO1xuICAgICAgICAgICAgc3RyaXBTdGFuZGFsb25lcyh0b2tlbnMpO1xuICAgICAgICAgICAgc3RyaXBDb21tZW50VG9rZW5zKHRva2Vucyk7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW5zO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdG9rZW5pemU7XG4gICAgfShwYXJzZV91dGlsc19zdHJpcEh0bWxDb21tZW50cywgcGFyc2VfdXRpbHNfc3RyaXBTdGFuZGFsb25lcywgcGFyc2VfdXRpbHNfc3RyaXBDb21tZW50VG9rZW5zLCBwYXJzZV9Ub2tlbml6ZXJfX1Rva2VuaXplciwgY2lyY3VsYXIpO1xudmFyIHBhcnNlX1BhcnNlcl9nZXRUZXh0X1RleHRTdHViX19UZXh0U3R1YiA9IGZ1bmN0aW9uICh0eXBlcykge1xuICAgICAgICBcbiAgICAgICAgdmFyIFRleHRTdHViLCBodG1sRW50aXRpZXMsIGNvbnRyb2xDaGFyYWN0ZXJzLCBuYW1lZEVudGl0eVBhdHRlcm4sIGhleEVudGl0eVBhdHRlcm4sIGRlY2ltYWxFbnRpdHlQYXR0ZXJuLCB2YWxpZGF0ZUNvZGUsIGRlY29kZUNoYXJhY3RlclJlZmVyZW5jZXMsIHdoaXRlc3BhY2U7XG4gICAgICAgIFRleHRTdHViID0gZnVuY3Rpb24gKHRva2VuLCBwcmVzZXJ2ZVdoaXRlc3BhY2UpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dCA9IHByZXNlcnZlV2hpdGVzcGFjZSA/IHRva2VuLnZhbHVlIDogdG9rZW4udmFsdWUucmVwbGFjZSh3aGl0ZXNwYWNlLCAnICcpO1xuICAgICAgICB9O1xuICAgICAgICBUZXh0U3R1Yi5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlcy5URVhULFxuICAgICAgICAgICAgdG9KU09OOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlZCB8fCAodGhpcy5kZWNvZGVkID0gZGVjb2RlQ2hhcmFjdGVyUmVmZXJlbmNlcyh0aGlzLnRleHQpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGh0bWxFbnRpdGllcyA9IHtcbiAgICAgICAgICAgIHF1b3Q6IDM0LFxuICAgICAgICAgICAgYW1wOiAzOCxcbiAgICAgICAgICAgIGFwb3M6IDM5LFxuICAgICAgICAgICAgbHQ6IDYwLFxuICAgICAgICAgICAgZ3Q6IDYyLFxuICAgICAgICAgICAgbmJzcDogMTYwLFxuICAgICAgICAgICAgaWV4Y2w6IDE2MSxcbiAgICAgICAgICAgIGNlbnQ6IDE2MixcbiAgICAgICAgICAgIHBvdW5kOiAxNjMsXG4gICAgICAgICAgICBjdXJyZW46IDE2NCxcbiAgICAgICAgICAgIHllbjogMTY1LFxuICAgICAgICAgICAgYnJ2YmFyOiAxNjYsXG4gICAgICAgICAgICBzZWN0OiAxNjcsXG4gICAgICAgICAgICB1bWw6IDE2OCxcbiAgICAgICAgICAgIGNvcHk6IDE2OSxcbiAgICAgICAgICAgIG9yZGY6IDE3MCxcbiAgICAgICAgICAgIGxhcXVvOiAxNzEsXG4gICAgICAgICAgICBub3Q6IDE3MixcbiAgICAgICAgICAgIHNoeTogMTczLFxuICAgICAgICAgICAgcmVnOiAxNzQsXG4gICAgICAgICAgICBtYWNyOiAxNzUsXG4gICAgICAgICAgICBkZWc6IDE3NixcbiAgICAgICAgICAgIHBsdXNtbjogMTc3LFxuICAgICAgICAgICAgc3VwMjogMTc4LFxuICAgICAgICAgICAgc3VwMzogMTc5LFxuICAgICAgICAgICAgYWN1dGU6IDE4MCxcbiAgICAgICAgICAgIG1pY3JvOiAxODEsXG4gICAgICAgICAgICBwYXJhOiAxODIsXG4gICAgICAgICAgICBtaWRkb3Q6IDE4MyxcbiAgICAgICAgICAgIGNlZGlsOiAxODQsXG4gICAgICAgICAgICBzdXAxOiAxODUsXG4gICAgICAgICAgICBvcmRtOiAxODYsXG4gICAgICAgICAgICByYXF1bzogMTg3LFxuICAgICAgICAgICAgZnJhYzE0OiAxODgsXG4gICAgICAgICAgICBmcmFjMTI6IDE4OSxcbiAgICAgICAgICAgIGZyYWMzNDogMTkwLFxuICAgICAgICAgICAgaXF1ZXN0OiAxOTEsXG4gICAgICAgICAgICBBZ3JhdmU6IDE5MixcbiAgICAgICAgICAgIEFhY3V0ZTogMTkzLFxuICAgICAgICAgICAgQWNpcmM6IDE5NCxcbiAgICAgICAgICAgIEF0aWxkZTogMTk1LFxuICAgICAgICAgICAgQXVtbDogMTk2LFxuICAgICAgICAgICAgQXJpbmc6IDE5NyxcbiAgICAgICAgICAgIEFFbGlnOiAxOTgsXG4gICAgICAgICAgICBDY2VkaWw6IDE5OSxcbiAgICAgICAgICAgIEVncmF2ZTogMjAwLFxuICAgICAgICAgICAgRWFjdXRlOiAyMDEsXG4gICAgICAgICAgICBFY2lyYzogMjAyLFxuICAgICAgICAgICAgRXVtbDogMjAzLFxuICAgICAgICAgICAgSWdyYXZlOiAyMDQsXG4gICAgICAgICAgICBJYWN1dGU6IDIwNSxcbiAgICAgICAgICAgIEljaXJjOiAyMDYsXG4gICAgICAgICAgICBJdW1sOiAyMDcsXG4gICAgICAgICAgICBFVEg6IDIwOCxcbiAgICAgICAgICAgIE50aWxkZTogMjA5LFxuICAgICAgICAgICAgT2dyYXZlOiAyMTAsXG4gICAgICAgICAgICBPYWN1dGU6IDIxMSxcbiAgICAgICAgICAgIE9jaXJjOiAyMTIsXG4gICAgICAgICAgICBPdGlsZGU6IDIxMyxcbiAgICAgICAgICAgIE91bWw6IDIxNCxcbiAgICAgICAgICAgIHRpbWVzOiAyMTUsXG4gICAgICAgICAgICBPc2xhc2g6IDIxNixcbiAgICAgICAgICAgIFVncmF2ZTogMjE3LFxuICAgICAgICAgICAgVWFjdXRlOiAyMTgsXG4gICAgICAgICAgICBVY2lyYzogMjE5LFxuICAgICAgICAgICAgVXVtbDogMjIwLFxuICAgICAgICAgICAgWWFjdXRlOiAyMjEsXG4gICAgICAgICAgICBUSE9STjogMjIyLFxuICAgICAgICAgICAgc3psaWc6IDIyMyxcbiAgICAgICAgICAgIGFncmF2ZTogMjI0LFxuICAgICAgICAgICAgYWFjdXRlOiAyMjUsXG4gICAgICAgICAgICBhY2lyYzogMjI2LFxuICAgICAgICAgICAgYXRpbGRlOiAyMjcsXG4gICAgICAgICAgICBhdW1sOiAyMjgsXG4gICAgICAgICAgICBhcmluZzogMjI5LFxuICAgICAgICAgICAgYWVsaWc6IDIzMCxcbiAgICAgICAgICAgIGNjZWRpbDogMjMxLFxuICAgICAgICAgICAgZWdyYXZlOiAyMzIsXG4gICAgICAgICAgICBlYWN1dGU6IDIzMyxcbiAgICAgICAgICAgIGVjaXJjOiAyMzQsXG4gICAgICAgICAgICBldW1sOiAyMzUsXG4gICAgICAgICAgICBpZ3JhdmU6IDIzNixcbiAgICAgICAgICAgIGlhY3V0ZTogMjM3LFxuICAgICAgICAgICAgaWNpcmM6IDIzOCxcbiAgICAgICAgICAgIGl1bWw6IDIzOSxcbiAgICAgICAgICAgIGV0aDogMjQwLFxuICAgICAgICAgICAgbnRpbGRlOiAyNDEsXG4gICAgICAgICAgICBvZ3JhdmU6IDI0MixcbiAgICAgICAgICAgIG9hY3V0ZTogMjQzLFxuICAgICAgICAgICAgb2NpcmM6IDI0NCxcbiAgICAgICAgICAgIG90aWxkZTogMjQ1LFxuICAgICAgICAgICAgb3VtbDogMjQ2LFxuICAgICAgICAgICAgZGl2aWRlOiAyNDcsXG4gICAgICAgICAgICBvc2xhc2g6IDI0OCxcbiAgICAgICAgICAgIHVncmF2ZTogMjQ5LFxuICAgICAgICAgICAgdWFjdXRlOiAyNTAsXG4gICAgICAgICAgICB1Y2lyYzogMjUxLFxuICAgICAgICAgICAgdXVtbDogMjUyLFxuICAgICAgICAgICAgeWFjdXRlOiAyNTMsXG4gICAgICAgICAgICB0aG9ybjogMjU0LFxuICAgICAgICAgICAgeXVtbDogMjU1LFxuICAgICAgICAgICAgT0VsaWc6IDMzOCxcbiAgICAgICAgICAgIG9lbGlnOiAzMzksXG4gICAgICAgICAgICBTY2Fyb246IDM1MixcbiAgICAgICAgICAgIHNjYXJvbjogMzUzLFxuICAgICAgICAgICAgWXVtbDogMzc2LFxuICAgICAgICAgICAgZm5vZjogNDAyLFxuICAgICAgICAgICAgY2lyYzogNzEwLFxuICAgICAgICAgICAgdGlsZGU6IDczMixcbiAgICAgICAgICAgIEFscGhhOiA5MTMsXG4gICAgICAgICAgICBCZXRhOiA5MTQsXG4gICAgICAgICAgICBHYW1tYTogOTE1LFxuICAgICAgICAgICAgRGVsdGE6IDkxNixcbiAgICAgICAgICAgIEVwc2lsb246IDkxNyxcbiAgICAgICAgICAgIFpldGE6IDkxOCxcbiAgICAgICAgICAgIEV0YTogOTE5LFxuICAgICAgICAgICAgVGhldGE6IDkyMCxcbiAgICAgICAgICAgIElvdGE6IDkyMSxcbiAgICAgICAgICAgIEthcHBhOiA5MjIsXG4gICAgICAgICAgICBMYW1iZGE6IDkyMyxcbiAgICAgICAgICAgIE11OiA5MjQsXG4gICAgICAgICAgICBOdTogOTI1LFxuICAgICAgICAgICAgWGk6IDkyNixcbiAgICAgICAgICAgIE9taWNyb246IDkyNyxcbiAgICAgICAgICAgIFBpOiA5MjgsXG4gICAgICAgICAgICBSaG86IDkyOSxcbiAgICAgICAgICAgIFNpZ21hOiA5MzEsXG4gICAgICAgICAgICBUYXU6IDkzMixcbiAgICAgICAgICAgIFVwc2lsb246IDkzMyxcbiAgICAgICAgICAgIFBoaTogOTM0LFxuICAgICAgICAgICAgQ2hpOiA5MzUsXG4gICAgICAgICAgICBQc2k6IDkzNixcbiAgICAgICAgICAgIE9tZWdhOiA5MzcsXG4gICAgICAgICAgICBhbHBoYTogOTQ1LFxuICAgICAgICAgICAgYmV0YTogOTQ2LFxuICAgICAgICAgICAgZ2FtbWE6IDk0NyxcbiAgICAgICAgICAgIGRlbHRhOiA5NDgsXG4gICAgICAgICAgICBlcHNpbG9uOiA5NDksXG4gICAgICAgICAgICB6ZXRhOiA5NTAsXG4gICAgICAgICAgICBldGE6IDk1MSxcbiAgICAgICAgICAgIHRoZXRhOiA5NTIsXG4gICAgICAgICAgICBpb3RhOiA5NTMsXG4gICAgICAgICAgICBrYXBwYTogOTU0LFxuICAgICAgICAgICAgbGFtYmRhOiA5NTUsXG4gICAgICAgICAgICBtdTogOTU2LFxuICAgICAgICAgICAgbnU6IDk1NyxcbiAgICAgICAgICAgIHhpOiA5NTgsXG4gICAgICAgICAgICBvbWljcm9uOiA5NTksXG4gICAgICAgICAgICBwaTogOTYwLFxuICAgICAgICAgICAgcmhvOiA5NjEsXG4gICAgICAgICAgICBzaWdtYWY6IDk2MixcbiAgICAgICAgICAgIHNpZ21hOiA5NjMsXG4gICAgICAgICAgICB0YXU6IDk2NCxcbiAgICAgICAgICAgIHVwc2lsb246IDk2NSxcbiAgICAgICAgICAgIHBoaTogOTY2LFxuICAgICAgICAgICAgY2hpOiA5NjcsXG4gICAgICAgICAgICBwc2k6IDk2OCxcbiAgICAgICAgICAgIG9tZWdhOiA5NjksXG4gICAgICAgICAgICB0aGV0YXN5bTogOTc3LFxuICAgICAgICAgICAgdXBzaWg6IDk3OCxcbiAgICAgICAgICAgIHBpdjogOTgyLFxuICAgICAgICAgICAgZW5zcDogODE5NCxcbiAgICAgICAgICAgIGVtc3A6IDgxOTUsXG4gICAgICAgICAgICB0aGluc3A6IDgyMDEsXG4gICAgICAgICAgICB6d25qOiA4MjA0LFxuICAgICAgICAgICAgendqOiA4MjA1LFxuICAgICAgICAgICAgbHJtOiA4MjA2LFxuICAgICAgICAgICAgcmxtOiA4MjA3LFxuICAgICAgICAgICAgbmRhc2g6IDgyMTEsXG4gICAgICAgICAgICBtZGFzaDogODIxMixcbiAgICAgICAgICAgIGxzcXVvOiA4MjE2LFxuICAgICAgICAgICAgcnNxdW86IDgyMTcsXG4gICAgICAgICAgICBzYnF1bzogODIxOCxcbiAgICAgICAgICAgIGxkcXVvOiA4MjIwLFxuICAgICAgICAgICAgcmRxdW86IDgyMjEsXG4gICAgICAgICAgICBiZHF1bzogODIyMixcbiAgICAgICAgICAgIGRhZ2dlcjogODIyNCxcbiAgICAgICAgICAgIERhZ2dlcjogODIyNSxcbiAgICAgICAgICAgIGJ1bGw6IDgyMjYsXG4gICAgICAgICAgICBoZWxsaXA6IDgyMzAsXG4gICAgICAgICAgICBwZXJtaWw6IDgyNDAsXG4gICAgICAgICAgICBwcmltZTogODI0MixcbiAgICAgICAgICAgIFByaW1lOiA4MjQzLFxuICAgICAgICAgICAgbHNhcXVvOiA4MjQ5LFxuICAgICAgICAgICAgcnNhcXVvOiA4MjUwLFxuICAgICAgICAgICAgb2xpbmU6IDgyNTQsXG4gICAgICAgICAgICBmcmFzbDogODI2MCxcbiAgICAgICAgICAgIGV1cm86IDgzNjQsXG4gICAgICAgICAgICBpbWFnZTogODQ2NSxcbiAgICAgICAgICAgIHdlaWVycDogODQ3MixcbiAgICAgICAgICAgIHJlYWw6IDg0NzYsXG4gICAgICAgICAgICB0cmFkZTogODQ4MixcbiAgICAgICAgICAgIGFsZWZzeW06IDg1MDEsXG4gICAgICAgICAgICBsYXJyOiA4NTkyLFxuICAgICAgICAgICAgdWFycjogODU5MyxcbiAgICAgICAgICAgIHJhcnI6IDg1OTQsXG4gICAgICAgICAgICBkYXJyOiA4NTk1LFxuICAgICAgICAgICAgaGFycjogODU5NixcbiAgICAgICAgICAgIGNyYXJyOiA4NjI5LFxuICAgICAgICAgICAgbEFycjogODY1NixcbiAgICAgICAgICAgIHVBcnI6IDg2NTcsXG4gICAgICAgICAgICByQXJyOiA4NjU4LFxuICAgICAgICAgICAgZEFycjogODY1OSxcbiAgICAgICAgICAgIGhBcnI6IDg2NjAsXG4gICAgICAgICAgICBmb3JhbGw6IDg3MDQsXG4gICAgICAgICAgICBwYXJ0OiA4NzA2LFxuICAgICAgICAgICAgZXhpc3Q6IDg3MDcsXG4gICAgICAgICAgICBlbXB0eTogODcwOSxcbiAgICAgICAgICAgIG5hYmxhOiA4NzExLFxuICAgICAgICAgICAgaXNpbjogODcxMixcbiAgICAgICAgICAgIG5vdGluOiA4NzEzLFxuICAgICAgICAgICAgbmk6IDg3MTUsXG4gICAgICAgICAgICBwcm9kOiA4NzE5LFxuICAgICAgICAgICAgc3VtOiA4NzIxLFxuICAgICAgICAgICAgbWludXM6IDg3MjIsXG4gICAgICAgICAgICBsb3dhc3Q6IDg3MjcsXG4gICAgICAgICAgICByYWRpYzogODczMCxcbiAgICAgICAgICAgIHByb3A6IDg3MzMsXG4gICAgICAgICAgICBpbmZpbjogODczNCxcbiAgICAgICAgICAgIGFuZzogODczNixcbiAgICAgICAgICAgIGFuZDogODc0MyxcbiAgICAgICAgICAgIG9yOiA4NzQ0LFxuICAgICAgICAgICAgY2FwOiA4NzQ1LFxuICAgICAgICAgICAgY3VwOiA4NzQ2LFxuICAgICAgICAgICAgJ2ludCc6IDg3NDcsXG4gICAgICAgICAgICB0aGVyZTQ6IDg3NTYsXG4gICAgICAgICAgICBzaW06IDg3NjQsXG4gICAgICAgICAgICBjb25nOiA4NzczLFxuICAgICAgICAgICAgYXN5bXA6IDg3NzYsXG4gICAgICAgICAgICBuZTogODgwMCxcbiAgICAgICAgICAgIGVxdWl2OiA4ODAxLFxuICAgICAgICAgICAgbGU6IDg4MDQsXG4gICAgICAgICAgICBnZTogODgwNSxcbiAgICAgICAgICAgIHN1YjogODgzNCxcbiAgICAgICAgICAgIHN1cDogODgzNSxcbiAgICAgICAgICAgIG5zdWI6IDg4MzYsXG4gICAgICAgICAgICBzdWJlOiA4ODM4LFxuICAgICAgICAgICAgc3VwZTogODgzOSxcbiAgICAgICAgICAgIG9wbHVzOiA4ODUzLFxuICAgICAgICAgICAgb3RpbWVzOiA4ODU1LFxuICAgICAgICAgICAgcGVycDogODg2OSxcbiAgICAgICAgICAgIHNkb3Q6IDg5MDEsXG4gICAgICAgICAgICBsY2VpbDogODk2OCxcbiAgICAgICAgICAgIHJjZWlsOiA4OTY5LFxuICAgICAgICAgICAgbGZsb29yOiA4OTcwLFxuICAgICAgICAgICAgcmZsb29yOiA4OTcxLFxuICAgICAgICAgICAgbGFuZzogOTAwMSxcbiAgICAgICAgICAgIHJhbmc6IDkwMDIsXG4gICAgICAgICAgICBsb3o6IDk2NzQsXG4gICAgICAgICAgICBzcGFkZXM6IDk4MjQsXG4gICAgICAgICAgICBjbHViczogOTgyNyxcbiAgICAgICAgICAgIGhlYXJ0czogOTgyOSxcbiAgICAgICAgICAgIGRpYW1zOiA5ODMwXG4gICAgICAgIH07XG4gICAgICAgIGNvbnRyb2xDaGFyYWN0ZXJzID0gW1xuICAgICAgICAgICAgODM2NCxcbiAgICAgICAgICAgIDEyOSxcbiAgICAgICAgICAgIDgyMTgsXG4gICAgICAgICAgICA0MDIsXG4gICAgICAgICAgICA4MjIyLFxuICAgICAgICAgICAgODIzMCxcbiAgICAgICAgICAgIDgyMjQsXG4gICAgICAgICAgICA4MjI1LFxuICAgICAgICAgICAgNzEwLFxuICAgICAgICAgICAgODI0MCxcbiAgICAgICAgICAgIDM1MixcbiAgICAgICAgICAgIDgyNDksXG4gICAgICAgICAgICAzMzgsXG4gICAgICAgICAgICAxNDEsXG4gICAgICAgICAgICAzODEsXG4gICAgICAgICAgICAxNDMsXG4gICAgICAgICAgICAxNDQsXG4gICAgICAgICAgICA4MjE2LFxuICAgICAgICAgICAgODIxNyxcbiAgICAgICAgICAgIDgyMjAsXG4gICAgICAgICAgICA4MjIxLFxuICAgICAgICAgICAgODIyNixcbiAgICAgICAgICAgIDgyMTEsXG4gICAgICAgICAgICA4MjEyLFxuICAgICAgICAgICAgNzMyLFxuICAgICAgICAgICAgODQ4MixcbiAgICAgICAgICAgIDM1MyxcbiAgICAgICAgICAgIDgyNTAsXG4gICAgICAgICAgICAzMzksXG4gICAgICAgICAgICAxNTcsXG4gICAgICAgICAgICAzODIsXG4gICAgICAgICAgICAzNzZcbiAgICAgICAgXTtcbiAgICAgICAgbmFtZWRFbnRpdHlQYXR0ZXJuID0gbmV3IFJlZ0V4cCgnJignICsgT2JqZWN0LmtleXMoaHRtbEVudGl0aWVzKS5qb2luKCd8JykgKyAnKTs/JywgJ2cnKTtcbiAgICAgICAgaGV4RW50aXR5UGF0dGVybiA9IC8mI3goWzAtOV0rKTs/L2c7XG4gICAgICAgIGRlY2ltYWxFbnRpdHlQYXR0ZXJuID0gLyYjKFswLTldKyk7Py9nO1xuICAgICAgICB2YWxpZGF0ZUNvZGUgPSBmdW5jdGlvbiAoY29kZSkge1xuICAgICAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDY1NTMzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvZGUgPT09IDEwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDMyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvZGUgPCAxMjgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb2RlIDw9IDE1OSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250cm9sQ2hhcmFjdGVyc1tjb2RlIC0gMTI4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb2RlIDwgNTUyOTYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb2RlIDw9IDU3MzQzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDY1NTMzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvZGUgPD0gNjU1MzUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiA2NTUzMztcbiAgICAgICAgfTtcbiAgICAgICAgZGVjb2RlQ2hhcmFjdGVyUmVmZXJlbmNlcyA9IGZ1bmN0aW9uIChodG1sKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICAgICAgcmVzdWx0ID0gaHRtbC5yZXBsYWNlKG5hbWVkRW50aXR5UGF0dGVybiwgZnVuY3Rpb24gKG1hdGNoLCBuYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKGh0bWxFbnRpdGllc1tuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShodG1sRW50aXRpZXNbbmFtZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKGhleEVudGl0eVBhdHRlcm4sIGZ1bmN0aW9uIChtYXRjaCwgaGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUodmFsaWRhdGVDb2RlKHBhcnNlSW50KGhleCwgMTYpKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKGRlY2ltYWxFbnRpdHlQYXR0ZXJuLCBmdW5jdGlvbiAobWF0Y2gsIGNoYXJDb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUodmFsaWRhdGVDb2RlKGNoYXJDb2RlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHdoaXRlc3BhY2UgPSAvXFxzKy9nO1xuICAgICAgICByZXR1cm4gVGV4dFN0dWI7XG4gICAgfShjb25maWdfdHlwZXMpO1xudmFyIHBhcnNlX1BhcnNlcl9nZXRUZXh0X19nZXRUZXh0ID0gZnVuY3Rpb24gKHR5cGVzLCBUZXh0U3R1Yikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IHR5cGVzLlRFWFQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcyArPSAxO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVGV4dFN0dWIodG9rZW4sIHRoaXMucHJlc2VydmVXaGl0ZXNwYWNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9QYXJzZXJfZ2V0VGV4dF9UZXh0U3R1Yl9fVGV4dFN0dWIpO1xudmFyIHBhcnNlX1BhcnNlcl9nZXRDb21tZW50X0NvbW1lbnRTdHViX19Db21tZW50U3R1YiA9IGZ1bmN0aW9uICh0eXBlcykge1xuICAgICAgICBcbiAgICAgICAgdmFyIENvbW1lbnRTdHViO1xuICAgICAgICBDb21tZW50U3R1YiA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gdG9rZW4uY29udGVudDtcbiAgICAgICAgfTtcbiAgICAgICAgQ29tbWVudFN0dWIucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdG9KU09OOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdDogdHlwZXMuQ09NTUVOVCxcbiAgICAgICAgICAgICAgICAgICAgZjogdGhpcy5jb250ZW50XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnPCEtLScgKyB0aGlzLmNvbnRlbnQgKyAnLS0+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIENvbW1lbnRTdHViO1xuICAgIH0oY29uZmlnX3R5cGVzKTtcbnZhciBwYXJzZV9QYXJzZXJfZ2V0Q29tbWVudF9fZ2V0Q29tbWVudCA9IGZ1bmN0aW9uICh0eXBlcywgQ29tbWVudFN0dWIpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIGlmICh0b2tlbi50eXBlID09PSB0eXBlcy5DT01NRU5UKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbW1lbnRTdHViKHRva2VuLCB0aGlzLnByZXNlcnZlV2hpdGVzcGFjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcywgcGFyc2VfUGFyc2VyX2dldENvbW1lbnRfQ29tbWVudFN0dWJfX0NvbW1lbnRTdHViKTtcbnZhciBwYXJzZV9QYXJzZXJfZ2V0TXVzdGFjaGVfRXhwcmVzc2lvblN0dWJfX0V4cHJlc3Npb25TdHViID0gZnVuY3Rpb24gKHR5cGVzLCBpc09iamVjdCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIEV4cHJlc3Npb25TdHViLCBnZXRSZWZzLCBzdHJpbmdpZnk7XG4gICAgICAgIEV4cHJlc3Npb25TdHViID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICB0aGlzLnJlZnMgPSBbXTtcbiAgICAgICAgICAgIGdldFJlZnModG9rZW4sIHRoaXMucmVmcyk7XG4gICAgICAgICAgICB0aGlzLnN0ciA9IHN0cmluZ2lmeSh0b2tlbiwgdGhpcy5yZWZzKTtcbiAgICAgICAgfTtcbiAgICAgICAgRXhwcmVzc2lvblN0dWIucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdG9KU09OOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuanNvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5qc29uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmpzb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHI6IHRoaXMucmVmcyxcbiAgICAgICAgICAgICAgICAgICAgczogdGhpcy5zdHJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmpzb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGdldFJlZnMgPSBmdW5jdGlvbiAodG9rZW4sIHJlZnMpIHtcbiAgICAgICAgICAgIHZhciBpLCBsaXN0O1xuICAgICAgICAgICAgaWYgKHRva2VuLnQgPT09IHR5cGVzLlJFRkVSRU5DRSkge1xuICAgICAgICAgICAgICAgIGlmIChyZWZzLmluZGV4T2YodG9rZW4ubikgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZnMudW5zaGlmdCh0b2tlbi5uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaXN0ID0gdG9rZW4ubyB8fCB0b2tlbi5tO1xuICAgICAgICAgICAgaWYgKGxpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0UmVmcyhsaXN0LCByZWZzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpID0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFJlZnMobGlzdFtpXSwgcmVmcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW4ueCkge1xuICAgICAgICAgICAgICAgIGdldFJlZnModG9rZW4ueCwgcmVmcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW4ucikge1xuICAgICAgICAgICAgICAgIGdldFJlZnModG9rZW4uciwgcmVmcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW4udikge1xuICAgICAgICAgICAgICAgIGdldFJlZnModG9rZW4udiwgcmVmcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHN0cmluZ2lmeSA9IGZ1bmN0aW9uICh0b2tlbiwgcmVmcykge1xuICAgICAgICAgICAgdmFyIG1hcCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZ2lmeShpdGVtLCByZWZzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzd2l0Y2ggKHRva2VuLnQpIHtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuQk9PTEVBTl9MSVRFUkFMOlxuICAgICAgICAgICAgY2FzZSB0eXBlcy5HTE9CQUw6XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk5VTUJFUl9MSVRFUkFMOlxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbi52O1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5TVFJJTkdfTElURVJBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1xcJycgKyB0b2tlbi52LnJlcGxhY2UoLycvZywgJ1xcXFxcXCcnKSArICdcXCcnO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5BUlJBWV9MSVRFUkFMOlxuICAgICAgICAgICAgICAgIHJldHVybiAnWycgKyAodG9rZW4ubSA/IHRva2VuLm0ubWFwKG1hcCkuam9pbignLCcpIDogJycpICsgJ10nO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PQkpFQ1RfTElURVJBTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3snICsgKHRva2VuLm0gPyB0b2tlbi5tLm1hcChtYXApLmpvaW4oJywnKSA6ICcnKSArICd9JztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuS0VZX1ZBTFVFX1BBSVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuLmsgKyAnOicgKyBzdHJpbmdpZnkodG9rZW4udiwgcmVmcyk7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLlBSRUZJWF9PUEVSQVRPUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRva2VuLnMgPT09ICd0eXBlb2YnID8gJ3R5cGVvZiAnIDogdG9rZW4ucykgKyBzdHJpbmdpZnkodG9rZW4ubywgcmVmcyk7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLklORklYX09QRVJBVE9SOlxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmdpZnkodG9rZW4ub1swXSwgcmVmcykgKyAodG9rZW4ucy5zdWJzdHIoMCwgMikgPT09ICdpbicgPyAnICcgKyB0b2tlbi5zICsgJyAnIDogdG9rZW4ucykgKyBzdHJpbmdpZnkodG9rZW4ub1sxXSwgcmVmcyk7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLklOVk9DQVRJT046XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZ2lmeSh0b2tlbi54LCByZWZzKSArICcoJyArICh0b2tlbi5vID8gdG9rZW4uby5tYXAobWFwKS5qb2luKCcsJykgOiAnJykgKyAnKSc7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkJSQUNLRVRFRDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJygnICsgc3RyaW5naWZ5KHRva2VuLngsIHJlZnMpICsgJyknO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5NRU1CRVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZ2lmeSh0b2tlbi54LCByZWZzKSArIHN0cmluZ2lmeSh0b2tlbi5yLCByZWZzKTtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuUkVGSU5FTUVOVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4ubiA/ICcuJyArIHRva2VuLm4gOiAnWycgKyBzdHJpbmdpZnkodG9rZW4ueCwgcmVmcykgKyAnXSc7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkNPTkRJVElPTkFMOlxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmdpZnkodG9rZW4ub1swXSwgcmVmcykgKyAnPycgKyBzdHJpbmdpZnkodG9rZW4ub1sxXSwgcmVmcykgKyAnOicgKyBzdHJpbmdpZnkodG9rZW4ub1syXSwgcmVmcyk7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLlJFRkVSRU5DRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJyR7JyArIHJlZnMuaW5kZXhPZih0b2tlbi5uKSArICd9JztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3Qgc3RyaW5naWZ5IGV4cHJlc3Npb24gdG9rZW4uIFRoaXMgZXJyb3IgaXMgdW5leHBlY3RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRXhwcmVzc2lvblN0dWI7XG4gICAgfShjb25maWdfdHlwZXMsIHV0aWxzX2lzT2JqZWN0KTtcbnZhciBwYXJzZV9QYXJzZXJfZ2V0TXVzdGFjaGVfTXVzdGFjaGVTdHViX19NdXN0YWNoZVN0dWIgPSBmdW5jdGlvbiAodHlwZXMsIEV4cHJlc3Npb25TdHViKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgTXVzdGFjaGVTdHViID0gZnVuY3Rpb24gKHRva2VuLCBwYXJzZXIpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHRva2VuLnR5cGUgPT09IHR5cGVzLlRSSVBMRSA/IHR5cGVzLlRSSVBMRSA6IHRva2VuLm11c3RhY2hlVHlwZTtcbiAgICAgICAgICAgIGlmICh0b2tlbi5yZWYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZiA9IHRva2VuLnJlZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b2tlbi5leHByZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHByID0gbmV3IEV4cHJlc3Npb25TdHViKHRva2VuLmV4cHJlc3Npb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyc2VyLnBvcyArPSAxO1xuICAgICAgICB9O1xuICAgICAgICBNdXN0YWNoZVN0dWIucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgdG9KU09OOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGpzb247XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuanNvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5qc29uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBqc29uID0geyB0OiB0aGlzLnR5cGUgfTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWYpIHtcbiAgICAgICAgICAgICAgICAgICAganNvbi5yID0gdGhpcy5yZWY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4cHIpIHtcbiAgICAgICAgICAgICAgICAgICAganNvbi54ID0gdGhpcy5leHByLnRvSlNPTigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmpzb24gPSBqc29uO1xuICAgICAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gTXVzdGFjaGVTdHViO1xuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9QYXJzZXJfZ2V0TXVzdGFjaGVfRXhwcmVzc2lvblN0dWJfX0V4cHJlc3Npb25TdHViKTtcbnZhciBwYXJzZV9QYXJzZXJfdXRpbHNfc3RyaW5naWZ5U3R1YnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgICAgICAgICB2YXIgc3RyID0gJycsIGl0ZW1TdHIsIGksIGxlbjtcbiAgICAgICAgICAgIGlmICghaXRlbXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBpdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGl0ZW1TdHIgPSBpdGVtc1tpXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtU3RyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0ciArPSBpdGVtU3RyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgcGFyc2VfUGFyc2VyX3V0aWxzX2pzb25pZnlTdHVicyA9IGZ1bmN0aW9uIChzdHJpbmdpZnlTdHVicykge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpdGVtcywgbm9TdHJpbmdpZnkpIHtcbiAgICAgICAgICAgIHZhciBzdHIsIGpzb247XG4gICAgICAgICAgICBpZiAoIW5vU3RyaW5naWZ5KSB7XG4gICAgICAgICAgICAgICAgc3RyID0gc3RyaW5naWZ5U3R1YnMoaXRlbXMpO1xuICAgICAgICAgICAgICAgIGlmIChzdHIgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAganNvbiA9IGl0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnRvSlNPTihub1N0cmluZ2lmeSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9O1xuICAgIH0ocGFyc2VfUGFyc2VyX3V0aWxzX3N0cmluZ2lmeVN0dWJzKTtcbnZhciBwYXJzZV9QYXJzZXJfZ2V0TXVzdGFjaGVfU2VjdGlvblN0dWJfX1NlY3Rpb25TdHViID0gZnVuY3Rpb24gKHR5cGVzLCBqc29uaWZ5U3R1YnMsIEV4cHJlc3Npb25TdHViKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgU2VjdGlvblN0dWIgPSBmdW5jdGlvbiAoZmlyc3RUb2tlbiwgcGFyc2VyKSB7XG4gICAgICAgICAgICB2YXIgbmV4dDtcbiAgICAgICAgICAgIHRoaXMucmVmID0gZmlyc3RUb2tlbi5yZWY7XG4gICAgICAgICAgICB0aGlzLmluZGV4UmVmID0gZmlyc3RUb2tlbi5pbmRleFJlZjtcbiAgICAgICAgICAgIHRoaXMuaW52ZXJ0ZWQgPSBmaXJzdFRva2VuLm11c3RhY2hlVHlwZSA9PT0gdHlwZXMuSU5WRVJURUQ7XG4gICAgICAgICAgICBpZiAoZmlyc3RUb2tlbi5leHByZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHByID0gbmV3IEV4cHJlc3Npb25TdHViKGZpcnN0VG9rZW4uZXhwcmVzc2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJzZXIucG9zICs9IDE7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgICAgICBuZXh0ID0gcGFyc2VyLm5leHQoKTtcbiAgICAgICAgICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHQubXVzdGFjaGVUeXBlID09PSB0eXBlcy5DTE9TSU5HKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0LnJlZi50cmltKCkgPT09IHRoaXMucmVmIHx8IHRoaXMuZXhwcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLnBvcyArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBwYXJzZSB0ZW1wbGF0ZTogSWxsZWdhbCBjbG9zaW5nIHNlY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zW3RoaXMuaXRlbXMubGVuZ3RoXSA9IHBhcnNlci5nZXRTdHViKCk7XG4gICAgICAgICAgICAgICAgbmV4dCA9IHBhcnNlci5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFNlY3Rpb25TdHViLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHRvSlNPTjogZnVuY3Rpb24gKG5vU3RyaW5naWZ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGpzb247XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuanNvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5qc29uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBqc29uID0geyB0OiB0eXBlcy5TRUNUSU9OIH07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIGpzb24uciA9IHRoaXMucmVmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbmRleFJlZikge1xuICAgICAgICAgICAgICAgICAgICBqc29uLmkgPSB0aGlzLmluZGV4UmVmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnZlcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICBqc29uLm4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leHByKSB7XG4gICAgICAgICAgICAgICAgICAgIGpzb24ueCA9IHRoaXMuZXhwci50b0pTT04oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGpzb24uZiA9IGpzb25pZnlTdHVicyh0aGlzLml0ZW1zLCBub1N0cmluZ2lmeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuanNvbiA9IGpzb247XG4gICAgICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTZWN0aW9uU3R1YjtcbiAgICB9KGNvbmZpZ190eXBlcywgcGFyc2VfUGFyc2VyX3V0aWxzX2pzb25pZnlTdHVicywgcGFyc2VfUGFyc2VyX2dldE11c3RhY2hlX0V4cHJlc3Npb25TdHViX19FeHByZXNzaW9uU3R1Yik7XG52YXIgcGFyc2VfUGFyc2VyX2dldE11c3RhY2hlX19nZXRNdXN0YWNoZSA9IGZ1bmN0aW9uICh0eXBlcywgTXVzdGFjaGVTdHViLCBTZWN0aW9uU3R1Yikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IHR5cGVzLk1VU1RBQ0hFIHx8IHRva2VuLnR5cGUgPT09IHR5cGVzLlRSSVBMRSkge1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbi5tdXN0YWNoZVR5cGUgPT09IHR5cGVzLlNFQ1RJT04gfHwgdG9rZW4ubXVzdGFjaGVUeXBlID09PSB0eXBlcy5JTlZFUlRFRCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNlY3Rpb25TdHViKHRva2VuLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNdXN0YWNoZVN0dWIodG9rZW4sIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9QYXJzZXJfZ2V0TXVzdGFjaGVfTXVzdGFjaGVTdHViX19NdXN0YWNoZVN0dWIsIHBhcnNlX1BhcnNlcl9nZXRNdXN0YWNoZV9TZWN0aW9uU3R1Yl9fU2VjdGlvblN0dWIpO1xudmFyIHBhcnNlX1BhcnNlcl9nZXRFbGVtZW50X0VsZW1lbnRTdHViX3V0aWxzX3NpYmxpbmdzQnlUYWdOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxpOiBbJ2xpJ10sXG4gICAgICAgICAgICBkdDogW1xuICAgICAgICAgICAgICAgICdkdCcsXG4gICAgICAgICAgICAgICAgJ2RkJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGRkOiBbXG4gICAgICAgICAgICAgICAgJ2R0JyxcbiAgICAgICAgICAgICAgICAnZGQnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcDogJ2FkZHJlc3MgYXJ0aWNsZSBhc2lkZSBibG9ja3F1b3RlIGRpciBkaXYgZGwgZmllbGRzZXQgZm9vdGVyIGZvcm0gaDEgaDIgaDMgaDQgaDUgaDYgaGVhZGVyIGhncm91cCBociBtZW51IG5hdiBvbCBwIHByZSBzZWN0aW9uIHRhYmxlIHVsJy5zcGxpdCgnICcpLFxuICAgICAgICAgICAgcnQ6IFtcbiAgICAgICAgICAgICAgICAncnQnLFxuICAgICAgICAgICAgICAgICdycCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBycDogW1xuICAgICAgICAgICAgICAgICdycCcsXG4gICAgICAgICAgICAgICAgJ3J0J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIG9wdGdyb3VwOiBbJ29wdGdyb3VwJ10sXG4gICAgICAgICAgICBvcHRpb246IFtcbiAgICAgICAgICAgICAgICAnb3B0aW9uJyxcbiAgICAgICAgICAgICAgICAnb3B0Z3JvdXAnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgdGhlYWQ6IFtcbiAgICAgICAgICAgICAgICAndGJvZHknLFxuICAgICAgICAgICAgICAgICd0Zm9vdCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB0Ym9keTogW1xuICAgICAgICAgICAgICAgICd0Ym9keScsXG4gICAgICAgICAgICAgICAgJ3Rmb290J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHRyOiBbJ3RyJ10sXG4gICAgICAgICAgICB0ZDogW1xuICAgICAgICAgICAgICAgICd0ZCcsXG4gICAgICAgICAgICAgICAgJ3RoJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHRoOiBbXG4gICAgICAgICAgICAgICAgJ3RkJyxcbiAgICAgICAgICAgICAgICAndGgnXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHBhcnNlX1BhcnNlcl9nZXRFbGVtZW50X0VsZW1lbnRTdHViX3V0aWxzX2ZpbHRlckF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoaXNBcnJheSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICAgICAgdmFyIGF0dHJzLCBwcm94aWVzLCBmaWx0ZXJlZCwgaSwgbGVuLCBpdGVtO1xuICAgICAgICAgICAgZmlsdGVyZWQgPSB7fTtcbiAgICAgICAgICAgIGF0dHJzID0gW107XG4gICAgICAgICAgICBwcm94aWVzID0gW107XG4gICAgICAgICAgICBsZW4gPSBpdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gJ2ludHJvJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWQuaW50cm8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQW4gZWxlbWVudCBjYW4gb25seSBoYXZlIG9uZSBpbnRybyB0cmFuc2l0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWQuaW50cm8gPSBpdGVtO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5uYW1lID09PSAnb3V0cm8nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5vdXRybykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbiBlbGVtZW50IGNhbiBvbmx5IGhhdmUgb25lIG91dHJvIHRyYW5zaXRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZC5vdXRybyA9IGl0ZW07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLm5hbWUgPT09ICdpbnRyby1vdXRybycpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkLmludHJvIHx8IGZpbHRlcmVkLm91dHJvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuIGVsZW1lbnQgY2FuIG9ubHkgaGF2ZSBvbmUgaW50cm8gYW5kIG9uZSBvdXRybyB0cmFuc2l0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWQuaW50cm8gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZC5vdXRybyA9IGRlZXBDbG9uZShpdGVtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ubmFtZS5zdWJzdHIoMCwgNikgPT09ICdwcm94eS0nKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IGl0ZW0ubmFtZS5zdWJzdHJpbmcoNik7XG4gICAgICAgICAgICAgICAgICAgIHByb3hpZXNbcHJveGllcy5sZW5ndGhdID0gaXRlbTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ubmFtZS5zdWJzdHIoMCwgMykgPT09ICdvbi0nKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IGl0ZW0ubmFtZS5zdWJzdHJpbmcoMyk7XG4gICAgICAgICAgICAgICAgICAgIHByb3hpZXNbcHJveGllcy5sZW5ndGhdID0gaXRlbTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ubmFtZSA9PT0gJ2RlY29yYXRvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWQuZGVjb3JhdG9yID0gaXRlbTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRyc1thdHRycy5sZW5ndGhdID0gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWx0ZXJlZC5hdHRycyA9IGF0dHJzO1xuICAgICAgICAgICAgZmlsdGVyZWQucHJveGllcyA9IHByb3hpZXM7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWQ7XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGRlZXBDbG9uZShvYmopIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQsIGtleTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai5tYXAoZGVlcENsb25lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCA9IHt9O1xuICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gZGVlcENsb25lKG9ialtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfSh1dGlsc19pc0FycmF5KTtcbnZhciBwYXJzZV9QYXJzZXJfZ2V0RWxlbWVudF9FbGVtZW50U3R1Yl91dGlsc19wcm9jZXNzRGlyZWN0aXZlID0gZnVuY3Rpb24gKHR5cGVzLCBwYXJzZUpTT04pIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGlyZWN0aXZlKSB7XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc2VkLCB0b2tlbnMsIHRva2VuLCBjb2xvbkluZGV4LCB0aHJvd0Vycm9yLCBkaXJlY3RpdmVOYW1lLCBkaXJlY3RpdmVBcmdzLCBwYXJzZWQ7XG4gICAgICAgICAgICB0aHJvd0Vycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBkaXJlY3RpdmUnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoIWRpcmVjdGl2ZS5uYW1lIHx8ICFkaXJlY3RpdmUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvd0Vycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9jZXNzZWQgPSB7IGRpcmVjdGl2ZVR5cGU6IGRpcmVjdGl2ZS5uYW1lIH07XG4gICAgICAgICAgICB0b2tlbnMgPSBkaXJlY3RpdmUudmFsdWU7XG4gICAgICAgICAgICBkaXJlY3RpdmVOYW1lID0gW107XG4gICAgICAgICAgICBkaXJlY3RpdmVBcmdzID0gW107XG4gICAgICAgICAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gdG9rZW5zLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IHR5cGVzLlRFWFQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sb25JbmRleCA9IHRva2VuLnZhbHVlLmluZGV4T2YoJzonKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9uSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVOYW1lW2RpcmVjdGl2ZU5hbWUubGVuZ3RoXSA9IHRva2VuO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9uSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVOYW1lW2RpcmVjdGl2ZU5hbWUubGVuZ3RoXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZXMuVEVYVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRva2VuLnZhbHVlLnN1YnN0cigwLCBjb2xvbkluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUubGVuZ3RoID4gY29sb25JbmRleCArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVBcmdzWzBdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlcy5URVhULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdG9rZW4udmFsdWUuc3Vic3RyaW5nKGNvbG9uSW5kZXggKyAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZU5hbWVbZGlyZWN0aXZlTmFtZS5sZW5ndGhdID0gdG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlyZWN0aXZlQXJncyA9IGRpcmVjdGl2ZUFyZ3MuY29uY2F0KHRva2Vucyk7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aXZlTmFtZS5sZW5ndGggPT09IDEgJiYgZGlyZWN0aXZlTmFtZVswXS50eXBlID09PSB0eXBlcy5URVhUKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkLm5hbWUgPSBkaXJlY3RpdmVOYW1lWzBdLnZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWQubmFtZSA9IGRpcmVjdGl2ZU5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGlyZWN0aXZlQXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aXZlQXJncy5sZW5ndGggPT09IDEgJiYgZGlyZWN0aXZlQXJnc1swXS50eXBlID09PSB0eXBlcy5URVhUKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZCA9IHBhcnNlSlNPTignWycgKyBkaXJlY3RpdmVBcmdzWzBdLnZhbHVlICsgJ10nKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkLmFyZ3MgPSBwYXJzZWQgPyBwYXJzZWQudmFsdWUgOiBkaXJlY3RpdmVBcmdzWzBdLnZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZC5keW5hbWljQXJncyA9IGRpcmVjdGl2ZUFyZ3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NlZDtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcywgdXRpbHNfcGFyc2VKU09OKTtcbnZhciBwYXJzZV9QYXJzZXJfU3RyaW5nU3R1Yl9TdHJpbmdQYXJzZXIgPSBmdW5jdGlvbiAoZ2V0VGV4dCwgZ2V0TXVzdGFjaGUpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBTdHJpbmdQYXJzZXI7XG4gICAgICAgIFN0cmluZ1BhcnNlciA9IGZ1bmN0aW9uICh0b2tlbnMsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBzdHViO1xuICAgICAgICAgICAgdGhpcy50b2tlbnMgPSB0b2tlbnMgfHwgW107XG4gICAgICAgICAgICB0aGlzLnBvcyA9IDA7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIHdoaWxlIChzdHViID0gdGhpcy5nZXRTdHViKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdC5wdXNoKHN0dWIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBTdHJpbmdQYXJzZXIucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgZ2V0U3R1YjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IHRoaXMubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRleHQodG9rZW4pIHx8IHRoaXMuZ2V0TXVzdGFjaGUodG9rZW4pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFRleHQ6IGdldFRleHQsXG4gICAgICAgICAgICBnZXRNdXN0YWNoZTogZ2V0TXVzdGFjaGUsXG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMucG9zXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFN0cmluZ1BhcnNlcjtcbiAgICB9KHBhcnNlX1BhcnNlcl9nZXRUZXh0X19nZXRUZXh0LCBwYXJzZV9QYXJzZXJfZ2V0TXVzdGFjaGVfX2dldE11c3RhY2hlKTtcbnZhciBwYXJzZV9QYXJzZXJfU3RyaW5nU3R1Yl9fU3RyaW5nU3R1YiA9IGZ1bmN0aW9uIChTdHJpbmdQYXJzZXIsIHN0cmluZ2lmeVN0dWJzLCBqc29uaWZ5U3R1YnMpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBTdHJpbmdTdHViO1xuICAgICAgICBTdHJpbmdTdHViID0gZnVuY3Rpb24gKHRva2Vucykge1xuICAgICAgICAgICAgdmFyIHBhcnNlciA9IG5ldyBTdHJpbmdQYXJzZXIodG9rZW5zKTtcbiAgICAgICAgICAgIHRoaXMuc3R1YnMgPSBwYXJzZXIucmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICBTdHJpbmdTdHViLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIHRvSlNPTjogZnVuY3Rpb24gKG5vU3RyaW5naWZ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGpzb247XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbJ2pzb25fJyArIG5vU3RyaW5naWZ5XSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1snanNvbl8nICsgbm9TdHJpbmdpZnldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBqc29uID0gdGhpc1snanNvbl8nICsgbm9TdHJpbmdpZnldID0ganNvbmlmeVN0dWJzKHRoaXMuc3R1YnMsIG5vU3RyaW5naWZ5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0ciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zdHIgPSBzdHJpbmdpZnlTdHVicyh0aGlzLnN0dWJzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTdHJpbmdTdHViO1xuICAgIH0ocGFyc2VfUGFyc2VyX1N0cmluZ1N0dWJfU3RyaW5nUGFyc2VyLCBwYXJzZV9QYXJzZXJfdXRpbHNfc3RyaW5naWZ5U3R1YnMsIHBhcnNlX1BhcnNlcl91dGlsc19qc29uaWZ5U3R1YnMpO1xudmFyIHBhcnNlX1BhcnNlcl9nZXRFbGVtZW50X0VsZW1lbnRTdHViX3V0aWxzX2pzb25pZnlEaXJlY3RpdmUgPSBmdW5jdGlvbiAoU3RyaW5nU3R1Yikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkaXJlY3RpdmUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQsIG5hbWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRpcmVjdGl2ZS5uYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmICghZGlyZWN0aXZlLmFyZ3MgJiYgIWRpcmVjdGl2ZS5keW5hbWljQXJncykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGlyZWN0aXZlLm5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5hbWUgPSBkaXJlY3RpdmUubmFtZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5ldyBTdHJpbmdTdHViKGRpcmVjdGl2ZS5uYW1lKS50b0pTT04oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCA9IHsgbjogbmFtZSB9O1xuICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZS5hcmdzKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmEgPSBkaXJlY3RpdmUuYXJncztcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZS5keW5hbWljQXJncykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kID0gbmV3IFN0cmluZ1N0dWIoZGlyZWN0aXZlLmR5bmFtaWNBcmdzKS50b0pTT04oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfShwYXJzZV9QYXJzZXJfU3RyaW5nU3R1Yl9fU3RyaW5nU3R1Yik7XG52YXIgcGFyc2VfUGFyc2VyX2dldEVsZW1lbnRfRWxlbWVudFN0dWJfdG9KU09OID0gZnVuY3Rpb24gKHR5cGVzLCBqc29uaWZ5U3R1YnMsIGpzb25pZnlEaXJlY3RpdmUpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobm9TdHJpbmdpZnkpIHtcbiAgICAgICAgICAgIHZhciBqc29uLCBuYW1lLCB2YWx1ZSwgcHJveHksIGksIGxlbiwgYXR0cmlidXRlO1xuICAgICAgICAgICAgaWYgKHRoaXNbJ2pzb25fJyArIG5vU3RyaW5naWZ5XSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzWydqc29uXycgKyBub1N0cmluZ2lmeV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBqc29uID0ge1xuICAgICAgICAgICAgICAgICAgICB0OiB0eXBlcy5DT01QT05FTlQsXG4gICAgICAgICAgICAgICAgICAgIGU6IHRoaXMuY29tcG9uZW50XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgdDogdHlwZXMuRUxFTUVOVCxcbiAgICAgICAgICAgICAgICAgICAgZTogdGhpcy50YWdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZG9jdHlwZSkge1xuICAgICAgICAgICAgICAgIGpzb24ueSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzICYmIHRoaXMuYXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBqc29uLmEgPSB7fTtcbiAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLmF0dHJpYnV0ZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgPSB0aGlzLmF0dHJpYnV0ZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBhdHRyaWJ1dGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpzb24uYVtuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2Fubm90IGhhdmUgbXVsdGlwbGUgYXR0cmlidXRlcyB3aXRoIHRoZSBzYW1lIG5hbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGF0dHJpYnV0ZS52YWx1ZS50b0pTT04obm9TdHJpbmdpZnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGpzb24uYVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAganNvbi5mID0ganNvbmlmeVN0dWJzKHRoaXMuaXRlbXMsIG5vU3RyaW5naWZ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3hpZXMgJiYgdGhpcy5wcm94aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGpzb24udiA9IHt9O1xuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMucHJveGllcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3h5ID0gdGhpcy5wcm94aWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBqc29uLnZbcHJveHkuZGlyZWN0aXZlVHlwZV0gPSBqc29uaWZ5RGlyZWN0aXZlKHByb3h5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5pbnRybykge1xuICAgICAgICAgICAgICAgIGpzb24udDEgPSBqc29uaWZ5RGlyZWN0aXZlKHRoaXMuaW50cm8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub3V0cm8pIHtcbiAgICAgICAgICAgICAgICBqc29uLnQyID0ganNvbmlmeURpcmVjdGl2ZSh0aGlzLm91dHJvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRlY29yYXRvcikge1xuICAgICAgICAgICAgICAgIGpzb24ubyA9IGpzb25pZnlEaXJlY3RpdmUodGhpcy5kZWNvcmF0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpc1snanNvbl8nICsgbm9TdHJpbmdpZnldID0ganNvbjtcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9QYXJzZXJfdXRpbHNfanNvbmlmeVN0dWJzLCBwYXJzZV9QYXJzZXJfZ2V0RWxlbWVudF9FbGVtZW50U3R1Yl91dGlsc19qc29uaWZ5RGlyZWN0aXZlKTtcbnZhciBwYXJzZV9QYXJzZXJfZ2V0RWxlbWVudF9FbGVtZW50U3R1Yl90b1N0cmluZyA9IGZ1bmN0aW9uIChzdHJpbmdpZnlTdHVicywgdm9pZEVsZW1lbnROYW1lcykge1xuICAgICAgICBcbiAgICAgICAgdmFyIGh0bWxFbGVtZW50cztcbiAgICAgICAgaHRtbEVsZW1lbnRzID0gJ2EgYWJiciBhY3JvbnltIGFkZHJlc3MgYXBwbGV0IGFyZWEgYiBiYXNlIGJhc2Vmb250IGJkbyBiaWcgYmxvY2txdW90ZSBib2R5IGJyIGJ1dHRvbiBjYXB0aW9uIGNlbnRlciBjaXRlIGNvZGUgY29sIGNvbGdyb3VwIGRkIGRlbCBkZm4gZGlyIGRpdiBkbCBkdCBlbSBmaWVsZHNldCBmb250IGZvcm0gZnJhbWUgZnJhbWVzZXQgaDEgaDIgaDMgaDQgaDUgaDYgaGVhZCBociBodG1sIGkgaWZyYW1lIGltZyBpbnB1dCBpbnMgaXNpbmRleCBrYmQgbGFiZWwgbGVnZW5kIGxpIGxpbmsgbWFwIG1lbnUgbWV0YSBub2ZyYW1lcyBub3NjcmlwdCBvYmplY3Qgb2wgcCBwYXJhbSBwcmUgcSBzIHNhbXAgc2NyaXB0IHNlbGVjdCBzbWFsbCBzcGFuIHN0cmlrZSBzdHJvbmcgc3R5bGUgc3ViIHN1cCB0ZXh0YXJlYSB0aXRsZSB0dCB1IHVsIHZhciBhcnRpY2xlIGFzaWRlIGF1ZGlvIGJkaSBjYW52YXMgY29tbWFuZCBkYXRhIGRhdGFncmlkIGRhdGFsaXN0IGRldGFpbHMgZW1iZWQgZXZlbnRzb3VyY2UgZmlnY2FwdGlvbiBmaWd1cmUgZm9vdGVyIGhlYWRlciBoZ3JvdXAga2V5Z2VuIG1hcmsgbWV0ZXIgbmF2IG91dHB1dCBwcm9ncmVzcyBydWJ5IHJwIHJ0IHNlY3Rpb24gc291cmNlIHN1bW1hcnkgdGltZSB0cmFjayB2aWRlbyB3YnInLnNwbGl0KCcgJyk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RyLCBpLCBsZW4sIGF0dHJTdHIsIG5hbWUsIGF0dHJWYWx1ZVN0ciwgZnJhZ1N0ciwgaXNWb2lkO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHIgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChodG1sRWxlbWVudHMuaW5kZXhPZih0aGlzLnRhZy50b0xvd2VyQ2FzZSgpKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHIgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3hpZXMgfHwgdGhpcy5pbnRybyB8fCB0aGlzLm91dHJvIHx8IHRoaXMuZGVjb3JhdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmcmFnU3RyID0gc3RyaW5naWZ5U3R1YnModGhpcy5pdGVtcyk7XG4gICAgICAgICAgICBpZiAoZnJhZ1N0ciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHIgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlzVm9pZCA9IHZvaWRFbGVtZW50TmFtZXMuaW5kZXhPZih0aGlzLnRhZy50b0xvd2VyQ2FzZSgpKSAhPT0gLTE7XG4gICAgICAgICAgICBzdHIgPSAnPCcgKyB0aGlzLnRhZztcbiAgICAgICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSB0aGlzLmF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IHRoaXMuYXR0cmlidXRlc1tpXS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZS5pbmRleE9mKCc6JykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gJ2lkJyB8fCBuYW1lID09PSAnaW50cm8nIHx8IG5hbWUgPT09ICdvdXRybycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0ciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGF0dHJTdHIgPSAnICcgKyBuYW1lO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzW2ldLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyVmFsdWVTdHIgPSB0aGlzLmF0dHJpYnV0ZXNbaV0udmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdHRyVmFsdWVTdHIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0clZhbHVlU3RyICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJTdHIgKz0gJz0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvW1xcc1wiJz08PmBdLy50ZXN0KGF0dHJWYWx1ZVN0cikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0clN0ciArPSAnXCInICsgYXR0clZhbHVlU3RyLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKSArICdcIic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0clN0ciArPSBhdHRyVmFsdWVTdHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBhdHRyU3RyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGZDbG9zaW5nICYmICFpc1ZvaWQpIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gJy8+JztcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHIgPSBzdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHIgKz0gJz4nO1xuICAgICAgICAgICAgaWYgKGlzVm9pZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0ciA9IHN0cjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ciArPSBmcmFnU3RyO1xuICAgICAgICAgICAgc3RyICs9ICc8LycgKyB0aGlzLnRhZyArICc+JztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0ciA9IHN0cjtcbiAgICAgICAgfTtcbiAgICB9KHBhcnNlX1BhcnNlcl91dGlsc19zdHJpbmdpZnlTdHVicywgY29uZmlnX3ZvaWRFbGVtZW50TmFtZXMpO1xudmFyIHBhcnNlX1BhcnNlcl9nZXRFbGVtZW50X0VsZW1lbnRTdHViX19FbGVtZW50U3R1YiA9IGZ1bmN0aW9uICh0eXBlcywgdm9pZEVsZW1lbnROYW1lcywgd2FybiwgY2FtZWxDYXNlLCBzdHJpbmdpZnlTdHVicywgc2libGluZ3NCeVRhZ05hbWUsIGZpbHRlckF0dHJpYnV0ZXMsIHByb2Nlc3NEaXJlY3RpdmUsIHRvSlNPTiwgdG9TdHJpbmcsIFN0cmluZ1N0dWIpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBFbGVtZW50U3R1YiwgYWxsRWxlbWVudE5hbWVzLCBjbG9zZWRCeVBhcmVudENsb3NlLCBvblBhdHRlcm4sIHNhbml0aXplLCBsZWFkaW5nV2hpdGVzcGFjZSA9IC9eXFxzKy8sIHRyYWlsaW5nV2hpdGVzcGFjZSA9IC9cXHMrJC87XG4gICAgICAgIEVsZW1lbnRTdHViID0gZnVuY3Rpb24gKGZpcnN0VG9rZW4sIHBhcnNlciwgcHJlc2VydmVXaGl0ZXNwYWNlKSB7XG4gICAgICAgICAgICB2YXIgbmV4dCwgYXR0cnMsIGZpbHRlcmVkLCBwcm94aWVzLCBpdGVtLCBnZXRGcmFnLCBsb3dlckNhc2VUYWc7XG4gICAgICAgICAgICBwYXJzZXIucG9zICs9IDE7XG4gICAgICAgICAgICBnZXRGcmFnID0gZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBhdHRyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBhdHRyLnZhbHVlID8gbmV3IFN0cmluZ1N0dWIoYXR0ci52YWx1ZSkgOiBudWxsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnRhZyA9IGZpcnN0VG9rZW4ubmFtZTtcbiAgICAgICAgICAgIGxvd2VyQ2FzZVRhZyA9IGZpcnN0VG9rZW4ubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKGxvd2VyQ2FzZVRhZy5zdWJzdHIoMCwgMykgPT09ICdydi0nKSB7XG4gICAgICAgICAgICAgICAgd2FybignVGhlIFwicnYtXCIgcHJlZml4IGZvciBjb21wb25lbnRzIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFN1cHBvcnQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb24nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhZyA9IHRoaXMudGFnLnN1YnN0cmluZygzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXNlcnZlV2hpdGVzcGFjZSA9IHByZXNlcnZlV2hpdGVzcGFjZSB8fCBsb3dlckNhc2VUYWcgPT09ICdwcmUnO1xuICAgICAgICAgICAgaWYgKGZpcnN0VG9rZW4uYXR0cnMpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZCA9IGZpbHRlckF0dHJpYnV0ZXMoZmlyc3RUb2tlbi5hdHRycyk7XG4gICAgICAgICAgICAgICAgYXR0cnMgPSBmaWx0ZXJlZC5hdHRycztcbiAgICAgICAgICAgICAgICBwcm94aWVzID0gZmlsdGVyZWQucHJveGllcztcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VyLm9wdGlvbnMuc2FuaXRpemUgJiYgcGFyc2VyLm9wdGlvbnMuc2FuaXRpemUuZXZlbnRBdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzID0gYXR0cnMuZmlsdGVyKHNhbml0aXplKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRycy5tYXAoZ2V0RnJhZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwcm94aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3hpZXMgPSBwcm94aWVzLm1hcChwcm9jZXNzRGlyZWN0aXZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkLmludHJvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm8gPSBwcm9jZXNzRGlyZWN0aXZlKGZpbHRlcmVkLmludHJvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkLm91dHJvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0cm8gPSBwcm9jZXNzRGlyZWN0aXZlKGZpbHRlcmVkLm91dHJvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkLmRlY29yYXRvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY29yYXRvciA9IHByb2Nlc3NEaXJlY3RpdmUoZmlsdGVyZWQuZGVjb3JhdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyc3RUb2tlbi5kb2N0eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb2N0eXBlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJzdFRva2VuLnNlbGZDbG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxmQ2xvc2luZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodm9pZEVsZW1lbnROYW1lcy5pbmRleE9mKGxvd2VyQ2FzZVRhZykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1ZvaWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZkNsb3NpbmcgfHwgdGhpcy5pc1ZvaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNpYmxpbmdzID0gc2libGluZ3NCeVRhZ05hbWVbbG93ZXJDYXNlVGFnXTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgICAgIG5leHQgPSBwYXJzZXIubmV4dCgpO1xuICAgICAgICAgICAgd2hpbGUgKG5leHQpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV4dC5tdXN0YWNoZVR5cGUgPT09IHR5cGVzLkNMT1NJTkcpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuZXh0LnR5cGUgPT09IHR5cGVzLlRBRykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dC5jbG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dC5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IGxvd2VyQ2FzZVRhZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5wb3MgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2libGluZ3MgJiYgdGhpcy5zaWJsaW5ncy5pbmRleE9mKG5leHQubmFtZS50b0xvd2VyQ2FzZSgpKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNbdGhpcy5pdGVtcy5sZW5ndGhdID0gcGFyc2VyLmdldFN0dWIoKTtcbiAgICAgICAgICAgICAgICBuZXh0ID0gcGFyc2VyLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcHJlc2VydmVXaGl0ZXNwYWNlKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuaXRlbXNbMF07XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS50eXBlID09PSB0eXBlcy5URVhUKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udGV4dCA9IGl0ZW0udGV4dC5yZXBsYWNlKGxlYWRpbmdXaGl0ZXNwYWNlLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbS50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuaXRlbXNbdGhpcy5pdGVtcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLnR5cGUgPT09IHR5cGVzLlRFWFQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS50ZXh0ID0gaXRlbS50ZXh0LnJlcGxhY2UodHJhaWxpbmdXaGl0ZXNwYWNlLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbS50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBFbGVtZW50U3R1Yi5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICB0b0pTT046IHRvSlNPTixcbiAgICAgICAgICAgIHRvU3RyaW5nOiB0b1N0cmluZ1xuICAgICAgICB9O1xuICAgICAgICBhbGxFbGVtZW50TmFtZXMgPSAnYSBhYmJyIGFjcm9ueW0gYWRkcmVzcyBhcHBsZXQgYXJlYSBiIGJhc2UgYmFzZWZvbnQgYmRvIGJpZyBibG9ja3F1b3RlIGJvZHkgYnIgYnV0dG9uIGNhcHRpb24gY2VudGVyIGNpdGUgY29kZSBjb2wgY29sZ3JvdXAgZGQgZGVsIGRmbiBkaXIgZGl2IGRsIGR0IGVtIGZpZWxkc2V0IGZvbnQgZm9ybSBmcmFtZSBmcmFtZXNldCBoMSBoMiBoMyBoNCBoNSBoNiBoZWFkIGhyIGh0bWwgaSBpZnJhbWUgaW1nIGlucHV0IGlucyBpc2luZGV4IGtiZCBsYWJlbCBsZWdlbmQgbGkgbGluayBtYXAgbWVudSBtZXRhIG5vZnJhbWVzIG5vc2NyaXB0IG9iamVjdCBvbCBwIHBhcmFtIHByZSBxIHMgc2FtcCBzY3JpcHQgc2VsZWN0IHNtYWxsIHNwYW4gc3RyaWtlIHN0cm9uZyBzdHlsZSBzdWIgc3VwIHRleHRhcmVhIHRpdGxlIHR0IHUgdWwgdmFyIGFydGljbGUgYXNpZGUgYXVkaW8gYmRpIGNhbnZhcyBjb21tYW5kIGRhdGEgZGF0YWdyaWQgZGF0YWxpc3QgZGV0YWlscyBlbWJlZCBldmVudHNvdXJjZSBmaWdjYXB0aW9uIGZpZ3VyZSBmb290ZXIgaGVhZGVyIGhncm91cCBrZXlnZW4gbWFyayBtZXRlciBuYXYgb3V0cHV0IHByb2dyZXNzIHJ1YnkgcnAgcnQgc2VjdGlvbiBzb3VyY2Ugc3VtbWFyeSB0aW1lIHRyYWNrIHZpZGVvIHdicicuc3BsaXQoJyAnKTtcbiAgICAgICAgY2xvc2VkQnlQYXJlbnRDbG9zZSA9ICdsaSBkZCBydCBycCBvcHRncm91cCBvcHRpb24gdGJvZHkgdGZvb3QgdHIgdGQgdGgnLnNwbGl0KCcgJyk7XG4gICAgICAgIG9uUGF0dGVybiA9IC9eb25bYS16QS1aXS87XG4gICAgICAgIHNhbml0aXplID0gZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZCA9ICFvblBhdHRlcm4udGVzdChhdHRyLm5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRWxlbWVudFN0dWI7XG4gICAgfShjb25maWdfdHlwZXMsIGNvbmZpZ192b2lkRWxlbWVudE5hbWVzLCB1dGlsc193YXJuLCB1dGlsc19jYW1lbENhc2UsIHBhcnNlX1BhcnNlcl91dGlsc19zdHJpbmdpZnlTdHVicywgcGFyc2VfUGFyc2VyX2dldEVsZW1lbnRfRWxlbWVudFN0dWJfdXRpbHNfc2libGluZ3NCeVRhZ05hbWUsIHBhcnNlX1BhcnNlcl9nZXRFbGVtZW50X0VsZW1lbnRTdHViX3V0aWxzX2ZpbHRlckF0dHJpYnV0ZXMsIHBhcnNlX1BhcnNlcl9nZXRFbGVtZW50X0VsZW1lbnRTdHViX3V0aWxzX3Byb2Nlc3NEaXJlY3RpdmUsIHBhcnNlX1BhcnNlcl9nZXRFbGVtZW50X0VsZW1lbnRTdHViX3RvSlNPTiwgcGFyc2VfUGFyc2VyX2dldEVsZW1lbnRfRWxlbWVudFN0dWJfdG9TdHJpbmcsIHBhcnNlX1BhcnNlcl9TdHJpbmdTdHViX19TdHJpbmdTdHViKTtcbnZhciBwYXJzZV9QYXJzZXJfZ2V0RWxlbWVudF9fZ2V0RWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlcywgRWxlbWVudFN0dWIpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2FuaXRpemUgJiYgdGhpcy5vcHRpb25zLnNhbml0aXplLmVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zYW5pdGl6ZS5lbGVtZW50cy5pbmRleE9mKHRva2VuLm5hbWUudG9Mb3dlckNhc2UoKSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgRWxlbWVudFN0dWIodG9rZW4sIHRoaXMpO1xuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzLCBwYXJzZV9QYXJzZXJfZ2V0RWxlbWVudF9FbGVtZW50U3R1Yl9fRWxlbWVudFN0dWIpO1xudmFyIHBhcnNlX1BhcnNlcl9fUGFyc2VyID0gZnVuY3Rpb24gKGdldFRleHQsIGdldENvbW1lbnQsIGdldE11c3RhY2hlLCBnZXRFbGVtZW50LCBqc29uaWZ5U3R1YnMpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBQYXJzZXI7XG4gICAgICAgIFBhcnNlciA9IGZ1bmN0aW9uICh0b2tlbnMsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBzdHViLCBzdHVicztcbiAgICAgICAgICAgIHRoaXMudG9rZW5zID0gdG9rZW5zIHx8IFtdO1xuICAgICAgICAgICAgdGhpcy5wb3MgPSAwO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgIHRoaXMucHJlc2VydmVXaGl0ZXNwYWNlID0gb3B0aW9ucy5wcmVzZXJ2ZVdoaXRlc3BhY2U7XG4gICAgICAgICAgICBzdHVicyA9IFtdO1xuICAgICAgICAgICAgd2hpbGUgKHN0dWIgPSB0aGlzLmdldFN0dWIoKSkge1xuICAgICAgICAgICAgICAgIHN0dWJzLnB1c2goc3R1Yik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlc3VsdCA9IGpzb25pZnlTdHVicyhzdHVicyk7XG4gICAgICAgIH07XG4gICAgICAgIFBhcnNlci5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBnZXRTdHViOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRva2VuID0gdGhpcy5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dCh0b2tlbikgfHwgdGhpcy5nZXRDb21tZW50KHRva2VuKSB8fCB0aGlzLmdldE11c3RhY2hlKHRva2VuKSB8fCB0aGlzLmdldEVsZW1lbnQodG9rZW4pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFRleHQ6IGdldFRleHQsXG4gICAgICAgICAgICBnZXRDb21tZW50OiBnZXRDb21tZW50LFxuICAgICAgICAgICAgZ2V0TXVzdGFjaGU6IGdldE11c3RhY2hlLFxuICAgICAgICAgICAgZ2V0RWxlbWVudDogZ2V0RWxlbWVudCxcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5wb3NdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUGFyc2VyO1xuICAgIH0ocGFyc2VfUGFyc2VyX2dldFRleHRfX2dldFRleHQsIHBhcnNlX1BhcnNlcl9nZXRDb21tZW50X19nZXRDb21tZW50LCBwYXJzZV9QYXJzZXJfZ2V0TXVzdGFjaGVfX2dldE11c3RhY2hlLCBwYXJzZV9QYXJzZXJfZ2V0RWxlbWVudF9fZ2V0RWxlbWVudCwgcGFyc2VfUGFyc2VyX3V0aWxzX2pzb25pZnlTdHVicyk7XG52YXIgcGFyc2VfX3BhcnNlID0gZnVuY3Rpb24gKHRva2VuaXplLCB0eXBlcywgUGFyc2VyKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgcGFyc2UsIG9ubHlXaGl0ZXNwYWNlLCBpbmxpbmVQYXJ0aWFsU3RhcnQsIGlubGluZVBhcnRpYWxFbmQsIHBhcnNlQ29tcG91bmRUZW1wbGF0ZTtcbiAgICAgICAgb25seVdoaXRlc3BhY2UgPSAvXlxccyokLztcbiAgICAgICAgaW5saW5lUGFydGlhbFN0YXJ0ID0gLzwhLS1cXHMqXFx7XFx7XFxzKj5cXHMqKFthLXpBLVpfJF1bYS16QS1aXyQwLTldKilcXHMqfVxcfVxccyotLT4vO1xuICAgICAgICBpbmxpbmVQYXJ0aWFsRW5kID0gLzwhLS1cXHMqXFx7XFx7XFxzKlxcL1xccyooW2EtekEtWl8kXVthLXpBLVpfJDAtOV0qKVxccyp9XFx9XFxzKi0tPi87XG4gICAgICAgIHBhcnNlID0gZnVuY3Rpb24gKHRlbXBsYXRlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW5zLCBqc29uLCB0b2tlbjtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICAgICAgaWYgKGlubGluZVBhcnRpYWxTdGFydC50ZXN0KHRlbXBsYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUNvbXBvdW5kVGVtcGxhdGUodGVtcGxhdGUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2FuaXRpemUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnNhbml0aXplID0ge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogJ2FwcGxldCBiYXNlIGJhc2Vmb250IGJvZHkgZnJhbWUgZnJhbWVzZXQgaGVhZCBodG1sIGlzaW5kZXggbGluayBtZXRhIG5vZnJhbWVzIG5vc2NyaXB0IG9iamVjdCBwYXJhbSBzY3JpcHQgc3R5bGUgdGl0bGUnLnNwbGl0KCcgJyksXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50QXR0cmlidXRlczogdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbnMgPSB0b2tlbml6ZSh0ZW1wbGF0ZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucHJlc2VydmVXaGl0ZXNwYWNlKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbMF07XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuICYmIHRva2VuLnR5cGUgPT09IHR5cGVzLlRFWFQgJiYgb25seVdoaXRlc3BhY2UudGVzdCh0b2tlbi52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5zLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gdHlwZXMuVEVYVCAmJiBvbmx5V2hpdGVzcGFjZS50ZXN0KHRva2VuLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbnMucG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAganNvbiA9IG5ldyBQYXJzZXIodG9rZW5zLCBvcHRpb25zKS5yZXN1bHQ7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGpzb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtqc29uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9O1xuICAgICAgICBwYXJzZUNvbXBvdW5kVGVtcGxhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBtYWluVGVtcGxhdGUsIHJlbWFpbmluZywgcGFydGlhbHMsIG5hbWUsIHN0YXJ0TWF0Y2gsIGVuZE1hdGNoO1xuICAgICAgICAgICAgcGFydGlhbHMgPSB7fTtcbiAgICAgICAgICAgIG1haW5UZW1wbGF0ZSA9ICcnO1xuICAgICAgICAgICAgcmVtYWluaW5nID0gdGVtcGxhdGU7XG4gICAgICAgICAgICB3aGlsZSAoc3RhcnRNYXRjaCA9IGlubGluZVBhcnRpYWxTdGFydC5leGVjKHJlbWFpbmluZykpIHtcbiAgICAgICAgICAgICAgICBuYW1lID0gc3RhcnRNYXRjaFsxXTtcbiAgICAgICAgICAgICAgICBtYWluVGVtcGxhdGUgKz0gcmVtYWluaW5nLnN1YnN0cigwLCBzdGFydE1hdGNoLmluZGV4KTtcbiAgICAgICAgICAgICAgICByZW1haW5pbmcgPSByZW1haW5pbmcuc3Vic3RyaW5nKHN0YXJ0TWF0Y2guaW5kZXggKyBzdGFydE1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgZW5kTWF0Y2ggPSBpbmxpbmVQYXJ0aWFsRW5kLmV4ZWMocmVtYWluaW5nKTtcbiAgICAgICAgICAgICAgICBpZiAoIWVuZE1hdGNoIHx8IGVuZE1hdGNoWzFdICE9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5saW5lIHBhcnRpYWxzIG11c3QgaGF2ZSBhIGNsb3NpbmcgZGVsaW1pdGVyLCBhbmQgY2Fubm90IGJlIG5lc3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJ0aWFsc1tuYW1lXSA9IHBhcnNlKHJlbWFpbmluZy5zdWJzdHIoMCwgZW5kTWF0Y2guaW5kZXgpLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICByZW1haW5pbmcgPSByZW1haW5pbmcuc3Vic3RyaW5nKGVuZE1hdGNoLmluZGV4ICsgZW5kTWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbWFpbjogcGFyc2UobWFpblRlbXBsYXRlLCBvcHRpb25zKSxcbiAgICAgICAgICAgICAgICBwYXJ0aWFsczogcGFydGlhbHNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBwYXJzZTtcbiAgICB9KHBhcnNlX3Rva2VuaXplLCBjb25maWdfdHlwZXMsIHBhcnNlX1BhcnNlcl9fUGFyc2VyKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfUGFydGlhbF9nZXRQYXJ0aWFsRGVzY3JpcHRvciA9IGZ1bmN0aW9uIChlcnJvcnMsIGlzQ2xpZW50LCB3YXJuLCBpc09iamVjdCwgcGFydGlhbHMsIHBhcnNlKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZ2V0UGFydGlhbERlc2NyaXB0b3IsIHJlZ2lzdGVyUGFydGlhbCwgZ2V0UGFydGlhbEZyb21SZWdpc3RyeSwgdW5wYWNrO1xuICAgICAgICBnZXRQYXJ0aWFsRGVzY3JpcHRvciA9IGZ1bmN0aW9uIChyb290LCBuYW1lKSB7XG4gICAgICAgICAgICB2YXIgZWwsIHBhcnRpYWwsIGVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgIGlmIChwYXJ0aWFsID0gZ2V0UGFydGlhbEZyb21SZWdpc3RyeShyb290LCBuYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJ0aWFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQ2xpZW50KSB7XG4gICAgICAgICAgICAgICAgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoZWwgJiYgZWwudGFnTmFtZSA9PT0gJ1NDUklQVCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5taXNzaW5nUGFyc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlclBhcnRpYWwocGFyc2UoZWwuaW5uZXJIVE1MKSwgbmFtZSwgcGFydGlhbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcnRpYWwgPSBwYXJ0aWFsc1tuYW1lXTtcbiAgICAgICAgICAgIGlmICghcGFydGlhbCkge1xuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9ICdDb3VsZCBub3QgZmluZCBkZXNjcmlwdG9yIGZvciBwYXJ0aWFsIFwiJyArIG5hbWUgKyAnXCInO1xuICAgICAgICAgICAgICAgIGlmIChyb290LmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdhcm4oZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVucGFjayhwYXJ0aWFsKTtcbiAgICAgICAgfTtcbiAgICAgICAgZ2V0UGFydGlhbEZyb21SZWdpc3RyeSA9IGZ1bmN0aW9uIChyZWdpc3RyeU93bmVyLCBuYW1lKSB7XG4gICAgICAgICAgICB2YXIgcGFydGlhbDtcbiAgICAgICAgICAgIGlmIChyZWdpc3RyeU93bmVyLnBhcnRpYWxzW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWdpc3RyeU93bmVyLnBhcnRpYWxzW25hbWVdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLm1pc3NpbmdQYXJzZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpYWwgPSBwYXJzZShyZWdpc3RyeU93bmVyLnBhcnRpYWxzW25hbWVdLCByZWdpc3RyeU93bmVyLnBhcnNlT3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyUGFydGlhbChwYXJ0aWFsLCBuYW1lLCByZWdpc3RyeU93bmVyLnBhcnRpYWxzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVucGFjayhyZWdpc3RyeU93bmVyLnBhcnRpYWxzW25hbWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVnaXN0ZXJQYXJ0aWFsID0gZnVuY3Rpb24gKHBhcnRpYWwsIG5hbWUsIHJlZ2lzdHJ5KSB7XG4gICAgICAgICAgICB2YXIga2V5O1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KHBhcnRpYWwpKSB7XG4gICAgICAgICAgICAgICAgcmVnaXN0cnlbbmFtZV0gPSBwYXJ0aWFsLm1haW47XG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gcGFydGlhbC5wYXJ0aWFscykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFydGlhbC5wYXJ0aWFscy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdpc3RyeVtrZXldID0gcGFydGlhbC5wYXJ0aWFsc1trZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWdpc3RyeVtuYW1lXSA9IHBhcnRpYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHVucGFjayA9IGZ1bmN0aW9uIChwYXJ0aWFsKSB7XG4gICAgICAgICAgICBpZiAocGFydGlhbC5sZW5ndGggPT09IDEgJiYgdHlwZW9mIHBhcnRpYWxbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnRpYWxbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFydGlhbDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGdldFBhcnRpYWxEZXNjcmlwdG9yO1xuICAgIH0oY29uZmlnX2Vycm9ycywgY29uZmlnX2lzQ2xpZW50LCB1dGlsc193YXJuLCB1dGlsc19pc09iamVjdCwgcmVnaXN0cmllc19wYXJ0aWFscywgcGFyc2VfX3BhcnNlKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfUGFydGlhbF9fUGFydGlhbCA9IGZ1bmN0aW9uICh0eXBlcywgZ2V0UGFydGlhbERlc2NyaXB0b3IsIGNpcmN1bGFyKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgRG9tUGFydGlhbCwgRG9tRnJhZ21lbnQ7XG4gICAgICAgIGNpcmN1bGFyLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgRG9tRnJhZ21lbnQgPSBjaXJjdWxhci5Eb21GcmFnbWVudDtcbiAgICAgICAgfSk7XG4gICAgICAgIERvbVBhcnRpYWwgPSBmdW5jdGlvbiAob3B0aW9ucywgZG9jRnJhZykge1xuICAgICAgICAgICAgdmFyIHBhcmVudEZyYWdtZW50ID0gdGhpcy5wYXJlbnRGcmFnbWVudCA9IG9wdGlvbnMucGFyZW50RnJhZ21lbnQsIGRlc2NyaXB0b3I7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlcy5QQVJUSUFMO1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gb3B0aW9ucy5kZXNjcmlwdG9yLnI7XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gb3B0aW9ucy5pbmRleDtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5kZXNjcmlwdG9yLnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcnRpYWxzIG11c3QgaGF2ZSBhIHN0YXRpYyByZWZlcmVuY2UgKG5vIGV4cHJlc3Npb25zKS4gVGhpcyBtYXkgY2hhbmdlIGluIGEgZnV0dXJlIHZlcnNpb24gb2YgUmFjdGl2ZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlc2NyaXB0b3IgPSBnZXRQYXJ0aWFsRGVzY3JpcHRvcihwYXJlbnRGcmFnbWVudC5yb290LCBvcHRpb25zLmRlc2NyaXB0b3Iucik7XG4gICAgICAgICAgICB0aGlzLmZyYWdtZW50ID0gbmV3IERvbUZyYWdtZW50KHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdG9yOiBkZXNjcmlwdG9yLFxuICAgICAgICAgICAgICAgIHJvb3Q6IHBhcmVudEZyYWdtZW50LnJvb3QsXG4gICAgICAgICAgICAgICAgcE5vZGU6IHBhcmVudEZyYWdtZW50LnBOb2RlLFxuICAgICAgICAgICAgICAgIGNvbnRleHRTdGFjazogcGFyZW50RnJhZ21lbnQuY29udGV4dFN0YWNrLFxuICAgICAgICAgICAgICAgIG93bmVyOiB0aGlzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChkb2NGcmFnKSB7XG4gICAgICAgICAgICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZCh0aGlzLmZyYWdtZW50LmRvY0ZyYWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBEb21QYXJ0aWFsLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIGZpcnN0Tm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYWdtZW50LmZpcnN0Tm9kZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmROZXh0Tm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudEZyYWdtZW50LmZpbmROZXh0Tm9kZSh0aGlzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXRhY2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mcmFnbWVudC5kZXRhY2goKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKGRlc3Ryb3kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYWdtZW50LnRlYXJkb3duKGRlc3Ryb3kpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJhZ21lbnQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mcmFnbWVudC5maW5kKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kQWxsOiBmdW5jdGlvbiAoc2VsZWN0b3IsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJhZ21lbnQuZmluZEFsbChzZWxlY3RvciwgcXVlcnkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmRDb21wb25lbnQ6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYWdtZW50LmZpbmRDb21wb25lbnQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmRBbGxDb21wb25lbnRzOiBmdW5jdGlvbiAoc2VsZWN0b3IsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJhZ21lbnQuZmluZEFsbENvbXBvbmVudHMoc2VsZWN0b3IsIHF1ZXJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIERvbVBhcnRpYWw7XG4gICAgfShjb25maWdfdHlwZXMsIHJlbmRlcl9Eb21GcmFnbWVudF9QYXJ0aWFsX2dldFBhcnRpYWxEZXNjcmlwdG9yLCBjaXJjdWxhcik7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0NvbXBvbmVudF9pbml0aWFsaXNlX2NyZWF0ZU1vZGVsX0NvbXBvbmVudFBhcmFtZXRlciA9IGZ1bmN0aW9uIChTdHJpbmdGcmFnbWVudCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIENvbXBvbmVudFBhcmFtZXRlciA9IGZ1bmN0aW9uIChjb21wb25lbnQsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50RnJhZ21lbnQgPSBjb21wb25lbnQucGFyZW50RnJhZ21lbnQ7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICAgICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICAgICAgdGhpcy5mcmFnbWVudCA9IG5ldyBTdHJpbmdGcmFnbWVudCh7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRvcjogdmFsdWUsXG4gICAgICAgICAgICAgICAgcm9vdDogY29tcG9uZW50LnJvb3QsXG4gICAgICAgICAgICAgICAgb3duZXI6IHRoaXMsXG4gICAgICAgICAgICAgICAgY29udGV4dFN0YWNrOiBjb21wb25lbnQucGFyZW50RnJhZ21lbnQuY29udGV4dFN0YWNrXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2VsZlVwZGF0aW5nID0gdGhpcy5mcmFnbWVudC5pc1NpbXBsZSgpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZnJhZ21lbnQuZ2V0VmFsdWUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29tcG9uZW50UGFyYW1ldGVyLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIGJ1YmJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGZVcGRhdGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuZGVmZXJyZWQgJiYgdGhpcy5yZWFkeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3QuX2RlZmVycmVkLmF0dHJzLnB1c2godGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmZXJyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmZyYWdtZW50LmdldFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2Uuc2V0KHRoaXMua2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFnbWVudC50ZWFyZG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQ29tcG9uZW50UGFyYW1ldGVyO1xuICAgIH0ocmVuZGVyX1N0cmluZ0ZyYWdtZW50X19TdHJpbmdGcmFnbWVudCk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0NvbXBvbmVudF9pbml0aWFsaXNlX2NyZWF0ZU1vZGVsX19jcmVhdGVNb2RlbCA9IGZ1bmN0aW9uICh0eXBlcywgcGFyc2VKU09OLCByZXNvbHZlUmVmLCBDb21wb25lbnRQYXJhbWV0ZXIpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50LCBhdHRyaWJ1dGVzLCB0b0JpbmQpIHtcbiAgICAgICAgICAgIHZhciBkYXRhLCBrZXksIHZhbHVlO1xuICAgICAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICAgICAgY29tcG9uZW50LmNvbXBsZXhQYXJhbWV0ZXJzID0gW107XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGdldFZhbHVlKGNvbXBvbmVudCwga2V5LCBhdHRyaWJ1dGVzW2tleV0sIHRvQmluZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBnZXRWYWx1ZShjb21wb25lbnQsIGtleSwgZGVzY3JpcHRvciwgdG9CaW5kKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVyLCBwYXJzZWQsIHJvb3QsIHBhcmVudEZyYWdtZW50LCBrZXlwYXRoO1xuICAgICAgICAgICAgcm9vdCA9IGNvbXBvbmVudC5yb290O1xuICAgICAgICAgICAgcGFyZW50RnJhZ21lbnQgPSBjb21wb25lbnQucGFyZW50RnJhZ21lbnQ7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlc2NyaXB0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkID0gcGFyc2VKU09OKGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZWQgPyBwYXJzZWQudmFsdWUgOiBkZXNjcmlwdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdG9yWzBdLnQgPT09IHR5cGVzLklOVEVSUE9MQVRPUiAmJiBkZXNjcmlwdG9yWzBdLnIpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50RnJhZ21lbnQuaW5kZXhSZWZzICYmIHBhcmVudEZyYWdtZW50LmluZGV4UmVmc1tkZXNjcmlwdG9yWzBdLnJdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudEZyYWdtZW50LmluZGV4UmVmc1tkZXNjcmlwdG9yWzBdLnJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrZXlwYXRoID0gcmVzb2x2ZVJlZihyb290LCBkZXNjcmlwdG9yWzBdLnIsIHBhcmVudEZyYWdtZW50LmNvbnRleHRTdGFjaykgfHwgZGVzY3JpcHRvclswXS5yO1xuICAgICAgICAgICAgICAgIHRvQmluZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRLZXlwYXRoOiBrZXksXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudEtleXBhdGg6IGtleXBhdGhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdC5nZXQoa2V5cGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJhbWV0ZXIgPSBuZXcgQ29tcG9uZW50UGFyYW1ldGVyKGNvbXBvbmVudCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgIGNvbXBvbmVudC5jb21wbGV4UGFyYW1ldGVycy5wdXNoKHBhcmFtZXRlcik7XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1ldGVyLnZhbHVlO1xuICAgICAgICB9XG4gICAgfShjb25maWdfdHlwZXMsIHV0aWxzX3BhcnNlSlNPTiwgc2hhcmVkX3Jlc29sdmVSZWYsIHJlbmRlcl9Eb21GcmFnbWVudF9Db21wb25lbnRfaW5pdGlhbGlzZV9jcmVhdGVNb2RlbF9Db21wb25lbnRQYXJhbWV0ZXIpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9Db21wb25lbnRfaW5pdGlhbGlzZV9jcmVhdGVJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50LCBDb21wb25lbnQsIGRhdGEsIGRvY0ZyYWcsIGNvbnRlbnREZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UsIHBhcmVudEZyYWdtZW50LCBwYXJ0aWFscywgcm9vdDtcbiAgICAgICAgICAgIHBhcmVudEZyYWdtZW50ID0gY29tcG9uZW50LnBhcmVudEZyYWdtZW50O1xuICAgICAgICAgICAgcm9vdCA9IGNvbXBvbmVudC5yb290O1xuICAgICAgICAgICAgcGFydGlhbHMgPSB7IGNvbnRlbnQ6IGNvbnRlbnREZXNjcmlwdG9yIHx8IFtdIH07XG4gICAgICAgICAgICBpbnN0YW5jZSA9IG5ldyBDb21wb25lbnQoe1xuICAgICAgICAgICAgICAgIGVsOiBwYXJlbnRGcmFnbWVudC5wTm9kZS5jbG9uZU5vZGUoZmFsc2UpLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgcGFydGlhbHM6IHBhcnRpYWxzLFxuICAgICAgICAgICAgICAgIF9wYXJlbnQ6IHJvb3QsXG4gICAgICAgICAgICAgICAgYWRhcHRvcnM6IHJvb3QuYWRhcHRvcnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW5zdGFuY2UuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgICAgICAgICAgY29tcG9uZW50Lmluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICAgICAgICBpbnN0YW5jZS5pbnNlcnQoZG9jRnJhZyk7XG4gICAgICAgICAgICBpbnN0YW5jZS5mcmFnbWVudC5wTm9kZSA9IHBhcmVudEZyYWdtZW50LnBOb2RlO1xuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciByZW5kZXJfRG9tRnJhZ21lbnRfQ29tcG9uZW50X2luaXRpYWxpc2VfY3JlYXRlT2JzZXJ2ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIG9ic2VydmVPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGluaXQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRlYnVnOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNvbXBvbmVudCwgdG9CaW5kKSB7XG4gICAgICAgICAgICB2YXIgcGFpciwgaTtcbiAgICAgICAgICAgIGNvbXBvbmVudC5vYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgICAgIGkgPSB0b0JpbmQubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIHBhaXIgPSB0b0JpbmRbaV07XG4gICAgICAgICAgICAgICAgYmluZChjb21wb25lbnQsIHBhaXIucGFyZW50S2V5cGF0aCwgcGFpci5jaGlsZEtleXBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBiaW5kKGNvbXBvbmVudCwgcGFyZW50S2V5cGF0aCwgY2hpbGRLZXlwYXRoKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50SW5zdGFuY2UsIGNoaWxkSW5zdGFuY2UsIHNldHRpbmdQYXJlbnQsIHNldHRpbmdDaGlsZCwgb2JzZXJ2ZXJzLCBvYnNlcnZlciwgdmFsdWU7XG4gICAgICAgICAgICBwYXJlbnRJbnN0YW5jZSA9IGNvbXBvbmVudC5yb290O1xuICAgICAgICAgICAgY2hpbGRJbnN0YW5jZSA9IGNvbXBvbmVudC5pbnN0YW5jZTtcbiAgICAgICAgICAgIG9ic2VydmVycyA9IGNvbXBvbmVudC5vYnNlcnZlcnM7XG4gICAgICAgICAgICBvYnNlcnZlciA9IHBhcmVudEluc3RhbmNlLm9ic2VydmUocGFyZW50S2V5cGF0aCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nUGFyZW50ICYmICFwYXJlbnRJbnN0YW5jZS5fd3JhcHBlZFtwYXJlbnRLZXlwYXRoXSkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nQ2hpbGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZEluc3RhbmNlLnNldChjaGlsZEtleXBhdGgsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ0NoaWxkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgb2JzZXJ2ZU9wdGlvbnMpO1xuICAgICAgICAgICAgb2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICAgICAgICAgICAgaWYgKGNoaWxkSW5zdGFuY2UudHdvd2F5KSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIgPSBjaGlsZEluc3RhbmNlLm9ic2VydmUoY2hpbGRLZXlwYXRoLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdQYXJlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50SW5zdGFuY2Uuc2V0KHBhcmVudEtleXBhdGgsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdQYXJlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIG9ic2VydmVPcHRpb25zKTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBjaGlsZEluc3RhbmNlLmdldChjaGlsZEtleXBhdGgpO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudEluc3RhbmNlLnNldChwYXJlbnRLZXlwYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSgpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9Db21wb25lbnRfaW5pdGlhbGlzZV9wcm9wYWdhdGVFdmVudHMgPSBmdW5jdGlvbiAod2Fybikge1xuICAgICAgICBcbiAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9ICdDb21wb25lbnRzIGN1cnJlbnRseSBvbmx5IHN1cHBvcnQgc2ltcGxlIGV2ZW50cyAtIHlvdSBjYW5ub3QgaW5jbHVkZSBhcmd1bWVudHMuIFNvcnJ5ISc7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50LCBldmVudHNEZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnROYW1lO1xuICAgICAgICAgICAgZm9yIChldmVudE5hbWUgaW4gZXZlbnRzRGVzY3JpcHRvcikge1xuICAgICAgICAgICAgICAgIGlmIChldmVudHNEZXNjcmlwdG9yLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGFnYXRlRXZlbnQoY29tcG9uZW50Lmluc3RhbmNlLCBjb21wb25lbnQucm9vdCwgZXZlbnROYW1lLCBldmVudHNEZXNjcmlwdG9yW2V2ZW50TmFtZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gcHJvcGFnYXRlRXZlbnQoY2hpbGRJbnN0YW5jZSwgcGFyZW50SW5zdGFuY2UsIGV2ZW50TmFtZSwgcHJveHlFdmVudE5hbWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJveHlFdmVudE5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudEluc3RhbmNlLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdhcm4oZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoaWxkSW5zdGFuY2Uub24oZXZlbnROYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIGFyZ3MudW5zaGlmdChwcm94eUV2ZW50TmFtZSk7XG4gICAgICAgICAgICAgICAgcGFyZW50SW5zdGFuY2UuZmlyZS5hcHBseShwYXJlbnRJbnN0YW5jZSwgYXJncyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0odXRpbHNfd2Fybik7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0NvbXBvbmVudF9pbml0aWFsaXNlX3VwZGF0ZUxpdmVRdWVyaWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgIHZhciBhbmNlc3RvciwgcXVlcnk7XG4gICAgICAgICAgICBhbmNlc3RvciA9IGNvbXBvbmVudC5yb290O1xuICAgICAgICAgICAgd2hpbGUgKGFuY2VzdG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXJ5ID0gYW5jZXN0b3IuX2xpdmVDb21wb25lbnRRdWVyaWVzW2NvbXBvbmVudC5uYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeS5wdXNoKGNvbXBvbmVudC5pbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFuY2VzdG9yID0gYW5jZXN0b3IuX3BhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0NvbXBvbmVudF9pbml0aWFsaXNlX19pbml0aWFsaXNlID0gZnVuY3Rpb24gKHR5cGVzLCB3YXJuLCBjcmVhdGVNb2RlbCwgY3JlYXRlSW5zdGFuY2UsIGNyZWF0ZU9ic2VydmVycywgcHJvcGFnYXRlRXZlbnRzLCB1cGRhdGVMaXZlUXVlcmllcykge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjb21wb25lbnQsIG9wdGlvbnMsIGRvY0ZyYWcpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnRGcmFnbWVudCwgcm9vdCwgQ29tcG9uZW50LCBkYXRhLCB0b0JpbmQ7XG4gICAgICAgICAgICBwYXJlbnRGcmFnbWVudCA9IGNvbXBvbmVudC5wYXJlbnRGcmFnbWVudCA9IG9wdGlvbnMucGFyZW50RnJhZ21lbnQ7XG4gICAgICAgICAgICByb290ID0gcGFyZW50RnJhZ21lbnQucm9vdDtcbiAgICAgICAgICAgIGNvbXBvbmVudC5yb290ID0gcm9vdDtcbiAgICAgICAgICAgIGNvbXBvbmVudC50eXBlID0gdHlwZXMuQ09NUE9ORU5UO1xuICAgICAgICAgICAgY29tcG9uZW50Lm5hbWUgPSBvcHRpb25zLmRlc2NyaXB0b3IuZTtcbiAgICAgICAgICAgIGNvbXBvbmVudC5pbmRleCA9IG9wdGlvbnMuaW5kZXg7XG4gICAgICAgICAgICBjb21wb25lbnQub2JzZXJ2ZXJzID0gW107XG4gICAgICAgICAgICBDb21wb25lbnQgPSByb290LmNvbXBvbmVudHNbb3B0aW9ucy5kZXNjcmlwdG9yLmVdO1xuICAgICAgICAgICAgaWYgKCFDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbXBvbmVudCBcIicgKyBvcHRpb25zLmRlc2NyaXB0b3IuZSArICdcIiBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvQmluZCA9IFtdO1xuICAgICAgICAgICAgZGF0YSA9IGNyZWF0ZU1vZGVsKGNvbXBvbmVudCwgb3B0aW9ucy5kZXNjcmlwdG9yLmEsIHRvQmluZCk7XG4gICAgICAgICAgICBjcmVhdGVJbnN0YW5jZShjb21wb25lbnQsIENvbXBvbmVudCwgZGF0YSwgZG9jRnJhZywgb3B0aW9ucy5kZXNjcmlwdG9yLmYpO1xuICAgICAgICAgICAgY3JlYXRlT2JzZXJ2ZXJzKGNvbXBvbmVudCwgdG9CaW5kKTtcbiAgICAgICAgICAgIHByb3BhZ2F0ZUV2ZW50cyhjb21wb25lbnQsIG9wdGlvbnMuZGVzY3JpcHRvci52KTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRlc2NyaXB0b3IudDEgfHwgb3B0aW9ucy5kZXNjcmlwdG9yLnQyIHx8IG9wdGlvbnMuZGVzY3JpcHRvci5vKSB7XG4gICAgICAgICAgICAgICAgd2FybignVGhlIFwiaW50cm9cIiwgXCJvdXRyb1wiIGFuZCBcImRlY29yYXRvclwiIGRpcmVjdGl2ZXMgaGF2ZSBubyBlZmZlY3Qgb24gY29tcG9uZW50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlTGl2ZVF1ZXJpZXMoY29tcG9uZW50KTtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ190eXBlcywgdXRpbHNfd2FybiwgcmVuZGVyX0RvbUZyYWdtZW50X0NvbXBvbmVudF9pbml0aWFsaXNlX2NyZWF0ZU1vZGVsX19jcmVhdGVNb2RlbCwgcmVuZGVyX0RvbUZyYWdtZW50X0NvbXBvbmVudF9pbml0aWFsaXNlX2NyZWF0ZUluc3RhbmNlLCByZW5kZXJfRG9tRnJhZ21lbnRfQ29tcG9uZW50X2luaXRpYWxpc2VfY3JlYXRlT2JzZXJ2ZXJzLCByZW5kZXJfRG9tRnJhZ21lbnRfQ29tcG9uZW50X2luaXRpYWxpc2VfcHJvcGFnYXRlRXZlbnRzLCByZW5kZXJfRG9tRnJhZ21lbnRfQ29tcG9uZW50X2luaXRpYWxpc2VfdXBkYXRlTGl2ZVF1ZXJpZXMpO1xudmFyIHJlbmRlcl9Eb21GcmFnbWVudF9Db21wb25lbnRfX0NvbXBvbmVudCA9IGZ1bmN0aW9uIChpbml0aWFsaXNlKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgRG9tQ29tcG9uZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGRvY0ZyYWcpIHtcbiAgICAgICAgICAgIGluaXRpYWxpc2UodGhpcywgb3B0aW9ucywgZG9jRnJhZyk7XG4gICAgICAgIH07XG4gICAgICAgIERvbUNvbXBvbmVudC5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBmaXJzdE5vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZS5mcmFnbWVudC5maXJzdE5vZGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kTmV4dE5vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRGcmFnbWVudC5maW5kTmV4dE5vZGUodGhpcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGV0YWNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UuZnJhZ21lbnQuZGV0YWNoKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuY29tcGxleFBhcmFtZXRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxleFBhcmFtZXRlcnMucG9wKCkudGVhcmRvd24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVycy5wb3AoKS5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXJ5ID0gdGhpcy5yb290Ll9saXZlQ29tcG9uZW50UXVlcmllc1t0aGlzLm5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5Ll9yZW1vdmUodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UudGVhcmRvd24oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlLmZyYWdtZW50LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UuZnJhZ21lbnQuZmluZChzZWxlY3Rvcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZEFsbDogZnVuY3Rpb24gKHNlbGVjdG9yLCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlLmZyYWdtZW50LmZpbmRBbGwoc2VsZWN0b3IsIHF1ZXJ5KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kQ29tcG9uZW50OiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSB0aGlzLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmRBbGxDb21wb25lbnRzOiBmdW5jdGlvbiAoc2VsZWN0b3IsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcXVlcnkuX3Rlc3QodGhpcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UuZnJhZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5mcmFnbWVudC5maW5kQWxsQ29tcG9uZW50cyhzZWxlY3RvciwgcXVlcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIERvbUNvbXBvbmVudDtcbiAgICB9KHJlbmRlcl9Eb21GcmFnbWVudF9Db21wb25lbnRfaW5pdGlhbGlzZV9faW5pdGlhbGlzZSk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X0NvbW1lbnQgPSBmdW5jdGlvbiAodHlwZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBEb21Db21tZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGRvY0ZyYWcpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGVzLkNPTU1FTlQ7XG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0b3IgPSBvcHRpb25zLmRlc2NyaXB0b3I7XG4gICAgICAgICAgICBpZiAoZG9jRnJhZykge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZSA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQob3B0aW9ucy5kZXNjcmlwdG9yLmYpO1xuICAgICAgICAgICAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQodGhpcy5ub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgRG9tQ29tbWVudC5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBkZXRhY2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uIChkZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlc3Ryb3kpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlyc3ROb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnPCEtLScgKyB0aGlzLmRlc2NyaXB0b3IuZiArICctLT4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRG9tQ29tbWVudDtcbiAgICB9KGNvbmZpZ190eXBlcyk7XG52YXIgcmVuZGVyX0RvbUZyYWdtZW50X19Eb21GcmFnbWVudCA9IGZ1bmN0aW9uICh0eXBlcywgbWF0Y2hlcywgaW5pdEZyYWdtZW50LCBpbnNlcnRIdG1sLCBUZXh0LCBJbnRlcnBvbGF0b3IsIFNlY3Rpb24sIFRyaXBsZSwgRWxlbWVudCwgUGFydGlhbCwgQ29tcG9uZW50LCBDb21tZW50LCBjaXJjdWxhcikge1xuICAgICAgICBcbiAgICAgICAgdmFyIERvbUZyYWdtZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBOb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmRlc2NyaXB0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5odG1sID0gb3B0aW9ucy5kZXNjcmlwdG9yO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRvY0ZyYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlcyA9IGluc2VydEh0bWwodGhpcy5odG1sLCBvcHRpb25zLnBOb2RlLnRhZ05hbWUsIHRoaXMuZG9jRnJhZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbml0RnJhZ21lbnQodGhpcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIERvbUZyYWdtZW50LnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIGRldGFjaDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBsZW4sIGk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IHRoaXMubm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY0ZyYWcuYXBwZW5kQ2hpbGQodGhpcy5ub2Rlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2NGcmFnLmFwcGVuZENoaWxkKHRoaXMuaXRlbXNbaV0uZGV0YWNoKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRvY0ZyYWc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JlYXRlSXRlbTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZGVzY3JpcHRvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBUZXh0KG9wdGlvbnMsIHRoaXMuZG9jRnJhZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaCAob3B0aW9ucy5kZXNjcmlwdG9yLnQpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLklOVEVSUE9MQVRPUjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnRlcnBvbGF0b3Iob3B0aW9ucywgdGhpcy5kb2NGcmFnKTtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlNFQ1RJT046XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU2VjdGlvbihvcHRpb25zLCB0aGlzLmRvY0ZyYWcpO1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVFJJUExFOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFRyaXBsZShvcHRpb25zLCB0aGlzLmRvY0ZyYWcpO1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuRUxFTUVOVDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9vdC5jb21wb25lbnRzW29wdGlvbnMuZGVzY3JpcHRvci5lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb21wb25lbnQob3B0aW9ucywgdGhpcy5kb2NGcmFnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVsZW1lbnQob3B0aW9ucywgdGhpcy5kb2NGcmFnKTtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlBBUlRJQUw6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUGFydGlhbChvcHRpb25zLCB0aGlzLmRvY0ZyYWcpO1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuQ09NTUVOVDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb21tZW50KG9wdGlvbnMsIHRoaXMuZG9jRnJhZyk7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgdmVyeSBzdHJhbmdlIGhhcHBlbmVkLiBQbGVhc2UgZmlsZSBhbiBpc3N1ZSBhdCBodHRwczovL2dpdGh1Yi5jb20vUmFjdGl2ZUpTL1JhY3RpdmUvaXNzdWVzLiBUaGFua3MhJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoZGVzdHJveSkge1xuICAgICAgICAgICAgICAgIHZhciBub2RlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGVzICYmIGRlc3Ryb3kpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUgPSB0aGlzLm5vZGVzLnBvcCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnBvcCgpLnRlYXJkb3duKGRlc3Ryb3kpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubm9kZXMgPSB0aGlzLml0ZW1zID0gdGhpcy5kb2NGcmFnID0gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaXJzdE5vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zWzBdLmZpcnN0Tm9kZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ub2Rlcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ub2Rlc1swXSB8fCBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kTmV4dE5vZGU6IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gaXRlbS5pbmRleDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pdGVtc1tpbmRleCArIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zW2luZGV4ICsgMV0uZmlyc3ROb2RlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm93bmVyID09PSB0aGlzLnJvb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm93bmVyLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3duZXIuY29tcG9uZW50LmZpbmROZXh0Tm9kZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vd25lci5maW5kTmV4dE5vZGUodGhpcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaHRtbCwgaSwgbGVuLCBpdGVtO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmh0bWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHRtbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaHRtbCA9ICcnO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xuICAgICAgICAgICAgICAgICAgICBodG1sICs9IGl0ZW0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIGksIGxlbiwgaXRlbSwgbm9kZSwgcXVlcnlSZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5ub2Rlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubm9kZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMobm9kZSwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnlSZXN1bHQgPSBub2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5UmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5pdGVtc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmZpbmQgJiYgKHF1ZXJ5UmVzdWx0ID0gaXRlbS5maW5kKHNlbGVjdG9yKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnlSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmRBbGw6IGZ1bmN0aW9uIChzZWxlY3RvciwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgbGVuLCBpdGVtLCBub2RlLCBxdWVyeUFsbFJlc3VsdCwgbnVtTm9kZXMsIGo7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5ub2Rlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubm9kZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMobm9kZSwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnkucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWVyeUFsbFJlc3VsdCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1Ob2RlcyA9IHF1ZXJ5QWxsUmVzdWx0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbnVtTm9kZXM7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeS5wdXNoKHF1ZXJ5QWxsUmVzdWx0W2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuaXRlbXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5maW5kQWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5maW5kQWxsKHNlbGVjdG9yLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmRDb21wb25lbnQ6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHZhciBsZW4sIGksIGl0ZW0sIHF1ZXJ5UmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uZmluZENvbXBvbmVudCAmJiAocXVlcnlSZXN1bHQgPSBpdGVtLmZpbmRDb21wb25lbnQoc2VsZWN0b3IpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeVJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZEFsbENvbXBvbmVudHM6IGZ1bmN0aW9uIChzZWxlY3RvciwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgbGVuLCBpdGVtO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uZmluZEFsbENvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmZpbmRBbGxDb21wb25lbnRzKHNlbGVjdG9yLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjaXJjdWxhci5Eb21GcmFnbWVudCA9IERvbUZyYWdtZW50O1xuICAgICAgICByZXR1cm4gRG9tRnJhZ21lbnQ7XG4gICAgfShjb25maWdfdHlwZXMsIHV0aWxzX21hdGNoZXMsIHJlbmRlcl9zaGFyZWRfaW5pdEZyYWdtZW50LCByZW5kZXJfRG9tRnJhZ21lbnRfc2hhcmVkX2luc2VydEh0bWwsIHJlbmRlcl9Eb21GcmFnbWVudF9UZXh0LCByZW5kZXJfRG9tRnJhZ21lbnRfSW50ZXJwb2xhdG9yLCByZW5kZXJfRG9tRnJhZ21lbnRfU2VjdGlvbl9fU2VjdGlvbiwgcmVuZGVyX0RvbUZyYWdtZW50X1RyaXBsZSwgcmVuZGVyX0RvbUZyYWdtZW50X0VsZW1lbnRfX0VsZW1lbnQsIHJlbmRlcl9Eb21GcmFnbWVudF9QYXJ0aWFsX19QYXJ0aWFsLCByZW5kZXJfRG9tRnJhZ21lbnRfQ29tcG9uZW50X19Db21wb25lbnQsIHJlbmRlcl9Eb21GcmFnbWVudF9Db21tZW50LCBjaXJjdWxhcik7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfcmVuZGVyID0gZnVuY3Rpb24gKGdldEVsZW1lbnQsIG1ha2VUcmFuc2l0aW9uTWFuYWdlciwgcHJlRG9tVXBkYXRlLCBwb3N0RG9tVXBkYXRlLCBEb21GcmFnbWVudCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGNvbXBsZXRlKSB7XG4gICAgICAgICAgICB2YXIgdHJhbnNpdGlvbk1hbmFnZXI7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2luaXRpbmcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgY2FsbCByYWN0aXZlLnJlbmRlcigpIGRpcmVjdGx5IScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbk1hbmFnZXIgPSB0cmFuc2l0aW9uTWFuYWdlciA9IG1ha2VUcmFuc2l0aW9uTWFuYWdlcih0aGlzLCBjb21wbGV0ZSk7XG4gICAgICAgICAgICB0aGlzLmZyYWdtZW50ID0gbmV3IERvbUZyYWdtZW50KHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdG9yOiB0aGlzLnRlbXBsYXRlLFxuICAgICAgICAgICAgICAgIHJvb3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgb3duZXI6IHRoaXMsXG4gICAgICAgICAgICAgICAgcE5vZGU6IHRhcmdldFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwcmVEb21VcGRhdGUodGhpcyk7XG4gICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHRoaXMuZnJhZ21lbnQuZG9jRnJhZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3N0RG9tVXBkYXRlKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbk1hbmFnZXIgPSBudWxsO1xuICAgICAgICAgICAgdHJhbnNpdGlvbk1hbmFnZXIucmVhZHkoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgIH0odXRpbHNfZ2V0RWxlbWVudCwgc2hhcmVkX21ha2VUcmFuc2l0aW9uTWFuYWdlciwgc2hhcmVkX3ByZURvbVVwZGF0ZSwgc2hhcmVkX3Bvc3REb21VcGRhdGUsIHJlbmRlcl9Eb21GcmFnbWVudF9fRG9tRnJhZ21lbnQpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX3JlbmRlckhUTUwgPSBmdW5jdGlvbiAod2Fybikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdhcm4oJ3JlbmRlckhUTUwoKSBoYXMgYmVlbiBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvbi4gUGxlYXNlIHVzZSB0b0hUTUwoKSBpbnN0ZWFkJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b0hUTUwoKTtcbiAgICAgICAgfTtcbiAgICB9KHV0aWxzX3dhcm4pO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX3RvSFRNTCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mcmFnbWVudC50b1N0cmluZygpO1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV90ZWFyZG93biA9IGZ1bmN0aW9uIChtYWtlVHJhbnNpdGlvbk1hbmFnZXIsIGNsZWFyQ2FjaGUpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY29tcGxldGUpIHtcbiAgICAgICAgICAgIHZhciBrZXlwYXRoLCB0cmFuc2l0aW9uTWFuYWdlciwgcHJldmlvdXNUcmFuc2l0aW9uTWFuYWdlcjtcbiAgICAgICAgICAgIHRoaXMuZmlyZSgndGVhcmRvd24nKTtcbiAgICAgICAgICAgIHByZXZpb3VzVHJhbnNpdGlvbk1hbmFnZXIgPSB0aGlzLl90cmFuc2l0aW9uTWFuYWdlcjtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25NYW5hZ2VyID0gdHJhbnNpdGlvbk1hbmFnZXIgPSBtYWtlVHJhbnNpdGlvbk1hbmFnZXIodGhpcywgY29tcGxldGUpO1xuICAgICAgICAgICAgdGhpcy5mcmFnbWVudC50ZWFyZG93bih0cnVlKTtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLl9hbmltYXRpb25zWzBdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uc1swXS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGtleXBhdGggaW4gdGhpcy5fY2FjaGUpIHtcbiAgICAgICAgICAgICAgICBjbGVhckNhY2hlKHRoaXMsIGtleXBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbk1hbmFnZXIgPSBwcmV2aW91c1RyYW5zaXRpb25NYW5hZ2VyO1xuICAgICAgICAgICAgdHJhbnNpdGlvbk1hbmFnZXIucmVhZHkoKTtcbiAgICAgICAgfTtcbiAgICB9KHNoYXJlZF9tYWtlVHJhbnNpdGlvbk1hbmFnZXIsIHNoYXJlZF9jbGVhckNhY2hlKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfYWRkID0gZnVuY3Rpb24gKGlzTnVtZXJpYykge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyb290LCBrZXlwYXRoLCBkKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGtleXBhdGggIT09ICdzdHJpbmcnIHx8ICFpc051bWVyaWMoZCkpIHtcbiAgICAgICAgICAgICAgICBpZiAocm9vdC5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBhcmd1bWVudHMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSByb290LmdldChrZXlwYXRoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc051bWVyaWModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvb3QuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgYWRkIHRvIGEgbm9uLW51bWVyaWMgdmFsdWUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm9vdC5zZXQoa2V5cGF0aCwgdmFsdWUgKyBkKTtcbiAgICAgICAgfTtcbiAgICB9KHV0aWxzX2lzTnVtZXJpYyk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfYWRkID0gZnVuY3Rpb24gKGFkZCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChrZXlwYXRoLCBkKSB7XG4gICAgICAgICAgICBhZGQodGhpcywga2V5cGF0aCwgZCA9PT0gdW5kZWZpbmVkID8gMSA6IGQpO1xuICAgICAgICB9O1xuICAgIH0oUmFjdGl2ZV9wcm90b3R5cGVfc2hhcmVkX2FkZCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfc3VidHJhY3QgPSBmdW5jdGlvbiAoYWRkKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGtleXBhdGgsIGQpIHtcbiAgICAgICAgICAgIGFkZCh0aGlzLCBrZXlwYXRoLCBkID09PSB1bmRlZmluZWQgPyAtMSA6IC1kKTtcbiAgICAgICAgfTtcbiAgICB9KFJhY3RpdmVfcHJvdG90eXBlX3NoYXJlZF9hZGQpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX3RvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoa2V5cGF0aCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXlwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQmFkIGFyZ3VtZW50cycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZ2V0KGtleXBhdGgpO1xuICAgICAgICAgICAgdGhpcy5zZXQoa2V5cGF0aCwgIXZhbHVlKTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfbWVyZ2VfbWFwT2xkVG9OZXdJbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAob2xkQXJyYXksIG5ld0FycmF5KSB7XG4gICAgICAgICAgICB2YXIgdXNlZEluZGljZXMsIG1hcHBlciwgZmlyc3RVbnVzZWRJbmRleCwgbmV3SW5kaWNlcywgY2hhbmdlZDtcbiAgICAgICAgICAgIHVzZWRJbmRpY2VzID0ge307XG4gICAgICAgICAgICBmaXJzdFVudXNlZEluZGV4ID0gMDtcbiAgICAgICAgICAgIG1hcHBlciA9IGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4LCBzdGFydCwgbGVuO1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gZmlyc3RVbnVzZWRJbmRleDtcbiAgICAgICAgICAgICAgICBsZW4gPSBuZXdBcnJheS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IG5ld0FycmF5LmluZGV4T2YoaXRlbSwgc3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdGFydCA9IGluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICB9IHdoaWxlICh1c2VkSW5kaWNlc1tpbmRleF0gJiYgc3RhcnQgPCBsZW4pO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gZmlyc3RVbnVzZWRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdFVudXNlZEluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gaSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdXNlZEluZGljZXNbaW5kZXhdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbmV3SW5kaWNlcyA9IG9sZEFycmF5Lm1hcChtYXBwZXIpO1xuICAgICAgICAgICAgbmV3SW5kaWNlcy51bmNoYW5nZWQgPSAhY2hhbmdlZDtcbiAgICAgICAgICAgIHJldHVybiBuZXdJbmRpY2VzO1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9tZXJnZV9xdWV1ZURlcGVuZGFudHMgPSBmdW5jdGlvbiAodHlwZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBxdWV1ZURlcGVuZGFudHMoa2V5cGF0aCwgZGVwcywgbWVyZ2VRdWV1ZSwgdXBkYXRlUXVldWUpIHtcbiAgICAgICAgICAgIHZhciBpLCBkZXBlbmRhbnQ7XG4gICAgICAgICAgICBpID0gZGVwcy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgZGVwZW5kYW50ID0gZGVwc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoZGVwZW5kYW50LnR5cGUgPT09IHR5cGVzLlJFRkVSRU5DRSkge1xuICAgICAgICAgICAgICAgICAgICBkZXBlbmRhbnQudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZXBlbmRhbnQua2V5cGF0aCA9PT0ga2V5cGF0aCAmJiBkZXBlbmRhbnQudHlwZSA9PT0gdHlwZXMuU0VDVElPTiAmJiAhZGVwZW5kYW50LmludmVydGVkICYmIGRlcGVuZGFudC5kb2NGcmFnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlUXVldWVbbWVyZ2VRdWV1ZS5sZW5ndGhdID0gZGVwZW5kYW50O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVF1ZXVlW3VwZGF0ZVF1ZXVlLmxlbmd0aF0gPSBkZXBlbmRhbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oY29uZmlnX3R5cGVzKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9tZXJnZV9fbWVyZ2UgPSBmdW5jdGlvbiAod2FybiwgaXNBcnJheSwgY2xlYXJDYWNoZSwgcHJlRG9tVXBkYXRlLCBwcm9jZXNzRGVmZXJyZWRVcGRhdGVzLCBtYWtlVHJhbnNpdGlvbk1hbmFnZXIsIG5vdGlmeURlcGVuZGFudHMsIHJlcGxhY2VEYXRhLCBtYXBPbGRUb05ld0luZGV4LCBxdWV1ZURlcGVuZGFudHMpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBpZGVudGlmaWVycyA9IHt9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGtleXBhdGgsIGFycmF5LCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudEFycmF5LCBvbGRBcnJheSwgbmV3QXJyYXksIGlkZW50aWZpZXIsIGxlbmd0aFVuY2hhbmdlZCwgaSwgbmV3SW5kaWNlcywgbWVyZ2VRdWV1ZSwgdXBkYXRlUXVldWUsIGRlcHNCeUtleXBhdGgsIGRlcHMsIHRyYW5zaXRpb25NYW5hZ2VyLCBwcmV2aW91c1RyYW5zaXRpb25NYW5hZ2VyLCB1cHN0cmVhbVF1ZXVlLCBrZXlzO1xuICAgICAgICAgICAgY3VycmVudEFycmF5ID0gdGhpcy5nZXQoa2V5cGF0aCk7XG4gICAgICAgICAgICBpZiAoIWlzQXJyYXkoY3VycmVudEFycmF5KSB8fCAhaXNBcnJheShhcnJheSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXQoa2V5cGF0aCwgYXJyYXksIG9wdGlvbnMgJiYgb3B0aW9ucy5jb21wbGV0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZW5ndGhVbmNoYW5nZWQgPSBjdXJyZW50QXJyYXkubGVuZ3RoID09PSBhcnJheS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmNvbXBhcmUpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5jb21wYXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkZW50aWZpZXIgPSBzdHJpbmdpZnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5jb21wYXJlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyID0gZ2V0SWRlbnRpZmllcihvcHRpb25zLmNvbXBhcmUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuY29tcGFyZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkZW50aWZpZXIgPSBvcHRpb25zLmNvbXBhcmU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgYGNvbXBhcmVgIG9wdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb24sIG9yIGEgc3RyaW5nIHJlcHJlc2VudGluZyBhbiBpZGVudGlmeWluZyBmaWVsZCAob3IgYHRydWVgIHRvIHVzZSBKU09OLnN0cmluZ2lmeSknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgb2xkQXJyYXkgPSBjdXJyZW50QXJyYXkubWFwKGlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICAgICAgICBuZXdBcnJheSA9IGFycmF5Lm1hcChpZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhcm4oJ01lcmdlIG9wZXJhdGlvbjogY29tcGFyaXNvbiBmYWlsZWQuIEZhbGxpbmcgYmFjayB0byBpZGVudGl0eSBjaGVja2luZycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9sZEFycmF5ID0gY3VycmVudEFycmF5O1xuICAgICAgICAgICAgICAgICAgICBuZXdBcnJheSA9IGFycmF5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2xkQXJyYXkgPSBjdXJyZW50QXJyYXk7XG4gICAgICAgICAgICAgICAgbmV3QXJyYXkgPSBhcnJheTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld0luZGljZXMgPSBtYXBPbGRUb05ld0luZGV4KG9sZEFycmF5LCBuZXdBcnJheSk7XG4gICAgICAgICAgICBjbGVhckNhY2hlKHRoaXMsIGtleXBhdGgpO1xuICAgICAgICAgICAgcmVwbGFjZURhdGEodGhpcywga2V5cGF0aCwgYXJyYXkpO1xuICAgICAgICAgICAgaWYgKG5ld0luZGljZXMudW5jaGFuZ2VkICYmIGxlbmd0aFVuY2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpb3VzVHJhbnNpdGlvbk1hbmFnZXIgPSB0aGlzLl90cmFuc2l0aW9uTWFuYWdlcjtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25NYW5hZ2VyID0gdHJhbnNpdGlvbk1hbmFnZXIgPSBtYWtlVHJhbnNpdGlvbk1hbmFnZXIodGhpcywgb3B0aW9ucyAmJiBvcHRpb25zLmNvbXBsZXRlKTtcbiAgICAgICAgICAgIG1lcmdlUXVldWUgPSBbXTtcbiAgICAgICAgICAgIHVwZGF0ZVF1ZXVlID0gW107XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5fZGVwcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGRlcHNCeUtleXBhdGggPSB0aGlzLl9kZXBzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghZGVwc0J5S2V5cGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVwcyA9IGRlcHNCeUtleXBhdGhba2V5cGF0aF07XG4gICAgICAgICAgICAgICAgaWYgKGRlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVldWVEZXBlbmRhbnRzKGtleXBhdGgsIGRlcHMsIG1lcmdlUXVldWUsIHVwZGF0ZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICAgICAgcHJlRG9tVXBkYXRlKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobWVyZ2VRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlUXVldWUucG9wKCkubWVyZ2UobmV3SW5kaWNlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHVwZGF0ZVF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlUXVldWUucG9wKCkudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9jZXNzRGVmZXJyZWRVcGRhdGVzKHRoaXMpO1xuICAgICAgICAgICAgdXBzdHJlYW1RdWV1ZSA9IFtdO1xuICAgICAgICAgICAga2V5cyA9IGtleXBhdGguc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGtleXMucG9wKCk7XG4gICAgICAgICAgICAgICAgdXBzdHJlYW1RdWV1ZVt1cHN0cmVhbVF1ZXVlLmxlbmd0aF0gPSBrZXlzLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vdGlmeURlcGVuZGFudHMubXVsdGlwbGUodGhpcywgdXBzdHJlYW1RdWV1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAob2xkQXJyYXkubGVuZ3RoICE9PSBuZXdBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBub3RpZnlEZXBlbmRhbnRzKHRoaXMsIGtleXBhdGggKyAnLmxlbmd0aCcsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbk1hbmFnZXIgPSBwcmV2aW91c1RyYW5zaXRpb25NYW5hZ2VyO1xuICAgICAgICAgICAgdHJhbnNpdGlvbk1hbmFnZXIucmVhZHkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gc3RyaW5naWZ5KGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRJZGVudGlmaWVyKHN0cikge1xuICAgICAgICAgICAgaWYgKCFpZGVudGlmaWVyc1tzdHJdKSB7XG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcnNbc3RyXSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtW3N0cl07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpZGVudGlmaWVyc1tzdHJdO1xuICAgICAgICB9XG4gICAgfSh1dGlsc193YXJuLCB1dGlsc19pc0FycmF5LCBzaGFyZWRfY2xlYXJDYWNoZSwgc2hhcmVkX3ByZURvbVVwZGF0ZSwgc2hhcmVkX3Byb2Nlc3NEZWZlcnJlZFVwZGF0ZXMsIHNoYXJlZF9tYWtlVHJhbnNpdGlvbk1hbmFnZXIsIHNoYXJlZF9ub3RpZnlEZXBlbmRhbnRzLCBSYWN0aXZlX3Byb3RvdHlwZV9zaGFyZWRfcmVwbGFjZURhdGEsIFJhY3RpdmVfcHJvdG90eXBlX21lcmdlX21hcE9sZFRvTmV3SW5kZXgsIFJhY3RpdmVfcHJvdG90eXBlX21lcmdlX3F1ZXVlRGVwZW5kYW50cyk7XG52YXIgUmFjdGl2ZV9wcm90b3R5cGVfZGV0YWNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYWdtZW50LmRldGFjaCgpO1xuICAgICAgICB9O1xuICAgIH0oKTtcbnZhciBSYWN0aXZlX3Byb3RvdHlwZV9pbnNlcnQgPSBmdW5jdGlvbiAoZ2V0RWxlbWVudCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGFuY2hvcikge1xuICAgICAgICAgICAgdGFyZ2V0ID0gZ2V0RWxlbWVudCh0YXJnZXQpO1xuICAgICAgICAgICAgYW5jaG9yID0gZ2V0RWxlbWVudChhbmNob3IpIHx8IG51bGw7XG4gICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc3BlY2lmeSBhIHZhbGlkIHRhcmdldCB0byBpbnNlcnQgaW50bycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0Lmluc2VydEJlZm9yZSh0aGlzLmRldGFjaCgpLCBhbmNob3IpO1xuICAgICAgICAgICAgdGhpcy5mcmFnbWVudC5wTm9kZSA9IHRhcmdldDtcbiAgICAgICAgfTtcbiAgICB9KHV0aWxzX2dldEVsZW1lbnQpO1xudmFyIFJhY3RpdmVfcHJvdG90eXBlX19wcm90b3R5cGUgPSBmdW5jdGlvbiAoZ2V0LCBzZXQsIHVwZGF0ZSwgdXBkYXRlTW9kZWwsIGFuaW1hdGUsIG9uLCBvZmYsIG9ic2VydmUsIGZpcmUsIGZpbmQsIGZpbmRBbGwsIGZpbmRDb21wb25lbnQsIGZpbmRBbGxDb21wb25lbnRzLCByZW5kZXIsIHJlbmRlckhUTUwsIHRvSFRNTCwgdGVhcmRvd24sIGFkZCwgc3VidHJhY3QsIHRvZ2dsZSwgbWVyZ2UsIGRldGFjaCwgaW5zZXJ0KSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBnZXQsXG4gICAgICAgICAgICBzZXQ6IHNldCxcbiAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlLFxuICAgICAgICAgICAgdXBkYXRlTW9kZWw6IHVwZGF0ZU1vZGVsLFxuICAgICAgICAgICAgYW5pbWF0ZTogYW5pbWF0ZSxcbiAgICAgICAgICAgIG9uOiBvbixcbiAgICAgICAgICAgIG9mZjogb2ZmLFxuICAgICAgICAgICAgb2JzZXJ2ZTogb2JzZXJ2ZSxcbiAgICAgICAgICAgIGZpcmU6IGZpcmUsXG4gICAgICAgICAgICBmaW5kOiBmaW5kLFxuICAgICAgICAgICAgZmluZEFsbDogZmluZEFsbCxcbiAgICAgICAgICAgIGZpbmRDb21wb25lbnQ6IGZpbmRDb21wb25lbnQsXG4gICAgICAgICAgICBmaW5kQWxsQ29tcG9uZW50czogZmluZEFsbENvbXBvbmVudHMsXG4gICAgICAgICAgICByZW5kZXJIVE1MOiByZW5kZXJIVE1MLFxuICAgICAgICAgICAgdG9IVE1MOiB0b0hUTUwsXG4gICAgICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgICAgIHRlYXJkb3duOiB0ZWFyZG93bixcbiAgICAgICAgICAgIGFkZDogYWRkLFxuICAgICAgICAgICAgc3VidHJhY3Q6IHN1YnRyYWN0LFxuICAgICAgICAgICAgdG9nZ2xlOiB0b2dnbGUsXG4gICAgICAgICAgICBtZXJnZTogbWVyZ2UsXG4gICAgICAgICAgICBkZXRhY2g6IGRldGFjaCxcbiAgICAgICAgICAgIGluc2VydDogaW5zZXJ0XG4gICAgICAgIH07XG4gICAgfShSYWN0aXZlX3Byb3RvdHlwZV9nZXRfX2dldCwgUmFjdGl2ZV9wcm90b3R5cGVfc2V0LCBSYWN0aXZlX3Byb3RvdHlwZV91cGRhdGUsIFJhY3RpdmVfcHJvdG90eXBlX3VwZGF0ZU1vZGVsLCBSYWN0aXZlX3Byb3RvdHlwZV9hbmltYXRlX19hbmltYXRlLCBSYWN0aXZlX3Byb3RvdHlwZV9vbiwgUmFjdGl2ZV9wcm90b3R5cGVfb2ZmLCBSYWN0aXZlX3Byb3RvdHlwZV9vYnNlcnZlX19vYnNlcnZlLCBSYWN0aXZlX3Byb3RvdHlwZV9maXJlLCBSYWN0aXZlX3Byb3RvdHlwZV9maW5kLCBSYWN0aXZlX3Byb3RvdHlwZV9maW5kQWxsLCBSYWN0aXZlX3Byb3RvdHlwZV9maW5kQ29tcG9uZW50LCBSYWN0aXZlX3Byb3RvdHlwZV9maW5kQWxsQ29tcG9uZW50cywgUmFjdGl2ZV9wcm90b3R5cGVfcmVuZGVyLCBSYWN0aXZlX3Byb3RvdHlwZV9yZW5kZXJIVE1MLCBSYWN0aXZlX3Byb3RvdHlwZV90b0hUTUwsIFJhY3RpdmVfcHJvdG90eXBlX3RlYXJkb3duLCBSYWN0aXZlX3Byb3RvdHlwZV9hZGQsIFJhY3RpdmVfcHJvdG90eXBlX3N1YnRyYWN0LCBSYWN0aXZlX3Byb3RvdHlwZV90b2dnbGUsIFJhY3RpdmVfcHJvdG90eXBlX21lcmdlX19tZXJnZSwgUmFjdGl2ZV9wcm90b3R5cGVfZGV0YWNoLCBSYWN0aXZlX3Byb3RvdHlwZV9pbnNlcnQpO1xudmFyIGV4dGVuZF9yZWdpc3RyaWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICdwYXJ0aWFscycsXG4gICAgICAgICAgICAndHJhbnNpdGlvbnMnLFxuICAgICAgICAgICAgJ2V2ZW50cycsXG4gICAgICAgICAgICAnY29tcG9uZW50cycsXG4gICAgICAgICAgICAnZGVjb3JhdG9ycycsXG4gICAgICAgICAgICAnZGF0YSdcbiAgICAgICAgXTtcbiAgICB9KCk7XG52YXIgZXh0ZW5kX2luaXRPcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICdlbCcsXG4gICAgICAgICAgICAndGVtcGxhdGUnLFxuICAgICAgICAgICAgJ2NvbXBsZXRlJyxcbiAgICAgICAgICAgICdtb2RpZnlBcnJheXMnLFxuICAgICAgICAgICAgJ21hZ2ljJyxcbiAgICAgICAgICAgICd0d293YXknLFxuICAgICAgICAgICAgJ2xhenknLFxuICAgICAgICAgICAgJ2FwcGVuZCcsXG4gICAgICAgICAgICAncHJlc2VydmVXaGl0ZXNwYWNlJyxcbiAgICAgICAgICAgICdzYW5pdGl6ZScsXG4gICAgICAgICAgICAnc3RyaXBDb21tZW50cycsXG4gICAgICAgICAgICAnbm9JbnRybycsXG4gICAgICAgICAgICAndHJhbnNpdGlvbnNFbmFibGVkJyxcbiAgICAgICAgICAgICdhZGFwdG9ycydcbiAgICAgICAgXTtcbiAgICB9KCk7XG52YXIgZXh0ZW5kX2luaGVyaXRGcm9tUGFyZW50ID0gZnVuY3Rpb24gKHJlZ2lzdHJpZXMsIGluaXRPcHRpb25zLCBjcmVhdGUpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoQ2hpbGQsIFBhcmVudCkge1xuICAgICAgICAgICAgcmVnaXN0cmllcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIGlmIChQYXJlbnRbcHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgICAgIENoaWxkW3Byb3BlcnR5XSA9IGNyZWF0ZShQYXJlbnRbcHJvcGVydHldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGluaXRPcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgQ2hpbGRbcHJvcGVydHldID0gUGFyZW50W3Byb3BlcnR5XTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0oZXh0ZW5kX3JlZ2lzdHJpZXMsIGV4dGVuZF9pbml0T3B0aW9ucywgdXRpbHNfY3JlYXRlKTtcbnZhciBleHRlbmRfd3JhcE1ldGhvZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobWV0aG9kLCBzdXBlck1ldGhvZCkge1xuICAgICAgICAgICAgaWYgKC9fc3VwZXIvLnRlc3QobWV0aG9kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfc3VwZXIgPSB0aGlzLl9zdXBlciwgcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdXBlciA9IHN1cGVyTWV0aG9kO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSBfc3VwZXI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgZXh0ZW5kX3V0aWxzX2F1Z21lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gICAgICAgICAgICB2YXIga2V5O1xuICAgICAgICAgICAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgfTtcbiAgICB9KCk7XG52YXIgZXh0ZW5kX2luaGVyaXRGcm9tQ2hpbGRQcm9wcyA9IGZ1bmN0aW9uIChyZWdpc3RyaWVzLCBpbml0T3B0aW9ucywgd3JhcE1ldGhvZCwgYXVnbWVudCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIGJsYWNrbGlzdCwgYmxhY2tsaXN0ZWQ7XG4gICAgICAgIGJsYWNrbGlzdCA9IHJlZ2lzdHJpZXMuY29uY2F0KGluaXRPcHRpb25zKTtcbiAgICAgICAgYmxhY2tsaXN0ZWQgPSB7fTtcbiAgICAgICAgYmxhY2tsaXN0LmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICBibGFja2xpc3RlZFtwcm9wZXJ0eV0gPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChDaGlsZCwgY2hpbGRQcm9wcykge1xuICAgICAgICAgICAgdmFyIGtleSwgbWVtYmVyO1xuICAgICAgICAgICAgcmVnaXN0cmllcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGNoaWxkUHJvcHNbcHJvcGVydHldO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ2hpbGRbcHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdWdtZW50KENoaWxkW3Byb3BlcnR5XSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ2hpbGRbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGluaXRPcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gY2hpbGRQcm9wc1twcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgQ2hpbGRbcHJvcGVydHldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDaGlsZFtwcm9wZXJ0eV0gPSB3cmFwTWV0aG9kKHZhbHVlLCBDaGlsZFtwcm9wZXJ0eV0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ2hpbGRbcHJvcGVydHldID0gY2hpbGRQcm9wc1twcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIGNoaWxkUHJvcHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRQcm9wcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICFibGFja2xpc3RlZFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbWJlciA9IGNoaWxkUHJvcHNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1iZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIENoaWxkLnByb3RvdHlwZVtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDaGlsZC5wcm90b3R5cGVba2V5XSA9IHdyYXBNZXRob2QobWVtYmVyLCBDaGlsZC5wcm90b3R5cGVba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDaGlsZC5wcm90b3R5cGVba2V5XSA9IG1lbWJlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KGV4dGVuZF9yZWdpc3RyaWVzLCBleHRlbmRfaW5pdE9wdGlvbnMsIGV4dGVuZF93cmFwTWV0aG9kLCBleHRlbmRfdXRpbHNfYXVnbWVudCk7XG52YXIgZXh0ZW5kX2V4dHJhY3RJbmxpbmVQYXJ0aWFscyA9IGZ1bmN0aW9uIChpc09iamVjdCwgYXVnbWVudCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChDaGlsZCwgY2hpbGRQcm9wcykge1xuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KENoaWxkLnRlbXBsYXRlKSkge1xuICAgICAgICAgICAgICAgIGlmICghQ2hpbGQucGFydGlhbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgQ2hpbGQucGFydGlhbHMgPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXVnbWVudChDaGlsZC5wYXJ0aWFscywgQ2hpbGQudGVtcGxhdGUucGFydGlhbHMpO1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZFByb3BzLnBhcnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIGF1Z21lbnQoQ2hpbGQucGFydGlhbHMsIGNoaWxkUHJvcHMucGFydGlhbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBDaGlsZC50ZW1wbGF0ZSA9IENoaWxkLnRlbXBsYXRlLm1haW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSh1dGlsc19pc09iamVjdCwgZXh0ZW5kX3V0aWxzX2F1Z21lbnQpO1xudmFyIGV4dGVuZF9jb25kaXRpb25hbGx5UGFyc2VUZW1wbGF0ZSA9IGZ1bmN0aW9uIChlcnJvcnMsIGlzQ2xpZW50LCBwYXJzZSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChDaGlsZCkge1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlRWw7XG4gICAgICAgICAgICBpZiAodHlwZW9mIENoaWxkLnRlbXBsYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmICghcGFyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5taXNzaW5nUGFyc2VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKENoaWxkLnRlbXBsYXRlLmNoYXJBdCgwKSA9PT0gJyMnICYmIGlzQ2xpZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChDaGlsZC50ZW1wbGF0ZS5zdWJzdHJpbmcoMSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcGxhdGVFbCAmJiB0ZW1wbGF0ZUVsLnRhZ05hbWUgPT09ICdTQ1JJUFQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDaGlsZC50ZW1wbGF0ZSA9IHBhcnNlKHRlbXBsYXRlRWwuaW5uZXJIVE1MLCBDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHRlbXBsYXRlIGVsZW1lbnQgKCcgKyBDaGlsZC50ZW1wbGF0ZSArICcpJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBDaGlsZC50ZW1wbGF0ZSA9IHBhcnNlKENoaWxkLnRlbXBsYXRlLCBDaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0oY29uZmlnX2Vycm9ycywgY29uZmlnX2lzQ2xpZW50LCBwYXJzZV9fcGFyc2UpO1xudmFyIGV4dGVuZF9jb25kaXRpb25hbGx5UGFyc2VQYXJ0aWFscyA9IGZ1bmN0aW9uIChlcnJvcnMsIHBhcnNlKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKENoaWxkKSB7XG4gICAgICAgICAgICB2YXIga2V5O1xuICAgICAgICAgICAgaWYgKENoaWxkLnBhcnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gQ2hpbGQucGFydGlhbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKENoaWxkLnBhcnRpYWxzLmhhc093blByb3BlcnR5KGtleSkgJiYgdHlwZW9mIENoaWxkLnBhcnRpYWxzW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5taXNzaW5nUGFyc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIENoaWxkLnBhcnRpYWxzW2tleV0gPSBwYXJzZShDaGlsZC5wYXJ0aWFsc1trZXldLCBDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfShjb25maWdfZXJyb3JzLCBwYXJzZV9fcGFyc2UpO1xudmFyIGV4dGVuZF91dGlsc19jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0ge30sIGtleTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIHV0aWxzX2V4dGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICB2YXIgcHJvcCwgc291cmNlLCBzb3VyY2VzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICAgIHdoaWxlIChzb3VyY2UgPSBzb3VyY2VzLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgIH07XG4gICAgfSgpO1xudmFyIFJhY3RpdmVfaW5pdGlhbGlzZSA9IGZ1bmN0aW9uIChpc0NsaWVudCwgZXJyb3JzLCB3YXJuLCBjcmVhdGUsIGV4dGVuZCwgZGVmaW5lUHJvcGVydHksIGRlZmluZVByb3BlcnRpZXMsIGdldEVsZW1lbnQsIGlzT2JqZWN0LCBtYWdpY0FkYXB0b3IsIHBhcnNlKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZ2V0T2JqZWN0LCBnZXRBcnJheSwgZGVmYXVsdE9wdGlvbnMsIHJlZ2lzdHJpZXM7XG4gICAgICAgIGdldE9iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfTtcbiAgICAgICAgZ2V0QXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH07XG4gICAgICAgIGRlZmF1bHRPcHRpb25zID0gY3JlYXRlKG51bGwpO1xuICAgICAgICBkZWZpbmVQcm9wZXJ0aWVzKGRlZmF1bHRPcHRpb25zLCB7XG4gICAgICAgICAgICBwcmVzZXJ2ZVdoaXRlc3BhY2U6IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFwcGVuZDoge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHdvd2F5OiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vZGlmeUFycmF5czoge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZ2V0T2JqZWN0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGF6eToge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVidWc6IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYW5zaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZ2V0T2JqZWN0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVjb3JhdG9yczoge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGdldE9iamVjdFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGdldE9iamVjdFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vSW50cm86IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYW5zaXRpb25zRW5hYmxlZDoge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYWdpYzoge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRhcHRvcnM6IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBnZXRBcnJheVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmVnaXN0cmllcyA9IFtcbiAgICAgICAgICAgICdjb21wb25lbnRzJyxcbiAgICAgICAgICAgICdkZWNvcmF0b3JzJyxcbiAgICAgICAgICAgICdldmVudHMnLFxuICAgICAgICAgICAgJ3BhcnRpYWxzJyxcbiAgICAgICAgICAgICd0cmFuc2l0aW9ucycsXG4gICAgICAgICAgICAnZGF0YSdcbiAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyYWN0aXZlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIga2V5LCB0ZW1wbGF0ZSwgdGVtcGxhdGVFbCwgcGFyc2VkVGVtcGxhdGU7XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBkZWZhdWx0T3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSB0eXBlb2YgZGVmYXVsdE9wdGlvbnNba2V5XSA9PT0gJ2Z1bmN0aW9uJyA/IGRlZmF1bHRPcHRpb25zW2tleV0oKSA6IGRlZmF1bHRPcHRpb25zW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmaW5lUHJvcGVydGllcyhyYWN0aXZlLCB7XG4gICAgICAgICAgICAgICAgX2luaXRpbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfZ3VpZDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIsIHY7XG4gICAgICAgICAgICAgICAgICAgICAgICByID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBjID09ICd4JyA/IHIgOiByICYgMyB8IDg7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfc3Viczoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY3JlYXRlKG51bGwpLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9jYWNoZTogeyB2YWx1ZToge30gfSxcbiAgICAgICAgICAgICAgICBfY2FjaGVNYXA6IHsgdmFsdWU6IGNyZWF0ZShudWxsKSB9LFxuICAgICAgICAgICAgICAgIF9kZXBzOiB7IHZhbHVlOiBbXSB9LFxuICAgICAgICAgICAgICAgIF9kZXBzTWFwOiB7IHZhbHVlOiBjcmVhdGUobnVsbCkgfSxcbiAgICAgICAgICAgICAgICBfcGF0dGVybk9ic2VydmVyczogeyB2YWx1ZTogW10gfSxcbiAgICAgICAgICAgICAgICBfcGVuZGluZ1Jlc29sdXRpb246IHsgdmFsdWU6IFtdIH0sXG4gICAgICAgICAgICAgICAgX2RlZmVycmVkOiB7IHZhbHVlOiB7fSB9LFxuICAgICAgICAgICAgICAgIF9ldmFsdWF0b3JzOiB7IHZhbHVlOiBjcmVhdGUobnVsbCkgfSxcbiAgICAgICAgICAgICAgICBfdHdvd2F5QmluZGluZ3M6IHsgdmFsdWU6IHt9IH0sXG4gICAgICAgICAgICAgICAgX3RyYW5zaXRpb25NYW5hZ2VyOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2FuaW1hdGlvbnM6IHsgdmFsdWU6IFtdIH0sXG4gICAgICAgICAgICAgICAgbm9kZXM6IHsgdmFsdWU6IHt9IH0sXG4gICAgICAgICAgICAgICAgX3dyYXBwZWQ6IHsgdmFsdWU6IGNyZWF0ZShudWxsKSB9LFxuICAgICAgICAgICAgICAgIF9saXZlUXVlcmllczogeyB2YWx1ZTogW10gfSxcbiAgICAgICAgICAgICAgICBfbGl2ZUNvbXBvbmVudFF1ZXJpZXM6IHsgdmFsdWU6IFtdIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVmaW5lUHJvcGVydGllcyhyYWN0aXZlLl9kZWZlcnJlZCwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHZhbHVlOiBbXSB9LFxuICAgICAgICAgICAgICAgIGV2YWxzOiB7IHZhbHVlOiBbXSB9LFxuICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlczogeyB2YWx1ZTogW10gfSxcbiAgICAgICAgICAgICAgICBjaGVja2JveGVzOiB7IHZhbHVlOiBbXSB9LFxuICAgICAgICAgICAgICAgIHJhZGlvczogeyB2YWx1ZTogW10gfSxcbiAgICAgICAgICAgICAgICBvYnNlcnZlcnM6IHsgdmFsdWU6IFtdIH0sXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbnM6IHsgdmFsdWU6IFtdIH0sXG4gICAgICAgICAgICAgICAgbGl2ZVF1ZXJpZXM6IHsgdmFsdWU6IFtdIH0sXG4gICAgICAgICAgICAgICAgZGVjb3JhdG9yczogeyB2YWx1ZTogW10gfSxcbiAgICAgICAgICAgICAgICBmb2N1c2FibGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByYWN0aXZlLmFkYXB0b3JzID0gb3B0aW9ucy5hZGFwdG9ycztcbiAgICAgICAgICAgIHJhY3RpdmUubW9kaWZ5QXJyYXlzID0gb3B0aW9ucy5tb2RpZnlBcnJheXM7XG4gICAgICAgICAgICByYWN0aXZlLm1hZ2ljID0gb3B0aW9ucy5tYWdpYztcbiAgICAgICAgICAgIHJhY3RpdmUudHdvd2F5ID0gb3B0aW9ucy50d293YXk7XG4gICAgICAgICAgICByYWN0aXZlLmxhenkgPSBvcHRpb25zLmxhenk7XG4gICAgICAgICAgICByYWN0aXZlLmRlYnVnID0gb3B0aW9ucy5kZWJ1ZztcbiAgICAgICAgICAgIGlmIChyYWN0aXZlLm1hZ2ljICYmICFtYWdpY0FkYXB0b3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dldHRlcnMgYW5kIHNldHRlcnMgKG1hZ2ljIG1vZGUpIGFyZSBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuX3BhcmVudCkge1xuICAgICAgICAgICAgICAgIGRlZmluZVByb3BlcnR5KHJhY3RpdmUsICdfcGFyZW50JywgeyB2YWx1ZTogb3B0aW9ucy5fcGFyZW50IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZWwpIHtcbiAgICAgICAgICAgICAgICByYWN0aXZlLmVsID0gZ2V0RWxlbWVudChvcHRpb25zLmVsKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJhY3RpdmUuZWwgJiYgcmFjdGl2ZS5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGNvbnRhaW5lciBlbGVtZW50Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZXZlbnREZWZpbml0aW9ucykge1xuICAgICAgICAgICAgICAgIHdhcm4oJ3JhY3RpdmUuZXZlbnREZWZpbml0aW9ucyBoYXMgYmVlbiBkZXByZWNhdGVkIGluIGZhdm91ciBvZiByYWN0aXZlLmV2ZW50cy4gU3VwcG9ydCB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlIHZlcnNpb25zJyk7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5ldmVudHMgPSBvcHRpb25zLmV2ZW50RGVmaW5pdGlvbnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWdpc3RyaWVzLmZvckVhY2goZnVuY3Rpb24gKHJlZ2lzdHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJhY3RpdmUuY29uc3RydWN0b3JbcmVnaXN0cnldKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhY3RpdmVbcmVnaXN0cnldID0gZXh0ZW5kKGNyZWF0ZShyYWN0aXZlLmNvbnN0cnVjdG9yW3JlZ2lzdHJ5XSB8fCB7fSksIG9wdGlvbnNbcmVnaXN0cnldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnNbcmVnaXN0cnldKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhY3RpdmVbcmVnaXN0cnldID0gb3B0aW9uc1tyZWdpc3RyeV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmICghcGFyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5taXNzaW5nUGFyc2VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRlbXBsYXRlLmNoYXJBdCgwKSA9PT0gJyMnICYmIGlzQ2xpZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZS5zdWJzdHJpbmcoMSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcGxhdGVFbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkVGVtcGxhdGUgPSBwYXJzZSh0ZW1wbGF0ZUVsLmlubmVySFRNTCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHRlbXBsYXRlIGVsZW1lbnQgKCcgKyB0ZW1wbGF0ZSArICcpJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZWRUZW1wbGF0ZSA9IHBhcnNlKHRlbXBsYXRlLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcnNlZFRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNPYmplY3QocGFyc2VkVGVtcGxhdGUpKSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5kKHJhY3RpdmUucGFydGlhbHMsIHBhcnNlZFRlbXBsYXRlLnBhcnRpYWxzKTtcbiAgICAgICAgICAgICAgICBwYXJzZWRUZW1wbGF0ZSA9IHBhcnNlZFRlbXBsYXRlLm1haW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyc2VkVGVtcGxhdGUgJiYgcGFyc2VkVGVtcGxhdGUubGVuZ3RoID09PSAxICYmIHR5cGVvZiBwYXJzZWRUZW1wbGF0ZVswXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWRUZW1wbGF0ZSA9IHBhcnNlZFRlbXBsYXRlWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmFjdGl2ZS50ZW1wbGF0ZSA9IHBhcnNlZFRlbXBsYXRlO1xuICAgICAgICAgICAgZXh0ZW5kKHJhY3RpdmUucGFydGlhbHMsIG9wdGlvbnMucGFydGlhbHMpO1xuICAgICAgICAgICAgcmFjdGl2ZS5wYXJzZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgcHJlc2VydmVXaGl0ZXNwYWNlOiBvcHRpb25zLnByZXNlcnZlV2hpdGVzcGFjZSxcbiAgICAgICAgICAgICAgICBzYW5pdGl6ZTogb3B0aW9ucy5zYW5pdGl6ZSxcbiAgICAgICAgICAgICAgICBzdHJpcENvbW1lbnRzOiBvcHRpb25zLnN0cmlwQ29tbWVudHNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByYWN0aXZlLnRyYW5zaXRpb25zRW5hYmxlZCA9IG9wdGlvbnMubm9JbnRybyA/IGZhbHNlIDogb3B0aW9ucy50cmFuc2l0aW9uc0VuYWJsZWQ7XG4gICAgICAgICAgICBpZiAoaXNDbGllbnQgJiYgIXJhY3RpdmUuZWwpIHtcbiAgICAgICAgICAgICAgICByYWN0aXZlLmVsID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJhY3RpdmUuZWwgJiYgIW9wdGlvbnMuYXBwZW5kKSB7XG4gICAgICAgICAgICAgICAgcmFjdGl2ZS5lbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJhY3RpdmUucmVuZGVyKHJhY3RpdmUuZWwsIG9wdGlvbnMuY29tcGxldGUpO1xuICAgICAgICAgICAgcmFjdGl2ZS50cmFuc2l0aW9uc0VuYWJsZWQgPSBvcHRpb25zLnRyYW5zaXRpb25zRW5hYmxlZDtcbiAgICAgICAgICAgIHJhY3RpdmUuX2luaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9KGNvbmZpZ19pc0NsaWVudCwgY29uZmlnX2Vycm9ycywgdXRpbHNfd2FybiwgdXRpbHNfY3JlYXRlLCB1dGlsc19leHRlbmQsIHV0aWxzX2RlZmluZVByb3BlcnR5LCB1dGlsc19kZWZpbmVQcm9wZXJ0aWVzLCB1dGlsc19nZXRFbGVtZW50LCB1dGlsc19pc09iamVjdCwgUmFjdGl2ZV9wcm90b3R5cGVfZ2V0X21hZ2ljQWRhcHRvciwgcGFyc2VfX3BhcnNlKTtcbnZhciBleHRlbmRfaW5pdENoaWxkSW5zdGFuY2UgPSBmdW5jdGlvbiAoZmlsbEdhcHMsIGluaXRPcHRpb25zLCBjbG9uZSwgd3JhcE1ldGhvZCwgaW5pdGlhbGlzZSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjaGlsZCwgQ2hpbGQsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGluaXRPcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gb3B0aW9uc1twcm9wZXJ0eV0sIGRlZmF1bHRWYWx1ZSA9IENoaWxkW3Byb3BlcnR5XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZhdWx0VmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1twcm9wZXJ0eV0gPSB3cmFwTWV0aG9kKHZhbHVlLCBkZWZhdWx0VmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiBkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zW3Byb3BlcnR5XSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChjaGlsZC5iZWZvcmVJbml0KSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuYmVmb3JlSW5pdChvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluaXRpYWxpc2UoY2hpbGQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKGNoaWxkLmluaXQpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5pbml0KG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0odXRpbHNfZmlsbEdhcHMsIGV4dGVuZF9pbml0T3B0aW9ucywgZXh0ZW5kX3V0aWxzX2Nsb25lLCBleHRlbmRfd3JhcE1ldGhvZCwgUmFjdGl2ZV9pbml0aWFsaXNlKTtcbnZhciBleHRlbmRfX2V4dGVuZCA9IGZ1bmN0aW9uIChjcmVhdGUsIGluaGVyaXRGcm9tUGFyZW50LCBpbmhlcml0RnJvbUNoaWxkUHJvcHMsIGV4dHJhY3RJbmxpbmVQYXJ0aWFscywgY29uZGl0aW9uYWxseVBhcnNlVGVtcGxhdGUsIGNvbmRpdGlvbmFsbHlQYXJzZVBhcnRpYWxzLCBpbml0Q2hpbGRJbnN0YW5jZSwgY2lyY3VsYXIpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBSYWN0aXZlO1xuICAgICAgICBjaXJjdWxhci5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFJhY3RpdmUgPSBjaXJjdWxhci5SYWN0aXZlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjaGlsZFByb3BzKSB7XG4gICAgICAgICAgICB2YXIgUGFyZW50ID0gdGhpcywgQ2hpbGQ7XG4gICAgICAgICAgICBDaGlsZCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaW5pdENoaWxkSW5zdGFuY2UodGhpcywgQ2hpbGQsIG9wdGlvbnMgfHwge30pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIENoaWxkLnByb3RvdHlwZSA9IGNyZWF0ZShQYXJlbnQucHJvdG90eXBlKTtcbiAgICAgICAgICAgIENoaWxkLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENoaWxkO1xuICAgICAgICAgICAgaW5oZXJpdEZyb21QYXJlbnQoQ2hpbGQsIFBhcmVudCk7XG4gICAgICAgICAgICBpbmhlcml0RnJvbUNoaWxkUHJvcHMoQ2hpbGQsIGNoaWxkUHJvcHMpO1xuICAgICAgICAgICAgY29uZGl0aW9uYWxseVBhcnNlVGVtcGxhdGUoQ2hpbGQpO1xuICAgICAgICAgICAgZXh0cmFjdElubGluZVBhcnRpYWxzKENoaWxkLCBjaGlsZFByb3BzKTtcbiAgICAgICAgICAgIGNvbmRpdGlvbmFsbHlQYXJzZVBhcnRpYWxzKENoaWxkKTtcbiAgICAgICAgICAgIENoaWxkLmV4dGVuZCA9IFBhcmVudC5leHRlbmQ7XG4gICAgICAgICAgICByZXR1cm4gQ2hpbGQ7XG4gICAgICAgIH07XG4gICAgfSh1dGlsc19jcmVhdGUsIGV4dGVuZF9pbmhlcml0RnJvbVBhcmVudCwgZXh0ZW5kX2luaGVyaXRGcm9tQ2hpbGRQcm9wcywgZXh0ZW5kX2V4dHJhY3RJbmxpbmVQYXJ0aWFscywgZXh0ZW5kX2NvbmRpdGlvbmFsbHlQYXJzZVRlbXBsYXRlLCBleHRlbmRfY29uZGl0aW9uYWxseVBhcnNlUGFydGlhbHMsIGV4dGVuZF9pbml0Q2hpbGRJbnN0YW5jZSwgY2lyY3VsYXIpO1xudmFyIFJhY3RpdmVfX1JhY3RpdmUgPSBmdW5jdGlvbiAoc3ZnLCBjcmVhdGUsIGRlZmluZVByb3BlcnRpZXMsIHByb3RvdHlwZSwgcGFydGlhbFJlZ2lzdHJ5LCBhZGFwdG9yUmVnaXN0cnksIGVhc2luZ1JlZ2lzdHJ5LCBSYWN0aXZlX2V4dGVuZCwgcGFyc2UsIGluaXRpYWxpc2UsIGNpcmN1bGFyKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgUmFjdGl2ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBpbml0aWFsaXNlKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgICAgICBkZWZpbmVQcm9wZXJ0aWVzKFJhY3RpdmUsIHtcbiAgICAgICAgICAgIHByb3RvdHlwZTogeyB2YWx1ZTogcHJvdG90eXBlIH0sXG4gICAgICAgICAgICBwYXJ0aWFsczogeyB2YWx1ZTogcGFydGlhbFJlZ2lzdHJ5IH0sXG4gICAgICAgICAgICBhZGFwdG9yczogeyB2YWx1ZTogYWRhcHRvclJlZ2lzdHJ5IH0sXG4gICAgICAgICAgICBlYXNpbmc6IHsgdmFsdWU6IGVhc2luZ1JlZ2lzdHJ5IH0sXG4gICAgICAgICAgICB0cmFuc2l0aW9uczogeyB2YWx1ZToge30gfSxcbiAgICAgICAgICAgIGV2ZW50czogeyB2YWx1ZToge30gfSxcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IHsgdmFsdWU6IHt9IH0sXG4gICAgICAgICAgICBkZWNvcmF0b3JzOiB7IHZhbHVlOiB7fSB9LFxuICAgICAgICAgICAgc3ZnOiB7IHZhbHVlOiBzdmcgfSxcbiAgICAgICAgICAgIFZFUlNJT046IHsgdmFsdWU6ICcwLjMuOScgfVxuICAgICAgICB9KTtcbiAgICAgICAgUmFjdGl2ZS5ldmVudERlZmluaXRpb25zID0gUmFjdGl2ZS5ldmVudHM7XG4gICAgICAgIFJhY3RpdmUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmFjdGl2ZTtcbiAgICAgICAgUmFjdGl2ZS5kZWxpbWl0ZXJzID0gW1xuICAgICAgICAgICAgJ3t7JyxcbiAgICAgICAgICAgICd9fSdcbiAgICAgICAgXTtcbiAgICAgICAgUmFjdGl2ZS50cmlwbGVEZWxpbWl0ZXJzID0gW1xuICAgICAgICAgICAgJ3t7eycsXG4gICAgICAgICAgICAnfX19J1xuICAgICAgICBdO1xuICAgICAgICBSYWN0aXZlLmV4dGVuZCA9IFJhY3RpdmVfZXh0ZW5kO1xuICAgICAgICBSYWN0aXZlLnBhcnNlID0gcGFyc2U7XG4gICAgICAgIGNpcmN1bGFyLlJhY3RpdmUgPSBSYWN0aXZlO1xuICAgICAgICByZXR1cm4gUmFjdGl2ZTtcbiAgICB9KGNvbmZpZ19zdmcsIHV0aWxzX2NyZWF0ZSwgdXRpbHNfZGVmaW5lUHJvcGVydGllcywgUmFjdGl2ZV9wcm90b3R5cGVfX3Byb3RvdHlwZSwgcmVnaXN0cmllc19wYXJ0aWFscywgcmVnaXN0cmllc19hZGFwdG9ycywgcmVnaXN0cmllc19lYXNpbmcsIGV4dGVuZF9fZXh0ZW5kLCBwYXJzZV9fcGFyc2UsIFJhY3RpdmVfaW5pdGlhbGlzZSwgY2lyY3VsYXIpO1xudmFyIFJhY3RpdmUgPSBmdW5jdGlvbiAoUmFjdGl2ZSwgY2lyY3VsYXIpIHtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTm9kZSAmJiAhd2luZG93Lk5vZGUucHJvdG90eXBlLmNvbnRhaW5zICYmIHdpbmRvdy5IVE1MRWxlbWVudCAmJiB3aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlLmNvbnRhaW5zKSB7XG4gICAgICAgICAgICB3aW5kb3cuTm9kZS5wcm90b3R5cGUuY29udGFpbnMgPSB3aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlLmNvbnRhaW5zO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChjaXJjdWxhci5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNpcmN1bGFyLnBvcCgpKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJhY3RpdmU7XG4gICAgfShSYWN0aXZlX19SYWN0aXZlLCBjaXJjdWxhcik7XG4vLyBleHBvcnQgYXMgQ29tbW9uIEpTIG1vZHVsZS4uLlxuaWYgKCB0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZS5leHBvcnRzICkge1xuXHRtb2R1bGUuZXhwb3J0cyA9IFJhY3RpdmU7XG59XG5cbi8vIC4uLiBvciBhcyBBTUQgbW9kdWxlXG5lbHNlIGlmICggdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQgKSB7XG5cdGRlZmluZSggZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBSYWN0aXZlO1xuXHR9KTtcbn1cblxuLy8gLi4uIG9yIGFzIGJyb3dzZXIgZ2xvYmFsXG5lbHNlIHtcblx0Z2xvYmFsLlJhY3RpdmUgPSBSYWN0aXZlO1xufVxuXG59KCB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHRoaXMgKSk7Il19
(1)
});
