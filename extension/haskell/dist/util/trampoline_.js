"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.trampoline__ = void 0;
var util_1 = require("../util");
var Promise_1 = require("./Promise");
var rec = function (f) {
    var as = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        as[_i - 1] = arguments[_i];
    }
    return ({
        rec: rec,
        thunk: function () { return f.apply(void 0, as); }
    });
};
var isState = function (state) { return state && state.rec === rec; };
var trampoline__ = (function (f) { return function () {
    var as = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        as[_i] = arguments[_i];
    }
    return (util_1.apply((function (x) { return x(x); })(util_1.create((function (x) { return function () {
        var as = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            as[_i] = arguments[_i];
        }
        return ((function (s) {
            if (s === void 0) { s = function () {
                var as = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    as[_i] = arguments[_i];
                }
                return x(x).apply(void 0, as);
            }; }
            return (rec(function () { return f.apply(void 0, __spreadArrays([s], as)); }));
        })());
    }; }))))(function (_) { return util_1.apply(_.apply(void 0, as)); })(function (state) { return (new Promise_1.Promise(function (resolve, reject) { return (util_1.apply(util_1.recurse()(function (state) { return function (next) {
        if (isState(state)) {
            Promise_1.Promise.resolve().then(function () { return state.thunk(); }).then(next, reject);
        }
        else {
            resolve(state);
        }
    }; }))(function (_) { return _(state); })); })); }));
}; });
exports.trampoline__ = trampoline__;
