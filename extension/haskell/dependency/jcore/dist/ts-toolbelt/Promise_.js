"use strict";
exports.__esModule = true;
exports.PromiseCapability = exports.Promise = void 0;
var Function_1 = require("./Function");
var Promise = /** @class */ (function () {
    function Promise(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.next = function () { };
        var _a = this.createResolutionFunctions(), resolve = _a.resolve, reject = _a.reject;
        executor(resolve, reject);
    }
    Promise.prototype.fmap = function (morphism) {
        var capability = new PromiseCapability();
        this.next = function (state, value) {
            if (state === 'fulfilled') {
                try {
                    capability.resolve(morphism(value));
                }
                catch (err) {
                    capability.reject(err);
                }
            }
            else if (state === 'rejected') {
                capability.reject(value);
            }
        };
        return capability.promise;
    };
    Promise.prototype.apply = function (morphism) {
        var capability = new PromiseCapability();
        this.next = function (state, value) {
            if (state === 'fulfilled') {
                morphism(value).fmap(capability.resolve)["catch"](capability.reject);
            }
            else if (state === 'rejected') {
                capability.reject(value);
            }
        };
        return capability.promise;
    };
    Promise.prototype.then = function (onFulfilled, onRejected) {
        var capability = new PromiseCapability();
        this.next = function (state, value) {
            if (state === 'fulfilled') {
                if (onFulfilled) {
                    try {
                        var nextValue = onFulfilled(value);
                        if (Promise.validator(nextValue)) {
                            nextValue.fmap(capability.resolve)["catch"](capability.reject);
                        }
                        else {
                            capability.resolve(nextValue);
                        }
                    }
                    catch (reason) {
                        capability.reject(reason);
                    }
                }
                else {
                    capability.resolve(value);
                }
            }
            else if (state === 'rejected') {
                if (onRejected) {
                    try {
                        var nextValue = onRejected(value);
                        if (Promise.validator(nextValue)) {
                            nextValue.fmap(capability.resolve)["catch"](capability.reject);
                        }
                        else {
                            capability.resolve(nextValue);
                        }
                    }
                    catch (err) {
                        capability.reject(err);
                    }
                }
                else {
                    capability.reject(value);
                }
            }
        };
        return capability.promise;
    };
    Promise.prototype["catch"] = function (onRejected) { return this.then(undefined, onRejected); };
    Promise.resolve = function (value) {
        var capability = new PromiseCapability();
        if (Promise.validator(value)) {
            value.then(capability.resolve, capability.reject);
        }
        else {
            capability.resolve(value);
        }
        return capability.promise;
        return new Promise(function (resolve, _) { return resolve(value); });
    };
    Promise.reject = function (reason) {
        var capability = new PromiseCapability();
        capability.reject(reason);
        return capability.promise;
        return new Promise(function (_, reject) { return reject(reason); });
    };
    Promise.await = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
    Promise.prototype.createResolutionFunctions = function () {
        var this_ = this;
        var resolve = function (value) {
            if (Promise.validator(value)) {
                (function (promise) {
                    promise.fmap(function (value) { return queueMicrotask(function () { return this_.next(this_.state = promise.state, this_.value = value); }); });
                })(value);
            }
            else {
                queueMicrotask(function () { return this_.next(this_.state = 'fulfilled', this_.value = value); });
            }
        };
        var reject = function (reason) {
            queueMicrotask(function () { return this_.next(this_.state = 'rejected', this_.value = reason); });
        };
        return { resolve: resolve, reject: reject };
    };
    return Promise;
}());
exports.Promise = Promise;
(function (Promise) {
    Promise.validator = function (a) { return a && Function_1.Function.validate(a.then); };
})(Promise = exports.Promise || (exports.Promise = {}));
exports.Promise = Promise;
var PromiseCapability = /** @class */ (function () {
    function PromiseCapability() {
        var _this = this;
        this.resolve = undefined;
        this.reject = undefined;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
        this.resolve.constructor = PromiseCapability;
        this.reject.constructor = PromiseCapability;
        this.promise.constructor = PromiseCapability;
    }
    return PromiseCapability;
}());
exports.PromiseCapability = PromiseCapability;
exports["default"] = Promise;
