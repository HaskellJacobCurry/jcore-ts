"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Json = void 0;
var Json;
(function (Json) {
    function assign(dest) {
        var srcs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            srcs[_i - 1] = arguments[_i];
        }
        return Object.assign.apply(Object, __spreadArrays([dest], srcs));
    }
    Json.assign = assign;
})(Json = exports.Json || (exports.Json = {}));
