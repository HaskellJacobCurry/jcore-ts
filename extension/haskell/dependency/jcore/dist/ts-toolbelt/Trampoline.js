"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.trampoline = void 0;
var trampoline = (function (f) {
    var rec = function (f) {
        var as = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            as[_i - 1] = arguments[_i];
        }
        return ({ rec: rec, thunk: function () { return f.apply(void 0, as); } });
    };
    var isState = function (state) { return state && state.rec === rec; };
    return function () {
        var as = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            as[_i] = arguments[_i];
        }
        return ((function (state) {
            while (isState(state)) {
                state = state.thunk();
            }
            return state;
        })((function (x) { return x(x); })((function (x) { return function () {
            var as = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                as[_i] = arguments[_i];
            }
            return ((function (s) { return (rec(function () { return f.apply(void 0, __spreadArrays([s], as)); })); })(function () {
                var as = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    as[_i] = arguments[_i];
                }
                return x(x).apply(void 0, as);
            }));
        }; })).apply(void 0, as)));
    };
});
exports.trampoline = trampoline;
exports["default"] = trampoline;
