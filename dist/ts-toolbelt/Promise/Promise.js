"use strict";
exports.__esModule = true;
exports.Promise = exports.makePromiseCapability = void 0;
var Function_1 = require("../Function");
var RejectionTracker_1 = require("./RejectionTracker");
exports.makePromiseCapability = function () { return (/** @class */ (function () {
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
}())); };
var PromiseCapability = exports.makePromiseCapability();
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
                            nextValue.then(capability.resolve, capability.reject);
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
                Promise.rejectionTracker.pause();
            }
            else if (state === 'rejected') {
                if (onRejected) {
                    try {
                        var nextValue = onRejected(value);
                        if (Promise.validator(nextValue)) {
                            nextValue.then(capability.resolve, capability.reject);
                        }
                        else {
                            capability.resolve(nextValue);
                        }
                    }
                    catch (err) {
                        capability.reject(err);
                    }
                    if (onRejected.constructor !== PromiseCapability) {
                        Promise.rejectionTracker.pause();
                    }
                    else {
                        Promise.rejectionTracker.resume(value);
                    }
                }
                else {
                    capability.reject(value);
                    Promise.rejectionTracker.resume(value);
                }
            }
        };
        this.conditionalRestartMicrotask();
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
    Promise.all_ = function () {
        var iterable = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            iterable[_i] = arguments[_i];
        }
        var capability = new PromiseCapability();
        var values = [];
        var resolve = ((function (nResolve) {
            if (nResolve === void 0) { nResolve = 0; }
            return (function (value, i) {
                values[i] = value;
                if (++nResolve == values.length) {
                    capability.resolve(values);
                }
            });
        })());
        var _loop_1 = function (i, iEnd) {
            values[values.length] = undefined;
            Promise.resolve(iterable[i]).then(function (value) { return resolve(value, i); }, capability.reject);
        };
        for (var i = 0, iEnd = iterable.length; i < iEnd; i++) {
            _loop_1(i, iEnd);
        }
        return capability.promise;
    };
    Promise.race = function (iterable) {
        var capability = new PromiseCapability();
        var isSettled = false;
        var resolve = function (value) {
            if (!isSettled) {
                isSettled = true;
                capability.resolve(value);
            }
        };
        var reject = function (reason) {
            if (!isSettled) {
                isSettled = true;
                capability.reject(reason);
            }
        };
        for (var i = 0, iEnd = iterable.length; i < iEnd; i++) {
            Promise.resolve(iterable[i]).then(resolve, reject);
        }
        return capability.promise;
    };
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
            Promise.rejectionTracker.resume(reason);
        };
        return { resolve: resolve, reject: reject };
    };
    Promise.prototype.conditionalRestartMicrotask = function () {
        if (this.state === 'fulfilled') {
            var _a = this, next_1 = _a.next, state_1 = _a.state, value_1 = _a.value;
            queueMicrotask(function () { return next_1(state_1, value_1); });
        }
    };
    Promise.rejectionTracker = new RejectionTracker_1.RejectionTracker();
    return Promise;
}());
exports.Promise = Promise;
(function (Promise) {
    Promise.validator = function (a) { return a && Function_1.Function.validate(a.then); };
})(Promise = exports.Promise || (exports.Promise = {}));
exports.Promise = Promise;
exports["default"] = Promise;
