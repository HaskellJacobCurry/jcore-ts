"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.trampoline = exports.trampoline_ = void 0;
var common_1 = require("./common");
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
var trampoline_ = (function (f) { return function () {
    var as = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        as[_i] = arguments[_i];
    }
    return (common_1.apply((function (x) { return x(x); })(common_1.create((function (x) { return function () {
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
    }; }))))(function (_) { return common_1.apply(_.apply(void 0, as)); })(function (state) {
        while (isState(state)) {
            state = state.thunk();
        }
        return state;
    }));
}; });
exports.trampoline_ = trampoline_;
var trampoline = (function () { return function (f) { return function () {
    var as = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        as[_i] = arguments[_i];
    }
    return (common_1.apply((function (x) { return x(x); })(common_1.create((function (x) { return function () {
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
            return (rec(function () { return f.apply(void 0, as)(s); }));
        })());
    }; }))))(function (_) { return common_1.apply(_.apply(void 0, as)); })(function (state) {
        while (isState(state)) {
            state = state.thunk();
        }
        return state;
    }));
}; }; });
exports.trampoline = trampoline;
exports["default"] = trampoline;
